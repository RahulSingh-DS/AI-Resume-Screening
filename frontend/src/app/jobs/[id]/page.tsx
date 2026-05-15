"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  required_skills: string;
  status: string;
  created_at: string;
}

export default function JobDetailPage() {
  const params = useParams();
  const { user } = useUser();

  const id = params.id as string;

  const [job, setJob] = useState<Job | null>(null);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/jobs/${id}`
        );

        setJob(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchJob();
    }
  }, [id]);

  const applyToJob = async () => {
    try {
      if (!resume || !user) {
        alert("Please upload your resume first.");
        return;
      }

      setApplying(true);

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("candidate_user_id", user.id);
      formData.append(
        "candidate_email",
        user.primaryEmailAddress?.emailAddress || ""
      );

      const response = await axios.post(
        `http://localhost:8000/jobs/${id}/apply`,
        formData
      );

      setMatchScore(response.data.match_score);

      alert("Application submitted successfully!");
    } catch (error) {
      console.error(error);
      alert("Application failed.");
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Loading job...</h1>
      </main>
    );
  }

  if (!job) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Job not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10">
          <div className="mb-8">
            <h1 className="text-5xl font-bold">
              {job.title}
            </h1>

            <p className="text-slate-400 text-xl mt-4">
              {job.company} • {job.location}
            </p>

            {job.salary && (
              <p className="text-blue-400 text-lg mt-3">
                {job.salary}
              </p>
            )}
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Job Description
            </h2>

            <p className="text-slate-300 leading-8 whitespace-pre-line">
              {job.description}
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">
              Required Skills
            </h2>

            <p className="text-slate-300 leading-8">
              {job.required_skills}
            </p>
          </div>

          <div className="space-y-6">
            <input
              type="file"
              accept=".pdf,.docx"
              onChange={(e) =>
                setResume(e.target.files?.[0] || null)
              }
              className="block w-full bg-slate-800 border border-slate-700 rounded-xl p-4"
            />

            <button
              onClick={applyToJob}
              disabled={applying}
              className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-semibold text-lg"
            >
              {applying ? "Applying..." : "Apply Now"}
            </button>

            {matchScore !== null && (
              <div className="bg-green-900 border border-green-700 rounded-2xl p-6">
                <h3 className="text-2xl font-bold">
                  ATS Match Score: {matchScore}%
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}