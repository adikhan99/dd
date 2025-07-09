// ** Redux Imports
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// ** Types
import { Dispatch } from 'redux'
import { SendMsgParamsType } from 'src/types/apps/chatTypes'

// ** Fetch User Profile
export const fetchUserProfile = createAsyncThunk('appChat/fetchUserProfile', async () => {
  const response = await axios.get('/apps/chat/users/profile-user')

  return response.data
})

// ** Fetch Chats & Contacts
export const fetchChatsContacts = createAsyncThunk('appChat/fetchChatsContacts', async () => {
  const response = await axios.get('/apps/chat/chats-and-contacts')

  return response.data
})

// ** Select Chat
export const selectChat = createAsyncThunk(
  'appChat/selectChat',
  async (id: number | string, { dispatch }: { dispatch: Dispatch<any> }) => {
    const response = await axios.get('/apps/chat/get-chat', {
      params: {
        id
      }
    })
    await dispatch(fetchChatsContacts())

    return response.data
  }
)

// ** Send Msg
export const sendMsg = createAsyncThunk('appChat/sendMsg', async (obj: SendMsgParamsType, { dispatch }) => {
  const response = await axios.post('/apps/chat/send-msg', {
    data: {
      obj
    }
  })
  if (obj.contact) {
    await dispatch(selectChat(obj.contact.id))
  }
  await dispatch(fetchChatsContacts())

  return response.data
})

interface DraftMsg {
  id: string;
  draftMsg: string;
}

interface AppChatState {
  chats: any;
  contacts: any;
  userProfile: any;
  selectedChat: any;
  draftMsgArrayObj: DraftMsg[];
}

const initialState: AppChatState = {
  chats: null,
  contacts: null,
  userProfile: null,
  selectedChat: null,
  draftMsgArrayObj: [],
};
export const appChatSlice = createSlice({
  name: 'appChat',
  initialState,
  reducers: {
    removeSelectedChat: state => {
      state.selectedChat = null
    },
    initializedraftMsgObj: (state, action: PayloadAction<DraftMsg>) => {
      const { id } = action.payload;
      const exists = state.draftMsgArrayObj.find(msg => msg.id === id);
      if (!exists) {
        state.draftMsgArrayObj.push(action.payload);
      }
    },

    setMsgDraft: (state, action: PayloadAction<DraftMsg>) => {
      const exists = state.draftMsgArrayObj.find(msg => msg.id === action.payload.id);
      if (exists) {
        exists.draftMsg = action.payload.draftMsg;
      } else {
        // Optionally add a new draft if it doesn't exist
        state.draftMsgArrayObj.push(action.payload);
      }
    }

  },
  extraReducers: builder => {
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload
    })
    builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
      state.contacts = action.payload.contacts
      state.chats = action.payload.chatsContacts
    })
    builder.addCase(selectChat.fulfilled, (state, action) => {
      state.selectedChat = action.payload
    })
  }
})

export const { removeSelectedChat, setMsgDraft, initializedraftMsgObj } = appChatSlice.actions

export default appChatSlice.reducer
