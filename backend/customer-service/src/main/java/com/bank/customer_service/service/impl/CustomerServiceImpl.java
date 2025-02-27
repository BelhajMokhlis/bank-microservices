package com.bank.customer_service.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.bank.customer_service.dto.request.CustomerRequest;
import com.bank.customer_service.dto.response.CustomerResponse;
import com.bank.customer_service.exception.CustomerAlreadyExistsException;
import com.bank.customer_service.exception.CustomerNotFoundException;
import com.bank.customer_service.mapper.CustomerMapper;
import com.bank.customer_service.model.Entity.Customer;
import com.bank.customer_service.repository.CustomerRepository;
import com.bank.customer_service.service.CustomerService;

/*
 * Implémentation du service de gestion des clients
 */
@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired 
    private CustomerRepository customerRepository;
    @Autowired
    private CustomerMapper customerMapper;

    /*
     * Crée un nouveau client
     * @param request
     * @return CustomerResponse
     */
    @Override
    public CustomerResponse createCustomer(CustomerRequest request) {
        if (customerRepository.existsByEmail(request.getEmail())) {
            throw CustomerAlreadyExistsException.withEmail(request.getEmail());
        }
        Customer customer = customerMapper.toEntity(request);
        Customer savedCustomer = customerRepository.save(customer);
        return customerMapper.toResponse(savedCustomer);
    }


   /*
     * Met à jour un client existant
     * @param request
     * @param id
     * @return CustomerResponse
     */
    @Override
    public CustomerResponse updateCustomer(CustomerRequest request, long id) {
        Customer existingCustomer = customerRepository.findById(id)
                .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + id));

                if(!existingCustomer.getEmail().equals(request.getEmail()) ){
                    System.out.println(
                        existingCustomer.getEmail()+"hada"+request.getEmail()
                    );

                    if (customerRepository.existsByEmail(request.getEmail())){
                        throw CustomerAlreadyExistsException.withEmail(request.getEmail());
                    }
                }

        existingCustomer.setName(request.getName());

        existingCustomer.setEmail(request.getEmail());
        existingCustomer.setAddress(request.getAddress());
        
        Customer updatedCustomer = customerRepository.save(existingCustomer);
        return customerMapper.toResponse(updatedCustomer);
    }

    /*
     * Récupère tous les clients 
     * @return List<CustomerResponse>
     */
    @Override
    public List<CustomerResponse> getAllCustomers() {
        List<Customer> customers = customerRepository.findAll();
        if (customers.isEmpty()) {
            throw new CustomerNotFoundException("No customers found");
        }
        return customers.stream()
                       .map(customerMapper::toResponse)
                       .collect(Collectors.toList());
    }
    /*
     * Récupère un client par son ID
     * @param id
     * @return CustomerResponse
     */
    @Override
    public CustomerResponse getCustomerById(Long id) {
        Customer customer = customerRepository.findById(id)
        .orElseThrow(() -> new CustomerNotFoundException("Customer not found with id: " + id));
        return customerMapper.toResponse(customer);
    }
    /*
     * Supprime un client par son ID
     * @param id
     */
    @Override
    public void deleteCustomer(Long id) {
        if (!customerRepository.existsById(id)) {
            throw new CustomerNotFoundException("Customer not found with id: " + id);
        }
        // delete all accounts of the client by using rest template
        RestTemplate restTemplate = new RestTemplate();
        String url = "http://localhost:8080/account-service/api/accounts/delete-by-client-id/" + id;
        
            restTemplate.delete(url);
            customerRepository.deleteById(id);
       
    }
}


