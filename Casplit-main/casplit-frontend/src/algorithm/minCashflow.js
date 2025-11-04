import { finalInvestment, getMax, getMin } from "../utils/settlementGraph";

export const minCashFlowRec = (investment) => {
  // Create an array of edges for the graph representing flow of traansaction
  let edges = [];
  const N = investment.length;
  let i = 0;
  const matrix = finalInvestment(investment);

  /*
  ===> format
[
  [0, -10, -10],
  [-10, 0, -10],
  [0, 0, 0]
]
*/

  // Create an array amount,
  // initialize all value in it as 0.

  let amount = Array.from({ length: N }, (_, i) => 0);

  // Calculate the net amount to
  // be paid to person 'p', and
  // stores it in amount[p]. The
  // value of amount[p] can be
  // calculated by subtracting
  // debts of 'p' from credits of 'p'

  for (let p = 0; p < N; p++)
    for (let i = 0; i < N; i++) amount[p] += matrix[i][p] - matrix[p][i];

  // Find the indexes of minimum and
  // maximum values in amount
  // amount[mxCredit] indicates the maximum amount
  // to be given (or credited) to any person .
  // And amount[mxDebit] indicates the maximum amount
  // to be taken(or debited) from any person.
  // So if there is a positive value in amount,
  // then there must be a negative value

  while (true && i < N - 1) {
    i++;
    const mxCredit = getMax(amount, N),
      mxDebit = getMin(amount, N);

    // If both amounts are 0, then
    // all amounts are settled

    if (amount[mxCredit] === 0 && amount[mxDebit] === 0) break;

    // Find the minimum of two amounts
    const min = Math.min(-amount[mxDebit], amount[mxCredit]);
    amount[mxCredit] -= min;
    amount[mxDebit] += min;

    //  flow of edge
    edges.push({
      from: mxDebit,
      to: mxCredit,
      label: `Rs.${Number(min).toFixed(1)}`,
      title: `Rs.${Number(min).toFixed(1)}`,
    });
  }
  return edges;
  // If minimum is the maximum amount to be
  // console.log(mxDebit);
  // console.log(
  //   "<br>Person " +
  //     mxDebit +
  //     " pays " +
  //     min +
  //     " to " +
  //     "Person " +
  //     mxCredit
  // );

  // Recursion for the amount array.
  // Note that it is guaranteed that
  // the recursion would terminate
  // as either amount[mxCredit] or
  // amount[mxDebit] becomes 0
};
