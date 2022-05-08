import React from 'react'
import './Body.css'
import Header from './Header'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { useGlobalContext } from './context'
import SongRow from './SongRow'

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useGlobalContext()

  const playPlaylist = (id) => {
    spotify
      .play({
        context_uri: `spotify:playlist:37i9dQZF1E4oH2NG2UyvvJ`,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          })
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          })
        })
      })
  }

  const playSong = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((r) => {
          dispatch({
            type: 'SET_ITEM',
            item: r.item,
          })
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          })
        })
      })
  }

  return (
    <div className='body'>
      <Header spotify={spotify} />

      <div className='body__info'>
        <img src={discover_weekly?.images[0].url} alt='' />
        <div className='body__infoText'>
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>
      <div className='body__songs'>
        <div className='body__icons'>
          <PlayCircleFilledIcon
            className='body__shuffle'
            onClick={playPlaylist('37i9dQZF1E4oH2NG2UyvvJ')}
            style={{ color: '#1ed15e' }}
          />
          <FavoriteIcon fontSize='large' style={{ color: '#1ed15e' }} />
          <MoreHorizIcon />
        </div>
        {discover_weekly?.tracks.items.map((item) => (
          <SongRow track={item.track} playSong={playSong} />
        ))}
      </div>
    </div>
  )
}

export default Body
