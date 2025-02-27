import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Typography, TextField, Button, Box } from "@mui/material"
import { getCustomer, createCustomer ,updateCustomer } from "../services/api"
import { Customer } from "../types/Customer"

const CustomerForm: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Customer>({ name: "", email: "", address: "" })

  useEffect(() => {
    if (id) {
      const fetchCustomer = async () => {
        try {
          const data = await getCustomer(Number.parseInt(id))
          setFormData({ name: data.name, email: data.email, address: data.address})
        } catch (error) {
          console.error("Error fetching customer:", error)
        }
      }
      fetchCustomer()
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await updateCustomer(Number.parseInt(id), formData)
      } else {
        await createCustomer(formData)
      }
      navigate("/customers")
    } catch (error) {
      console.error("Error saving customer:", error)
    }
  }

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit Customer" : "Add New Customer"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save
        </Button>
      </form>
    </Box>
  )
}

export default CustomerForm
