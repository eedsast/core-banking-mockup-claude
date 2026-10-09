/* ═══════════════════════════════════════════════════════
   loans.js — Loans module rendering & forms
   Loaded lazily by loadLoansModule() in core_banking.
   Depends on: mock-loans.js (loaded first), core helpers
   (renderTable, esc, _I_* icon constants, etc.)
═══════════════════════════════════════════════════════ */

'use strict';

/* ── PUBLIC ENTRY POINT ──────────────────────────────────
   Called by renderContent() in core_banking.html when
   the requested section belongs to the loans module.
──────────────────────────────────────────────────────── */
function renderLoansContent(containerId, mod, section, title, subtitle) {
  const moduleMap = window._moduleMap;
  const m = moduleMap ? moduleMap[mod] : null;

    // ── LOAN DETAIL (5-tab screen) ────────────────────────────────────────────────
  if (section === 'loan-detail') {
    const loanId  = window._loanDetailId  || '57';
    const activeTab = window._loanDetailTab || 'details';

    // ── Per-loan data lookup ──────────────────────────────────────────────────
    const loanData = MOCK_LOAN_DATA;
    const d = loanData[loanId] || MOCK_LOAN_FALLBACK(loanId);

    // ── Status badge helpers ──────────────────────────────────────────────────
    const schedBadge = s => {
      if (s === 'PARTIALLY PAID') return `<span class="li-badge-partial">PARTIALLY PAID</span>`;
      if (s === 'PAID')           return `<span class="li-badge-paid">PAID</span>`;
      return `<span class="li-badge-pending">PENDING</span>`;
    };

    // ── Tab: DETAILS ──────────────────────────────────────────────────────────
    const sb = d.settledBal || {};
    const tabDetails = `
      <div class="li-section">
        <div class="li-section-title">Settled Balance</div>
        <div class="li-field-grid">
          <div class="li-field"><div class="li-field-label">Principal Balance</div><div class="li-field-value">${sb.principalBal||d.outstanding}</div></div>
          <div class="li-field"><div class="li-field-label">Due Principal</div><div class="li-field-value">${sb.duePrincipal||'0.00 EUR'}</div></div>
          <div class="li-field"><div class="li-field-label">Due Interest</div><div class="li-field-value">${sb.dueInterest||'0.00 EUR'}</div></div>
          <div class="li-field"><div class="li-field-label">Non-Due Interest</div><div class="li-field-value">${sb.nonDueInterest||d.accruedInt}</div></div>
          <div class="li-field"><div class="li-field-label">Due Fee</div><div class="li-field-value">${sb.dueFee||'0.00 EUR'}</div></div>
          <div class="li-field"><div class="li-field-label">Non-Due Fee</div><div class="li-field-value">${sb.nonDueFee||'0.00 EUR'}</div></div>
          <div class="li-field"><div class="li-field-label">Overdue Amount</div><div class="li-field-value">${sb.overdueAmt||'0.00 EUR'}</div></div>
        </div>
      </div>
      <div class="li-section">
        <div class="li-section-title">Financial Details</div>
        <div class="li-field-grid">
          <div class="li-field"><div class="li-field-label">Loan Amount</div><div class="li-field-value">${d.loanAmt}</div></div>
          <div class="li-field"><div class="li-field-label">Outstanding Balance</div><div class="li-field-value">${d.outstanding}</div></div>
          <div class="li-field"><div class="li-field-label">Total Overdue Amount</div><div class="li-field-value">${d.totalOverdue||'0.00 EUR'}</div></div>
          <div class="li-field"><div class="li-field-label">Accrued Interest</div><div class="li-field-value">${d.accruedInt}</div></div>
          <div class="li-field"><div class="li-field-label">Accrued Fee</div><div class="li-field-value">${d.accruedFee||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">Penalty Interest Amount</div><div class="li-field-value">${d.penaltyAmt}</div></div>
          <div class="li-field"><div class="li-field-label">Interest Accrued On</div><div class="li-field-value">${d.intAccruedOn}</div></div>
          <div class="li-field"><div class="li-field-label">Fee Accrued On</div><div class="li-field-value">${d.feeAccruedOn||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">Penalty Interest Accrued On</div><div class="li-field-value">${d.penaltyAccruedOn}</div></div>
          <div class="li-field"><div class="li-field-label">Effective Interest Rate</div><div class="li-field-value">${d.effRate}</div></div>
        </div>
        <div class="li-highlight-row">
          <div class="li-field"><div class="li-field-label">Next Payment Date</div><div class="li-field-value-hl">${d.nextPayDate}</div></div>
          <div></div>
          <div class="li-field"><div class="li-field-label">Next Payment Amount</div><div class="li-field-value-hl">${d.nextPayAmt}</div></div>
        </div>
      </div>
      <div class="li-section">
        <div class="li-section-title">Additional Information</div>
        <div class="li-field-grid">
          <div class="li-field"><div class="li-field-label">Category</div><div class="li-field-value">${d.category||d.purpose||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">Purpose</div><div class="li-field-value">${d.purpose||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">Loan to Value</div><div class="li-field-value">${d.loanToValue||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">LTV Ratio</div><div class="li-field-value">${d.ltvRatio||d.ltv||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">Loan Application ID</div><div class="li-field-value li-sum-value--mono" style="font-size:.76rem;word-break:break-all">${d.appId||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">Loan Officer</div><div class="li-field-value">${d.loanOfficer||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">LGD %</div><div class="li-field-value">${d.lgd||'-'}</div></div>
          <div class="li-field"><div class="li-field-label">PD %</div><div class="li-field-value">${d.pd||d.tlq||'-'}</div></div>
        </div>
      </div>`;

    // ── Tab: REPAYMENT SCHEDULE ───────────────────────────────────────────────
    const schedRows = d.schedule.map(r => `
      <tr>
        <td>${r.n}</td>
        <td>${r.date}</td>
        <td style="text-align:right">${r.prin} EUR</td>
        <td style="text-align:right">${r.int} EUR</td>
        <td style="text-align:right">${r.fee} EUR</td>
        <td style="text-align:right;font-weight:600">${r.total} EUR</td>
        <td style="text-align:right">${r.bal} EUR</td>
        <td style="text-align:center">${r.days}</td>
        <td>${schedBadge(r.status)}</td>
      </tr>`).join('');
    const totPrin  = d.schedule.reduce((s,r)=>s+parseFloat(r.prin),0).toFixed(2);
    const totInt   = d.schedule.reduce((s,r)=>s+parseFloat(r.int),0).toFixed(2);
    const totFee   = d.schedule.reduce((s,r)=>s+parseFloat(r.fee),0).toFixed(2);
    const totTotal = d.schedule.reduce((s,r)=>s+parseFloat(r.total),0).toFixed(2);
    const tabSchedule = `
      <div class="li-section">
        <div class="li-sched-header">
          <div>
            <div class="li-sched-title">Repayment Schedule</div>
            <div class="li-sched-sub">Detailed breakdown of all instalments</div>
          </div>
          <button class="li-export-btn">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 2v8M4 7l4 4 4-4"/><path d="M2 12v2h12v-2"/></svg>
            Export
          </button>
        </div>
        <div class="li-sched-table-wrap">
          <table class="li-sched-table">
            <thead>
              <tr>
                <th>Instalment #</th><th>Repayment Date</th>
                <th style="text-align:right">Principal</th>
                <th style="text-align:right">Interest</th>
                <th style="text-align:right">Fee</th>
                <th style="text-align:right">Total Instalment</th>
                <th style="text-align:right">Remaining Balance</th>
                <th style="text-align:center">Days in Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              ${schedRows}
              <tr class="total-row">
                <td colspan="2"><strong>Total</strong></td>
                <td style="text-align:right">${totPrin} EUR</td>
                <td style="text-align:right">${totInt} EUR</td>
                <td style="text-align:right">${totFee} EUR</td>
                <td style="text-align:right">${totTotal} EUR</td>
                <td colspan="3"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`;

    // ── Tab: LOAN TRANSACTIONS ────────────────────────────────────────────────
    const txnRows = d.transactions.map(t => `
      <tr>
        <td>${t.ch}</td>
        <td>${t.type}</td>
        <td>${t.booking}</td>
        <td>${t.value}</td>
        <td style="font-weight:600">${t.amt}</td>
        <td>${t.ccy}</td>
        <td><span class="li-badge-posted">POSTED</span></td>
      </tr>`).join('');
    const tabTransactions = `
      <div class="li-section" style="margin-bottom:0">
        <div class="li-sched-header">
          <div>
            <div class="li-sched-title">Transactions for Loan ID: ${loanId}</div>
            <div class="li-sched-sub">View transaction history for this loan</div>
          </div>
        </div>
        <div class="li-txn-filters">
          <label class="li-txn-filter-lbl">Transaction Type
            <select class="li-txn-select"><option>Select an item</option><option>Disbursement</option><option>Collection</option><option>Fee</option><option>Interest</option></select>
          </label>
          <label class="li-txn-filter-lbl">Status
            <select class="li-txn-select"><option>Select an Item</option><option>POSTED</option><option>PENDING</option></select>
          </label>
          <label class="li-txn-filter-lbl">Date From
            <input class="li-txn-input" type="text" placeholder="Select Date" />
          </label>
          <label class="li-txn-filter-lbl">Date To
            <input class="li-txn-input" type="text" placeholder="Select Date" />
          </label>
          <label class="li-txn-filter-lbl">Amount From
            <input class="li-txn-input" type="number" value="0.00" style="width:80px"/>
          </label>
          <label class="li-txn-filter-lbl">Amount To
            <input class="li-txn-input" type="number" value="0.00" style="width:80px"/>
          </label>
          <label class="li-txn-filter-lbl">Include Accrual
            <select class="li-txn-select"><option>No</option><option>Yes</option></select>
          </label>
        </div>
        <div class="li-sched-table-wrap">
          <table class="li-sched-table">
            <thead>
              <tr><th>Channel</th><th>Transaction Type</th><th>Booking Date</th><th>Value Date</th><th>Amount</th><th>Currency</th><th>Status</th></tr>
            </thead>
            <tbody>${txnRows}</tbody>
          </table>
        </div>
        <div class="li-txn-pagination">
          <span>Showing 1–${d.transactions.length} of ${d.transactions.length} results</span>
          <div class="li-pag-controls">
            <button class="li-pag-btn">Previous</button>
            <button class="li-pag-btn active">1</button>
            <button class="li-pag-btn">Next</button>
          </div>
        </div>
      </div>`;

    // ── Tab: COLLECTION ───────────────────────────────────────────────────────
    const collPreviewed = window._collPreviewed === loanId;
    const collResultHtml = collPreviewed
      ? '<div class="li-coll-result">'
        + '<div class="li-coll-result-title">Allocation Preview Result</div>'
        + '<div class="li-coll-amounts">'
        + '<div class="li-coll-amt-cell"><div class="li-coll-amt-label">Payment Amount</div><div class="li-coll-amt-value">30.00 EUR</div></div>'
        + '<div class="li-coll-amt-cell"><div class="li-coll-amt-label">Allocated Amount</div><div class="li-coll-amt-value">30.00 EUR</div></div>'
        + '<div class="li-coll-amt-cell"><div class="li-coll-amt-label">Unallocated Amount</div><div class="li-coll-amt-value">0.00 EUR</div></div>'
        + '</div>'
        + '<div class="li-sched-table-wrap">'
        + '<table class="li-sched-table">'
        + '<thead><tr><th>Sequence</th><th>Due Date</th><th>Components</th><th>Remaining Before</th><th>Applied</th><th>Remaining After</th></tr></thead>'
        + '<tbody>'
        + '<tr><td>2</td><td>20.04.2026</td><td>Principal</td>'
        + '<td style="text-align:right">50.38 EUR</td>'
        + '<td style="text-align:right;color:#1a9e5c;font-weight:600">30.00 EUR</td>'
        + '<td style="text-align:right">20.38 EUR</td></tr>'
        + '</tbody></table></div>'
        + '</div>'
      : '';
    const tabCollection = `
      <div class="li-section">
        <div class="li-coll-input-header">
          <div>
            <div class="li-sched-title">Collection for Loan ID: ${loanId}</div>
            <div class="li-sched-sub">Preview allocation and post collection transactions</div>
          </div>
          <div class="li-coll-hdr-right">
            <button class="li-btn-reset" data-action="coll-reset">Reset</button>
          </div>
        </div>
        <div>
          <div class="li-section-title" style="padding:12px 18px 10px;border-bottom:none;">Collection Input</div>
          <div class="li-coll-fields">
            <div class="li-field"><div class="li-field-label">Amount</div><input class="li-txn-input" id="coll-amount" value="30" /></div>
            <div class="li-field"><div class="li-field-label">Currency</div>
              <select class="li-txn-select" id="coll-currency"><option>EUR</option><option>USD</option><option>GBP</option></select>
            </div>
            <div class="li-field"><div class="li-field-label">Booking Date</div><input class="li-txn-input" id="coll-booking" value="25.03.2026" /></div>
            <div class="li-field"><div class="li-field-label">Value Date</div><input class="li-txn-input" id="coll-value" value="25.03.2026" /></div>
          </div>
          <div class="li-coll-action-row">
            <button class="li-btn-preview" data-action="coll-preview">Preview Allocation</button>
            ${collPreviewed ? '<button class="li-btn-post" data-action="coll-post">Post Collection</button>' : ''}
          </div>
        </div>
      </div>
      ${collResultHtml}`;

    // ── Tab: EARLY REPAYMENT ──────────────────────────────────────────────────
    const erQuoted = window._erQuoted === loanId;
    const erSummaryHtml = erQuoted
      ? '<div class="li-section-title" style="padding:14px 18px 12px;">Summary</div>'
        + '<div class="li-er-fields">'
        + '<div class="li-er-row li-er-row--highlight">'
        + '<div class="li-er-label">Total Amount</div>'
        + '<div class="li-er-val li-er-val--total"><input class="li-er-total-input" type="text" value="1,001.88" /></div>'
        + '</div>'
        + '<div class="li-er-row"><div class="li-er-label">Loan Account ID</div><div class="li-er-val">' + loanId + '</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Payoff Date</div><div class="li-er-val">07.10.2026</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Principal Amount</div><div class="li-er-val">1,000.00</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Interest Due Amount</div><div class="li-er-val">0.00</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Penalty Due Amount</div><div class="li-er-val">0.00</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Fee Due Amount</div><div class="li-er-val">0.00</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Accrued Interest Amount</div><div class="li-er-val">1.88</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Last Interest Accrual Run</div><div class="li-er-val">21.06.2026</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Last Fee Accrual Run</div><div class="li-er-val">-</div></div>'
        + '<div class="li-er-row"><div class="li-er-label">Last Penalty Run</div><div class="li-er-val">21.06.2026</div></div>'
        + '</div>'
      : '';
    const tabEarlyRepayment = `
      <div class="li-section">
        <div class="li-er-header">
          <div>
            <div class="li-sched-title">Early Repayment</div>
            <div class="li-sched-sub">Early repayment summary for loan ID: ${loanId}</div>
          </div>
          <div class="li-er-action-row">
            <button class="li-getquote-btn" data-action="er-get-quote">Get Quote</button>
            ${erQuoted ? '<button class="li-pay-btn" data-action="er-pay">' + _I_CHECK_13 + ' Pay</button>' : ''}
          </div>
        </div>
        <div class="li-er-date-row">
          <div class="li-field" style="max-width:220px">
            <div class="li-field-label">Settlement Date</div>
            <input class="li-txn-input" id="er-settlement-date" value="07.10.2026" />
          </div>
        </div>
        ${erSummaryHtml}
      </div>`;

    // ── Tab content selector ──────────────────────────────────────────────────
    const tabContent = activeTab === 'schedule'    ? tabSchedule
                     : activeTab === 'transactions' ? tabTransactions
                     : activeTab === 'collection'   ? tabCollection
                     : activeTab === 'early'        ? tabEarlyRepayment
                     : tabDetails;

    // ── Loan Summary strip ────────────────────────────────────────────────────
    const summaryHtml = `
      <div class="li-summary">
        <div class="li-summary-title">Loan Summary</div>
        <div class="li-summary-grid li-summary-grid--wide">
          <div class="li-sum-cell"><div class="li-sum-label">Customer ID</div><div class="li-sum-value">${d.customerId||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">External/OneFor Customer ID</div><div class="li-sum-value">${d.externalCustId||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Application ID</div><div class="li-sum-value li-sum-value--mono">${d.appId||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Repayment Plan ID</div><div class="li-sum-value">${d.repayPlanId||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Fimple Loan ID</div><div class="li-sum-value">${d.fimpleLoanId||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Product Name</div><div class="li-sum-value">${esc(d.product)}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Customer Name</div><div class="li-sum-value">${d.customer||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Loan Amount</div><div class="li-sum-value">${d.loanAmt}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Outstanding Balance</div><div class="li-sum-value">${d.outstanding}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Disbursement Date</div><div class="li-sum-value">${d.disbursed}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Maturity Date</div><div class="li-sum-value">${d.maturity}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">First Repayment Date</div><div class="li-sum-value">${d.firstRepay}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Number of Instalments</div><div class="li-sum-value">${d.instalments}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Preferential Interest Rate (%)</div><div class="li-sum-value">${d.prefRate}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Annual Interest Rate (%)</div><div class="li-sum-value">${d.annualRate}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Total Interest Rate (%)</div><div class="li-sum-value">${d.totalRate}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Current Days in Arrears</div><div class="li-sum-value">${d.currentDaysArrears||'0'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Max Days in Arrears</div><div class="li-sum-value">${d.maxDaysArrears||'0'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Max Days in Arrears During Month</div><div class="li-sum-value">${d.maxDaysArrearsDuringMonth||'0'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Asset Risk</div><div class="li-sum-value">${d.assetRisk||'-'}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Loan Performance Stage</div><div class="li-sum-value">${d.loanPerfStage||'-'}</div></div>
        </div>
      </div>`;

    const mkTab = (key, label) => `<button class="li-tab${activeTab===key?' active':''}" data-action="loan-detail-tab" data-tab="${key}">${label}</button>`;

    return `
      <div class="li-wrap">
        <div class="li-topbar">
          <div class="li-topbar-left">
            <button class="li-back-btn" data-action="loan-detail-back">
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2L4 7l5 5"/></svg>
            </button>
            <div>
              <div class="li-title">Loan Information</div>
              <div class="li-loan-id">${loanId}</div>
            </div>
          </div>
          <button class="li-save-btn">
            ${_I_CHECK_13}
            Save
          </button>
        </div>
        <div class="li-status-bar">
          <div class="li-status-label">Status:</div>
          <select class="li-status-select"><option>ACTIVE</option><option>CLOSED</option><option>OVERDUE</option></select>
        </div>
        ${summaryHtml}
        <div class="li-tabs">
          ${mkTab('details',      'Details')}
          ${mkTab('schedule',     'Repayment Schedule')}
          ${mkTab('transactions', 'Loan Transactions')}
          ${mkTab('collection',   'Collection')}
          ${mkTab('early',        'Early Repayment')}
        </div>
        <div class="li-tab-body">${tabContent}</div>
      </div>`;
  }
    // ── LOAN ACCOUNTS LIST ──────────────────────────────────────────────────────
  if (section === 'loaninfo') {
    const rows = MOCK_LOAN_ACCOUNTS;
    const statusBadge = s => {
      if (s === 'ACTIVE')  return `<span class="la-badge-active">ACTIVE</span>`;
      if (s === 'OVERDUE') return `<span class="la-badge-overdue">OVERDUE</span>`;
      return `<span class="la-badge-closed">${s}</span>`;
    };
    const rowsHtml = rows.map(r => `
      <tr>
        <td><a class="la-id-link" href="#" data-action="la-view-loan" data-id="${r.id}">${r.id}</a></td>
        <td>${r.customer}</td>
        <td>${r.product}</td>
        <td>${r.disbursed}</td>
        <td>${r.maturity}</td>
        <td>${statusBadge(r.status)}</td>
        <td>${r.ccy}</td>
        <td style="text-align:right;font-variant-numeric:tabular-nums">${r.amount}</td>
        <td style="text-align:right;font-variant-numeric:tabular-nums">${r.remaining}</td>
        <td>
          <button class="btn-la-view" data-action="la-view-loan" data-id="${r.id}">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="3"/><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/></svg>
            View
          </button>
        </td>
      </tr>`).join('');
    return `
      <div class="la-wrap">
        <div class="pg-header">
          <div class="pg-title">Loan Information</div>
          <div class="pg-sub">View and manage loan accounts</div>
        </div>
        <div class="la-stats-row">
          <div class="la-stat-card accent-purple">
            <div class="la-stat-value">13</div>
            <div class="la-stat-label">Total Loan Accounts</div>
          </div>
          <div class="la-stat-card accent-green">
            <div class="la-stat-value">13</div>
            <div class="la-stat-label">Active</div>
          </div>
          <div class="la-stat-card accent-blue">
            <div class="la-stat-value">€18,169.77</div>
            <div class="la-stat-label">Total Outstanding</div>
          </div>
          <div class="la-stat-card accent-red">
            <div class="la-stat-value">0</div>
            <div class="la-stat-label">Overdue</div>
          </div>
        </div>
        <div class="la-filter-card">
          <div class="la-filter-hdr">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 3h14M4 8h8M7 13h2" stroke-linecap="round"/></svg>
            Filters:
          </div>
          <div class="la-filter-row">
            <div class="la-filter-field">
              <label class="la-filter-label">Organization</label>
              <div class="la-select-wrap">
                <select class="la-select">
                  <option>Select an item</option>
                  <option>Main Holding Group</option>
                  <option>Retail Banking Ltd</option>
                </select>
              </div>
            </div>
            <div class="la-filter-field">
              <label class="la-filter-label">Branch</label>
              <div class="la-select-wrap">
                <select class="la-select">
                  <option>Select an item</option>
                  <option>Belgrade HQ</option>
                  <option>Novi Sad</option>
                  <option>Niš Branch</option>
                </select>
              </div>
            </div>
            <div class="la-filter-field">
              <label class="la-filter-label">Loan Account ID</label>
              <input class="la-search-input" type="text" placeholder="Search by Loan Account ID…" data-action="table-filter" data-target=".la-table tbody"/>
            </div>
            <div class="la-filter-field">
              <label class="la-filter-label">Product</label>
              <div class="la-select-wrap">
                <select class="la-select">
                  <option>Select an item</option>
                  <option>BNPL 17</option>
                  <option>BNPL 24</option>
                  <option>Consumer Loan</option>
                  <option>Mortgage</option>
                </select>
              </div>
            </div>
            <div class="la-filter-field">
              <label class="la-filter-label">Status</label>
              <div class="la-select-wrap">
                <select class="la-select">
                  <option>Select an item</option>
                  <option>ACTIVE</option>
                  <option>OVERDUE</option>
                  <option>CLOSED</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div class="pg-table-card">
          <div class="pg-table-scroll">
            <table class="la-table">
              <thead>
                <tr>
                  <th>Loan Account ID</th>
                  <th>Customer Name</th>
                  <th>Product Name</th>
                  <th>Disbursement Date</th>
                  <th>Maturity Date</th>
                  <th>Status</th>
                  <th>Currency</th>
                  <th style="text-align:right">Loan Amount</th>
                  <th style="text-align:right">Remaining Principal</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>
          <div class="pg-pagination">
            <span class="pg-pag-info">Showing 1–${rows.length} of ${rows.length} results</span>
            <div class="pg-pag-controls">
              <button class="pg-pag-btn">Previous</button>
              <button class="pg-pag-btn active">1</button>
              <button class="pg-pag-btn">Next</button>
            </div>
          </div>
        </div>
      </div>`;
  }
    // ── EOD MONITOR ───────────────────────────────────────────────────────────────
  if (section === 'eod-monitor') {
    const monRows = MOCK_EOD_ROWS;

    // ── Loan detail datasets per job type ──
    const loanDetails = MOCK_EOD_LOAN_DETAILS;

    const statusClass = s => ({ Success:'eodmon-status-success', Failed:'eodmon-status-failed', Running:'eodmon-status-running', Pending:'eodmon-status-pending' })[s] || 'eodmon-status-pending';

    // ── Detail view ──────────────────────────────────────────────────────────
    const selKey  = window._eodmonJobKey  || '';
    const selJob  = window._eodmonJobName || '';
    const selDate = window._eodmonJobDate || '';
    const selStat = window._eodmonJobStatus || '';
    const selFin  = window._eodmonJobFinished || '';
    const selDur  = window._eodmonJobDuration || '';

    if ((window._eodmonView || 'list') === 'detail' && selKey) {
      const loans = loanDetails[selKey] || [];
      // Adjust booking date to match job date
      const datePrefix = selDate.substring(0,10); // dd.mm.yyyy
      const loansForDate = loans.map(l => ({ ...l, bookingDate: datePrefix, txTime: datePrefix + ' ' + l.txTime }));
      const totalAmount = loansForDate.length;

      const loanRows = loansForDate.map(l => `
        <tr>
          <td><span class="eodmon-loan-id">${l.loanId}</span></td>
          <td>${l.product}</td>
          <td class="eodmon-amount-pos">${l.amount}</td>
          <td style="color:var(--text-muted);font-size:.80rem;">${l.txTime}</td>
          <td style="color:var(--text-muted);font-size:.80rem;">${l.bookingDate}</td>
        </tr>`).join('');

      // Compute total for accrual jobs
      const totalAmt = selKey !== 'loan-balance'
        ? loansForDate.reduce((s,l) => s + parseFloat(l.amount.replace('EUR ','').replace(',','')), 0).toFixed(2)
        : '-';

      return `
        <div class="eod-wrap">
          <div class="eodmon-detail-header">
            <div class="eodmon-detail-nav">
              <button class="eodmon-back-btn" data-action="eodmon-back">
                ${_I_BACK_14B}
                Back
              </button>
              <div>
                <div style="font-size:1.2rem;font-weight:700;color:var(--text);">${selJob}</div>
                <div style="font-size:.82rem;color:var(--text-muted);margin-top:2px;">Loan transactions updated by this job run</div>
              </div>
            </div>
            <span class="${statusClass(selStat)}">${selStat}</span>
          </div>

          <div class="eodmon-detail-meta">
            <div class="eodmon-meta-item"><div class="eodmon-meta-label">Started At</div><div class="eodmon-meta-value">${selDate}</div></div>
            <div class="eodmon-meta-item"><div class="eodmon-meta-label">Finished At</div><div class="eodmon-meta-value">${selFin}</div></div>
            <div class="eodmon-meta-item"><div class="eodmon-meta-label">Duration</div><div class="eodmon-meta-value">${selDur}</div></div>
          </div>

          <div class="eodmon-summary-row">
            <div class="eodmon-sum-card accent-blue">
              <div class="eodmon-sum-value">${totalAmount}</div>
              <div class="eodmon-sum-label">Loans Processed</div>
            </div>
            <div class="eodmon-sum-card accent-green">
              <div class="eodmon-sum-value">${selKey !== 'loan-balance' ? 'EUR ' + totalAmt : 'N/A'}</div>
              <div class="eodmon-sum-label">Total ${selKey === 'interest-accrual' ? 'Interest Accrued' : selKey === 'fee-accrual' ? 'Fees Accrued' : selKey === 'penalty-accrual' ? 'Penalties Accrued' : 'Amount'}</div>
            </div>
            <div class="eodmon-sum-card accent-purple">
              <div class="eodmon-sum-value">${selStat === 'Success' ? '0' : totalAmount}</div>
              <div class="eodmon-sum-label">Errors</div>
            </div>
          </div>

          <div class="eodmon-detail-card">
            <div class="eodmon-detail-card-header">
              <div class="eodmon-detail-card-title">Updated Loan Accounts</div>
              <div class="eodmon-detail-count">${totalAmount} records</div>
            </div>
            <table class="eodmon-detail-table">
              <thead>
                <tr>
                  <th>Loan ID</th>
                  <th>Product</th>
                  <th style="text-align:right">Amount</th>
                  <th>Transaction Time</th>
                  <th>Booking Date</th>
                </tr>
              </thead>
              <tbody>${loanRows.length ? loanRows : '<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted);">No loans processed (job failed).</td></tr>'}</tbody>
            </table>
          </div>
        </div>`;
    }

    // ── List view (default) ──────────────────────────────────────────────────
    const rowsHtml = monRows.map((r, idx) => `
      <tr>
        <td><strong>${r.job}</strong></td>
        <td>${r.type}</td>
        <td>${r.started}</td>
        <td>${r.finished}</td>
        <td>${r.duration}</td>
        <td><span class="${statusClass(r.status)}">${r.status}</span></td>
        <td>
          <button class="eodmon-eye-btn" data-action="eodmon-view-detail"
            data-job="${r.job}" data-key="${r.type}"
            data-started="${r.started}" data-finished="${r.finished}"
            data-duration="${r.duration}" data-status="${r.status}"
            title="View processed loans">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8">
              <circle cx="8" cy="8" r="3"/>
              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/>
            </svg>
          </button>
        </td>
      </tr>`).join('');
    return `
      <div class="eod-wrap">
        <div class="pg-header">
          <div>
            <div class="pg-title">End of Day Monitor</div>
            <div class="pg-sub">Execution history and status of all end-of-day processing jobs</div>
          </div>
        </div>
        <div class="eod-card">
          <div class="eodmon-table-wrap" style="border:1px solid var(--border);border-radius:8px;overflow:hidden;">
            <table class="eodmon-table">
              <thead>
                <tr>
                  <th>Job Name</th>
                  <th>Job Type</th>
                  <th>Started At</th>
                  <th>Finished At</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>${rowsHtml}</tbody>
            </table>
          </div>
        </div>
      </div>`;
  }
    // ── JOB MANUAL RUN ──────────────────────────────────────────────────────────
  if (section === 'job-manual') {
    const el = document.getElementById(containerId);
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    // State
    let jmAccounts = [];
    let jmNextId = 1;

    const buildAcctRows = () => {
      if (!jmAccounts.length) {
        return '<tr><td colspan="3" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8);font-size:12.5px">No loan accounts added yet</td></tr>';
      }
      return jmAccounts.map(a => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b);width:80px">${a.id}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${a.accountNumber}</td>
          <td style="padding:10px 14px;font-size:12.5px;text-align:right">
            <button data-action="jm-remove-acct" data-id="${a.id}"
              style="background:none;border:none;cursor:pointer;color:#ef4444;font-size:12px;font-weight:600;padding:3px 6px;border-radius:4px;display:inline-flex;align-items:center;gap:3px">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 4h10"/><path d="M5 4V2.5h4V4"/><path d="M3 4l.8 7.5h6.4L11 4"/></svg>
              Remove
            </button>
          </td>
        </tr>`).join('');
    };

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">

        <!-- Page header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Job manual run</div>
          </div>
          <div style="display:flex;gap:10px;align-items:center">
            <button id="jm-reset" style="padding:7px 18px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:.82rem;font-weight:600;cursor:pointer">Reset</button>
            <button id="jm-run" style="padding:7px 18px;border:none;border-radius:7px;background:var(--accent,#6366f1);color:#fff;font-size:.82rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
              Run
            </button>
          </div>
        </div>

        <!-- Fields card -->
        <div style="margin:20px 28px 0;flex-shrink:0;border:1px solid var(--border1,#e2e8f0);border-radius:10px;background:var(--card-bg,#fff);padding:20px 24px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 32px">

            <!-- Job Type -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Job Type</div>
              <div style="position:relative">
                <select id="jm-job-type" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
                  <option value="interest-accrual">Interest accrual</option>
                  <option value="penalty-accrual">Penalty accrual</option>
                  <option value="fee-accrual">Fee accrual</option>
                  <option value="loan-balance">Loan balance</option>
                </select>
                <svg style="position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            <!-- Product -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Product</div>
              <div style="position:relative">
                <select id="jm-product" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
                  <option value="">Select an item</option>
                  <option value="bnpl17">BNPL 17</option>
                  <option value="bnpl24">BNPL 24</option>
                  <option value="consumer">Consumer Loan</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="auto">Auto Loan</option>
                </select>
                <svg style="position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            <!-- Date -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Date</div>
              <div style="position:relative;display:flex;align-items:center">
                <input id="jm-date" type="text" value="07.10.2026"
                  style="width:100%;padding:8px 34px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
                <svg style="position:absolute;right:9px;pointer-events:none;color:var(--fg2,#94a3b8)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
            </div>

            <!-- Trigger Type -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Trigger Type</div>
              <div style="position:relative">
                <select id="jm-trigger-type" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
                  <option value="manual" selected>Manual</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="event-driven">Event-driven</option>
                </select>
                <svg style="position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

          </div>
        </div>

        <!-- Loan accounts card -->
        <div style="margin:16px 28px 20px;flex:1;min-height:0;border:1px solid var(--border1,#e2e8f0);border-radius:10px;background:var(--card-bg,#fff);display:flex;flex-direction:column;overflow:hidden">
          <!-- card header -->
          <div style="padding:12px 16px 12px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border1,#e2e8f0);flex-shrink:0">
            <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b)">Loan accounts</div>
            <div style="display:flex;gap:8px;align-items:center">
              <div style="position:relative">
                <select id="jm-acct-sel" style="padding:6px 28px 6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:160px;cursor:pointer">
                  <option value="">Select an item</option>
                  <option value="LN-2024-001">LN-2024-001</option>
                  <option value="LN-2024-002">LN-2024-002</option>
                  <option value="LN-2024-003">LN-2024-003</option>
                  <option value="LN-2025-001">LN-2025-001</option>
                  <option value="LN-2025-002">LN-2025-002</option>
                  <option value="LN-2026-001">LN-2026-001</option>
                  <option value="LN-2026-002">LN-2026-002</option>
                </select>
                <svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              <button id="jm-add-acct"
                style="padding:6px 16px;border:none;border-radius:6px;background:var(--accent,#6366f1);color:#fff;font-size:12px;font-weight:600;cursor:pointer">Add</button>
            </div>
          </div>
          <!-- table -->
          <div style="flex:1;overflow:auto;min-height:0">
            <table style="width:100%;border-collapse:collapse">
              <thead style="position:sticky;top:0;z-index:2">
                <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
                  <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);width:80px">ID</th>
                  <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Account Number</th>
                  <th style="padding:9px 14px;text-align:right;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);width:120px">Actions</th>
                </tr>
              </thead>
              <tbody id="jm-acct-tbody">
                <tr><td colspan="3" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8);font-size:12.5px">No loan accounts added yet</td></tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>`;

    // Wire up Add button
    document.getElementById('jm-add-acct').addEventListener('click', () => {
      const sel = document.getElementById('jm-acct-sel');
      const val = sel.value;
      if (!val) return;
      if (jmAccounts.find(a => a.accountNumber === val)) return; // no duplicates
      jmAccounts.push({ id: jmNextId++, accountNumber: val });
      document.getElementById('jm-acct-tbody').innerHTML = buildAcctRows();
      sel.value = '';
    });

    // Wire up Reset button
    document.getElementById('jm-reset').addEventListener('click', () => {
      document.getElementById('jm-job-type').value = 'interest-accrual';
      document.getElementById('jm-product').value = '';
      document.getElementById('jm-date').value = '07.10.2026';
      document.getElementById('jm-trigger-type').value = 'manual';
      jmAccounts = [];
      jmNextId = 1;
      document.getElementById('jm-acct-tbody').innerHTML = buildAcctRows();
    });

    // Wire up Run button
    document.getElementById('jm-run').addEventListener('click', () => {
      const jobType = document.getElementById('jm-job-type').value;
      const product = document.getElementById('jm-product').value;
      const date    = document.getElementById('jm-date').value;
      if (!product) {
        document.getElementById('jm-product').style.borderColor = '#ef4444';
        setTimeout(() => { document.getElementById('jm-product').style.borderColor = ''; }, 2000);
        return;
      }
      // Show a quick toast
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)';
      toast.textContent = 'Job "' + jobType + '" triggered for ' + date;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });

    return;
  }

    // ── EOD SCHEDULER ────────────────────────────────────────────────────────────
  if (section === 'job-scheduler') {
    const el = document.getElementById(containerId);
    const jobs = (typeof MOCK_SCHEDULER_JOBS !== 'undefined') ? MOCK_SCHEDULER_JOBS : [];

    const buildRows = (filter) => {
      const q = (filter || '').toLowerCase();
      const filtered = q ? jobs.filter(j => j.job.toLowerCase().includes(q)) : jobs;
      if (!filtered.length) return '<tr><td colspan="8" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8)">No jobs found</td></tr>';
      return filtered.map(j => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${j.job}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${j.scope}</td>
          <td style="padding:10px 14px;font-size:12.5px;font-family:monospace;color:var(--fg,#1e293b)">${j.cron}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${j.timezone}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${j.execStrategy || ''}</td>
          <td style="padding:10px 14px;font-size:12.5px">
            <span style="color:${j.enabled === 'Yes' ? '#16a34a' : '#94a3b8'};font-weight:600">${j.enabled}</span>
          </td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b);text-align:center">${j.dependencies}</td>
          <td style="padding:10px 14px;font-size:12.5px">
            <button data-action="sched-edit" data-job="${j.job}"
              style="background:none;border:none;cursor:pointer;color:var(--accent,#6366f1);font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;padding:3px 6px;border-radius:4px">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
          </td>
        </tr>`).join('');
    };

    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:0">

        <!-- Page header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Job Scheduler</div>
            <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Manage cron schedules, execution settings, and dependency rules per job.</div>
          </div>
        </div>

        <!-- Filters -->
        <div style="padding:14px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--fg2,#94a3b8);margin-bottom:10px;text-transform:uppercase">Filters</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Organization</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:150px">
                <option>Select an item</option><option>OneFor</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Branch</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:140px">
                <option>Select an item</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">&nbsp;</div>
              <div style="position:relative;display:flex;align-items:center">
                <svg style="position:absolute;left:8px;color:var(--fg2,#94a3b8);pointer-events:none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="sched-search" type="text" placeholder="Search by job name..."
                  style="padding:5px 9px 5px 26px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;width:190px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div style="flex:1;overflow:auto;min-height:0">
          <table style="width:100%;border-collapse:collapse;font-size:12.5px">
            <thead style="position:sticky;top:0;z-index:2">
              <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:2px solid var(--border1,#e2e8f0)">
                ${['Job','Scope','Cron','Time zone','Execution strategy','Enabled','Dependencies','Actions']
                  .map(h => `<th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);white-space:nowrap">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody id="sched-tbody">
              ${buildRows('')}
            </tbody>
          </table>
        </div>
      </div>`;

    // Live search
    const searchEl = document.getElementById('sched-search');
    const tbody = document.getElementById('sched-tbody');
    if (searchEl && tbody) {
      searchEl.addEventListener('input', () => {
        tbody.innerHTML = buildRows(searchEl.value);
      });
    }
    return;
  }

    // ── LOAN SIMULATION ──────────────────────────────────────────────────────────
  if (section === 'loansim') {
    // Build product options for autocomplete
    const products = (typeof MOCK_SIM_PRODUCTS !== 'undefined') ? MOCK_SIM_PRODUCTS : [];
    const productOpts = products.map(p =>
      '<option value="' + p.id + '">' + p.code + ' — ' + p.name + '</option>'
    ).join('');

    return `
      <div class="sim-wrap">
        <div class="pg-header">
          <div>
            <div class="pg-title">Loan Simulation</div>
            <div class="pg-sub">Configure loan parameters and run simulations</div>
          </div>
          <button class="sim-reset-btn" data-action="sim-reset">Reset</button>
        </div>

        <div class="sim-card" id="sim-params-card">
          <div class="sim-grid-4">
            <div class="sim-field">
              <label class="sim-label">Product <span class="sim-label-hint">(optional)</span></label>
              <div class="sim-autocomplete-wrap" id="sim-product-wrap">
                <input id="sim-product-input" class="sim-input" type="text" placeholder="Type to search or click ▾" autocomplete="off" data-action="sim-product-input"/>
                <button class="sim-product-clear" id="sim-product-clear" data-action="sim-clear-product" title="Clear" style="display:none">×</button>
                <div class="sim-product-dropdown" id="sim-product-dropdown" style="display:none">
                  ${productOpts
                    ? '<ul class="sim-product-list" id="sim-product-list">' +
                        products.map(p => '<li class="sim-product-item" data-action="sim-pick-product" data-id="' + p.id + '" data-label="' + (p.code + ' — ' + p.name).replace(/"/g,'&quot;') + '">' +
                          '<span class="sim-prod-code">' + p.code + '</span>' +
                          '<span class="sim-prod-name">' + p.name + '</span>' +
                          '</li>').join('') +
                      '</ul>'
                    : '<div class="sim-no-products">No products available</div>'}
                </div>
                <input type="hidden" id="sim-product-id" value=""/>
              </div>
            </div>

            <div class="sim-field" id="sim-customer-field" style="display:none">
              <label class="sim-label">Customer <span class="sim-label-required">*</span></label>
              <div class="sim-select-wrap">
                <select id="sim-customer" class="sim-select">
                  <option value="">Select customer…</option>
                </select>
              </div>
            </div>

            <div class="sim-field">
              <label class="sim-label">Loan Amount</label>
              <input id="sim-amount" class="sim-input" type="number" value="1000" min="0"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Currency</label>
              <div class="sim-select-wrap">
                <select id="sim-currency" class="sim-select">
                  <option value="EUR" selected>EUR</option>
                  <option value="USD">USD</option>
                  <option value="GBP">GBP</option>
                  <option value="CHF">CHF</option>
                  <option value="RSD">RSD</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Annual Interest Rate (%)</label>
              <input id="sim-annual-rate" class="sim-input" type="number" value="" step="0.01" min="0" placeholder="Enter annual rate"/>
            </div>

            <div class="sim-field">
              <label class="sim-label">Preferential Interest Rate (%)</label>
              <input id="sim-pref-rate" class="sim-input" type="number" value="0" step="0.01"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Tenure (months)</label>
              <input id="sim-tenure" class="sim-input" type="number" value="" min="1" max="360" placeholder="Enter total months"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Repayment Schedule Pattern</label>
              <div class="sim-select-wrap">
                <select id="sim-repay-pattern" class="sim-select">
                  <option value="Equal Installment" selected>Equal Installment</option>
                  <option value="Bullet">Bullet</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Interest Calculation Method</label>
              <div class="sim-select-wrap">
                <select id="sim-int-calc" class="sim-select">
                  <option value="Proportional" selected>Proportional</option>
                  <option value="Actuarial">Actuarial</option>
                </select>
              </div>
            </div>

            <div class="sim-field">
              <label class="sim-label">Day Count Convention</label>
              <div class="sim-select-wrap">
                <select id="sim-day-count" class="sim-select">
                  <option value="30/360" selected>30/360</option>
                  <option value="Actual/360">Actual/360</option>
                  <option value="Actual/365">Actual/365</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Interest Calculation Frequency</label>
              <div class="sim-select-wrap">
                <select id="sim-int-freq" class="sim-select">
                  <option value="Monthly" selected>Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Short Month Handling</label>
              <div class="sim-select-wrap">
                <select id="sim-short-month" class="sim-select">
                  <option value="Fixed Day of Month" selected>Fixed Day of Month</option>
                  <option value="End of Month">End of Month</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Can Be Irregular</label>
              <div class="sim-select-wrap">
                <select id="sim-can-irregular" class="sim-select">
                  <option value="Yes" selected>Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div class="sim-field">
              <label class="sim-label">Irregular Period Adjustment Method</label>
              <div class="sim-select-wrap">
                <select id="sim-irreg-adj" class="sim-select">
                  <option value="True Equal Installment" selected>True Equal Installment</option>
                  <option value="Equal Installment">Equal Installment</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Interest Calculated At</label>
              <div class="sim-select-wrap">
                <select id="sim-int-at" class="sim-select">
                  <option value="End of Period" selected>End of Period</option>
                  <option value="Start of Period">Start of Period</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Non-Working Day Adjustment</label>
              <div class="sim-select-wrap">
                <select id="sim-non-working" class="sim-select">
                  <option value="No Adjustment" selected>No Adjustment</option>
                  <option value="Next Working Day">Next Working Day</option>
                  <option value="Previous Working Day">Previous Working Day</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Repayment Rounding Mode</label>
              <div class="sim-select-wrap">
                <select id="sim-rounding" class="sim-select">
                  <option value="Half-even" selected>Half-even</option>
                  <option value="Half-up">Half-up</option>
                  <option value="Down">Down</option>
                </select>
              </div>
            </div>

            <div class="sim-field">
              <label class="sim-label">Disbursement Date</label>
              <input id="sim-disb-date" class="sim-input" type="date" value="2026-10-07"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">First Repayment Date</label>
              <input id="sim-first-repay" class="sim-input" type="date" value="2026-11-07"/>
            </div>
          </div>
        </div>

        <div class="sim-card">
          <div class="sim-section-title">Fee Configuration</div>
          <div class="sim-grid-3" style="margin-bottom:20px;">
            <div class="sim-field">
              <label class="sim-label">Fee Trigger</label>
              <div class="sim-select-wrap">
                <select id="sim-fee-trigger" class="sim-select">
                  <option value="upfront" selected>Up Front</option>
                  <option value="per-installment">Per Installment</option>
                  <option value="disbursement">On Disbursement</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Fee Base</label>
              <div class="sim-select-wrap">
                <select id="sim-fee-base" class="sim-select">
                  <option value="loan-amount" selected>Loan Amount</option>
                  <option value="installment">Installment Amount</option>
                  <option value="outstanding">Outstanding Balance</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Fee Method</label>
              <div class="sim-select-wrap">
                <select id="sim-fee-method" class="sim-select">
                  <option value="fixed" selected>Fixed</option>
                  <option value="percentage">Percentage</option>
                </select>
              </div>
            </div>
          </div>
          <div class="sim-grid-3-fee">
            <div class="sim-field">
              <label class="sim-label">Fixed Amount</label>
              <input id="sim-fixed-amount" class="sim-input" type="number" value="0" min="0" step="0.01"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Percent Rate</label>
              <input id="sim-percent-rate" class="sim-input" type="number" value="0" min="0" step="0.01"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">&nbsp;</label>
              <button class="btn-sim-add-fee" data-action="sim-add-fee">Add Fee</button>
            </div>
          </div>
          <div id="sim-fee-list" class="sim-fee-list"></div>
        </div>

        <div class="sim-run-bar">
          <button class="btn-sim-run" id="sim-run-btn" data-action="run-simulation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            <span id="sim-run-label">Run Simulation</span>
          </button>
        </div>

        <div id="sim-results-wrap" style="display:none;"></div>
      </div>
    `;
  }
    // ── LOAN PRODUCTS ────────────────────────────────────────────────────────────
  if (section === 'loanprod') {
    const lpRows = [
      { id:94, code:'New BNPL product 11%',                      name:'New BNPL product',                                   status:'ACTIVE',  created:'20.03.2026' },
      { id:93, code:'Fidelitytest01',                             name:'Fidelity test',                                      status:'ACTIVE',  created:'10.03.2026' },
      { id:92, code:'BNPL 17 UAT start with fee',                 name:'BNPL 17 UAT start with fee',                         status:'ACTIVE',  created:'05.03.2026' },
      { id:91, code:'BNPL 17 UAT start',                          name:'BNPL 17 UAT start',                                  status:'ACTIVE',  created:'05.03.2026' },
      { id:90, code:'BNPL 24',                                    name:'BNPL 24',                                            status:'ACTIVE',  created:'05.03.2026' },
      { id:89, code:'BNPL 17% - final test with per instalment fee', name:'BNPL 17% - final test with per instalment fee for 4th Mar', status:'ACTIVE', created:'04.03.2026' },
      { id:88, code:'BNPL 17% - final test with upfront fee',     name:'BNPL 17% - final test with fee for 4th Mar',         status:'ACTIVE',  created:'04.03.2026' },
      { id:87, code:'BNPL v24',                                   name:'BNPL v24',                                           status:'ACTIVE',  created:'04.03.2026' },
      { id:86, code:'BNPL v23',                                   name:'BNPL v23',                                           status:'ACTIVE',  created:'04.03.2026' },
      { id:85, code:'BNPL v22',                                   name:'BNPL v22',                                           status:'ACTIVE',  created:'04.03.2026' },
      { id:79, code:'BNPL 17 - final test',                       name:'BNPL 17 - final test on 4th Apr',                   status:'ACTIVE',  created:'04.03.2026' },
      { id:78, code:'BPNL 20',                                    name:'BNPL 20',                                            status:'PENDING', created:'02.03.2026' },
      { id:76, code:'6',                                          name:'6',                                                  status:'PENDING', created:'28.02.2026' },
      { id:75, code:'4',                                          name:'4',                                                  status:'PENDING', created:'28.02.2026' },
      { id:73, code:'3',                                          name:'3',                                                  status:'PENDING', created:'28.02.2026' },
      { id:72, code:'2',                                          name:'2',                                                  status:'PENDING', created:'28.02.2026' },
    ];
    const statusClass = s => ({ ACTIVE:'lp-status-active', PENDING:'lp-status-pending', INACTIVE:'lp-status-inactive' })[s] || 'lp-status-pending';
    const rowsHtml = lpRows.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.code}</td>
        <td>${r.name}</td>
        <td><span class="${statusClass(r.status)}">${r.status}</span></td>
        <td>${r.created}</td>
        <td>
          <div class="fee-actions">
            <button class="fee-btn-edit"
              data-action="open-loan-product-form" data-module="${mod}"
              data-id="${r.id}" data-code="${r.code}" data-name="${r.name}"
              data-status="${r.status}" data-created="${r.created}">
              ${_I_PENCIL_12}
              Edit
            </button>
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">
              ${_I_BIN_12}
              Delete
            </button>
          </div>
        </td>
      </tr>`).join('');
    return `
      <div class="fee-page-header">
        <div>
          <div class="fee-page-title">Loan Products</div>
          <div class="fee-page-sub">Manage loan products</div>
        </div>
        <button class="btn-create-fee" data-action="open-loan-product-form" data-module="${mod}">
          ${_I_PLUS_14}
          + Add Loan Product
        </button>
      </div>
      ${renderTable(['ID','Code','Name','Status','Created At','Actions'], rowsHtml, lpRows.length, {wrapStyle:'margin-top:0;'})}`;
  }
    // ── INTEREST RATE DEFINITIONS ────────────────────────────────────────────────
  if (section === 'interestdef') {
    const irdRows = [
      { id:53, name:'EUR interest 17%',              currency:'EUR', status:'ACTIVE'   },
      { id:52, name:'test123123',                    currency:'EUR', status:'ACTIVE'   },
      { id:51, name:'test222',                       currency:'EUR', status:'ACTIVE'   },
      { id:50, name:'renewrwe',                      currency:'EUR', status:'INACTIVE' },
      { id:49, name:'231312321',                     currency:'EUR', status:'ACTIVE'   },
      { id:48, name:'Auditor',                       currency:'USD', status:'INACTIVE' },
      { id:47, name:'Auditor',                       currency:'EUR', status:'ACTIVE'   },
      { id:31, name:'BNPL 0% interest EUR demo',     currency:'CHF', status:'ACTIVE'   },
      { id:30, name:'BNPL 0% interest EUR demo',     currency:'GBP', status:'ACTIVE'   },
      { id:29, name:'BNPL 0% interest EUR demo',     currency:'EUR', status:'ACTIVE'   },
      { id:28, name:'New Product',                   currency:'CHF', status:'INACTIVE' },
      { id:27, name:'New Product',                   currency:'EUR', status:'ACTIVE'   },
      { id:26, name:'Auditor',                       currency:'CHF', status:'ACTIVE'   },
      { id:25, name:'Auditor',                       currency:'GBP', status:'INACTIVE' },
      { id:24, name:'BNPL with 17% interest rate for demo', currency:'USD', status:'ACTIVE' },
    ];
    const rowsHtml = irdRows.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.currency}</td>
        <td><span class="ird-status-${r.status === 'ACTIVE' ? 'active' : 'inactive'}">${r.status}</span></td>
        <td>
          <div class="fee-actions">
            <button class="fee-btn-edit"
              data-action="open-interest-rate-form" data-module="${mod}"
              data-id="${r.id}" data-name="${r.name}"
              data-currency="${r.currency}" data-status="${r.status}">
              ${_I_PENCIL_12}
              Edit
            </button>
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">
              ${_I_BIN_12}
              Delete
            </button>
          </div>
        </td>
      </tr>`).join('');
    return `
      <div class="fee-page-header">
        <div>
          <div class="fee-page-title">Interest Rate Definitions</div>
          <div class="fee-page-sub">Manage interest rates and their version history</div>
        </div>
        <button class="btn-create-fee" data-action="open-interest-rate-form" data-module="${mod}">
          ${_I_PLUS_14}
          + Add Interest Rate
        </button>
      </div>
      ${renderTable(['ID', 'Name', 'Currency', 'Status', 'Actions'], rowsHtml, irdRows.length)}
      </div>`;
  }
    // ── INTEREST ACCRUAL DEFINITIONS ────────────────────────────────────────────
  if (section === 'accrual') {
    const accrualRows = [
      { id: 13, name: 'Talat IAD',                  method: 'Actual 365',  freq: 'Daily',   status: 'Pending', created: '16.03.2026' },
      { id: 9,  name: 'Monthly Act/Act',             method: 'Actual Actual', freq: 'Monthly', status: 'Pending', created: '07.01.2026' },
      { id: 8,  name: 'Daily Act/Act',               method: 'Actual Actual', freq: 'Daily',   status: 'Pending', created: '07.01.2026' },
      { id: 1,  name: 'Daily Act/Act - final test',  method: 'Actual Actual', freq: 'Daily',   status: 'Active',  created: '15.12.2025' },
    ];
    const rowsHtml = accrualRows.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.method}</td>
        <td>${r.freq}</td>
        <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
        <td>${r.created}</td>
        <td>
          <div class="fee-actions">
            <button class="fee-btn-edit"
              data-action="open-accrual-form" data-module="${mod}"
              data-id="${r.id}" data-name="${r.name}"
              data-method="${r.method}" data-freq="${r.freq}"
              data-status="${r.status}" data-created="${r.created}">
              ${_I_PENCIL_12}
              Edit
            </button>
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">
              ${_I_BIN_12}
              Delete
            </button>
          </div>
        </td>
      </tr>`).join('');
    return `
      <div class="fee-page-header">
        <div>
          <div class="fee-page-title">Interest Accrual Definitions</div>
          <div class="fee-page-sub">Manage interest accrual definitions</div>
        </div>
        <button class="btn-create-fee" data-action="open-accrual-form" data-module="${mod}">
          ${_I_PLUS_14}
          + Add Interest Accrual
        </button>
      </div>
      ${renderTable(['ID', 'Name', 'Method', 'Frequency', 'Status', 'Created At', 'Actions'], rowsHtml, accrualRows.length)}
      </div>`;
  }
    // ── COLLECTION DEFINITIONS ───────────────────────────────────────────────
  if (section === 'collection' || section === 'acccollect') {
    const collRows = [
      { id: 7, name: 'testststs',                                                  oldestFirst: 'No',  status: 'Pending', created: '10.02.2026' },
      { id: 6, name: 'Collection',                                                 oldestFirst: 'Yes', status: 'Pending', created: '30.12.2025' },
      { id: 2, name: 'Standard collection order (Oldest first)',                   oldestFirst: 'Yes', status: 'Active',  created: '15.12.2025' },
      { id: 1, name: 'Standard collection order (Fee > Penalty > Interest > Principal)', oldestFirst: 'No', status: 'Active', created: '15.12.2025' },
    ];
    const rowsHtml = collRows.map(r => `
      <tr>
        <td>${r.id}</td>
        <td>${r.name}</td>
        <td>${r.oldestFirst}</td>
        <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
        <td>${r.created}</td>
        <td>
          <div class="fee-actions">
            <button class="fee-btn-edit"
              data-action="open-collection-form" data-module="${mod}"
              data-id="${r.id}" data-name="${r.name}"
              data-oldest-first="${r.oldestFirst}" data-status="${r.status}">
              ${_I_PENCIL_12}
              Edit
            </button>
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">
              ${_I_BIN_12}
              Delete
            </button>
          </div>
        </td>
      </tr>`).join('');
    return `
      <div class="fee-page-header">
        <div>
          <div class="fee-page-title">Collection Definitions</div>
          <div class="fee-page-sub">Manage collection definitions</div>
        </div>
        <button class="btn-create-fee" data-action="open-collection-form" data-module="${mod}">
          ${_I_PLUS_14}
          + Add Collection Definition
        </button>
      </div>
      ${renderTable(['ID','Name','Oldest First','Status','Created At','Actions'], rowsHtml, collRows.length, {wrapStyle:'margin-top:0;'})}`;
  }
  // ── CUSTOMER REPORT ────────────────────────────────────────────────────────
  if (section === 'customer-report') {
    const el = document.getElementById(containerId);
    if (!el) return;

    const crLoans = [
      { custId:'99',  loanNo:'000000759837', disbDate:'04.03.2026', disbAmt:'1,999.00',  outPrinc:'1,999.00', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'40' },
      { custId:'99',  loanNo:'000000207024', disbDate:'26.01.2026', disbAmt:'1,000.00',  outPrinc:'650.00',   dueAmt:'322.83', daysArr:35, status:'Overdue', loanId:'25' },
      { custId:'99',  loanNo:'000000454835', disbDate:'23.01.2026', disbAmt:'1,200.00',  outPrinc:'889.17',   dueAmt:'322.83', daysArr:0,  status:'Active',  loanId:'21' },
      { custId:'99',  loanNo:'000000698990', disbDate:'28.02.2027', disbAmt:'2,000.00',  outPrinc:'2,000.00', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'37' },
      { custId:'99',  loanNo:'000000298566', disbDate:'04.03.2026', disbAmt:'1,699.50',  outPrinc:'1,699.50', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'38' },
      { custId:'99',  loanNo:'000000119031', disbDate:'04.03.2026', disbAmt:'10,000.00', outPrinc:'10,000.00',dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'41' },
      { custId:'99',  loanNo:'000000829988', disbDate:'04.03.2026', disbAmt:'1,999.50',  outPrinc:'1,999.50', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'39' },
      { custId:'99',  loanNo:'000000919318', disbDate:'05.03.2026', disbAmt:'1,000.00',  outPrinc:'1,000.00', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'45' },
      { custId:'99',  loanNo:'000000188479', disbDate:'05.03.2026', disbAmt:'1,699.50',  outPrinc:'1,699.50', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'47' },
      { custId:'99',  loanNo:'000000928537', disbDate:'06.03.2026', disbAmt:'5,000.00',  outPrinc:'5,000.00', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'49' },
      { custId:'99',  loanNo:'000000505321', disbDate:'26.01.2026', disbAmt:'1,000.00',  outPrinc:'780.00',   dueAmt:'88.71',  daysArr:12, status:'Overdue', loanId:'28' },
      { custId:'1',   loanNo:'000000911989', disbDate:'29.12.2025', disbAmt:'1,000.00',  outPrinc:'1,000.00', dueAmt:'0.00',   daysArr:0,  status:'Active',  loanId:'4'  },
    ];

    // ── helpers ──────────────────────────────────────────────────────────────────
    const crStatusBadge = s => {
      const map = { Active:'#e8f5e9,#2e7d32', Overdue:'#ffebee,#c62828', Closed:'#f3e5f5,#6a1b9a' };
      const [bg, col] = (map[s] || '#fff8e1,#e65100').split(',');
      return `<span style="background:${bg};color:${col};padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600">${s}</span>`;
    };

    const crRowHtml = r => `
      <tr style="border-bottom:1px solid #f0f4fa" data-cr-loan-id="${r.loanId}">
        <td style="padding:9px 12px">${r.custId}</td>
        <td style="padding:9px 12px;font-weight:500">${r.loanNo}</td>
        <td style="padding:9px 12px">${r.disbDate}</td>
        <td style="padding:9px 12px;text-align:right">${r.disbAmt} EUR</td>
        <td style="padding:9px 12px;text-align:right">${r.outPrinc} EUR</td>
        <td style="padding:9px 12px;text-align:right;${r.dueAmt!=='0.00'?'color:#c62828;font-weight:600':''}">${r.dueAmt} EUR</td>
        <td style="padding:9px 12px;text-align:center;${r.daysArr>0?'color:#c62828;font-weight:600':''}">${r.daysArr > 0 ? r.daysArr : '—'}</td>
        <td style="padding:9px 12px">${crStatusBadge(r.status)}</td>
        <td style="padding:9px 12px;text-align:center">
          <button class="cr-eye-btn" data-cr-id="${r.loanId}"
            style="background:none;border:1px solid #c5d8f5;border-radius:6px;padding:4px 8px;cursor:pointer;color:#1a6ab5;display:inline-flex;align-items:center" title="View details">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
        </td>
      </tr>`;

    // ── render shell ──────────────────────────────────────────────────────────────
    el.innerHTML = `
      <div class="rpt-wrap" style="padding:20px 28px">
        <div class="pg-header" style="margin-bottom:16px">
          <div>
            <div class="pg-title">Customer Report</div>
            <div class="pg-sub">Search and view loan details per customer</div>
          </div>
        </div>

        <!-- Search filters -->
        <div class="rpt-filter-card" style="margin-bottom:20px">
          <div class="rpt-filter-row" style="display:flex;gap:16px;flex-wrap:wrap;align-items:flex-end">
            <div class="rpt-filter-field">
              <label class="rpt-filter-label">Customer ID</label>
              <input id="cr-filter-cust" class="rpt-input" type="text" placeholder="e.g. 99"
                style="border:1px solid #d0ddef;border-radius:6px;padding:6px 10px;font-size:13px;width:140px"/>
            </div>
            <div class="rpt-filter-field">
              <label class="rpt-filter-label">Loan ID</label>
              <input id="cr-filter-loan" class="rpt-input" type="text" placeholder="e.g. 57"
                style="border:1px solid #d0ddef;border-radius:6px;padding:6px 10px;font-size:13px;width:140px"/>
            </div>
            <div class="rpt-filter-field">
              <label class="rpt-filter-label">Product ID</label>
              <input id="cr-filter-prod" class="rpt-input" type="text" placeholder="e.g. 44"
                style="border:1px solid #d0ddef;border-radius:6px;padding:6px 10px;font-size:13px;width:140px"/>
            </div>
            <div class="rpt-filter-field">
              <label class="rpt-filter-label">Loan Status</label>
              <div class="rpt-select-wrap">
                <select id="cr-filter-status" class="rpt-select" style="min-width:140px">
                  ${['All','Active','Overdue','Closed','Pending'].map(s=>`<option>${s}</option>`).join('')}
                </select>
              </div>
            </div>
            <button id="cr-btn-search" style="padding:7px 20px;background:#1a6ab5;color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:600;cursor:pointer;height:32px">Search</button>
            <button id="cr-btn-clear"  style="padding:7px 16px;background:#f0f4fa;color:#1a6ab5;border:1px solid #c5d8f5;border-radius:6px;font-size:13px;cursor:pointer;height:32px">Clear</button>
          </div>
        </div>

        <!-- Results table -->
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse;font-size:13px">
            <thead>
              <tr style="background:#f0f4fa;border-bottom:2px solid #c5d8f5">
                <th style="padding:9px 12px;text-align:left;font-weight:600;color:#3a5272">Customer ID</th>
                <th style="padding:9px 12px;text-align:left;font-weight:600;color:#3a5272">Loan Number</th>
                <th style="padding:9px 12px;text-align:left;font-weight:600;color:#3a5272">Disbursement Date</th>
                <th style="padding:9px 12px;text-align:right;font-weight:600;color:#3a5272">Disbursement Amount</th>
                <th style="padding:9px 12px;text-align:right;font-weight:600;color:#3a5272">Outstanding Principal</th>
                <th style="padding:9px 12px;text-align:right;font-weight:600;color:#3a5272">Due Amount</th>
                <th style="padding:9px 12px;text-align:center;font-weight:600;color:#3a5272">Days in Arrears</th>
                <th style="padding:9px 12px;text-align:left;font-weight:600;color:#3a5272">Status</th>
                <th style="padding:9px 12px;text-align:center;font-weight:600;color:#3a5272"></th>
              </tr>
            </thead>
            <tbody id="cr-tbody">${crLoans.map(crRowHtml).join('')}</tbody>
          </table>
        </div>
        <div style="margin-top:12px" id="cr-count-wrap">
          <div style="color:#6a8faf;font-size:12px;margin-bottom:6px" id="cr-count">Showing ${crLoans.length} loans</div>
          <div id="cr-subtotals"></div>
        </div>
      </div>

      <!-- Modal -->
      <div id="cr-modal" style="display:none;position:fixed;inset:0;z-index:2000;background:rgba(15,25,50,0.45);align-items:center;justify-content:center">
        <div style="background:#fff;border-radius:12px;width:860px;max-width:95vw;max-height:88vh;overflow-y:auto;box-shadow:0 8px 40px rgba(0,0,0,0.25)">
          <div style="display:flex;align-items:center;justify-content:space-between;padding:18px 24px 14px;border-bottom:1px solid #e8f0f8">
            <div>
              <div style="font-size:15px;font-weight:700;color:#1a2640">Loan Details</div>
              <div style="font-size:12px;color:#6a8faf;margin-top:2px" id="cr-modal-subtitle">Loan #</div>
            </div>
            <button id="cr-modal-close" style="background:none;border:none;cursor:pointer;color:#6a8faf;padding:4px">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style="padding:20px 24px" id="cr-modal-body"></div>
        </div>
      </div>`;

    // ── JS logic (runs immediately, no innerHTML script needed) ──────────────────
    const crModal     = el.querySelector('#cr-modal');
    const crModalBody = el.querySelector('#cr-modal-body');
    const crModalSub  = el.querySelector('#cr-modal-subtitle');
    const crTbody     = el.querySelector('#cr-tbody');
    const crCount     = el.querySelector('#cr-count');
    const crSubtotals = el.querySelector('#cr-subtotals');

    const parseAmt = s => parseFloat((s || '0').replace(/,/g, '')) || 0;

    function crRenderRows(rows, filtered) {
      crTbody.innerHTML = rows.map(crRowHtml).join('');
      crCount.textContent = `Showing ${rows.length} loan${rows.length !== 1 ? 's' : ''}`;

      // Subtotals — only shown when a filter is active
      if (filtered && rows.length > 0) {
        const totDisb  = rows.reduce((s, r) => s + parseAmt(r.disbAmt),  0);
        const totOut   = rows.reduce((s, r) => s + parseAmt(r.outPrinc), 0);
        const totDue   = rows.reduce((s, r) => s + parseAmt(r.dueAmt),   0);
        const fmtNum   = n => n.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 });
        const cell     = (lbl, val, red) => `
          <div style="display:flex;flex-direction:column;align-items:flex-end">
            <div style="font-size:11px;color:#6a8faf;margin-bottom:2px">${lbl}</div>
            <div style="font-size:13px;font-weight:700;color:${red?'#c62828':'#1a2640'}">${val} EUR</div>
          </div>`;
        crSubtotals.innerHTML = `
          <div style="display:flex;gap:24px;justify-content:flex-end;align-items:center;
                      background:#f0f4fa;border:1px solid #c5d8f5;border-radius:8px;
                      padding:10px 18px;font-size:13px">
            <div style="font-size:12px;color:#3a5272;font-weight:600;margin-right:8px">Subtotals</div>
            ${cell('Disbursement Amount', fmtNum(totDisb), false)}
            ${cell('Outstanding Principal', fmtNum(totOut), false)}
            ${cell('Due Amount', fmtNum(totDue), totDue > 0)}
          </div>`;
      } else {
        crSubtotals.innerHTML = '';
      }

      crTbody.querySelectorAll('.cr-eye-btn').forEach(btn => {
        btn.addEventListener('click', () => crOpenModal(btn.dataset.crId));
      });
    }

    function crOpenModal(loanId) {
      const d = (typeof MOCK_LOAN_DATA !== 'undefined' && MOCK_LOAN_DATA[loanId])
                || (typeof MOCK_LOAN_FALLBACK === 'function' ? MOCK_LOAN_FALLBACK(loanId) : null);
      if (!d) { alert('No data for loan ' + loanId); return; }
      const loan     = crLoans.find(r => r.loanId === loanId) || {};
      const totalDue = loan.dueAmt || '0.00';
      const dueColor = parseFloat(totalDue) > 0 ? '#c62828' : '#1a2640';
      crModalSub.textContent = 'Loan #' + (loan.loanNo || loanId);
      crModalBody.innerHTML = `
        <!-- Loan Summary -->
        <div style="background:#f7f9fc;border:1px solid #e4ecf7;border-radius:8px;padding:16px 20px;margin-bottom:18px">
          <div style="font-size:13px;font-weight:700;color:#1a2640;margin-bottom:12px;letter-spacing:.02em">Loan Summary</div>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px 20px">
            ${[
              ['Product Name',             d.product],
              ['Customer Name',            d.customer],
              ['Loan Amount',              d.loanAmt],
              ['Outstanding Balance',      d.outstanding],
              ['Disbursement Date',        d.disbursed],
              ['Maturity Date',            d.maturity],
              ['First Repayment Date',     d.firstRepay],
              ['Number of Instalments',    d.instalments],
              ['Preferential Rate (%)',    d.prefRate],
              ['Annual Interest Rate (%)', d.annualRate],
              ['Total Interest Rate (%)',  d.totalRate],
            ].map(([lbl, val, col]) => `
              <div>
                <div style="font-size:11px;color:#6a8faf;margin-bottom:3px">${lbl}</div>
                <div style="font-size:13px;font-weight:600;color:${col||'#1a2640'}">${val}</div>
              </div>`).join('')}
          </div>
        </div>

        <!-- Financial Details -->
        <div style="border:1px solid #e4ecf7;border-radius:8px;overflow:hidden">
          <div style="background:#f0f4fa;padding:10px 16px;font-size:13px;font-weight:700;color:#1a2640;border-bottom:1px solid #e4ecf7">Financial Details</div>
          <div style="padding:14px 20px;display:grid;grid-template-columns:repeat(3,1fr);gap:0 20px">
            ${[
              ['Loan Amount',                 d.loanAmt],
              ['Outstanding Balance',         d.outstanding],
              ['Accrued Interest',            d.accruedInt],
              ['Accrued Fee',                 d.accruedFee || '—'],
              ['Penalty Interest Amount',     d.penaltyAmt],
              ['Interest Accrued On',         d.intAccruedOn],
              ['Fee Accrued On',              d.feeAccruedOn || '—'],
              ['Penalty Interest Accrued On', d.penaltyAccruedOn],
              ['Effective Interest Rate',     d.effRate],
              ['Next Payment Date',           d.nextPayDate],
              ['Next Payment Amount',         d.nextPayAmt],
              ['Total Due Amount',            totalDue + ' EUR', dueColor],
              ['Current Days Past Due',       loan.daysArr > 0 ? String(loan.daysArr) : '0', loan.daysArr > 0 ? '#c62828' : '#1a2640'],
              ['Max Days Past Due',           loan.daysArr > 0 ? String(loan.daysArr) : '0', loan.daysArr > 0 ? '#c62828' : '#1a2640'],
            ].map(([lbl, val, col]) => `
              <div style="padding:8px 0;border-bottom:1px solid #f0f4fa">
                <div style="font-size:11px;color:#6a8faf;margin-bottom:2px">${lbl}</div>
                <div style="font-size:13px;font-weight:600;color:${col||'#1a2640'}">${val}</div>
              </div>`).join('')}
          </div>
        </div>`;
      crModal.style.display = 'flex';
    }

    // Wire up initial eye buttons
    crTbody.querySelectorAll('.cr-eye-btn').forEach(btn => {
      btn.addEventListener('click', () => crOpenModal(btn.dataset.crId));
    });

    // Search / Clear buttons
    el.querySelector('#cr-btn-search').addEventListener('click', () => {
      const cust   = el.querySelector('#cr-filter-cust').value.trim().toLowerCase();
      const loan   = el.querySelector('#cr-filter-loan').value.trim().toLowerCase();
      const status = el.querySelector('#cr-filter-status').value;
      const isFiltered = !!(cust || loan || status !== 'All');
      const results = crLoans.filter(r =>
        (!cust   || r.custId.toLowerCase().includes(cust)) &&
        (!loan   || r.loanNo.toLowerCase().includes(loan) || r.loanId.toLowerCase().includes(loan)) &&
        (status === 'All' || r.status === status)
      );
      crRenderRows(results, isFiltered);
    });
    el.querySelector('#cr-btn-clear').addEventListener('click', () => {
      el.querySelector('#cr-filter-cust').value   = '';
      el.querySelector('#cr-filter-loan').value   = '';
      el.querySelector('#cr-filter-prod').value   = '';
      el.querySelector('#cr-filter-status').value = 'All';
      crRenderRows(crLoans, false);
    });

    // Close modal
    el.querySelector('#cr-modal-close').addEventListener('click', () => { crModal.style.display = 'none'; });
    crModal.addEventListener('click', e => { if (e.target === crModal) crModal.style.display = 'none'; });

    return; // rendered directly, no return value needed
  }

  // ── LOAN REPORTS ─────────────────────────────────────────────────────────────
  if (section === 'loan-report-open' || section === 'loan-report-closed' || section === 'loan-report-eom') {
    const isOpen   = section === 'loan-report-open';
    const isClosed = section === 'loan-report-closed';
    const isEom    = section === 'loan-report-eom';

    // Shared wide table columns (all 3 reports)
    const rptCols = [
      'Loan ID','Loan Number','Classification','Pillar (IFRS9)',
      'Outstanding Amount','Nominal Interest','Effective Date','Amount Disbursed',
      'Overdue Amount','Days Past Due','Probability of Default','Loss Given Default',
      'Max Days Past Due','Reserve Allocated','Gross Book Value','Carrying Amount',
      'Loan Status','Legal Action','Loan Performance','Comment'
    ];
    const colsHtml = rptCols.map(c => `<th>${c}</th>`).join('');

    // Sample data rows (mock)
    const openSamples = [
      ['LN-0042','LN-2026-0042','Standard','Stage 1','12,450.00','15.00%','25.03.2026','12,000.00','0.00','0','1.2%','40%','0','149.40','12,450.00','12,300.60','Active','None','Performing',''],
      ['LN-0039','LN-2026-0039','Standard','Stage 1','85,000.00','12.50%','15.03.2026','85,000.00','0.00','0','1.8%','40%','0','1,020.00','85,000.00','83,980.00','Active','None','Performing',''],
      ['LN-0035','LN-2026-0035','Watch','Stage 2','94,300.00','8.75%','01.02.2026','95,000.00','2,100.00','12','8.5%','45%','12','4,003.75','94,300.00','90,296.25','Active','None','Watch List','Monitoring'],
      ['LN-0031','LN-2026-0031','NPL','Stage 3','6,800.00','18.00%','10.01.2026','7,000.00','1,360.00','45','35.0%','55%','45','2,380.00','6,800.00','4,420.00','Overdue','Collection','Non-Performing','Legal notice sent'],
      ['LN-0028','LN-2026-0028','Standard','Stage 1','200,000.00','6.50%','01.01.2026','200,000.00','0.00','0','0.8%','35%','0','1,600.00','200,000.00','198,400.00','Active','None','Performing',''],
    ];
    const closedSamples = [
      ['LN-0022','LN-2025-0022','Standard','Stage 1','0.00','15.00%','01.06.2025','5,000.00','0.00','0','0.0%','40%','0','0.00','0.00','0.00','Closed','None','Settled','Fully repaid'],
      ['LN-0018','LN-2025-0018','Standard','Stage 1','0.00','11.00%','15.04.2025','12,000.00','0.00','0','0.0%','40%','0','0.00','0.00','0.00','Closed','None','Settled','Early settlement'],
      ['LN-0014','LN-2025-0014','Standard','Stage 1','0.00','9.50%','01.01.2025','50,000.00','0.00','0','0.0%','40%','0','0.00','0.00','0.00','Closed','None','Settled','Refinanced'],
      ['LN-0009','LN-2024-0009','Watch','Stage 2','0.00','14.00%','01.09.2024','3,500.00','0.00','0','0.0%','45%','0','0.00','0.00','0.00','Closed','None','Settled','Written off portion recovered'],
    ];
    const eomSamples = [
      ['LN-0042','LN-2026-0042','Standard','Stage 1','12,450.00','15.00%','28.02.2026','12,000.00','0.00','0','1.2%','40%','0','149.40','12,450.00','12,300.60','Active','None','Performing',''],
      ['LN-0039','LN-2026-0039','Standard','Stage 1','86,200.00','12.50%','28.02.2026','85,000.00','0.00','0','1.8%','40%','0','1,035.00','86,200.00','85,165.00','Active','None','Performing',''],
      ['LN-0035','LN-2026-0035','Watch','Stage 2','95,800.00','8.75%','28.02.2026','95,000.00','1,200.00','6','8.5%','45%','6','4,011.00','95,800.00','91,789.00','Active','None','Watch List',''],
      ['LN-0031','LN-2026-0031','NPL','Stage 3','7,100.00','18.00%','28.02.2026','7,000.00','710.00','32','35.0%','55%','32','2,485.00','7,100.00','4,615.00','Overdue','Collection','Non-Performing',''],
      ['LN-0028','LN-2026-0028','Standard','Stage 1','202,500.00','6.50%','28.02.2026','200,000.00','0.00','0','0.8%','35%','0','1,620.00','202,500.00','200,880.00','Active','None','Performing',''],
    ];

    const samples = isOpen ? openSamples : (isClosed ? closedSamples : eomSamples);
    const rowsHtml = samples.map(row =>
      '<tr>' + row.map(cell => `<td>${cell}</td>`).join('') + '</tr>'
    ).join('');

    const runBtn = `<button class="btn-rpt-run" data-action="rpt-run-report" data-report="${section}">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 3-6 3V9z" fill="currentColor" stroke="none"/>
      </svg>
      Run
    </button>`;

    if (isOpen) {
      return `
        <div class="rpt-wrap">
          <div class="pg-header">
            <div>
              <div class="pg-title">Open loans in Period</div>
              <div class="pg-sub">Run open loans report by period</div>
            </div>
            ${runBtn}
          </div>
          <div class="rpt-filter-card">
            <div class="rpt-filter-row">
              <div class="rpt-filter-field rpt-org">
                <label class="rpt-filter-label">Organization</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>Main Holding Group</option><option>Retail Banking Ltd</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-branch">
                <label class="rpt-filter-label">Branch</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>Belgrade HQ</option><option>Novi Sad</option><option>Niš Branch</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-product">
                <label class="rpt-filter-label">Product</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>BNPL 17</option><option>Consumer Loan</option><option>Mortgage</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-date">
                <label class="rpt-filter-label">From</label>
                <input type="date" class="rpt-date-input" value="2026-03-25"/>
              </div>
              <div class="rpt-filter-field rpt-date">
                <label class="rpt-filter-label">To</label>
                <input type="date" class="rpt-date-input" value="2099-12-31"/>
              </div>
            </div>
          </div>
          <div class="pg-table-card">
            <div class="pg-table-scroll">
              <table class="rpt-table">
                <thead><tr>${colsHtml}</tr></thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
            <div class="pg-pagination">
              <span class="pg-pag-info">Showing 1–${samples.length} of ${samples.length} results</span>
              <div class="pg-pag-controls">
                <button class="pg-pag-btn">Previous</button>
                <button class="pg-pag-btn active">1</button>
                <button class="pg-pag-btn">Next</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    if (isClosed) {
      return `
        <div class="rpt-wrap">
          <div class="pg-header">
            <div>
              <div class="pg-title">Closed loans in Period</div>
              <div class="pg-sub">Run closed loans report by period</div>
            </div>
            ${runBtn}
          </div>
          <div class="rpt-filter-card">
            <div class="rpt-filter-row">
              <div class="rpt-filter-field rpt-org">
                <label class="rpt-filter-label">Organization</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>Main Holding Group</option><option>Retail Banking Ltd</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-branch">
                <label class="rpt-filter-label">Branch</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>Belgrade HQ</option><option>Novi Sad</option><option>Niš Branch</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-product">
                <label class="rpt-filter-label">Product</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>BNPL 17</option><option>Consumer Loan</option><option>Mortgage</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-date">
                <label class="rpt-filter-label">From</label>
                <input type="date" class="rpt-date-input" value="2026-03-01"/>
              </div>
              <div class="rpt-filter-field rpt-date">
                <label class="rpt-filter-label">To</label>
                <input type="date" class="rpt-date-input" value="2099-12-31"/>
              </div>
            </div>
          </div>
          <div class="pg-table-card">
            <div class="pg-table-scroll">
              <table class="rpt-table">
                <thead><tr>${colsHtml}</tr></thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
            <div class="pg-pagination">
              <span class="pg-pag-info">Showing 1–${samples.length} of ${samples.length} results</span>
              <div class="pg-pag-controls">
                <button class="pg-pag-btn">Previous</button>
                <button class="pg-pag-btn active">1</button>
                <button class="pg-pag-btn">Next</button>
              </div>
            </div>
          </div>
        </div>`;
    }

    if (isEom) {
      return `
        <div class="rpt-wrap">
          <div class="pg-header">
            <div>
              <div class="pg-title">End of month report</div>
              <div class="pg-sub">Run end of month report by month and year</div>
            </div>
            ${runBtn}
          </div>
          <div class="rpt-filter-card">
            <div class="rpt-filter-row">
              <div class="rpt-filter-field rpt-org">
                <label class="rpt-filter-label">Organization</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>Main Holding Group</option><option>Retail Banking Ltd</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-branch">
                <label class="rpt-filter-label">Branch</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>Belgrade HQ</option><option>Novi Sad</option><option>Niš Branch</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-product">
                <label class="rpt-filter-label">Product</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select"><option>Select an item</option><option>BNPL 17</option><option>Consumer Loan</option><option>Mortgage</option></select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-month">
                <label class="rpt-filter-label">Month</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select">
                    <option>January</option><option selected>February</option><option>March</option>
                    <option>April</option><option>May</option><option>June</option>
                    <option>July</option><option>August</option><option>September</option>
                    <option>October</option><option>November</option><option>December</option>
                  </select>
                </div>
              </div>
              <div class="rpt-filter-field rpt-year">
                <label class="rpt-filter-label">Year</label>
                <div class="rpt-select-wrap">
                  <select class="rpt-select">
                    <option>2024</option><option>2025</option><option selected>2026</option><option>2027</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="pg-table-card">
            <div class="pg-table-scroll">
              <table class="rpt-table">
                <thead><tr>${colsHtml}</tr></thead>
                <tbody>${rowsHtml}</tbody>
              </table>
            </div>
            <div class="pg-pagination">
              <span class="pg-pag-info">Showing 1–${samples.length} of ${samples.length} results</span>
              <div class="pg-pag-controls">
                <button class="pg-pag-btn">Previous</button>
                <button class="pg-pag-btn active">1</button>
                <button class="pg-pag-btn">Next</button>
              </div>
            </div>
          </div>
        </div>`;
    }
  }
  // Penalty section
  // ── FEE DEFINITIONS ──────────────────────────────────────────────────────────
  if (section === 'feedef') {
    const el = document.getElementById(containerId);
    if (!el) return;

    const FEED_DATA = [
      { id:13, name:'Talat fee',                 scope:'Account',      trigger:'Per Instalment', freq:'—', basis:'—',      method:'—',          status:'Active',  created:'16.03.2026' },
      { id:12, name:'Upfront processing fee 3%', scope:'Loan Product', trigger:'Up Front',       freq:'—', basis:'Loan Amount', method:'Percentage', status:'Pending', created:'28.01.2026' },
      { id:11, name:'100 bucks fee',             scope:'Loan Product', trigger:'Per Instalment', freq:'—', basis:'—',      method:'Fixed',      status:'Active',  created:'13.01.2026' },
      { id:10, name:'Upfront fee 2%',            scope:'Loan Product', trigger:'Up Front',       freq:'—', basis:'Loan Amount', method:'Percentage', status:'Active',  created:'07.01.2026' },
    ];

    const statusBadge = s => s === 'Active'
      ? `<span class="fee-status-active">Active</span>`
      : `<span class="fee-status-inactive">${s}</span>`;

    const rowsHtml = FEED_DATA.map(r => `
      <tr>
        <td style="padding:14px 16px">${r.id}</td>
        <td style="padding:14px 16px;font-weight:500">${r.name}</td>
        <td style="padding:14px 16px">${r.scope}</td>
        <td style="padding:14px 16px">${r.trigger}</td>
        <td style="padding:14px 16px">${r.freq}</td>
        <td style="padding:14px 16px">${r.basis}</td>
        <td style="padding:14px 16px">${r.method}</td>
        <td style="padding:14px 16px">${statusBadge(r.status)}</td>
        <td style="padding:14px 16px">${r.created}</td>
        <td style="padding:14px 16px">
          <div class="fee-actions">
            <button class="fee-btn-edit" data-feed-id="${r.id}" title="Edit">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>
              Edit
            </button>
            <button class="fee-btn-delete" title="Delete">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="3 4 13 4"/><path d="M5 4V2h6v2M6 7v5M10 7v5"/><path d="M4 4l1 10h6l1-10"/></svg>
              Delete
            </button>
          </div>
        </td>
      </tr>`).join('');

    el.innerHTML = `
      <div class="fee-page-header">
        <div>
          <div class="fee-page-title">Fee Definitions</div>
          <div class="fee-page-sub">Manage fee definitions</div>
        </div>
        <button class="btn-create-fee" id="feedef-create-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          Create Fee Definition
        </button>
      </div>

      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Scope</th><th>Trigger</th>
              <th>Frequency</th><th>Basis</th><th>Method</th>
              <th>Status</th><th>Created At</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="feedef-tbody">${rowsHtml}</tbody>
        </table>
      </div>

      <div class="fee-pagination">
        <div style="font-size:13px;color:var(--text-muted)">Showing 1-${FEED_DATA.length} of ${FEED_DATA.length} results</div>
        <div class="fee-pag-controls">
          <button class="fee-pag-prev" disabled>Previous</button>
          <button class="fee-pag-num active">1</button>
          <button class="fee-pag-next" disabled>Next</button>
        </div>
      </div>`;

    // Wire Edit buttons
    el.querySelectorAll('.fee-btn-edit').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = FEED_DATA.find(r => r.id === parseInt(btn.dataset.feedId));
        openFeeDefForm(containerId, row);
      });
    });
    // Wire Create button
    el.querySelector('#feedef-create-btn').addEventListener('click', () => {
      openFeeDefForm(containerId, null);
    });
    return;
  }

  if (section === 'customers') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const customers = (typeof MOCK_CUSTOMERS !== 'undefined') ? MOCK_CUSTOMERS : [];

    function buildCustomerRows(filter) {
      const f = (filter || '').toLowerCase();
      const filtered = customers.filter(c =>
        !f || String(c.id).includes(f) || c.extId.includes(f) ||
        c.name.toLowerCase().includes(f) || c.surname.toLowerCase().includes(f)
      );
      if (!filtered.length) return `<tr><td colspan="13" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8)">No customers found</td></tr>`;
      return filtered.map(c => `
        <tr class="cust-row" style="border-bottom:1px solid var(--border1,#e2e8f0)">
          <td style="padding:8px 12px;white-space:nowrap">
            <a href="#" data-action="cust-detail" data-cust-id="${c.id}"
              style="color:var(--accent,#6366f1);font-weight:600;text-decoration:none">${c.id}</a>
          </td>
          <td style="padding:8px 12px">${c.extId}</td>
          <td style="padding:8px 12px;font-weight:500">${c.name}</td>
          <td style="padding:8px 12px">${c.surname}</td>
          <td style="padding:8px 12px">${c.gender}</td>
          <td style="padding:8px 12px">${c.org}</td>
          <td style="padding:8px 12px">${c.branch}</td>
          <td style="padding:8px 12px">${c.country}</td>
          <td style="padding:8px 12px">${c.docType}</td>
          <td style="padding:8px 12px">${c.docNo}</td>
          <td style="padding:8px 12px">${c.custType}</td>
          <td style="padding:8px 12px">${c.riskClass || '—'}</td>
          <td style="padding:8px 12px">
            <div style="display:flex;gap:5px;align-items:center">
              <button data-action="cust-detail" data-cust-id="${c.id}"
                style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border:1px solid #d4b8f8;border-radius:5px;background:none;cursor:pointer;font-size:11px;color:#7c3aed;white-space:nowrap">
                ✏ Edit</button>
              <button data-action="cust-detail" data-cust-id="${c.id}"
                style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border:1px solid #bfdbfe;border-radius:5px;background:none;cursor:pointer;font-size:11px;color:#2563eb;white-space:nowrap">
                ℹ Details</button>
              <button
                style="display:inline-flex;align-items:center;gap:3px;padding:3px 8px;border:1px solid #fecaca;border-radius:5px;background:none;cursor:pointer;font-size:11px;color:#dc2626;white-space:nowrap">
                🗑 Delete</button>
            </div>
          </td>
        </tr>`).join('');
    }

    // Use flex column so the whole screen is used without outer scroll
    // Cancel .main-content padding so this section is full-bleed
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';
    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:0">

        <!-- Page header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Customer Data</div>
            <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Search and manage customers</div>
          </div>
          <button data-action="cust-add"
            style="display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:var(--accent,#6366f1);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            + Add Customer
          </button>
        </div>

        <!-- Filters -->
        <div style="padding:12px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0);background:var(--surface,#fff)">
          <div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--fg2,#94a3b8);margin-bottom:10px;text-transform:uppercase">Filters</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Search</div>
              <div style="position:relative;display:flex;align-items:center">
                <svg style="position:absolute;left:7px;color:var(--fg2,#94a3b8);pointer-events:none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="cust-search" type="text" placeholder="Search customers..."
                  style="padding:5px 9px 5px 24px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;width:185px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
              </div>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Organization</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:130px">
                <option>Select an item</option><option>OneFor</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Branch</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:120px">
                <option>Select an item</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Customer Type</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:145px">
                <option>All customer types</option><option>Individual</option><option>Corporate</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Risk Classification</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:155px">
                <option>All risk classifications</option><option>A</option><option>W</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Employee</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:75px">
                <option>No</option><option>Yes</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Table — fills remaining height, scrolls internally -->
        <div style="flex:1;overflow:auto;min-height:0">
          <table style="width:100%;border-collapse:collapse;font-size:12.5px">
            <thead style="position:sticky;top:0;z-index:2">
              <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:2px solid var(--border1,#e2e8f0)">
                ${['Customer ID','OneFor/External Customer ID','Name','Surname','Gender','Organization Name','Branch Name','Country','Document Type','Document Number','Customer Type','Risk Classification','Actions']
                    .map(h=>`<th style="padding:8px 12px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);white-space:nowrap">${h} <span style="opacity:.4;font-size:9px">⇅</span></th>`).join('')}
              </tr>
            </thead>
            <tbody id="cust-tbody">
              ${buildCustomerRows('')}
            </tbody>
          </table>
        </div>
      </div>`;

    // Live search
    const searchEl = document.getElementById('cust-search');
    const tbody = document.getElementById('cust-tbody');
    if (searchEl && tbody) {
      searchEl.addEventListener('input', () => {
        tbody.innerHTML = buildCustomerRows(searchEl.value);
      });
    }
    return;
  }

  if (section === 'cust-detail') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const custId = parseInt((window._custDetailId || '348'), 10);
    const customers = (typeof MOCK_CUSTOMERS !== 'undefined') ? MOCK_CUSTOMERS : [];
    const customerLoans = (typeof MOCK_CUSTOMER_LOANS !== 'undefined') ? MOCK_CUSTOMER_LOANS : {};
    const c = customers.find(x => x.id === custId) || customers[0];
    const loans = customerLoans[c.id] || [];

    const loanStatusBadge = s => {
      const map = { Active:'#e8f5e9,#2e7d32', Closed:'#ede7f6,#4527a0', Overdue:'#ffebee,#c62828' };
      const [bg, col] = (map[s] || '#fff8e1,#e65100').split(',');
      return `<span style="background:${bg};color:${col};padding:2px 10px;border-radius:12px;font-size:11px;font-weight:600">${s}</span>`;
    };

    const field = (label, val) =>
      `<div style="min-width:200px;flex:1">
         <div style="font-size:11px;color:var(--fg2,#64748b);font-weight:600;margin-bottom:3px">${label}</div>
         <div style="font-size:13px;color:var(--fg,#1e293b)">${val || '-'}</div>
       </div>`;

    const loanRows = loans.map(l => `
      <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
        <td style="padding:10px 14px"><a href="#" style="color:var(--accent,#6366f1);font-weight:600;text-decoration:none" data-action="show-loan-detail" data-loan-id="${l.loanId}">${l.loanId}</a></td>
        <td style="padding:10px 14px">${l.product}</td>
        <td style="padding:10px 14px">${l.disbDate}</td>
        <td style="padding:10px 14px">${loanStatusBadge(l.status)}</td>
        <td style="padding:10px 14px">${l.disbAmt}</td>
        <td style="padding:10px 14px">${l.outBal}</td>
        <td style="padding:10px 14px">${l.dueAmt}</td>
      </tr>`).join('');

    el.style.padding = '0';
    el.style.overflow = 'auto';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.minHeight = '';
    el.innerHTML = `
      <div style="padding:24px 28px">
        <!-- Back + title row -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">
          <div style="display:flex;align-items:center;gap:12px">
            <button data-action="cust-back"
              style="background:none;border:none;cursor:pointer;color:var(--accent,#6366f1);padding:4px;display:flex;align-items:center;gap:4px;font-size:13px">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div>
              <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b)">Customer Details</div>
              <div style="font-size:13px;color:var(--fg2,#64748b)">View customer information</div>
            </div>
          </div>
          <button class="fee-btn-edit" style="display:inline-flex;align-items:center;gap:5px;padding:7px 14px;font-size:13px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            Edit Customer
          </button>
        </div>

        <!-- Basic info card -->
        <div style="background:var(--surface,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:20px">
          <div style="display:flex;flex-wrap:wrap;gap:24px 32px;border-bottom:1px solid var(--border1,#e2e8f0);padding-bottom:20px;margin-bottom:20px">
            ${field('Customer ID', c.id)}
            ${field('OneFor / External Customer ID', c.extId)}
            ${field('First Name', c.name)}
            ${field('Last Name', c.surname)}
            ${field('Gender', c.gender)}
            ${field('Date of Birth', c.dob)}
            ${field('Phone', c.phone)}
            ${field('Email', c.email)}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:24px 32px;border-bottom:1px solid var(--border1,#e2e8f0);padding-bottom:20px;margin-bottom:20px">
            ${field('Customer Type', c.custType)}
            ${field('Is Employee', c.isEmployee)}
            ${field('Organization ID', `<span style="font-size:11px;font-family:monospace;word-break:break-all">${c.orgId}</span>`)}
            ${field('Organization Name', c.org)}
            ${field('Branch ID', '-')}
            ${field('Branch Name', '-')}
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:24px 32px">
            ${field('Country', c.country)}
            ${field('Document Type', c.docType)}
            ${field('Document ID', '-')}
            ${field('Created At', c.createdAt)}
            ${field('Updated At', c.updatedAt)}
          </div>
        </div>

        <!-- Risk Classification card -->
        <div style="background:var(--surface,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:20px">
          <div style="font-size:15px;font-weight:700;color:var(--fg,#1e293b);margin-bottom:4px">Customer Risk Classification</div>
          <div style="font-size:12px;color:var(--fg2,#64748b);margin-bottom:16px">Optional risk classification for this customer</div>
          <div style="font-size:12px;color:var(--fg2,#64748b);font-weight:600;margin-bottom:8px">Current Classification</div>
          <div style="font-size:13px;color:var(--fg,#1e293b);margin-bottom:16px">${c.riskClass && c.riskClass !== '-' ? c.riskClass : '—'}</div>
          <div style="font-size:12px;color:var(--accent,#6366f1);font-weight:600;margin-bottom:8px">Customer Risk Classification</div>
          <div style="display:flex;gap:12px;align-items:center">
            <select style="flex:1;padding:8px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b)">
              <option value="">Select risk classification</option>
              <option ${c.riskClass==='A'?'selected':''}>A</option>
              <option ${c.riskClass==='W'?'selected':''}>W</option>
              <option ${c.riskClass==='B'?'selected':''}>B</option>
              <option ${c.riskClass==='C'?'selected':''}>C</option>
            </select>
            <button class="btn-create-fee" style="white-space:nowrap;padding:8px 18px">Save Classification</button>
          </div>
        </div>

        <!-- Loans card -->
        <div style="background:var(--surface,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:20px">
          <div style="font-size:15px;font-weight:700;color:var(--fg,#1e293b);margin-bottom:16px">Customer Loans</div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--fg2,#94a3b8)" stroke-width="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
            <span style="font-size:12px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em">FILTERS:</span>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:16px">
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);font-weight:600;margin-bottom:4px">Loan Account ID</div>
              <input type="text" placeholder="Search by Loan Account ID"
                style="padding:6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;width:180px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);font-weight:600;margin-bottom:4px">Plan ID</div>
              <input type="text" placeholder="Search by Plan ID"
                style="padding:6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;width:150px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);font-weight:600;margin-bottom:4px">Product</div>
              <select style="padding:6px 28px 6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:140px">
                <option>Select an item</option>
                <option>PABNPL - v2</option>
                <option>BNPL 17 UAT start</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);font-weight:600;margin-bottom:4px">Status</div>
              <select style="padding:6px 28px 6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:130px">
                <option>Select an item</option>
                <option>Active</option>
                <option>Closed</option>
                <option>Overdue</option>
              </select>
            </div>
          </div>
          <div style="overflow-x:auto;border:1px solid var(--border1,#e2e8f0);border-radius:8px">
            <table style="width:100%;border-collapse:collapse;font-size:13px">
              <thead>
                <tr style="background:var(--table-head-bg,#f8fafc)">
                  ${['Loan ID','Product Name','Disbursement Date','Status','Disbursement Amount','Outstanding Balance','Due Amount (to be added)']
                      .map(h=>`<th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.04em;color:var(--fg2,#64748b);white-space:nowrap;border-bottom:2px solid var(--border1,#e2e8f0)">${h}<span style="font-size:9px;margin-left:3px;opacity:.5">⇅</span></th>`).join('')}
                </tr>
              </thead>
              <tbody>
                ${loanRows || `<tr><td colspan="7" style="padding:24px;text-align:center;color:var(--fg2,#94a3b8)">No loans found for this customer</td></tr>`}
              </tbody>
            </table>
          </div>
          <div style="margin-top:10px;font-size:12px;color:var(--fg2,#64748b)">Showing ${loans.length} of ${loans.length} results</div>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
            <button style="padding:6px 14px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg2,#64748b);cursor:pointer">Previous</button>
            <button class="btn-create-fee" style="padding:6px 14px;font-size:12px">Next</button>
          </div>
        </div>
      </div>`;
    return;
  }

  if (section === 'penalty') {
    const el = document.getElementById(containerId);
    if (!el) return;
    const penaltyRows = (typeof MOCK_PENALTY_DEFS !== 'undefined') ? MOCK_PENALTY_DEFS : [
      { id: 1, name: 'Default Penalty Definition', method: 'Actual Actual', freq: 'Daily', base: 'Due Principal', rate: 12.5, status: 'Active', created: '18.06.2026' },
    ];
    el.innerHTML = buildPenaltySection(mod);
    // Wire Edit buttons
    el.querySelectorAll('.fee-btn-edit[data-pen-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const row = penaltyRows.find(r => r.id === parseInt(btn.dataset.penId));
        openPenaltyForm(containerId, row);
      });
    });
    // Wire Create button
    const createBtn = el.querySelector('#penalty-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => openPenaltyForm(containerId, null));
    return;
  }
  // ── LOAN PURPOSES ────────────────────────────────────────────────────────────
  if (section === 'loan-purposes') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLoanPurposesSection();
    // Wire Create button
    const createBtn = el.querySelector('#lp-purpose-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => openLoanPurposeForm(containerId, null));
    // Wire Edit buttons
    el.querySelectorAll('.fee-btn-edit[data-lpur-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.lpurId);
        const rows = (typeof MOCK_LOAN_PURPOSES !== 'undefined') ? MOCK_LOAN_PURPOSES : _LOAN_PURPOSES_FALLBACK;
        const row = rows.find(r => r.id === id);
        openLoanPurposeForm(containerId, row);
      });
    });
    return;
  }
  // ── LOAN CATEGORIES ──────────────────────────────────────────────────────────
  if (section === 'loan-categories') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLoanCategoriesSection();
    const createBtn = el.querySelector('#lc-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => openLoanCategoryForm(containerId, null));
    el.querySelectorAll('.fee-btn-edit[data-lcat-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.lcatId);
        const rows = (typeof MOCK_LOAN_CATEGORIES !== 'undefined') ? MOCK_LOAN_CATEGORIES : _LOAN_CATEGORIES_FALLBACK;
        const row = rows.find(r => r.id === id);
        openLoanCategoryForm(containerId, row);
      });
    });
    return;
  }
  // ── RECENT RUNS ─────────────────────────────────────────────────────────────
  if (section === 'recent-runs') {
    const el = document.getElementById(containerId);
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    const allRuns = (typeof MOCK_RECENT_RUNS !== 'undefined') ? MOCK_RECENT_RUNS : [];
    const PAGE_SIZE = 20;
    let rrPage = 1;
    let rrFilters = { job: '', search: '', runDate: '', from: '', to: '', status: '' };

    const statusBadge = s => {
      const map = {
        'SUCCEEDED':           'background:#dcfce7;color:#16a34a',
        'PARTIALLY SUCCEEDED': 'background:#fef9c3;color:#b45309',
        'FAILED':              'background:#fee2e2;color:#dc2626',
        'SUPPLY':              'background:#e0f2fe;color:#0369a1',
      };
      const style = map[s] || 'background:#f1f5f9;color:#64748b';
      return `<span style="padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap;${style}">${s}</span>`;
    };

    const filtered = () => {
      return allRuns.filter(r => {
        if (rrFilters.job    && !r.jobName.toLowerCase().includes(rrFilters.job.toLowerCase())) return false;
        if (rrFilters.search && !r.jobName.toLowerCase().includes(rrFilters.search.toLowerCase())) return false;
        if (rrFilters.status && r.status !== rrFilters.status) return false;
        return true;
      });
    };

    const buildRows = () => {
      const rows = filtered();
      const start = (rrPage-1)*PAGE_SIZE;
      const page  = rows.slice(start, start+PAGE_SIZE);
      if (!page.length) return '<tr><td colspan="5" style="padding:40px;text-align:center;color:var(--fg2,#94a3b8)">No runs found</td></tr>';
      return page.map(r => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s" onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''">
          <td style="padding:10px 14px;min-width:220px">
            <div style="font-size:12.5px;font-weight:600;color:var(--fg,#1e293b)">${r.run}</div>
            <div style="font-size:11px;color:var(--fg2,#94a3b8);margin-top:2px">${r.org}</div>
          </td>
          <td style="padding:10px 14px">${statusBadge(r.status)}</td>
          <td style="padding:10px 14px;min-width:200px">
            <div style="font-size:11.5px;color:var(--fg,#1e293b)"><span style="color:var(--fg2,#94a3b8);font-size:10.5px">started</span> ${r.started}</div>
            <div style="font-size:11.5px;color:var(--fg2,#64748b);margin-top:2px"><span style="color:var(--fg2,#94a3b8);font-size:10.5px">normalized</span> ${r.normalized}</div>
          </td>
          <td style="padding:10px 14px;white-space:nowrap">
            <div style="font-size:12px;font-weight:600;color:var(--fg,#1e293b)">${r.itemsTotal}</div>
            <div style="font-size:11px;color:var(--fg2,#94a3b8)">${r.itemsDetail}</div>
          </td>
          <td style="padding:10px 14px;text-align:right">
            <button data-action="rr-view" data-run-id="${r.id}"
              style="padding:4px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:11.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
          </td>
        </tr>`).join('');
    };

    const buildPager = () => {
      const total = filtered().length;
      const start = (rrPage-1)*PAGE_SIZE + 1;
      const end   = Math.min(rrPage*PAGE_SIZE, total);
      return `<span style="font-size:12px;color:var(--fg2,#64748b)">Showing ${start}–${end} of ${total} results</span>
        <div style="display:flex;gap:4px">
          <button id="rr-prev" ${rrPage<=1?'disabled':''} style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:12px;cursor:pointer;${rrPage<=1?'opacity:.4':''}">‹ Prev</button>
          <button id="rr-next" ${end>=total?'disabled':''} style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:12px;cursor:pointer;${end>=total?'opacity:.4':''}">Next ›</button>
        </div>`;
    };

    const rebuildTable = () => {
      const tbody = document.getElementById('rr-tbody');
      const footer = document.getElementById('rr-footer');
      if (tbody) tbody.innerHTML = buildRows();
      if (footer) footer.innerHTML = buildPager();
      // rewire pager
      const prev = document.getElementById('rr-prev');
      const next = document.getElementById('rr-next');
      if (prev) prev.addEventListener('click', () => { if (rrPage>1){rrPage--; rebuildTable();} });
      if (next) next.addEventListener('click', () => { const t=filtered().length; if(rrPage*PAGE_SIZE<t){rrPage++; rebuildTable();} });
    };

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
        <!-- Header -->
        <div style="padding:18px 28px 10px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Recent Runs</div>
          <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Monitor scheduled, manual, and retry executions.</div>
        </div>
        <!-- Filters -->
        <div style="padding:14px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0);background:var(--bg,#f8fafc)">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:10px">Filters</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 16px">
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Job</div>
              <div style="position:relative">
                <select id="rr-f-job" style="width:100%;padding:6px 26px 6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none">
                  <option value="">Select an item</option>
                  <option>FeeAccrual</option><option>InterestAccrual</option><option>PenaltyAccrual</option>
                  <option>LoanBalance</option><option>StatementGeneration</option><option>DormancyCheck</option>
                </select>
                <svg style="position:absolute;right:7px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Search</div>
              <div style="position:relative;display:flex;align-items:center">
                <svg style="position:absolute;left:8px;color:var(--fg2,#94a3b8);pointer-events:none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="rr-f-search" type="text" placeholder="Search by job name..."
                  style="width:100%;padding:6px 9px 6px 26px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
              </div>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Run Date</div>
              <input id="rr-f-rundate" type="text" placeholder="Select Date"
                style="width:100%;padding:6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">From Date</div>
              <input id="rr-f-from" type="text" placeholder="Select Date"
                style="width:100%;padding:6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">To Date</div>
              <input id="rr-f-to" type="text" placeholder="Select Date"
                style="width:100%;padding:6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Status</div>
              <div style="position:relative">
                <select id="rr-f-status" style="width:100%;padding:6px 26px 6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none">
                  <option value="">All statuses</option>
                  <option>SUCCEEDED</option><option>PARTIALLY SUCCEEDED</option><option>FAILED</option><option>SUPPLY</option>
                </select>
                <svg style="position:absolute;right:7px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div style="flex:1;overflow:auto;min-height:0">
          <table style="width:100%;border-collapse:collapse">
            <thead style="position:sticky;top:0;z-index:2">
              <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:2px solid var(--border1,#e2e8f0)">
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Run</th>
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Status</th>
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Timing</th>
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Items</th>
                <th style="padding:9px 14px;text-align:right;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Actions</th>
              </tr>
            </thead>
            <tbody id="rr-tbody">${buildRows()}</tbody>
          </table>
        </div>
        <!-- Footer -->
        <div id="rr-footer" style="padding:10px 20px;border-top:1px solid var(--border1,#e2e8f0);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;background:var(--card-bg,#fff)">
          ${buildPager()}
        </div>
      </div>`;

    // Wire filters
    ['rr-f-job','rr-f-status'].forEach(id => {
      const el2 = document.getElementById(id);
      if (el2) el2.addEventListener('change', () => {
        rrFilters.job    = document.getElementById('rr-f-job').value;
        rrFilters.status = document.getElementById('rr-f-status').value;
        rrPage = 1; rebuildTable();
      });
    });
    const srch = document.getElementById('rr-f-search');
    if (srch) srch.addEventListener('input', () => { rrFilters.search = srch.value; rrPage = 1; rebuildTable(); });

    // Wire pager (initial)
    rebuildTable();
    return;
  }

  // ── ACCOUNT/DEPOSIT PRODUCT DEFINITION (list) ─────────────────────────────
  if (section === 'accprod' || section === 'depprod') {
    const isDeposit = section === 'depprod';
    const apRows = isDeposit ? [
      { id:5, code:'TD-12M-EUR',   name:'Term Deposit 12 Months EUR',  category:'Term Deposit',   status:'ACTIVE',  created:'10.01.2026' },
      { id:4, code:'TD-24M-EUR',   name:'Term Deposit 24 Months EUR',  category:'Term Deposit',   status:'ACTIVE',  created:'10.01.2026' },
      { id:3, code:'FD-STD-EUR',   name:'Fixed Deposit Standard EUR',  category:'Fixed Deposit',  status:'ACTIVE',  created:'05.01.2026' },
      { id:2, code:'FD-PREM-EUR',  name:'Fixed Deposit Premium EUR',   category:'Fixed Deposit',  status:'ACTIVE',  created:'05.01.2026' },
      { id:1, code:'TD-6M-EUR',    name:'Term Deposit 6 Months EUR',   category:'Term Deposit',   status:'PENDING', created:'15.12.2025' },
    ] : [
      { id:6, code:'CA-STD-001',   name:'Standard Current Account EUR', category:'Current Account', status:'ACTIVE',  created:'15.01.2026' },
      { id:5, code:'CA-PREM-001',  name:'Premium Current Account EUR',  category:'Current Account', status:'ACTIVE',  created:'15.01.2026' },
      { id:4, code:'SA-STD-001',   name:'Standard Savings Account EUR', category:'Savings Account', status:'ACTIVE',  created:'10.01.2026' },
      { id:3, code:'SA-YOUTH-001', name:'Youth Savings Account EUR',    category:'Savings Account', status:'ACTIVE',  created:'10.01.2026' },
      { id:2, code:'OD-STD-001',   name:'Overdraft Facility Standard',  category:'Overdraft',       status:'ACTIVE',  created:'05.01.2026' },
      { id:1, code:'CA-BIZ-001',   name:'Business Current Account EUR', category:'Current Account', status:'PENDING', created:'15.12.2025' },
    ];
    const apLabel = isDeposit ? 'Deposit' : 'Account';
    const statusCls = s => ({ ACTIVE:'lp-status-active', PENDING:'lp-status-pending', CLOSED:'lp-status-inactive' })[s] || 'lp-status-pending';
    const rowsHtml = apRows.map(r => `
      <tr>
        <td>${r.id}</td>
        <td style="font-family:monospace;font-size:12px">${r.code}</td>
        <td>${r.name}</td>
        <td>${r.category}</td>
        <td><span class="${statusCls(r.status)}">${r.status}</span></td>
        <td>${r.created}</td>
        <td>
          <div class="fee-actions">
            <button class="fee-btn-edit"
              data-action="open-acc-product-form"
              data-module="${mod}" data-section="${section}"
              data-id="${r.id}" data-code="${r.code}" data-name="${r.name}"
              data-category="${r.category}" data-status="${r.status}">
              ${_I_PENCIL_12} Edit
            </button>
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">
              ${_I_BIN_12} Delete
            </button>
          </div>
        </td>
      </tr>`).join('');
    return `
      <div class="fee-page-header">
        <div>
          <div class="fee-page-title">${apLabel} Product Definitions</div>
          <div class="fee-page-sub">Manage ${apLabel.toLowerCase()} product templates and parameters</div>
        </div>
        <button class="btn-create-fee" data-action="open-acc-product-form" data-module="${mod}" data-section="${section}">
          ${_I_PLUS_14} + Add ${apLabel} Product
        </button>
      </div>
      ${renderTable(['ID','Code','Name','Category','Status','Created At','Actions'], rowsHtml, apRows.length, {wrapStyle:'margin-top:0;'})}`;
  }

  // ── ACC/DEP JOB MANUAL RUN ────────────────────────────────────────────────
  if (section === 'acc-job-manual') {
    const el = document.getElementById(containerId);
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    let jmAccounts = [];
    let jmNextId = 1;

    const buildAcctRows = () => {
      if (!jmAccounts.length) {
        return '<tr><td colspan="3" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8);font-size:12.5px">No accounts added yet</td></tr>';
      }
      return jmAccounts.map(a => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b);width:80px">${a.id}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${a.accountNumber}</td>
          <td style="padding:10px 14px;font-size:12.5px;text-align:right">
            <button data-action="accjm-remove-acct" data-id="${a.id}"
              style="background:none;border:none;cursor:pointer;color:#ef4444;font-size:12px;font-weight:600;padding:3px 6px;border-radius:4px;display:inline-flex;align-items:center;gap:3px">
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M2 4h10"/><path d="M5 4V2.5h4V4"/><path d="M3 4l.8 7.5h6.4L11 4"/></svg>
              Remove
            </button>
          </td>
        </tr>`).join('');
    };

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
        <!-- Page header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Job Manual Run</div>
          </div>
          <div style="display:flex;gap:10px;align-items:center">
            <button id="accjm-reset" style="padding:7px 18px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:.82rem;font-weight:600;cursor:pointer">Reset</button>
            <button id="accjm-run" style="padding:7px 18px;border:none;border-radius:7px;background:var(--accent,#6366f1);color:#fff;font-size:.82rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
              Run
            </button>
          </div>
        </div>
        <!-- Fields card -->
        <div style="margin:20px 28px 0;flex-shrink:0;border:1px solid var(--border1,#e2e8f0);border-radius:10px;background:var(--card-bg,#fff);padding:20px 24px">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px 32px">
            <!-- Job Type -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Job Type</div>
              <div style="position:relative">
                <select id="accjm-job-type" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
                  <option value="interest-accrual">Interest Accrual</option>
                  <option value="fee-accrual">Fee Accrual</option>
                  <option value="eod-processing">EOD Processing</option>
                  <option value="statement-generation">Statement Generation</option>
                  <option value="term-deposit-maturity">Term Deposit Maturity</option>
                  <option value="overdraft-review">Overdraft Review</option>
                  <option value="dormancy-check">Dormancy Check</option>
                  <option value="interest-capitalisation">Interest Capitalisation</option>
                </select>
                <svg style="position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <!-- Product -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Product</div>
              <div style="position:relative">
                <select id="accjm-product" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
                  <option value="">Select an item</option>
                  <option value="current">Current Account</option>
                  <option value="savings">Savings Account</option>
                  <option value="term-12">Term Deposit 12M</option>
                  <option value="term-24">Term Deposit 24M</option>
                  <option value="fixed">Fixed Deposit</option>
                  <option value="overdraft">Overdraft Facility</option>
                </select>
                <svg style="position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <!-- Date -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Date</div>
              <div style="position:relative;display:flex;align-items:center">
                <input id="accjm-date" type="text" value="09.10.2026"
                  style="width:100%;padding:8px 34px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
                <svg style="position:absolute;right:9px;pointer-events:none;color:var(--fg2,#94a3b8)" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              </div>
            </div>
            <!-- Trigger Type -->
            <div>
              <div style="font-size:11px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Trigger Type</div>
              <div style="position:relative">
                <select id="accjm-trigger-type" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
                  <option value="manual" selected>Manual</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="event-driven">Event-driven</option>
                </select>
                <svg style="position:absolute;right:9px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Accounts card -->
        <div style="margin:16px 28px 20px;flex:1;min-height:0;border:1px solid var(--border1,#e2e8f0);border-radius:10px;background:var(--card-bg,#fff);display:flex;flex-direction:column;overflow:hidden">
          <div style="padding:12px 16px 12px 18px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--border1,#e2e8f0);flex-shrink:0">
            <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b)">Accounts</div>
            <div style="display:flex;gap:8px;align-items:center">
              <div style="position:relative">
                <select id="accjm-acct-sel" style="padding:6px 28px 6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:160px;cursor:pointer">
                  <option value="">Select an item</option>
                  <option value="CA-2024-001">CA-2024-001</option>
                  <option value="CA-2024-002">CA-2024-002</option>
                  <option value="SA-2024-001">SA-2024-001</option>
                  <option value="SA-2025-001">SA-2025-001</option>
                  <option value="TD-2025-001">TD-2025-001</option>
                  <option value="TD-2026-001">TD-2026-001</option>
                  <option value="FD-2026-001">FD-2026-001</option>
                </select>
                <svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
              <button id="accjm-add-acct"
                style="padding:6px 16px;border:none;border-radius:6px;background:var(--accent,#6366f1);color:#fff;font-size:12px;font-weight:600;cursor:pointer">Add</button>
            </div>
          </div>
          <div style="flex:1;overflow:auto;min-height:0">
            <table style="width:100%;border-collapse:collapse">
              <thead style="position:sticky;top:0;z-index:2">
                <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
                  <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);width:80px">ID</th>
                  <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Account Number</th>
                  <th style="padding:9px 14px;text-align:right;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);width:120px">Actions</th>
                </tr>
              </thead>
              <tbody id="accjm-acct-tbody">
                <tr><td colspan="3" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8);font-size:12.5px">No accounts added yet</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;

    document.getElementById('accjm-add-acct').addEventListener('click', () => {
      const sel = document.getElementById('accjm-acct-sel');
      const val = sel.value;
      if (!val) return;
      if (jmAccounts.find(a => a.accountNumber === val)) return;
      jmAccounts.push({ id: jmNextId++, accountNumber: val });
      document.getElementById('accjm-acct-tbody').innerHTML = buildAcctRows();
      sel.value = '';
    });

    document.getElementById('accjm-reset').addEventListener('click', () => {
      document.getElementById('accjm-job-type').value = 'interest-accrual';
      document.getElementById('accjm-product').value = '';
      document.getElementById('accjm-date').value = '09.10.2026';
      document.getElementById('accjm-trigger-type').value = 'manual';
      jmAccounts = [];
      jmNextId = 1;
      document.getElementById('accjm-acct-tbody').innerHTML = buildAcctRows();
    });

    document.getElementById('accjm-run').addEventListener('click', () => {
      const jobType = document.getElementById('accjm-job-type').value;
      const product = document.getElementById('accjm-product').value;
      const date    = document.getElementById('accjm-date').value;
      if (!product) {
        document.getElementById('accjm-product').style.borderColor = '#ef4444';
        setTimeout(() => { document.getElementById('accjm-product').style.borderColor = ''; }, 2000);
        return;
      }
      const toast = document.createElement('div');
      toast.style.cssText = 'position:fixed;bottom:28px;left:50%;transform:translateX(-50%);background:#1e293b;color:#fff;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;z-index:9999;box-shadow:0 4px 16px rgba(0,0,0,.2)';
      toast.textContent = 'Job "' + jobType + '" triggered for ' + date;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    });

    el.addEventListener('click', e => {
      const btn = e.target.closest('[data-action="accjm-remove-acct"]');
      if (btn) {
        const id = parseInt(btn.getAttribute('data-id'));
        jmAccounts = jmAccounts.filter(a => a.id !== id);
        document.getElementById('accjm-acct-tbody').innerHTML = buildAcctRows();
      }
    });

    return;
  }

  // ── ACC/DEP JOB SCHEDULER ─────────────────────────────────────────────────
  if (section === 'acc-job-scheduler') {
    const el = document.getElementById(containerId);
    const jobs = (typeof MOCK_ACC_SCHEDULER_JOBS !== 'undefined') ? MOCK_ACC_SCHEDULER_JOBS :
                 (typeof window !== 'undefined' && window.MOCK_ACC_SCHEDULER_JOBS) ? window.MOCK_ACC_SCHEDULER_JOBS : [];

    const buildRows = (filter) => {
      const q = (filter || '').toLowerCase();
      const filtered = q ? jobs.filter(j => j.job.toLowerCase().includes(q)) : jobs;
      if (!filtered.length) return '<tr><td colspan="8" style="padding:32px;text-align:center;color:var(--fg2,#94a3b8)">No jobs found</td></tr>';
      return filtered.map(j => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${j.job}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${j.scope}</td>
          <td style="padding:10px 14px;font-size:12.5px;font-family:monospace;color:var(--fg,#1e293b)">${j.cron}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${j.timezone}</td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${j.execStrategy || ''}</td>
          <td style="padding:10px 14px;font-size:12.5px">
            <span style="color:${j.enabled === 'Yes' ? '#16a34a' : '#94a3b8'};font-weight:600">${j.enabled}</span>
          </td>
          <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b);text-align:center">${j.dependencies}</td>
          <td style="padding:10px 14px;font-size:12.5px">
            <button data-action="accsched-edit" data-job="${j.job}"
              style="background:none;border:none;cursor:pointer;color:var(--accent,#6366f1);font-size:12px;font-weight:600;display:inline-flex;align-items:center;gap:4px;padding:3px 6px;border-radius:4px">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
          </td>
        </tr>`).join('');
    };

    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden;padding:0">
        <!-- Page header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Job Scheduler</div>
            <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Manage cron schedules, execution settings, and dependency rules per job.</div>
          </div>
        </div>
        <!-- Filters -->
        <div style="padding:14px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--fg2,#94a3b8);margin-bottom:10px;text-transform:uppercase">Filters</div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end">
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Organization</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:150px">
                <option>Select an item</option><option>OneFor</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">Branch</div>
              <select style="padding:5px 26px 5px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;min-width:140px">
                <option>Select an item</option>
              </select>
            </div>
            <div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-bottom:3px;font-weight:600">&nbsp;</div>
              <div style="position:relative;display:flex;align-items:center">
                <svg style="position:absolute;left:8px;color:var(--fg2,#94a3b8);pointer-events:none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="accsched-search" type="text" placeholder="Search by job name..."
                  style="padding:5px 9px 5px 26px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;width:190px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
              </div>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div style="flex:1;overflow:auto;min-height:0">
          <table style="width:100%;border-collapse:collapse;font-size:12.5px">
            <thead style="position:sticky;top:0;z-index:2">
              <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:2px solid var(--border1,#e2e8f0)">
                ${['Job','Scope','Cron','Time zone','Execution strategy','Enabled','Dependencies','Actions']
                  .map(h => `<th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b);white-space:nowrap">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody id="accsched-tbody">
              ${buildRows('')}
            </tbody>
          </table>
        </div>
      </div>`;

    const searchEl = document.getElementById('accsched-search');
    const tbody = document.getElementById('accsched-tbody');
    if (searchEl && tbody) {
      searchEl.addEventListener('input', () => {
        tbody.innerHTML = buildRows(searchEl.value);
      });
    }
    return;
  }

  // ── ACC/DEP RECENT RUNS ───────────────────────────────────────────────────
  if (section === 'acc-recent-runs') {
    const el = document.getElementById(containerId);
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    const allRuns = (typeof MOCK_ACC_RECENT_RUNS !== 'undefined') ? MOCK_ACC_RECENT_RUNS :
                    (typeof window !== 'undefined' && window.MOCK_ACC_RECENT_RUNS) ? window.MOCK_ACC_RECENT_RUNS : [];
    const PAGE_SIZE = 20;
    let rrPage = 1;
    let rrFilters = { job: '', search: '', status: '' };

    const statusBadge = s => {
      const map = {
        'SUCCEEDED':           'background:#dcfce7;color:#16a34a',
        'PARTIALLY SUCCEEDED': 'background:#fef9c3;color:#b45309',
        'FAILED':              'background:#fee2e2;color:#dc2626',
        'SUPPLY':              'background:#e0f2fe;color:#0369a1',
      };
      const style = map[s] || 'background:#f1f5f9;color:#64748b';
      return `<span style="padding:3px 9px;border-radius:20px;font-size:11px;font-weight:700;white-space:nowrap;${style}">${s}</span>`;
    };

    const filtered = () => {
      return allRuns.filter(r => {
        if (rrFilters.job    && !r.jobName.toLowerCase().includes(rrFilters.job.toLowerCase())) return false;
        if (rrFilters.search && !r.jobName.toLowerCase().includes(rrFilters.search.toLowerCase())) return false;
        if (rrFilters.status && r.status !== rrFilters.status) return false;
        return true;
      });
    };

    const buildRows = () => {
      const rows = filtered();
      const start = (rrPage-1)*PAGE_SIZE;
      const page  = rows.slice(start, start+PAGE_SIZE);
      if (!page.length) return '<tr><td colspan="5" style="padding:40px;text-align:center;color:var(--fg2,#94a3b8)">No runs found</td></tr>';
      return page.map(r => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s" onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''">
          <td style="padding:10px 14px;min-width:220px">
            <div style="font-size:12.5px;font-weight:600;color:var(--fg,#1e293b)">${r.run}</div>
            <div style="font-size:11px;color:var(--fg2,#94a3b8);margin-top:2px">${r.org}</div>
          </td>
          <td style="padding:10px 14px">${statusBadge(r.status)}</td>
          <td style="padding:10px 14px;min-width:200px">
            <div style="font-size:11.5px;color:var(--fg,#1e293b)"><span style="color:var(--fg2,#94a3b8);font-size:10.5px">started</span> ${r.started}</div>
            <div style="font-size:11.5px;color:var(--fg2,#64748b);margin-top:2px"><span style="color:var(--fg2,#94a3b8);font-size:10.5px">normalized</span> ${r.normalized}</div>
          </td>
          <td style="padding:10px 14px;white-space:nowrap">
            <div style="font-size:12px;font-weight:600;color:var(--fg,#1e293b)">${r.itemsTotal}</div>
            <div style="font-size:11px;color:var(--fg2,#94a3b8)">${r.itemsDetail}</div>
          </td>
          <td style="padding:10px 14px;text-align:right">
            <button data-action="accrr-view" data-run-id="${r.id}"
              style="padding:4px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:11.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
          </td>
        </tr>`).join('');
    };

    const buildPager = () => {
      const total = filtered().length;
      const start = (rrPage-1)*PAGE_SIZE + 1;
      const end   = Math.min(rrPage*PAGE_SIZE, total);
      return `<span style="font-size:12px;color:var(--fg2,#64748b)">Showing ${start}–${end} of ${total} results</span>
        <div style="display:flex;gap:4px">
          <button id="accrr-prev" ${rrPage<=1?'disabled':''} style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:12px;cursor:pointer;${rrPage<=1?'opacity:.4':''}">‹ Prev</button>
          <button id="accrr-next" ${end>=total?'disabled':''} style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:12px;cursor:pointer;${end>=total?'opacity:.4':''}">Next ›</button>
        </div>`;
    };

    const rebuildTable = () => {
      const tbody = document.getElementById('accrr-tbody');
      const footer = document.getElementById('accrr-footer');
      if (tbody) tbody.innerHTML = buildRows();
      if (footer) footer.innerHTML = buildPager();
      const prev = document.getElementById('accrr-prev');
      const next = document.getElementById('accrr-next');
      if (prev) prev.addEventListener('click', () => { if (rrPage>1){rrPage--; rebuildTable();} });
      if (next) next.addEventListener('click', () => { const t=filtered().length; if(rrPage*PAGE_SIZE<t){rrPage++; rebuildTable();} });
    };

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
        <!-- Header -->
        <div style="padding:18px 28px 10px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b);line-height:1.2">Recent Runs</div>
          <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Monitor scheduled, manual, and retry executions.</div>
        </div>
        <!-- Filters -->
        <div style="padding:14px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0);background:var(--bg,#f8fafc)">
          <div style="font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:10px">Filters</div>
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px 16px">
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Job</div>
              <div style="position:relative">
                <select id="accrr-f-job" style="width:100%;padding:6px 26px 6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none">
                  <option value="">Select an item</option>
                  <option>InterestAccrual</option><option>FeeAccrual</option><option>EODProcessing</option>
                  <option>StatementGeneration</option><option>TermDepositMaturity</option><option>OverdraftReview</option>
                  <option>DormancyCheck</option><option>InterestCapitalisation</option>
                </select>
                <svg style="position:absolute;right:7px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Search</div>
              <div style="position:relative;display:flex;align-items:center">
                <svg style="position:absolute;left:8px;color:var(--fg2,#94a3b8);pointer-events:none" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="accrr-f-search" type="text" placeholder="Search by job name..."
                  style="width:100%;padding:6px 9px 6px 26px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b)"/>
              </div>
            </div>
            <div>
              <div style="font-size:10.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px">Status</div>
              <div style="position:relative">
                <select id="accrr-f-status" style="width:100%;padding:6px 26px 6px 9px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none">
                  <option value="">All statuses</option>
                  <option>SUCCEEDED</option><option>PARTIALLY SUCCEEDED</option><option>FAILED</option><option>SUPPLY</option>
                </select>
                <svg style="position:absolute;right:7px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>
          </div>
        </div>
        <!-- Table -->
        <div style="flex:1;overflow:auto;min-height:0">
          <table style="width:100%;border-collapse:collapse">
            <thead style="position:sticky;top:0;z-index:2">
              <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:2px solid var(--border1,#e2e8f0)">
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Run</th>
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Status</th>
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Timing</th>
                <th style="padding:9px 14px;text-align:left;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Items</th>
                <th style="padding:9px 14px;text-align:right;font-size:11px;font-weight:700;letter-spacing:.03em;color:var(--fg2,#64748b)">Actions</th>
              </tr>
            </thead>
            <tbody id="accrr-tbody">${buildRows()}</tbody>
          </table>
        </div>
        <!-- Footer -->
        <div id="accrr-footer" style="padding:10px 20px;border-top:1px solid var(--border1,#e2e8f0);display:flex;justify-content:space-between;align-items:center;flex-shrink:0;background:var(--card-bg,#fff)">
          ${buildPager()}
        </div>
      </div>`;

    ['accrr-f-job','accrr-f-status'].forEach(id => {
      const el2 = document.getElementById(id);
      if (el2) el2.addEventListener('change', () => {
        rrFilters.job    = document.getElementById('accrr-f-job').value;
        rrFilters.status = document.getElementById('accrr-f-status').value;
        rrPage = 1; rebuildTable();
      });
    });
    const srch = document.getElementById('accrr-f-search');
    if (srch) srch.addEventListener('input', () => { rrFilters.search = srch.value; rrPage = 1; rebuildTable(); });

    rebuildTable();
    return;
  }

  // ── ACC/DEP JOB CATALOGUE ─────────────────────────────────────────────────
  if (section === 'acc-job-catalogue') {
    const el = document.getElementById(containerId);
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    const catalogue = (typeof MOCK_ACC_JOB_CATALOGUE !== 'undefined') ? MOCK_ACC_JOB_CATALOGUE :
                      (typeof window !== 'undefined' && window.MOCK_ACC_JOB_CATALOGUE) ? window.MOCK_ACC_JOB_CATALOGUE : [];
    let jcSearch = '';
    let jcCategory = '';

    const categories = [...new Set(catalogue.map(j => j.category))];

    const typeBadge = t => {
      const colors = { enum:'#e0f2fe;#0369a1', integer:'#f3e8ff;#7c3aed', boolean:'#dcfce7;#16a34a', decimal:'#fef9c3;#b45309', date:'#f1f5f9;#475569', multiselect:'#ffe4e6;#be123c' };
      const [bg,fg2] = (colors[t]||'#f1f5f9;#475569').split(';');
      return `<span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:#${bg};color:#${fg2}">${t}</span>`;
    };

    const buildCards = () => {
      const q = jcSearch.toLowerCase();
      const rows = catalogue.filter(j =>
        (!q || j.name.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)) &&
        (!jcCategory || j.category === jcCategory)
      );
      if (!rows.length) return '<div style="padding:40px;text-align:center;color:var(--fg2,#94a3b8)">No jobs found</div>';
      return rows.map(j => `
        <div style="border:1px solid var(--border1,#e2e8f0);border-radius:10px;background:var(--card-bg,#fff);padding:18px 20px;display:flex;flex-direction:column;gap:10px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span style="font-size:14px;font-weight:700;color:var(--fg,#1e293b)">${j.name}</span>
                <span style="padding:2px 8px;border-radius:4px;font-size:10.5px;font-weight:600;background:var(--table-head-bg,#f1f5f9);color:var(--fg2,#64748b)">${j.category}</span>
                <span style="font-size:10.5px;font-weight:600;color:var(--fg2,#94a3b8)">${j.id}</span>
              </div>
              <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:5px;line-height:1.5">${j.description}</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
              <span style="font-size:11px;font-weight:700;color:${j.enabled?'#16a34a':'#94a3b8'}">${j.enabled?'● Enabled':'○ Disabled'}</span>
              <button data-action="accjc-edit" data-job-id="${j.id}"
                style="padding:5px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:none;color:var(--fg,#1e293b);font-size:11.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg>
                Edit
              </button>
            </div>
          </div>
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:4px">Scope</div>
              <div style="display:flex;gap:4px">
                ${j.scope.map(s=>`<span style="padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;background:#f1f5f9;color:#475569">${s}</span>`).join('')}
              </div>
            </div>
            <div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:4px">Assigned orgs</div>
              <div style="font-size:12px;color:var(--fg,#1e293b)">${j.assignedOrgs.length ? j.assignedOrgs.join(', ') : '<span style="color:var(--fg2,#94a3b8);font-style:italic">None</span>'}</div>
            </div>
            <div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:4px">Tags</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap">
                ${j.tags.map(t=>`<span style="padding:2px 7px;border-radius:4px;font-size:10.5px;background:#f1f5f9;color:#64748b">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:6px">Parameters</div>
            <table style="width:100%;border-collapse:collapse;border:1px solid var(--border1,#e2e8f0);border-radius:6px;overflow:hidden;font-size:12px">
              <thead>
                <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Name</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Type</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Default</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Required</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Notes</th>
                </tr>
              </thead>
              <tbody>
                ${j.parameters.map(p=>`
                  <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
                    <td style="padding:6px 10px;font-weight:600;color:var(--fg,#1e293b);font-family:monospace;font-size:11.5px">${p.name}</td>
                    <td style="padding:6px 10px">${typeBadge(p.type)}</td>
                    <td style="padding:6px 10px;color:var(--fg2,#64748b);font-family:monospace;font-size:11px">${p.default !== null && p.default !== undefined ? String(p.default) : '—'}</td>
                    <td style="padding:6px 10px;font-size:11.5px;font-weight:700;color:${p.required?'#dc2626':'#94a3b8'}">${p.required?'Yes':'No'}</td>
                    <td style="padding:6px 10px;color:var(--fg2,#64748b);font-size:11px;font-style:italic">${p.hint||''} ${p.values?'Options: '+p.values.join(', '):''}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`).join('');
    };

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b)">Job Catalogue</div>
            <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Define batch jobs, their parameters, and which organizations can schedule them.</div>
          </div>
          <button data-action="accjc-new"
            style="padding:8px 18px;border:none;border-radius:7px;background:var(--accent,#6366f1);color:#fff;font-size:.82rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>
            New Job
          </button>
        </div>
        <div style="padding:12px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0);display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="position:relative;flex:1;min-width:180px;max-width:320px">
            <svg style="position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--fg2,#94a3b8);pointer-events:none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="accjc-search" type="text" placeholder="Search jobs..."
              style="width:100%;padding:7px 9px 7px 27px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12.5px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
          </div>
          <div style="position:relative">
            <select id="accjc-cat" style="padding:7px 28px 7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12.5px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
              <option value="">All categories</option>
              ${categories.map(c=>`<option>${c}</option>`).join('')}
            </select>
            <svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div style="font-size:12px;color:var(--fg2,#94a3b8);margin-left:auto" id="accjc-count">${catalogue.length} jobs</div>
        </div>
        <div style="flex:1;overflow:auto;min-height:0;padding:20px 28px;display:flex;flex-direction:column;gap:14px" id="accjc-cards">
          ${buildCards()}
        </div>
      </div>`;

    const refreshCards = () => {
      const cards = document.getElementById('accjc-cards');
      const count = document.getElementById('accjc-count');
      if (cards) cards.innerHTML = buildCards();
      if (count) {
        const q = jcSearch.toLowerCase();
        const n = catalogue.filter(j=>(!q||j.name.toLowerCase().includes(q)||j.description.toLowerCase().includes(q))&&(!jcCategory||j.category===jcCategory)).length;
        count.textContent = n + ' job' + (n!==1?'s':'');
      }
    };

    const srch = document.getElementById('accjc-search');
    const cat  = document.getElementById('accjc-cat');
    if (srch) srch.addEventListener('input', () => { jcSearch = srch.value; refreshCards(); });
    if (cat)  cat.addEventListener('change', () => { jcCategory = cat.value; refreshCards(); });

    return;
  }

  // ── JOB CATALOGUE ─────────────────────────────────────────────────────────
  if (section === 'job-catalogue') {
    const el = document.getElementById(containerId);
    el.style.padding = '0';
    el.style.overflow = 'hidden';
    el.style.height = 'calc(100vh - var(--header-height,60px))';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.minHeight = '';

    const catalogue = (typeof MOCK_JOB_CATALOGUE !== 'undefined') ? MOCK_JOB_CATALOGUE : [];
    let jcSearch = '';
    let jcCategory = '';

    const categories = [...new Set(catalogue.map(j => j.category))];

    const typeBadge = t => {
      const colors = { enum:'#e0f2fe;#0369a1', integer:'#f3e8ff;#7c3aed', boolean:'#dcfce7;#16a34a', decimal:'#fef9c3;#b45309', date:'#f1f5f9;#475569', multiselect:'#ffe4e6;#be123c' };
      const [bg,fg] = (colors[t]||'#f1f5f9;#475569').split(';');
      return `<span style="padding:2px 7px;border-radius:4px;font-size:10px;font-weight:700;background:#${bg};color:#${fg}">${t}</span>`;
    };

    const buildCards = () => {
      const q = jcSearch.toLowerCase();
      const rows = catalogue.filter(j =>
        (!q || j.name.toLowerCase().includes(q) || j.description.toLowerCase().includes(q)) &&
        (!jcCategory || j.category === jcCategory)
      );
      if (!rows.length) return '<div style="padding:40px;text-align:center;color:var(--fg2,#94a3b8)">No jobs found</div>';
      return rows.map(j => `
        <div style="border:1px solid var(--border1,#e2e8f0);border-radius:10px;background:var(--card-bg,#fff);padding:18px 20px;display:flex;flex-direction:column;gap:10px">
          <!-- card header -->
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
            <div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
                <span style="font-size:14px;font-weight:700;color:var(--fg,#1e293b)">${j.name}</span>
                <span style="padding:2px 8px;border-radius:4px;font-size:10.5px;font-weight:600;background:var(--table-head-bg,#f1f5f9);color:var(--fg2,#64748b)">${j.category}</span>
                <span style="font-size:10.5px;font-weight:600;color:var(--fg2,#94a3b8)">${j.id}</span>
              </div>
              <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:5px;line-height:1.5">${j.description}</div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-shrink:0">
              <span style="font-size:11px;font-weight:700;color:${j.enabled?'#16a34a':'#94a3b8'}">${j.enabled?'● Enabled':'○ Disabled'}</span>
              <button data-action="jc-edit" data-job-id="${j.id}"
                style="padding:5px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:none;color:var(--fg,#1e293b);font-size:11.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg>
                Edit
              </button>
            </div>
          </div>
          <!-- scope + orgs -->
          <div style="display:flex;gap:16px;flex-wrap:wrap">
            <div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:4px">Scope</div>
              <div style="display:flex;gap:4px">
                ${j.scope.map(s=>`<span style="padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600;background:#f1f5f9;color:#475569">${s}</span>`).join('')}
              </div>
            </div>
            <div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:4px">Assigned orgs</div>
              <div style="font-size:12px;color:var(--fg,#1e293b)">${j.assignedOrgs.length ? j.assignedOrgs.join(', ') : '<span style="color:var(--fg2,#94a3b8);font-style:italic">None</span>'}</div>
            </div>
            <div>
              <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:4px">Tags</div>
              <div style="display:flex;gap:4px;flex-wrap:wrap">
                ${j.tags.map(t=>`<span style="padding:2px 7px;border-radius:4px;font-size:10.5px;background:#f1f5f9;color:#64748b">${t}</span>`).join('')}
              </div>
            </div>
          </div>
          <!-- parameters table -->
          <div>
            <div style="font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--fg2,#94a3b8);margin-bottom:6px">Parameters</div>
            <table style="width:100%;border-collapse:collapse;border:1px solid var(--border1,#e2e8f0);border-radius:6px;overflow:hidden;font-size:12px">
              <thead>
                <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Name</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Type</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Default</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Required</th>
                  <th style="padding:6px 10px;text-align:left;font-size:10.5px;font-weight:700;color:var(--fg2,#64748b)">Notes</th>
                </tr>
              </thead>
              <tbody>
                ${j.parameters.map(p=>`
                  <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
                    <td style="padding:6px 10px;font-weight:600;color:var(--fg,#1e293b);font-family:monospace;font-size:11.5px">${p.name}</td>
                    <td style="padding:6px 10px">${typeBadge(p.type)}</td>
                    <td style="padding:6px 10px;color:var(--fg2,#64748b);font-family:monospace;font-size:11px">${p.default !== null && p.default !== undefined ? String(p.default) : '—'}</td>
                    <td style="padding:6px 10px;font-size:11.5px;font-weight:700;color:${p.required?'#dc2626':'#94a3b8'}">${p.required?'Yes':'No'}</td>
                    <td style="padding:6px 10px;color:var(--fg2,#64748b);font-size:11px;font-style:italic">${p.hint||''} ${p.values?'Options: '+p.values.join(', '):''}</td>
                  </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>`).join('');
    };

    el.innerHTML = `
      <div style="display:flex;flex-direction:column;height:100%;overflow:hidden">
        <!-- Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px 28px 14px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0)">
          <div>
            <div style="font-size:19px;font-weight:700;color:var(--fg,#1e293b)">Job Catalogue</div>
            <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:2px">Define batch jobs, their parameters, and which organizations can schedule them.</div>
          </div>
          <button data-action="jc-new"
            style="padding:8px 18px;border:none;border-radius:7px;background:var(--accent,#6366f1);color:#fff;font-size:.82rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>
            New Job
          </button>
        </div>
        <!-- Toolbar -->
        <div style="padding:12px 28px;flex-shrink:0;border-bottom:1px solid var(--border1,#e2e8f0);display:flex;gap:12px;align-items:center;flex-wrap:wrap">
          <div style="position:relative;flex:1;min-width:180px;max-width:320px">
            <svg style="position:absolute;left:8px;top:50%;transform:translateY(-50%);color:var(--fg2,#94a3b8);pointer-events:none" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input id="jc-search" type="text" placeholder="Search jobs..."
              style="width:100%;padding:7px 9px 7px 27px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12.5px;background:var(--bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box"/>
          </div>
          <div style="position:relative">
            <select id="jc-cat" style="padding:7px 28px 7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12.5px;background:var(--bg,#fff);color:var(--fg,#1e293b);appearance:none;cursor:pointer">
              <option value="">All categories</option>
              ${categories.map(c=>`<option>${c}</option>`).join('')}
            </select>
            <svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </div>
          <div style="font-size:12px;color:var(--fg2,#94a3b8);margin-left:auto" id="jc-count">${catalogue.length} jobs</div>
        </div>
        <!-- Cards -->
        <div style="flex:1;overflow:auto;min-height:0;padding:20px 28px;display:flex;flex-direction:column;gap:14px" id="jc-cards">
          ${buildCards()}
        </div>
      </div>`;

    const refreshCards = () => {
      const cards = document.getElementById('jc-cards');
      const count = document.getElementById('jc-count');
      if (cards) cards.innerHTML = buildCards();
      if (count) {
        const q = jcSearch.toLowerCase();
        const n = catalogue.filter(j=>(!q||j.name.toLowerCase().includes(q)||j.description.toLowerCase().includes(q))&&(!jcCategory||j.category===jcCategory)).length;
        count.textContent = n + ' job' + (n!==1?'s':'');
      }
    };

    const srch = document.getElementById('jc-search');
    const cat  = document.getElementById('jc-cat');
    if (srch) srch.addEventListener('input', () => { jcSearch = srch.value; refreshCards(); });
    if (cat)  cat.addEventListener('change', () => { jcCategory = cat.value; refreshCards(); });

    return;
  }

  // ── LOCAL SETTINGS: ROLES ─────────────────────────────────────────────────
  if (section === 'ls-roles') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsRolesSection();
    const createBtn = el.querySelector('#lsr-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => openLsRoleForm(containerId, null));
    el.querySelectorAll('[data-role-action="edit"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.roleId;
        const role = _MOCK_LS_ROLES.find(r => r.id === id);
        if (role) openLsRoleForm(containerId, role);
      });
    });
    return;
  }

  // ── ROLE SCOPES ────────────────────────────────────────────────────────────

  if (section === 'dashboard') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildDashboardSection();
    return;
  }


  if (section === 'ls-sessions') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsSessionsSection();
    wireLsSessionsList(el);
    return;
  }

  if (section === 'ls-user-roles') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsUserRolesSection();
    wireLsUserRolesList(el);
    return;
  }
  if (section === 'ls-api-clients') {
    const el = document.getElementById(containerId);
    if (!el) return;
    _lsApiClientsView = 'list';
    _lsApiClientsEditId = null;
    el.innerHTML = buildLsApiClientsSection();
    wireLsApiClientsList(el);
    return;
  }
  if (section === 'ls-api-client-roles') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsApiClientRolesSection();
    wireLsApiClientRolesList(el);
    return;
  }
  if (section === 'ls-batch-date') {
    const el = document.getElementById(containerId);
    if (!el) return;
    _bdCalView = { month: _batchDate.month, year: _batchDate.year };
    el.innerHTML = buildLsBatchDateSection();
    wireLsBatchDateSection(el);
    return;
  }
  if (section === 'daily-accrual') {
    const el = document.getElementById(containerId);
    if (!el) return;
    _accrualResults = null;
    el.innerHTML = buildDailyAccrualSection();
    wireDailyAccrualSection(el);
    return;
  }
  if (section === 'transactions-report') {
    const el = document.getElementById(containerId);
    if (!el) return;
    _txResults = null;
    el.innerHTML = buildTransactionsSection();
    wireTransactionsSection(el);
    return;
  }
  if (section === 'migration') {
    const el = document.getElementById(containerId);
    if (!el) return;
    // Reset migration state when entering the section
    _MIG_ORDER.forEach(k => { _migState[k].status = 'idle'; });
    _migRunAllActive = false;
    _migRunAllQueue  = [];
    _migToasts       = [];
    el.innerHTML = buildMigrationSection();
    wireMigrationSection(el);
    return;
  }
  if (section === 'ls-role-scopes') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsRoleScopesSection();
    const createBtn = el.querySelector('#lsrs-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => {
      alert('New Scope form — coming soon');
    });
    const filterRole = el.querySelector('#lsrs-filter-role');
    const filterOrg = el.querySelector('#lsrs-filter-org');
    const filterStatus = el.querySelector('#lsrs-filter-status');
    function applyRsScopeFilters() {
      const role = filterRole ? filterRole.value : '';
      const org = filterOrg ? filterOrg.value : '';
      const status = filterStatus ? filterStatus.value : '';
      el.querySelectorAll('#lsrs-tbody tr').forEach(row => {
        const sid = row.dataset.scopeId;
        const rs = _MOCK_LS_ROLE_SCOPES.find(r => r.id === sid);
        if (!rs) { row.hidden = true; return; }
        const matchRole = !role || rs.role === role;
        const matchOrg = !org || rs.orgId === org;
        const matchStatus = !status || rs.status === status;
        row.hidden = !(matchRole && matchOrg && matchStatus);
      });
    }
    if (filterRole) filterRole.addEventListener('change', applyRsScopeFilters);
    if (filterOrg) filterOrg.addEventListener('change', applyRsScopeFilters);
    if (filterStatus) filterStatus.addEventListener('change', applyRsScopeFilters);
    el.querySelectorAll('[data-scope-action="deactivate"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.scopeId;
        const rs = _MOCK_LS_ROLE_SCOPES.find(r => r.id === id);
        if (rs && rs.status === 'ACTIVE') {
          rs.status = 'INACTIVE';
          renderLoansContent(section, containerId);
        }
      });
    });
    return;
  }

  // ── PERMISSIONS ────────────────────────────────────────────────────────────
  if (section === 'ls-permissions') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsPermissionsSection();

    // Modal helpers
    const overlay = el.querySelector('#lsp-modal-overlay');
    function openModal() { overlay.style.display = "flex"; }
    function closeModal() {
      overlay.style.display = "none";
      el.querySelector('#lsp-f-resource').value = '';
      el.querySelector('#lsp-f-action').value = '';
      el.querySelector('#lsp-f-scope').value = '';
      el.querySelector('#lsp-f-key').value = '';
      el.querySelector('#lsp-f-desc').value = '';
    }
    // Auto-generate policy key
    function updateKey() {
      const scope = (el.querySelector('#lsp-f-scope').value || '').toLowerCase();
      const res   = el.querySelector('#lsp-f-resource').value.trim().toLowerCase().replace(/\s+/g, '_');
      const act   = el.querySelector('#lsp-f-action').value.trim().toLowerCase().replace(/\s+/g, '_');
      el.querySelector('#lsp-f-key').value = [scope, res, act].filter(Boolean).join('.');
    }
    el.querySelector('#lsp-f-resource').addEventListener('input', updateKey);
    el.querySelector('#lsp-f-action').addEventListener('input', updateKey);
    el.querySelector('#lsp-f-scope').addEventListener('change', updateKey);

    el.querySelector('#lsp-new-btn').addEventListener('click', openModal);
    el.querySelector('#lsp-modal-cancel').addEventListener('click', closeModal);
    overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
    el.querySelector('#lsp-modal-create').addEventListener('click', () => {
      const res  = el.querySelector('#lsp-f-resource').value.trim();
      const act  = el.querySelector('#lsp-f-action').value.trim();
      const scope = el.querySelector('#lsp-f-scope').value;
      const key  = el.querySelector('#lsp-f-key').value.trim();
      const desc = el.querySelector('#lsp-f-desc').value.trim();
      if (!res || !act || !scope) return;
      _MOCK_LS_PERMISSIONS.push({ key, resource: res, action: act, scope, desc });
      closeModal();
      renderLoansContent(section, containerId);
    });

    // Filters
    function applyPermFilters() {
      const search = (el.querySelector('#lsp-filter-search').value || '').toLowerCase();
      const scope  = el.querySelector('#lsp-filter-scope').value;
      const res    = el.querySelector('#lsp-filter-resource').value;
      let visible = 0;
      el.querySelectorAll('#lsp-tbody tr').forEach(row => {
        const key = row.dataset.permKey || '';
        const p = _MOCK_LS_PERMISSIONS.find(x => x.key === key);
        if (!p) { row.hidden = true; return; }
        const matchSearch = !search || p.key.toLowerCase().includes(search) || p.resource.toLowerCase().includes(search);
        const matchScope  = !scope  || p.scope === scope;
        const matchRes    = !res    || p.resource === res;
        row.hidden = !(matchSearch && matchScope && matchRes);
        if (!row.hidden) visible++;
      });
      const countEl = el.querySelector('#lsp-count');
      if (countEl) countEl.textContent = visible;
    }
    el.querySelector('#lsp-filter-search').addEventListener('input', applyPermFilters);
    el.querySelector('#lsp-filter-scope').addEventListener('change', applyPermFilters);
    el.querySelector('#lsp-filter-resource').addEventListener('change', applyPermFilters);

    // Edit/Delete
    el.querySelectorAll('[data-perm-action="delete"]').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.permKey;
        const idx = _MOCK_LS_PERMISSIONS.findIndex(p => p.key === key);
        if (idx !== -1) { _MOCK_LS_PERMISSIONS.splice(idx, 1); renderLoansContent(section, containerId); }
      });
    });
    return;
  }

    // ── USERS ─────────────────────────────────────────────────────────────────
  if (section === 'ls-users') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildLsUsersSection();
    wireUsersList(el, containerId);
    return;
  }

    // ── ORGANISATIONS ──────────────────────────────────────────────────────────
  if (section === 'gs-organisations') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildOrganisationsSection();
    const createBtn = el.querySelector('#org-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => openOrganisationForm(containerId, null));
    el.querySelectorAll('[data-org-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.orgId);
        const org = _MOCK_ORGANISATIONS.find(o => o.id === id);
        if (org) openOrganisationForm(containerId, org);
      });
    });
    return;
  }

  // ── CURRENCY DEFINITION ────────────────────────────────────────────────────
  if (section === 'gs-currency') {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = buildCurrencyDefinitionSection();
    const createBtn = el.querySelector('#curr-create-btn');
    if (createBtn) createBtn.addEventListener('click', () => openCurrencyDefinitionForm(containerId, null));
    el.querySelectorAll('[data-curr-id]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.currId);
        const curr = _MOCK_CURRENCIES_GLOBAL.find(c => c.id === id);
        if (curr) openCurrencyDefinitionForm(containerId, curr);
      });
    });
    return;
  }

    // Fallback
  const el = document.getElementById(containerId);
  if (el) el.innerHTML = '<div style="padding:32px;text-align:center;color:var(--text-muted)">Section not found in loans module.</div>';
}

function openFeeDefForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};
  const isEdit = !!d.id;

  el.innerHTML = `
    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="feedef-back-btn" title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Fee Definition</div>
          <div class="fee-form-subheading">Configure fee settings</div>
        </div>
      </div>
      <button class="btn-fee-save">
        ${_I_SAVE_14}
        Save
      </button>
    </div>

    <!-- Core Information -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Core Information</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Name</label>
          <input class="fee-form-input" type="text" id="ff-name"
            placeholder="Enter fee name" value="${d.name || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Fee version</label>
          <input class="fee-form-input" type="text" id="ff-version"
            placeholder="e.g. v1.0" value="${d.version || ''}"/>
        </div>
      </div>
    </div>

    <!-- Scope & Trigger -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Scope &amp; Trigger</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Scope</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-scope">
              <option ${(d.scope||'Loan Product')==='Loan Product'?'selected':''}>Loan Product</option>
              <option ${(d.scope||'')==='Account'?'selected':''}>Account</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Trigger event</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-trigger">
              <option ${(d.trigger||'Up Front')==='Up Front'?'selected':''}>Up Front</option>
              <option ${(d.trigger||'')==='Per Instalment'?'selected':''}>Per Instalment</option>
              <option ${(d.trigger||'')==='Periodic'?'selected':''}>Periodic</option>
              <option ${(d.trigger||'')==='Event Based'?'selected':''}>Event Based</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Calculation -->
    <div class="fee-form-section" id="ff-calc-section">
      <div class="fee-form-section-title">Calculation</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Calculation method</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-method">
              <option ${(d.method||'Fixed')==='Fixed'?'selected':''}>Fixed</option>
              <option ${(d.method||'')==='Percentage'?'selected':''}>Percentage</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field" id="ff-fixed-amt-wrap">
          <label class="fee-form-label">Fixed amount</label>
          <input class="fee-form-input" type="text" id="ff-fixed-amt" placeholder="e.g. 50" value="${d.fixedAmt||''}"/>
        </div>
        <div class="fee-form-field" id="ff-pct-base-wrap" style="display:none">
          <label class="fee-form-label">Calculation base</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-pct-base">
              <option>Loan Amount</option>
              <option>Outstanding Balance</option>
              <option>Overdue Amount</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Fixed extra row: Currency + EIR -->
      <div class="fee-form-row" id="ff-fixed-row2">
        <div class="fee-form-field">
          <label class="fee-form-label">Currency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-currency">
              <option>EUR</option><option>USD</option><option>GBP</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Included in EIR calculation</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-eir">
              <option>Yes</option><option>No</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Percentage extra rows -->
      <div id="ff-pct-rows" style="display:none">
        <div class="fee-form-row">
          <div class="fee-form-field">
            <label class="fee-form-label">Rate (%)</label>
            <input class="fee-form-input" type="text" id="ff-rate" placeholder="e.g. 2.5" value="${d.rate||''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">Min. amount</label>
            <input class="fee-form-input" type="text" id="ff-min" placeholder="Optional" value="${d.minAmt||''}"/>
          </div>
        </div>
        <div class="fee-form-row">
          <div class="fee-form-field">
            <label class="fee-form-label">Max. amount</label>
            <input class="fee-form-input" type="text" id="ff-max" placeholder="Optional" value="${d.maxAmt||''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">Included in EIR calculation</label>
            <div class="fee-select-wrap">
              <select class="fee-form-select" id="ff-eir-pct">
                <option>Yes</option><option>No</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Validity & Status -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Validity &amp; Status</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Valid from</label>
          <input class="fee-form-input" type="text" id="ff-from" placeholder="Select date" value="${d.validFrom||''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Valid to</label>
          <input class="fee-form-input" type="text" id="ff-to" value="${d.validTo||'31.12.2099'}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-status">
              <option ${(d.status||'Pending')==='Pending'?'selected':''}>Pending</option>
              <option ${(d.status||'')==='Active'?'selected':''}>Active</option>
              <option ${(d.status||'')==='Inactive'?'selected':''}>Inactive</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field"></div>
      </div>
    </div>`;

  // Back button
  el.querySelector('#feedef-back-btn').addEventListener('click', () => {
    renderLoansContent(containerId, 'loans', 'feedef', 'Fee Definitions', 'Manage fee definitions for loan products');
  });

  // Method toggle
  function toggleMethod() {
    const method = el.querySelector('#ff-method').value;
    const isFixed = method === 'Fixed';
    el.querySelector('#ff-fixed-amt-wrap').style.display  = isFixed ? '' : 'none';
    el.querySelector('#ff-fixed-row2').style.display      = isFixed ? '' : 'none';
    el.querySelector('#ff-pct-base-wrap').style.display   = isFixed ? 'none' : '';
    el.querySelector('#ff-pct-rows').style.display        = isFixed ? 'none' : '';
  }
  el.querySelector('#ff-method').addEventListener('change', toggleMethod);
  // Set initial state from data
  if (d.method === 'Percentage') toggleMethod();
}

function openPenaltyForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => (String(val||'') === option) ? 'selected' : '';

  // Today's date in YYYY-MM-DD for input[type=date]
  const todayISO = new Date().toISOString().slice(0, 10);

  el.innerHTML = `
    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="pf-back-btn" title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Penalty Definition</div>
          <div class="fee-form-subheading">Manage penalty definition</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <button class="btn-fee-cancel" id="pf-cancel-btn" style="padding:7px 18px;border:1px solid var(--border1,#e2e8f0);background:var(--bg,#fff);color:var(--fg,#1e293b);border-radius:6px;font-size:13px;font-weight:500;cursor:pointer">Cancel</button>
        <button class="btn-fee-reset" id="pf-reset-btn" style="padding:7px 18px;border:1px solid var(--border1,#e2e8f0);background:var(--bg,#fff);color:var(--fg,#1e293b);border-radius:6px;font-size:13px;font-weight:500;cursor:pointer">Reset</button>
        <button class="btn-fee-save" id="pf-save-btn">
          ${_I_SAVE_14}
          Save
        </button>
      </div>
    </div>

    <!-- Core Information -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Core Information</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Name</label>
          <input class="fee-form-input" type="text" id="pf-name"
            placeholder="Enter penalty definition name"
            value="${d.name || ''}"/>
        </div>
      </div>
    </div>

    <!-- Calculation -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Calculation</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Method</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-method">
              <option ${opt(d.method,'Actual Actual')} value="Actual Actual">Actual Actual</option>
              <option ${opt(d.method,'Actual/365')}   value="Actual/365">Actual/365</option>
              <option ${opt(d.method,'Actual/360')}   value="Actual/360">Actual/360</option>
              <option ${opt(d.method,'30/360')}       value="30/360">30/360</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Frequency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-freq">
              <option ${opt(d.freq,'Daily')}   value="Daily">Daily</option>
              <option ${opt(d.freq,'Monthly')} value="Monthly">Monthly</option>
              <option ${opt(d.freq,'Yearly')}  value="Yearly">Yearly</option>
              <option ${opt(d.freq,'Once')}    value="Once">Once</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Penalty Base</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-base">
              <option ${opt(d.base,'Due Principal')}    value="Due Principal">Due Principal</option>
              <option ${opt(d.base,'Total Due Amount')} value="Total Due Amount">Total Due Amount</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Penalty Rate</label>
          <input class="fee-form-input" type="number" id="pf-rate"
            placeholder="e.g. 12.5" min="0" max="100" step="0.01"
            value="${d.rate !== undefined ? d.rate : ''}"/>
        </div>
      </div>
    </div>

    <!-- Validity & Status -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Validity &amp; Status</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Valid From</label>
          <input class="fee-form-input" type="date" id="pf-valid-from"
            value="${d.validFrom || todayISO}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Valid To</label>
          <input class="fee-form-input" type="date" id="pf-valid-to"
            value="${d.validTo || '2099-12-31'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-status">
              <option ${opt(d.status,'Active')}   value="Active">Active</option>
              <option ${opt(d.status,'Pending')}  value="Pending">Pending</option>
              <option ${opt(d.status,'Inactive')} value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;

  // ── Wire buttons ────────────────────────────────────────────────────────────
  const goBack = () => {
    // Find the module by scanning moduleMap for a contentId that matches
    let foundMod = null;
    if (typeof moduleMap !== 'undefined') {
      for (const [key, val] of Object.entries(moduleMap)) {
        if (val.contentId === containerId) { foundMod = key; break; }
      }
    }
    if (foundMod && typeof renderLoansContent === 'function') {
      renderLoansContent(containerId, foundMod, 'penalty', 'Penalty Definitions', 'Manage penalty definitions');
    }
  };

  el.querySelector('#pf-back-btn').addEventListener('click', goBack);
  el.querySelector('#pf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#pf-reset-btn').addEventListener('click', () => {
    el.querySelector('#pf-name').value = d.name || '';
    el.querySelector('#pf-method').value = d.method || 'Actual Actual';
    el.querySelector('#pf-freq').value = d.freq || 'Daily';
    el.querySelector('#pf-base').value = d.base || 'Due Principal';
    el.querySelector('#pf-rate').value = d.rate !== undefined ? d.rate : '';
    el.querySelector('#pf-valid-from').value = d.validFrom || todayISO;
    el.querySelector('#pf-valid-to').value = d.validTo || '2099-12-31';
    el.querySelector('#pf-status').value = d.status || 'Active';
  });
  el.querySelector('#pf-save-btn').addEventListener('click', () => {
    const name = el.querySelector('#pf-name').value.trim();
    if (!name) {
      el.querySelector('#pf-name').style.borderColor = '#ef4444';
      el.querySelector('#pf-name').focus();
      return;
    }
    goBack();
  });

  // Update sidebar active state
  if (typeof moduleMap !== 'undefined') {
    for (const [, val] of Object.entries(moduleMap)) {
      if (val.contentId === containerId && val.pageId) {
        const page = document.getElementById(val.pageId);
        if (page) {
          page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
          const navItem = page.querySelector('.nav-item[data-section="penalty"]');
          if (navItem) navItem.classList.add('active');
        }
        break;
      }
    }
  }
}
function openLoanProductForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => (val||'') === option ? 'selected' : '';
  window._lpCustTypes = [];
  window._lpCurrencies = [];
  window._lpInterestRates = [];
  window._lpFees = [];

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Loan Management</span><span class="bc-sep">›</span>
      <span>Loan Product</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Loan Product' : 'Create Loan Product'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content" data-module="${mod}"
          data-section="loanprod" data-title="Loan Product"
          data-subtitle="Define and configure loan product templates" title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Loan Product</div>
          <div class="fee-form-subheading">Configure loan product</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="loan-product-save">
        ${_I_SAVE_14}
        Save
      </button>
    </div>

    <!-- Core Information -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Core Information</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Code</label>
          <input class="fee-form-input" type="text" id="lp-code"
            placeholder="Enter product code" value="${d.code || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Name</label>
          <input class="fee-form-input" type="text" id="lp-name"
            placeholder="Enter product name" value="${d.name || ''}"/>
        </div>
      </div>
    </div>

    <!-- Definitions -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Definitions</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Category</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-category">
              <option value="">Select an item</option>
              <option>Consumer Loan</option>
              <option>Mortgage</option>
              <option>BNPL</option>
              <option>Business Loan</option>
              <option>Trade Finance</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Purpose</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-purpose">
              <option>BNPL</option>
              <option>Personal</option>
              <option>Business</option>
              <option>Mortgage</option>
              <option>Vehicle</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label" style="display:flex;align-items:center;">
            Accounting Method
            <button class="help-btn" data-action="show-accounting-help" title="Learn about Cash vs Accrual accounting">?</button>
          </label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-accounting" onchange="lpToggleAccrualFreq(this.value)">
              <option value="">Select accounting method</option>
              <option>Accrual method</option>
              <option>Cash method</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Penalty Definition</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-penalty">
              <option value="">Select an item</option>
              <option>Default Penalty for Missed Instalment</option>
              <option>Penalty on NPL Reclassification</option>
              <option>Standard Penalty interest for late payment</option>
              <option>Early Settlement Penalty</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row" id="lp-accrual-freq-row" style="display:none;">
        <div class="fee-form-field">
          <label class="fee-form-label">Accruals Posting Frequency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-accrual-freq">
              <option>Daily</option>
              <option>Monthly</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field"></div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Collection Method</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-collection">
              <option value="">Select an item</option>
              <option>Standard collection order (Fee > Penalty > Interest > Principal)</option>
              <option>Standard collection order (Oldest first)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Allowed Customer Types -->
    <div class="lp-sub-panel">
      <div class="lp-sub-header">
        <span class="lp-sub-title">Allowed Customer Types</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="fee-select-wrap" style="width:180px;margin-bottom:0;">
            <select class="fee-form-select" id="lp-cust-type-sel" style="padding:7px 30px 7px 10px;font-size:12px;">
              <option value="">Select customer type</option>
              <option>Individual</option>
              <option>Corporate</option>
              <option>SME</option>
              <option>Non-Profit</option>
            </select>
          </div>
          <button class="lp-add-btn" data-action="lp-add-cust-type">Add</button>
        </div>
      </div>
      <div id="lp-cust-body">
        <div class="lp-sub-empty">No customer types added yet. Select a type and click "Add" to add one.</div>
      </div>
    </div>

    <!-- Product Currencies -->
    <div class="lp-sub-panel">
      <div class="lp-sub-header">
        <span class="lp-sub-title">Product Currencies</span>
        <button class="lp-add-btn" data-action="lp-add-currency">
          ${_I_PLUS_12B}
          Add Currency
        </button>
      </div>
      <div id="lp-currencies-body">
        <div class="lp-sub-empty">No currencies added yet. Click "Add Currency" to create the first one.</div>
      </div>
    </div>

    <!-- Product Interest Rates -->
    <div class="lp-sub-panel">
      <div class="lp-sub-header">
        <span class="lp-sub-title">Product Interest Rates</span>
        <button class="lp-add-btn-link" data-action="lp-add-interest-rate">
          + Add Interest Rate
        </button>
      </div>
      <div id="lp-interest-rates-body">
        <div class="lp-sub-empty">No interest rates configured yet. Add currencies first, then click "Add Interest Rate".</div>
      </div>
    </div>

    <!-- Product Fees -->
    <div class="lp-sub-panel">
      <div class="lp-sub-header">
        <span class="lp-sub-title">Product Fees</span>
        <button class="lp-add-btn" data-action="lp-add-fee">
          ${_I_PLUS_12B}
          + Add Fee
        </button>
      </div>
      <div id="lp-fees-body">
        <div class="lp-sub-empty">No fees added yet. Click "+ Add Fee" to select fees.</div>
      </div>
    </div>

    <!-- Interest Calculation & Repayment Schedule -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Interest Calculation method &amp; Repayment Schedule</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Repayment Schedule Pattern</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-rep-pattern">
            <option>Equal Instalment</option><option>Equal Principal</option>
            <option>Balloon</option><option>Interest Only</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Calculation Method</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-int-method">
            <option>Proportional</option><option>Actual/365</option>
            <option>Actual/360</option><option>Actual Actual</option><option>30/360</option>
          </select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Day Count Convention</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-day-count">
            <option>30/360</option><option>Actual/365</option>
            <option>Actual/360</option><option>Actual/Actual</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Calculation Frequency</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-int-freq">
            <option>Monthly</option><option>Daily</option>
            <option>Quarterly</option><option>Annual</option>
          </select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Short Month Handling</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-short-month">
            <option>Fixed Day of Month</option><option>End of Month</option><option>Anniversary</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Can Be Irregular</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-irregular">
            <option>Yes</option><option>No</option>
          </select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Irregular Period Adjustment Method</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-irreg-adj">
            <option>True Equal Installment</option><option>Adjusted Last Instalment</option><option>None</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Non-Working Day Adjustment</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-nonwork">
            <option>No Adjustment</option><option>Next Working Day</option><option>Previous Working Day</option>
          </select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Repayment Rounding Mode</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-rep-round">
            <option>Round to Nearest</option><option>Round Up</option><option>Round Down</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Calculated At</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-int-timing">
            <option>End of Period</option><option>Start of Period</option>
          </select></div>
        </div>
      </div>
    </div>

    <!-- Instalments -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Instalments</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Min Instalment Count</label>
          <input class="fee-form-input" type="number" id="lp-min-inst" placeholder="Enter min instalment count" min="1"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Max Instalment Count</label>
          <input class="fee-form-input" type="number" id="lp-max-inst" placeholder="Enter max instalment count" min="1"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Default Instalment Count</label>
          <input class="fee-form-input" type="number" id="lp-def-inst" placeholder="Enter default instalment count" min="1"/>
        </div>
        <div class="fee-form-field"></div>
      </div>
    </div>

    <!-- Grace Period -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Grace Period</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Grace Period Possible</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="lp-grace">
              <option>No</option><option>Yes</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field"></div>
      </div>
    </div>

    <!-- Flags -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Flags</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Adjust Last Instalment</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-adj-last">
            <option>Yes</option><option>No</option></select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Collateral Required</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-collateral">
            <option>No</option><option>Yes</option></select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Down Payment Required</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-down-pmt">
            <option>No</option><option>Yes</option></select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Deposit Required</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-deposit">
            <option>No</option><option>Yes</option></select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Insurance Required</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-insurance">
            <option>No</option><option>Yes</option></select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Early Repayment Possible</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-early-rep">
            <option>Yes</option><option>No</option></select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Principal Prepayment Possible</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-prepayment">
            <option>Yes</option><option>No</option></select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Backdated Disbursement Possible</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-backdate">
            <option>Yes</option><option>No</option></select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Initial Loan Account State</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-init-state">
            <option>Active</option><option>Pending Approval</option><option>Approved</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Loan To Value Limit (%)</label>
          <input class="fee-form-input" type="number" id="lp-ltv" placeholder="Enter loan to value limit" min="0" max="100" step="0.01"/>
        </div>
      </div>
    </div>

    <!-- Provisioning -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Provisioning</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Default PD Value (%)</label>
          <input class="fee-form-input" type="number" id="lp-pd" placeholder="Enter PD percentage" min="0" max="100" step="0.01"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Default LGD Value (%)</label>
          <input class="fee-form-input" type="number" id="lp-lgd" placeholder="Enter LGD percentage" min="0" max="100" step="0.01"/>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Provisioning Method</label>
          <div class="fee-select-wrap" style="max-width:100%;">
            <select class="fee-form-select" id="lp-prov-method">
              <option>Small Portfolio</option>
              <option>Individual</option>
              <option>Collective</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Validity & Status -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Validity &amp; Status</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Valid From</label>
          <input class="fee-form-input" type="date" id="lp-valid-from" value="${data && data.validFrom ? data.validFrom : '2025-10-01'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Valid To</label>
          <input class="fee-form-input" type="date" id="lp-valid-to" value="${data && data.validTo ? data.validTo : '2099-12-31'}"/>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap" style="max-width:100%;">
            <select class="fee-form-select" id="lp-status">
              <option${(!data || !data.status || data.status==='Active')?' selected':''}>Active</option>
              <option${(data && data.status==='Inactive')?' selected':''}>Inactive</option>
              <option${(data && data.status==='Pending')?' selected':''}>Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Audit Trail -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Audit Trail (read-only)</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Created At</label>
          <input class="fee-form-input" type="text" id="lp-created-at" readonly style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0);" value="${data && data.createdAt ? data.createdAt : '-'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Created By</label>
          <input class="fee-form-input" type="text" id="lp-created-by" readonly style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0);" value="${data && data.createdBy ? data.createdBy : '-'}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Updated At</label>
          <input class="fee-form-input" type="text" id="lp-updated-at" readonly style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0);" value="${data && data.updatedAt ? data.updatedAt : '-'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Updated By</label>
          <input class="fee-form-input" type="text" id="lp-updated-by" readonly style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0);" value="${data && data.updatedBy ? data.updatedBy : '-'}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Deleted At</label>
          <input class="fee-form-input" type="text" id="lp-deleted-at" readonly style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0);" value="${data && data.deletedAt ? data.deletedAt : '-'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Deleted By</label>
          <input class="fee-form-input" type="text" id="lp-deleted-by" readonly style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0);" value="${data && data.deletedBy ? data.deletedBy : '-'}"/>
        </div>
      </div>
    </div>

    <!-- Accounting Method Help Modal -->
    <div class="lp-help-overlay" id="lp-accounting-help">
      <div class="lp-help-box">
        <div class="lp-help-title">Cash vs Accruals Accounting</div>
        <div class="lp-help-sub">Accounting methodologies</div>
        <div class="lp-help-text">
          OneFor Core Banking suite supports two main accounting methodologies you can choose from based on your internal operations:
          <ul><li>Cash</li><li>Accruals based accounting</li></ul>
          The key difference between the two methodologies is the moment when income or expenses are recognised in the General Ledger (GL).<br><br>
          You can select the methodology for each of your products independently.<br><br>
          While <strong>cash accounting</strong> recognises incomes or expenses only when a payment is made or received, <strong>accruals accounting</strong> recognises them at the moment they accrue for the organisation, regardless of whether a cash transaction occurs or not.
        </div>

        <div class="lp-help-section-title">Cash-based accounting</div>
        <div class="lp-help-text">
          With this methodology, income is recognised when cash is received — that is, when a client actually pays a bill or interest — and an expense is recognised when cash is paid, that is, when the organisation pays a bill, not when the bill is received.<br><br>
          <em>Example: On May 1, 2010, Company A borrowed USD 100,000 from our institution with a 12% yearly interest rate and pays off the loan in full at the end of June.</em>
        </div>
        <div class="lp-help-text"><strong>Journal entry on May 1, 2010</strong></div>
        <table class="lp-help-journal">
          <thead><tr><th>Debit</th><th>Amount</th><th>Credit</th><th>Amount</th></tr></thead>
          <tbody><tr><td>Loan Portfolio</td><td>100,000</td><td>Cash</td><td>100,000</td></tr></tbody>
        </table>
        <div class="lp-help-text"><strong>Payment received on June 30, 2010</strong></div>
        <table class="lp-help-journal">
          <thead><tr><th>Debit</th><th>Amount</th><th>Credit</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Cash</td><td>102,000</td><td>Loan Portfolio</td><td>100,000</td></tr>
            <tr><td></td><td></td><td>Interest from Loan Portfolio</td><td>2,000</td></tr>
          </tbody>
        </table>

        <div class="lp-help-section-title">Accrual-based accounting</div>
        <div class="lp-help-text">
          Under accrual accounting, income and expenses are recognised when they are accrued, not when the money is actually exchanged.<br><br>
          <strong>Income</strong> is recognized when both conditions are met:
          <ul>
            <li>Income is earned: products are delivered or services are provided.</li>
            <li>Income is realised (cash is received) or realisable (it is reasonable to expect that cash will be received).</li>
          </ul>
          <strong>Expenses</strong> are recognised in the period when they occur, and not only when they are paid.<br><br>
          <em>Example: On May 1, 2010, Company A borrowed USD 100,000 with a 12% yearly interest rate and pays off the loan in full at the end of June.</em>
        </div>
        <div class="lp-help-text"><strong>Journal entry on May 1, 2010</strong></div>
        <table class="lp-help-journal">
          <thead><tr><th>Debit</th><th>Amount</th><th>Credit</th><th>Amount</th></tr></thead>
          <tbody><tr><td>Loan Portfolio</td><td>100,000</td><td>Cash</td><td>100,000</td></tr></tbody>
        </table>
        <div class="lp-help-text"><strong>Interest posted to account on May 31, 2010</strong></div>
        <table class="lp-help-journal">
          <thead><tr><th>Debit</th><th>Amount</th><th>Credit</th><th>Amount</th></tr></thead>
          <tbody><tr><td>Interest Receivable</td><td>1,000</td><td>Interest Income</td><td>1,000</td></tr></tbody>
        </table>
        <div class="lp-help-text" style="color:#6b7a8d;font-size:12px;">( USD 100,000 × 12% × 1/12 = USD 1,000 for this month )</div>
        <div class="lp-help-text"><strong>Interest posted to account on June 30, 2010</strong></div>
        <table class="lp-help-journal">
          <thead><tr><th>Debit</th><th>Amount</th><th>Credit</th><th>Amount</th></tr></thead>
          <tbody><tr><td>Interest Receivable</td><td>1,000</td><td>Interest Income</td><td>1,000</td></tr></tbody>
        </table>
        <div class="lp-help-text" style="color:#6b7a8d;font-size:12px;">( USD 100,000 × 12% × 1/12 = USD 1,000 for this month )</div>
        <div class="lp-help-text"><strong>Payment received on June 30, 2010</strong></div>
        <table class="lp-help-journal">
          <thead><tr><th>Debit</th><th>Amount</th><th>Credit</th><th>Amount</th></tr></thead>
          <tbody>
            <tr><td>Cash</td><td>102,000</td><td>Loan Portfolio</td><td>100,000</td></tr>
            <tr><td></td><td></td><td>Interest Receivable</td><td>2,000</td></tr>
          </tbody>
        </table>

        <div class="lp-help-section-title">Interest accrual methods in accounting</div>
        <div class="lp-help-text">
          You can choose between <strong>Daily</strong> and <strong>Monthly</strong> interest accrual methods to determine when the interest accrued is booked for your loan product.
        </div>

        <div class="lp-help-close-row">
          <button class="btn-fee-save" data-action="close-accounting-help">Close</button>
        </div>
      </div>
    </div>`;

  // Sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="loanprod"]');
  if (navItem) navItem.classList.add('active');
}

// ── ACCOUNT/DEPOSIT PRODUCT FORM ──────────────────────────────────────────────
function openAccProductForm(mod, backSection, data) {
  const moduleMap = window._moduleMap;
  const m = moduleMap ? moduleMap[mod] : null;
  if (!m) return;
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => (String(val||'')) === String(option) ? 'selected' : '';

  // per-session state
  window._apCustTypes = window._apCustTypes || [];
  window._apFees      = window._apFees      || [];
  if (!isEdit) { window._apCustTypes = []; window._apFees = []; }

  const isDeposit = (backSection === 'depprod');
  const moduleLabel = isDeposit ? 'Accounts & Deposits' : 'Accounts & Deposits';
  const listLabel   = isDeposit ? 'Deposit Product Definitions' : 'Account Product Definitions';

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>${moduleLabel}</span><span class="bc-sep">›</span>
      <span>${listLabel}</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Product' : 'Create Product'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content" data-module="${mod}"
          data-section="${backSection}"
          data-title="${listLabel}"
          data-subtitle="Manage account and deposit product templates"
          title="Back">${_I_BACK_14}</button>
        <div>
          <div class="fee-form-heading">${isEdit ? 'Edit' : 'Create'} Account/Deposit Product</div>
          <div class="fee-form-subheading">Configure product parameters</div>
        </div>
      </div>
      <button class="btn-fee-save" id="ap-save-btn">${_I_SAVE_14} Save</button>
    </div>

    <!-- Identification -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Identification</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Product Code <span style="color:#e74c3c">*</span></label>
          <input class="fee-form-input" type="text" id="ap-code"
            placeholder="e.g. CA-STD-001" value="${d.code || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Product Name <span style="color:#e74c3c">*</span></label>
          <input class="fee-form-input" type="text" id="ap-name"
            placeholder="Enter product name" value="${d.name || ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Product Category <span style="color:#e74c3c">*</span></label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-category" onchange="apToggleCategoryFields(this.value)">
              <option value="">Select a category</option>
              <option ${opt(d.category,'Current Account')}>Current Account</option>
              <option ${opt(d.category,'Savings Account')}>Savings Account</option>
              <option ${opt(d.category,'Term Deposit')}>Term Deposit</option>
              <option ${opt(d.category,'Fixed Deposit')}>Fixed Deposit</option>
              <option ${opt(d.category,'Overdraft')}>Overdraft</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-status">
              <option ${opt(d.status,'Pending')}>Pending</option>
              <option ${opt(d.status,'Active')}>Active</option>
              <option ${opt(d.status,'Closed')}>Closed</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Description</label>
          <textarea class="fee-form-input" id="ap-desc" rows="3"
            placeholder="Enter product description" style="resize:vertical">${d.description || ''}</textarea>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Currency Mode</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-currency-mode">
              <option ${opt(d.currencyMode,'Single')}>Single</option>
              <option ${opt(d.currencyMode,'Multi-currency')}>Multi-currency</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field" id="ap-currency-field">
          <label class="fee-form-label">Currency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-currency">
              ${['EUR','USD','GBP','CHF','JPY','AUD','CAD','SEK','NOK','DKK'].map(c=>`<option ${opt(d.currency,c)}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Allowed Customer Types -->
    <div class="lp-sub-panel">
      <div class="lp-sub-header">
        <span class="lp-sub-title">Allowed Customer Types</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <div class="fee-select-wrap" style="width:180px;margin-bottom:0;">
            <select class="fee-form-select" id="ap-cust-type-sel" style="padding:7px 30px 7px 10px;font-size:12px;">
              <option value="">Select customer type</option>
              <option>Individual</option>
              <option>Corporate</option>
              <option>SME</option>
              <option>Non-Profit</option>
            </select>
          </div>
          <button class="lp-add-btn" id="ap-add-cust-btn">Add</button>
        </div>
      </div>
      <div id="ap-cust-body">
        <div class="lp-sub-empty">No customer types added yet. Select a type and click "Add".</div>
      </div>
    </div>

    <!-- Interest -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Interest</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Rate Type</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-int-type" onchange="apToggleVariableRate(this.value)">
              <option ${opt(d.intType,'Fixed')}>Fixed</option>
              <option ${opt(d.intType,'Variable')}>Variable</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Rate (%)</label>
          <input class="fee-form-input" type="number" id="ap-int-rate"
            placeholder="e.g. 2.50" min="0" max="100" step="0.001"
            value="${d.intRate !== undefined ? d.intRate : ''}"/>
        </div>
      </div>
      <div class="fee-form-row" id="ap-variable-row" style="${(d.intType==='Variable') ? '' : 'display:none'}">
        <div class="fee-form-field">
          <label class="fee-form-label">Reference Rate</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-ref-rate">
              <option>EURIBOR 3M</option>
              <option>EURIBOR 6M</option>
              <option>EURIBOR 12M</option>
              <option>SOFR</option>
              <option>SONIA</option>
              <option>Base Rate</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Spread (%)</label>
          <input class="fee-form-input" type="number" id="ap-spread"
            placeholder="e.g. 0.50" step="0.001"
            value="${d.spread !== undefined ? d.spread : ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Calculation Basis</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-calc-basis">
              <option ${opt(d.calcBasis,'Actual/365')}>Actual/365</option>
              <option ${opt(d.calcBasis,'Actual/360')}>Actual/360</option>
              <option ${opt(d.calcBasis,'30/360')}>30/360</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Compounding Frequency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-compound-freq">
              <option ${opt(d.compoundFreq,'Daily')}>Daily</option>
              <option ${opt(d.compoundFreq,'Monthly')}>Monthly</option>
              <option ${opt(d.compoundFreq,'Quarterly')}>Quarterly</option>
              <option ${opt(d.compoundFreq,'Annually')}>Annually</option>
              <option ${opt(d.compoundFreq,'At Maturity')}>At Maturity</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Capitalisation Frequency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-cap-freq">
              <option ${opt(d.capFreq,'Monthly')}>Monthly</option>
              <option ${opt(d.capFreq,'Quarterly')}>Quarterly</option>
              <option ${opt(d.capFreq,'Annually')}>Annually</option>
              <option ${opt(d.capFreq,'At Maturity')}>At Maturity</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Negative Interest Allowed</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-neg-int">
              <option ${opt(d.negInt,'No')}>No</option>
              <option ${opt(d.negInt,'Yes')}>Yes</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Fees & Charges -->
    <div class="lp-sub-panel">
      <div class="lp-sub-header">
        <span class="lp-sub-title">Fees &amp; Charges</span>
        <button class="lp-add-btn" id="ap-add-fee-btn">${_I_PLUS_12B} Add Fee</button>
      </div>
      <div id="ap-fees-body">
        <div class="lp-sub-empty">No fees added yet. Click "Add Fee" to define charges.</div>
      </div>
    </div>

    <!-- Term & Maturity (deposits only — shown when category is Term/Fixed Deposit) -->
    <div class="fee-form-section" id="ap-term-section" style="${(d.category==='Term Deposit'||d.category==='Fixed Deposit'||isDeposit) ? '' : 'display:none'}">
      <div class="fee-form-section-title">Term &amp; Maturity</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Minimum Term</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input class="fee-form-input" type="number" id="ap-min-term" min="1"
              placeholder="e.g. 1" value="${d.minTerm || ''}" style="max-width:100px"/>
            <div class="fee-select-wrap" style="margin-bottom:0;min-width:100px">
              <select class="fee-form-select" id="ap-min-term-unit">
                <option ${opt(d.minTermUnit,'Days')}>Days</option>
                <option ${opt(d.minTermUnit,'Months')||(!d.minTermUnit?'selected':'')}>Months</option>
                <option ${opt(d.minTermUnit,'Years')}>Years</option>
              </select>
            </div>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Maximum Term</label>
          <div style="display:flex;gap:8px;align-items:center">
            <input class="fee-form-input" type="number" id="ap-max-term" min="1"
              placeholder="e.g. 60" value="${d.maxTerm || ''}" style="max-width:100px"/>
            <div class="fee-select-wrap" style="margin-bottom:0;min-width:100px">
              <select class="fee-form-select" id="ap-max-term-unit">
                <option ${opt(d.maxTermUnit,'Days')}>Days</option>
                <option ${opt(d.maxTermUnit,'Months')||(!d.maxTermUnit?'selected':'')}>Months</option>
                <option ${opt(d.maxTermUnit,'Years')}>Years</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Rollover at Maturity</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-rollover">
              <option ${opt(d.rollover,'Payout')}>Payout</option>
              <option ${opt(d.rollover,'Auto Principal')}>Auto Principal</option>
              <option ${opt(d.rollover,'Auto Principal + Interest')}>Auto Principal + Interest</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field"></div>
      </div>
    </div>

    <!-- Limits & Controls -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Limits &amp; Controls</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Minimum Opening Balance</label>
          <input class="fee-form-input" type="number" id="ap-min-open"
            placeholder="e.g. 100.00" min="0" step="0.01"
            value="${d.minOpen !== undefined ? d.minOpen : ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Minimum Operating Balance</label>
          <input class="fee-form-input" type="number" id="ap-min-oper"
            placeholder="e.g. 10.00" min="0" step="0.01"
            value="${d.minOper !== undefined ? d.minOper : ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Maximum Balance</label>
          <input class="fee-form-input" type="number" id="ap-max-bal"
            placeholder="e.g. 500000.00" min="0" step="0.01"
            value="${d.maxBal !== undefined ? d.maxBal : ''}"/>
        </div>
        <div class="fee-form-field" id="ap-overdraft-field">
          <label class="fee-form-label">Overdraft Limit</label>
          <input class="fee-form-input" type="number" id="ap-od-limit"
            placeholder="e.g. 5000.00" min="0" step="0.01"
            value="${d.odLimit !== undefined ? d.odLimit : ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Daily Debit Limit</label>
          <input class="fee-form-input" type="number" id="ap-daily-debit"
            placeholder="e.g. 10000.00" min="0" step="0.01"
            value="${d.dailyDebit !== undefined ? d.dailyDebit : ''}"/>
        </div>
        <div class="fee-form-field"></div>
      </div>
    </div>

    <!-- Flags -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Flags</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">KYC Level Required</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-kyc">
              <option ${opt(d.kyc,'Basic')}>Basic</option>
              <option ${opt(d.kyc,'Standard')||(!d.kyc?'selected':'')}>Standard</option>
              <option ${opt(d.kyc,'Enhanced')}>Enhanced</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Eligible Customer Segments</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ap-segments" multiple
              style="height:72px;padding:4px 8px" title="Hold Ctrl/Cmd to select multiple">
              <option ${(d.segments||[]).includes('Retail')?'selected':''}>Retail</option>
              <option ${(d.segments||[]).includes('SME')?'selected':''}>SME</option>
              <option ${(d.segments||[]).includes('Corporate')?'selected':''}>Corporate</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Min Age Restriction</label>
          <input class="fee-form-input" type="number" id="ap-age-min"
            placeholder="e.g. 18" min="0" max="120"
            value="${d.ageMin !== undefined ? d.ageMin : ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Max Age Restriction</label>
          <input class="fee-form-input" type="number" id="ap-age-max"
            placeholder="e.g. 80 (leave blank for none)" min="0" max="120"
            value="${d.ageMax !== undefined ? d.ageMax : ''}"/>
        </div>
      </div>
    </div>

    <!-- GL Mapping -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">GL Mapping</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">GL Account — Interest Income</label>
          <input class="fee-form-input" type="text" id="ap-gl-int-inc"
            placeholder="e.g. 4001-INT-INC" value="${d.glIntInc || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">GL Account — Interest Expense</label>
          <input class="fee-form-input" type="text" id="ap-gl-int-exp"
            placeholder="e.g. 5001-INT-EXP" value="${d.glIntExp || ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">GL Account — Fee Income</label>
          <input class="fee-form-input" type="text" id="ap-gl-fee-inc"
            placeholder="e.g. 4002-FEE-INC" value="${d.glFeeInc || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">GL Account — Penalty Income</label>
          <input class="fee-form-input" type="text" id="ap-gl-pen-inc"
            placeholder="e.g. 4003-PEN-INC" value="${d.glPenInc || ''}"/>
        </div>
      </div>
    </div>

    <!-- Audit Trail -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Audit Trail (read-only)</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Created At</label>
          <input class="fee-form-input" type="text" readonly
            style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0)"
            value="${d.createdAt || '-'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Created By</label>
          <input class="fee-form-input" type="text" readonly
            style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0)"
            value="${d.createdBy || '-'}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Updated At</label>
          <input class="fee-form-input" type="text" readonly
            style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0)"
            value="${d.updatedAt || '-'}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Updated By</label>
          <input class="fee-form-input" type="text" readonly
            style="background:var(--input-readonly-bg,#f5f7fa);color:var(--text-muted,#8a9ab0)"
            value="${d.updatedBy || '-'}"/>
        </div>
      </div>
    </div>`;

  // ── Wire interactions ──────────────────────────────────────────────────────
  // Category → show/hide Term section & Overdraft field
  window.apToggleCategoryFields = function(cat) {
    const termSec  = el.querySelector('#ap-term-section');
    const odField  = el.querySelector('#ap-overdraft-field');
    const isTermDep = cat === 'Term Deposit' || cat === 'Fixed Deposit';
    const isOD      = cat === 'Overdraft';
    if (termSec) termSec.style.display = isTermDep ? '' : 'none';
    if (odField) odField.style.display = isOD ? '' : '';  // always visible but label hint differs
    if (odField) odField.querySelector('label').textContent = isOD ? 'Overdraft Limit *' : 'Overdraft Limit';
  };
  // Run once on load
  const catSel = el.querySelector('#ap-category');
  if (catSel) window.apToggleCategoryFields(catSel.value);

  // Variable rate toggle
  window.apToggleVariableRate = function(type) {
    const row = el.querySelector('#ap-variable-row');
    if (row) row.style.display = type === 'Variable' ? '' : 'none';
  };

  // Currency mode toggle
  el.querySelector('#ap-currency-mode').addEventListener('change', function() {
    const cf = el.querySelector('#ap-currency-field');
    if (cf) cf.style.display = this.value === 'Multi-currency' ? 'none' : '';
  });

  // Allowed Customer Types sub-panel
  function renderApCustTypes() {
    const body = el.querySelector('#ap-cust-body');
    if (!body) return;
    if (!window._apCustTypes.length) {
      body.innerHTML = '<div class="lp-sub-empty">No customer types added yet. Select a type and click "Add".</div>';
      return;
    }
    body.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead><tr style="background:#f0f4fa">
        <th style="padding:8px 12px;text-align:left;font-weight:600;color:#3a5272">Type</th>
        <th style="padding:8px 12px;width:60px"></th>
      </tr></thead>
      <tbody>${window._apCustTypes.map((t,i) => `
        <tr style="border-bottom:1px solid #f0f4fa">
          <td style="padding:8px 12px">${t}</td>
          <td style="padding:8px 12px;text-align:center">
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;padding:3px 8px;font-size:11px"
              data-ap-del-cust="${i}">${_I_BIN_12}</button>
          </td>
        </tr>`).join('')}
      </tbody></table>`;
    body.querySelectorAll('[data-ap-del-cust]').forEach(btn => {
      btn.addEventListener('click', () => {
        window._apCustTypes.splice(parseInt(btn.dataset.apDelCust), 1);
        renderApCustTypes();
      });
    });
  }
  el.querySelector('#ap-add-cust-btn').addEventListener('click', () => {
    const sel = el.querySelector('#ap-cust-type-sel');
    const val = sel ? sel.value : '';
    if (!val) return;
    if (!window._apCustTypes.includes(val)) {
      window._apCustTypes.push(val);
      renderApCustTypes();
    }
    if (sel) sel.value = '';
  });
  renderApCustTypes();

  // Fees sub-panel
  function renderApFees() {
    const body = el.querySelector('#ap-fees-body');
    if (!body) return;
    if (!window._apFees.length) {
      body.innerHTML = '<div class="lp-sub-empty">No fees added yet. Click "Add Fee" to define charges.</div>';
      return;
    }
    body.innerHTML = `<table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead><tr style="background:#f0f4fa">
        <th style="padding:8px 12px;text-align:left;font-weight:600;color:#3a5272">Fee Name</th>
        <th style="padding:8px 12px;text-align:left;font-weight:600;color:#3a5272">Type</th>
        <th style="padding:8px 12px;text-align:right;font-weight:600;color:#3a5272">Amount / Rate</th>
        <th style="padding:8px 12px;width:60px"></th>
      </tr></thead>
      <tbody>${window._apFees.map((f,i) => `
        <tr style="border-bottom:1px solid #f0f4fa">
          <td style="padding:8px 12px">${f.name}</td>
          <td style="padding:8px 12px">${f.type}</td>
          <td style="padding:8px 12px;text-align:right">${f.amount}</td>
          <td style="padding:8px 12px;text-align:center">
            <button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;padding:3px 8px;font-size:11px"
              data-ap-del-fee="${i}">${_I_BIN_12}</button>
          </td>
        </tr>`).join('')}
      </tbody></table>`;
    body.querySelectorAll('[data-ap-del-fee]').forEach(btn => {
      btn.addEventListener('click', () => {
        window._apFees.splice(parseInt(btn.dataset.apDelFee), 1);
        renderApFees();
      });
    });
  }

  el.querySelector('#ap-add-fee-btn').addEventListener('click', () => {
    // Inline mini-modal inside the panel
    const body = el.querySelector('#ap-fees-body');
    if (body.querySelector('#ap-fee-inline-form')) return; // already open
    const formHtml = `
      <div id="ap-fee-inline-form" style="background:#f8fafc;border:1px solid #d0dce8;border-radius:8px;padding:14px 16px;margin:10px 0;">
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;align-items:end">
          <div>
            <label style="font-size:11px;font-weight:600;color:#3a5272;display:block;margin-bottom:4px">Fee Name</label>
            <input id="ap-fi-name" class="fee-form-input" placeholder="e.g. Monthly Maintenance" style="margin-bottom:0"/>
          </div>
          <div>
            <label style="font-size:11px;font-weight:600;color:#3a5272;display:block;margin-bottom:4px">Type</label>
            <div class="fee-select-wrap" style="margin-bottom:0">
              <select id="ap-fi-type" class="fee-form-select" style="padding:7px 30px 7px 10px;font-size:12px">
                <option>Flat</option><option>Percentage</option><option>Per Transaction</option>
              </select>
            </div>
          </div>
          <div>
            <label style="font-size:11px;font-weight:600;color:#3a5272;display:block;margin-bottom:4px">Amount / Rate</label>
            <input id="ap-fi-amount" class="fee-form-input" type="number" placeholder="e.g. 5.00" min="0" step="0.01" style="margin-bottom:0"/>
          </div>
        </div>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:12px">
          <button id="ap-fi-cancel" style="padding:6px 16px;background:#f0f4fa;color:#3a5272;border:1px solid #c5d8f5;border-radius:6px;font-size:12px;cursor:pointer">Cancel</button>
          <button id="ap-fi-add" style="padding:6px 16px;background:#1a6ab5;color:#fff;border:none;border-radius:6px;font-size:12px;font-weight:600;cursor:pointer">Add Fee</button>
        </div>
      </div>`;
    body.insertAdjacentHTML('beforeend', formHtml);
    body.querySelector('#ap-fi-cancel').addEventListener('click', () => {
      const f = body.querySelector('#ap-fee-inline-form');
      if (f) f.remove();
      renderApFees();
    });
    body.querySelector('#ap-fi-add').addEventListener('click', () => {
      const name = body.querySelector('#ap-fi-name').value.trim();
      const type = body.querySelector('#ap-fi-type').value;
      const amt  = body.querySelector('#ap-fi-amount').value;
      if (!name) { body.querySelector('#ap-fi-name').style.borderColor='#ef4444'; return; }
      window._apFees.push({ name, type, amount: amt || '0' });
      const f = body.querySelector('#ap-fee-inline-form');
      if (f) f.remove();
      renderApFees();
    });
  });
  renderApFees();

  // Save
  el.querySelector('#ap-save-btn').addEventListener('click', () => {
    const code = el.querySelector('#ap-code').value.trim();
    const name = el.querySelector('#ap-name').value.trim();
    const cat  = el.querySelector('#ap-category').value;
    let err = false;
    if (!code) { el.querySelector('#ap-code').style.borderColor='#ef4444'; err=true; }
    if (!name) { el.querySelector('#ap-name').style.borderColor='#ef4444'; err=true; }
    if (!cat)  { el.querySelector('#ap-category').parentElement.style.outline='1px solid #ef4444'; err=true; }
    if (err) return;
    // Navigate back to list
    if (typeof renderLoansContent === 'function') {
      const listTitle = (backSection==='depprod') ? 'Deposit Product Definitions' : 'Account Product Definitions';
      renderLoansContent(m.contentId, mod, backSection, listTitle, 'Manage account and deposit product templates');
    }
  });

  // Sidebar active state
  if (m.pageId) {
    const pg = document.getElementById(m.pageId);
    if (pg) {
      pg.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
      const ni = pg.querySelector(`.nav-item[data-section="${backSection}"]`);
      if (ni) ni.classList.add('active');
    }
  }
}

function openInterestRateForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => (val || '').toLowerCase() === option.toLowerCase() ? 'selected' : '';
  const currency = d.currency || 'EUR';
  const status   = d.status   || 'Active';

  // In-memory version list for this session
  const versions = [];
  const currencies = ['EUR','USD','GBP','CHF','JPY','AUD','CAD','SEK','NOK','DKK'];
  const currOpts = currencies.map(c => `<option ${opt(currency,c)}>${c}</option>`).join('');

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Loan Management</span><span class="bc-sep">›</span>
      <span>Interest Rate Definitions</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Interest Rate' : 'Add Interest Rate'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content"
          data-module="${mod}"
          data-section="interestdef"
          data-title="Interest Rate Definitions"
          data-subtitle="Define interest rate tiers and structures"
          title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">${isEdit ? 'Edit Interest Rate' : 'Add Interest Rate'}</div>
          <div class="fee-form-subheading">Configure interest rate details</div>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <button class="ird-cancel-btn"
          data-action="set-content"
          data-module="${mod}"
          data-section="interestdef"
          data-title="Interest Rate Definitions"
          data-subtitle="Define interest rate tiers and structures">Cancel</button>
        <button class="btn-fee-save" data-action="interest-rate-save">
          ${_I_SAVE_14}
          Save
        </button>
      </div>
    </div>

    <!-- Interest Rate -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Interest Rate</div>
      <div class="fee-form-row" style="grid-template-columns:1fr 1fr 1fr;">
        <div class="fee-form-field">
          <label class="fee-form-label">Name</label>
          <input class="fee-form-input" type="text" id="ird-name"
            placeholder="e.g. IRD-123" value="${d.name || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Currency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ird-currency">${currOpts}</select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ird-status">
              <option ${opt(status,'Active')}>Active</option>
              <option ${opt(status,'Inactive')}>Inactive</option>
              <option ${opt(status,'ACTIVE')}>Active</option>
              <option ${opt(status,'INACTIVE')}>Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Interest Rate Versions -->
    <div class="ird-version-panel">
      <div class="ird-version-header">
        <span class="ird-version-title">Interest Rate Versions</span>
        <button class="btn-ird-add-version" data-action="add-interest-version">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 2v12M2 8h12" stroke-linecap="round"/></svg>
          + Add Version
        </button>
      </div>
      <div id="ird-versions-body">
        <div class="ird-version-empty">No versions added yet. Click "Add Version" to create the first version.</div>
      </div>
    </div>

    <!-- Add Version Modal -->
    <div class="ird-modal-overlay" id="ird-version-modal">
      <div class="ird-modal-box">
        <div class="ird-modal-title">Add Version</div>
        <div class="ird-modal-sub">Configure version rate parameters</div>
        <div class="ird-modal-grid">
          <div class="ird-modal-field">
            <label class="ird-modal-label">Version</label>
            <input class="fee-form-input" type="text" id="iv-version" placeholder="e.g., v1.0"/>
          </div>
          <div class="ird-modal-field">
            <label class="ird-modal-label">Valid From</label>
            <input class="fee-form-input" type="date" id="iv-valid-from" value="2026-03-25"/>
          </div>
          <div class="ird-modal-field">
            <label class="ird-modal-label">Valid To</label>
            <input class="fee-form-input" type="date" id="iv-valid-to" value="2099-12-31"/>
          </div>
          <div class="ird-modal-field">
            <label class="ird-modal-label">Min Rate (%)</label>
            <input class="fee-form-input" type="number" id="iv-min-rate" placeholder="e.g., 1.00" min="0" step="0.01"/>
          </div>
          <div class="ird-modal-field">
            <label class="ird-modal-label">Max Rate (%)</label>
            <input class="fee-form-input" type="number" id="iv-max-rate" placeholder="e.g., 1.00" min="0" step="0.01"/>
          </div>
          <div class="ird-modal-field">
            <label class="ird-modal-label">Default Rate (%)</label>
            <input class="fee-form-input" type="number" id="iv-default-rate" placeholder="e.g., 1.00" min="0" step="0.01"/>
          </div>
          <div class="ird-modal-field" style="grid-column:1/-1;">
            <label class="ird-modal-label">Status</label>
            <div class="fee-select-wrap">
              <select class="fee-form-select" id="iv-status">
                <option selected>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
        </div>
        <div class="ird-modal-footer">
          <button class="btn-ird-cancel" data-action="close-interest-version-modal">Cancel</button>
          <button class="btn-ird-save-version" data-action="save-interest-version">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 11v2a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-2M8 2v8M5 7l3 3 3-3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Save Version
          </button>
        </div>
      </div>
    </div>`;

  // Sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="interestdef"]');
  if (navItem) navItem.classList.add('active');
}
function openAccrualForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => val && val === option ? 'selected' : '';
  const method = d.method || 'Actual Actual';
  const freq   = d.freq   || 'Daily';
  const status = d.status || 'Pending';

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Loan Management</span><span class="bc-sep">›</span>
      <span>Interest Accrual Definitions</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Interest Accrual Definition' : 'New Interest Accrual Definition'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content"
          data-module="${mod}"
          data-section="accrual"
          data-title="Interest Accrual Definitions"
          data-subtitle="Configure accrual calendars and methods"
          title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Interest Accrual Definition</div>
          <div class="fee-form-subheading">Manage interest accrual definition</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="accrual-save">
        ${_I_SAVE_14}
        Save
      </button>
    </div>

    <!-- Core Information -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Core Information</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Name</label>
          <input class="fee-form-input" type="text" id="ac-name"
            placeholder="Enter interest accrual definition name"
            value="${d.name || ''}"/>
        </div>
      </div>
    </div>

    <!-- Accrual Settings -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Accrual Settings</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Calculation Method</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ac-method">
              <option ${opt(method,'Actual Actual')}>Actual Actual</option>
              <option ${opt(method,'Actual 365')}>Actual 365</option>
              <option ${opt(method,'Actual 360')}>Actual 360</option>
              <option ${opt(method,'30/360')}>30/360</option>
              <option ${opt(method,'30E/360')}>30E/360</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Frequency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ac-freq">
              <option ${opt(freq,'Daily')}>Daily</option>
              <option ${opt(freq,'Monthly')}>Monthly</option>
              <option ${opt(freq,'Quarterly')}>Quarterly</option>
              <option ${opt(freq,'Semi-Annual')}>Semi-Annual</option>
              <option ${opt(freq,'Annual')}>Annual</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap" style="max-width:100%;">
            <select class="fee-form-select" id="ac-status">
              <option ${opt(status,'Pending')}>Pending</option>
              <option ${opt(status,'Active')}>Active</option>
              <option ${opt(status,'Inactive')}>Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;

  // Sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="accrual"]');
  if (navItem) navItem.classList.add('active');
}
function openCollectionForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => val && val === option ? 'selected' : '';
  const status = d.status || 'Pending';
  const oldest = d.oldestFirst || 'No';

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Loan Management</span><span class="bc-sep">›</span>
      <span>Collection Definitions</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Collection Definition' : 'New Collection Definition'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content"
          data-module="${mod}"
          data-section="collection"
          data-title="Collection Definitions"
          data-subtitle="Set up collection schedules and rules"
          title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Collection Definition</div>
          <div class="fee-form-subheading">Manage collection definition</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="collection-save">
        ${_I_SAVE_14}
        Save
      </button>
    </div>

    <!-- Core Information -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Core Information</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Name</label>
          <input class="fee-form-input" type="text" id="cf-name"
            placeholder="Enter collection definition name"
            value="${d.name || ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="cf-status">
              <option ${opt(status,'Pending')}>Pending</option>
              <option ${opt(status,'Active')}>Active</option>
              <option ${opt(status,'Inactive')}>Inactive</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Oldest First</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="cf-oldest">
              <option ${opt(oldest,'No')}>No</option>
              <option ${opt(oldest,'Yes')}>Yes</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Component Order -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Component Order</div>
      <div class="coll-order-table">
        <div class="coll-order-header">
          <span class="coll-order-handle-col"></span>
          <span class="coll-order-type-col">Component Type</span>
        </div>
        <div class="coll-order-body" id="cf-order-body">
          <div class="coll-order-row" draggable="true">
            <span class="coll-drag-handle">&#9776;</span>
            <span class="coll-type-label">Fee</span>
          </div>
          <div class="coll-order-row" draggable="true">
            <span class="coll-drag-handle">&#9776;</span>
            <span class="coll-type-label">Penalty</span>
          </div>
          <div class="coll-order-row" draggable="true">
            <span class="coll-drag-handle">&#9776;</span>
            <span class="coll-type-label">Interest</span>
          </div>
          <div class="coll-order-row" draggable="true">
            <span class="coll-drag-handle">&#9776;</span>
            <span class="coll-type-label">Principal</span>
          </div>
        </div>
      </div>
      <p style="font-size:11px;color:var(--text-muted,#9aaab8);margin-top:8px;">Drag rows to reorder the collection component priority.</p>
    </div>`;

  // Simple drag-and-drop for component order rows
  const body = document.getElementById('cf-order-body');
  if (body) {
    let dragged = null;
    body.addEventListener('dragstart', e => {
      dragged = e.target.closest('.coll-order-row');
      setTimeout(() => dragged && dragged.classList.add('coll-row-dragging'), 0);
    });
    body.addEventListener('dragend', () => {
      dragged && dragged.classList.remove('coll-row-dragging');
      dragged = null;
    });
    body.addEventListener('dragover', e => {
      e.preventDefault();
      const target = e.target.closest('.coll-order-row');
      if (target && dragged && target !== dragged) {
        const rect = target.getBoundingClientRect();
        const after = e.clientY > rect.top + rect.height / 2;
        body.insertBefore(dragged, after ? target.nextSibling : target);
      }
    });
  }

  // Sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="collection"]');
  if (navItem) navItem.classList.add('active');
}

// ── LOAN PRODUCT FORM HELPERS ─────────────────────────────────────────────────
function lpRefreshCustTypes() {
  var body = document.getElementById('lp-cust-body');
  if (!body) return;
  if (!window._lpCustTypes || !window._lpCustTypes.length) {
    body.innerHTML = '<div class="lp-sub-empty">No customer types added yet. Select a type and click "Add" to add one.</div>';
  } else {
    body.innerHTML = '<div class="lp-cust-row"><div class="lp-cust-tags">' +
      window._lpCustTypes.map(function(t, i) {
        return '<span class="lp-cust-tag">' + t +
          '<button onclick="window._lpCustTypes.splice(' + i + ',1);lpRefreshCustTypes()" title="Remove">×</button></span>';
      }).join('') +
    '</div></div>';
  }
}
function lpRefreshCurrencies() {
  var body = document.getElementById('lp-currencies-body');
  if (!body) return;
  if (!window._lpCurrencies || !window._lpCurrencies.length) {
    body.innerHTML = '<div class="lp-sub-empty">No currencies added yet. Click "Add Currency" to create the first one.</div>';
  } else {
    body.innerHTML = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px;min-width:700px">' +
      '<thead><tr style="background:#f6f9fc;border-bottom:1px solid #dce8f0">' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Currency</th>' +
        '<th style="padding:7px 10px;text-align:center;color:#6a8faf;font-weight:600" colspan="3">Loan Amount</th>' +
        '<th style="padding:7px 10px;text-align:center;color:#6a8faf;font-weight:600" colspan="3">Tenor</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Valid From</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Valid To</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Status</th>' +
        '<th style="padding:7px 10px;text-align:center;color:#6a8faf;font-weight:600">Actions</th>' +
      '</tr>' +
      '<tr style="background:#f6f9fc;border-bottom:1px solid #dce8f0">' +
        '<th></th>' +
        '<th style="padding:4px 10px;text-align:right;color:#8aa8c0;font-weight:500;font-size:11px">Min</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#8aa8c0;font-weight:500;font-size:11px">Max</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#8aa8c0;font-weight:500;font-size:11px">Default</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#8aa8c0;font-weight:500;font-size:11px">Min</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#8aa8c0;font-weight:500;font-size:11px">Max</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#8aa8c0;font-weight:500;font-size:11px">Default</th>' +
        '<th></th><th></th><th></th><th></th>' +
      '</tr></thead><tbody>' +
      window._lpCurrencies.map(function(c, i) {
        var curr      = (typeof c === 'object') ? c.currency    : c;
        var minAmt    = (typeof c === 'object') ? (c.minAmt     || '—') : '—';
        var maxAmt    = (typeof c === 'object') ? (c.maxAmt     || '—') : '—';
        var defAmt    = (typeof c === 'object') ? (c.defaultAmt || '—') : '—';
        var minTenor  = (typeof c === 'object') ? (c.minTenor   || '—') : '—';
        var maxTenor  = (typeof c === 'object') ? (c.maxTenor   || '—') : '—';
        var defTenor  = (typeof c === 'object') ? (c.defTenor   || '—') : '—';
        var validFrom = (typeof c === 'object') ? (c.validFrom  || '01.10.2025') : '01.10.2025';
        var validTo   = (typeof c === 'object') ? (c.validTo    || '31.12.2099') : '31.12.2099';
        var status    = (typeof c === 'object') ? (c.status     || 'Active') : 'Active';
        var statusCls = (status === 'Active' || status === 'ACTIVE') ? 'fee-status-active' : 'fee-status-inactive';
        return '<tr style="border-bottom:1px solid #f0f4f8">' +
          '<td style="padding:8px 10px;font-weight:700;color:#1a2e42;font-size:13px">' + curr + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + minAmt + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + maxAmt + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570;font-weight:600">' + defAmt + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + minTenor + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + maxTenor + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570;font-weight:600">' + defTenor + '</td>' +
          '<td style="padding:8px 10px;color:#3a5570;font-size:12px">' + validFrom + '</td>' +
          '<td style="padding:8px 10px;color:#3a5570;font-size:12px">' + validTo + '</td>' +
          '<td style="padding:8px 10px"><span class="' + statusCls + '">' + status + '</span></td>' +
          '<td style="padding:8px 10px;text-align:center;white-space:nowrap">' +
            '<button onclick="lpEditCurrency(' + i + ')" title="Edit" style="background:#e8f0fe;color:#1a56db;border:1px solid #c5d8f5;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px;margin-right:4px">✏ Edit</button>' +
            '<button onclick="window._lpCurrencies.splice(' + i + ',1);lpRefreshCurrencies();' +
              'window._lpInterestRates=(window._lpInterestRates||[]).filter(function(r){return r.currency!==\'' + curr + '\'});lpRefreshInterestRates();" ' +
              'title="Delete" style="background:#fde8e8;color:#c0392b;border:1px solid #f5b7b1;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px">🗑</button>' +
          '</td></tr>';
      }).join('') +
      '</tbody></table></div>';
  }
}
function lpEditCurrency(idx) {
  var c = (window._lpCurrencies || [])[idx];
  if (!c) return;
  window._lpCurrEditIdx = idx;
  window._lpCurrEditData = c;
  openLpAddCurrencyModal(c);
}
window.lpEditCurrency = lpEditCurrency;
function lpRefreshInterestRates() {
  var body = document.getElementById('lp-interest-rates-body');
  if (!body) return;
  if (!window._lpInterestRates || !window._lpInterestRates.length) {
    body.innerHTML = '<div class="lp-sub-empty">No interest rates configured yet. Add currencies first, then click "+ Add Interest Rate".</div>';
  } else {
    body.innerHTML = '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px;min-width:620px">' +
      '<thead><tr style="background:#fff8f2;border-bottom:1px solid #fde0c4">' +
        '<th style="padding:7px 10px;text-align:left;color:#8a5030;font-weight:600">Currency</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#8a5030;font-weight:600">Interest Rate Name</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#8a5030;font-weight:600">Interest Rate Type</th>' +
        '<th style="padding:7px 10px;text-align:center;color:#8a5030;font-weight:600" colspan="3">Interest Rate</th>' +
        '<th style="padding:7px 10px;text-align:right;color:#8a5030;font-weight:600">Margin Rate</th>' +
        '<th style="padding:7px 10px;text-align:center;color:#8a5030;font-weight:600">Actions</th>' +
      '</tr>' +
      '<tr style="background:#fff8f2;border-bottom:1px solid #fde0c4">' +
        '<th></th><th></th><th></th>' +
        '<th style="padding:4px 10px;text-align:right;color:#b07050;font-weight:500;font-size:11px">Min</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#b07050;font-weight:500;font-size:11px">Max</th>' +
        '<th style="padding:4px 10px;text-align:right;color:#b07050;font-weight:500;font-size:11px">Default</th>' +
        '<th></th><th></th>' +
      '</tr></thead><tbody>' +
      window._lpInterestRates.map(function(r, i) {
        var typeBg  = r.rateType === 'Fixed' ? '#e8f4e8' : '#e8f0ff';
        var typeCol = r.rateType === 'Fixed' ? '#256025' : '#1a4aa0';
        var minRate = r.minRate  != null ? r.minRate  + '%' : '—';
        var maxRate = r.maxRate  != null ? r.maxRate  + '%' : '—';
        var defRate = r.defRate  != null ? r.defRate  + '%' : (r.defaultRate != null ? r.defaultRate + '%' : '—');
        var margin  = r.marginRate != null ? r.marginRate + '%' : '—';
        return '<tr style="border-bottom:1px solid #f0f4f8">' +
          '<td style="padding:8px 10px;font-weight:700;color:#1a2e42;font-size:13px">' + r.currency + '</td>' +
          '<td style="padding:8px 10px;color:#3a5570">' + (r.rateName || '—') + '</td>' +
          '<td style="padding:8px 10px"><span style="background:' + typeBg + ';color:' + typeCol + ';padding:2px 9px;border-radius:10px;font-size:11px;font-weight:600">' + (r.rateType || 'Fixed') + '</span></td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + minRate + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + maxRate + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570;font-weight:600">' + defRate + '</td>' +
          '<td style="padding:8px 10px;text-align:right;color:#3a5570">' + margin + '</td>' +
          '<td style="padding:8px 10px;text-align:center;white-space:nowrap">' +
            '<button onclick="lpEditInterestRate(' + i + ')" title="Edit" style="background:#fff4ee;color:#c05010;border:1px solid #f5c4a0;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px;margin-right:4px">✏ Edit</button>' +
            '<button onclick="window._lpInterestRates.splice(' + i + ',1);lpRefreshInterestRates()" title="Delete" ' +
              'style="background:#fde8e8;color:#c0392b;border:1px solid #f5b7b1;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px">🗑</button>' +
          '</td></tr>';
      }).join('') +
      '</tbody></table></div>';
  }
}
function lpEditInterestRate(idx) {
  var r = (window._lpInterestRates || [])[idx];
  if (!r) return;
  window._lpIrEditIdx = idx;
  openLpAddInterestRateModal(r);
}
window.lpEditInterestRate = lpEditInterestRate;
function lpRefreshFees() {
  var body = document.getElementById('lp-fees-body');
  if (!body) return;
  if (!window._lpFees || !window._lpFees.length) {
    body.innerHTML = '<div class="lp-sub-empty">No fees added yet. Click "+ Add Fee" to select fees.</div>';
  } else {
    var statusCls = function(s) {
      var up = (s || '').toUpperCase();
      return (up === 'ACTIVE' || up === 'Active') ? 'fee-status-active' : 'fee-status-inactive';
    };
    body.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px">'
      + '<thead><tr style="background:#f6f9fc;border-bottom:1px solid #dce8f0">'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Name</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Method</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Trigger Event</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Currency Code</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Status</th>'
      + '<th style="padding:7px 10px;text-align:center;color:#6a8faf;font-weight:600">Actions</th>'
      + '</tr></thead><tbody>'
      + window._lpFees.map(function(f, i) {
          var isObj  = typeof f === 'object';
          var name     = isObj ? (f.feeName  || f.name || '') : f;
          var method   = isObj ? (f.method   || '') : '';
          var trigger  = isObj ? (f.trigger  || '') : '';
          var currency = isObj ? (f.currency || '') : '';
          var status   = isObj ? (f.status   || 'ACTIVE') : 'ACTIVE';
          var statusUp = (status || '').toUpperCase();
          return '<tr style="border-bottom:1px solid #f0f4f8">'
            + '<td style="padding:7px 10px;font-weight:500;color:#1a2e42">' + name + '</td>'
            + '<td style="padding:7px 10px;color:#3a5570">' + method + '</td>'
            + '<td style="padding:7px 10px;color:#3a5570">' + trigger + '</td>'
            + '<td style="padding:7px 10px;font-weight:600;color:#1a2640">' + (currency || '—') + '</td>'
            + '<td style="padding:7px 10px"><span class="' + (statusCls(status)) + '">' + statusUp + '</span></td>'
            + '<td style="padding:7px 10px;text-align:center;white-space:nowrap">'
            +   '<button onclick="window._lpFees.splice(' + i + ',1);lpRefreshFees()" title="Delete" '
            +   'style="background:#fde8e8;color:#c0392b;border:1px solid #f5b7b1;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px">🗑</button>'
            + '</td></tr>';
        }).join('')
      + '</tbody></table>';
  }
}
window.lpRefreshCustTypes = lpRefreshCustTypes;
window.lpRefreshCurrencies = lpRefreshCurrencies;
window.lpRefreshInterestRates = lpRefreshInterestRates;
window.lpRefreshFees = lpRefreshFees;

function lpToggleAccrualFreq(val) {
  var row = document.getElementById('lp-accrual-freq-row');
  if (row) row.style.display = (val === 'Accrual method') ? '' : 'none';
}
window.lpToggleAccrualFreq = lpToggleAccrualFreq;

// ── INTEREST RATE DEFINITION FORM HELPER ──────────────────────────────────────
function irdVersionsRefresh(versions) {
  var body = document.getElementById('ird-versions-body');
  if (!body) return;
  if (!versions || !versions.length) {
    body.innerHTML = '<div class="ird-version-empty">No versions added yet. Click "Add Version" to create the first version.</div>';
    return;
  }
  var rows = versions.map(function(v, i) {
    return '<tr>' +
      '<td>' + v.version + '</td>' +
      '<td>' + v.validFrom + '</td>' +
      '<td>' + v.validTo + '</td>' +
      '<td>' + v.minRate + '%</td>' +
      '<td>' + v.maxRate + '%</td>' +
      '<td>' + v.defaultRate + '%</td>' +
      '<td><span class="ird-status-' + (v.status === 'Active' ? 'active' : 'inactive') + '">' + v.status.toUpperCase() + '</span></td>' +
      '<td><div class="fee-actions">' +
        '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;"' +
          ' onclick="window._irdVersions.splice(' + i + ',1);irdVersionsRefresh(window._irdVersions)">' +
          _I_BIN_12 + ' Remove' +
        '</button>' +
      '</div></td>' +
    '</tr>';
  }).join('');
  body.innerHTML = '<table class="ird-version-table">' +
    '<thead><tr><th>Version</th><th>Valid From</th><th>Valid To</th>' +
    '<th>Min Rate</th><th>Max Rate</th><th>Default Rate</th><th>Status</th><th>Actions</th></tr></thead>' +
    '<tbody>' + rows + '</tbody></table>';
}
window.irdVersionsRefresh = irdVersionsRefresh;

// ── EOD HELPER FUNCTIONS ──────────────────────────────────────────────────────
function eodRefreshAccounts() {
  var body = document.getElementById('eod-acct-body');
  if (!body) return;
  var accounts = window._eodAccounts || [];
  if (!accounts.length) {
    body.innerHTML = '<tr><td colspan="2" class="eod-acct-empty">No loan accounts added yet</td></tr>';
    return;
  }
  body.innerHTML = accounts.map(function(acct) {
    return '<tr><td>' + acct + '</td>' +
      '<td style="text-align:right;">' +
        '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;padding:3px 8px;font-size:12px;"' +
          ' data-action="eod-del-account" data-acct="' + acct + '">' + _I_BIN_12 + ' Remove</button>' +
      '</td></tr>';
  }).join('');
}
function eodRefreshSchedules() {
  var body = document.getElementById('eod-sched-body');
  if (!body) return;
  var schedules = window._eodSchedules || [];
  var jobLabels  = { 'interest-accrual':'Interest Accrual', 'penalty-accrual':'Penalty Accrual', 'fee-accrual':'Fee Accrual', 'loan-balance':'Loan Balance' };
  var freqLabels = { daily:'Daily', monthly:'Monthly', quarterly:'Quarterly', yearly:'Yearly' };
  if (!schedules.length) {
    body.innerHTML = '<tr><td colspan="5" class="eod-sched-empty">No schedules configured yet</td></tr>';
    return;
  }
  body.innerHTML = schedules.map(function(s, i) {
    return '<tr>' +
      '<td>' + (jobLabels[s.jobType] || s.jobType) + '</td>' +
      '<td>' + (freqLabels[s.freq] || s.freq) + '</td>' +
      '<td>' + s.time + '</td>' +
      '<td><span class="stat-badge stat-' + (s.enabled ? 'active' : 'inactive') + '">' + (s.enabled ? 'Active' : 'Paused') + '</span></td>' +
      '<td style="text-align:right;white-space:nowrap;">' +
        '<button class="fee-btn-delete" style="margin-right:4px;background:#f0f4ff;color:#4a6cf7;border-color:#c5d0f5;padding:3px 8px;font-size:12px;"' +
          ' data-action="eod-toggle-schedule" data-idx="' + i + '">' + (s.enabled ? 'Pause' : 'Resume') + '</button>' +
        '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;padding:3px 8px;font-size:12px;"' +
          ' data-action="eod-del-schedule" data-idx="' + i + '">' + _I_BIN_12 + ' Remove</button>' +
      '</td></tr>';
  }).join('');
}
window.eodRefreshAccounts = eodRefreshAccounts;
window.eodRefreshSchedules = eodRefreshSchedules;

// ── PENALTY SECTION RENDERER (called by renderLoansContent) ─────────────────
function buildPenaltySection(mod) {
  const penaltyRows = (typeof MOCK_PENALTY_DEFS !== 'undefined') ? MOCK_PENALTY_DEFS : [
    { id: 1, name: 'Default Penalty Definition', method: 'Actual Actual', freq: 'Daily', base: 'Due Principal', rate: 12.5, status: 'Active', created: '18.06.2026' },
  ];

  const statusBadge = s => s === 'Active'
    ? `<span class="fee-status-active">Active</span>`
    : `<span class="fee-status-inactive">${s}</span>`;

  const rowsHtml = penaltyRows.map(r => `
    <tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s"
        onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''">
      <td style="padding:14px 16px;color:var(--fg2,#64748b);font-size:13px">${r.id}</td>
      <td style="padding:14px 16px;font-weight:500;color:var(--fg,#1e293b);font-size:13px">${r.name}</td>
      <td style="padding:14px 16px;font-size:13px">${r.method}</td>
      <td style="padding:14px 16px;font-size:13px">${r.freq}</td>
      <td style="padding:14px 16px;font-size:13px">${r.base}</td>
      <td style="padding:14px 16px;font-size:13px">${r.rate}</td>
      <td style="padding:14px 16px">${statusBadge(r.status)}</td>
      <td style="padding:14px 16px;font-size:13px;color:var(--fg2,#64748b)">${r.created}</td>
      <td style="padding:14px 16px">
        <div class="fee-actions">
          <button class="fee-btn-edit" data-pen-id="${r.id}" title="Edit">${_I_PENCIL_12} Edit</button>
          <button class="fee-btn-delete" title="Delete">${_I_BIN_12} Delete</button>
        </div>
      </td>
    </tr>`).join('');

  return `
    <div class="fee-wrap">
      <div class="fee-page-header">
        <div class="fee-page-header-left">
          <div class="fee-page-title">Penalty Definitions</div>
          <div class="fee-page-sub">Manage penalty definitions</div>
        </div>
        <button class="btn-create-fee" id="penalty-create-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="2" x2="8" y2="14"/><line x1="2" y1="8" x2="14" y2="8"/></svg>
          Create Penalty Definition
        </button>
      </div>
      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Method</th><th>Frequency</th>
              <th>Base</th><th>Rate</th><th>Status</th><th>Created At</th><th>Actions</th>
            </tr>
          </thead>
          <tbody id="penalty-tbody">${rowsHtml}</tbody>
        </table>
      </div>
      <div class="fee-pagination">
        <div style="font-size:13px;color:var(--text-muted)">Showing 1-${penaltyRows.length} of ${penaltyRows.length} results</div>
        <div class="fee-pag-controls">
          <button class="fee-pag-prev" disabled>Previous</button>
          <button class="fee-pag-num active">1</button>
          <button class="fee-pag-next" disabled>Next</button>
        </div>
      </div>
    </div>`;
}

// ── LOAN PURPOSES SECTION ────────────────────────────────────────────────────
const _LOAN_PURPOSES_FALLBACK = [
  { id: 7, name: 'Buy Now Pay Later',          created: '18.06.2026' },
  { id: 1, name: 'Consumer non-purpose loans', created: '18.06.2026' },
];

function buildLoanPurposesSection() {
  const rows = (typeof MOCK_LOAN_PURPOSES !== 'undefined') ? MOCK_LOAN_PURPOSES : _LOAN_PURPOSES_FALLBACK;
  const rowsHtml = rows.map(r => `
    <tr>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.id}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-main,#1a2233);font-weight:500;border-bottom:1px solid var(--border-light,#f0f2f5)">${r.name}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.created}</td>
      <td style="padding:12px 16px;border-bottom:1px solid var(--border-light,#f0f2f5)">
        <div class="fee-actions">
          <button class="fee-btn-edit" data-lpur-id="${r.id}" title="Edit">${_I_PENCIL_12||''} Edit</button>
          <button class="fee-btn-delete" title="Delete">${_I_BIN_12||''} Delete</button>
        </div>
      </td>
    </tr>`).join('');

  return `
    <div class="fee-wrap">
      <div class="fee-page-header">
        <div class="fee-page-header-left">
          <div class="fee-page-title">Loan Purposes</div>
          <div class="fee-page-sub">View and manage loan purposes</div>
        </div>
        <button class="btn-create-fee" id="lp-purpose-create-btn" style="background:#7c3aed;border-color:#7c3aed;">
          ${_I_PLUS_14||'+'} Add Loan Purpose
        </button>
      </div>

      <!-- Filters -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border-light,#e8ecf0);border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <div style="font-size:13px;font-weight:600;color:var(--text-main,#1a2233);margin-bottom:12px;">Filters</div>
        <div>
          <div style="font-size:12px;font-weight:500;color:var(--text-muted,#6b7a8d);margin-bottom:6px;">Search</div>
          <div style="position:relative;">
            <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted,#9aa3b0);">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <input type="text" placeholder="Search by name..." style="width:100%;box-sizing:border-box;padding:8px 12px 8px 32px;font-size:13px;border:1px solid var(--border-light,#e0e4ea);border-radius:6px;background:var(--input-bg,#fff);color:var(--text-main,#1a2233);outline:none;" />
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th style="width:80px;">ID <span style="opacity:.5;font-size:10px;">⇅</span></th>
              <th>Name <span style="opacity:.5;font-size:10px;">⇅</span></th>
              <th>Created At <span style="opacity:.5;font-size:10px;">⇅</span></th>
              <th style="width:140px;">Actions</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>

      <div class="fee-pagination">
        <div style="font-size:13px;color:var(--text-muted)">Showing 1-${rows.length} of ${rows.length} results</div>
        <div class="fee-pag-controls">
          <button class="fee-pag-prev" disabled>Previous</button>
          <button class="fee-pag-num active">1</button>
          <button class="fee-pag-next" disabled>Next</button>
        </div>
      </div>
    </div>`;
}

function openLoanPurposeForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};
  const isEdit = !!d.id;

  el.innerHTML = `
    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="lpf-back-btn" title="Back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div>
          <div class="fee-form-heading">Loan Purpose</div>
          <div class="fee-form-subheading">Manage loan purpose</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn-fee-cancel" id="lpf-cancel-btn">Cancel</button>
        <button class="btn-fee-reset"  id="lpf-reset-btn">Reset</button>
        <button class="btn-fee-save"   id="lpf-save-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Save
        </button>
      </div>
    </div>

    <div class="fee-form-body">
      <div class="fee-form-section">
        <div class="fee-form-section-title">Core Information</div>
        <div class="fee-form-row" style="grid-template-columns:1fr;">
          <div class="fee-form-field">
            <label class="fee-form-label">Name</label>
            <input class="fee-form-input" type="text" id="lpf-name"
              placeholder="Enter loan purpose name"
              value="${d.name ? d.name.replace(/"/g,'&quot;') : ''}" />
          </div>
        </div>
      </div>
    </div>`;

  const goBack = () => {
    let foundMod = null;
    if (typeof moduleMap !== 'undefined') {
      for (const [key, val] of Object.entries(moduleMap)) {
        if (val.contentId === containerId) { foundMod = key; break; }
      }
    }
    if (foundMod && typeof renderLoansContent === 'function') {
      renderLoansContent(containerId, foundMod, 'loan-purposes', 'Loan Purposes', 'View and manage loan purposes');
    }
  };

  el.querySelector('#lpf-back-btn').addEventListener('click', goBack);
  el.querySelector('#lpf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#lpf-reset-btn').addEventListener('click', () => {
    el.querySelector('#lpf-name').value = d.name || '';
  });
  el.querySelector('#lpf-save-btn').addEventListener('click', () => {
    const nameEl = el.querySelector('#lpf-name');
    if (!nameEl.value.trim()) {
      nameEl.style.borderColor = '#ef4444';
      nameEl.focus();
      return;
    }
    goBack();
  });
}

// ── LOAN CATEGORIES SECTION ──────────────────────────────────────────────────
const _LOAN_CATEGORIES_FALLBACK = [
  { id: 2, name: 'Long-term loans',  created: '18.06.2026' },
  { id: 1, name: 'Short-term loans', created: '18.06.2026' },
];

function buildLoanCategoriesSection() {
  const rows = (typeof MOCK_LOAN_CATEGORIES !== 'undefined') ? MOCK_LOAN_CATEGORIES : _LOAN_CATEGORIES_FALLBACK;
  const rowsHtml = rows.map(r => `
    <tr>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.id}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-main,#1a2233);font-weight:500;border-bottom:1px solid var(--border-light,#f0f2f5)">${r.name}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.created}</td>
      <td style="padding:12px 16px;border-bottom:1px solid var(--border-light,#f0f2f5)">
        <div class="fee-actions">
          <button class="fee-btn-edit" data-lcat-id="${r.id}" title="Edit">${typeof _I_PENCIL_12 !== 'undefined' ? _I_PENCIL_12 : ''} Edit</button>
          <button class="fee-btn-delete" title="Delete">${typeof _I_BIN_12 !== 'undefined' ? _I_BIN_12 : ''} Delete</button>
        </div>
      </td>
    </tr>`).join('');

  return `
    <div class="fee-wrap">
      <div class="fee-page-header">
        <div class="fee-page-header-left">
          <div class="fee-page-title">Loan Categories</div>
          <div class="fee-page-sub">View and manage loan categories</div>
        </div>
        <button class="btn-create-fee" id="lc-create-btn" style="background:#7c3aed;border-color:#7c3aed;">
          ${typeof _I_PLUS_14 !== 'undefined' ? _I_PLUS_14 : '+'} Add Loan Category
        </button>
      </div>

      <div style="background:var(--card-bg,#fff);border:1px solid var(--border-light,#e8ecf0);border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <div style="font-size:13px;font-weight:600;color:var(--text-main,#1a2233);margin-bottom:12px;">Filters</div>
        <div>
          <div style="font-size:12px;font-weight:500;color:var(--text-muted,#6b7a8d);margin-bottom:6px;">Search</div>
          <div style="position:relative;">
            <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted,#9aa3b0);">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <input type="text" placeholder="Search by name..." style="width:100%;box-sizing:border-box;padding:8px 12px 8px 32px;font-size:13px;border:1px solid var(--border-light,#e0e4ea);border-radius:6px;background:var(--input-bg,#fff);color:var(--text-main,#1a2233);outline:none;" />
          </div>
        </div>
      </div>

      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th style="width:80px;">ID <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Name <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Created At <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th style="width:140px;">Actions</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>

      <div class="fee-pagination">
        <div style="font-size:13px;color:var(--text-muted)">Showing 1-${rows.length} of ${rows.length} results</div>
        <div class="fee-pag-controls">
          <button class="fee-pag-prev" disabled>Previous</button>
          <button class="fee-pag-num active">1</button>
          <button class="fee-pag-next" disabled>Next</button>
        </div>
      </div>
    </div>`;
}

function openLoanCategoryForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};

  el.innerHTML = `
    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="lcf-back-btn" title="Back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div>
          <div class="fee-form-heading">Loan Category</div>
          <div class="fee-form-subheading">Manage loan category</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn-fee-cancel" id="lcf-cancel-btn">Cancel</button>
        <button class="btn-fee-reset"  id="lcf-reset-btn">Reset</button>
        <button class="btn-fee-save"   id="lcf-save-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Save
        </button>
      </div>
    </div>

    <div class="fee-form-body">
      <div class="fee-form-section">
        <div class="fee-form-section-title">Core Information</div>
        <div class="fee-form-row" style="grid-template-columns:1fr;">
          <div class="fee-form-field">
            <label class="fee-form-label">Name</label>
            <input class="fee-form-input" type="text" id="lcf-name"
              placeholder="Enter loan category name"
              value="${d.name ? d.name.replace(/"/g,'&quot;') : ''}" />
          </div>
        </div>
      </div>
    </div>`;

  const goBack = () => {
    let foundMod = null;
    if (typeof moduleMap !== 'undefined') {
      for (const [key, val] of Object.entries(moduleMap)) {
        if (val.contentId === containerId) { foundMod = key; break; }
      }
    }
    if (foundMod && typeof renderLoansContent === 'function') {
      renderLoansContent(containerId, foundMod, 'loan-categories', 'Loan Categories', 'View and manage loan categories');
    }
  };

  el.querySelector('#lcf-back-btn').addEventListener('click', goBack);
  el.querySelector('#lcf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#lcf-reset-btn').addEventListener('click', () => {
    el.querySelector('#lcf-name').value = d.name || '';
  });
  el.querySelector('#lcf-save-btn').addEventListener('click', () => {
    const nameEl = el.querySelector('#lcf-name');
    if (!nameEl.value.trim()) {
      nameEl.style.borderColor = '#ef4444';
      nameEl.focus();
      return;
    }
    goBack();
  });
}

// ── ORGANIZATIONS ─────────────────────────────────────────────────────────────
const _MOCK_ORGANISATIONS = [
  { id:1, name:'OneFor',      externalId:'onefor',      status:'ACTIVE', branches:1 },
  { id:2, name:'Nova Credit', externalId:'nova-credit', status:'ACTIVE', branches:1 },
];

function buildOrganisationsSection() {
  const rows = _MOCK_ORGANISATIONS;
  const rowsHtml = rows.map(r => `
    <tr>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-main,#1a2233);font-weight:500;border-bottom:1px solid var(--border-light,#f0f2f5)">${r.name}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.externalId}</td>
      <td style="padding:12px 16px;border-bottom:1px solid var(--border-light,#f0f2f5)"><span class="la-badge-active">${r.status}</span></td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.branches} branches</td>
      <td style="padding:12px 16px;border-bottom:1px solid var(--border-light,#f0f2f5)">
        <div class="fee-actions">
          <button class="fee-btn-edit" data-org-id="${r.id}" title="Edit">${typeof _I_PENCIL_12 !== 'undefined' ? _I_PENCIL_12 : ''} Edit</button>
          <button class="fee-btn-delete" title="Delete">${typeof _I_BIN_12 !== 'undefined' ? _I_BIN_12 : ''} Delete</button>
        </div>
      </td>
    </tr>`).join('');

  return `
    <div class="fee-wrap">
      <div class="fee-page-header">
        <div class="fee-page-header-left">
          <div class="fee-page-title">Organizations</div>
          <div class="fee-page-sub">Manage organizations and their branches</div>
        </div>
        <button class="btn-create-fee" id="org-create-btn" style="background:#7c3aed;border-color:#7c3aed;">
          ${typeof _I_PLUS_14 !== 'undefined' ? _I_PLUS_14 : '+'} Add Organization
        </button>
      </div>

      <div style="background:var(--card-bg,#fff);border:1px solid var(--border-light,#e8ecf0);border-radius:8px;padding:16px 20px;margin-bottom:16px;">
        <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
          <label style="display:flex;align-items:center;gap:6px;font-size:12.5px;color:var(--text-muted,#6b7a8d);cursor:pointer;white-space:nowrap;">
            <input type="checkbox" style="accent-color:#7c3aed;width:14px;height:14px;"/> Search by external ID
          </label>
          <div style="flex:1;min-width:180px;position:relative;">
            <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--text-muted,#9aa3b0);">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4.5" stroke="currentColor" stroke-width="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </span>
            <input type="text" placeholder="Search by name..." style="width:100%;box-sizing:border-box;padding:8px 12px 8px 32px;font-size:13px;border:1px solid var(--border-light,#e0e4ea);border-radius:6px;background:var(--input-bg,#fff);color:var(--text-main,#1a2233);outline:none;"/>
          </div>
          <div style="position:relative;min-width:160px;">
            <select style="width:100%;padding:8px 32px 8px 12px;font-size:13px;border:1px solid var(--border-light,#e0e4ea);border-radius:6px;background:var(--input-bg,#fff);color:var(--text-main,#1a2233);appearance:none;outline:none;cursor:pointer;">
              <option>All statuses</option><option>Active</option><option>Inactive</option>
            </select>
            <span style="position:absolute;right:10px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--text-muted,#9aa3b0);">
              <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round"/></svg>
            </span>
          </div>
        </div>
      </div>

      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th>Name <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>External ID <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Status</th>
              <th>Branches <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th style="width:160px;">Actions</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>

      <div class="fee-pagination">
        <div style="font-size:13px;color:var(--text-muted)">Showing 1-${rows.length} of ${rows.length} results</div>
        <div class="fee-pag-controls">
          <button class="fee-pag-prev" disabled>Previous</button>
          <button class="fee-pag-num active">1</button>
          <button class="fee-pag-next" disabled>Next</button>
        </div>
      </div>
    </div>`;
}

function openOrganisationForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};
  const isEdit = !!d.id;

  const currencyRows = [
    { name:'US Dollar',              code:'USD', numeric:'840', symbol:'-', exponent:2, type:'Fiat Currency', created:'18.06.2026' },
    { name:'Euro',                   code:'EUR', numeric:'978', symbol:'-', exponent:2, type:'Fiat Currency', created:'18.06.2026' },
    { name:'British Pound Sterling', code:'GBP', numeric:'826', symbol:'-', exponent:2, type:'Fiat Currency', created:'18.06.2026' },
    { name:'Japanese Yen',           code:'JPY', numeric:'392', symbol:'-', exponent:0, type:'Fiat Currency', created:'18.06.2026' },
    { name:'Bahraini Dinar',         code:'BHD', numeric:'048', symbol:'-', exponent:3, type:'Fiat Currency', created:'18.06.2026' },
  ];
  const currRowsHtml = currencyRows.map(c => `
    <tr>
      <td style="padding:10px 14px;font-size:13px;color:var(--text-main,#1a2233);border-bottom:1px solid var(--border-light,#f0f2f5)">${c.name}</td>
      <td style="padding:10px 14px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${c.code}</td>
      <td style="padding:10px 14px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${c.numeric}</td>
      <td style="padding:10px 14px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${c.symbol}</td>
      <td style="padding:10px 14px;font-size:13px;text-align:center;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${c.exponent}</td>
      <td style="padding:10px 14px;font-size:13px;color:#7c3aed;border-bottom:1px solid var(--border-light,#f0f2f5)">${c.type}</td>
      <td style="padding:10px 14px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${c.created}</td>
      <td style="padding:10px 14px;text-align:center;border-bottom:1px solid var(--border-light,#f0f2f5)"><input type="checkbox" style="accent-color:#7c3aed;width:15px;height:15px;"/></td>
      <td style="padding:10px 14px;text-align:center;border-bottom:1px solid var(--border-light,#f0f2f5)"><input type="radio" name="org-base-currency" style="accent-color:#7c3aed;width:15px;height:15px;"/></td>
    </tr>`).join('');

  el.innerHTML = `
    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="orgf-back-btn" title="Back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div>
          <div class="fee-form-heading">${isEdit ? 'Edit Organization' : 'Add Organization'}</div>
          <div class="fee-form-subheading">Configure organization settings</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn-fee-cancel" id="orgf-cancel-btn">Cancel</button>
        <button class="btn-fee-reset"  id="orgf-reset-btn">Reset</button>
        <button class="btn-fee-save"   id="orgf-save-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Save
        </button>
      </div>
    </div>

    <div class="fee-form-body">
      <div class="fee-form-section">
        <div class="fee-form-section-title">Organization Details</div>
        <div class="fee-form-row" style="grid-template-columns:1fr 1fr 1fr;">
          <div class="fee-form-field">
            <label class="fee-form-label">Name</label>
            <input class="fee-form-input" type="text" id="orgf-name" placeholder="e.g. OneFor" value="${d.name ? d.name.replace(/"/g,'&quot;') : ''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">External ID</label>
            <input class="fee-form-input" type="text" id="orgf-ext-id" placeholder="Optional ID from external system" value="${d.externalId || ''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">Status</label>
            <div class="fee-select-wrap">
              <select class="fee-form-select" id="orgf-status">
                <option${(!d.status||d.status==='Active'||d.status==='ACTIVE')?' selected':''}>Active</option>
                <option${(d.status==='Inactive'||d.status==='INACTIVE')?' selected':''}>Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="fee-form-section">
        <div class="fee-form-section-title">Currencies</div>
        <div class="fee-table-wrap" style="margin-top:8px;">
          <table class="fee-table">
            <thead>
              <tr>
                <th>Name</th><th>Code</th><th>Numeric Code</th><th>Symbol</th>
                <th>Minor Unit Exponent</th><th>Currency Type</th><th>Created At</th>
                <th>Select</th><th>Base Currency</th>
              </tr>
            </thead>
            <tbody>${currRowsHtml}</tbody>
          </table>
        </div>
      </div>
    </div>`;

  const goBack = () => {
    if (typeof renderLoansSection === 'function') {
      renderLoansSection('gs-organisations', 'Organizations', 'Manage organizations and their branches');
    }
  };
  el.querySelector('#orgf-back-btn').addEventListener('click', goBack);
  el.querySelector('#orgf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#orgf-reset-btn').addEventListener('click', () => {
    el.querySelector('#orgf-name').value = d.name || '';
    el.querySelector('#orgf-ext-id').value = d.externalId || '';
  });
  el.querySelector('#orgf-save-btn').addEventListener('click', () => {
    const nameEl = el.querySelector('#orgf-name');
    if (!nameEl.value.trim()) { nameEl.style.borderColor='#ef4444'; nameEl.focus(); return; }
    goBack();
  });
}

// ── CURRENCY DEFINITION ───────────────────────────────────────────────────────
const _MOCK_CURRENCIES_GLOBAL = [
  { id:1, name:'US Dollar',              code:'USD', numeric:'840', symbol:'-', exponent:2, type:'Fiat Currency', created:'18.06.2026' },
  { id:2, name:'Euro',                   code:'EUR', numeric:'978', symbol:'-', exponent:2, type:'Fiat Currency', created:'18.06.2026' },
  { id:3, name:'British Pound Sterling', code:'GBP', numeric:'826', symbol:'-', exponent:2, type:'Fiat Currency', created:'18.06.2026' },
  { id:4, name:'Japanese Yen',           code:'JPY', numeric:'392', symbol:'-', exponent:0, type:'Fiat Currency', created:'18.06.2026' },
  { id:5, name:'Bahraini Dinar',         code:'BHD', numeric:'048', symbol:'-', exponent:3, type:'Fiat Currency', created:'18.06.2026' },
];

function buildCurrencyDefinitionSection() {
  const rows = _MOCK_CURRENCIES_GLOBAL;
  const rowsHtml = rows.map(r => `
    <tr>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.id}</td>
      <td style="padding:12px 16px;font-size:13px;color:#7c3aed;font-weight:500;border-bottom:1px solid var(--border-light,#f0f2f5)">${r.name}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.code}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.numeric}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.symbol}</td>
      <td style="padding:12px 16px;font-size:13px;text-align:center;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.exponent}</td>
      <td style="padding:12px 16px;font-size:13px;color:#7c3aed;border-bottom:1px solid var(--border-light,#f0f2f5)">${r.type}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--text-muted,#6b7a8d);border-bottom:1px solid var(--border-light,#f0f2f5)">${r.created}</td>
      <td style="padding:12px 16px;border-bottom:1px solid var(--border-light,#f0f2f5)">
        <div class="fee-actions">
          <button class="fee-btn-edit" data-curr-id="${r.id}" title="Edit">${typeof _I_PENCIL_12 !== 'undefined' ? _I_PENCIL_12 : ''} Edit</button>
          <button class="fee-btn-delete" title="Delete">${typeof _I_BIN_12 !== 'undefined' ? _I_BIN_12 : ''} Delete</button>
        </div>
      </td>
    </tr>`).join('');

  return `
    <div class="fee-wrap">
      <div class="fee-page-header">
        <div class="fee-page-header-left">
          <div class="fee-page-title">Currency definition</div>
          <div class="fee-page-sub">View and manage currencies</div>
        </div>
        <button class="btn-create-fee" id="curr-create-btn" style="background:#7c3aed;border-color:#7c3aed;">
          ${typeof _I_PLUS_14 !== 'undefined' ? _I_PLUS_14 : '+'} Add Currency
        </button>
      </div>

      <div class="fee-table-wrap">
        <table class="fee-table">
          <thead>
            <tr>
              <th style="width:60px;">ID</th>
              <th>Name <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Code <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Numeric Code <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Symbol</th>
              <th>Minor Unit Exponent <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Currency Type <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th>Created At <span style="opacity:.5;font-size:10px;">&#x21C5;</span></th>
              <th style="width:140px;">Actions</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      </div>

      <div class="fee-pagination">
        <div style="font-size:13px;color:var(--text-muted)">Showing 1-${rows.length} of ${rows.length} results</div>
        <div class="fee-pag-controls">
          <button class="fee-pag-prev" disabled>Previous</button>
          <button class="fee-pag-num active">1</button>
          <button class="fee-pag-next" disabled>Next</button>
        </div>
      </div>
    </div>`;
}

function openCurrencyDefinitionForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};

  el.innerHTML = `
    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="currf-back-btn" title="Back">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 13L5 8l5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div>
          <div class="fee-form-heading">Currency definition</div>
          <div class="fee-form-subheading">Configure currency details</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;align-items:center;">
        <button class="btn-fee-cancel" id="currf-cancel-btn">Cancel</button>
        <button class="btn-fee-reset"  id="currf-reset-btn">Reset</button>
        <button class="btn-fee-save"   id="currf-save-btn">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Save
        </button>
      </div>
    </div>

    <div class="fee-form-body">
      <div class="fee-form-section">
        <div class="fee-form-section-title">Currency Information</div>
        <div class="fee-form-row">
          <div class="fee-form-field">
            <label class="fee-form-label">Name</label>
            <input class="fee-form-input" type="text" id="currf-name" placeholder="Currency Name" value="${d.name ? d.name.replace(/"/g,'&quot;') : ''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">Alpha Numeric Code (ISO 3118)</label>
            <input class="fee-form-input" type="text" id="currf-alpha" placeholder="Alpha Numeric Code" value="${d.code || ''}"/>
          </div>
        </div>
        <div class="fee-form-row">
          <div class="fee-form-field">
            <label class="fee-form-label">Numeric Code (ISO 4217)</label>
            <input class="fee-form-input" type="text" id="currf-numeric" placeholder="Numeric Code" value="${d.numeric || ''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">Symbol</label>
            <input class="fee-form-input" type="text" id="currf-symbol" placeholder="Symbol" value="${d.symbol && d.symbol !== '-' ? d.symbol : ''}"/>
          </div>
        </div>
        <div class="fee-form-row">
          <div class="fee-form-field">
            <label class="fee-form-label">Minor Unit Exponent</label>
            <input class="fee-form-input" type="number" id="currf-exponent" placeholder="Minor Unit Exponent" min="0" max="8" value="${d.exponent !== undefined ? d.exponent : ''}"/>
          </div>
          <div class="fee-form-field">
            <label class="fee-form-label">Currency Type</label>
            <div class="fee-select-wrap">
              <select class="fee-form-select" id="currf-type">
                <option value="">Select an item</option>
                <option${d.type==='Fiat Currency'?' selected':''}>Fiat Currency</option>
                <option${d.type==='Crypto Currency'?' selected':''}>Crypto Currency</option>
                <option${d.type==='Virtual Currency'?' selected':''}>Virtual Currency</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const goBack = () => {
    if (typeof renderLoansSection === 'function') {
      renderLoansSection('gs-currency', 'Currency Definition', 'View and manage currencies');
    }
  };
  el.querySelector('#currf-back-btn').addEventListener('click', goBack);
  el.querySelector('#currf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#currf-reset-btn').addEventListener('click', () => {
    el.querySelector('#currf-name').value = d.name || '';
    el.querySelector('#currf-alpha').value = d.code || '';
    el.querySelector('#currf-numeric').value = d.numeric || '';
    el.querySelector('#currf-symbol').value = d.symbol && d.symbol !== '-' ? d.symbol : '';
    el.querySelector('#currf-exponent').value = d.exponent !== undefined ? d.exponent : '';
    el.querySelector('#currf-type').value = d.type || '';
  });
  el.querySelector('#currf-save-btn').addEventListener('click', () => {
    const nameEl = el.querySelector('#currf-name');
    if (!nameEl.value.trim()) { nameEl.style.borderColor='#ef4444'; nameEl.focus(); return; }
    goBack();
  });
}

// ══════════════════════════════════════════════════════════════════════════════
// LOCAL SETTINGS — ROLES
// ══════════════════════════════════════════════════════════════════════════════

const _MOCK_LS_ROLES = [
  { id:'5e5e3a5d-e994-4931-83bd-b0d15784043a', name:'Auditor',           builtIn:true,  created:'07.05.2026' },
  { id:'061ef4d1-3e1f-4f54-90c9-1be720fa123d', name:'BranchAdmin',       builtIn:true,  created:'07.05.2026' },
  { id:'89314cae-e1a0-4a0e-bdd3-dc8e7840a288', name:'BranchManager',     builtIn:true,  created:'07.05.2026' },
  { id:'34075cbb-d0c2-48f5-b9b0-40a8a2fdc99f', name:'LoanOfficer',       builtIn:true,  created:'07.05.2026' },
  { id:'f3c88b82-b183-4585-8500-f9a368daf83b', name:'OrganizationAdmin', builtIn:true,  created:'07.05.2026' },
  { id:'f83c5143-b10c-4cd5-a263-cf8fe96e23b1', name:'SystemAdmin',       builtIn:true,  created:'07.05.2026' },
];

const _MOCK_LS_PERMISSIONS = [
  { key:'branch.accrual.read',              resource:'accrual',      action:'read',   scope:'BRANCH',       desc:'Read accrual data.' },
  { key:'branch.collection.create',         resource:'collection',   action:'create', scope:'BRANCH',       desc:'Register collections on loan accounts.' },
  { key:'branch.collection.read',           resource:'collection',   action:'read',   scope:'BRANCH',       desc:'Read collection data.' },
  { key:'branch.customer.create',           resource:'customer',     action:'create', scope:'BRANCH',       desc:'Create customer details.' },
  { key:'branch.customer.delete',           resource:'customer',     action:'delete', scope:'BRANCH',       desc:'Delete customer details.' },
  { key:'branch.customer.read',             resource:'customer',     action:'read',   scope:'BRANCH',       desc:'Read customer details.' },
  { key:'branch.customer.risk.update',      resource:'customer.risk',action:'update', scope:'BRANCH',       desc:'Update customer risk classification.' },
  { key:'branch.customer.update',           resource:'customer',     action:'update', scope:'BRANCH',       desc:'Update customer details.' },
  { key:'branch.loan.create',               resource:'loan',         action:'create', scope:'BRANCH',       desc:'Create loan records.' },
  { key:'branch.loan.disburse',             resource:'loan',         action:'disburse',scope:'BRANCH',      desc:'Disburse loan funds.' },
  { key:'branch.loan.manage',               resource:'loan',         action:'manage', scope:'BRANCH',       desc:'Manage general loan account administrative fields.' },
  { key:'branch.loan.open',                 resource:'loan',         action:'open',   scope:'BRANCH',       desc:'Open approved loans.' },
  { key:'branch.loan.payoff',               resource:'loan',         action:'payoff', scope:'BRANCH',       desc:'Pay off and close loan accounts.' },
  { key:'branch.loan.read',                 resource:'loan',         action:'read',   scope:'BRANCH',       desc:'Read loan account data within a branch.' },
  { key:'branch.loan.update',               resource:'loan',         action:'update', scope:'BRANCH',       desc:'Update loan account data within a branch.' },
  { key:'branch.repayment.create',          resource:'repayment',    action:'create', scope:'BRANCH',       desc:'Register repayments on loan accounts.' },
  { key:'organization.api_client.manage',   resource:'api_client',   action:'manage', scope:'ORGANIZATION', desc:'Create and assign organization-owned API clients.' },
  { key:'organization.api_client.view',     resource:'api_client',   action:'view',   scope:'ORGANIZATION', desc:'View organization-owned API clients.' },
  { key:'organization.branch.create',       resource:'branch',       action:'create', scope:'ORGANIZATION', desc:"Create branches in the caller's own organization." },
  { key:'organization.branch.delete',       resource:'branch',       action:'delete', scope:'ORGANIZATION', desc:"Delete branches in the caller's own organization." },
  { key:'organization.branch.update',       resource:'branch',       action:'update', scope:'ORGANIZATION', desc:"Update branches in the caller's own organization." },
  { key:'organization.branch.view',         resource:'branch',       action:'view',   scope:'ORGANIZATION', desc:'View branches within an organization.' },
  { key:'organization.currency.create',     resource:'currency',     action:'create', scope:'ORGANIZATION', desc:"Add currencies to the caller's own organization." },
  { key:'organization.currency.delete',     resource:'currency',     action:'delete', scope:'ORGANIZATION', desc:"Remove currencies from the caller's own organization." },
  { key:'organization.currency.update',     resource:'currency',     action:'update', scope:'ORGANIZATION', desc:"Update the caller's own organization currencies." },
  { key:'organization.loan_product.manage', resource:'loan_product', action:'manage', scope:'ORGANIZATION', desc:'Manage loan products for the organization.' },
];

function buildLsRolesSection() {
  const rows = _MOCK_LS_ROLES;
  const rowsHtml = rows.map(r => `
    <tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s"
        onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''">
      <td style="padding:10px 14px;font-size:11.5px;color:var(--accent,#6C47FF);font-family:monospace">${r.id}</td>
      <td style="padding:10px 14px;font-size:12.5px;font-weight:600;color:var(--fg,#1e293b)">${r.name}</td>
      <td style="padding:10px 14px;font-size:12px;color:var(--fg2,#64748b)">${r.builtIn ? 'Yes' : 'No'}</td>
      <td style="padding:10px 14px;font-size:12px;color:var(--fg2,#64748b)">${r.created}</td>
      <td style="padding:10px 14px;text-align:right;white-space:nowrap">
        <button data-role-id="${r.id}" data-role-action="edit"
          style="padding:4px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--accent,#6C47FF);font-size:11.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px;margin-right:6px">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg>
          Edit
        </button>
        <button style="padding:4px 12px;border:1px solid #fee2e2;border-radius:5px;background:var(--card-bg,#fff);color:#dc2626;font-size:11.5px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h10"/><path d="M5 4V2.5h4V4"/><path d="M3 4l.8 7.5h6.4L11 4"/></svg>
          Delete
        </button>
      </td>
    </tr>`).join('');

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:22px">
      <div>
        <div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Roles</div>
        <div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Manage user roles and permissions</div>
      </div>
      <button id="lsr-create-btn"
        style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;background:var(--accent,#6C47FF);color:#fff;border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>
        Create Role
      </button>
    </div>
    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">ID ↑</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Name ↑</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Built-In ↑</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Created At ↑</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Actions</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </div>
    <div style="margin-top:14px;font-size:12px;color:var(--fg2,#94a3b8)">Showing 1-${rows.length} of ${rows.length} results</div>`;
}

function openLsRoleForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};
  const isEdit = !!d.id;

  const permRows = _MOCK_LS_PERMISSIONS.map(p => {
    const scopeColor = p.scope === 'BRANCH' ? 'background:#fff7ed;color:#c2410c;border:1px solid #fed7aa'
                                             : 'background:#f3f0ff;color:#6C47FF;border:1px solid #ddd6fe';
    return `
      <tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
        <td style="padding:10px 14px;width:40px">
          <input type="checkbox" style="width:15px;height:15px;cursor:pointer;accent-color:var(--accent,#6C47FF)">
        </td>
        <td style="padding:10px 14px;font-size:12px;color:var(--accent,#6C47FF);font-family:monospace">${p.key}</td>
        <td style="padding:10px 14px;font-size:12px;color:var(--fg2,#64748b)">${p.desc}</td>
        <td style="padding:10px 14px;text-align:right">
          <span style="padding:3px 9px;border-radius:20px;font-size:10.5px;font-weight:700;${scopeColor}">${p.scope}</span>
        </td>
      </tr>`;
  }).join('');

  el.innerHTML = `
    <div class="fee-form-topbar" style="display:flex;align-items:center;justify-content:space-between;padding:14px 20px;background:var(--card-bg,#fff);border-bottom:1px solid var(--border1,#e2e8f0);margin:-24px -24px 24px -24px">
      <div style="display:flex;align-items:center;gap:12px">
        <button id="lsrf-back-btn" style="width:28px;height:28px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:var(--card-bg,#fff);cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--fg,#1e293b)">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 2L4 7l5 5"/></svg>
        </button>
        <div>
          <div style="font-size:16px;font-weight:700;color:var(--fg,#1e293b)">Role</div>
          <div style="font-size:12px;color:var(--fg2,#94a3b8)">Configure role settings</div>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button id="lsrf-cancel-btn" style="padding:7px 16px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer">Cancel</button>
        <button id="lsrf-reset-btn" style="padding:7px 16px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer">Reset</button>
        <button id="lsrf-save-btn" style="padding:7px 18px;border:none;border-radius:6px;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:6px">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l3 3 7-7"/></svg>
          Save
        </button>
      </div>
    </div>

    <!-- Role Name + Built-In -->
    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:16px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:16px">
        <div>
          <label style="display:block;font-size:11.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Role Name</label>
          <input id="lsrf-name" class="fee-form-input" type="text" placeholder="Enter name" value="${d.name||''}"
            style="width:100%;box-sizing:border-box">
          <div style="font-size:11px;color:var(--fg2,#94a3b8);margin-top:4px">Enter a unique role name without spaces</div>
        </div>
        <div>
          <label style="display:block;font-size:11.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Built-In</label>
          <select id="lsrf-builtin" class="fee-form-select" style="width:100%">
            <option value="No"${(!d.builtIn)?' selected':''}>No</option>
            <option value="Yes"${(d.builtIn)?' selected':''}>Yes</option>
          </select>
          <div style="font-size:11px;color:var(--fg2,#94a3b8);margin-top:4px">Built-in roles are system-defined and have special privileges.</div>
        </div>
      </div>
      <div>
        <label style="display:block;font-size:11.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;text-transform:uppercase;letter-spacing:.04em">Description</label>
        <textarea id="lsrf-desc" class="fee-form-input" rows="4" placeholder="Enter description"
          style="width:100%;box-sizing:border-box;resize:vertical;min-height:80px">${d.description||''}</textarea>
        <div style="font-size:11px;color:var(--fg2,#94a3b8);margin-top:4px">Provide a clear, meaningful description of this role's responsibilities.</div>
      </div>
    </div>

    <!-- Permission Assignment -->
    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">
      <div style="padding:16px 24px;border-bottom:1px solid var(--border1,#e2e8f0)">
        <div style="font-size:14px;font-weight:700;color:var(--fg,#1e293b)">Permission Assignment</div>
        <div style="font-size:12px;color:var(--fg2,#94a3b8);margin-top:2px">Select the permissions this role should have</div>
      </div>
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
            <th style="padding:10px 14px;width:40px"></th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Policy Key</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Description</th>
            <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Scope</th>
          </tr>
        </thead>
        <tbody>${permRows}</tbody>
      </table>
    </div>`;

  const goBack = () => {
    let foundMod = null;
    if (typeof moduleMap !== 'undefined') {
      for (const [key, val] of Object.entries(moduleMap)) {
        if (val.contentId === containerId) { foundMod = key; break; }
      }
    }
    if (typeof renderLoansSection === 'function') {
      renderLoansSection('ls-roles', 'Roles', 'Manage user roles and permissions');
    }
  };

  el.querySelector('#lsrf-back-btn').addEventListener('click', goBack);
  el.querySelector('#lsrf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#lsrf-reset-btn').addEventListener('click', () => {
    el.querySelector('#lsrf-name').value = d.name || '';
    el.querySelector('#lsrf-builtin').value = d.builtIn ? 'Yes' : 'No';
    el.querySelector('#lsrf-desc').value = d.description || '';
  });
  el.querySelector('#lsrf-save-btn').addEventListener('click', () => {
    const nameEl = el.querySelector('#lsrf-name');
    if (!nameEl.value.trim()) { nameEl.style.borderColor='#ef4444'; nameEl.focus(); return; }
    goBack();
  });
}

// ── MOCK DATA: Role Scopes ───────────────────────────────────────────────────
const _MOCK_LS_ROLE_SCOPES = [
  { id:'rs-001', role:'OrganizationAdmin', orgId:'org-001', orgName:'OneFor', branchId:null, branchName:null, scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'rs-002', role:'SystemAdmin',       orgId:'org-001', orgName:'OneFor', branchId:null, branchName:null, scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'rs-003', role:'SystemAdmin',       orgId:'org-001', orgName:'OneFor', branchId:'br-001', branchName:'OneFor HQ', scopeLevel:'BRANCH', status:'ACTIVE' },
];

// ── LIST: Role Scopes ────────────────────────────────────────────────────────
function buildLsRoleScopesSection() {
  const rows = _MOCK_LS_ROLE_SCOPES.map(rs => {
    const scopeBadge = rs.scopeLevel === 'ORGANIZATION'
      ? '<span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#f3f0ff;color:#6C47FF;border:1px solid #ddd6fe;font-size:10.5px;font-weight:700;letter-spacing:.04em">ORGANIZATION</span>'
      : '<span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;font-size:10.5px;font-weight:700;letter-spacing:.04em">BRANCH</span>';
    const statusBadge = rs.status === 'ACTIVE'
      ? '<span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-size:10.5px;font-weight:700;letter-spacing:.04em">ACTIVE</span>'
      : '<span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;font-size:10.5px;font-weight:700;letter-spacing:.04em">INACTIVE</span>';
    const orgCell = rs.branchId
      ? `<td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${rs.orgName} <span style="color:var(--fg2,#94a3b8);font-size:11px">&rsaquo;</span> ${rs.branchName}</td>`
      : `<td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${rs.orgName} <span style="font-size:11px;color:var(--fg2,#94a3b8)">(org-level)</span></td>`;
    const branchCell = rs.branchId
      ? `<td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${rs.branchName}</td>`
      : `<td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#94a3b8)">—</td>`;
    return `<tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s"
        onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''" data-scope-id="${rs.id}">
      <td style="padding:10px 14px;font-size:12.5px;font-weight:600;color:var(--fg,#1e293b)">${rs.role}</td>
      ${orgCell}
      <td style="padding:10px 14px;font-size:12.5px;color:var(--fg,#1e293b)">${rs.orgName}</td>
      ${branchCell}
      <td style="padding:10px 14px">${scopeBadge}</td>
      <td style="padding:10px 14px">${statusBadge}</td>
      <td style="padding:10px 14px;white-space:nowrap">
        <button data-scope-action="overrides" data-scope-id="${rs.id}"
          style="padding:4px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;background:var(--card-bg,#fff);color:var(--accent,#6C47FF);font-size:11.5px;font-weight:600;cursor:pointer;margin-right:6px">Overrides</button>
        <button data-scope-action="deactivate" data-scope-id="${rs.id}"
          style="padding:4px 12px;border:1px solid #fee2e2;border-radius:5px;background:var(--card-bg,#fff);color:#dc2626;font-size:11.5px;font-weight:600;cursor:pointer">Deactivate</button>
      </td>
    </tr>`;
  }).join('');

  const allRoles = [...new Set(_MOCK_LS_ROLE_SCOPES.map(r => r.role))];
  const roleOptions = allRoles.map(r => `<option value="${r}">${r}</option>`).join('');
  const selStyle = 'padding:6px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);min-width:140px;cursor:pointer';
  const labelStyle = 'display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em';

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
      <div>
        <div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Role Scopes</div>
        <div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Bind roles to organization or branch contexts</div>
      </div>
      <button id="lsrs-create-btn"
        style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;background:var(--accent,#6C47FF);color:#fff;border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>
        New Scope
      </button>
    </div>

    <div style="display:flex;gap:14px;margin-bottom:20px;flex-wrap:wrap">
      <div>
        <label style="${labelStyle}">Role</label>
        <select id="lsrs-filter-role" style="${selStyle}">
          <option value="">All roles</option>
          ${roleOptions}
        </select>
      </div>
      <div>
        <label style="${labelStyle}">Organization</label>
        <select id="lsrs-filter-org" style="${selStyle}">
          <option value="">Select an item</option>
          <option value="org-001">OneFor</option>
        </select>
      </div>
      <div>
        <label style="${labelStyle}">Status</label>
        <select id="lsrs-filter-status" style="${selStyle}">
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>
    </div>

    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Role</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Organization</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Branch</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Scope Level</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Status</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Actions</th>
          </tr>
        </thead>
        <tbody id="lsrs-tbody">${rows}</tbody>
      </table>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px">
      <span style="font-size:12px;color:var(--fg2,#94a3b8)">Showing 1-${_MOCK_LS_ROLE_SCOPES.length} of ${_MOCK_LS_ROLE_SCOPES.length} results</span>
      <div style="display:flex;gap:6px">
        <button disabled style="padding:5px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;font-size:12px;font-weight:600;background:var(--card-bg,#fff);color:var(--fg2,#94a3b8);cursor:default">Previous</button>
        <button style="padding:5px 12px;border:1px solid var(--accent,#6C47FF);border-radius:5px;font-size:12px;font-weight:600;background:var(--accent,#6C47FF);color:#fff;cursor:pointer">1</button>
        <button disabled style="padding:5px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;font-size:12px;font-weight:600;background:var(--card-bg,#fff);color:var(--fg2,#94a3b8);cursor:default">Next</button>
      </div>
    </div>`;
}

// ── PERMISSIONS ───────────────────────────────────────────────────────────────
function buildLsPermissionsSection() {
  const writeActions = new Set(['create','delete','update','manage','disburse','open','payoff']);
  const rows = _MOCK_LS_PERMISSIONS.map(p => {
    const scopeBadge = p.scope === 'BRANCH'
      ? '<span style="display:inline-block;padding:2px 8px;border-radius:4px;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;font-size:10.5px;font-weight:700;letter-spacing:.04em">BRANCH</span>'
      : '<span style="display:inline-block;padding:2px 8px;border-radius:4px;background:#f3f0ff;color:#6C47FF;border:1px solid #ddd6fe;font-size:10.5px;font-weight:700;letter-spacing:.04em">ORGANIZATION</span>';
    const actionColor = writeActions.has(p.action) ? '#6C47FF' : 'var(--fg2,#64748b)';
    return `<tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s"
        onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''" data-perm-key="${p.key}">
      <td style="padding:10px 14px"><span style="font-family:monospace;font-size:11.5px;color:#6C47FF;background:#f5f3ff;padding:2px 7px;border-radius:4px;border:1px solid #ede9fe">${p.key}</span></td>
      <td style="padding:10px 14px">${scopeBadge}</td>
      <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${p.resource}</td>
      <td style="padding:10px 14px;font-size:12.5px;color:${actionColor};font-weight:500">${p.action}</td>
      <td style="padding:10px 14px;font-size:12.5px;color:var(--fg2,#64748b)">${p.desc}</td>
      <td style="padding:10px 14px;white-space:nowrap">
        <button data-perm-action="edit" data-perm-key="${p.key}"
          style="padding:4px 11px;border:none;border-radius:5px;background:transparent;color:#6C47FF;font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px;margin-right:4px">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg>
          Edit</button>
        <button data-perm-action="delete" data-perm-key="${p.key}"
          style="padding:4px 11px;border:none;border-radius:5px;background:transparent;color:#dc2626;font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:4px">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h10"/><path d="M5 4V2.5h4V4"/><path d="M3 4l.8 7.5h6.4L11 4"/></svg>
          Delete</button>
      </td>
    </tr>`;
  }).join('');

  const resources = [...new Set(_MOCK_LS_PERMISSIONS.map(p => p.resource))].sort();
  const resOptions = resources.map(r => `<option value="${r}">${r}</option>`).join('');
  const inputStyle = 'width:100%;padding:7px 11px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box';

  return `<div id="lsp-modal-overlay" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,.45);z-index:200;align-items:center;justify-content:center">
    <div style="background:var(--card-bg,#fff);border-radius:12px;padding:32px;width:520px;max-width:calc(100vw - 40px);box-shadow:0 20px 60px rgba(0,0,0,.18)">
      <div style="font-size:18px;font-weight:700;color:var(--fg,#1e293b);margin-bottom:4px">New Permission</div>
      <div style="font-size:12.5px;color:var(--fg2,#64748b);margin-bottom:24px">Add a new permission to the catalogue</div>
      <div style="display:grid;gap:16px">
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Resource</label>
          <input id="lsp-f-resource" placeholder="e.g. loan" style="${inputStyle}">
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Action</label>
          <input id="lsp-f-action" placeholder="e.g. read" style="${inputStyle}">
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Scope</label>
          <select id="lsp-f-scope" style="${inputStyle}">
            <option value="">Select an item</option>
            <option value="BRANCH">BRANCH</option>
            <option value="ORGANIZATION">ORGANIZATION</option>
          </select>
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Policy Key</label>
          <input id="lsp-f-key" placeholder="scope.resource.action" readonly style="${inputStyle};background:var(--table-head-bg,#f8fafc);color:var(--fg2,#64748b);font-family:monospace;font-size:12px">
        </div>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Description</label>
          <textarea id="lsp-f-desc" placeholder="Enter description" rows="3" style="${inputStyle};resize:vertical"></textarea>
        </div>
      </div>
      <div style="display:flex;justify-content:flex-end;gap:10px;margin-top:24px">
        <button id="lsp-modal-cancel" style="padding:8px 20px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer">Cancel</button>
        <button id="lsp-modal-create" style="padding:8px 20px;border:none;border-radius:7px;background:#6C47FF;color:#fff;font-size:13px;font-weight:600;cursor:pointer">Create</button>
      </div>
    </div>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
    <div>
      <div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Permissions</div>
      <div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Manage system permissions and access controls</div>
    </div>
    <button id="lsp-new-btn"
      style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;background:#6C47FF;color:#fff;border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer">
      <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>
      New Permission
    </button>
  </div>

  <div style="display:flex;gap:12px;margin-bottom:20px;flex-wrap:wrap;align-items:flex-end">
    <div style="position:relative;flex:1;min-width:200px">
      <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="4"/><path d="M9.5 9.5l2.5 2.5"/></svg>
      <input id="lsp-filter-search" placeholder="Search by policy key or resource..."
        style="width:100%;padding:7px 11px 7px 30px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:12.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box">
    </div>
    <div>
      <div style="font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em">Scope</div>
      <select id="lsp-filter-scope" style="padding:7px 28px 7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:12.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);min-width:130px;cursor:pointer">
        <option value="">All scopes</option>
        <option value="BRANCH">Branch</option>
        <option value="ORGANIZATION">Organization</option>
      </select>
    </div>
    <div>
      <div style="font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:4px;text-transform:uppercase;letter-spacing:.04em">Resource</div>
      <select id="lsp-filter-resource" style="padding:7px 28px 7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:12.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);min-width:160px;cursor:pointer">
        <option value="">Filter by resource...</option>
        ${resOptions}
      </select>
    </div>
  </div>

  <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">
    <table style="width:100%;border-collapse:collapse">
      <thead>
        <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Policy Key &#x21C5;</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Scope &#x21C5;</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Resource &#x21C5;</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Action &#x21C5;</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Description &#x21C5;</th>
          <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Actions</th>
        </tr>
      </thead>
      <tbody id="lsp-tbody">${rows}</tbody>
    </table>
  </div>
  <div style="margin-top:12px;font-size:12px;color:var(--fg2,#94a3b8)">Showing <span id="lsp-count">${_MOCK_LS_PERMISSIONS.length}</span> of ${_MOCK_LS_PERMISSIONS.length} permissions</div>`;
}

// ── MOCK DATA: Users ──────────────────────────────────────────────────────────
const _MOCK_LS_USERS = [
  { id:'u-001', name:'Arsim Kosumi',     email:'arsim.kosumi@ndbit.net',          status:'ACTIVE', activeRoles:1 },
  { id:'u-002', name:'Ashish Alagiya',   email:'ashish.alagiya@ndbit.net',        status:'ACTIVE', activeRoles:1 },
  { id:'u-003', name:'Atdhetar Ibrahimi',email:'atdhetar.ibrahimi@onefor.com',    status:'ACTIVE', activeRoles:1 },
  { id:'u-004', name:'Elham Hamit',      email:'elham.hamit@ndbit.net',           status:'ACTIVE', activeRoles:1 },
  { id:'u-005', name:'Kushtrim Jashari', email:'kushtrim.jashari@ndbit.net',      status:'ACTIVE', activeRoles:1 },
  { id:'u-006', name:'Ngadhnjim Istrefi',email:'ngadhnjim.istrefi@ndbit.net',     status:'ACTIVE', activeRoles:1 },
  { id:'u-007', name:'Sasa Stanic',      email:'sasa.stanic@ndbit.net',           status:'ACTIVE', activeRoles:1 },
];

// ── LIST: Users ───────────────────────────────────────────────────────────────
function buildLsUsersSection() {
  const rows = _MOCK_LS_USERS.map(u => {
    const statusBadge = u.status === 'ACTIVE'
      ? '<span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;font-size:10.5px;font-weight:700;letter-spacing:.04em">ACTIVE</span>'
      : '<span style="display:inline-block;padding:2px 9px;border-radius:999px;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;font-size:10.5px;font-weight:700;letter-spacing:.04em">INACTIVE</span>';
    return `<tr style="border-bottom:1px solid var(--border1,#e2e8f0);transition:background .12s"
        onmouseover="this.style.background='var(--hover-bg,#f8fafc)'" onmouseout="this.style.background=''" data-user-id="${u.id}">
      <td style="padding:11px 14px;font-size:13px;font-weight:600;color:var(--fg,#1e293b)">${u.name}</td>
      <td style="padding:11px 14px;font-size:13px;color:#6C47FF">${u.email}</td>
      <td style="padding:11px 14px">${statusBadge}</td>
      <td style="padding:11px 14px;font-size:13px;color:var(--fg2,#64748b);text-align:center">${u.activeRoles}</td>
      <td style="padding:11px 14px;white-space:nowrap">
        <button data-user-action="view" data-user-id="${u.id}"
          style="padding:5px 13px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:var(--card-bg,#fff);color:var(--accent,#6C47FF);font-size:12px;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:5px;margin-right:6px">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="7" cy="7" rx="5" ry="3.5"/><circle cx="7" cy="7" r="1.5"/></svg>
          View</button>
        <button data-user-action="deactivate" data-user-id="${u.id}"
          style="padding:5px 13px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);font-size:12px;font-weight:600;cursor:pointer">
          ${u.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}</button>
      </td>
    </tr>`;
  }).join('');

  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">
      <div>
        <div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Users</div>
        <div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Manage system users and access controls</div>
      </div>
      <button id="lsu-create-btn"
        style="display:inline-flex;align-items:center;gap:7px;padding:9px 18px;background:var(--accent,#6C47FF);color:#fff;border:none;border-radius:7px;font-size:13px;font-weight:600;cursor:pointer">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>
        Create User
      </button>
    </div>

    <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap;align-items:center">
      <div style="position:relative;flex:1;min-width:200px;max-width:320px">
        <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--fg2,#94a3b8)" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="6" cy="6" r="4"/><path d="M9.5 9.5l2.5 2.5"/></svg>
        <input id="lsu-filter-search" placeholder="Search by name or email..."
          style="width:100%;padding:7px 11px 7px 30px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:12.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box">
      </div>
      <select id="lsu-filter-status" style="padding:7px 28px 7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:12.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);min-width:140px;cursor:pointer">
        <option value="">All statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
    </div>

    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">
      <table style="width:100%;border-collapse:collapse">
        <thead>
          <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">User &#x21C5;</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Email &#x21C5;</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Status</th>
            <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Active Roles</th>
            <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:700;color:var(--fg2,#64748b);letter-spacing:.04em;text-transform:uppercase">Actions</th>
          </tr>
        </thead>
        <tbody id="lsu-tbody">${rows}</tbody>
      </table>
    </div>

    <div style="display:flex;align-items:center;justify-content:space-between;margin-top:14px">
      <span style="font-size:12px;color:var(--fg2,#94a3b8)">Showing 1-${_MOCK_LS_USERS.length} of ${_MOCK_LS_USERS.length} results</span>
      <div style="display:flex;gap:6px">
        <button disabled style="padding:5px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;font-size:12px;font-weight:600;background:var(--card-bg,#fff);color:var(--fg2,#94a3b8);cursor:default">Previous</button>
        <button style="padding:5px 12px;border:1px solid var(--accent,#6C47FF);border-radius:5px;font-size:12px;font-weight:600;background:var(--accent,#6C47FF);color:#fff;cursor:pointer">1</button>
        <button disabled style="padding:5px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:5px;font-size:12px;font-weight:600;background:var(--card-bg,#fff);color:var(--fg2,#94a3b8);cursor:default">Next</button>
      </div>
    </div>`;
}

// ── FORM: Create / Edit User ──────────────────────────────────────────────────
function openLsUserForm(containerId, data) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const d = data || {};
  const isEdit = !!d.id;
  const inputStyle = 'width:100%;padding:10px 13px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13.5px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);box-sizing:border-box';
  const hintStyle = 'font-size:11.5px;color:var(--fg2,#94a3b8);margin-top:4px';

  el.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);margin:-20px -20px 28px -20px;position:sticky;top:0;z-index:10">
      <div style="display:flex;align-items:center;gap:14px">
        <button id="lsuf-back-btn" style="display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);cursor:pointer;color:var(--fg,#1e293b)">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11L5 7l4-4"/></svg>
        </button>
        <div>
          <div style="font-size:17px;font-weight:700;color:var(--fg,#1e293b)">${isEdit ? 'Edit User' : 'Create User'}</div>
          <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:1px">${isEdit ? 'Update user details' : 'Invite a new user to the system'}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px">
        <button id="lsuf-cancel-btn" style="padding:7px 16px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer">Cancel</button>
        <button id="lsuf-reset-btn" style="padding:7px 16px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer">Reset</button>
        <button id="lsuf-save-btn" style="display:inline-flex;align-items:center;gap:6px;padding:7px 18px;border:none;border-radius:7px;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7l3.5 3.5L12 3"/></svg>
          Save
        </button>
      </div>
    </div>

    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:24px">
      <div style="font-size:14px;font-weight:700;color:var(--fg,#1e293b);margin-bottom:20px;padding-bottom:12px;border-bottom:1px solid var(--border1,#e2e8f0)">User Details</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:20px">
        <div>
          <label style="display:block;font-size:12.5px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Full Name</label>
          <input id="lsuf-name" placeholder="Enter full name" value="${d.name||''}" style="${inputStyle}">
          <div style="${hintStyle}">Enter the user's full name</div>
        </div>
        <div>
          <label style="display:block;font-size:12.5px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Email</label>
          <input id="lsuf-email" type="email" placeholder="Enter email address" value="${d.email||''}" style="${inputStyle}">
          <div style="${hintStyle}">Enter a valid email address</div>
        </div>
      </div>
      <div style="max-width:420px">
        <label style="display:block;font-size:12.5px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px">Status</label>
        <select id="lsuf-status" style="${inputStyle}">
          <option value="ACTIVE" ${(d.status||'ACTIVE')==='ACTIVE'?'selected':''}>Active</option>
          <option value="INACTIVE" ${d.status==='INACTIVE'?'selected':''}>Inactive</option>
        </select>
      </div>
    </div>`;

  function goBack() {
    el.innerHTML = buildLsUsersSection();
    wireUsersList(el, containerId);
  }

  el.querySelector('#lsuf-back-btn').addEventListener('click', goBack);
  el.querySelector('#lsuf-cancel-btn').addEventListener('click', goBack);
  el.querySelector('#lsuf-reset-btn').addEventListener('click', () => {
    el.querySelector('#lsuf-name').value = d.name || '';
    el.querySelector('#lsuf-email').value = d.email || '';
    el.querySelector('#lsuf-status').value = d.status || 'ACTIVE';
  });
  el.querySelector('#lsuf-save-btn').addEventListener('click', () => {
    const nameEl = el.querySelector('#lsuf-name');
    const emailEl = el.querySelector('#lsuf-email');
    if (!nameEl.value.trim()) { nameEl.style.borderColor='#ef4444'; nameEl.focus(); return; }
    if (!emailEl.value.trim()) { emailEl.style.borderColor='#ef4444'; emailEl.focus(); return; }
    if (isEdit) {
      const u = _MOCK_LS_USERS.find(x => x.id === d.id);
      if (u) { u.name = nameEl.value.trim(); u.email = emailEl.value.trim(); u.status = el.querySelector('#lsuf-status').value; }
    } else {
      _MOCK_LS_USERS.push({ id:'u-'+(Date.now()), name:nameEl.value.trim(), email:emailEl.value.trim(), status:el.querySelector('#lsuf-status').value, activeRoles:0 });
    }
    goBack();
  });
}

function wireUsersList(el, containerId) {
  const createBtn = el.querySelector('#lsu-create-btn');
  if (createBtn) createBtn.addEventListener('click', () => openLsUserForm(containerId, null));

  el.querySelectorAll('[data-user-action="view"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = _MOCK_LS_USERS.find(x => x.id === btn.dataset.userId);
      if (u) openLsUserForm(containerId, u);
    });
  });
  el.querySelectorAll('[data-user-action="deactivate"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const u = _MOCK_LS_USERS.find(x => x.id === btn.dataset.userId);
      if (u) {
        u.status = u.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
        el.innerHTML = buildLsUsersSection();
        wireUsersList(el, containerId);
      }
    });
  });

  const filterSearch = el.querySelector('#lsu-filter-search');
  const filterStatus = el.querySelector('#lsu-filter-status');
  function applyUserFilters() {
    const q = (filterSearch ? filterSearch.value : '').toLowerCase();
    const s = filterStatus ? filterStatus.value : '';
    el.querySelectorAll('#lsu-tbody tr').forEach(row => {
      const u = _MOCK_LS_USERS.find(x => x.id === row.dataset.userId);
      if (!u) { row.hidden = true; return; }
      const matchQ = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
      const matchS = !s || u.status === s;
      row.hidden = !(matchQ && matchS);
    });
  }
  if (filterSearch) filterSearch.addEventListener('input', applyUserFilters);
  if (filterStatus) filterStatus.addEventListener('change', applyUserFilters);
}


// ─── DASHBOARD ────────────────────────────────────────────────────────────────

const _MOCK_DASH_DAILY = (function() {
  const rows = [];
  const today = new Date(2026,9,8); // Oct 8 2026
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const label = d.toLocaleDateString('en-GB',{month:'short',day:'2-digit'});
    const opened = Math.round(8 + Math.random()*14);
    const closed = Math.round(3 + Math.random()*8);
    const disbursed = Math.round((opened * (12000 + Math.random()*8000)));
    rows.push({ label, opened, closed, disbursed });
  }
  // compute cumulative disbursed and running outstanding
  let cumDisbursed = 0;
  let outstanding = 4200000;
  rows.forEach(r => {
    cumDisbursed += r.disbursed;
    r.cumDisbursed = cumDisbursed;
    outstanding = outstanding + r.disbursed - Math.round(r.closed * 9500);
    r.outstanding = outstanding;
  });
  return rows;
})();

const _MOCK_DASH_RECENT = [
  { loanId:'LN-2026-4421', customer:'Agim Berisha',    type:'Personal Loan',   amount:15000, date:'2026-10-08', action:'Disbursed' },
  { loanId:'LN-2026-4420', customer:'Blerina Krasniqi', type:'Housing Loan',   amount:85000, date:'2026-10-08', action:'Disbursed' },
  { loanId:'LN-2026-4419', customer:'Dardan Osmani',   type:'Business Loan',   amount:32000, date:'2026-10-07', action:'Disbursed' },
  { loanId:'LN-2026-4418', customer:'Fjolla Gashi',     type:'Personal Loan',   amount:8500,  date:'2026-10-07', action:'Closed' },
  { loanId:'LN-2026-4417', customer:'Herolind Bajrami', type:'Personal Loan',   amount:12000, date:'2026-10-07', action:'Disbursed' },
  { loanId:'LN-2026-4416', customer:'Iliriana Hoxha',  type:'Agriculture Loan',amount:22000, date:'2026-10-06', action:'Closed' },
  { loanId:'LN-2026-4415', customer:'Jetmir Seferi',   type:'Business Loan',   amount:47000, date:'2026-10-06', action:'Disbursed' },
  { loanId:'LN-2026-4414', customer:'Kujtim Rexhepi',  type:'Personal Loan',   amount:9500,  date:'2026-10-05', action:'Closed' },
  { loanId:'LN-2026-4413', customer:'Lirije Morina',   type:'Housing Loan',    amount:91000, date:'2026-10-05', action:'Disbursed' },
  { loanId:'LN-2026-4412', customer:'Mentor Asllani',  type:'Personal Loan',   amount:7000,  date:'2026-10-04', action:'Closed' },
];

function _dashFmt(n) {
  if (n >= 1000000) return '€' + (n/1000000).toFixed(2) + 'M';
  if (n >= 1000) return '€' + (n/1000).toFixed(1) + 'K';
  return '€' + n.toLocaleString();
}

function buildDashboardSection() {
  const days = _MOCK_DASH_DAILY;
  const last = days[days.length-1];
  const prev = days[days.length-2];

  // KPI values
  const activeLoans = 1847;
  const todayOpened = last.opened;
  const todayClosed = last.closed;
  const todayDisbursed = last.disbursed;
  const cumDisbursed = last.cumDisbursed;
  const outstanding = last.outstanding;
  const overdueCount = 94;
  const nplRatio = 3.2;
  const par30 = 5.8;

  // Sparkline helper — 30-day bar chart in SVG (simplified, same height scale)
  function sparkBars(values, color, chartH) {
    const W = 520; const H = chartH || 80;
    const max = Math.max(...values);
    const bw = Math.floor(W / values.length) - 1;
    const bars = values.map((v,i) => {
      const bh = max > 0 ? Math.round((v/max)*(H-4)) : 1;
      const x = i * (bw+1);
      const y = H - bh;
      return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="2" fill="${color}" opacity="0.85"/>`;
    }).join('');
    return `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">${bars}</svg>`;
  }

  // Line chart helper
  function sparkLine(values, color, chartH) {
    const W = 520; const H = chartH || 80;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const pts = values.map((v,i) => {
      const x = Math.round(i/(values.length-1)*W);
      const y = Math.round(H - ((v-min)/range)*(H-6) - 3);
      return `${x},${y}`;
    }).join(' ');
    const areaClose = ` ${W},${H} 0,${H}`;
    return `<svg width="100%" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <defs><linearGradient id="lg_${color.replace('#','')}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${color}" stop-opacity="0.18"/><stop offset="100%" stop-color="${color}" stop-opacity="0.01"/></linearGradient></defs>
      <polygon points="${pts} ${areaClose}" fill="url(#lg_${color.replace('#','')})"/>
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    </svg>`;
  }

  const openedVals = days.map(d=>d.opened);
  const closedVals = days.map(d=>d.closed);
  const disbVals   = days.map(d=>d.disbursed);
  const cumVals    = days.map(d=>d.cumDisbursed);
  const outVals    = days.map(d=>d.outstanding);

  // Donut for loan status
  function donutSlice(cx,cy,r,start,end,color) {
    const toRad = a => (a-90)*Math.PI/180;
    const s = {x:cx+r*Math.cos(toRad(start)), y:cy+r*Math.sin(toRad(start))};
    const e = {x:cx+r*Math.cos(toRad(end)),   y:cy+r*Math.sin(toRad(end))};
    const large = end-start > 180 ? 1 : 0;
    return `<path d="M ${cx},${cy} L ${s.x},${s.y} A ${r},${r} 0 ${large} 1 ${e.x},${e.y} Z" fill="${color}"/>`;
  }
  // status: active 72%, overdue 5%, closed 21%, written-off 2%
  const statusSlices = [
    { label:'Active',     pct:72, color:'#6C47FF' },
    { label:'Overdue',    pct:5,  color:'#f59e0b' },
    { label:'Closed',     pct:21, color:'#10b981' },
    { label:'Written-off',pct:2,  color:'#ef4444' },
  ];
  let ang = 0;
  const donutPaths = statusSlices.map(s => {
    const span = s.pct/100*360;
    const path = donutSlice(60,60,55,ang,ang+span-0.5,s.color);
    ang += span;
    return path;
  }).join('');
  const donutSvg = `<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    ${donutPaths}
    <circle cx="60" cy="60" r="30" fill="var(--card-bg,#fff)"/>
    <text x="60" y="55" text-anchor="middle" font-size="14" font-weight="700" fill="var(--fg,#1e293b)">${activeLoans}</text>
    <text x="60" y="70" text-anchor="middle" font-size="9" fill="var(--fg2,#64748b)">Total</text>
  </svg>`;

  // product distribution bars (horizontal)
  const byProduct = [
    { label:'Personal Loan',    pct:44, color:'#6C47FF' },
    { label:'Business Loan',    pct:26, color:'#3b82f6' },
    { label:'Housing Loan',     pct:18, color:'#10b981' },
    { label:'Agriculture Loan', pct:8,  color:'#f59e0b' },
    { label:'Other',            pct:4,  color:'#94a3b8' },
  ];
  const productBars = byProduct.map(p =>
    `<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px">
      <div style="width:110px;font-size:12px;color:var(--fg2,#64748b);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.label}</div>
      <div style="flex:1;height:8px;border-radius:4px;background:var(--border1,#e2e8f0);overflow:hidden">
        <div style="width:${p.pct}%;height:100%;background:${p.color};border-radius:4px"></div>
      </div>
      <div style="width:32px;text-align:right;font-size:12px;font-weight:600;color:var(--fg,#1e293b)">${p.pct}%</div>
    </div>`
  ).join('');

  // Recent activity table rows
  const recentRows = _MOCK_DASH_RECENT.map(r => {
    const ac = r.action === 'Disbursed'
      ? 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0'
      : 'background:#f1f5f9;color:#475569;border:1px solid #e2e8f0';
    return `<tr>
      <td style="padding:11px 14px;font-size:12.5px;font-family:monospace;color:#6C47FF">${r.loanId}</td>
      <td style="padding:11px 14px;font-size:13px;color:var(--fg,#1e293b)">${r.customer}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b)">${r.type}</td>
      <td style="padding:11px 14px;font-size:13px;font-weight:600;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">${_dashFmt(r.amount)}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b)">${r.date}</td>
      <td style="padding:11px 14px"><span style="padding:2px 10px;border-radius:12px;font-size:11.5px;font-weight:600;${ac}">${r.action}</span></td>
    </tr>`;
  }).join('');

  function kpi(label, value, sub, subColor) {
    return `<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
      <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:8px">${label}</div>
      <div style="font-size:24px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums;line-height:1">${value}</div>
      ${sub ? `<div style="font-size:12px;color:${subColor||'var(--fg2,#64748b)'};margin-top:6px">${sub}</div>` : ''}
    </div>`;
  }

  function chartCard(title, svgContent, chartH) {
    return `<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
      <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:14px">${title}</div>
      <div style="height:${chartH||88}px;overflow:hidden">${svgContent}</div>
    </div>`;
  }

  // X-axis labels (every 5th)
  const xLabels = days.map((d,i) => i%5===0 ? d.label : '').filter(Boolean);
  const xLabelHtml = `<div style="display:flex;justify-content:space-between;padding:0 2px;margin-top:4px">
    ${days.map((d,i)=>i%5===0?`<span style="font-size:10px;color:var(--fg2,#64748b)">${d.label}</span>`:'').filter(x=>x).join('')}
  </div>`;

  return `<div style="padding:24px;max-width:1400px">
    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">
      <div>
        <div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Dashboard</div>
        <div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Loan portfolio overview — as of 08 Oct 2026</div>
      </div>
      <div style="display:flex;gap:8px">
        <select style="padding:7px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);cursor:pointer">
          <option>Last 30 days</option><option>Last 7 days</option><option>This month</option><option>This year</option>
        </select>
      </div>
    </div>


    <!-- Portfolio Position card -->
    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:20px">
      <div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px">
        <div style="font-size:15px;font-weight:700;color:var(--fg,#1e293b)">Portfolio Position</div>
        <div style="font-size:12px;color:var(--fg2,#64748b)">at 7 October 2026</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0;border:1px solid var(--border1,#e2e8f0);border-radius:8px;overflow:hidden">
        <!-- Row 1 -->
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0);border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Loans</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">563</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0);border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Outstanding Principal</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">212,320.33</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0);border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Due Principal</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">28,553.81</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0);border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Due Interest</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">4,865.62</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0);border-bottom:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Due Penalty</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">606.95</div>
        </div>
        <!-- Total Due — highlighted -->
        <div style="padding:13px 18px;border-bottom:1px solid var(--border1,#e2e8f0);background:#f5f3ff">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#6C47FF;margin-bottom:5px;font-weight:600">Total Due</div>
          <div style="font-size:20px;font-weight:700;color:#6C47FF;font-variant-numeric:tabular-nums">34,026.38</div>
        </div>
        <!-- Row 2 -->
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Interest Accrued to Date</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">13,613.45</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Penalty Accrued to Date</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">878.34</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Collections (type 2)</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">128,315.18</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0)">
          <div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:5px">Early Repayments (type 13)</div>
          <div style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">72,725.42</div>
        </div>
        <div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0)"></div>
        <div style="padding:13px 18px"></div>
      </div>
    </div>

    <!-- KPI row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin-bottom:20px">
      ${kpi('Active Loans', activeLoans.toLocaleString(), '↑ 23 this week', '#16a34a')}
      ${kpi('Today Opened', todayOpened, `${todayOpened} new originations`, '#6C47FF')}
      ${kpi('Today Closed', todayClosed, `${todayClosed} payoffs today`, 'var(--fg2,#64748b)')}
      ${kpi('Today Disbursed', _dashFmt(todayDisbursed), `${todayOpened} loans`, '#3b82f6')}
      ${kpi('Overdue Loans', overdueCount, '↑ 5 vs yesterday', '#f59e0b')}
      ${kpi('NPL Ratio', nplRatio + '%', 'PAR30: ' + par30 + '%', '#ef4444')}
    </div>

    <!-- Chart row 1: opened/closed bars + disbursed bars -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Loans Opened vs Closed</div>
        <div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:12px;display:flex;gap:16px">
          <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#6C47FF;margin-right:4px"></span>Opened</span>
          <span><span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:#10b981;margin-right:4px"></span>Closed</span>
        </div>
        ${sparkBars(openedVals,'#6C47FF',72)}
        ${sparkBars(closedVals,'#10b981',40)}
        ${xLabelHtml}
      </div>
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Daily Disbursed Amount</div>
        <div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:12px">Amount disbursed per day</div>
        ${sparkBars(disbVals,'#3b82f6',112)}
        ${xLabelHtml}
      </div>
    </div>

    <!-- Chart row 2: cumulative + outstanding line charts -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Cumulative Disbursed Amount</div>
        <div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:4px">Running total — last 30 days</div>
        <div style="font-size:18px;font-weight:700;color:#3b82f6;margin-bottom:8px;font-variant-numeric:tabular-nums">${_dashFmt(cumDisbursed)}</div>
        ${sparkLine(cumVals,'#3b82f6',88)}
        ${xLabelHtml}
      </div>
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Outstanding Amount</div>
        <div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:4px">End-of-day portfolio balance</div>
        <div style="font-size:18px;font-weight:700;color:#6C47FF;margin-bottom:8px;font-variant-numeric:tabular-nums">${_dashFmt(outstanding)}</div>
        ${sparkLine(outVals,'#6C47FF',88)}
        ${xLabelHtml}
      </div>
    </div>

    <!-- Bottom row: donut + product distribution + recent activity -->
    <div style="display:grid;grid-template-columns:1fr 1fr 2fr;gap:14px;margin-bottom:14px">
      <!-- Status donut -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:16px">Loan Status</div>
        <div style="display:flex;align-items:center;gap:18px">
          ${donutSvg}
          <div>
            ${statusSlices.map(s=>`<div style="display:flex;align-items:center;gap:7px;margin-bottom:8px">
              <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${s.color};flex-shrink:0"></span>
              <span style="font-size:12px;color:var(--fg2,#64748b)">${s.label}</span>
              <span style="font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-left:auto">${s.pct}%</span>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <!-- By product -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:16px">Loans by Product</div>
        ${productBars}
      </div>

      <!-- Recent activity -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">
        <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:12px">Recent Activity</div>
        <div style="overflow-x:auto">
          <table style="width:100%;border-collapse:collapse">
            <thead><tr style="border-bottom:1px solid var(--border1,#e2e8f0)">
              <th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Loan ID</th>
              <th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Customer</th>
              <th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Type</th>
              <th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Amount</th>
              <th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Date</th>
              <th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Action</th>
            </tr></thead>
            <tbody>
              ${recentRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>`;
}


// ─── LOCAL SETTINGS: SESSIONS ─────────────────────────────────────────────────

const _MOCK_LS_SESSIONS = [
  { id:'s-001', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'07.11.2026 14:00:11', status:'ACTIVE',  revokedIp:null },
  { id:'s-002', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'07.11.2026 11:18:09', status:'REVOKED', revokedIp:null },
  { id:'s-003', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'07.11.2026 09:03:27', status:'ACTIVE',  revokedIp:null },
  { id:'s-004', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'07.11.2026 09:02:36', status:'REVOKED', revokedIp:null },
  { id:'s-005', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'07.11.2026 02:00:24', status:'REVOKED', revokedIp:null },
  { id:'s-006', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'07.11.2026 00:31:22', status:'REVOKED', revokedIp:null },
  { id:'s-007', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'06.11.2026 23:26:22', status:'REVOKED', revokedIp:null },
  { id:'s-008', userId:'u-001', userName:'Arsim Kosumi',   email:'arsim.kosumi@ndbit.net',  createdIp:null, expires:'06.11.2026 22:56:11', status:'ACTIVE',  revokedIp:null },
  { id:'s-009', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'06.11.2026 22:08:47', status:'REVOKED', revokedIp:null },
  { id:'s-010', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'06.11.2026 20:50:17', status:'REVOKED', revokedIp:null },
  { id:'s-011', userId:'u-007', userName:'Sasa Stanic',    email:'sasa.stanic@ndbit.net',   createdIp:null, expires:'06.11.2026 19:42:06', status:'REVOKED', revokedIp:null },
  { id:'s-012', userId:'u-002', userName:'Ashish Alagiya', email:'ashish.alagiya@ndbit.net', createdIp:null, expires:'06.11.2026 18:30:00', status:'ACTIVE',  revokedIp:null },
  { id:'s-013', userId:'u-004', userName:'Elham Hamit',    email:'elham.hamit@ndbit.net',   createdIp:null, expires:'06.11.2026 17:15:44', status:'REVOKED', revokedIp:null },
  { id:'s-014', userId:'u-005', userName:'Kushtrim Jashari',email:'kushtrim.jashari@ndbit.net',createdIp:null,expires:'06.11.2026 16:02:11',status:'ACTIVE', revokedIp:null },
];

function buildLsSessionsSection() {
  const users = [...new Set(_MOCK_LS_SESSIONS.map(s => s.userName))].sort();

  const rows = _MOCK_LS_SESSIONS.map(s => {
    const isActive = s.status === 'ACTIVE';
    const statusBadge = isActive
      ? `<span style="display:inline-block;padding:3px 11px;border-radius:12px;font-size:11.5px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0">${s.status}</span>`
      : `<span style="display:inline-block;padding:3px 11px;border-radius:12px;font-size:11.5px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca">${s.status}</span>`;
    const actionHtml = isActive
      ? `<button data-session-id="${s.id}" class="ls-sess-revoke-btn" style="display:inline-flex;align-items:center;gap:5px;padding:5px 14px;border:1px solid #fca5a5;border-radius:7px;background:#fff;color:#dc2626;font-size:12.5px;font-weight:600;cursor:pointer">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="7" width="10" height="7" rx="1.5" stroke="#dc2626" stroke-width="1.5"/><path d="M5 7V5a3 3 0 0 1 6 0v2" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round"/></svg>
          Revoke
        </button>`
      : `<span style="font-size:13px;color:var(--fg2,#64748b)">Revoked</span>`;
    return `<tr data-session-id="${s.id}" data-user="${s.userName}" data-status="${s.status}">
      <td style="padding:12px 16px">
        <div style="font-size:13.5px;font-weight:600;color:var(--fg,#1e293b)">${s.userName}</div>
        <div style="font-size:12px;color:var(--fg2,#64748b);margin-top:1px">${s.email}</div>
      </td>
      <td style="padding:12px 16px;font-size:13px;color:var(--fg2,#64748b)">${s.createdIp || '—'}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">${s.expires}</td>
      <td style="padding:12px 16px">${statusBadge}</td>
      <td style="padding:12px 16px;font-size:13px;color:var(--fg2,#64748b)">${s.revokedIp || '—'}</td>
      <td style="padding:12px 16px">${actionHtml}</td>
    </tr>`;
  }).join('');

  const userOptions = users.map(u => `<option value="${u}">${u}</option>`).join('');

  return `<div style="padding:0">
    <!-- Page header -->
    <div style="display:flex;align-items:center;justify-content:space-between;padding:24px 28px 0">
      <div>
        <div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Sessions</div>
        <div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">View and revoke active refresh token sessions</div>
      </div>
      <button id="ls-sess-revoke-all-btn" style="padding:8px 18px;border:1.5px solid #fca5a5;border-radius:8px;background:#fff;color:#dc2626;font-size:13px;font-weight:600;cursor:pointer">
        Revoke All for User
      </button>
    </div>

    <!-- Filter bar -->
    <div style="padding:20px 28px 0">
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 22px">
        <div style="display:flex;align-items:flex-end;gap:16px;flex-wrap:wrap">
          <!-- Search -->
          <div style="flex:1;min-width:220px">
            <div style="position:relative">
              <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none" width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="9" cy="9" r="6" stroke="#94a3b8" stroke-width="1.7"/><path d="m14 14 3 3" stroke="#94a3b8" stroke-width="1.7" stroke-linecap="round"/></svg>
              <input id="ls-sess-search" placeholder="Search by user name or email..." style="width:100%;box-sizing:border-box;padding:9px 12px 9px 33px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);outline:none" />
            </div>
          </div>
          <!-- User filter -->
          <div style="min-width:160px">
            <div style="font-size:11.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px">User</div>
            <select id="ls-sess-user-filter" style="width:100%;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);cursor:pointer;outline:none">
              <option value="">All users</option>
              ${userOptions}
            </select>
          </div>
          <!-- Status filter -->
          <div style="min-width:140px">
            <div style="font-size:11.5px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px">Status</div>
            <select id="ls-sess-status-filter" style="width:100%;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);cursor:pointer;outline:none">
              <option value="">All statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="REVOKED">Revoked</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div style="padding:16px 28px 28px">
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">
        <table style="width:100%;border-collapse:collapse" id="ls-sess-table">
          <thead>
            <tr style="background:var(--table-head-bg,#f8fafc);border-bottom:1px solid var(--border1,#e2e8f0)">
              <th style="padding:11px 16px;text-align:left;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b)">User</th>
              <th style="padding:11px 16px;text-align:left;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b)">Created IP</th>
              <th style="padding:11px 16px;text-align:left;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b)">Expires</th>
              <th style="padding:11px 16px;text-align:left;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b)">Status</th>
              <th style="padding:11px 16px;text-align:left;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b)">Revoked IP</th>
              <th style="padding:11px 16px;text-align:left;font-size:11.5px;font-weight:600;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b)">Actions</th>
            </tr>
          </thead>
          <tbody id="ls-sess-tbody">
            ${rows}
          </tbody>
        </table>
      </div>
    </div>
  </div>`;
}

function wireLsSessionsList(el) {
  const search       = el.querySelector('#ls-sess-search');
  const userFilter   = el.querySelector('#ls-sess-user-filter');
  const statusFilter = el.querySelector('#ls-sess-status-filter');
  const revokeAllBtn = el.querySelector('#ls-sess-revoke-all-btn');

  function applyFilters() {
    const q  = search       ? search.value.toLowerCase()       : '';
    const u  = userFilter   ? userFilter.value                  : '';
    const st = statusFilter ? statusFilter.value                : '';
    el.querySelectorAll('#ls-sess-tbody tr').forEach(row => {
      const s = _MOCK_LS_SESSIONS.find(x => x.id === row.dataset.sessionId);
      if (!s) { row.hidden = true; return; }
      const matchQ  = !q  || s.userName.toLowerCase().includes(q) || s.email.toLowerCase().includes(q);
      const matchU  = !u  || s.userName === u;
      const matchSt = !st || s.status === st;
      row.hidden = !(matchQ && matchU && matchSt);
    });
  }

  if (search)       search.addEventListener('input', applyFilters);
  if (userFilter)   userFilter.addEventListener('change', applyFilters);
  if (statusFilter) statusFilter.addEventListener('change', applyFilters);

  // Individual revoke
  el.addEventListener('click', function(e) {
    const btn = e.target.closest('.ls-sess-revoke-btn');
    if (!btn) return;
    const sid = btn.dataset.sessionId;
    const sess = _MOCK_LS_SESSIONS.find(x => x.id === sid);
    if (!sess) return;
    sess.status = 'REVOKED';
    // re-render
    const container = el.closest('[id]') || el;
    const containerId = container.id || el.id;
    container.innerHTML = buildLsSessionsSection();
    wireLsSessionsList(container);
  });

  // Revoke all for selected user
  if (revokeAllBtn) {
    revokeAllBtn.addEventListener('click', function() {
      const selectedUser = userFilter ? userFilter.value : '';
      _MOCK_LS_SESSIONS.forEach(s => {
        if (!selectedUser || s.userName === selectedUser) {
          s.status = 'REVOKED';
        }
      });
      const container = el.closest('[id]') || el;
      container.innerHTML = buildLsSessionsSection();
      wireLsSessionsList(container);
    });
  }
}

// ═══════════════════════════════════════════════════════════════
//  USER ROLES  (ls-user-roles)
// ═══════════════════════════════════════════════════════════════

const _MOCK_LS_USER_ROLES = [
  { id:'ur-001', userId:'u-010', userName:'Ashish Alagiya',   email:'ashish.alagiya@ndbit.net',      role:'SystemAdmin',       org:'OneFor', branch:'OneFor HQ', scopeLevel:'BRANCH',       status:'ACTIVE' },
  { id:'ur-002', userId:'u-003', userName:'Ngadhnjim Istrefi',email:'ngadhnjim.istrefi@ndbit.net',   role:'SystemAdmin',       org:'OneFor', branch:'',          scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'ur-003', userId:'u-007', userName:'Sasa Stanic',      email:'sasa.stanic@ndbit.net',         role:'SystemAdmin',       org:'OneFor', branch:'',          scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'ur-004', userId:'u-008', userName:'Elham Hamiti',     email:'elham.hamiti@ndbit.net',        role:'SystemAdmin',       org:'OneFor', branch:'',          scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'ur-005', userId:'u-011', userName:'Atdhetar Ibrahimi',email:'atdhetar.ibrahimi@onefor.com',  role:'OrganizationAdmin', org:'OneFor', branch:'',          scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'ur-006', userId:'u-009', userName:'Kushtrim Jashari', email:'kushtrim.jashari@ndbit.net',    role:'SystemAdmin',       org:'OneFor', branch:'',          scopeLevel:'ORGANIZATION', status:'ACTIVE' },
  { id:'ur-007', userId:'u-006', userName:'Arsim Kosumi',     email:'arsim.kosumi@ndbit.net',        role:'SystemAdmin',       org:'OneFor', branch:'',          scopeLevel:'ORGANIZATION', status:'ACTIVE' },
];

// ── available role scopes for the assign modal ──────────────────
const _MOCK_LS_ROLE_SCOPE_OPTIONS = [
  { id:'rs-01', label:'SystemAdmin / ORGANIZATION / OneFor' },
  { id:'rs-02', label:'SystemAdmin / BRANCH / OneFor HQ' },
  { id:'rs-03', label:'OrganizationAdmin / ORGANIZATION / OneFor' },
  { id:'rs-04', label:'BranchAdmin / BRANCH / OneFor HQ' },
];

function buildLsUserRolesSection() {
  const scopeBadge = (level) => {
    if (level === 'BRANCH') {
      return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;">${level}</span>`;
    }
    return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;">${level}</span>`;
  };

  const statusBadge = (s) => {
    if (s === 'ACTIVE') {
      return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`;
    }
    return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">REVOKED</span>`;
  };

  const rows = _MOCK_LS_USER_ROLES.map(r => {
    const actionCell = r.status === 'ACTIVE'
      ? `<button class="ls-ur-revoke-btn" data-ur-id="${r.id}" style="padding:4px 12px;border-radius:6px;border:1px solid #fca5a5;background:#fff;color:#dc2626;font-size:12px;font-weight:500;cursor:pointer;">Revoke</button>`
      : `<span style="color:var(--fg2,#64748b);font-size:12px;">Revoked</span>`;
    return `
      <tr style="border-bottom:1px solid var(--border1,#e2e8f0);">
        <td style="padding:12px 16px;vertical-align:middle;">
          <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);">${r.userName}</div>
          <div style="font-size:11px;color:var(--fg2,#64748b);margin-top:2px;">${r.email}</div>
        </td>
        <td style="padding:12px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.role}</td>
        <td style="padding:12px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.org}</td>
        <td style="padding:12px 16px;vertical-align:middle;font-size:13px;color:var(--fg2,#64748b);">${r.branch || '—'}</td>
        <td style="padding:12px 16px;vertical-align:middle;">${scopeBadge(r.scopeLevel)}</td>
        <td style="padding:12px 16px;vertical-align:middle;">${statusBadge(r.status)}</td>
        <td style="padding:12px 16px;vertical-align:middle;">${actionCell}</td>
      </tr>`;
  }).join('');

  // unique users for assign modal
  const userOptions = _MOCK_LS_USER_ROLES
    .map(r => r.userId + '||' + r.userName)
    .filter((v, i, a) => a.indexOf(v) === i)
    .map(v => {
      const [uid, uname] = v.split('||');
      return `<option value="${uid}">${uname}</option>`;
    }).join('');

  const roleOptions = _MOCK_LS_ROLE_SCOPE_OPTIONS
    .map(rs => `<option value="${rs.id}">${rs.label}</option>`)
    .join('');

  return `
    <div style="padding:24px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">User Roles</h1>
          <p style="font-size:13px;color:var(--fg2,#64748b);margin:0;">Global view of all user role scope assignments</p>
        </div>
        <button id="ls-ur-assign-btn" style="padding:8px 16px;border-radius:8px;background:var(--accent,#6C47FF);color:#fff;border:none;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Assign Role
        </button>
      </div>

      <!-- Filters -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <div style="flex:1;min-width:200px;position:relative;">
          <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--fg2,#64748b);" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          <input id="ls-ur-search" type="text" placeholder="Search by user name or email..." style="width:100%;box-sizing:border-box;padding:7px 10px 7px 32px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:transparent;color:var(--fg,#1e293b);outline:none;" />
        </div>
        <select id="ls-ur-status-filter" style="padding:7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;min-width:130px;">
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="REVOKED">Revoked</option>
        </select>
      </div>

      <!-- Table -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden;">
        <div style="overflow-x:auto;">
          <table id="ls-ur-table" style="width:100%;border-collapse:collapse;min-width:700px;">
            <thead>
              <tr style="background:var(--table-head-bg,#f8fafc);">
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">User</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Role</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Organization</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Branch</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Scope Level</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Status</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Actions</th>
              </tr>
            </thead>
            <tbody id="ls-ur-tbody">
              ${rows}
            </tbody>
          </table>
        </div>
        <!-- Footer -->
        <div style="padding:12px 16px;border-top:1px solid var(--border1,#e2e8f0);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <span id="ls-ur-count" style="font-size:12px;color:var(--fg2,#64748b);">Showing 1–7 of 7 results</span>
          <div style="display:flex;gap:4px;">
            <button style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;">Previous</button>
            <button style="padding:4px 10px;border:1px solid var(--accent,#6C47FF);border-radius:6px;font-size:12px;background:var(--accent,#6C47FF);color:#fff;cursor:pointer;">1</button>
            <button style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;">Next</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign Role Scope Modal -->
    <div id="ls-ur-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1000;align-items:center;justify-content:center;padding:16px;">
      <div style="background:var(--card-bg,#fff);border-radius:12px;width:100%;max-width:440px;box-shadow:0 20px 60px rgba(0,0,0,0.18);">
        <!-- Modal header -->
        <div style="padding:20px 24px 16px;border-bottom:1px solid var(--border1,#e2e8f0);">
          <h2 style="font-size:16px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">Assign Role Scope</h2>
          <p style="font-size:12px;color:var(--accent,#6C47FF);margin:0;">Assign a role scope to a user</p>
        </div>
        <!-- Modal body -->
        <div style="padding:20px 24px;display:flex;flex-direction:column;gap:16px;">
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px;">User</label>
            <select id="ls-ur-modal-user" style="width:100%;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;appearance:auto;">
              <option value="">Select user...</option>
              ${userOptions}
            </select>
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px;">Role Scope</label>
            <select id="ls-ur-modal-rolescope" style="width:100%;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;appearance:auto;">
              <option value="">Select role scope...</option>
              ${roleOptions}
            </select>
          </div>
        </div>
        <!-- Modal footer -->
        <div style="padding:16px 24px;border-top:1px solid var(--border1,#e2e8f0);display:flex;justify-content:flex-end;gap:10px;">
          <button id="ls-ur-modal-cancel" style="padding:8px 18px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:500;cursor:pointer;">Cancel</button>
          <button id="ls-ur-modal-assign" style="padding:8px 18px;border-radius:8px;border:none;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer;">Assign</button>
        </div>
      </div>
    </div>`;
}

function wireLsUserRolesList(el) {
  const search = el.querySelector('#ls-ur-search');
  const statusFilter = el.querySelector('#ls-ur-status-filter');
  const tbody = el.querySelector('#ls-ur-tbody');
  const countEl = el.querySelector('#ls-ur-count');
  const modal = el.querySelector('#ls-ur-modal');
  const assignBtn = el.querySelector('#ls-ur-assign-btn');
  const cancelBtn = el.querySelector('#ls-ur-modal-cancel');
  const modalAssignBtn = el.querySelector('#ls-ur-modal-assign');

  function renderRows() {
    const q = (search ? search.value : '').toLowerCase();
    const st = statusFilter ? statusFilter.value : '';
    const filtered = _MOCK_LS_USER_ROLES.filter(r => {
      const matchQ = !q || r.userName.toLowerCase().includes(q) || r.email.toLowerCase().includes(q);
      const matchSt = !st || r.status === st;
      return matchQ && matchSt;
    });

    const scopeBadge = (level) => {
      if (level === 'BRANCH') {
        return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;">${level}</span>`;
      }
      return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;">${level}</span>`;
    };
    const statusBadge = (s) => {
      if (s === 'ACTIVE') {
        return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`;
      }
      return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">REVOKED</span>`;
    };

    if (tbody) {
      tbody.innerHTML = filtered.map(r => {
        const actionCell = r.status === 'ACTIVE'
          ? `<button class="ls-ur-revoke-btn" data-ur-id="${r.id}" style="padding:4px 12px;border-radius:6px;border:1px solid #fca5a5;background:#fff;color:#dc2626;font-size:12px;font-weight:500;cursor:pointer;">Revoke</button>`
          : `<span style="color:var(--fg2,#64748b);font-size:12px;">Revoked</span>`;
        return `
          <tr style="border-bottom:1px solid var(--border1,#e2e8f0);">
            <td style="padding:12px 16px;vertical-align:middle;">
              <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);">${r.userName}</div>
              <div style="font-size:11px;color:var(--fg2,#64748b);margin-top:2px;">${r.email}</div>
            </td>
            <td style="padding:12px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.role}</td>
            <td style="padding:12px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.org}</td>
            <td style="padding:12px 16px;vertical-align:middle;font-size:13px;color:var(--fg2,#64748b);">${r.branch || '—'}</td>
            <td style="padding:12px 16px;vertical-align:middle;">${scopeBadge(r.scopeLevel)}</td>
            <td style="padding:12px 16px;vertical-align:middle;">${statusBadge(r.status)}</td>
            <td style="padding:12px 16px;vertical-align:middle;">${actionCell}</td>
          </tr>`;
      }).join('');
    }
    if (countEl) {
      const n = filtered.length;
      countEl.textContent = `Showing 1–${n} of ${n} results`;
    }
  }

  if (search) search.addEventListener('input', renderRows);
  if (statusFilter) statusFilter.addEventListener('change', renderRows);

  // Open modal
  if (assignBtn && modal) {
    assignBtn.addEventListener('click', function() {
      modal.style.display = 'flex';
    });
  }

  // Close modal
  function closeModal() {
    if (modal) modal.style.display = 'none';
    const mu = el.querySelector('#ls-ur-modal-user');
    const mr = el.querySelector('#ls-ur-modal-rolescope');
    if (mu) mu.value = '';
    if (mr) mr.value = '';
  }

  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });
  }

  // Assign action
  if (modalAssignBtn) {
    modalAssignBtn.addEventListener('click', function() {
      const mu = el.querySelector('#ls-ur-modal-user');
      const mr = el.querySelector('#ls-ur-modal-rolescope');
      const userId = mu ? mu.value : '';
      const rsId = mr ? mr.value : '';
      if (!userId || !rsId) {
        alert('Please select both a user and a role scope.');
        return;
      }
      const rsOpt = _MOCK_LS_ROLE_SCOPE_OPTIONS.find(x => x.id === rsId);
      if (!rsOpt) return;
      // Parse role, scopeLevel, org/branch from label: "Role / LEVEL / Org [Branch]"
      const parts = rsOpt.label.split(' / ');
      const role = parts[0] || 'SystemAdmin';
      const scopeLevel = parts[1] || 'ORGANIZATION';
      const orgBranch = parts[2] || 'OneFor';
      const isBranch = scopeLevel === 'BRANCH';
      const userEntry = _MOCK_LS_USER_ROLES.find(r => r.userId === userId);
      const newEntry = {
        id: 'ur-' + Date.now(),
        userId: userId,
        userName: userEntry ? userEntry.userName : userId,
        email: userEntry ? userEntry.email : '',
        role: role,
        org: isBranch ? orgBranch.split(' ')[0] : orgBranch,
        branch: isBranch ? orgBranch : '',
        scopeLevel: scopeLevel,
        status: 'ACTIVE'
      };
      _MOCK_LS_USER_ROLES.push(newEntry);
      closeModal();
      renderRows();
    });
  }

  // Individual revoke via event delegation
  el.addEventListener('click', function(e) {
    const btn = e.target.closest('.ls-ur-revoke-btn');
    if (!btn) return;
    const uid = btn.dataset.urId;
    const entry = _MOCK_LS_USER_ROLES.find(x => x.id === uid);
    if (!entry) return;
    entry.status = 'REVOKED';
    renderRows();
  });
}

// ═══════════════════════════════════════════════════════════════
//  API CLIENTS  (ls-api-clients)
// ═══════════════════════════════════════════════════════════════

const _MOCK_LS_API_CLIENTS = [
  {
    id: 'ac-001',
    name: 'OneFor Core Orchestrator',
    clientId: 'onefor-core',
    org: 'OneFor',
    description: 'Core orchestration service for OneFor platform — handles loan lifecycle events and triggers downstream processing.',
    status: 'ACTIVE',
    lastUsed: '08.10.2026 20:30:00'
  },
];

// View state: 'list' | 'new' | 'edit' | 'view'
let _lsApiClientsView = 'list';
let _lsApiClientsEditId = null;

function buildLsApiClientsSection() {
  if (_lsApiClientsView === 'new') return _buildApiClientForm(null);
  if (_lsApiClientsView === 'edit') {
    const rec = _MOCK_LS_API_CLIENTS.find(x => x.id === _lsApiClientsEditId);
    return _buildApiClientForm(rec);
  }
  if (_lsApiClientsView === 'view') {
    const rec = _MOCK_LS_API_CLIENTS.find(x => x.id === _lsApiClientsEditId);
    return _buildApiClientDetail(rec);
  }
  return _buildApiClientList();
}

function _buildApiClientList() {
  const orgSet = [...new Set(_MOCK_LS_API_CLIENTS.map(c => c.org))];
  const orgOptions = orgSet.map(o => `<option value="${o}">${o}</option>`).join('');

  const rows = _MOCK_LS_API_CLIENTS.map(c => {
    const badge = c.status === 'ACTIVE'
      ? `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`
      : `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">INACTIVE</span>`;
    return `
      <tr class="ls-ac-row" style="border-bottom:1px solid var(--border1,#e2e8f0);">
        <td style="padding:14px 16px;vertical-align:middle;">
          <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);">${c.name}</div>
          <div style="font-size:11px;color:var(--fg2,#64748b);margin-top:2px;font-family:monospace;">${c.clientId}</div>
        </td>
        <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${c.org}</td>
        <td style="padding:14px 16px;vertical-align:middle;">${badge}</td>
        <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg2,#64748b);">${c.lastUsed || '—'}</td>
        <td style="padding:14px 16px;vertical-align:middle;">
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="ls-ac-view-btn" data-ac-id="${c.id}" style="padding:4px 12px;border-radius:6px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:4px;">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
              View
            </button>
            <button class="ls-ac-edit-btn" data-ac-id="${c.id}" style="padding:4px 12px;border-radius:6px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--accent,#6C47FF);font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:4px;">
              <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              Edit
            </button>
          </div>
        </td>
      </tr>`;
  }).join('');

  return `
    <div style="padding:24px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">API Clients</h1>
          <p style="font-size:13px;color:var(--fg2,#64748b);margin:0;">Machine identities that authenticate via OAuth 2.0 client credentials</p>
        </div>
        <button id="ls-ac-new-btn" style="padding:8px 16px;border-radius:8px;background:var(--accent,#6C47FF);color:#fff;border:none;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          + New API Client
        </button>
      </div>

      <!-- Filters -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <div style="flex:1;min-width:200px;position:relative;">
          <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--fg2,#64748b);" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          <input id="ls-ac-search" type="text" placeholder="Search by name or client ID..." style="width:100%;box-sizing:border-box;padding:7px 10px 7px 32px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:transparent;color:var(--fg,#1e293b);outline:none;" />
        </div>
        <select id="ls-ac-org-filter" style="padding:7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;min-width:150px;">
          <option value="">Select an item</option>
          ${orgOptions}
        </select>
        <select id="ls-ac-status-filter" style="padding:7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;min-width:130px;">
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <!-- Table -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden;">
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;min-width:600px;">
            <thead>
              <tr style="background:var(--table-head-bg,#f8fafc);">
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Name / Client ID</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Organization</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Status</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Last Used</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Actions</th>
              </tr>
            </thead>
            <tbody id="ls-ac-tbody">
              ${rows}
            </tbody>
          </table>
        </div>
        <div style="padding:12px 16px;border-top:1px solid var(--border1,#e2e8f0);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <span id="ls-ac-count" style="font-size:12px;color:var(--fg2,#64748b);">Showing 1–1 of 1 results</span>
          <div style="display:flex;gap:4px;">
            <button style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;">Previous</button>
            <button style="padding:4px 10px;border:1px solid var(--accent,#6C47FF);border-radius:6px;font-size:12px;background:var(--accent,#6C47FF);color:#fff;cursor:pointer;">1</button>
            <button style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;">Next</button>
          </div>
        </div>
      </div>
    </div>`;
}

function _buildApiClientForm(rec) {
  const isNew = !rec;
  const title = isNew ? 'New API Client' : 'Edit API Client';
  const subtitle = isNew ? 'Configure API client settings' : 'Update API client settings';

  return `
    <div style="padding:24px;">
      <!-- Page header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <button id="ls-ac-back-btn" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;display:flex;align-items:center;">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 2px;">${title}</h1>
            <p style="font-size:12px;color:var(--fg2,#64748b);margin:0;">${subtitle}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button id="ls-ac-cancel-btn" style="padding:8px 16px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:500;cursor:pointer;">Cancel</button>
          <button id="ls-ac-reset-btn" style="padding:8px 16px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:500;cursor:pointer;">Reset</button>
          <button id="ls-ac-save-btn" style="padding:8px 16px;border-radius:8px;border:none;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            Save
          </button>
        </div>
      </div>

      <!-- Form card -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:24px;max-width:860px;">
        <h2 style="font-size:14px;font-weight:600;color:var(--fg,#1e293b);margin:0 0 20px;">API Client Details</h2>
        <div style="display:flex;flex-direction:column;gap:18px;">
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;">Name</label>
            <input id="ls-ac-form-name" type="text" placeholder="e.g. Loan Processing Service" value="${rec ? rec.name : ''}"
              style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:transparent;color:var(--fg,#1e293b);outline:none;" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;">Client ID</label>
            <input id="ls-ac-form-clientid" type="text" placeholder="e.g. svc-loan-proc-001" value="${rec ? rec.clientId : ''}"
              style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:transparent;color:var(--fg,#1e293b);outline:none;font-family:monospace;" />
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;">Organization</label>
            <select id="ls-ac-form-org" style="width:100%;padding:10px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="">Select an item</option>
              <option value="OneFor" ${rec && rec.org === 'OneFor' ? 'selected' : ''}>OneFor</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;">Description</label>
            <textarea id="ls-ac-form-desc" placeholder="What does this client do?" rows="3"
              style="width:100%;box-sizing:border-box;padding:10px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:transparent;color:var(--fg,#1e293b);outline:none;resize:vertical;">${rec ? rec.description : ''}</textarea>
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;">Status</label>
            <select id="ls-ac-form-status" style="width:100%;padding:10px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="ACTIVE" ${!rec || rec.status === 'ACTIVE' ? 'selected' : ''}>Active</option>
              <option value="INACTIVE" ${rec && rec.status === 'INACTIVE' ? 'selected' : ''}>Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;
}

function _buildApiClientDetail(rec) {
  if (!rec) return _buildApiClientList();
  const badge = rec.status === 'ACTIVE'
    ? `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`
    : `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">INACTIVE</span>`;

  const field = (label, value, mono) => `
    <div style="padding:14px 0;border-bottom:1px solid var(--border1,#e2e8f0);">
      <div style="font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-bottom:4px;">${label}</div>
      <div style="font-size:13px;color:var(--fg,#1e293b);${mono ? 'font-family:monospace;' : ''}">${value}</div>
    </div>`;

  return `
    <div style="padding:24px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <button id="ls-ac-back-btn" style="padding:6px 8px;border-radius:6px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;display:flex;align-items:center;">
            <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <div>
            <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 2px;">${rec.name}</h1>
            <p style="font-size:12px;color:var(--fg2,#64748b);margin:0;font-family:monospace;">${rec.clientId}</p>
          </div>
        </div>
        <button class="ls-ac-edit-btn" data-ac-id="${rec.id}" style="padding:8px 16px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--accent,#6C47FF);font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
          <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          Edit
        </button>
      </div>

      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:0 24px 4px;max-width:860px;">
        <h2 style="font-size:14px;font-weight:600;color:var(--fg,#1e293b);margin:0;padding:16px 0 4px;">API Client Details</h2>
        ${field('Name', rec.name, false)}
        ${field('Client ID', rec.clientId, true)}
        ${field('Organization', rec.org, false)}
        ${field('Description', rec.description || '—', false)}
        <div style="padding:14px 0;">
          <div style="font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;">Status</div>
          ${badge}
        </div>
      </div>
    </div>`;
}

function wireLsApiClientsList(el) {
  const search = el.querySelector('#ls-ac-search');
  const orgFilter = el.querySelector('#ls-ac-org-filter');
  const statusFilter = el.querySelector('#ls-ac-status-filter');
  const tbody = el.querySelector('#ls-ac-tbody');
  const countEl = el.querySelector('#ls-ac-count');

  function rerender() {
    const container = el.closest('[id]') || el;
    container.innerHTML = buildLsApiClientsSection();
    wireLsApiClientsList(container);
  }

  function renderRows() {
    const q = (search ? search.value : '').toLowerCase();
    const org = orgFilter ? orgFilter.value : '';
    const st = statusFilter ? statusFilter.value : '';
    const filtered = _MOCK_LS_API_CLIENTS.filter(c => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.clientId.toLowerCase().includes(q);
      const matchOrg = !org || c.org === org;
      const matchSt = !st || c.status === st;
      return matchQ && matchOrg && matchSt;
    });
    if (tbody) {
      const badge = (s) => s === 'ACTIVE'
        ? `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`
        : `<span style="display:inline-block;padding:2px 10px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">INACTIVE</span>`;
      tbody.innerHTML = filtered.map(c => `
        <tr style="border-bottom:1px solid var(--border1,#e2e8f0);">
          <td style="padding:14px 16px;vertical-align:middle;">
            <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);">${c.name}</div>
            <div style="font-size:11px;color:var(--fg2,#64748b);margin-top:2px;font-family:monospace;">${c.clientId}</div>
          </td>
          <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${c.org}</td>
          <td style="padding:14px 16px;vertical-align:middle;">${badge(c.status)}</td>
          <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg2,#64748b);">${c.lastUsed || '—'}</td>
          <td style="padding:14px 16px;vertical-align:middle;">
            <div style="display:flex;gap:8px;">
              <button class="ls-ac-view-btn" data-ac-id="${c.id}" style="padding:4px 12px;border-radius:6px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:4px;">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12S5 4 12 4s11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>View
              </button>
              <button class="ls-ac-edit-btn" data-ac-id="${c.id}" style="padding:4px 12px;border-radius:6px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--accent,#6C47FF);font-size:12px;font-weight:500;cursor:pointer;display:flex;align-items:center;gap:4px;">
                <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>Edit
              </button>
            </div>
          </td>
        </tr>`).join('');
      if (countEl) { const n = filtered.length; countEl.textContent = `Showing 1–${n} of ${n} results`; }
    }
  }

  if (search) search.addEventListener('input', renderRows);
  if (orgFilter) orgFilter.addEventListener('change', renderRows);
  if (statusFilter) statusFilter.addEventListener('change', renderRows);

  // New button
  const newBtn = el.querySelector('#ls-ac-new-btn');
  if (newBtn) {
    newBtn.addEventListener('click', function() {
      _lsApiClientsView = 'new';
      _lsApiClientsEditId = null;
      rerender();
    });
  }

  // View / Edit buttons — event delegation
  el.addEventListener('click', function(e) {
    const viewBtn = e.target.closest('.ls-ac-view-btn');
    const editBtn = e.target.closest('.ls-ac-edit-btn');
    const backBtn = e.target.closest('#ls-ac-back-btn');
    const cancelBtn = e.target.closest('#ls-ac-cancel-btn');
    const saveBtn = e.target.closest('#ls-ac-save-btn');
    const resetBtn = e.target.closest('#ls-ac-reset-btn');

    if (viewBtn) {
      _lsApiClientsView = 'view';
      _lsApiClientsEditId = viewBtn.dataset.acId;
      rerender(); return;
    }
    if (editBtn) {
      _lsApiClientsView = 'edit';
      _lsApiClientsEditId = editBtn.dataset.acId;
      rerender(); return;
    }
    if (backBtn || cancelBtn) {
      _lsApiClientsView = 'list';
      _lsApiClientsEditId = null;
      rerender(); return;
    }
    if (resetBtn) {
      rerender(); return;
    }
    if (saveBtn) {
      const name = (el.querySelector('#ls-ac-form-name') || {}).value || '';
      const clientId = (el.querySelector('#ls-ac-form-clientid') || {}).value || '';
      const org = (el.querySelector('#ls-ac-form-org') || {}).value || '';
      const desc = (el.querySelector('#ls-ac-form-desc') || {}).value || '';
      const status = (el.querySelector('#ls-ac-form-status') || {}).value || 'ACTIVE';
      if (!name || !clientId) { alert('Name and Client ID are required.'); return; }

      if (_lsApiClientsView === 'new') {
        _MOCK_LS_API_CLIENTS.push({
          id: 'ac-' + Date.now(),
          name, clientId, org, description: desc, status,
          lastUsed: '—'
        });
      } else {
        const rec = _MOCK_LS_API_CLIENTS.find(x => x.id === _lsApiClientsEditId);
        if (rec) { rec.name = name; rec.clientId = clientId; rec.org = org; rec.description = desc; rec.status = status; }
      }
      _lsApiClientsView = 'list';
      _lsApiClientsEditId = null;
      rerender();
    }
  });
}

// ═══════════════════════════════════════════════════════════════
//  API CLIENT ROLES  (ls-api-client-roles)
// ═══════════════════════════════════════════════════════════════

const _MOCK_LS_API_CLIENT_ROLES = [
  { id:'acr-001', clientId:'ac-001', clientName:'OneFor Core Orchestrator', clientIdStr:'onefor-core',
    role:'SystemAdmin', org:'OneFor', branch:'', scopeLevel:'ORGANIZATION', status:'ACTIVE' },
];

function buildLsApiClientRolesSection() {
  const scopeBadge = (level) => {
    if (level === 'BRANCH') {
      return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;">${level}</span>`;
    }
    return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;">${level}</span>`;
  };
  const statusBadge = (s) => s === 'ACTIVE'
    ? `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`
    : `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">REVOKED</span>`;

  const rows = _MOCK_LS_API_CLIENT_ROLES.map(r => {
    const action = r.status === 'ACTIVE'
      ? `<button class="ls-acr-revoke-btn" data-acr-id="${r.id}" style="padding:4px 14px;border-radius:6px;border:1px solid #fca5a5;background:#fff;color:#dc2626;font-size:12px;font-weight:500;cursor:pointer;">Revoke</button>`
      : `<span style="color:var(--fg2,#64748b);font-size:12px;">Revoked</span>`;
    return `
      <tr style="border-bottom:1px solid var(--border1,#e2e8f0);">
        <td style="padding:14px 16px;vertical-align:middle;">
          <div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);">${r.clientName}</div>
          <div style="font-size:11px;color:var(--fg2,#64748b);margin-top:2px;font-family:monospace;">${r.clientIdStr}</div>
        </td>
        <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.role}</td>
        <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.org}</td>
        <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg2,#64748b);">${r.branch || '—'}</td>
        <td style="padding:14px 16px;vertical-align:middle;">${scopeBadge(r.scopeLevel)}</td>
        <td style="padding:14px 16px;vertical-align:middle;">${statusBadge(r.status)}</td>
        <td style="padding:14px 16px;vertical-align:middle;">${action}</td>
      </tr>`;
  }).join('');

  // Cascading role scope options per client
  const acrRoleScopesByClient = {
    'ac-001': [
      { id:'rs-01', label:'SystemAdmin / ORGANIZATION / OneFor' },
      { id:'rs-02', label:'SystemAdmin / BRANCH / OneFor HQ' },
      { id:'rs-03', label:'OrganizationAdmin / ORGANIZATION / OneFor' },
    ]
  };
  const clientOptions = _MOCK_LS_API_CLIENTS.map(c =>
    `<option value="${c.id}">${c.name} (${c.clientId})</option>`).join('');
  const scopeOptionsByClientJSON = JSON.stringify(acrRoleScopesByClient);

  return `
    <div style="padding:24px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">API Client Roles</h1>
          <p style="font-size:13px;color:var(--fg2,#64748b);margin:0;">Global view of all API client role scope assignments</p>
        </div>
        <button id="ls-acr-assign-btn" style="padding:8px 16px;border-radius:8px;background:var(--accent,#6C47FF);color:#fff;border:none;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          + Assign Role
        </button>
      </div>

      <!-- Filters -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;gap:12px;flex-wrap:wrap;align-items:center;">
        <div style="flex:1;min-width:200px;position:relative;">
          <svg style="position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--fg2,#64748b);" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path stroke-linecap="round" d="M21 21l-4.35-4.35"/></svg>
          <input id="ls-acr-search" type="text" placeholder="Search by client name..." style="width:100%;box-sizing:border-box;padding:7px 10px 7px 32px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:transparent;color:var(--fg,#1e293b);outline:none;" />
        </div>
        <select id="ls-acr-status-filter" style="padding:7px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;min-width:130px;">
          <option value="">All statuses</option>
          <option value="ACTIVE">Active</option>
          <option value="REVOKED">Revoked</option>
        </select>
      </div>

      <!-- Table -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden;">
        <div style="overflow-x:auto;">
          <table style="width:100%;border-collapse:collapse;min-width:700px;">
            <thead>
              <tr style="background:var(--table-head-bg,#f8fafc);">
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">API Client</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Role</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Organization</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Branch</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Scope Level</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Status</th>
                <th style="padding:10px 16px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid var(--border1,#e2e8f0);">Actions</th>
              </tr>
            </thead>
            <tbody id="ls-acr-tbody">${rows}</tbody>
          </table>
        </div>
        <div style="padding:12px 16px;border-top:1px solid var(--border1,#e2e8f0);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <span id="ls-acr-count" style="font-size:12px;color:var(--fg2,#64748b);">Showing 1–1 of 1 results</span>
          <div style="display:flex;gap:4px;">
            <button style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;">Previous</button>
            <button style="padding:4px 10px;border:1px solid var(--accent,#6C47FF);border-radius:6px;font-size:12px;background:var(--accent,#6C47FF);color:#fff;cursor:pointer;">1</button>
            <button style="padding:4px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;">Next</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Assign Role Scope Modal -->
    <div id="ls-acr-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:1000;align-items:center;justify-content:center;padding:16px;">
      <div style="background:var(--card-bg,#fff);border-radius:12px;width:100%;max-width:520px;box-shadow:0 20px 60px rgba(0,0,0,0.18);">
        <div style="padding:20px 24px 16px;border-bottom:1px solid var(--border1,#e2e8f0);">
          <h2 style="font-size:16px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">Assign Role Scope</h2>
          <p style="font-size:12px;color:var(--accent,#6C47FF);margin:0;">Assign a role scope to an API client</p>
        </div>
        <div style="padding:20px 24px;display:flex;flex-direction:column;gap:16px;">
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px;">API Client</label>
            <select id="ls-acr-modal-client" style="width:100%;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="">Select API client...</option>
              ${clientOptions}
            </select>
          </div>
          <div>
            <label style="display:block;font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:6px;">Role Scope</label>
            <select id="ls-acr-modal-rolescope" style="width:100%;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;" disabled>
              <option value="">Select an API client first</option>
            </select>
          </div>
        </div>
        <div style="padding:16px 24px;border-top:1px solid var(--border1,#e2e8f0);display:flex;justify-content:flex-end;gap:10px;">
          <button id="ls-acr-modal-cancel" style="padding:8px 18px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:500;cursor:pointer;">Cancel</button>
          <button id="ls-acr-modal-assign" style="padding:8px 18px;border-radius:8px;border:none;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer;">Assign</button>
        </div>
      </div>
    </div>
    <script>
    (function(){
      var _acrScopeMap = ${scopeOptionsByClientJSON};
      var clientSel = document.getElementById('ls-acr-modal-client');
      var scopeSel  = document.getElementById('ls-acr-modal-rolescope');
      if (clientSel && scopeSel) {
        clientSel.addEventListener('change', function() {
          var cid = clientSel.value;
          var opts = _acrScopeMap[cid] || [];
          scopeSel.innerHTML = opts.length
            ? opts.map(function(o){ return '<option value="'+o.id+'">'+o.label+'</option>'; }).join('')
            : '<option value="">No role scopes available</option>';
          scopeSel.disabled = opts.length === 0;
          if (opts.length) scopeSel.style.color = 'var(--fg,#1e293b)';
        });
      }
    })();
    </script>`;
}

function wireLsApiClientRolesList(el) {
  const search = el.querySelector('#ls-acr-search');
  const statusFilter = el.querySelector('#ls-acr-status-filter');
  const tbody = el.querySelector('#ls-acr-tbody');
  const countEl = el.querySelector('#ls-acr-count');
  const modal = el.querySelector('#ls-acr-modal');
  const assignBtn = el.querySelector('#ls-acr-assign-btn');
  const cancelBtn = el.querySelector('#ls-acr-modal-cancel');
  const modalAssignBtn = el.querySelector('#ls-acr-modal-assign');

  const acrScopeMap = {
    'ac-001': [
      { id:'rs-01', label:'SystemAdmin / ORGANIZATION / OneFor' },
      { id:'rs-02', label:'SystemAdmin / BRANCH / OneFor HQ' },
      { id:'rs-03', label:'OrganizationAdmin / ORGANIZATION / OneFor' },
    ]
  };

  function scopeBadge(level) {
    if (level === 'BRANCH') return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;">${level}</span>`;
    return `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;">${level}</span>`;
  }
  function statusBadge(s) {
    return s === 'ACTIVE'
      ? `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;">ACTIVE</span>`
      : `<span style="display:inline-block;padding:2px 8px;border-radius:9999px;font-size:11px;font-weight:600;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;">REVOKED</span>`;
  }

  function renderRows() {
    const q = (search ? search.value : '').toLowerCase();
    const st = statusFilter ? statusFilter.value : '';
    const filtered = _MOCK_LS_API_CLIENT_ROLES.filter(r => {
      return (!q || r.clientName.toLowerCase().includes(q) || r.clientIdStr.toLowerCase().includes(q))
          && (!st || r.status === st);
    });
    if (tbody) {
      tbody.innerHTML = filtered.map(r => {
        const action = r.status === 'ACTIVE'
          ? `<button class="ls-acr-revoke-btn" data-acr-id="${r.id}" style="padding:4px 14px;border-radius:6px;border:1px solid #fca5a5;background:#fff;color:#dc2626;font-size:12px;font-weight:500;cursor:pointer;">Revoke</button>`
          : `<span style="color:var(--fg2,#64748b);font-size:12px;">Revoked</span>`;
        return `<tr style="border-bottom:1px solid var(--border1,#e2e8f0);">
          <td style="padding:14px 16px;vertical-align:middle;"><div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);">${r.clientName}</div><div style="font-size:11px;color:var(--fg2,#64748b);margin-top:2px;font-family:monospace;">${r.clientIdStr}</div></td>
          <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.role}</td>
          <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg,#1e293b);">${r.org}</td>
          <td style="padding:14px 16px;vertical-align:middle;font-size:13px;color:var(--fg2,#64748b);">${r.branch || '—'}</td>
          <td style="padding:14px 16px;vertical-align:middle;">${scopeBadge(r.scopeLevel)}</td>
          <td style="padding:14px 16px;vertical-align:middle;">${statusBadge(r.status)}</td>
          <td style="padding:14px 16px;vertical-align:middle;">${action}</td>
        </tr>`;
      }).join('');
      if (countEl) { const n = filtered.length; countEl.textContent = `Showing 1–${n} of ${n} results`; }
    }
  }

  if (search) search.addEventListener('input', renderRows);
  if (statusFilter) statusFilter.addEventListener('change', renderRows);

  // Open modal
  if (assignBtn && modal) assignBtn.addEventListener('click', () => { modal.style.display = 'flex'; });

  function closeModal() {
    if (modal) modal.style.display = 'none';
    const mc = el.querySelector('#ls-acr-modal-client');
    const ms = el.querySelector('#ls-acr-modal-rolescope');
    if (mc) mc.value = '';
    if (ms) { ms.innerHTML = '<option value="">Select an API client first</option>'; ms.disabled = true; ms.style.color = 'var(--fg2,#64748b)'; }
  }

  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  // Cascade: client → role scope
  const modalClient = el.querySelector('#ls-acr-modal-client');
  const modalScope  = el.querySelector('#ls-acr-modal-rolescope');
  if (modalClient && modalScope) {
    modalClient.addEventListener('change', function() {
      const opts = acrScopeMap[modalClient.value] || [];
      modalScope.innerHTML = opts.length
        ? opts.map(o => `<option value="${o.id}">${o.label}</option>`).join('')
        : '<option value="">No role scopes available</option>';
      modalScope.disabled = opts.length === 0;
      modalScope.style.color = opts.length ? 'var(--fg,#1e293b)' : 'var(--fg2,#64748b)';
    });
  }

  // Assign
  if (modalAssignBtn) {
    modalAssignBtn.addEventListener('click', function() {
      const cid = modalClient ? modalClient.value : '';
      const rsId = modalScope ? modalScope.value : '';
      if (!cid || !rsId) { alert('Please select both an API client and a role scope.'); return; }
      const client = _MOCK_LS_API_CLIENTS.find(c => c.id === cid);
      const opts = acrScopeMap[cid] || [];
      const rsOpt = opts.find(o => o.id === rsId);
      if (!client || !rsOpt) return;
      const parts = rsOpt.label.split(' / ');
      const role = parts[0] || 'SystemAdmin';
      const scopeLevel = parts[1] || 'ORGANIZATION';
      const orgBranch = parts[2] || 'OneFor';
      const isBranch = scopeLevel === 'BRANCH';
      _MOCK_LS_API_CLIENT_ROLES.push({
        id: 'acr-' + Date.now(),
        clientId: cid,
        clientName: client.name,
        clientIdStr: client.clientId,
        role, org: isBranch ? orgBranch.split(' ')[0] : orgBranch,
        branch: isBranch ? orgBranch : '',
        scopeLevel, status: 'ACTIVE'
      });
      closeModal();
      renderRows();
    });
  }

  // Revoke delegation
  el.addEventListener('click', function(e) {
    const btn = e.target.closest('.ls-acr-revoke-btn');
    if (!btn) return;
    const entry = _MOCK_LS_API_CLIENT_ROLES.find(x => x.id === btn.dataset.acrId);
    if (entry) { entry.status = 'REVOKED'; renderRows(); }
  });
}

// ═══════════════════════════════════════════════════════════════
//  BATCH DATE SETTINGS  (ls-batch-date)
// ═══════════════════════════════════════════════════════════════

let _batchDate = { day: 8, month: 10, year: 2026 }; // current batch date

function buildLsBatchDateSection() {
  const pad = n => String(n).padStart(2,'0');
  const displayDate = `${pad(_batchDate.day)}.${pad(_batchDate.month)}.${_batchDate.year}`;

  // Build mini calendar
  function calHTML(y, m) {
    const DAYS = ['M','T','W','T','F','S','S'];
    const header = DAYS.map(d => `<div style="width:32px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--fg2,#64748b);">${d}</div>`).join('');
    // first day of month (0=Sun..6=Sat), convert to Mon-first
    const firstDay = new Date(y, m-1, 1).getDay(); // 0=Sun
    const offset = (firstDay + 6) % 7; // Mon-first offset
    const daysInMonth = new Date(y, m, 0).getDate();
    const prevMonthDays = new Date(y, m-1, 0).getDate();
    const cells = [];
    // prev month overflow
    for (let i = offset - 1; i >= 0; i--) {
      cells.push(`<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--fg2,#64748b);opacity:.4;">${prevMonthDays - i}</div>`);
    }
    // current month
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected = d === _batchDate.day && m === _batchDate.month && y === _batchDate.year;
      cells.push(`<div class="ls-bd-day" data-day="${d}" data-month="${m}" data-year="${y}"
        style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:${isSelected?'700':'400'};cursor:pointer;border-radius:50%;
        background:${isSelected?'var(--accent,#6C47FF)':'transparent'};color:${isSelected?'#fff':'var(--fg,#1e293b)'};">${d}</div>`);
    }
    // fill remaining
    let nextD = 1;
    while (cells.length % 7 !== 0) {
      cells.push(`<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--fg2,#64748b);opacity:.4;">${nextD++}</div>`);
    }
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const yearOptions = [];
    for (let yr = 2020; yr <= 2030; yr++) yearOptions.push(`<option value="${yr}" ${yr===y?'selected':''}>${yr}</option>`);
    const monthOptions = MONTHS.map((mn,i) => `<option value="${i+1}" ${(i+1)===m?'selected':''}>${mn}</option>`).join('');

    return `
      <div id="ls-bd-cal" style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:12px 16px;width:300px;box-shadow:0 4px 16px rgba(0,0,0,.08);">
        <!-- Month/year nav -->
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <button id="ls-bd-prev" style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);padding:4px 6px;border-radius:4px;font-size:16px;">&#8249;</button>
          <div style="display:flex;gap:6px;">
            <select id="ls-bd-month-sel" style="padding:3px 6px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">${monthOptions}</select>
            <select id="ls-bd-year-sel" style="padding:3px 6px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">${yearOptions.join('')}</select>
          </div>
          <button id="ls-bd-next" style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);padding:4px 6px;border-radius:4px;font-size:16px;">&#8250;</button>
        </div>
        <!-- Day headers -->
        <div style="display:grid;grid-template-columns:repeat(7,32px);gap:2px;margin-bottom:4px;">${header}</div>
        <!-- Day cells -->
        <div id="ls-bd-cells" style="display:grid;grid-template-columns:repeat(7,32px);gap:2px;">${cells.join('')}</div>
      </div>`;
  }

  return `
    <div style="padding:24px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">Batch date settings</h1>
          <p style="font-size:13px;color:var(--fg2,#64748b);margin:0;">Configure the operational batch date</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button id="ls-bd-reset-btn" style="padding:8px 16px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:500;cursor:pointer;">Reset</button>
          <button id="ls-bd-save-btn" style="padding:8px 16px;border-radius:8px;border:none;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
            Save
          </button>
        </div>
      </div>

      <!-- Form card -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:24px;max-width:500px;">
        <h2 style="font-size:14px;font-weight:600;color:var(--fg,#1e293b);margin:0 0 16px;">Batch Date</h2>
        <div>
          <label style="display:block;font-size:12px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:6px;">Batch date</label>
          <div style="position:relative;">
            <input id="ls-bd-input" type="text" value="${displayDate}" readonly
              style="width:100%;box-sizing:border-box;padding:10px 36px 10px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;background:transparent;color:var(--fg,#1e293b);cursor:pointer;outline:none;" />
            <svg style="position:absolute;right:10px;top:50%;transform:translateY(-50%);color:var(--fg2,#64748b);pointer-events:none;" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
          </div>
          <!-- Calendar -->
          <div id="ls-bd-cal-wrap" style="margin-top:8px;">
            ${calHTML(_batchDate.year, _batchDate.month)}
          </div>
        </div>
      </div>
    </div>`;
}

let _bdCalView = { month: _batchDate.month, year: _batchDate.year };

function wireLsBatchDateSection(el) {
  const originalDate = { ..._batchDate };

  function rerender() {
    const container = el.closest('[id]') || el;
    container.innerHTML = buildLsBatchDateSection();
    _bdCalView = { month: _batchDate.month, year: _batchDate.year };
    wireLsBatchDateSection(container);
  }

  function rebuildCal() {
    const wrap = el.querySelector('#ls-bd-cal-wrap');
    if (!wrap) return;
    const pad = n => String(n).padStart(2,'0');
    const DAYS = ['M','T','W','T','F','S','S'];
    const header = DAYS.map(d => `<div style="width:32px;height:28px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:600;color:var(--fg2,#64748b);">${d}</div>`).join('');
    const y = _bdCalView.year, m = _bdCalView.month;
    const firstDay = new Date(y, m-1, 1).getDay();
    const offset = (firstDay + 6) % 7;
    const daysInMonth = new Date(y, m, 0).getDate();
    const prevMonthDays = new Date(y, m-1, 0).getDate();
    const cells = [];
    for (let i = offset - 1; i >= 0; i--) {
      cells.push(`<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--fg2,#64748b);opacity:.4;">${prevMonthDays - i}</div>`);
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isSel = d === _batchDate.day && m === _batchDate.month && y === _batchDate.year;
      cells.push(`<div class="ls-bd-day" data-day="${d}" data-month="${m}" data-year="${y}"
        style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:${isSel?'700':'400'};cursor:pointer;border-radius:50%;background:${isSel?'var(--accent,#6C47FF)':'transparent'};color:${isSel?'#fff':'var(--fg,#1e293b)'};">${d}</div>`);
    }
    let nd = 1;
    while (cells.length % 7 !== 0) {
      cells.push(`<div style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:12px;color:var(--fg2,#64748b);opacity:.4;">${nd++}</div>`);
    }
    const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    const yearOptions = [];
    for (let yr = 2020; yr <= 2030; yr++) yearOptions.push(`<option value="${yr}" ${yr===y?'selected':''}>${yr}</option>`);
    const monthOptions = MONTHS.map((mn,i) => `<option value="${i+1}" ${(i+1)===m?'selected':''}>${mn}</option>`).join('');
    wrap.innerHTML = `
      <div id="ls-bd-cal" style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:12px 16px;width:300px;box-shadow:0 4px 16px rgba(0,0,0,.08);">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
          <button id="ls-bd-prev" style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);padding:4px 6px;border-radius:4px;font-size:16px;">&#8249;</button>
          <div style="display:flex;gap:6px;">
            <select id="ls-bd-month-sel" style="padding:3px 6px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">${monthOptions}</select>
            <select id="ls-bd-year-sel" style="padding:3px 6px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:12px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">${yearOptions.join('')}</select>
          </div>
          <button id="ls-bd-next" style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);padding:4px 6px;border-radius:4px;font-size:16px;">&#8250;</button>
        </div>
        <div style="display:grid;grid-template-columns:repeat(7,32px);gap:2px;margin-bottom:4px;">${header}</div>
        <div id="ls-bd-cells" style="display:grid;grid-template-columns:repeat(7,32px);gap:2px;">${cells.join('')}</div>
      </div>`;
    wireCalEvents();
  }

  function wireCalEvents() {
    const prev = el.querySelector('#ls-bd-prev');
    const next = el.querySelector('#ls-bd-next');
    const mSel = el.querySelector('#ls-bd-month-sel');
    const ySel = el.querySelector('#ls-bd-year-sel');
    const cells = el.querySelector('#ls-bd-cells');

    if (prev) prev.addEventListener('click', function() {
      _bdCalView.month--;
      if (_bdCalView.month < 1) { _bdCalView.month = 12; _bdCalView.year--; }
      rebuildCal();
    });
    if (next) next.addEventListener('click', function() {
      _bdCalView.month++;
      if (_bdCalView.month > 12) { _bdCalView.month = 1; _bdCalView.year++; }
      rebuildCal();
    });
    if (mSel) mSel.addEventListener('change', function() { _bdCalView.month = parseInt(mSel.value); rebuildCal(); });
    if (ySel) ySel.addEventListener('change', function() { _bdCalView.year = parseInt(ySel.value); rebuildCal(); });
    if (cells) {
      cells.addEventListener('click', function(e) {
        const day = e.target.closest('.ls-bd-day');
        if (!day) return;
        _batchDate.day = parseInt(day.dataset.day);
        _batchDate.month = parseInt(day.dataset.month);
        _batchDate.year = parseInt(day.dataset.year);
        const pad = n => String(n).padStart(2,'0');
        const inp = el.querySelector('#ls-bd-input');
        if (inp) inp.value = `${pad(_batchDate.day)}.${pad(_batchDate.month)}.${_batchDate.year}`;
        rebuildCal();
      });
    }
  }

  wireCalEvents();

  const saveBtn = el.querySelector('#ls-bd-save-btn');
  const resetBtn = el.querySelector('#ls-bd-reset-btn');
  if (saveBtn) saveBtn.addEventListener('click', function() {
    const pad = n => String(n).padStart(2,'0');
    alert(`Batch date saved: ${pad(_batchDate.day)}.${pad(_batchDate.month)}.${_batchDate.year}`);
  });
  if (resetBtn) resetBtn.addEventListener('click', function() {
    _batchDate = { ...originalDate };
    _bdCalView = { month: _batchDate.month, year: _batchDate.year };
    rerender();
  });
}

// ═══════════════════════════════════════════════════════════════
//  DAILY ACCRUAL REPORT  (daily-accrual)
// ═══════════════════════════════════════════════════════════════

const _ORG_UUID = '1586be54-9f31-46b9-a496-0eb387e1f6b5';

// Generate 31 days of accrual summaries for Aug 2026
const _MOCK_ACCRUAL_ROWS = (function() {
  const rows = [];
  const base = [190.73,190.83,190.96,189.65,184.28,185.30,187.95,187.92,188.37,190.96,
                 193.17,193.28,195.80,195.51,196.47,197.02,196.88,195.44,194.10,193.72,
                 192.55,191.80,190.45,189.30,188.92,190.11,191.60,192.35,193.78,194.52,195.20];
  const entries=[666,668,670,662,657,655,665,666,670,675,681,681,685,682,683,687,684,679,675,674,
                  671,668,664,660,659,663,668,672,677,680,683];
  for (let d = 1; d <= 31; d++) {
    const dd = String(d).padStart(2,'0');
    rows.push({
      accrualDate: `${dd}.08.2026`,
      orgId: _ORG_UUID,
      branchId: '-',
      productId: '-',
      currencyId: 2,
      currency: 'EUR',
      amount: base[d-1],
      entryCount: entries[d-1]
    });
  }
  return rows;
})();

let _accrualResults = null; // null = not yet run

function buildDailyAccrualSection() {
  const resultsHTML = _accrualResults === null ? '' : _buildAccrualResults(_accrualResults);

  return `
    <div style="padding:24px;">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px;">
        <div>
          <h1 style="font-size:20px;font-weight:700;color:var(--fg,#1e293b);margin:0 0 4px;">Daily Accrual Report</h1>
          <p style="font-size:13px;color:var(--fg2,#64748b);margin:0;">Run daily interest, fee or penalty accrual reports.</p>
        </div>
        <div style="display:flex;gap:8px;">
          <button id="da-reset-btn" style="padding:8px 16px;border-radius:8px;border:1px solid var(--border1,#e2e8f0);background:var(--card-bg,#fff);color:var(--fg,#1e293b);font-size:13px;font-weight:500;cursor:pointer;">Reset</button>
          <button id="da-run-btn" style="padding:8px 16px;border-radius:8px;border:none;background:var(--accent,#6C47FF);color:#fff;font-size:13px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:6px;">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21" fill="currentColor" stroke="none"/></svg>
            Run
          </button>
        </div>
      </div>

      <!-- Filter bar -->
      <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:16px 20px;margin-bottom:16px;">
        <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:flex-end;">

          <!-- Type of report -->
          <div style="min-width:160px;flex:0 0 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Type of report</label>
            <select id="da-type" style="width:100%;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="interest">Interest accruals</option>
              <option value="fee">Fee accruals</option>
              <option value="penalty">Penalty accruals</option>
            </select>
          </div>

          <!-- Date from -->
          <div style="min-width:140px;flex:0 0 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Date from</label>
            <div style="position:relative;display:flex;align-items:center;">
              <input id="da-date-from" type="date" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);outline:none;cursor:pointer;" />
              <button id="da-date-from-clear" style="position:absolute;right:22px;background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);display:none;padding:0;font-size:14px;line-height:1;">×</button>
            </div>
          </div>

          <!-- Date to -->
          <div style="min-width:140px;flex:0 0 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Date to</label>
            <div style="position:relative;display:flex;align-items:center;">
              <input id="da-date-to" type="date" style="width:100%;padding:8px 30px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);outline:none;cursor:pointer;" />
              <button id="da-date-to-clear" style="position:absolute;right:22px;background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);display:none;padding:0;font-size:14px;line-height:1;">×</button>
            </div>
          </div>

          <!-- Organization -->
          <div style="min-width:150px;flex:1 1 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Organization</label>
            <select id="da-org" style="width:100%;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="">Select an item</option>
              <option value="onefor">OneFor</option>
            </select>
          </div>

          <!-- Branch -->
          <div style="min-width:140px;flex:1 1 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Branch</label>
            <select id="da-branch" style="width:100%;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);cursor:pointer;" disabled>
              <option value="">Select an item</option>
              <option value="hq">OneFor HQ</option>
            </select>
          </div>

          <!-- Product -->
          <div style="min-width:140px;flex:1 1 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Product</label>
            <select id="da-product" style="width:100%;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="">Select an item</option>
              <option value="personal">Personal Loan</option>
              <option value="housing">Housing Loan</option>
              <option value="business">Business Loan</option>
            </select>
          </div>

          <!-- Strict Completeness -->
          <div style="min-width:130px;flex:0 0 auto;">
            <label style="display:block;font-size:11px;font-weight:600;color:var(--fg2,#64748b);margin-bottom:5px;text-transform:uppercase;letter-spacing:.4px;">Strict Completeness</label>
            <select id="da-strict" style="width:100%;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:6px;font-size:13px;background:var(--card-bg,#fff);color:var(--fg,#1e293b);cursor:pointer;">
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Results -->
      <div id="da-results">${resultsHTML}</div>
    </div>`;
}

function _buildAccrualResults(rows) {
  if (!rows || rows.length === 0) {
    return `<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:40px;text-align:center;color:var(--fg2,#64748b);font-size:13px;">No accrual data found for the selected criteria.</div>`;
  }
  const dataRows = rows.map(r => `
    <tr style="border-bottom:1px solid var(--border1,#e2e8f0);">
      <td style="padding:11px 14px;font-size:12px;color:var(--accent,#6C47FF);white-space:nowrap;font-weight:500;">${r.accrualDate}</td>
      <td style="padding:11px 14px;font-size:11px;color:var(--fg2,#64748b);font-family:monospace;white-space:nowrap;">${r.orgId}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b);text-align:center;">${r.branchId}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b);text-align:center;">${r.productId}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg,#1e293b);text-align:center;">${r.currencyId}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg,#1e293b);font-weight:600;">${r.currency}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg,#1e293b);text-align:right;font-variant-numeric:tabular-nums;">${r.amount.toFixed(2)}</td>
      <td style="padding:11px 14px;font-size:12px;color:var(--fg,#1e293b);text-align:right;font-variant-numeric:tabular-nums;">${r.entryCount}</td>
    </tr>`).join('');

  return `
    <div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden;">
      <div style="padding:14px 16px;border-bottom:1px solid var(--border1,#e2e8f0);">
        <h2 style="font-size:14px;font-weight:600;color:var(--fg,#1e293b);margin:0;">Accrual summaries</h2>
      </div>
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;min-width:900px;">
          <thead>
            <tr style="background:var(--table-head-bg,#f8fafc);">
              <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);white-space:nowrap;">Accrual date</th>
              <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Organization ID</th>
              <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Branch ID</th>
              <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Product ID</th>
              <th style="padding:10px 14px;text-align:center;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Currency ID</th>
              <th style="padding:10px 14px;text-align:left;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Currency</th>
              <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Amount</th>
              <th style="padding:10px 14px;text-align:right;font-size:11px;font-weight:600;color:var(--fg2,#64748b);text-transform:uppercase;letter-spacing:.4px;border-bottom:1px solid var(--border1,#e2e8f0);">Entry count</th>
            </tr>
          </thead>
          <tbody>${dataRows}</tbody>
        </table>
      </div>
    </div>`;
}

function wireDailyAccrualSection(el) {
  const dateFrom = el.querySelector('#da-date-from');
  const dateTo   = el.querySelector('#da-date-to');
  const fromClear = el.querySelector('#da-date-from-clear');
  const toClear   = el.querySelector('#da-date-to-clear');
  const orgSel    = el.querySelector('#da-org');
  const branchSel = el.querySelector('#da-branch');
  const runBtn    = el.querySelector('#da-run-btn');
  const resetBtn  = el.querySelector('#da-reset-btn');
  const results   = el.querySelector('#da-results');

  function updateClear(input, btn) {
    if (!btn) return;
    btn.style.display = input && input.value ? 'block' : 'none';
  }

  if (dateFrom) dateFrom.addEventListener('input', () => updateClear(dateFrom, fromClear));
  if (dateTo)   dateTo.addEventListener('input',   () => updateClear(dateTo, toClear));
  if (fromClear) fromClear.addEventListener('click', () => { dateFrom.value = ''; fromClear.style.display = 'none'; });
  if (toClear)   toClear.addEventListener('click',   () => { dateTo.value = '';   toClear.style.display = 'none'; });

  // Enable branch only when org is selected
  if (orgSel && branchSel) {
    orgSel.addEventListener('change', function() {
      if (orgSel.value) {
        branchSel.disabled = false;
        branchSel.style.color = 'var(--fg,#1e293b)';
      } else {
        branchSel.disabled = true;
        branchSel.value = '';
        branchSel.style.color = 'var(--fg2,#64748b)';
      }
    });
  }

  if (runBtn) {
    runBtn.addEventListener('click', function() {
      // Filter rows by date range if provided
      let rows = _MOCK_ACCRUAL_ROWS.slice();
      if (dateFrom && dateFrom.value) {
        // dateFrom.value is yyyy-mm-dd; accrualDate is dd.mm.yyyy — parse both
        const [fy, fm, fd] = dateFrom.value.split('-').map(Number);
        rows = rows.filter(r => {
          const [rd, rm, ry] = r.accrualDate.split('.').map(Number);
          return (ry * 10000 + rm * 100 + rd) >= (fy * 10000 + fm * 100 + fd);
        });
      }
      if (dateTo && dateTo.value) {
        const [ty, tm, td] = dateTo.value.split('-').map(Number);
        rows = rows.filter(r => {
          const [rd, rm, ry] = r.accrualDate.split('.').map(Number);
          return (ry * 10000 + rm * 100 + rd) <= (ty * 10000 + tm * 100 + td);
        });
      }
      _accrualResults = rows;
      if (results) results.innerHTML = _buildAccrualResults(rows);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (dateFrom) dateFrom.value = '';
      if (dateTo)   dateTo.value = '';
      if (fromClear) fromClear.style.display = 'none';
      if (toClear)   toClear.style.display = 'none';
      if (orgSel) orgSel.value = '';
      if (branchSel) { branchSel.value = ''; branchSel.disabled = true; branchSel.style.color = 'var(--fg2,#64748b)'; }
      const typeSel = el.querySelector('#da-type');
      if (typeSel) typeSel.value = 'interest';
      const strictSel = el.querySelector('#da-strict');
      if (strictSel) strictSel.value = 'yes';
      const prodSel = el.querySelector('#da-product');
      if (prodSel) prodSel.value = '';
      _accrualResults = null;
      if (results) results.innerHTML = '';
    });
  }
}

// ─── TRANSACTIONS ─────────────────────────────────────────────────────────────

const _TX_TYPES = [
  'Disbursement','Collection','Early Repayment','Interest Accrual','Fee','Penalty',
  'Write-off','Reversal','Adjustment'
];

const _MOCK_TRANSACTIONS = (function() {
  const rows = [];
  const disb = [
    [1426,135,'Disbursement','07.10.2026','07.10.2026',-1000.00],
    [1425,341,'Disbursement','06.10.2026','06.10.2026',-202.20],
    [1424,341,'Disbursement','02.10.2026','02.10.2026',-300.00],
    [1423,341,'Disbursement','28.09.2026','28.09.2026',-580.00],
    [1422,341,'Disbursement','23.09.2026','23.09.2026',-500.00],
    [1421,346,'Disbursement','23.09.2026','23.09.2026',-500.00],
    [1420,346,'Disbursement','23.09.2026','23.09.2026',-500.00],
    [1419,346,'Disbursement','23.09.2026','23.09.2026',-200.00],
    [1418,341,'Disbursement','22.09.2026','22.09.2026',-222.05],
    [1417,346,'Disbursement','18.09.2026','18.09.2026',-220.00],
    [1416,335,'Disbursement','18.09.2026','18.09.2026',-220.00],
    [1415,335,'Disbursement','18.09.2026','18.09.2026',-220.00],
    [1414,335,'Disbursement','15.09.2026','15.09.2026',-400.00],
    [1413,341,'Disbursement','14.09.2026','14.09.2026',-300.00],
    [1412,346,'Disbursement','12.09.2026','12.09.2026',-350.00],
    [1411,335,'Disbursement','10.09.2026','10.09.2026',-500.00],
    [1410,341,'Disbursement','08.09.2026','08.09.2026',-450.00],
    [1409,346,'Disbursement','05.09.2026','05.09.2026',-320.00],
    [1408,335,'Disbursement','03.09.2026','03.09.2026',-280.00],
    [1407,341,'Disbursement','01.09.2026','01.09.2026',-600.00],
  ];
  const coll = [
    [1380,120,'Collection','07.10.2026','07.10.2026',520.50],
    [1375,210,'Collection','06.10.2026','06.10.2026',310.00],
    [1368,98, 'Collection','05.10.2026','05.10.2026',415.75],
    [1360,155,'Collection','04.10.2026','04.10.2026',290.30],
    [1355,341,'Collection','03.10.2026','03.10.2026',180.00],
    [1348,346,'Early Repayment','02.10.2026','02.10.2026',1200.00],
    [1340,335,'Early Repayment','01.10.2026','01.10.2026',875.50],
    [1332,120,'Collection','29.09.2026','29.09.2026',345.00],
    [1325,210,'Collection','28.09.2026','28.09.2026',420.60],
    [1318,98, 'Early Repayment','25.09.2026','25.09.2026',950.00],
  ];
  disb.concat(coll).forEach(function(r) {
    rows.push({ loanId:r[0], customerId:r[1], type:r[2], bookingDate:r[3], valueDate:r[4], amount:r[5], currency:'EUR', status:'POSTED' });
  });
  return rows;
})();

var _txResults = null;

function buildTransactionsSection() {
  var typeOpts = _TX_TYPES.map(function(t){ return '<option value="'+t+'">'+t+'</option>'; }).join('');

  var filtersHtml = '<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:16px">'
    + '<div style="display:flex;flex-wrap:wrap;gap:12px;align-items:end">'

    + '<div style="min-width:160px;flex:1"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Organization</div>'
    + '<div style="position:relative"><select id="tx-org" style="width:100%;padding:8px 28px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);appearance:none;cursor:pointer">'
    + '<option value="">Select an item</option><option value="OneFor">OneFor</option></select>'
    + '<svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="var(--fg2,#64748b)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'

    + '<div style="min-width:160px;flex:1"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Branch</div>'
    + '<div style="position:relative"><select id="tx-branch" disabled style="width:100%;padding:8px 28px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg2,#64748b);background:var(--card-bg,#fff);appearance:none;cursor:not-allowed;opacity:.6">'
    + '<option value="">Select an item</option><option value="OneFor HQ">OneFor HQ</option></select>'
    + '<svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="var(--fg2,#64748b)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'

    + '<div style="min-width:120px;flex:1"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Loan ID</div>'
    + '<input id="tx-loan-id" type="text" placeholder="e.g. 57" style="width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff)"/></div>'

    + '<div style="min-width:120px;flex:1"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Customer ID</div>'
    + '<input id="tx-cust-id" type="text" placeholder="e.g. 99" style="width:100%;box-sizing:border-box;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff)"/></div>'

    + '<div style="min-width:160px;flex:1"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Transaction Type</div>'
    + '<div style="position:relative;display:flex;align-items:center;gap:4px"><select id="tx-type" style="flex:1;padding:8px 28px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);appearance:none;cursor:pointer">'
    + '<option value="">Select an item</option>'+typeOpts+'</select>'
    + '<svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="var(--fg2,#64748b)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '<button id="tx-type-clear" hidden style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);font-size:16px;line-height:1;padding:0 2px;flex-shrink:0">×</button></div></div>'

    + '<div style="min-width:140px;flex:1"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Status</div>'
    + '<div style="position:relative"><select id="tx-status" style="width:100%;padding:8px 28px 8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);appearance:none;cursor:pointer">'
    + '<option value="">Select an item</option><option value="POSTED">POSTED</option><option value="PENDING">PENDING</option><option value="REVERSED">REVERSED</option></select>'
    + '<svg style="position:absolute;right:8px;top:50%;transform:translateY(-50%);pointer-events:none" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="var(--fg2,#64748b)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></div></div>'

    + '<div style="min-width:150px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Date From</div>'
    + '<div style="display:flex;align-items:center;gap:4px"><input id="tx-date-from" type="date" style="padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);min-width:0;flex:1"/>'
    + '<button id="tx-date-from-clear" hidden style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);font-size:16px;line-height:1;padding:0 2px;flex-shrink:0">×</button></div></div>'

    + '<div style="min-width:150px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Date To</div>'
    + '<div style="display:flex;align-items:center;gap:4px"><input id="tx-date-to" type="date" style="padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);min-width:0;flex:1"/>'
    + '<button id="tx-date-to-clear" hidden style="background:none;border:none;cursor:pointer;color:var(--fg2,#64748b);font-size:16px;line-height:1;padding:0 2px;flex-shrink:0">×</button></div></div>'

    + '<div style="min-width:110px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Amount From</div>'
    + '<input id="tx-amt-from" type="number" step="0.01" value="0.00" style="width:110px;box-sizing:border-box;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff)"/></div>'

    + '</div>'
    + '<div style="margin-top:12px"><div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Amount To</div>'
    + '<input id="tx-amt-to" type="number" step="0.01" value="0.00" style="width:110px;box-sizing:border-box;padding:8px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff)"/></div>'
    + '</div>';

  var resultsHtml = '<div id="tx-results-wrap" style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;overflow:hidden">'
    + _buildTxTable([], 'empty') + '</div>';

  return '<div style="padding:24px;max-width:1400px">'
    + '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px">'
    + '<div><div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Transactions</div>'
    + '<div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Search loan transactions across accounts</div></div>'
    + '<div id="tx-header-btns" style="display:flex;gap:8px;align-items:center">'
    + '<button id="tx-reset-btn" style="padding:8px 18px;border-radius:8px;background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer">Reset</button>'
    + '<button id="tx-search-btn" style="display:inline-flex;align-items:center;gap:7px;padding:8px 18px;border-radius:8px;background:#6C47FF;color:#fff;font-size:13px;font-weight:600;border:none;cursor:pointer">'
    + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="4" stroke="#fff" stroke-width="1.6"/><path d="M11 11l2.5 2.5" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>Search</button>'
    + '</div></div>'
    + filtersHtml
    + resultsHtml
    + '</div>';
}

function _buildTxTable(rows, mode) {
  var thS = 'padding:10px 16px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600;white-space:nowrap;background:var(--table-head-bg,#f8fafc)';
  var si = '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" style="margin-left:3px;vertical-align:middle"><path d="M3 4l2-2 2 2M3 6l2 2 2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  var thead = '<thead><tr style="border-bottom:2px solid var(--border1,#e2e8f0)">'
    + '<th style="'+thS+'">Loan ID '+si+'</th>'
    + '<th style="'+thS+'">Customer ID '+si+'</th>'
    + '<th style="'+thS+'">Transaction Type '+si+'</th>'
    + '<th style="'+thS+'">Booking Date '+si+'</th>'
    + '<th style="'+thS+'">Value Date '+si+'</th>'
    + '<th style="'+thS+';text-align:right">Amount '+si+'</th>'
    + '<th style="'+thS+'">Currency</th>'
    + '<th style="'+thS+'">Status</th>'
    + '</tr></thead>';

  var tbody = '';
  if (rows.length === 0) {
    var msg = mode === 'empty' ? 'Use filters above and click Search to find transactions.' : 'No transactions match the selected filters.';
    tbody = '<tbody><tr><td colspan="8" style="padding:48px 16px;text-align:center;color:var(--fg2,#64748b);font-size:13px">'+msg+'</td></tr></tbody>';
  } else {
    var trs = rows.map(function(r,i) {
      var isNeg = r.amount < 0;
      var amtAbs = Math.abs(r.amount).toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2});
      var amtStr = (isNeg ? '-' : '') + amtAbs + ' ' + r.currency;
      var amtColor = isNeg ? '#dc2626' : '#16a34a';
      var rowBg = i%2===0 ? '' : 'background:var(--table-head-bg,#f8fafc)';
      return '<tr style="'+rowBg+'">'
        + '<td style="padding:12px 16px"><a href="#" data-nav="loan-detail" data-loan-id="'+r.loanId+'" style="font-size:13px;font-weight:600;color:#6C47FF;text-decoration:none">'+r.loanId+'</a></td>'
        + '<td style="padding:12px 16px"><a href="#" data-nav="cust-detail" data-cust-id="'+r.customerId+'" style="font-size:13px;color:#6C47FF;text-decoration:none">'+r.customerId+'</a></td>'
        + '<td style="padding:12px 16px;font-size:13px;color:var(--fg,#1e293b)">'+r.type+'</td>'
        + '<td style="padding:12px 16px;font-size:13px;color:var(--fg2,#64748b);font-variant-numeric:tabular-nums">'+r.bookingDate+'</td>'
        + '<td style="padding:12px 16px;font-size:13px;color:var(--fg2,#64748b);font-variant-numeric:tabular-nums">'+r.valueDate+'</td>'
        + '<td style="padding:12px 16px;font-size:13px;font-weight:600;color:'+amtColor+';text-align:right;font-variant-numeric:tabular-nums">'+amtStr+'</td>'
        + '<td style="padding:12px 16px;font-size:13px;color:var(--fg2,#64748b)">'+r.currency+'</td>'
        + '<td style="padding:12px 16px"><span style="padding:3px 11px;border-radius:12px;font-size:11.5px;font-weight:600;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0">'+r.status+'</span></td>'
        + '</tr>';
    }).join('');
    tbody = '<tbody>'+trs+'</tbody>';
  }

  var pagination = '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-top:1px solid var(--border1,#e2e8f0)">'
    + '<span style="font-size:13px;color:var(--fg2,#64748b)">'+(rows.length > 0 ? rows.length+' transaction(s) found' : '')+'</span>'
    + '<div style="display:flex;gap:8px">'
    + '<button style="padding:6px 14px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);color:var(--fg2,#64748b);font-size:13px;cursor:pointer">Previous</button>'
    + '<button style="padding:6px 14px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:#6C47FF;color:#fff;font-size:13px;cursor:pointer">Next</button>'
    + '</div></div>';

  return '<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse">'+thead+tbody+'</table></div>'+pagination;
}

function wireTransactionsSection(el) {
  var dateFromInput = el.querySelector('#tx-date-from');
  var dateToInput   = el.querySelector('#tx-date-to');
  var dateFromClear = el.querySelector('#tx-date-from-clear');
  var dateToClear   = el.querySelector('#tx-date-to-clear');
  var orgSel        = el.querySelector('#tx-org');
  var branchSel     = el.querySelector('#tx-branch');
  var typeSel       = el.querySelector('#tx-type');
  var typeClear     = el.querySelector('#tx-type-clear');

  if (dateFromInput) dateFromInput.addEventListener('change', function() {
    if (dateFromClear) dateFromClear.hidden = !dateFromInput.value;
  });
  if (dateToInput) dateToInput.addEventListener('change', function() {
    if (dateToClear) dateToClear.hidden = !dateToInput.value;
  });
  if (dateFromClear) dateFromClear.addEventListener('click', function() { dateFromInput.value=''; dateFromClear.hidden=true; });
  if (dateToClear)   dateToClear.addEventListener('click',   function() { dateToInput.value='';   dateToClear.hidden=true; });

  if (typeSel) typeSel.addEventListener('change', function() {
    if (typeClear) typeClear.hidden = !typeSel.value;
  });
  if (typeClear) typeClear.addEventListener('click', function() { typeSel.value=''; typeClear.hidden=true; });

  if (orgSel && branchSel) orgSel.addEventListener('change', function() {
    branchSel.disabled = !orgSel.value;
    if (!orgSel.value) branchSel.value = '';
  });

  function parseDMY(s) {
    var p = s.split('.'); if (p.length !== 3) return null;
    return parseInt(p[2]+p[1]+p[0], 10);
  }
  function parseISO(s) { return s ? parseInt(s.replace(/-/g,''), 10) : null; }

  function doSearch() {
    var loanId   = (el.querySelector('#tx-loan-id') ? el.querySelector('#tx-loan-id').value : '').trim();
    var custId   = (el.querySelector('#tx-cust-id') ? el.querySelector('#tx-cust-id').value : '').trim();
    var txType   = typeSel ? typeSel.value : '';
    var status   = el.querySelector('#tx-status') ? el.querySelector('#tx-status').value : '';
    var dateFrom = parseISO(dateFromInput ? dateFromInput.value : '');
    var dateTo   = parseISO(dateToInput ? dateToInput.value : '');
    var amtFromEl = el.querySelector('#tx-amt-from');
    var amtToEl   = el.querySelector('#tx-amt-to');
    var amtFrom  = amtFromEl ? (parseFloat(amtFromEl.value) || 0) : 0;
    var amtTo    = amtToEl   ? (parseFloat(amtToEl.value)   || 0) : 0;

    var results = _MOCK_TRANSACTIONS.slice();
    if (loanId)  results = results.filter(function(r){ return String(r.loanId).indexOf(loanId) !== -1; });
    if (custId)  results = results.filter(function(r){ return String(r.customerId).indexOf(custId) !== -1; });
    if (txType)  results = results.filter(function(r){ return r.type === txType; });
    if (status)  results = results.filter(function(r){ return r.status === status; });
    if (dateFrom) results = results.filter(function(r){ var d = parseDMY(r.bookingDate); return d && d >= dateFrom; });
    if (dateTo)   results = results.filter(function(r){ var d = parseDMY(r.bookingDate); return d && d <= dateTo; });
    if (amtFrom > 0) results = results.filter(function(r){ return Math.abs(r.amount) >= amtFrom; });
    if (amtTo   > 0) results = results.filter(function(r){ return Math.abs(r.amount) <= amtTo; });

    _txResults = results;

    var wrap = el.querySelector('#tx-results-wrap');
    if (wrap) wrap.innerHTML = _buildTxTable(_txResults, 'results');

    // Show Export button
    var hdrBtns = el.querySelector('#tx-header-btns');
    var existing = el.querySelector('#tx-export-btn');
    if (hdrBtns && !existing && _txResults.length > 0) {
      var exp = document.createElement('button');
      exp.id = 'tx-export-btn';
      exp.style.cssText = 'display:inline-flex;align-items:center;gap:7px;padding:8px 18px;border-radius:8px;background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);color:var(--fg,#1e293b);font-size:13px;font-weight:600;cursor:pointer';
      exp.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M5 7l3 3 3-3M3 12h10" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg> Export';
      hdrBtns.insertBefore(exp, hdrBtns.firstChild);
    } else if (existing && _txResults.length === 0) {
      existing.remove();
    }
  }

  function doReset() {
    ['tx-loan-id','tx-cust-id'].forEach(function(id){ var e2=el.querySelector('#'+id); if(e2) e2.value=''; });
    ['tx-org','tx-branch','tx-type','tx-status'].forEach(function(id){ var e2=el.querySelector('#'+id); if(e2) e2.value=''; });
    var af = el.querySelector('#tx-amt-from'); if(af) af.value='0.00';
    var at = el.querySelector('#tx-amt-to');   if(at) at.value='0.00';
    if (dateFromInput) dateFromInput.value='';
    if (dateToInput)   dateToInput.value='';
    if (dateFromClear) dateFromClear.hidden=true;
    if (dateToClear)   dateToClear.hidden=true;
    if (typeClear)     typeClear.hidden=true;
    if (branchSel) { branchSel.disabled=true; branchSel.value=''; }
    _txResults = null;
    var wrap = el.querySelector('#tx-results-wrap');
    if (wrap) wrap.innerHTML = _buildTxTable([], 'empty');
    var expBtn = el.querySelector('#tx-export-btn');
    if (expBtn) expBtn.remove();
  }

  var searchBtn = el.querySelector('#tx-search-btn');
  var resetBtn  = el.querySelector('#tx-reset-btn');
  if (searchBtn) searchBtn.addEventListener('click', doSearch);
  if (resetBtn)  resetBtn.addEventListener('click',  doReset);

  el.addEventListener('click', function(e) {
    if (e.target.closest && e.target.closest('#tx-export-btn')) {
      alert('Export: '+(_txResults||[]).length+' transaction(s) would be exported as CSV.');
    }
  });
}

// ─── MIGRATION ───────────────────────────────────────────────────────────────

var _migDate = '26.08.2026';   // current migration date shown in the field
var _migState = {              // per-job state: 'idle'|'running'|'done'|'error'
  'loan-opening':     { status: 'idle', hasProduct: false },
  'collection':       { status: 'idle', hasProduct: false },
  'early-repayment':  { status: 'idle', hasProduct: false },
  'interest-accrual': { status: 'idle', hasProduct: true,  product: 'PABNPL - v3 and 0INTBN...' },
  'fee-accrual':      { status: 'idle', hasProduct: true,  product: 'PABNPL - v3 and 0INTBN...' },
  'penalty-interest': { status: 'idle', hasProduct: true,  product: 'PABNPL - v3 and 0INTBN...' },
  'eod-balance':      { status: 'idle', hasProduct: false },
};

// Ordered list — must run sequentially
var _MIG_ORDER = ['loan-opening','collection','early-repayment','interest-accrual','fee-accrual','penalty-interest','eod-balance'];

var _MIG_LABELS = {
  'loan-opening':     'Loan opening',
  'collection':       'Collection',
  'early-repayment':  'Early Repayment',
  'interest-accrual': 'Interest Accrual',
  'fee-accrual':      'Fee Accrual',
  'penalty-interest': 'Penalty Interest',
  'eod-balance':      'EoD Balance',
};

var _migRunAllActive = false;
var _migRunAllQueue  = [];
var _migToasts       = [];   // { id, msg }
var _migToastCounter = 0;

function _migNextAllowed() {
  // returns the key of the first job that is not yet done (or null if all done)
  for (var i = 0; i < _MIG_ORDER.length; i++) {
    var k = _MIG_ORDER[i];
    if (_migState[k].status !== 'done') return k;
  }
  return null;
}

function _migAllDone() {
  return _MIG_ORDER.every(function(k){ return _migState[k].status === 'done'; });
}

function buildMigrationSection() {
  var rows = _MIG_ORDER.map(function(key) {
    return _buildMigRow(key);
  }).join('');

  var runAllLabel = _migRunAllActive ? 'Running...' : 'Run all';
  var runAllIcon  = _migRunAllActive
    ? '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="animation:migSpin 1s linear infinite"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>'
    : '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polygon points="5,3 13,8 5,13" fill="#fff"/></svg>';

  return '<style>'
    + '@keyframes migSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}'
    + '@keyframes migSlideIn{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}'
    + '@keyframes migFadeOut{from{opacity:1}to{opacity:0}}'
    + '</style>'
    + '<div style="padding:24px;max-width:900px">'
    +   '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">'
    +     '<div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Migration</div>'
    +     '<div style="display:flex;gap:8px;align-items:center">'
    +       '<button id="mig-run-all-btn" '+((_migRunAllActive||_migAllDone())?'disabled':'')+' style="display:inline-flex;align-items:center;gap:7px;padding:8px 20px;border-radius:8px;background:#6C47FF;color:#fff;font-size:13px;font-weight:600;border:none;cursor:pointer;opacity:'+(_migAllDone()?'0.5':'1')+'">'
    +         runAllIcon + runAllLabel
    +       '</button>'
    +       '<button id="mig-next-date-btn" style="display:inline-flex;align-items:center;gap:7px;padding:8px 20px;border-radius:8px;background:#6C47FF;color:#fff;font-size:13px;font-weight:600;border:none;cursor:pointer">'
    +         '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 8h8M9 5l3 3-3 3" stroke="#fff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    +         'Next date'
    +       '</button>'
    +     '</div>'
    +   '</div>'

    +   '<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:28px 32px">'
    +     '<div style="margin-bottom:24px">'
    +       '<div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:6px">Date</div>'
    +       '<input id="mig-date-input" type="text" value="'+_migDate+'" readonly style="width:200px;padding:9px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff);font-variant-numeric:tabular-nums"/>'
    +     '</div>'
    +     '<div id="mig-jobs-list" style="display:flex;flex-direction:column;gap:0">'
    +       rows
    +     '</div>'
    +   '</div>'

    +   '<div id="mig-toasts" style="position:fixed;bottom:24px;right:24px;display:flex;flex-direction:column;gap:8px;z-index:9999">'
    +     _migToasts.map(function(t){ return _buildMigToast(t.id, t.msg); }).join('')
    +   '</div>'
    + '</div>';
}

function _buildMigRow(key) {
  var st  = _migState[key];
  var lbl = _MIG_LABELS[key];
  var idx = _MIG_ORDER.indexOf(key);

  // Determine if this row is "unlocked" (all previous done)
  var unlocked = _MIG_ORDER.slice(0, idx).every(function(k){ return _migState[k].status === 'done'; });

  // Run button appearance
  var runBtnStyle, runBtnLabel, runBtnDisabled;
  if (st.status === 'done') {
    runBtnStyle = 'padding:7px 22px;border-radius:7px;border:1px solid #d1d5db;background:var(--card-bg,#fff);color:var(--fg2,#64748b);font-size:13px;font-weight:500;cursor:default;opacity:.55';
    runBtnLabel = 'Run';
    runBtnDisabled = true;
  } else if (st.status === 'running') {
    runBtnStyle = 'padding:7px 22px;border-radius:7px;border:1px solid #c4b5fd;background:var(--card-bg,#fff);color:#6C47FF;font-size:13px;font-weight:500;cursor:default;display:inline-flex;align-items:center;gap:6px';
    runBtnLabel = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="animation:migSpin 1s linear infinite"><circle cx="8" cy="8" r="6" stroke="#c4b5fd" stroke-width="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="#6C47FF" stroke-width="2" stroke-linecap="round"/></svg>Running...';
    runBtnDisabled = true;
  } else {
    // idle — only enabled if unlocked
    runBtnStyle = 'padding:7px 22px;border-radius:7px;border:1px solid '+(unlocked?'#c4b5fd':'#e2e8f0')+';background:var(--card-bg,#fff);color:'+(unlocked?'#6C47FF':'var(--fg2,#64748b)')+';font-size:13px;font-weight:500;cursor:'+(unlocked?'pointer':'not-allowed')+';opacity:'+(unlocked?'1':'.5');
    runBtnLabel = 'Run';
    runBtnDisabled = !unlocked;
  }

  // Check icon
  var checkHtml;
  if (st.status === 'done') {
    checkHtml = '<div style="width:32px;height:32px;border-radius:8px;background:#22c55e;display:flex;align-items:center;justify-content:center;flex-shrink:0">'
      + '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>';
  } else if (st.status === 'running') {
    checkHtml = '<div style="width:32px;height:32px;border-radius:8px;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;flex-shrink:0">'
      + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="animation:migSpin 1s linear infinite"><circle cx="8" cy="8" r="6" stroke="#e2e8f0" stroke-width="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="#6C47FF" stroke-width="2" stroke-linecap="round"/></svg>'
      + '</div>';
  } else {
    checkHtml = '<div style="width:32px;height:32px;border-radius:8px;border:2px solid #e2e8f0;display:flex;align-items:center;justify-content:center;flex-shrink:0">'
      + '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
      + '</div>';
  }

  // Product tag (for accrual jobs)
  var productHtml = '';
  if (st.hasProduct) {
    productHtml = '<div style="margin-bottom:6px">'
      + '<div style="font-size:10px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:4px">Product</div>'
      + '<div style="display:inline-flex;align-items:center;gap:6px;padding:5px 10px;border:1px solid var(--border1,#e2e8f0);border-radius:7px;background:var(--card-bg,#fff);font-size:12.5px;color:var(--fg,#1e293b);max-width:220px">'
      + '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:180px">'+st.product+'</span>'
      + '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" style="flex-shrink:0;cursor:pointer;color:var(--fg2,#64748b)"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'
      + '</div>'
    + '</div>';
  }

  var borderTop = idx > 0 ? 'border-top:1px solid var(--border1,#e2e8f0);' : '';

  return '<div data-mig-key="'+key+'" style="'+borderTop+'padding:20px 0;display:flex;align-items:center;gap:0">'
    // Label column (left, fixed width)
    + '<div style="width:220px;flex-shrink:0">'
    +   '<div style="font-size:14px;font-weight:500;color:var(--fg,#1e293b)">'+lbl+'</div>'
    + '</div>'
    // Product + Run + Check (right)
    + '<div style="flex:1;display:flex;align-items:center;justify-content:flex-end;gap:12px">'
    +   (st.hasProduct ? '<div style="margin-right:auto">'+productHtml+'</div>' : '<div style="flex:1"></div>')
    +   '<button class="mig-run-btn" data-key="'+key+'" '+(runBtnDisabled?'disabled':'')+' style="'+runBtnStyle+'">'+runBtnLabel+'</button>'
    +   checkHtml
    + '</div>'
  + '</div>';
}

function _buildMigToast(id, msg) {
  return '<div id="mig-toast-'+id+'" style="display:flex;align-items:center;gap:10px;padding:12px 16px;background:#fff;border:1px solid #e2e8f0;border-left:4px solid #22c55e;border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,.10);min-width:260px;animation:migSlideIn .25s ease">'
    + '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#22c55e"/><path d="M6 10l3 3 5-6" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    + '<div><div style="font-size:13px;font-weight:700;color:#15803d">Success</div><div style="font-size:12px;color:#64748b;margin-top:1px">'+msg+'</div></div>'
    + '<button onclick="document.getElementById(\'mig-toast-'+id+'\').remove()" style="margin-left:auto;background:none;border:none;cursor:pointer;color:#94a3b8;font-size:18px;line-height:1;padding:0 2px">×</button>'
  + '</div>';
}

function wireMigrationSection(el) {
  function rerender() {
    var container = document.getElementById('content-area') || el.parentNode;
    el.innerHTML = buildMigrationSection();
    wireJobButtons(el);
    wireRunAll(el);
  }

  function reloadRow(key) {
    var existing = el.querySelector('[data-mig-key="'+key+'"]');
    if (!existing) return;
    var tmp = document.createElement('div');
    tmp.innerHTML = _buildMigRow(key);
    var newRow = tmp.firstElementChild;
    existing.parentNode.replaceChild(newRow, existing);
    wireJobButtons(el);
  }

  function addToast(msg) {
    _migToastCounter++;
    var id = _migToastCounter;
    _migToasts.push({ id: id, msg: msg });
    var toastsEl = el.querySelector('#mig-toasts');
    if (toastsEl) {
      var tmp = document.createElement('div');
      tmp.innerHTML = _buildMigToast(id, msg);
      toastsEl.insertBefore(tmp.firstElementChild, toastsEl.firstChild);
    }
    // Auto-dismiss after 4s
    setTimeout(function() {
      _migToasts = _migToasts.filter(function(t){ return t.id !== id; });
      var t = document.getElementById('mig-toast-'+id);
      if (t) { t.style.animation='migFadeOut .3s ease forwards'; setTimeout(function(){ if(t.parentNode) t.remove(); }, 300); }
    }, 4000);
  }

  function runJob(key, onDone) {
    _migState[key].status = 'running';
    reloadRow(key);
    // Update Run all button label
    var runAllBtn = el.querySelector('#mig-run-all-btn');
    if (runAllBtn) {
      runAllBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="animation:migSpin 1s linear infinite"><circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.4)" stroke-width="2"/><path d="M8 2a6 6 0 0 1 6 6" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg> Running...';
      runAllBtn.disabled = true;
    }
    // Simulate 1.2–2s job execution
    var delay = 1200 + Math.random() * 800;
    setTimeout(function() {
      _migState[key].status = 'done';
      reloadRow(key);
      // Unlock the next job by re-rendering its row now that this one is done
      var nextIdx = _MIG_ORDER.indexOf(key) + 1;
      if (nextIdx < _MIG_ORDER.length) {
        reloadRow(_MIG_ORDER[nextIdx]);
      }
      addToast(_MIG_LABELS[key] + ' completed');
      if (onDone) onDone();
    }, delay);
  }

  function wireJobButtons(container) {
    container.querySelectorAll('.mig-run-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var key = btn.getAttribute('data-key');
        if (!key || btn.disabled) return;
        if (_migState[key].status !== 'idle') return;
        // Check all previous are done
        var idx = _MIG_ORDER.indexOf(key);
        var allPrevDone = _MIG_ORDER.slice(0, idx).every(function(k){ return _migState[k].status === 'done'; });
        if (!allPrevDone) return;
        runJob(key, function() {
          // After single run completes, refresh Run all button state
          var runAllBtn = el.querySelector('#mig-run-all-btn');
          if (runAllBtn && !_migRunAllActive) {
            runAllBtn.disabled = _migAllDone();
            runAllBtn.style.opacity = _migAllDone() ? '0.5' : '1';
            runAllBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polygon points="5,3 13,8 5,13" fill="#fff"/></svg> Run all';
          }
        });
      });
    });
  }

  function wireRunAll(container) {
    var btn = container.querySelector('#mig-run-all-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      if (_migRunAllActive || _migAllDone()) return;
      _migRunAllActive = true;

      // Build queue of remaining idle jobs
      _migRunAllQueue = _MIG_ORDER.filter(function(k){ return _migState[k].status === 'idle'; });

      function runNext() {
        if (_migRunAllQueue.length === 0) {
          _migRunAllActive = false;
          var runAllBtn2 = el.querySelector('#mig-run-all-btn');
          if (runAllBtn2) {
            runAllBtn2.innerHTML = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><polygon points="5,3 13,8 5,13" fill="#fff"/></svg> Run all';
            runAllBtn2.disabled = true;
            runAllBtn2.style.opacity = '0.5';
          }
          return;
        }
        var nextKey = _migRunAllQueue.shift();
        runJob(nextKey, runNext);
      }
      runNext();
    });
  }

  // Next date button — advances date by one day and resets all jobs
  var nextDateBtn = el.querySelector('#mig-next-date-btn');
  if (nextDateBtn) {
    nextDateBtn.addEventListener('click', function() {
      // Parse DD.MM.YYYY
      var parts = _migDate.split('.');
      var d = new Date(parseInt(parts[2],10), parseInt(parts[1],10)-1, parseInt(parts[0],10));
      d.setDate(d.getDate() + 1);
      var dd = String(d.getDate()).padStart(2,'0');
      var mm = String(d.getMonth()+1).padStart(2,'0');
      var yyyy = d.getFullYear();
      _migDate = dd+'.'+mm+'.'+yyyy;

      // Reset all job states
      _MIG_ORDER.forEach(function(k){
        _migState[k].status = 'idle';
      });
      _migRunAllActive = false;
      _migRunAllQueue  = [];
      _migToasts       = [];

      // Re-render
      el.innerHTML = buildMigrationSection();
      wireJobButtons(el);
      wireRunAll(el);
      var nextDateBtn2 = el.querySelector('#mig-next-date-btn');
      if (nextDateBtn2) nextDateBtn2.addEventListener('click', arguments.callee);
    });
  }

  wireJobButtons(el);
  wireRunAll(el);
}
