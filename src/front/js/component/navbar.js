import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState(store.starWarsFavorites);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setFavorites(store.starWarsFavorites);
  }, [store.starWarsFavorites]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        const dropdownMenu =
          dropdownRef.current.querySelector(".dropdown-menu");
        dropdownMenu.classList.remove("show");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Star_Wars_Logo.svg/2560px-Star_Wars_Logo.svg.png"
            style={{ width: "100px" }}
          ></img>
        </Link>
        <div className="ml-auto">
          <div className="dropdown" ref={dropdownRef}>
            <button
              className="btn btn-primary dropdown-toggle"
              type="button"
              onClick={(e) => {
                const dropdownMenu = e.currentTarget.nextElementSibling;
                dropdownMenu.classList.toggle("show");
              }}
            >
              Favorites
              <span className="badge text-bg-secondary">
                {favorites.length}
              </span>
            </button>
            <ul className="dropdown-menu">
              {favorites && favorites.length > 0 ? (
                <>
                  {favorites.map((item, index) => {
                    return (
                      <li className="dropdown-item d-flex justify-content-between align-items-center">
                        <Link to={item.url + item.uid} className="item-name">
                          <span className="item-name">{item.name}</span>
                        </Link>
                        <i
                          className="btn fa-solid fa-trash-can fa-lg"
                          onClick={() => {
                            actions.removeFavorite(index);
                          }}
                        ></i>
                      </li>
                    );
                  })}
                </>
              ) : (
                <>empty</>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
