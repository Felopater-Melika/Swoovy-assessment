'use client';
import { Menu, MenuProps } from 'antd';
import { FC, useState } from 'react';
import { CalendarOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const items: MenuProps['items'] = [
    {
        label: (
            <Link href="https://www.swoovy.com/" target="_blank">
                Home
            </Link>
        ),
        key: 'home',
        icon: <HomeOutlined />,
    },
    {
        label: 'Events',
        key: 'events',
        icon: <CalendarOutlined />,
    },
];

const NavBar: FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
        />
    );
};
export default NavBar;
