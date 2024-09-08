import { useEffect, useState } from "react";
import { useSales } from "../App";
import '../css/LeadCard.css';

export function LeadCard({ sale, onBack }) {
  const [leads, setLeads] = useState(sale.leads || []);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLeadIndex, setCurrentLeadIndex] = useState(null);
  const { updateSale } = useSales();

  useEffect(() => {
    updateSale({ ...sale, leads });
  }, [leads]);

  const handleSave = () => {
    setIsEditing(false);
    setCurrentLeadIndex(null);
  };

  const handleAdd = () => {
    const newLead = {
      name: sale.name,
      companyName: '',
      email: '',
      telephone: '',
      id: leads.length,
    };
    setLeads([...leads, newLead]);
  };

  const handleEdit = (index) => {
    setCurrentLeadIndex(index);
    setIsEditing(true);
  };

  const handleInputChange = (index, key, value) => {
    const updatedLeads = [...leads];
    updatedLeads[index][key] = value;
    setLeads(updatedLeads);
  };

  return (
    <div>
      <button className="back-button" onClick={onBack}>Back</button>
      <h2 className="lead-card-title">Lead Details</h2>
      <button className="add" onClick={handleAdd}>Add</button>
      <div className="lead-card-container">
        <table className="lead-card-table">
          <thead>
            <tr>
              <th><strong>Product Name:</strong></th>
              <th><strong>Lead Name:</strong></th>
              <th><strong>Telephone:</strong></th>
              <th><strong>Email:</strong></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <tr key={index}>
                <td>{sale.name}</td>
                <td>
                  {isEditing && currentLeadIndex === index ? (
                    <input type="text" value={lead.companyName}
                      onChange={(e) => handleInputChange(index, 'companyName', e.target.value)} />
                  ) : (
                    lead.companyName
                  )}
                </td>
                <td>
                  {isEditing && currentLeadIndex === index ? (
                    <input type="text" value={lead.telephone}
                      onChange={(e) => handleInputChange(index, 'telephone', e.target.value)} />
                  ) : (
                    lead.telephone
                  )}
                </td>
                <td>
                  {isEditing && currentLeadIndex === index ? (
                    <input type="email" value={lead.email}
                      onChange={(e) => handleInputChange(index, 'email', e.target.value)} />
                  ) : (
                    lead.email
                  )}
                </td>
                <td>
                  {isEditing && currentLeadIndex === index ? (
                    <button onClick={handleSave}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
                  {isEditing && currentLeadIndex === index && (
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
