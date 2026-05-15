"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  required_skills: string;
  status: string;
  created_at: string;
}

export default function JobsMarketplacePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/jobs"
        );

        console.log("Jobs:", response.data);

        setJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

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
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Explore Jobs
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Discover AI, Machine Learning, and Data Science opportunities.
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No jobs available right now
            </h2>

            <p className="text-slate-400">
              Check back later for new opportunities.
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

                    <p className="text-slate-500 mt-4 text-sm">
                      Skills: {job.required_skills}
                    </p>
                  </div>

                  <Link
                    href={`/jobs/${job.id}`}
                    className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-semibold"
                  >
                    View Job
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}