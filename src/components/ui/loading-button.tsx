"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

export interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  size?: "sm" | "lg" | "default" | "icon" | null | undefined;
  form?: string;
  onClick?: () => void;
  className?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "success"
    | "error"
    | null
    | undefined;
  disabled?: boolean;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  disabled = false,
  children,
  type = "button",
  form = "",
  size = "default",
  onClick,
  className = "",
  variant = "default",
}) => {
  return (
    <Button
      size={size}
      style={{ minWidth: "100px" }}
      type={type}
      form={form}
      onClick={onClick}
      disabled={isLoading || disabled}
      className={className}
      variant={variant}
    >
      {isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : children}
    </Button>
  );
};

export default LoadingButton;
