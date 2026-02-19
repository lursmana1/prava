import Image from "next/image";
import leftSide from "../../../public/png/left.png";
import rightSide from "../../../public/png/right.png";

type ExamFooterProps = {
  questions: {
    key: string;
    text: string | null;
  }[];
  showPrevious?: () => void;
  showNext?: () => void;
  selectAnswer: (key: string) => void;
  selectedAnswer?: string;
};

const ExamFooter = (props: ExamFooterProps) => {
  const navigationVisibility = !!props.showNext;
  return (
    <div className="flex justify-between items-center bg-red-50 h-[10vh] w-full px-4 rounded-lg">
      {navigationVisibility && (
        <button
          onClick={props.showPrevious}
          className="p-2 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer"
        >
          <Image src={leftSide} alt={""} width={32} height={32} />
        </button>
      )}

      {/* Question Numbers */}
      <div className="flex gap-2 overflow-x-auto justify-center flex-1">
        {props.questions.map((question) => {
          const disabled = !!props.selectedAnswer;
          return (
            <div
              key={question.key}
              onClick={() => !disabled && props.selectAnswer(question.key)}
              className={`
                flex items-center justify-center
                border border-gray-400
                w-12 h-12
                rounded-md
                font-bold text-lg
                transition
                ${
                  disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                    : "bg-gray-100 text-black cursor-pointer hover:bg-gray-200"
                }
              `}
            >
              {question.key}
            </div>
          );
        })}
      </div>

      {navigationVisibility && (
        <button
          onClick={props.showNext}
          className="p-2 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer"
        >
          <Image src={rightSide} width={32} height={32} alt="zd" />
        </button>
      )}
    </div>
  );
};

export default ExamFooter;
