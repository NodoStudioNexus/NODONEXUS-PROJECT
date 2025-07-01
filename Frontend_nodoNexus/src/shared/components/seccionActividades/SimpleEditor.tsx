import { useEffect, useState, useRef } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Editor } from '@tiptap/core';
import {
	FaBold,
	FaItalic,
	FaUnderline,
	FaHighlighter,
	FaHeading,
	FaParagraph,
	FaAlignLeft,
	FaAlignCenter,
	FaAlignRight,
	FaTasks,
	FaLink,
	FaImage,
	FaUndo,
	FaRedo,
	FaSave,
} from 'react-icons/fa';
import './simpleEditor.scss';

interface SimpleEditorProps {
	onChange?: (content: string) => void;
	onSave?: (content: string) => void;
	initialContent?: string;
}

export default function SimpleEditor({ onChange, onSave, initialContent }: SimpleEditorProps) {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 480);
	const fileInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const handleResize = () => setIsMobile(window.innerWidth <= 480);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const editor = useEditor({
		extensions: [
			StarterKit,
			TextAlign.configure({ types: ['heading', 'paragraph'] }),
			Underline,
			Image,
			Link.configure({ openOnClick: false }),
			Highlight.configure({ multicolor: true }),
			TaskList,
			TaskItem.configure({ nested: true }),
		],
		content: initialContent ?? '<p>Escribe aquí tu contenido…</p>',
		editorProps: {
			attributes: {
				class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none',
				autocomplete: 'off',
				autocorrect: 'off',
				autocapitalize: 'off',
				'aria-label': 'Área de contenido principal, empieza a escribir.',
			},
		},
		onUpdate({ editor }) {
			onChange?.(editor.getHTML());
		},
	});

	const handleSave = () => {
		if (editor) {
			const content = editor.getHTML();
			onSave?.(content);
			console.log('Contenido guardado:', content);
		}
	};

	const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file && editor) {
			const reader = new FileReader();
			reader.onload = (e) => {
				const src = e.target?.result as string;
				const width = prompt('Ingresa el ancho de la imagen (en px):');
				const attrs = width ? { src, width } : { src };
				editor.chain().focus().setImage(attrs).run();
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="simple-editor">
			<MenuBar
				editor={editor}
				isMobile={isMobile}
				onSave={handleSave}
				onImageClick={() => fileInputRef.current?.click()}
			/>
			<div className="content-wrapper">
				<EditorContent editor={editor} className="simple-editor-content" />
			</div>
			<input
				type="file"
				accept="image/*"
				ref={fileInputRef}
				style={{ display: 'none' }}
				onChange={handleImageUpload}
			/>
		</div>
	);
}

interface MenuBarProps {
	editor: Editor | null;
	isMobile: boolean;
	onSave: () => void;
	onImageClick: () => void;
}

function MenuBar({ editor, isMobile, onSave, onImageClick }: MenuBarProps) {
	if (!editor) return null;

	interface Command {
		name: string;
		attrs?: any;
		execute: () => void;
		icon: React.ComponentType;
		label: string;
	}

	const btn = (command: Command, disabled = false) => (
		<button
			className={editor.isActive(command.name, command.attrs) ? 'is-active' : ''}
			onClick={command.execute}
			disabled={disabled}
			title={command.label}
		>
			<command.icon />
			{isMobile && <span>{command.label}</span>}
		</button>
	);

	return (
		<div className="toolbar">
			{isMobile ? (
				<div className="toolbar-mobile">
					{btn(
						{
							name: 'bold',
							execute: () => editor.chain().focus().toggleBold().run(),
							icon: FaBold,
							label: 'Negrita',
						},
						false
					)}
					{btn(
						{
							name: 'italic',
							execute: () => editor.chain().focus().toggleItalic().run(),
							icon: FaItalic,
							label: 'Itálica',
						},
						false
					)}
					<button
						onClick={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().undo()}
						title="Deshacer"
					>
						<FaUndo />
						{isMobile && <span>Deshacer</span>}
					</button>
					<button onClick={onSave} title="Guardar">
						<FaSave />
						{isMobile && <span>Guardar</span>}
						COntent-Type: </button>
				</div>
			) : (
				<>
					<div className="toolbar-group">
						<button
							onClick={() => editor.chain().focus().undo().run()}
							disabled={!editor.can().undo()}
							title="Deshacer"
						>
							<FaUndo />
						</button>
						<button
							onClick={() => editor.chain().focus().redo().run()}
							disabled={!editor.can().redo()}
							title="Rehacer"
						>
							<FaRedo />
						</button>
					</div>
					<div className="toolbar-separator" />
					<div className="toolbar-group">
						{btn({
							name: 'heading',
							attrs: { level: 1 },
							execute: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
							icon: FaHeading,
							label: 'Encabezado 1',
						})}
						{btn({
							name: 'heading',
							attrs: { level: 2 },
							execute: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
							icon: FaHeading,
							label: 'Encabezado 2',
						})}
						{btn({
							name: 'paragraph',
							execute: () => editor.chain().focus().setParagraph().run(),
							icon: FaParagraph,
							label: 'Párrafo',
						})}
					</div>
					<div className="toolbar-separator" />
					<div className="toolbar-group">
						{btn({
							name: 'bold',
							execute: () => editor.chain().focus().toggleBold().run(),
							icon: FaBold,
							label: 'Negrita',
						})}
						{btn({
							name: 'italic',
							execute: () => editor.chain().focus().toggleItalic().run(),
							icon: FaItalic,
							label: 'Itálica',
						})}
						{btn({
							name: 'underline',
							execute: () => editor.chain().focus().toggleUnderline().run(),
							icon: FaUnderline,
							label: 'Subray  Subrayado',
						})}
						{btn({
							name: 'highlight',
							execute: () => editor.chain().focus().toggleHighlight().run(),
							icon: FaHighlighter,
							label: 'Resaltar',
						})}
					</div>
					<div className="toolbar-separator" />
					<div className="toolbar-group">
						{btn({
							name: 'textAlign',
							attrs: { textAlign: 'left' },
							execute: () => editor.chain().focus().setTextAlign('left').run(),
							icon: FaAlignLeft,
							label: 'Alinear a la izquierda',
						})}
						{btn({
							name: 'textAlign',
							attrs: { textAlign: 'center' },
							execute: () => editor.chain().focus().setTextAlign('center').run(),
							icon: FaAlignCenter,
							label: 'Alinear al centro',
						})}
						{btn({
							name: 'textAlign',
							attrs: { textAlign: 'right' },
							execute: () => editor.chain().focus().setTextAlign('right').run(),
							icon: FaAlignRight,
							label: 'Alinear a la derecha',
						})}
					</div>
					<div className="toolbar-separator" />
					<div className="toolbar-group">
						{btn({
							name: 'taskList',
							execute: () => editor.chain().focus().toggleTaskList().run(),
							icon: FaTasks,
							label: 'Lista de tareas',
						})}
						<button
							onClick={() => {
								const url = prompt('Ingresa la URL:');
								if (url) editor.chain().focus().setLink({ href: url }).run();
							}}
							className={editor.isActive('link') ? 'is-active' : ''}
							title="Enlace"
						>
							<FaLink />
						</button>
						<button onClick={onImageClick} title="Imagen">
							<FaImage />
						</button>
					</div>
					<div className="toolbar-separator" />
					<div className="toolbar-group">
						<button onClick={onSave} title="Guardar">
							<FaSave />
						</button>
					</div>
				</>
			)}
		</div>
	);
}