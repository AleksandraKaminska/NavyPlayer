import React, { useRef, useState, useEffect } from 'react'
import fetchJsonp from 'fetch-jsonp'
import SearchInput from './SearchInput'
import SearchResults from './SearchResults'
// import './Search.scss'

const SearchPage: React.FC = () => {
  const input = useRef<HTMLInputElement>(null)
  const [results, setResults] = useState({})

  const fetchResults = async (type: 'track' | 'album' | 'artist' | 'playlist', value: string) =>
    await (await fetchJsonp(`https://api.deezer.com/search/${type}?q=${value}&output=jsonp`)).json()

  const handleChange = async (value) => {
    if (value !== '') {
      const tracks = await fetchResults('track', value)
      const albums = await fetchResults('album', value)
      const artists = await fetchResults('artist', value)
      const playlists = await fetchResults('playlist', value)
      setResults({ tracks, albums, artists, playlists })
    }
  }

  useEffect(() => {
    input?.current?.focus()
  }, [input])

  return (
    <div className="searchRoute">
      <SearchInput placeholder="Search" handleChange={handleChange} ref={input} />
      <SearchResults results={results} />
    </div>
  )
}

export default SearchPage
