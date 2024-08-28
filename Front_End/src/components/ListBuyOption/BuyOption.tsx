import { Button, Col, Form, Input, message, Popconfirm, Row, Select } from 'antd'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface BuyOptionProps {
    selectedBuyOption: number
    onClose: () => void;
}

const BuyOption: React.FC<BuyOptionProps> = ({ onClose, selectedBuyOption }) => {

    const today = new Date().toISOString().split('T')[0];

    const [pamCode, setPamCode] = useState<string>('')
    const [pamName, setPamName] = useState<string>('')
    const [createUser, setCreateUser] = useState<string>('')
    const [createDate, setCreateDate] = useState<string>(today)
    const [eventType, setEventType] = useState<string>('')
    const [startDate, setStartDate] = useState<string>('')
    const [endDate, setEndDate] = useState<string>('')
    const [requestNumber, setRequestNumber] = useState<number>(0)
    const [status, setStatus] = useState<string>('MOI_TAO');

    const buyOption = { pamCode, pamName, createUser, createDate, eventType, startDate, endDate, requestNumber, status }

    const optionStatus = [
        { value: 'MOI_TAO', label: 'Mới tạo' },
        { value: 'CHO_DUYET_SU_KIEN', label: 'Chờ duyệt sự kiện' },
        { value: 'CHO_DIEN_RA', label: 'Chờ diễn ra' },
        { value: 'DA_HUY', label: 'Đã hủy' }
    ];

    const fetchBuyOptionById = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/buy-option/${selectedBuyOption}`);
            const buyOptionData = res.data
            setPamCode(buyOptionData.pamCode)
            setPamName(buyOptionData.pamName)
            setCreateUser(buyOptionData.createUser)
            setCreateDate(buyOptionData.createDate)
            setEventType(buyOptionData.eventType)
            setStartDate(buyOptionData.startDate)
            setEndDate(buyOptionData.endDate)
            setRequestNumber(buyOptionData.requestNumber)
            setStatus(buyOptionData.status)
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const validateForm = (): boolean => {
        if (!pamCode.trim()) {
            message.error("Mã PAM không được để trống")
            return false;
        }
        if (!pamName.trim()) {
            message.error("Tên PAM không được để trống")
            return false;
        }
        if (!createUser.trim()) {
            message.error("Người tạo không được để trống")
            return false;
        }
        if (!eventType.trim()) {
            message.error("Loại sự kiện không được để trống")
            return false;
        }
        if (!startDate.trim()) {
            message.error("Ngày bắt đầu không được để trống")
            return false;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (end < start) {
            message.error("Ngày kết thúc không được nhỏ hơn ngày bắt đầu");
            return false;
        }
        if (!endDate.trim()) {
            message.error("Ngày kết thúc không được để trống")
            return false;
        }
        if (requestNumber < 0) {
            message.error("Số lượng phản hồi không nhỏ hơn 0")
            return false;
        }
        if (!status.trim()) {
            message.error("Trạng thái không được để trống")
            return false;
        }
        return true;
    }

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
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        if (selectedBuyOption) {
            fetchBuyOptionById()
        }
    }, [selectedBuyOption])

    return (
        <>
            <Form layout="vertical">
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Mã PAM" required>
                            <Input value={pamCode} onChange={(e) => setPamCode(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Tên PAM" required>
                            <Input value={pamName} onChange={(e) => setPamName(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Người tạo" required>
                            <Input value={createUser} onChange={(e) => setCreateUser(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ngày tạo" required>
                            <Input
                                type='date'
                                disabled
                                value={createDate}
                                onChange={(e) => setCreateDate(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item label="Loại sự kiện" required>
                            <Input value={eventType} onChange={(e) => setEventType(e.target.value)} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày bắt đầu" required>
                            <Input type='date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Ngày kết thúc" required>
                            <Input type='date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        </Form.Item>
                        <Form.Item label="Số lượng phản hồi" required>
                            <Input value={requestNumber} onChange={(e) => setRequestNumber(Number(e.target.value))} />
                        </Form.Item>
                        <Form.Item label="Trạng thái" required>
                            <Select
                                placeholder="Trạng thái"
                                options={optionStatus}
                                value={status}
                                onChange={(value) => setStatus(value)}
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