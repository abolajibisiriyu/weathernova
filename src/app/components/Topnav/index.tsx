import React from "react";

import { Nav } from "./styles";
import { ReactComponent as Icon } from "app/assets/images/full-moon.svg";
import SearchInput from "../SearchInput";
import { Link } from "react-router-dom";

const Topnav: React.FC = (props) => {
  return (
    <Nav>
      <Link to="" className="logo text-24">
        <Icon />
        <span>Weathernova</span>
      </Link>
      <SearchInput />
    </Nav>
  );
};

export default Topnav;
