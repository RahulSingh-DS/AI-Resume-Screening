"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Navbar() {
  const { user } = useUser();

  const role = user?.publicMetadata?.role as
    | "candidate"
    | "recruiter"
    | undefined;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight flex items-center gap-2"
        >
          <span className="text-blue-500">AI</span>
          <span className="text-white">Hiring Platform</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 whitespace-nowrap">
          <Link
            href="/"
            className="text-slate-300 hover:text-blue-400 transition font-medium"
          >
            Home
          </Link>

          {role === "candidate" && (
            <>
              <Link
                href="/check-ats"
                className="text-slate-300 hover:text-blue-400 transition font-medium"
              >
                ATS
              </Link>

              <Link
                href="/jobs"
                className="text-slate-300 hover:text-blue-400 transition font-medium"
              >
                Jobs
              </Link>
              <Link
              href="/my-applications"
              className="text-slate-300 hover:text-blue-400 transition font-medium">Applications
            </Link>
            </>
          )}

          {role === "recruiter" && (
            <>
              <Link
                href="/dashboard"
                className="text-slate-300 hover:text-blue-400 transition font-medium"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard/jobs"
                className="text-slate-300 hover:text-blue-400 transition font-medium"
              >
                Jobs
              </Link>

              <Link
                href="/dashboard/jobs/new"
                className="text-slate-300 hover:text-blue-400 transition font-medium"
              >
                Add Job
              </Link>
            </>
          )}

          <Link
            href="/settings"
            className="text-slate-300 hover:text-blue-400 transition font-medium"
          >
            Settings
          </Link>
        </nav>

        {/* User */}
        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}