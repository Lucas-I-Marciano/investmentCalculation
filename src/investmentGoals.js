function convertToMonthlyReturnRate(yearlyReturnRate) {
  return yearlyReturnRate ** (1 / 12);
}

export function generateReturnArray(
  startingAmount = 0,
  timeHorizon = 0,
  timePeriod = "monthly",
  monthlyContribution = 0,
  returnRate = 0,
  returnTimeFrame = "monthly"
) {
  if (!timeHorizon || !startingAmount) {
    throw new Error(
      "Initial Amount and Time must be filled out with positive numbers"
    );
  }

  const finalReturnRate =
    returnTimeFrame === "monthly"
      ? returnRate / 100 + 1
      : convertToMonthlyReturnRate(returnRate / 100 + 1);

  const finalTimeHorizon =
    timePeriod === "monthly" ? timeHorizon : timeHorizon * 12;

  const referenceInvestmentObject = {
    investedAmount: startingAmount,
    interestReturns: 0, // For the specific month
    totalInterestReturns: 0, // For the whole investment
    month: 0,
    totalAmount: startingAmount,
  };

  const returnsArray = [referenceInvestmentObject];
  for (
    let timeReference = 1;
    timeReference <= finalTimeHorizon;
    timeReference++
  ) {
    const totalAmount =
      returnsArray[timeReference - 1].totalAmount * finalReturnRate +
      monthlyContribution;

    const interestReturns =
      returnsArray[timeReference - 1].totalAmount * (finalReturnRate - 1);
    const investedAmount = startingAmount + monthlyContribution * timeReference;
    const totalInterestReturns = totalAmount - investedAmount;
    returnsArray.push({
      investedAmount: investedAmount,
      interestReturns, // As I have the same name for the key and the value, I can put only the variable name. I could do it for the above element too, but I left as an example
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }
  return returnsArray;
}
