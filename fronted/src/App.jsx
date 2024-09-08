import { Route, Routes, Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Authentication } from './views/Authentication';
import { Dashbord } from './views/Dashbord';
import { Sales } from './views/Sales';
import { Tasks } from './views/Tasks';
import './App.css';
import { Customers } from './views/Customers';
import { Contact } from './views/contact';
import { apiPost } from "./services/auth";

const SalesContext = createContext();

export function useSales() {
  return useContext(SalesContext);
}

export function App() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const [sales, setSales] = useState(() => {
    const savedSales = localStorage.getItem("sales");
    return savedSales ? JSON.parse(savedSales) : [];
  });

  const [customers, setCustomers] = useState([
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
  ]);

  const [leads, setLeads] = useState([
    { id: 1, name: 'Lead 1' },
    { id: 2, name: 'Lead 2' },
  ]);

  useEffect(() => {
    localStorage.setItem("sales", JSON.stringify(sales));
  }, [sales]);

  const addSales = (sale) => {
    deleteSales(sale.id);
    setSales([...sales, sale]);
  };

  const deleteSales = (id) => {
    setSales(sales.filter((sale) => sale.id !== id));
  };

  const updateSale = (updatedSale) => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === updatedSale.id ? updatedSale : sale
      )
    );
  };

  const updateLeads = (saleId, updatedLeads) => {
    setSales((prevSales) =>
      prevSales.map((sale) =>
        sale.id === saleId ? { ...sale, leads: updatedLeads } : sale
      )
    );
  };

  const handleLogout = async () => {
    try {
      const response = await apiPost("auth/logout");
      if (response.status === 200) {
        alert("User logged out successfully.");
        navigate("/"); 
      } else {
        alert("Logout failed.");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed due to server error.");
    }
  };

  const hideNavbarRoutes = ["/"];

  return (
    <SalesContext.Provider value={{ sales, addSales, deleteSales, updateSale, updateLeads }}>
      <div className="app-container">
        {!hideNavbarRoutes.includes(location.pathname) && (
          <nav className="menu">
            <Link to="/Dashbord">Dashboard</Link>
            <Link to="/customers">Customers</Link>
            <Link to="/sales">Sales</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/contact">Contact</Link>
            <button onClick={handleLogout}>Log out</button> 
          </nav>
        )}
        <div className="content">
          <Routes>
            <Route path="/" element={<Authentication />} />
            <Route path="/Dashbord" element={<Dashbord customers={customers} sales={sales} leads={leads} />} />
            <Route path="/sales" element={<Sales />} />
            <Route path="/tasks" element={<Tasks leads={leads} />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </div>
      </div>
    </SalesContext.Provider>
  );
}

export default App;
