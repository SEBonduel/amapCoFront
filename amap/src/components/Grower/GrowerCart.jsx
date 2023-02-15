import React, { useEffect } from "react";
import "./GrowerCart.css";
import { Link } from "react-router-dom";
import axios from "axios";

function GrowerCart(props) {
  const { cartDetails } = props;
  return (
    <div className="container">
      <div className="cart">
        <h1 className="Cart-Name">{cartDetails[0]?.PanierProducteurNom}</h1>
        <div className="header-cart">
          <img
            className="cartimg"
            src={cartDetails[0]?.img_url}
            alt="CartPicture"
          />

          <h3 className="growername">
            {"Panier proposé par "}
            <Link
              className="backToGrower"
              to={`/growers/${cartDetails[0]?.ProducteurId}`}
            >
              {cartDetails[0]?.ProducteurNom + " " + cartDetails[0]?.prenom}
            </Link>
          </h3>
          <button type="button">S'abonner</button>
        </div>

        <h3 className="titldesc">Description</h3>
        <hr></hr>
        <div className="descriptioncart">
          <span className="description">{cartDetails[0]?.description}</span>
        </div>

        <h2 className="productsTitle">Produits</h2>
        <hr />
        <div className="carts-products-items">
          {cartDetails.map((c) => (
            <div className="cart_products_item">
              <h4>
                <p className="list">
                  ● {c.IngredientNom} : {c.quantite}
                </p>
              </h4>
            </div>
          ))}
        </div>
      </div>
      <div className="associatedRecipes">
        <h3 className="titleAssociatedRecipes">Recettes associées</h3>
        <hr></hr>
      </div>
    </div>
  );
}

export default GrowerCart;
