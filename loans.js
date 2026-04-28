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
    const tabDetails = `
      <div class="li-section">
        <div class="li-section-title">Basic Information</div>
        <div class="li-field-grid">
          <div class="li-field"><div class="li-field-label">Product Name</div><div class="li-field-value">${d.product}</div></div>
          <div class="li-field"><div class="li-field-label">Customer Name</div><div class="li-field-value">${d.customer}</div></div>
          <div class="li-field"><div class="li-field-label">Loan Officer</div><div class="li-field-value">${d.loanOfficer}</div></div>
        </div>
      </div>
      <div class="li-section">
        <div class="li-section-title">Organisation Details</div>
        <div class="li-field-grid-2">
          <div class="li-field"><div class="li-field-label">Organisation</div><div class="li-field-value" style="font-size:.76rem;word-break:break-all">${d.org}</div></div>
          <div class="li-field"><div class="li-field-label">Branch</div><div class="li-field-value">${d.branch}</div></div>
        </div>
      </div>
      <div class="li-section">
        <div class="li-section-title">Loan Details</div>
        <div class="li-field-grid">
          <div class="li-field"><div class="li-field-label">Disbursement Date</div><div class="li-field-value">${d.disbursed}</div></div>
          <div class="li-field"><div class="li-field-label">Maturity Date</div><div class="li-field-value">${d.maturity}</div></div>
          <div class="li-field"><div class="li-field-label">Tenor</div><div class="li-field-value">${d.tenor}</div></div>
          <div class="li-field"><div class="li-field-label">Currency</div><div class="li-field-value">${d.currency}</div></div>
        </div>
      </div>
      <div class="li-section">
        <div class="li-section-title">Financial Details</div>
        <div class="li-field-grid">
          <div class="li-field"><div class="li-field-label">Loan Amount</div><div class="li-field-value">${d.loanAmt}</div></div>
          <div class="li-field"><div class="li-field-label">Outstanding Balance</div><div class="li-field-value">${d.outstanding}</div></div>
          <div class="li-field"><div class="li-field-label">Accrued Interest</div><div class="li-field-value">${d.accruedInt}</div></div>
          <div class="li-field"><div class="li-field-label">Accrued Fee</div><div class="li-field-value">${d.accruedFee}</div></div>
          <div class="li-field"><div class="li-field-label">Penalty Interest Amount</div><div class="li-field-value">${d.penaltyAmt}</div></div>
          <div class="li-field"><div class="li-field-label">Interest Accrued On</div><div class="li-field-value">${d.intAccruedOn}</div></div>
          <div class="li-field"><div class="li-field-label">Fee Accrued On</div><div class="li-field-value">${d.feeAccruedOn}</div></div>
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
          <div class="li-field"><div class="li-field-label">Purpose</div><div class="li-field-value">${d.purpose}</div></div>
          <div class="li-field"><div class="li-field-label">Collateral Value</div><div class="li-field-value">${d.collateral}</div></div>
          <div class="li-field"><div class="li-field-label">LTV Ratio</div><div class="li-field-value">${d.ltv}</div></div>
          <div class="li-field"><div class="li-field-label">Loan Application ID</div><div class="li-field-value" style="font-size:.76rem;word-break:break-all">${d.appId}</div></div>
          <div class="li-field"><div class="li-field-label">PD</div><div class="li-field-value">${d.tlq}</div></div>
          <div class="li-field"><div class="li-field-label">LGD %</div><div class="li-field-value">${d.lgd}</div></div>
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
    const tabCollection = `
      <div class="li-section">
        <div class="li-coll-input-header">
          <div>
            <div class="li-sched-title">Collection for Loan ID: ${loanId}</div>
            <div class="li-sched-sub">Preview allocation and post collection transactions</div>
          </div>
          <div class="li-coll-btns">
            <button class="li-btn-preview">Preview Allocation</button>
            <button class="li-btn-post">Post Collection</button>
          </div>
        </div>
        <div>
          <div class="li-section-title" style="padding:12px 18px 10px;border-bottom:none;">Collection Input</div>
          <div class="li-coll-fields">
            <div class="li-field"><div class="li-field-label">Amount</div><input class="li-txn-input" value="30" /></div>
            <div class="li-field"><div class="li-field-label">Currency</div>
              <select class="li-txn-select"><option>EUR</option><option>USD</option><option>GBP</option></select>
            </div>
            <div class="li-field"><div class="li-field-label">Booking Date</div><input class="li-txn-input" value="25.03.2026" /></div>
            <div class="li-field"><div class="li-field-label">Value Date</div><input class="li-txn-input" value="25.03.2026" /></div>
          </div>
        </div>
      </div>
      <div class="li-coll-result">
        <div class="li-coll-result-title">Allocation Preview Result</div>
        <div class="li-coll-amounts">
          <div class="li-coll-amt-cell"><div class="li-coll-amt-label">Payment Amount</div><div class="li-coll-amt-value">30.00 EUR</div></div>
          <div class="li-coll-amt-cell"><div class="li-coll-amt-label">Allocated Amount</div><div class="li-coll-amt-value">30.00 EUR</div></div>
          <div class="li-coll-amt-cell"><div class="li-coll-amt-label">Unallocated Amount</div><div class="li-coll-amt-value">0.00 EUR</div></div>
        </div>
        <div class="li-sched-table-wrap">
          <table class="li-sched-table">
            <thead>
              <tr><th>Sequence</th><th>Due Date</th><th>Components</th><th>Remaining Before</th><th>Applied</th><th>Remaining After</th></tr>
            </thead>
            <tbody>
              <tr><td>2</td><td>20.04.2026</td><td>Principal</td><td style="text-align:right">50.38 EUR</td><td style="text-align:right;color:#1a9e5c;font-weight:600">30.00 EUR</td><td style="text-align:right">20.38 EUR</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;

    // ── Tab: EARLY REPAYMENT ──────────────────────────────────────────────────
    const erFields = [
      { label:'Loan Account ID',          val: loanId },
      { label:'Payoff Date',              val:'25.03.2026' },
      { label:'Principal Amount',         val:'1,000.00' },
      { label:'Interest Due Amount',      val:'0.00' },
      { label:'Penalty Due Amount',       val:'0.00' },
      { label:'Fee Due Amount',           val:'0.00' },
      { label:'Accrued Interest Amount',  val:'1.88' },
      { label:'Total Amount',             val:'1,001.88' },
      { label:'Last Interest Accrual Run',val:'21.06.2026' },
      { label:'Last Fee Accrual Run',     val:'-' },
      { label:'Last Penalty Run',         val:'21.06.2026' },
    ];
    const tabEarlyRepayment = `
      <div class="li-section">
        <div class="li-er-header">
          <div>
            <div class="li-sched-title">Early Repayment</div>
            <div class="li-sched-sub">Early repayment summary for loan ID: ${loanId}</div>
          </div>
          <button class="li-pay-btn">
            ${_I_CHECK_13}
            Pay
          </button>
        </div>
        <div class="li-section-title" style="padding:14px 18px 12px;">Summary</div>
        <div class="li-er-fields">
          ${erFields.map(f=>`
            <div class="li-er-row">
              <div class="li-er-label">${f.label}</div>
              <div class="li-er-val">${f.val}</div>
            </div>`).join('')}
        </div>
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
        <div class="li-summary-grid">
          <div class="li-sum-cell"><div class="li-sum-label">Product Name</div><div class="li-sum-value">${esc(d.product)}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Customer Name</div><div class="li-sum-value">${d.customer}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Loan Amount</div><div class="li-sum-value">${d.loanAmt}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Outstanding Balance</div><div class="li-sum-value">${d.outstanding}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Disbursement Date</div><div class="li-sum-value">${d.disbursed}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Maturity Date</div><div class="li-sum-value">${d.maturity}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">First Repayment Date</div><div class="li-sum-value">${d.firstRepay}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Number of Instalments</div><div class="li-sum-value">${d.instalments}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Preferential Interest Rate (%)</div><div class="li-sum-value">${d.prefRate}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Annual Interest Rate (%)</div><div class="li-sum-value">${d.annualRate}</div></div>
          <div class="li-sum-cell"><div class="li-sum-label">Total Interest Rate (%)</div><div class="li-sum-value">${d.totalRate}</div></div>
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
    // ── EOD MANUAL RUN ──────────────────────────────────────────────────────────
  if (section === 'eod') {
    return `
      <div class="eod-wrap">
        <div class="pg-header">
          <div class="pg-title">Loan operations</div>
          <button class="btn-eod-run" data-action="eod-run-job">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9l6 3-6 3V9z" fill="currentColor" stroke="none"/>
            </svg>
            Run
          </button>
        </div>

        <div class="eod-card">
          <div class="eod-grid-2">
            <div class="eod-field">
              <label class="eod-label">Job Type</label>
              <div class="eod-select-wrap">
                <select id="eod-job-type" class="eod-select">
                  <option value="" selected>Select an item</option>
                  <option value="interest-accrual">Interest accrual</option>
                  <option value="penalty-accrual">Penalty accrual</option>
                  <option value="fee-accrual">Fee accrual</option>
                  <option value="loan-balance">Loan balance</option>
                </select>
              </div>
            </div>
            <div class="eod-field">
              <label class="eod-label">Product</label>
              <div class="eod-select-wrap">
                <select id="eod-product" class="eod-select">
                  <option value="" selected>Select an item</option>
                  <option value="bnpl17">BNPL 17 - final test on 4th Apr</option>
                  <option value="bnpl24">BNPL 24</option>
                  <option value="consumer">Consumer Loan</option>
                  <option value="mortgage">Mortgage</option>
                  <option value="auto">Auto Loan</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="eod-card">
          <div class="eod-acct-header">
            <div class="eod-acct-title">Loan account numbers</div>
            <div class="eod-acct-controls">
              <div class="eod-acct-select-wrap">
                <select id="eod-acct-sel" class="eod-acct-select">
                  <option value="" selected>Select an item</option>
                  <option value="LN-2024-001">LN-2024-001</option>
                  <option value="LN-2024-002">LN-2024-002</option>
                  <option value="LN-2024-003">LN-2024-003</option>
                  <option value="LN-2025-001">LN-2025-001</option>
                  <option value="LN-2025-002">LN-2025-002</option>
                  <option value="LN-2026-001">LN-2026-001</option>
                  <option value="LN-2026-002">LN-2026-002</option>
                </select>
              </div>
              <button class="btn-eod-add-acct" data-action="eod-add-account">Add</button>
            </div>
          </div>
          <div class="eod-acct-table-wrap">
            <table class="eod-acct-table">
              <thead>
                <tr><th>Account Number</th><th style="width:100px;text-align:right;">Actions</th></tr>
              </thead>
              <tbody id="eod-acct-body">
                <tr><td colspan="2" class="eod-acct-empty">No loan accounts added yet</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
    // ── EOD SCHEDULER ────────────────────────────────────────────────────────────
  if (section === 'eod-scheduler') {
    return `
      <div class="eod-wrap">
        <div class="pg-header">
          <div>
            <div class="pg-title">End of Day Scheduler</div>
            <div class="pg-sub">Schedule automated end-of-day processing jobs</div>
          </div>
        </div>

        <div class="eod-card">
          <div class="eod-sched-section-title">Add New Schedule</div>
          <div class="eod-sched-sub">Select a job type, frequency and time to create a new scheduled run</div>

          <div class="eod-sched-grid">
            <div class="eod-field">
              <label class="eod-label">Job Type</label>
              <div class="eod-select-wrap">
                <select id="sched-job-type" class="eod-select">
                  <option value="" selected>Select an item</option>
                  <option value="interest-accrual">Interest accrual</option>
                  <option value="penalty-accrual">Penalty accrual</option>
                  <option value="fee-accrual">Fee accrual</option>
                  <option value="loan-balance">Loan Balance</option>
                </select>
              </div>
            </div>
            <div class="eod-field">
              <label class="eod-label">Frequency</label>
              <div class="eod-select-wrap">
                <select id="sched-frequency" class="eod-select">
                  <option value="" selected>Select frequency</option>
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
            <div class="eod-field">
              <label class="eod-label">Time</label>
              <input id="sched-time" class="eod-sched-input" type="time" value="23:00"/>
            </div>
            <div class="eod-field">
              <label class="eod-label">&nbsp;</label>
              <button class="btn-eod-sched-add" data-action="eod-add-schedule">Add Schedule</button>
            </div>
          </div>
        </div>

        <div class="eod-card">
          <div class="eod-sched-section-title">Configured Schedules</div>
          <div class="eod-sched-table-wrap">
            <table class="eod-sched-table">
              <thead>
                <tr>
                  <th>Job Type</th>
                  <th>Frequency</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th style="width:150px;text-align:right;">Actions</th>
                </tr>
              </thead>
              <tbody id="eod-sched-body">
                <tr><td colspan="5" class="eod-sched-empty">No schedules configured yet. Add one above.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }
    // ── LOAN SIMULATION ──────────────────────────────────────────────────────────
  if (section === 'loansim') {
    return `
      <div class="sim-wrap">
        <div class="pg-header">
          <div class="pg-title">Loan Simulation</div>
          <div class="pg-sub">Configure loan parameters and run simulations</div>
        </div>

        <div class="sim-card">
          <div class="sim-grid-4">
            <div class="sim-field">
              <label class="sim-label">Product</label>
              <div class="sim-product-wrap">
                <input id="sim-product" class="sim-input" type="text" value="BNPL 17 - final test on 4th Apr" placeholder="Select product..."/>
                <button class="sim-product-clear" data-action="sim-clear-product" title="Clear">×</button>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Loan Amount</label>
              <input id="sim-amount" class="sim-input" type="number" value="1000" min="0"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Currency Code</label>
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
              <input id="sim-annual-rate" class="sim-input" type="number" value="17" step="0.01" min="0"/>
            </div>

            <div class="sim-field">
              <label class="sim-label">Preferential Interest Rate (%)</label>
              <input id="sim-pref-rate" class="sim-input" type="number" value="-2" step="0.01"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Tenure (months)</label>
              <input id="sim-tenure" class="sim-input" type="number" value="6" min="1" max="360"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">Disbursement Date</label>
              <input id="sim-disb-date" class="sim-input" type="date" value="2026-03-25"/>
            </div>
            <div class="sim-field">
              <label class="sim-label">First Repayment Date</label>
              <input id="sim-first-repay" class="sim-input" type="date" value="2026-04-25"/>
            </div>

            <div class="sim-field">
              <label class="sim-label">Repayment Pattern</label>
              <div class="sim-select-wrap">
                <select id="sim-repay-pattern" class="sim-select">
                  <option value="equal" selected>Equal Installment</option>
                  <option value="bullet">Bullet</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Repayment Frequency</label>
              <div class="sim-select-wrap">
                <select id="sim-repay-freq" class="sim-select">
                  <option value="monthly" selected>Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="semi-annual">Semi-Annual</option>
                  <option value="annual">Annual</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Repayment Schedule Method</label>
              <div class="sim-select-wrap">
                <select id="sim-repay-sched" class="sim-select">
                  <option value="" selected>Select an item</option>
                  <option value="annuity">Annuity</option>
                  <option value="straight-line">Straight Line</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Interest Calculation Method</label>
              <div class="sim-select-wrap">
                <select id="sim-int-calc" class="sim-select">
                  <option value="30/360" selected>30/360</option>
                  <option value="actual/360">Actual/360</option>
                  <option value="actual/365">Actual/365</option>
                  <option value="actual/actual">Actual/Actual</option>
                </select>
              </div>
            </div>

            <div class="sim-field">
              <label class="sim-label">Interest Calculated At</label>
              <div class="sim-select-wrap">
                <select id="sim-int-at" class="sim-select">
                  <option value="end" selected>End of Period</option>
                  <option value="start">Start of Period</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Non-Working Day Adjustment</label>
              <div class="sim-select-wrap">
                <select id="sim-non-working" class="sim-select">
                  <option value="none" selected>No Adjustment</option>
                  <option value="next">Next Working Day</option>
                  <option value="prev">Previous Working Day</option>
                </select>
              </div>
            </div>
            <div class="sim-field">
              <label class="sim-label">Adjust Last Installment</label>
              <div class="sim-select-wrap">
                <select id="sim-adjust-last" class="sim-select">
                  <option value="no" selected>No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>
            </div>
            <div class="sim-field"></div>
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
          <button class="btn-sim-run" data-action="run-simulation">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
            Run Simulation
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
          + Add Loan Product
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

  if (section === 'penalty') {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = buildPenaltySection(mod);
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

function openPenaltyForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const modLabels = { loans: 'Loan Management', accounts: 'Account Management' };
  const modLabel = modLabels[mod] || mod;
  const d = data || {};

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>${modLabel}</span><span class="bc-sep">›</span>
      <span>Penalty Definitions</span><span class="bc-sep">›</span>
      <span class="bc-current">${d.name ? 'Edit Penalty Definition' : 'New Penalty Definition'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content"
          data-module="${mod}"
          data-section="penalty"
          data-title="Penalty Definitions"
          data-subtitle="Define late payment and penalty structures"
          title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Penalty Definition</div>
          <div class="fee-form-subheading">Manage penalty definition</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="penalty-save">
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
          <label class="fee-form-label">Calculation Method</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-method">
              <option ${(d.method||'') === 'Actual Actual' ? 'selected' : ''}>Actual Actual</option>
              <option ${(d.method||'') === 'Actual/365'   ? 'selected' : ''}>Actual/365</option>
              <option ${(d.method||'') === 'Actual/360'   ? 'selected' : ''}>Actual/360</option>
              <option ${(d.method||'') === '30/360'       ? 'selected' : ''}>30/360</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Frequency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-freq">
              <option ${(d.freq||'Daily') === 'Daily'   ? 'selected' : ''}>Daily</option>
              <option ${(d.freq||'')      === 'Monthly' ? 'selected' : ''}>Monthly</option>
              <option ${(d.freq||'')      === 'Once'    ? 'selected' : ''}>Once</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Penalty Base</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-base">
              <option ${(d.base||'Outstanding Principal') === 'Outstanding Principal' ? 'selected' : ''}>Outstanding Principal</option>
              <option ${(d.base||'') === 'Overdue Amount'  ? 'selected' : ''}>Overdue Amount</option>
              <option ${(d.base||'') === 'Loan Amount'     ? 'selected' : ''}>Loan Amount</option>
              <option ${(d.base||'') === 'Overdue Interest'? 'selected' : ''}>Overdue Interest</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Penalty Rate (%)</label>
          <input class="fee-form-input" type="number" id="pf-rate"
            placeholder="e.g. 12.5" min="0" max="100" step="0.01"
            value="${d.rate || ''}"/>
        </div>
      </div>
    </div>

    <!-- Validity & Status -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Validity &amp; Status</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Valid From</label>
          <input class="fee-form-input" type="date" id="pf-valid-from" value="${d.validFrom || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Valid To</label>
          <input class="fee-form-input" type="date" id="pf-valid-to" value="${d.validTo || '2046-12-31'}"/>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="pf-status">
              <option ${(d.status||'Active') === 'Active'   ? 'selected' : ''}>Active</option>
              <option ${(d.status||'')       === 'Pending'  ? 'selected' : ''}>Pending</option>
              <option ${(d.status||'')       === 'Inactive' ? 'selected' : ''}>Inactive</option>
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
          <input class="fee-form-input" type="text" readonly value="${d.createdAt || '-'}" style="background:#f4f8fc;color:var(--text-muted);cursor:default;"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Created By</label>
          <input class="fee-form-input" type="text" readonly value="${d.createdBy || '-'}" style="background:#f4f8fc;color:var(--text-muted);cursor:default;"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Updated At</label>
          <input class="fee-form-input" type="text" readonly value="${d.updatedAt || '-'}" style="background:#f4f8fc;color:var(--text-muted);cursor:default;"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Updated By</label>
          <input class="fee-form-input" type="text" readonly value="${d.updatedBy || '-'}" style="background:#f4f8fc;color:var(--text-muted);cursor:default;"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Deleted At</label>
          <input class="fee-form-input" type="text" readonly value="${d.deletedAt || '-'}" style="background:#f4f8fc;color:var(--text-muted);cursor:default;"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Deleted By</label>
          <input class="fee-form-input" type="text" readonly value="${d.deletedBy || '-'}" style="background:#f4f8fc;color:var(--text-muted);cursor:default;"/>
        </div>
      </div>
    </div>`;

  // update sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="penalty"]');
  if (navItem) navItem.classList.add('active');
}
function openLoanProductForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => (val||'') === option ? 'selected' : '';
  window._lpCustTypes = [];
  window._lpCurrencies = [];
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
            <select class="fee-form-select" id="lp-accounting">
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
        <div class="lp-sub-empty">No fees added yet. Click "+ Add Fee" to create the first one.</div>
      </div>
    </div>

    <!-- Interest Calculation & Repayment Schedule -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Interest Calculation method &amp; Repayment Schedule</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Calculation Method</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-int-method">
            <option>Actual/365</option><option>Actual/360</option>
            <option>Actual Actual</option><option>30/360</option>
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
          <label class="fee-form-label">Repayment Schedule Pattern</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-rep-pattern">
            <option>Equal Instalment</option><option>Equal Principal</option>
            <option>Balloon</option><option>Interest Only</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Repayment Rounding Mode</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-rep-round">
            <option>Round to Nearest</option><option>Round Up</option><option>Round Down</option>
          </select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Repayment Schedule Method</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-rep-method">
            <option>Fixed Day of Month</option><option>Anniversary</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Interest Timing</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-int-timing">
            <option>End of Period</option><option>Start of Period</option>
          </select></div>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Non-Working Day Adjustment</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-nonwork">
            <option>No Adjustment</option><option>Next Working Day</option><option>Previous Working Day</option>
          </select></div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Backdated Disbursement Possible</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-backdate">
            <option>No</option><option>Yes</option>
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
        <div class="fee-form-field">
          <label class="fee-form-label">Initial Loan Account State</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-init-state">
            <option value="">Select an item</option>
            <option>Pending Approval</option><option>Approved</option><option>Active</option>
          </select></div>
        </div>
      </div>
    </div>

    <!-- Grace Period -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Grace Period</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Grace period possible</label>
          <div class="fee-select-wrap" style="max-width:100%;">
            <select class="fee-form-select" id="lp-grace">
              <option>No</option><option>Yes</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Flags -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Flags</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Adjust Last Instalment</label>
          <div class="fee-select-wrap"><select class="fee-form-select" id="lp-adj-last">
            <option>No</option><option>Yes</option></select></div>
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
            <option>No</option><option>Yes</option></select></div>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Loan to Value limit (%)</label>
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
          <input class="fee-form-input" type="date" id="lp-valid-from"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Valid To</label>
          <input class="fee-form-input" type="date" id="lp-valid-to" value="2099-12-31"/>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap" style="max-width:100%;">
            <select class="fee-form-select" id="lp-status">
              <option>Pending</option><option>Active</option><option>Inactive</option>
            </select>
          </div>
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
    body.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px">' +
      '<thead><tr style="background:#f6f9fc;border-bottom:1px solid #dce8f0">' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Currency</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Interest Rate</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Type</th>' +
        '<th style="padding:7px 10px;text-align:right;color:#6a8faf;font-weight:600">Min</th>' +
        '<th style="padding:7px 10px;text-align:right;color:#6a8faf;font-weight:600">Max</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Valid From</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Valid To</th>' +
        '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Status</th>' +
        '<th style="padding:7px 10px"></th>' +
      '</tr></thead><tbody>' +
      window._lpCurrencies.map(function(c, i) {
        var isObj   = (typeof c === 'object');
        var curr    = isObj ? c.currency    : c;
        var rate    = isObj ? (c.rateName   || '') : '';
        var type    = isObj ? (c.rateType   || '') : '';
        var min     = isObj ? (c.minAmt     || '') : '';
        var max     = isObj ? (c.maxAmt     || '') : '';
        var vFrom   = isObj ? (c.validFrom  || '') : '';
        var vTo     = isObj ? (c.validTo    || '') : '';
        var status  = isObj ? (c.status     || 'Active') : 'Active';
        var statusCls = (status === 'Active' || status === 'ACTIVE') ? 'fee-status-active' : 'fee-status-inactive';
        return '<tr style="border-bottom:1px solid #f0f4f8">' +
          '<td style="padding:7px 10px;font-weight:600;color:#1a2e42">' + curr + '</td>' +
          '<td style="padding:7px 10px;color:#3a5570;font-size:11.5px">' + rate + '</td>' +
          '<td style="padding:7px 10px"><span class="badge orange" style="font-size:11px">' + type + '</span></td>' +
          '<td style="padding:7px 10px;text-align:right;color:#3a5570">' + min + '</td>' +
          '<td style="padding:7px 10px;text-align:right;color:#3a5570">' + max + '</td>' +
          '<td style="padding:7px 10px;font-size:11.5px;color:#6a8faf">' + vFrom + '</td>' +
          '<td style="padding:7px 10px;font-size:11.5px;color:#6a8faf">' + vTo + '</td>' +
          '<td style="padding:7px 10px"><span class="' + statusCls + '">' + status + '</span></td>' +
          '<td style="padding:7px 10px;text-align:center">' +
            '<button onclick="window._lpCurrencies.splice(' + i + ',1);lpRefreshCurrencies()" title="Remove" ' +
              'style="background:#fde8e8;color:#c0392b;border:1px solid #f5b7b1;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px">\xd7</button>' +
          '</td></tr>';
      }).join('') +
      '</tbody></table>';
  }
}
function lpRefreshFees() {
  var body = document.getElementById('lp-fees-body');
  if (!body) return;
  if (!window._lpFees || !window._lpFees.length) {
    body.innerHTML = '<div class="lp-sub-empty">No fees added yet. Click "+ Add Fee" to select from the fee definitions list.</div>';
  } else {
    var statusCls = function(s) { return (s === 'Active') ? 'fee-status-active' : 'fee-status-inactive'; };
    var methodBadge = function(m) {
      return m === 'Fixed'
        ? '<span style="background:#e8f5e9;color:#2e7d32;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">Fixed</span>'
        : '<span style="background:#e3f2fd;color:#1565c0;padding:2px 8px;border-radius:10px;font-size:11px;font-weight:600">Percentage</span>';
    };
    body.innerHTML = '<table style="width:100%;border-collapse:collapse;font-size:12.5px;margin-top:6px">'
      + '<thead><tr style="background:#f6f9fc;border-bottom:1px solid #dce8f0">'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Name</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Version</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Scope</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Trigger</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Method</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Currency</th>'
      + '<th style="padding:7px 10px;text-align:left;color:#6a8faf;font-weight:600">Status</th>'
      + '<th style="padding:7px 10px"></th>'
      + '</tr></thead><tbody>'
      + window._lpFees.map(function(f, i) {
          var isObj = typeof f === 'object';
          var name    = isObj ? (f.feeName || '') : f;
          var version = isObj ? (f.version || '') : '';
          var scope   = isObj ? (f.scope   || '') : '';
          var trigger = isObj ? (f.trigger || '') : '';
          var method   = isObj ? (f.method   || '') : '';
          var currency = isObj ? (f.currency || '') : '';
          var status   = isObj ? (f.status   || 'Active') : 'Active';
          return '<tr style="border-bottom:1px solid #f0f4f8">'
            + '<td style="padding:7px 10px;font-weight:500;color:#1a2e42">' + name + '</td>'
            + '<td style="padding:7px 10px;color:#6a8faf">' + version + '</td>'
            + '<td style="padding:7px 10px;color:#3a5570">' + scope + '</td>'
            + '<td style="padding:7px 10px;color:#3a5570">' + trigger + '</td>'
            + '<td style="padding:7px 10px">' + methodBadge(method) + '</td>'
            + '<td style="padding:7px 10px;font-weight:600;color:#1a2640">' + (currency || '—') + '</td>'
            + '<td style="padding:7px 10px"><span class="' + statusCls(status) + '">' + status + '</span></td>'
            + '<td style="padding:7px 10px;text-align:center">'
            +   '<button onclick="window._lpFees.splice(' + i + ',1);lpRefreshFees()" title="Remove" '
            +   'style="background:#fde8e8;color:#c0392b;border:1px solid #f5b7b1;border-radius:5px;padding:3px 8px;cursor:pointer;font-size:12px">&times;</button>'
            + '</td></tr>';
        }).join('')
      + '</tbody></table>';
  }
}
window.lpRefreshCustTypes = lpRefreshCustTypes;
window.lpRefreshCurrencies = lpRefreshCurrencies;
window.lpRefreshFees = lpRefreshFees;

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
// Penalty section was originally in core bsc but belongs to loans module
function buildPenaltySection(mod) {
  const penaltyRows = [
    { id: 5, name: 'Default Penalty for Missed Instalment', method: 'Actual/365', freq: 'Daily',   base: 'Overdue Amount',  rate: '18.00%', status: 'active',   created: '2025-11-01' },
    { id: 4, name: 'Early Repayment Penalty',               method: 'Flat',       freq: 'One-Off', base: 'Outstanding',    rate: '2.00%',  status: 'active',   created: '2025-10-15' },
    { id: 3, name: 'Late Payment Fee',                      method: 'Fixed',      freq: 'Monthly', base: 'Fixed',          rate: '€25.00', status: 'active',   created: '2025-09-20' },
    { id: 2, name: 'Restructuring Fee',                     method: 'Flat',       freq: 'One-Off', base: 'Principal',      rate: '1.50%',  status: 'inactive', created: '2025-08-10' },
    { id: 1, name: 'Default Interest',                      method: 'Actual/360', freq: 'Daily',   base: 'Overdue Amount', rate: '22.00%', status: 'active',   created: '2025-07-01' },
  ];
  const rowsHtml = penaltyRows.map(r => `
    <tr>
      <td>#${r.id}</td>
      <td>${r.name}</td>
      <td>${r.method}</td>
      <td>${r.freq}</td>
      <td>${r.base}</td>
      <td>${r.rate}</td>
      <td><span class="stat-badge stat-${r.status}">${r.status.charAt(0).toUpperCase()+r.status.slice(1)}</span></td>
      <td>${r.created}</td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit" data-action="open-penalty-form" data-module="${mod}"
            data-id="${r.id}" data-name="${r.name}" data-method="${r.method}"
            data-freq="${r.freq}" data-base="${r.base}" data-rate="${r.rate}">${_I_PENCIL_12} Edit</button>
          <button class="fee-btn-delete">${_I_BIN_12} Delete</button>
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-wrap">
      <div class="fee-page-header">
        <div class="fee-page-header-left">
          <div class="fee-page-title">Penalty Definitions</div>
          <div class="fee-page-sub">Define late payment and penalty structures</div>
        </div>
        <button class="btn-fee-new" data-action="open-penalty-form" data-module="${mod}">
          ${_I_PLUS_14} + Add Penalty Definition
        </button>
      </div>
      <div class="fee-table-wrap">
        ${renderTable(['ID','Name','Method','Frequency','Base','Rate','Status','Created At','Actions'], rowsHtml, penaltyRows.length)}
      </div>
    </div>`;
}
