import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteDeck } from "../utils/api";

const HandleDeleteDeck = ({ deckId }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Delete this deck?')) {
      await deleteDeck(deckId);
      navigate("/");
    }
  }

  return (
    <button onClick={handleDelete} className="btn btn-danger">
      Delete Deck
    </button>
  );
};

export default HandleDeleteDeck;
