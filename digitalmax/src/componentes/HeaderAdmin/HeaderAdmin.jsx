import '../HeaderAdmin/HeaderAdmin.css'
import logo from '../../assets/img/Logo_digitalmax.png'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'



function Header() {
  const [menu, setMenu] = useState(false)
  const cambioMenu = () => {
    setMenu(!menu)
  }
  const navigate = useNavigate();


  const handleAccessProduct = () => {
    navigate('/app/productos')
    setMenu(false)
  }
  return (
    <header className='headerComponentAdmin'>
      <div onClick={handleAccessProduct}>
        <img className='logoEcommer' src={logo} alt="DigitalMax" />
        <h2>Administrador DigitalMax</h2>
      </div>
    </header>
  );
}

export default Header;