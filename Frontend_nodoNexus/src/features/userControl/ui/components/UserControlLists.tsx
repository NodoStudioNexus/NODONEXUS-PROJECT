import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, fetchUsers } from '../../infraestructure/redux/userSlice';
import { TbTrash } from 'react-icons/tb';
import { BsEye, BsViewList } from 'react-icons/bs';
import './userControlLists.scss';
import { AppDispatch, RootState } from '../../../../app/store';
import { webSocketService } from '../../../../shared/services/websocketService';

const UserControlLists = () => {
	const dispatch = useDispatch<AppDispatch>();
	const users = useSelector((state: RootState) => state.users.users);
	const loading = useSelector((state: RootState) => state.users.loading);
	const error = useSelector((state: RootState) => state.users.error);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const [expandedUser, setExpandedUser] = useState<number | null>(null);

	useEffect(() => {
		// Cargar usuarios iniciales
		dispatch(fetchUsers());

		// Conectar WebSocket y escuchar nuevos usuarios
		if (token) {
			webSocketService.initialize(dispatch, token, () => {
				webSocketService.subscribe('/topic/users', (newUser) => {
					console.log('Nuevo usuario recibido:', newUser);
					dispatch(addUser(newUser)); // Agregar el nuevo usuario al estado
				});
			});
		}

		// Limpiar la conexión al desmontar el componente
		return () => {
			webSocketService.disconnect();
		};
	}, [dispatch, token]);

	const handleEyeClick = (userId: number) => {
		setExpandedUser(expandedUser === userId ? null : userId);
	};

	if (loading) {
		return <p>Cargando usuarios...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}
	return (
		<section className="containerUserControl">
			<header className="containerUserControl-header">
				<h3>Control de usuarios</h3>
				<div className="filterUsers">
					<div>Todos los filtros</div>
				</div>
			</header>
			<div className="containerUserControl-content">
				<ul>
					{users.map((user) => (
						<li key={user.id}>
							<div className="infoLists">
								<input type="checkbox" />
								<figure>
									<img src={user.image || 'https://via.placeholder.com/50'} alt={`imagen perfil ${user.primerNombre} ${user.primerApellido}`} />
								</figure>
								<div className="infoUser">
									<span>
										<p>Nombre</p>
										<h4>{user.primerNombre} {user.primerApellido}</h4>
									</span>
									<span>
										<p>Rol</p>
										<h4>{user.role}</h4>
									</span>
									<span>
										<p>Correo</p>
										<h4>{user.email}</h4>
									</span>
									<span className="estadoUser">
										<p>{user.activo ? 'Activo' : 'Inactivo'}</p>
									</span>
								</div>
								<div className="iconsControl">
									<TbTrash />
									<BsViewList />
									<BsEye onClick={() => handleEyeClick(user.id)} style={{ cursor: 'pointer' }} />
								</div>
							</div>

							{expandedUser === user.id && (
								<div className="user-details-expanded">
									<p>Información adicional del usuario</p>
									<p>Fecha de registro: {new Date(user.fechaRegistro).toLocaleString()}</p>
									<p>Tipo de Identidad: {user.tipoIdentidad}</p>
									<p>Número de Identidad: {user.numeroIdentidad}</p>
									<p>Teléfono: {user.telefono || 'N/A'}</p>
								</div>
							)}
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default UserControlLists;