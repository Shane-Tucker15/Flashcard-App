import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, createCard } from '../utils/api';
import Nav from '../Common/Nav';

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    };
    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, { front, back });
    setFront("");
    setBack("");
  };

  return (
    <div>
        <Nav deck={deck} />
        <h2>{deck.name}: Add Card</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
                className="form-control"
                id="front"
                rows="3"
                value={front}
                onChange={(e) => setFront(e.target.value)}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
                className="form-control"
                id="back"
                rows="3"
                value={back}
                onChange={(e) => setBack(e.target.value)}
                required
            />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>Done</button>
      </form>
    </div>
  );
}

export default AddCard;
