import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const AuthorCard = ({ data, loading }) => {
  return (
    <li>
      <div className="author_list_pp">
        <Link to={`/author/${data.authorId}`}>
          {loading ? (
            <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} />
          ) : (
            <img className="lazy pp-author" src={data.authorImage} alt="" />
          )}
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to={`/author/${data.authorId}`}>
          {loading ? (
            <Skeleton width={"100px"} height={"20px"} />
          ) : (
            data.authorName
          )}
        </Link>
        <span>
          {loading ? (
            <Skeleton width={"40px"} height={"20px"} />
          ) : (
            <>{data.price} ETH</>
          )}
        </span>
      </div>
    </li>
  );
};

export default AuthorCard;
