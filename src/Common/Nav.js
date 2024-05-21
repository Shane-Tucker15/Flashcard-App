import React from "react";
import { Link, useLocation } from "react-router-dom";

function Nav({ deck }) {
const location = useLocation();

const renderBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const isDeckView = pathSegments.includes("decks");
    const isCardView = pathSegments.includes("cards");
    
    let cardId = null;
    if (isCardView) {
      const cardIndex = pathSegments.indexOf("cards") + 1;
      cardId = pathSegments[cardIndex];
    }

    if (location.pathname.includes("decks/new")) {
      return (
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      );
    }

    return (
      <ol className="breadcrumb">
        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
        {isDeckView && (
          <>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
            </li>
            {pathSegments.includes("study") && (
              <li className="breadcrumb-item active" aria-current="page">Study</li>
            )}
            {pathSegments.includes("edit") && !isCardView && (
              <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            )}
            {pathSegments.includes("new") && (
              <li className="breadcrumb-item active" aria-current="page">Add Card</li>
            )}
            {isCardView && pathSegments.includes("edit") && (
              <li className="breadcrumb-item active" aria-current="page">Edit Card: {cardId}</li>
            )}
          </>
        )}
      </ol>
    );
  };

  return (
    <nav aria-label="breadcrumb">
      {renderBreadcrumbs()}
    </nav>
  );
}

export default Nav;