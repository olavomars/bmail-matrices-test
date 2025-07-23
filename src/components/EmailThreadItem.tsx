import React from "react";
import { EmailThread } from "@/types/email";
import { cn } from "@/lib/utils";
import { Star, StarOff } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatEmailListTimestamp } from "@/lib/date-utils";
import {
  getLastEmail,
  getEmailCount,
  getEmailPreview,
  getSenderDisplayName,
} from "@/lib/email-utils";

interface EmailThreadItemProps {
  thread: EmailThread;
  isSelected: boolean;
  onSelect: (threadId: string) => void;
  onToggleStar: (threadId: string) => void;
}

function EmailThreadItemComponent({
  thread,
  isSelected,
  onSelect,
  onToggleStar,
}: EmailThreadItemProps) {
  const lastEmail = getLastEmail(thread);
  const emailCount = getEmailCount(thread);
  const senderDisplayName = getSenderDisplayName(thread);
  const emailPreview = getEmailPreview(thread);

  const handleClick = () => {
    onSelect(thread.id);
  };

  const handleStarClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleStar(thread.id);
  };

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex items-center px-6 py-2 border-b border-gray-200 cursor-pointer hover:shadow-sm transition-all",
        isSelected && "bg-bmail-selected",
        thread.isRead && "bg-gray-50"
      )}
    >
      {/* Star */}
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleStarClick}
            className="mr-4 text-gray-400 hover:text-gray-600"
            aria-label={thread.isStarred ? "Remove star" : "Add star"}
          >
            {thread.isStarred ? (
              <Star className="w-4 h-4 fill-bmail-yellow text-bmail-yellow" />
            ) : (
              <StarOff className="w-4 h-4" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{thread.isStarred ? "Remove star" : "Add star"}</p>
        </TooltipContent>
      </Tooltip>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <span
            className={cn(
              "text-sm mr-4 min-w-0 flex-shrink-0",
              !thread.isRead
                ? "font-bold text-black"
                : "font-normal text-gray-700"
            )}
          >
            {senderDisplayName}
          </span>

          <div className="flex-1 min-w-0 flex">
            <span
              className={cn(
                "text-sm mr-2 flex-shrink-0",
                !thread.isRead
                  ? "font-bold text-black"
                  : "font-normal text-gray-700"
              )}
            >
              {thread.subject}
            </span>
            <span className="text-sm text-gray-500 truncate">
              - {emailPreview}
            </span>
          </div>

          <span className="text-xs text-gray-500 ml-4 flex-shrink-0">
            {formatEmailListTimestamp(thread.lastActivity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export const EmailThreadItem = React.memo(EmailThreadItemComponent);
