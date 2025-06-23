import Construction from '../../../../shared/components/menssageInfo/Construction';
import CardProyectoInfo from '../../../proyectos/ui/components/proyectosControl/cardProyectoInfo';
import UserControlLists from '../../../userControl/ui/components/UserControlLists';
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
          <UserControlLists />
        </div>
      </section>
    </>
  )
}

export default AdminDashboard
