import { Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./Common/Home";
import AddDeck from "./Decks/AddDeck";
import Study from "./Common/Study";
import DeckView from "./Decks/DeckView";
import EditDeck from "./Decks/EditDeck";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import NotFound from "./Layout/NotFound";

function RootRoutes() {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<AddDeck />} />
          <Route path="/decks/:deckId" element={<DeckView />} />
          <Route path="/decks/:deckId/study" element={<Study />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route path="/decks/:deckId/cards/:cardId/edit" element={<EditCard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      );
    }

export default RootRoutes;




//Home >> Create at top + View(DECK) / Study(STUDY) --- Delete(Warning message before deleting) -> Inside existing Deck 
//Study >> include deckId(useParams) / use readDeck() funciton / Link to home followed by name of deck and "Study" "Home/CardDeckName/Study" ----/decks/:deckId/study
                //Cards shown one at a time front side first / A flip button / After Flipping shows a next button
                //At final card show a prompt to restart if not go Home
//NOT ENOUGH CARDS >> If deck has 2 or fewer cards, show not enough cards and a add cards button
//Create >> Form to create with a name and brief description of deck Cancel(HOME) and Submit(Newly created Deck) buttons
//Deck >> Displays all information about the selected deck w/ edit and delete buttons
//Edit >> Shows a form of the existing name and description with a cancel(Deck) and submit button
//Add Card >> Add card to existing deck from front/back Done(Deck) and Save(Updated and cleared) Buttons
//Edit Card >> Form with existing name and description of card Save and Cancel buttons either going back to deck