import { formatDistanceToNow } from 'date-fns';

export function formatPostDate(date: Date | number): string {
  const result = formatDistanceToNow(date, { addSuffix: true });
  return result.replace('about', 'posted').replace('less than', 'posted');
}
