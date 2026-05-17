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
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTitle, setSearchTitle] = useState("");
  const [searchCompany, setSearchCompany] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/jobs"
        );

        setJobs(response.data);
        setFilteredJobs(response.data);
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter((job) => {
      const matchesTitle = job.title
        .toLowerCase()
        .includes(searchTitle.toLowerCase());

      const matchesCompany = job.company
        .toLowerCase()
        .includes(searchCompany.toLowerCase());

      const matchesLocation = job.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase());

      return (
        matchesTitle &&
        matchesCompany &&
        matchesLocation
      );
    });

    setFilteredJobs(filtered);
  }, [searchTitle, searchCompany, searchLocation, jobs]);

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

        {/* Search Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white"
          />

          <input
            type="text"
            placeholder="Filter by company..."
            value={searchCompany}
            onChange={(e) => setSearchCompany(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white"
          />

          <input
            type="text"
            placeholder="Filter by location..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-white"
          />
        </div>

        {filteredJobs.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              No matching jobs found
            </h2>

            <p className="text-slate-400">
              Try changing your search filters.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {filteredJobs.map((job) => (
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