import { useState } from "react";
import './documentacionModeladoAnalist.scss';
import PropuestaValor from "./Actividades/PropuestaValor";
import SegmentacionUsuarios from "./Actividades/SegmentacionUsuarios";
import CasosDeUso from "./Actividades/CasosDeUso";
import MapasDeProcesos from "./Actividades/MapasDeProcesos";

interface DocumentacionModeladoAnalistProps {
	proyectoId: number | null;
}

const DocumentacionModeladoAnalist: React.FC<DocumentacionModeladoAnalistProps> = ({ proyectoId }) => {
	const [activeTab, setActiveTab] = useState('Actividaduno');


	return (
		<section className="containerActividadesAnalist">
			<div className="containerActividadesAnalist-nav">
				<nav>
					<button onClick={() => setActiveTab('Actividaduno')} className={activeTab === 'Actividaduno' ? 'active' : ''}>
						Análisis de la Propuesta de Valor
					</button>
					<button onClick={() => setActiveTab('Actividad2')} className={activeTab === 'Actividad2' ? 'active' : ''}>
						Segmentación de Usuarios
					</button>
					<button onClick={() => setActiveTab('Actividad3')} className={activeTab === 'Actividad3' ? 'active' : ''}>
						Casos de Uso
					</button>
					<button onClick={() => setActiveTab('Actividad4')} className={activeTab === 'Actividad4' ? 'active' : ''}>
						Mapas de Procesos
					</button>
				</nav>
			</div>
			<div className="containerActividadesAnalist-info">
				{activeTab === 'Actividaduno' && <PropuestaValor proyectoId={proyectoId} />}
				{activeTab === 'Actividad2' && <SegmentacionUsuarios proyectoId={proyectoId} />}
				{activeTab === 'Actividad3' && <CasosDeUso proyectoId={proyectoId} />}
				{activeTab === 'Actividad4' && <MapasDeProcesos proyectoId={proyectoId} />}
			</div>
		</section>
	);
};

export default DocumentacionModeladoAnalist;