import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { readDeck } from "../utils/api";
import Nav from "../Common/Nav";
import ErrorMessage from "../Common/ErrorMessage";
import HandleDeleteDeck from "../Common/HandleDeleteDeck";
import Card from "../Cards/Card";

const DeckView = () => {
  const [deck, setDeck] = useState({});
  const [error, setError] = useState(undefined);
  const { deckId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();
    readDeck(deckId, abortController.signal)
      .then(setDeck)
      .catch(setError);

    return () => abortController.abort();
  }, [deckId]);

  const handleDeleteCard = (cardId) => {
    setDeck((currentDeck) => ({
      ...currentDeck,
      cards: currentDeck.cards.filter((card) => card.id !== cardId),
    }));
  };

  if (error) {
    return (
      <ErrorMessage error={error}>
        <p>
          <Link to="/">Return Home</Link>
        </p>
      </ErrorMessage>
    );
  }

  return (
    <section className="container">
      <Nav deck={deck} />
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <div className="mb-3">
        <Link to={`/decks/${deckId}/edit`} className="btn btn-secondary mr-2">Edit</Link>
        <Link to={`/decks/${deckId}/study`} className="btn btn-primary mr-2">Study</Link>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary mr-2">Add Cards</Link>
        <HandleDeleteDeck deckId={deckId} />
      </div>
      <h3>Cards</h3>
      <div>
        {deck.cards && deck.cards.length > 0 ? (
          deck.cards.map((card) => (
            <Card key={card.id} card={card} onDelete={handleDeleteCard} />
          ))
        ) : (
          <p>No cards available.</p>
        )}
      </div>
    </section>
  );
};

export default DeckView;