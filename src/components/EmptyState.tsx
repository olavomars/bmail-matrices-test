import React from "react";
import { Mail } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
}

function EmptyStateComponent({
  title = "It's quiet in here",
  description = "There are no messages in this folder.",
  icon: Icon = Mail,
}: EmptyStateProps) {
  return (
    <div className="flex-1 w-full flex items-center justify-center h-full text-gray-400">
      <div className="text-center">
        <Icon className="w-24 h-24 mx-auto mb-4" />
        <p className="text-xl">{title}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}

export const EmptyState = React.memo(EmptyStateComponent);
