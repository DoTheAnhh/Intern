package com.example.back_end.service;

import com.example.back_end.dto.BuyOptionRequest;
import com.example.back_end.entity.BuyOption;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface BuyOptionService {

    Page<BuyOptionRequest> findAllBuyOption(Pageable pageable);

    Optional<BuyOptionRequest> findBuyOptionById(Long id);

    BuyOption saveBuyOption(BuyOptionRequest buyOptionRequest);

    BuyOption updateBuyOption(BuyOptionRequest buyOptionRequest, Long id);

    void deleteBuyOption(Long id);
}
