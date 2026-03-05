import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { getUser } from "@/lib/auth";
import { getServerBaseApi } from "@/api/ServerBaseApi";
import type { LeaderboardResponse } from "@/lib/types/leaderboard";
import Pagination from "@/components/Pagination/Pagination";
import { DEFAULT_PAGE_SIZE } from "@/CONSTS/pagination";
import { formatDate } from "@/utills/helpers/formatDate";

type PageProps = {
  searchParams?: Promise<{ page?: string; limit?: string }>;
};

export default async function LeaderboardPage({ searchParams }: PageProps) {
  const user = await getUser();
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/auth`);
  }

  const sp = searchParams ? await searchParams : {};
  const page = Math.max(1, Number(sp.page ?? "1"));
  const limit = Math.min(
    100,
    Math.max(1, Number(sp.limit ?? String(DEFAULT_PAGE_SIZE))),
  );

  const locale = await getLocale();
  const t = await getTranslations("Home");
  const tLeaderboard = await getTranslations("Leaderboard");

  let data: LeaderboardResponse | null = null;
  let noActivePeriod = false;

  try {
    const api = await getServerBaseApi();
    const res = await api.get<LeaderboardResponse>("/leaderboard", {
      params: { page, limit },
    });
    data = res.data;
  } catch (err: unknown) {
    const status = err && typeof err === "object" && "response" in err
      ? (err as { response?: { status?: number } }).response?.status
      : undefined;
    if (status === 400) {
      noActivePeriod = true;
    }
    data = {
      startDate: "",
      endDate: "",
      data: [],
      currentUser: { userId: 0, place: null, name: "", surname: null, score: 0 },
      total: 0,
      page: 1,
      totalPages: 1,
    };
  }

  if (noActivePeriod) {
    return (
      <main className="section py-8">
        <div className="mx-auto max-w-2xl">
          <h1 className="mb-6 text-2xl font-bold font-georgian">
            {t("leaderboardTitle")}
          </h1>
          <div className="rounded-2xl border border-slate-200 bg-amber-50/80 p-6 text-center text-slate-700">
            <p>{tLeaderboard("noActive")}</p>
          </div>
        </div>
      </main>
    );
  }

  const cur = data!.currentUser;
  const userInData =
    cur.userId > 0 && data!.data.some((r) => r.userId === cur.userId);
  const displayRows =
    userInData || cur.place == null
      ? data!.data
      : [
          ...data!.data,
          {
            userId: cur.userId,
            place: cur.place,
            name: cur.name,
            surname: cur.surname,
            score: cur.score,
          },
        ];

  const isCurrentUser = (row: { userId: number }) =>
    cur.userId > 0 && row.userId === cur.userId;

  return (
    <main className="section py-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold font-georgian">
            {t("leaderboardTitle")}
          </h1>
          {data!.startDate && data!.endDate && (
            <p className="text-sm text-slate-500">
              {tLeaderboard("period", {
                start: formatDate(data!.startDate, locale, "D MMM YYYY, HH:mm"),
                end: formatDate(data!.endDate, locale, "D MMM YYYY, HH:mm"),
              })}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 p-3 text-sm font-medium text-slate-600">
            <span>{t("leaderboardColumnUser")}</span>
            <span>{t("leaderboardColumnScore")}</span>
          </div>

          <ul className="divide-y divide-slate-100">
            {displayRows.length === 0 ? (
              <li className="py-8 text-center text-slate-500">
                {data!.total === 0 ? tLeaderboard("empty") : "—"}
              </li>
            ) : (
              displayRows.map((row) => (
                <li
                  key={`${row.userId}-${row.place}`}
                  className={`grid grid-cols-[1fr_auto] items-center gap-4 py-4 px-3 ${
                    isCurrentUser(row)
                      ? "bg-blue-50/80 ring-1 ring-inset ring-blue-200"
                      : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                        isCurrentUser(row)
                          ? "bg-blue-200 text-blue-900"
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {row.place}
                    </span>
                    <span className="font-medium text-slate-900">
                      {[row.name, row.surname].filter(Boolean).join(" ") || "—"}
                    </span>
                  </div>
                  <span className="font-semibold text-slate-900">
                    {row.score}
                  </span>
                </li>
              ))
            )}
          </ul>

          {data!.total > limit && (
            <div className="border-t border-slate-200 p-4">
              <Pagination
                page={data!.page}
                total={data!.total}
                pathname="/leaderboard"
                pageSize={limit}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
