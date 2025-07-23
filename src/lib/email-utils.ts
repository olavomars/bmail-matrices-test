import { EmailThread } from "@/types/email";
import { EMAIL_PREVIEW_MAX_LENGTH } from "./constants";

export function getLastEmail(thread: EmailThread) {
  return thread.emails[thread.emails.length - 1];
}

export function getEmailCount(thread: EmailThread): string | null {
  return thread.emails.length > 1 ? `(${thread.emails.length})` : null;
}

export function getEmailPreview(
  thread: EmailThread,
  maxLength: number = EMAIL_PREVIEW_MAX_LENGTH
): string {
  const lastEmail = getLastEmail(thread);
  const body = lastEmail.body;

  return body.slice(0, maxLength) + (body.length > maxLength ? "..." : "");
}

export function filterThreadsByFolder(
  threads: EmailThread[],
  folder: string
): EmailThread[] {
  return threads.filter((thread) => {
    switch (folder) {
      case "inbox":
        return thread.folder === "inbox" && !thread.isSpam;
      case "starred":
        return thread.isStarred;
      case "all":
        return !thread.isSpam;
      case "spam":
        return thread.isSpam;
      case "trash":
        return thread.folder === "trash";
      default:
        return true;
    }
  });
}

export function hasUnreadEmails(thread: EmailThread): boolean {
  return thread.emails.some((email) => !email.isRead);
}

export function getSenderDisplayName(thread: EmailThread): string {
  const lastEmail = getLastEmail(thread);
  const emailCount = getEmailCount(thread);
  return `${lastEmail.from.name} ${emailCount || ""}`.trim();
}
