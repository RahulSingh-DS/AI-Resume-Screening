"use client";

import { useState } from "react";
import axios from "axios";
import {
  UploadCloud,
  FileText,
  CheckCircle,
  XCircle,
  Sparkles,
} from "lucide-react";

type AnalysisResult = {
  filename: string;
  match_score: number;
  matched_skills: string[];
  missing_skills: string[];
  feedback: string;
};

export default function Home() {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!resume || !jobDescription) {
      alert("Upload resume and enter job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_description", jobDescription);

    try {
      setLoading(true);
      setResult(null);

      const response = await axios.post(
      "http://localhost:8000/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    <main className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-zinc-900 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <Sparkles className="w-12 h-12 text-purple-400" />
          </div>

          <h1 className="text-5xl font-bold">
            AI Resume Screening Bot
          </h1>

          <p className="text-zinc-400 text-lg">
            Smart resume matching using NLP + AI
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-zinc-900/80 backdrop-blur rounded-3xl p-8 border border-zinc-800 shadow-2xl space-y-6">
          <div className="border-2 border-dashed border-zinc-700 rounded-2xl p-10 text-center hover:border-purple-500 transition">
            <UploadCloud className="mx-auto w-14 h-14 text-purple-400 mb-4" />

            <div className="flex flex-col items-center gap-4">
  <label
    htmlFor="resume-upload"
    className="cursor-pointer bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold transition"
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
    <p className="text-zinc-400 text-sm">
      No file selected
    </p>
  ) : (
    <div className="flex items-center gap-2 text-green-400">
      <FileText size={20} />
      <span className="text-sm">{resume.name}</span>
    </div>
  )}
</div>

            {resume && (
              <div className="mt-4 flex justify-center items-center gap-2 text-green-400">
                <FileText size={20} />
                <span>{resume.name}</span>
              </div>
            )}
          </div>

          <textarea
            placeholder="Paste job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full h-48 bg-zinc-800 border border-zinc-700 rounded-2xl p-5 outline-none focus:border-purple-500"
          />

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 transition py-4 rounded-2xl font-bold text-lg"
          >
            {loading ? "Analyzing with AI..." : "Analyze Resume"}
          </button>
        </div>

        {/* Result Section */}
        {result && (
          <div className="bg-zinc-900/80 backdrop-blur rounded-3xl p-8 border border-zinc-800 shadow-2xl space-y-8">
            <h2 className="text-3xl font-bold text-center">
              Analysis Results
            </h2>

            {/* Score */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Match Score</span>
                <span className="text-purple-400 font-bold">
                  {result.match_score}%
                </span>
              </div>

              <div className="w-full h-5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-1000"
                  style={{ width: scoreWidth }}
                />
              </div>
            </div>

            {/* Skills */}
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-400" />
                  Matched Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {result.matched_skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-500/20 text-green-300 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <XCircle className="text-red-400" />
                  Missing Skills
                </h3>

                <div className="flex flex-wrap gap-3">
                  {result.missing_skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-red-500/20 text-red-300 px-4 py-2 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Feedback */}
            <div className="bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
              <h3 className="text-xl font-semibold mb-3">
                AI Feedback
              </h3>

              <p className="text-zinc-300 leading-relaxed">
                {result.feedback}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}