import { TbTrash } from 'react-icons/tb';
import './userControlLists.scss'
import { BsEye, BsViewList } from 'react-icons/bs';
import { useState } from 'react';

const UserControlLists = () => {

	const [expandedUser, setExpandedUser] = useState(null);

	const handleEyeClick = (userId) => {
		setExpandedUser(expandedUser === userId ? null : userId);
	};

	const users = [
		{
			id: 1,
			name: "Jose Daniel Anacona",
			role: "Administrador",
			email: "jdanaconar@gmail.com",
			status: "activo",
			image: "https://images.unsplash.com/photo-1575739967915-f06fdc268a5b?q=80&w=1891&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		}
	];

	return (
		<>
			<section className="containerUserControl">
				<header className="containerUserControl-header">
					<h3> Control de usuarios </h3>
					<div className='filterUsers'>
						<div>Todos los filtros</div>
					</div>
				</header>
				<div className="containerUserControl-content">

					<ul>
						{users.map((user) => (
							<li key={user.id}>
								<div className='infoLists'>
									<input type="checkbox" />
									<figure>
										<img src={user.image} alt={`imagen perfil ${user.name}`} />
									</figure>
									<div className='infoUser'>
										<span>
											<p>Nombre</p>
											<h4>{user.name}</h4>
										</span>
										<span>
											<p>Rol</p>
											<h4>
												<strong></strong>
												{user.role}
											</h4>
										</span>
										<span>
											<p>Correo</p>
											<h4>{user.email}</h4>
										</span>
										<span className='estadoUser'>
											<p>{user.status}</p>
										</span>
									</div>
									<div className='iconsControl'>
										<TbTrash />
										<BsViewList />
										<BsEye onClick={() => handleEyeClick(user.id)} style={{ cursor: 'pointer' }} />
									</div>
								</div>

								{expandedUser === user.id && (
									<div className="user-details-expanded">
										{/* Aquí puedes agregar la información adicional que quieras mostrar */}
										<p>Información adicional del usuario</p>
										<p>Fecha de registro: XX/XX/XXXX</p>
										<p>Último acceso: XX/XX/XXXX</p>
										{/* Agrega más campos según necesites */}
									</div>
								)}
							</li>
						))}
					</ul>

				</div>
			</section>
		</>
	)
}
export default UserControlLists; 