import { useEffect, useState } from "react";

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        const fetchWorkouts = async () => {
            try {
                const response = await fetch(process.env.REACT_APP_API_URL);
                const data = await response.json();
                setWorkouts(data);
            } catch (error) {
                console.error("Error fetching workouts:", error);
            }
        };
        fetchWorkouts();
    }, []);

    return (
        <div>
            <h2>Workouts</h2>
            {workouts.length === 0 ? (
                <p>No workouts available</p>
            ) : (
                <ul>
                    {workouts.map((workout) => (
                        <li key={workout._id}>
                            <strong>{workout.title}</strong> - {workout.load}kg for {workout.reps} reps
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorkoutList;
