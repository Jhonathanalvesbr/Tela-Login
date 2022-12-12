import React, { useState } from 'react'
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { useNavigate } from "react-router-dom";
import "./index.css"
import * as yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';

function Cadastrar(props) {
    const [userName, setuserName] = useState("");
    const [userEmail, setEmail] = useState("");

    const schema = yup.object().shape({
        usuario: yup.string().trim().strict(true).required("Digite um nome de usúario.").min(3, "O nome de usúario deve ter no mínimo 3 caracteres.").max(60, "O nome de usúario deve ter no máximo 60 caracteres.").notOneOf([userName], "Usuário já existe!"),
        email: yup.string().email("Digite um e-mail válido.").required("E-mail inválido.").notOneOf([userEmail], "E-mail já existe!"),
        senha1: yup.string().required("Digite uma senha.").min(8, "A senha deve ter no mínimo 8 caracteres.").max(16, "A senha deve ter no máximo 16 caracteres.").oneOf([yup.ref("senha2")], "As senhas são diferentes"),
        senha2: yup.string().required("Digite uma senha.").min(8, "A senha deve ter no mínimo 8 caracteres.").max(16, "A senha deve ter no máximo 16 caracteres.").oneOf([yup.ref("senha1")], "As senhas são diferentes"),
    });

    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            usuario: "",
            email: "",
            senha1: "",
            senha2: "",
        },
        validationSchema: schema,
        onSubmit: (data) => {

            data.senha = data.senha1;

            axios.post("https://parseapi.back4app.com/functions/cadastro", data, {
                headers: {
                    "X-Parse-Application-Id": "tQg734GBxeA86a5ZtlMQJYY5ABZz76YI1eVhghck",
                    "X-Parse-REST-API-Key": "8Yri7uKdR5Y30P9y8mmPJFtQyfl6O95ICo4t81vJ"
                }
            }).then(r => r.data)
                .then(dat => {
                    if (props.token === undefined) {
                        props.setToken(dat.result.token);
                        localStorage.setItem("token", dat.result.token);
                    }
                    let n = Object.keys(dat.result);

                    n.forEach(i => {
                        if ("username" === i && dat.result[i] === true) {
                            setuserName(data.usuario);
                            formik.errors.usuario = "Usuário já existe!";
                        }

                        if ("email" === i && dat.result[i] === true) {
                            setEmail(data.email)
                            formik.errors.email = "E-mail já existe!";
                        }

                    });
                    click("home");
                }

                ).catch(e => {

                    if (e.response.data.code === 202) {
                        setuserName(data.usuario);
                        formik.errors.usuario = "Usuário já existe!";
                    }
                    if (e.response.data.code === 203) {
                        setEmail(data.email);
                        formik.errors.email = "E-mail já existe!";
                    }
                });
        },
    }
    );


    const click = (ir) => {
        navigate("/" + ir);
    }

    return (
        <div className='cadastrar'>
            <Segment placeholder>

                <Grid columns={1} relaxed='very' stackable>
                    <Grid.Column>
                        <Form onSubmit={formik.handleSubmit}>
                            <Form.Input
                                icon='user'
                                name="usuario"
                                iconPosition='left'
                                label='Usuário'
                                placeholder='Usuário'
                                onChange={formik.handleChange}
                                error={formik.touched.usuario ? formik.errors.usuario : undefined}
                            />
                            <Form.Input
                                icon='mail'
                                name="email"
                                iconPosition='left'
                                label='E-mail'
                                placeholder='E-mail'
                                onChange={formik.handleChange}
                                error={formik.touched.email ? formik.errors.email : undefined}
                            />
                            <Form.Input
                                icon='lock'
                                name="senha1"
                                iconPosition='left'
                                label='Senha'
                                type='password'
                                placeholder='Senha'
                                onChange={formik.handleChange}
                                error={formik.touched.senha1 ? formik.errors.senha1 : undefined}
                            />
                            <Form.Input
                                icon='lock'
                                name="senha2"
                                iconPosition='left'
                                label='Senha'
                                type='password'
                                placeholder='Senha'
                                onChange={formik.handleChange}
                                error={formik.touched.senha2 ? formik.errors.senha2 : undefined}
                            />
                            <div className='cadastrarBtn'>

                                <Button content='Cadastrar' color='green' type="submit" />
                                <Button content='Entrar' onClick={() => click('entrar')} color='blue' />
                            </div>
                        </Form>
                    </Grid.Column>
                </Grid>


            </Segment>

        </div>
    )
}

export default Cadastrar
