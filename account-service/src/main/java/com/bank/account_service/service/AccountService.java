package com.bank.account_service.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.account_service.dto.request.AccountRequest;
import com.bank.account_service.dto.response.AccountResponse;

@Service
public interface AccountService {
    AccountResponse createAccount(AccountRequest request);
    List<AccountResponse> getAllAccounts();
    AccountResponse getAccountById(Long id);
    List<AccountResponse> getAccountsByClientId(Long clientId);
    boolean deleteAccount(Long id);
}
