import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import EmployeeDesktop from "./EmployeeDesktop";
import EmployeePhone from "./EmployeePhone";

const EmployeeContainer = ({setSelectedUserEmail, setSelectedChat, user, selectedChat, employees, showChat, setShowChat}) => {
    const [myFriends, setMyFriends] = useState([])
    const [sortedEmployees, setShortedEmployees] = useState([])
    const [searchValue, setSearchValue] = useState(null);
    const axiosSecure = useAxiosSecure()
    
    const searchedEmployees = employees?.filter(employee => employee.name.toLowerCase().includes(searchValue?.toLowerCase()))

    useEffect(() => {
        const timeOut = setTimeout(() => {
            axiosSecure.get(`/chat-friends/${user?.email}`)
            .then(res => {
                setMyFriends(res.data)
            })
        }, 200)

        return () => clearTimeout(timeOut)        
    })

    useEffect(() => {
        const combinedArray = [];
    
        myFriends.forEach(friend => {
            const newFriends = employees?.filter(employee => employee.email === friend);
            if (newFriends.length > 0 && !sortedEmployees.some(e => JSON.stringify(e) === JSON.stringify(newFriends))) {
                combinedArray.push(...newFriends);
            }
        });
    
        if (JSON.stringify(combinedArray) !== JSON.stringify(sortedEmployees)) {
            setShortedEmployees(combinedArray);
        }
    }, [myFriends, employees, sortedEmployees]);

    const remainingEmployees = employees.filter(employee =>
        !sortedEmployees.some(sortedEmployee => sortedEmployee.email === employee.email)
    );

    return (
        <>
            <EmployeeDesktop
                remainingEmployees={remainingEmployees}
                setSearchValue={setSearchValue}
                searchValue={searchValue}
                searchedEmployees={searchedEmployees}
                setSelectedUserEmail={setSelectedUserEmail}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                sortedEmployees={sortedEmployees}
            ></EmployeeDesktop>
            {/* <EmployeePhone
                remainingEmployees={remainingEmployees}
                setSearchValue={setSearchValue}
                showChat={showChat}
                searchValue={searchValue}
                searchedEmployees={searchedEmployees}
                setSelectedUserEmail={setSelectedUserEmail}
                setSelectedChat={setSelectedChat}
                selectedChat={selectedChat}
                setShowChat={setShowChat}     
                sortedEmployees={sortedEmployees}               
            ></EmployeePhone> */}
        </>
    );
};

EmployeeContainer.propTypes = {
    user: PropTypes.object,
    setSelectedUserEmail: PropTypes.object,
    setSelectedChat: PropTypes.object,
    selectedChat: PropTypes.object,
    employees: PropTypes.object,
    showChat: PropTypes.object,
    setShowChat: PropTypes.object,
};

export default EmployeeContainer;