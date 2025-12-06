import React, { useEffect, useState } from "react";
import styles from "./FlashCard.module.css";
import data from "./FlashCardData.js";
import axios from "axios";

const FlashCard = () => {
    const [fav, setFav] = useState([]);
    useEffect(() => {
        let saved = JSON.parse(localStorage.getItem("fav")) || [];
        setFav(saved);
    }, []);

    async function saveFavourite(data) {
        try {
            let save = await axios.post("/api/savefavword", data);
            setFav((prev) => {
                let updated = [...prev, data];
                localStorage.setItem("fav", JSON.stringify(updated));
                return updated;
            });
            console.log("saved on the database");
        } catch (err) {
            console.log("got this error", err);
        }
    }
    async function removeFavourites(data) {
        try {
            let remove = await axios.post("/api/deletefavword", data);
            setFav((prev) => {
                let updated = prev.filter((fav) => fav.wordFi != data.wordFi);
                localStorage.setItem("fav", JSON.stringify(updated));
                return updated;
            });
            console.log("removed from the Backend");
        } catch (err) {
            console.log("got this error, on removing", err);
        }
    }

    function decideDeleteOrAdd(data) {
        let IsArrayExist = fav.filter((single) => {
            return single.wordEn == data.wordEn && single.wordFn == data.wordFn;
        });
        console.log(IsArrayExist.length !== 0);
        if (IsArrayExist.length == 0) {
            saveFavourite(data);
        } else {
            removeFavourites(data);
        }
    }
    return (
        <div>
            <h1>I am flashcard here</h1>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {data.map((card, idx) => {
                    return (
                        <div className={styles.card} key={idx}>
                            <input
                                type="checkbox"
                                id={`flip-${idx}`}
                                className={styles.flipToggle}
                            />

                            <label
                                htmlFor={`flip-${idx}`}
                                className={styles.inner}
                            >
                                <div className={styles.front}>
                                    <span
                                        className={styles.favorite}
                                        style={{
                                            color: fav.some(
                                                (c) => c.wordFi === card.wordFi
                                            )
                                                ? "rgb(255, 149, 0)"
                                                : "#bbb",
                                        }}
                                        onClick={() => {
                                            decideDeleteOrAdd(card);
                                        }}
                                    >
                                        ★
                                    </span>

                                    <h3 className={styles.word}>
                                        {card.wordFi}
                                    </h3>
                                    <p className={styles.meaning}>
                                        {card.exampleFi}
                                    </p>
                                </div>

                                <div className={styles.back}>
                                    <span
                                        className={styles.favorite}
                                        style={{
                                            color: fav.some(
                                                (c) => c.wordEn === card.wordEn
                                            )
                                                ? "rgb(255, 149, 0)"
                                                : "#bbb",
                                        }}
                                        onClick={() => {
                                            decideDeleteOrAdd(card);
                                        }}
                                    >
                                        ★
                                    </span>

                                    <h4 className={styles.exampleTitle}>
                                        {card.wordEn}
                                    </h4>
                                    <p className={styles.example}>
                                        {card.exampleEn}
                                    </p>
                                </div>
                            </label>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FlashCard;
