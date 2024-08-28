package com.example.back_end.entity;

import com.example.back_end.enums.BuyOptionStatusEnum;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Setter
@Getter
@Table(name = "buy_option")
public class BuyOption {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pamCode;

    private String pamName;

    private String createUser;

    private Date createDate;

    private String eventType;

    private Date startDate;

    private Date endDate;

    private int requestNumber;

    @Enumerated(EnumType.STRING)
    private BuyOptionStatusEnum status;
}
