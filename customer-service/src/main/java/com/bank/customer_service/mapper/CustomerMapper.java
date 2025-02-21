package com.bank.customer_service.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.bank.customer_service.dto.request.CustomerRequest;
import com.bank.customer_service.dto.response.CustomerResponse;
import com.bank.customer_service.model.Entity.Customer;

@Mapper(componentModel = "spring")
public interface CustomerMapper {
    CustomerResponse toResponse(Customer customer);
    @Mapping(target = "id", ignore = true)
    Customer toEntity(CustomerRequest request);

}
