export const formatEmailTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isSameYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
    // Format: hh:mm (e.g., "14:30")
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } else if (isSameYear) {
    // Format: day Month (e.g., "21 Th2", "17 Th1")
    return `${date.getDate()} Th${date.getMonth() + 1}`;
  } else {
    // Format: dd/mm/yyyy (e.g., "06/07/2024")
    return date.toLocaleDateString("vi-VN");
  }
};

export function formatEmailDate(timestamp: number): string {
  const now = new Date();
  const date = new Date(timestamp);
  const diffDays = Math.floor((now.getTime() - date.getTime()) / 86400000);

  return diffDays === 0
    ? date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : diffDays === 1
    ? "yesterday"
    : diffDays === 2
    ? "the day before"
    : diffDays < 31
    ? `${diffDays} days ago`
    : date.toLocaleDateString("en-GB");
};

export function overviewExtendedDate(timestamp: number) {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const day = date.getDate().toString()
  const month = date.getMonth() + 1; // Months are 0-based
  const year = date.getFullYear();

  return `${hours}:${minutes} ${day} Th${month} ${year}`;
}
