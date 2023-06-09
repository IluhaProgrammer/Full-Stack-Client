import React, {FC, useState} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom'
import { useEditOneMutation, useGetOneQuery } from '../../store/services/employee';
import { Layout, Row } from 'antd';
import CustomForm from '../../components/custom-form/CustomForm';
import { isErrorWithMessage } from '../../utils/is-error';
import { Emploee } from '@prisma/client';

const EditEmployee: FC = () => {

    const navigate = useNavigate()
    const {id} = useParams()
    const [error, setError] = useState<string>('')
    const {data, isLoading} = useGetOneQuery(id || "")
    const [edit] = useEditOneMutation()

    if(isLoading) {
        return <span>Загрузка ...</span>
    }

    const onFinish = async (employee: Emploee) => {
        try {
            const editEmployee = {
                ...data,
                ...employee
            }

            await edit(editEmployee).unwrap()

            navigate('/status/updated')
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
                <CustomForm title='Редактирование сотрудника' btntext='Редактировать' onFinish={onFinish} error={error} employee={data} />
            </Row>
        </Layout>
    );
};

export default EditEmployee;