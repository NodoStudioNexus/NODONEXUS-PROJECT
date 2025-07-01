import { useState } from "react";
import './seccionActividades.scss';
import { FaAngleDown, FaAngleUp, FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaFile, FaUpload, FaPlus } from "react-icons/fa";
import SimpleEditor from "./SimpleEditor";
import DiagramEditor from "../../../features/analisis/modeloDeNegocio/ui/componentes/DiagramEditor";


interface SeccionActividadesProps {
	title: string;
	description: string;
	proyectoId: number | null;
	onSave: (diagramData: string) => void;
}

const SeccionActividades: React.FC<SeccionActividadesProps> = ({ title, description, proyectoId }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
	const [isDiagramEditorOpen, setIsDiagramEditorOpen] = useState(false);

	const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const files = event.target.files ? Array.from(event.target.files) : [];
		setUploadedFiles((prevFiles) => [...prevFiles, ...files]); // Acumula los nuevos archivos
	};

	const getFileIcon = (fileName: string) => {
		const extension = fileName.split('.').pop()?.toLowerCase();
		switch (extension) {
			case 'pdf':
				return <FaFilePdf />;
			case 'jpg':
			case 'jpeg':
			case 'png':
				return <FaFileImage />;
			case 'doc':
			case 'docx':
				return <FaFileWord />;
			case 'xls':
			case 'xlsx':
				return <FaFileExcel />;
			default:
				return <FaFile />;
		}
	};

	return (
		<div className='seccion-Actividad'>
			<div onClick={() => setIsExpanded(!isExpanded)} className={`seccion-Actividad-content ${isExpanded ? 'is-open' : ''}`}>
				<span>
					<h3>{title}</h3>
					<p>{description}</p>
				</span>
				<div className={`seccion-info ${isExpanded ? 'is-open' : ''}`}>
					<span>
						<p>{isExpanded ? <FaAngleUp /> : <FaAngleDown />}</p>
					</span>
				</div>
			</div>
			{isExpanded && (
				<div className="contenido-desplegable">
					<div className="editor-section">
						<SimpleEditor onChange={undefined} initialContent={undefined} />
					</div>
					<div className="upload-section">
						<div className="action-bar">
							<label className="btn-upload">
								<FaUpload /> Subir
								<input type="file" onChange={handleFileUpload} multiple style={{ display: 'none' }} />
							</label>
							<button onClick={() => setIsDiagramEditorOpen(true)}><FaPlus />Crear Diagrama</button>
						</div>
						{uploadedFiles.length > 0 ? (
							<ul>
								{uploadedFiles.map((file, index) => (
									<li key={index}>
										<span className="file-icon">{getFileIcon(file.name)}</span>
										{file.name}
									</li>
								))}
							</ul>
						) : (
							<p>No hay archivos subidos aún.</p>
						)}
					</div>
				</div>
			)}
			{isDiagramEditorOpen && (
				<div>
					<DiagramEditor sectionTitle={title} proyectoId={proyectoId} onClose={() => setIsDiagramEditorOpen(false)} />
				</div>
			)}
		</div>
	);
};

export default SeccionActividades;