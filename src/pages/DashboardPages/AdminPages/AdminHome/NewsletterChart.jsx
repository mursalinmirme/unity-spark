import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import moment from "moment";
import PropTypes from "prop-types";

const NewsletterChart = ({subscribers}) => {
    
    const subscriberCounts = {};
    subscribers?.forEach(subscriber => {
        const month = moment(subscriber.created).format('MMMM');
        subscriberCounts[month] = (subscriberCounts[month] || 0) + 1;
    });

    const monthsWithData = Object.keys(subscriberCounts);


    while (monthsWithData.length < 4) {
        const previousMonth = moment().subtract(monthsWithData.length, 'months').format('MMMM');
        if (!monthsWithData.includes(previousMonth)) {
            monthsWithData.unshift(previousMonth);
        }
    }

    const data = monthsWithData.map(month => ({
        name: month,
        uv: subscriberCounts[month] || 0
    }));

    return (
        <div>
            <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

NewsletterChart.propTypes = {
    subscribers: PropTypes.number,
};
  

export default NewsletterChart;