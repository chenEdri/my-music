// necessary core imports:
import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'
import { useSelector } from 'react-redux'

//functionality:
import { youtubeService } from '../services/youtube.service'
import { utilService } from '../services/util.service'

// style:
import ReactLoading from 'react-loading'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious'
import SkipNextIcon from '@material-ui/icons/SkipNext'
import VolumeMuteIcon from '@material-ui/icons/VolumeMute'
import VolumeUpIcon from '@material-ui/icons/VolumeUp'

export function Player({ song , songs, getSongToPlay }) {
  const playerRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [volume, setVolume] = useState(0.7)
  const [duration, setDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timePlayed, setTimePlayed] = useState(0)

  useEffect(() => {
    if(playerRef){
      if(!isPlaying) setIsPlaying(true)
      playerRef.current?.seekTo(timePlayed)
    } 
  }, [isSeeking, song])

  //functions:

  const onReady = () => setIsReady(true)

  const showTime = (seconds) => {
    var mins
    var secs
    if (seconds >= 60) {
      mins = parseInt(seconds / 60).toString()
      secs = parseInt(seconds - mins * 60)
        .toString()
        .padStart(2, '0')
    } else {
      mins = '0'
      secs = parseInt(seconds).toString().padStart(2, '0')
    }
    return `${mins}:${secs}`
  }


  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }


  const handleVolumeChange = (volume) => setVolume(+volume)

  const toggleMute = () => setIsMuted(!isMuted)

  const getNextSong = () => {
    const idx = utilService.findIdxById( songs, song.id)
    if(idx && idx < songs.length) getSongToPlay(idx + 1)
  }

  const getPrevSong = () => {
    console.log(songs, song.id);
    const idx = utilService.findIdxById( songs, song.id)
    console.log('idxprev-', idx);
    if(idx) getSongToPlay(idx - 1)
  }

  const handleProgress = (ev) => {
    if (!isSeeking ) {
      setTimePlayed(ev.playedSeconds.toFixed(2))
    }
  }

  const handleDurationChange = ({ target }) => {
    setTimePlayed(parseInt(target.value))
  }

  const handleSeekMouseDown = () => {
    setIsSeeking(true)
  }

  const handleSeekMouseUp = () => {
    setIsSeeking(false)
  }

  const handleDuration = (duration) => setDuration(duration)
  if(!song)  return <ReactLoading type={'cube'} color='#a22b44' />
  const _title =  youtubeService._titleSimplify(song.snippet.title)
  return (
    <React.Fragment>
      <ReactPlayer
        ref={playerRef}
        className='player player-fragment hidden'
        width='600px'
        height='120px'
        url={`https://www.youtube.com/watch?v=${song?.id}` || 'https://www.youtube.com/watch?v=KDIbpeu9Ccw'}
        playing={isPlaying}
        controls={false}
        volume={volume}
        muted={isMuted}
        onReady={onReady}

        // onEnded={handleEnded}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
      <div className='player-container flex align-center'>
        <div className='player-capsule flex align-center'>
          {!isReady ? (
            <ReactLoading type={'cube'} color='#a22b44' />
          ) : (
            <React.Fragment>
              <span className='player-title'>{_title}</span>
              <div className='song-time flex align-center space-between'>
                <span>{showTime(timePlayed)}</span>
                <input
                  className='duration-slider'
                  type='range'
                  name='played'
                  min={0}
                  max={duration}
                  onChange={handleDurationChange}
                  onMouseDown={handleSeekMouseDown}
                  onMouseUp={handleSeekMouseUp}
                  value={timePlayed}
                />

                {duration && <span>{showTime(duration + 1)}</span>}
              </div>
            </React.Fragment>
          )}

          <div className='player-controls flex align-center'>
            <button
              className='player-ctrl-btn flex align-center'
              title='Previous'
              onClick={() => getPrevSong()}
            >
              <SkipPreviousIcon />
            </button>
            <button
              className='player-ctrl-btn flex align-center'
              title={isPlaying ? 'Pause' : 'Play'}
              onClick={togglePlay}
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </button>
            <button
              className='player-ctrl-btn flex align-center'
              title='Next'
              onClick={() => getNextSong()}
            >
              <SkipNextIcon />
            </button>

            <input
              className={`volume-slider ${isMuted ? 'muted' : ''}`}
              type='range'
              default={0.7}
              min={0}
              step={0.05}
              max={1}
              onChange={(ev) => handleVolumeChange(ev.target.value)}
            />
            <button
              className='player-ctrl-btn flex justify-center align-center'
              title={isMuted ? 'Unmute' : 'Mute'}
              onClick={toggleMute}
            >
              {isMuted ? <VolumeMuteIcon /> : <VolumeUpIcon />}
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
