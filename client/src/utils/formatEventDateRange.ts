export function formatEventDateRange(startDateStr: string, endDateStr: string): string {
  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  const sameDay = start.toDateString() === end.toDateString();

  const optionsDate = { weekday: "short", day: "numeric", month: "short" } as const;
  const optionsTime = { hour: "2-digit", minute: "2-digit", hour12: true } as const;
  const optionsDateTime = { ...optionsDate, ...optionsTime } as const;
  // if same day we show sth like: Sun, 12 May, 2.00PM-4PM; if not we show full range
  if (sameDay) {
    const datePart = start.toLocaleDateString("en-AU", optionsDate);
    const startTime = start.toLocaleTimeString("en-AU", optionsTime);
    const endTime = end.toLocaleTimeString("en-AU", optionsTime);
    return `${datePart}, ${startTime} - ${endTime}`;
  } else {
    const startFull = start.toLocaleDateString("en-AU", optionsDateTime);
    const endFull = end.toLocaleDateString("en-AU", optionsDateTime);
    return `${startFull} - ${endFull}`;
  }
}
