export function toDateTimeString(date: string | Date): string {
  const workingDate = typeof date === 'string' ? new Date(date) : date;
  return workingDate.toLocaleString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    second: '2-digit',
    minute: '2-digit',
    timeZone: 'America/Los_Angeles'
  });
}

export function toDateString(date: string | Date): string {
  const workingDate = typeof date === 'string' ? new Date(date) : date;
  return workingDate.toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
}

export function toTimeString(date: string | Date): string {
  const workingDate = typeof date === 'string' ? new Date(date) : date;
  return workingDate.toLocaleTimeString(undefined, {
    dateStyle: 'medium'
  });
}