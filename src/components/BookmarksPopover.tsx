import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";

export default function BookmarksPopover() {
  const { booksmarkedJobItems, isLoading } = useBookmarksContext();
  return (
    <div className="bookmarks-popover">
      <JobList jobItems={booksmarkedJobItems} isLoading={isLoading} />
    </div>
  );
}
