# Finnish Flashcards App

A simple flashcard application built with **Laravel**, **Inertia.js**, and **React** for learning Finnish words with English translations and examples.

---

## Features

-   **Interactive Flashcards**: Click on a card to flip and see the example sentence in Finnish and English.
-   **Favorite Cards**: Mark your favorite cards with a star; favorite status is saved locally and in database as well.
-   **Persistent Favorites**: Favorites are stored in `localStorage` and database to remain even after page reloads.
-   **Preloaded Word Data**: Used a local JavaScript array of Finnish words with English translations and examples (original plan was to use [FinnFast.fi API](https://finnfast.fi), but fallback was implemented due to API issues).

---

## Demo

### Video

[![Demo Video](/public/photos/Flashcard_cards.png)](/public/photos/FlashCard_Video.mov)

### Screenshots

1. ![Screenshot 1](/public/photos/Flashcard_cards.png)
2. ![Screenshot 2](/public/photos/Fac_Cards_Translated.png)
3. ![Screenshot 3](/public/photos/Name&Color.png)
4. ![Screenshot 4](/public/photos/Fav_Database.png)

---

## Technologies Used

-   **Backend**: Laravel
-   **Frontend**: React (via Inertia.js)
-   **Styling**: CSS Modules
-   **State Management**: React `useState` & `useEffect`
-   **HTTP Requests**: Axios

---

## Notes

-   The original requirement was to use the FinnFast.fi API for Finnish words, but it was not working at the time.
-   Instead, a **local JS array** was used for words, translations, and examples.
-   Favorites are synced with both the backend (via API) and localStorage.

---
