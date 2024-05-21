import React from "react";
import { Link } from "react-router-dom";
import HandleDeleteDeck from "../Common/HandleDeleteDeck";

function DeckList({ deck }) {
    return (
        <div key={deck.id} className="card mb-3">
                <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <p className="card-text">{deck.description}</p>
                <p>{deck.cards ? deck.cards.length : 0} cards</p>
                <Link to={`/decks/${deck.id}`} className="btn btn-secondary">View</Link>
                <Link to={`/decks/${deck.id}/study`} className="btn btn-primary">Study</Link>
                <HandleDeleteDeck deckId={deck.id} />
            </div>
        </div>
    );

}

export default DeckList;