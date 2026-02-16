import { subjects } from "@/CONSTS/subjectDummy";
import SubjectMenuCard from "./SubjectMenuCard";

type SubjectAsideMenuProps = {
  category: string;
  sp: {
    page?: string;
    size?: string;
    subjects?: string;
  };
};

const SubjectAsideMenu = ({ category, sp }: SubjectAsideMenuProps) => {
  return (
    <aside className="w-72 shrink-0">
      <div className="bg-white rounded-2xl shadow-sm border p-4  ">
        <h2 className="font-semibold text-lg mb-4">საკითხები</h2>

        <div className="flex flex-col gap-2  overflow-y-auto pr-1">
          {subjects.map((subject) => (
            <SubjectMenuCard
              key={subject.id}
              category={category}
              sp={sp}
              subject={subject}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SubjectAsideMenu;
