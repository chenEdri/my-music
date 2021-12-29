// necessary core imports:
import React, { useState, useEffect, useRef } from 'react'
import ReactPlayer from 'react-player/youtube'

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

export function Player({ song, songs, getSongToPlay }) {
  const playerRef = useRef()
  const [isReady, setIsReady] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isSeeking, setIsSeeking] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [duration, setDuration] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [timePlayed, setTimePlayed] = useState(0)

  useEffect(() => {
    if (playerRef) {
      if (!isPlaying) setIsPlaying(true)
      playerRef.current?.seekTo(timePlayed)
    }
  }, [isSeeking, song, songs])

  //functions:
  //when the player is ready to be plaed it activate this func
  const onReady = () => setIsReady(true)

  /**
   * @property {Function} showTime - get curr sec and return prefixed to player show
   * @param {number} seconds
   * @returns {String} prefixed time
   */
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

  // switching playin and pause buttons
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // handle volume changed by the user
  const handleVolumeChange = (volume) => setVolume(+volume)

  // switch between mute and unmute
  const toggleMute = () => setIsMuted(!isMuted)

  // informing the App aplication to change to song is playing to the next one
  const getNextSong = () => {
    const idx = utilService.findIdxById(songs, song.id)
    if (idx && idx < songs.length) getSongToPlay(idx + 1)
  }

  // informing the App aplication to change to song is playing to the previous one
  const getPrevSong = () => {
    const idx = utilService.findIdxById(songs, song.id)
    if (idx) getSongToPlay(idx - 1)
  }

  // update the time has been played with a default interval that run in the player
  const handleProgress = (ev) => {
    if (!isSeeking) {
      setTimePlayed(ev.playedSeconds.toFixed(2))
    }
  }

  // update the duration of the song after it has been changed by the user
  const handleDurationChange = ({ target }) => {
    setTimePlayed(parseInt(target.value))
  }

  // changing the boolean variant to true will do two things:
  // 1. Enable the user to change the stram time a new value
  // 2. Prevent the automatic interval function to chang the streaming to another value
  const handleSeekMouseDown = () => {
    setIsSeeking(true)
  }

  // changing the boolean variant to flase will make the automatic interval to be activate again
  const handleSeekMouseUp = () => {
    setIsSeeking(false)
  }

  // update the duration of the song after it has been loaded to the player
  const handleDuration = (duration) => setDuration(duration)

  if (!song) return <ReactLoading type={'cubes'} color='#a22b44' />
  const _title = youtubeService._titleSimplify(song.snippet.title)
  return (
    <React.Fragment>
      <ReactPlayer
        ref={playerRef}
        className='player player-fragment hidden'
        width='600px'
        height='120px'
        url={
          `https://www.youtube.com/watch?v=${song?.id}` ||
          'https://www.youtube.com/watch?v=KDIbpeu9Ccw'
        }
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
              disabled={!songs || !songs.length}
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
              disabled={!songs || !songs.length}
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
              value={volume}
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
