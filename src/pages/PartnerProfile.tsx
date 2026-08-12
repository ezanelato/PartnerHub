// ====== Import ======
import { useState, useEffect, use } from 'react';
import type { Partner } from '../types/Partner';
import type { RankingEntry } from '../types/Ranking';
import type { User } from '../types/User';
import { getUsers } from '../services/userService';
import { getPartners } from '../services/partnerService';
import { getRanking } from '../services/rankingService';
import { RankingList } from '../components/RankingList';

// ====== Import visual ======
import { Trophy, Users, TrendingUp, Percent, Handshake, CircleDollarSign } from 'lucide-react';


// ====== Construcao da interface do ./partner ======
export function PartnerProfile(){
    const [partner, setPartners] = useState<Partner | null>(null);
    const [ranking, setRanking] = useState<RankingEntry[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getPartners().then((partnersDados) => {
          const p = partnersDados[0];
          setPartners(p);
          getUsers().then((usuarios) => {
            setUser(usuarios.find((u) => u.id === p.id) ?? null);
          });

          const ordenado = [...partnersDados].sort((a, b) => b.valorRecebido - a.valorRecebido);
          const rankingCalculado = ordenado.map((partnerDaLista, i) => ({
            posicao: i + 1,
            label: partnerDaLista.id === p.id ? 'Você' : `Parceiro #${partnerDaLista.id.slice(0, 4)}`,
            valorReferencia: partnerDaLista.valorRecebido,
            souEu: partnerDaLista.id === p.id,
          }));
          setRanking(rankingCalculado);
        });
    }, []);
    
    // === Function para adicao da foto no perfil do Partner ===
    function handleFoto(e: React.ChangeEvent<HTMLInputElement>) {
      const file = e.target.files?.[0];
      if (!file || !user) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, fotoBase64: reader.result as string });
      };
      reader.readAsDataURL(file);
    }

    if (!partner || !user) {
        return <p>Carregando perfil...</p>
    }

    return (
      <div className='partner-page'>
        <div className="ranking-grid">
        <div className="ranking-grid__profile card-shell card-shell--sky card-shell--profile">
          <div className="card-shell__blob" />
          <div className="card-shell__inner profile-inner-top">
            <label className="profile-avatar">
              {user.fotoBase64
                ? <img src={user.fotoBase64} alt={user.nome} />
                : <span>{user.nome.charAt(0)}</span>}
              <input type="file" accept="image/*" onChange={handleFoto} hidden />
            </label>
            <input
              className="profile-field"
              value={user.nome}
              onChange={(e) => setUser({ ...user, nome: e.target.value })}
            />
          </div>

          <div className="profile-fields-bottom">
            <input
              className="profile-field"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </div>
        </div>

        <div className="card-shell card-shell--teal card-shell--flush">
          <Users className="card-icon" />
          <h3>Indicações</h3>
          <div className="card-shell__inner"><strong>{partner.indicacoes}</strong></div>
        </div>

        <div className="card-shell card-shell--coral card-shell--flush">
          <TrendingUp className="card-icon" />
          <h3>Conversões</h3>
          <div className="card-shell__inner"><strong>{partner.conversoes}</strong></div>
        </div>

        <div className="card-shell card-shell--gold card-shell--flush">
          <Percent className="card-icon" />
          <h3>Taxa de conversão</h3>
          <div className="card-shell__inner"><strong>{partner.taxaConversao}%</strong></div>
        </div>

        <div className="card-shell card-shell--sky card-shell--flush">
          <Handshake className="card-icon" />
          <h3>Comissionamento</h3>
          <div className="card-shell__inner"><strong>{partner.comissionamento}%</strong></div>
        </div>

        <div className="card-shell card-shell--teal card-shell--flush">
          <CircleDollarSign className="card-icon" style={{ color: '#22c55e' }} />
          <h3>Valor recebido</h3>
          <div className="card-shell__inner"><strong>R$ {partner.valorRecebido}</strong></div>
        </div>

        <div className="card-shell card-shell--coral card-shell--flush">
          <CircleDollarSign className="card-icon" style={{ color: '#f97316' }} />
          <h3>Valor pendente</h3>
          <div className="card-shell__inner"><strong>R$ {partner.valorPendente}</strong></div>
        </div>

        <div className="ranking-grid__rank card-shell card-shell--gold">
          <Trophy className="card-icon" />
          <h3>Ranking</h3>
          <div className="card-shell__inner"><RankingList ranking={ranking} /></div>
        </div>
      </div>
    </div>
    );
}
