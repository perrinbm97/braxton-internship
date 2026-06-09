import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NftCard from "../UI/nftCard";

const ExploreItems = () => {
  const [cards, setCards] = useState([]);
  const [slice, setSlice] = useState(8);
  const [loading, setLoading] = useState();

  async function fetchData(filter) {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filter}`,
    );
    setCards(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData("");
  }, []);

  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => fetchData(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {(loading ? new Array(16).fill(0) : cards)
        .slice(0, slice)
        .map((card, i) => (
          <div
            data-aos="fade"
            data-aos-duration="250"
            key={card.id || i}
            className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
            style={{ display: "block", backgroundSize: "cover" }}
          >
            <NftCard data={card} loading={loading} />
          </div>
        ))}

      <div className="col-md-12 text-center">
        <Link
          to=""
          onClick={() => setSlice((prev) => prev + 4)}
          id="loadmore"
          className="btn-main lead"
          data-aos="fade-up"
        >
          Load more
        </Link>
      </div>
    </>
  );
};

export default ExploreItems;
