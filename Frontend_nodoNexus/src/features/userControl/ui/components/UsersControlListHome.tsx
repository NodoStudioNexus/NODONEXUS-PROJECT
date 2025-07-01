import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers, addUser } from '../../infraestructure/redux/userSlice';

import { TbTrash } from 'react-icons/tb';
import { BsEye, BsViewList } from 'react-icons/bs';
import { webSocketService } from '../../../../shared/services/websocketService';
import { AppDispatch, RootState } from '../../../../app/store';

import './userControlLists.scss';

const UserControlListsHome = () => {
	const dispatch = useDispatch<AppDispatch>();
	const users = useSelector((state: RootState) => state.users.users);
	const loading = useSelector((state: RootState) => state.users.loading);
	const error = useSelector((state: RootState) => state.users.error);
	const token = useSelector((state: RootState) => state.auth.user?.token);
	const [expandedUser, setExpandedUser] = useState<number | null>(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [sortOrder, setSortOrder] = useState('desc');

	useEffect(() => {
		dispatch(fetchUsers());
		if (token) {
			webSocketService.initialize(dispatch, token, () => {
				webSocketService.subscribe('/topic/users', (newUser) => {
					console.log('Nuevo usuario recibido:', newUser);
					dispatch(addUser(newUser));
				});
			});
		}
		return () => {
			webSocketService.disconnect();
		};
	}, [dispatch, token]);

	const handleEyeClick = (userId: number) => {
		setExpandedUser(expandedUser === userId ? null : userId);
	};

	// Función para resaltar coincidencias en el texto
	const highlightMatch = (text: string, query: string) => {
		if (!query) return text;
		const regex = new RegExp(`(${query})`, 'gi');
		return text.replace(regex, '<span class="highlight">$1</span>');
	};

	// Filtrar usuarios por nombre y estado
	const filteredUsers = users.filter((user) => {
		const fullName = `${user.primerNombre} ${user.primerApellido}`.toLowerCase();
		const matchesName = fullName.includes(searchTerm.toLowerCase());
		const matchesStatus = statusFilter
			? user.activo === (statusFilter === 'activo')
			: true;
		return matchesName && matchesStatus;
	});

	// Ordenar usuarios por fecha de registro
	const sortedUsers = [...filteredUsers].sort((a, b) => {
		const dateA = new Date(a.fechaRegistro).getTime();
		const dateB = new Date(b.fechaRegistro).getTime();
		return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
	});

	if (loading) {
		return <p>Cargando usuarios...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<section className="containerUserControl">
			<header className="containerUserControl-header">
				<div className="filterUsers">
					<input
						type="text"
						placeholder="Buscar por nombre..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<select
						value={statusFilter}
						onChange={(e) => setStatusFilter(e.target.value)}
					>
						<option value="">Todos los estados</option>
						<option value="activo">Activo</option>
						<option value="inactivo">Inactivo</option>
					</select>
					<select
						value={sortOrder}
						onChange={(e) => setSortOrder(e.target.value)}
					>
						<option value="desc">Más reciente primero</option>
						<option value="asc">Más antiguo primero</option>
					</select>
				</div>
			</header>
			<div className="containerUserControl-content">
				{sortedUsers.length === 0 ? (
					<p className="noResults">No se encontraron coincidencias</p>
				) : (
					<ul>
						{sortedUsers.map((user) => (
							<li key={user.id}>
								<div className="infoLists">
									<input type="checkbox" />
									<figure className="userAvatar">
										{user.image ? (
											<img
												src={user.image}
												alt={`imagen perfil ${user.primerNombre} ${user.primerApellido}`}
											/>
										) : (
											<div className="initialCircle">
												{user.primerNombre.charAt(0).toUpperCase()}
											</div>
										)}
									</figure>
									<div className="infoUser">
										<span>
											<p>Nombre</p>
											<h4
												dangerouslySetInnerHTML={{
													__html: highlightMatch(
														`${user.primerNombre} ${user.primerApellido}`,
														searchTerm
													),
												}}
											/>
										</span>
										<span>
											<p>Rol</p>
											<h4>{user.role}</h4>
										</span>
										<span className="estadoUser">
											<p>{user.activo ? 'Activo' : 'Inactivo'}</p>
										</span>
									</div>
									<div className="iconsControl">
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
				)}
			</div>
		</section>
	);
};

export default UserControlListsHome;