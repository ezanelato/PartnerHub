// ====== Import ======
import type { RankingEntry } from "../types/Ranking";
import { rankingMock } from "../mocks/ranking"; // objeto

// ===== Recebe dos dados mock com tipagem definida =====
export async function getRanking(): Promise<RankingEntry[]> {
    return Promise.resolve(rankingMock);
}