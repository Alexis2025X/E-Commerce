import "../Header/Header.css";
import React from "react";
import logo from "../../assets/img/Logo_digitalmax.png";
import shop from "../../assets/img/icon shop.png";
import user from "../../assets/img/icon user.png";
import searchIcon from "../../assets/img/icon search.png";
import engranaje from "../../assets/img/Icon_engranaje.png";
import { useState } from "react";

import { useLinkClickHandler, useNavigate } from "react-router-dom";
import FormLogin from "../../layout/LayoutCrearCuenta/LayoutCrearCuenta";

import solIcon from "../../assets/img/Sol icon.png";
import lunaIcon from "../../assets/img/luna icon.png";


function Header(prop) {
  const [menu, setMenu] = useState(false);
  const cambioMenu = () => {
    setMenu(!menu);
  };
  const navigate = useNavigate();
  const handleAccessRegistro = () => {
    navigate("/crearCuenta");
    setMenu(false);
  };
  const handleAccessLogin = () => {
    navigate("/Login");
    setMenu(false);
  };
  const handleAccessProduct = () => {
    navigate("/");
    setMenu(false);
  };
  const handleAccessCarrto = () => {
    navigate("/app/carretilla");
    //navigate("/");
    setMenu(false);
  };


  return (
    
    <header className="headerComponent">
      <div onClick={handleAccessProduct}>
        <img className="logoEcommer" src={logo} alt="DigitalMax" />
        <h2>DigitalMax</h2>
      </div>

      <div className="contentInput">
        <input type="search" value={prop.search} onChange={prop.searcher} placeholder="Buscar producto"></input>
        <img src={searchIcon} alt="" />
      </div>
      <div className="headercontenicon">
        <div onClick={handleAccessCarrto}>
          <img src={shop} alt="" />
          <p>$0.00</p>
        </div>
        <div className="headerIconUser">
        <img src={user}  onClick={cambioMenu} />

        </div>
        <ul
          className={`contentMenuHover ${menu ? "contentMenuHoverActive" : ""}`}
        >
          <a onClick={handleAccessRegistro}>
            <li>Registrate</li>
          </a>{" "}
          <hr />
          <a onClick={handleAccessLogin}>
            <li>Iniciar Sesión</li>
          </a>
        </ul>
        {/* <div className="contentIconColor">
          <img src={solIcon} alt="" />
          <img src={lunaIcon} alt="" />
        </div> */}
      </div>
    </header>
  );
}

export default Header;
