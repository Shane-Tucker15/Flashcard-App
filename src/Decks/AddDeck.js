import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createDeck } from '../utils/api';
import Nav from '../Common/Nav';

function AddDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = await createDeck({ name, description });
    navigate(`/decks/${newDeck.id}`);
  };

  return (
    <div>
      <Nav deck={0} />
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input 
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate("/")}>Cancel</button>
      </form>
    </div>
  );
}

export default AddDeck;
