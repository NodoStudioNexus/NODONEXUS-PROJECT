import { useCallback, useState, useRef } from 'react';
import ReactFlow, {
	ReactFlowProvider,
	Background,
	MiniMap,
	Controls,
	Handle,
	Position,
	addEdge,
	applyNodeChanges,
	applyEdgeChanges,
	Node,
	Edge,
	Connection,
	NodeTypes,
	NodeProps,
	NodeResizer,
	NodeToolbar,
	useReactFlow,
	NodeChange,
	EdgeChange,
	NodeDimensionChange,
	MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import './diagramadorMapas.scss';

/* =============== 1. Tipos =============== */
interface CustomNodeData {
	label: string;
	shape:
	| 'oval'
	| 'rectangle'
	| 'diamond'
	| 'parallelogram'
	| 'cylinder'
	| 'document'
	| 'multi-document'
	| 'delay'
	| 'preparation'
	| 'connector';
	color: string;
	width?: number;
	height?: number;
}

type CustomNode = Node<CustomNodeData>;
type CustomEdge = Edge;

/* =============== 2. Plantillas de la paleta =============== */
const nodeTemplates: Record<
	| 'start'
	| 'task'
	| 'decision'
	| 'inputOutput'
	| 'database'
	| 'document'
	| 'multiDocument'
	| 'delay'
	| 'preparation'
	| 'connector',
	Omit<CustomNode, 'id' | 'position'>
> = {
	start: {
		type: 'custom',
		data: { label: 'Inicio/Fin', shape: 'oval', color: '#ff0071', width: 80, height: 48 },
	},
	task: {
		type: 'custom',
		data: { label: 'Tarea', shape: 'rectangle', color: '#00ff71', width: 80, height: 48 },
	},
	decision: {
		type: 'custom',
		data: { label: 'Decisión', shape: 'diamond', color: '#0071ff', width: 80, height: 80 },
	},
	inputOutput: {
		type: 'custom',
		data: { label: 'Entrada/Salida', shape: 'parallelogram', color: '#ffaa00', width: 80, height: 48 },
	},
	database: {
		type: 'custom',
		data: { label: 'Base de Datos', shape: 'cylinder', color: '#aa00ff', width: 80, height: 48 },
	},
	document: {
		type: 'custom',
		data: { label: 'Documento', shape: 'document', color: '#00aaff', width: 80, height: 48 },
	},
	multiDocument: {
		type: 'custom',
		data: { label: 'Multi-Documento', shape: 'multi-document', color: '#ff5500', width: 80, height: 48 },
	},
	delay: {
		type: 'custom',
		data: { label: 'Retraso', shape: 'delay', color: '#55ff00', width: 80, height: 48 },
	},
	preparation: {
		type: 'custom',
		data: { label: 'Preparación', shape: 'preparation', color: '#ff00aa', width: 80, height: 48 },
	},
	connector: {
		type: 'custom',
		data: { label: 'Conector', shape: 'connector', color: '#aaaaaa', width: 40, height: 40 },
	},
};

/* =============== 3. Nodo personalizado =============== */
const CustomNodeComponent = ({
	id,
	data,
	selected,
}: NodeProps<CustomNodeData>) => {
	const [localLabel, setLocalLabel] = useState(data.label);
	const { setNodes } = useReactFlow<CustomNodeData>();

	const updateNode = (partial: Partial<CustomNodeData>) =>
		setNodes((nds) =>
			nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...partial } } : n)),
		);

	const getShapeStyle = (): React.CSSProperties => {
		const width = data.width || (data.shape === 'connector' ? 40 : 80);
		const height = data.height || (data.shape === 'connector' ? 40 : 48);

		switch (data.shape) {
			case 'oval':
				return {
					width,
					height,
					borderRadius: '50%',
					background: data.color,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				};
			case 'rectangle':
				return {
					width,
					height,
					borderRadius: 8,
					background: data.color,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				};
			case 'diamond':
				return {
					width,
					height,
					borderRadius: 0,
					transform: 'rotate(45deg)',
					background: data.color,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				};
			case 'parallelogram':
				return {
					width,
					height,
					transform: 'skewX(-20deg)',
					background: data.color,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				};
			case 'cylinder':
			case 'document':
			case 'multi-document':
			case 'delay':
			case 'preparation':
			case 'connector':
				return {
					width,
					height,
					background: 'transparent',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				};
			default:
				return {};
		}
	};

	const getSvgShape = () => {
		const width = data.width || (data.shape === 'connector' ? 40 : 80);
		const height = data.height || (data.shape === 'connector' ? 40 : 48);

		switch (data.shape) {
			case 'cylinder':
				return (
					<svg width={width} height={height} viewBox="0 0 100 60">
						<ellipse cx="50" cy="10" rx="50" ry="10" fill={data.color} opacity="0.2" />
						<rect x="0" y="10" width="100" height="40" fill={data.color} />
						<ellipse cx="50" cy="50" rx="50" ry="10" fill={data.color} opacity="0.5" />
					</svg>
				);
			case 'document':
				return (
					<svg width={width} height={height} viewBox="0 0 100 60">
						<path
							d="M10,0 H90 V40 C90,50 80,60 70,60 H30 C20,60 10,50 10,40 Z"
							fill={data.color}
						/>
					</svg>
				);
			case 'multi-document':
				return (
					<svg width={width} height={height} viewBox="0 0 100 60">
						<path
							d="M15,5 H95 V45 C95,55 85,60 75,60 H35 C25,60 15,55 15,45 Z"
							fill={data.color}
							opacity="0.3"
						/>
						<path
							d="M10,0 H90 V40 C90,50 80,60 70,60 H30 C20,60 10,50 10,40 Z"
							fill={data.color}
						/>
					</svg>
				);
			case 'delay':
				return (
					<svg width={width} height={height} viewBox="0 0 100 60">
						<path d="M0,0 H80 A20,20 0 0 1 100,20 V40 A20,20 0 0 1 80,60 H0 Z" fill={data.color} />
					</svg>
				);
			case 'preparation':
				return (
					<svg width={width} height={height} viewBox="0 0 100 60">
						<path d="M20,0 H80 L100,30 L80,60 H20 L0,30 Z" fill={data.color} />
					</svg>
				);
			case 'connector':
				return (
					<svg width={width} height={height} viewBox="0 0 40 40">
						<circle cx="20" cy="20" r="20" fill={data.color} />
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div style={{ position: 'relative', zIndex: 0 }}>
			{selected && <NodeResizer minWidth={data.shape === 'connector' ? 20 : 40} minHeight={data.shape === 'connector' ? 20 : 30} />}

			<Handle type="target" position={Position.Top} id="top" style={{ zIndex: 10 }} />
			<Handle type="source" position={Position.Bottom} id="bottom" style={{ zIndex: 10 }} />
			<Handle type="source" position={Position.Right} id="right" style={{ zIndex: 10 }} />
			<Handle type="target" position={Position.Left} id="left" style={{ zIndex: 10 }} />

			<div style={getShapeStyle()}>
				{getSvgShape()}
				<input
					value={localLabel}
					onChange={(e) => {
						setLocalLabel(e.target.value);
						updateNode({ label: e.target.value });
					}}
					style={{
						position: 'absolute',
						background: 'transparent',
						border: 'none',
						color: '#fff',
						textAlign: 'center',
						width: '90%',
						transform: data.shape === 'diamond' ? 'rotate(-45deg)' : 'none',
						zIndex: 1,
					}}
				/>
			</div>

			{selected && (
				<NodeToolbar>
					{[
						'#ff0071',
						'#00ff71',
						'#0071ff',
						'#ffaa00',
						'#aa00ff',
						'#00aaff',
						'#ff5500',
						'#55ff00',
						'#ff00aa',
					].map((c) => (
						<button
							key={c}
							onClick={() => updateNode({ color: c })}
							style={{
								background: c,
								width: 22,
								height: 22,
								border: 'none',
								cursor: 'pointer',
								margin: '2px',
							}}
						/>
					))}
				</NodeToolbar>
			)}
		</div>
	);
};

const nodeTypes: NodeTypes = { custom: CustomNodeComponent };

/* =============== 4. Canvas + Paleta =============== */
let idCounter = 1;
const getId = () => `${idCounter++}`;

const DiagramadorMapas = () => {
	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const [nodes, setNodes] = useState<CustomNode[]>([]);
	const [edges, setEdges] = useState<CustomEdge[]>([]);
	const [isPaletteVisible, setIsPaletteVisible] = useState(true);

	const onNodesChange = useCallback(
		(chs: NodeChange[]) =>
			setNodes((nds) =>
				applyNodeChanges(chs, nds).map((node) => {
					const change = chs.find(
						(ch): ch is NodeDimensionChange => ch.type === 'dimensions' && 'id' in ch && ch.id === node.id
					) as NodeDimensionChange | undefined;
					if (change && change.dimensions) {
						return {
							...node,
							data: {
								...node.data,
								width: change.dimensions.width,
								height: change.dimensions.height,
							},
						};
					}
					return node;
				}),
			),
		[],
	);
	const onEdgesChange = useCallback(
		(chs: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(chs, eds)),
		[],
	);
	const onConnect = useCallback(
		(conn: Connection) =>
			setEdges((eds) =>
				addEdge(
					{
						...conn,
						animated: true,
						type: 'straight',
						markerEnd: {
							type: MarkerType.ArrowClosed,
							color: '#000',
						},
					},
					eds
				)
			),
		[],
	);

	const onDragStart = (
		e: React.DragEvent,
		templateKey: keyof typeof nodeTemplates,
	) => {
		e.dataTransfer.setData('application/reactflow/template', templateKey);
		e.dataTransfer.effectAllowed = 'move';
	};

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	};

	const onDrop = (e: React.DragEvent) => {
		e.preventDefault();
		const templateKey = e.dataTransfer.getData(
			'application/reactflow/template'
		) as keyof typeof nodeTemplates;
		if (!templateKey) return;

		const bounds = reactFlowWrapper.current!.getBoundingClientRect();
		const position = { x: e.clientX - bounds.left, y: e.clientY - bounds.top };

		setNodes((nds) =>
			nds.concat({
				id: getId(),
				position,
				...nodeTemplates[templateKey],
				isConnectable: true,
			} as CustomNode)
		);
	};

	const getPaletteShapeStyle = (shape: CustomNodeData['shape'], color: string): React.CSSProperties => {
		const size = shape === 'connector' ? 20 : 40;
		switch (shape) {
			case 'oval':
				return { width: size, height: size * 0.6, borderRadius: '50%', background: color };
			case 'rectangle':
				return { width: size, height: size * 0.6, borderRadius: 4, background: color };
			case 'diamond':
				return { width: size, height: size, transform: 'rotate(45deg)', background: color };
			case 'parallelogram':
				return { width: size, height: size * 0.6, transform: 'skewX(-20deg)', background: color };
			default:
				return { width: size, height: size * (shape === 'connector' ? 1 : 0.6), background: 'transparent' };
		}
	};

	const getPaletteSvgShape = (shape: CustomNodeData['shape'], color: string) => {
		const size = shape === 'connector' ? 20 : 40;
		switch (shape) {
			case 'cylinder':
				return (
					<svg width={size} height={size * 0.6} viewBox="0 0 100 60">
						<ellipse cx="50" cy="10" rx="50" ry="10" fill={color} opacity="0.2" />
						<rect x="0" y="10" width="100" height="40" fill={color} />
						<ellipse cx="50" cy="50" rx="50" ry="10" fill={color} opacity="0.5" />
					</svg>
				);
			case 'document':
				return (
					<svg width={size} height={size * 0.6} viewBox="0 0 100 60">
						<path
							d="M10,0 H90 V40 C90,50 80,60 70,60 H30 C20,60 10,50 10,40 Z"
							fill={color}
						/>
					</svg>
				);
			case 'multi-document':
				return (
					<svg width={size} height={size * 0.6} viewBox="0 0 100 60">
						<path
							d="M15,5 H95 V45 C95,55 85,60 75,60 H35 C25,60 15,55 15,45 Z"
							fill={color}
							opacity="0.3"
						/>
						<path
							d="M10,0 H90 V40 C90,50 80,60 70,60 H30 C20,60 10,50 10,40 Z"
							fill={color}
						/>
					</svg>
				);
			case 'delay':
				return (
					<svg width={size} height={size * 0.6} viewBox="0 0 100 60">
						<path d="M0,0 H80 A20,20 0 0 1 100,20 V40 A20,20 0 0 1 80,60 H0 Z" fill={color} />
					</svg>
				);
			case 'preparation':
				return (
					<svg width={size} height={size * 0.6} viewBox="0 0 100 60">
						<path d="M20,0 H80 L100,30 L80,60 H20 L0,30 Z" fill={color} />
					</svg>
				);
			case 'connector':
				return (
					<svg width={size} height={size} viewBox="0 0 40 40">
						<circle cx="20" cy="20" r="20" fill={color} />
					</svg>
				);
			default:
				return null;
		}
	};

	return (
		<div className="modelado-negocio">
			<h1 className="modelado-title">Modelado de Negocio</h1>

			{isPaletteVisible && (
				<aside className="sidebar">
					<p>Arrastra una figura:</p>
					{(Object.entries(nodeTemplates) as [keyof typeof nodeTemplates, any][]).map(
						([key, tpl]) => (
							<div
								key={key}
								onDragStart={(e) => onDragStart(e, key)}
								draggable
								className={`dnd-node ${tpl.data.shape}`}
							>
								<div style={getPaletteShapeStyle(tpl.data.shape, tpl.data.color)}>
									{getPaletteSvgShape(tpl.data.shape, tpl.data.color)}
								</div>
							</div>
						),
					)}
				</aside>
			)}

			<button
				className="toggle-palette"
				onClick={() => setIsPaletteVisible(!isPaletteVisible)}
			>
				{isPaletteVisible ? 'Ocultar Paleta' : 'Mostrar Paleta'}
			</button>

			<div
				className="reactflow-wrapper"
				ref={reactFlowWrapper}
				style={{ height: 650, width: '100%' }}
			>
				<ReactFlowProvider>
					<ReactFlow
						nodes={nodes}
						edges={edges}
						onNodesChange={onNodesChange}
						onEdgesChange={onEdgesChange}
						onConnect={onConnect}
						nodeTypes={nodeTypes}
						fitView
						onDragOver={onDragOver}
						onDrop={onDrop}
					>
						<Background />
						<MiniMap zoomable pannable className='minimap' />
						<Controls />
					</ReactFlow>
				</ReactFlowProvider>
			</div>
		</div>
	);
};

export default DiagramadorMapas;