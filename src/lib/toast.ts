'use client';

import React from "react";
import { toast } from "sonner";
import { CheckCircle, XCircle, AlertTriangle, Info } from "lucide-react";

type ShowToastParams = {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    description?: string;
    duration?: number;
}

// Custom styling for different toast types
const toastStyles = {
  success: {
    style: { backgroundColor: "#22c55e", borderColor: "#16a34a", color: "white", fontWeight: "bold" },
    icon: () => React.createElement(CheckCircle, { 
      className: "h-5 w-5 text-white"
    }),
    defaultDuration: 3000
  },
  error: {
    style: { backgroundColor: "#ef4444", borderColor: "#dc2626", color: "white", fontWeight: "bold" },
    icon: () => React.createElement(XCircle, { 
      className: "h-5 w-5 text-white"
    }),
    defaultDuration: 4000
  },
  warning: {
    style: { backgroundColor: "#f59e0b", borderColor: "#d97706", color: "white", fontWeight: "bold" },
    icon: () => React.createElement(AlertTriangle, { 
      className: "h-5 w-5 text-white"
    }),
    defaultDuration: 4000
  },
  info: {
    style: { backgroundColor: "#3b82f6", borderColor: "#2563eb", color: "white", fontWeight: "bold" },
    icon: () => React.createElement(Info, { 
      className: "h-5 w-5 text-white"
    }),
    defaultDuration: 3500
  }
};

export const showToast = ({ type, title, description, duration }: ShowToastParams) => {
  toast[type](title, {
    description,
    duration: duration ?? toastStyles[type].defaultDuration,
    style: toastStyles[type].style,
    icon: toastStyles[type].icon(),
    position: "top-right",
    classNames: {
      closeButton: "text-white bg-red-500 fill-red-500",
      actionButton: "text-white bg-red-500 fill-red-500",
      cancelButton: "text-white bg-red-500 fill-red-500",
      title: "text-white font-bold text-sm",
      description: "text-white text-xs",
    }
  });
};
