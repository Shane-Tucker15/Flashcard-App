import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, readCard, updateCard } from '../utils/api';
import Nav from '../Common/Nav';

function EditCard() {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [card, setCard] = useState({ front: "", back: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeckAndCard = async () => {
      const deckResponse = await readDeck(deckId);
      setDeck(deckResponse);
      const cardResponse = await readCard(cardId);
      setCard(cardResponse);
    };

    loadDeckAndCard();
  }, [deckId, cardId]);

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card);
    navigate(`/decks/${deckId}`);
  };

  return (
    <div>
        <Nav deck={deck} />
        <h2>Edit Card</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="front">Front</label>
            <textarea
                className="form-control"
                id="front"
                name="front"
                rows="3"
                value={card.front}
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-group">
            <label htmlFor="back">Back</label>
            <textarea
                className="form-control"
                id="back"
                name="back"
                rows="3"
                value={card.back}
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
      </form>
    </div>
  );

}

export default EditCard;
