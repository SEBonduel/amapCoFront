import { Link } from "react-router-dom";
import "./profileUser.css";
import avatarimg from "../../assets/default.png";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

function ProfileUser(props) {
  const { user, myRecipes = [], myCartsSubscription = [], myFavoriteRecipes = [] } = props;

  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const itemsPerPage = 8;

  useEffect(() => {
    if (Array.isArray(myFavoriteRecipes) && myFavoriteRecipes.length > 0) {
      const endOffset = itemOffset + itemsPerPage;
      setCurrentItems(myFavoriteRecipes.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(myFavoriteRecipes.length / itemsPerPage));
    } else {
      // Gestion des cas où myFavoriteRecipes est vide ou non défini
      setCurrentItems([]);
      setPageCount(0);
    }
  }, [itemOffset, itemsPerPage, myFavoriteRecipes]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % myFavoriteRecipes.length;
    setItemOffset(newOffset);
  };

  return (
    <div className="container">
      <div className="profile">
        <div className="profile-info">
          <div className="perso-profile-info">
            <span className="user-name">Bonjour {user.nom?.split(" ")[1] || "Utilisateur"}</span>
            <span className="member-since">
              Vous êtes membre depuis le {new Date(user.created_at).toLocaleDateString("fr-FR")}
            </span>
          </div>
          <div className="profile-avatar">
            <img id="User-avatar" src={avatarimg} alt="Avatar utilisateur" />
          </div>
        </div>
      </div>

      <div className="my-recipes">
        <h1 className="my-recipes-title">Vos recettes</h1>
        <hr />
        <div className="my-recipes-items">
          {myRecipes.map((r) => (
            <Link className="link-my-recipes" to={`/recipes/${r.id}`} key={r.id}>
              <div className="my-recipes-item">
                <h2 className="my-recipe-title">{r.titre}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

        <h1 className="my-recipes-title">Paniers auxquels vous êtes abonné(e)s</h1>
        <hr />
      <div className="my-carts-subscription">
      
        {myCartsSubscription.map((c) => (
          <Link to={`/growers/${c.id_producteur}/cart/${c.id_panier}`} key={c.id_panier}>
            <div className="my-carts-subscription-item">
              <img id="my-cart-subcription-img" src={c.img_url} alt={`Panier ${c.nom}`} />
              <div className="title-cart-subscribed">
                <h2 className="cart-name">{c.nom}</h2>
                <h3 className="grower-name">Panier par {c.Nom}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

        <h1 className="my-favorite-recipes-title">Les recettes que vous aimez</h1>
        <hr />
      <div className="my-favorite-recipes">
        <div className="my-recipes-items">
          {currentItems.map((r) => (
            <Link className="link-my-recipes" to={`/recipes/${r.id}`} key={r.id}>
              <div className="my-recipes-item">
                <h2 className="my-recipe-title">{r.titre}</h2>
              </div>
            </Link>
          ))}
        </div>
        <div className="paginationdiv">
          <ReactPaginate
            breakLabel="..."
            nextLabel="Suivante >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="< Précédente"
            renderOnZeroPageCount={null}
            containerClassName="pagination"
            activeClassName="active"
            activeLinkClassName="active-link"
            pageClassName="page-num"
            previousLinkClassName="page-num"
            nextLinkClassName="page-num"
            pageLinkClassName="page-num-link"
            disabledClassName="button-disabled"
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileUser;
