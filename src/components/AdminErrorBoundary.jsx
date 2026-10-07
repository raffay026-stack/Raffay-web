import React from "react";

export default class AdminErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Admin page rendering failed:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#F7F1EC] px-4 py-10">
          <section className="w-full max-w-lg rounded-xl border border-[#43111F]/15 bg-[#FFFDF8] p-8 text-center shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7C6E72]">
              FK DECORE ADMIN
            </p>
            <h1 className="mt-2 font-serif text-2xl font-bold text-[#43111F]">
              This admin page encountered a problem
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#7C6E72]">
              Your store data has not been deleted. Reload the page to try again.
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-6 rounded-md bg-[#6E1F35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#43111F]"
            >
              Reload page
            </button>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
