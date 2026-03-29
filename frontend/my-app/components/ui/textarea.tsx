import type { TextareaHTMLAttributes } from "react";


export const Textarea = ({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea className={`field field--textarea ${className}`.trim()} {...props} />
);
