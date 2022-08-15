import { useState } from "react";

function Menu() {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div id="menu">
      {isExpanded ? (
        <>
          <div id="menu-expanded">
            <h3 style={{color: "white", marginTop: "0px", paddingTop: "10px"}}>TRAID</h3>
            <button className="menu-buttons" onClick={() => setExpanded(false)}>
                hide
            </button>
            <button className="menu-buttons">
                Log out
            </button>
            <button className="menu-buttons">
                Option 1
            </button>
            <button className="menu-buttons">
                Option 2
            </button>
          </div>
        </>
      ) : (
        <>
          <button id="open-menu-button" onClick={() => setExpanded(true)}>Menu</button>
        </>
      )}
    </div>
  );
}

export default Menu;
