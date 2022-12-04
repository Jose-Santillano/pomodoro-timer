import "./App.css";
import { useState } from "react";

//Components
import Timer from "./components/Timer";
import Settings from "./components/Settings";
import SettingsContext from "./components/SettingsContext";
import Navigation from "./components/Navigation";
import Tasks from "./components/Tasks";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(15);
  const [showTasks, setShowTasks] = useState(false);
  const [addTasks, setAddTasks] = useState([]);

  return (
    <div>
      <Navigation />
      <main>
        <SettingsContext.Provider
          value={{
            showSettings,
            setShowSettings,
            showTasks,
            setShowTasks,
            addTasks,
            setAddTasks,
            workMinutes,
            breakMinutes,
            setWorkMinutes,
            setBreakMinutes,
          }}
        >
          {
            (!showSettings && !showTasks)
              ? <Timer />
              : (showSettings)
                ? <Settings />
                : <Tasks />
          }
        </SettingsContext.Provider>
      </main>
    </div>
  );
}

export default App;
