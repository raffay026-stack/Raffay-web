import React from "react";
import { Link } from "react-router-dom";

export default function TermsAndConditionView() {
  return (
    <div
      style={{
        display: "block",
        visibility: "visible",
        opacity: 1,
        position: "relative",
        zIndex: 10,
        width: "100%",
        minHeight: "70vh",
        background: "#FFFDF8",
        color: "#43111F",
        padding: "50px 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "block",
          maxWidth: "900px",
          margin: "0 auto",
          background: "#FFFFFF",
          border: "1px solid #E5D8D0",
          borderRadius: "18px",
          padding: "45px",
          boxShadow: "0 10px 35px rgba(67,17,31,0.08)",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "#6E1F35",
              marginBottom: "14px",
              fontFamily: "Georgia, serif",
            }}
          >
            FK DECORE
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: "42px",
              lineHeight: "1.2",
              fontWeight: 700,
              color: "#43111F",
              fontFamily: "Georgia, serif",
            }}
          >
            Terms & Condition
          </h1>

          <div
            style={{
              width: "75px",
              height: "2px",
              background: "#6E1F35",
              margin: "24px auto 0",
            }}
          />
        </div>

        <div
          style={{
            fontFamily: "Georgia, serif",
            color: "#4B3A40",
            fontSize: "17px",
            lineHeight: "2",
          }}
        >
          <p style={{ marginTop: 0 }}>
            Customers are advised to make video while unwrapping or unboxing
            of parcel from the first tape till the last piece got opened. This
            video will be used as a proof that customer received damaged
            products. If video proof is not provided or video is made after
            the product has been unboxed or even the box is opened before the
            starting of the video then customer will not be entitled for the
            refund / replacement.
          </p>

          <div
            style={{
              marginTop: "35px",
              padding: "22px 24px",
              background: "#F7F1EC",
              borderLeft: "4px solid #6E1F35",
              borderRadius: "8px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "#43111F",
                fontWeight: 700,
              }}
            >
              No Claim Will Be Accepted After 24 Hours of Dilvery
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "45px",
            paddingTop: "25px",
            borderTop: "1px solid #E5D8D0",
            textAlign: "center",
          }}
        >
          <Link
            to="/"
            style={{
              display: "inline-block",
              color: "#43111F",
              textDecoration: "none",
              fontFamily: "Georgia, serif",
              fontWeight: 700,
              fontSize: "15px",
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .terms-page-card {
            padding: 25px !important;
          }
        }
      `}</style>
    </div>
  );
}
