import React, {FC} from 'react';
import {Alert} from 'antd'

type EProps = {
    message?: string
}

const Error: FC<EProps> = ({message}) => {
    if(!message) {
        return null
    }

    return <Alert message={message} type='error' />
    
};

export default Error;