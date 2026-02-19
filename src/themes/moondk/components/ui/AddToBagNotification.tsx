import { useEffect, useState } from "react";
import { Check } from "lucide-react";

interface AddToBagNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  productName: string;
}

export const AddToBagNotification = ({
  isVisible,
  onClose,
  productName,
}: AddToBagNotificationProps) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto-close after 3 seconds

      return () => clearTimeout(timer);
    } else {
      // Delay removal to allow fade-out animation
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 flex items-end justify-center pb-4 pointer-events-none ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } transition-all duration-300`}
    >
      <div className="bg-white rounded-lg shadow-lg border border-border p-3 max-w-xs mx-4 pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <Check className="h-3.5 w-3.5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-body font-medium text-foreground">
              Added to Bag
            </p>
            <p className="text-[10px] font-body font-light text-muted-foreground mt-0.5 truncate">
              {productName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
