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
    <div className="flex justify-between items-center gap-2 bg-red-50 min-h-14 w-full px-2 sm:px-4 py-2 rounded-lg shrink-0">
      {navigationVisibility && (
        <button
          onClick={props.showPrevious}
          className="p-1.5 sm:p-2 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer shrink-0"
        >
          <Image
            src={leftSide}
            alt=""
            width={32}
            height={32}
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
      )}

      {/* Question Numbers - flex-1 fill on mobile, centered on tablet+ */}
      <div className="flex gap-1 sm:gap-2 overflow-x-auto justify-start sm:justify-center flex-1 min-w-0 py-1 scrollbar-thin">
        {props.questions.map((question) => {
          const disabled = !!props.selectedAnswer;
          return (
            <button
              key={question.key}
              onClick={() => !disabled && props.selectAnswer(question.key)}
              className={`
                flex items-center justify-center
                flex-1 sm:flex-none min-w-6 sm:min-w-0
                border border-gray-400
                w-8 h-8 sm:w-10 sm:h-10
                rounded-md
                font-bold text-sm sm:text-base
                transition
                ${
                  disabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                    : "bg-gray-100 text-black cursor-pointer hover:bg-gray-200"
                }
              `}
            >
              {question.key}
            </button>
          );
        })}
      </div>

      {navigationVisibility && (
        <button
          onClick={props.showNext}
          className="p-1.5 sm:p-2 flex justify-center items-center bg-gray-200 hover:bg-gray-300 rounded-md cursor-pointer shrink-0"
        >
          <Image
            src={rightSide}
            width={32}
            height={32}
            alt="Next"
            className="w-6 h-6 sm:w-8 sm:h-8"
          />
        </button>
      )}
    </div>
  );
};

export default ExamFooter;
