export interface Account {
    id: number;
    solde: number;
    type: 'COURANT' | 'EPARGNE';
    clientId: number;
  }