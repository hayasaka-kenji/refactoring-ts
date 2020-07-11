import { statement } from '../statement';
import invoices from '../../data/chap01/invoices.json'
import plays from '../../data/chap01/plays.json';

describe('statement', () => {
  it('期待しているテキストが返って来るか。', () => {
    const expectedText =
      'Statement for BigCo\n' +
      '  Hamlet: $650.00 (55 seats)\n' +
      '  As You Like It: $580.00 (35 seats)\n' +
      '  Othello: $500.00 (40 seats)\n' +
      'Amount owed is $1,730.00\n' +
      'You earned 47 credits\n';
    
    expect(statement(invoices[0], plays)).toBe(expectedText);
  });
});