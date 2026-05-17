"use client";

import { useState } from "react";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

export default function CreateJobPage() {
  const { user } = useUser();

  const [form, setForm] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    required_skills: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const createJob = async () => {
    try {
      if (!user) return;

      setLoading(true);

      const formData = new FormData();

        formData.append("recruiter_id", user.id);
        formData.append("role", "recruiter");
        formData.append("title", form.title);
        formData.append("company", form.company);
        formData.append("location", form.location);
        formData.append("salary", form.salary);
        formData.append("description", form.description);
        formData.append("required_skills", form.required_skills);
      

      await axios.post(
        "http://localhost:8000/jobs",
        formData
      );

      alert("Job created successfully!");

      setForm({
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        required_skills: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">
          Create New Job
        </h1>

        <div className="space-y-6">
          <input
            name="title"
            placeholder="Job Title"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <input
            name="company"
            placeholder="Company"
            value={form.company}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <input
            name="salary"
            placeholder="Salary"
            value={form.salary}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <textarea
            name="description"
            placeholder="Job Description"
            rows={8}
            value={form.description}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <textarea
            name="required_skills"
            placeholder="Required Skills (comma separated)"
            rows={4}
            value={form.required_skills}
            onChange={handleChange}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4"
          />

          <button
            onClick={createJob}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-2xl font-semibold"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </div>
    </main>
  );
}