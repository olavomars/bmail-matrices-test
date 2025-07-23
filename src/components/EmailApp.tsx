import { EmailSidebar } from "./EmailSidebar";
import { EmailList } from "./EmailList";
import { EmailDetail } from "./EmailDetail";
import { useEmailThreads } from "@/hooks/use-email-threads";

export function EmailApp() {
  const {
    filteredThreads,
    folderCounts,
    selectedFolder,
    selectedThreadId,
    selectedThread,
    setSelectedFolder,
    setSelectedThreadId,
    markThreadAsRead,
    toggleStar,
    deleteThread,
    markAsSpam,
    markAsNotSpam,
    moveToInbox,
  } = useEmailThreads();

  const handleThreadSelect = (threadId: string) => {
    setSelectedThreadId(threadId);
    markThreadAsRead(threadId);
  };

  const handleBack = () => {
    setSelectedThreadId(null);
  };

  return (
    <div className="h-screen bg-[#f8fafd]">
      <div className="flex w-full h-full">
        <div className="w-14 bg-[rgb(233,238,246)]" />
        {/* Header */}
        <div className="w-full h-full">
          <div className="w-full">
            <div className="h-16 flex items-center pl-1">
              <div className="flex items-center gap-2">
                <img src="/bmail-logo.webp" alt="Bmail" className="w-28" />
              </div>
            </div>
          </div>

          {/* Main content */}
          <div className="flex h-full max-h-[90vh] pr-14 pb-5">
            <EmailSidebar
              selectedFolder={selectedFolder}
              onFolderSelect={setSelectedFolder}
              folderCounts={folderCounts}
            />

            <div className="flex-1 flex bg-white rounded-xl overflow-hidden">
              {!selectedThread && (
                <EmailList
                  threads={filteredThreads}
                  selectedThreadId={selectedThreadId}
                  onThreadSelect={handleThreadSelect}
                  onToggleStar={toggleStar}
                />
              )}

              <EmailDetail
                thread={selectedThread}
                onBack={handleBack}
                onToggleStar={toggleStar}
                onDelete={deleteThread}
                onMarkAsSpam={markAsSpam}
                onMarkAsNotSpam={markAsNotSpam}
                onMoveToInbox={moveToInbox}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
