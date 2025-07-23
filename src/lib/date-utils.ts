import {
  CURRENT_DATE,
  MS_PER_DAY,
  MS_PER_HOUR,
  HOURS_FOR_RELATIVE_TIME,
} from "./constants";

export function formatEmailListTimestamp(date: Date): string {
  const diffInDays = Math.floor(
    (CURRENT_DATE.getTime() - date.getTime()) / MS_PER_DAY
  );

  if (diffInDays === 0) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatEmailDetailTimestamp(date: Date): string {
  const diffInMs = CURRENT_DATE.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / MS_PER_HOUR);

  const timeAgo =
    diffInHours < HOURS_FOR_RELATIVE_TIME
      ? `${diffInHours} hours ago`
      : `${Math.floor(diffInHours / 24)} days ago`;

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${formattedDate} (${timeAgo})`;
}
