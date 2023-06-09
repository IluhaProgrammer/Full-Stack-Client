import React, {FC} from 'react';
import {Layout, Card, Space} from 'antd'
import { Emploee } from '@prisma/client';
import CustomInput from '../custom-input/CustomInput';
import {Form} from 'antd'
import CustomButton from '../custom-button/button';
import Error from '../custom-error.tsx/Error';

interface FormProps<T> {
    onFinish: (values: T) => void
    btntext: string
    title: string
    error?: string
    employee?: T
}

const CustomForm: FC<FormProps<Emploee>> = ({onFinish, btntext, title, error, employee}) => {
    return (
        <Card title={title} style={{width: "30rem"}}>
            <Form onFinish={onFinish} name='employee-form'>
                <CustomInput name='firstName' type='text' placeholder='Введите имя'></CustomInput>
                <CustomInput name='lastName' type='text' placeholder='Введите фамилию'></CustomInput>
                <CustomInput name='age' type='text' placeholder='Введите возраст'></CustomInput>
                <CustomInput name='address' type='text' placeholder='Введите адрес'></CustomInput>
                <Space>
                    <Error message={error}/>
                    <CustomButton htmltype='submit'>{btntext}</CustomButton>
                </Space>
            </Form>
        </Card>
    );
};

export default CustomForm;