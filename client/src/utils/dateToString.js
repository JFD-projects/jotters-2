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
