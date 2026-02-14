import Modal from "antd/es/modal/Modal";

type ExamRetryModalProps = {
  handleRestart: () => void;
  mistake: number;
};

const ExamRetryModal = (props: ExamRetryModalProps) => {
  return (
    <Modal
      open
      centered
      closable={false}
      onOk={props.handleRestart}
      cancelButtonProps={{ style: { display: "none" } }}
      okText="თავიდან დაწყება"
    >
      <div className="text-center py-4">
        <h1 className="text-2xl font-bold text-red-600 mb-4">გამოცდა ჩაიჭრა</h1>
        <p className="mb-2">თქვენ დაუშვით {props.mistake} შეცდომა.</p>
        <p className="mb-4">სცადეთ თავიდან.</p>
      </div>
    </Modal>
  );
};

export default ExamRetryModal;
