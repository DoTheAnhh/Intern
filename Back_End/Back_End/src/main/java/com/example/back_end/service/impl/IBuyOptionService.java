package com.example.back_end.service.impl;

import com.example.back_end.dto.BuyOptionRequest;
import com.example.back_end.entity.BuyOption;
import com.example.back_end.enums.BuyOptionStatusEnum;
import com.example.back_end.exception.ResourceNotFoundException;
import com.example.back_end.mapper.BuyOptionMapper;
import com.example.back_end.repository.BuyOptionRepository;
import com.example.back_end.service.BuyOptionService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class IBuyOptionService implements BuyOptionService {

    @Autowired
    BuyOptionRepository buyOptionRepository;

    @Override
    public Page<BuyOptionRequest> findAllBuyOption(Pageable pageable) {
        Page<BuyOption> buyOptions = buyOptionRepository.findAll(pageable);
        return buyOptions.map(BuyOptionMapper::toDto);
    }

    @Override
    public Optional<BuyOptionRequest> findBuyOptionById(Long id) {
        Optional<BuyOption> buyOption = buyOptionRepository.findById(id);
        return buyOption.map(BuyOptionMapper::toDto);
    }

    @Override
    public BuyOption saveBuyOption(BuyOptionRequest buyOptionRequest) {
        BuyOption buyOption = BuyOptionMapper.toEntity(buyOptionRequest);
        return buyOptionRepository.save(buyOption);
    }

    @Override
    public BuyOption updateBuyOption(BuyOptionRequest buyOptionRequest, Long id) {
        Optional<BuyOption> existingBuyOption = buyOptionRepository.findById(id);

        if (existingBuyOption.isPresent()) {
            BuyOption existingBuyOptionEntity = existingBuyOption.get();

            // Cập nhật thuộc tính từ DTO
            existingBuyOptionEntity.setPamCode(buyOptionRequest.getPamCode());
            existingBuyOptionEntity.setPamName(buyOptionRequest.getPamName());
            existingBuyOptionEntity.setCreateUser(buyOptionRequest.getCreateUser());
            existingBuyOptionEntity.setCreateDate(buyOptionRequest.getCreateDate());
            existingBuyOptionEntity.setEventType(buyOptionRequest.getEventType());
            existingBuyOptionEntity.setStartDate(buyOptionRequest.getStartDate());
            existingBuyOptionEntity.setEndDate(buyOptionRequest.getEndDate());
            existingBuyOptionEntity.setRequestNumber(buyOptionRequest.getRequestNumber());

            if (buyOptionRequest.getStatus() != null) {
                existingBuyOptionEntity.setStatus(BuyOptionStatusEnum.valueOf(buyOptionRequest.getStatus()));
            }

            return buyOptionRepository.save(existingBuyOptionEntity);
        } else {
            throw new ResourceNotFoundException("Not found with id " + id);
        }
    }

    @Override
    public void deleteBuyOption(Long id) {
        if (buyOptionRepository.existsById(id)) {
            buyOptionRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException("Buy option with id " + id + " not found");
        }
    }
}
