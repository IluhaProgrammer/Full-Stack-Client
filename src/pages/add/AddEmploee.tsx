import { Layout, Row, Form } from 'antd';
import React, {FC, useState} from 'react';
import CustomForm from '../../components/custom-form/CustomForm';
import {useNavigate} from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux';
import { useCreateOneMutation } from '../../store/services/employee';
import { Emploee } from '@prisma/client';
import { Paths } from '../../routers/Paths';
import { isErrorWithMessage } from '../../utils/is-error';

const AddEmploee:FC = () => {

    const [error, setError] = useState<string>('')
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.auth)
    const [create] = useCreateOneMutation()

    const onFinish = async (data: Emploee) => {
        try {
            await create(data).unwrap()

            navigate(`${Paths.status}/created`)
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
        <Layout style={{height: "100%", background: "#141414"}} >
            <Row align='middle' justify='center' >
                <CustomForm btntext='Создать' title='Создать сотрудника' onFinish={onFinish} error={error}/>
            </Row>
        </Layout>
    );
};

export default AddEmploee;