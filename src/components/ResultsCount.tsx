type ResultsCountProps = {
  totalNumberOfJobs: number;
};

export default function ResultsCount({ totalNumberOfJobs }: ResultsCountProps) {
  return (
    <p className="count">
      <small className="u-bold">{totalNumberOfJobs}</small> results
    </p>
  );
}
