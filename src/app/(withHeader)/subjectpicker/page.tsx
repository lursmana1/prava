import SubjectPicker from "@/components/SubjectPicker/SubjectPicker";

const ExamPage = () => {
  return (
    <div className="section flex flex-col gap-4 justify-center items-center">
      <h1 className="font-georgian my-2 text-3xl font-bold">
        საკითხების არჩევა
      </h1>
      <SubjectPicker />
    </div>
  );
};

export default ExamPage;
