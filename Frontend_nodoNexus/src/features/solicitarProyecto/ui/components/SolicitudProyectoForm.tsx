import { useDispatch } from 'react-redux';
import { openModal, closeModal } from '../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { crearSolicitudUseCase } from '../../domain/useCases/crearSolicitudUseCase';
import { solicitudProyectoApi } from '../../infraestructure/solicitudProyectoApi';
import { solicitudProyectoSchema } from '../../domain/schemas/SolicitudProyectoShema';

import './solicitudProyectoForm.scss';

const initialValues = {
	email: '',
	nombre: '',
	apellido: '',
	numeroIdentidad: '',
	numeroTelefono: '',
	tipoProyecto: '',
	descripcion: '',
	presupuesto: '',
	presupuestoMax: '',
	nombreProyecto: '',
	plazoEstimado: '',
	archivosAdjuntos: '',
};

const SolicitudProyectoForm = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (values: typeof initialValues) => {
		// Paso 1: Abrir modal de "Enviando..."
		dispatch(
			openModal({
				modalType: 'sending',
				title: 'Enviando solicitud ... ',
				message: 'Por favor espera mientras procesamos tu solicitud...',
				variant: 'confirm',
				autoClose: false,
				extraClasses: 'modalConfirm',
			})
		);

		try {
			// Convertimos los campos numéricos de string a number donde sea necesario
			const dataToSend = {
				...values,
				presupuesto: values.presupuesto ? Number(values.presupuesto) : undefined,
				presupuestoMax: values.presupuestoMax ? Number(values.presupuestoMax) : undefined,
				plazoEstimado: values.plazoEstimado ? Number(values.plazoEstimado) : undefined,
			};

			// Enviar la solicitud
			await crearSolicitudUseCase(solicitudProyectoApi, dataToSend);

			// Paso 2: Cerrar modal de "Enviando..." y abrir modal de éxito
			dispatch(closeModal());
			dispatch(
				openModal({
					modalType: 'success',
					title: 'Solicitud enviada',
					message: 'Tu solicitud se envió exitosamente.',
					variant: 'confirm',
					autoClose: false,
					extraClasses: 'modalConfirm',
				})
			);
		} catch (error) {
			// Paso 3: Cerrar modal de "Enviando..." y abrir modal de error
			dispatch(closeModal());
			dispatch(
				openModal({
					modalType: 'error',
					title: 'Error al enviar',
					message: 'Hubo un error al enviar la solicitud. Intenta nuevamente.',
					variant: 'error',
					autoClose: true,
					extraClasses: 'modalError',
				})
			);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={solicitudProyectoSchema}
			onSubmit={handleSubmit}
		>
			{({ isSubmitting }) => (
				<Form className="formContainer">
					{/* Campo Email */}
					<fieldset>
						<div>
							<label htmlFor="email" className="required">
								Email
							</label>
							<Field type="email" name="email" />
							<ErrorMessage name="email" component="p" className="errorForm" />
						</div>
						{/* Campo Nombre */}
						<div>
							<label htmlFor="nombre" className="required">
								Nombre
							</label>
							<Field type="text" name="nombre" />
							<ErrorMessage name="nombre" component="p" className="errorForm" />
						</div>
						{/* Campo Apellido */}
						<div>
							<label htmlFor="apellido" className="required">
								Apellido
							</label>
							<Field type="text" name="apellido" />
							<ErrorMessage name="apellido" component="p" className="errorForm" />
						</div>
					</fieldset>
					<fieldset>
						{/* Campo Número de Identidad */}
						<div>
							<label htmlFor="numeroIdentidad" className="required">
								Número de Identidad
							</label>
							<Field type="text" name="numeroIdentidad" />
							<ErrorMessage name="numeroIdentidad" component="p" className="errorForm" />
						</div>
						{/* Campo Número de Teléfono */}
						<div>
							<label htmlFor="numeroTelefono" className="required">
								Número de Teléfono
							</label>
							<Field type="text" name="numeroTelefono" />
							<ErrorMessage name="numeroTelefono" component="p" className="errorForm" />
						</div>
						{/* Campo Tipo de Proyecto */}
						<div>
							<label htmlFor="tipoProyecto" className="required">
								Seleccionar tipo de proyecto
							</label>
							<Field as="select" name="tipoProyecto">
								<option value=""></option>
								<option value="Web">Web</option>
								<option value="Móvil">Móvil</option>
								<option value="Desktop">Desktop</option>
								<option value="IoT">IoT</option>
								<option value="Otro">Otro</option>
							</Field>
							<ErrorMessage name="tipoProyecto" component="p" className="errorForm" />
						</div>
					</fieldset>
					<fieldset>
						{/* Campo Descripción */}
						<div>
							<label htmlFor="descripcion" className="required">
								Descripción
							</label>
							<Field as="textarea" name="descripcion" />
							<ErrorMessage name="descripcion" component="p" className="errorForm" />
						</div>
					</fieldset>
					<fieldset>
						{/* Campo Presupuesto Mínimo */}
						<div>
							<label htmlFor="presupuesto">Presupuesto Mínimo</label>
							<Field type="number" name="presupuesto" />
							<ErrorMessage name="presupuesto" component="p" className="errorForm" />
						</div>
						{/* Campo Presupuesto Máximo */}
						<div>
							<label htmlFor="presupuestoMax">Presupuesto Máximo</label>
							<Field type="number" name="presupuestoMax" />
							<ErrorMessage name="presupuestoMax" component="p" className="errorForm" />
						</div>
						{/* Campo Nombre del Proyecto */}
						<div>
							<label htmlFor="nombreProyecto" className="required">
								Nombre del Proyecto
							</label>
							<Field type="text" name="nombreProyecto" />
							<ErrorMessage name="nombreProyecto" component="p" className="errorForm" />
						</div>
					</fieldset>
					<fieldset>
						{/* Campo Plazo Estimado */}
						<div>
							<label htmlFor="plazoEstimado">Plazo Estimado (días)</label>
							<Field type="number" name="plazoEstimado" />
							<ErrorMessage name="plazoEstimado" component="p" className="errorForm" />
						</div>
						{/* Campo Archivos Adjuntos */}
						<div>
							<label htmlFor="archivosAdjuntos">Archivos Adjuntos (URL)</label>
							<Field type="text" name="archivosAdjuntos" />
							<ErrorMessage name="archivosAdjuntos" component="p" className="errorForm" />
						</div>
					</fieldset>
					{/* Botón de Envío */}
					<button type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default SolicitudProyectoForm;