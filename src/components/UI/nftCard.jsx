import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Timer from "./Timer";
import Skeleton from "./Skeleton";

const NftCard = ({ data, loading }) => {
  return (
    <div className="px-2">
      <div className="nft__item">
        <div className="author_list_pp">
          <Link
            to={`/author/${data.authorId}`}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Creator: Monica Lucas"
          >
            {loading ? (
              <Skeleton height={"50px"} width={"50px"} borderRadius={"50%"} />
            ) : (
              <img className="lazy" src={data.authorImage} alt="" />
            )}
          </Link>
          <i className="fa fa-check"></i>
        </div>

        {data.expiryDate && (
          <div className="de_countdown">
            <Timer expiration={data.expiryDate} />
          </div>
        )}

        <div className="nft__item_wrap">
          <div className="nft__item_extra">
            <div className="nft__item_buttons">
              <button>Buy Now</button>
              <div className="nft__item_share">
                <h4>Share</h4>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-facebook fa-lg"></i>
                </a>
                <a href="" target="_blank" rel="noreferrer">
                  <i className="fa fa-twitter fa-lg"></i>
                </a>
                <a href="">
                  <i className="fa fa-envelope fa-lg"></i>
                </a>
              </div>
            </div>
          </div>

          <Link to={`/item-details/${data.nftId}`}>
            {loading ? (
              <Skeleton height={"350px"} width={"100%"} />
            ) : (
              <img
                src={data.nftImage}
                className="lazy nft__item_preview"
                alt=""
              />
            )}
          </Link>
        </div>
        <div className="nft__item_info">
          <Link to={`/item-details/${data.nftId}`}>
            {loading ? (
              <Skeleton height={"30px"} width={"180px"} />
            ) : (
              <h4>{data.title}</h4>
            )}
          </Link>
          <div className="nft__item_price">
            {loading ? (
              <Skeleton height={"20px"} width={"100px"} />
            ) : (
              <>{data.price} ETH</>
            )}
          </div>
          <div className="nft__item_like">
            {loading ? (
              <Skeleton height={"15px"} width={"30px"} />
            ) : (
              <>
                <i className="fa fa-heart"></i>
                <span>{data.likes}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
