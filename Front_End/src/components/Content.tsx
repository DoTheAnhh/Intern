import React from 'react'
import BuyReq from './BuyReq';
import BuyItem from './BuyItem';
import '../css/content.scss'
import ListBuyOption from './ListBuyOption/ListBuyOption';

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
                <ListBuyOption />
            </div>
        </div>
    )
}

export default Content