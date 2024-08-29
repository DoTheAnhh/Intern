package com.example.back_end.mapper;

import com.example.back_end.dto.BuyOptionRequest;
import com.example.back_end.entity.BuyOption;
import com.example.back_end.enums.BuyOptionStatusEnum;

public class BuyOptionMapper {

    public static BuyOption toEntity(BuyOptionRequest dto) {
        BuyOption entity = new BuyOption();
        entity.setId(dto.getId());
        entity.setPamCode(dto.getPamCode());
        entity.setPamName(dto.getPamName());
        entity.setCreateUser(dto.getCreateUser());
        entity.setCreateDate(dto.getCreateDate());
        entity.setEventType(dto.getEventType());
        entity.setStartDate(dto.getStartDate());
        entity.setEndDate(dto.getEndDate());
        entity.setRequestNumber(dto.getRequestNumber());
        if (dto.getStatus() != null) {
            entity.setStatus(BuyOptionStatusEnum.valueOf(dto.getStatus()));
        }
        return entity;
    }

    public static BuyOptionRequest toDto(BuyOption entity) {
        BuyOptionRequest dto = new BuyOptionRequest();
        dto.setId(entity.getId());
        dto.setPamCode(entity.getPamCode());
        dto.setPamName(entity.getPamName());
        dto.setCreateUser(entity.getCreateUser());
        dto.setCreateDate(entity.getCreateDate());
        dto.setEventType(entity.getEventType());
        dto.setStartDate(entity.getStartDate());
        dto.setEndDate(entity.getEndDate());
        dto.setRequestNumber(entity.getRequestNumber());
        if (entity.getStatus() != null) {
            dto.setStatus(entity.getStatus().toString());
        }
        return dto;
    }
}

