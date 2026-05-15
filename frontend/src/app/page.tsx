"use client";

import Link from "next/link";
import { Briefcase, User, Sparkles } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Sparkles className="w-14 h-14 text-blue-500" />
          </div>

          <h1 className="text-6xl font-bold tracking-tight">
            AI Hiring Platform
          </h1>

          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            AI-powered hiring intelligence for recruiters and ATS optimization
            for job seekers.
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Candidate */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl hover:border-blue-500 transition">
            <div className="mb-6">
              <User className="w-12 h-12 text-blue-500" />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white">
              Candidate Portal
            </h2>

            <p className="text-slate-400 mb-8 leading-7">
              Upload your resume, check ATS score, get AI-powered feedback,
              improve your applications, and prepare for hiring success.
            </p>

            <Link
              href="/check-ats"
              className="inline-block bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-semibold text-white transition"
            >
              Continue as Candidate
            </Link>
          </div>

          {/* Recruiter */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 shadow-xl hover:border-blue-500 transition">
            <div className="mb-6">
              <Briefcase className="w-12 h-12 text-blue-500" />
            </div>

            <h2 className="text-3xl font-bold mb-4 text-white">
              Recruiter Portal
            </h2>

            <p className="text-slate-400 mb-8 leading-7">
              Screen candidates with AI, manage applicant pipelines, shortlist
              top talent, review resumes, and automate hiring workflows.
            </p>

            <Link
              href="/dashboard"
              className="inline-block bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-2xl font-semibold text-white transition"
            >
              Continue as Recruiter
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}