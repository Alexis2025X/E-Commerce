import HamburguerMenu from "../componentes/HamburguerMenu/HamburguerMenu";
import { Outlet } from "react-router-dom";
function LayoutMenuHamburguesa(){
    return(
        <>
        {/* <HamburguerMenu /> */}
        <main>
            <Outlet />
        </main>
        </>
    );
}
export default LayoutMenuHamburguesa