import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/nftCard";

const ExploreItems = () => {
  const [cards, setCards] = useState([]);
  const [slice, setSlice] = useState(8);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore",
    );
    setCards(data);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {cards.length > 0 &&
        cards.slice(0, slice).map((card) => (
          <div
            key={card.id}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftCard data={card} />
          </div>
        ))}

      <div className="col-md-12 text-center">
        <Link
          to=""
          onClick={() => setSlice((prev) => prev + 4)}
          id="loadmore"
          className="btn-main lead"
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
