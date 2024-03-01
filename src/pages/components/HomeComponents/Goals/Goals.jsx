import goalsImage from "../../../../assets/images/goals.gif";

const Goals = () => {
  // This is a goals page
  return (
    <div className="goals">
      <h2>Ambitions Unveiled</h2>
      <p>Vision: Innovate, Satisfy, Excel - Unveiled Ambitions.</p>
      <img src={goalsImage} alt="GOALS" />
    </div>
  );
};

export default Goals;
