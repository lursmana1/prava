import Quiz from "@/components/ExamQuiz/Quiz";
import SubjectPicker from "@/components/SubjectPicker/SubjectPicker";
import { subjects } from "@/CONSTS/CategoryDummy";
import axios from "axios";
import { useEffect, useState } from "react";

const ExamPage = () => {
  return (
    <div className="section">
      <h1>გამოცდის ბილეთები</h1>
      <SubjectPicker />
    </div>
  );
};

export default ExamPage;
