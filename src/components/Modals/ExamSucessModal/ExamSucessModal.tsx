import Modal from "antd/es/modal/Modal";

type ExamRetryModalProps = {
  handleRestart: () => void;
  mistake: number;
};

const ExamSuccessModal = (props: ExamRetryModalProps) => {
  return (
    <Modal
      open
      centered
      closable={true}
      onOk={props.handleRestart}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="თავიდან დაწყება"
    >
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-greed-600 mb-4">
          თქვენ წარმატებით ჩააბარეთ მართვის მოწმობის თეორიული
        </h1>
        <p className="mb-2">თქვენ დაუშვით {props.mistake} შეცდომა.</p>
        <p className="mb-4">ხელახლა გავლა</p>
      </div>
    </Modal>
  );
};

export default ExamSuccessModal;
