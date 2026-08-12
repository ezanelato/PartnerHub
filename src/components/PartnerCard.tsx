// ===== Import da tipagem para construção da interface ======
import type { Partner } from "../types/Partner";

// ====== Definicao da interface ======
interface PartnerCardProps {
    partner: Partner;
    onToggle: (id: string) => void;
}

// ====== Export do cartão para interface já definido ======
export function PartnerCard({ partner, onToggle }: PartnerCardProps) {
    return (
        <div className="partner-card-wrapper">     
          <div className={`card-shell card-shell--teal ${!partner.ativo ? 'partner-card--inativo' : ''}`}>
          <h3>{partner.nome}</h3>
            <div className="card-shell__blob" />
      
            <button
              className={`partner-toggle ${partner.ativo ? 'is-on' : ''}`}
              onClick={() => onToggle(partner.id)}
              aria-label={partner.ativo ? 'Desativar parceiro' : 'Ativar parceiro'}
            />
      
            <div className="card-shell__inner">
              <div className="partner-card__kpis">
                <div><span>Indicações</span><strong>{partner.indicacoes}</strong></div>
                <div><span>Conversões</span><strong>{partner.conversoes}</strong></div>
                <div><span>Taxa de conversão</span><strong>{partner.taxaConversao}%</strong></div>
                <div><span>Comissionamento</span><strong>{partner.comissionamento}%</strong></div>
                <div><span>Valor recebido</span><strong>R$ {partner.valorRecebido}</strong></div>
                <div><span>Valor pendente</span><strong>R$ {partner.valorPendente}</strong></div>
              </div>
      
              <div className="partner-card__lead">
                {partner.leadMaisAvancado
                  ? <span>{partner.leadMaisAvancado.nome} — {partner.leadMaisAvancado.stage}</span>
                  : <span>Nenhuma indicação ainda</span>}
              </div>
            </div>
          </div>
        </div>
    );
}