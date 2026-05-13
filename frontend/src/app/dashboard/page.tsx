"use client";

import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search, Users, CheckCircle, XCircle, Clock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Candidate = {
  id: number;
  filename: string;
  match_score: number;
  matched_skills: string;
  missing_skills: string;
  feedback: string;
  status: string;
};

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/candidates");
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, action: "shortlist" | "reject") => {
    try {
      await axios.post(`http://127.0.0.1:8000/candidate/${id}/${action}`);
      fetchCandidates();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch = candidate.filename
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ? true : candidate.status === filter;

      return matchesSearch && matchesFilter;
    });
  }, [candidates, search, filter]);

  const totalCandidates = candidates.length;
  const shortlisted = candidates.filter(
    (c) => c.status === "shortlisted"
  ).length;
  const rejected = candidates.filter((c) => c.status === "rejected").length;
  const pending = candidates.filter((c) => c.status === "pending").length;

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold tracking-tight">
            Resume Screening Dashboard
          </h1>
          <p className="text-zinc-400 mt-2">
            AI-powered recruiter control center
          </p>
        </div>

        {/* ANALYTICS */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-zinc-400">Total Candidates</p>
                <h2 className="text-3xl font-bold">{totalCandidates}</h2>
              </div>
              <Users size={32} />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-zinc-400">Shortlisted</p>
                <h2 className="text-3xl font-bold">{shortlisted}</h2>
              </div>
              <CheckCircle size={32} />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-zinc-400">Rejected</p>
                <h2 className="text-3xl font-bold">{rejected}</h2>
              </div>
              <XCircle size={32} />
            </CardContent>
          </Card>

          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <p className="text-zinc-400">Pending</p>
                <h2 className="text-3xl font-bold">{pending}</h2>
              </div>
              <Clock size={32} />
            </CardContent>
          </Card>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-3 text-zinc-400"
              size={18}
            />
            <Input
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-zinc-900 border-zinc-800"
            />
          </div>

          <div className="flex gap-2">
            {["all", "pending", "shortlisted", "rejected"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </div>

        {/* CANDIDATES */}
        <div className="grid gap-6">
          {filteredCandidates.map((candidate) => (
            <Card
              key={candidate.id}
              className="bg-zinc-900 border-zinc-800"
            >
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <h2 className="text-xl font-semibold">
                        {candidate.filename}
                      </h2>

                      <Badge
                        variant="secondary"
                        className={
                          candidate.status === "shortlisted"
                            ? "bg-green-600"
                            : candidate.status === "rejected"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }
                      >
                        {candidate.status}
                      </Badge>
                    </div>

                    <div className="mb-4">
                      <p className="mb-2 text-zinc-300">
                        ATS Match Score: {candidate.match_score.toFixed(2)}%
                      </p>
                      <Progress value={candidate.match_score} />
                    </div>

                    <p className="text-sm text-zinc-300 mb-2">
                      <strong>Matched:</strong> {candidate.matched_skills}
                    </p>

                    <p className="text-sm text-zinc-400">
                      <strong>Missing:</strong> {candidate.missing_skills}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 lg:w-52">
                    <Button
                      onClick={() => setSelectedFeedback(candidate.feedback)}
                    >
                      View AI Feedback
                    </Button>

                    <Button
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        updateStatus(candidate.id, "shortlist")
                      }
                    >
                      Shortlist
                    </Button>

                    <Button
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => updateStatus(candidate.id, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* MODAL */}
        <Dialog
          open={!!selectedFeedback}
          onOpenChange={() => setSelectedFeedback("")}
        >
          <DialogContent className="max-w-3xl bg-zinc-950 text-white border-zinc-800">
            <DialogHeader>
              <DialogTitle>AI Candidate Analysis</DialogTitle>
            </DialogHeader>

            <div className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap text-sm text-zinc-300">
              {selectedFeedback}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}