import React, { useEffect, useState } from "react";
import styles from "./FlashCard.module.css";
import data from "./FlashCardData.js";
import axios from "axios";

const FlashCard = () => {
    const [fav, setFav] = useState([]);
    useEffect(() => {
        let saved = localStorage.getItem("fav") || [];
        setFav(saved);
        console.log(saved);
    }, []);

    async function saveFavourite(data) {
        try {
            let save = await axios.post("/api/savefavword", data);
            setFav((prev) => [...prev, data]);
            localStorage.setItem("fav", JSON.stringify(fav));
            console.log("saved on the database");
        } catch (err) {
            console.log("got this error", err);
        }
    }
    async function removeFavourites(data) {
        try {
            let remove = await axios.post("/api/deletefavword", data);
            setFav((prev) => prev.filter((fav) => fav.wordFi != data.wordFi));
            localStorage.setItem("fav", JSON.stringify(fav));
            console.log("removed from the Backend");
        } catch (err) {
            console.log("got this error, on removing", err);
        }
    }

    function decideDeleteOrAdd(data) {
        if (fav.includes(data.wordFi && data.wordEn)) {
            removeFavourites(data);
        } else {
            saveFavourite(data);
        }
    }
    return (
        <div>
            <h1>I am flashcard here</h1>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {data.map((data, idx) => {
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
                                            color: fav.includes(data.wordFi)
                                                ? "rgb(255, 149, 0)"
                                                : "#bbb",
                                        }}
                                        onClick={() => {
                                            decideDeleteOrAdd(data);
                                        }}
                                    >
                                        ★
                                    </span>

                                    <h3 className={styles.word}>
                                        {data.wordFi}
                                    </h3>
                                    <p className={styles.meaning}>
                                        {data.exampleFi}
                                    </p>
                                </div>

                                <div className={styles.back}>
                                    <span
                                        className={styles.favorite}
                                        style={{
                                            color: fav.includes(data.wordEn)
                                                ? "rgb(255, 149, 0)"
                                                : "#bbb",
                                        }}
                                        onClick={() => {
                                            decideDeleteOrAdd(data);
                                        }}
                                    >
                                        ★
                                    </span>

                                    <h4 className={styles.exampleTitle}>
                                        {data.wordEn}
                                    </h4>
                                    <p className={styles.example}>
                                        {data.exampleEn}
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
