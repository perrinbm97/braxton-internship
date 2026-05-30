import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import NftCard from "../UI/nftCard";

const NewItems = () => {
  const [nft, setNft] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
    );
    setNft(data);
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
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <ReactOwlCarousel
            className="owl-theme"
            {...carouselOptions}
            key={loading ? "loading" : "loaded"}
          >
            {(loading ? new Array(7).fill(0) : nft).map((card, i) => (
              <NftCard data={card} key={card.id || i} />
            ))}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default NewItems;
