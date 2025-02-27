import axios from "axios"

const API_BASE_URL = "http://localhost:8080" // Adjust this to your gateway service URL
const Customer = "customer-service/api/customers"
const Account = "account-service/api/accounts"

// Customer API calls
export const getCustomers = () => axios.get(`${API_BASE_URL}/${Customer}`).then((response) => response.data)
export const getCustomer = (id: number) =>
  axios.get(`${API_BASE_URL}/${Customer}/ ${id}`).then((response) => response.data)
export const createCustomer = (data: any) =>
  axios.post(`${API_BASE_URL}/${Customer}`, data).then((response) => response.data)

export const updateCustomer = (id: number, data: any) =>
  axios.put(`${API_BASE_URL}/${Customer}/${id}`, data).then((response) => response.data)

export const deleteCustomer = (id: number) =>axios.delete(`${API_BASE_URL}/${Customer}/${id}`).then((response) => response.data)


// Account API calls
export const getAccounts = () => axios.get(`${API_BASE_URL}/${Account}`).then((response) => response.data)
export const getAccount = (id: number) => axios.get(`${API_BASE_URL}/${Account}/${id}`).then((response) => response.data)
export const createAccount = (data: any) =>
  axios.post(`${API_BASE_URL}/${Account}`, data).then((response) => response.data)
export const updateAccount = (id: number, data: any) =>
  axios.put(`${API_BASE_URL}/${Account}/${id}`, data).then((response) => response.data)

export const deleteAccount = (id: number) =>axios.delete(`${API_BASE_URL}/${Account}/${id}`).then((response) => response.data)

