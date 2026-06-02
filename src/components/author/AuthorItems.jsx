import NftCard from "../UI/nftCard";

const AuthorItems = ({ collection, profile, loading }) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {(loading ? new Array(8).fill(0) : collection).map((card, i) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
              key={card.id || i}
            >
              <NftCard data={card} loading={loading} profile={profile} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
