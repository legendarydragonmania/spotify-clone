import React, { useEffect, useState } from 'react'
import './App.css'
import Login from './Login'
import { getTokenFromUrl } from './spotify'
import SpotifyWebApi from 'spotify-web-api-js'
import Player from './Player'
import { useGlobalContext } from './context'

const spotify = new SpotifyWebApi()

function App() {
  const [{ user, token }, dispatch] = useGlobalContext()

  useEffect(() => {
    const hash = getTokenFromUrl()
    window.location.hash = ''
    const _token = hash.access_token
    if (_token) {
      dispatch({ type: 'SET_TOKEN', token: _token })
      spotify.setAccessToken(_token)

      spotify.getMe().then((user) =>
        dispatch({
          type: 'SET_USER',
          user: user,
        })
      )

      spotify.getUserPlaylists().then((playlists) =>
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists,
        })
      )

       spotify.getMyTopArtists().then((response) =>
         dispatch({
           type: 'SET_TOP_ARTISTS',
           top_artists: response,
         })
       )

       dispatch({
         type: 'SET_SPOTIFY',
         spotify: spotify,
       })

      spotify.getPlaylist('37i9dQZF1E4oH2NG2UyvvJ').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        })
      })
    }
  }, [token, dispatch])

  return (
    <div className='app'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  )
}

export default App
