import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { readDeck, updateDeck } from '../utils/api';
import Nav from '../Common/Nav';

function DeckEditForm() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState({ name: "", description: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDecks(response);
    };
    loadDeck();
  }, [deckId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(decks);
    navigate(`/decks/${deckId}`);
  };

  const handleChange = ({ target }) => {
    setDecks({
      ...decks,
      [target.name]: target.value,
    });
  };

  return (
    <div>
        <Nav deck={decks}/>
        <h2>Edit Deck</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={decks.name}
                onChange={handleChange}
                required
            />
        </div>
        <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={decks.description}
                onChange={handleChange}
                required
            />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/decks/${deckId}`)}>Cancel</button>
      </form>
    </div>
  );
}

export default DeckEditForm;