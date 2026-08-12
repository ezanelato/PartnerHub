// ====== Import ======
import type { RankingEntry } from "../types/Ranking"; //tipo (Nome distinto do nome do doc)

interface RankingListProps {
    ranking: RankingEntry[];
}

export function RankingList({ ranking }: RankingListProps) {
    return (
        <ul className="ranking-list">
        {ranking.map((entry) => (
          <li
            key={entry.posicao}
            className={entry.souEu ? 'ranking-list__item--destaque' : ''}
          >
            <span>{entry.posicao}º</span>
            <span>{entry.label}</span>
            <span>{entry.valorReferencia}</span>
          </li>
        ))}
      </ul>
    );
}