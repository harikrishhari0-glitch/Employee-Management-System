import "./PerformanceScoreCard.css";

const scores = [
  {
    title: "Code Quality",
    score: 88,
  },
  {
    title: "Delivery",
    score: 92,
  },
  {
    title: "Teamwork",
    score: 85,
  },
  {
    title: "Innovation",
    score: 78,
  },
  {
    title: "Communication",
    score: 90,
  },
];

function PerformanceScoreCard() {
  return (
    <div className="performance-score-card">

      <div className="performance-score-header">
        <h3>Avg Scores by Category</h3>
      </div>

      <div className="score-list">

        {scores.map((item) => (

          <div className="score-item" key={item.title}>

            <div className="score-top">

              <span>{item.title}</span>

              <strong>{item.score}</strong>

            </div>

            <div className="score-bar">

              <div
                className="score-fill"
                style={{
                  width: `${item.score}%`,
                }}
              ></div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default PerformanceScoreCard;