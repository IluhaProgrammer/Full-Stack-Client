import React, {FC} from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Result, Row } from 'antd'

const statuses: Record<string, string> = {
    created: 'Пользователь успешно создан',
    updated: 'Пользователь успешно обновлён',
    deleted: 'Пользователь успешно удалён'
}

const Status: FC = () => {

    const {status} = useParams()

    return (
        <Row align='middle' justify='center' style={{width: "100%"}} >
            <Result  
                status={status ? "success" : '404'}
                title={status ? statuses[status] :'Не найдено'}
                extra={
                    <Button key='dashboard' >
                        <Link to='/'>
                            На главную
                        </Link>
                    </Button>
                }
            />
        </Row>  
    );
};

export default Status;