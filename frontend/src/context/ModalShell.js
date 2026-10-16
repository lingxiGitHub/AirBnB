import { FiX } from "react-icons/fi";
import { useModal } from "./Modal";

// Standard Airbnb-style modal chrome: centered title, close button, scrollable body.
export default function ModalShell({ title, children, footer, width }) {
    const { closeModal } = useModal();

    return (
        <div className="modal-shell" style={width ? { width } : undefined}>
            <div className="modal-header">
                <button type="button" className="modal-close" onClick={closeModal} aria-label="Close">
                    <FiX />
                </button>
                {title}
            </div>
            <div className="modal-body">{children}</div>
            {footer && <div className="modal-footer">{footer}</div>}
        </div>
    );
}
