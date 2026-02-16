import Link from "next/link";

type SubjectMenuCardProps = {
  category: string;
  sp: {
    page?: string;
    size?: string;
    subjects?: string;
  };
  subject: {
    id: number;
    name: string;
  };
};

const SubjectMenuCard = ({ category, sp, subject }: SubjectMenuCardProps) => {
  const isActive = sp.subjects === String(subject.id);

  const newParams = new URLSearchParams({
    ...sp,
    page: "1",
    subjects: isActive ? "" : String(subject.id),
  });

  // Remove empty subjects param from URL
  if (!newParams.get("subjects")) {
    newParams.delete("subjects");
  }

  return (
    <Link
      href={`/tickets/${category}?${newParams.toString()}`}
      className={`
        block p-3 rounded-xl border transition
        ${
          isActive
            ? "bg-blue-600 text-white border-blue-600"
            : "bg-white hover:bg-gray-50 border-gray-200"
        }
      `}
    >
      <div className="font-medium">{subject.name}</div>
      <div className="text-xs opacity-70">საკითხი #{subject.id}</div>
    </Link>
  );
};

export default SubjectMenuCard;
