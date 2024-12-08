import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJson(jsonString: string): string {
  const cleanedJson = jsonString.replace(/,(\s*[}\]])/g, '$1');
  
  try {
    const parsed = JSON.parse(cleanedJson);
    return JSON.stringify(parsed, null, 2);
  } catch (error) {
    throw error;
  }
}