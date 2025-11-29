import './AdminMenu.css'
function AdminMenu({event, text, icon}) {
    return (
        <div className="adminMenu" onClick={event}>
           <img src= {icon} alt="Logo seccion" />
           <h3>{text}</h3>
        </div>

    );

}

export default AdminMenu;