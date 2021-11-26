import React, { FC, useState } from 'react';
import {Form, Input, Button} from 'antd';
import { rules } from '../utils/rules';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

const LoginForm: FC = () => {
    const {login} = useActions()
    const {error, isLoading} = useTypedSelector(store => store.auth)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const submit = () => {
        login(username, password)
    }
    return (
        <Form
            onFinish={submit}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
        >
            {error && <div style={{color: 'red'}}>{error}</div>}
            <Form.Item
                label="User name"
                name="username"
                rules={[rules.required('Please enter your username')]}
            >
                <Input value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[rules.required('Please enter your password')]}
            >
                <Input.Password value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                    type="primary"
                    htmlType="submit"
                    loading={isLoading}
                >
                    Log In
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;