import { Button } from "antd";
import Modal from "antd/es/modal/Modal";
import { useTranslations } from "next-intl";

type ExamSuccessModalProps = {
  handleRestart: () => void;
  passed: boolean;
  durationSeconds: number;
  correctCount: number;
  totalCount: number;
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const ExamSuccessModal = (props: ExamSuccessModalProps) => {
  const t = useTranslations("Exam");

  return (
    <Modal
      open
      centered
      closable={true}
      onOk={props.handleRestart}
      cancelButtonProps={{ style: { display: "none" } }}
      okText={t("restart")}
    >
      <div className="text-center py-4">
        <h1
          className={`text-2xl font-bold mb-4 ${
            props.passed ? "text-green-600" : "text-red-600"
          }`}
        >
          {props.passed ? t("examPassed") : t("examFailed")}
        </h1>
        <p className="mb-2">
          {props.correctCount}/{props.totalCount} (
          {Math.round((props.correctCount / props.totalCount) * 100)}%)
        </p>
        {props.durationSeconds > 0 && (
          <p className="mb-4 text-slate-600">
            {formatDuration(props.durationSeconds)}
          </p>
        )}
        <p className="mb-4">{t("retake")}</p>
      </div>
    </Modal>
  );
};

export default ExamSuccessModal;
