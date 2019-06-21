import React, { Fragment } from 'react'
import Slider from 'rc-slider'
import Sound from 'react-sound'
import { useSelector, useDispatch } from 'react-redux'

import { Creators as PlayerActions } from '../../store/ducks/player'

import {
  Container,
  Current,
  Progress,
  Controls,
  Volume,
  Time,
  ProgressSlider
} from './styles'

import VolumeIcon from '../../assets/images/volume.svg'
import ShuffleIcon from '../../assets/images/shuffle.svg'
import BackwardIcon from '../../assets/images/backward.svg'
import PlayIcon from '../../assets/images/play.svg'
import PauseIcon from '../../assets/images/pause.svg'
import ForwardIcon from '../../assets/images/forward.svg'
import RepeatIcon from '../../assets/images/repeat.svg'

const Player = () => {
  const dispatch = useDispatch()

  const {
    currentSong,
    status,
    position,
    positionShown,
    duration,
    volume
  } = useSelector(state => state.player)

  const progress =
    parseInt(((positionShown || position) * 1000) / duration, 10) || 0

  const msTotime = duration => {
    if (!duration) return null

    let seconds = parseInt((duration / 1000) % 60, 10)
    const minutes = parseInt((duration / (1000 * 60)) % 60, 10)

    seconds = seconds < 10 ? `0${seconds}` : seconds

    return `${minutes}:${seconds}`
  }

  return (
    <Container>
      {!!currentSong && (
        <Sound
          url={currentSong.file}
          playStatus={status}
          onFinishedPlaying={() => dispatch(PlayerActions.next())}
          onPlaying={(position, duration) =>
            dispatch(PlayerActions.playing(position, duration))
          }
          position={position}
          volume={volume}
        />
      )}

      <Current>
        {!!currentSong && (
          <Fragment>
            <img src={currentSong.thumbnail} alt={currentSong.title} />

            <div>
              <span>{currentSong.title}</span>
              <small>{currentSong.author}</small>
            </div>
          </Fragment>
        )}
      </Current>

      <Progress>
        <Controls>
          <button>
            <img src={ShuffleIcon} alt="" />
          </button>
          <button onClick={() => dispatch(PlayerActions.prev())}>
            <img src={BackwardIcon} alt="" />
          </button>

          {!!currentSong && status === Sound.status.PLAYING ? (
            <button onClick={() => dispatch(PlayerActions.pause())}>
              <img src={PauseIcon} alt="Pause" />
            </button>
          ) : (
            <button onClick={() => dispatch(PlayerActions.play())}>
              <img src={PlayIcon} alt="Play" />
            </button>
          )}

          <button onClick={() => dispatch(PlayerActions.next())}>
            <img src={ForwardIcon} alt="" />
          </button>
          <button>
            <img src={RepeatIcon} alt="" />
          </button>
        </Controls>

        <Time>
          <span>{msTotime(positionShown || position)}</span>
          <ProgressSlider>
            <Slider
              railStyle={{ background: '#404040', borderRadius: 10 }}
              trackStyle={{ background: '#1ED760' }}
              handleStyle={{ border: 0 }}
              max={1000}
              onChange={value =>
                dispatch(PlayerActions.handlePosition(value / 1000))
              }
              onAfterChange={value =>
                dispatch(PlayerActions.setPosition(value / 1000))
              }
              value={progress}
            />
          </ProgressSlider>
          <span>{msTotime(duration)}</span>
        </Time>
      </Progress>

      <Volume>
        <img src={VolumeIcon} alt="volume" />
        <Slider
          railStyle={{ background: '#404040', borderRadius: 10 }}
          trackStyle={{ background: '#fff' }}
          handleStyle={{ display: 'none' }}
          value={volume}
          onChange={volume => dispatch(PlayerActions.setVolume(volume))}
        />
      </Volume>
    </Container>
  )
}

export default Player
