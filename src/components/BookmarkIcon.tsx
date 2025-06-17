import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

type BookmarkIconProps = {
  id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
  const { bookmarkedIds, handleToggleBookmark } = useBookmarksContext();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    handleToggleBookmark(id);
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button onClick={handleClick} className="bookmark-btn">
      <BookmarkFilledIcon
        className={`
        ${bookmarkedIds.includes(id) ? "filled" : ""}
        `}
      />
    </button>
  );
}
