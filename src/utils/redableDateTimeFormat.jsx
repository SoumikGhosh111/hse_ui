export const redableDateTimeFormat = (isoDate) => { 
    const parsedDate = new Date(isoDate);
  return parsedDate.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
    timeZone: "UTC", // Adjust timezone as needed
  });
}