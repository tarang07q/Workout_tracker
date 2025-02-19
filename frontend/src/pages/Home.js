import { useEffect, useState } from "react";

const Home = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      {workouts.map((workout) => (
        <div key={workout._id}>
          <h2>{workout.title}</h2>
          <p>{workout.load} kg - {workout.reps} reps</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
