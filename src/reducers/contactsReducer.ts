export type ContactsStateType = {
  contacts: Array<{
    id?: string
    name?: string
    email?: string
  }>
  loading?: boolean
  error?: null
}

export type ContactsActionType = {
  type: string
  payload: {
    id?: string
    name?: string
    email?: string
  }
}

export const initialContactsState: ContactsStateType = {
  contacts: [
    {
      id: '098',
      name: 'Diana Prince',
      email: 'diana@us.army.mil'
    },
    {
      id: '099',
      name: 'Bruce Wayne',
      email: 'bruce@batmail.com'
    },
    {
      id: '100',
      name: 'Clark Kent',
      email: 'clark@metropolitan.com'
    }
  ],
  loading: false,
  error: null
}

const contactsReducer: (state: ContactsStateType, action: ContactsActionType) => ContactsStateType = (
  state,
  action
) => {
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
      return state
  }
}

export default contactsReducer
