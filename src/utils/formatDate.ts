export function formatDate(timestamp: string) {
  const date = new Date(timestamp)
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }
  return date.toLocaleDateString('pt-br', options)
}
