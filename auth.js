// auth.js — Authorisation module
// Loaded lazily by loadAuthModule() in core_banking.html
// Requires: esc(), renderTable(), SELF_HEADED_SECTIONS from core


function renderAuthContent(containerId, mod, section, title, subtitle) {
  const el = document.getElementById(containerId);
  const selfHeaded = typeof SELF_HEADED_SECTIONS !== 'undefined' && SELF_HEADED_SECTIONS.has(section);
  el.innerHTML = (
    '<div class="breadcrumb">' +
      '<span>Home</span><span class="bc-sep">›</span>' +
      '<span>Authorisation</span><span class="bc-sep">›</span>' +
      '<span class="bc-current">' + title + '</span>' +
    '</div>' +
    (selfHeaded ? '' : '<div class="content-title">' + title + '</div>' +
      '<div class="content-subtitle">' + subtitle + '</div>') +
    buildAuthSection(mod, section, title)
  );
}

function buildAuthSection(mod, section, title) {
// ── ROLE DEFINITION (Auth) ────────────────────────────────────────────────────
if (section === 'roles') {
  const rView = window._rolesView || 'list';
  const roles = MOCK_ROLES;
  const perms = MOCK_PERMISSIONS;
  const scopeBadge = s => {
    if (s==='SYSTEM')       return `<span class="adm-scope-system">SYSTEM</span>`;
    if (s==='BRANCH')       return `<span class="adm-scope-branch">BRANCH</span>`;
    if (s==='ORGANIZATION') return `<span class="adm-scope-org">ORGANIZATION</span>`;
    return `<span>${s}</span>`;
  };

  if (rView === 'edit' || rView === 'create') {
    const selRoleName = window._roleSelected || '';
    const selRole = roles.find(r => r.id === selRoleName) || { name:'', builtin:'No' };
    const permRows = perms.map(p => `
      <tr>
        <td style="width:40px"><input type="checkbox" class="adm-perm-cb"></td>
        <td><span class="adm-policy-key">${p.key}</span></td>
        <td>${p.desc}</td>
        <td>${scopeBadge(p.scope)}</td>
      </tr>`).join('');
    return `
      <div class="adm-wrap">
        <div class="adm-detail-header">
          <div class="adm-detail-nav">
            <button class="adm-btn-back" data-action="roles-back">
              ${_I_BACK_14B}
            </button>
            <div>
              <div class="adm-page-title">Role</div>
              <div class="adm-page-sub">Configure role settings</div>
            </div>
          </div>
          <button class="adm-btn-save" data-action="roles-save">
            ${_I_CHECK_13}
            Save
          </button>
        </div>
        ${renderFormCard(null,
          admField('Role Name',
            '<input class="adm-form-input" placeholder="Enter name" value="' + esc(selRole.name) + '" />',
            'Enter a unique role name without spaces') +
          admField('Built-in',
            '<select class="adm-form-select">' +
              '<option ' + (selRole.builtin==='No'?'selected':'') + '>No</option>' +
              '<option ' + (selRole.builtin==='Yes'?'selected':'') + '>Yes</option>' +
            '</select>',
            'Built-in roles are system-defined and have special privileges') +
          '<div class="adm-form-field adm-form-full">' +
            '<label class="adm-form-label">Description</label>' +
            '<textarea class="adm-form-textarea" placeholder="Enter description"></textarea>' +
            '<div class="adm-form-hint">Provide a clear, meaningful description of this role\'s responsibilities</div>' +
          '</div>'
        , {cols:2})}
        <div class="adm-form-card" style="margin-top:16px;">
          <div class="adm-form-title">Permission Assignment</div>
          <div class="adm-page-sub" style="margin-top:-8px;margin-bottom:12px;">Select the permissions this role should have</div>
          <div class="adm-perm-table-wrap">
            <table class="adm-perm-table">
              <thead><tr><th style="width:40px"></th><th>Policy Key</th><th>Description</th><th>Scope</th></tr></thead>
              <tbody>${permRows}</tbody>
            </table>
          </div>
        </div>
      </div>`;
  }

  // List view
  const roleRows = roles.map(r => `
    <tr>
      <td class="adm-id-cell" title="${r.id}">${r.id}</td>
      <td style="font-weight:500">${r.name}</td>
      <td>${r.builtin==='Yes' ? '<span class="adm-builtin-yes">Yes</span>' : '<span class="adm-builtin-no">No</span>'}</td>
      <td>${r.created}</td>
      <td style="white-space:nowrap">
        <button class="adm-btn-edit" data-action="roles-edit" data-id="${r.id}">
          ${_I_PENCIL_11}Edit
        </button>
        <button class="adm-btn-delete" data-action="roles-delete" data-id="${r.id}">
          ${_I_BIN_11}Delete
        </button>
      </td>
    </tr>`).join('');
  return `
    <div class="adm-wrap">
      <div class="adm-page-header">
        <div class="adm-page-header-left">
          <div class="adm-page-title">Roles</div>
          <div class="adm-page-sub">Manage user roles and permissions</div>
        </div>
        <button class="adm-btn-create" data-action="roles-create">
          ${_I_PLUS_12}
          Create Role
        </button>
      </div>
      ${renderTable(['ID','Name','Built-In','Created At','Actions'], roleRows, roles.length, {variant:'adm'})}
    </div>`;
}

// ── PERMISSIONS ──────────────────────────────────────────────────────────────
if (section === 'permissions') {
  const perms = MOCK_PERMISSIONS;
  const scopeBadge2 = s => {
    if (s==='SYSTEM')       return `<span class="adm-scope-system">SYSTEM</span>`;
    if (s==='BRANCH')       return `<span class="adm-scope-branch">BRANCH</span>`;
    if (s==='ORGANIZATION') return `<span class="adm-scope-org">ORGANIZATION</span>`;
    return `<span>${s}</span>`;
  };
  const permRows = perms.map(p => `
    <tr>
      <td><span class="adm-policy-key">${p.key}</span></td>
      <td>${p.desc}</td>
      <td>${scopeBadge2(p.scope)}</td>
      <td style="white-space:nowrap">
        <button class="adm-btn-edit">
          ${_I_PENCIL_11}Edit
        </button>
        <button class="adm-btn-delete">
          ${_I_BIN_11}Delete
        </button>
      </td>
    </tr>`).join('');
  return `
    <div class="adm-wrap">
      <div class="adm-page-header">
        <div class="adm-page-header-left">
          <div class="adm-page-title">Permissions</div>
          <div class="adm-page-sub">Manage system permissions and access controls</div>
        </div>
        <button class="adm-btn-create">
          ${_I_PLUS_12}
          Create Permission
        </button>
      </div>
      ${renderTable(['Policy Key', 'Description', 'Scope', 'Actions'], rowsHtml, perms.length, {variant:'adm'})}
      </div>
    </div>`;
}

// ── USER LIST (Auth – read-only) ─────────────────────────────────────────────
if (section === 'user-list') {
  const users = MOCK_USER_LIST;
  const badgeU = s => s === 'ACTIVE'
    ? `<span class="adm-badge-active">ACTIVE</span>`
    : `<span class="adm-badge-suspended">SUSPENDED</span>`;
  const rows = users.map(u => `
    <tr>
      <td style="font-weight:500">${u.name}</td>
      <td>${u.email}</td>
      <td>${badgeU(u.status)}</td>
      <td>${u.created}</td>
      <td>${u.roles.map(r=>`<span style="display:inline-block;background:#ede9fe;color:#6d28d9;border-radius:4px;padding:1px 7px;font-size:.72rem;font-weight:600;margin:1px 2px">${r}</span>`).join('')}</td>
    </tr>`).join('');
  return `
    <div class="adm-wrap">
      <div class="adm-page-header">
        <div>
          <div class="adm-page-title">User List</div>
          <div class="adm-page-sub">Read-only view of system users and their role assignments. Manage users in Administration.</div>
        </div>
      </div>
      ${renderTable(['Name', 'Email', 'Status', 'Created', 'Role Assignments'], rowsHtml, users.length, {variant:'adm'})}
      </div>
    </div>`;
}











if (section === 'security') {
  return `
    <div class="sec-panel" id="sec-pwd-session">
      <div class="sec-panel-header">
        <span>Password / session settings</span>
        <button class="btn btn-outline sec-edit-btn" data-action="sec-edit" data-target="pwd-session">✏️ Edit</button>
      </div>
      <div class="sec-cards-row">
        <div class="sec-card">
          <div class="sec-card-title">Password</div>
          <div class="sec-fields">
            <div class="sec-field">
              <div class="sec-lbl">Minimum password length</div>
              <div class="sec-val" data-field="minPwdLen" data-raw="8">8</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Maximum password length</div>
              <div class="sec-val" data-field="maxPwdLen" data-raw="64">64</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Password validity time (day)</div>
              <div class="sec-val" data-field="pwdValidityDay" data-raw="90">90</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Number of allowed last used passwords</div>
              <div class="sec-val" data-field="lastUsedPwds" data-raw="3">3</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Minimum lowercase count</div>
              <div class="sec-val" data-field="minLower" data-raw="1">1</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Minimum uppercase count</div>
              <div class="sec-val" data-field="minUpper" data-raw="1">1</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Minimum special characters count</div>
              <div class="sec-val" data-field="minSpecial" data-raw="1">1</div>
            </div>
            <div class="sec-field">
              <div class="sec-lbl">Minimum number digits</div>
              <div class="sec-val" data-field="minDigits" data-raw="1">1</div>
            </div>
          </div>
        </div>
        <div class="sec-card">
          <div class="sec-card-title">Session</div>
          <div class="sec-fields">
            <div class="sec-field sec-field-full">
              <div class="sec-lbl">Session timeout (sec)</div>
              <div class="sec-val" data-field="sessionTimeout" data-raw="172800" data-hint="2 day">172800 <span class="sec-hint">(2 day)</span></div>
            </div>
            <div class="sec-field sec-field-full">
              <div class="sec-lbl">Maximum unsuccessful login attempt count</div>
              <div class="sec-val" data-field="maxLoginAttempts" data-raw="3">3</div>
            </div>
            <div class="sec-field sec-field-full">
              <div class="sec-lbl">User lock auto reset time</div>
              <div class="sec-val" data-field="lockResetTime" data-raw="1" data-hint="1 minute">1 <span class="sec-hint">(1 minute)</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sec-panel" id="sec-other">
      <div class="sec-panel-header">
        <span>Other settings</span>
        <button class="btn btn-outline sec-edit-btn" data-action="sec-edit" data-target="other">✏️ Edit</button>
      </div>
      <div class="sec-fields-flat">
        <div class="sec-field">
          <div class="sec-lbl">Inactivity warning time (sec)</div>
          <div class="sec-val" data-field="inactivityWarn" data-raw="6000" data-hint="1 hour, 40 minute">6000 <span class="sec-hint">(1 hour, 40 minute)</span></div>
        </div>
        <div class="sec-field">
          <div class="sec-lbl">Logout on last tab close</div>
          <div class="sec-val" data-field="logoutLastTab" data-raw="Yes">Yes</div>
        </div>
      </div>
    </div>`;
}


  return '';
}

function secEdit(panelId) {
  const panel = document.getElementById('sec-' + panelId);
  panel.querySelectorAll('.sec-val').forEach(v => {
    const field = v.dataset.field;
    const raw   = v.dataset.raw || v.textContent.trim().split(' ')[0];
    const hint  = v.dataset.hint || '';
    let input;
    if (field === 'logoutLastTab') {
      input = document.createElement('select');
      input.className = 'sec-input';
      ['Yes','No'].forEach(opt => {
        const o = document.createElement('option');
        o.value = opt; o.textContent = opt;
        if (opt === raw) o.selected = true;
        input.appendChild(o);
      });
    } else {
      input = document.createElement('input');
      input.type = 'number';
      input.className = 'sec-input';
      input.value = raw;
    }
    input.dataset.field       = field;
    input.dataset.hint        = hint;
    input.dataset.originalHtml = v.outerHTML;
    v.parentNode.replaceChild(input, v);
  });
  const btn = panel.querySelector('.sec-edit-btn');
  const div = document.createElement('div');
  div.className = 'sec-action-btns';
  div.innerHTML = `<button class="btn btn-primary" data-action="sec-save" data-target="${panelId}">💾 Save</button><button class="btn btn-outline" data-action="sec-cancel" data-target="${panelId}">Cancel</button>`;
  btn.parentNode.replaceChild(div, btn);
}


function secSave(panelId) {
  const panel = document.getElementById('sec-' + panelId);
  panel.querySelectorAll('.sec-input').forEach(input => {
    const div = document.createElement('div');
    div.className = 'sec-val';
    div.dataset.field = input.dataset.field;
    div.dataset.raw   = input.value;
    const hint = input.dataset.hint;
    if (hint) div.dataset.hint = hint;
    div.innerHTML = hint ? `${input.value} <span class="sec-hint">(${hint})</span>` : input.value;
    input.parentNode.replaceChild(div, input);
  });
  const btns = panel.querySelector('.sec-action-btns');
  const btn = document.createElement('button');
  btn.className = 'btn btn-outline sec-edit-btn';
  btn.dataset.action = 'sec-edit';
  btn.dataset.target = panelId;
  btn.textContent = '✏️ Edit';
  btns.parentNode.replaceChild(btn, btns);
}


function secCancel(panelId) {
  const panel = document.getElementById('sec-' + panelId);
  panel.querySelectorAll('.sec-input').forEach(input => {
    const tmp = document.createElement('div');
    tmp.innerHTML = input.dataset.originalHtml;
    input.parentNode.replaceChild(tmp.firstChild, input);
  });
  const btns = panel.querySelector('.sec-action-btns');
  const btn = document.createElement('button');
  btn.className = 'btn btn-outline sec-edit-btn';
  btn.dataset.action = 'sec-edit';
  btn.dataset.target = panelId;
  btn.textContent = '✏️ Edit';
  btns.parentNode.replaceChild(btn, btns);
}


// Expose to global scope (called from central event dispatcher)
window.secEdit = secEdit;
window.secSave = secSave;
window.secCancel = secCancel;
