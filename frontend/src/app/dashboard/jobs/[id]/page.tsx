"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Application {
  id: number;
  candidate_email: string;
  resume_filename: string;
  match_score: number;
  status: string;
  created_at: string;
}

export default function JobApplicationsPage() {
  const params = useParams();
  const id = params.id as string;

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/jobs/${id}/applications`
        );

        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch applications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchApplications();
    }
  }, [id]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h1 className="text-2xl">Loading applicants...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">
          Job Applicants
        </h1>

        {applications.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No applicants yet
            </h2>
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
                    <h2 className="text-xl font-bold">
                      {app.candidate_email}
                    </h2>

                    <p className="text-slate-400 mt-2">
                      Resume: {app.resume_filename}
                    </p>

                    <p className="text-blue-400 mt-3 text-lg font-semibold">
                      ATS Match Score: {app.match_score}%
                    </p>

                    <p className="text-slate-500 mt-3">
                      Status: {app.status}
                    </p>
                  </div>

                  <span className="bg-green-600 px-4 py-2 rounded-xl font-medium">
                    Applied
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