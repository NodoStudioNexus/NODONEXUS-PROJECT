
import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { useWebSocket } from "../../../../../shared/hooks/useWebSocket";
import { useState } from "react";
import { webSocketService } from "../../../../../shared/services/websocketService";


const ChatWindow = ({ chatId }: { chatId: string }) => {
	const messages = useSelector((state: RootState) => state.chat.messages);
	const [input, setInput] = useState("");

	// Inicializa WebSocket con el chatId
	useWebSocket(chatId);

	const sendMessage = () => {
		if (input.trim()) {
			webSocketService.sendMessage(chatId, input);
			setInput("");
		}
	};

	return (
		<div>
			<h2>Chat Grupal</h2>
			<div style={{ height: "300px", overflowY: "scroll", border: "1px solid #ccc" }}>
				{messages.map((msg) => (
					<p key={msg.id}>
						<strong>{msg.sender}:</strong> {msg.content} <small>({msg.timestamp})</small>
					</p>
				))}
			</div>
			<input
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder="Escribe un mensaje..."
			/>
			<button onClick={sendMessage}>Enviar</button>
		</div>
	);
};

export default ChatWindow;