"use client";

import { useState } from "react";
import axios from "axios";
import { Briefcase, User, Sparkles } from "lucide-react";

export default function SelectRolePage() {
  const [loading, setLoading] = useState<string | null>(null);

  const chooseRole = async (role: "candidate" | "recruiter") => {
    try {
      setLoading(role);

      const response = await axios.post("/api/set-role", {
        role,
      });

      if (response.status === 200) {
        window.location.assign(
          role === "candidate" ? "/check-ats" : "/dashboard"
        );
      }
    } catch (error) {
      console.error("Role save error:", error);
      alert("Failed to save role.");
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <Sparkles className="w-14 h-14 text-blue-500" />
          </div>

          <h1 className="text-5xl font-bold">Choose Your Role</h1>

          <p className="text-xl text-slate-400">
            Select how you want to use the AI Hiring Platform.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <button
            onClick={() => chooseRole("candidate")}
            disabled={!!loading}
            className="text-left bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-blue-500 transition shadow-xl"
          >
            <User className="w-12 h-12 text-blue-500 mb-6" />

            <h2 className="text-3xl font-bold mb-4 text-white">
              Candidate
            </h2>

            <p className="text-slate-400 leading-7 mb-8">
              Upload your resume, check ATS score, improve applications, and
              prepare for hiring success.
            </p>

            <div className="bg-blue-600 px-6 py-4 rounded-2xl font-semibold inline-block text-white">
              {loading === "candidate"
                ? "Saving..."
                : "Continue as Candidate"}
            </div>
          </button>

          <button
            onClick={() => chooseRole("recruiter")}
            disabled={!!loading}
            className="text-left bg-slate-900 border border-slate-800 rounded-3xl p-10 hover:border-blue-500 transition shadow-xl"
          >
            <Briefcase className="w-12 h-12 text-blue-500 mb-6" />

            <h2 className="text-3xl font-bold mb-4 text-white">
              Recruiter
            </h2>

            <p className="text-slate-400 leading-7 mb-8">
              Screen candidates, manage pipelines, shortlist talent, and
              automate hiring workflows.
            </p>

            <div className="bg-blue-600 px-6 py-4 rounded-2xl font-semibold inline-block text-white">
              {loading === "recruiter"
                ? "Saving..."
                : "Continue as Recruiter"}
            </div>
          </button>
        </div>
      </div>
    </main>
  );
}