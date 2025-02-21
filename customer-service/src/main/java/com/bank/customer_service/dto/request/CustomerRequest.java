package com.bank.customer_service.dto.request;

import lombok.Data;

@Data
public class CustomerRequest {
    private String name;
    private String email;
    private String address;
}
