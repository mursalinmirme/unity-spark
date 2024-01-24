
const EmployeeProfileEdit = () => {
    return (
        <div>
            <form>
                <div className='grid grid-cols-2 gap-5'>
                    <div>
                        <label>Your Name</label>
                        <input type="text" placeholder='Enter your name...' />
                    </div>                        
                    <div>
                        <label>Your Photo</label>
                        <input type="text" />
                    </div>                        
                </div>
                <div className='mt-3'>
                    <label>Your Email</label>
                    <input type="text" placeholder='Enter your email...' />
                </div>  
            </form>
        </div>
    );
};

export default EmployeeProfileEdit;