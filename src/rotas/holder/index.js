import "./index.css"
import { useNavigate } from "react-router-dom";
import { Button } from 'semantic-ui-react'
import Busca from "../busca";
import ico from "./../../asserts/ico.png"

function Header({ login, setToken }) {
    const navigate = useNavigate();

    const click = (ir) => {
        if(ir === "sair"){
            setToken(null);
            localStorage.removeItem("token");
            navigate("/entrar");
            return;
        }
            
        navigate(ir);
    }

    return (
        <div>


            <div className="imagemFull" >

                <div className="image">
                    <img src={ico} type="" />
                </div>
                <div className="header">
                    {login() ? <Busca /> : ""}


                    {login() ? <Button className="btn" compact color='red' onClick={() => click("sair")}>Sair</Button> : <><Button className="btn" compact color='blue' onClick={() => click("entrar")}>Entrar</Button> <Button className="btn" compact color='green' onClick={() => click("cadastrar")}>Cadastrar</Button></>}
                </div>
            </div>
        </div>
    );
}

export default Header;
