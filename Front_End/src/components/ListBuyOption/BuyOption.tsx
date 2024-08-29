import { Button, Col, Form, Input, Popconfirm, Row, Select } from 'antd'
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
    errors?: {
        pamCode?: string;
        pamName?: string;
        createUser?: string;
        createDate?: string;
        eventType?: string;
        startDate?: string;
        endDate?: string;
        requestNumber?: string;
        status?: string;
    };
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
        status: "MOI_TAO",
        requestNumber: 0
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

    const validateForm = (): boolean => {
        const errors: any = {};

        if (!buyOption?.pamCode?.trim()) {
            errors.pamCode = "Không được để trống mã PAM";
        }

        if (!buyOption?.pamName?.trim()) {
            errors.pamName = "Không được để trống tên PAM";
        }

        if (!buyOption?.createUser?.trim()) {
            errors.createUser = "Không được để trống người tạo";
        }

        if (!buyOption?.eventType?.trim()) {
            errors.eventType = "Không được để trống loại sự kiện";
        }

        if (!buyOption?.endDate?.trim()) {
            errors.endDate = "Không được để trống ngày kết thúc";
        }

        if (!buyOption?.startDate?.trim()) {
            errors.startDate = "Không được để trống ngày bắt đầu";
        }
        else if (buyOption?.endDate) {
            const start = new Date(buyOption?.startDate);
            const end = new Date(buyOption?.endDate);

            if (end < start) {
                errors.endDate = "Ngày kết thúc không được nhỏ hơn ngày bắt đầu";
            }
        }

        if (buyOption?.requestNumber === undefined || buyOption?.requestNumber < 0) {
            errors.requestNumber = "Số lượng phản hồi phải lớn hơn hoặc bằng 0";
        }

        setBuyOption((prevBuyOption) => ({
            ...prevBuyOption,
            errors,
        }));

        return Object.keys(errors).length === 0;
    };


    const handleSaveOrUpdateBuyOption = async () => {
        if (!validateForm()) {
            return;
        }
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
            requestNumber: 0,
            createDate: getTodayDate(),
            status: "MOI_TAO",
        });
    };

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

    useEffect(() => {
        if (selectedBuyOption) {
            fetchBuyOptionById()
        }
    }, [selectedBuyOption]);

    return (
        <>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã PAM" required>
                            <Input value={buyOption?.pamCode} onChange={(e) => handleChangeSingleField("pamCode")(e.target.value)} />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.pamCode}</div>
                        </Form.Item>
                        <Form.Item label="Tên PAM" required>
                            <Input value={buyOption?.pamName} onChange={(e) => handleChangeSingleField("pamName")(e.target.value)} />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.pamName}</div>
                        </Form.Item>
                        <Form.Item label="Người tạo" required>
                            <Input value={buyOption?.createUser} onChange={(e) => handleChangeSingleField("createUser")(e.target.value)} />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.createUser}</div>
                        </Form.Item>
                        <Form.Item label="Ngày tạo" required>
                            <Input
                                type='date'
                                disabled
                                value={buyOption?.createDate}
                                onChange={(e) => handleChangeSingleField("createDate")(e.target.value)}
                            />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.createDate}</div>
                        </Form.Item>
                        <Form.Item label="Loại sự kiện" required>
                            <Input value={buyOption?.eventType} onChange={(e) => handleChangeSingleField("eventType")(e.target.value)} />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.eventType}</div>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày bắt đầu" required>
                            <Input type='date' value={buyOption?.startDate} onChange={(e) => handleChangeSingleField("startDate")(e.target.value)} />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.startDate}</div>
                        </Form.Item>
                        <Form.Item label="Ngày kết thúc" required>
                            <Input type='date' value={buyOption?.endDate} onChange={(e) => handleChangeSingleField("endDate")(e.target.value)} />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.endDate}</div>
                        </Form.Item>
                        <Form.Item label="Số lượng phản hồi" required>
                            <Input
                                type="number"
                                min={0}
                                value={buyOption?.requestNumber !== undefined ? buyOption.requestNumber : ''}
                                onChange={(e) => {
                                    const value = Number(e.target.value);
                                    if (!isNaN(value) && value >= 0) {
                                        handleChangeSingleField("requestNumber")(value);
                                    } else {
                                        handleChangeSingleField("requestNumber")(0);
                                    }
                                }}
                            />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.requestNumber}</div>
                        </Form.Item>


                        <Form.Item label="Trạng thái" required>
                            <Select
                                placeholder="Trạng thái"
                                options={optionStatus}
                                value={buyOption?.status}
                                onChange={(e) => handleChangeSingleField("status")(e)}
                            />
                            <div style={{ color: 'red', marginTop: '4px' }}>{buyOption?.errors?.status}</div>
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