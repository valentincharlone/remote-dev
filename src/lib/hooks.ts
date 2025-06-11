import { useEffect, useState } from "react";
import { JobItem } from "./types";
import { BASE_API_URL } from "./constants";

export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return { jobItemsSliced, isLoading };
}

export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<JobItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchJobItem = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setIsLoading(false);
      setJobItem(data.jobItem);
    };
    fetchJobItem();
  }, [id]);

  return { jobItem, isLoading };
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
