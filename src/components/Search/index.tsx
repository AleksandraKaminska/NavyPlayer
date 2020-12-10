import React, { useRef, useState, useEffect } from 'react'
import fetchJsonp from 'fetch-jsonp'
import SearchInput from '../SearchInput/SearchInput'
// import Login from '../Login'
// import Nav from '../Nav'
// import Player from '../Player'
// import SearchResults from '../SearchResults'
// import Footer from '../Footer'
// import './search.scss'

const SearchPage: React.FC = () => {
  const input = useRef<any>(null)
  const [results, setResults] = useState({})
  const [value, setValue] = useState('')

  const fetchResults = (type) =>
    fetchJsonp(`https://api.deezer.com/search/${type}?q=${value}&output=jsonp`)
      .then((resp) => resp.json())
      .then(({ data }) => setResults({ ...results, [type + 's']: data }))

  const handleChange = (value) => {
    setValue(value)
    if (value !== '') {
      fetchResults('track')
      fetchResults('album')
      fetchResults('artist')
      fetchResults('playlist')
    }
  }

  useEffect(() => {
    input?.current?.focus()
  }, [input])

  return (
    <div className="searchRoute">
      <SearchInput placeholder="Search" handleChange={handleChange} ref={input} />
      {/* <SearchResults results={results} value={value} /> */}
    </div>
  )
}

const mapStateToProps = ({ track }) => ({ track })

export default SearchPage
