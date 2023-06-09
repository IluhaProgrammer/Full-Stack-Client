import React, {FC, useEffect} from 'react';
import {Layout, Table} from 'antd'
import CustomButton from '../../components/custom-button/button';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useGetAllQuery } from '../../store/services/employee';
import { ColumnsType } from 'antd/es/table';
import { Emploee } from '@prisma/client';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../routers/Paths';
import { useAppSelector } from '../../hooks/redux';

const Employee: FC = () => {

    const {data, isLoading} = useGetAllQuery()
    const navigate = useNavigate()
    const {user} = useAppSelector(state => state.auth)

    const toAddEmployee = () => {
        navigate(Paths.employeeAdd)
    }

    const columns:ColumnsType<Emploee> = [
        {
            title: "Имя",
            dataIndex: "firstName",
            key: "firstName"
        },
        {
            title: "Возраст",
            dataIndex: "age",
            key: "age"
        },
        {
            title: "Адрес",
            dataIndex: "address",
            key: "address"
        },
        
    ]

    return (
        <Layout style={{height: "100%", background: "#141414"}}>
            <CustomButton type='primary' onClick={toAddEmployee} icon={<PlusCircleOutlined/>} >
                Добавить
            </CustomButton>
            <Table
                loading={isLoading}
                dataSource={data}
                pagination={false}
                columns={columns}
                rowKey={(record) => record.id}
                onRow={(record) => {
                    return {
                        onClick: () => navigate(`${Paths.employee}/${record.id}`)
                    }
                }}
            />
        </Layout>
    );
};

export default Employee;