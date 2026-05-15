"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import {
  ArrowLeft,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Candidate {
  id: number;
  filename: string;
  email: string;
  match_score: number;
  matched_skills: string;
  missing_skills: string;
  feedback: string;
  status: "pending" | "shortlisted" | "rejected";
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function CandidateDetailPage() {
  const params = useParams();
  const { user } = useUser();
  const candidateId = params.id;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchCandidate = async () => {
    if (!user) return;

    try {
      const res = await axios.get(
        `${API_URL}/candidate/${candidateId}?recruiter_id=${user.id}`
      );

      if (res.data.error) {
        setCandidate(null);
      } else {
        setCandidate(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch candidate:", error);
      setCandidate(null);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (action: "shortlist" | "reject") => {
    if (!user) return;

    try {
      await axios.post(
        `${API_URL}/candidate/${candidateId}/${action}?recruiter_id=${user.id}`
      );

      fetchCandidate();
    } catch (error) {
      console.error(`Failed to ${action} candidate:`, error);
    }
  };

  useEffect(() => {
    fetchCandidate();
  }, [user]);

  const getStatusBadge = () => {
    if (!candidate) return null;

    switch (candidate.status) {
      case "shortlisted":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Shortlisted
          </Badge>
        );

      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            Rejected
          </Badge>
        );

      default:
        return (
          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
            Pending
          </Badge>
        );
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
        Loading candidate profile...
      </div>
    );
  }

  if (!candidate) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-600">
        Candidate not found or unauthorized.
      </div>
    );
  }

  const matchedSkills = candidate.matched_skills
    .split(",")
    .map((skill) => skill.trim());

  const missingSkills = candidate.missing_skills
    .split(",")
    .map((skill) => skill.trim());

  const resumeUrl = `${API_URL}/resume/${candidate.filename}`;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 transition font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2 bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900 text-2xl">
                Candidate Overview
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-slate-500">Resume File</p>
                <p className="text-xl font-semibold text-slate-900">
                  {candidate.filename}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">Candidate Email</p>
                <p className="text-slate-900">{candidate.email}</p>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-blue-600" />
                <span className="text-slate-700">
                  {formatDate(candidate.created_at)}
                </span>
              </div>

              <div>{getStatusBadge()}</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-600 text-white border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                ATS Match Score
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-5xl font-bold">
                {candidate.match_score.toFixed(1)}%
              </div>

              <Progress value={candidate.match_score} />

              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => updateStatus("shortlist")}
                  className="bg-white text-blue-600 hover:bg-slate-100"
                >
                  Shortlist Candidate
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => updateStatus("reject")}
                >
                  Reject Candidate
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <CheckCircle2 className="h-5 w-5 text-blue-600" />
                Matched Skills
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              {matchedSkills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-blue-100 text-blue-700 hover:bg-blue-100"
                >
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <XCircle className="h-5 w-5 text-red-500" />
                Missing Skills
              </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-wrap gap-2">
              {missingSkills.map((skill, idx) => (
                <Badge
                  key={idx}
                  className="bg-red-100 text-red-700 hover:bg-red-100"
                >
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <FileText className="h-5 w-5 text-blue-600" />
              AI Recruiter Feedback
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="whitespace-pre-wrap leading-7 text-slate-700">
              {candidate.feedback}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">
              Resume Preview
            </CardTitle>
          </CardHeader>

          <CardContent>
            <iframe
              src={resumeUrl}
              className="w-full h-[900px] rounded-lg border border-slate-200"
              title="Resume Preview"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}