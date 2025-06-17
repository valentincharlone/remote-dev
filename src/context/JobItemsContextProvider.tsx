import { createContext, useCallback, useMemo, useState } from "react";
import { RESULT_PER_PAGE } from "../lib/constants";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { SortBy, PageDirection, JobItem } from "../lib/types";

type JobItemsContext = {
  jobItems: JobItem[];
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  totalNumberOfJobs: number;
  totalNumberOfPages: number;
  currentPage: number;
  sortBy: SortBy;
  handleChangePage: (direction: PageDirection) => void;
  handleChangeSortBy: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { debounceSearchText } = useSearchTextContext();
  const { jobItems, isLoading } = useSearchQuery(debounceSearchText);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  const totalNumberOfJobs = jobItems.length;
  const totalNumberOfPages = totalNumberOfJobs / RESULT_PER_PAGE;
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])]?.sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [jobItems, sortBy]
  );

  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted.slice(
        currentPage * RESULT_PER_PAGE - RESULT_PER_PAGE,
        currentPage * RESULT_PER_PAGE
      ),
    [currentPage, jobItemsSorted]
  );

  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);

  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setCurrentPage(1);
    setSortBy(newSortBy);
  }, []);

  const contextValue = useMemo(
    () => ({
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfJobs,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    }),
    [
      jobItems,
      jobItemsSortedAndSliced,
      isLoading,
      totalNumberOfJobs,
      totalNumberOfPages,
      currentPage,
      sortBy,
      handleChangePage,
      handleChangeSortBy,
    ]
  );

  return (
    <JobItemsContext.Provider value={contextValue}>
      {children}
    </JobItemsContext.Provider>
  );
}
