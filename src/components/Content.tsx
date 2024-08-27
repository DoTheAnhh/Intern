import React from 'react'
import '../css/content.scss'
import { Button, Input, Table, TableColumnsType } from 'antd'
import { ArrowDownOutlined, EyeOutlined, FileAddOutlined, FilterOutlined, MoreOutlined, SearchOutlined } from '@ant-design/icons'

interface DataType {
    key: React.Key;
    name: string;
    number: string;
}

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

const Content: React.FC = () => {

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
        <div className='main'>
            <div className='content'>
                <div className='title'>
                    <a className='url-link' href="">Tổng quan</a>  /
                    <div className='page-title'>Quản lý phương án mua</div>
                </div>
                <div className='content-item'>
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
                </div>

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
                                <EyeOutlined /> View: View all <ArrowDownOutlined />
                            </div>
                            <div className='action'>
                                <SearchOutlined className='search-outl' /> <FilterOutlined className='filter-outl' /> <Button type='primary'>Tạo mới PAM  +</Button>
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
            </div>
        </div>
    )
}

export default Content