import React, { useContext } from "react";
import AddButton from "./AddButton";

import BackButton from "./BackButton";
import SettingsContext from "./SettingsContext";
import TasksButton from "./TasksButton";

function Tasks() {
  const settingsInfo = useContext(SettingsContext);

  return (
    <div className="container-tasks">
      <h2>Tasks</h2>
      <div className="options">
        <div className="option-item">
          <label>Title</label>
          <input type="text" id="title" className="option-input" />
        </div>
        <div className="option-item">
          <label>Description</label>
          <input type="text" id="description" className="option-input" />
        </div>
        <div className="container-backbutton">
                  <AddButton onClick={() => {
                      let obj = { name: document.getElementById("title").value, description: document.getElementById("description").value };

                      settingsInfo.setAddTasks(addTasks.push(obj));
                  }} />
        </div>
      </div>
      <div className="container-backbutton">
        <BackButton onClick={() => settingsInfo.setShowTasks(false)} />
      </div>
    </div>
  );
}

export default Tasks;
