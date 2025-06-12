import { useEffect, useState } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";

type JobItemApiResponse = {
  public: boolean;
  jobItem: JobItemExpanded;
};

const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  return data;
};

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const totalNumberOfJobs = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);

  useEffect(() => {
    if (!searchText) return;

    const fetchJobsItems = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setIsLoading(false);
      setJobItems(data.jobItems);
    };
    fetchJobsItems();
  }, [searchText]);

  return { jobItemsSliced, isLoading, totalNumberOfJobs };
}

export function useJobItem(id: number | null) {
  const { data, isInitialLoading } = useQuery(
    ["job-item", id],
    () => (id ? fetchJobItem(id) : null),
    {
      staleTime: 1000 * 60 * 60,
      refetchOnWindowFocus: false,
      retry: false,
      enabled: Boolean(id),
      onError: () => {},
    }
  );
  const jobItem = data?.jobItem;
  const isLoading = isInitialLoading;
  return { jobItem, isLoading } as const;
}

export function useActiveJobItem() {
  const activeId = useActiveId();
  const { jobItem } = useJobItem(activeId);
  return jobItem;
}

export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      if (id) {
        setActiveId(id);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}

export function useDebounce(searchText: string) {
  const [debounceValue, setDebounceValue] = useState<string>(searchText);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(searchText);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchText]);

  return debounceValue;
}
