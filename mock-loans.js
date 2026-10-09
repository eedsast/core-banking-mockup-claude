// ── Mock data: Loans & EOD Monitor ───────────────────────────────────────────
// Extracted from core_banking.html for maintainability.

const MOCK_LOAN_ACCOUNTS = [
  { id:'57', customer:'-', product:'New BNPL product',                                              disbursed:'20.03.2026', maturity:'20.03.2027', status:'ACTIVE', ccy:'EUR', amount:'1,000.00',   remaining:'972.28'   },
  { id:'58', customer:'-', product:'BNPL 17% - final test with per instalment fee for 4th Mar',    disbursed:'20.03.2026', maturity:'20.11.2026', status:'ACTIVE', ccy:'EUR', amount:'1,000.00',   remaining:'1,000.00' },
  { id:'55', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'18.03.2026', maturity:'18.03.2027', status:'ACTIVE', ccy:'EUR', amount:'1,899.50',   remaining:'1,899.50' },
  { id:'54', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'13.03.2026', maturity:'13.11.2026', status:'ACTIVE', ccy:'EUR', amount:'999.00',     remaining:'999.00'   },
  { id:'53', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'13.03.2026', maturity:'13.11.2026', status:'ACTIVE', ccy:'EUR', amount:'1,499.50',   remaining:'1,499.50' },
  { id:'52', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'10.03.2026', maturity:'10.02.2027', status:'ACTIVE', ccy:'EUR', amount:'1,899.50',   remaining:'0.00'     },
  { id:'51', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'10.03.2026', maturity:'10.12.2026', status:'ACTIVE', ccy:'EUR', amount:'1,000.00',   remaining:'1,000.00' },
  { id:'50', customer:'-', product:'Fidelity test',                                                 disbursed:'10.03.2026', maturity:'10.03.2027', status:'ACTIVE', ccy:'EUR', amount:'1,000.00',   remaining:'994.03'   },
  { id:'49', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'06.03.2026', maturity:'06.03.2027', status:'ACTIVE', ccy:'EUR', amount:'5,000.00',   remaining:'5,000.00' },
  { id:'48', customer:'-', product:'BNPL 17 UAT start with fee',                                    disbursed:'05.03.2026', maturity:'05.09.2026', status:'ACTIVE', ccy:'EUR', amount:'1,499.50',   remaining:'1,499.50' },
  { id:'47', customer:'-', product:'BNPL 17 UAT start',                                             disbursed:'05.03.2026', maturity:'05.03.2027', status:'ACTIVE', ccy:'EUR', amount:'1,899.50',   remaining:'1,899.50' },
  { id:'46', customer:'-', product:'BNPL 24',                                                       disbursed:'05.03.2026', maturity:'05.09.2026', status:'ACTIVE', ccy:'EUR', amount:'500.00',     remaining:'500.00'   },
  { id:'45', customer:'-', product:'BNPL 24',                                                       disbursed:'05.03.2026', maturity:'05.03.2027', status:'ACTIVE', ccy:'EUR', amount:'1,000.00',   remaining:'1,000.00' },
];

const MOCK_LOAN_DATA = {
  '57': {
    product:'New BNPL product', customer:'John Doe', loanAmt:'1,000.00 EUR', outstanding:'972.26 EUR',
    disbursed:'20.03.2026', maturity:'20.03.2027', firstRepay:'20.04.2026', instalments:'12',
    prefRate:'-2%', annualRate:'16%', totalRate:'14%',
    loanOfficer:'-', org:'00000000-0000-0000-0000-000000000000', branch:'-',
    tenor:'12 months', currency:'EUR',
    accruedInt:'32.47 EUR', accruedFee:'-', penaltyAmt:'5.27 EUR',
    intAccruedOn:'21.06.2026', feeAccruedOn:'-', penaltyAccruedOn:'21.06.2026',
    effRate:'19.4156%', nextPayDate:'20.05.2026', nextPayAmt:'20.84 EUR',
    purpose:'Consumer', collateral:'-', ltv:'-', loanToValue:'-', ltvRatio:'-',
    appId:'3fa35954-6717-4562-b3fc-2c083f66efa6', tlq:'6%', lgd:'76%',
    customerId:'341', externalCustId:'EXT-341', repayPlanId:'RP-57-001',
    fimpleLoanId:'FMP-57-001',
    currentDaysArrears:'0', maxDaysArrears:'0', maxDaysArrearsDuringMonth:'0',
    assetRisk:'Standard', loanPerfStage:'Performing',
    settledBal:{
      principalBal:'972.26 EUR', duePrincipal:'0.00 EUR', dueInterest:'0.00 EUR',
      nonDueInterest:'32.47 EUR', dueFee:'0.00 EUR', nonDueFee:'0.00 EUR', overdueAmt:'0.00 EUR'
    },
    totalOverdue:'0.00 EUR', category:'Consumer', pd:'6%',
    loanOfficerName:'-', loanAppId:'3fa35954-6717-4562-b3fc-2c083f66efa6',
    schedule:[
      { n:1,  date:'2026-03-20', prin:'0.00',   int:'0.00',  fee:'20.00', total:'20.84',    bal:'972.26',   days:1,  status:'PARTIALLY PAID' },
      { n:2,  date:'2026-04-20', prin:'50.38',  int:'0.00',  fee:'0.00',  total:'52.07',    bal:'921.88',   days:31, status:'PARTIALLY PAID' },
      { n:3,  date:'2026-05-20', prin:'79.03',  int:'0.00',  fee:'0.00',  total:'79.62',    bal:'842.85',   days:30, status:'PARTIALLY PAID' },
      { n:4,  date:'2026-06-20', prin:'79.98',  int:'0.00',  fee:'0.00',  total:'80.01',    bal:'762.87',   days:31, status:'PARTIALLY PAID' },
      { n:5,  date:'2026-07-20', prin:'80.89',  int:'8.90',  fee:'0.00',  total:'89.79',    bal:'681.98',   days:30, status:'PENDING'        },
      { n:6,  date:'2026-08-20', prin:'81.83',  int:'7.96',  fee:'0.00',  total:'89.79',    bal:'600.15',   days:31, status:'PENDING'        },
      { n:7,  date:'2026-09-20', prin:'82.79',  int:'7.00',  fee:'0.00',  total:'89.79',    bal:'517.36',   days:31, status:'PENDING'        },
      { n:8,  date:'2026-10-20', prin:'83.75',  int:'6.04',  fee:'0.00',  total:'89.79',    bal:'433.61',   days:30, status:'PENDING'        },
      { n:9,  date:'2026-11-20', prin:'84.73',  int:'5.06',  fee:'0.00',  total:'89.79',    bal:'348.88',   days:21, status:'PENDING'        },
      { n:10, date:'2026-12-20', prin:'85.72',  int:'4.07',  fee:'0.00',  total:'89.79',    bal:'263.16',   days:30, status:'PENDING'        },
      { n:11, date:'2027-01-20', prin:'86.72',  int:'3.07',  fee:'0.00',  total:'89.79',    bal:'176.44',   days:31, status:'PENDING'        },
      { n:12, date:'2027-02-20', prin:'87.73',  int:'2.06',  fee:'0.00',  total:'89.79',    bal:'88.71',    days:31, status:'PENDING'        },
      { n:13, date:'2027-03-20', prin:'88.71',  int:'1.07',  fee:'0.00',  total:'89.78',    bal:'0.00',     days:28, status:'PENDING'        },
    ],
    transactions:[
      { ch:'2', type:'Collection',   booking:'21.06.2026', value:'21.06.2026', amt:'80.00 EUR',      ccy:'EUR', status:'POSTED' },
      { ch:'-', type:'Disbursement', booking:'20.03.2026', value:'20.03.2026', amt:'+1,000.00 EUR',  ccy:'EUR', status:'POSTED' },
    ],
  }
};

// Generic fallback for loan IDs not in MOCK_LOAN_DATA
const MOCK_LOAN_FALLBACK = (id) => ({
  product:'BNPL 17 UAT start', customer:'-', loanAmt:'1,000.00 EUR', outstanding:'1,000.00 EUR',
  disbursed:'10.03.2026', maturity:'10.03.2027', firstRepay:'10.04.2026', instalments:'12',
  prefRate:'-2%', annualRate:'17%', totalRate:'15%',
  loanOfficer:'-', org:'00000000-0000-0000-0000-000000000000', branch:'-',
  tenor:'12 months', currency:'EUR',
  accruedInt:'14.52 EUR', accruedFee:'-', penaltyAmt:'0.00 EUR',
  intAccruedOn:'25.03.2026', feeAccruedOn:'-', penaltyAccruedOn:'-',
  effRate:'20.1234%', nextPayDate:'10.04.2026', nextPayAmt:'91.45 EUR',
  purpose:'Consumer', collateral:'-', ltv:'-', loanToValue:'-', ltvRatio:'-',
  appId:'-', tlq:'5%', lgd:'70%',
  customerId:'-', externalCustId:'-', repayPlanId:'-', fimpleLoanId:'-',
  currentDaysArrears:'0', maxDaysArrears:'0', maxDaysArrearsDuringMonth:'0',
  assetRisk:'Standard', loanPerfStage:'Performing',
  settledBal:{
    principalBal:'1,000.00 EUR', duePrincipal:'0.00 EUR', dueInterest:'0.00 EUR',
    nonDueInterest:'0.00 EUR', dueFee:'0.00 EUR', nonDueFee:'0.00 EUR', overdueAmt:'0.00 EUR'
  },
  totalOverdue:'0.00 EUR', category:'Consumer', pd:'5%',
  loanOfficerName:'-', loanAppId:'-',
  schedule:[
    { n:1, date:'2026-04-10', prin:'76.21', int:'12.50', fee:'0.00', total:'88.71', bal:'923.79', days:31, status:'PENDING' },
    { n:2, date:'2026-05-10', prin:'77.28', int:'11.43', fee:'0.00', total:'88.71', bal:'846.51', days:30, status:'PENDING' },
    { n:3, date:'2026-06-10', prin:'78.37', int:'10.34', fee:'0.00', total:'88.71', bal:'768.14', days:31, status:'PENDING' },
  ],
  transactions:[
    { ch:'-', type:'Disbursement', booking:'10.03.2026', value:'10.03.2026', amt:'+1,000.00 EUR', ccy:'EUR', status:'POSTED' },
  ],
});

const MOCK_EOD_ROWS = [
  { job:'Interest Accrual', type:'interest-accrual', started:'25.03.2026 23:00:02', finished:'25.03.2026 23:01:45', duration:'1m 43s',  status:'Success' },
  { job:'Fee Accrual',      type:'fee-accrual',      started:'25.03.2026 23:02:00', finished:'25.03.2026 23:02:38', duration:'38s',     status:'Success' },
  { job:'Penalty Accrual',  type:'penalty-accrual',  started:'25.03.2026 23:03:00', finished:'25.03.2026 23:03:52', duration:'52s',     status:'Success' },
  { job:'Loan Balance',     type:'loan-balance',     started:'25.03.2026 23:04:05', finished:'25.03.2026 23:05:21', duration:'1m 16s',  status:'Success' },
  { job:'Interest Accrual', type:'interest-accrual', started:'24.03.2026 23:00:01', finished:'24.03.2026 23:01:39', duration:'1m 38s',  status:'Success' },
  { job:'Fee Accrual',      type:'fee-accrual',      started:'24.03.2026 23:02:00', finished:'24.03.2026 23:02:44', duration:'44s',     status:'Success' },
  { job:'Penalty Accrual',  type:'penalty-accrual',  started:'24.03.2026 23:03:00', finished:'24.03.2026 23:04:11', duration:'1m 11s',  status:'Failed'  },
  { job:'Loan Balance',     type:'loan-balance',     started:'24.03.2026 23:05:00', finished:'-',                  duration:'-',       status:'Failed'  },
  { job:'Interest Accrual', type:'interest-accrual', started:'23.03.2026 23:00:02', finished:'23.03.2026 23:01:52', duration:'1m 50s',  status:'Success' },
  { job:'Fee Accrual',      type:'fee-accrual',      started:'23.03.2026 23:02:00', finished:'23.03.2026 23:02:30', duration:'30s',     status:'Success' },
  { job:'Penalty Accrual',  type:'penalty-accrual',  started:'23.03.2026 23:03:00', finished:'23.03.2026 23:03:45', duration:'45s',     status:'Success' },
  { job:'Loan Balance',     type:'loan-balance',     started:'23.03.2026 23:04:00', finished:'23.03.2026 23:05:09', duration:'1m 09s',  status:'Success' },
];

const MOCK_EOD_LOAN_DETAILS = {
  'interest-accrual': [
    { loanId:'57', product:'New BNPL product',          amount:'EUR 3.56',    txTime:'23:00:04', bookingDate:'25.03.2026' },
    { loanId:'55', product:'BNPL 17 UAT start',         amount:'EUR 6.58',    txTime:'23:00:05', bookingDate:'25.03.2026' },
    { loanId:'54', product:'BNPL 17 UAT start',         amount:'EUR 3.46',    txTime:'23:00:06', bookingDate:'25.03.2026' },
    { loanId:'53', product:'BNPL 17 UAT start',         amount:'EUR 5.19',    txTime:'23:00:07', bookingDate:'25.03.2026' },
    { loanId:'51', product:'BNPL 17 UAT start',         amount:'EUR 3.46',    txTime:'23:00:08', bookingDate:'25.03.2026' },
    { loanId:'50', product:'Fidelity test',             amount:'EUR 3.30',    txTime:'23:00:09', bookingDate:'25.03.2026' },
    { loanId:'49', product:'BNPL 17 UAT start',         amount:'EUR 17.32',   txTime:'23:00:10', bookingDate:'25.03.2026' },
    { loanId:'48', product:'BNPL 17 UAT start with fee',amount:'EUR 5.19',    txTime:'23:00:11', bookingDate:'25.03.2026' },
    { loanId:'47', product:'BNPL 17 UAT start',         amount:'EUR 6.58',    txTime:'23:00:12', bookingDate:'25.03.2026' },
    { loanId:'46', product:'BNPL 24',                   amount:'EUR 1.15',    txTime:'23:00:13', bookingDate:'25.03.2026' },
    { loanId:'45', product:'BNPL 24',                   amount:'EUR 2.30',    txTime:'23:00:14', bookingDate:'25.03.2026' },
    { loanId:'58', product:'BNPL 17% - final test',     amount:'EUR 3.46',    txTime:'23:00:15', bookingDate:'25.03.2026' },
  ],
  'fee-accrual': [
    { loanId:'57', product:'New BNPL product',          amount:'EUR 1.50',    txTime:'23:02:02', bookingDate:'25.03.2026' },
    { loanId:'58', product:'BNPL 17% - final test',     amount:'EUR 2.00',    txTime:'23:02:04', bookingDate:'25.03.2026' },
    { loanId:'48', product:'BNPL 17 UAT start with fee',amount:'EUR 3.00',    txTime:'23:02:06', bookingDate:'25.03.2026' },
    { loanId:'50', product:'Fidelity test',             amount:'EUR 1.00',    txTime:'23:02:08', bookingDate:'25.03.2026' },
    { loanId:'53', product:'BNPL 17 UAT start',         amount:'EUR 1.50',    txTime:'23:02:10', bookingDate:'25.03.2026' },
  ],
  'penalty-accrual': [
    { loanId:'46', product:'BNPL 24',                   amount:'EUR 0.85',    txTime:'23:03:04', bookingDate:'25.03.2026' },
    { loanId:'52', product:'BNPL 17 UAT start',         amount:'EUR 1.20',    txTime:'23:03:06', bookingDate:'25.03.2026' },
  ],
  'loan-balance': [
    { loanId:'57', product:'New BNPL product',          amount:'EUR 972.28',   txTime:'23:04:08', bookingDate:'25.03.2026' },
    { loanId:'55', product:'BNPL 17 UAT start',         amount:'EUR 1,899.50', txTime:'23:04:09', bookingDate:'25.03.2026' },
    { loanId:'54', product:'BNPL 17 UAT start',         amount:'EUR 999.00',   txTime:'23:04:10', bookingDate:'25.03.2026' },
    { loanId:'53', product:'BNPL 17 UAT start',         amount:'EUR 1,499.50', txTime:'23:04:11', bookingDate:'25.03.2026' },
    { loanId:'51', product:'BNPL 17 UAT start',         amount:'EUR 1,000.00', txTime:'23:04:12', bookingDate:'25.03.2026' },
    { loanId:'50', product:'Fidelity test',             amount:'EUR 994.03',   txTime:'23:04:13', bookingDate:'25.03.2026' },
    { loanId:'49', product:'BNPL 17 UAT start',         amount:'EUR 5,000.00', txTime:'23:04:14', bookingDate:'25.03.2026' },
    { loanId:'48', product:'BNPL 17 UAT start with fee',amount:'EUR 1,499.50', txTime:'23:04:15', bookingDate:'25.03.2026' },
    { loanId:'47', product:'BNPL 17 UAT start',         amount:'EUR 1,899.50', txTime:'23:04:16', bookingDate:'25.03.2026' },
    { loanId:'46', product:'BNPL 24',                   amount:'EUR 500.00',   txTime:'23:04:17', bookingDate:'25.03.2026' },
    { loanId:'45', product:'BNPL 24',                   amount:'EUR 1,000.00', txTime:'23:04:18', bookingDate:'25.03.2026' },
    { loanId:'58', product:'BNPL 17% - final test',     amount:'EUR 1,000.00', txTime:'23:04:19', bookingDate:'25.03.2026' },
    { loanId:'52', product:'BNPL 17 UAT start',         amount:'EUR 0.00',     txTime:'23:04:20', bookingDate:'25.03.2026' },
  ],
};


// ── Loan Simulation mock data ─────────────────────────────────────────────────
const MOCK_SIM_PRODUCTS = [
  { id:94, code:'New BNPL product 11%',    name:'New BNPL product',                    annualRate:11,   prefRate:0,  tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:92, code:'BNPL 17 UAT start with fee', name:'BNPL 17 UAT start with fee',       annualRate:17,   prefRate:0,  tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:91, code:'BNPL 17 UAT start',       name:'BNPL 17 UAT start',                   annualRate:17,   prefRate:0,  tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:90, code:'BNPL 24',                 name:'BNPL 24',                              annualRate:24,   prefRate:0,  tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:89, code:'BNPL 17% - final test with per instalment fee', name:'BNPL 17% - final test with per instalment fee', annualRate:17, prefRate:0, tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:79, code:'BNPL 17 - final test',    name:'BNPL 17 - final test on 4th Apr',      annualRate:17,   prefRate:0,  tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:87, code:'BNPL v24',               name:'BNPL v24',                              annualRate:24,   prefRate:0,  tenure:24, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:93, code:'Fidelitytest01',          name:'Fidelity test',                         annualRate:14,   prefRate:0,  tenure:6,  currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
  { id:78, code:'PABNPL - v3',             name:'PABNPL - v3',                           annualRate:17,   prefRate:0,  tenure:12, currency:'EUR', repayPattern:'Equal Installment', intCalcMethod:'Proportional', dayCountConv:'30/360', intCalcFreq:'Monthly', shortMonthHandling:'Fixed Day of Month', canBeIrregular:'Yes', irregPeriodAdjMethod:'True Equal Installment', intCalcAt:'End of Period', nonWorkingDayAdj:'No Adjustment', repayRoundingMode:'Half-even' },
];

const MOCK_SIM_CUSTOMERS = [
  { id:'135 - 157634', display:'135 - 157634 - Adelina Sejdiu - 17.01.1984', name:'Adelina Sejdiu', dob:'17.01.1984' },
  { id:'134 - 157633', display:'134 - 157633 - Marko Horvat - 12.05.1979',   name:'Marko Horvat',   dob:'12.05.1979' },
  { id:'133 - 157632', display:'133 - 157632 - Ana Kovač - 08.11.1990',      name:'Ana Kovač',      dob:'08.11.1990' },
  { id:'132 - 157631', display:'132 - 157631 - Ivan Perić - 23.07.1985',     name:'Ivan Perić',     dob:'23.07.1985' },
  { id:'131 - 157630', display:'131 - 157630 - Petra Novak - 15.03.1992',    name:'Petra Novak',    dob:'15.03.1992' },
  { id:'130 - 157629', display:'130 - 157629 - Tomislav Babić - 05.09.1977', name:'Tomislav Babić', dob:'05.09.1977' },
  { id:'129 - 157628', display:'129 - 157628 - Maja Šimić - 28.02.1988',     name:'Maja Šimić',     dob:'28.02.1988' },
  { id:'341 - 999001', display:'341 - 999001 - Josip Lović - 14.06.1983',    name:'Josip Lović',    dob:'14.06.1983' },
];

if (typeof window !== 'undefined') {
  window.MOCK_SIM_PRODUCTS   = MOCK_SIM_PRODUCTS;
  window.MOCK_SIM_CUSTOMERS  = MOCK_SIM_CUSTOMERS;
}

// ── MOCK CUSTOMER DATA ────────────────────────────────────────────────────────
const MOCK_CUSTOMERS = [
  { id:348, extId:'9255',   name:'Drilon',      surname:'Gashi',    gender:'Male',   org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'-',  isEmployee:'No',  dob:'14.03.1988', phone:'+383 44 123 456', email:'drilon.gashi@example.com',   createdAt:'18.09.2026', updatedAt:'28.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:342, extId:'9262',   name:'King',        surname:'Clirimi',  gender:'-',      org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'-',  isEmployee:'No',  dob:'22.07.1992', phone:'+383 44 234 567', email:'king.clirimi@example.com',    createdAt:'15.09.2026', updatedAt:'27.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:341, extId:'9257',   name:'QA',          surname:'And',      gender:'-',      org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'W',  isEmployee:'No',  dob:'-',          phone:'-',              email:'-',                           createdAt:'14.09.2026', updatedAt:'14.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:340, extId:'112149', name:'Shkambi',     surname:'SHKRELI',  gender:'Male',   org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'A',  isEmployee:'No',  dob:'05.11.1979', phone:'+383 44 345 678', email:'shkambi.shkreli@example.com', createdAt:'13.09.2026', updatedAt:'25.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:339, extId:'5286',   name:'elhamprimary',surname:'Primary',  gender:'-',      org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'A',  isEmployee:'No',  dob:'-',          phone:'-',              email:'-',                           createdAt:'12.09.2026', updatedAt:'12.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:338, extId:'219987', name:'Gramoz',      surname:'Hasanaj',  gender:'Male',   org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'A',  isEmployee:'No',  dob:'01.06.1985', phone:'+383 44 456 789', email:'gramoz.hasanaj@example.com',  createdAt:'11.09.2026', updatedAt:'20.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:337, extId:'219083', name:'Bleard',      surname:'Devolli',  gender:'Male',   org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'A',  isEmployee:'No',  dob:'17.09.1990', phone:'+383 44 567 890', email:'bleard.devolli@example.com',  createdAt:'10.09.2026', updatedAt:'10.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:336, extId:'220025', name:'Valbona',     surname:'Jashari',  gender:'Female', org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'A',  isEmployee:'No',  dob:'30.04.1994', phone:'+383 44 678 901', email:'valbona.jashari@example.com', createdAt:'09.09.2026', updatedAt:'18.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:335, extId:'9254',   name:'Drilon',      surname:'Gashi',    gender:'-',      org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'W',  isEmployee:'No',  dob:'14.03.1988', phone:'+383 44 789 012', email:'drilon.gashi2@example.com',  createdAt:'08.09.2026', updatedAt:'16.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:334, extId:'9141',   name:'And',         surname:'Test',     gender:'-',      org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'-',  isEmployee:'No',  dob:'-',          phone:'-',              email:'-',                           createdAt:'07.09.2026', updatedAt:'07.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:333, extId:'8037',   name:'Atdhetar Bnpl',surname:'Ibrahimi BNPL',gender:'-',org:'OneFor',branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'-',  isEmployee:'No',  dob:'-',          phone:'-',              email:'-',                           createdAt:'06.09.2026', updatedAt:'06.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
  { id:332, extId:'207698', name:'Behar',       surname:'Kinolli',  gender:'Male',   org:'OneFor', branch:'-', country:'-', docType:'-', docNo:'-', custType:'Individual', riskClass:'A',  isEmployee:'No',  dob:'23.08.1982', phone:'+383 44 890 123', email:'behar.kinolli@example.com',   createdAt:'05.09.2026', updatedAt:'15.09.2026', orgId:'1586be54-9f31-48b9-a490-0eb387e1fbb5' },
];

// Customer loans mock
const MOCK_CUSTOMER_LOANS = {
  348: [
    { loanId:'1421', product:'PABNPL - v2', disbDate:'23.09.2026', status:'Closed',  disbAmt:'500.00 EUR',  outBal:'0.00 EUR',   dueAmt:'-' },
    { loanId:'1420', product:'PABNPL - v2', disbDate:'23.09.2026', status:'Active',  disbAmt:'500.00 EUR',  outBal:'453.41 EUR', dueAmt:'-' },
    { loanId:'1419', product:'PABNPL - v2', disbDate:'23.09.2026', status:'Closed',  disbAmt:'200.00 EUR',  outBal:'0.00 EUR',   dueAmt:'-' },
    { loanId:'1417', product:'PABNPL - v2', disbDate:'18.09.2026', status:'Closed',  disbAmt:'220.00 EUR',  outBal:'0.00 EUR',   dueAmt:'-' },
  ],
  342: [
    { loanId:'1388', product:'PABNPL - v2', disbDate:'05.09.2026', status:'Active',  disbAmt:'350.00 EUR',  outBal:'220.14 EUR', dueAmt:'-' },
    { loanId:'1350', product:'BNPL 17 UAT start', disbDate:'20.08.2026', status:'Closed', disbAmt:'1,000.00 EUR', outBal:'0.00 EUR', dueAmt:'-' },
  ],
  340: [
    { loanId:'1405', product:'PABNPL - v2', disbDate:'15.09.2026', status:'Active',  disbAmt:'800.00 EUR',  outBal:'651.33 EUR', dueAmt:'133.33 EUR' },
  ],
  338: [
    { loanId:'1399', product:'BNPL 17 UAT start', disbDate:'10.09.2026', status:'Active',  disbAmt:'1,200.00 EUR', outBal:'987.50 EUR', dueAmt:'-' },
    { loanId:'1362', product:'BNPL 17 UAT start', disbDate:'01.08.2026', status:'Closed',  disbAmt:'500.00 EUR',   outBal:'0.00 EUR',   dueAmt:'-' },
  ],
  336: [
    { loanId:'1395', product:'PABNPL - v2', disbDate:'08.09.2026', status:'Overdue', disbAmt:'600.00 EUR',  outBal:'488.20 EUR', dueAmt:'100.00 EUR' },
  ],
  332: [
    { loanId:'1411', product:'PABNPL - v2', disbDate:'18.09.2026', status:'Active',  disbAmt:'1,500.00 EUR', outBal:'1,320.00 EUR', dueAmt:'-' },
    { loanId:'1378', product:'BNPL 17 UAT start', disbDate:'25.08.2026', status:'Closed',  disbAmt:'750.00 EUR',   outBal:'0.00 EUR',    dueAmt:'-' },
  ],
};

if (typeof window !== 'undefined') {
  window.MOCK_CUSTOMERS       = MOCK_CUSTOMERS;
  window.MOCK_CUSTOMER_LOANS  = MOCK_CUSTOMER_LOANS;
}

// ── JOB SCHEDULER ────────────────────────────────────────────────────────────
const MOCK_SCHEDULER_JOBS = [
  { job: 'FeeAccrual',      scope: 'organization', cron: '45 14 * * *', timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
  { job: 'InterestAccrual', scope: 'organization', cron: '0 14 * * *',  timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
  { job: 'PenaltyAccrual',  scope: 'organization', cron: '15 15 * * *', timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
];

if (typeof window !== 'undefined') {
  window.MOCK_SCHEDULER_JOBS = MOCK_SCHEDULER_JOBS;
}

// ── MOCK RECENT RUNS ─────────────────────────────────────────────────────────
const MOCK_RECENT_RUNS = (function() {
  const jobs = ['FeeAccrual','InterestAccrual','PenaltyAccrual','LoanBalance','StatementGeneration','DormancyCheck'];
  const statuses = ['SUCCEEDED','SUCCEEDED','SUCCEEDED','PARTIALLY SUCCEEDED','FAILED','SUCCEEDED','SUCCEEDED'];
  const orgs = ['OneFor - Scheduled','OneFor - Scheduled','OneFor - Scheduled','OneFor - Automated'];
  const runs = [];
  let d = new Date('2026-10-07T19:14:00');
  for (let i = 1; i <= 60; i++) {
    const job = jobs[(i-1) % jobs.length];
    const status = statuses[(i-1) % statuses.length];
    const org = orgs[(i-1) % orgs.length];
    const started = new Date(d);
    const dur = 60 + Math.floor(Math.random()*300);
    const normalized = new Date(started.getTime() + dur*1000);
    runs.push({
      id: i,
      run: '#' + String(i).padStart(3,'0') + ' · ' + job,
      jobName: job,
      org,
      status,
      started: started.toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}).replace(',',''),
      normalized: normalized.toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}).replace(',',''),
      duration: dur + 's',
      itemsTotal: 'TBD / TBD',
      itemsDetail: Math.floor(Math.random()*5)+1 + ' order' + (Math.floor(Math.random()*5)+1 > 1 ? 's' : ''),
    });
    d = new Date(d.getTime() - 18*60*1000);
  }
  return runs;
})();
if (typeof window !== 'undefined') { window.MOCK_RECENT_RUNS = MOCK_RECENT_RUNS; }

// ── MOCK JOB CATALOGUE ───────────────────────────────────────────────────────
const MOCK_JOB_CATALOGUE = [
  {
    id: 'JOB-001', name: 'InterestAccrual', category: 'Accrual',
    description: 'Calculates and posts daily interest accrual entries for all active loan accounts.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'accrualMethod', type: 'enum', values: ['ACT/365','ACT/360','30/360'], default: 'ACT/365', required: true },
      { name: 'postingDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'includeNonPerforming', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','accrual','interest'],
  },
  {
    id: 'JOB-002', name: 'FeeAccrual', category: 'Accrual',
    description: 'Accrues scheduled loan fees (origination, servicing, insurance) across all active accounts.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'feeTypes', type: 'multiselect', values: ['origination','servicing','insurance','late'], default: 'all', required: false },
      { name: 'postingDate', type: 'date', default: 'bookingDate', required: true },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','accrual','fee'],
  },
  {
    id: 'JOB-003', name: 'PenaltyAccrual', category: 'Accrual',
    description: 'Computes penalty charges for overdue loan instalments and posts them to the penalty ledger.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'gracePeriodDays', type: 'integer', default: 0, required: false },
      { name: 'penaltyRate', type: 'decimal', default: null, required: false, hint: 'Overrides product-level rate if set' },
      { name: 'postingDate', type: 'date', default: 'bookingDate', required: true },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','penalty'],
  },
  {
    id: 'JOB-004', name: 'LoanBalance', category: 'Reporting',
    description: 'Reconciles and snapshots outstanding principal, interest and fee balances for all loan accounts.',
    scope: ['organization'], enabled: true,
    parameters: [
      { name: 'snapshotDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'includeClosedAccounts', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','balance','reconciliation'],
  },
  {
    id: 'JOB-005', name: 'StatementGeneration', category: 'Statements',
    description: 'Generates monthly account statements in PDF format and queues them for delivery.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'statementMonth', type: 'integer', default: null, required: true, hint: 'Month offset from booking date (0 = current)' },
      { name: 'deliveryChannel', type: 'enum', values: ['email','portal','both'], default: 'both', required: true },
      { name: 'includeZeroBalance', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: [], tags: ['monthly','statement'],
  },
  {
    id: 'JOB-006', name: 'DormancyCheck', category: 'Compliance',
    description: 'Flags accounts with no activity for the configured dormancy threshold and applies dormancy status.',
    scope: ['organization'], enabled: false,
    parameters: [
      { name: 'dormancyThresholdDays', type: 'integer', default: 365, required: true },
      { name: 'notifyCustomer', type: 'boolean', default: true, required: false },
    ],
    assignedOrgs: [], tags: ['compliance','dormancy'],
  },
  {
    id: 'JOB-007', name: 'NPLClassification', category: 'Risk',
    description: 'Reclassifies loan accounts to non-performing status based on days past due thresholds.',
    scope: ['organization'], enabled: true,
    parameters: [
      { name: 'dpd30Threshold', type: 'integer', default: 30, required: true },
      { name: 'dpd60Threshold', type: 'integer', default: 60, required: true },
      { name: 'dpd90Threshold', type: 'integer', default: 90, required: true },
      { name: 'autoProvision', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['risk','npl','classification'],
  },
  {
    id: 'JOB-008', name: 'CollectionQueue', category: 'Collections',
    description: 'Builds and updates the collection worklist based on configured DPD buckets and assignment rules.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'minDPD', type: 'integer', default: 1, required: true },
      { name: 'assignmentStrategy', type: 'enum', values: ['round-robin','load-balanced','fixed-agent'], default: 'round-robin', required: true },
      { name: 'excludeWaivedAccounts', type: 'boolean', default: true, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['collections','queue'],
  },
];
if (typeof window !== 'undefined') { window.MOCK_JOB_CATALOGUE = MOCK_JOB_CATALOGUE; }

// ── PENALTY DEFINITIONS ──────────────────────────────────────────────────────
const MOCK_PENALTY_DEFS = [
  {
    id: 1,
    name: 'Default Penalty Definition',
    method: 'Actual Actual',
    freq: 'Daily',
    base: 'Due Principal',
    rate: 12.5,
    status: 'Active',
    created: '18.06.2026',
  },
];
if (typeof window !== 'undefined') { window.MOCK_PENALTY_DEFS = MOCK_PENALTY_DEFS; }

// ── MOCK ACC/DEP SCHEDULER JOBS ───────────────────────────────────────────────
const MOCK_ACC_SCHEDULER_JOBS = [
  { job: 'InterestAccrual',         scope: 'organization', cron: '0 14 * * *',  timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
  { job: 'FeeAccrual',              scope: 'organization', cron: '45 14 * * *', timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
  { job: 'EODProcessing',           scope: 'organization', cron: '30 21 * * *', timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 2 },
  { job: 'StatementGeneration',     scope: 'organization', cron: '0 6 1 * *',   timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 1 },
  { job: 'TermDepositMaturity',     scope: 'organization', cron: '0 7 * * *',   timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
  { job: 'OverdraftReview',         scope: 'branch',       cron: '0 8 * * 1',   timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 0 },
  { job: 'DormancyCheck',           scope: 'organization', cron: '0 3 * * 0',   timezone: 'UTC', execStrategy: '', enabled: 'No',  dependencies: 0 },
  { job: 'InterestCapitalisation',  scope: 'organization', cron: '0 6 28 * *',  timezone: 'UTC', execStrategy: '', enabled: 'Yes', dependencies: 1 },
];
if (typeof window !== 'undefined') { window.MOCK_ACC_SCHEDULER_JOBS = MOCK_ACC_SCHEDULER_JOBS; }

// ── MOCK ACC/DEP RECENT RUNS ──────────────────────────────────────────────────
const MOCK_ACC_RECENT_RUNS = (function() {
  const jobs = ['InterestAccrual','FeeAccrual','EODProcessing','StatementGeneration','TermDepositMaturity','OverdraftReview','DormancyCheck','InterestCapitalisation'];
  const statuses = ['SUCCEEDED','SUCCEEDED','SUCCEEDED','PARTIALLY SUCCEEDED','FAILED','SUCCEEDED','SUCCEEDED'];
  const orgs = ['OneFor - Scheduled','OneFor - Scheduled','OneFor - Automated','OneFor - Scheduled'];
  const runs = [];
  let d = new Date('2026-10-07T20:00:00');
  for (let i = 1; i <= 60; i++) {
    const job = jobs[(i-1) % jobs.length];
    const status = statuses[(i-1) % statuses.length];
    const org = orgs[(i-1) % orgs.length];
    const started = new Date(d);
    const dur = 60 + Math.floor(Math.random()*400);
    const normalized = new Date(started.getTime() + dur*1000);
    runs.push({
      id: i,
      run: '#' + String(i).padStart(3,'0') + ' · ' + job,
      jobName: job,
      org,
      status,
      started: started.toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}).replace(',',''),
      normalized: normalized.toLocaleString('de-DE',{day:'2-digit',month:'2-digit',year:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit'}).replace(',',''),
      duration: dur + 's',
      itemsTotal: 'TBD / TBD',
      itemsDetail: Math.floor(Math.random()*8)+1 + ' account' + (Math.floor(Math.random()*8)+1 > 1 ? 's' : ''),
    });
    d = new Date(d.getTime() - 15*60*1000);
  }
  return runs;
})();
if (typeof window !== 'undefined') { window.MOCK_ACC_RECENT_RUNS = MOCK_ACC_RECENT_RUNS; }

// ── MOCK ACC/DEP JOB CATALOGUE ────────────────────────────────────────────────
const MOCK_ACC_JOB_CATALOGUE = [
  {
    id: 'AJOB-001', name: 'InterestAccrual', category: 'Accrual',
    description: 'Calculates and posts daily interest accrual entries for all active savings and current accounts.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'accrualMethod', type: 'enum', values: ['ACT/365','ACT/360','30/360'], default: 'ACT/365', required: true },
      { name: 'postingDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'includeZeroBalance', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','accrual','interest'],
  },
  {
    id: 'AJOB-002', name: 'FeeAccrual', category: 'Accrual',
    description: 'Accrues scheduled account fees (maintenance, servicing, transaction) across all active accounts.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'feeTypes', type: 'multiselect', values: ['maintenance','servicing','transaction','overdraft'], default: 'all', required: false },
      { name: 'postingDate', type: 'date', default: 'bookingDate', required: true },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','accrual','fee'],
  },
  {
    id: 'AJOB-003', name: 'EODProcessing', category: 'End of Day',
    description: 'Runs the full end-of-day batch cycle: balance snapshots, interest posting, GL reconciliation, and reports.',
    scope: ['organization'], enabled: true,
    parameters: [
      { name: 'businessDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'runGLReconciliation', type: 'boolean', default: true, required: false },
      { name: 'generateSummaryReport', type: 'boolean', default: true, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','eod','batch'],
  },
  {
    id: 'AJOB-004', name: 'StatementGeneration', category: 'Statements',
    description: 'Generates monthly account statements in PDF format and queues them for delivery via email or portal.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'statementMonth', type: 'integer', default: null, required: true, hint: 'Month offset from booking date (0 = current)' },
      { name: 'deliveryChannel', type: 'enum', values: ['email','portal','both'], default: 'both', required: true },
      { name: 'includeZeroBalance', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['monthly','statement'],
  },
  {
    id: 'AJOB-005', name: 'TermDepositMaturity', category: 'Deposits',
    description: 'Processes maturing term deposits: triggers rollover rules, pays out principal and accrued interest, or moves to matured status.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'maturityDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'defaultAction', type: 'enum', values: ['rollover','payout','hold'], default: 'rollover', required: true },
      { name: 'notifyCustomer', type: 'boolean', default: true, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['daily','maturity','deposits'],
  },
  {
    id: 'AJOB-006', name: 'OverdraftReview', category: 'Risk',
    description: 'Reviews current overdraft utilisation, flags accounts breaching limits, and applies penalty interest where applicable.',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'reviewDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'penaltyRateOverride', type: 'decimal', default: null, required: false, hint: 'Overrides product-level overdraft penalty rate if set' },
      { name: 'autoFlag', type: 'boolean', default: true, required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['weekly','overdraft','risk'],
  },
  {
    id: 'AJOB-007', name: 'DormancyCheck', category: 'Compliance',
    description: 'Flags accounts with no customer-initiated activity for the configured dormancy threshold and applies dormancy status.',
    scope: ['organization'], enabled: false,
    parameters: [
      { name: 'dormancyThresholdDays', type: 'integer', default: 365, required: true },
      { name: 'notifyCustomer', type: 'boolean', default: true, required: false },
      { name: 'blockDebits', type: 'boolean', default: false, required: false },
    ],
    assignedOrgs: [], tags: ['compliance','dormancy'],
  },
  {
    id: 'AJOB-008', name: 'InterestCapitalisation', category: 'Accrual',
    description: 'Capitalises accrued savings interest into account balance on the configured capitalisation date (typically monthly or quarterly).',
    scope: ['organization','branch'], enabled: true,
    parameters: [
      { name: 'capitalisationDate', type: 'date', default: 'bookingDate', required: true },
      { name: 'includeBonus', type: 'boolean', default: false, required: false },
      { name: 'postingNarrative', type: 'enum', values: ['INTEREST CAPITALISATION','INT CAP','CREDIT INTEREST'], default: 'INTEREST CAPITALISATION', required: false },
    ],
    assignedOrgs: ['OneFor'], tags: ['monthly','capitalisation','savings'],
  },
];
if (typeof window !== 'undefined') { window.MOCK_ACC_JOB_CATALOGUE = MOCK_ACC_JOB_CATALOGUE; }
