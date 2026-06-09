import { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [profile, setProfile] = useState();
  const [collection, setCollection] = useState([]);
  const [following, setFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  async function fetchAuthors() {
    setLoading(true);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`,
    );
    setAuthor(data);
    setCollection(data.nftCollection);
    setProfile(data.authorImage);
    setLoading(false);
  }

  useEffect(() => {
    fetchAuthors()
  }, []);

  function follow() {
    setFollowing((prev) => !prev);
    if (!following) {
      author.followers++;
    } else {
      author.followers--;
    }
  }

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <Skeleton
                          height={"150px"}
                          width={"150px"}
                          borderRadius={"50%"}
                        />
                      ) : (
                        <img src={author.authorImage} alt="" />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <Skeleton width={"200px"} />
                          ) : (
                            author.authorName
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <Skeleton width={"100px"} />
                            ) : (
                              "@" + author.tag
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <Skeleton width={"250px"} />
                            ) : (
                              author.address
                            )}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">
                        {loading ? (
                          <Skeleton width={"150px"} height={"40px"} />
                        ) : (
                          author.followers + " followers"
                        )}
                      </div>
                      {!loading && (
                        <Link
                          to="#"
                          onClick={() => follow()}
                          className="btn-main"
                        >
                          {following ? "Unfollow" : "Follow"}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems
                    collection={collection}
                    profile={profile}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
