
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Cadastrar from "./cadastrar";
import Home from "./home";
import Entrar from "./entrar";
import { useState } from "react";
import Header from "./holder";

function Rotas() {
    const [token, setToken] = useState(null);

    const login = () => {
        const tk = localStorage.getItem("token");
      
        if (tk) {

            return true;
        }
        return false;
    }
    login()
    return (
        <BrowserRouter>
            <Header login={login} setToken={setToken} />
            <Routes>

                <Route component={Home} path="/" element={<Home />} />
                {login() ? "" : <>
                    <Route component={Cadastrar} path="/cadastrar" element={<Cadastrar setToken={setToken} token={token} />} />
                    <Route component={Entrar} path="/entrar" element={<Entrar setToken={setToken} token={token} login={login} />} /></>


                }

            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;