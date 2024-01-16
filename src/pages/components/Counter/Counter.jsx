import CountUp from 'react-countup';

const Counter = () => {
    return (
        <div className="counter">
            <div className="counter_container">
                <div className='counter_box'>
                    <CountUp end={100} duration={5} suffix='+' />
                    <h3>Total Employees</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={90} duration={5} suffix='+' />
                    <h3>Active Employees</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={10} duration={5} suffix='+' />
                    <h3>Total Job Posts</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={25} duration={5} suffix='+' />
                    <h3>Projects Completed</h3>
                </div>
            </div>
        </div>
    );
};

export default Counter;