import React from 'react'
import fetchJsonp from 'fetch-jsonp'
// import Login from '../Login'
// import Nav from '../Nav'
// import Player from '../Player'
// import SearchResults from '../SearchResults'
// import Footer from '../Footer'
// import './search.scss'

const SearchPage: React.FC = () => {
  return <div>Search</div>
}
// class SearchRoute2 extends Component {
//   constructor() {
//     super()
//     this.searchInput = React.createRef()
//     this.state = {
//       results: {},
//       value: ''
//     }
//   }

//   handleChange = (event) => {
//     const value = event.target.value
//     this.setState({ value })
//     if (value !== '') {
//       fetchJsonp(`https://api.deezer.com/search/track?q=${value}&output=jsonp`)
//         .then((resp) => resp.json())
//         .then(({ data }) =>
//           this.setState({
//             results: {
//               tracks: data
//             }
//           })
//         )
//       fetchJsonp(`https://api.deezer.com/search/album?q=${value}&output=jsonp`)
//         .then((resp) => resp.json())
//         .then(({ data }) =>
//           this.setState({
//             results: {
//               ...this.state.results,
//               albums: data
//             }
//           })
//         )
//       fetchJsonp(`https://api.deezer.com/search/artist?q=${value}&output=jsonp`)
//         .then((resp) => resp.json())
//         .then(({ data }) =>
//           this.setState({
//             results: {
//               ...this.state.results,
//               artists: data
//             }
//           })
//         )
//       fetchJsonp(`https://api.deezer.com/search/playlist?q=${value}&output=jsonp`)
//         .then((resp) => resp.json())
//         .then(({ data }) =>
//           this.setState({
//             results: {
//               ...this.state.results,
//               playlists: data
//             }
//           })
//         )
//     }
//   }

//   setRef = (ref) => {
//     this.searchInput = ref
//   }

//   componentDidMount() {
//     this.searchInput.focus()
//   }

//   render() {
//     const { results, value } = this.state

//     return (
//       <div className="searchRoute">
//         <header>
//           <Nav onChange={this.handleChange} setRef={this.setRef} />
//           <Login />
//         </header>
//         <SearchResults results={results} value={value} />
//         <Player />
//         <Footer />
//       </div>
//     )
//   }
// }

const mapStateToProps = ({ track }) => ({ track })

export default SearchPage
