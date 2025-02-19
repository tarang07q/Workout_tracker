import { useState } from "react";

const WorkoutForm = () => {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const workout = { title, load, reps };

        try {
            const response = await fetch(process.env.REACT_APP_API_URL, {
                method: "POST",
                body: JSON.stringify(workout),
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error("Failed to add workout");
            }

            setTitle("");
            setLoad("");
            setReps("");
            setError(null);
            console.log("New workout added!");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>
            <label>Title:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

            <label>Load (kg):</label>
            <input type="number" value={load} onChange={(e) => setLoad(e.target.value)} required />

            <label>Reps:</label>
            <input type="number" value={reps} onChange={(e) => setReps(e.target.value)} required />

            <button type="submit">Add Workout</button>

            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
};

export default WorkoutForm;
