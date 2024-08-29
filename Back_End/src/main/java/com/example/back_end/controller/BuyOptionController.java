package com.example.back_end.controller;

import com.example.back_end.dto.BuyOptionRequest;
import com.example.back_end.entity.BuyOption;
import com.example.back_end.mapper.BuyOptionMapper;
import com.example.back_end.repository.BuyOptionRepository;
import com.example.back_end.service.BuyOptionService;
import com.example.back_end.specification.BuyOptionSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/buy-option")
public class BuyOptionController {

    @Autowired
    BuyOptionService buyOptionService;
    @Autowired
    private BuyOptionRepository buyOptionRepository;

    @GetMapping
    public Page<BuyOptionRequest> getBuyOptions(@PageableDefault(size = 10) Pageable pageable) {
        return buyOptionService.findAllBuyOption(pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BuyOptionRequest> getBuyOptionById(@PathVariable Long id) {
        return buyOptionService.findBuyOptionById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/save-buy-option")
    public ResponseEntity<BuyOptionRequest> saveBuyOption(
            @RequestBody BuyOptionRequest buyOptionRequest) {
        BuyOption savedBuyOption = buyOptionService.saveBuyOption(buyOptionRequest);
        BuyOptionRequest responseDto = BuyOptionMapper.toDto(savedBuyOption);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PutMapping("/edit-buy-option/{id}")
    public ResponseEntity<BuyOptionRequest> updateBuyOption(
            @RequestBody BuyOptionRequest buyOptionRequest,
            @PathVariable Long id) {
        BuyOption updatedBuyOption = buyOptionService.updateBuyOption(buyOptionRequest, id);
        BuyOptionRequest responseDto = BuyOptionMapper.toDto(updatedBuyOption);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBuyOption(@PathVariable Long id) {
        try {
            buyOptionService.deleteBuyOption(id);
            return ResponseEntity.ok().body("Deleted successfully");
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @GetMapping("/search-buy-options")
    public Page<BuyOption> searchBuyOptions(
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return buyOptionService.searchBuyOptions(keyword, page, size);
    }
}
