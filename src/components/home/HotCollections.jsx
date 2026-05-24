import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";

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

          {cards.length > 0 &&
            cards.map((card) => (
              <div
                className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                key={card.id}
              >
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
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
