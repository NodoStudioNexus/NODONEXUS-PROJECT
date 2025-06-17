
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../app/store';
import { useWebSocket } from '../../../../../shared/hooks/useWebSocket';


const ConnectedUsers = () => {
	const connectedUsers = useSelector((state: RootState) => state.chat.connectedUsers);
	console.log("Usuarios conectados en ConnectedUsers:", connectedUsers);

	// Inicializa WebSocket sin chatId
	useWebSocket();

	return (
		<div>
			<h3>Usuarios Conectados</h3>
			{connectedUsers.length === 0 ? (
				<p>No hay usuarios conectados.</p>
			) : (
				<ul>
					{connectedUsers.map((user) => (
						<li key={user.id}>{user.name}</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default ConnectedUsers;