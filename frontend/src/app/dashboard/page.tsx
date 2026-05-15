"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Clock3,
  BarChart3,
  FileText,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CandidateStatus = "pending" | "shortlisted" | "rejected";

interface Candidate {
  id: number;
  filename: string;
  email: string;
  match_score: number;
  matched_skills: string;
  missing_skills: string;
  feedback: string;
  status: CandidateStatus;
  created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function DashboardPage() {
  const { user } = useUser();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchCandidates = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const res = await axios.get(
        `${API_URL}/candidates?recruiter_id=${user.id}`
      );

      setCandidates(res.data);
    } catch (error) {
      console.error("Failed to fetch candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, [user]);

  const updateStatus = async (id: number, action: "shortlist" | "reject") => {
    if (!user) return;

    try {
      await axios.post(
        `${API_URL}/candidate/${id}/${action}?recruiter_id=${user.id}`
      );

      fetchCandidates();
    } catch (error) {
      console.error(`Failed to ${action} candidate:`, error);
    }
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const matchesSearch = candidate.filename
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || candidate.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [candidates, searchQuery, statusFilter]);

  const stats = {
    total: candidates.length,
    shortlisted: candidates.filter((c) => c.status === "shortlisted").length,
    rejected: candidates.filter((c) => c.status === "rejected").length,
    pending: candidates.filter((c) => c.status === "pending").length,
    avg:
      candidates.length > 0
        ? (
            candidates.reduce((sum, c) => sum + c.match_score, 0) /
            candidates.length
          ).toFixed(1)
        : "0",
  };

  const getStatusBadge = (status: CandidateStatus) => {
    switch (status) {
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
      month: "short",
      year: "numeric",
    });
  };

  const statCards = [
    {
      title: "Total Candidates",
      value: stats.total,
      icon: Users,
      bg: "bg-white",
      iconColor: "text-blue-600",
    },
    {
      title: "Shortlisted",
      value: stats.shortlisted,
      icon: UserCheck,
      bg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: UserX,
      bg: "bg-red-50",
      iconColor: "text-red-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Clock3,
      bg: "bg-amber-50",
      iconColor: "text-amber-600",
    },
    {
      title: "Avg ATS Score",
      value: `${stats.avg}%`,
      icon: BarChart3,
      bg: "bg-slate-100",
      iconColor: "text-slate-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">
            Recruitment Dashboard
          </h1>
          <p className="text-slate-500 mt-2">
            Manage candidates, ATS scores, and hiring decisions.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {statCards.map((item) => (
            <Card
              key={item.title}
              className={`${item.bg} border-slate-200 shadow-sm`}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm text-slate-500">
                  {item.title}
                </CardTitle>
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </CardHeader>

              <CardContent>
                <div className="text-3xl font-bold text-slate-900">
                  {item.value}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

            <Input
              placeholder="Search candidates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-slate-200 text-slate-900"
            />
          </div>

          <Tabs
            value={statusFilter}
            onValueChange={setStatusFilter}
            className="w-full md:w-auto"
          >
            <TabsList className="bg-white border border-slate-200">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="shortlisted">Shortlisted</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Card className="bg-white border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-900">
              Candidate Pipeline
            </CardTitle>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="py-20 text-center text-slate-500">
                Loading candidates...
              </div>
            ) : filteredCandidates.length === 0 ? (
              <div className="py-20 text-center text-slate-500">
                <FileText className="mx-auto mb-4 h-10 w-10 opacity-50" />
                No candidates found.
              </div>
            ) : (
              <Table>
                <TableBody>
                  {filteredCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <Link
                          href={`/dashboard/candidate/${candidate.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {candidate.filename}
                        </Link>
                      </TableCell>

                      <TableCell>{candidate.match_score.toFixed(1)}%</TableCell>

                      <TableCell>
                        {getStatusBadge(candidate.status)}
                      </TableCell>

                      <TableCell>{formatDate(candidate.created_at)}</TableCell>

                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedFeedback(candidate.feedback)}
                        >
                          View
                        </Button>
                      </TableCell>

                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-500"
                            onClick={() =>
                              updateStatus(candidate.id, "shortlist")
                            }
                          >
                            Shortlist
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              updateStatus(candidate.id, "reject")
                            }
                          >
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={!!selectedFeedback}
          onOpenChange={() => setSelectedFeedback(null)}
        >
          <DialogContent className="max-w-3xl bg-white">
            <DialogHeader>
              <DialogTitle>AI Recruiter Feedback</DialogTitle>
            </DialogHeader>

            <div className="max-h-[70vh] overflow-y-auto whitespace-pre-wrap text-sm">
              {selectedFeedback}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}