// Time options with 15-minute intervals from 8:00 AM to 8:00 PM
export const timeOptions = Array.from({ length: 48 }, (_, i) => {
  const hours = Math.floor(i / 4) + 8
  const minutes = (i % 4) * 15
  const period = hours >= 12 ? "PM" : "AM"
  const hour12 = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  return `${hour12.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")} ${period}`
})

/* Convert time to minutes since midnight (e.g., "09:30 PM" -> 1290) */
export const toMin = (t: string) => {
  if (!t) return -1
  const [hm, ap] = t.split(" ")
  let [h, m] = hm.split(":").map(Number)
  if (ap === "PM" && h !== 12) h += 12
  if (ap === "AM" && h === 12) h = 0
  return h * 60 + m
}
