import React, { FC, useState } from 'react';
import { Card, Form, Layout, Row, Space, Typography } from 'antd'
import CustomInput from '../../components/custom-input/CustomInput';
import PasswordInput from '../../components/password-input/PasswordInput';
import CustomButton from '../../components/custom-button/button';
import {Link, useNavigate} from 'react-router-dom'
import {Paths} from '../../routers/Paths'
import { LoginData, useLoginMutation } from '../../store/services/auth';
import { isErrorWithMessage } from '../../utils/is-error';
import Error from '../../components/custom-error.tsx/Error';

const Login: FC = () => { 

    const [login] = useLoginMutation()
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const finishVlidate = async (data: LoginData) => {
        try {
            await login(data).unwrap()

            navigate('/')
        } catch(e) {
            const maybeError = isErrorWithMessage(e)

            if(maybeError) {
                setError(e.data.message)
            } else {
                setError('Неизвестная ошибка')
            }
        }
    }
    
    return (
        <Layout style={{ background: "#141414", height: "100%" }} >
            <Row align='middle' justify='center' >
                <Card title='Войдите' style={{ color: "#fff", width: "30rem" }} >
                    <Form onFinish={finishVlidate} >
                        <CustomInput type='email' name='email' placeholder='Введите email' />
                        <PasswordInput name='password' placeholder='Введите пароль' />
                        <CustomButton type='primary' htmltype='submit'>Войти</CustomButton>
                    </Form>
                    <Space direction='vertical' size='large' >
                        <Typography.Text>
                            Нет аккаунта ? <Link to={Paths.registration}>Создать аккаунт</Link>
                        </Typography.Text>
                        <Error message={error} />
                    </Space>
                </Card>
            </Row>
        </Layout>
    );
};

export default Login;