import { DeleteOutlined, DownOutlined, EditOutlined, EyeOutlined, FilterOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Input, Modal, Popconfirm, Table, TableColumnsType } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import './css/ListItem.scss';
import axios from 'axios';
import BuyOption from './BuyOption';
import Pagination from '../Pagination/Pagination';

interface BuyOptionn {
    id: number;
    pamCode: string;
    pamName: string;
    createUser: string;
    createDate: string;
    eventType: string;
    startDate: string;
    endDate: string;
    reqNumber: string;
    status: string;
}

const ListBuyOption: React.FC = () => {
    const [buyOptions, setBuyOptions] = useState<BuyOptionn[]>([]);
    const [selectedBuyOption, setSelectedBuyOption] = useState<number>(0);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(5);
    const [totalBuyOption, setTotalBuyOption] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);

    const [searchKeyword, setSearchKeyword] = useState<string>('');
    const [isModalOpenBuyOption, setIsModalOpenBuyOption] = useState(false);

    const [showSearch, setShowSearch] = useState<boolean>(false);

    const handlePageChange = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

    const handlePageSizeChange = useCallback((pageSize: number) => {
        setPageSize(pageSize);
        setCurrentPage(1);
    }, []);

    const searchBuyOption = useCallback(async (page: number, size: number, keyword: string): Promise<void> => {
        try {
            const res = await axios.get('http://localhost:8080/buy-option/search-buy-options', {
                params: {
                    page: page - 1,
                    size: size,
                    keyword: keyword
                },
            });
            setTotalBuyOption(res.data.totalElements);
            setTotalPages(Math.ceil(res.data.totalElements / size));
            setBuyOptions(res.data.content);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    const handleSearch = useCallback(async (value: string) => {
        setSearchKeyword(value);
        await searchBuyOption(currentPage, pageSize, value);
    }, [currentPage, pageSize, searchBuyOption]);

    const fetchBuyOption = useCallback(async (page: number, size: number): Promise<BuyOptionn[]> => {
        try {
            const res = await axios.get('http://localhost:8080/buy-option', {
                params: {
                    page: page - 1,
                    size: size,
                },
            });
            setTotalBuyOption(res.data.totalElements);
            setTotalPages(Math.ceil(res.data.totalElements / size));
            return res.data.content;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }, []);

    const deleteBuyOption = useCallback(async (id: number) => {
        await axios.delete(`http://localhost:8080/buy-option/${id}`);
        fetchBuyOption(currentPage, pageSize).then((data) => {
            setBuyOptions(data);
        });
    }, [currentPage, pageSize, fetchBuyOption]);

    const columnList: TableColumnsType<BuyOptionn> = [
        {
            title: 'Mã PAM',
            dataIndex: 'pamCode',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Tên PAM',
            dataIndex: 'pamName',
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
            dataIndex: 'requestNumber',
            render: (requestNumber) => `${requestNumber} phản hồi`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => {
                switch (status) {
                    case 'MOI_TAO':
                        return (
                            <span>
                                Mới tạo
                            </span>
                        );
                    case 'CHO_DUYET_SU_KIEN':
                        return (
                            <span>
                                Chờ duyệt sự kiện
                            </span>
                        );
                    case 'CHO_DIEN_RA':
                        return (
                            <span>
                                Chờ diễn ra
                            </span>
                        );
                    case 'DA_HUY':
                        return (
                            <span>
                                Đã hủy
                            </span>
                        );
                    default:
                        return status;
                }
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <span>
                    <EditOutlined
                        style={{ cursor: 'pointer', float: 'left' }}
                        onClick={() => showModalBuyOptionn(record)}
                    />
                    <Popconfirm
                        title="Are you sure to submit this movie?"
                        onConfirm={() => deleteBuyOption(record.id)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined
                            style={{ cursor: 'pointer', float: 'right' }}
                        />
                    </Popconfirm>
                </span>
            ),
        },
    ];

    const showModalBuyOptionn = useCallback((record: BuyOptionn) => {
        setSelectedBuyOption(record.id);
        setIsModalOpenBuyOption(true);
    }, []);

    const showModalBuyOption = useCallback(() => {
        setIsModalOpenBuyOption(true);
    }, []);

    const handleCancelBuyOption = useCallback(() => {
        setIsModalOpenBuyOption(false);
        fetchBuyOption(currentPage, pageSize).then((data) => {
            setBuyOptions(data);
        });
    }, [currentPage, pageSize, fetchBuyOption]);

    useEffect(() => {
        fetchBuyOption(currentPage, pageSize).then((data) => {
            setBuyOptions(data);
        });
    }, [currentPage, pageSize, fetchBuyOption]);

    useEffect(() => {
        const fetchData = async () => {
            await searchBuyOption(currentPage, pageSize, searchKeyword);
        };

        fetchData();
    }, [currentPage, pageSize, searchKeyword, searchBuyOption]);

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
                        <EyeOutlined /> View: View all <DownOutlined className='down-outl' />
                    </div>
                    <div className='action'>
                        <span className="search">
                            {showSearch && (
                                <Input
                                    type="text"
                                    className="search-input"
                                    placeholder="Tìm kiếm..."
                                    value={searchKeyword}
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                            )}
                            <SearchOutlined className='search-outl' onClick={() => setShowSearch(!showSearch)} />
                        </span>
                        <FilterOutlined className='filter-outl' />
                        <Button type='primary' className='button-outl' onClick={showModalBuyOption}>
                            <span className='item-text'>Tạo mới PAM</span>+
                        </Button>
                        <Modal
                            title="BUY OPTION"
                            open={isModalOpenBuyOption}
                            onCancel={handleCancelBuyOption}
                            footer={false}
                        >
                            <BuyOption onClose={handleCancelBuyOption} selectedBuyOption={selectedBuyOption} />
                        </Modal>
                    </div>
                </div>
                <div className='main-table'>
                    <Table
                        className='table-list'
                        columns={columnList}
                        dataSource={buyOptions}
                        pagination={false}
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        pageSize={pageSize}
                        totalBuyOption={totalBuyOption}
                        onPageChange={handlePageChange}
                        onPageSizeChange={handlePageSizeChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default ListBuyOption;
