import { BiPlus } from 'react-icons/bi';
import './buttonNewUser.scss';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../shared/components/modals/infraestructure/redux/modalGlobalSlice';

const ButtonNewUser = () => {

	const dispatch = useDispatch();

	const handleNewUserClick = () => {
		dispatch(
			openModal({
				modalType: 'FormNewUser',
				title: 'Crear Nuevo Usuario',
				message: '',
				autoClose: false,
				variant: "formsModal",
				extraClasses: 'modalConfirm',
			})
		);
	}


	return (
		<>
			<a className="buttonNewUser" onClick={handleNewUserClick} > <span><BiPlus /> </span>Nuevo Usuario</a>
		</>
	)
}

export default ButtonNewUser;