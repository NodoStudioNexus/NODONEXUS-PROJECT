import { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';
import { cotizacionSchema } from '../../../domain/schemas/cotizacionSchema';
import './detallesSolicitud.scss';
import './formularioCotizacion.scss';
import { createCotizacion } from '../../../infraestructure/api/nuevoProyectoApi';
import { RootState } from '../../../../../app/store';

interface FormularioCotizacionProps {
	solicitudId: number;
}

const FormularioCotizacion: React.FC<FormularioCotizacionProps> = ({ solicitudId }) => {
	const [error, setError] = useState<string | null>(null);
	const dispatch = useDispatch();
	const token = useSelector((state: RootState) => state.auth.user?.token);

	const initialValues = {
		costoTotal: '',
		materiales: '',
		mano_obra: '',
		tiempoAnalisis: '',
		tiempoDesarrollo: '',
		alcance: '',
		expiracion: '',
		archivoUrl: '',
	};
	const handleSubmit = async (values: typeof initialValues) => {
		console.log('Token antes de enviar:', token); // Depuración
		setError(null); // Limpiar errores previos
		const cotizacionData = {
			solicitudId: solicitudId,
			costoTotal: parseFloat(values.costoTotal),
			desgloseCostos: JSON.stringify({
				materiales: parseFloat(values.materiales),
				mano_obra: parseFloat(values.mano_obra),
			}),
			tiemposEstimados: JSON.stringify({
				analisis: parseInt(values.tiempoAnalisis),
				desarrollo: parseInt(values.tiempoDesarrollo),
			}),
			alcance: values.alcance,
			expiracion: new Date(values.expiracion).toISOString(),
			archivoUrl: values.archivoUrl,
		};

		try {
			await createCotizacion(cotizacionData, token!);
			dispatch(closeModal());
		} catch (err: any) {
			if (err.response && err.response.status === 401) {
				setError('Error de autenticación: Revisa tu token o inicia sesión nuevamente.');
			} else {
				setError(err.response?.data?.message || 'Hubo un error al enviar la cotización.');
			}
		}
	};
	return (
		<div className="containerCotizacion">
			<div className="containerCotizacion-info">
				<h3>Formulario de cotización</h3>
			</div>
			<Formik
				initialValues={initialValues}
				validationSchema={cotizacionSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form className="formContainer">
						{error && <p className="errorServer">{error}</p>}
						<fieldset>
							<legend>Costos</legend>
							<div>
								<label htmlFor="costoTotal" className="required">Costo Total ($)</label>
								<Field id="costoTotal" name="costoTotal" type="number" step="0.01" disabled={isSubmitting} />
								<ErrorMessage name="costoTotal" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="materiales" className="required">Materiales ($)</label>
								<Field id="materiales" name="materiales" type="number" step="0.01" disabled={isSubmitting} />
								<ErrorMessage name="materiales" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="mano_obra" className="required">Mano de Obra ($)</label>
								<Field id="mano_obra" name="mano_obra" type="number" step="0.01" disabled={isSubmitting} />
								<ErrorMessage name="mano_obra" component="p" className="errorForm" />
							</div>
						</fieldset>

						<fieldset>
							<legend>Tiempos Estimados</legend>
							<div>
								<label htmlFor="tiempoAnalisis" className="required">Tiempo Análisis (días)</label>
								<Field id="tiempoAnalisis" name="tiempoAnalisis" type="number" disabled={isSubmitting} />
								<ErrorMessage name="tiempoAnalisis" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="tiempoDesarrollo" className="required">Tiempo Desarrollo (días)</label>
								<Field id="tiempoDesarrollo" name="tiempoDesarrollo" type="number" disabled={isSubmitting} />
								<ErrorMessage name="tiempoDesarrollo" component="p" className="errorForm" />
							</div>
						</fieldset>

						<fieldset>
							<legend>Detalles Adicionales</legend>
							<div>
								<label htmlFor="alcance" className="required">Alcance del Proyecto</label>
								<Field as="textarea" id="alcance" name="alcance" rows={4} disabled={isSubmitting} />
								<ErrorMessage name="alcance" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="expiracion" className="required">Fecha de Expiración</label>
								<Field id="expiracion" name="expiracion" type="datetime-local" disabled={isSubmitting} />
								<ErrorMessage name="expiracion" component="p" className="errorForm" />
							</div>
							<div>
								<label htmlFor="archivoUrl">URL del Archivo (PDF)</label>
								<Field
									id="archivoUrl"
									name="archivoUrl"
									type="url"
									placeholder="https://ejemplo.com/cotizacion.pdf"
									disabled={isSubmitting}
								/>
								<ErrorMessage name="archivoUrl" component="p" className="errorForm" />
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
							<button type="submit" className="submit-button" disabled={isSubmitting}>
								{isSubmitting ? 'Enviando...' : 'Enviar Cotización'}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default FormularioCotizacion;