import { Invoice, Play, Performance } from './interface'

export function statement(invoice: Invoice, plays: Play): string {
  let result = `Statement for ${invoice.customer}\n`;
  for (let perf of invoice.performances) {
    // 注文の内訳を出力
    result += `  ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`;
  }
  
  result += `Amount owed is ${usd(totalAmount())}\n`;
  result += `You earned ${totalVolumeCredits()} credits\n`;
  return result;

  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }

  function totalVolumeCredits() {
    let result = 0;
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  // 金額のフォーマット
  function usd(aNumber: number) {
    return new Intl.NumberFormat("en-US",
      {
        style: "currency", currency: "USD",
        minimumFractionDigits: 2
      }).format(aNumber / 100);
  }

  // ボリューム特典のポイントを加算
  function volumeCreditsFor(aPerformance: Performance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    // 喜劇の時は十人につき、さらにポイントを加算
    if ("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  // playの中のplayIDを返す。
  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID];
  }

  function amountFor(aPerformance: Performance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }
    return result;
  }
}