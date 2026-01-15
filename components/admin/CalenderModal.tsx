import React, { useState, useRef, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Icon } from "@iconify/react";

interface CalendarModalProps {
  onDateSelect?: (date: Date | undefined) => void;
  selectedDate?: Date;
}

export default function CalendarModal({
  onDateSelect,
  selectedDate: initialDate,
}: CalendarModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(initialDate || new Date());
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  // Close modal when clicking on backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (onDateSelect) {
      onDateSelect(selectedDate);
    }
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "Select date";
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      {/* Calendar Trigger Button */}
      
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm"
      >
        <CalendarIcon size={18} className="text-gray-600" />
        <span className="text-sm font-medium text-gray-700">
          {formatDate(date)}
        </span>
      </button>

      {/* Modal Overlay with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#21212140] bg-opacity-40 backdrop-blur-xs z-101 flex items-start justify-center pt-20"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200"
          >
            {/* Calendar Component */}
            <div className="p-4 w-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border-0 w-[320px]"
              />
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-end gap-2 px-4 pb-4 pt-2 border-t border-gray-200">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md transition-colors"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
