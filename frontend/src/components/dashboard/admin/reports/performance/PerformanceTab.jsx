import PerformanceRatingChart from "./PerformanceRatingChart";
import PerformanceScoreCard from "./PerformanceScoreCard";

function PerformanceTab() {
  return (
    <div className="reports-grid">

      <PerformanceRatingChart />

      <PerformanceScoreCard />

    </div>
  );
}

export default PerformanceTab;