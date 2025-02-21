package com.bank.customer_service.dto.response;

import lombok.Data;

@Data
public class CustomerResponse {
    private Long id;
    private String name;
    private String email;
    private String address;
}
