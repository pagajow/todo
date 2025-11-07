type Props = {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

/**
 * Specialized confirmation modal for delete actions.
 * Displays a message and two buttons (Delete / Cancel).
 */
export default function DeleteModal({message, onConfirm, onCancel, confirmText = "Delete", cancelText = "Cancel"}: Props) {
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
                className="btn btn-danger"
            >{confirmText}</button>
            </div>
        </div>
        </div>
    );
}   

