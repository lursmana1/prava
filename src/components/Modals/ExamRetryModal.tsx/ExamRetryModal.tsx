import Modal from "antd/es/modal/Modal";
import { useTranslations } from "next-intl";

type ExamRetryModalProps = {
  handleRestart: () => void;
  mistake: number;
};

const ExamRetryModal = (props: ExamRetryModalProps) => {
  const t = useTranslations("Exam");

  return (
    <Modal
      open
      centered
      closable={false}
      onOk={props.handleRestart}
      cancelButtonProps={{ style: { display: "none" } }}
      okText={t("restart")}
    >
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">{t("examFailed")}</h1>
        <p className="mb-2">{t("mistakeCount", { count: props.mistake })}</p>
        <p className="mb-4">{t("tryAgain")}</p>
      </div>
    </Modal>
  );
};

export default ExamRetryModal;
