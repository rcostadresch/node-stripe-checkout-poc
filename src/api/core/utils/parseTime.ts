export const parseTime = (t: string): Date | void => {
  if (!t) return
  const d = new Date()
  const time = t.match(/(\d+)(?::(\d\d))?\s*(p?)/)
  d.setHours(parseInt(time[1]) + (time[3] ? 12 : 0))
  d.setMinutes(parseInt(time[2]) || 0)
  d.setSeconds(0)
  return d
}
