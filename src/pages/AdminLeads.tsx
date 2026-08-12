// ====== Imports ======
import { useState, useEffect, act } from 'react';
import type { Lead, LeadStage } from '../types/Lead';
import { addLead, getLeads, updateLeadStage } from '../services/leadService';
import { getPartners } from '../services/partnerService';
import { DndContext, type DragEndEvent } from '@dnd-kit/core'; //lib para Kanbam Drag and drop
import { useDraggable, useDroppable } from '@dnd-kit/core'; // lib com as props drag and drop
import { AdminLeadForm } from '../components/AdminLeadForm';
import type { Partner } from '../types/Partner';


// ====== Declaracao das etapas do Kanbam ======
const etapas: LeadStage[] = ['indicado', 'atendido', 'reuniao', 'proposta', 'cliente'];

// ====== Algoritmo para funcao de drag e drop ======
function Coluna({ etapa, children}: { etapa: LeadStage; children: React.ReactNode }) {
    const { setNodeRef } = useDroppable({ id: etapa });
    return (
        <div ref={setNodeRef} className="kanban__coluna">
        <h3>{etapa}</h3>
        {children}
      </div>
    );
}

function CardArrastavel({ lead }: { lead: Lead}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: lead.id });
    const style = transform
        ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
        : undefined;
    return (
        <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="kanban__card">
            {lead.nome}
        </div>
    );
}

// ====== Algoritmo para exibir os leads com elementos HTML ======
// Update Adicão do drag and drop (function do handleDragEnd)
export function AdminLeads() {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [partners, setPartners] = useState<Partner[]>([]);

    useEffect(() => {
        getLeads().then((dados) => setLeads(dados));
        getPartners().then((dados) => setPartners(dados))
    }, []);

    async function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;

        const novaEtapa = over.id as LeadStage;

        setLeads((atual) =>
            atual.map((lead) =>
                lead.id === active.id ? { ...lead, stage: novaEtapa } : lead
            )
        );

        await updateLeadStage(active.id as string, novaEtapa);
    }

    function handleCreate(lead: Lead) {
      addLead(lead);
    }

    return (
    <div className="admin-leads">
      <h1>Leads</h1>
      <AdminLeadForm partners={partners} onCreate={handleCreate} />
      <DndContext onDragEnd={handleDragEnd}>
        <div className="kanban">
          {etapas.map((etapa) => (
            <Coluna key={etapa} etapa={etapa}>
              {leads
                .filter((lead) => lead.stage === etapa)
                .map((lead) => (
                  <CardArrastavel key={lead.id} lead={lead} />
                ))}
            </Coluna>
          ))}
        </div>
      </DndContext>
    </div>
    );
}
