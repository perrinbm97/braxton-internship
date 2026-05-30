import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorCard from "../UI/AuthorCard";

const TopSellers = () => {
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);

  async function fetchData() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers",
    );
    setAuthors(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {(loading ? new Array(12).fill(0) : authors).map((card, i) => (
                <AuthorCard data={card} loading={loading} key={card.id || i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
