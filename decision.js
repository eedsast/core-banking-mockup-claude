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
    var _chk = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#e6f7ee" stroke="#27ae60" stroke-width="1.2"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#27ae60" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var _cross = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#fde8e8" stroke="#e74c3c" stroke-width="1.2"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#e74c3c" stroke-width="1.6" stroke-linecap="round"/></svg>';
    var rows = [
      { id:7, name:'BNPL Credit Scoring',              ver:'1.0.0_copy_2', type:'Scoring',     active:false, rules:6,  locked:false, created:'10 Mar 2026, 9:24 a.m.',  updated:'10 Mar 2026, 9:24 a.m.'  },
      { id:6, name:'BNPL Credit Scoring copy v2 test', ver:'1.0.0',        type:'Scoring',     active:true,  rules:6,  locked:false, created:'10 Mar 2026, 9:23 a.m.',  updated:'10 Mar 2026, 9:23 a.m.'  },
      { id:5, name:'BNPL Advanced Eligibility',        ver:'v1.0',         type:'Elimination', active:true,  rules:3,  locked:false, created:'21 Jan 2026, 2:53 p.m.', updated:'21 Jan 2026, 2:53 p.m.' },
      { id:4, name:'BNPL Basic Eligibility',           ver:'v1.0',         type:'Elimination', active:true,  rules:11, locked:false, created:'21 Jan 2026, 2:53 p.m.', updated:'21 Jan 2026, 2:53 p.m.' },
      { id:3, name:'BNPL Credit Scoring',              ver:'1.0.0_copy',   type:'Scoring',     active:false, rules:6,  locked:false, created:'10 Dec 2025, 2:12 p.m.', updated:'10 Dec 2025, 2:12 p.m.' },
      { id:2, name:'BNPL Credit Scoring',              ver:'1.0.0',        type:'Scoring',     active:true,  rules:6,  locked:true,  created:'10 Dec 2025, 11:34 a.m.',updated:'10 Dec 2025, 11:34 a.m.'},
    ];
    var rowsHtml = rows.map(function(r) {
      var typeBadge = r.type === 'Scoring' ? 'blue' : 'orange';
      var schemaLink = '<span data-action="set-content" data-module="decision" data-section="rule-group-schema" data-title="Schema" data-subtitle="" style="cursor:pointer;color:#185fa5;font-weight:600;font-size:12px;text-decoration:underline;text-underline-offset:2px;">Schema</span>';
      var testLink   = '<span data-action="set-content" data-module="decision" data-section="rule-group-test"   data-title="Test"   data-subtitle="" style="cursor:pointer;color:#27ae60;font-weight:600;font-size:12px;text-decoration:underline;text-underline-offset:2px;margin-left:10px;">Test</span>';
      return '<tr>' +
        '<td style="color:#6a8faf">' + r.id + '</td>' +
        '<td><strong style="color:#1a2e42">' + r.name + '</strong><br><span style="font-size:11px;color:#8aafd4;font-family:monospace">' + r.ver + '</span></td>' +
        '<td><span class="badge ' + typeBadge + '">' + r.type + '</span></td>' +
        '<td style="text-align:center">' + (r.active ? _chk : _cross) + '</td>' +
        '<td style="text-align:center;font-weight:600;color:#2a5080">' + r.rules + '</td>' +
        '<td style="text-align:center">' + (r.locked ? _chk : _cross) + '</td>' +
        '<td style="font-size:11.5px;color:#6a8faf">' + r.created + '</td>' +
        '<td style="font-size:11.5px;color:#6a8faf">' + r.updated + '</td>' +
        '<td>' + schemaLink + testLink + '</td></tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Rule Groups</div><div class="fee-page-sub">Organise rules into logical groups per product or use-case</div></div>' +
        '<button class="btn-create-fee" data-action="set-content" data-module="decision" data-section="rule-groups-add" data-title="Add Rule Group" data-subtitle="">' + _I_PLUS_14 + ' + Add Rule Group</button>' +
      '</div>' +
      renderTable(['ID','Name / Version','Type','Active','Rules','Locked','Created at','Updated at','Actions'], rowsHtml, rows.length) +
    '</div>';
  }

  // ── RULE GROUP — SCHEMA ──────────────────────────────────────────────────────
  if (section === 'rule-group-schema') {
    var props = [
      { name:'credit_report_grade', type:'String',  desc:'CRK credit report grade (A, B, Unknown)',                                          rules:'CREDIT REPORT'        },
      { name:'days_late',           type:'int',     desc:'Number of days late for any instalment (use -1 for no credit history)',             rules:'LOAN REPAYMENTS'      },
      { name:'debt_to_income_ratio',type:'Float',   desc:'Debt to income ratio as percentage',                                               rules:'DEBT TO INCOME RATIO' },
      { name:'employer_assessment', type:'String',  desc:'Employer assessment (Good, Standard, Sub-standard, Poor, No information)',         rules:'EMPLOYER ASSESSMENT'  },
      { name:'monthly_income',      type:'Float',   desc:'Monthly income in EUR',                                                            rules:'INCOME LEVEL'         },
      { name:'years_employed',      type:'Float',   desc:'Years employed with current employer',                                             rules:'EMPLOYMENT STABILITY' },
    ];
    var propsHtml = props.map(function(p) {
      var tc = p.type === 'String' ? 'orange' : p.type === 'int' ? 'blue' : 'green';
      return '<tr>' +
        '<td><code style="font-size:12px;color:#1a5080;background:#e6f0fa;padding:2px 6px;border-radius:4px">' + p.name + '</code></td>' +
        '<td><span class="badge ' + tc + '">' + p.type + '</span></td>' +
        '<td style="font-size:12.5px;color:#3a5570">' + p.desc + '</td>' +
        '<td><code style="font-size:11px;color:#7b3f00;background:#fff3e8;padding:2px 6px;border-radius:4px">' + p.rules + '</code></td></tr>';
    }).join('');
    var exampleJson = JSON.stringify({case_id:99999,subject_data:{credit_report_grade:"",days_late:0,debt_to_income_ratio:0.0,employer_assessment:"",monthly_income:0.0,years_employed:0.0}}, null, 2);
    var schemaJson = JSON.stringify({"$schema":"http://json-schema.org/draft-07/schema#","title":"BNPL Credit Scoring (1.0.0_copy_2)","description":"Credit scoring model for BNPL loans","type":"object","properties":{"case_id":{"type":"integer"},"subject_data":{"type":"object","properties":{"credit_report_grade":{"type":"string","description":"CRK credit report grade (A, B, Unknown)"},"days_late":{"type":"integer","description":"Number of days late for any instalment"},"debt_to_income_ratio":{"type":"number","description":"Debt to income ratio as percentage"},"employer_assessment":{"type":"string","description":"Employer assessment (Good, Standard, Sub-standard, Poor, No information)"},"monthly_income":{"type":"number","description":"Monthly income in EUR"},"years_employed":{"type":"number","description":"Years employed with current employer"}},"required":["credit_report_grade","days_late","debt_to_income_ratio","employer_assessment","monthly_income","years_employed"],"additionalProperties":true}}}, null, 2);
    var backBtn  = '<span data-action="set-content" data-module="decision" data-section="rule-groups" data-title="Rule Groups" data-subtitle="" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;background:#e6f0fa;color:#185fa5;border:1px solid #b8d4f0;border-radius:6px;padding:6px 14px;font-size:12.5px;font-weight:600;margin-right:8px;">\u2190 Back to Rule Groups</span>';
    return '<div class="fee-wrap">' +
      '<div style="margin-bottom:20px">' + backBtn + '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;margin-bottom:20px;">' +
        '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #eef2f6">Rule Group Information</div>' +
        '<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;font-size:12.5px;">' +
          '<div><span style="color:#8aafd4;display:block;margin-bottom:2px">Name</span><strong>BNPL Credit Scoring</strong></div>' +
          '<div><span style="color:#8aafd4;display:block;margin-bottom:2px">Version</span><code style="background:#e6f0fa;color:#185fa5;padding:2px 7px;border-radius:4px">1.0.0_copy_2</code></div>' +
          '<div><span style="color:#8aafd4;display:block;margin-bottom:2px">Description</span>Credit scoring model for BNPL loans</div>' +
          '<div><span style="color:#8aafd4;display:block;margin-bottom:2px">Total Rules</span><strong>6</strong></div>' +
          '<div><span style="color:#8aafd4;display:block;margin-bottom:2px">Total Properties</span><strong>6</strong></div>' +
        '</div>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;margin-bottom:20px;">' +
        '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #eef2f6">Required Properties <span style="font-weight:400;color:#8aafd4;font-size:12px">(' + props.length + ')</span></div>' +
        '<table class="mock-table" style="width:100%"><thead><tr><th>Property Name</th><th>Type</th><th>Description</th><th>Used By Rules</th></tr></thead><tbody>' + propsHtml + '</tbody></table>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;margin-bottom:20px;">' +
        '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid #eef2f6">Optional Properties <span style="font-weight:400;color:#8aafd4;font-size:12px">(0)</span></div>' +
        '<div style="font-size:12.5px;color:#8aafd4;font-style:italic">No optional properties defined.</div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">' +
        '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;">' +
          '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #eef2f6">Example Request</div>' +
          '<div style="font-size:11.5px;color:#6a8faf;margin-bottom:8px">Copy this example JSON to test the rule group. All required properties are included with placeholder values.</div>' +
          '<pre style="background:#0d2035;color:#9fe1cb;border-radius:6px;padding:14px;font-size:11.5px;line-height:1.6;overflow-x:auto;font-family:\'SF Mono\',monospace;margin:0">' + exampleJson + '</pre>' +
        '</div>' +
        '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;">' +
          '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid #eef2f6">JSON Schema <span style="font-weight:400;color:#8aafd4;font-size:11px">(draft-07)</span></div>' +
          '<div style="font-size:11.5px;color:#6a8faf;margin-bottom:8px">Use this schema for validation in your applications.</div>' +
          '<pre style="background:#0d2035;color:#b8cfe0;border-radius:6px;padding:14px;font-size:10.5px;line-height:1.6;overflow:auto;max-height:260px;font-family:\'SF Mono\',monospace;margin:0">' + schemaJson + '</pre>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // ── RULE GROUP — TEST ────────────────────────────────────────────────────────
  if (section === 'rule-group-test') {
    var defaultJson = '{\n  "credit_report_grade": "A",\n  "debt_to_income_ratio": 60.0,\n  "monthly_income": 2000.0\n}';
    var rulesJson = JSON.stringify([{rule_id:"ADV_CRD_GRADE_001",error_code:"GRADE",rule_name:"Credit Report Grade Check",category:"risk",operator:"gte",failure_type:"fund",passed:true,actual_value:"A",expected_values:{allowed_values:["A","B"]},message:"Credit Report Grade A meets requirements",error:null,execution_time_ms:2.7},{rule_id:"ADV_INCOME_001",error_code:"INCOME",rule_name:"Minimum Income Check",category:"affordability",operator:"gte",failure_type:"fund",passed:true,actual_value:2000.0,min_value:240.0,message:"Monthly income 2000.0 meets requirements",error:null,execution_time_ms:1.5},{rule_id:"ADV_DTI_001",error_code:"DTI",rule_name:"Maximum DTI Ratio",category:"affordability",operator:"lte",failure_type:"fund",passed:true,actual_value:60.0,max_value:60.0,message:"Debt-to-Income ratio 60.0% is within maximum 60.0%",error:null,execution_time_ms:1.4}], null, 2);
    var backBtn2 = '<span data-action="set-content" data-module="decision" data-section="rule-groups" data-title="Rule Groups" data-subtitle="" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;background:#e6f0fa;color:#185fa5;border:1px solid #b8d4f0;border-radius:6px;padding:6px 14px;font-size:12.5px;font-weight:600;margin-right:8px;">\u2190 Back to Rule Groups</span>';
    var schemaBtn = '<span data-action="set-content" data-module="decision" data-section="rule-group-schema" data-title="Schema" data-subtitle="" style="cursor:pointer;display:inline-flex;align-items:center;gap:6px;background:#f0eeff;color:#534ab7;border:1px solid #c8c0f0;border-radius:6px;padding:6px 14px;font-size:12.5px;font-weight:600;margin-right:8px;">View Schema</span>';
    return '<div class="fee-wrap">' +
      '<div style="margin-bottom:20px">' + backBtn2 + schemaBtn + '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:14px 20px;margin-bottom:20px;display:flex;gap:32px;align-items:center;font-size:12.5px;">' +
        '<div><span style="color:#8aafd4;margin-right:6px">Name:</span><strong>BNPL Advanced Eligibility</strong></div>' +
        '<div><span style="color:#8aafd4;margin-right:6px">Version:</span><code style="background:#e6f0fa;color:#185fa5;padding:2px 7px;border-radius:4px">v1.0</code></div>' +
        '<div><span style="color:#8aafd4;margin-right:6px">Type:</span><span class="badge orange">Elimination</span></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;align-items:start">' +
        '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;">' +
          '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:10px">Subject Data (JSON)</div>' +
          '<div style="font-size:12px;color:#6a8faf;margin-bottom:8px">Enter the subject data to test this rule group.</div>' +
          '<textarea style="width:100%;height:160px;background:#0d2035;color:#9fe1cb;border:1px solid #1e4a6a;border-radius:6px;padding:12px;font-size:12px;font-family:\'SF Mono\',monospace;line-height:1.6;resize:vertical;outline:none">' + defaultJson + '</textarea>' +
          '<button class="btn-create-fee" data-action="run-test" style="margin-top:10px;width:100%;justify-content:center;background:#0f6e56;border-color:#0a5040">&#9654; Run Test</button>' +
        '</div>' +
        '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:18px 22px;">' +
          '<div style="font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:12px">Results</div>' +
          '<div id="dec-test-placeholder" style="padding:28px 16px;text-align:center;color:#8aafd4;">' +
            '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" style="margin-bottom:10px;opacity:0.5"><circle cx="16" cy="16" r="14" stroke="#8aafd4" stroke-width="1.5"/><path d="M12 16.5l3 3 6-6" stroke="#8aafd4" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '<div style="font-size:13px;font-weight:600;margin-bottom:4px">No results yet</div>' +
            '<div style="font-size:12px">Enter subject data and click <strong>Run Test</strong></div>' +
          '</div>' +
          '<div id="dec-test-results" style="display:none">' +
            '<div style="background:#e6f7ee;border:1.5px solid #27ae60;border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
              '<svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="9" fill="#27ae60"/><path d="M5.5 10l3 3 6-6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
              '<div><div style="font-weight:700;color:#085041;font-size:13px">APPROVED</div><div style="font-size:11.5px;color:#0a6644">Outcome: APPROVED</div></div>' +
            '</div>' +
            '<div style="font-size:12.5px;font-weight:700;color:#1a2e42;margin-bottom:8px">Statistics</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:12.5px;margin-bottom:14px">' +
              '<div style="color:#6a8faf">Rules Executed:</div><div style="font-weight:600">3</div>' +
              '<div style="color:#6a8faf">Rules Passed:</div><div style="font-weight:600;color:#27ae60">3</div>' +
              '<div style="color:#6a8faf">Rules Failed:</div><div style="font-weight:600;color:#e74c3c">0</div>' +
              '<div style="color:#6a8faf">Execution Time:</div><div style="font-weight:600">56.49ms</div>' +
            '</div>' +
            '<details style="border:1px solid #dce8f0;border-radius:6px;overflow:hidden">' +
              '<summary style="cursor:pointer;padding:8px 14px;font-size:12.5px;font-weight:600;color:#1a2e42;background:#f6f9fc;user-select:none">&#9660; View Full JSON Response</summary>' +
              '<pre style="background:#0d2035;color:#b8cfe0;padding:14px;font-size:10.5px;line-height:1.6;overflow:auto;max-height:280px;margin:0;font-family:\'SF Mono\',monospace">' + rulesJson + '</pre>' +
            '</details>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }

  // ── IMPORT FROM JSON ────────────────────────────────────────────────────────
  if (section === 'import-json') {
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header"><div>' +
        '<div class="fee-page-title">Import Rule Groups from JSON</div>' +
        '<div class="fee-page-sub">Import rule group configurations from a JSON export file</div>' +
      '</div></div>' +

      // Instructions panel
      '<div style="background:#f8f9fc;border:1px solid #dce8f0;border-radius:8px;padding:16px 20px;margin-bottom:20px;">' +
        '<div style="font-size:12.5px;color:#3a5570;line-height:1.9;">' +
          '<div>Upload a JSON file containing rule group configuration(s)</div>' +
          '<div>The file must be in the export format (version 1.0)</div>' +
          '<div>You can import a single rule group or multiple rule groups</div>' +
          '<div>Check &ldquo;Overwrite existing&rdquo; to update rule groups with the same name/version</div>' +
          '<div>If overwrite is not checked, import will fail if rule group already exists</div>' +
        '</div>' +
      '</div>' +

      // Form panel
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;padding:22px 24px;">' +

        // File picker
        '<div style="margin-bottom:18px;">' +
          '<label style="display:block;font-size:13px;font-weight:700;color:#1a2e42;margin-bottom:8px;">Select JSON File:</label>' +
          '<input type="file" accept=".json" style="width:100%;padding:8px 12px;border:1px solid #d0dce8;border-radius:6px;font-size:13px;color:#3a5570;background:#fff;cursor:pointer;box-sizing:border-box;" />' +
        '</div>' +

        // Overwrite checkbox
        '<div style="margin-bottom:22px;">' +
          '<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;">' +
            '<input type="checkbox" style="margin-top:2px;width:15px;height:15px;accent-color:#6b4fc8;flex-shrink:0;" />' +
            '<div>' +
              '<div style="font-size:13px;color:#1a2e42;font-weight:500;">Overwrite existing rule groups</div>' +
              '<div style="font-size:11.5px;color:#8aafd4;margin-top:2px;">If checked, existing rule groups with the same name and version will be updated</div>' +
            '</div>' +
          '</label>' +
        '</div>' +

        // Action buttons
        '<div style="display:flex;gap:10px;">' +
          '<button class="btn-create-fee" style="background:#6b4fc8;border-color:#5a3fb0;padding:9px 22px;">Import Rule Groups</button>' +
          '<button style="padding:9px 20px;border:1px solid #c8d8e8;border-radius:6px;background:#6b7280;color:#fff;font-size:13px;font-weight:600;cursor:pointer;">Cancel</button>' +
        '</div>' +

      '</div>' +
    '</div>';
  }

  // ── RULES ───────────────────────────────────────────────────────────────────
  if (section === 'dec-rules') {
    var _chkR  = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#e6f7ee" stroke="#27ae60" stroke-width="1.2"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#27ae60" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var _crossR = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#fde8e8" stroke="#e74c3c" stroke-width="1.2"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="#e74c3c" stroke-width="1.6" stroke-linecap="round"/></svg>';
    var rows = [
      { ruleId:'CRK_CREDIT_REPORT',   err:100000, name:'CRK credit report',   group:'BNPL Credit Scoring (1.0.0_copy_2)',       cat:'Risk',          weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:1, locked:false },
      { ruleId:'LOAN_REPAYMENTS',      err:100000, name:'Loan repayments',     group:'BNPL Credit Scoring (1.0.0_copy_2)',       cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:2, locked:false },
      { ruleId:'INCOME_LEVEL',         err:100000, name:'Income level',        group:'BNPL Credit Scoring (1.0.0_copy_2)',       cat:'Affordability', weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:3, locked:false },
      { ruleId:'DEBT_TO_INCOME_RATIO', err:100000, name:'Debt to income ratio',group:'BNPL Credit Scoring (1.0.0_copy_2)',       cat:'Affordability', weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:4, locked:false },
      { ruleId:'EMPLOYER_ASSESSMENT',  err:100000, name:'Employer assessment', group:'BNPL Credit Scoring (1.0.0_copy_2)',       cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:5, locked:false },
      { ruleId:'EMPLOYMENT_STABILITY', err:100000, name:'Employment stability',group:'BNPL Credit Scoring (1.0.0_copy_2)',       cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:6, locked:false },
      { ruleId:'CRK_CREDIT_REPORT',   err:100000, name:'CRK credit report',   group:'BNPL Credit Scoring copy v2 test (1.0.0)', cat:'Risk',          weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:1, locked:false },
      { ruleId:'LOAN_REPAYMENTS',      err:100000, name:'Loan repayments',     group:'BNPL Credit Scoring copy v2 test (1.0.0)', cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:2, locked:false },
      { ruleId:'INCOME_LEVEL',         err:100000, name:'Income level',        group:'BNPL Credit Scoring copy v2 test (1.0.0)', cat:'Affordability', weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:3, locked:false },
      { ruleId:'DEBT_TO_INCOME_RATIO', err:100000, name:'Debt to income ratio',group:'BNPL Credit Scoring copy v2 test (1.0.0)', cat:'Affordability', weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:4, locked:false },
      { ruleId:'EMPLOYER_ASSESSMENT',  err:100000, name:'Employer assessment', group:'BNPL Credit Scoring copy v2 test (1.0.0)', cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:5, locked:false },
      { ruleId:'EMPLOYMENT_STABILITY', err:100000, name:'Employment stability',group:'BNPL Credit Scoring copy v2 test (1.0.0)', cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:6, locked:false },
      { ruleId:'CRK_CREDIT_REPORT',   err:100000, name:'CRK credit report',   group:'BNPL Advanced Eligibility (v1.0)',          cat:'Risk',          weight:20.0, op:'-', failType:'Hard Fail',                active:true,  order:1, locked:false },
      { ruleId:'LOAN_REPAYMENTS',      err:100000, name:'Loan repayments',     group:'BNPL Advanced Eligibility (v1.0)',          cat:'Risk',          weight:15.0, op:'-', failType:'Hard Fail',                active:true,  order:2, locked:false },
      { ruleId:'INCOME_LEVEL',         err:100000, name:'Income level',        group:'BNPL Advanced Eligibility (v1.0)',          cat:'Affordability', weight:20.0, op:'-', failType:'Hard Fail',                active:true,  order:3, locked:false },
      { ruleId:'CRK_CREDIT_REPORT',   err:100000, name:'CRK credit report',   group:'BNPL Basic Eligibility (v1.0)',             cat:'Risk',          weight:20.0, op:'-', failType:'Hard Fail',                active:true,  order:1, locked:false },
      { ruleId:'LOAN_REPAYMENTS',      err:100000, name:'Loan repayments',     group:'BNPL Basic Eligibility (v1.0)',             cat:'Risk',          weight:15.0, op:'-', failType:'Hard Fail',                active:true,  order:2, locked:false },
      { ruleId:'INCOME_LEVEL',         err:100000, name:'Income level',        group:'BNPL Basic Eligibility (v1.0)',             cat:'Affordability', weight:20.0, op:'-', failType:'Hard Fail',                active:true,  order:3, locked:false },
      { ruleId:'DEBT_TO_INCOME_RATIO', err:100000, name:'Debt to income ratio',group:'BNPL Basic Eligibility (v1.0)',             cat:'Affordability', weight:15.0, op:'-', failType:'Hard Fail',                active:true,  order:4, locked:false },
      { ruleId:'CRK_CREDIT_REPORT',   err:100000, name:'CRK credit report',   group:'BNPL Credit Scoring (1.0.0_copy)',          cat:'Risk',          weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:false, order:1, locked:false },
      { ruleId:'LOAN_REPAYMENTS',      err:100000, name:'Loan repayments',     group:'BNPL Credit Scoring (1.0.0_copy)',          cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:false, order:2, locked:false },
      { ruleId:'INCOME_LEVEL',         err:100000, name:'Income level',        group:'BNPL Credit Scoring (1.0.0_copy)',          cat:'Affordability', weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:false, order:3, locked:false },
      { ruleId:'DEBT_TO_INCOME_RATIO', err:100000, name:'Debt to income ratio',group:'BNPL Credit Scoring (1.0.0_copy)',          cat:'Affordability', weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:false, order:4, locked:false },
      { ruleId:'CRK_CREDIT_REPORT',   err:100000, name:'CRK credit report',   group:'BNPL Credit Scoring (1.0.0)',               cat:'Risk',          weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:1, locked:true  },
      { ruleId:'LOAN_REPAYMENTS',      err:100000, name:'Loan repayments',     group:'BNPL Credit Scoring (1.0.0)',               cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:2, locked:true  },
      { ruleId:'INCOME_LEVEL',         err:100000, name:'Income level',        group:'BNPL Credit Scoring (1.0.0)',               cat:'Affordability', weight:20.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:3, locked:true  },
      { ruleId:'DEBT_TO_INCOME_RATIO', err:100000, name:'Debt to income ratio',group:'BNPL Credit Scoring (1.0.0)',               cat:'Affordability', weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:4, locked:true  },
      { ruleId:'EMPLOYER_ASSESSMENT',  err:100000, name:'Employer assessment', group:'BNPL Credit Scoring (1.0.0)',               cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:5, locked:true  },
      { ruleId:'EMPLOYMENT_STABILITY', err:100000, name:'Employment stability',group:'BNPL Credit Scoring (1.0.0)',               cat:'Risk',          weight:15.0, op:'-', failType:'Soft Fail - Warning Only', active:true,  order:6, locked:true  },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td style="width:18px;text-align:center"><input type="checkbox" style="accent-color:#6b4fc8"/></td>' +
        '<td><code style="font-size:11.5px;color:#1a5080;background:#e6f0fa;padding:2px 6px;border-radius:4px;white-space:nowrap">' + r.ruleId + '</code></td>' +
        '<td style="text-align:center;color:#6a8faf;font-size:12px">' + r.err + '</td>' +
        '<td style="color:#1a2e42">' + r.name + '</td>' +
        '<td style="font-size:12px;color:#3a5570">' + r.group + '</td>' +
        '<td><span class="badge ' + (r.cat==='Risk'?'orange':'blue') + '" style="font-size:11px">' + r.cat + '</span></td>' +
        '<td style="text-align:right;font-weight:600;color:#2a5080;padding-right:14px">' + r.weight + '</td>' +
        '<td style="text-align:center;color:#6a8faf">' + r.op + '</td>' +
        '<td style="font-size:12px;color:#3a5570">' + r.failType + '</td>' +
        '<td style="text-align:center">' + (r.active ? _chkR : _crossR) + '</td>' +
        '<td style="text-align:center;font-weight:600;color:#2a5080">' + r.order + '</td>' +
        '<td style="text-align:center">' + (r.locked ? _chkR : _crossR) + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Rules</div><div class="fee-page-sub">Define individual scoring and decision rules per group</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<input class="fee-form-input" placeholder="Type to search..." style="font-size:12px;padding:6px 10px;width:200px;"/>' +
          '<button class="btn-create-fee" data-action="set-content" data-module="decision" data-section="dec-rules-add" data-title="Add Rule" data-subtitle="">' + _I_PLUS_14 + ' Add Rule</button>' +
        '</div>' +
      '</div>' +
      '<div class="table-wrap" style="overflow-x:auto;">' +
        '<table class="mock-table" style="width:100%;min-width:1000px">' +
          '<thead><tr>' +
            '<th style="width:18px"></th>' +
            '<th>Rule id</th>' +
            '<th>Error code</th>' +
            '<th>Name</th>' +
            '<th>Rule group</th>' +
            '<th>Category</th>' +
            '<th style="text-align:right">Pondered weight</th>' +
            '<th style="text-align:center">Operator</th>' +
            '<th>Failure type</th>' +
            '<th style="text-align:center">Active</th>' +
            '<th style="text-align:center">Order</th>' +
            '<th style="text-align:center">Locked</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '<div style="padding:10px 16px;font-size:12px;color:#8aafd4;border-top:1px solid #eef2f6">38 rules</div>' +
      '</div>' +
    '</div>';
  }

  // ── RULE THRESHOLDS ─────────────────────────────────────────────────────────
  if (section === 'rule-thresholds') {
    var _lk  = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="4" y="7" width="8" height="7" rx="1.5" fill="none" stroke="#e74c3c" stroke-width="1.4"/><path d="M5.5 7V5.5a2.5 2.5 0 015 0V7" stroke="#e74c3c" stroke-width="1.4" stroke-linecap="round"/></svg>';
    var _lkO = '<svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="4" y="7" width="8" height="7" rx="1.5" fill="none" stroke="#27ae60" stroke-width="1.4"/><path d="M5.5 7V5a2.5 2.5 0 015 0" stroke="#27ae60" stroke-width="1.4" stroke-linecap="round"/></svg>';
    var _xRed = '<span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:#fde8e8;border:1.5px solid #e74c3c;border-radius:4px;color:#e74c3c;font-size:13px;font-weight:700;line-height:1">×</span>';
    var rows = [
      { rule:'ADV_CRK_GRADE_001 — CRK Grade Check',      key:'allowed_values', val:'["A", "L"]',          vtype:'List (JSON)', locked:false },
      { rule:'ADV_INCOME_001 — Minimum Income Check',     key:'min_value',      val:'250',                 vtype:'Float',       locked:false },
      { rule:'ADV_DTI_001 — Maximum DTI Ratio',           key:'max_value',      val:'50',                  vtype:'Float',       locked:false },
      { rule:'BASIC_AGE_001 — Age Range Check',           key:'max_value',      val:'64',                  vtype:'Integer',     locked:false },
      { rule:'BASIC_AGE_001 — Age Range Check',           key:'min_value',      val:'22',                  vtype:'Integer',     locked:false },
      { rule:'BASIC_ENTITY_001 — Entity Check',           key:'expected_value', val:'2',                   vtype:'Integer',     locked:false },
      { rule:'BASIC_MERCHANT_001 — Not Merchant Check',   key:'expected_value', val:'false',               vtype:'Boolean',     locked:false },
      { rule:'BASIC_SUSPENDED_001 — Account Not Suspended', key:'expected_value', val:'false',             vtype:'Boolean',     locked:false },
      { rule:'BASIC_STATE_001 — Account Active State',    key:'expected_value', val:'A',                   vtype:'String',      locked:false },
      { rule:'ADV_EMPLOYMENT_001 — Employment Stability', key:'min_months',     val:'6',                   vtype:'Integer',     locked:false },
      { rule:'ADV_EMPLOYER_001 — Employer Assessment',    key:'allowed_types',  val:'["permanent","contract"]', vtype:'List (JSON)', locked:false },
      { rule:'SCORING_CRK_001 — CRK Credit Report',      key:'min_value',      val:'600',                 vtype:'Float',       locked:false },
      { rule:'SCORING_INCOME_001 — Income Level',         key:'min_value',      val:'1500',                vtype:'Float',       locked:false },
      { rule:'SCORING_DTI_001 — DTI Ratio Score',         key:'max_value',      val:'45',                  vtype:'Float',       locked:false },
      { rule:'SCORING_REPAYMENT_001 — Loan Repayments',   key:'max_missed',     val:'0',                   vtype:'Integer',     locked:false },
    ];
    var vtypeColor = { 'List (JSON)':'blue', 'Float':'green', 'Integer':'orange', 'Boolean':'purple', 'String':'gray' };
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td style="width:18px;text-align:center"><input type="checkbox" style="accent-color:#6b4fc8"/></td>' +
        '<td style="font-size:13px;color:#1a2e42">' + r.rule + '</td>' +
        '<td><code style="font-size:12px;color:#3a5570;background:#f0f4ff;padding:2px 6px;border-radius:4px">' + r.key + '</code></td>' +
        '<td style="font-size:13px;color:#3a5570">' + r.val + '</td>' +
        '<td><span class="badge ' + (vtypeColor[r.vtype]||'') + '" style="font-size:11px">' + r.vtype + '</span></td>' +
        '<td style="text-align:center">' + _xRed + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Rule Thresholds</div><div class="fee-page-sub">Configure threshold values for individual rule evaluation</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<input class="fee-form-input" placeholder="Type to search..." style="font-size:12px;padding:6px 10px;width:200px;"/>' +
          '<button class="btn-create-fee" data-action="set-content" data-module="decision" data-section="rule-thresholds-add" data-title="Add Rule Threshold" data-subtitle="">' + _I_PLUS_14 + ' Add Rule Threshold</button>' +
        '</div>' +
      '</div>' +
      '<div class="table-wrap" style="overflow-x:auto;">' +
        '<table class="mock-table" style="width:100%;min-width:800px">' +
          '<thead><tr>' +
            '<th style="width:18px"></th>' +
            '<th>Rule ⊕⊗ 1</th>' +
            '<th>Threshold key ⊕⊗ 2</th>' +
            '<th>Threshold value</th>' +
            '<th>Value type</th>' +
            '<th>Locked</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '<div style="padding:10px 16px;font-size:12px;color:#8aafd4;border-top:1px solid #eef2f6">15 rule thresholds</div>' +
      '</div>' +
    '</div>';
  }

  // ── PROPERTY MAPPINGS ───────────────────────────────────────────────────────
  if (section === 'property-mappings') {
    var _chkG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#e6f7ee" stroke="#27ae60" stroke-width="1.2"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#27ae60" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var _xRed = '<span style="display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;background:#fde8e8;border:1.5px solid #e74c3c;border-radius:4px;color:#e74c3c;font-size:13px;font-weight:700;line-height:1">×</span>';
    var rows = [
      { rule:'CRK_CREDIT_REPORT - CRK credit report',       prop:'credit_report_grade',  type:'String',  req:true  },
      { rule:'LOAN_REPAYMENTS - Loan repayments',            prop:'days_late',             type:'Integer', req:true  },
      { rule:'INCOME_LEVEL - Income level',                  prop:'monthly_income',        type:'Float',   req:true  },
      { rule:'DEBT_TO_INCOME_RATIO - Debt to income ratio',  prop:'debt_to_income_ratio',  type:'Float',   req:true  },
      { rule:'EMPLOYER_ASSESSMENT - Employer assessment',    prop:'employer_assessment',   type:'String',  req:true  },
      { rule:'EMPLOYMENT_STABILITY - Employment stability',  prop:'years_employed',        type:'Float',   req:true  },
      { rule:'CRK_CREDIT_REPORT - CRK credit report',       prop:'credit_report_grade',   type:'String',  req:true  },
      { rule:'LOAN_REPAYMENTS - Loan repayments',            prop:'days_late',             type:'Integer', req:true  },
      { rule:'INCOME_LEVEL - Income level',                  prop:'monthly_income',        type:'Float',   req:true  },
      { rule:'DEBT_TO_INCOME_RATIO - Debt to income ratio',  prop:'debt_to_income_ratio',  type:'Float',   req:true  },
      { rule:'EMPLOYER_ASSESSMENT - Employer assessment',    prop:'employer_assessment',   type:'String',  req:true  },
      { rule:'EMPLOYMENT_STABILITY - Employment stability',  prop:'years_employed',        type:'Float',   req:true  },
      { rule:'CRK_CREDIT_REPORT - CRK credit report',       prop:'is_account_active',     type:'Boolean', req:false },
      { rule:'LOAN_REPAYMENTS - Loan repayments',            prop:'account_type',          type:'String',  req:false },
      { rule:'INCOME_LEVEL - Income level',                  prop:'net_income',            type:'Float',   req:true  },
    ];
    var typeColor = { 'String':'blue', 'Integer':'green', 'Float':'orange', 'Boolean':'purple' };
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td style="width:18px;text-align:center"><input type="checkbox" style="accent-color:#6b4fc8"/></td>' +
        '<td style="font-size:13px;color:#1a2e42">' + r.rule + '</td>' +
        '<td><code style="font-size:12px;color:#3a5570;background:#f0f4ff;padding:2px 6px;border-radius:4px">' + r.prop + '</code></td>' +
        '<td style="font-size:13px;color:#3a5570">' + r.type + '</td>' +
        '<td style="text-align:center">' + (r.req ? _chkG : _xRed) + '</td>' +
        '<td style="text-align:center">' + _xRed + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Property Mappings</div><div class="fee-page-sub">Map incoming API fields to internal Decision Engine properties</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<input class="fee-form-input" placeholder="Type to search..." style="font-size:12px;padding:6px 10px;width:200px;"/>' +
          '<button class="btn-create-fee" data-action="set-content" data-module="decision" data-section="property-mappings-add" data-title="Add Property Mapping" data-subtitle="">' + _I_PLUS_14 + ' Add Property Mapping</button>' +
        '</div>' +
      '</div>' +
      '<div class="table-wrap" style="overflow-x:auto;">' +
        '<table class="mock-table" style="width:100%;min-width:700px">' +
          '<thead><tr>' +
            '<th style="width:18px"></th>' +
            '<th>Rule \u2295\u2297 1</th>' +
            '<th>Property name \u2295\u2297 2</th>' +
            '<th>Property type</th>' +
            '<th style="text-align:center">Required</th>' +
            '<th style="text-align:center">Locked</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '<div style="padding:10px 16px;font-size:12px;color:#8aafd4;border-top:1px solid #eef2f6">38 property mappings</div>' +
      '</div>' +
    '</div>';
  }

  // ── OUTCOME CODES ───────────────────────────────────────────────────────────
  if (section === 'outcome-codes') {
    var _chkG2 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#e6f7ee" stroke="#27ae60" stroke-width="1.2"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#27ae60" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var rows = [
      { code:'APPROVED', dtype:'-', desc:'Application approved', created:'Dec. 10, 2025, 11:34\u00a0a.m.' },
      { code:'DECLINED', dtype:'-', desc:'Application declined', created:'Dec. 10, 2025, 11:34\u00a0a.m.' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td style="width:18px;text-align:center"><input type="checkbox" style="accent-color:#6b4fc8"/></td>' +
        '<td style="font-size:13px;font-weight:700;color:#1a2e42">' + r.code + '</td>' +
        '<td style="font-size:13px;color:#6a8faf">' + r.dtype + '</td>' +
        '<td style="font-size:13px;color:#3a5570">' + r.desc + '</td>' +
        '<td style="font-size:12.5px;color:#6a8faf">' + r.created + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Outcome Codes</div><div class="fee-page-sub">Define decision outcome codes returned by the engine</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<input class="fee-form-input" placeholder="Type to search..." style="font-size:12px;padding:6px 10px;width:200px;"/>' +
          '<button class="btn-create-fee" data-action="set-content" data-module="decision" data-section="outcome-codes-add" data-title="Add Outcome Code" data-subtitle="">' + _I_PLUS_14 + ' Add Outcome Code</button>' +
        '</div>' +
      '</div>' +
      '<div class="table-wrap" style="overflow-x:auto;">' +
        '<table class="mock-table" style="width:100%">' +
          '<thead><tr>' +
            '<th style="width:18px"></th>' +
            '<th>Code \u2295\u2297 2</th>' +
            '<th>Decision type \u2295\u2297 1</th>' +
            '<th>Description</th>' +
            '<th>Created at</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '<div style="padding:10px 16px;font-size:12px;color:#8aafd4;border-top:1px solid #eef2f6">2 outcome codes</div>' +
      '</div>' +
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
    var _chkG3 = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#e6f7ee" stroke="#27ae60" stroke-width="1.2"/><path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#27ae60" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var rows = [
      { uname:'admin', email:'admin@onefor.com', fname:'-', lname:'-', staff:true, active:true, joined:'Dec. 10, 2025, 11:34\u00a0a.m.' },
    ];
    var rowsHtml = rows.map(function(r) {
      return '<tr>' +
        '<td style="width:18px;text-align:center"><input type="checkbox" style="accent-color:#6b4fc8"/></td>' +
        '<td style="font-size:13px;font-weight:600;color:#1a2e42">' + r.uname + '</td>' +
        '<td style="font-size:13px;color:#3a5570">' + r.email + '</td>' +
        '<td style="font-size:13px;color:#6a8faf">' + r.fname + '</td>' +
        '<td style="font-size:13px;color:#6a8faf">' + r.lname + '</td>' +
        '<td style="text-align:center">' + (r.staff ? _chkG3 : '') + '</td>' +
        '<td style="text-align:center">' + (r.active ? _chkG3 : '') + '</td>' +
        '<td style="font-size:12.5px;color:#6a8faf">' + r.joined + '</td>' +
        '</tr>';
    }).join('');
    return '<div class="fee-wrap">' +
      '<div class="fee-page-header">' +
        '<div><div class="fee-page-title">Users</div><div class="fee-page-sub">Manage Decision Engine users and access</div></div>' +
        '<div style="display:flex;gap:8px;align-items:center;">' +
          '<input class="fee-form-input" placeholder="Type to search..." style="font-size:12px;padding:6px 10px;width:200px;"/>' +
          '<button class="btn-create-fee" data-action="set-content" data-module="decision" data-section="dec-users-add" data-title="Add User" data-subtitle="">' + _I_PLUS_14 + ' Add User</button>' +
        '</div>' +
      '</div>' +
      '<div class="table-wrap" style="overflow-x:auto;">' +
        '<table class="mock-table" style="width:100%">' +
          '<thead><tr>' +
            '<th style="width:18px"></th>' +
            '<th>Username</th>' +
            '<th>Email address</th>' +
            '<th>First name</th>' +
            '<th>Last name</th>' +
            '<th style="text-align:center">Staff status</th>' +
            '<th style="text-align:center">Active</th>' +
            '<th>Date joined \u2295\u2297</th>' +
          '</tr></thead>' +
          '<tbody>' + rowsHtml + '</tbody>' +
        '</table>' +
        '<div style="padding:10px 16px;font-size:12px;color:#8aafd4;border-top:1px solid #eef2f6">1 user</div>' +
      '</div>' +
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


  // ── ADD RULE GROUP ──────────────────────────────────────────────────────────
  if (section === 'rule-groups-add') {
    var _backBtn = '<button data-action="set-content" data-module="decision" data-section="rule-groups" data-title="Rule Groups" data-subtitle="" style="display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:#6b4fc8;font-size:13px;font-weight:600;padding:0;margin-right:8px">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 12L6 8l4-4"/></svg>' +
    '</button>';
    var _fRow = function(label, req, inputHtml, help) {
      return '<div style="margin-bottom:20px">' +
        '<label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">' + label + (req ? ' <span style="color:#e74c3c">*</span>' : '') + '</label>' +
        inputHtml +
        (help ? '<div style="font-size:12px;color:#8aafd4;margin-top:5px">' + help + '</div>' : '') +
      '</div>';
    };
    var _inp = function(id, ph) { return '<input type="text" id="' + id + '" placeholder="' + ph + '" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">'; };
    var _ta  = function(id) { return '<textarea id="' + id + '" rows="5" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>'; };
    var _sel = function(id, opts) {
      return '<select id="' + id + '" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">' +
        opts.map(function(o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
    };
    var _tog = function(id, lbl, help) {
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">' +
        '<label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">' +
          '<input type="checkbox" id="' + id + '" checked style="opacity:0;width:0;height:0;position:absolute">' +
          '<span style="position:absolute;top:0;left:0;right:0;bottom:0;background:#27ae60;border-radius:12px;transition:.2s"></span>' +
          '<span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:.2s"></span>' +
        '</label>' +
        '<span style="font-size:13px;font-weight:600;color:#1a2e42">' + lbl + '</span>' +
      '</div>' +
      '<div style="font-size:12px;color:#8aafd4">' + help + '</div>';
    };
    var _secHdr = function(lbl) {
      return '</div>' +
        '<div style="background:#f5f7fa;border-top:1px solid #e8eef5;border-bottom:1px solid #e8eef5;padding:10px 28px;margin:0 -28px">' +
          '<span style="font-size:13px;font-weight:700;color:#3a5570">' + lbl + '</span>' +
        '</div>' +
        '<div style="padding:24px 28px 8px">';
    };
    var _actBar =
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:16px 28px;border-top:1px solid #e8eef5;background:#fafbfc">' +
        '<button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and add another</button>' +
        '<button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and continue editing</button>' +
        '<button style="padding:8px 16px;border:none;border-radius:4px;background:#5b3fc4;font-size:13px;color:#fff;font-weight:600;cursor:pointer">Save</button>' +
      '</div>';

    return '<div class="fee-wrap" style="max-width:860px">' +
      '<div style="display:flex;align-items:center;padding:0 0 18px 0;border-bottom:1px solid #e8eef5;margin-bottom:24px">' +
        _backBtn +
        '<span style="font-size:12px;color:#6a8faf">Engine</span>' +
        '<span style="font-size:12px;color:#6a8faf;margin:0 6px">›</span>' +
        '<span style="font-size:12px;font-weight:600;color:#1a2e42">Rule groups</span>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;overflow:hidden">' +
        '<div style="padding:24px 28px 8px">' +
          _fRow('Name', true, _inp('rg-name', "Rule group name (e.g., 'BNPL', 'Personal Loan')"), 'Rule group name (e.g., \'BNPL\', \'Personal Loan\')') +
          _fRow('Version', true, _inp('rg-version', "Version identifier (e.g., '2025-10-01', 'v1.3.0')"), 'Version identifier (e.g., \'2025-10-01\', \'v1.3.0\')') +
          _fRow('Description', false, _ta('rg-desc'), 'Description of this rule group') +
          _fRow('Rule group type', true, _sel('rg-type', ['Elimination', 'Scoring']), 'Evaluation type: elimination or scoring') +
          _tog('rg-active', 'Active', 'Whether this rule group is active') +
          _secHdr('Credit Scoring Configuration') +
          '<p style="font-size:12px;color:#8aafd4;margin:0 0 16px">Only applicable when rule_group_type is &quot;scoring&quot;</p>' +
          _fRow('Min credit score', false, _inp('rg-minscore', ''), 'Minimum credit score required for approval (0-100, scoring only)') +
        '</div>' +
        _actBar +
      '</div>' +
    '</div>';
  }

  // ── ADD RULE ─────────────────────────────────────────────────────────────────
  if (section === 'dec-rules-add') {
    var _backBtn2 = '<button data-action="set-content" data-module="decision" data-section="dec-rules" data-title="Rules" data-subtitle="" style="display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:#6b4fc8;font-size:13px;font-weight:600;padding:0;margin-right:8px">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 12L6 8l4-4"/></svg>' +
    '</button>';
    var _fRow2 = function(label, req, inputHtml, help) {
      return '<div style="margin-bottom:20px">' +
        '<label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">' + label + (req ? ' <span style="color:#e74c3c">*</span>' : '') + '</label>' +
        inputHtml +
        (help ? '<div style="font-size:12px;color:#8aafd4;margin-top:5px">' + help + '</div>' : '') +
      '</div>';
    };
    var _inp2 = function(id, ph, val) { return '<input type="text" id="' + id + '" placeholder="' + ph + '" value="' + (val||'') + '" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">'; };
    var _sel2 = function(id, opts, def) {
      return '<select id="' + id + '" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">' +
        opts.map(function(o) { return '<option' + (o===def?' selected':'') + '>' + o + '</option>'; }).join('') + '</select>';
    };
    var _selWithBtns = function(id, placeholder) {
      return '<div style="display:flex;align-items:center;gap:6px">' +
        '<select id="' + id + '" style="flex:1;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">' +
          '<option value="">' + placeholder + '</option>' +
        '</select>' +
        '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf">' +
          '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg>' +
        '</button>' +
        '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf">' +
          '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>' +
        '</button>' +
        '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf">' +
          '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="5" r=".5" fill="currentColor"/><path d="M7 7v3"/></svg>' +
        '</button>' +
      '</div>';
    };
    var _tog2 = function(id, lbl, help) {
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">' +
        '<label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">' +
          '<input type="checkbox" id="' + id + '" checked style="opacity:0;width:0;height:0;position:absolute">' +
          '<span style="position:absolute;top:0;left:0;right:0;bottom:0;background:#27ae60;border-radius:12px"></span>' +
          '<span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>' +
        '</label>' +
        '<span style="font-size:13px;font-weight:600;color:#1a2e42">' + lbl + '</span>' +
      '</div>' +
      '<div style="font-size:12px;color:#8aafd4">' + help + '</div>';
    };
    var _secHdr2 = function(lbl) {
      return '</div>' +
        '<div style="background:#f5f7fa;border-top:1px solid #e8eef5;border-bottom:1px solid #e8eef5;padding:10px 28px;margin:0 -28px">' +
          '<span style="font-size:13px;font-weight:700;color:#3a5570">' + lbl + '</span>' +
        '</div>' +
        '<div style="padding:24px 28px 8px">';
    };
    var _actBar2 =
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:16px 28px;border-top:1px solid #e8eef5;background:#fafbfc">' +
        '<button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and add another</button>' +
        '<button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and continue editing</button>' +
        '<button style="padding:8px 16px;border:none;border-radius:4px;background:#5b3fc4;font-size:13px;color:#fff;font-weight:600;cursor:pointer">Save</button>' +
      '</div>';

    return '<div class="fee-wrap" style="max-width:860px">' +
      '<div style="display:flex;align-items:center;padding:0 0 18px 0;border-bottom:1px solid #e8eef5;margin-bottom:24px">' +
        _backBtn2 +
        '<span style="font-size:12px;color:#6a8faf">Engine</span>' +
        '<span style="font-size:12px;color:#6a8faf;margin:0 6px">›</span>' +
        '<span style="font-size:12px;font-weight:600;color:#1a2e42">Rules</span>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;overflow:hidden">' +
        '<div style="padding:24px 28px 8px">' +
          _fRow2('Rule group', true, _selWithBtns('ra-rulegroup', 'Select value'), 'Rule group this rule belongs to') +
          _fRow2('Rule id', true, _inp2('ra-ruleid', "Unique code identifier for this rule (e.g., 'AGE_RANGE2', 'INCOME_MIN')"), "Unique code identifier for this rule (e.g., 'AGE_RANGE2', 'INCOME_MIN')") +
          _fRow2('Error code', true, _inp2('ra-errcode', '', '100000'), '5-digit error code for this rule (100000-999999)') +
          _fRow2('Name', true, _inp2('ra-name', 'Human-readable rule name'), 'Human-readable rule name') +
          _fRow2('Category', true, _sel2('ra-cat', ['Other', 'Risk', 'Affordability', 'Identity', 'Compliance'], 'Other'), 'Category of this rule') +
          _secHdr2('Configuration') +
          '<p style="font-size:12px;color:#8aafd4;margin:0 0 16px">Boolean Mode: Single operator for this rule</p>' +
          _fRow2('Operator', false, _sel2('ra-op', ['Select value', 'EQUALS', 'NOT_EQUALS', 'GREATER_THAN', 'LESS_THAN', 'IN', 'NOT_IN', 'BETWEEN'], 'Select value'), 'Operator to use for evaluation (elimination rules only, scoring uses per-threshold operators)') +
          _fRow2('Failure type', true, _sel2('ra-failtype', ['Hard Fail - Blocks Approval', 'Soft Fail - Warning Only'], 'Hard Fail - Blocks Approval'), 'Whether this rule blocks approval (hard) or is a warning (soft)') +
          _fRow2('Order', true, _inp2('ra-order', '', '0'), 'Execution order (lower numbers execute first)') +
          _tog2('ra-active', 'Active', 'Whether the rule is active') +
          _secHdr2('Message') +
          _fRow2('Message template', false,
            '<textarea id="ra-msg" rows="4" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>',
            'Message template for rule result (can use {variables})') +
          '<div style="background:#f5f7fa;border:1px solid #e8eef5;border-radius:4px;padding:10px 14px;cursor:pointer;margin-bottom:16px">' +
            '<span style="font-size:13px;font-weight:600;color:#3a5570">Timestamps</span>' +
            '<span style="font-size:12px;color:#8aafd4;margin-left:8px">(Show)</span>' +
          '</div>' +
        '</div>' +
        _actBar2 +
      '</div>' +
    '</div>';
  }

  // ── ADD RULE THRESHOLD ────────────────────────────────────────────────────────
  if (section === 'rule-thresholds-add') {
    var _backBtn3 = '<button data-action="set-content" data-module="decision" data-section="rule-thresholds" data-title="Rule Thresholds" data-subtitle="" style="display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:#6b4fc8;font-size:13px;font-weight:600;padding:0;margin-right:8px">' +
      '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 12L6 8l4-4"/></svg>' +
    '</button>';
    var _fRow3 = function(label, req, inputHtml, help) {
      return '<div style="margin-bottom:20px">' +
        '<label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">' + label + (req ? ' <span style="color:#e74c3c">*</span>' : '') + '</label>' +
        inputHtml +
        (help ? '<div style="font-size:12px;color:#8aafd4;margin-top:5px">' + help + '</div>' : '') +
      '</div>';
    };
    var _inp3 = function(id, ph) { return '<input type="text" id="' + id + '" placeholder="' + ph + '" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">'; };
    var _sel3 = function(id, opts) {
      return '<select id="' + id + '" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">' +
        opts.map(function(o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
    };
    var _selWithBtns3 = function(id) {
      return '<div style="display:flex;align-items:center;gap:6px">' +
        '<select id="' + id + '" style="flex:1;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">' +
          '<option value="">Select value</option>' +
        '</select>' +
        '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf">' +
          '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg>' +
        '</button>' +
        '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf">' +
          '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg>' +
        '</button>' +
        '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf">' +
          '<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="5" r=".5" fill="currentColor"/><path d="M7 7v3"/></svg>' +
        '</button>' +
      '</div>';
    };
    var _tog3 = function(id, lbl, help) {
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px">' +
        '<label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer">' +
          '<input type="checkbox" id="' + id + '" style="opacity:0;width:0;height:0;position:absolute">' +
          '<span style="position:absolute;top:0;left:0;right:0;bottom:0;background:#ccc;border-radius:12px"></span>' +
          '<span style="position:absolute;top:2px;left:2px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span>' +
        '</label>' +
        '<span style="font-size:13px;font-weight:600;color:#1a2e42">' + lbl + '</span>' +
      '</div>' +
      '<div style="font-size:12px;color:#8aafd4">' + help + '</div>';
    };
    var _actBar3 =
      '<div style="display:flex;justify-content:flex-end;gap:8px;padding:16px 28px;border-top:1px solid #e8eef5;background:#fafbfc">' +
        '<button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and add another</button>' +
        '<button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and continue editing</button>' +
        '<button style="padding:8px 16px;border:none;border-radius:4px;background:#5b3fc4;font-size:13px;color:#fff;font-weight:600;cursor:pointer">Save</button>' +
      '</div>';

    return '<div class="fee-wrap" style="max-width:860px">' +
      '<div style="display:flex;align-items:center;padding:0 0 18px 0;border-bottom:1px solid #e8eef5;margin-bottom:24px">' +
        _backBtn3 +
        '<span style="font-size:12px;color:#6a8faf">Engine</span>' +
        '<span style="font-size:12px;color:#6a8faf;margin:0 6px">›</span>' +
        '<span style="font-size:12px;font-weight:600;color:#1a2e42">Rule thresholds</span>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;overflow:hidden">' +
        '<div style="padding:24px 28px 8px">' +
          _fRow3('Rule', true, _selWithBtns3('rta-rule'), 'Rule this threshold belongs to') +
          _fRow3('Threshold key', true, _inp3('rta-key', "Threshold key (e.g., 'min_age', 'max_concurrent_bnpl')"), "Threshold key (e.g., 'min_age', 'max_concurrent_bnpl')") +
          _fRow3('Threshold value', true,
            '<textarea id="rta-val" rows="6" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>',
            'Threshold value (stored as text, cast based on value_type)') +
          _fRow3('Value type', true, _sel3('rta-vtype', ['Float', 'Integer', 'Boolean', 'String', 'List (JSON)']), 'Data type of the threshold value') +
          _tog3('rta-locked', 'Locked', 'Whether this threshold is locked from editing') +
          '<div style="margin-top:20px"></div>' +
        '</div>' +
        _actBar3 +
      '</div>' +
    '</div>';
  }


  // ── ADD PROPERTY MAPPING ────────────────────────────────────────────────────
  if (section === 'property-mappings-add') {
    var _b = '<button data-action="set-content" data-module="decision" data-section="property-mappings" data-title="Property Mappings" data-subtitle="" style="display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:#6b4fc8;font-size:13px;font-weight:600;padding:0;margin-right:8px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 12L6 8l4-4"/></svg></button>';
    var _fR = function(l,r,h,help){return '<div style="margin-bottom:20px"><label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">'+l+(r?' <span style="color:#e74c3c">*</span>':'')+' </label>'+h+(help?'<div style="font-size:12px;color:#8aafd4;margin-top:5px">'+help+'</div>':'')+'</div>';};
    var _i = function(id,ph){return '<input type="text" id="'+id+'" placeholder="'+ph+'" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">';};
    var _s = function(id,opts){return '<select id="'+id+'" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">'+opts.map(function(o){return '<option>'+o+'</option>';}).join('')+'</select>';};
    var _sb = function(id){return '<div style="display:flex;align-items:center;gap:6px"><select id="'+id+'" style="flex:1;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff"><option value="">Select value</option></select><button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2.5l2 2-7.5 7.5H2v-2z"/><path d="M8 4l2 2"/></svg></button><button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg></button><button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="7" cy="7" r="5"/><circle cx="7" cy="5" r=".5" fill="currentColor"/><path d="M7 7v3"/></svg></button></div>';};
    var _tg = function(id,l,help){return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:4px"><label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer"><input type="checkbox" id="'+id+'" checked style="opacity:0;width:0;height:0;position:absolute"><span style="position:absolute;top:0;left:0;right:0;bottom:0;background:#27ae60;border-radius:12px"></span><span style="position:absolute;top:2px;left:22px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span></label><span style="font-size:13px;font-weight:600;color:#1a2e42">'+l+'</span></div><div style="font-size:12px;color:#8aafd4">'+help+'</div>';};
    var _sh = function(l){return '</div><div style="background:#f5f7fa;border-top:1px solid #e8eef5;border-bottom:1px solid #e8eef5;padding:10px 28px;margin:0 -28px"><span style="font-size:13px;font-weight:700;color:#3a5570">'+l+'</span></div><div style="padding:24px 28px 8px">';};
    var _ab = '<div style="display:flex;justify-content:flex-end;gap:8px;padding:16px 28px;border-top:1px solid #e8eef5;background:#fafbfc"><button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and add another</button><button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and continue editing</button><button style="padding:8px 16px;border:none;border-radius:4px;background:#5b3fc4;font-size:13px;color:#fff;font-weight:600;cursor:pointer">Save</button></div>';
    return '<div class="fee-wrap" style="max-width:860px">' +
      '<div style="display:flex;align-items:center;padding:0 0 18px;border-bottom:1px solid #e8eef5;margin-bottom:24px">' + _b +
        '<span style="font-size:12px;color:#6a8faf">Engine</span><span style="font-size:12px;color:#6a8faf;margin:0 6px">›</span><span style="font-size:12px;font-weight:600;color:#1a2e42">Property mappings</span>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;overflow:hidden">' +
        '<div style="padding:24px 28px 8px">' +
          _fR('Rule', true, _sb('pma-rule'), 'Rule this property mapping belongs to') +
          _fR('Property name', true, _i('pma-name', "Property name expected in the request (e.g., 'age', 'income', 'is_account')"), "Property name expected in the request (e.g., 'age', 'income', 'is_account')") +
          _fR('Property type', true, _s('pma-type', ['Integer', 'Float', 'String', 'Boolean', 'List (JSON)']), 'Expected data type of this property') +
          _tg('pma-req', 'Required', 'Whether this property is required in the request') +
          _sh('Validation') +
          _fR('Validation rules', false,
            '<textarea id="pma-val" rows="2" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff">{}</textarea>',
            'Optional JSON validation rules<br><span style="font-size:11px;line-height:1.8">• minimum: {&quot;min&quot;: 0, &quot;max&quot;: 100}<br>• maximum: {&quot;min&quot;: 0, &quot;max&quot;: 100}<br>• enum: [&quot;active&quot;, &quot;inactive&quot;]<br>• minLength/maxLength: {&quot;minLength&quot;: 2, &quot;maxLength&quot;: 50}</span>') +
          _fR('Default value', false,
            '<textarea id="pma-def" rows="4" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>',
            'Default value if property is not provided (optional)') +
          _fR('Description', false,
            '<textarea id="pma-desc" rows="4" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>',
            'Description of this property') +
        '</div>' +
        _ab +
      '</div>' +
    '</div>';
  }

  // ── ADD OUTCOME CODE ─────────────────────────────────────────────────────────
  if (section === 'outcome-codes-add') {
    var _bOC = '<button data-action="set-content" data-module="decision" data-section="outcome-codes" data-title="Outcome Codes" data-subtitle="" style="display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:#6b4fc8;font-size:13px;font-weight:600;padding:0;margin-right:8px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 12L6 8l4-4"/></svg></button>';
    var _fROC = function(l,r,h,help){return '<div style="margin-bottom:20px"><label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">'+l+(r?' <span style="color:#e74c3c">*</span>':'')+' </label>'+h+(help?'<div style="font-size:12px;color:#8aafd4;margin-top:5px">'+help+'</div>':'')+'</div>';};
    var _iOC = function(id,ph){return '<input type="text" id="'+id+'" placeholder="'+ph+'" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">';};
    var _sOC = function(id,opts,def){return '<select id="'+id+'" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">'+opts.map(function(o){return '<option'+(o===def?' selected':'')+'>'+o+'</option>';}).join('')+'</select>';};
    var _abOC = '<div style="display:flex;justify-content:flex-end;gap:8px;padding:16px 28px;border-top:1px solid #e8eef5;background:#fafbfc"><button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and add another</button><button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and continue editing</button><button style="padding:8px 16px;border:none;border-radius:4px;background:#5b3fc4;font-size:13px;color:#fff;font-weight:600;cursor:pointer">Save</button></div>';
    return '<div class="fee-wrap" style="max-width:860px">' +
      '<div style="display:flex;align-items:center;padding:0 0 18px;border-bottom:1px solid #e8eef5;margin-bottom:24px">' + _bOC +
        '<span style="font-size:12px;color:#6a8faf">Engine</span><span style="font-size:12px;color:#6a8faf;margin:0 6px">›</span><span style="font-size:12px;font-weight:600;color:#1a2e42">Outcome codes</span>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;overflow:hidden">' +
        '<div style="padding:24px 28px 8px">' +
          _fROC('Code', true, _iOC('oca-code', "Outcome code (e.g., 'APPROVED', 'DECLINED_RULES_FAILED')"), "Outcome code (e.g., 'APPROVED', 'DECLINED_RULES_FAILED')") +
          _fROC('Decision type', true, _sOC('oca-dtype', ['Approved', 'Declined', 'Referred', 'Pending', 'Error'], 'Approved'), 'Type of decision this outcome represents') +
          _fROC('Description', true,
            '<textarea id="oca-desc" rows="7" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>',
            'Description of this outcome') +
          '<div style="background:#f5f7fa;border:1px solid #e8eef5;border-radius:4px;padding:10px 14px;cursor:pointer;margin-bottom:16px">' +
            '<span style="font-size:13px;font-weight:600;color:#3a5570">Metadata</span>' +
            '<span style="font-size:12px;color:#8aafd4;margin-left:8px">(Show)</span>' +
          '</div>' +
        '</div>' +
        _abOC +
      '</div>' +
    '</div>';
  }

  // ── ADD USER ─────────────────────────────────────────────────────────────────
  if (section === 'dec-users-add') {
    var _bU = '<button data-action="set-content" data-module="decision" data-section="dec-users" data-title="Users" data-subtitle="" style="display:inline-flex;align-items:center;gap:5px;background:none;border:none;cursor:pointer;color:#6b4fc8;font-size:13px;font-weight:600;padding:0;margin-right:8px"><svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 12L6 8l4-4"/></svg></button>';
    var _fRU = function(l,r,h,help){return '<div style="margin-bottom:20px"><label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">'+l+(r?' <span style="color:#e74c3c">*</span>':'')+' </label>'+h+(help?'<div style="font-size:12px;color:#8aafd4;margin-top:5px">'+help+'</div>':'')+'</div>';};
    var _iU = function(id,ph,t){return '<input type="'+(t||'text')+'" id="'+id+'" placeholder="'+(ph||'')+'" style="width:100%;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;background:#fff">';};
    var _tgU = function(id,l,checked,help){return '<div style="margin-bottom:12px"><div style="display:flex;align-items:center;gap:10px;margin-bottom:4px"><label style="position:relative;display:inline-block;width:44px;height:24px;cursor:pointer"><input type="checkbox" id="'+id+'"'+(checked?' checked':'')+' style="opacity:0;width:0;height:0;position:absolute"><span style="position:absolute;top:0;left:0;right:0;bottom:0;background:'+(checked?'#27ae60':'#ccc')+';border-radius:12px"></span><span style="position:absolute;top:2px;left:'+(checked?'22':'2')+'px;width:20px;height:20px;background:#fff;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,.2)"></span></label><span style="font-size:13px;font-weight:600;color:#1a2e42">'+l+'</span></div><div style="font-size:12px;color:#8aafd4">'+help+'</div></div>';};
    var _shU = function(l){return '<div style="background:#f5f7fa;border:1px solid #e8eef5;border-radius:4px;padding:10px 16px;margin-bottom:20px"><span style="font-size:13px;font-weight:700;color:#3a5570">'+l+'</span></div>';};
    var _abU = '<div style="display:flex;justify-content:flex-end;gap:8px;padding:16px 28px;border-top:1px solid #e8eef5;background:#fafbfc"><button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and add another</button><button style="padding:8px 16px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;font-size:13px;color:#3a5570;cursor:pointer">Save and continue editing</button><button style="padding:8px 16px;border:none;border-radius:4px;background:#5b3fc4;font-size:13px;color:#fff;font-weight:600;cursor:pointer">Save</button></div>';
    var _permsList = ['admin | log entry | Can add log entry','admin | log entry | Can change log entry','admin | log entry | Can delete log entry','admin | log entry | Can view log entry'];
    return '<div class="fee-wrap" style="max-width:860px">' +
      '<div style="display:flex;align-items:center;padding:0 0 18px;border-bottom:1px solid #e8eef5;margin-bottom:24px">' + _bU +
        '<span style="font-size:12px;color:#6a8faf">Engine</span><span style="font-size:12px;color:#6a8faf;margin:0 6px">›</span><span style="font-size:12px;font-weight:600;color:#1a2e42">Users</span>' +
      '</div>' +
      '<div style="background:#fff;border:1px solid #dce8f0;border-radius:8px;overflow:hidden">' +
        '<div style="padding:24px 28px 8px">' +
          _shU('Account') +
          _fRU('Username', true, _iU('ua-uname',''), 'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.') +
          _fRU('Password', true, _iU('ua-pwd','','password'), '') +
          _shU('Personal Info') +
          _fRU('First name', false, _iU('ua-fname',''), '') +
          _fRU('Last name', false, _iU('ua-lname',''), '') +
          _fRU('Email address', false, _iU('ua-email','','email'), '') +
          _shU('Permissions') +
          _tgU('ua-active', 'Active', true, 'Designates whether this user should be treated as active. Unselect this instead of deleting accounts.') +
          _tgU('ua-staff', 'Staff status', false, 'Designates whether the user can log into this admin site.') +
          _tgU('ua-super', 'Superuser status', false, 'Designates that this user has all permissions without explicitly assigning them.') +
          '<div style="margin-bottom:20px">' +
            '<label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">Groups</label>' +
            '<div style="display:flex;align-items:flex-start;gap:6px">' +
              '<textarea id="ua-groups" rows="4" style="flex:1;box-sizing:border-box;padding:8px 12px;border:1px solid #d1dbe8;border-radius:4px;font-size:13px;color:#1a2e42;resize:vertical;background:#fff"></textarea>' +
              '<button style="width:30px;height:34px;border:1px solid #d1dbe8;border-radius:4px;background:#fff;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;color:#6a8faf"><svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M7 2v10M2 7h10"/></svg></button>' +
            '</div>' +
            '<div style="font-size:12px;color:#8aafd4;margin-top:5px">The groups this user belongs to. Hold down &quot;Control&quot;, or &quot;Command&quot; on a Mac, to select more than one.</div>' +
          '</div>' +
          '<div style="margin-bottom:20px">' +
            '<label style="display:block;font-size:13px;font-weight:600;color:#1a2e42;margin-bottom:6px">User permissions</label>' +
            '<select id="ua-perms" multiple size="5" style="width:100%;box-sizing:border-box;padding:4px;border:1px solid #d1dbe8;border-radius:4px;font-size:12px;color:#1a2e42;background:#fff">' +
              _permsList.map(function(p){return '<option>'+p+'</option>';}).join('') +
            '</select>' +
            '<div style="font-size:12px;color:#8aafd4;margin-top:5px">Specific permissions for this user. Hold down &quot;Control&quot;, or &quot;Command&quot; on a Mac, to select more than one.</div>' +
          '</div>' +
          '<div style="background:#f5f7fa;border:1px solid #e8eef5;border-radius:4px;padding:10px 14px;cursor:pointer;margin-bottom:16px">' +
            '<span style="font-size:13px;font-weight:600;color:#3a5570">Important Dates</span>' +
            '<span style="font-size:12px;color:#8aafd4;margin-left:8px">(Show)</span>' +
          '</div>' +
        '</div>' +
        _abU +
      '</div>' +
    '</div>';
  }

  // ── FALLBACK ──────────────────────────────────────────────────────────────────
  return '<div style="padding:48px 32px;text-align:center;color:var(--text-muted,#6b7a8d);">' +
    '<div style="font-size:36px;margin-bottom:14px;">&#128679;</div>' +
    '<div style="font-size:15px;font-weight:600;margin-bottom:6px;">' + title + '</div>' +
    '<div style="font-size:13px;">This section is under development</div>' +
  '</div>';
}
