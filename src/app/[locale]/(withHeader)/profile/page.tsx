import { redirect } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getUser } from "@/lib/auth";

export default async function ProfilePage() {
  const user = await getUser();
  if (!user) {
    const locale = await getLocale();
    redirect(`/${locale}/auth`);
  }

  const displayName =
    [user.name, user.surname].filter(Boolean).join(" ") || user.email;

  return (
    <main className="section py-8">
      <h1 className="text-2xl font-bold mb-6">ჩემი პროფილი</h1>

      <div className="max-w-md space-y-4 rounded-lg border border-slate-200 bg-white p-6">
        <div>
          <span className="text-sm text-slate-500">სახელი</span>
          <p className="font-medium">{displayName}</p>
        </div>
        <div>
          <span className="text-sm text-slate-500">ელფოსტა</span>
          <p className="font-medium">{user.email}</p>
        </div>
        {user.type && (
          <div>
            <span className="text-sm text-slate-500">ტიპი</span>
            <p className="font-medium">{user.type}</p>
          </div>
        )}
      </div>
    </main>
  );
}
