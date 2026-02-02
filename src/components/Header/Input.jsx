import React, { useId, forwardRef } from "react";

const Input = forwardRef(
  ({ label, type = "text", className = "", id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    return (
      <div className="w-full">
        {label && (
          <label
            className="inline-block pl-1 mb-1 text-sm font-medium text-gray-700 cursor-pointer"
            htmlFor={id}
          >
            {label}
          </label>
        )}
        <input
          id={id}
          ref={ref}
          type={type}
          className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 focus:ring-2 focus:ring-blue-500 duration-200 border border-gray-200 w-full  ${className}`}
          {...props}
        />
      </div>
    );
  },
);

export default Input;
