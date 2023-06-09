import React, { FC,useState } from 'react';
import { Card, Form, Layout, Row, Space, Typography } from 'antd'
import CustomInput from '../../components/custom-input/CustomInput';
import PasswordInput from '../../components/password-input/PasswordInput';
import CustomButton from '../../components/custom-button/button';
import {Link, useNavigate} from 'react-router-dom'
import {Paths} from '../../routers/Paths'
import { UserData, useRegistrationMutation } from '../../store/services/auth';
import { isErrorWithMessage } from '../../utils/is-error';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { User } from '@prisma/client';
import Error from '../../components/custom-error.tsx/Error';

const Register: FC = () => {

    type RegisterUser = Omit<User, "id"> & {confirmPassword: string}
    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.auth)

    const [registration] = useRegistrationMutation()

    const onFinish = async (newUser: RegisterUser) => {
        try {
            await registration(newUser).unwrap()

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
                <Card title='Зарегестрируйтесь' style={{ color: "#fff", width: "30rem" }} >
                    <Form onFinish={onFinish} >
                        <CustomInput type='email' name='email' placeholder='Введите email' />
                        <CustomInput name='name' placeholder='Введите имя' />
                        <PasswordInput name='password' placeholder='Введите пароль' />
                        <PasswordInput name='confirmPassword' placeholder='Повторите пароль' />
                        <CustomButton type='primary' htmltype='submit'>Зарегестрироваться</CustomButton>
                    </Form>
                    <Space direction='vertical' size='large' >
                        <Typography.Text>
                            Уже есть аккаунт ? <Link to={Paths.login}>Войдите</Link>
                        </Typography.Text>
                    </Space>
                    <Error message={error}/>
                </Card>
            </Row>
        </Layout>
    );
};

export default Register;