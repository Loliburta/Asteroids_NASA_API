import React from "react";
import ReactDom from "react-dom";
import Objects from "./components/Objects";
// SCSS
import "./style.scss";

const Main = () => {
  return <Objects />;
};

ReactDom.render(<Main />, document.getElementById("root"));
