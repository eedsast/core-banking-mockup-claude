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
    product:'New BNPL product', customer:'-', loanAmt:'1,000.00 EUR', outstanding:'972.26 EUR',
    disbursed:'20.03.2026', maturity:'20.03.2027', firstRepay:'20.04.2026', instalments:'12',
    prefRate:'-2%', annualRate:'16%', totalRate:'14%',
    loanOfficer:'-', org:'00000000-0000-0000-0000-000000000000', branch:'-',
    tenor:'12 months', currency:'EUR',
    accruedInt:'32.47 EUR', accruedFee:'-', penaltyAmt:'5.27 EUR',
    intAccruedOn:'21.06.2026', feeAccruedOn:'-', penaltyAccruedOn:'21.06.2026',
    effRate:'19.4156%', nextPayDate:'20.05.2026', nextPayAmt:'20.84 EUR',
    purpose:'Consumer', collateral:'-', ltv:'-',
    appId:'3fa35954-6717-4562-b3fc-2c083f66efa6', tlq:'6%', lgd:'76%',
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
  purpose:'Consumer', collateral:'-', ltv:'-',
  appId:'-', tlq:'5%', lgd:'70%',
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
