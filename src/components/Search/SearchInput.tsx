import React from 'react'
import { Input } from 'antd'
const { Search } = Input

type SearchInputProps = {
  placeholder: string
  handleChange?: any
}

function SearchInput({ placeholder, handleChange }: SearchInputProps, ref) {
  return (
    <Search placeholder={placeholder} allowClear onSearch={handleChange} style={{ width: 200, margin: '0 10px' }} />
  )
}

export default React.forwardRef(SearchInput)
