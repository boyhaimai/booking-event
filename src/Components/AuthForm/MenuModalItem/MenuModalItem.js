/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import classNames from 'classnames/bind';

import Button from '~/Components/Buttons/Button';
import Image from '~/Components/Images/Image';
import styles from './MenuModalItem.module.scss'
import menuItem from '~/assets/images/menuItem.png'
import { AppleIcon, GgIcon} from '~/Components/Icons/Icon';

const cx = classNames.bind(styles);

function MenuModalItem() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <h2 className='title'>Let's Get Started</h2>
                <p className={cx('desc')}>Sign up or log in to what happening <br/> near you</p>
                
                <Image src={menuItem} className={cx('img-desc')} alt=''/>

                <Button className={cx('lg-email')} warning large href='/login'> Continue with Email</Button> <br/>
                <Button className={cx('lg-gg')} white_outline large lefticon={<GgIcon className={cx('gg-icon')}/>}> Continue with Google</Button> <br/>
                <Button className={cx('app')} white_outline large lefticon={<AppleIcon className={cx('apple-icon')}/>}> Continue with Apple</Button> <br/>   

                <p className={cx('wrapper-regis')}> Don't have an account? <a  href='/register' alt='' >Sign up</a> </p>         
            </div>            
        </div>
    );
}

export default MenuModalItem;