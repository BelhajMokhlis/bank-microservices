import type React from "react"
import { useState, useEffect } from "react"
import { Account } from "../types/Account"
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material"
import { Link } from "react-router-dom"
import { getAccounts, deleteAccount } from "../services/api"

const AccountList: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const fetchAccounts = async () => {
    try {
      const data = await getAccounts()
      setAccounts(data)
    } catch (error) {
      console.error("Error fetching accounts:", error)
    }
  }

  useEffect(() => {
    fetchAccounts()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteAccount(id)
      fetchAccounts()
    } catch (error) {
      console.error("Error deleting account:", error)
    }
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Account List
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/accounts/new" style={{ marginBottom: "20px" }}>
        Add New Account
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Balance</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Client ID</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {accounts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account) => (
              <TableRow key={account.id}>
                <TableCell>{account.id}</TableCell>
                <TableCell>{account.solde}</TableCell>
                <TableCell>{account.type}</TableCell>
                <TableCell>{account.clientId}</TableCell>
                <TableCell>
                  <Button component={Link} to={`/accounts/${account.id}`} color="primary">
                    Edit
                  </Button>
                  <Button color="error" onClick={() => handleDelete(account.id)}>
                    Delete Account
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={accounts.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  )
}

export default AccountList
