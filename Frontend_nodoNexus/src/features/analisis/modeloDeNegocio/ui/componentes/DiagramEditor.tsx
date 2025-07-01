import { FaTimes } from "react-icons/fa";
import DiagramadorMapas from "./DiagramadorMapas";
import './diagramaEditor.scss';

interface DiagramEditorProps {
	sectionTitle: string;
	proyectoId: number | null;
	onClose: () => void;
}

const DiagramEditor: React.FC<DiagramEditorProps> = ({ sectionTitle, proyectoId, onClose }) => {
	return (
		<div className="diagram-editor">
			<div className="modal-content">
				<button className="buttonClose" onClick={onClose}><FaTimes /></button>
				<h2>Crear diagrama para {sectionTitle}</h2>
				<p>ID del proyecto: {proyectoId ?? 'No asignado'}</p>
				<DiagramadorMapas />
			</div>
		</div>
	);
};

export default DiagramEditor;