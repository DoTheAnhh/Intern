import { FileAddOutlined, SearchOutlined } from '@ant-design/icons'
import { Input, Table, TableColumnsType } from 'antd'
import React from 'react'
import '../css/BuyReq.scss'

interface DataType {
    key: React.Key;
    name: string;
    number: string;
}

const BuyReq: React.FC = () => {


    const columnReq: TableColumnsType<DataType> = [
        {
            title: 'Mã ĐNMS',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Đơn vị',
            dataIndex: 'number',
        },
        {
            title: '',
            key: 'action',
            render: () => (
                <FileAddOutlined style={{ cursor: 'pointer', float: 'right' }} />
            ),
        },
    ];

    const dataReq: DataType[] = [
        {
            key: '1',
            name: 'PR.2023',
            number: "VN",
        },
        {
            key: '2',
            name: 'PR.2023',
            number: "VN",
        }
    ];
    return (
        <div className='buy-request'>
            <div className='buy-request-title'>
                Đề nghị mua
            </div>
            <div className='buy-request-title-more'>
                Tạo PAM cho 1 đề nghị
            </div>
            <div>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    className='search-input'
                />
                <Table
                    columns={columnReq}
                    dataSource={dataReq}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default BuyReq