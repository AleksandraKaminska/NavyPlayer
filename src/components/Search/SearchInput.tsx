import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Input } from 'antd'
import fetchJsonp from 'fetch-jsonp'
import { Context } from '../../context/Context'
import './SearchInput.less'

function SearchInput() {
  const { dispatch } = useContext(Context)

  const fetchResults = async (value: string) =>
    await (await fetchJsonp(`https://api.deezer.com/search/autocomplete?q=${value}&output=jsonp`)).json()

  const handleChange = async ({ target }) => {
    if (target.value !== '') {
      const data = await fetchResults(target.value)
      dispatch({ type: 'SEARCH', payload: data })
    }
  }

  return (
    <Link to="/search" className="SearchInput">
      <Input.Search
        placeholder="Search"
        size="large"
        allowClear
        onChange={handleChange}
        bordered={false}
        style={{ width: '100%' }}
      />
    </Link>
  )
}

export default SearchInput
