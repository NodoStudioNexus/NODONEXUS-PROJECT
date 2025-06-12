import { useState } from "react";
import ButtonNewUser from "./ButtonNewUser";
import ButtonNewRole from "./ButttonNewRole";

import './usersListsMenu.scss';
import UserControlLists from "./UserControlLists";

const UsersListsMenu = () => {

	const [activeTab, setActiveTab] = useState('userControl');

	return (
		<>
			<section className="containerListsControlUsers">
				<div className="containerListsControlUsers-menu">
					<div>
						<button onClick={() => setActiveTab('userControl')} className={activeTab === 'userControl' ? 'active' : ' '}>Control de usuarios</button>
						<button onClick={() => setActiveTab('roleControl')} className={activeTab === 'roleControl' ? 'active' : ' '}>Control de roles</button>
					</div>
					<div>
						{activeTab === 'userControl' && <ButtonNewUser />}
						{activeTab === 'roleControl' && <ButtonNewRole />}
					</div>
				</div>
				<div className="containerListsControlUsers-content" >
					{activeTab === 'userControl' && <UserControlLists />}
					{activeTab === 'roleControl' && <div>Todo soibre los roles ...</div>}
				</div>
			</section>
		</>
	)
}
export default UsersListsMenu;