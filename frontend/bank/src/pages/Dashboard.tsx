import type React from "react"
import { useState, useEffect } from "react"
import { Typography, Grid, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"
import { getCustomers, getAccounts } from "../services/api"
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Account } from "../types/Account"

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(3),
  textAlign: "center",
  color: theme.palette.text.secondary,
  boxShadow: theme.shadows[5],  
  borderRadius: "8px",         
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  transition: "all 0.3s ease", 
  '&:hover': {
    transform: "scale(1.05)",   
    boxShadow: theme.shadows[10], 
  }
}))

const COLORS = ["#8884d8", "#82ca9d"]

const Dashboard: React.FC = () => {
  const [customerCount, setCustomerCount] = useState(0)
  const [accountCount, setAccountCount] = useState(0)
  const [accountData, setAccountData] = useState<{ name: string; value: number }[]>([])
  const [soldeData, setSoldeData] = useState<{ name: string; value: number }[]>([])

  const [animatedCustomerCount, setAnimatedCustomerCount] = useState(0)
  const [animatedAccountCount, setAnimatedAccountCount] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customers = await getCustomers()
        const accounts = await getAccounts()
        
        setCustomerCount(customers.length)
        setAccountCount(accounts.length)
        
        let count = 0
        const customerInterval = setInterval(() => {
          count += 1
          setAnimatedCustomerCount(count)
          if (count >= customers.length) clearInterval(customerInterval)
        }, 60) 
        count = 0
        const accountInterval = setInterval(() => {
          count += 1
          setAnimatedAccountCount(count)
          if (count >= accounts.length) clearInterval(accountInterval)
        }, 60) 

        const courantCount = accounts.filter((account: Account) => account.type === "COURANT").length
        const epargneCount = accounts.filter((account: Account) => account.type === "EPARGNE").length
        
        const courantSolde = accounts
          .filter((account: Account) => account.type === "COURANT")
          .reduce((acc: number, account: Account) => acc + account.solde, 0)

        const epargneSolde = accounts
          .filter((account: Account) => account.type === "EPARGNE")
          .reduce((acc: number, account: Account) => acc + account.solde, 0)

        setAccountData([
          { name: "COURANT", value: courantCount },
          { name: "EPARGNE", value: epargneCount }
        ])

        setSoldeData([
          { name: "COURANT", value: courantSolde },
          { name: "EPARGNE", value: epargneSolde }
        ])
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{ padding: "30px", backgroundColor: "#f5f5f5" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Tableau de Bord
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" color="textSecondary" gutterBottom>Total Clients</Typography>
            <Typography variant="h3" color="primary">{animatedCustomerCount}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" color="textSecondary" gutterBottom>Total Comptes</Typography>
            <Typography variant="h3" color="primary">{animatedAccountCount}</Typography>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" color="textSecondary" gutterBottom>Répartition des Types de Comptes</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={accountData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {accountData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Item>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item>
            <Typography variant="h6" color="textSecondary" gutterBottom>Répartition du Solde entre COURANT et EPARGNE</Typography>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={soldeData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#82ca9d"
                  label
                >
                  {soldeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Item>
        </Grid>
      </Grid>
    </div>
  )
}

export default Dashboard
