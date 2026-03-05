import { redirect } from "next/navigation";
import { getUser } from "@/lib/auth";
import CreateLeaderboardForm from "@/components/CreateLeaderboardForm/CreateLeaderboardForm";

export default async function CreateLeaderboardPage() {
  const user = await getUser();
  if (user?.type !== "admin") {
    redirect("/");
  }

  return (
    <main className="section flex min-h-[60vh] flex-col items-center justify-center py-12">
      <div className="mx-auto w-full max-w-xl">
        <h1 className="mb-8 text-3xl font-semibold">Create Leaderboard Period</h1>
        <CreateLeaderboardForm />
      </div>
    </main>
  );
}
