import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatMessage } from "../../domain/entities/ChatMessage";
import { ConnectedUser } from "../../domain/entities/ConnectedUser";


interface ChatState {
	messages: ChatMessage[];
	connectedUsers: ConnectedUser[];
}

const initialState: ChatState = {
	messages: [],
	connectedUsers: [],
};

const chatSlice = createSlice({
	name: "chat",
	initialState,
	reducers: {
		addMessage(state, action: PayloadAction<ChatMessage>) {
			state.messages.push(action.payload);
		},
		setConnectedUsers(state, action: PayloadAction<ConnectedUser[]>) {
			console.log("Usuarios conectados : ...." + action.payload)
			state.connectedUsers = action.payload;
		},
		clearMessages(state) {
			state.messages = [];
		},
	},
});

export const { addMessage, setConnectedUsers, clearMessages } = chatSlice.actions;
export default chatSlice.reducer;