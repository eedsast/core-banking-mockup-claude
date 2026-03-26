// decision.js — Decision Engine module
// Loaded lazily by loadDecisionModule() in core_banking.html
// Requires: renderTable(), _I_PENCIL_12, _I_BIN_12, _I_PLUS_14 from core

function renderDecisionContent(containerId, mod, section, title, subtitle) {
  var el = document.getElementById(containerId);
  if (!el) return;
  el.innerHTML =
    '<div class="breadcrumb">' +
      '<span>Home</span><span class="bc-sep">\u203a</span>' +
      '<span>Decision Engine</span><span class="bc-sep">\u203a</span>' +
      '<span class="bc-current">' + title + '</span>' +
    '</div>' +
    buildDecisionSection(mod, section, title, subtitle);
}

function _ds(s) {
  return '<span class="' +
    ((s === 'ACTIVE' || s === 'Active') ? 'fee-status-active' :
     (s === 'INACTIVE' || s === 'Inactive') ? 'fee-status-inactive' : 'badge orange') +
    '">' + s + '</span>';
}

function buildDecisionSection(mod, section, title, subtitle) {

  // ── RULE GROUPS ─────────────────────────────────────────────────────────────
  if (section === 'rule-groups') {
    var rows = [
      { id:12, name:'Consumer Loan Rules',  count:14, active:true,  created:'20.03.2026' },
      { id:11, name:'Mortgage Rules',        count:9,  active:true,  created:'15.03.2026' },
      { id:10, name:'SME Loan Rules',        count:11, active:true,  created:'10.03.2026' },
      { id: 9, name:'Auto Loan Rules',       count:7,  active:true,  created:'01.03.2026' },
      { id: 8, name:'BNPL Rules',            count:5,  active:false, created:'15.02.2026' },
      { id: 7, name:'Overdraft Rules',       count:6,  active:true,  created:'10.02.2026' },
      { id: 6, name:'Card Rules',            count:8,  active:true,  created:'01.02.2026' },
      { id: 5, name:'Fraud Pre-screen',      count:12, active:true,  created:'20.01.2026' },
      { id: 4, name:'Legacy Test Group',     count:3,  active:false, created:'15.01.2026' },
      { id: 3, name:'Demo Group',            count:2,  active:false, created:'01.01.2026' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><strong>' + r.name + '</strong></td>' +
        '<td><span class="badge blue">' + r.count + '</span></td>' +
        '<td>' + _ds(r.active ? 'ACTIVE' : 'INACTIVE') + '</td>' +
        '<td>' + r.created + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Delete</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Rule Groups</div><div class="fee-page-sub">Organise rules into logical groups per product or use-case</div></div>' +
        '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Add Rule Group</button>' +
      '</div>' +
      renderTable(['ID','Name','Rules','Status','Created At','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── IMPORT FROM JSON ────────────────────────────────────────────────────────
  if (section === 'import-json') {
    var history = [
      { id:8, file:'consumer_rules_v4.json', group:'Consumer Loan Rules', rules:14, ts:'20.03.2026 11:42', by:'sstanic',    status:'ACTIVE'   },
      { id:7, file:'mortgage_rules_v2.json', group:'Mortgage Rules',       rules:9,  ts:'15.03.2026 09:18', by:'sstanic',    status:'ACTIVE'   },
      { id:6, file:'sme_rules_draft.json',   group:'SME Loan Rules',       rules:3,  ts:'10.03.2026 14:55', by:'mjovanovic', status:'INACTIVE' },
      { id:5, file:'bnpl_rules_v1.json',     group:'BNPL Rules',           rules:5,  ts:'15.02.2026 10:00', by:'sstanic',    status:'ACTIVE'   },
    ];
    var rowsHtml = history.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><code style="font-size:11px;color:var(--primary)">' + r.file + '</code></td>' +
        '<td>' + r.group + '</td>' +
        '<td><span class="badge blue">' + r.rules + '</span></td>' +
        '<td style="font-size:11.5px">' + r.ts + '</td>' +
        '<td>' + r.by + '</td>' +
        '<td>' + _ds(r.status) + '</td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header"><div>' +
        '<div class="fee-page-title">Import from JSON</div>' +
        '<div class="fee-page-sub">Bulk-import rule definitions from a structured JSON file</div>' +
      '</div></div>' +
      '<div class="table-wrap" style="padding:20px 24px;margin-bottom:20px;">' +
        '<div style="font-size:13px;font-weight:600;color:var(--primary-dark);margin-bottom:12px;">Upload JSON File</div>' +
        '<div style="display:flex;gap:12px;align-items:flex-start;flex-wrap:wrap;">' +
          '<div style="border:2px dashed var(--border);border-radius:8px;padding:20px 32px;text-align:center;color:var(--text-muted);font-size:12.5px;flex:1;min-width:240px;">' +
            '<div style="font-size:28px;margin-bottom:8px;">&#128194;</div>' +
            '<div>Drag &amp; drop your JSON file here, or</div>' +
            '<button class="btn btn-outline" style="margin-top:8px;font-size:12px;">Browse File</button>' +
          '</div>' +
          '<div style="font-size:12px;color:var(--text-muted);max-width:220px;padding-top:6px;">' +
            '<div style="font-weight:600;margin-bottom:6px;color:var(--text-main);">Accepted format</div>' +
            '<div>JSON array of rule objects with: <code>name</code>, <code>condition</code>, <code>action</code>, <code>priority</code>, <code>group_id</code>.</div>' +
          '</div>' +
        '</div>' +
        '<div style="margin-top:14px;display:flex;gap:8px;">' +
          '<select class="fee-form-input" style="font-size:12.5px;padding:7px 10px;max-width:260px;">' +
            '<option>-- Select target Rule Group --</option>' +
            '<option>Consumer Loan Rules</option><option>Mortgage Rules</option><option>SME Loan Rules</option>' +
          '</select>' +
          '<button class="btn btn-primary" style="font-size:12.5px;">Import</button>' +
        '</div>' +
      '</div>' +
      '<div style="font-size:12px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:.04em;padding:0 4px 8px;">Import History</div>' +
      renderTable(['ID','Filename','Rule Group','Rules Imported','Imported At','By','Status'], rowsHtml, history.length) +
    '</div>';
  }

  // ── RULES ───────────────────────────────────────────────────────────────────
  if (section === 'dec-rules') {
    var rows = [
      { id:48, name:'Max DTI Ratio',            group:'Consumer Loan Rules', pri:1, type:'Filter', status:'ACTIVE'   },
      { id:47, name:'Minimum Net Income',        group:'Consumer Loan Rules', pri:2, type:'Filter', status:'ACTIVE'   },
      { id:46, name:'Age Eligibility',           group:'Consumer Loan Rules', pri:3, type:'Filter', status:'ACTIVE'   },
      { id:45, name:'Credit Bureau Score Min',   group:'Consumer Loan Rules', pri:4, type:'Score',  status:'ACTIVE'   },
      { id:44, name:'Existing Loan Obligations', group:'Consumer Loan Rules', pri:5, type:'Score',  status:'ACTIVE'   },
      { id:43, name:'Mortgage LTV Check',        group:'Mortgage Rules',      pri:1, type:'Filter', status:'ACTIVE'   },
      { id:42, name:'Property Valuation Min',    group:'Mortgage Rules',      pri:2, type:'Filter', status:'ACTIVE'   },
      { id:41, name:'Employment Status Check',   group:'SME Loan Rules',      pri:1, type:'Filter', status:'ACTIVE'   },
      { id:40, name:'Business Age Min 2yr',      group:'SME Loan Rules',      pri:2, type:'Filter', status:'ACTIVE'   },
      { id:39, name:'BNPL Soft Check',           group:'BNPL Rules',          pri:1, type:'Score',  status:'INACTIVE' },
      { id:38, name:'Legacy Affordability v1',   group:'Legacy Test Group',   pri:1, type:'Filter', status:'INACTIVE' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><strong>' + r.name + '</strong></td>' +
        '<td><span class="badge blue">' + r.group + '</span></td>' +
        '<td style="text-align:center">' + r.pri + '</td>' +
        '<td><span class="badge ' + (r.type === 'Filter' ? 'orange' : 'green') + '">' + r.type + '</span></td>' +
        '<td>' + _ds(r.status) + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Delete</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Rules</div><div class="fee-page-sub">Define individual scoring and decision rules per group</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<select class="fee-form-input" style="font-size:12px;padding:6px 10px;max-width:200px;">' +
            '<option value="">All Rule Groups</option>' +
            '<option>Consumer Loan Rules</option><option>Mortgage Rules</option><option>SME Loan Rules</option>' +
          '</select>' +
          '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Add Rule</button>' +
        '</div>' +
      '</div>' +
      renderTable(['ID','Name','Group','Priority','Type','Status','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── RULE THRESHOLDS ─────────────────────────────────────────────────────────
  if (section === 'rule-thresholds') {
    var rows = [
      { id:6, name:'Consumer Loan \u2014 Auto Approve', group:'Consumer Loan Rules', sMin:750, sMax:999, out:'APPROVED', status:'ACTIVE'   },
      { id:5, name:'Consumer Loan \u2014 Refer',         group:'Consumer Loan Rules', sMin:600, sMax:749, out:'REFERRED', status:'ACTIVE'   },
      { id:4, name:'Consumer Loan \u2014 Decline',       group:'Consumer Loan Rules', sMin:0,   sMax:599, out:'DECLINED', status:'ACTIVE'   },
      { id:3, name:'Mortgage \u2014 Auto Approve',       group:'Mortgage Rules',      sMin:780, sMax:999, out:'APPROVED', status:'ACTIVE'   },
      { id:2, name:'Mortgage \u2014 Refer',              group:'Mortgage Rules',      sMin:650, sMax:779, out:'REFERRED', status:'ACTIVE'   },
      { id:1, name:'Mortgage \u2014 Decline',            group:'Mortgage Rules',      sMin:0,   sMax:649, out:'DECLINED', status:'INACTIVE' },
    ];
    var oc = { APPROVED:'green', REFERRED:'orange', DECLINED:'red' };
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><strong>' + r.name + '</strong></td>' +
        '<td><span class="badge blue">' + r.group + '</span></td>' +
        '<td>' + r.sMin + '</td><td>' + r.sMax + '</td>' +
        '<td><span class="badge ' + (oc[r.out] || '') + '">' + r.out + '</span></td>' +
        '<td>' + _ds(r.status) + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Delete</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Rule Thresholds</div><div class="fee-page-sub">Set score band thresholds that map to decision outcomes</div></div>' +
        '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Add Threshold</button>' +
      '</div>' +
      renderTable(['ID','Name','Rule Group','Score Min','Score Max','Outcome','Status','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── PROPERTY MAPPINGS ───────────────────────────────────────────────────────
  if (section === 'property-mappings') {
    var rows = [
      { id:22, src:'applicant.monthlyIncome',       prop:'NET_MONTHLY_INCOME',  type:'Decimal', req:true,  status:'ACTIVE'   },
      { id:21, src:'applicant.age',                  prop:'APPLICANT_AGE',        type:'Integer', req:true,  status:'ACTIVE'   },
      { id:20, src:'loan.requestedAmount',           prop:'LOAN_AMOUNT',          type:'Decimal', req:true,  status:'ACTIVE'   },
      { id:19, src:'loan.term',                      prop:'LOAN_TERM_MONTHS',     type:'Integer', req:true,  status:'ACTIVE'   },
      { id:18, src:'credit.bureauScore',             prop:'BUREAU_SCORE',         type:'Integer', req:false, status:'ACTIVE'   },
      { id:17, src:'applicant.employmentStatus',     prop:'EMPLOYMENT_STATUS',    type:'String',  req:true,  status:'ACTIVE'   },
      { id:16, src:'applicant.existingObligations',  prop:'MONTHLY_OBLIGATIONS',  type:'Decimal', req:false, status:'ACTIVE'   },
      { id:15, src:'property.valuationAmount',       prop:'PROPERTY_VALUE',       type:'Decimal', req:false, status:'ACTIVE'   },
      { id:14, src:'applicant.residencyStatus',      prop:'RESIDENCY_STATUS',     type:'String',  req:false, status:'INACTIVE' },
    ];
    var tc = { Decimal:'blue', Integer:'green', String:'orange' };
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><code style="font-size:11px;color:var(--primary)">' + r.src + '</code></td>' +
        '<td><code style="font-size:11px;color:#7b3f00">' + r.prop + '</code></td>' +
        '<td><span class="badge ' + (tc[r.type] || '') + '">' + r.type + '</span></td>' +
        '<td>' + (r.req ? '<span class="badge green">Yes</span>' : '<span style="color:var(--text-muted)">No</span>') + '</td>' +
        '<td>' + _ds(r.status) + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Delete</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Property Mappings</div><div class="fee-page-sub">Map incoming API fields to internal Decision Engine properties</div></div>' +
        '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Add Mapping</button>' +
      '</div>' +
      renderTable(['ID','Source Field','Engine Property','Type','Required','Status','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── OUTCOME CODES ───────────────────────────────────────────────────────────
  if (section === 'outcome-codes') {
    var rows = [
      { id:6, code:'APPROVED',               label:'Approved',               color:'#27ae60', desc:'Application meets all criteria and is auto-approved',  status:'ACTIVE'   },
      { id:5, code:'REFERRED',               label:'Referred',               color:'#d35400', desc:'Application referred for manual underwriter review',    status:'ACTIVE'   },
      { id:4, code:'DECLINED',               label:'Declined',               color:'#c0392b', desc:'Application does not meet minimum criteria',            status:'ACTIVE'   },
      { id:3, code:'CONDITIONALLY_APPROVED', label:'Conditionally Approved', color:'#2980b9', desc:'Approved subject to additional conditions being met',   status:'ACTIVE'   },
      { id:2, code:'PENDING_DOCS',           label:'Pending Documents',      color:'#7f8c8d', desc:'Decision deferred pending required documentation',      status:'ACTIVE'   },
      { id:1, code:'ERROR',                  label:'Error',                  color:'#e74c3c', desc:'Decision could not be completed due to a system error', status:'INACTIVE' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><span style="display:inline-flex;align-items:center;gap:6px;font-weight:700;font-size:11.5px;">' +
          '<span style="width:10px;height:10px;border-radius:50%;background:' + r.color + ';display:inline-block;flex-shrink:0;"></span>' + r.code +
        '</span></td>' +
        '<td>' + r.label + '</td>' +
        '<td style="font-size:12px;color:var(--text-muted);max-width:280px;">' + r.desc + '</td>' +
        '<td>' + _ds(r.status) + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Delete</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Outcome Codes</div><div class="fee-page-sub">Define decision outcome codes returned by the engine</div></div>' +
        '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Add Outcome Code</button>' +
      '</div>' +
      renderTable(['ID','Code','Label','Description','Status','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── EXECUTION LOGS ──────────────────────────────────────────────────────────
  if (section === 'execution-logs') {
    var rows = [
      { id:'EXE-20260321-8843', app:'APP-2026-4423', group:'Consumer Loan Rules', n:14, score:645, out:'REFERRED', dur:'42ms', ts:'21.03.2026 10:15' },
      { id:'EXE-20260321-8842', app:'APP-2026-4422', group:'Mortgage Rules',      n:9,  score:590, out:'DECLINED', dur:'38ms', ts:'21.03.2026 10:08' },
      { id:'EXE-20260321-8841', app:'APP-2026-4421', group:'Consumer Loan Rules', n:14, score:712, out:'APPROVED', dur:'35ms', ts:'21.03.2026 10:02' },
      { id:'EXE-20260321-8840', app:'APP-2026-4420', group:'Mortgage Rules',      n:9,  score:810, out:'APPROVED', dur:'41ms', ts:'21.03.2026 09:54' },
      { id:'EXE-20260321-8839', app:'APP-2026-4419', group:'SME Loan Rules',      n:11, score:622, out:'REFERRED', dur:'55ms', ts:'21.03.2026 09:45' },
      { id:'EXE-20260321-8838', app:'APP-2026-4418', group:'SME Loan Rules',      n:11, score:488, out:'DECLINED', dur:'52ms', ts:'21.03.2026 09:31' },
      { id:'EXE-20260321-8837', app:'APP-2026-4417', group:'Consumer Loan Rules', n:14, score:780, out:'APPROVED', dur:'33ms', ts:'21.03.2026 09:22' },
      { id:'EXE-20260321-8836', app:'APP-2026-4416', group:'Mortgage Rules',      n:9,  score:691, out:'REFERRED', dur:'40ms', ts:'21.03.2026 09:14' },
    ];
    var oc = { APPROVED:'green', REFERRED:'orange', DECLINED:'red' };
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td><code style="font-size:10.5px;color:var(--primary)">' + r.id + '</code></td>' +
        '<td><code style="font-size:11px">' + r.app + '</code></td>' +
        '<td>' + r.group + '</td>' +
        '<td style="text-align:center">' + r.n + '</td>' +
        '<td style="text-align:center;font-weight:700">' + r.score + '</td>' +
        '<td><span class="badge ' + (oc[r.out] || '') + '">' + r.out + '</span></td>' +
        '<td>' + r.dur + '</td>' +
        '<td style="font-size:11.5px;color:var(--text-muted)">' + r.ts + '</td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Execution Logs</div><div class="fee-page-sub">Full log of all rule engine execution events</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<input class="search-input" placeholder="Search by App ID\u2026" style="width:180px;font-size:12px;">' +
          '<select class="fee-form-input" style="font-size:12px;padding:6px 10px;max-width:180px;">' +
            '<option value="">All Outcomes</option>' +
            '<option>APPROVED</option><option>REFERRED</option><option>DECLINED</option>' +
          '</select>' +
        '</div>' +
      '</div>' +
      '<div class="stats-row" style="margin-bottom:16px;">' +
        '<div class="stat-box"><div class="stat-val">2,140</div><div class="stat-lbl">Today\'s Executions</div></div>' +
        '<div class="stat-box"><div class="stat-val" style="color:#27ae60">68.4%</div><div class="stat-lbl">Approved</div></div>' +
        '<div class="stat-box"><div class="stat-val" style="color:#d35400">24.1%</div><div class="stat-lbl">Referred</div></div>' +
        '<div class="stat-box"><div class="stat-val" style="color:#c0392b">7.5%</div><div class="stat-lbl">Declined</div></div>' +
        '<div class="stat-box"><div class="stat-val">41ms</div><div class="stat-lbl">Avg Latency</div></div>' +
      '</div>' +
      renderTable(['Execution ID','Application','Rule Group','Rules Eval.','Score','Outcome','Duration','Timestamp'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── ANALYTICS ───────────────────────────────────────────────────────────────
  if (section === 'analytics') {
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Analytics</div><div class="fee-page-sub">Decision outcomes, approval rates and trend analysis</div></div>' +
        '<select class="fee-form-input" style="font-size:12px;padding:6px 10px;">' +
          '<option>Last 30 days</option><option>Last 7 days</option><option>This month</option>' +
        '</select>' +
      '</div>' +
      '<div class="stats-row" style="margin-bottom:20px;">' +
        '<div class="stat-box"><div class="stat-val">48,420</div><div class="stat-lbl">Total Decisions (30d)</div></div>' +
        '<div class="stat-box"><div class="stat-val" style="color:#27ae60">69.2%</div><div class="stat-lbl">Approval Rate</div></div>' +
        '<div class="stat-box"><div class="stat-val" style="color:#d35400">23.4%</div><div class="stat-lbl">Referral Rate</div></div>' +
        '<div class="stat-box"><div class="stat-val" style="color:#c0392b">7.4%</div><div class="stat-lbl">Decline Rate</div></div>' +
        '<div class="stat-box"><div class="stat-val">688</div><div class="stat-lbl">Avg Score (Approved)</div></div>' +
        '<div class="stat-box"><div class="stat-val">39ms</div><div class="stat-lbl">Avg Latency</div></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px;">' +
        '<div class="table-wrap" style="padding:18px 20px;">' +
          '<div style="font-size:13px;font-weight:700;color:var(--primary-dark);margin-bottom:14px;">Decisions by Rule Group</div>' +
          '<table class="mock-table" style="width:100%"><thead><tr><th>Rule Group</th><th>Decisions</th><th>Approved</th><th>Rate</th></tr></thead><tbody>' +
            '<tr><td>Consumer Loan Rules</td><td>21,840</td><td>15,820</td><td><span class="badge green">72.4%</span></td></tr>' +
            '<tr><td>Mortgage Rules</td><td>8,420</td><td>5,190</td><td><span class="badge green">61.6%</span></td></tr>' +
            '<tr><td>SME Loan Rules</td><td>6,210</td><td>4,010</td><td><span class="badge green">64.6%</span></td></tr>' +
            '<tr><td>Auto Loan Rules</td><td>7,440</td><td>5,620</td><td><span class="badge green">75.5%</span></td></tr>' +
            '<tr><td>Card Rules</td><td>4,510</td><td>2,990</td><td><span class="badge orange">66.3%</span></td></tr>' +
          '</tbody></table>' +
        '</div>' +
        '<div class="table-wrap" style="padding:18px 20px;">' +
          '<div style="font-size:13px;font-weight:700;color:var(--primary-dark);margin-bottom:14px;">Score Distribution</div>' +
          '<table class="mock-table" style="width:100%"><thead><tr><th>Score Band</th><th>Volume</th><th>Outcome</th><th>%</th></tr></thead><tbody>' +
            '<tr><td>750 \u2013 999</td><td>18,400</td><td><span class="badge green">APPROVED</span></td><td>38%</td></tr>' +
            '<tr><td>650 \u2013 749</td><td>15,120</td><td><span class="badge green">APPROVED</span></td><td>31.2%</td></tr>' +
            '<tr><td>600 \u2013 649</td><td>8,240</td><td><span class="badge orange">REFERRED</span></td><td>17%</td></tr>' +
            '<tr><td>500 \u2013 599</td><td>3,080</td><td><span class="badge orange">REFERRED</span></td><td>6.4%</td></tr>' +
            '<tr><td>0 \u2013 499</td><td>3,580</td><td><span class="badge red">DECLINED</span></td><td>7.4%</td></tr>' +
          '</tbody></table>' +
        '</div>' +
      '</div>' +
      '<div class="table-wrap" style="padding:18px 20px;">' +
        '<div style="font-size:13px;font-weight:700;color:var(--primary-dark);margin-bottom:14px;">Top Decline Reasons (last 30 days)</div>' +
        '<table class="mock-table" style="width:100%"><thead><tr><th>Rule</th><th>Triggered</th><th>% of Declines</th></tr></thead><tbody>' +
          '<tr><td>Max DTI Ratio exceeded</td><td>1,240</td><td>44.2%</td></tr>' +
          '<tr><td>Bureau Score below minimum</td><td>820</td><td>29.2%</td></tr>' +
          '<tr><td>Minimum Net Income not met</td><td>480</td><td>17.1%</td></tr>' +
          '<tr><td>Age Eligibility failed</td><td>148</td><td>5.3%</td></tr>' +
          '<tr><td>Employment Status invalid</td><td>112</td><td>4.2%</td></tr>' +
        '</tbody></table>' +
      '</div>' +
    '</div>';
  }

  // ── USERS ───────────────────────────────────────────────────────────────────
  if (section === 'dec-users') {
    var rows = [
      { id:3, user:'sstanic',    name:'Sasa Stanic',     email:'sasa.stanic@gmail.com', role:'Admin',     last:'26.03.2026 09:01', status:'ACTIVE' },
      { id:2, user:'mjovanovic',name:'Mirko Jovanovic',  email:'mjovanovic@bank.rs',     role:'Analyst',   last:'25.03.2026 14:22', status:'ACTIVE' },
      { id:1, user:'dmarkovic', name:'Dragana Markovic', email:'dmarkovic@bank.rs',      role:'Read Only', last:'20.03.2026 11:05', status:'ACTIVE' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><code style="font-size:11px">' + r.user + '</code></td>' +
        '<td>' + r.name + '</td><td>' + r.email + '</td>' +
        '<td><span class="badge ' + (r.role === 'Admin' ? 'blue' : r.role === 'Analyst' ? 'green' : 'orange') + '">' + r.role + '</span></td>' +
        '<td style="font-size:11.5px;color:var(--text-muted)">' + r.last + '</td>' +
        '<td>' + _ds(r.status) + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Delete</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Users</div><div class="fee-page-sub">Manage Decision Engine users and role assignments</div></div>' +
        '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Add User</button>' +
      '</div>' +
      renderTable(['ID','Username','Full Name','Email','Role','Last Login','Status','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── API KEYS ─────────────────────────────────────────────────────────────────
  if (section === 'api-keys') {
    var rows = [
      { id:4, name:'temporal-probe',    key:'sk-live-\u2022\u2022\u2022\u20227f2a', scope:'Read Only',   created:'12.02.2026', used:'26.03.2026', status:'ACTIVE'   },
      { id:3, name:'loan-origination',  key:'sk-live-\u2022\u2022\u2022\u20223c91', scope:'Full Access', created:'01.01.2026', used:'26.03.2026', status:'ACTIVE'   },
      { id:2, name:'analytics-service', key:'sk-live-\u2022\u2022\u2022\u20228b44', scope:'Read Only',   created:'15.12.2025', used:'25.03.2026', status:'ACTIVE'   },
      { id:1, name:'legacy-adapter-v1', key:'sk-live-\u2022\u2022\u2022\u20221d0c', scope:'Full Access', created:'01.11.2025', used:'10.01.2026', status:'INACTIVE' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td>' + r.id + '</td>' +
        '<td><strong>' + r.name + '</strong></td>' +
        '<td><code style="font-size:11px;letter-spacing:.04em">' + r.key + '</code></td>' +
        '<td><span class="badge ' + (r.scope === 'Full Access' ? 'blue' : 'orange') + '">' + r.scope + '</span></td>' +
        '<td style="font-size:11.5px">' + r.created + '</td>' +
        '<td style="font-size:11.5px">' + r.used + '</td>' +
        '<td>' + _ds(r.status) + '</td>' +
        '<td><div class="fee-actions">' +
          '<button class="fee-btn-edit">' + _I_PENCIL_12 + ' Edit</button>' +
          '<button class="fee-btn-delete" style="background:#fde8e8;color:#c0392b;border-color:#f5b7b1;">' + _I_BIN_12 + ' Revoke</button>' +
        '</div></td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">API Keys</div><div class="fee-page-sub">Manage API keys and access scopes for Decision Engine integrations</div></div>' +
        '<button class="btn-create-fee">' + _I_PLUS_14 + ' + Generate API Key</button>' +
      '</div>' +
      renderTable(['ID','Name','Key','Scope','Created','Last Used','Status','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── FALLBACK ──────────────────────────────────────────────────────────────────
  return '<div style="padding:48px 32px;text-align:center;color:var(--text-muted,#6b7a8d);">' +
    '<div style="font-size:36px;margin-bottom:14px;">&#128679;</div>' +
    '<div style="font-size:15px;font-weight:600;margin-bottom:6px;">' + title + '</div>' +
    '<div style="font-size:13px;">This section is under development</div>' +
  '</div>';
}
