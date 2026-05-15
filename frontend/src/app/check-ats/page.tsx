"use client";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  XCircle,
  Sparkles,
  Mail,
} from "lucide-react";

type AnalysisResult = {
  filename: string;
  email: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  feedback: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const { user } = useUser();

  const [resume, setResume] = useState<File | null>(null);
  const [candidateEmail, setCandidateEmail] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!user) {
      alert("Please sign in first.");
      return;
    }

    if (!resume || !jobDescription || !candidateEmail) {
      alert("Please upload resume, enter candidate email, and job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("candidate_email", candidateEmail);
    formData.append("job_description", jobDescription);
    formData.append("recruiter_id", user.id);

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(`${API_URL}/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  const scoreWidth = result ? `${result.match_score}%` : "0%";

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Sparkles className="w-12 h-12 text-blue-600" />
          </div>

          <h1 className="text-5xl font-bold text-slate-900">
            AI Resume Screening
          </h1>

          <p className="text-slate-500 text-lg">
            AI-powered candidate evaluation for modern recruitment teams
          </p>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 text-center hover:border-blue-500 transition">
            <UploadCloud className="mx-auto w-14 h-14 text-blue-600 mb-4" />

            <div className="flex flex-col items-center gap-4">
              <label
                htmlFor="resume-upload"
                className="cursor-pointer bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold text-white transition"
              >
                Choose Resume
              </label>

              <input
                id="resume-upload"
                type="file"
                accept=".pdf,.docx"
                onChange={(e) => setResume(e.target.files?.[0] || null)}
                className="hidden"
              />

              {!resume ? (
                <p className="text-slate-500 text-sm">No file selected</p>
              ) : (
                <div className="flex items-center gap-2 text-blue-600">
                  <FileText size={20} />
                  <span className="font-medium">{resume.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-400" />

            <input
              type="email"
              placeholder="Candidate email address"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              className="w-full pl-12 p-4 bg-white border border-slate-200 rounded-2xl outline-none focus:border-blue-500 text-slate-900"
            />
          </div>

          <textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-56 bg-white border border-slate-200 rounded-2xl p-5 outline-none focus:border-blue-500 text-slate-900"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-2xl font-bold text-lg text-white"
          >
            {loading ? "Analyzing with AI..." : "Analyze Resume"}
          </button>
        </div>

        {result && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-8">
            <h2 className="text-3xl font-bold text-center text-slate-900">
              Analysis Results
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-900">
                  Match Score
                </span>

                <span className="text-blue-600 font-bold">
                  {result.match_score}%
                </span>
              </div>

              <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-1000"
                  style={{ width: scoreWidth }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <CheckCircle className="text-blue-600" />
                  Matched Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {result.matched_skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-slate-900">
                  <XCircle className="text-red-500" />
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {result.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-red-100 text-red-700 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <h3 className="text-xl font-semibold mb-3 text-slate-900">
                AI Feedback
              </h3>

              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                {result.feedback}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}