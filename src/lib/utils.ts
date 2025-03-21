import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const convertMs = (ms: number): string => {
  if (ms >= 60000) {
    return `${ms / 60000} Phút`; // Convert to minutes
  }
  return `${ms / 1000} giây`; // Convert to seconds
};