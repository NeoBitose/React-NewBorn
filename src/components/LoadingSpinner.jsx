import { FaSpinner } from "react-icons/fa";

function LoadingSpinner({ size = "md", text = "Loading..." }) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-3xl",
    lg: "text-5xl",
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <FaSpinner
        className={`${sizeClasses[size]} animate-spin text-emerald-500 mb-4`}
      />
      {text && <p className="text-gray-600 dark:text-gray-400 text-sm">{text}</p>}
    </div>
  );
}

export default LoadingSpinner;
