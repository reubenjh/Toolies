const initialState = {
  gear: [],
  messages: {
    sent: [],
    received: []
  },
  isFetching: false,
  isSaving: false
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case 'USER_REQUEST':
      return {
        ...state,
        isFetching: true
      }
    case 'REQUEST_PROFILE_EDIT':
      return {
        ...state,
        isSaving: true
      }
    case 'SUCCESS_PROFILE_EDIT':
      return {
        ...state,
        isSaving: false,
        firstName: action.update.first_name,
        lastName: action.update.last_name,
        email: action.update.email_address,
        profilePic: action.update.profile_pic
      }
    case 'ERROR_PROFILE_EDIT':
      return {
        ...state,
        isSaving: false,
        errorMessage: action.message
      }
    case 'SET_USER':
      return {
        ...state,
        id: action.user.id,
        firstName: action.user.first_name,
        lastName: action.user.last_name,
        username: action.user.user_name,
        email: action.user.email_address,
        gear: action.user.gear,
        messages: action.user.messages,
        profilePic: action.user.profile_pic,
        isFetching: false
      }
    case 'REQUEST_GEAR_SAVE':
      return {
        ...state,
        isSaving: true
      }
    case 'GEAR_ADD':
      let newGearArr = [...state.gear, action.item]
      return {
        ...state,
        gear: newGearArr,
        isSaving: false
      }
    case 'GEAR_ERROR':
      return {
        ...state,
        errorMessage: action.message,
        isSaving: false
      }
    case 'EDIT_REQUEST':
      return {
        ...state,
        isFetching: action.isFetching,
        isSaving: action.isSaving
      }
    case 'EDIT_GEAR':
      const newItem = Object.assign(
        {},
        state.gear.find(item => item.id == action.item.id),
        action.item
      )
      return {
        ...state,
        gear: [...state.gear.filter(item => item.id != action.item.id), newItem],
        isFetching: false,
        isSaving: false
      }
    case 'REQUEST_MESSAGE_SAVE':
      return {
        ...state,
        isSaving: true
      }
    case 'SET_REQUEST':
      let newMessages = {
        ...state.messages,
        sent: [...state.messages.sent, action.request]
      }
      return {
        ...state,
        isSaving: false,
        messages: newMessages
      }
    case 'REQUEST_ERROR':
      return {
        ...state,
        errorMessage: action.message,
        isSaving: false
      }
    case 'REQUEST_MESSAGE_DELETE': {
      return {
        ...state,
        isSaving: true
      }
    }
    case 'ERROR_MESSAGE_DELETE': {
      return {
        ...state,
        isSaving: false,
        errorMessage: action.message
      }
    }
    case 'SUCCESS_MESSAGE_DELETE':
      return {
        ...state,
        isSaving: false,
        messages: {
          sent: state.messages.sent.filter(message => message.id != action.id),
          received: state.messages.received.filter(message => message.id != action.id)
        }
      }
    case 'REQUEST_MESSAGE_UPDATE': {
      return {
        ...state,
        isSaving: true
      }
    }
    case 'ERROR_MESSAGE_UPDATE': {
      return {
        ...state,
        isSaving: false,
        errorMessage: action.message
      }
    }
    case 'SUCCESS_MESSAGE_UPDATE':
      const messageType = state.messages.sent.find(message => message.id == action.id) ? 'sent' : 'received'

      const newMessage = Object.assign(
        {}, 
        state.messages[messageType].find(msg => msg.id == action.id),
        action.update
      )

      return {
        ...state,
        isSaving: false,
        messages: {
          ...state.messages,
          [messageType]: [...state.messages[messageType].filter(message => message.id != action.id), newMessage],
        }
      }

    case 'MAILOUT_ERROR':
      return {
        ...state,
        mailError: action.message
      }
    default:
      return state
  }
}