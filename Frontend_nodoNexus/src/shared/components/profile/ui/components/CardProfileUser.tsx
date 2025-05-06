import { useSelector } from "react-redux";
import { RootState } from "../../../../../app/store";
import { getProfileImageUrl } from "../../../../utils/getProfileImageUrl";

import './cardProfileUser.scss'


const CardProfileUser = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	return (
		<>
			<section className="cardProfile-container">
				<div className="cardProfile-container-images">
					<figure className="cardProfile-container-images-imgBanner">
						<img src="https://images.unsplash.com/photo-1746254774131-f94b3d6b84d6?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
					</figure>
					<figure className="cardProfile-container-images-profileImg">
						{user?.profileImage ? (
							<img
								src={getProfileImageUrl(user.profileImage)}
								alt="ProfileImg"
								className="profileImage"
								onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')} />
						) : (
							<div className="profileInitial">{user?.initial || 'U'}</div>
						)}
					</figure>
				</div>
				<div className="cardProfile-container-userData" >
					<h2>{user?.primerNombre} {user?.segundoApellido}</h2>
					<p>{user?.role} de <strong>Nodo Studio</strong></p>
					<button className="cardProfile-container-userData-button">Editar Perfil</button>
				</div>

			</section>
		</>
	)
}
export default CardProfileUser;