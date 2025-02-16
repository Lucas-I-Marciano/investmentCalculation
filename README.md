# Investment Calculation

This project consists of an investment calculator built with JavaScript, utilizing Vite, Tailwind CSS, and Chart.js. 

The project is deployed at [Investment Calculation](https://investment-calculation-lucas.vercel.app/).

<img width="720" height="405" title="Main page" alt="Alt text" src="https://github.com/user-attachments/assets/b2c52158-de77-4f7c-8da9-3adc3b132dbc">
<img width="720" height="405" title="Main page" alt="Alt text" src="https://github.com/user-attachments/assets/94c9efc6-82be-4d0d-a8d8-63f4db750722">




## Project Objectives
- Develop an investment calculator to compute investment returns over time.
- Generate dynamic charts and tables to visualize investment growth.

## Features
- **Investment Calculation Logic:**
  - Calculates investment returns month by month.
  - Considers variables such as:
    - `startingAmount`: Initial investment amount.
    - `timeHorizon`: Total investment period.
    - `timePeriod`: Monthly or yearly investment option.
    - `monthlyContribution`: Additional monthly contributions.
    - `returnRate`: Investment return rate.
    - `returnTimeFrame`: Monthly or yearly return rate.
- **Graph and Table Creation:**
  - Loops through each input month to calculate returns.
  - Generates chart data and table rows dynamically.

## How to Run the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/Lucas-I-Marciano/investmentCalculation
   ```
2. Navigate to the project folder:
   ```bash
   cd investmentCalculation
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open the project in your browser at `http://localhost:3000`.

## Concepts Covered
### Investment Calculation Logic
- Application of return rates and total investment growth.
- Iterative calculations for monthly or yearly contributions.

### Chart and Table Creation
- Dynamic chart generation using Chart.js.
- Table row creation for investment data visualization.

#### Example Calculation
```javascript
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
      interestReturns, 
      totalInterestReturns,
      month: timeReference,
      totalAmount,
    });
  }

```

## Author
[Lucas I. Marciano](https://github.com/Lucas-I-Marciano)

## License
This project is for educational purposes only and does not include a specific license.

