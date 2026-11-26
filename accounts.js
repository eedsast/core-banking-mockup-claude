/* ═══════════════════════════════════════════════════════
   accounts.js — Accounts & Deposits module
   Loaded lazily by loadAccountsModule() in index.html
   (makeLoader('accounts', null, 'accounts.js')).
   Serves the 'accounts' and 'deposits' modules.
   Depends on core helpers in index.html: renderTable,
   _I_* icon constants, window._moduleMap.

   Sections rendered here:
     acc-dashboard        Accounts & Deposits dashboard
     accprod / depprod    Product catalog (merged model)
     acc-job-catalogue    Background job catalogue
     acc-job-scheduler    Job scheduler
     acc-job-manual       Job manual run
     acc-recent-runs      Recent runs
   All other Accounts menu items are still stubs and are
   rendered by the generic section content in index.html.
═══════════════════════════════════════════════════════ */

'use strict';

/* ── PUBLIC ENTRY POINT ────────────────────────────────── */
function renderAccountsContent(containerId, mod, section, title, subtitle) {

  // ── ACCOUNTS & DEPOSITS DASHBOARD ─────────────────────────────────────────
  if (section === 'acc-dashboard') {
    const el = document.getElementById(containerId);
    if (el) el.innerHTML = _buildAccDepDashboard();
    return;
  }

  // ── ACCOUNT/DEPOSIT PRODUCT DEFINITION (list) — see accProdRenderList ─────
  if (section === 'accprod' || section === 'depprod') {
    accProdRenderList(containerId, mod, section);
    return;
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
}
window.renderAccountsContent = renderAccountsContent;


// ══════════════════════════════════════════════════════════════════════════════
// ACCOUNT / DEPOSIT PRODUCT DEFINITION — merged Accounts & Deposits model
// One catalog (products) with account_type as discriminator:
//   COMMON group  — every account type
//   ACC group     — current · savings
//   DEP group     — term_deposit
// Currency-specific rates, limits and fees live on product_currencies,
// with an optional rate chart (product_currency_interest_tiers) and
// fee mapping (product_currency_fees → Shared fee_definitions).
// ══════════════════════════════════════════════════════════════════════════════

const AP_ENUM = {
  account_type:        [['current','Current account'],['savings','Savings account'],['term_deposit','Term deposit']],
  lifecycle_status:    [['pending','Pending'],['active','Active'],['inactive','Inactive']],
  initial_account_state:[['pending','Pending'],['active','Active']],
  day_count_convention:[['act_365','Actual/365'],['act_360','Actual/360'],['act_act','Actual/Actual'],['thirty_360','30/360']],
  frequency:           [['daily','Daily'],['weekly','Weekly'],['monthly','Monthly'],['quarterly','Quarterly'],['half_yearly','Half-yearly'],['annually','Annually'],['at_maturity','At maturity']],
  interest_timing:     [['end_of_period','End of period'],['beginning_of_period','Beginning of period']],
  accounting_method:   [['accrual','Accrual'],['cash','Cash']],
  rounding_mode:       [['half_up','Half up'],['half_down','Half down'],['half_even','Half even (banker’s)'],['up','Up'],['down','Down']],
  non_working_day_adjustment:[['no_adjustment','No adjustment'],['next_working_day','Next working day'],['previous_working_day','Previous working day']],
  statement_frequency: [['none','None'],['daily','Daily'],['weekly','Weekly'],['monthly','Monthly'],['quarterly','Quarterly'],['half_yearly','Half-yearly'],['annually','Annually'],['on_demand','On demand']],
  renewal_type:        [['none','None'],['principal_only','Principal only'],['principal_and_interest','Principal and interest'],['manual','Manual instruction']],
  interest_rate_type:  [['fixed','Fixed'],['variable','Variable']],
  tier_treatment:      [['whole_balance','Whole balance'],['banded','Banded']],
  customer_type:       [['individual','Individual'],['sme','SME'],['corporate','Corporate']],
};
const AP_LBL = (en, v) => { const r = (AP_ENUM[en] || []).find(x => x[0] === v); return r ? r[1] : (v || '—'); };

// ── Reference data read from other services (mock) ──────────────────────────
const AP_REF = {
  categories: [
    { id:1, name:'Retail current accounts' }, { id:2, name:'Business current accounts' },
    { id:3, name:'Savings accounts' },        { id:4, name:'Term deposits' },
  ],
  currencies: ['EUR','USD','GBP','CHF'],                                   // Shared · currency_definitions
  rates: [                                                                 // Shared · interest_rate_definitions
    { id:1, name:'EURIBOR 3M' }, { id:2, name:'EURIBOR 6M' }, { id:3, name:'EURIBOR 12M' },
    { id:4, name:'ECB deposit facility rate' }, { id:5, name:'SOFR' }, { id:6, name:'SONIA' },
    { id:7, name:'Board rate — savings' },
  ],
  taxes: [                                                                 // this service · tax_definitions
    { id:1, code:'WHT-INT-12', name:'Interest withholding tax 12%', event:'on_capitalisation', rate:12 },
    { id:2, code:'WHT-INT-25', name:'Interest withholding tax 25% (non-resident)', event:'on_payout', rate:25 },
  ],
  penalties: [                                                             // this service · deposit_penalty_definitions
    { id:1, name:'Break cost — 50% of accrued interest', base:'accrued_interest', rate:50 },
    { id:2, name:'Break cost — 1% of withdrawn amount',  base:'withdrawn_amount', rate:1 },
    { id:3, name:'Clawback of all paid interest',        base:'paid_interest',    rate:100 },
  ],
  fees: [                                                                  // Shared · fee_definitions
    { id:1,  code:'ACC-MAINT-EUR',  name:'Monthly account maintenance', ccy:'EUR', scope:'account', trigger:'periodic',    method:'fixed',      value:'3.00' },
    { id:2,  code:'ACC-MAINT-USD',  name:'Monthly account maintenance', ccy:'USD', scope:'account', trigger:'periodic',    method:'fixed',      value:'4.00' },
    { id:3,  code:'ACC-MAINT-GBP',  name:'Monthly account maintenance', ccy:'GBP', scope:'account', trigger:'periodic',    method:'fixed',      value:'3.00' },
    { id:4,  code:'ACC-STMT-EUR',   name:'Paper statement',             ccy:'EUR', scope:'account', trigger:'event_based', method:'fixed',      value:'2.00' },
    { id:5,  code:'ACC-ODARR-EUR',  name:'Overdraft arrangement',       ccy:'EUR', scope:'account', trigger:'up_front',    method:'percentage', value:'0.50%' },
    { id:6,  code:'ACC-CLOSE-EUR',  name:'Account closure',             ccy:'EUR', scope:'account', trigger:'event_based', method:'fixed',      value:'5.00' },
    { id:7,  code:'SAV-XWDR-EUR',   name:'Withdrawal above 3 per month',ccy:'EUR', scope:'account', trigger:'event_based', method:'fixed',      value:'1.50' },
    { id:8,  code:'DEP-CERT-EUR',   name:'Deposit certificate',         ccy:'EUR', scope:'deposit', trigger:'event_based', method:'fixed',      value:'10.00' },
    { id:9,  code:'DEP-BREAK-EUR',  name:'Early termination handling',  ccy:'EUR', scope:'deposit', trigger:'event_based', method:'fixed',      value:'15.00' },
    { id:10, code:'DEP-BREAK-USD',  name:'Early termination handling',  ccy:'USD', scope:'deposit', trigger:'event_based', method:'fixed',      value:'15.00' },
  ],
};

// ── Product catalog (mock, session-persistent) ──────────────────────────────
function apSeedProducts() {
  const ccy = (o) => Object.assign({
    creditType:'fixed', creditRate:'', creditRefId:'', creditMargin:'', hasChart:false, tierTreatment:'whole_balance', tiers:[],
    debitType:'fixed', debitRate:'', debitRefId:'', debitMargin:'',
    minOpening:'', minBalance:'', maxBalance:'', defDeposit:'', maxOverdraft:'', minTerm:'', maxTerm:'', defTerm:'',
    validFrom:'2026-01-01', validTo:'', status:'active', fees:[]
  }, o);
  const base = (o) => Object.assign({
    categoryId:1, initialState:'pending', jointAllowed:true, validFrom:'2026-01-01', validTo:'', status:'active', description:'',
    customerTypes:['individual'],
    interestBearing:true, calcMethod:'act_365', calcFreq:'daily', accrualPostFreq:'daily', capFreq:'monthly', interestTiming:'end_of_period',
    accountingMethod:'accrual', rounding:'half_up', nwdAdj:'no_adjustment', whtApplicable:false, taxDefId:'', dgsEligible:true,
    acc:{ useMinPeriodBalance:false, overdraftAllowed:false, debitInterest:false, ibanRequired:true, statementFreq:'monthly', dormancyDays:'730', closureNoticeDays:'30' },
    dep:{ minTerm:'', maxTerm:'', defTerm:'', renewalAllowed:false, renewalType:'none', partialWithdrawal:false, earlyWithdrawal:false, penaltyId:'' },
    audit:{ createdAt:'15.01.2026 09:12', createdBy:'m.horvat', updatedAt:'02.11.2026 14:40', updatedBy:'s.stanic' },
  }, o);
  const dep = (o) => Object.assign({ minTerm:'', maxTerm:'', defTerm:'', renewalAllowed:false, renewalType:'none', partialWithdrawal:false, earlyWithdrawal:false, penaltyId:'' }, o);
  const acc = (o) => Object.assign({ useMinPeriodBalance:false, overdraftAllowed:false, debitInterest:false, ibanRequired:true, statementFreq:'monthly', dormancyDays:'730', closureNoticeDays:'30' }, o);
  const tdTiers = (r) => {   // amount band × tenor band → rate
    const amt = [[0,25000],[25000,100000],[100000,null]];
    const ten = [[30,90],[91,180],[181,365],[366,730]];
    const out = []; let k = 1;
    ten.forEach((t, ti) => amt.forEach((a, ai) => out.push({ order:k++, from:String(a[0]), to:a[1]==null?'':String(a[1]), fromTerm:String(t[0]), toTerm:String(t[1]), rate:(r + ti*0.35 + ai*0.10).toFixed(2), margin:'' })));
    return out;
  };
  return [
    base({ id:1, code:'CA-STD-001', name:'Standard Current Account', accountType:'current', categoryId:1, interestBearing:false, capFreq:'',
      acc:acc({ overdraftAllowed:true, debitInterest:true }),
      currencies:[ ccy({ currency:'EUR', debitRate:'9.50', minOpening:'0.00', minBalance:'0.00', maxOverdraft:'5000.00', fees:[1,4,5,6] }) ] }),
    base({ id:2, code:'CA-PREM-001', name:'Premium Current Account', accountType:'current', categoryId:1,
      acc:acc({ overdraftAllowed:true, debitInterest:true, statementFreq:'on_demand' }),
      currencies:[ ccy({ currency:'EUR', creditRate:'0.10', debitRate:'7.90', minOpening:'500.00', minBalance:'0.00', maxOverdraft:'15000.00', fees:[1,5] }),
                   ccy({ currency:'USD', creditRate:'0.05', minOpening:'500.00', minBalance:'0.00', fees:[2] }) ] }),
    base({ id:3, code:'CA-BIZ-001', name:'Business Current Account', accountType:'current', categoryId:2, status:'pending', customerTypes:['sme','corporate'],
      interestBearing:false, capFreq:'', dgsEligible:true,
      acc:acc({ overdraftAllowed:true, debitInterest:true, closureNoticeDays:'60' }),
      currencies:[ ccy({ currency:'EUR', debitType:'variable', debitRefId:'1', debitMargin:'4.50', minOpening:'0.00', maxOverdraft:'50000.00', fees:[1,5,6] }),
                   ccy({ currency:'USD', debitRate:'10.50', minOpening:'0.00', maxOverdraft:'20000.00', fees:[2], status:'pending' }),
                   ccy({ currency:'GBP', debitRate:'10.00', minOpening:'0.00', maxOverdraft:'15000.00', fees:[3], status:'pending' }) ] }),
    base({ id:4, code:'SA-STD-001', name:'Standard Savings Account', accountType:'savings', categoryId:3, whtApplicable:true, taxDefId:'1',
      acc:acc({ useMinPeriodBalance:true, statementFreq:'quarterly' }), capFreq:'quarterly',
      currencies:[ ccy({ currency:'EUR', hasChart:true, tierTreatment:'whole_balance', minOpening:'50.00', minBalance:'10.00', maxBalance:'500000.00', fees:[7],
        tiers:[ {order:1,from:'0',to:'10000',fromTerm:'',toTerm:'',rate:'1.00',margin:''},
                {order:2,from:'10000',to:'50000',fromTerm:'',toTerm:'',rate:'1.50',margin:''},
                {order:3,from:'50000',to:'',fromTerm:'',toTerm:'',rate:'2.00',margin:''} ] }) ] }),
    base({ id:5, code:'SA-YOUTH-001', name:'Youth Savings Account', accountType:'savings', categoryId:3, jointAllowed:false, whtApplicable:true, taxDefId:'1', capFreq:'monthly',
      acc:acc({ statementFreq:'monthly', dormancyDays:'1095' }),
      currencies:[ ccy({ currency:'EUR', creditRate:'2.50', minOpening:'10.00', minBalance:'0.00', maxBalance:'20000.00' }) ] }),
    base({ id:6, code:'SA-FLEX-EUR', name:'Flexible Savings — EURIBOR linked', accountType:'savings', categoryId:3, whtApplicable:true, taxDefId:'1', capFreq:'monthly',
      acc:acc({ statementFreq:'monthly' }),
      currencies:[ ccy({ currency:'EUR', creditType:'variable', creditRefId:'1', creditMargin:'-0.75', hasChart:true, tierTreatment:'banded', minOpening:'1000.00', fees:[7],
        tiers:[ {order:1,from:'0',to:'25000',fromTerm:'',toTerm:'',rate:'',margin:'-0.75'},
                {order:2,from:'25000',to:'',fromTerm:'',toTerm:'',rate:'',margin:'-0.40'} ] }) ] }),
    base({ id:7, code:'TD-STD-001', name:'Standard Term Deposit', accountType:'term_deposit', categoryId:4, whtApplicable:true, taxDefId:'1', capFreq:'at_maturity', accrualPostFreq:'monthly',
      dep:dep({ minTerm:'30', maxTerm:'730', defTerm:'365', renewalAllowed:true, renewalType:'principal_and_interest', earlyWithdrawal:true, penaltyId:'1' }),
      currencies:[ ccy({ currency:'EUR', hasChart:true, tierTreatment:'whole_balance', minOpening:'1000.00', defDeposit:'10000.00', fees:[8,9], tiers:tdTiers(1.20) }),
                   ccy({ currency:'USD', creditRate:'3.10', minOpening:'2000.00', defDeposit:'10000.00', minTerm:'90', maxTerm:'365', defTerm:'180', fees:[10] }) ] }),
    base({ id:8, code:'TD-PREM-24M', name:'Premium 24-month Deposit', accountType:'term_deposit', categoryId:4, status:'pending', whtApplicable:true, taxDefId:'1', capFreq:'annually', accrualPostFreq:'monthly',
      dep:dep({ minTerm:'730', maxTerm:'730', defTerm:'730', renewalAllowed:true, renewalType:'principal_only', partialWithdrawal:false, earlyWithdrawal:true, penaltyId:'3' }),
      currencies:[ ccy({ currency:'EUR', creditRate:'2.60', minOpening:'25000.00', defDeposit:'50000.00', status:'pending', fees:[8] }) ] }),
  ];
}
function apProducts() { if (!window._apProducts) window._apProducts = apSeedProducts(); return window._apProducts; }

// ── Small helpers ───────────────────────────────────────────────────────────
const apEsc  = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const apAmt  = v => (v === '' || v == null) ? '—' : Number(v).toLocaleString('en-GB', { minimumFractionDigits:2, maximumFractionDigits:2 });
const apPct  = v => (v === '' || v == null) ? '—' : Number(v).toFixed(2) + '%';
const apDate = v => { if (!v) return '—'; const p = String(v).split('-'); return p.length === 3 ? p[2] + '.' + p[1] + '.' + p[0] : v; };
const apOpts = (en, cur, blank) => (blank ? `<option value="">${blank}</option>` : '') + (AP_ENUM[en] || []).map(([v,l]) => `<option value="${v}" ${String(cur)===v?'selected':''}>${l}</option>`).join('');
const apRateName = id => { const r = AP_REF.rates.find(x => String(x.id) === String(id)); return r ? r.name : '—'; };
const apIsTD = p => p.accountType === 'term_deposit';

function apInjectCss() {
  if (document.getElementById('ap-css')) return;
  const st = document.createElement('style'); st.id = 'ap-css';
  st.textContent = `
  .ap-filter { display:flex; gap:6px; flex-wrap:wrap; margin:0 0 14px; }
  .ap-filter button { border:1px solid var(--border); background:#fff; color:var(--text-main); border-radius:20px; padding:6px 14px; font-size:12.5px; font-weight:500; cursor:pointer; font-family:inherit; }
  .ap-filter button.on { background:#6c3fc5; border-color:#6c3fc5; color:#fff; }
  .ap-filter .ap-n { opacity:.7; margin-left:4px; font-variant-numeric:tabular-nums; }
  .ap-type { display:inline-block; font-size:11px; font-weight:600; padding:2px 9px; border-radius:20px; white-space:nowrap; }
  .ap-type.current { background:#e6f1fb; color:#0c447c; }
  .ap-type.savings { background:#e1f5ee; color:#085041; }
  .ap-type.term_deposit { background:#eeedfe; color:#3f3a7a; }
  .ap-st { display:inline-block; font-size:10.5px; font-weight:700; letter-spacing:.04em; text-transform:uppercase; padding:2px 9px; border-radius:20px; border:1px solid; }
  .ap-st.active { color:#15803d; border-color:#86efac; background:#f0fdf4; }
  .ap-st.pending { color:#c2410c; border-color:#fed7aa; background:#fff7ed; }
  .ap-st.inactive { color:#64748b; border-color:#cbd5e1; background:#f8fafc; }
  .ap-ccy { display:inline-block; font-family:ui-monospace,Menlo,monospace; font-size:11px; font-weight:600; padding:1px 6px; border-radius:4px; background:#f0f4fa; color:#3a5272; margin:0 3px 2px 0; }
  .ap-mono { font-family:ui-monospace,Menlo,monospace; font-size:12px; }
  .ap-muted { color:var(--text-muted); }
  .ap-grp { display:inline-block; font-size:9.5px; font-weight:700; letter-spacing:.06em; padding:1px 6px; border-radius:4px; margin-right:8px; vertical-align:1px; }
  .ap-grp.c { background:#e8e6df; color:#3a3a38; } .ap-grp.a { background:#e6f1fb; color:#0c447c; } .ap-grp.d { background:#faeeda; color:#854f0b; }
  .ap-sec-title { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:18px; }
  .ap-sec-title .fee-form-section-title { margin-bottom:0; }
  .ap-sec-note { font-size:11.5px; color:var(--text-muted); }
  .ap-types { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:20px; }
  .ap-types label { border:1.5px solid var(--border); border-radius:10px; padding:12px 14px; cursor:pointer; display:flex; gap:10px; align-items:flex-start; background:#fff; }
  .ap-types label.on { border-color:#6c3fc5; background:#f7f3ff; }
  .ap-types input { margin-top:3px; accent-color:#6c3fc5; }
  .ap-types b { display:block; font-size:13px; color:var(--text-main); margin-bottom:2px; }
  .ap-types span { font-size:11.5px; color:var(--text-muted); line-height:1.45; }
  .ap-checks { display:flex; flex-wrap:wrap; gap:8px 18px; padding:10px 12px; background:#f8fafc; border:1px solid var(--border); border-radius:8px; }
  .ap-checks label { display:flex; align-items:center; gap:7px; font-size:13px; color:var(--text-main); cursor:pointer; }
  .ap-checks input { width:15px; height:15px; accent-color:#6c3fc5; }
  .ap-na { border:1px dashed var(--border); border-radius:12px; padding:14px 18px; margin-bottom:14px; font-size:12.5px; color:var(--text-muted); background:#fafbfc; }
  .ap-na b { color:var(--text-main); font-weight:600; }
  .ap-tbl { width:100%; border-collapse:collapse; font-size:12.5px; }
  .ap-tbl th { padding:8px 10px; text-align:left; font-weight:600; color:#6a8faf; background:#f6f9fc; border-bottom:1px solid #dce8f0; font-size:11.5px; white-space:nowrap; }
  .ap-tbl td { padding:9px 10px; border-bottom:1px solid #f0f4f8; vertical-align:top; color:#2a3f55; }
  .ap-tbl td.r, .ap-tbl th.r { text-align:right; font-variant-numeric:tabular-nums; }
  .ap-tbl tr.ap-chart td { background:#fbfaff; padding:6px 10px 12px 34px; }
  .ap-chart-tbl { border-collapse:collapse; font-size:11.5px; min-width:420px; }
  .ap-chart-tbl th { font-weight:600; color:#6c5fae; text-align:right; padding:4px 10px; border-bottom:1px solid #e3e1f5; }
  .ap-chart-tbl th:first-child, .ap-chart-tbl td:first-child { text-align:left; }
  .ap-chart-tbl td { text-align:right; padding:3px 10px; font-variant-numeric:tabular-nums; color:#3f3a7a; }
  .ap-btn-s { border:1px solid #c5d8f5; background:#e8f0fe; color:#1a56db; border-radius:5px; padding:3px 9px; font-size:12px; cursor:pointer; font-family:inherit; white-space:nowrap; }
  .ap-btn-s.del { border-color:#f5b7b1; background:#fde8e8; color:#c0392b; }
  .ap-btn-s.del.arm { background:#c0392b; color:#fff; }
  .ap-editor { border-top:1px solid var(--border); background:#f8fafc; padding:18px 18px 16px; }
  .ap-editor h4 { font-size:13px; font-weight:600; color:var(--text-main); margin:0 0 14px; }
  .ap-editor h5 { font-size:11px; font-weight:700; letter-spacing:.05em; text-transform:uppercase; color:#6a8faf; margin:18px 0 10px; }
  .ap-g4 { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:12px 14px; }
  .ap-g3 { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px 14px; }
  .ap-g4 .fee-form-input, .ap-g4 .fee-form-select, .ap-g3 .fee-form-input, .ap-g3 .fee-form-select, .ap-tiers .fee-form-input { padding:8px 10px; font-size:12.5px; }
  .ap-tiers { width:100%; border-collapse:collapse; font-size:12px; margin-top:4px; }
  .ap-tiers th { text-align:left; font-weight:600; color:#6a8faf; padding:4px 6px; font-size:11px; }
  .ap-tiers td { padding:3px 6px; }
  .ap-err { color:#c0392b; font-size:12px; margin-top:10px; }
  .ap-hint { font-size:11px; color:var(--text-muted); margin-top:4px; line-height:1.45; }
  .ap-editor-foot { display:flex; justify-content:flex-end; gap:8px; margin-top:16px; }
  .ap-btn-ghost { padding:7px 16px; background:#fff; color:#3a5272; border:1px solid #c5d8f5; border-radius:7px; font-size:12.5px; cursor:pointer; font-family:inherit; }
  .ap-btn-pri { padding:7px 16px; background:#6c3fc5; color:#fff; border:none; border-radius:7px; font-size:12.5px; font-weight:600; cursor:pointer; font-family:inherit; }
  .ap-fee-add { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
  .ap-fee-add .fee-form-select { padding:7px 30px 7px 10px; font-size:12px; }
  .ap-disabled { opacity:.45; pointer-events:none; }
  @media (max-width: 1100px) { .ap-g4 { grid-template-columns:repeat(2,minmax(0,1fr)); } .ap-types { grid-template-columns:1fr; } }
  `;
  document.head.appendChild(st);
}

// ══════════════════════════════════════════════════════════════════════════════
// LIST
// ══════════════════════════════════════════════════════════════════════════════
function accProdRenderList(containerId, mod, section) {
  apInjectCss();
  const el = document.getElementById(containerId);
  if (!el) return;
  if (window._apFilter == null || window._apFilterSec !== section) {
    window._apFilter = section === 'depprod' ? 'term_deposit' : 'all';
    window._apFilterSec = section;
  }
  const all = apProducts();
  const f = window._apFilter;
  const rows = all.filter(p => f === 'all' || p.accountType === f);
  const count = t => all.filter(p => t === 'all' || p.accountType === t).length;

  const interestCell = p => {
    if (!p.interestBearing) return '<span class="ap-muted">Not interest bearing</span>';
    const c = p.currencies[0]; if (!c) return '—';
    if (c.hasChart) return `Rate chart · ${AP_LBL('tier_treatment', c.tierTreatment).toLowerCase()} <span class="ap-muted">(${c.tiers.length} bands)</span>`;
    if (c.creditType === 'variable') return `${apRateName(c.creditRefId)} ${Number(c.creditMargin) >= 0 ? '+' : '−'} ${Math.abs(Number(c.creditMargin||0)).toFixed(2)}%`;
    return 'Fixed ' + apPct(c.creditRate);
  };
  const rowsHtml = rows.map(p => `
    <tr>
      <td>${p.id}</td>
      <td class="ap-mono">${apEsc(p.code)}</td>
      <td>${apEsc(p.name)}</td>
      <td><span class="ap-type ${p.accountType}">${AP_LBL('account_type', p.accountType)}</span></td>
      <td>${p.currencies.map(c => `<span class="ap-ccy">${c.currency}</span>`).join('')}</td>
      <td style="font-size:12.5px;white-space:normal;min-width:150px">${interestCell(p)}</td>
      <td><span class="ap-st ${p.status}">${p.status}</span></td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit" data-ap-edit="${p.id}">${_I_PENCIL_12} Edit</button>
          <button class="fee-btn-delete ap-del-btn" data-ap-del="${p.id}" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">${_I_BIN_12} Delete</button>
        </div>
      </td>
    </tr>`).join('');

  const tabs = [['all','All products'],['current','Current'],['savings','Savings'],['term_deposit','Term deposits']];
  el.innerHTML = `
    <div class="fee-page-header">
      <div>
        <div class="fee-page-title">Account &amp; Deposit Products</div>
        <div class="fee-page-sub">One product catalog for current, savings and term deposit products — the account type decides which parameters apply</div>
      </div>
      <button class="btn-create-fee" id="ap-new-btn">${_I_PLUS_14} Add Product</button>
    </div>
    <div class="ap-filter">
      ${tabs.map(([k,l]) => `<button data-ap-filter="${k}" class="${f===k?'on':''}">${l}<span class="ap-n">${count(k)}</span></button>`).join('')}
    </div>
    ${renderTable(['ID','Code','Name','Account type','Currencies','Credit interest','Status','Actions'], rowsHtml, rows.length, {wrapStyle:'margin-top:0;'})}`;

  el.querySelectorAll('[data-ap-filter]').forEach(b => b.addEventListener('click', () => {
    window._apFilter = b.dataset.apFilter; accProdRenderList(containerId, mod, section);
  }));
  el.querySelector('#ap-new-btn').addEventListener('click', () => openAccProductForm(mod, section, null));
  el.querySelectorAll('[data-ap-edit]').forEach(b => b.addEventListener('click', () => openAccProductForm(mod, section, { id: b.dataset.apEdit })));
  el.querySelectorAll('[data-ap-del]').forEach(b => b.addEventListener('click', () => {
    if (!b.classList.contains('arm')) { b.classList.add('arm'); b.style.background='#c0392b'; b.style.color='#fff'; b.innerHTML = 'Confirm delete'; return; }
    const id = Number(b.dataset.apDel);
    window._apProducts = apProducts().filter(p => p.id !== id);
    accProdRenderList(containerId, mod, section);
  }));
}

// ══════════════════════════════════════════════════════════════════════════════
// FORM
// ══════════════════════════════════════════════════════════════════════════════
function openAccProductForm(mod, backSection, data) {
  apInjectCss();
  const moduleMap = window._moduleMap;
  const m = moduleMap ? moduleMap[mod] : null;
  if (!m) return;
  const el = document.getElementById(m.contentId);
  backSection = backSection || 'accprod';

  const src = data && data.id ? apProducts().find(p => String(p.id) === String(data.id)) : null;
  const isEdit = !!src;
  // Work on a deep copy; committed to the catalog only on Save
  const P = src ? JSON.parse(JSON.stringify(src)) : JSON.parse(JSON.stringify(Object.assign(apSeedProducts()[0], {
    id:null, code:'', name:'', accountType: backSection === 'depprod' ? 'term_deposit' : 'current', categoryId: backSection === 'depprod' ? 4 : 1,
    status:'pending', validFrom:'', currencies:[], audit:{ createdAt:'', createdBy:'', updatedAt:'', updatedBy:'' },
    interestBearing:true, capFreq:'monthly',
    acc:{ useMinPeriodBalance:false, overdraftAllowed:false, debitInterest:false, ibanRequired:true, statementFreq:'monthly', dormancyDays:'730', closureNoticeDays:'30' },
  })));
  if (!isEdit && P.accountType === 'term_deposit') { P.capFreq = 'at_maturity'; P.dep.minTerm='30'; P.dep.maxTerm='365'; P.dep.defTerm='90'; }
  let editIdx = null;      // currency row being edited (null = none, -1 = new)

  const listTitle = 'Account Product Definitions';
  const ck = v => v ? 'checked' : '';

  function render() {
    const td = apIsTD(P);
    const typeCards = [
      ['current','Current account','Daily balance, overdraft, statements and dormancy rules'],
      ['savings','Savings account','Interest-bearing balance, optional rate chart by amount band'],
      ['term_deposit','Term deposit','Fixed tenor, rollover and early-withdrawal rules; chart by amount × tenor'],
    ].map(([v,t,s]) => `<label class="${P.accountType===v?'on':''}"><input type="radio" name="ap-type" value="${v}" ${P.accountType===v?'checked':''} ${isEdit?'disabled':''}/><div><b>${t}</b><span>${s}</span></div></label>`).join('');

    el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Accounts &amp; Deposits</span><span class="bc-sep">›</span>
      <span>${listTitle}</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Product' : 'Create Product'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" id="ap-back" title="Back">${_I_BACK_14}</button>
        <div>
          <div class="fee-form-heading">${isEdit ? apEsc(P.code) + ' — ' + apEsc(P.name) : 'New Account / Deposit Product'}</div>
          <div class="fee-form-subheading">products · product_customer_types · product_currencies · product_currency_interest_tiers · product_currency_fees</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:12px">
        <span class="ap-st ${P.status}">${P.status}</span>
        <button class="btn-fee-save" id="ap-save-btn">${_I_SAVE_14} Save</button>
      </div>
    </div>
    <div id="ap-form-err" class="ap-err" style="margin:-4px 0 12px"></div>

    <!-- ── IDENTITY & CATALOG ─────────────────────────────── -->
    <div class="fee-form-section">
      <div class="ap-sec-title"><div class="fee-form-section-title"><span class="ap-grp c">COMMON</span>Identity &amp; catalog</div>
        <span class="ap-sec-note">${isEdit ? 'Account type is fixed once a product exists' : 'Account type is the discriminator — it decides which parameter groups apply'}</span></div>
      <div class="ap-types">${typeCards}</div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Product code <span style="color:#e74c3c">*</span></label>
          <input class="fee-form-input ap-mono" id="ap-code" data-k="code" placeholder="e.g. SA-STD-001" value="${apEsc(P.code)}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Product name <span style="color:#e74c3c">*</span></label>
          <input class="fee-form-input" id="ap-name" data-k="name" placeholder="Enter product name" value="${apEsc(P.name)}"/></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Category</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-k="categoryId" data-num="1">
            ${AP_REF.categories.map(c => `<option value="${c.id}" ${String(P.categoryId)===String(c.id)?'selected':''}>${c.name}</option>`).join('')}
          </select></div></div>
        <div class="fee-form-field"><label class="fee-form-label">Status</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-k="status">${apOpts('lifecycle_status', P.status)}</select></div></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Valid from</label>
          <input class="fee-form-input" type="date" data-k="validFrom" value="${P.validFrom}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Valid to</label>
          <input class="fee-form-input" type="date" data-k="validTo" value="${P.validTo}"/>
          <div class="ap-hint">Leave empty for open-ended. Code + valid from must be unique per organisation.</div></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Initial account state</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-k="initialState">${apOpts('initial_account_state', P.initialState)}</select></div>
          <div class="ap-hint">State a new account opens in — Pending waits for activation (e.g. first funding or KYC completion).</div></div>
        <div class="fee-form-field"><label class="fee-form-label">Allowed customer types</label>
          <div class="ap-checks">${AP_ENUM.customer_type.map(([v,l]) => `<label><input type="checkbox" data-ct="${v}" ${P.customerTypes.includes(v)?'checked':''}/>${l}</label>`).join('')}
            <label style="margin-left:auto"><input type="checkbox" data-k="jointAllowed" data-bool="1" ${ck(P.jointAllowed)}/>Joint accounts allowed</label></div></div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field"><label class="fee-form-label">Description</label>
          <textarea class="fee-form-input" data-k="description" rows="2" style="resize:vertical" placeholder="Shown to staff in product selection">${apEsc(P.description)}</textarea></div>
      </div>
    </div>

    <!-- ── INTEREST, ACCOUNTING & TAX ─────────────────────── -->
    <div class="fee-form-section">
      <div class="ap-sec-title"><div class="fee-form-section-title"><span class="ap-grp c">COMMON</span>Interest, accounting &amp; tax</div>
        <span class="ap-sec-note">One accrual engine serves current, savings and deposits — rates themselves are set per currency below</span></div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Interest bearing</label>
          <div class="ap-checks"><label><input type="checkbox" data-k="interestBearing" data-bool="1" data-rerender="1" ${ck(P.interestBearing)}/>Product pays credit interest</label></div></div>
        <div class="fee-form-field"><label class="fee-form-label">Accounting method</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-k="accountingMethod">${apOpts('accounting_method', P.accountingMethod)}</select></div></div>
      </div>
      <div class="${P.interestBearing || (P.acc && P.acc.debitInterest && !td) ? '' : 'ap-disabled'}">
        <div class="fee-form-row">
          <div class="fee-form-field"><label class="fee-form-label">Day count convention</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="calcMethod">${apOpts('day_count_convention', P.calcMethod)}</select></div></div>
          <div class="fee-form-field"><label class="fee-form-label">Interest calculation frequency</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="calcFreq">${apOpts('frequency', P.calcFreq)}</select></div></div>
        </div>
        <div class="fee-form-row">
          <div class="fee-form-field"><label class="fee-form-label">Accrual posting frequency</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="accrualPostFreq">${apOpts('frequency', P.accrualPostFreq)}</select></div></div>
          <div class="fee-form-field"><label class="fee-form-label">Capitalisation frequency</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="capFreq" ${P.interestBearing?'':'disabled'}>${apOpts('frequency', P.interestBearing ? P.capFreq : '', P.interestBearing ? '' : 'n/a — not interest bearing')}</select></div>
            ${td ? '<div class="ap-hint">Term deposits usually capitalise or pay out at maturity; payout method is chosen per contract.</div>' : ''}</div>
        </div>
        <div class="fee-form-row">
          <div class="fee-form-field"><label class="fee-form-label">Interest timing</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="interestTiming">${apOpts('interest_timing', P.interestTiming)}</select></div></div>
          <div class="fee-form-field"><label class="fee-form-label">Rounding mode</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="rounding">${apOpts('rounding_mode', P.rounding)}</select></div></div>
        </div>
        <div class="fee-form-row">
          <div class="fee-form-field"><label class="fee-form-label">Non-working day adjustment</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-k="nwdAdj">${apOpts('non_working_day_adjustment', P.nwdAdj)}</select></div></div>
          <div class="fee-form-field"></div>
        </div>
      </div>
      <div class="fee-form-row" style="margin-top:18px">
        <div class="fee-form-field"><label class="fee-form-label">Withholding tax</label>
          <div class="ap-checks"><label><input type="checkbox" data-k="whtApplicable" data-bool="1" data-rerender="1" ${ck(P.whtApplicable)}/>Withholding tax applies to interest</label></div></div>
        <div class="fee-form-field"><label class="fee-form-label">Tax definition ${P.whtApplicable ? '<span style="color:#e74c3c">*</span>' : ''}</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-k="taxDefId" ${P.whtApplicable?'':'disabled'}>
            <option value="">${P.whtApplicable ? 'Select tax definition' : 'n/a'}</option>
            ${AP_REF.taxes.map(t => `<option value="${t.id}" ${String(P.taxDefId)===String(t.id)&&P.whtApplicable?'selected':''}>${t.code} — ${t.name} · ${t.event.replace(/_/g,' ')}</option>`).join('')}
          </select></div></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Deposit guarantee scheme</label>
          <div class="ap-checks"><label><input type="checkbox" data-k="dgsEligible" data-bool="1" ${ck(P.dgsEligible)}/>DGS eligible — included in deposit guarantee reporting</label></div></div>
        <div class="fee-form-field"></div>
      </div>
    </div>

    ${td ? `
    <div class="ap-na"><span class="ap-grp a">ACC</span><b>Account behaviour</b> — not used for term deposits (overdraft, statements, dormancy, minimum period balance apply to current and savings only).</div>
    ` : `
    <!-- ── ACCOUNT BEHAVIOUR (ACC) ─────────────────────────── -->
    <div class="fee-form-section">
      <div class="ap-sec-title"><div class="fee-form-section-title"><span class="ap-grp a">ACC</span>Account behaviour</div>
        <span class="ap-sec-note">Current and savings only</span></div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Balance used for interest</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-acc="useMinPeriodBalance" data-bool="1">
            <option value="0" ${P.acc.useMinPeriodBalance?'':'selected'}>Daily closing balance</option>
            <option value="1" ${P.acc.useMinPeriodBalance?'selected':''}>Minimum balance in period</option>
          </select></div></div>
        <div class="fee-form-field"><label class="fee-form-label">Statement frequency</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-acc="statementFreq">${apOpts('statement_frequency', P.acc.statementFreq)}</select></div></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Overdraft</label>
          <div class="ap-checks">
            <label><input type="checkbox" data-acc="overdraftAllowed" data-bool="1" data-rerender="1" ${ck(P.acc.overdraftAllowed)}/>Overdraft allowed</label>
            <label class="${P.acc.overdraftAllowed?'':'ap-disabled'}"><input type="checkbox" data-acc="debitInterest" data-bool="1" data-rerender="1" ${ck(P.acc.overdraftAllowed && P.acc.debitInterest)}/>Debit interest charged</label>
          </div>
          <div class="ap-hint">Overdraft limit and debit rate are set per currency.</div></div>
        <div class="fee-form-field"><label class="fee-form-label">IBAN</label>
          <div class="ap-checks"><label><input type="checkbox" data-acc="ibanRequired" data-bool="1" ${ck(P.acc.ibanRequired)}/>Generate IBAN at opening</label></div></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Dormancy period (days)</label>
          <input class="fee-form-input" type="number" min="0" data-acc="dormancyDays" value="${apEsc(P.acc.dormancyDays)}" placeholder="e.g. 730"/>
          <div class="ap-hint">No customer-initiated movement for this long → status dormant (daily job).</div></div>
        <div class="fee-form-field"><label class="fee-form-label">Closure notice (days)</label>
          <input class="fee-form-input" type="number" min="0" data-acc="closureNoticeDays" value="${apEsc(P.acc.closureNoticeDays)}" placeholder="e.g. 30"/></div>
      </div>
    </div>`}

    ${td ? `
    <!-- ── TERM & TENOR RULES (DEP) ─────────────────────────── -->
    <div class="fee-form-section">
      <div class="ap-sec-title"><div class="fee-form-section-title"><span class="ap-grp d">DEP</span>Term &amp; tenor rules</div>
        <span class="ap-sec-note">Term deposits only · currency rows may override the term range</span></div>
      <div class="ap-g3" style="margin-bottom:18px">
        <div class="fee-form-field"><label class="fee-form-label">Minimum term (days) <span style="color:#e74c3c">*</span></label>
          <input class="fee-form-input" type="number" min="1" data-dep="minTerm" value="${apEsc(P.dep.minTerm)}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Maximum term (days) <span style="color:#e74c3c">*</span></label>
          <input class="fee-form-input" type="number" min="1" data-dep="maxTerm" value="${apEsc(P.dep.maxTerm)}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Default term (days)</label>
          <input class="fee-form-input" type="number" min="1" data-dep="defTerm" value="${apEsc(P.dep.defTerm)}"/></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Rollover at maturity</label>
          <div class="ap-checks"><label><input type="checkbox" data-dep="renewalAllowed" data-bool="1" data-rerender="1" ${ck(P.dep.renewalAllowed)}/>Renewal allowed</label></div></div>
        <div class="fee-form-field"><label class="fee-form-label">Default renewal type</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-dep="renewalType" ${P.dep.renewalAllowed?'':'disabled'}>${apOpts('renewal_type', P.dep.renewalAllowed ? P.dep.renewalType : 'none')}</select></div>
          <div class="ap-hint">Successor contract is created at the board rate on the maturity date.</div></div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field"><label class="fee-form-label">Withdrawals before maturity</label>
          <div class="ap-checks">
            <label><input type="checkbox" data-dep="earlyWithdrawal" data-bool="1" data-rerender="1" ${ck(P.dep.earlyWithdrawal)}/>Early withdrawal (full break) allowed</label>
            <label><input type="checkbox" data-dep="partialWithdrawal" data-bool="1" ${ck(P.dep.partialWithdrawal)}/>Partial withdrawal allowed</label>
          </div></div>
        <div class="fee-form-field"><label class="fee-form-label">Deposit penalty definition ${P.dep.earlyWithdrawal ? '<span style="color:#e74c3c">*</span>' : ''}</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-dep="penaltyId" ${P.dep.earlyWithdrawal?'':'disabled'}>
            <option value="">${P.dep.earlyWithdrawal ? 'Select penalty' : 'n/a'}</option>
            ${AP_REF.penalties.map(x => `<option value="${x.id}" ${String(P.dep.penaltyId)===String(x.id)&&P.dep.earlyWithdrawal?'selected':''}>${x.name}</option>`).join('')}
          </select></div>
          <div class="ap-hint">Break cost — separate from the Loans overdue penalty definitions.</div></div>
      </div>
    </div>
    ` : `
    <div class="ap-na"><span class="ap-grp d">DEP</span><b>Term &amp; tenor rules</b> — not used for ${AP_LBL('account_type', P.accountType).toLowerCase()}s (tenor, rollover and early-withdrawal penalty apply to term deposits only).</div>
    `}

    <!-- ── CURRENCIES, RATES & LIMITS ──────────────────────── -->
    <div class="lp-sub-panel" style="background:#fff">
      <div class="lp-sub-header">
        <span class="lp-sub-title"><span class="ap-grp c">COMMON</span>Currencies, rates &amp; limits <span class="ap-muted" style="font-weight:400;font-size:12px">· product_currencies</span></span>
        <button class="lp-add-btn" id="ap-add-ccy" ${editIdx!==null?'disabled style="opacity:.5"':''}>${_I_PLUS_12} Add currency</button>
      </div>
      <div id="ap-ccy-body">${renderCcyTable()}</div>
      ${editIdx !== null ? renderCcyEditor() : ''}
    </div>

    <!-- ── FEES ──────────────────────────────────────────────── -->
    <div class="lp-sub-panel" style="background:#fff">
      <div class="lp-sub-header">
        <span class="lp-sub-title"><span class="ap-grp c">COMMON</span>Fees <span class="ap-muted" style="font-weight:400;font-size:12px">· product_currency_fees → Shared fee catalog (scope ${td ? 'deposit' : 'account'})</span></span>
        <div class="ap-fee-add">${renderFeeAdder()}</div>
      </div>
      <div>${renderFeeTable()}</div>
    </div>

    <!-- ── AUDIT ─────────────────────────────────────────────── -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Audit trail (read-only)</div>
      <div class="ap-g4">
        ${[['Created at',P.audit.createdAt],['Created by',P.audit.createdBy],['Updated at',P.audit.updatedAt],['Updated by',P.audit.updatedBy]].map(([l,v]) =>
          `<div class="fee-form-field"><label class="fee-form-label">${l}</label><input class="fee-form-input" readonly style="background:#f5f7fa;color:#8a9ab0" value="${apEsc(v || '—')}"/></div>`).join('')}
      </div>
    </div>`;
    wire();
  }

  // ── Currency table ─────────────────────────────────────────────────────────
  function creditText(c) {
    if (!P.interestBearing) return '<span class="ap-muted">—</span>';
    if (c.hasChart) return `Rate chart · ${AP_LBL('tier_treatment', c.tierTreatment).toLowerCase()}${c.creditType==='variable' ? '<br><span class="ap-muted">' + apRateName(c.creditRefId) + ' + margin by band</span>' : ''}`;
    if (c.creditType === 'variable') return `${apRateName(c.creditRefId)} ${Number(c.creditMargin)>=0?'+':'−'} ${Math.abs(Number(c.creditMargin||0)).toFixed(2)}%`;
    return 'Fixed ' + apPct(c.creditRate);
  }
  function debitText(c) {
    if (apIsTD(P) || !P.acc.overdraftAllowed || !P.acc.debitInterest) return '<span class="ap-muted">—</span>';
    if (c.debitType === 'variable') return `${apRateName(c.debitRefId)} + ${Number(c.debitMargin||0).toFixed(2)}%`;
    return c.debitRate === '' ? '<span class="ap-muted">not set</span>' : 'Fixed ' + apPct(c.debitRate);
  }
  function renderChart(c) {
    const td = apIsTD(P);
    const isVar = c.creditType === 'variable';
    const val = t => isVar ? (Number(t.margin)>=0?'+':'') + Number(t.margin||0).toFixed(2) + '%' : apPct(t.rate);
    if (td && c.tiers.some(t => t.fromTerm !== '')) {
      // amount band × tenor band matrix
      const amtKey = t => t.from + '|' + t.to, tenKey = t => t.fromTerm + '|' + t.toTerm;
      const amts = [...new Map(c.tiers.map(t => [amtKey(t), t])).values()].sort((a,z) => Number(a.from) - Number(z.from));
      const tens = [...new Map(c.tiers.map(t => [tenKey(t), t])).values()].sort((a,z) => Number(a.fromTerm) - Number(z.fromTerm));
      const cell = (tn, am) => { const t = c.tiers.find(x => tenKey(x) === tenKey(tn) && amtKey(x) === amtKey(am)); return t ? val(t) : '—'; };
      return `<table class="ap-chart-tbl"><thead><tr><th>Tenor (days) · amount</th>${amts.map(a => `<th>${apAmt(a.from)} – ${a.to===''?'above':apAmt(a.to)}</th>`).join('')}</tr></thead><tbody>
        ${tens.map(tn => `<tr><td>${tn.fromTerm}–${tn.toTerm||'open'}</td>${amts.map(am => `<td>${cell(tn, am)}</td>`).join('')}</tr>`).join('')}
      </tbody></table><div class="ap-hint">${c.tiers.length} bands · ${AP_LBL('tier_treatment', c.tierTreatment).toLowerCase()}${isVar ? ' · margin over ' + apRateName(c.creditRefId) : ''}</div>`;
    }
    return `<table class="ap-chart-tbl"><thead><tr><th>#</th><th>From amount</th><th>To amount</th>${td?'<th>From day</th><th>To day</th>':''}<th>${isVar?'Margin':'Rate'}</th></tr></thead><tbody>
      ${c.tiers.map(t => `<tr><td>${t.order}</td><td>${apAmt(t.from)}</td><td>${t.to===''?'and above':apAmt(t.to)}</td>${td?`<td>${t.fromTerm||'—'}</td><td>${t.toTerm||'open'}</td>`:''}<td>${val(t)}</td></tr>`).join('')}
    </tbody></table>`;
  }
  function renderCcyTable() {
    if (!P.currencies.length) return '<div class="lp-sub-empty">No currencies yet. A product needs at least one currency row before it can be activated.</div>';
    const td = apIsTD(P);
    const od = !td && P.acc.overdraftAllowed;
    return `<div style="overflow-x:auto"><table class="ap-tbl" style="min-width:900px"><thead><tr>
      <th>Currency</th><th>Credit interest</th>${od?'<th>Debit interest</th>':''}
      <th class="r">Min opening</th><th class="r">Min balance</th><th class="r">Max balance</th>
      ${td ? '<th class="r">Default deposit</th><th class="r">Term (days)</th>' : (od ? '<th class="r">Max overdraft</th>' : '')}
      <th>Valid from</th><th>Status</th><th></th></tr></thead><tbody>
      ${P.currencies.map((c, i) => `
        <tr>
          <td><span class="ap-ccy" style="font-size:12px">${c.currency}</span></td>
          <td>${creditText(c)}</td>
          ${od?`<td>${debitText(c)}</td>`:''}
          <td class="r">${apAmt(c.minOpening)}</td><td class="r">${apAmt(c.minBalance)}</td><td class="r">${apAmt(c.maxBalance)}</td>
          ${td ? `<td class="r">${apAmt(c.defDeposit)}</td><td class="r">${(c.minTerm||P.dep.minTerm)}–${(c.maxTerm||P.dep.maxTerm)}${c.minTerm||c.maxTerm?'':' <span class="ap-muted">(product)</span>'}</td>`
               : (od ? `<td class="r">${apAmt(c.maxOverdraft)}</td>` : '')}
          <td>${apDate(c.validFrom)}</td>
          <td><span class="ap-st ${c.status}">${c.status}</span></td>
          <td style="text-align:right;white-space:nowrap">
            <button class="ap-btn-s" data-ccy-edit="${i}" ${editIdx!==null?'disabled':''}>✏ Edit</button>
            <button class="ap-btn-s del" data-ccy-del="${i}" ${editIdx!==null?'disabled':''}>🗑</button>
          </td>
        </tr>
        ${P.interestBearing && c.hasChart && c.tiers.length ? `<tr class="ap-chart"><td colspan="${td?10:(od?10:8)}">${renderChart(c)}</td></tr>` : ''}`).join('')}
    </tbody></table></div>`;
  }

  // ── Currency editor ────────────────────────────────────────────────────────
  let C = null; // working copy of the currency row
  function renderCcyEditor() {
    const td = apIsTD(P);
    const used = P.currencies.map(x => x.currency);
    const odOn = !td && P.acc.overdraftAllowed;
    const dbOn = odOn && P.acc.debitInterest;
    const isVar = C.creditType === 'variable';
    const tierRows = C.tiers.map((t, i) => `<tr>
        <td style="width:40px;color:#6a8faf">${i+1}</td>
        <td><input class="fee-form-input" type="number" step="0.01" data-tier="${i}" data-tk="from" value="${apEsc(t.from)}"/></td>
        <td><input class="fee-form-input" type="number" step="0.01" data-tier="${i}" data-tk="to" value="${apEsc(t.to)}" placeholder="and above"/></td>
        ${td ? `<td><input class="fee-form-input" type="number" data-tier="${i}" data-tk="fromTerm" value="${apEsc(t.fromTerm)}"/></td>
                <td><input class="fee-form-input" type="number" data-tier="${i}" data-tk="toTerm" value="${apEsc(t.toTerm)}" placeholder="open"/></td>` : ''}
        <td><input class="fee-form-input" type="number" step="0.001" data-tier="${i}" data-tk="${isVar?'margin':'rate'}" value="${apEsc(isVar?t.margin:t.rate)}"/></td>
        <td style="width:40px"><button class="ap-btn-s del" data-tier-del="${i}">✕</button></td>
      </tr>`).join('');

    return `<div class="ap-editor">
      <h4>${editIdx === -1 ? 'Add currency' : 'Edit currency — ' + C.currency}</h4>
      <div class="ap-g4">
        <div class="fee-form-field"><label class="fee-form-label">Currency</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-c="currency" ${editIdx!==-1?'disabled':''}>
            ${AP_REF.currencies.map(x => `<option ${x===C.currency?'selected':''} ${used.includes(x)&&x!==C.currency?'disabled':''}>${x}</option>`).join('')}
          </select></div></div>
        <div class="fee-form-field"><label class="fee-form-label">Valid from</label><input class="fee-form-input" type="date" data-c="validFrom" value="${C.validFrom}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Valid to</label><input class="fee-form-input" type="date" data-c="validTo" value="${C.validTo}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Status</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-c="status">${apOpts('lifecycle_status', C.status)}</select></div></div>
      </div>

      <h5>Credit interest</h5>
      ${!P.interestBearing ? '<div class="ap-hint">Product is not interest bearing — no credit rate is held.</div>' : `
      <div class="ap-g4">
        <div class="fee-form-field"><label class="fee-form-label">Rate type</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-c="creditType" data-re="1">${apOpts('interest_rate_type', C.creditType)}</select></div></div>
        ${isVar ? `
        <div class="fee-form-field"><label class="fee-form-label">Reference rate</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-c="creditRefId"><option value="">Select</option>${AP_REF.rates.map(r => `<option value="${r.id}" ${String(C.creditRefId)===String(r.id)?'selected':''}>${r.name}</option>`).join('')}</select></div></div>
        <div class="fee-form-field ${C.hasChart?'ap-disabled':''}"><label class="fee-form-label">Margin (%)</label><input class="fee-form-input" type="number" step="0.001" data-c="creditMargin" value="${apEsc(C.creditMargin)}"/></div>`
        : `<div class="fee-form-field ${C.hasChart?'ap-disabled':''}"><label class="fee-form-label">Fixed rate (%)</label><input class="fee-form-input" type="number" step="0.001" data-c="creditRate" value="${apEsc(C.creditRate)}"/></div><div></div>`}
        <div class="fee-form-field"><label class="fee-form-label">Rate chart</label>
          <div class="ap-checks" style="padding:8px 10px"><label><input type="checkbox" data-c="hasChart" data-bool="1" data-re="1" ${ck(C.hasChart)}/>Rate by ${td ? 'amount × tenor' : 'amount band'}</label></div></div>
      </div>
      ${C.hasChart ? `
      <div style="margin-top:12px">
        <div class="ap-g4" style="margin-bottom:8px">
          <div class="fee-form-field"><label class="fee-form-label">Tier treatment</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-c="tierTreatment">${apOpts('tier_treatment', C.tierTreatment)}</select></div></div>
          <div class="ap-hint" style="grid-column:span 3;align-self:end">Whole balance — the matched band's ${isVar?'margin':'rate'} applies to the entire balance. Banded — each slice of the balance earns its own band ${isVar?'margin':'rate'}. Bands must be contiguous, start at 0 and have exactly one open top band${td?' per tenor band':''}.</div>
        </div>
        <table class="ap-tiers"><thead><tr><th>#</th><th>From amount</th><th>To amount</th>${td?'<th>From day</th><th>To day</th>':''}<th>${isVar?'Margin (%)':'Rate (%)'}</th><th></th></tr></thead>
          <tbody>${tierRows || `<tr><td colspan="${td?7:5}" class="ap-hint" style="padding:8px 6px">No bands yet.</td></tr>`}</tbody></table>
        <button class="lp-add-btn-link" id="ap-tier-add" style="color:#6c3fc5;margin-top:6px">+ Add band</button>
      </div>` : ''}`}

      ${!td ? `
      <h5>Debit interest &amp; overdraft</h5>
      ${!odOn ? '<div class="ap-hint">Overdraft is not allowed on this product — enable it under Account behaviour to set a limit and debit rate.</div>' : `
      <div class="ap-g4">
        <div class="fee-form-field"><label class="fee-form-label">Max overdraft limit</label><input class="fee-form-input" type="number" step="0.01" data-c="maxOverdraft" value="${apEsc(C.maxOverdraft)}"/></div>
        ${dbOn ? `
        <div class="fee-form-field"><label class="fee-form-label">Debit rate type</label>
          <div class="fee-select-wrap"><select class="fee-form-select" data-c="debitType" data-re="1">${apOpts('interest_rate_type', C.debitType)}</select></div></div>
        ${C.debitType === 'variable' ? `
          <div class="fee-form-field"><label class="fee-form-label">Reference rate</label>
            <div class="fee-select-wrap"><select class="fee-form-select" data-c="debitRefId"><option value="">Select</option>${AP_REF.rates.map(r => `<option value="${r.id}" ${String(C.debitRefId)===String(r.id)?'selected':''}>${r.name}</option>`).join('')}</select></div></div>
          <div class="fee-form-field"><label class="fee-form-label">Margin (%)</label><input class="fee-form-input" type="number" step="0.001" data-c="debitMargin" value="${apEsc(C.debitMargin)}"/></div>`
        : `<div class="fee-form-field"><label class="fee-form-label">Fixed debit rate (%)</label><input class="fee-form-input" type="number" step="0.001" data-c="debitRate" value="${apEsc(C.debitRate)}"/></div><div></div>`}`
        : '<div class="ap-hint" style="grid-column:span 3;align-self:end">Debit interest is switched off at product level — the overdraft is interest-free.</div>'}
      </div>`}` : ''}

      <h5>Amounts${td ? ' &amp; term override' : ''}</h5>
      <div class="ap-g4">
        <div class="fee-form-field"><label class="fee-form-label">Minimum opening amount</label><input class="fee-form-input" type="number" step="0.01" data-c="minOpening" value="${apEsc(C.minOpening)}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Minimum balance</label><input class="fee-form-input" type="number" step="0.01" data-c="minBalance" value="${apEsc(C.minBalance)}"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Maximum balance</label><input class="fee-form-input" type="number" step="0.01" data-c="maxBalance" value="${apEsc(C.maxBalance)}" placeholder="no maximum"/></div>
        ${td ? `<div class="fee-form-field"><label class="fee-form-label">Default deposit amount</label><input class="fee-form-input" type="number" step="0.01" data-c="defDeposit" value="${apEsc(C.defDeposit)}"/></div>` : '<div></div>'}
      </div>
      ${td ? `<div class="ap-g4" style="margin-top:12px">
        <div class="fee-form-field"><label class="fee-form-label">Min term (days)</label><input class="fee-form-input" type="number" data-c="minTerm" value="${apEsc(C.minTerm)}" placeholder="${P.dep.minTerm || 'product'} (product)"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Max term (days)</label><input class="fee-form-input" type="number" data-c="maxTerm" value="${apEsc(C.maxTerm)}" placeholder="${P.dep.maxTerm || 'product'} (product)"/></div>
        <div class="fee-form-field"><label class="fee-form-label">Default term (days)</label><input class="fee-form-input" type="number" data-c="defTerm" value="${apEsc(C.defTerm)}" placeholder="${P.dep.defTerm || 'product'} (product)"/></div>
        <div class="ap-hint" style="align-self:end">Empty = inherit the product term range.</div>
      </div>` : ''}

      <div id="ap-ccy-err" class="ap-err"></div>
      <div class="ap-editor-foot">
        <button class="ap-btn-ghost" id="ap-ccy-cancel">Cancel</button>
        <button class="ap-btn-pri" id="ap-ccy-save">${editIdx === -1 ? 'Add currency' : 'Apply changes'}</button>
      </div>
    </div>`;
  }

  // ── Fees ───────────────────────────────────────────────────────────────────
  const feeScope = () => apIsTD(P) ? 'deposit' : 'account';
  function renderFeeAdder() {
    if (!P.currencies.length) return '<span class="ap-hint" style="margin:0">Add a currency first</span>';
    const scope = feeScope();
    const opts = P.currencies.map(c => {
      const avail = AP_REF.fees.filter(f => f.ccy === c.currency && f.scope === scope && !c.fees.includes(f.id));
      return avail.length ? `<optgroup label="${c.currency}">${avail.map(f => `<option value="${c.currency}|${f.id}">${f.code} — ${f.name}</option>`).join('')}</optgroup>` : '';
    }).join('');
    if (!opts) return '<span class="ap-hint" style="margin:0">All matching fees are mapped</span>';
    return `<div class="fee-select-wrap" style="width:320px;margin:0"><select class="fee-form-select" id="ap-fee-sel"><option value="">Select fee from catalog</option>${opts}</select></div>
            <button class="lp-add-btn" id="ap-fee-add">Map fee</button>`;
  }
  function renderFeeTable() {
    const rows = [];
    P.currencies.forEach((c, ci) => c.fees.forEach(fid => {
      const f = AP_REF.fees.find(x => x.id === fid); if (!f) return;
      rows.push(`<tr><td><span class="ap-ccy">${c.currency}</span></td><td class="ap-mono">${f.code}</td><td>${f.name}</td>
        <td>${f.trigger.replace(/_/g,' ')}</td><td>${f.method}</td><td class="r">${f.value}</td>
        <td style="text-align:right"><button class="ap-btn-s del" data-fee-del="${ci}|${fid}">🗑</button></td></tr>`);
    }));
    if (!rows.length) return '<div class="lp-sub-empty">No fees mapped. Fees are defined once in the Shared fee catalog and mapped here per currency — the fee currency must match the product currency.</div>';
    return `<div style="overflow-x:auto"><table class="ap-tbl" style="min-width:700px"><thead><tr><th>Currency</th><th>Fee code</th><th>Name</th><th>Trigger</th><th>Method</th><th class="r">Value</th><th></th></tr></thead><tbody>${rows.join('')}</tbody></table></div>`;
  }

  // ── Validation ─────────────────────────────────────────────────────────────
  function validateCcy() {
    const td = apIsTD(P);
    if (P.interestBearing) {
      if (C.creditType === 'variable' && !C.creditRefId) return 'Variable rate needs a reference rate.';
      if (!C.hasChart && C.creditType === 'fixed' && C.creditRate === '') return 'Enter a fixed credit rate, or switch on the rate chart.';
      if (C.hasChart) {
        if (!C.tiers.length) return 'Rate chart is switched on but has no bands.';
        const key = C.creditType === 'variable' ? 'margin' : 'rate';
        if (C.tiers.some(t => t[key] === '')) return 'Every band needs a ' + key + '.';
        const groups = {};
        C.tiers.forEach(t => { const g = td ? (t.fromTerm + '-' + t.toTerm) : 'all'; (groups[g] = groups[g] || []).push(t); });
        for (const g in groups) {
          const b = groups[g].slice().sort((a, z) => Number(a.from) - Number(z.from));
          if (Number(b[0].from) !== 0) return 'Bands must start at 0' + (td ? ' within each tenor band.' : '.');
          if (b.filter(t => t.to === '').length !== 1) return 'Exactly one open top band (empty "To amount") is required' + (td ? ' per tenor band.' : '.');
          for (let i = 1; i < b.length; i++) if (Number(b[i].from) !== Number(b[i-1].to)) return 'Bands must be contiguous — band ' + (i+1) + ' should start at ' + apAmt(b[i-1].to) + '.';
        }
      }
    }
    if (!td && P.acc.overdraftAllowed && P.acc.debitInterest) {
      if (C.debitType === 'fixed' && C.debitRate === '') return 'Enter a debit rate for the overdraft.';
      if (C.debitType === 'variable' && !C.debitRefId) return 'Variable debit rate needs a reference rate.';
    }
    if (C.maxBalance !== '' && C.minBalance !== '' && Number(C.maxBalance) < Number(C.minBalance)) return 'Maximum balance is below the minimum balance.';
    return '';
  }
  function validateProduct() {
    if (!P.code.trim() || !P.name.trim()) return 'Product code and name are required.';
    if (apProducts().some(x => x.id !== P.id && x.code.toLowerCase() === P.code.trim().toLowerCase() && (x.validFrom||'') === (P.validFrom||''))) return 'Another product already uses this code with the same valid-from date.';
    if (!P.customerTypes.length) return 'Select at least one allowed customer type.';
    if (P.whtApplicable && !P.taxDefId) return 'Select a tax definition, or switch off withholding tax.';
    if (apIsTD(P)) {
      if (!P.dep.minTerm || !P.dep.maxTerm) return 'Term deposits need a minimum and maximum term.';
      if (Number(P.dep.minTerm) > Number(P.dep.maxTerm)) return 'Minimum term is longer than maximum term.';
      if (P.dep.earlyWithdrawal && !P.dep.penaltyId) return 'Select a deposit penalty definition for early withdrawal.';
    }
    if (P.status === 'active' && !P.currencies.some(c => c.status === 'active')) return 'An active product needs at least one active currency row.';
    if (editIdx !== null) return 'Finish or cancel the currency you are editing first.';
    return '';
  }

  // ── Wiring ─────────────────────────────────────────────────────────────────
  function readInto(obj, input, key) {
    obj[key] = input.dataset.bool ? (input.type === 'checkbox' ? input.checked : input.value === '1')
             : input.dataset.num ? Number(input.value) : input.value;
  }
  function wire() {
    el.querySelector('#ap-back').addEventListener('click', () => accProdRenderList(m.contentId, mod, backSection));

    el.querySelectorAll('input[name="ap-type"]').forEach(r => r.addEventListener('change', () => {
      P.accountType = r.value;
      if (r.value === 'term_deposit') { P.categoryId = 4; P.capFreq = P.interestBearing ? 'at_maturity' : ''; if (!P.dep.minTerm) { P.dep.minTerm='30'; P.dep.maxTerm='365'; P.dep.defTerm='90'; } }
      else { if (P.categoryId === 4) P.categoryId = r.value === 'savings' ? 3 : 1; if (P.capFreq === 'at_maturity') P.capFreq = 'monthly'; }
      P.currencies.forEach(c => { c.fees = c.fees.filter(fid => { const f = AP_REF.fees.find(x => x.id === fid); return f && f.scope === feeScope(); }); });
      render();
    }));

    el.querySelectorAll('[data-k]').forEach(i => i.addEventListener('change', () => {
      readInto(P, i, i.dataset.k);
      if (i.dataset.k === 'interestBearing') P.capFreq = P.interestBearing ? (apIsTD(P) ? 'at_maturity' : 'monthly') : '';
      if (i.dataset.k === 'whtApplicable' && !P.whtApplicable) P.taxDefId = '';
      if (i.dataset.rerender) render();
    }));
    el.querySelectorAll('[data-k="code"],[data-k="name"]').forEach(i => i.addEventListener('input', () => { P[i.dataset.k] = i.value; i.style.borderColor=''; }));
    el.querySelectorAll('[data-ct]').forEach(i => i.addEventListener('change', () => {
      P.customerTypes = AP_ENUM.customer_type.map(x => x[0]).filter(v => el.querySelector(`[data-ct="${v}"]`).checked);
    }));
    el.querySelectorAll('[data-acc]').forEach(i => i.addEventListener('change', () => {
      readInto(P.acc, i, i.dataset.acc);
      if (i.dataset.acc === 'overdraftAllowed' && !P.acc.overdraftAllowed) P.acc.debitInterest = false;
      if (i.dataset.rerender) render();
    }));
    el.querySelectorAll('[data-dep]').forEach(i => i.addEventListener('change', () => {
      readInto(P.dep, i, i.dataset.dep);
      if (i.dataset.dep === 'renewalAllowed') P.dep.renewalType = P.dep.renewalAllowed ? (P.dep.renewalType === 'none' ? 'principal_only' : P.dep.renewalType) : 'none';
      if (i.dataset.dep === 'earlyWithdrawal' && !P.dep.earlyWithdrawal) P.dep.penaltyId = '';
      if (i.dataset.rerender) render();
    }));

    // currencies
    const addBtn = el.querySelector('#ap-add-ccy');
    if (addBtn) addBtn.addEventListener('click', () => {
      if (editIdx !== null) return;
      const free = AP_REF.currencies.find(x => !P.currencies.some(c => c.currency === x));
      if (!free) { el.querySelector('#ap-ccy-body').insertAdjacentHTML('beforeend', '<div class="ap-err" style="padding:0 18px 12px">All available currencies are already on this product.</div>'); return; }
      C = Object.assign(JSON.parse(JSON.stringify(apSeedProducts()[0].currencies[0])), { currency:free, creditRate:'', debitRate:'', minOpening:'', minBalance:'', maxOverdraft:'', fees:[], status:'pending', validFrom: P.validFrom || '' });
      editIdx = -1; render();
      el.querySelector('.ap-editor').scrollIntoView({ block:'nearest', behavior:'smooth' });
    });
    el.querySelectorAll('[data-ccy-edit]').forEach(b => b.addEventListener('click', () => {
      editIdx = Number(b.dataset.ccyEdit); C = JSON.parse(JSON.stringify(P.currencies[editIdx])); render();
      el.querySelector('.ap-editor').scrollIntoView({ block:'nearest', behavior:'smooth' });
    }));
    el.querySelectorAll('[data-ccy-del]').forEach(b => b.addEventListener('click', () => {
      if (!b.classList.contains('arm')) { b.classList.add('arm'); b.textContent = 'Remove?'; return; }
      P.currencies.splice(Number(b.dataset.ccyDel), 1); render();
    }));

    if (editIdx !== null) {
      const ed = el.querySelector('.ap-editor');
      ed.querySelectorAll('[data-c]').forEach(i => i.addEventListener('change', () => {
        readInto(C, i, i.dataset.c);
        if (i.dataset.c === 'hasChart' && C.hasChart && !C.tiers.length) C.tiers = [{ order:1, from:'0', to:'', fromTerm: apIsTD(P) ? (P.dep.minTerm || '') : '', toTerm:'', rate:'', margin:'' }];
        if (i.dataset.re) render();
      }));
      ed.querySelectorAll('[data-tier]').forEach(i => i.addEventListener('change', () => { C.tiers[Number(i.dataset.tier)][i.dataset.tk] = i.value; }));
      ed.querySelectorAll('[data-tier-del]').forEach(b => b.addEventListener('click', () => {
        C.tiers.splice(Number(b.dataset.tierDel), 1); C.tiers.forEach((t, k) => t.order = k + 1); render();
      }));
      const ta = ed.querySelector('#ap-tier-add');
      if (ta) ta.addEventListener('click', () => {
        const last = C.tiers[C.tiers.length - 1];
        const td = apIsTD(P);
        const nb = { order:C.tiers.length + 1, from: last && last.to !== '' ? last.to : '', to:'', fromTerm: td && last ? last.fromTerm : '', toTerm: td && last ? last.toTerm : '', rate:'', margin:'' };
        C.tiers.push(nb); render();
      });
      ed.querySelector('#ap-ccy-cancel').addEventListener('click', () => { editIdx = null; C = null; render(); });
      ed.querySelector('#ap-ccy-save').addEventListener('click', () => {
        const err = validateCcy();
        if (err) { ed.querySelector('#ap-ccy-err').textContent = err; return; }
        if (!P.interestBearing) { C.hasChart = false; C.tiers = []; }
        C.tiers.forEach((t, k) => t.order = k + 1);
        if (editIdx === -1) P.currencies.push(C); else P.currencies[editIdx] = C;
        editIdx = null; C = null; render();
      });
    }

    // fees
    const fa = el.querySelector('#ap-fee-add');
    if (fa) fa.addEventListener('click', () => {
      const v = el.querySelector('#ap-fee-sel').value; if (!v) return;
      const [ccy, fid] = v.split('|');
      const c = P.currencies.find(x => x.currency === ccy);
      if (c && !c.fees.includes(Number(fid))) c.fees.push(Number(fid));
      render();
    });
    el.querySelectorAll('[data-fee-del]').forEach(b => b.addEventListener('click', () => {
      const [ci, fid] = b.dataset.feeDel.split('|').map(Number);
      P.currencies[ci].fees = P.currencies[ci].fees.filter(x => x !== fid); render();
    }));

    // save
    el.querySelector('#ap-save-btn').addEventListener('click', () => {
      P.code = el.querySelector('#ap-code').value.trim(); P.name = el.querySelector('#ap-name').value.trim();
      const err = validateProduct();
      const box = el.querySelector('#ap-form-err');
      if (err) { box.textContent = err; box.scrollIntoView({ block:'nearest' }); if (!P.code) el.querySelector('#ap-code').style.borderColor='#ef4444'; if (!P.name) el.querySelector('#ap-name').style.borderColor='#ef4444'; return; }
      // enforce model rules on save
      if (!P.interestBearing) P.capFreq = '';
      if (apIsTD(P)) { P.acc = { useMinPeriodBalance:false, overdraftAllowed:false, debitInterest:false, ibanRequired:false, statementFreq:'none', dormancyDays:'', closureNoticeDays:'' }; }
      else { P.dep = { minTerm:'', maxTerm:'', defTerm:'', renewalAllowed:false, renewalType:'none', partialWithdrawal:false, earlyWithdrawal:false, penaltyId:'' }; }
      const now = new Date(); const pad = n => String(n).padStart(2,'0');
      const stamp = pad(now.getDate()) + '.' + pad(now.getMonth()+1) + '.' + now.getFullYear() + ' ' + pad(now.getHours()) + ':' + pad(now.getMinutes());
      const list = apProducts();
      if (isEdit) {
        P.audit.updatedAt = stamp; P.audit.updatedBy = 's.stanic';
        const i = list.findIndex(x => x.id === P.id); list[i] = P;
      } else {
        P.id = list.reduce((mx, x) => Math.max(mx, x.id), 0) + 1;
        P.audit = { createdAt:stamp, createdBy:'s.stanic', updatedAt:stamp, updatedBy:'s.stanic' };
        list.push(P);
      }
      window._apFilter = 'all';
      accProdRenderList(m.contentId, mod, backSection);
    });
  }

  render();

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
window.openAccProductForm = openAccProductForm;
window.accProdRenderList  = accProdRenderList;


// ── ACCOUNTS & DEPOSITS DASHBOARD ─────────────────────────────────────────────
function _buildAccDepDashboard() {
  // ── Mock data ──────────────────────────────────────────────────────────────
  // 30-day daily balance trend (transaction accounts, EUR mn)
  var _ACC_DAYS = (function(){
    var days = []; var bal = 42.1; var dep = 28.3;
    var labels = [];
    var base = new Date('2026-09-09');
    for (var i = 0; i < 30; i++) {
      var d = new Date(base); d.setDate(base.getDate()+i);
      var dd = String(d.getDate()).padStart(2,'0');
      var mm = String(d.getMonth()+1).padStart(2,'0');
      labels.push(dd+'.'+mm);
      bal += (Math.random()-0.46)*0.8;
      dep += (Math.random()-0.44)*0.5;
      days.push({ label: labels[i], txnBal: Math.round(bal*100)/100, depBal: Math.round(dep*100)/100 });
    }
    return days;
  })();
  var last = _ACC_DAYS[_ACC_DAYS.length-1];

  // Recent transactions
  var _ACC_RECENT = [
    { accId:'ACC-10041', customer:'Marija Novak',    type:'Current',  txn:'Credit',  amount:3400.00,  date:'08.10.2026', status:'Posted' },
    { accId:'SAV-20187', customer:'Petar Horvat',    type:'Savings',  txn:'Debit',   amount:1250.50,  date:'08.10.2026', status:'Posted' },
    { accId:'DEP-30091', customer:'Ana Babić',       type:'Term Dep', txn:'Interest',amount:418.75,   date:'08.10.2026', status:'Posted' },
    { accId:'ACC-10088', customer:'Ivan Jurić',      type:'Current',  txn:'Debit',   amount:870.00,   date:'07.10.2026', status:'Posted' },
    { accId:'SAV-20044', customer:'Maja Perić',      type:'Savings',  txn:'Credit',  amount:5000.00,  date:'07.10.2026', status:'Posted' },
    { accId:'DEP-30012', customer:'Tomislav Blažić', type:'Term Dep', txn:'Matured', amount:18500.00, date:'07.10.2026', status:'Posted' },
    { accId:'ACC-10203', customer:'Ksenija Šimić',   type:'Current',  txn:'Credit',  amount:2100.00,  date:'06.10.2026', status:'Posted' },
    { accId:'SAV-20301', customer:'Damir Kovač',     type:'Savings',  txn:'Debit',   amount:600.00,   date:'06.10.2026', status:'Posted' },
  ];

  // ── Helpers ────────────────────────────────────────────────────────────────
  function fmt(n) { return n.toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2}); }

  function sparkLine(values, color, H) {
    H = H || 72;
    var W = 500;
    var mn = Math.min.apply(null,values), mx = Math.max.apply(null,values);
    var range = mx - mn || 1;
    var pts = values.map(function(v,i){
      var x = Math.round(i/(values.length-1)*W);
      var y = Math.round(H - ((v-mn)/range)*(H-8) - 4);
      return x+','+y;
    }).join(' ');
    var areaClose = ' '+W+','+H+' 0,'+H;
    var hex = color.replace('#','');
    return '<svg width="100%" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'
      +'<defs><linearGradient id="alg_'+hex+'" x1="0" y1="0" x2="0" y2="1">'
      +'<stop offset="0%" stop-color="'+color+'" stop-opacity="0.18"/>'
      +'<stop offset="100%" stop-color="'+color+'" stop-opacity="0.01"/></linearGradient></defs>'
      +'<polygon points="'+pts+areaClose+'" fill="url(#alg_'+hex+')"/>'
      +'<polyline points="'+pts+'" fill="none" stroke="'+color+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'
      +'</svg>';
  }

  function sparkBars(values, color, H) {
    H = H || 60;
    var W = 500;
    var mx = Math.max.apply(null,values) || 1;
    var bw = Math.floor(W/values.length)-1;
    var bars = values.map(function(v,i){
      var bh = Math.max(1, Math.round((v/mx)*(H-4)));
      return '<rect x="'+(i*(bw+1))+'" y="'+(H-bh)+'" width="'+bw+'" height="'+bh+'" rx="2" fill="'+color+'" opacity="0.85"/>';
    }).join('');
    return '<svg width="100%" viewBox="0 0 '+W+' '+H+'" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'+bars+'</svg>';
  }

  function xLabels(days) {
    return '<div style="display:flex;justify-content:space-between;padding:0 2px;margin-top:4px">'
      + days.map(function(d,i){ return i%5===0 ? '<span style="font-size:10px;color:var(--fg2,#64748b)">'+d.label+'</span>' : ''; }).filter(Boolean).join('')
      +'</div>';
  }

  function kpi(label, value, sub, subColor) {
    return '<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
      +'<div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--fg2,#64748b);margin-bottom:8px">'+label+'</div>'
      +'<div style="font-size:24px;font-weight:700;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums;line-height:1">'+value+'</div>'
      +(sub ? '<div style="font-size:12px;color:'+(subColor||'var(--fg2,#64748b)')+';margin-top:6px">'+sub+'</div>' : '')
      +'</div>';
  }

  function portfolioTile(label, value, highlight) {
    var bg  = highlight ? 'background:#f0fdf9;' : '';
    var lc  = highlight ? 'color:#0d9488;font-weight:600' : 'color:var(--fg2,#64748b)';
    var vc  = highlight ? 'color:#0d9488' : 'color:var(--fg,#1e293b)';
    return '<div style="padding:13px 18px;border-right:1px solid var(--border1,#e2e8f0);border-bottom:1px solid var(--border1,#e2e8f0);'+bg+'">'
      +'<div style="font-size:11px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px;'+lc+'">'+label+'</div>'
      +'<div style="font-size:20px;font-weight:700;font-variant-numeric:tabular-nums;'+vc+'">'+value+'</div>'
      +'</div>';
  }

  // ── Donut: account type split ──────────────────────────────────────────────
  var typeSlices = [
    { label:'Current/Transaction', pct:48, color:'#16a085' },
    { label:'Savings',             pct:29, color:'#3b82f6' },
    { label:'Term Deposit',        pct:18, color:'#f59e0b' },
    { label:'Overdraft',           pct:5,  color:'#ef4444' },
  ];
  var ang2 = 0;
  var donutPaths = typeSlices.map(function(s){
    var span = s.pct/100*360;
    var toRad = function(a){ return (a-90)*Math.PI/180; };
    var cx=60,cy=60,r=55;
    var sv = { x: cx+r*Math.cos(toRad(ang2)),    y: cy+r*Math.sin(toRad(ang2)) };
    var ev = { x: cx+r*Math.cos(toRad(ang2+span-0.5)), y: cy+r*Math.sin(toRad(ang2+span-0.5)) };
    var large = span > 180 ? 1 : 0;
    var path = '<path d="M '+cx+','+cy+' L '+sv.x+','+sv.y+' A '+r+','+r+' 0 '+large+' 1 '+ev.x+','+ev.y+' Z" fill="'+s.color+'"/>';
    ang2 += span;
    return path;
  }).join('');
  var donutSvg = '<svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">'
    +donutPaths
    +'<circle cx="60" cy="60" r="30" fill="var(--card-bg,#fff)"/>'
    +'<text x="60" y="55" text-anchor="middle" font-size="13" font-weight="700" fill="var(--fg,#1e293b)">9,847</text>'
    +'<text x="60" y="70" text-anchor="middle" font-size="9" fill="var(--fg2,#64748b)">Accounts</text>'
    +'</svg>';

  // ── Product bars ───────────────────────────────────────────────────────────
  var prodData = [
    { label:'Standard Current', pct:38, color:'#16a085' },
    { label:'Premium Savings',  pct:25, color:'#3b82f6' },
    { label:'12-mo Term Dep.',  pct:19, color:'#f59e0b' },
    { label:'6-mo Term Dep.',   pct:11, color:'#a78bfa' },
    { label:'Overdraft',        pct:7,  color:'#94a3b8' },
  ];
  var prodBars = prodData.map(function(p){
    return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:9px">'
      +'<div style="width:120px;font-size:12px;color:var(--fg2,#64748b);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">'+p.label+'</div>'
      +'<div style="flex:1;height:8px;border-radius:4px;background:var(--border1,#e2e8f0);overflow:hidden">'
      +'<div style="width:'+p.pct+'%;height:100%;background:'+p.color+';border-radius:4px"></div></div>'
      +'<div style="width:32px;text-align:right;font-size:12px;font-weight:600;color:var(--fg,#1e293b)">'+p.pct+'%</div>'
      +'</div>';
  }).join('');

  // ── Recent transactions table rows ─────────────────────────────────────────
  var recentRows = _ACC_RECENT.map(function(r){
    var isCredit = r.txn === 'Credit' || r.txn === 'Interest' || r.txn === 'Matured';
    var amtColor = isCredit ? '#16a34a' : '#ef4444';
    var amtSign  = isCredit ? '+' : '-';
    var badgeStyle = isCredit
      ? 'background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0'
      : 'background:#fef2f2;color:#dc2626;border:1px solid #fecaca';
    return '<tr>'
      +'<td style="padding:11px 14px;font-size:12.5px;font-family:monospace;color:#16a085">'+r.accId+'</td>'
      +'<td style="padding:11px 14px;font-size:13px;color:var(--fg,#1e293b)">'+r.customer+'</td>'
      +'<td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b)">'+r.type+'</td>'
      +'<td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b)">'+r.txn+'</td>'
      +'<td style="padding:11px 14px;font-size:13px;font-weight:600;font-variant-numeric:tabular-nums;color:'+amtColor+'">'+amtSign+fmt(r.amount)+'</td>'
      +'<td style="padding:11px 14px;font-size:12px;color:var(--fg2,#64748b)">'+r.date+'</td>'
      +'<td style="padding:11px 14px"><span style="padding:2px 10px;border-radius:12px;font-size:11.5px;font-weight:600;'+badgeStyle+'">'+r.status+'</span></td>'
      +'</tr>';
  }).join('');

  // ── Chart data series ──────────────────────────────────────────────────────
  var txnBalVals = _ACC_DAYS.map(function(d){ return d.txnBal; });
  var depBalVals = _ACC_DAYS.map(function(d){ return d.depBal; });
  // Daily inflows / outflows (mock)
  var inflowVals = _ACC_DAYS.map(function(){ return Math.round((1.2+Math.random()*2.1)*100)/100; });
  var outflowVals= _ACC_DAYS.map(function(){ return Math.round((0.9+Math.random()*1.8)*100)/100; });
  var xLbl = xLabels(_ACC_DAYS);

  // ── Maturing deposits (next 30 days) ──────────────────────────────────────
  var maturingRows = [
    { accId:'DEP-30441', customer:'Mirko Šarić',    product:'12-mo Term Dep.', matDate:'11.10.2026', amount:'25,000.00', interest:'1,250.00' },
    { accId:'DEP-30189', customer:'Ljiljana Cindrić',product:'6-mo Term Dep.', matDate:'14.10.2026', amount:'10,000.00', interest:'320.00'   },
    { accId:'DEP-30502', customer:'Stjepan Vukšić', product:'12-mo Term Dep.', matDate:'18.10.2026', amount:'50,000.00', interest:'2,500.00' },
    { accId:'DEP-30077', customer:'Vesna Brković',  product:'24-mo Term Dep.', matDate:'22.10.2026', amount:'35,000.00', interest:'3,850.00' },
    { accId:'DEP-30613', customer:'Nela Tomić',     product:'6-mo Term Dep.',  matDate:'29.10.2026', amount:'8,500.00',  interest:'272.00'   },
  ].map(function(r){
    return '<tr>'
      +'<td style="padding:10px 14px;font-size:12.5px;font-family:monospace;color:#16a085">'+r.accId+'</td>'
      +'<td style="padding:10px 14px;font-size:13px;color:var(--fg,#1e293b)">'+r.customer+'</td>'
      +'<td style="padding:10px 14px;font-size:12px;color:var(--fg2,#64748b)">'+r.product+'</td>'
      +'<td style="padding:10px 14px;font-size:12px;font-weight:600;color:#f59e0b">'+r.matDate+'</td>'
      +'<td style="padding:10px 14px;font-size:13px;font-weight:600;color:var(--fg,#1e293b);font-variant-numeric:tabular-nums">'+r.amount+'</td>'
      +'<td style="padding:10px 14px;font-size:13px;color:#16a34a;font-variant-numeric:tabular-nums">'+r.interest+'</td>'
      +'</tr>';
  }).join('');

  // ── Build HTML ─────────────────────────────────────────────────────────────
  return '<div style="padding:24px;max-width:1400px">'

    // Header
    +'<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px">'
    +'<div>'
    +'<div style="font-size:22px;font-weight:700;color:var(--fg,#1e293b)">Dashboard</div>'
    +'<div style="font-size:13px;color:var(--fg2,#64748b);margin-top:3px">Accounts &amp; Deposits portfolio overview — as of 09 Oct 2026</div>'
    +'</div>'
    +'<select style="padding:7px 12px;border:1px solid var(--border1,#e2e8f0);border-radius:8px;font-size:13px;color:var(--fg,#1e293b);background:var(--card-bg,#fff)">'
    +'<option>Last 30 days</option><option>Last 7 days</option><option>This month</option><option>This year</option>'
    +'</select>'
    +'</div>'

    // ── Portfolio Position ─────────────────────────────────────────────────
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:20px 24px;margin-bottom:20px">'
    +'<div style="display:flex;align-items:baseline;gap:12px;margin-bottom:16px">'
    +'<div style="font-size:15px;font-weight:700;color:var(--fg,#1e293b)">Portfolio Position</div>'
    +'<div style="font-size:12px;color:var(--fg2,#64748b)">at 8 October 2026</div>'
    +'</div>'
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(195px,1fr));gap:0;border:1px solid var(--border1,#e2e8f0);border-radius:8px;overflow:hidden">'
    // Row 1 — Transaction accounts
    +portfolioTile('Transaction Accounts','4,312')
    +portfolioTile('TXN Account Balance','43,218,450.00')
    +portfolioTile('Overdraft Accounts','187')
    +portfolioTile('Overdraft Utilised','2,341,670.00')
    +portfolioTile('Avg. Daily Volume','8,941,200.00')
    +portfolioTile('Total TXN Balance','43,218,450.00', true)
    // Row 2 — Savings & deposits
    +portfolioTile('Savings Accounts','2,891')
    +portfolioTile('Savings Balance','29,114,880.00')
    +portfolioTile('Term Deposits','2,644')
    +portfolioTile('Deposit Balance','68,742,300.00')
    +portfolioTile('Interest Accrued YTD','3,218,640.00')
    +portfolioTile('Total Deposit Balance','97,857,180.00', true)
    +'</div>'
    +'</div>'

    // ── KPI row ────────────────────────────────────────────────────────────
    +'<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px;margin-bottom:20px">'
    +kpi('Total Accounts', '9,847', '↑ 34 opened this week', '#16a085')
    +kpi('New Accounts Today', '12', '7 current · 3 savings · 2 deposits', '#3b82f6')
    +kpi('Closed Today', '4', '4 accounts closed', 'var(--fg2,#64748b)')
    +kpi('Maturing in 30 days', '129', 'EUR 14.2M at maturity', '#f59e0b')
    +kpi('Overdraft Accounts', '187', 'Limit utilisation 64%', '#a78bfa')
    +kpi('Interest Paid YTD', 'EUR 3.2M', 'Across all deposit products', '#16a085')
    +'</div>'

    // ── Chart row 1: TXN balance + Deposit balance ─────────────────────────
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">'
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Transaction Account Balances</div>'
    +'<div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:4px">End-of-day aggregate balance (EUR mn)</div>'
    +'<div style="font-size:18px;font-weight:700;color:#16a085;margin-bottom:8px;font-variant-numeric:tabular-nums">EUR '+fmt(last.txnBal)+' mn</div>'
    +sparkLine(txnBalVals,'#16a085',88)
    +xLbl
    +'</div>'
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Deposit Portfolio Balance</div>'
    +'<div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:4px">Term deposits + savings (EUR mn)</div>'
    +'<div style="font-size:18px;font-weight:700;color:#3b82f6;margin-bottom:8px;font-variant-numeric:tabular-nums">EUR '+fmt(last.depBal)+' mn</div>'
    +sparkLine(depBalVals,'#3b82f6',88)
    +xLbl
    +'</div>'
    +'</div>'

    // ── Chart row 2: inflows / outflows bars ───────────────────────────────
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px">'
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Daily Inflows</div>'
    +'<div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:12px">Credits posted per day (EUR mn)</div>'
    +sparkBars(inflowVals,'#16a085',88)
    +xLbl
    +'</div>'
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:4px">Daily Outflows</div>'
    +'<div style="font-size:11.5px;color:var(--fg2,#64748b);margin-bottom:12px">Debits posted per day (EUR mn)</div>'
    +sparkBars(outflowVals,'#ef4444',88)
    +xLbl
    +'</div>'
    +'</div>'

    // ── Bottom row: donut + product distribution + recent txns ─────────────
    +'<div style="display:grid;grid-template-columns:1fr 1fr 2fr;gap:14px;margin-bottom:14px">'

    // Account type donut
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:16px">Account Type Split</div>'
    +'<div style="display:flex;align-items:center;gap:18px">'
    +donutSvg
    +'<div>'
    +typeSlices.map(function(s){
      return '<div style="display:flex;align-items:center;gap:7px;margin-bottom:8px">'
        +'<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:'+s.color+';flex-shrink:0"></span>'
        +'<span style="font-size:12px;color:var(--fg2,#64748b)">'+s.label+'</span>'
        +'<span style="font-size:12px;font-weight:600;color:var(--fg,#1e293b);margin-left:auto">'+s.pct+'%</span>'
        +'</div>';
    }).join('')
    +'</div></div></div>'

    // Product distribution
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:16px">By Product</div>'
    +prodBars
    +'</div>'

    // Recent transactions
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:12px">Recent Transactions</div>'
    +'<div style="overflow-x:auto">'
    +'<table style="width:100%;border-collapse:collapse">'
    +'<thead><tr style="border-bottom:1px solid var(--border1,#e2e8f0)">'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Account</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Customer</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Type</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Txn</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Amount</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Date</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Status</th>'
    +'</tr></thead>'
    +'<tbody>'+recentRows+'</tbody>'
    +'</table>'
    +'</div>'
    +'</div>'
    +'</div>'  // end bottom row

    // ── Maturing deposits table ────────────────────────────────────────────
    +'<div style="background:var(--card-bg,#fff);border:1px solid var(--border1,#e2e8f0);border-radius:10px;padding:18px 20px">'
    +'<div style="font-size:13px;font-weight:600;color:var(--fg,#1e293b);margin-bottom:12px">Deposits Maturing in Next 30 Days</div>'
    +'<div style="overflow-x:auto">'
    +'<table style="width:100%;border-collapse:collapse">'
    +'<thead><tr style="border-bottom:1px solid var(--border1,#e2e8f0)">'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Account</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Customer</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Product</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Maturity Date</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Principal (EUR)</th>'
    +'<th style="padding:8px 14px;font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--fg2,#64748b);text-align:left;font-weight:600">Interest Due (EUR)</th>'
    +'</tr></thead>'
    +'<tbody>'+maturingRows+'</tbody>'
    +'</table>'
    +'</div>'
    +'</div>'

    +'</div>'; // end outer padding div
}
