import React from "react";
import "./Main.scss";

function Main({ children, ...props }) {
  return (
    <main className="container main-bg" {...props}>
      {children}
    </main>
  );
}

export default Main;
