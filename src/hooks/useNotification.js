import { useState } from "react";

export const useNotification = () => {
  const [showToast, setShowToast] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [validationAlert, setValidationAlert] = useState(null);
  const [isValidationExiting, setIsValidationExiting] = useState(false);

  const showSuccessToast = () => {
    setShowToast(true);
    setIsExiting(false);
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setShowToast(false);
      }, 400);
    }, 3000);
  };

  const showValidationAlert = (message, type = "warning") => {
    setValidationAlert({ message, type });
    setIsValidationExiting(false);
    setTimeout(() => {
      setIsValidationExiting(true);
      setTimeout(() => {
        setValidationAlert(null);
      }, 400);
    }, 3000);
  };

  return {
    showToast,
    isExiting,
    validationAlert,
    isValidationExiting,
    showSuccessToast,
    showValidationAlert,
  };
};
