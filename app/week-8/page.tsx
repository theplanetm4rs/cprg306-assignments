"use client";

import { useUserAuth } from "./_utils/auth-context";
import Link from "next/link";

export default function LandingPage() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.error("GitHub sign-in failed:", error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Sign-out failed:", error);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-950 px-6 py-12">
      <div className="text-center max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-emerald-400 mb-8 whitespace-wrap">
          🛒 Shopping List + Meal Ideas 🍲
        </h1>

        {user ? (
          <div className="space-y-8">
            <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 shadow-2xl">
              <p className="text-2xl font-semibold text-white mb-3">
                Welcome back, <span className="text-emerald-400">{user.displayName || "User"}</span>!
              </p>
              <p className="text-slate-400 mb-6">{user.email}</p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link
                  href="/week-8/shopping-list"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
                >
                  Go to Shopping List →
                </Link>

                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-slate-700 hover:bg-slate-600 transition-colors border border-slate-600 focus:outline-none focus:ring-4 focus:ring-slate-500/40"
                >
                  Sign Out
                </button>
              </div>
            </div>

            <p className="text-slate-500 text-sm">Signed in via GitHub</p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <button
              onClick={handleSignIn}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 text-xl font-bold rounded-full bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-lg focus:outline-none focus:ring-4 focus:ring-emerald-500/40"
            >
            {/* GitHub Logo */}
              <svg
                className="w-8 h-8"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.026 1.592 1.026 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.854 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.478-10-10-10z" />
              </svg>
              Sign in with GitHub
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold rounded-full bg-slate-700 hover:bg-slate-600 transition-colors border border-slate-600 shadow-lg focus:outline-none focus:ring-4 focus:ring-slate-500/40"
            >
              ← Back to Home
            </Link>
          </div>
        )}
      </div>

      <footer className="mt-20 text-slate-600 text-sm">
        CPRG 306 – Web Development 2 • Week 8 Assignment
      </footer>
    </main>
  );
}