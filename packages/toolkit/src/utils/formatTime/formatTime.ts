import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export interface FormatTimeOptions {
  format?: string;
  locale?: string;
  fallback?: string;
}

/**
 * @description
 * `formatTime` is a utility function that formats a date or string input into a formatted date string.
 * It uses dayjs for parsing and formatting, with support for custom format, locale, and fallback.
 *
 * @param {string | Date} input - The date or date string to format.
 * @param {FormatTimeOptions} options - Configuration options for formatting.
 * @returns {string} The formatted date string.
 *
 * @example
 * formatTime('2024-06-01'); // "2024.06.01"
 * formatTime(new Date(), { format: 'YYYY/MM/DD', locale: 'en' }); // e.g. "2024/06/01"
 * formatTime('', { fallback: 'N/A' }); // "N/A"
 */
export function formatTime(input: string | Date, options: FormatTimeOptions = {}): string {
  const { format = 'YYYY.MM.DD', locale = 'ko', fallback } = options;

  if (!input) {
    return fallback ?? '-';
  }

  const date = dayjs(input);

  if (!date.isValid()) {
    return fallback ?? 'Invalid Date';
  }

  return date.locale(locale).format(format);
}
