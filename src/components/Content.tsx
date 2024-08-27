import React from 'react'
import '../css/content.scss'
import BuyReq from './BuyReq';
import BuyItem from './BuyItem';
import ListItem from './ListItem';

const Content: React.FC = () => {



    return (
        <div className='main'>
            <div className='content'>
                <div className='title'>
                    <a className='url-link' href="">Tổng quan</a>  /
                    <div className='page-title'>Quản lý phương án mua</div>
                </div>
                <div className='content-item'>
                    <BuyItem />
                    <BuyReq />
                </div>
                <ListItem />
            </div>
        </div>
    )
}

export default Content