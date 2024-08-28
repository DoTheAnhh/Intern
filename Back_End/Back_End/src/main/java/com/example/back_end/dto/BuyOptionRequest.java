package com.example.back_end.dto;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class BuyOptionRequest {

    private Long id;

    private String pamCode;

    private String pamName;

    private String createUser;

    private Date createDate;

    private String eventType;

    private Date startDate;

    private Date endDate;

    private int requestNumber;

    private String status;
}
