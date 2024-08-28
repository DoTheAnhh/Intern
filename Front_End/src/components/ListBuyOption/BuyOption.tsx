import { Button, Col, Form, Input, message, Popconfirm, Row, Select } from 'antd'
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'

interface BuyOptionProps {
    selectedBuyOption: number
    onClose: () => void;
}

interface BuyOptionn {
    pamCode?: string;
    pamName?: string;
    createUser?: string;
    createDate?: string;
    eventType?: string;
    startDate?: string;
    endDate?: string;
    requestNumber?: number;
    status?: string;
    errors?: any;
}


const BuyOption: React.FC<BuyOptionProps> = ({ onClose, selectedBuyOption }) => {

    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [buyOption, setBuyOption] = useState<BuyOptionn>({
        createDate: getTodayDate(),
        status: "MOI_TAO"
    });

    const optionStatus = [
        { value: 'MOI_TAO', label: 'Mới tạo' },
        { value: 'CHO_DUYET_SU_KIEN', label: 'Chờ duyệt sự kiện' },
        { value: 'CHO_DIEN_RA', label: 'Chờ diễn ra' },
        { value: 'DA_HUY', label: 'Đã hủy' }
    ];

    const fetchBuyOptionById = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/buy-option/${selectedBuyOption}`);
            setBuyOption(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const handleSaveOrUpdateBuyOption = async () => {
        try {
            const data = {
                ...buyOption
            }
            if (selectedBuyOption) {
                await axios.put(`http://localhost:8080/buy-option/edit-buy-option/${selectedBuyOption}`, data)
            } else {
                await axios.post('http://localhost:8080/buy-option/save-buy-option', data)
            }
            onClose();
            resetBuyOption();
        } catch (e) {
            console.error(e);
        }
    }

    const resetBuyOption = () => {
        setBuyOption({
            createDate: getTodayDate(),
            status: "MOI_TAO",
        });
    };

    useEffect(() => {
        if (selectedBuyOption) {
            fetchBuyOptionById()
        }
    }, [selectedBuyOption]);

    const handleChangeSingleField = useCallback(
        (field: string) => {
            return (value: string | number) => {
                setBuyOption((prevBuyOption) => ({
                    ...prevBuyOption,
                    [field]: value,
                    errors: {
                        ...prevBuyOption?.errors,
                        [field]: null,
                    },
                }));
            };
        },
        [buyOption]
    );


    return (
        <>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã PAM" required>
                            <Input value={buyOption?.pamCode} onChange={(e) => handleChangeSingleField("pamCode")(e.target.value)} />
                            <div>{buyOption?.errors?.pamCode}</div>
                        </Form.Item>
                        <Form.Item label="Tên PAM" required>
                            <Input value={buyOption?.pamName} onChange={(e) => handleChangeSingleField("pamName")(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Người tạo" required>
                            <Input value={buyOption?.createUser} onChange={(e) => handleChangeSingleField("createUser")(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ngày tạo" required>
                            <Input
                                type='date'
                                disabled
                                value={buyOption?.createDate}
                                onChange={(e) => handleChangeSingleField("createDate")(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Loại sự kiện" required>
                            <Input value={buyOption?.eventType} onChange={(e) => handleChangeSingleField("eventType")(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày bắt đầu" required>
                            <Input type='date' value={buyOption?.startDate} onChange={(e) => handleChangeSingleField("startDate")(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ngày kết thúc" required>
                            <Input type='date' value={buyOption?.endDate} onChange={(e) => handleChangeSingleField("endDate")(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Số lượng phản hồi" required>
                            <Input value={buyOption?.requestNumber} onChange={(e) => handleChangeSingleField("requestNumber")(Number(e.target.value))} />
                        </Form.Item>
                        <Form.Item label="Trạng thái" required>
                            <Select
                                placeholder="Trạng thái"
                                options={optionStatus}
                                value={buyOption?.status}
                                onChange={(e) => handleChangeSingleField("status")(e)}
                            />
                        </Form.Item>
                    </Col>
                    <Form.Item>
                        <Popconfirm
                            title="Are you sure to submit this movie?"
                            onConfirm={() => handleSaveOrUpdateBuyOption()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" style={{ marginLeft: 280 }}>Submit</Button>
                        </Popconfirm>
                        <Popconfirm
                            title="Are you sure back to list?"
                            className="ms-2"
                            onConfirm={() => onClose()}
                            okText="Yes"
                            cancelText="No">
                            <Button type="default" style={{ marginLeft: 20 }}>Back to list</Button>
                        </Popconfirm>
                    </Form.Item>
                </Row>
            </Form>
        </>
    )
}

export default BuyOption