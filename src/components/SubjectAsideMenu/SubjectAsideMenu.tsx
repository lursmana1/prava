import { subjects } from "@/CONSTS/subjectDummy";
import SubjectMenuCard from "./SubjectMenuCard";
import { getTranslations } from "next-intl/server";
import SubjectSelectMobile from "./SubjectSelets";

type SubjectAsideMenuProps = {
  category: string;
  sp: {
    page?: string;
    size?: string;
    subjects?: string;
  };
};

const SubjectAsideMenu = async ({ category, sp }: SubjectAsideMenuProps) => {
  const t = await getTranslations("Tickets");

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-4">
      {/* MOBILE dropdown */}
      <SubjectSelectMobile
        category={category}
        sp={sp}
        subjects={subjects}
        label={t("subjects")}
      />

      {/* Subject cards - 2 cols mobile, 1 col desktop */}
      <div className="max-lg:hidden">
        <div className="bg-white rounded-2xl shadow-sm border p-3 lg:p-4">
          <h2 className="font-semibold text-sm lg:text-lg mb-3">
            {t("subjects")}
          </h2>

          <div className="grid grid-cols-2 lg:flex lg:flex-col gap-1.5 lg:gap-2 max-h-[70vh] overflow-y-auto pr-1">
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
      </div>
    </aside>
  );
};

export default SubjectAsideMenu;
