import React, { useEffect, useState } from "react";
import "../components/App.css";
import axios from "axios";
const NameColor = () => {
    const [nameColors, setNameColors] = useState([]);
    const [error, setError] = useState(null);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [editingId, setEditingId] = useState(null); // Keep track of which entry is being edited
    const [editingName, setEditingName] = useState("");
    const [editingColor, setEditingColor] = useState("");

    useEffect(() => {
        fetchNameColors();
    }, []);

    // Fetch all the name and color entries
    const fetchNameColors = async () => {
        try {
            const response = await axios.get("/api/name-colors");
            setNameColors(response.data);
        } catch (err) {
            setError("Failed to fetch entries");
        }
    };

    // Handle form submission for adding a new name and color
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            handleEditSubmit();
        } else {
            handleAddSubmit();
        }
    };

    // Handle adding a new name and color
    const handleAddSubmit = async () => {
        try {
            await axios.post("/api/name-colors", { name, color });
            setName("");
            setColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to add entry");
        }
    };

    // Handle editing an existing name and color
    const handleEditSubmit = async () => {
        try {
            await axios.patch(`/api/name-colors/${editingId}`, {
                name: editingName,
                color: editingColor,
            });
            setEditingId(null);
            setEditingName("");
            setEditingColor("");
            fetchNameColors();
        } catch (err) {
            setError("Failed to update entry");
        }
    };

    // Handle deleting a name and color
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/name-colors/${id}`);
            fetchNameColors();
        } catch (err) {
            setError("Failed to delete entry");
        }
    };

    // Handle starting the editing process
    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditingName(item.name);
        setEditingColor(item.color);
    };
    return (
        <div style={{ padding: "20px" }}>
            <h1>Name and Color Manager</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={editingId ? editingName : name}
                    onChange={(e) =>
                        editingId
                            ? setEditingName(e.target.value)
                            : setName(e.target.value)
                    }
                />
                <input
                    type="text"
                    placeholder="Color"
                    value={editingId ? editingColor : color}
                    onChange={(e) =>
                        editingId
                            ? setEditingColor(e.target.value)
                            : setColor(e.target.value)
                    }
                />
                <button type="submit">{editingId ? "Update" : "Add"}</button>
            </form>

            <ul>
                {nameColors.map((item) => (
                    <li key={item.id}>
                        {item.name} - {item.color}
                        <button onClick={() => handleDelete(item.id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default NameColor;
