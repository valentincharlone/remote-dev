import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
  const { totalNumberOfJobs } = useJobItemsContext();
  return (
    <p className="count">
      <small className="u-bold">{totalNumberOfJobs}</small> results
    </p>
  );
}
