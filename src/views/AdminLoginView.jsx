import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LockKeyhole, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function AdminLoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });

      if (loginError) {
        throw loginError;
      }

      if (!data?.user) {
        throw new Error("Unable to create an admin session.");
      }

      sessionStorage.setItem("fk_decore_admin_session", "active");
      navigate("/admin/dashboard", { replace: true });
    } catch (loginError) {
      setError(loginError.message || "The email or password is incorrect.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F7F1EC] px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-[#43111F]/15 bg-[#FFFDF8] p-7 shadow-xl sm:p-9">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-xs text-[#7C6E72] hover:text-[#43111F]"
        >
          <ArrowLeft size={15} />
          Back to website
        </Link>

        <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-full bg-[#6E1F35] text-white">
          <LockKeyhole size={21} />
        </div>

        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7C6E72]">
          FK Decore
        </p>

        <h1 className="mt-1 font-serif text-3xl font-bold text-[#43111F]">
          Admin sign in
        </h1>

        <p className="mt-2 text-sm text-[#7C6E72]">
          Access store management tools.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-5">
          <label className="block text-xs font-semibold text-[#5D5054]">
            Email address
            <input
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-md border border-[#D2BCB0] bg-white px-3 py-3 text-sm outline-none focus:border-[#6E1F35]"
              required
            />
          </label>

          <label className="block text-xs font-semibold text-[#5D5054]">
            Password
            <span className="mt-2 flex rounded-md border border-[#D2BCB0] bg-white focus-within:border-[#6E1F35]">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="min-w-0 flex-1 rounded-md bg-transparent px-3 py-3 text-sm outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((shown) => !shown)}
                className="px-3 text-[#7C6E72]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </span>
          </label>

          {error && (
            <p
              role="alert"
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#6E1F35] px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-[#43111F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 border-t border-[#E5D8D0] pt-4 text-xs leading-5 text-[#7C6E72]">
          Secure admin authentication powered by Supabase.
        </p>
      </section>
    </main>
  );
}

