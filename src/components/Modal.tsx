type ModalState = {
  title: string;
  message: string;
};

type ModalProps = {
  modal: ModalState | null;
  onClose: () => void;
};

export function Modal({ modal, onClose }: ModalProps) {
  if (!modal) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id="modalTitle">{modal.title}</h2>
        <p>{modal.message}</p>
        <button type="button" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

export type { ModalState };
