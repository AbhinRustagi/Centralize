import { toast } from "react-toastify";

const Toast = (
  text = "The Programmer forgot to put the notification here.",
  type = "general"
) => {
  const styles = {
    success: {
      backgroundColor: "#D3E4CD",
      color: "#121212",
      fontFamily: "inherit",
      borderRadies: "0",
      border: "1px solid #121212",
    },
    danger: {
      backgroundColor: "#FFBCBC",
      color: "#121212",
      fontFamily: "inherit",
      borderRadies: "0",
      border: "1px solid #121212",
    },
    general: {
      backgroundColor: "#f6eabe",
      color: "#121212",
      fontFamily: "inherit",
      borderRadies: "0",
      border: "1px solid #121212",
    },
  };

  toast(text, {
    style: { ...styles[type] },
  });

  return;
};

export default Toast;
