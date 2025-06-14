import { useState } from "react";
import SolicitudesPendientes from "./SolicitudesPendientes";

import './estadoSolicitudes.scss';
import SolicitudesEnProgreso from "./SolicitudesEnProgreso";

const EstadoSolicitudes = () => {

	const [activeTab, setActiveTab] = useState('solicitudesPendientes')

	return (
		<>
			<section className="ContainerSolicitudes">
				<div className="ContainerSolicitudes-menu"  >
					<button onClick={() => setActiveTab('solicitudesPendientes')} className={activeTab === 'solicitudesPendientes' ? 'active' : ' '}>Solicitudes Pendientes</button>
					<button onClick={() => setActiveTab('solicitudesProceso')} className={activeTab === 'solicitudesProceso' ? 'active' : ' '}>Solicitudes En Progreso</button>
				</div>
				<div className="ContainerSolicitudes-content" >
					{activeTab === 'solicitudesPendientes' && <SolicitudesPendientes />}
					{activeTab === 'solicitudesProceso' && <SolicitudesEnProgreso />}
				</div>
			</section>
		</>
	)
}

export default EstadoSolicitudes;