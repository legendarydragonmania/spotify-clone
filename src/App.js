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

      spotify.getPlaylists().then((playlists) => 
      dispatch
      )
    }
  }, [])

  return (
    <div className='app'>
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  )
}

export default App
