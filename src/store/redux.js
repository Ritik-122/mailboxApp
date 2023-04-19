import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "authentication",
    initialState: { token: localStorage.getItem("Token") },
    reducers: {
      login(state, action) {
        state.token = action.payload;
      },
      logout(state, action) {
        localStorage.clear();
        state.token = action.payload;
      },
    },
  });


const mailSlice=createSlice({
  name:'mail',
  initialState:{mail:[],inboxCount:null},
  reducers:{
    getMail(state,action){
      state.mail=action.payload

    },
    inbox(state,action){
      state.inbox=action.payload
    }

  }
})

export const authActions=authSlice.actions
export const mailActions=mailSlice.actions
const store=configureStore({
    reducer:{auth:authSlice.reducer,mail:mailSlice.reducer}
})
export default store