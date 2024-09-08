import { useState, useEffect } from "react";
import { CustomerCard } from "../components/CustomerCard";

export function Customers() {
  const [customers, setCustomers] = useState(() => {
    const savedCustomers = localStorage.getItem("customers");
    return savedCustomers ? JSON.parse(savedCustomers) : [];
  });
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [newCustomerName, setNewCustomerName] = useState("");

  const updateCustomers = (updatedCustomer) => {
    const updatedCustomers = customers.map((customer) => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    );
    setCustomers(updatedCustomers);
    setSelectedCustomer(updatedCustomer);
  };


  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const addCustomer = () => {
    if (newCustomerName.trim() !== "") {
      setCustomers([...customers, { name: newCustomerName, id: customers.length, companyName: "",
        telephone: "", email: "", pelephone: "" }]);
      setNewCustomerName("");
    }
  };

  const deleteCustomer = (id) => {
    setCustomers(customers.filter((customer) => customer.id !== id));
    if (selectedCustomer && selectedCustomer.id === id) {
      setSelectedCustomer(null);
    }
  };

  return (
    <div>
      {selectedCustomer !== null ? (
        <CustomerCard customer={selectedCustomer} onBack={() => setSelectedCustomer(null)} onUpdate={updateCustomers}/>
      ) : (
        <div>
          <h2>Customers</h2>
          <input type="text" value={newCustomerName}
            onChange={(e) => setNewCustomerName(e.target.value)} placeholder="Enter customer name"/>
          <button onClick={addCustomer}>Add Customer</button>
          <ul>
            {customers.map((customer) => (
              <li key={customer.id}>
                <span onClick={() => setSelectedCustomer(customer)} style={{ cursor: 'pointer' }}>
                  {customer.name}
                </span>
                <button onClick={() => deleteCustomer(customer.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
