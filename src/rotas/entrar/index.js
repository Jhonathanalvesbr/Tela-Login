import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import "./index.css"
import * as yup from "yup";
import { useFormik } from 'formik';
import axios from 'axios';



function Entrar({ setToken, login }) {


    const schema = yup.object().shape({
        email: yup.string().required("Digite um e-mail válido."),
        senha: yup.string().required("Digite uma senha.").min(1)
    });


    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            senha: ""
        },
        validationSchema: schema,
        onSubmit: (data) => {


            axios.post("https://parseapi.back4app.com/functions/login", data, {
                headers: {
                    "X-Parse-Application-Id": "tQg734GBxeA86a5ZtlMQJYY5ABZz76YI1eVhghck",
                    "X-Parse-REST-API-Key": "8Yri7uKdR5Y30P9y8mmPJFtQyfl6O95ICo4t81vJ"
                }
            }).then(r => r.data)
                .then(r => {
                    localStorage.setItem("token", r.result.session);
                    setToken(r.result.session);
                    login();
                    click("");
                })
                .catch(e => {
                    console.log(e)
                    if (e.response.status === 404) {
                        localStorage.removeItem("token");
                        formik.errors.email = "E-mail ou senha inválidos.";
                        formik.errors.senha = "E-mail ou senha inválidos.";
                    }
                })


        }
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
                                name='email'
                                icon='mail'
                                iconPosition='left'
                                label='E-mail'
                                placeholder='E-mail'
                                onChange={formik.handleChange}
                                error={formik.touched.email ? formik.errors.email : undefined}
                            />
                            <Form.Input
                                name='senha'
                                icon='lock'
                                iconPosition='left'
                                label='Senha'
                                type='password'
                                placeholder='Senha'
                                onChange={formik.handleChange}
                                error={formik.touched.senha ? formik.errors.senha : undefined}
                            />
                            <div className='cadastrarBtn'>
                                <Button content='Entrar' color='blue' type="submit" />
                                <Button content='Cadastrar' color='green' onClick={() => click('cadastrar')} />
                            </div>
                        </Form>
                    </Grid.Column>
                </Grid>


            </Segment>

        </div>
    )
}
export default Entrar
