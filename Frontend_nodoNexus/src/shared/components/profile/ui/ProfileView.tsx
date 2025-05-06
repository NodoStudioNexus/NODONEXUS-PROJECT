import CardProfileUser from "./components/CardProfileUser";
import './profileView.scss'


const ProfileView = () => {
	return (
		<>
			<section className="container-profileContent" >
				<CardProfileUser />
				<div>
					<button>Boton uno</button>
					<button>Boton dos</button>
					<button>Boton tres</button>
				</div>
			</section>
		</>
	)
}

export default ProfileView;