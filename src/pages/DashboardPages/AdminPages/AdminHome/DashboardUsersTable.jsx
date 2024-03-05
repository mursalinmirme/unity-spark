import PropTypes from "prop-types";

const DashboardUsersTable = ({user}) => {
    return (
        <tr className="border-b-2 text-base">
            <td className="!text-left !border-none">
                <div className="avatar flex justify-start">
                    <div className="mask mask-squircle w-10 h-10">
                        <img className="rounded-full" src={user.image} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td className="text-left !border-none">{user?.name}</td>
            <td className="text-left !border-none">{user?.email}</td>
            <td className="text-left !border-none">{user?.gender ? user?.gender : 'Not Set'}</td>
        </tr>
    );
};

DashboardUsersTable.propTypes = {
    user: PropTypes.object
};

export default DashboardUsersTable;