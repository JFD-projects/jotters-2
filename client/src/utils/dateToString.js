export function dateToString(milliseconds) {
  const date = new Date(milliseconds)
  // =========================
  // console.log('date:', date)
  // console.log('date.toISOString():', date.toISOString())
  // console.log('date.toDateString():', date.toDateString())
  // console.log('date.toLocaleString():', date.toLocaleString())
  // console.log('date.toLocaleDateString(\'ru-RU\'):', date.toLocaleDateString('ru-RU'))
  // console.log('date.toString():', date.toString())
  // =========================
  return date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU')
}

export function dateToStringForRender(start, end) {
  const startDate = new Date(start)
  const interval = end - startDate

  const diffMinutes = interval / 1000 / 60

  if (diffMinutes < 1) return '1 минуту назад'
  if (diffMinutes < 5) return '5 минут назад'
  if (diffMinutes < 10) return '10 минут назад'
  if (diffMinutes < 30) return '30 минут назад'

  const diffDays = interval / 1000 / 60 / 60 / 24

  const minutes = ('0' + startDate.getMinutes()).slice(-2)
  const hours = ('0' + startDate.getHours()).slice(-2)
  const days = ('0' + startDate.getDate()).slice(-2)
  const months = ('0' + (startDate.getMonth() + 1)).slice(-2)
  const years = startDate.getFullYear()

  if (diffDays < 1) return `${hours}:${minutes}`
  // if (diffDays < 365) return `${days}.${months}`
  return `${days}.${months}.${years}`
}
