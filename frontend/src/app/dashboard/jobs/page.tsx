"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
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

export default function RecruiterJobsPage() {
  const { user } = useUser();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (!user) return;

        const response = await axios.get(
          "http://localhost:8000/recruiter/jobs",
          {
            params: {
              recruiter_id: user.id,
            },
          }
        );

        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Loading jobs...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-bold">
            My Posted Jobs
          </h1>

          <Link
            href="/dashboard/jobs/new"
            className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold"
          >
            + Create Job
          </Link>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No jobs posted yet
            </h2>

            <p className="text-slate-400">
              Create your first job posting.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {job.title}
                    </h2>

                    <p className="text-slate-400 mt-2">
                      {job.company} • {job.location}
                    </p>

                    {job.salary && (
                      <p className="text-blue-400 mt-2">
                        {job.salary}
                      </p>
                    )}

                    <p className="text-slate-300 mt-4 line-clamp-3">
                      {job.description}
                    </p>

                    <p className="text-slate-500 mt-4 text-sm">
                      Skills: {job.required_skills}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <span className="bg-green-600 px-4 py-2 rounded-xl text-sm font-medium">
                      {job.status}
                    </span>

                    <Link
                      href={`/dashboard/jobs/${job.id}`}
                      className="bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium"
                    >
                      View Applicants
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}