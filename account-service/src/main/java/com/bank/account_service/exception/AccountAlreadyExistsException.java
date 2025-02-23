package com.bank.account_service.exception;

public class AccountAlreadyExistsException extends RuntimeException {
    public AccountAlreadyExistsException(String message) {
        super(message);
    }

    public AccountAlreadyExistsException(String message, Throwable cause) {
        super(message, cause);
    }

    public static AccountAlreadyExistsException withAccountNumber(String accountNumber) {
        return new AccountAlreadyExistsException("Account already exists with account number: " + accountNumber);
    }
} 