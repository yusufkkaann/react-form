import { useState, useEffect } from "react";
import TaskList from "./TaskList";
import { v4 as uuidv4 } from "uuid";
export default function TaskForm() {
  const emptyForm = { task: "", priority: false, isDone: false };
  const [formInput, setFormInput] = useState(emptyForm);
  const [tasks, setTasks] = useState([]); // [{task: "task1", priority: false}, {task: "task2", priority: true}]
  const [taskCount, setTaskCount] = useState(0); // sayfa yenilendiğinde localstorage'dan verileri çekmek için
  useEffect(() => {
    // sayfa yenilendiğinde localstorage'dan verileri çektik
    const localStoragetasks = JSON.parse(localStorage.getItem("tasks"));
    setTasks(localStoragetasks || []);
  }, []);
  useEffect(() => {
    // taskCount state'indeki değişiklikleri takip ettik
    if (taskCount > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [taskCount]);
  function removeTask(id) {
    console.log(id);
    setTasks((prev) => prev.filter((item) => item.id !== id)); // tasks state'inden id'si eşit olmayanları filtreledik
    setTaskCount((prev) => prev + 1);
  }
  function editTask(id) {
    console.log(id);
    const task = tasks.find((item) => item.id === id); //tasks state'inde id'si eşit olanı bulduk
    setFormInput({ ...task, isActive: true }); //formInput state'ine task'ı atadık
    setTaskCount((prev) => prev + 1);
  }
  function doneTask(id) {
    const tasksIndex = tasks.findIndex((item) => item.id === id);
    const task = tasks[tasksIndex];
    task.isDone = !task.isDone;
    const newTasks = tasks.slice();
    newTasks[tasksIndex] = task;
    setTasks(newTasks); //
    console.log(newTasks);
    setTaskCount((prev) => prev + 1);
  }
  const handleFormSubmit = (e) => {
    //formu submit ederken sayfa yenilenmesini engelledik
    e.preventDefault();
    console.log(e.target);
    console.log(formInput);
    if (formInput.isActive) {
      const tasksIndex = tasks.findIndex((item) => item.id === formInput.id);
      const newTasks = tasks.slice();
      newTasks[tasksIndex] = { ...formInput };
      setTasks(newTasks); // State'i güncelle
    }
    if (formInput.task.length > 1) {
      formInput.id = uuidv4(); //formInput'a id ekledik
      setTasks((prev) => [formInput, ...prev]); //tasks state'ine formInput'u ekledik

      console.log(tasks);
    }
    setTaskCount((prev) => prev + 1);
    setFormInput(emptyForm); //formumuzu sıfırladık
    e.target.reset();
  };
  const handleInputChange = (e) => {
    setFormInput((prev) => {
      //form inputlarımızı formInput state'ine atadık
      return {
        ...prev,
        [e.target.name]:
          e.target.type === "checkbox" ? e.target.checked : e.target.value,
      };
    });
  };
  return (
    <>
      <h1>Görev Ekle</h1>
      {/* formu on submit ile gönderdik */}
      <form onSubmit={handleFormSubmit}>
        <div className="row mb-3">
          <label htmlFor="task" className="col-sm-2 col-form-label">
            Task
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="task"
              name="task"
              onChange={handleInputChange}
              value={formInput.task} // formInput state'indeki task'ı value olarak atadık
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-10 offset-sm-2">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="priority"
                name="priority"
                onChange={handleInputChange}
                checked={formInput.priority} //formInput state'indeki priority'i checked olarak atadık
              />
              <label className="form-check-label" htmlFor="priority">
                Öncelikli
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Ekle
        </button>
      </form>
      <hr />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        editTask={editTask}
        doneTask={doneTask}
      />
    </>
  );
}
