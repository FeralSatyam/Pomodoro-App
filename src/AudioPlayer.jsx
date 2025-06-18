import { useState, useRef, useEffect } from "react"

function AudioPlayer(){
    const [volume, setVolume] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);
    
    useEffect(() => {
        const audio = audioRef.current;
        if(audio){
            audio.volume = volume / 100;
        }
    }, [volume]);

    // Handle autoplay with user interaction
    const handlePlay = async () => {
        const audio = audioRef.current;
        if(audio) {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                console.log('Autoplay blocked:', error);
                setIsPlaying(false);
            }
        }
    };

    const handlePause = () => {
        const audio = audioRef.current;
        if(audio) {
            audio.pause();
            setIsPlaying(false);
        }
    };

    return(
        <div>
            <audio 
                ref={audioRef} 
                src="src/assets/rainmusic.mp3"
                loop
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />
            <div className="audio-control">
                {/* Add play/pause button */}
                <button onClick={isPlaying ? handlePause : handlePlay}>
                    {isPlaying ? '||' : '▶'}
                </button>
                
                <input 
                    type="range" 
                    min="0"
                    max="100"
                    step="1"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                />
            </div>
        </div>
    );
}
export default AudioPlayer