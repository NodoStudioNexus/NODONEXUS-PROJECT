import { useState } from "react";
import './buttonAction.scss';
import { FaPlus } from "react-icons/fa";

interface ButtonActionProps {
	proyectoId: number | null;
}

const ButtonAction: React.FC<ButtonActionProps> = ({ proyectoId }) => {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => setIsOpen(!isOpen);

	const handleAddInfo = () => {
		console.log(`Agregar información al proyecto ${proyectoId}`);
		setIsOpen(false);
	};

	const handleUploadFile = () => {
		console.log(`Subir archivo al proyecto ${proyectoId}`);
		setIsOpen(false);
	};

	const handleCreateDiagram = () => {
		console.log(`Crear diagrama para el proyecto ${proyectoId}`);
		setIsOpen(false);
	};

	return (
		<div className="button-action-container">
			<button
				onClick={toggleMenu}
				className="button-action"
			>
				<FaPlus />Crear
			</button>
			{isOpen && (
				<div className="dropdown-menu">
					<button
						onClick={handleAddInfo}
						className="dropdown-item"
					>
						Agregar información
					</button>
					<button
						onClick={handleUploadFile}
						className="dropdown-item"
					>
						Subir archivo
					</button>
					<button
						onClick={handleCreateDiagram}
						className="dropdown-item"
					>
						Crear diagrama
					</button>
				</div>
			)}
		</div>
	);
};

export default ButtonAction;