import React, { useState, useRef, useEffect } from "react";
import { Bell, X, ChevronRight } from "lucide-react";
import { Icon } from "@iconify/react";

interface Notification {
  id: number;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  icon?: any;
  color?: string;
}

interface NotificationModalProps {
  notifications?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
}

export default function NotificationModal({
  notifications,
  onNotificationClick,
}: NotificationModalProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Sample notification data
  const defaultNotifications: Notification[] = [
    {
      id: 1,
      title: "New property submitted for credit",
      description:
        "There's a new property submitted for credit that you can review.",
      time: "2 hr",
      isRead: false,
      icon: <Icon
        icon="hugeicons:city-01"
        width="20"
        height="20"
        
      />,
      color: "bg-purple-100",
    },
    {
      id: 2,
      title: "Ultra Regular for Property",
      description: "View the last record and insert new results on the system.",
      time: "4 hr",
      isRead: false,
       icon: <Icon
        icon="hugeicons:city-01"
        width="20"
        height="20"
        
      />,
      color: "bg-purple-100",
    },
    {
      id: 3,
      title: "Eye Yoto Joined the Platform",
      description:
        "Welcome the new user to the platform. Review the profile and actions.",
      time: "2 day",
      isRead: false,
       icon: <Icon icon="solar:user-linear" width="20" height="20"   />,
      color: "bg-blue-100",
    },
    {
      id: 4,
      title: "Refund carried for Recharge",
      description:
        "Admin has refunded payment of $2000 dollars for property secured.",
      time: "2 day",
      isRead: false,
      icon: <Icon icon="iconamoon:gift" width="20" height="20"   />,
      color: "bg-green-100",
    },
  ];

  const notificationData = notifications || defaultNotifications;
  const unreadCount = notificationData.filter((n) => !n.isRead).length;

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

  const handleNotificationClick = (notification: Notification) => {
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
  };

  return (
    <>
      {/* Notification Bell Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="relative w-10! h-10 bg-white rounded-full flex items-center justify-center"
      >
        <Icon
          icon="lets-icons:bell"
          width="20"
          height="20"
          style={{ color: "#36393F" }}
        />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#DF1C41] rounded-full"></span>
        )}
      </button>

      {/* Modal Overlay with Blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-[#21212140] bg-opacity-40 backdrop-blur-xs z-[101] flex items-start justify-end pt-16 pr-4"
          onClick={handleBackdropClick}
        >
          {/* Modal Content */}
          <div
            ref={modalRef}
            className="bg-white rounded-lg shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in slide-in-from-right duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Notifications
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-purple-600 text-sm font-medium hover:text-purple-700 transition-colors"
              >
                Mark all as read
              </button>
            </div>

            {/* Notifications List */}
            <div className="max-h-[32rem] overflow-y-auto">
              {notificationData.map((notification) => (
                <button
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  className="w-full cursor-pointer flex items-start gap-3 px-5 py-4 hover:bg-gray-50 transition-colors text-left border-b border-gray-100 last:border-b-0"
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-[8px] bg-[#F5F5F5] flex items-center justify-center flex-shrink-0 text-lg text-[#7D00FF]`}
                  >
                    {notification.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">
                      {notification.title}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mb-1">
                      {notification.description}
                    </p>
                    <span className="text-xs text-gray-400">
                      {notification.time}
                    </span>
                  </div>

                  {/* Arrow */}
                  <span className=" w-2 h-2 bg-[#DF1C41] rounded-full"></span>
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-200 bg-gray-50">
              <button className="w-full text-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">
                View all notifications
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
