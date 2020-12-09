export type StateType = {
  contacts: Array<{
    id: string
    name: string
    email: string
  }>
  loading?: boolean
  error?: null
}

export const contactsReducer: (state: StateType, action: any) => StateType = (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload]
      }
    case 'DEL_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter((contact) => contact.id !== action.payload)
      }
    case 'START':
      return {
        ...state,
        loading: true
      }
    case 'COMPLETE':
      return {
        ...state,
        loading: false
      }
    default:
      throw new Error()
  }
}

export const mainReducer = ({ contacts }, action) => ({
  contacts: contactsReducer(contacts, action)
})
