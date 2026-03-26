// digsig.js — Digital Signature module
// Loaded lazily by loadDigsigModule() in core_banking.html
// Requires: esc(), renderTable(), SELF_HEADED_SECTIONS from core


function renderDigsigContent(containerId, mod, section, title, subtitle) {
  const el = document.getElementById(containerId);
  const selfHeaded = typeof SELF_HEADED_SECTIONS !== 'undefined' && SELF_HEADED_SECTIONS.has(section);
  el.innerHTML = (
    '<div class="breadcrumb">' +
      '<span>Home</span><span class="bc-sep">›</span>' +
      '<span>Digital Signature</span><span class="bc-sep">›</span>' +
      '<span class="bc-current">' + title + '</span>' +
    '</div>' +
    (selfHeaded ? '' : '<div class="content-title">' + title + '</div>' +
      '<div class="content-subtitle">' + subtitle + '</div>') +
    buildDigsigSection(mod, section, title)
  );
}

function buildDigsigSection(mod, section, title) {
// ── DIGITAL SIGNATURE ────────────────────────────────────────────────────────
if (section === 'ds-queue') {
  const rows = [
    { id:'DS-0008', doc:'Loan Agreement LN-00124',          type:'Loan Contract',      signer:'Marko Nikolić',    requested:'24.03.2026', status:'Pending'  },
    { id:'DS-0007', doc:'Account Opening Form CLT-0004',    type:'Account Form',       signer:'TechPro d.o.o.',   requested:'23.03.2026', status:'Signed'   },
    { id:'DS-0006', doc:'Mortgage Contract LN-00118',       type:'Loan Contract',      signer:'Ana Jovanović',    requested:'22.03.2026', status:'Signed'   },
    { id:'DS-0005', doc:'KYC Declaration CLT-0001',         type:'KYC Document',       signer:'Stefan Petrović',  requested:'20.03.2026', status:'Rejected' },
    { id:'DS-0004', doc:'Business Loan Agreement LN-00115', type:'Loan Contract',      signer:'Global Trade S.A.',requested:'18.03.2026', status:'Expired'  },
    { id:'DS-0003', doc:'Direct Debit Mandate CLT-0003',    type:'Mandate',            signer:'Ana Jovanović',    requested:'15.03.2026', status:'Signed'   },
  ];
  const dsBadge = s => ({ Signed:'active', Pending:'orange', Rejected:'inactive', Expired:'inactive' })[s] || 'inactive';
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td>${r.doc}</td>
      <td>${r.type}</td>
      <td>${r.signer}</td>
      <td>${r.requested}</td>
      <td><span class="fee-status-${dsBadge(r.status)}">${r.status}</span></td>
      <td>
        <div class="fee-actions">
          <button class="fee-btn-edit">${_I_PENCIL_12} View</button>
          ${r.status === 'Pending' ? '<button class="fee-btn-edit" style="background:#e8f5e9;color:#2e7d32;border-color:#a5d6a7;">Sign</button>' : ''}
        </div>
      </td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Document Signing Queue</div><div class="fee-page-sub">Documents pending or completed signing</div></div>
      <button class="btn-create-fee">${_I_PLUS_14} Request Signature</button>
    </div>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <div class="stat-box"><div class="stat-val">${rows.length}</div><div class="stat-lbl">Total Documents</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.status==='Pending').length}</div><div class="stat-lbl">Pending</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.status==='Signed').length}</div><div class="stat-lbl">Signed</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.status==='Rejected'||r.status==='Expired').length}</div><div class="stat-lbl">Rejected / Expired</div></div>
    </div>
    ${renderTable(['ID', 'Document', 'Type', 'Signer', 'Requested At', 'Status', 'Actions'], rowsHtml, rows.length)}
    </div>`;
}

if (section === 'ds-certs') {
  const rows = [
    { id:'CERT-003', name:'Production Signing Certificate', issuer:'DigiCert',    from:'01.01.2026', to:'31.12.2027', status:'Active'   },
    { id:'CERT-002', name:'Test Environment Certificate',   issuer:'Let\'s Encrypt',from:'01.01.2026',to:'31.03.2026', status:'Expired'  },
    { id:'CERT-001', name:'Root CA – Internal',             issuer:'Internal CA',  from:'01.01.2024', to:'31.12.2028', status:'Active'   },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px">${r.id}</code></td>
      <td>${r.name}</td>
      <td>${r.issuer}</td>
      <td>${r.from}</td>
      <td>${r.to}</td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td><div class="fee-actions"><button class="fee-btn-edit">${_I_PENCIL_12} Edit</button><button class="fee-btn-delete">${_I_BIN_12} Revoke</button></div></td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Certificate Management</div><div class="fee-page-sub">Manage signing certificates and their validity</div></div>
      <button class="btn-create-fee">${_I_PLUS_14} Upload Certificate</button>
    </div>
    ${renderTable(['ID', 'Certificate Name', 'Issuer', 'Valid From', 'Valid To', 'Status', 'Actions'], rowsHtml, null, {wrapStyle:'margin-top:0;'})}`;
}

if (section === 'ds-providers') {
  const rows = [
    { id:'PRV-003', name:'DocuSign',     type:'Cloud',   endpoint:'https://api.docusign.net/v2.1', status:'Active'   },
    { id:'PRV-002', name:'eIDAS QES',    type:'eIDAS',   endpoint:'https://sign.eidasnode.eu/api',  status:'Active'   },
    { id:'PRV-001', name:'Internal HSM', type:'On-Prem', endpoint:'https://hsm.bank.internal/sign',  status:'Active'   },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px">${r.id}</code></td>
      <td><strong>${r.name}</strong></td>
      <td>${r.type}</td>
      <td><code style="font-size:11px;color:#6b7a8d">${r.endpoint}</code></td>
      <td><span class="fee-status-active">${r.status}</span></td>
      <td><div class="fee-actions"><button class="fee-btn-edit">${_I_PENCIL_12} Configure</button><button class="fee-btn-edit" style="background:#e8f0fd;color:#1a5ccc;border-color:#a8c4f5;">Test</button></div></td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Signature Providers</div><div class="fee-page-sub">Configure external e-signature provider integrations</div></div>
      <button class="btn-create-fee">${_I_PLUS_14} Add Provider</button>
    </div>
    ${renderTable(['ID', 'Provider Name', 'Type', 'API Endpoint', 'Status', 'Actions'], rowsHtml, null, {wrapStyle:'margin-top:0;'})}`;
}

if (section === 'ds-audit') {
  const rows = [
    { id:'EVT-0012', doc:'Loan Agreement LN-00124',       signer:'Marko Nikolić',    event:'Signature Requested', ts:'24.03.2026 10:14', ip:'192.168.1.45',  status:'Success' },
    { id:'EVT-0011', doc:'Account Opening Form CLT-0004', signer:'TechPro d.o.o.',   event:'Document Signed',     ts:'23.03.2026 15:32', ip:'10.0.0.12',     status:'Success' },
    { id:'EVT-0010', doc:'Account Opening Form CLT-0004', signer:'TechPro d.o.o.',   event:'Signature Requested', ts:'23.03.2026 14:55', ip:'10.0.0.12',     status:'Success' },
    { id:'EVT-0009', doc:'KYC Declaration CLT-0001',      signer:'Stefan Petrović',  event:'Signature Rejected',  ts:'20.03.2026 09:01', ip:'78.34.22.100',  status:'Failed'  },
    { id:'EVT-0008', doc:'Mortgage Contract LN-00118',    signer:'Ana Jovanović',    event:'Document Signed',     ts:'22.03.2026 11:20', ip:'185.44.2.9',    status:'Success' },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px">${r.id}</code></td>
      <td>${r.doc}</td>
      <td>${r.signer}</td>
      <td>${r.event}</td>
      <td style="white-space:nowrap">${r.ts}</td>
      <td><code style="font-size:11px;color:#6b7a8d">${r.ip}</code></td>
      <td><span class="fee-status-${r.status === 'Success' ? 'active' : 'inactive'}">${r.status}</span></td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Audit Trail</div><div class="fee-page-sub">Full log of all signing events per document</div></div>
      <button class="btn-create-fee" style="background:#f0f4f8;color:var(--text-main);border:1px solid var(--border);">⬆ Export</button>
    </div>
    ${renderTable(['Event ID', 'Document', 'Signer', 'Event Type', 'Timestamp', 'IP Address', 'Result'], rowsHtml, rows.length)}
    </div>`;
}

  return '';
}
