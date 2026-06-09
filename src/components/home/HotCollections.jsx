import { useEffect, useState } from "react";
import axios from "axios";
import ReactOwlCarousel from "react-owl-carousel";
import CollectionCard from "../UI/CollectionCard";

const HotCollections = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
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
            <div
              className="text-center"
              data-aos="fade"
              data-aos-duration="1500"
              data-aos-anchor-placement="bottom-bottom"
            >
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <ReactOwlCarousel
            data-aos="fade-up"
            data-aos-duration="750"
            data-aos-anchor-placement="center-bottom"
            className="owl-theme"
            {...carouselOptions}
            key={loading ? "loading" : "loaded"}
          >
            {(loading ? new Array(6).fill(0) : cards).map((card, i) => (
              <CollectionCard data={card} key={card.id || i} />
            ))}
          </ReactOwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
