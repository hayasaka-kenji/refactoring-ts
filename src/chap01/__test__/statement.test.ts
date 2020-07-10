import * as fs from 'fs'
import { statement } from '../statement';

const invoicesJson = fs.readFileSync('./data/invoices.json');
const invoices: any[] = JSON.parse(invoicesJson.toString())
const playsJson = fs.readFileSync('./data/plays.json');
const plays: any[] = JSON.parse(playsJson.toString())

describe('statement', () => {
  it('期待しているテキストが帰って来るか。', () => {
    let expectedText = 
      'Statement for BigCo\n' +
      '  Hamlet: $650.00 (55 seats)\n' +
      '  As You Like It: $580.00 (35 seats)\n' +
      '  Othello: $500.00 (40 seats)\n' +
      'Amount owed is $1,730.00\n' +
      'You earned 47 credits\n'
    ;
      expect(statement(invoices[0], plays)).toBe(expectedText);
  });
});