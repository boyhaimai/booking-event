import React from 'react';

import classNames from "classnames/bind";
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from "./Menu.module.scss";

const cx = classNames.bind(styles)

function MenuItem({title, to, icon}) {
    return (
        <NavLink to={to} className={(navData) => cx('menu-item', {active: navData.isActive})}>
            {icon}
            <p className={cx('title')}>{title}</p>
        </NavLink>
    );
}

MenuItem.propTypes = {
    title: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    icon: PropTypes.node
}

export default MenuItem;