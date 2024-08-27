import { ArrowDownOutlined, DownOutlined, EyeOutlined, FilterOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Table, TableColumnsType } from 'antd';
import React from 'react'
import '../css/ListItem.scss'

interface DataTypeListOption {
    key: React.Key;
    name: string;
    number: string;
    createUser: string;
    createDate: string;
    eventType: string;
    startDate: string;
    endDate: string;
    reqNumber: string;
    status: string;
}

const ListItem: React.FC = () => {

    const columnList: TableColumnsType<DataTypeListOption> = [
        {
            title: 'Mã PAM',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Tên PAM',
            dataIndex: 'number',
        },
        {
            title: 'Người tạo',
            dataIndex: 'createUser',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createDate',
        },
        {
            title: 'Loại sự kiện',
            dataIndex: 'eventType',
        },
        {
            title: 'Ngày bắt đầu báo giá',
            dataIndex: 'startDate',
        },
        {
            title: 'Ngày kết thúc báo giá',
            dataIndex: 'endDate',
        },
        {
            title: 'Số lượng phản hồi',
            dataIndex: 'reqNumber',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
        },
        {
            title: '',
            key: 'action',
            render: () => (
                <MoreOutlined style={{ cursor: 'pointer', float: 'right' }} />
            ),
        },
    ];

    const dataList: DataTypeListOption[] = [
        {
            key: '1',
            name: 'SE.2023',
            number: 'Sự kiện chào giá cá hồi Nauy',
            createUser: 'Nguyễn Văn A',
            createDate: '06-03-2023',
            eventType: 'RFQ',
            startDate: '06-03-2023',
            endDate: '06-03-2023',
            reqNumber: '0 phản hồi',
            status: 'Mới tạo',
        }
    ];

    return (
        <div className='list-buy'>
            <div className='list-buy-option'>
                <div className='buy-request-title'>
                    Danh sách phương án mua
                </div>
                <div className='buy-request-title-more'>
                    Danh sách các phương án mua (PAM) được tạo ra trên hệ thống mà người dùng được quyền truy xuất
                </div>
                <div className='view-and-add'>
                    <div className='view-all'>
                        <EyeOutlined /> View: View all <DownOutlined />
                    </div>
                    <div className='action'>
                        <SearchOutlined className='search-outl' /> <FilterOutlined className='filter-outl' /> <Button type='primary' className='button-outl'>Tạo mới PAM  +</Button>
                    </div>
                </div>
                <div className='main-table'>
                    <Table
                        className='table-list'
                        columns={columnList}
                        dataSource={dataList}
                        pagination={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ListItem