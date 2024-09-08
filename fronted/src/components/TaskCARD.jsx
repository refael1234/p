import { useState, useEffect } from "react";

const stageNames = [
  "First mission",
  "Second mission",
  "Third mission",
  "Fourth mission",
  "Fifth mission",
  "Finish"
];

export function TaskCard({ task, onBack, onStageChange }) {
  const [stage, setStage] = useState(() => {
    const savedStage = localStorage.getItem(`stage-${task.id}`);
    return savedStage ? JSON.parse(savedStage) : 0;
  });

  useEffect(() => {
    localStorage.setItem(`stage-${task.id}`, JSON.stringify(stage));
    onStageChange(task.id, stage); 
  }, [stage, task.id, onStageChange]);

  const addStage = () => {
    setStage((prevStage) => (prevStage < stageNames.length - 1 ? prevStage + 1 : prevStage));
  };

  const reduceStage = () => {
    setStage((prevStage) => (prevStage > 0 ? prevStage - 1 : prevStage));
  };

  return (
    <div>
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Task Details</h2>
      <p><strong>Product Name:</strong> {task.name}</p>
      <p><strong>Lead Name:</strong> {task.companyName}</p>
      <p><strong>Telephone:</strong> {task.telephone}</p>
      <p><strong>Email:</strong> {task.email}</p>
      <p>
        <button onClick={reduceStage}>-</button>
        <strong>Stage:</strong> {stageNames[stage]}
        <button onClick={addStage}>+</button>
      </p>
    </div>
  );
}
