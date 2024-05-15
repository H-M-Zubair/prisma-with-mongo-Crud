"use client";
import { Span } from "next/dist/trace";
import React, { Children, Component, ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitButton = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

function FormSubmitButton({ children, className,...props }: FormSubmitButton) {
  const { pending } = useFormStatus();
  return (
    <div>
      <button 
      {...props}
      type="submit" disabled={pending} className={`btn btn-primary ${className}`}>
        {pending && (
          <span>
            <span className="loading loading-dots loading-md"></span>
          </span>
        )}{" "}
        {children}
      </button>
    
    </div>
  );
}

export default FormSubmitButton;
