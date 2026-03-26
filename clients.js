// clients.js — Client Management module
// Loaded lazily by loadClientsModule() in core_banking.html
// Requires: esc(), renderTable(), SELF_HEADED_SECTIONS from core


function renderClientsContent(containerId, mod, section, title, subtitle) {
  const el = document.getElementById(containerId);
  const selfHeaded = typeof SELF_HEADED_SECTIONS !== 'undefined' && SELF_HEADED_SECTIONS.has(section);
  el.innerHTML = (
    '<div class="breadcrumb">' +
      '<span>Home</span><span class="bc-sep">›</span>' +
      '<span>Client Management</span><span class="bc-sep">›</span>' +
      '<span class="bc-current">' + title + '</span>' +
    '</div>' +
    (selfHeaded ? '' : '<div class="content-title">' + title + '</div>' +
      '<div class="content-subtitle">' + subtitle + '</div>') +
    buildClientsSection(mod, section, title)
  );
}

function buildClientsSection(mod, section, title) {
// ── CLIENTS ─────────────────────────────────────────────────────────────────
if (section === 'client-list') {
  const rows = [
    { id:'CLT-0005', name:'Marko Nikolić',       type:'Individual', status:'Active',   country:'Serbia',  created:'20.03.2026' },
    { id:'CLT-0004', name:'TechPro d.o.o.',       type:'Corporate',  status:'Active',   country:'Serbia',  created:'15.03.2026' },
    { id:'CLT-0003', name:'Ana Jovanović',         type:'Individual', status:'Active',   country:'Croatia', created:'10.03.2026' },
    { id:'CLT-0002', name:'Global Trade S.A.',     type:'Corporate',  status:'Inactive', country:'Germany', created:'01.03.2026' },
    { id:'CLT-0001', name:'Stefan Petrović',       type:'Individual', status:'Active',   country:'Serbia',  created:'15.02.2026' },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td>${r.name}</td>
      <td><span class="badge ${r.type === 'Corporate' ? 'blue' : 'green'}">${r.type}</span></td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td>${r.country}</td>
      <td>${r.created}</td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit">${_I_PENCIL_12} View</button>
          <button class="fee-btn-delete">${_I_BIN_12} Delete</button>
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Client List &amp; Search</div><div class="fee-page-sub">Search and manage all registered clients</div></div>
      <button class="btn-create-fee">
        ${_I_PLUS_14}
        New Client
      </button>
    </div>
    ${renderTable(['Client ID', 'Full Name', 'Type', 'Status', 'Country', 'Created At', 'Actions'], rowsHtml, rows.length)}
    </div>`;
}

if (section === 'kyc') {
  const rows = [
    { id:'CLT-0005', name:'Marko Nikolić',    kycStatus:'Verified',  docType:'National ID',  submitted:'20.03.2026', reviewer:'J. Savić'   },
    { id:'CLT-0004', name:'TechPro d.o.o.',   kycStatus:'Pending',   docType:'Company Reg.', submitted:'15.03.2026', reviewer:'—'          },
    { id:'CLT-0003', name:'Ana Jovanović',    kycStatus:'Verified',  docType:'Passport',     submitted:'10.03.2026', reviewer:'M. Popović'  },
    { id:'CLT-0002', name:'Global Trade S.A.',kycStatus:'Expired',   docType:'Company Reg.', submitted:'01.03.2026', reviewer:'J. Savić'   },
    { id:'CLT-0001', name:'Stefan Petrović',  kycStatus:'Pending',   docType:'National ID',  submitted:'15.02.2026', reviewer:'—'          },
  ];
  const kycBadge = s => ({ Verified:'active', Pending:'orange', Expired:'inactive', Rejected:'inactive' })[s] || 'inactive';
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td>${r.name}</td>
      <td><span class="fee-status-${kycBadge(r.kycStatus)}">${r.kycStatus}</span></td>
      <td>${r.docType}</td>
      <td>${r.submitted}</td>
      <td>${r.reviewer}</td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit">${_I_PENCIL_12} Review</button>
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">KYC / Onboarding</div><div class="fee-page-sub">Know Your Customer documents and verification status</div></div>
      <button class="btn-create-fee">${_I_PLUS_14} New KYC Record</button>
    </div>
    ${renderTable(['Client ID', 'Client Name', 'KYC Status', 'Document Type', 'Submitted At', 'Reviewed By', 'Actions'], rowsHtml, rows.length)}
    </div>`;
}

if (section === 'client-profile') {
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Client Profile</div><div class="fee-page-sub">Individual client details, contacts and addresses</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;">
      ${feeSection('Personal Information',
        feeRow(feeField('First Name', '<input class="fee-form-input" value="Marko" readonly/>'), feeField('Last Name', '<input class="fee-form-input" value="Nikolić" readonly/>')) +
        feeRow(feeField('Date of Birth', '<input class="fee-form-input" value="12.05.1985" readonly/>'), feeField('Nationality', '<input class="fee-form-input" value="Serbian" readonly/>')) +
        feeRow(feeField('National ID / Passport', '<input class="fee-form-input" value="002984756" readonly/>'))
      )}
      ${feeSection('Contact &amp; Address',
        feeRow(feeField('Email',   '<input class="fee-form-input" value="marko.nikolic@email.rs" readonly/>')) +
        feeRow(feeField('Phone',   '<input class="fee-form-input" value="+381 63 123 456" readonly/>')) +
        feeRow(feeField('Address', '<input class="fee-form-input" value="Knez Mihailova 14, 11000 Belgrade" readonly/>'))
      )}
      ${feeSection('Account Status',
        feeRow(feeField('Client Since', '<input class="fee-form-input" value="15.02.2026" readonly/>'), feeField('Status', '<input class="fee-form-input" value="Active" readonly/>')) +
        feeRow(feeField('KYC Status',   '<input class="fee-form-input" value="Verified" readonly/>'),    feeField('Risk Rating', '<input class="fee-form-input" value="Low" readonly/>'))
      )}
      ${feeSection('Relationship Manager',
        feeRow(feeField('Assigned Manager', '<input class="fee-form-input" value="Jovana Savić" readonly/>')) +
        feeRow(feeField('Branch',  '<input class="fee-form-input" value="Belgrade Main Branch" readonly/>')) +
        feeRow(feeField('Segment', '<input class="fee-form-input" value="Retail" readonly/>'))
      )}
    </div>
    <div style="margin-top:12px;padding:12px 16px;background:#f0f4f8;border-radius:8px;font-size:12px;color:var(--text-muted,#6b7a8d);">
      ← Select a client from <strong>Client List &amp; Search</strong> to load their full profile here.
    </div>`;
}

if (section === 'relationship') {
  const rows = [
    { id:'CLT-0005', name:'Marko Nikolić',    accounts:2, loans:1, cards:1, deposits:1, rm:'J. Savić',   status:'Active' },
    { id:'CLT-0004', name:'TechPro d.o.o.',   accounts:3, loans:2, cards:0, deposits:2, rm:'M. Popović', status:'Active' },
    { id:'CLT-0003', name:'Ana Jovanović',    accounts:1, loans:0, cards:1, deposits:1, rm:'J. Savić',   status:'Active' },
    { id:'CLT-0002', name:'Global Trade S.A.',accounts:2, loans:1, cards:0, deposits:0, rm:'M. Popović', status:'Inactive' },
    { id:'CLT-0001', name:'Stefan Petrović',  accounts:1, loans:1, cards:2, deposits:0, rm:'J. Savić',   status:'Active' },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td>${r.name}</td>
      <td style="text-align:center">${r.accounts}</td>
      <td style="text-align:center">${r.loans}</td>
      <td style="text-align:center">${r.cards}</td>
      <td style="text-align:center">${r.deposits}</td>
      <td>${r.rm}</td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Relationship Management</div><div class="fee-page-sub">Linked accounts, loans and assigned products per client</div></div>
    </div>
    ${renderTable(['Client ID', 'Client Name', 'Accounts', 'Loans', 'Cards', 'Deposits', 'Rel. Manager', 'Status'], rowsHtml, rows.length)}
    </div>`;
}

  return '';
}
