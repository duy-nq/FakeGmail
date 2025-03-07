const formatEmailTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const now = new Date();

  const isToday = date.toDateString() === now.toDateString();
  const isSameYear = date.getFullYear() === now.getFullYear();

  if (isToday) {
      // Format: hh:mm (e.g., "14:30")
      return date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
  } else if (isSameYear) {
      // Format: day Month (e.g., "21 Th2", "17 Th1")
      return `${date.getDate()} Th${date.getMonth() + 1}`;
  } else {
      // Format: dd/mm/yyyy (e.g., "06/07/2024")
      return date.toLocaleDateString("vi-VN");
  }
};

export default formatEmailTimestamp;