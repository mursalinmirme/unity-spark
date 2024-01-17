import goalsImage from '../../../../assets/images/goals.gif'

const Goals = () => {
    
    return (
        <div className='goals'>
            <h2>Our Ambitions Unveiled</h2>
            <p>Explore our vision and aspirations. From fostering innovation to championing customer satisfaction, discover the core objectives that guide our journey towards excellence.</p>
            <img src={goalsImage} alt="GOALS" />
        </div>
    );
};

export default Goals;