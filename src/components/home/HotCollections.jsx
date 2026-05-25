import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";

const HotCollections = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState();

  async function fetchData() {
    setLoading(true);
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
    );
    setCards(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const carouselOptions = {
    loop: true,
    dots: false,
    nav: true,
    lazyLoad: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
      1200: { items: 4 },
    },
  };

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          {!loading ? (
            <ReactOwlCarousel className="owl-theme" {...carouselOptions}>
              {new Array(6).fill(0).map((_, i) => (
                <div className="px-2" key={i}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Skeleton width={"100%"} height={"200px"} />
                    </div>
                    <div className="nft_coll_pp">
                      <Skeleton
                        width={"50px"}
                        height={"50px"}
                        borderRadius={"50%"}
                      />
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <h4>
                        <Skeleton width={"100px"} height={"20px"} />
                      </h4>
                      <span>
                        <Skeleton width={"60px"} height={"20px"} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          ) : (
            <ReactOwlCarousel className="owl-theme" {...carouselOptions}>
              {cards.map((card) => (
                <div className="px-2" key={card.id}>
                  <div className="nft_coll">
                    <div className="nft_wrap">
                      <Link to={`/item-details/${card.nftId}`}>
                        <img
                          src={card.nftImage}
                          className="lazy img-fluid"
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="nft_coll_pp">
                      <Link to={`/author/${card.authorId}`}>
                        <img
                          className="lazy pp-coll"
                          src={card.authorImage}
                          alt=""
                        />
                      </Link>
                      <i className="fa fa-check"></i>
                    </div>
                    <div className="nft_coll_info">
                      <Link to="/explore">
                        <h4>{card.title}</h4>
                      </Link>
                      <span>ERC-{card.code}</span>
                    </div>
                  </div>
                </div>
              ))}
            </ReactOwlCarousel>
          )}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
