type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

/**
 * Generic confirmation modal component.
 * Displays a message and two buttons (Confirm / Cancel).
 */
export default function Modal({message, onConfirm, onCancel, confirmText = "Confirm", cancelText = "Cancel"}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <p className="text-gray-800 text-sm mb-6">{message}</p>

            <div className="flex justify-end gap-3">
            <button
                onClick={onCancel}
                className="btn btn-secondary"
            >{cancelText}</button>
            <button
                onClick={onConfirm}
                className="btn btn-primary"
            >{confirmText}</button>
            </div>
        </div>
        </div>
    );
}   

