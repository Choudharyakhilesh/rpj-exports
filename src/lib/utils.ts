import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const formatDateTimeToDDMMYY = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // convert to 12-hour format
  const formattedHours = String(hours).padStart(2, '0');

  return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
};

export const formatDateTimeToDDMMMYYYY = (dateString: string): string => {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, '0');

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = months[date.getMonth()];

  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const formattedHours = String(hours).padStart(2, '0');

  return `${day} ${month} ${year} ${formattedHours}:${minutes} ${ampm}`;
};


export function objectToQueryString<T extends Record<string, unknown>>(
  params: T,
  prefix = ''
): string {
  return Object.keys(params)
    .map((key) => {
      const value = params[key];
      const paramKey = prefix ? `${prefix}[${key}]` : key;

      if (value === null || value === undefined) {
        return '';
      }
      if (typeof value === 'object' && !Array.isArray(value)) {
        return objectToQueryString(value as Record<string, unknown>, paramKey);
      }
      return `${encodeURIComponent(paramKey)}=${encodeURIComponent(String(value))}`;
    })
    .filter(Boolean)
    .join('&');
}