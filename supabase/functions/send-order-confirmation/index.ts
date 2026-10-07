import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const jsonResponse = (body, status = 200) =>
  Response.json(body, { status, headers: corsHeaders });

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatPKR = (value) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const statusContent = {
  Pending: {
    title: "Order Received",
    message:
      "We have received your order and it is currently pending review.",
  },
  Confirmed: {
    title: "Order Confirmed",
    message:
      "Great news! Your order has been confirmed and will be processed shortly.",
  },
  Processing: {
    title: "Order Processing",
    message:
      "Your order is now being prepared. We are getting your products ready.",
  },
  Shipped: {
    title: "Order Shipped",
    message:
      "Your order has been shipped and is now on its way to you.",
  },
  Delivered: {
    title: "Order Delivered",
    message:
      "Your order has been marked as delivered. We hope you enjoy your purchase!",
  },
  Cancelled: {
    title: "Order Cancelled",
    message:
      "Your order has been cancelled. If you believe this was done in error, please contact FK DECORE.",
  },
};

export default {
  fetch: withSupabase(
    { auth: ["user"] },
    async (req, ctx) => {
      if (req.method === "OPTIONS") {
        return new Response("ok", { status: 200, headers: corsHeaders });
      }

      try {
        if (req.method !== "POST") {
          return jsonResponse({ error: "Method not allowed." }, 405);
        }

        const {
          data: { user },
          error: userError,
        } = await ctx.supabase.auth.getUser();

        if (userError || !user) {
          return jsonResponse({ error: "Unauthorized." }, 401);
        }

        const { data: isAdmin, error: adminCheckError } =
          await ctx.supabase.rpc("is_store_admin");

        if (adminCheckError) {
          console.error("Store admin check failed:", adminCheckError);
          return jsonResponse(
            { error: "Unable to verify store administrator access." },
            500,
          );
        }

        if (isAdmin !== true) {
          return jsonResponse(
            { error: "Only store admins can send order emails." },
            403,
          );
        }

        let requestBody;
        try {
          requestBody = await req.json();
        } catch {
          return jsonResponse({ error: "Request body must be valid JSON." }, 400);
        }

        const order = requestBody?.order;

        const allowedStatuses = [
          "Pending",
          "Confirmed",
          "Processing",
          "Shipped",
          "Delivered",
          "Cancelled",
        ];

        if (!order || typeof order !== "object" || !allowedStatuses.includes(order.status)) {
          return jsonResponse(
            { error: "A valid order and order status are required." },
            400,
          );
        }

        if (!Array.isArray(order.items)) {
          return jsonResponse({ error: "Order items must be an array." }, 400);
        }

        const customer = order.customer || {};
        const customerEmail = String(customer.email || "").trim();
        const customerName = String(customer.fullName || "Customer").trim();

        if (!customerEmail) {
          return jsonResponse(
            { error: "Customer email address is missing from the order payload." },
            400,
          );
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
          return jsonResponse(
            { error: "Customer email address is invalid." },
            400,
          );
        }

        const status = order.status;
        const content = statusContent[status];
        const items = order.items;

        const itemRows = items
          .map((item) => {
            const name = escapeHtml(
              item.name || item.title || "Product",
            );
            const size = item.selectedSize
              ? ` — ${escapeHtml(item.selectedSize)}`
              : "";
            const quantity = Number(item.quantity) || 1;
            const price = Number(item.price) || 0;

            return `
              <tr>
                <td style="padding:12px;border-bottom:1px solid #eee;">
                  ${name}${size}
                </td>
                <td style="padding:12px;text-align:center;border-bottom:1px solid #eee;">
                  ${quantity}
                </td>
                <td style="padding:12px;text-align:right;border-bottom:1px solid #eee;">
                  ${formatPKR(price * quantity)}
                </td>
              </tr>
            `;
          })
          .join("");

        const orderNumber = escapeHtml(order.orderNumber || order.id || "N/A");

        const customerAddress = escapeHtml(
          customer.address ||
            order.customerAddress ||
            order.shippingAddress?.address ||
            "",
        );

        const city = escapeHtml(
          customer.city ||
            order.shippingAddress?.city ||
            "",
        );
        const customerPhone = escapeHtml(customer.phone || order.customerPhone || "");
        const totals = order.totals && typeof order.totals === "object"
          ? order.totals
          : order;
        const grandTotal = totals.grandTotal ?? order.grandTotal;

        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <body style="margin:0;padding:0;background:#f6f3ef;font-family:Arial,sans-serif;color:#222;">
            <div style="max-width:680px;margin:30px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 4px 18px rgba(0,0,0,.08);">

              <div style="background:#6E1F35;padding:28px;text-align:center;">
                <h1 style="margin:0;color:#fff;font-size:28px;letter-spacing:1px;">
                  FK DECORE
                </h1>
                <p style="margin:8px 0 0;color:#f5e8dc;font-size:15px;">
                  ${escapeHtml(content.title)}
                </p>
              </div>

              <div style="padding:30px;">
                <h2 style="margin-top:0;color:#6E1F35;">
                  Hello, ${escapeHtml(customerName)}!
                </h2>

                <p style="font-size:15px;line-height:1.6;">
                  ${escapeHtml(content.message)}
                </p>

                <div style="background:#f8f5f1;border-radius:8px;padding:16px;margin:22px 0;">
                  <strong>Order Number:</strong> ${orderNumber}
                  <br>
                  <strong>Status:</strong> ${escapeHtml(status)}
                </div>

                <table style="width:100%;border-collapse:collapse;font-size:14px;">
                  <thead>
                    <tr style="background:#f8f5f1;">
                      <th style="padding:12px;text-align:left;">Product</th>
                      <th style="padding:12px;text-align:center;">Qty</th>
                      <th style="padding:12px;text-align:right;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemRows}
                  </tbody>
                </table>

                <div style="text-align:right;margin-top:20px;font-size:18px;">
                  <strong>Grand Total: ${formatPKR(grandTotal)}</strong>
                </div>

                ${
                  customerAddress || city
                    ? `
                    <div style="margin-top:28px;padding:18px;background:#fafafa;border-radius:8px;">
                      <strong>Delivery Address</strong>
                      <p style="margin:8px 0 0;line-height:1.5;">
                        ${customerAddress}${city ? `<br>${city}` : ""}${customerPhone ? `<br>Phone: ${customerPhone}` : ""}
                      </p>
                    </div>
                    `
                    : ""
                }

                <p style="margin-top:30px;font-size:14px;line-height:1.6;">
                  Thank you for shopping with FK DECORE.
                </p>
              </div>

              <div style="background:#f8f5f1;padding:20px;text-align:center;font-size:12px;color:#777;">
                © FK DECORE — Thank you for shopping with us.
              </div>

            </div>
          </body>
          </html>
        `;

        const brevoApiKey = Deno.env.get("BREVO_API_KEY");
        const senderEmail = Deno.env.get("BREVO_SENDER_EMAIL");
        const senderName =
          Deno.env.get("BREVO_SENDER_NAME") || "FK DECORE";

        if (!brevoApiKey || !senderEmail) {
          throw new Error(
            `Brevo configuration is missing: ${[
              !brevoApiKey && "BREVO_API_KEY",
              !senderEmail && "BREVO_SENDER_EMAIL",
            ].filter(Boolean).join(", ")}.`,
          );
        }

        let brevoResponse;
        try {
          brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
            method: "POST",
            headers: {
              accept: "application/json",
              "api-key": brevoApiKey,
              "content-type": "application/json",
            },
            body: JSON.stringify({
              sender: {
                name: senderName,
                email: senderEmail,
              },
              to: [
                {
                  email: customerEmail,
                  name: customerName,
                },
              ],
              subject: `FK DECORE — Order ${orderNumber} ${status}`,
              htmlContent,
            }),
          });
        } catch (error) {
          console.error("Brevo request failed:", error);
          return jsonResponse(
            {
              error: "Unable to connect to Brevo.",
              details: error instanceof Error ? error.message : String(error),
            },
            502,
          );
        }

        const brevoResponseText = await brevoResponse.text();
        let brevoResult;
        try {
          brevoResult = brevoResponseText ? JSON.parse(brevoResponseText) : {};
        } catch {
          brevoResult = { message: brevoResponseText || "Brevo returned an empty response." };
        }

        if (!brevoResponse.ok) {
          console.error("Brevo error:", brevoResult);

          return jsonResponse(
            {
              error: "Brevo failed to send the email.",
              details: brevoResult,
              upstreamStatus: brevoResponse.status,
            },
            502,
          );
        }

        return jsonResponse(
          {
            success: true,
            messageId: brevoResult.messageId || null,
            recipient: customerEmail,
            status,
          }
        );
      } catch (error) {
        console.error("Order email error:", error);

        return jsonResponse(
          {
            error:
              error instanceof Error
                ? error.message
                : "Unexpected server error.",
          },
          500,
        );
      }
    },
  ),
};
