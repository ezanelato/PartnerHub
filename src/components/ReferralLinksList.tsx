// ====== Imports ======
import type { ReferralLink } from "../types/ReferralLink";
import type { Partner } from "../types/Partner";

// ====== Props Match ======
interface ReferralLinkListProps {
    links: ReferralLink[];
    partners: Partner[];
}

// ====== Func para elementos HTML ======
export function ReferralLinksList({ links, partners }: ReferralLinkListProps) {
    return (
        <ul className="referral-links-list">
        {links.map((link) => {
          const dono = partners.find((p) => p.id === link.partnerId);
          return (
            <li key={link.id}>
              <span>{dono ? dono.nome : 'Parceiro desconhecido'}</span>
              <span>{link.url}</span>
              <span>{link.cliques} cliques</span>
            </li>
          );
        })}
      </ul>
    );
}