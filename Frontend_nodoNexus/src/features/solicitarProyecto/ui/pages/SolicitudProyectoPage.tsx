import SolicitudProyectoForm from '../components/SolicitudProyectoForm';
import './SolicitudProyectoPage.scss';

const SolicitudProyectoPage = () => {
	return (
		<div className="containerSolicitud">
			<div className="containerSolicitud-video">
				<video
					className="background-video"
					autoPlay
					loop
					muted
					playsInline
				>
					<source
						src="https://videos.pexels.com/video-files/25935022/11922050_1440_2560_24fps.mp4"
						type="video/mp4"
					/>
					Tu navegador no soporta el elemento de video.
				</video>
			</div>
			<div className="containerSolicitud-form">
				<div className='containerSolicitud-form-title'>
					<h4>NodoStudio</h4>
					<div>

						<h3>Vamos a construir un proyecto increíble juntos.</h3>
						<p>Describa su proyecto y déjenos su información de contacto, nos pondremos en contacto con usted dentro de las 24 horas.</p>
					</div>
				</div>
				<SolicitudProyectoForm />
			</div>
		</div>
	);
};

export default SolicitudProyectoPage;