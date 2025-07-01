import { useState } from "react";
import './buttonAction.scss';
import { FaPlus } from "react-icons/fa";

interface ButtonActionProps {
	proyectoId: number | null;
	onAddInfo: (newInfo: string) => void;
	onUploadFile: (file: File) => void;
	onCreateDiagram: () => void;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ proyectoId, onAddInfo, onUploadFile, onCreateDiagram }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formVisible, setFormVisible] = useState(false);
	const [textEntries, setTextEntries] = useState<{ type: string; content: string }[]>([]);

	const toggleMenu = () => setIsOpen(!isOpen);

	const handleAddInfo = () => {
		setFormVisible(true);
		setIsOpen(false);
	};

	const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			console.log(`Subiendo archivo ${file.name} al proyecto ${proyectoId}`);
			// Aquí puedes agregar la lógica para enviar el archivo al backend
		}
		setIsOpen(false);
	};

	const handleCreateDiagram = () => {
		console.log(`Creando diagrama en proyecto ${proyectoId}`);
		// Aquí puedes agregar la lógica para crear y guardar un diagrama
		setIsOpen(false);
	};

	const addTextEntry = (type: string) => {
		setTextEntries([...textEntries, { type, content: '' }]);
	};

	const updateTextEntry = (index: number, content: string) => {
		const updatedEntries = [...textEntries];
		updatedEntries[index].content = content;
		setTextEntries(updatedEntries);
	};

	const saveText = () => {
		console.log(`Guardando texto en proyecto ${proyectoId}:`, textEntries);
		// Aquí puedes enviar los datos al backend
		setFormVisible(false);
		setTextEntries([]);
	};

	return (
		<div className="button-action-container">
			<button
				onClick={toggleMenu}
				className="button-action"
			>
				<FaPlus /> Crear
			</button>
			{isOpen && (
				<div className="dropdown-menu">
					<button
						onClick={handleAddInfo}
						className="dropdown-item"
					>
						Agregar información
					</button>
					<label className="dropdown-item">
						Subir archivo
						<input
							type="file"
							className="hidden"
							onChange={handleUploadFile}
						/>
					</label>
					<button
						onClick={handleCreateDiagram}
						className="dropdown-item"
					>
						Crear diagrama
					</button>
				</div>
			)}
			{formVisible && (
				<div className="form-modal">
					<h2 className="form-title">Agregar Información</h2>
					{textEntries.map((entry, index) => (
						<div key={index} className="form-entry">
							<label>{entry.type.charAt(0).toUpperCase() + entry.type.slice(1)}</label>
							<textarea
								value={entry.content}
								onChange={(e) => updateTextEntry(index, e.target.value)}
								className="form-textarea"
							/>
						</div>
					))}
					<div className="form-actions">
						<button onClick={() => addTextEntry('título')} className="form-button">
							Agregar Título
						</button>
						<button onClick={() => addTextEntry('subtítulo')} className="form-button">
							Agregar Subtítulo
						</button>
						<button onClick={() => addTextEntry('párrafo')} className="form-button">
							Agregar Párrafo
						</button>
					</div>
					<div className="form-footer">
						<button onClick={saveText} className="form-save-button">
							Guardar
						</button>
						<button onClick={() => setFormVisible(false)} className="form-cancel-button">
							Cancelar
						</button>
					</div>
				</div>
			)
			}
		</div>
	);
};

export default ButtonAction;