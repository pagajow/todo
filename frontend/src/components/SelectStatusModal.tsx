import { STATUS_CHOICES } from "../helpers/utils";

type Props = {
  message: string;
  onSelect: (option: string) => void;
  onCancel: () => void;
  cancelText?: string;
};

/**
 * Modal component for selecting a new task status.
 */
export default function SelectStatusModal({message, onSelect, onCancel, cancelText = "Cancel"}: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm w-full">
            <p className="text-gray-800 text-sm mb-6">{message}</p>

            <div className="mb-6 space-y-2">
                {STATUS_CHOICES.map(([value, label]) => (
                    <button
                        key={value}
                        onClick={() => onSelect(value)}
                        className="
                            block w-full select-none
                            px-2 py-2
                            text-left text-base text-gray-800
                            focus:outline-none focus:ring-0"
                    >{label}</button>
                ))}
            </div>

            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="btn btn-secondary"
                >{cancelText}</button>
            </div>
        </div>
        </div>
    );
}   

