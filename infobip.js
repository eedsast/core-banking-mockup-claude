// infobip.js — Infobip module
// Loaded lazily by loadInfobipModule() in core_banking.html
// Requires: esc(), renderTable(), SELF_HEADED_SECTIONS from core


function renderInfobipContent(containerId, mod, section, title, subtitle) {
  const el = document.getElementById(containerId);
  const selfHeaded = typeof SELF_HEADED_SECTIONS !== 'undefined' && SELF_HEADED_SECTIONS.has(section);
  el.innerHTML = (
    '<div class="breadcrumb">' +
      '<span>Home</span><span class="bc-sep">›</span>' +
      '<span>Infobip</span><span class="bc-sep">›</span>' +
      '<span class="bc-current">' + title + '</span>' +
    '</div>' +
    (selfHeaded ? '' : '<div class="content-title">' + title + '</div>' +
      '<div class="content-subtitle">' + subtitle + '</div>') +
    buildInfobipSection(mod, section, title)
  );
}

function buildInfobipSection(mod, section, title) {
// ── INFOBIP ──────────────────────────────────────────────────────────────────
if (section === 'ib-templates') {
  const rows = [
    { id:'TPL-008', name:'Loan Approved Notification',   channel:'SMS',      lang:'EN', status:'Active',   created:'20.03.2026' },
    { id:'TPL-007', name:'Payment Reminder',             channel:'WhatsApp', lang:'SR', status:'Active',   created:'15.03.2026' },
    { id:'TPL-006', name:'KYC Verification Request',     channel:'Email',    lang:'EN', status:'Active',   created:'10.03.2026' },
    { id:'TPL-005', name:'OTP – Transaction Auth',       channel:'SMS',      lang:'EN', status:'Active',   created:'05.03.2026' },
    { id:'TPL-004', name:'Account Statement Ready',      channel:'Email',    lang:'EN', status:'Inactive', created:'01.03.2026' },
    { id:'TPL-003', name:'Dobrodošlica – novi klijent',  channel:'SMS',      lang:'SR', status:'Active',   created:'20.02.2026' },
    { id:'TPL-002', name:'Overdue Payment Alert',        channel:'WhatsApp', lang:'EN', status:'Active',   created:'15.02.2026' },
    { id:'TPL-001', name:'Card Transaction Notification',channel:'SMS',      lang:'EN', status:'Active',   created:'01.02.2026' },
  ];
  const chIcon = c => ({ SMS:'📱', Email:'📧', WhatsApp:'💬' })[c] || '📨';
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td>${r.name}</td>
      <td>${chIcon(r.channel)} ${r.channel}</td>
      <td>${r.lang}</td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td>${r.created}</td>
      <td><div class="fee-actions"><button class="fee-btn-edit">${_I_PENCIL_12} Edit</button><button class="fee-btn-delete">${_I_BIN_12} Delete</button></div></td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Message Templates</div><div class="fee-page-sub">Create and manage message templates per channel</div></div>
      <button class="btn-create-fee">${_I_PLUS_14} Create Template</button>
    </div>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <div class="stat-box"><div class="stat-val">${rows.length}</div><div class="stat-lbl">Total Templates</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.channel==='SMS').length}</div><div class="stat-lbl">📱 SMS</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.channel==='Email').length}</div><div class="stat-lbl">📧 Email</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.channel==='WhatsApp').length}</div><div class="stat-lbl">💬 WhatsApp</div></div>
    </div>
    ${renderTable(['ID', 'Template Name', 'Channel', 'Language', 'Status', 'Created At', 'Actions'], rowsHtml, rows.length)}
    </div>`;
}

if (section === 'ib-history') {
  const rows = [
    { id:'MSG-0015', recipient:'+381631234567', channel:'SMS',      template:'OTP – Transaction Auth',    status:'Delivered', sent:'25.03.2026 09:14', delivered:'25.03.2026 09:14' },
    { id:'MSG-0014', recipient:'marko@email.rs',channel:'Email',    template:'Account Statement Ready',   status:'Delivered', sent:'24.03.2026 18:00', delivered:'24.03.2026 18:02' },
    { id:'MSG-0013', recipient:'+381641122334', channel:'WhatsApp', template:'Payment Reminder',          status:'Failed',    sent:'24.03.2026 10:30', delivered:'—' },
    { id:'MSG-0012', recipient:'+381691234567', channel:'SMS',      template:'Loan Approved Notification',status:'Delivered', sent:'23.03.2026 14:55', delivered:'23.03.2026 14:56' },
    { id:'MSG-0011', recipient:'ana@email.hr',  channel:'Email',    template:'KYC Verification Request',  status:'Delivered', sent:'22.03.2026 11:00', delivered:'22.03.2026 11:01' },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td><code style="font-size:11px">${r.recipient}</code></td>
      <td>${r.channel}</td>
      <td>${r.template}</td>
      <td><span class="fee-status-${r.status === 'Delivered' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td style="white-space:nowrap">${r.sent}</td>
      <td style="white-space:nowrap">${r.delivered}</td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Send History / Logs</div><div class="fee-page-sub">Log of sent messages with delivery status</div></div>
      <button class="btn-create-fee" style="background:#f0f4f8;color:var(--text-main);border:1px solid var(--border);">⬆ Export</button>
    </div>
    <div style="display:flex;gap:12px;margin-bottom:16px;flex-wrap:wrap;">
      <div class="stat-box"><div class="stat-val">${rows.length}</div><div class="stat-lbl">Total Sent</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.status==='Delivered').length}</div><div class="stat-lbl">Delivered</div></div>
      <div class="stat-box"><div class="stat-val">${rows.filter(r=>r.status==='Failed').length}</div><div class="stat-lbl">Failed</div></div>
    </div>
    ${renderTable(['Message ID', 'Recipient', 'Channel', 'Template', 'Status', 'Sent At', 'Delivered At'], rowsHtml, rows.length)}
    </div>`;
}

if (section === 'ib-triggers') {
  const rows = [
    { id:'TRG-005', name:'Loan Approval Alert',       event:'Loan Status → Approved',      channel:'SMS',      template:'Loan Approved Notification', status:'Active'   },
    { id:'TRG-004', name:'Overdue Payment Warning',   event:'Loan Overdue ≥ 1 day',         channel:'WhatsApp', template:'Overdue Payment Alert',       status:'Active'   },
    { id:'TRG-003', name:'KYC Submission Prompt',     event:'Client Created (KYC Pending)',  channel:'Email',    template:'KYC Verification Request',    status:'Active'   },
    { id:'TRG-002', name:'Transaction OTP',           event:'Payment Amount > 500 EUR',      channel:'SMS',      template:'OTP – Transaction Auth',      status:'Active'   },
    { id:'TRG-001', name:'Welcome Message',           event:'Client Status → Active',        channel:'SMS',      template:'Dobrodošlica – novi klijent', status:'Inactive' },
  ];
  const rowsHtml = rows.map(r => `
    <tr>
      <td><code style="font-size:11px;color:var(--primary,#3b6fff)">${r.id}</code></td>
      <td><strong>${r.name}</strong></td>
      <td>${r.event}</td>
      <td>${r.channel}</td>
      <td>${r.template}</td>
      <td><span class="fee-status-${r.status === 'Active' ? 'active' : 'inactive'}">${r.status}</span></td>
      <td><div class="fee-actions"><button class="fee-btn-edit">${_I_PENCIL_12} Edit</button><button class="fee-btn-delete">${_I_BIN_12} Delete</button></div></td>
    </tr>`).join('');
  return `
    <div class="fee-page-header">
      <div><div class="fee-page-title">Campaign Triggers</div><div class="fee-page-sub">Rules that auto-trigger messages on banking events</div></div>
      <button class="btn-create-fee">${_I_PLUS_14} Add Trigger</button>
    </div>
    ${renderTable(['ID', 'Trigger Name', 'Banking Event', 'Channel', 'Template', 'Status', 'Actions'], rowsHtml)}`;
}

  return '';
}
