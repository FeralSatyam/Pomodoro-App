import React, {useState, useEffect, useRef} from 'react'
import click from "./assets/click.mp3"
function StopWatch(){

    const [isRunning, setisRunning] = useState(false);
    const [ellapsedTime, setellapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setellapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            clearInterval(intervalIdRef.current);
        }

    }, [isRunning]);

    function playAudio(){
        new Audio(click).play()
    }
    function toggleStartStop(){
        playAudio();
        if(isRunning){
            setisRunning(false);
        } else{
            setisRunning(true);
            startTimeRef.current = Date.now() - ellapsedTime;
        }
    }

    function reset(){
        playAudio();
        setellapsedTime(0);
        setisRunning(false);
    }
    function formatTime(){

        let hours = Math.floor(ellapsedTime / (1000*60*60));
        let minutes = Math.floor(ellapsedTime / (1000*60) % 60);
        let seconds = Math.floor(ellapsedTime / (1000) % 60);
        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }
    return(
        <div className='stop-watch'>
            <div className='display'>
                {formatTime()}
            </div>
            <div className='controls'>
                <button onClick={toggleStartStop} className={`toggle-button ${isRunning ? "stop-state" : "start-state"}`}>
                    {isRunning ? "Stop" : "Start"}
                </button>
                {/* <button onClick={stop} className="stop-button">Stop</button> */}
                <button onClick={reset} className="reset-button">Reset</button>
            </div>
        </div>
    );
}   
export default StopWatch