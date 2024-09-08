import { useState, useEffect } from "react";
import { LeadCard } from "../components/LeadCard";
import { useSales } from "../App";

export function Sales() {
  const { sales, addSales, deleteSales, updateSale } = useSales();
  const [selectedSale, setSelectedSale] = useState(null);
  const [newSaleName, setNewSaleName] = useState("");

  const addSale = () => {
    if (newSaleName.trim() !== "") {
      const newSale = { name: newSaleName, id: sales.length, leads: [] };
      addSales(newSale);
      setNewSaleName("");
    }
  };

  return (
    <div>
      {selectedSale !== null ? (
        <LeadCard sale={selectedSale} onBack={() => setSelectedSale(null)} onUpdate={updateSale} />
      ) : (
        <div>
          <h2>Sales</h2>
          <input type="text" value={newSaleName} onChange={(e) => setNewSaleName(e.target.value)}
            placeholder="Enter sales name"/>
          <button onClick={addSale}>Add Sale</button>
          <ul>
            {sales.map((sale) => (
              <li key={sale.id}>
                <span onClick={() => setSelectedSale(sale)} style={{ cursor: 'pointer' }}>
                  {sale.name}
                </span>
                <button onClick={() => deleteSales(sale.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
