import React, {FC} from 'react';
import {Layout, Space, Typography, Button} from 'antd'
import {TeamOutlined, UserOutlined, LoginOutlined, LogoutOutlined} from '@ant-design/icons'
import CustomButton from '../custom-button/button';
import {Link} from 'react-router-dom'
import { Paths } from '../../routers/Paths';
import {useAppSelector, useAppDispatch} from '../../hooks/redux'
import {useNavigate} from 'react-router-dom'
import { logout } from '../../store/reducers/authSlice';

const Header: FC = () => {

    const {user} = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onLogout = () => {
        dispatch(logout())
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <Layout.Header className='header' >
            <Space>
                 <TeamOutlined className='icon' />
                <Link to={user ? Paths.home : Paths.login} >
                    <CustomButton type='ghost' >
                    <Typography.Title level={1} >
                        Сотрудники
                    </Typography.Title>
                </CustomButton>
                </Link>
            </Space>
            {
                user 
                    ? <Space>
                        <CustomButton type='ghost' icon={<LogoutOutlined/>} onClick={onLogout} >
                            Выйти
                        </CustomButton>
                    </Space>

                    : <Space>
                <Link to={Paths.registration} >
                    <CustomButton type='ghost' icon={<UserOutlined/>} >
                        Зарегестрироваться
                    </CustomButton>
                </Link>
                <Link to={Paths.login} >
                    <CustomButton type='ghost' icon={<LoginOutlined/>} >
                        Войти
                    </CustomButton>
                </Link>
            </Space>
            }
            
        </Layout.Header>
    );
};

export default Header;