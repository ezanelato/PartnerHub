// ====== Imports ======
import type { ReferralLink } from "../types/ReferralLink"; // tipos usados

// ====== Function criada para os mocks ======
export const referralLinksMock: ReferralLink[] = [
    { id: '1', partnerId: '2', url: 'https://partnerhub.app/r/ana-silva', cliques: 3, criadoEm: '2026-05-01' },
    { id: '2', partnerId: '1', url: 'https://partnerhub.app/r/silva', cliques: 3, criadoEm: '2026-03-01' },
    { id: '3', partnerId: '3', url: 'https://partnerhub.app/r/silveira', cliques: 3, criadoEm: '2026-04-01' }
];
