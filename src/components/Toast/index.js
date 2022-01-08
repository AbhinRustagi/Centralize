import { toast } from "react-toastify";

const Toast = (
  text = "The Programmer forgot to put the message here.",
  type = "general"
) => {
  const styles = {
    success: {
      backgroundColor: "#ECFCCB",
      color: "#121212",
      fontFamily: "inherit",
      borderRadies: "0",
      border: "1px solid #121212",
    },
    danger: {
      backgroundColor: "#FCA5A5",
      color: "#121212",
      fontFamily: "inherit",
      borderRadies: "0",
      border: "1px solid #121212",
    },
    general: {
      backgroundColor: "#FFEDD5",
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
