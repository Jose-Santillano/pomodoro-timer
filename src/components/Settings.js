import { useContext } from 'react';
import ReactSlider from 'react-slider';
import '../assets/css/slider.css';
import BackButton from './BackButton';
import SettingsContext from './SettingsContext';

function Settings() {

    const settingsInfo = useContext(SettingsContext);

    return (
        <div className="container-settings">
            <h2>Settings</h2>
            <label htmlFor="">
                Work minutes: {settingsInfo.workMinutes}:00
            </label>
            <ReactSlider
                className={'slider'}
                thumbActiveClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label htmlFor="">
                Break minutes: {settingsInfo.breakMinutes}:00
            </label>
            <ReactSlider
                className={'slider green'}
                thumbActiveClassName={'thumb'}
                trackClassName={'track'}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                value={settingsInfo.breakMinutes}
                min={1}
                max={120}
            />
            <div className='container-backbutton'>
                <BackButton onClick={() => { settingsInfo.setShowSettings(false)}} />
            </div>
        </div>
    );
}

export default Settings;