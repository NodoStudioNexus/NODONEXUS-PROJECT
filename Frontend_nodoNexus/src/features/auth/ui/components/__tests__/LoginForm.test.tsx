import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore, { MockStore } from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import { login } from '../../../infraestructure/redux/authSlice';
import LoginForm from '../LoginForm';
import { RootState } from '../../../../../app/store';
import '@testing-library/jest-dom'; // Para toBeDisabled

// Mock de react-router-dom
jest.mock('react-router-dom', () => {
	const originalModule = jest.requireActual('react-router-dom'); // Mantén las implementaciones originales
	return {
		...originalModule,
		useNavigate: jest.fn(), // Mockeamos useNavigate como una función simulada
	};
});

// Mock de la acción login
jest.mock('../../../infraestructure/redux/authSlice', () => ({
	login: jest.fn() as jest.Mock,
}));

type PartialRootState = Partial<RootState>;
const mockStore = configureStore<PartialRootState>([]);


describe('LoginForm', () => {
	let store: MockStore<PartialRootState>;

	beforeEach(() => {
		store = mockStore({
			auth: {
				user: null,
				loading: false,
				error: null,
			},
		});
	});

	// 1. Renderizado inicial
	it('renderiza los campos de email y contraseña', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginForm />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByPlaceholderText('Correo electrónico')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
		expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
	});

	// 2. Validación del formulario
	it('muestra errores de validación cuando los campos son inválidos', async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginForm />
				</MemoryRouter>
			</Provider>
		);

		// Simula el envío del formulario sin llenar los campos
		const submitButton = screen.getByText('Iniciar sesión');
		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
			expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
		});
	});

	// 3. Errores del servidor
	it('muestra el error del servidor cuando existe', () => {
		store = mockStore({
			auth: {
				user: null,
				loading: false,
				error: 'Credenciales inválidas',
			},
		});

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginForm />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
	});


	// 6. Envío del formulario
	it('despacha la acción login con los valores correctos al enviar el formulario', async () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginForm />
				</MemoryRouter>
			</Provider>
		);

		const emailInput = screen.getByPlaceholderText('Correo electrónico');
		const passwordInput = screen.getByPlaceholderText('Contraseña');
		const submitButton = screen.getByText('Iniciar sesión');

		// Limpia los campos antes de escribir
		await userEvent.clear(emailInput);
		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.clear(passwordInput);
		await userEvent.type(passwordInput, 'password123');

		// Simula el envío del formulario
		await userEvent.click(submitButton);

		await waitFor(() => {
			expect(login).toHaveBeenCalledWith({
				email: 'test@example.com',
				password: 'password123',
			});
		});
	});
});