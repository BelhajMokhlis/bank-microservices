import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Header from "./components/Header"
import Dashboard from "./pages/Dashboard"
import CustomerList from "./pages/CustomerList"
import CustomerForm from "./pages/CustomerForm"
import AccountList from "./pages/AccountList"
import AccountForm from "./pages/AccountForm"

const theme = createTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/customers/:id" element={<CustomerForm />} />
          <Route path="/accounts" element={<AccountList />} />
          <Route path="/accounts/new" element={<AccountForm />} />
          <Route path="/accounts/:id" element={<AccountForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App

