// A utility function that returns index of maximum value in arr
export const getMax = (arr, N) => {
  var maxInd = 0;
  for (let i = 1; i < N; i++) if (arr[i] > arr[maxInd]) maxInd = i;
  return maxInd;
};

export const getMin = (arr, N) => {
  var minInd = 0;
  for (let i = 1; i < N; i++) if (arr[i] < arr[minInd]) minInd = i;
  return minInd;
};
// A utility function to return minimum of 2 values
export const minOf2 = (x, y) => {
  return x < y ? x : y;
};

export const amount = (invest, NoOfPeple) => {
  const ownExpense = Number(invest / NoOfPeple).toFixed(2);
  const totalAmountToGet = invest - ownExpense;
  return totalAmountToGet / (NoOfPeple - 1);
};

export const finalInvestment = (totalInvest) => {
  let arr = [];
  let NoOfPeple = totalInvest.length;

  for (let i = 0; i < NoOfPeple; i++) {
    let invest = totalInvest[i];
    let amountToGet = amount(invest, NoOfPeple);

    let temp = [];
    for (let j = 0; j < NoOfPeple; j++) {
      if (i === j) {
        temp.push(0);
      } else {
        temp.push(-amountToGet);
      }
    }
    arr.push(temp);
  }

  return arr;
};
