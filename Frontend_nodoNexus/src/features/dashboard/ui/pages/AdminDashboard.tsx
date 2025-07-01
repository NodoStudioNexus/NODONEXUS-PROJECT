import Construction from '../../../../shared/components/menssageInfo/Construction';
import CardProyectoInfo from '../../../proyectos/ui/components/proyectosControlAdmin/cardProyectoInfo';
import UserControlListsHome from '../../../userControl/ui/components/UsersControlListHome';
import './adminDashboard.scss';
const AdminDashboard = () => {
  return (
    <>
      <section className="containerAdminDashboard">
        <div className='containerAdminDashboard-left'>
          <section className='containerDashboard-left-one'>
            <CardProyectoInfo />
          </section>
          <section className='containerDashboard-left-two'>
            <Construction />
          </section>
        </div>
        <div className='containerAdminDashboard-right'>
          <UserControlListsHome />
        </div>
      </section>
    </>
  )
}

export default AdminDashboard
