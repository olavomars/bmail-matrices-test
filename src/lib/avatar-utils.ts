import { PREDEFINED_AVATARS } from "./constants";

const AVATAR_COLORS = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
  "bg-pink-500",
  "bg-indigo-500",
] as const;

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export function getAvatarColor(name: string): string {
  const index = name.charCodeAt(0) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}

export function getAvatarClassName(
  avatar: string | undefined,
  name: string
): string {
  if (avatar && avatar in PREDEFINED_AVATARS) {
    return PREDEFINED_AVATARS[avatar as keyof typeof PREDEFINED_AVATARS];
  }

  return getAvatarColor(name);
}

export function getAvatarText(
  avatar: string | undefined,
  name: string
): string {
  return avatar || getInitials(name);
}
