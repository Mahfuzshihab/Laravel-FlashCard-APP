import { useState, useEffect } from "react";
import axios from "axios";
import "../components/App.css";
import FlashCard from "./FlashCard";
import NameColor from "./NameColor";
function App() {
    const [flashcard, setFlashcard] = useState(false);

    return (
        <>
            <div className="container">
                {flashcard ? (
                    <>
                        <button
                            onClick={() => {
                                setFlashcard((prev) => !prev);
                            }}
                        >
                            See Name Color App
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => {
                                setFlashcard((prev) => !prev);
                            }}
                        >
                            See FlashCard
                        </button>
                    </>
                )}
                {flashcard ? (
                    <>
                        <FlashCard></FlashCard>
                    </>
                ) : (
                    <>
                        <NameColor></NameColor>
                    </>
                )}
            </div>
        </>
    );
}

export default App;
