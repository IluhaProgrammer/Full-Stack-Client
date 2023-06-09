import { Form, Input, Layout } from 'antd';
import React, {FC} from 'react';

interface CIProps {
    name: string | undefined
    placeholder: string | undefined
    type?: string
}

const CustomInput: FC<CIProps> = ({name, placeholder, type = 'text'}) => {
    return (
        <Form.Item 
            name={name} 
            shouldUpdate={true} 
            rules={[{required: true, message: "Обязательное поле"}]}
        >
            <Input placeholder={placeholder} type={type} size='large' >

            </Input>
        </Form.Item>
    );
};

export default CustomInput;