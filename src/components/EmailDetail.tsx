import { EmailThread } from "@/types/email";
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EmailItem } from "./EmailItem";
import { useEmailExpansion } from "@/hooks/use-email-expansion";

interface EmailDetailProps {
  thread: EmailThread | null;
  onBack: () => void;
  onToggleStar: (threadId: string, emailId: string) => void;
  onDelete: (threadId: string) => void;
  onMarkAsSpam: (threadId: string) => void;
  onMarkAsNotSpam: (threadId: string) => void;
  onMoveToInbox: (threadId: string) => void;
}

export function EmailDetail({
  thread,
  onBack,
  onToggleStar,
  onDelete,
  onMarkAsSpam,
  onMarkAsNotSpam,
  onMoveToInbox,
}: EmailDetailProps) {
  const { expandedEmails, toggleEmailExpansion } = useEmailExpansion(thread);

  if (!thread) {
    return null;
  }

  const renderActionButtons = () => {
    if (thread.folder === "trash") {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMoveToInbox(thread.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              Move to inbox
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restore this email to your inbox</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    if (thread.isSpam) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkAsNotSpam(thread.id)}
              className="text-gray-600 hover:text-gray-800"
            >
              Not spam
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as not spam and move to inbox</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(thread.id)}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Delete thread"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete this conversation</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onMarkAsSpam(thread.id)}
              className="text-gray-600 hover:text-gray-800"
              aria-label="Mark as spam"
            >
              <AlertTriangle className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Mark as spam</p>
          </TooltipContent>
        </Tooltip>
      </>
    );
  };

  return (
    <div className="flex-1 bg-white">
      {/* Header */}
      <div className="h-16 flex items-center px-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mr-4 text-gray-600 hover:text-gray-800"
              aria-label="Go back to email list"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Back to email list</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex items-center gap-2">{renderActionButtons()}</div>
      </div>

      {/* Subject */}
      <h1 className="text-lg font-normal text-gray-800 truncate px-8">
        {thread.subject}
      </h1>

      {/* Email content */}
      <div className="flex-1 overflow-y-auto">
        {thread.emails.map((email) => (
          <EmailItem
            key={email.id}
            email={email}
            threadId={thread.id}
            isExpanded={expandedEmails[email.id] || false}
            onToggleExpansion={toggleEmailExpansion}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>
    </div>
  );
}
