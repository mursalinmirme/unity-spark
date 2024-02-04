import { Link } from 'react-router-dom';
import eventCover from '../assets/images/event_page/event_original.jpg'
const Events = () => {
  const eventStyles = {
    background:`linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)),url(${eventCover})`,
    backgroundSize:`cover`,
    backgroundRepeat:`no-repeat`,
    backgroundPosition:`center`
    

  }
    return (
        <div style={eventStyles}>
           <div className='space-y-5 py-20'>
                
                <div className='text-center'>
                <div className='bg-[#424343] text-white rounded-full px-5 py-[4px]  text-center uppercase inline'>Events</div>
                </div>
                <h1 className='text-center text-5xl font-semibold text-white leading-relaxed'>HR Mastery Symposium Unleashing
                <br />Potential in People Management</h1>
                <h1 className='text-center text-xl font-normal text-white  leading-relaxed'>Explore our HR-centric events, designed to elevate your knowledge and foster <br /> connections. Join us for insightful discussions, workshops, and networking<br /> opportunities to enhance your human resource management skills. </h1>
                <div className='flex items-center justify-center gap-10'>
                    <Link to="/signup" className='nbtn mt-3'>Register Now</Link>
                    <button className='nbtn mt-3'>Explore Events</button>
                </div>
           </div>
        </div>
    );
};

export default Events;