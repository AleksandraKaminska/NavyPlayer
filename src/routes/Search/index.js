import React, { Component } from 'react'
import Login from 'components/Login'
import Nav from 'components/Nav'
import Player from 'components/Player'
import SearchResults from 'components/SearchResults'
import Footer from 'components/Footer'
import './search.scss'
import { connect } from 'react-redux'
import fetchJsonp from 'fetch-jsonp'

class SearchRoute extends Component {
  constructor() {
    super()
    this.searchInput = React.createRef()
    this.state = {
      results: {},
      value: ''
    }
  }

  handleChange = event => {
    const value = event.target.value
    this.setState({ value })
    if (value !== '') {
      fetchJsonp(`https://api.deezer.com/search/track?q=${value}&output=jsonp`)
        .then(resp => resp.json())
        .then(({ data }) =>
          this.setState({
            results: {
              tracks: data
            }
          })
        )
      fetchJsonp(`https://api.deezer.com/search/album?q=${value}&output=jsonp`)
        .then(resp => resp.json())
        .then(({ data }) =>
          this.setState({
            results: {
              ...this.state.results,
              albums: data
            }
          })
        )
      fetchJsonp(`https://api.deezer.com/search/artist?q=${value}&output=jsonp`)
        .then(resp => resp.json())
        .then(({ data }) =>
          this.setState({
            results: {
              ...this.state.results,
              artists: data
            }
          })
        )
      fetchJsonp(
        `https://api.deezer.com/search/playlist?q=${value}&output=jsonp`
      )
        .then(resp => resp.json())
        .then(({ data }) =>
          this.setState({
            results: {
              ...this.state.results,
              playlists: data
            }
          })
        )
    }
  }

  setRef = ref => {
    this.searchInput = ref
  }

  componentDidMount() {
    this.searchInput.focus()
  }

  render() {
    const { results, value } = this.state

    return (
      <div className="searchRoute">
        <header>
          <Nav onChange={this.handleChange} setRef={this.setRef} />
          <Login />
        </header>
        <SearchResults results={results} value={value} />
        <Player />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = ({ track }) => ({ track })

export default connect(mapStateToProps)(SearchRoute)
