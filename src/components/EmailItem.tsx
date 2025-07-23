import React from "react";
import { Email } from "@/types/email";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Star, StarOff } from "lucide-react";
import { formatEmailDetailTimestamp } from "@/lib/date-utils";
import { formatRecipients, getRecipientsTooltip } from "@/lib/email-utils";

interface EmailItemProps {
  email: Email;
  threadId: string;
  isExpanded: boolean;
  onToggleExpansion: (emailId: string) => void;
  onToggleStar: (threadId: string, emailId: string) => void;
}

function EmailItemComponent({
  email,
  threadId,
  isExpanded,
  onToggleExpansion,
  onToggleStar,
}: EmailItemProps) {
  const handleToggleExpansion = () => {
    onToggleExpansion(email.id);
  };

  const handleToggleStar = () => {
    onToggleStar(threadId, email.id);
  };

  return (
    <div className="p-8 border-b border-gray-200 last:mb-0">
      <div className="flex items-start gap-3">
        <Avatar name={email.from.name} avatar={email.from.avatar} />

        <div
          className="flex-1 min-w-0 cursor-pointer"
          onClick={handleToggleExpansion}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium text-gray-900">{email.from.name}</span>
            {isExpanded && (
              <span className="text-sm text-gray-500">
                &lt;{email.from.email}&gt;
              </span>
            )}
          </div>

          {isExpanded && (
            <div className="text-sm text-gray-500">
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-help">
                    to {formatRecipients(email.to)}
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{getRecipientsTooltip(email.to)}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}

          <div className="pl-13 mt-2">
            <div className="text-gray-900 leading-relaxed">{email.body}</div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-500 whitespace-nowrap gap-2">
          {formatEmailDetailTimestamp(email.timestamp)}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleStar}
                className="text-gray-600 hover:text-gray-800"
                aria-label={email.isStarred ? "Remove star" : "Add star"}
              >
                {email.isStarred ? (
                  <Star className="w-4 h-4 fill-bmail-yellow text-bmail-yellow" />
                ) : (
                  <StarOff className="w-4 h-4" />
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{email.isStarred ? "Remove star" : "Add star"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export const EmailItem = React.memo(EmailItemComponent);
