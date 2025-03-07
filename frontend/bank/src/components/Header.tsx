import type React from "react"
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import { Link } from "react-router-dom"

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Banking App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Dashboard
        </Button>
        <Button color="inherit" component={Link} to="/customers">
          Customers
        </Button>
        <Button color="inherit" component={Link} to="/accounts">
          Accounts
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Header

