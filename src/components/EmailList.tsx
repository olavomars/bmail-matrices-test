import { EmailThread } from "@/types/email";
import { EmailThreadItem } from "./EmailThreadItem";
import { EmptyState } from "./EmptyState";

interface EmailListProps {
  threads: EmailThread[];
  selectedThreadId: string | null;
  onThreadSelect: (threadId: string) => void;
  onToggleStar: (threadId: string) => void;
}

export function EmailList({
  threads,
  selectedThreadId,
  onThreadSelect,
  onToggleStar,
}: EmailListProps) {
  if (threads.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="flex-1 w-full">
      {/* I'm not sure why this white space is here, but the original design has it */}
      <div className="h-10 w-full" />

      {/* Email list */}
      <div className="overflow-y-auto">
        {threads.map((thread) => (
          <EmailThreadItem
            key={thread.id}
            thread={thread}
            isSelected={selectedThreadId === thread.id}
            onSelect={onThreadSelect}
            onToggleStar={onToggleStar}
          />
        ))}
      </div>
    </div>
  );
}
