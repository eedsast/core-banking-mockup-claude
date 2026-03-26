// admin.js — Administration module
// Loaded lazily by loadAdminModule() in core_banking.html
// Requires: esc(), renderTable(), SELF_HEADED_SECTIONS from core

// Also requires: renderFormCard(), admField(), feeSection(), feeField(), feeRow()
// (defined as global form utilities in core_banking.html)


function renderAdminContent(containerId, mod, section, title, subtitle) {
  // Admin tab sections (language, currency, etc.) use renderAdminTabs
  var ADMIN_TAB_SECTIONS = new Set(['language','location','currency','rounding','fiscal','periodclose']);
  if (ADMIN_TAB_SECTIONS.has(section)) { renderAdminTabs(containerId); return; }

  const el = document.getElementById(containerId);
  const selfHeaded = typeof SELF_HEADED_SECTIONS !== 'undefined' && SELF_HEADED_SECTIONS.has(section);
  el.innerHTML = (
    '<div class="breadcrumb">' +
      '<span>Home</span><span class="bc-sep">›</span>' +
      '<span>Administration</span><span class="bc-sep">›</span>' +
      '<span class="bc-current">' + title + '</span>' +
    '</div>' +
    (selfHeaded ? '' : '<div class="content-title">' + title + '</div>' +
      '<div class="content-subtitle">' + subtitle + '</div>') +
    buildAdminSection(mod, section, title)
  );
}

function buildAdminSection(mod, section, title) {
if (section === 'fees') {
  const feeRows = [
    { id: 12, name: 'Origination Fee',       scope: 'Loan Product', trigger: 'Up Front',       freq: '-',       basis: 'Loan Amount',  method: 'Percentage', status: 'Active',   created: '18.03.2026' },
    { id: 11, name: 'Early Repayment Fee',    scope: 'Loan Product', trigger: 'Per Event',      freq: '-',       basis: 'Outstanding',  method: 'Percentage', status: 'Active',   created: '18.03.2026' },
    { id: 10, name: 'Restructuring Fee',      scope: 'Loan Product', trigger: 'Per Event',      freq: '-',       basis: 'Loan Amount',  method: 'Fixed',      status: 'Active',   created: '17.03.2026' },
    { id: 7,  name: 'Disbursement Fee',       scope: 'Loan Product', trigger: 'Up Front',       freq: '-',       basis: 'Loan Amount',  method: 'Fixed',      status: 'Inactive', created: '16.03.2026' },
    { id: 5,  name: 'Per instalment fee',     scope: 'Loan Product', trigger: 'Up Front',       freq: '-',       basis: 'Loan Amount',  method: 'Percentage', status: 'Active',   created: '16.03.2026' },
    { id: 4,  name: '100 bucks fee',          scope: 'Loan Product', trigger: 'Per Instalment', freq: '-',       basis: 'Loan Amount',  method: 'Fixed',      status: 'Active',   created: '16.03.2026' },
  ];
  const rowsHtml = feeRows.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.scope}</td>
      <td>${r.trigger}</td>
      <td>${r.freq}</td>
      <td>${r.basis}</td>
      <td>${r.method}</td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td>${r.created}</td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit"
            data-action="open-fee-form"
            data-module="${mod}"
            data-id="${r.id}"
            data-name="${r.name}"
            data-scope="${r.scope}"
            data-trigger="${r.trigger}"
            data-basis="${r.basis}"
            data-method="${r.method}"
            data-status="${r.status}"
            data-created="${r.created}">
            ${_I_PENCIL_12}
            Edit
          </button>
          <button class="fee-btn-delete">
            ${_I_BIN_12}
            Delete
          </button>
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div>
        <div class="fee-page-title">Fee Definitions</div>
        <div class="fee-page-sub">Manage fee definitions</div>
      </div>
      <button class="btn-create-fee" data-action="open-fee-form" data-module="loans">
        ${_I_PLUS_14}
        Create Fee Definition
      </button>
    </div>
    ${renderTable(['ID', 'Name', 'Scope', 'Trigger', 'Frequency', 'Basis', 'Method', 'Status', 'Created At', 'Actions'], rowsHtml, feeRows.length)}
    </div>`;
}

// ── ORGANISATION MANAGEMENT ─────────────────────────────────────────────────
if (section === 'organisation') {
  const view = window._orgView || 'list';
  const orgs = MOCK_ORGS;
  const selId = window._orgSelected || orgs[0].id;
  const selOrg = orgs.find(o => o.id === selId) || orgs[0];

  if (view === 'detail') {
    return `
      <div class="adm-wrap">
        <div class="adm-detail-header">
          <div class="adm-detail-nav">
            <button class="adm-btn-back" data-action="org-back">
              ${_I_BACK_14B}
            </button>
            <div>
              <div class="adm-page-title">Organisation Details</div>
              <div class="adm-page-sub">View organisation information and manage branches</div>
            </div>
          </div>
          <button class="adm-btn-outline-purple" data-action="org-edit">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 2l3 3-9 9H2v-3L11 2z"/></svg>
            Edit Organisation
          </button>
        </div>
        <div class="adm-detail-card">
          <div class="adm-detail-card-title">Organisation Details</div>
          <div class="adm-detail-grid">
            <div class="adm-detail-field"><div class="adm-detail-label">Name</div><div class="adm-detail-value">${selOrg.name}</div></div>
            <div class="adm-detail-field"><div class="adm-detail-label">External ID</div><div class="adm-detail-value">${selOrg.extId}</div></div>
            <div class="adm-detail-field"><div class="adm-detail-label">Status</div><div class="adm-detail-value"><span class="adm-badge-active">ACTIVE</span></div></div>
            <div class="adm-detail-field"><div class="adm-detail-label">Active Branches</div><div class="adm-detail-value">0</div></div>
            <div class="adm-detail-field"><div class="adm-detail-label">Created At</div><div class="adm-detail-value">${selOrg.created}</div></div>
            <div class="adm-detail-field"><div class="adm-detail-label">Updated At</div><div class="adm-detail-value">${selOrg.updated}</div></div>
          </div>
        </div>
        <div class="adm-section-hdr">
          <div>
            <div class="adm-section-title">Branches</div>
            <div class="adm-section-sub">Manage branches for this organisation</div>
          </div>
          <button class="adm-btn-create" data-action="org-show-add-branch">
            ${_I_PLUS_12}
            Add Branch
          </button>
        </div>
        <div class="adm-table-card" style="margin-top:10px;">
          <div class="pg-table-scroll">
            <table class="adm-table">
              <thead><tr><th>Branch Name</th><th>Branch Code</th><th>City</th><th>Country</th><th>Postal Code</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                <tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted);font-size:.82rem;">No branches found for this organisation.</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  if (view === 'add-branch') {
    return `
      <div class="adm-wrap">
        <div class="adm-detail-header">
          <div class="adm-detail-nav">
            <button class="adm-btn-back" data-action="org-detail-back">
              ${_I_BACK_14B}
            </button>
            <div>
              <div class="adm-page-title">Add Branch</div>
              <div class="adm-page-sub">Configure branch settings for ${esc(selOrg.name)}</div>
            </div>
          </div>
          <div style="display:flex;gap:10px;">
            <button class="adm-btn-cancel" data-action="org-detail-back">Cancel</button>
            <button class="adm-btn-save" data-action="org-save-branch">
              ${_I_CHECK_13}
              Save
            </button>
          </div>
        </div>
        ${renderFormCard('Branch Details',
          admField('Branch Name', '<input class="adm-form-input" placeholder="e.g. Head Office" />') +
          admField('Branch Code', '<input class="adm-form-input" placeholder="e.g. HQ, BR001" />') +
          admField('Status', '<select class="adm-form-select"><option>Active</option><option>Inactive</option></select>') +
          admField('City',   '<input class="adm-form-input" placeholder="e.g. London" />') +
          admField('Country Code', '<input class="adm-form-input" placeholder="e.g. GB" />') +
          admField('Postal Code',  '<input class="adm-form-input" placeholder="e.g. 10000" />')
        )}
      </div>`;
  }

  // Default: list view
  const orgRows = orgs.map(o => `
    <tr>
      <td class="adm-id-cell" title="${o.id}">${o.id}</td>
      <td style="font-weight:500">${o.name}</td>
      <td>${o.extId}</td>
      <td><span class="adm-badge-active">ACTIVE</span></td>
      <td>${o.branches}</td>
      <td>${o.created}</td>
      <td>${o.updated}</td>
      <td style="white-space:nowrap">
        <button class="adm-btn-edit" data-action="org-edit-row" data-id="${o.id}">
          ${_I_PENCIL_11}Edit
        </button>
        <button class="adm-btn-details" data-action="org-detail" data-id="${o.id}">
          <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="8" cy="8" r="3"/><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z"/></svg>Details
        </button>
        <button class="adm-btn-delete" data-action="org-delete" data-id="${o.id}">
          ${_I_BIN_11}Delete
        </button>
      </td>
    </tr>`).join('');
  return `
    <div class="adm-wrap">
      <div class="adm-page-header">
        <div class="adm-page-header-left">
          <div class="adm-page-title">Organizations</div>
          <div class="adm-page-sub">Manage organizations and their branches</div>
        </div>
        <button class="adm-btn-create" data-action="org-create">
          ${_I_PLUS_12}
          Add Organization
        </button>
      </div>
      ${renderTable(['ID','Name','External ID','Status','Active Branches','Created At','Updated At','Actions'], orgRows, null, {variant:'adm'})}
    </div>`;
}

// ── USER MANAGEMENT ───────────────────────────────────────────────────────────
if (section === 'users') {
  const uView = window._usersView || 'list';
  const users = MOCK_USERS;
  const selName = window._userSelected || users[0].name;
  const selUser = users.find(u => u.name === selName) || users[0];

  const badgeU = s => s === 'ACTIVE'
    ? `<span class="adm-badge-active">ACTIVE</span>`
    : `<span class="adm-badge-suspended">SUSPENDED</span>`;

  if (uView === 'edit' || uView === 'create') {
    const isCreate = uView === 'create';
    const u = isCreate ? { name:'', email:'', status:'ACTIVE', createdTs:'-' } : selUser;
    const roleAssignments = isCreate ? [] : [{ org:'OneFor LLC2', branch:'Head', role:'AuditorUnique' }];
    const raRows = roleAssignments.map(r => `
      <tr>
        <td>${r.org}</td><td>${r.branch}</td><td>${r.role}</td>
        <td><button class="adm-btn-delete">
          ${_I_BIN_11}Delete
        </button></td>
      </tr>`).join('') || `<tr><td colspan="4" style="text-align:center;padding:16px;color:var(--text-muted);font-size:.82rem;">No role assignments yet.</td></tr>`;
    return `
      <div class="adm-wrap">
        <div class="adm-detail-header">
          <div class="adm-detail-nav">
            <button class="adm-btn-back" data-action="users-back">
              ${_I_BACK_14B}
            </button>
            <div>
              <div class="adm-page-title">User</div>
              <div class="adm-page-sub">Configure user settings</div>
            </div>
          </div>
          <button class="adm-btn-save" data-action="users-save">
            ${_I_CHECK_13}
            Save
          </button>
        </div>
        \${renderFormCard('User Details',
          admField('Full Name',
            '<input class="adm-form-input" placeholder="Enter full name" value="' + esc(u.name) + '" />',
            "Enter the user's full name") +
          admField('Email',
            '<input class="adm-form-input" placeholder="Enter email address" value="' + esc(u.email) + '" />',
            'Enter a valid email address') +
          admField('Status',
            '<select class="adm-form-select">' +
              '<option ' + (u.status==='ACTIVE'?'selected':'') + '>Active</option>' +
              '<option ' + (u.status==='SUSPENDED'?'selected':'') + '>Suspended</option>' +
              '<option ' + (u.status==='INACTIVE'?'selected':'') + '>Inactive</option>' +
            '</select>',
            "Set the user's account status")
        , {cols:2})}
        ${!isCreate ? `
        <div class="adm-form-card">
          <div class="adm-form-title">Role Assignments</div>
          <div class="adm-page-sub" style="margin-bottom:14px;margin-top:-8px;">Map the user to roles per organization/branch. Branch can be empty for org-wide roles.</div>
          <div class="adm-ras-row">
            <div class="adm-ras-field">
              <label class="adm-ras-label">Organization</label>
              <select class="adm-form-select"><option>Select an item</option><option>OneFor LLC2</option><option>OneFive</option><option>Clinim Org</option></select>
            </div>
            <div class="adm-ras-field">
              <label class="adm-ras-label">Branch</label>
              <select class="adm-form-select"><option>Select an item</option><option>Head</option><option>Main</option></select>
            </div>
            <div class="adm-ras-field">
              <label class="adm-ras-label">Role</label>
              <select class="adm-form-select"><option>Select an item</option><option>AuditorUnique</option><option>SystemAdmin</option><option>OrgAdmin</option><option>BranchManager</option></select>
            </div>
            <button class="adm-btn-assign">Assign Roles</button>
          </div>
          ${renderTable(['Organization','Branch','Role','Actions'], raRows, null, {variant:'adm', wrapStyle:'margin:0;'})}
        </div>
        <div class="adm-audit-card">
          <div class="adm-audit-title">Audit Trail (read-only)</div>
          <div class="adm-audit-grid">
            <div class="adm-audit-field"><div class="adm-audit-label">Created At</div><div class="adm-audit-input">${u.createdTs}</div></div>
            <div class="adm-audit-field"><div class="adm-audit-label">Created By</div><div class="adm-audit-input">-</div></div>
            <div class="adm-audit-field"><div class="adm-audit-label">Updated At</div><div class="adm-audit-input">-</div></div>
            <div class="adm-audit-field"><div class="adm-audit-label">Updated By</div><div class="adm-audit-input">-</div></div>
            <div class="adm-audit-field"><div class="adm-audit-label">Deleted At</div><div class="adm-audit-input">-</div></div>
            <div class="adm-audit-field"><div class="adm-audit-label">Deleted By</div><div class="adm-audit-input">-</div></div>
          </div>
        </div>` : ''}
      </div>`;
  }

  // List view
  const userRows = users.map(u => `
    <tr>
      <td style="font-weight:500">${u.name}</td>
      <td>${u.email}</td>
      <td>${badgeU(u.status)}</td>
      <td>${u.created}</td>
      <td>${u.updated}</td>
      <td style="white-space:nowrap">
        <button class="adm-btn-edit" data-action="users-edit" data-name="${u.name}">
          ${_I_PENCIL_11}Edit
        </button>
        <button class="adm-btn-delete" data-action="users-delete" data-name="${u.name}">
          ${_I_BIN_11}Delete
        </button>
      </td>
    </tr>`).join('');
  return `
    <div class="adm-wrap">
      <div class="adm-page-header">
        <div class="adm-page-header-left">
          <div class="adm-page-title">Users</div>
          <div class="adm-page-sub">Manage system users and access controls</div>
        </div>
        <button class="adm-btn-create" data-action="users-create">
          ${_I_PLUS_12}
          Create User
        </button>
      </div>
      ${renderTable(['Name','Email','Status','Created','Updated','Actions'], userRows, users.length, {variant:'adm'})}
    </div>`;
}

// ── ROLE ASSIGNMENTS (Admin) ──────────────────────────────────────────────────
if (section === 'role-assignments') {
  const assignments = MOCK_ROLE_ASSIGNMENTS;
  const scopeRow = assignments.map(a => `
    <tr>
      <td style="font-weight:500">${a.user}</td>
      <td>${a.email}</td>
      <td>${a.org}</td>
      <td>${a.branch}</td>
      <td><span class="adm-builtin-yes" style="background:#ede9fe;color:#6d28d9;">${a.role}</span></td>
      <td style="white-space:nowrap">
        <button class="adm-btn-delete">
          ${_I_BIN_11}Revoke
        </button>
      </td>
    </tr>`).join('');
  return `
    <div class="adm-wrap">
      <div class="adm-page-header">
        <div class="adm-page-header-left">
          <div class="adm-page-title">Role Assignments</div>
          <div class="adm-page-sub">Assign roles to users across organisations and branches</div>
        </div>
      </div>
      <div class="adm-form-card">
        <div class="adm-form-title">Assign Role</div>
        <div class="adm-ras-row">
          <div class="adm-ras-field">
            <label class="adm-ras-label">User</label>
            <select class="adm-form-select"><option>Select an item</option><option>qwe</option><option>Atdhetar Special</option><option>Acme Adminnnn</option><option>Globex Manager</option></select>
          </div>
          <div class="adm-ras-field">
            <label class="adm-ras-label">Organization</label>
            <select class="adm-form-select"><option>Select an item</option><option>OneFive</option><option>Clinim Org</option><option>OneFor LLC2</option><option>OneFor LLC</option></select>
          </div>
          <div class="adm-ras-field">
            <label class="adm-ras-label">Branch</label>
            <select class="adm-form-select"><option>Select an item</option><option>Head</option><option>Main</option></select>
          </div>
          <div class="adm-ras-field">
            <label class="adm-ras-label">Role</label>
            <select class="adm-form-select"><option>Select an item</option><option>SystemAdmin</option><option>OrgAdmin</option><option>BranchManager</option><option>Auditor</option><option>AuditorUnique</option></select>
          </div>
          <button class="adm-btn-assign" style="align-self:flex-end">Assign Role</button>
        </div>
      </div>
      ${renderTable(['User', 'Email', 'Organisation', 'Branch', 'Role', 'Actions'], rowsHtml, assignments.length, {variant:'adm'})}
      </div>
    </div>`;
}


// ── SERVICE MANAGEMENT ──────────────────────────────────────────────────────
if (section === 'services') {
  const serviceRows = [
    { id: 5, name: 'Personal Loan Processing',    type: 'Loan',     status: 'Active',   orgs: 'All Organisations',          created: '15.03.2026' },
    { id: 4, name: 'Term Deposit Management',     type: 'Deposit',  status: 'Active',   orgs: 'Main Bank, Regional Branch', created: '01.03.2026' },
    { id: 3, name: 'International Wire Transfer', type: 'Transfer', status: 'Active',   orgs: 'Main Bank',                  created: '14.02.2026' },
    { id: 2, name: 'Bill Payment Gateway',        type: 'Payment',  status: 'Inactive', orgs: 'Main Bank',                  created: '20.01.2026' },
    { id: 1, name: 'Account Opening Service',     type: 'Account',  status: 'Active',   orgs: 'All Organisations',          created: '01.01.2026' },
  ];
  const rowsHtml = serviceRows.map(r => `
    <tr>
      <td>${r.id}</td>
      <td>${r.name}</td>
      <td>${r.type}</td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td>${r.orgs}</td>
      <td>${r.created}</td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit"
            data-action="open-service-form" data-module="${mod}"
            data-id="${r.id}" data-name="${r.name}" data-type="${r.type}"
            data-status="${r.status}" data-orgs="${r.orgs}" data-created="${r.created}">
            ${_I_PENCIL_12}
            Edit
          </button>
          <button class="fee-btn-delete">
            ${_I_BIN_12}
            Delete
          </button>
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div>
        <div class="fee-page-title">Service Management</div>
        <div class="fee-page-sub">Define, assign and manage banking services across organisations and branches</div>
      </div>
      <button class="btn-create-fee" data-action="open-service-form" data-module="${mod}">
        ${_I_PLUS_14}
        Create Service
      </button>
    </div>
    ${renderTable(['ID', 'Name', 'Type', 'Status', 'Assigned To', 'Created At', 'Actions'], rowsHtml, serviceRows.length)}
    </div>`;
}

// ── EXCHANGE RATE MANAGEMENT ─────────────────────────────────────────────────
if (section === 'exchangerate') {
  const erRows = [
    { id: 6, from: 'USD', to: 'EUR', rate: '0.9185', source: 'ECB',     effDate: '25.03.2026', expDate: '31.03.2026', status: 'Active'  },
    { id: 5, from: 'USD', to: 'GBP', rate: '0.7921', source: 'ECB',     effDate: '25.03.2026', expDate: '31.03.2026', status: 'Active'  },
    { id: 4, from: 'EUR', to: 'USD', rate: '1.0887', source: 'Manual',  effDate: '24.03.2026', expDate: '24.03.2026', status: 'Expired' },
    { id: 3, from: 'GBP', to: 'USD', rate: '1.2628', source: 'ECB',     effDate: '24.03.2026', expDate: '24.03.2026', status: 'Expired' },
    { id: 2, from: 'USD', to: 'CHF', rate: '0.8924', source: 'Manual',  effDate: '20.03.2026', expDate: '25.03.2026', status: 'Expired' },
    { id: 1, from: 'USD', to: 'JPY', rate: '149.78', source: 'Reuters', effDate: '15.03.2026', expDate: '31.03.2026', status: 'Active'  },
  ];
  const erStatusClass = s => s === 'Active' ? 'active' : 'inactive';
  const rowsHtml = erRows.map(r => `
    <tr>
      <td>${r.id}</td>
      <td><strong>${r.from}</strong></td>
      <td><strong>${r.to}</strong></td>
      <td style="font-variant-numeric:tabular-nums">${r.rate}</td>
      <td>${r.source}</td>
      <td>${r.effDate}</td>
      <td>${r.expDate}</td>
      <td><span class="fee-status-${erStatusClass(r.status)}">${r.status}</span></td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit"
            data-action="open-exchange-rate-form" data-module="${mod}"
            data-id="${r.id}" data-from="${r.from}" data-to="${r.to}"
            data-rate="${r.rate}" data-source="${r.source}"
            data-eff-date="${r.effDate}" data-exp-date="${r.expDate}"
            data-status="${r.status}">
            ${_I_PENCIL_12}
            Edit
          </button>
          <button class="fee-btn-delete">
            ${_I_BIN_12}
            Delete
          </button>
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div>
        <div class="fee-page-title">Exchange Rate Management</div>
        <div class="fee-page-sub">Manage currency exchange rates and rate schedules</div>
      </div>
      <button class="btn-create-fee" data-action="open-exchange-rate-form" data-module="${mod}">
        ${_I_PLUS_14}
        Add Exchange Rate
      </button>
    </div>
    ${renderTable(['ID', 'From', 'To', 'Rate', 'Source', 'Effective Date', 'Expiry Date', 'Status', 'Actions'], rowsHtml, erRows.length)}
    </div>`;
}

  return '';
}

function openFeeForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const modLabels = { loans: 'Loan Management', admin: 'Administration' };
  const modLabel = modLabels[mod] || mod;
  const d = data || {};
  const isEdit = !!d.id;

  // Helper: mark the matching <option> as selected
  const opt = (val, option) => val && val === option ? 'selected' : '';
  // Default selections for a new record
  const scope   = d.scope   || 'Loan Product';
  const trigger = d.trigger || 'Up Front';
  const basis   = d.basis   || 'Loan Amount';
  const method  = d.method  || 'Fixed';
  const status  = d.status  || 'Pending';

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>${modLabel}</span><span class="bc-sep">›</span>
      <span>Fee Definitions</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Fee Definition' : 'New Fee Definition'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back" data-action="set-content"
          data-module="${mod}" data-section="fees"
          data-title="Fee Definitions"
          data-subtitle="Configure origination, service and other fees" title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Fee Definition</div>
          <div class="fee-form-subheading">${isEdit ? 'Edit fee definition' : 'Configure fee settings'}</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="fee-save">
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
          <input class="fee-form-input" type="text" placeholder="Enter fee name"
            id="ff-name" value="${d.name || ''}"/>
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
              <option ${opt(scope,'Loan Product')}>Loan Product</option>
              <option ${opt(scope,'Loan Account')}>Loan Account</option>
              <option ${opt(scope,'Loan Application')}>Loan Application</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Trigger Event</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-trigger">
              <option ${opt(trigger,'Up Front')}>Up Front</option>
              <option ${opt(trigger,'Per Instalment')}>Per Instalment</option>
              <option ${opt(trigger,'Per Event')}>Per Event</option>
              <option ${opt(trigger,'At Maturity')}>At Maturity</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Calculation -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Calculation</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Calculation Base</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-basis">
              <option ${opt(basis,'Loan Amount')}>Loan Amount</option>
              <option ${opt(basis,'Outstanding Balance')}>Outstanding Balance</option>
              <option ${opt(basis,'Instalment Amount')}>Instalment Amount</option>
              <option ${opt(basis,'Fixed')}>Fixed</option>
            </select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Calculation Method</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-method" onchange="feeMethodChanged(this)">
              <option value="Fixed" ${opt(method,'Fixed')}>Fixed</option>
              <option value="Percentage" ${opt(method,'Percentage')}>Percentage</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row fee-value-row" id="ff-fixed-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Fixed Amount</label>
          <input class="fee-form-input" type="number" placeholder="e.g. 50"
            id="ff-fixed-val" min="0" step="0.01"
            value="${method === 'Fixed' && d.value ? d.value : ''}"/>
        </div>
        <div></div>
      </div>
      <div class="fee-form-row fee-value-row" id="ff-pct-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Percentage Rate (%)</label>
          <input class="fee-form-input" type="number" placeholder="e.g. 1.5"
            id="ff-pct-val" min="0" max="100" step="0.01"
            value="${method === 'Percentage' && d.value ? d.value : ''}"/>
        </div>
        <div></div>
      </div>
    </div>

    <!-- Validity & Status -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Validity &amp; Status</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Valid From</label>
          <input class="fee-form-input" type="date" id="ff-valid-from"
            value="${d.validFrom || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Valid To</label>
          <input class="fee-form-input" type="date" id="ff-valid-to"
            value="${d.validTo || '2099-12-31'}"/>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="ff-status">
              <option ${opt(status,'Pending')}>Pending</option>
              <option ${opt(status,'Active')}>Active</option>
              <option ${opt(status,'Inactive')}>Inactive</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;

  // Apply correct method-row visibility after render
  const methodSel = document.getElementById('ff-method');
  if (methodSel) feeMethodChanged(methodSel);

  // Update sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const feeNavItem = page.querySelector('.nav-item[data-section="fees"]');
  if (feeNavItem) feeNavItem.classList.add('active');
}


function feeMethodChanged(sel) {
  const isFixed = sel.value === 'Fixed';
  document.getElementById('ff-fixed-row').classList.toggle('visible', isFixed);
  document.getElementById('ff-pct-row').classList.toggle('visible', !isFixed);
}


function openServiceForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => val && val === option ? 'selected' : '';
  const type   = d.type   || 'Loan';
  const status = d.status || 'Active';

  // Build org assignment checkboxes
  const orgs = ['Main Bank', 'Regional Branch', 'City Branch', 'Online Division'];
  const assignedOrgs = (d.orgs || '').split(',').map(s => s.trim());
  const orgCheckboxes = orgs.map(org => `
    <label class="fee-form-checkbox-label">
      <input type="checkbox" ${assignedOrgs.includes(org) || d.orgs === 'All Organisations' ? 'checked' : ''} />
      <span>${org}</span>
    </label>`).join('');

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Administration</span><span class="bc-sep">›</span>
      <span>Service Management</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Service' : 'New Service'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content"
          data-module="${mod}"
          data-section="services"
          data-title="Service Management"
          data-subtitle="Define, assign and manage banking services across organisations and branches"
          title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Service</div>
          <div class="fee-form-subheading">${isEdit ? 'Edit service definition' : 'Configure new banking service'}</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="service-save">
        ${_I_SAVE_14}
        Save
      </button>
    </div>

    <!-- Core Information -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Core Information</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Service Name</label>
          <input class="fee-form-input" type="text" id="sf-name"
            placeholder="Enter service name" value="${d.name || ''}"/>
        </div>
      </div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Service Code</label>
          <input class="fee-form-input" type="text" id="sf-code"
            placeholder="e.g. SVC-001" value="${d.code || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Service Type</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="sf-type">
              <option ${opt(type,'Loan')}>Loan</option>
              <option ${opt(type,'Deposit')}>Deposit</option>
              <option ${opt(type,'Transfer')}>Transfer</option>
              <option ${opt(type,'Payment')}>Payment</option>
              <option ${opt(type,'Account')}>Account</option>
              <option ${opt(type,'Other')}>Other</option>
            </select>
          </div>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Description</label>
          <textarea class="fee-form-input" id="sf-desc" rows="3"
            placeholder="Describe the service and its purpose..."
            style="resize:vertical;">${d.description || ''}</textarea>
        </div>
      </div>
    </div>

    <!-- Organisation & Branch Assignment -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Organisation &amp; Branch Assignment</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Assign to Organisations / Branches</label>
          <div class="fee-form-checkbox-group">${orgCheckboxes}</div>
          <div style="margin-top:8px;">
            <label class="fee-form-checkbox-label" style="color:var(--primary,#3b6fff);font-weight:500;">
              <input type="checkbox" id="sf-all-orgs"
                ${d.orgs === 'All Organisations' ? 'checked' : ''}
                onchange="document.querySelectorAll('.fee-form-checkbox-group input').forEach(cb => cb.checked = this.checked)"/>
              <span>Select all (assign to all organisations and branches)</span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <!-- Status -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Status</div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap" style="max-width:220px;">
            <select class="fee-form-select" id="sf-status">
              <option ${opt(status,'Active')}>Active</option>
              <option ${opt(status,'Inactive')}>Inactive</option>
              <option ${opt(status,'Pending')}>Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;

  // Sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="services"]');
  if (navItem) navItem.classList.add('active');
}


function openExchangeRateForm(mod, data) {
  const m = moduleMap[mod];
  const el = document.getElementById(m.contentId);
  const d = data || {};
  const isEdit = !!d.id;
  const opt = (val, option) => val && val === option ? 'selected' : '';

  // Parse dd.mm.yyyy → yyyy-mm-dd for date inputs
  const toIso = dmy => {
    if (!dmy) return '';
    const parts = dmy.split('.');
    if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
    return dmy;
  };

  const currencies = ['USD','EUR','GBP','CHF','JPY','AUD','CAD','SEK','NOK','DKK'];
  const fromOpts   = currencies.map(c => `<option ${opt(d.from,c)}>${c}</option>`).join('');
  const toOpts     = currencies.map(c => `<option ${opt(d.to,  c)}>${c}</option>`).join('');
  const source     = d.source || 'Manual';
  const status     = d.status || 'Active';

  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span>Administration</span><span class="bc-sep">›</span>
      <span>Exchange Rate Management</span><span class="bc-sep">›</span>
      <span class="bc-current">${isEdit ? 'Edit Exchange Rate' : 'New Exchange Rate'}</span>
    </div>

    <div class="fee-form-topbar">
      <div class="fee-form-topbar-left">
        <button class="fee-form-back"
          data-action="set-content"
          data-module="${mod}"
          data-section="exchangerate"
          data-title="Exchange Rate Management"
          data-subtitle="Manage currency exchange rates and rate schedules"
          title="Back">
          ${_I_BACK_14}
        </button>
        <div>
          <div class="fee-form-heading">Exchange Rate</div>
          <div class="fee-form-subheading">${isEdit ? 'Edit exchange rate entry' : 'Add new exchange rate'}</div>
        </div>
      </div>
      <button class="btn-fee-save" data-action="exchange-rate-save">
        ${_I_SAVE_14}
        Save
      </button>
    </div>

    <!-- Currency Pair -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Currency Pair</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">From Currency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="er-from">${fromOpts}</select>
          </div>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">To Currency</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="er-to">${toOpts}</select>
          </div>
        </div>
      </div>
    </div>

    <!-- Rate Details -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Rate Details</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Exchange Rate</label>
          <input class="fee-form-input" type="number" id="er-rate"
            placeholder="e.g. 0.9185" min="0" step="0.0001"
            value="${d.rate || ''}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Rate Source</label>
          <div class="fee-select-wrap">
            <select class="fee-form-select" id="er-source">
              <option ${opt(source,'Manual')}>Manual</option>
              <option ${opt(source,'ECB')}>ECB</option>
              <option ${opt(source,'Reuters')}>Reuters</option>
              <option ${opt(source,'Bloomberg')}>Bloomberg</option>
              <option ${opt(source,'Central Bank')}>Central Bank</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Validity -->
    <div class="fee-form-section">
      <div class="fee-form-section-title">Validity &amp; Status</div>
      <div class="fee-form-row">
        <div class="fee-form-field">
          <label class="fee-form-label">Effective Date</label>
          <input class="fee-form-input" type="date" id="er-eff-date"
            value="${toIso(d.effDate)}"/>
        </div>
        <div class="fee-form-field">
          <label class="fee-form-label">Expiry Date</label>
          <input class="fee-form-input" type="date" id="er-exp-date"
            value="${toIso(d.expDate)}"/>
        </div>
      </div>
      <div class="fee-form-row full">
        <div class="fee-form-field">
          <label class="fee-form-label">Status</label>
          <div class="fee-select-wrap" style="max-width:220px;">
            <select class="fee-form-select" id="er-status">
              <option ${opt(status,'Active')}>Active</option>
              <option ${opt(status,'Expired')}>Expired</option>
              <option ${opt(status,'Pending')}>Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>`;

  // Sidebar active state
  const page = document.getElementById(m.pageId);
  page.querySelectorAll('.nav-flat, .nav-item').forEach(i => i.classList.remove('active'));
  const navItem = page.querySelector('.nav-item[data-section="exchangerate"]');
  if (navItem) navItem.classList.add('active');
}






function renderAdminTabs(containerId) {
  const el = document.getElementById(containerId);
  _adminL1 = 'general';
  _adminL2 = adminTabCfg.general.tabs[0].key;
  el.innerHTML = `
    <div class="breadcrumb">
      <span>Home</span><span class="bc-sep">›</span>
      <span class="bc-current">Administration</span>
    </div>
    <div class="content-title">Administration</div>
    <div class="content-subtitle" id="adminTabSub"></div>
    <div class="tab-bar-l1" id="adminBarL1"></div>
    <div class="tab-bar-l2" id="adminBarL2"></div>
    <div id="adminTabContent"></div>`;
  _refreshAdminBars();
  _renderAdminTabContent();
}


function _refreshAdminBars() {
  document.getElementById('adminBarL1').innerHTML =
    Object.entries(adminTabCfg).map(([k, v]) =>
      `<div class="tab-l1 ${k===_adminL1?'active':''}" data-action="admin-l1" data-key="${k}">${v.label}</div>`
    ).join('');
  document.getElementById('adminBarL2').innerHTML =
    adminTabCfg[_adminL1].tabs.map(t =>
      `<div class="tab-l2 ${t.key===_adminL2?'active':''}" data-action="admin-l2" data-key="${t.key}">${t.label}</div>`
    ).join('');
  document.getElementById('adminTabSub').textContent = adminTabCfg[_adminL1].sub;
}


function switchAdminL1(key) {
  _adminL1 = key; _adminL2 = adminTabCfg[key].tabs[0].key;
  _refreshAdminBars(); _renderAdminTabContent();
}


function switchAdminL2(key) {
  _adminL2 = key; _refreshAdminBars(); _renderAdminTabContent();
}


function _renderAdminTabContent() {
  const tab = adminTabCfg[_adminL1].tabs.find(t => t.key === _adminL2);
  document.getElementById('adminTabContent').innerHTML = `
    <div class="content-card" style="margin-top:0;">
      <h3>${tab.label}</h3>
      <p style="font-size:12px;color:var(--text-muted);margin-bottom:16px;">${tab.desc}</p>
      <div class="toolbar">
        <button class="btn btn-primary">➕ New</button>
        <button class="btn btn-outline">⬆ Export</button>
        <input class="search-input" placeholder="Search ${tab.label}..."/>
      </div>
      <div style="padding:8px 0;">
        ${[1,2,3,4].map(()=>`<div class="placeholder-row" style="margin-bottom:10px;"><div class="ph-bar short"></div><div class="ph-bar med"></div><div class="ph-bar"></div></div>`).join('')}
      </div>
    </div>`;
}


// Expose to global scope (called from central event dispatcher)
window.openFeeForm = openFeeForm;
window.openServiceForm = openServiceForm;
window.openExchangeRateForm = openExchangeRateForm;
window.switchAdminL1 = switchAdminL1;
window.switchAdminL2 = switchAdminL2;
