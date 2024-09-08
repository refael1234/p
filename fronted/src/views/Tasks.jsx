import { useSales } from "../App";
import { useState } from "react";
import { TaskCard } from "../components/TaskCARD";

export function Tasks() {
  const { sales, updateLeads } = useSales();  
  const [selectedTask, setSelectedTask] = useState(null);

  const handleDeleteLead = (leadId, saleId) => {
    const sale = sales.find((sale) => sale.id === saleId);
    if (sale) {
      const updatedLeads = sale.leads.filter((lead) => lead.id !== leadId);
      updateLeads(saleId, updatedLeads);
    }
  };

  const handleBack = () => {
    setSelectedTask(null);
  };

  const handleStageChange = (taskId, newStage) => {
    const updatedSales = sales.map((sale) => {
      const updatedLeads = sale.leads.map((lead) => {
        if (lead.id === taskId) {
          return { ...lead, stage: newStage };
        }
        return lead;
      });
      return { ...sale, leads: updatedLeads };
    });

    
  };

  return (
    <div>
      {selectedTask ? (
        <TaskCard
          task={selectedTask}
          onBack={handleBack}
          onStageChange={handleStageChange}
        />
      ) : (
        <div>
          <h2>Leads Tasks</h2>
          {sales.map((sale) => (
            <div key={sale.id}>
              
              {sale.leads && sale.leads.length > 0 ? (
                <ul>
                  {sale.leads.map((lead) => (
                    <li key={lead.id}>
                      <span
                        onClick={() => setSelectedTask({ ...lead, name: sale.name })}
                        style={{ cursor: "pointer" }}
                      >
                        {lead.companyName}
                      </span>
                      <button onClick={() => handleDeleteLead(lead.id, sale.id)}>
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
