import React, {FC, useState} from 'react';
import { useNavigate, useNavigation, useParams, Link } from 'react-router-dom';
import { useGetOneQuery, useRemoveOneMutation } from '../../store/services/employee';
import { useAppSelector } from '../../hooks/redux';
import { Layout, Descriptions, Divider, Space, Modal } from 'antd';
import CustomButton from '../../components/custom-button/button';
import { Paths } from '../../routers/Paths';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Error from '../../components/custom-error.tsx/Error';
import { isErrorWithMessage } from '../../utils/is-error';

const EmployeeP: FC = () => {

    const navigate = useNavigate()
    const {id} = useParams()

    const [error, setError] = useState<string>('')
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const {data, isLoading} = useGetOneQuery(id || "")
    const [remove] = useRemoveOneMutation()
    const {user} = useAppSelector(state => state.auth)

    if(isLoading) {
        return <span>Загрузка ...</span>
    }

    if(!data) {
        navigate('/')
    }

    const showModal = () => {
        setIsModalOpen(true)
    }

    const hideModal = () => {
        setIsModalOpen(false)
    }

    const deleteEmployee = async () => {
        setIsModalOpen(false)

        try {
            await remove(data?.id).unwrap()

            navigate('/status/deleted')
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
            <Descriptions title='Информация о сотруднике' bordered>
                <Descriptions.Item label='Имя' span={3}>
                    {`${data?.firstName} ${data?.lastName}`}
                </Descriptions.Item>
                <Descriptions.Item label='Возраст' span={3}>
                    {data?.age}
                </Descriptions.Item>
                <Descriptions.Item label='Место проживания' span={3}>
                    {data?.address}
                </Descriptions.Item>
            </Descriptions>
            {
                user?.id === data?.userId && (
                    <>
                        <Divider orientation='left'  >
                            Действия
                        </Divider>
                        <Space>
                            <Link to={`/employee/edit/${data?.id}`}>
                                <CustomButton type='default' shape='round' icon={<EditOutlined/>} >
                                    Редактировать
                                </CustomButton>
                            </Link>
                            <CustomButton type='default' shape='round' danger onClick={showModal} icon={<DeleteOutlined/>} >
                                Удалить
                            </CustomButton>
                        </Space>
                    </>
                )
            }
            <Error message={error} />
            <Modal title='Подтвердите удаление' open={isModalOpen} onOk={() => deleteEmployee()} onCancel={hideModal} okText='Подтвердить' cancelText='Отменить' >
                Вы действительно хотите удалить этого сотрудника
            </Modal>
        </Layout>
    );
};

export default EmployeeP;