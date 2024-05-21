import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { readDeck } from '../utils/api';
import Nav from "../Common/Nav";

function Study() {
  const { deckId } = useParams();
  const [decks, setDecks] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDecks(response);
    };
    loadDeck();
  }, [deckId]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (currentCardIndex + 1 < decks.cards.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
        setCurrentCardIndex(0);
        setIsFlipped(false);
      } else {
        navigate("/");
      }
    }
  };

  if (!decks.cards) {
    return (
        <div>
            <Nav deck={decks} />
            <p>Loading...</p>;
        </div>
    )
  }

  if (decks.cards.length <= 2) {
    return (
      <div>
        <Nav deck={decks}/>
        <h2>{decks.name}: Study</h2>
        <h3>Not enough cards.</h3>
        <p>You need at least 3 cards to study. There are {decks.cards.length} cards in this deck.</p>
        <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">Add Cards</Link>
      </div>
    );
  }

  const card = decks.cards[currentCardIndex];

  return (
    <div>
        <Nav deck={decks} />
        <h2>{decks.name}: Study</h2>
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Card {currentCardIndex + 1} of {decks.cards.length}</h5>
                <p className="card-text">{isFlipped ? card.back : card.front}</p>
                <button className="btn btn-secondary" onClick={handleFlip}>Flip</button>
                {isFlipped && (
                    <button className="btn btn-primary" onClick={handleNext}>Next</button>
                )}
            </div>
        </div>
    </div>
  );
}

export default Study;
