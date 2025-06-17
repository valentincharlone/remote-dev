import { forwardRef } from "react";
import { useBookmarksContext } from "../lib/hooks";
import JobList from "./JobList";
import { createPortal } from "react-dom";

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
  const { booksmarkedJobItems, isLoading } = useBookmarksContext();
  
  return createPortal(
    <div ref={ref} className="bookmarks-popover">
      <JobList jobItems={booksmarkedJobItems} isLoading={isLoading} />
    </div>,
    document.body
  );
});

export default BookmarksPopover;
