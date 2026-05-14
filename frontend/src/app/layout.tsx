import type { Metadata } from "next";
import Link from "next/link";
import { ClerkProvider, UserButton } from "@clerk/nextjs";

import "./globals.css";

export const metadata: Metadata = {
  title: "AI Resume Screening",
  description: "AI-powered recruitment platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-slate-950 text-white antialiased">
          <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="text-2xl font-bold tracking-tight flex items-center gap-2"
              >
                <span className="text-blue-500">AI</span>
                <span className="text-white">Resume Screening</span>
              </Link>

              <nav className="flex items-center gap-6">
                <Link
                  href="/"
                  className="text-slate-300 hover:text-blue-400 transition font-medium"
                >
                  Analyze
                </Link>

                <Link
                  href="/dashboard"
                  className="text-slate-300 hover:text-blue-400 transition font-medium"
                >
                  Dashboard
                </Link>

                <Link
                  href="/settings"
                  className="text-slate-300 hover:text-blue-400 transition font-medium"
                >
                  Settings
                </Link>

                <div className="ml-2">
                  <UserButton />
                </div>
              </nav>
            </div>
          </header>

          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}