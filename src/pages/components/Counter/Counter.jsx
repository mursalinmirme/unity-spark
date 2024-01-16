import CountUp from 'react-countup';

const Counter = () => {
    return (
        <div className="counter">
            <div className="counter_container">
                <div className='counter_box'>
                    <CountUp end={100} suffix='+' />
                    <h3>Total Employee</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={100} suffix='+' />
                    <h3>Total Employee</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={100} suffix='+' />
                    <h3>Total Employee</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={100} suffix='+' />
                    <h3>Total Employee</h3>
                </div>
            </div>
        </div>
    );
};

export default Counter;