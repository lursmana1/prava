"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/contexts/UserContext";
import {
  getAttemptsHistory,
  getWeakQuestions,
  getWeakSubjects,
  type AttemptSummary,
  type WeakQuestion,
  type WeakSubject,
} from "@/api/examAttempts";
import { getLocalizedSubjects } from "@/CONSTS/subjects";
import { formatDate } from "@/utills/helpers/formatDate";
import { WeakQuestionsChart } from "@/components/ExamHistory/WeakQuestionsChart";
import { WeakSubjectsChart } from "@/components/ExamHistory/WeakSubjectsChart";

function formatDuration(seconds: number | null): string {
  if (seconds == null) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ProfileClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Profile");
  const tExam = useTranslations("Exam");

  const [attempts, setAttempts] = useState<AttemptSummary[]>([]);
  const [total, setTotal] = useState(0);
  const [weakQuestions, setWeakQuestions] = useState<WeakQuestion[]>([]);
  const [weakSubjects, setWeakSubjects] = useState<WeakSubject[]>([]);
  const [dataLoading, setDataLoading] = useState(true);

  const subjects = useMemo(() => getLocalizedSubjects(locale), [locale]);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/auth");
    }
  }, [authLoading, user, router]);

  useEffect(() => {
    if (!user) return;
    let active = true;

    (async () => {
      setDataLoading(true);
      const [history, wq, ws] = await Promise.all([
        getAttemptsHistory(1, 50).catch(() => ({
          data: [],
          total: 0,
          page: 1,
          totalPages: 1,
        })),
        getWeakQuestions().catch(() => []),
        getWeakSubjects().catch(() => []),
      ]);
      if (!active) return;
      setAttempts(history.data);
      setTotal(history.total);
      setWeakQuestions(wq);
      setWeakSubjects(ws);
      setDataLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [user]);

  const stats = useMemo(() => {
    const passed = attempts.filter((a) => a.passed === true).length;
    const failed = attempts.filter((a) => a.passed === false).length;
    const decided = passed + failed;
    const passRate = decided > 0 ? Math.round((passed / decided) * 100) : 0;
    return { passed, failed, passRate };
  }, [attempts]);

  if (authLoading || !user) {
    return (
      <main className="section py-16">
        <div className="flex items-center justify-center text-slate-500">
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
          <span className="ml-3">{t("loading")}</span>
        </div>
      </main>
    );
  }

  const displayName =
    [user.name, user.surname].filter(Boolean).join(" ") || user.email;
  const initials = initialsOf(displayName) || user.email[0]?.toUpperCase();

  const statTiles = [
    { label: t("statTotal"), value: total, tone: "text-slate-900" },
    { label: t("statPassed"), value: stats.passed, tone: "text-emerald-600" },
    { label: t("statFailed"), value: stats.failed, tone: "text-rose-600" },
    {
      label: t("statPassRate"),
      value: `${stats.passRate}%`,
      tone: "text-sky-600",
    },
  ];

  return (
    <main className="section space-y-8 py-8 font-georgian">
      {/* Identity header */}
      <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="h-24 bg-linear-to-r from-sky-500 to-violet-600" />
        <div className="flex flex-col gap-4 px-6 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-end gap-4">
            <div className="-mt-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-white bg-slate-800 text-2xl font-bold text-white shadow-md">
              {initials}
            </div>
            <div className="pb-1">
              <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                {displayName}
              </h1>
              <p className="text-sm text-slate-500">{user.email}</p>
            </div>
          </div>
          <Link
            href="/auth/logout"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
          >
            {t("logout")}
          </Link>
        </div>
      </section>

      {/* Stat tiles */}
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {statTiles.map((tile) => (
          <div
            key={tile.label}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
          >
            <p className={`text-2xl font-bold sm:text-3xl ${tile.tone}`}>
              {dataLoading ? "—" : tile.value}
            </p>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              {tile.label}
            </p>
          </div>
        ))}
      </section>

      {/* Recent exams */}
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-slate-900 sm:text-lg">
            {t("recentTitle")}
          </h2>
          <Link
            href="/subjectpicker"
            className="rounded-lg bg-linear-to-r from-sky-500 to-violet-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:brightness-110 sm:text-sm"
          >
            {tExam("startNew")}
          </Link>
        </div>

        <div className="hidden grid-cols-[1fr_auto_auto_auto] gap-4 border-b border-slate-100 bg-slate-50 px-5 py-3 text-xs font-medium text-slate-500 sm:grid">
          <span>{t("colDate")}</span>
          <span className="text-right">{t("colScore")}</span>
          <span className="text-right">{t("colDuration")}</span>
          <span className="text-right">{t("colResult")}</span>
        </div>

        <ul className="divide-y divide-slate-100">
          {dataLoading ? (
            <li className="px-5 py-12 text-center text-slate-400">
              {t("loading")}
            </li>
          ) : attempts.length === 0 ? (
            <li className="px-5 py-12 text-center text-slate-500">
              {tExam("historyEmpty")}
            </li>
          ) : (
            attempts.map((attempt) => (
              <li
                key={attempt.id}
                className="grid grid-cols-2 items-center gap-2 px-5 py-3.5 text-sm sm:grid-cols-[1fr_auto_auto_auto] sm:gap-4"
              >
                <time
                  dateTime={attempt.createdAt}
                  className="text-slate-700"
                >
                  {formatDate(attempt.createdAt, locale, "D MMM YYYY, HH:mm")}
                </time>
                <span className="text-right font-medium text-slate-900 sm:text-right">
                  {attempt.correctCount}/{attempt.questionCount}
                </span>
                <span className="hidden text-right text-slate-600 sm:block">
                  {formatDuration(attempt.durationSeconds)}
                </span>
                <span
                  className={`text-right font-medium ${
                    attempt.passed === true
                      ? "text-emerald-600"
                      : attempt.passed === false
                        ? "text-rose-600"
                        : "text-slate-400"
                  }`}
                >
                  {attempt.passed === true
                    ? t("passed")
                    : attempt.passed === false
                      ? t("failed")
                      : "—"}
                </span>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Charts */}
      {!dataLoading && (weakQuestions.length > 0 || weakSubjects.length > 0) && (
        <section className="grid gap-6 lg:grid-cols-2">
          <WeakQuestionsChart
            data={weakQuestions}
            title={tExam("weakQuestionsTitle")}
            questionLabel={tExam("question")}
            wrongLabel={tExam("wrongCount")}
          />
          <WeakSubjectsChart
            data={weakSubjects}
            subjects={subjects}
            title={tExam("weakSubjectsTitle")}
            wrongLabel={tExam("wrongCount")}
            correctLabel={tExam("correctCount")}
            totalLabel={tExam("totalQuestions")}
            unansweredLabel={tExam("unanswered")}
          />
        </section>
      )}
    </main>
  );
}
