package com.bank.account_service.dto.request;

import com.bank.account_service.model.enums.AccountType;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
/*
 * DTO pour requête d'un client
 * paramètres:
 * - solde: solde du compte
 * - type: type de compte (COURANT/EPARGNE)
 * - clientId: identifiant du client
 */
public class AccountRequest {
    @NotBlank(message = "Solde is required")
    private Double solde;
    @NotBlank(message = "Type is required")
    private AccountType type;
    @NotBlank(message = "ClientId is required")
    private Long clientId;
}
