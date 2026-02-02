import React, { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref,
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="inline-block pl-1 mb-1" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`w-full px-4 py-2.5 rounded-lg bg-white text-gray-800 border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition duration-200 ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;
