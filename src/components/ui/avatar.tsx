import { cn } from "@/lib/utils";
import { getAvatarClassName, getAvatarText } from "@/lib/avatar-utils";

interface AvatarProps {
  name: string;
  avatar?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
};

export function Avatar({ name, avatar, size = "md", className }: AvatarProps) {
  const avatarClassName = getAvatarClassName(avatar, name);
  const avatarText = getAvatarText(avatar, name);

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-medium",
        sizeClasses[size],
        avatarClassName,
        className
      )}
    >
      {avatarText}
    </div>
  );
}
