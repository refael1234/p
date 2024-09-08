import { useEffect, useState } from "react";
import '../App.css';

export function CustomerCard({ customer, onBack, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState({ ...customer });

  const handleSave = () => {
    onUpdate(editedCustomer); 
    setIsEditing(false); 
  };

  useEffect(() => {
    setEditedCustomer({ ...customer });
  }, [customer]);

  return (
    <div className="customer-card-container">
      <button className="back-button" onClick={onBack}>Back</button>
      <h2>Customer Details</h2>

      {isEditing ? (
        <div className="customer-edit-form">
          <p>
            <strong>Product Name:</strong> {customer.name}
          </p>
          <p>
            <strong>Lead Name:</strong>
            <input type="text" value={editedCustomer.companyName || ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, companyName: e.target.value })}/>
          </p>
          <p>
            <strong>Telephone:</strong>
            <input type="text" value={editedCustomer.telephone || ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, telephone: e.target.value })}/>
          </p>
          <p>
            <strong>Email:</strong>
            <input type="email" value={editedCustomer.email || ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, email: e.target.value })}/>
          </p>
          <p>
            <strong>Pelephone:</strong>
            <input type="text" value={editedCustomer.pelephone || ""}
              onChange={(e) => setEditedCustomer({ ...editedCustomer, pelephone: e.target.value })}/>
          </p>
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="customer-info">
          <p><strong>Name:</strong> {customer.name || "N/A"}</p>
          <p><strong>Company Name:</strong> {customer.companyName || "N/A"}</p>
          <p><strong>Telephone:</strong> {customer.telephone || "N/A"}</p>
          <p><strong>Email:</strong> {customer.email || "N/A"}</p>
          <p><strong>Pelephone:</strong> {customer.pelephone || "N/A"}</p>
          <p><strong>ID:</strong> {customer.id || "N/A"}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}
