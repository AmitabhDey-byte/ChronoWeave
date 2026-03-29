import type { InputHTMLAttributes } from "react";


export const Input = ({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) => (
  <input className={`field ${className}`.trim()} {...props} />
);
