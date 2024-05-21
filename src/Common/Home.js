import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listDecks } from '../utils/api';
import DeckList from '../Decks/DeckList';
import ErrorMessage from "./ErrorMessage";

function Home() {
    const [decks, setDecks] = useState([]);
    const [error, setError] = useState(undefined);

    useEffect(() => {

        const fetchDecks = async () => {
            try {
                const response = await listDecks();
                console.log("Fetched decks:", response);
                setDecks(response);
            } catch (error) {
                setError(error);
            }
        };

        fetchDecks();

    }, []);



    if (error) {
        return <ErrorMessage error={error} />;
    }

    const list = Array.isArray(decks) ? decks.map((deck) => (
        <DeckList key={deck.id} deck={deck} />
    )) : null;

    return (
        <div>
            <Link to="/decks/new" className="btn btn-primary">Create Deck</Link>
            <section className='row'>{list}</section>
        </div>
    );
}

export default Home;
