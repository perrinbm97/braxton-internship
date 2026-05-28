import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "./Skeleton";

const CollectionCard = ({ data }) => {
  const [img, setImg] = useState();
  const mountedRef = useRef(true);

  useEffect(() => {
    const image = new Image();
    image.src = data.nftImage;
    image.onload = () => {
      setTimeout(() => {
        if (mountedRef.current) {
          setImg(image);
        }
      }, 500);
    };
    return () => {
      mountedRef.current = false;
    };
  });

  return (
    <div className="px-2">
      <div className="nft_coll">
        <div className="nft_wrap">
          {img ? (
            <Link to={`/item-details/${data.nftId}`}>
              <img src={data.nftImage} className="lazy img-fluid" alt="" />
            </Link>
          ) : (
            <Skeleton width={"100%"} height={"200px"} />
          )}
        </div>
        <div className="nft_coll_pp">
          {img ? (
            <Link to={`/author/${data.authorId}`}>
              <img className="lazy pp-coll" src={data.authorImage} alt="" />
            </Link>
          ) : (
            <Skeleton width={"50px"} height={"50px"} borderRadius={"50%"} />
          )}
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          {img ? (
            <Link to="/explore">
              <h4>{data.title}</h4>
            </Link>
          ) : (
            <h4>
              <Skeleton width={"100px"} height={"20px"} />
            </h4>
          )}
          {img ? (
            <span>ERC-{data.code}</span>
          ) : (
            <span>
              <Skeleton width={"60px"} height={"20px"} />
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
