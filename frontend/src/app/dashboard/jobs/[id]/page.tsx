"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";

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
  const { user } = useUser();

  const id = params.id as string;

  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchEmail, setSearchEmail] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [minScore, setMinScore] = useState("");

  const fetchApplications = async () => {
    try {
      if (!user) return;

      const response = await axios.get(
        `http://localhost:8000/jobs/${id}/applications`,
        {
          params: {
            recruiter_id: user.id,
            role: "recruiter",
          },
        }
      );

      setApplications(response.data);
      setFilteredApplications(response.data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && user) {
      fetchApplications();
    }
  }, [id, user]);

  useEffect(() => {
    const filtered = applications.filter((app) => {
      const matchesEmail = app.candidate_email
        .toLowerCase()
        .includes(searchEmail.toLowerCase());

      const matchesStatus = statusFilter
        ? app.status === statusFilter
        : true;

      const matchesScore = minScore
        ? app.match_score >= Number(minScore)
        : true;

      return matchesEmail && matchesStatus && matchesScore;
    });

    setFilteredApplications(filtered);
  }, [searchEmail, statusFilter, minScore, applications]);

  const updateStatus = async (
    applicationId: number,
    action: "shortlist" | "reject"
  ) => {
    try {
      await axios.post(
        `http://localhost:8000/applications/${applicationId}/${action}`,
        null,
        {
          params: {
            recruiter_id: user?.id,
            role: "recruiter",
          },
        }
      );

      fetchApplications();
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Action failed");
    }
  };

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

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          >
            <option value="">All Status</option>
            <option value="applied">Applied</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            type="number"
            placeholder="Minimum ATS score..."
            value={minScore}
            onChange={(e) => setMinScore(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4"
          />
        </div>

        {filteredApplications.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No matching applicants
            </h2>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredApplications.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold">
                      {app.candidate_email}
                    </h2>

                    <div className="mt-2 flex items-center gap-4">
                      <p className="text-slate-400">
                        Resume: {app.resume_filename}
                      </p>

                      <a
                        href={`http://localhost:8000/resume/${app.resume_filename}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        View Resume
                      </a>
                    </div>

                    <div className="mt-4">
                      <p className="text-sm text-slate-400 mb-2">
                        ATS Match Score
                      </p>

                      <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden">
                        <div
                          className="bg-blue-500 h-4 rounded-full transition-all"
                          style={{ width: `${app.match_score}%` }}
                        />
                      </div>

                      <p className="text-blue-400 mt-2 font-semibold">
                        {app.match_score}%
                      </p>
                    </div>

                    <p className="text-slate-500 mt-4">
                      Status: {app.status}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 ml-6">
                    <button
                      onClick={() =>
                        updateStatus(app.id, "shortlist")
                      }
                      className="bg-green-600 hover:bg-green-500 px-5 py-3 rounded-xl font-medium"
                    >
                      Shortlist
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(app.id, "reject")
                      }
                      className="bg-red-600 hover:bg-red-500 px-5 py-3 rounded-xl font-medium"
                    >
                      Reject
                    </button>
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