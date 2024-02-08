import { useParams } from "react-router-dom";

const AdminBlogDetails = () => {
  const { id } = useParams();
  console.log(id);
  return <div>details {id}</div>;
};

export default AdminBlogDetails;
