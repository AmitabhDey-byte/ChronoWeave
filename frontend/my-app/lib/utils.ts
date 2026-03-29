import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * cn() — Class Name Utility
 * Combines class names safely
 * Fixes Tailwind conflicts
 * Used across UI components
 */

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
