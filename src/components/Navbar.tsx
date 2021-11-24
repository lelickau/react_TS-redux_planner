import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from 'react-router-dom';
import {RouteNames} from "../router";
import { useTypedSelector } from '../hooks/useTypedSelector';

const Navbar: FC = () => {
    const {isAuth} = useTypedSelector(state => state.auth)
    const router = useHistory()

    const userNotAuth = () => {
        router.push(RouteNames.LOGIN)
    }

    return (
        <Layout.Header>
            <Row justify="end">
                {isAuth
                    ?
                    <>
                        <div style={{color: 'white'}}>
                            {'user.username'}
                        </div>
                        <Menu theme="dark" mode="horizontal" selectable={false}>

                            <Menu.Item
                                //onClick={logout}
                                key={1}
                            >
                                Выйти
                            </Menu.Item>
                        </Menu>
                    </>
                    :
                    <Menu theme="dark" mode="horizontal" selectable={false}>
                        <Menu.Item
                            onClick={userNotAuth}
                            key={1}
                        >
                            Логин
                        </Menu.Item>
                    </Menu>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;