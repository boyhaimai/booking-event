import React from 'react';
import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import config from '~/config';
import Menu, {MenuItem} from './Menu/index';
import { HeartIcon, HomeIcon, SearchIcon, TicketIcon, UserIcon } from '~/Components/Icons';


const cx = classNames.bind(styles);


function Header() {
    return (
        <header className={cx('wrapper')}>
           <Menu>
            <MenuItem title='Home' to={config.routes.home} icon={<HomeIcon/>}/>
            <MenuItem title='Explore' to={config.routes.search} icon={<SearchIcon />}/>
            <MenuItem title='Favorite' to={config.routes.favorites} icon={<HeartIcon />}/>
            <MenuItem title='Ticket' to={config.routes.ticket} icon={<TicketIcon/>}/>
            <MenuItem title='Profile' to={config.routes.profile} icon={<UserIcon/>}/>
           </Menu>
        </header>
    );
}

export default Header;