import React, { useEffect, useState } from "react";
export default function TaskList({
  tasks,
  removeTask,
  editTask,
  doneTask,
  task,
}) {
  const [priority, setPriority] = useState(false);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const handlePriorityFilter = () => {
    setPriority((prev) => !prev);
    console.log(priority);
  };
  useEffect(() => {
    // setFilteredTasks(tasks) ile tasks state'ini filteredTasks state'ine atadık
    setFilteredTasks(tasks);
  }, [tasks]);
  useEffect(() => {
    priority
      ? setFilteredTasks(tasks.filter((item) => item.priority === true))
      : setFilteredTasks(tasks); // priority true ise priority true olanları filtrele
  }, [priority, tasks]);
  return (
    <>
      {/* görevleri task dizisinin içinden map kullanarak listeledik  */}
      <div className="bg-light p-4 border rounded">
        <h2>
          Görevler{" "}
          <span
            onClick={handlePriorityFilter}
            className="btn btn-warning float-end"
          >
            {!priority ? "Öncelikli olanları göster" : "Hepsini Göster"}
          </span>
        </h2>
        <ul className="list-group">
          {filteredTasks.map((item) => (
            <li
              className={`list-group-item ${
                item.isDone && "bg-success bg-gradient"
              }`}
              key={item.id}
            >
              {item.priority ? (
                <span class="badge bg-secondary me-4">Öncelikli</span>
              ) : (
                ""
              )}
              {item.task}
              <span
                onClick={() => removeTask(item.id)}
                className="btn btn-danger float-end"
              >
                Sil
              </span>
              <span
                onClick={() => editTask(item.id)}
                className="btn btn-primary float-end me-2"
              >
                Düzenle
              </span>
              <span
                onClick={() => doneTask(item.id)}
                className="btn btn-primary float-end me-2"
              >
                Bitti
              </span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
