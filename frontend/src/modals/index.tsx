import { useModals, destroyAllModals } from "../utils/modal";
import modalData from "../modal";

export default function Modal() {
  const modals = useModals();

  const handleClose = () => {
    destroyAllModals();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={handleClose}
    >
      {modals.map((modal: any) => {
        const m = modalData.find((m: any) => m.name === modal.name);
        return m?.element ? (
          <div
            key={modal.name}
            className="hidden last:block bg-white shadow-lg rounded w-[80%]"
            onClick={(e) => e.stopPropagation()}
          >
            <m.element />
          </div>
        ) : null;
      })}
    </div>
  );
}