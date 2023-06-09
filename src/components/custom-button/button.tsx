import React, {FC} from 'react';
import {Button, Form} from 'antd'

interface CBProps {
    children: React.ReactNode
    htmltype?: "button" | "submit" | "reset" | undefined
    onClick?: () => void | undefined
    type?: "text" | "link" | "ghost" | "default" | "primary" | "dashed" | undefined
    danger?: boolean
    loading?: boolean
    shape?: "default" | "circle" | "round" | undefined
    icon?: React.ReactNode
}

const CustomButton: FC<CBProps> = ({children, htmltype, type, onClick, danger, loading, shape, icon}) => {
    return (
        <Form.Item>
            <Button 
                shape={shape} 
                type={type} 
                onClick={onClick} 
                loading={loading} 
                htmlType={htmltype} 
                danger={danger}
                icon={icon} >
                    {children}
            </Button>
        </Form.Item>
    );
};

export default CustomButton;