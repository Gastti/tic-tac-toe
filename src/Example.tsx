import React, { Fragment, useState } from "react";
import "./App.css";

type FormElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}

function App(): React.JSX.Element {
  const [newTask, setNewTask] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
    console.log(tasks);
  };

  const addTask = (name: string): void => {
    const newTasks: ITask[] = [...tasks, { name, done: false }];
    setTasks(newTasks);
  };

  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setNewTask(e.target.value)}
          value={newTask}
        />
      </form>
      <ul>
        {tasks.map((task: ITask, index: number) => (
          <li key={index}>{task.name}</li>
        ))}
      </ul>
    </Fragment>
  );
}

export default App;
