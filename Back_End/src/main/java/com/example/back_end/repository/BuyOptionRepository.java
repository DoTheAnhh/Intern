package com.example.back_end.repository;

import com.example.back_end.entity.BuyOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface BuyOptionRepository extends JpaRepository<BuyOption, Long>, JpaSpecificationExecutor<BuyOption> {
}
