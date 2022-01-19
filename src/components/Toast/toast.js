import { toast } from "react-toastify";

const Toast = (
  text = "The Programmer forgot to put the notification here.",
  type = "general"
) => {
  const styles = {
    success: {
      background: "linear-gradient(to bottom,#4ade80,#22c55e)",
      color: "#fff",
    },
    danger: {
      background: "linear-gradient(to bottom,#f87171,#ef4444)",
      color: "#fff",
    },
    general: {
      background: "linear-gradient(to bottom,#60a5fa,#3b82f6)",
      color: "#fff",
    },
  };

  toast(text, {
    style: { ...styles[type] },
  });

  return;
};

export default Toast;
