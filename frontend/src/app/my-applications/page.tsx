"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

interface Application {
  id: number;
  job_title: string;
  company: string;
  location: string;
  match_score: number;
  status: string;
  created_at: string;
}

export default function MyApplicationsPage() {
  const { user } = useUser();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!user) return;

        const response = await axios.get(
          "http://localhost:8000/candidate/applications",
          {
            params: {
              candidate_user_id: user.id,
              role: "candidate",
            },
          }
        );

        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Loading applications...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          My Applications
        </h1>

        {applications.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No applications yet
            </h2>

            <p className="text-slate-400">
              Start applying for jobs.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {app.job_title}
                    </h2>

                    <p className="text-slate-400 mt-2">
                      {app.company} • {app.location}
                    </p>

                    <p className="text-blue-400 mt-3 text-lg font-semibold">
                      ATS Match Score: {app.match_score}%
                    </p>

                    <p className="text-slate-500 mt-3">
                      Applied:{" "}
                      {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <span
                    className={`px-5 py-3 rounded-xl font-medium ${
                      app.status === "shortlisted"
                        ? "bg-green-600"
                        : app.status === "rejected"
                        ? "bg-red-600"
                        : "bg-blue-600"
                    }`}
                  >
                    {app.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}