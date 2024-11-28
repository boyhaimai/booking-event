import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Avatar.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Avatar({src, fallback:customFalback = images.noImage ,...props}) {    
    const [fallback,setFallback] = useState('')

    const handleError = ()=>{
        setFallback(customFalback)
    }
    return (
       // eslint-disable-next-line jsx-a11y/alt-text
       <img className={cx('avatar')} src={fallback || src} {...props} onError={handleError}/>
    );
}

export default Avatar;