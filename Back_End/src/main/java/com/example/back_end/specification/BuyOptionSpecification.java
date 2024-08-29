package com.example.back_end.specification;

import com.example.back_end.entity.BuyOption;
import org.springframework.data.jpa.domain.Specification;

public class BuyOptionSpecification {
    public static Specification<BuyOption> searchByPamCodeOrPamName(String keyword) {
        return (root, query, criteriaBuilder) -> {
            if (keyword != null && !keyword.trim().isEmpty()) {
                String pattern = "%" + keyword.toLowerCase() + "%";
                return criteriaBuilder.or(
                        criteriaBuilder.like(root.get("pamCode"), pattern),
                        criteriaBuilder.like(root.get("pamName"), pattern)
                );
            }
            return criteriaBuilder.conjunction();
        };
    }
}
