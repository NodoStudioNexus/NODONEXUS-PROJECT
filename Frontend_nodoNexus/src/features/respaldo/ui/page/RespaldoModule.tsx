import { useState } from 'react';
import './RespaldoModule.scss';

// Datos iniciales simulados con más información
const initialBackups = [
	{ id: 1, fecha: '2023-10-01', hora: '10:00', estado: 'Completado', tamaño: '1.2 GB', usuario: 'Admin', tipo: 'Completo' },
	{ id: 2, fecha: '2023-10-02', hora: '11:30', estado: 'Completado', tamaño: '1.3 GB', usuario: 'User1', tipo: 'Incremental' },
	{ id: 3, fecha: '2023-10-03', hora: '09:15', estado: 'Fallido', tamaño: '0 GB', usuario: 'Admin', tipo: 'Completo' },
];

const RespaldoModule = () => {
	const [backups, setBackups] = useState(initialBackups);
	const [progress, setProgress] = useState(0);
	const [isBackingUp, setIsBackingUp] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');

	const startBackup = () => {
		setIsBackingUp(true);
		setProgress(0);
		setShowSuccess(false);
		const interval = setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval);
					setIsBackingUp(false);
					setShowSuccess(true);
					const newBackup = {
						id: backups.length + 1,
						fecha: new Date().toLocaleDateString(),
						hora: new Date().toLocaleTimeString(),
						estado: 'Completado',
						tamaño: `${Math.floor(Math.random() * 10) + 1} GB`,
						usuario: 'Admin', // Simula el usuario actual
						tipo: 'Completo',
					};
					setBackups([...backups, newBackup]);
					setTimeout(() => setShowSuccess(false), 3000);
					return 100;
				}
				return prev + 10;
			});
		}, 500);
	};

	// Filtrar los respaldos según el término de búsqueda
	const filteredBackups = backups.filter((backup) =>
		Object.values(backup).some((value) =>
			value.toString().toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	return (
		<div className="respaldo-module">
			<h1 className="respaldo-title">Módulo de Respaldo</h1>
			<div className="respaldo-actions">
				<button className="action-button" onClick={startBackup} disabled={isBackingUp}>
					Iniciar Nuevo Respaldo
				</button>
				<button className="action-button">Restaurar desde Respaldo</button>
			</div>
			{isBackingUp && (
				<div className="progress-bar">
					<div className="progress" style={{ width: `${progress}%` }}>
						<span className="progress-text">{progress}%</span>
					</div>
				</div>
			)}
			{showSuccess && (
				<div className="success-message">
					Respaldo exitoso
				</div>
			)}
			<div className="respaldo-logs">
				<h2 className="section-title">Historial de Respaldos</h2>
				<input
					type="text"
					placeholder="Buscar respaldos..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-input"
				/>
				<ul className="backup-list">
					{filteredBackups.map((backup) => (
						<li key={backup.id} className="backup-item">
							<div className="backup-details">
								<p><strong>Fecha:</strong> {backup.fecha} - {backup.hora}</p>
								<p><strong>Estado:</strong> {backup.estado}</p>
								<p><strong>Tamaño:</strong> {backup.tamaño}</p>
								<p><strong>Usuario:</strong> {backup.usuario}</p>
								<p><strong>Tipo:</strong> {backup.tipo}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RespaldoModule;