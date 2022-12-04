import { useContext, useState, useEffect, useRef } from 'react';

//Herramientas externas
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Howl, Howler } from 'howler';

//Components
import PauseButton from './PauseButton';
import PlayButton from './PlayButton';
import SettingsButton from './SettingsButton';
import SettingsContext from './SettingsContext';

//Sonidos
import soundPlayPause from '../assets/sounds/play-pause.mp3';
import soundCambio from '../assets/sounds/cambio.mp3';
import TasksButton from './TasksButton';

const cian = '#4aecd9';
const green = '#4aec8c';

function Timer() {

    //Usamos el contexto para traer las configuraciones del contador.
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); //work/break/null
    const [secondsLeft, setSecondsLeft] = useState(0);

    //Para hacer referencia al valor principal mediante una referencia.
    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    //Sonidos.
    const playPause = new Audio(soundPlayPause);
    const cambio = new Audio(soundCambio);

    //Función para el contador en reversa.
    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    //Analizamos los cambios y determinamos si esta en el estado work o break.
    useEffect(() => {
    
        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;
            
            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = settingsInfo.workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        //Invervalo del contador.
        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
              cambio.play();
                return switchMode();
            }
            tick();
        }, 1000);

        return () => clearInterval(interval);

    }, [settingsInfo])
    
    //Manejo de los segundos y conversiones de lo que se va a mostrar en el intervalo.
    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;
    
    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
      <div className='container-app'>
        <CircularProgressbar
          value={percentage}
          text={minutes + ":" + seconds}
          styles={buildStyles({
            textColor: "#fff",
            pathColor: mode === "work" ? cian : green,
            tailColor: "rgba(255,255,255,.2)",
          })}
        />
        <div className="container-buttons">
                
          {isPaused ? (
            <PlayButton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
                playPause.play();
              }}
            />
          ) : (
            <PauseButton
              onClick={() => {
                setIsPaused(true);
                  isPausedRef.current = true;
                  playPause.play();
              }}
            />
          )}
        </div>
        <div>
          <TasksButton onClick={() => settingsInfo.setShowTasks(true)} />
          <SettingsButton onClick={() => settingsInfo.setShowSettings(true)} />      
        </div>
      </div>
    );
}

export default Timer;