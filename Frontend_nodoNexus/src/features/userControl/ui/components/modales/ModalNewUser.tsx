import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { closeModal, openModal } from '../../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import { registerUserSchema } from '../../../domain/schema/registerUserSchema';
import { tiposIdentidad } from '../../../../../shared/types/tiposIdentidad';
import { roles } from '../../../../../shared/types/roles';
import { addUser } from '../../../infraestructure/redux/userSlice';
import { AppDispatch } from '../../../../../app/store';
import './modalUserNew.scss';

const initialValues = {
	email: '',
	role: '',
	primerNombre: '',
	primerApellido: '',
	tipoIdentidad: '',
	numeroIdentidad: '',
	telefono: '',
};

const ModalNewUser = () => {
	const dispatch = useDispatch<AppDispatch>();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = async (values: typeof initialValues) => {
		setError(null);
		const userData = {
			email: values.email,
			primerNombre: values.primerNombre,
			primerApellido: values.primerApellido,
			tipoIdentidad: values.tipoIdentidad,
			numeroIdentidad: values.numeroIdentidad,
			telefono: values.telefono || null,
			role: values.role,
		};

		try {
			console.log("Valores enviados:", userData);
			await dispatch(addUser(userData)).unwrap();
			dispatch(
				openModal({
					modalType: 'success',
					title: 'Usuario Creado',
					message: 'El usuario ha sido creado exitosamente.',
					variant: 'success',
					autoClose: true,
				})
			);
			dispatch(closeModal());
		} catch (err: any) {
			console.error('Error en handleSubmit:', err);
			setError(err.message || 'Error al crear usuario');
			dispatch(
				openModal({
					modalType: 'error',
					title: 'Error',
					message: err.message || 'No se pudo crear el usuario. Por favor, intenta nuevamente.',
					variant: 'error',
					autoClose: true,
				})
			);
		}
	};

	return (
		<div className="containerNewUser">
			<div className="containerNewUser-info">
				<p>Los campos marcados con (*) son obligatorios</p>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={registerUserSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className="formContainer">
						{error && <p className="errorServer">{error}</p>}
						<fieldset>
							<div>
								<label htmlFor="primerNombre" className="required">Primer Nombre</label>
								<Field type="text" name="primerNombre" />
								<ErrorMessage name="primerNombre" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="primerApellido" className="required">Primer Apellido</label>
								<Field type="text" name="primerApellido" />
								<ErrorMessage name="primerApellido" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="tipoIdentidad" className="required">Tipo de Identidad</label>
								<Field as="select" name="tipoIdentidad">
									<option value="">Seleccione tipo de identidad</option>
									{tiposIdentidad.map((tipo) => (
										<option key={tipo.value} value={tipo.value}>
											{tipo.label}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoIdentidad" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="numeroIdentidad" className="required">Número de Identidad</label>
								<Field type="text" name="numeroIdentidad" />
								<ErrorMessage name="numeroIdentidad" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="telefono" className='required'>Teléfono</label>
								<Field type="text" name="telefono" />
								<ErrorMessage name="telefono" component="p" className="errorForm" />
							</div>
						</fieldset>
						<fieldset>
							<legend>Información de Cuenta</legend>
							<div>
								<label htmlFor="email" className="required">Correo Electrónico</label>
								<Field type="email" name="email" />
								<ErrorMessage name="email" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="role" className="required">Rol del Usuario</label>
								<Field as="select" name="role">
									<option value="">Seleccione un rol</option>
									{roles.map((rol) => (
										<option key={rol.value} value={rol.value}>
											{rol.label}
										</option>
									))}
								</Field>
								<ErrorMessage name="role" component="p" className="errorForm" />
							</div>
						</fieldset>
						<div className="formButton">
							<button
								type="button"
								className="cancel-button"
								onClick={() => dispatch(closeModal())}
								disabled={isSubmitting}
							>
								Cancelar
							</button>
							<button
								type="submit"
								className="submit-button"
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Creando Usuario...' : 'Crear Usuario'}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default ModalNewUser;