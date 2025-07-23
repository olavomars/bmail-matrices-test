import { useState, useMemo, useCallback } from "react";
import { EmailThread } from "@/types/email";
import { getEmailThreads, getFolderCounts } from "@/data/emailData";
import { filterThreadsByFolder } from "@/lib/email-utils";

export interface UseEmailThreadsReturn {
  threads: EmailThread[];
  filteredThreads: EmailThread[];
  folderCounts: {
    inbox: number;
    starred: number;
    all: number;
    spam: number;
    trash: number;
  };
  selectedFolder: string;
  selectedThreadId: string | null;
  selectedThread: EmailThread | null;
  setSelectedFolder: (folder: string) => void;
  setSelectedThreadId: (threadId: string | null) => void;
  markThreadAsRead: (threadId: string) => void;
  toggleStar: (threadId: string, emailId?: string) => void;
  deleteThread: (threadId: string) => void;
  markAsSpam: (threadId: string) => void;
  markAsNotSpam: (threadId: string) => void;
  moveToInbox: (threadId: string) => void;
}

export function useEmailThreads(): UseEmailThreadsReturn {
  const [threads, setThreads] = useState(() => getEmailThreads());
  const [selectedFolder, setSelectedFolder] = useState("inbox");
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  const folderCounts = useMemo(() => getFolderCounts(threads), [threads]);

  const filteredThreads = useMemo(() => {
    return filterThreadsByFolder(threads, selectedFolder);
  }, [threads, selectedFolder]);

  const selectedThread = useMemo(() => {
    return threads.find((thread) => thread.id === selectedThreadId) || null;
  }, [threads, selectedThreadId]);

  const markThreadAsRead = useCallback((threadId: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isRead: true,
              emails: thread.emails.map((email) => ({
                ...email,
                isRead: true,
              })),
            }
          : thread
      )
    );
  }, []);

  const toggleStar = useCallback((threadId: string, emailId?: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id !== threadId) return thread;

        let newEmails = [...thread.emails];

        if (emailId) {
          newEmails = newEmails.map((email) =>
            email.id === emailId
              ? { ...email, isStarred: !email.isStarred }
              : email
          );
        } else {
          if (newEmails.length > 0) {
            const currentlyStarred = newEmails.some((e) => e.isStarred);
            newEmails = newEmails.map((email, index) => ({
              ...email,
              isStarred: currentlyStarred ? false : index === 0,
            }));
          }
        }

        const isThreadStarred = newEmails.some((email) => email.isStarred);

        return {
          ...thread,
          isStarred: isThreadStarred,
          emails: newEmails,
        };
      })
    );
  }, []);

  const deleteThread = useCallback((threadId: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              folder: "trash" as const,
              emails: thread.emails.map((email) => ({
                ...email,
                folder: "trash" as const,
              })),
            }
          : thread
      )
    );
    setSelectedThreadId(null);
  }, []);

  const markAsSpam = useCallback((threadId: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isSpam: true,
              folder: "spam" as const,
              emails: thread.emails.map((email) => ({
                ...email,
                folder: "spam" as const,
              })),
            }
          : thread
      )
    );
    setSelectedThreadId(null);
  }, []);

  const markAsNotSpam = useCallback((threadId: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              isSpam: false,
              folder: "inbox" as const,
              emails: thread.emails.map((email) => ({
                ...email,
                folder: "inbox" as const,
              })),
            }
          : thread
      )
    );
    setSelectedThreadId(null);
  }, []);

  const moveToInbox = useCallback((threadId: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              folder: "inbox" as const,
              emails: thread.emails.map((email) => ({
                ...email,
                folder: "inbox" as const,
              })),
            }
          : thread
      )
    );
    setSelectedThreadId(null);
  }, []);

  const handleFolderSelect = useCallback((folder: string) => {
    setSelectedFolder(folder);
    setSelectedThreadId(null);
  }, []);

  return {
    threads,
    filteredThreads,
    folderCounts,
    selectedFolder,
    selectedThreadId,
    selectedThread,
    setSelectedFolder: handleFolderSelect,
    setSelectedThreadId,
    markThreadAsRead,
    toggleStar,
    deleteThread,
    markAsSpam,
    markAsNotSpam,
    moveToInbox,
  };
}
