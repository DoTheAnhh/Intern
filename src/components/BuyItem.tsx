import { SearchOutlined } from '@ant-design/icons'
import { Input, Table, TableColumnsType } from 'antd'
import React from 'react'
import '../css/BuyItem.scss'

interface DataType {
    key: React.Key;
    name: string;
    number: string;
}

const BuyItem: React.FC = () => {

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Vật tư hàng hóa',
            dataIndex: 'name',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Số lượng cần mua',
            dataIndex: 'number',
        }
    ];

    const data: DataType[] = [
        {
            key: '1',
            name: 'Bơ, phô mai',
            number: "10,000 Cái",
        },
        {
            key: '2',
            name: 'Thực phẩm khô, gia vị',
            number: "10,000 Cái",
        }
    ];

    return (
        <div className='buy-item'>
            <div className='buy-item-title'>
                Hàng hóa cần mua
            </div>
            <div className='buy-item-title-more'>
                Lựa chọn các hàng hóa đang có nhu cầu để mua tập trung
            </div>
            <div>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    className='search-input'
                />
                <Table
                    rowSelection={{ type: 'checkbox' }}
                    columns={columns}
                    dataSource={data}
                    pagination={false}
                />
            </div>
        </div>
    )
}

export default BuyItem