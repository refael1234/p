import React, { useState, useEffect } from "react";
import { Customers } from './Customers';
import { Sales } from './Sales';
import { Tasks } from './Tasks';
import '../css/Dashbord.css';

import {
  BarChart,
  Bar,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useSales } from '../App'; 

export function Dashbord() {
  const [activePage, setActivePage] = useState('overview');
  
  const { sales } = useSales();

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const savedCustomers = localStorage.getItem("customers");
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  const leads = sales.flatMap(sale => sale.leads || []);

  const data = [
    {  customers: customers.length },
    {  sales: sales.length },
    {  leads: leads.length }
  ];

  const renderContent = () => {
    switch(activePage) {
      case 'customers':
        return <Customers />;
      case 'sales':
        return <Sales />;
      case 'tasks':
        return <Tasks />;
      case 'overview':
        return (
          <div style={{ padding: '20px' }}>
            <h2>Dashboard Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 30 }}>
                <CartesianGrid strokeDasharray="10 2" />
                <YAxis allowDecimals={false} /> 
                <Legend />
                <Bar dataKey="customers" fill="#8884d8" /> 
                <Bar dataKey="sales" fill="#ffc658" /> 
                <Bar dataKey="leads" fill="#ff4d4f" /> 
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        {renderContent()}
      </div>
    </div>
  );
}
