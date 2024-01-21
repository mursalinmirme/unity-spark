import { useState } from 'react';
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';

const Counter = () => {
    const [startCount, setstartCount] = useState(false);
  
    const handleCounter = (isVisible) => {
      if (isVisible && !startCount) {
        setstartCount(true);
      }
    };

    return (
        <div className="counter">
            <div className="counter_container">
                <div className='counter_box'>
                    <CountUp end={1000} duration={5} suffix='+' start={startCount} >
                    {({ countUpRef }) => (
                        <VisibilitySensor onChange={handleCounter} delayedCall>
                            <span ref={countUpRef} />
                        </VisibilitySensor>
                    )}
                    </CountUp>
                    <h3>Total Employees</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={980} duration={5} suffix='+' start={startCount} >
                        {({ countUpRef }) => (
                            <VisibilitySensor onChange={handleCounter} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                    <h3>Active Employees</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={20} duration={5} suffix='+' start={startCount} >
                        {({ countUpRef }) => (
                            <VisibilitySensor onChange={handleCounter} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                    <h3>Total Job Posts</h3>
                </div>
                <div className='counter_box'>
                    <CountUp end={125} duration={5} suffix='+' start={startCount} >
                        {({ countUpRef }) => (
                            <VisibilitySensor onChange={handleCounter} delayedCall>
                                <span ref={countUpRef} />
                            </VisibilitySensor>
                        )}
                    </CountUp>
                    <h3>Projects Completed</h3>
                </div>
            </div>
        </div>
    );
};

export default Counter;