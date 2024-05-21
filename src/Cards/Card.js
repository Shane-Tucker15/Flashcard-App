import React from "react";
import { Link } from "react-router-dom";
import { deleteCard } from "../utils/api";

const Card = ({ card, onDelete }) => {
  
  const handleDeleteCard = () => {
    const confirmDelete = window.confirm("Delete this card?");
    if (confirmDelete) {
      deleteCard(card.id).then(() => {
        onDelete(card.id);
      });
    }
  };

    return (
        <article className="col-12 p-4 border">
            <p>{card.front}</p>
            <p>{card.back}</p>
            <Link to={`/decks/${card.deckId}/cards/${card.id}/edit`} className="btn btn-secondary">Edit</Link>
            <button className="btn btn-danger" onClick={() => handleDeleteCard(card.id)}>
                Delete Card
            </button>
      </article>
    );

};

export default Card;
