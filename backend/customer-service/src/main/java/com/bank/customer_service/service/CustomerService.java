package com.bank.customer_service.service;


import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.customer_service.dto.request.CustomerRequest;
import com.bank.customer_service.dto.response.CustomerResponse;

@Service

/*
 * Interface pour le service de gestion des clients
 */
public interface CustomerService {
    /*
     * Crée un nouveau client
     * @param request
     * @return CustomerResponse
     */
    CustomerResponse createCustomer(CustomerRequest request);
    
   /*
     * Met à jour un client existant
     * @param request
     * @param id
     * @return CustomerResponse
     */
    CustomerResponse updateCustomer(CustomerRequest request , long id);
    /*
     * Récupère tous les clients 
     * 
     * @return List<CustomerResponse>
     */
    List<CustomerResponse> getAllCustomers();
    /*
     * Récupère un client par son ID
     * @param id    
     * @return CustomerResponse
     */
    CustomerResponse getCustomerById(Long id);
    /*
     * Supprime un client par son ID
     * @param id
     */
    void deleteCustomer(Long id);




}
