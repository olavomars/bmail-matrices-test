import { useState, useEffect, useCallback } from "react";
import { EmailThread } from "@/types/email";

export interface UseEmailExpansionReturn {
  expandedEmails: Record<string, boolean>;
  toggleEmailExpansion: (emailId: string) => void;
}

export function useEmailExpansion(
  thread: EmailThread | null
): UseEmailExpansionReturn {
  const [expandedEmails, setExpandedEmails] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    if (thread && thread.emails.length > 0) {
      const lastEmailId = thread.emails[thread.emails.length - 1].id;
      setExpandedEmails({ [lastEmailId]: true });
    } else {
      setExpandedEmails({});
    }
  }, [thread]);

  const toggleEmailExpansion = useCallback((emailId: string) => {
    setExpandedEmails((prev) => ({
      ...prev,
      [emailId]: !prev[emailId],
    }));
  }, []);

  return {
    expandedEmails,
    toggleEmailExpansion,
  };
}
