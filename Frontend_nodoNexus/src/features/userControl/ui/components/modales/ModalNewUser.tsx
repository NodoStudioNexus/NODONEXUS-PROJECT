import { useDispatch } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { closeModal, openModal } from "../../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice";
import { registerUserSchema } from "../../../domain/schema/registerUserSchema";
import { tiposIdentidad } from "../../../../../shared/types/tiposIdentidad";
import { roles } from "../../../../../shared/types/roles";

import './modalUserNew.scss';

const initialValues = {
	email: '',
	password: '',
	confirmPassword: '',
	role: '',
	primerNombre: '',
	primerApellido: '',
	tipoIdentidad: '',
	numeroIdentidad: '',
};

const ModalNewUser = () => {
	const dispatch = useDispatch();

	const handleSubmit = async (values: typeof initialValues) => {

		const valuesWithPassword = {
			...values,
			password: values.numeroIdentidad,
			confirmPassword: values.numeroIdentidad
		};

		console.log("Valores enviados:", valuesWithPassword);

		dispatch(
			openModal({
				modalType: 'sending',
				title: 'Creando usuario...',
				message: 'Por favor espera mientras procesamos la información...',
				variant: 'info',
				autoClose: false,
				extraClasses: 'modalConfirm',
			})
		);
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
				{({ isSubmitting, values }) => (
					<Form className="formContainer">
						{/* Información Personal */}
						<fieldset>
							<div>
								<label htmlFor="primerNombre" className="required">
									Primer Nombre
								</label>
								<Field type="text" name="primerNombre" />
								<ErrorMessage name="primerNombre" component="p" className="errorForm" />
							</div>

							{/* Primer Apellido */}
							<div>
								<label htmlFor="primerApellido" className="required">
									Primer Apellido
								</label>
								<Field
									type="text"
									name="primerApellido"
								/>
								<ErrorMessage name="primerApellido" component="p" className="errorForm" />
							</div>

							{/* Tipo de Identidad */}
							<div>
								<label htmlFor="tipoIdentidad" className="required">
									Tipo de Identidad
								</label>
								<Field as="select" name="tipoIdentidad">
									<option value="">Seleccione tipo de identidad</option>
									{tiposIdentidad.map(tipo => (
										<option key={tipo.value} value={tipo.value}>
											{tipo.label}
										</option>
									))}
								</Field>
								<ErrorMessage name="tipoIdentidad" component="p" className="errorForm" />
							</div>

							{/* Número de Identidad */}
							<div>
								<label htmlFor="numeroIdentidad" className="required">
									Número de Identidad
								</label>
								<Field
									type="text"
									name="numeroIdentidad"
								/>
								<ErrorMessage name="numeroIdentidad" component="p" className="errorForm" />
							</div>
						</fieldset>

						<fieldset>
							<legend>Información de Cuenta</legend>

							{/* Email */}
							<div>
								<label htmlFor="email" className="required">
									Correo Electrónico
								</label>
								<Field
									type="email"
									name="email"
								/>
								<ErrorMessage name="email" component="p" className="errorForm" />
							</div>

							{/* Rol */}
							<div>
								<label htmlFor="role" className="required">
									Rol del Usuario
								</label>

								<Field as="select" name="role">
									<option value="">Seleccione un rol</option>
									{roles.map(rol => (
										<option key={rol.value} value={rol.value}>
											{rol.label}
										</option>
									))}
								</Field>
								<ErrorMessage name="role" component="p" className="errorForm" />
							</div>

							{/* Password */}
							<div>
								<label htmlFor="password" className="required">
									Contraseña
								</label>
								<Field
									type="password"
									name="password"
									value={values.numeroIdentidad}
									readOnly // Hacer el campo de solo lectura
									className="read-only-field" // Opcional: añadir clase para estilo
								/>
								<ErrorMessage name="password" component="p" className="errorForm" />
							</div>

							{/* Confirm Password */}
							<div>
								<label htmlFor="confirmPassword" className="required">
									Confirmar Contraseña
								</label>
								<Field
									type="password"
									name="confirmPassword"
									value={values.numeroIdentidad}
									readOnly // Hacer el campo de solo lectura
									className="read-only-field" // Opcional: añadir clase para estilo
								/>
								<ErrorMessage name="confirmPassword" component="p" className="errorForm" />
							</div>
						</fieldset>

						{/* Botones */}
						<div className="formButton" >
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