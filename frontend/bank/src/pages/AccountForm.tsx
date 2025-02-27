import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Typography, TextField, Button, Box, MenuItem } from "@mui/material"
import { getAccount, createAccount, getCustomers, updateAccount } from "../services/api"
import { Customer } from "../types/Customer"
import { Account } from "../types/Account"

const AccountForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [update, setUpdate] = useState<boolean>(false) // Définir le mode de mise à jour
  const [formData, setFormData] = useState<Partial<Account>>({
    solde: undefined, 
    type: "COURANT",
    clientId: 0
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await getCustomers()
        setCustomers(customersData)

        if (id) {
          const accountData = await getAccount(Number.parseInt(id))
          setUpdate(true) // Activer le mode mise à jour
          setFormData({
            solde: accountData.solde,
            type: accountData.type,
            clientId: accountData.clientId
          })
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ 
      ...formData, 
      [name]: value === '' && name === 'solde' ? undefined : value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await updateAccount(Number.parseInt(id), formData)
      } else {
        await createAccount(formData)
      }
      navigate("/accounts")
    } catch (error) {
      console.error("Error saving account:", error)
    }
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Modifier le compte" : "Ajouter un nouveau compte"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Solde"
          name="solde"
          type="number"
          value={formData.solde === undefined ? '' : formData.solde}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="normal"
          select
          label="Type"
          name="type"
          value={formData.type || "COURANT"}
          onChange={handleChange}
          required
          disabled={update} // Désactiver en mode mise à jour
        >
          <MenuItem value="COURANT">COURANT</MenuItem>
          <MenuItem value="EPARGNE">EPARGNE</MenuItem>
        </TextField>
        <TextField
          fullWidth
          margin="normal"
          select
          label="Client"
          name="clientId"
          value={formData.clientId || ""}
          onChange={handleChange}
          required
          disabled={update} // Désactiver en mode mise à jour
        >
          {customers.map((customer) => (
            <MenuItem key={customer.id} value={customer.id}>
              {customer.name}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Enregistrer
        </Button>
      </form>
    </Box>
  )
}

export default AccountForm
