export default function ExamRestartOverlay() {
  return (
    <div
      className="absolute inset-0 z-100 flex flex-col items-center justify-center bg-[#193e4a] animate-fade-in"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      <p className="mt-4 font-georgian text-sm text-white/90">
        ახალი კითხვების ჩატვირთვა...
      </p>
    </div>
  );
}
