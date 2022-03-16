// eslint-disable-next-line
import React, { Fragment } from "react";
import mealsImage from "../../assets/meals.jpg";
import classess from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classess.header}>
        <h1>Ðɛʂī🥗ɱɛɑŁʂ</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classess["main-image"]}>
        <img src={mealsImage} alt="A table full of delicious food!!" />
      </div>
    </Fragment>
  );
};

export default Header;
