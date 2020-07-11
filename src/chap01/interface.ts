export interface Play {
  [key: string]: {
    name: string;
    type: string;
  };
}

export interface Invoice {
  customer: string;
  performances: Performance[]
}

export interface Performance {
  playID: string;
  audience: number;
}