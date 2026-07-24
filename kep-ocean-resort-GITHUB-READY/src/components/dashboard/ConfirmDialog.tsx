import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/Button';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, confirmLabel = 'Confirm', onConfirm, onCancel }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4" onClick={onCancel}>
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 mb-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-600"><AlertTriangle className="h-5 w-5" /></span>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
        </div>
        <p className="text-sm text-charcoal-600 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="outlineLight" size="sm" onClick={onCancel}>Cancel</Button>
          <Button variant="danger" size="sm" onClick={onConfirm}>{confirmLabel}</Button>
        </div>
      </div>
    </div>
  );
}
