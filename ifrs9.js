window.renderIfrs9Content = function(containerId, section, title, subtitle) {
  const el = document.getElementById(containerId);
  if (!el) return;

  // Inject CSS once
  if (!document.getElementById('ifrs9-styles')) {
    const style = document.createElement('style');
    style.id = 'ifrs9-styles';
    style.textContent = `
      .ifrs9-container { background: #f5f4ef; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
      .ifrs9-header { margin-bottom: 24px; }
      .ifrs9-title { font-size: 24px; font-weight: 600; color: #1a1a1a; margin-bottom: 4px; }
      .ifrs9-subtitle { font-size: 14px; color: #666; margin-bottom: 16px; }
      .ifrs9-template-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 1px solid #e8e6de; }
      .ifrs9-badge { background: #085041; color: white; padding: 4px 8px; border-radius: 3px; font-size: 11px; font-weight: 600; }
      .ifrs9-pill { background: #e8e6de; color: #333; padding: 4px 10px; border-radius: 12px; font-size: 12px; }
      .ifrs9-pill.corep { background: #1d9e75; color: white; }
      .ifrs9-pill.ecb { background: #7f77dd; color: white; }
      .ifrs9-pill.warning { background: #c47b16; color: white; }
      .ifrs9-meta { display: flex; gap: 16px; font-size: 12px; color: #666; }
      .ifrs9-meta-item { display: flex; flex-direction: column; }
      .ifrs9-meta-label { color: #999; font-size: 11px; }
      .ifrs9-meta-value { font-weight: 500; color: #333; }
      .ifrs9-dashboard { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; margin-bottom: 24px; }
      .ifrs9-card { background: white; border: 1px solid #e8e6de; border-radius: 6px; padding: 16px; }
      .ifrs9-card-title { font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 8px; }
      .ifrs9-card-value { font-size: 24px; font-weight: 600; color: #085041; margin-bottom: 4px; }
      .ifrs9-card-subtitle { font-size: 12px; color: #999; margin-bottom: 12px; }
      .ifrs9-progress { height: 4px; background: #e8e6de; border-radius: 2px; overflow: hidden; }
      .ifrs9-progress-bar { height: 100%; background: #1d9e75; }
      .ifrs9-stat-row { display: flex; justify-content: space-between; font-size: 12px; padding: 6px 0; border-bottom: 1px solid #f0ede6; }
      .ifrs9-stat-label { color: #666; }
      .ifrs9-stat-value { font-weight: 500; color: #1a1a1a; }
      .ifrs9-stat-row:last-child { border-bottom: none; }
      .ifrs9-table { width: 100%; border-collapse: collapse; margin: 16px 0; font-size: 13px; }
      .ifrs9-table th { background: #f9f8f5; border: 1px solid #e8e6de; padding: 10px 12px; text-align: left; font-weight: 600; color: #333; }
      .ifrs9-table td { border: 1px solid #e8e6de; padding: 10px 12px; }
      .ifrs9-table tbody tr:nth-child(odd) { background: #fefdfb; }
      .ifrs9-table tbody tr:nth-child(even) { background: #f9f8f5; }
      .ifrs9-table .code { color: #999; font-weight: 500; width: 80px; }
      .ifrs9-table .label { color: #333; }
      .ifrs9-table .number { text-align: right; font-family: 'Courier New', monospace; }
      .ifrs9-table .total { font-weight: 600; background: #f0ede6; }
      .ifrs9-table .subtotal { font-weight: 600; color: #085041; }
      .ifrs9-group-list { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 12px; }
      .ifrs9-group-item { background: white; border: 1px solid #e8e6de; border-radius: 6px; padding: 12px; cursor: pointer; transition: all 0.2s; }
      .ifrs9-group-item:hover { border-color: #1d9e75; background: #fafaf8; }
      .ifrs9-group-item-code { font-weight: 600; color: #085041; font-size: 13px; }
      .ifrs9-group-item-name { font-size: 12px; color: #666; margin-top: 4px; }
      .ifrs9-group-item-meta { font-size: 11px; color: #999; margin-top: 6px; }
      .ifrs9-status { display: inline-block; width: 8px; height: 8px; border-radius: 50%; margin-right: 6px; vertical-align: middle; }
      .ifrs9-status.ok { background: #1d9e75; }
      .ifrs9-status.pending { background: #c47b16; }
      .ifrs9-status.error { background: #c1121f; }
      .ifrs9-under-dev { background: white; border: 1px solid #e8e6de; border-radius: 6px; padding: 24px; text-align: center; color: #999; }
      .ifrs9-under-dev-icon { font-size: 32px; margin-bottom: 12px; }
      .ifrs9-under-dev-text { font-size: 14px; margin-bottom: 8px; }
      .ifrs9-under-dev-detail { font-size: 12px; color: #bbb; }
      .ifrs9-section-header { display: flex; justify-content: space-between; align-items: center; margin: 24px 0 16px 0; padding-bottom: 12px; border-bottom: 2px solid #085041; }
      .ifrs9-section-title { font-size: 16px; font-weight: 600; color: #085041; }
      .ifrs9-summary-box { background: white; border-left: 4px solid #1d9e75; padding: 12px 16px; margin: 12px 0; }
      .ifrs9-summary-label { font-size: 12px; color: #666; margin-bottom: 4px; }
      .ifrs9-summary-value { font-size: 18px; font-weight: 600; color: #085041; }
      .ifrs9-summary-percent { font-size: 13px; color: #999; margin-left: 8px; }
    `;
    document.head.appendChild(style);
  }

  const bankData = {
    name: 'Nova Banka d.d.',
    refDate: '31.12.2024',
    period: 'Q4 2024',
    currency: 'EUR thousands (€k)',
    totalAssets: 2486425,
    netLoans: 1642318,
    custDeposits: 1954205,
    cet1: 278450,
    at1: 0,
    t2: 24800,
    totalCapital: 303250,
    rwaTotal: 1631850,
    rwaCreditSA: 1382140,
    rwaMarket: 28920,
    rwaOperational: 186480,
    rwaCVA: 34310,
    cet1Ratio: 17.06,
    t1Ratio: 17.06,
    tcRatio: 18.58,
    lcr: 182.4,
    nsfr: 143.7,
    leverageRatio: 10.42,
    tier1: 278450,
    totalExposure: 2671380
  };

  switch(section) {
    case 'ifrs9-overview':
      renderIfrs9Overview(el, bankData);
      break;
    case 'ifrs9-grp-ae':
      renderGroupTemplate(el, 'AE', 'Asset Encumbrance & NPL', ['AE-ASS', 'AE-COL', 'AE-NPL', 'AE-SOU', 'AE-MAT', 'AE-CONT', 'AE-CB', 'AE-ADV1', 'AE-ADV2']);
      break;
    case 'ifrs9-grp-corepalm':
      renderGroupTemplate(el, 'ALM', 'COREP ALM', ['C 71.00', 'C 72.00', 'C 73.00', 'C 74.00', 'C 75.00', 'C 76.00']);
      break;
    case 'ifrs9-grp-corepfrtb':
      renderGroupTemplate(el, 'FRTB', 'COREP FRTB', ['C 39.01', 'C 39.02', 'C 39.03']);
      break;
    case 'ifrs9-grp-coreplcrda':
      renderGroupTemplate(el, 'LCRDA', 'COREP LCRDA', ['C 70.01', 'C 70.02', 'C 70.03', 'C 70.04']);
      break;
    case 'ifrs9-grp-coreple':
      renderGroupTemplate(el, 'LE', 'COREP Large Exposures', ['C 26.00', 'C 27.00', 'C 28.00', 'C 29.00']);
      break;
    case 'ifrs9-grp-coreplr':
      renderGroupTemplate(el, 'LR', 'COREP Leverage Ratio', ['C 43.00', 'C 44.00', 'C 45.00', 'C 46.00', 'C 47.00']);
      break;
    case 'ifrs9-grp-corepnsfr':
      renderGroupTemplate(el, 'NSFR', 'COREP NSFR', ['C 80.00', 'C 81.00']);
      break;
    case 'ifrs9-grp-corepof':
      renderGroupTemplate(el, 'OF', 'COREP Own Funds', ['C 01.00', 'C 02.00', 'C 03.00', 'C 04.00', 'C 32.01-04']);
      break;
    case 'ifrs9-grp-finrep9':
      renderGroupTemplate(el, 'FINREP9', 'FINREP', ['F 01.01', 'F 01.02', 'F 01.03', 'F 02.00', 'F 03.00', 'F 04.01-10', 'F 18.00', 'F 32.01']);
      break;
    case 'ifrs9-grp-irrbb':
      renderGroupTemplate(el, 'IRRBB', 'Interest Rate Risk in Banking Book', ['C 66.01', 'C 66.02']);
      break;
    case 'ifrs9-rep-ca':
      renderRepCA(el, bankData);
      break;
    case 'ifrs9-rep-ca5':
      renderRepCA5(el, bankData);
      break;
    case 'ifrs9-rep-gs':
      renderRepGS(el, bankData);
      break;
    case 'ifrs9-rep-cr':
      renderRepCR(el, bankData);
      break;
    case 'ifrs9-rep-ccr':
      renderRepCCR(el, bankData);
      break;
    case 'ifrs9-rep-opr':
      renderRepOPR(el, bankData);
      break;
    case 'ifrs9-rep-mkr':
      renderRepMKR(el, bankData);
      break;
    case 'ifrs9-rep-frtb':
      renderRepFRTB(el, bankData);
      break;
    case 'ifrs9-rep-le':
      renderRepLE(el, bankData);
      break;
    case 'ifrs9-rep-ccb':
      renderRepCCB(el, bankData);
      break;
    case 'ifrs9-rep-lr':
      renderRepLR(el, bankData);
      break;
    case 'ifrs9-rep-lcr':
      renderRepLCR(el, bankData);
      break;
    case 'ifrs9-rep-nsfr':
      renderRepNSFR(el, bankData);
      break;
    case 'ifrs9-rep-irrbb':
      renderRepIRRBB(el, bankData);
      break;
    case 'ifrs9-rep-ae':
      renderRepAE(el, bankData);
      break;
    case 'ifrs9-rep-npe':
      renderRepNPE(el, bankData);
      break;
    case 'ifrs9-rep-finrep':
      renderRepFinrep(el, bankData);
      break;
    case 'ifrs9-rep-srf':
      renderRepSRF(el, bankData);
      break;
    case 'ifrs9-rep-rem':
      renderRepREM(el, bankData);
      break;
    case 'ifrs9-rep-dl':
      renderRepDL(el, bankData);
      break;
    case 'ifrs9-rep-covid':
      renderRepCOVID(el, bankData);
      break;
    case 'ifrs9-rep-crypto':
      renderRepCrypto(el, bankData);
      break;
    case 'ifrs9-ecb-aa':
    case 'ifrs9-ecb-ab':
    case 'ifrs9-ecb-af':
    case 'ifrs9-ecb-an':
    case 'ifrs9-ecb-as':
    case 'ifrs9-ecb-ap':
    case 'ifrs9-ecb-av':
    case 'ifrs9-ecb-aw':
    case 'ifrs9-ecb-ae':
    case 'ifrs9-ecb-ak':
    case 'ifrs9-ecb-ad':
    case 'ifrs9-ecb-au':
    case 'ifrs9-ecb-am':
    case 'ifrs9-ecb-iz':
    case 'ifrs9-ecb-po':
    case 'ifrs9-ecb-ks':
    case 'ifrs9-ecb-oi':
    case 'ifrs9-ecb-ah':
    case 'ifrs9-ecb-ra':
    case 'ifrs9-ecb-cv':
      renderECBReport(el, section, bankData);
      break;
    case 'ifrs9-rep-kkkl':
      renderUnderDev(el, 'KKL', 'Croatian Capital Requirements');
      break;
    default:
      renderUnderDev(el, section, 'Section');
  }
};

function renderIfrs9Overview(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-header">
        <div class="ifrs9-title">IFRS9 & Regulatory Reporting</div>
        <div class="ifrs9-subtitle">Consolidated submission status for Nova Banka d.d.</div>
      </div>
      <div class="ifrs9-dashboard">
        <div class="ifrs9-card">
          <div class="ifrs9-card-title">COREP Own Funds</div>
          <div class="ifrs9-card-value">${bank.cet1Ratio}%</div>
          <div class="ifrs9-card-subtitle">CET1 Ratio</div>
          <div class="ifrs9-progress"><div class="ifrs9-progress-bar" style="width: 85%;"></div></div>
          <div class="ifrs9-stat-row"><span class="ifrs9-stat-label">Requirement</span><span class="ifrs9-stat-value">9.50%</span></div>
          <div class="ifrs9-stat-row"><span class="ifrs9-stat-label">Status</span><span class="ifrs9-stat-value" style="color: #1d9e75;"><span class="ifrs9-status ok"></span>Compliant</span></div>
        </div>
        <div class="ifrs9-card">
          <div class="ifrs9-card-title">Credit Risk SA</div>
          <div class="ifrs9-card-value">${(bank.rwaCreditSA / 1000).toFixed(0)}B</div>
          <div class="ifrs9-card-subtitle">RWA</div>
          <div class="ifrs9-stat-row"><span class="ifrs9-stat-label">Total Assets</span><span class="ifrs9-stat-value">${(bank.totalAssets / 1000).toFixed(1)}B</span></div>
          <div class="ifrs9-stat-row"><span class="ifrs9-stat-label">Risk Weight</span><span class="ifrs9-stat-value">71.8%</span></div>
        </div>
        <div class="ifrs9-card">
          <div class="ifrs9-card-title">Liquidity Coverage</div>
          <div class="ifrs9-card-value">${bank.lcr}%</div>
          <div class="ifrs9-card-subtitle">LCR Ratio</div>
          <div class="ifrs9-progress"><div class="ifrs9-progress-bar" style="width: 91%; background: #1d9e75;"></div></div>
          <div class="ifrs9-stat-row"><span class="ifrs9-stat-label">Requirement</span><span class="ifrs9-stat-value">100%</span></div>
        </div>
        <div class="ifrs9-card">
          <div class="ifrs9-card-title">Net Stable Funding</div>
          <div class="ifrs9-card-value">${bank.nsfr}%</div>
          <div class="ifrs9-card-subtitle">NSFR Ratio</div>
          <div class="ifrs9-progress"><div class="ifrs9-progress-bar" style="width: 72%; background: #1d9e75;"></div></div>
          <div class="ifrs9-stat-row"><span class="ifrs9-stat-label">Requirement</span><span class="ifrs9-stat-value">100%</span></div>
        </div>
      </div>
      <div class="ifrs9-section-header"><div class="ifrs9-section-title">Report Groups</div></div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 24px;">
        <div class="ifrs9-group-item">
          <div class="ifrs9-group-item-code">COREP</div>
          <div class="ifrs9-group-item-name">Own Funds & Capital</div>
          <div class="ifrs9-group-item-meta"><span class="ifrs9-status ok"></span>5 templates</div>
        </div>
        <div class="ifrs9-group-item">
          <div class="ifrs9-group-item-code">FINREP</div>
          <div class="ifrs9-group-item-name">Financial Statements</div>
          <div class="ifrs9-group-item-meta"><span class="ifrs9-status ok"></span>8 templates</div>
        </div>
        <div class="ifrs9-group-item">
          <div class="ifrs9-group-item-code">CROC/ILAA</div>
          <div class="ifrs9-group-item-name">Risk Disclosures</div>
          <div class="ifrs9-group-item-meta"><span class="ifrs9-status ok"></span>Pillar 3</div>
        </div>
        <div class="ifrs9-group-item">
          <div class="ifrs9-group-item-code">ECB BSI</div>
          <div class="ifrs9-group-item-name">Balance Sheet Items</div>
          <div class="ifrs9-group-item-meta"><span class="ifrs9-status pending"></span>In progress</div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderGroupTemplate(el, code, name, templates) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">${code}</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">${name}</div>
          <div style="font-size: 12px; color: #999; margin-top: 2px;">${templates.length} report templates</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <div class="ifrs9-group-list">
        ${templates.map((t, i) => `
          <div class="ifrs9-group-item">
            <div class="ifrs9-group-item-code">${t}</div>
            <div class="ifrs9-group-item-name">${name} - Template ${i + 1}</div>
            <div class="ifrs9-group-item-meta"><span class="ifrs9-status ok"></span>Ready for submission</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepCA(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 01.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Own Funds (C 01.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="code">Code</th>
            <th class="label">Description</th>
            <th class="number">Amount (€k)</th>
            <th class="number">%</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="code">010</td>
            <td class="label">Paid-up instruments</td>
            <td class="number">100,000</td>
            <td class="number">35.8%</td>
          </tr>
          <tr>
            <td class="code">020</td>
            <td class="label">Share premium</td>
            <td class="number">45,200</td>
            <td class="number">16.2%</td>
          </tr>
          <tr>
            <td class="code">030</td>
            <td class="label">Retained earnings</td>
            <td class="number">156,850</td>
            <td class="number">56.2%</td>
          </tr>
          <tr>
            <td class="code">035</td>
            <td class="label">AOCI</td>
            <td class="number">(2,380)</td>
            <td class="number">-0.9%</td>
          </tr>
          <tr>
            <td class="code">040</td>
            <td class="label">Other reserves</td>
            <td class="number">8,200</td>
            <td class="number">2.9%</td>
          </tr>
          <tr>
            <td class="code">060</td>
            <td class="label">Minority interests</td>
            <td class="number">0</td>
            <td class="number">0.0%</td>
          </tr>
          <tr class="total">
            <td class="code">070</td>
            <td class="label">CET1 before adjustments</td>
            <td class="number">307,870</td>
            <td class="number">110.3%</td>
          </tr>
          <tr>
            <td class="code">080</td>
            <td class="label">Prudential valuation adjustments (AVAs)</td>
            <td class="number">(1,820)</td>
            <td class="number">-0.7%</td>
          </tr>
          <tr>
            <td class="code">090</td>
            <td class="label">Intangible assets (net)</td>
            <td class="number">(24,800)</td>
            <td class="number">-8.9%</td>
          </tr>
          <tr>
            <td class="code">100</td>
            <td class="label">DTAs dependent on future profitability</td>
            <td class="number">(2,800)</td>
            <td class="number">-1.0%</td>
          </tr>
          <tr class="total">
            <td class="code">110</td>
            <td class="label">Total CET1 adjustments</td>
            <td class="number">(29,420)</td>
            <td class="number">-10.5%</td>
          </tr>
          <tr class="total">
            <td class="code">120</td>
            <td class="label"><strong>CET1 Capital</strong></td>
            <td class="number"><strong>278,450</strong></td>
            <td class="number"><strong>100.0%</strong></td>
          </tr>
          <tr>
            <td class="code">200</td>
            <td class="label">AT1 instruments</td>
            <td class="number">0</td>
            <td class="number">0.0%</td>
          </tr>
          <tr class="total">
            <td class="code">210</td>
            <td class="label"><strong>Tier 1 Capital</strong></td>
            <td class="number"><strong>278,450</strong></td>
            <td class="number"><strong>100.0%</strong></td>
          </tr>
          <tr>
            <td class="code">300</td>
            <td class="label">Tier 2 instruments</td>
            <td class="number">24,800</td>
            <td class="number">8.2%</td>
          </tr>
          <tr class="total">
            <td class="code">310</td>
            <td class="label"><strong>Tier 2 Capital</strong></td>
            <td class="number"><strong>24,800</strong></td>
            <td class="number"><strong>8.2%</strong></td>
          </tr>
          <tr class="total">
            <td class="code">320</td>
            <td class="label"><strong>Total Own Funds Capital</strong></td>
            <td class="number"><strong>303,250</strong></td>
            <td class="number"><strong>108.2%</strong></td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="code">400</td>
            <td class="label">Credit risk SA (RWA)</td>
            <td class="number">1,382,140</td>
            <td class="number">84.7%</td>
          </tr>
          <tr>
            <td class="code">410</td>
            <td class="label">Settlement risk (RWA)</td>
            <td class="number">0</td>
            <td class="number">0.0%</td>
          </tr>
          <tr>
            <td class="code">420</td>
            <td class="label">CVA risk (RWA)</td>
            <td class="number">34,310</td>
            <td class="number">2.1%</td>
          </tr>
          <tr>
            <td class="code">430</td>
            <td class="label">Operational risk BIA (RWA)</td>
            <td class="number">186,480</td>
            <td class="number">11.4%</td>
          </tr>
          <tr>
            <td class="code">440</td>
            <td class="label">Market risk SA (RWA)</td>
            <td class="number">28,920</td>
            <td class="number">1.8%</td>
          </tr>
          <tr class="total">
            <td class="code">450</td>
            <td class="label"><strong>Total RWA</strong></td>
            <td class="number"><strong>1,631,850</strong></td>
            <td class="number"><strong>100.0%</strong></td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="code">500</td>
            <td class="label">CET1 Ratio</td>
            <td class="number">${bank.cet1Ratio}%</td>
            <td class="number">Req 4.5%</td>
          </tr>
          <tr>
            <td class="code">510</td>
            <td class="label">Tier 1 Ratio</td>
            <td class="number">${bank.t1Ratio}%</td>
            <td class="number">Req 6.0%</td>
          </tr>
          <tr>
            <td class="code">520</td>
            <td class="label">Total Capital Ratio</td>
            <td class="number">${bank.tcRatio}%</td>
            <td class="number">Req 8.0%</td>
          </tr>
          <tr>
            <td class="code">530</td>
            <td class="label">CET1 Min. Requirement</td>
            <td class="number">9.50%</td>
            <td class="number">Incl. buffers</td>
          </tr>
          <tr>
            <td class="code">540</td>
            <td class="label">CET1 Surplus</td>
            <td class="number">121,050</td>
            <td class="number">7.56%</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">CET1 Capital Requirement Breakdown</div>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-top: 12px;">
          <div>
            <div style="font-size: 12px; color: #666;">Pillar 1</div>
            <div style="font-size: 14px; font-weight: 600; color: #333;">4.50%</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">CCB</div>
            <div style="font-size: 14px; font-weight: 600; color: #333;">2.50%</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">SyRB</div>
            <div style="font-size: 14px; font-weight: 600; color: #333;">1.50%</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">O-SII</div>
            <div style="font-size: 14px; font-weight: 600; color: #333;">1.00%</div>
          </div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepCA5(el, bank) {
  const ceaAvailable = bank.cet1 - 73433;
  const ccbReq = bank.rwaTotal * 0.025;
  const sybReq = bank.rwaTotal * 0.015;
  const osiReq = bank.rwaTotal * 0.010;

  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 05.01</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Capital Buffers (C 05.01)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Buffer Requirement</th>
            <th class="number">Rate</th>
            <th class="number">Amount (€k)</th>
            <th class="number">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">CET1 Available for Buffers</td>
            <td class="number">—</td>
            <td class="number">${ceaAvailable.toLocaleString()}</td>
            <td class="number">Base for buffers</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Capital Conservation Buffer (CCB)</td>
            <td class="number">2.50%</td>
            <td class="number">${ccbReq.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
            <td class="number"><span class="ifrs9-status ok"></span>Compliant</td>
          </tr>
          <tr>
            <td class="label">Systemic Risk Buffer (SyRB)</td>
            <td class="number">1.50%</td>
            <td class="number">${sybReq.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
            <td class="number"><span class="ifrs9-status ok"></span>Compliant</td>
          </tr>
          <tr>
            <td class="label">O-SII Buffer</td>
            <td class="number">1.00%</td>
            <td class="number">${osiReq.toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
            <td class="number"><span class="ifrs9-status ok"></span>Compliant</td>
          </tr>
          <tr>
            <td class="label">Countercyclical Buffer (CCyB)</td>
            <td class="number">0.00%</td>
            <td class="number">0</td>
            <td class="number">N/A</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Total Buffer Requirements</div>
        <div class="ifrs9-summary-value">${(5.00).toFixed(2)}% of RWA</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepGS(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 06.01</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Group Solvency (C 06.01)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Metric</th>
            <th class="number">Solo</th>
            <th class="number">Consolidated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Entity Type</td>
            <td class="number">Solo</td>
            <td class="number">N/A</td>
          </tr>
          <tr>
            <td class="label">Consolidation Method</td>
            <td class="number">N/A</td>
            <td class="number">Full consolidation</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">CET1 Ratio</td>
            <td class="number">${bank.cet1Ratio}%</td>
            <td class="number">${bank.cet1Ratio}%</td>
          </tr>
          <tr>
            <td class="label">Tier 1 Ratio</td>
            <td class="number">${bank.t1Ratio}%</td>
            <td class="number">${bank.t1Ratio}%</td>
          </tr>
          <tr>
            <td class="label">Total Capital Ratio</td>
            <td class="number">${bank.tcRatio}%</td>
            <td class="number">${bank.tcRatio}%</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Qualifying Holdings in Financial Sector</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Deductions from Own Funds</td>
            <td class="number">29,420</td>
            <td class="number">29,420</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepCR(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 07.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Credit Risk - Standardised Approach (C 07.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Exposure Class</th>
            <th class="number">Gross Exposure (€k)</th>
            <th class="number">Net Exposure (€k)</th>
            <th class="number">Risk Weight</th>
            <th class="number">RWA (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Central govts & central banks</td>
            <td class="number">418,920</td>
            <td class="number">418,920</td>
            <td class="number">0%</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Regional/local authorities</td>
            <td class="number">0</td>
            <td class="number">0</td>
            <td class="number">20%</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Public sector entities</td>
            <td class="number">12,450</td>
            <td class="number">12,450</td>
            <td class="number">20%</td>
            <td class="number">2,490</td>
          </tr>
          <tr>
            <td class="label">Multilateral development banks</td>
            <td class="number">8,200</td>
            <td class="number">8,200</td>
            <td class="number">0%</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Institutions</td>
            <td class="number">95,380</td>
            <td class="number">95,380</td>
            <td class="number">20%</td>
            <td class="number">19,076</td>
          </tr>
          <tr>
            <td class="label">Corporates</td>
            <td class="number">682,450</td>
            <td class="number">682,450</td>
            <td class="number">100%</td>
            <td class="number">682,450</td>
          </tr>
          <tr>
            <td class="label">Retail (all types)</td>
            <td class="number">284,150</td>
            <td class="number">284,150</td>
            <td class="number">75%</td>
            <td class="number">213,113</td>
          </tr>
          <tr>
            <td class="label">Secured by immovable property</td>
            <td class="number">312,480</td>
            <td class="number">312,480</td>
            <td class="number">42.5% avg</td>
            <td class="number">156,240</td>
          </tr>
          <tr>
            <td class="label">Exposures in default</td>
            <td class="number">48,920</td>
            <td class="number">48,920</td>
            <td class="number">150%</td>
            <td class="number">73,380</td>
          </tr>
          <tr>
            <td class="label">High-risk exposures</td>
            <td class="number">8,450</td>
            <td class="number">8,450</td>
            <td class="number">150%</td>
            <td class="number">12,675</td>
          </tr>
          <tr>
            <td class="label">Covered bonds</td>
            <td class="number">0</td>
            <td class="number">0</td>
            <td class="number">10%</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Equity exposures</td>
            <td class="number">18,320</td>
            <td class="number">18,320</td>
            <td class="number">100%</td>
            <td class="number">18,320</td>
          </tr>
          <tr>
            <td class="label">Other items</td>
            <td class="number">34,716</td>
            <td class="number">34,716</td>
            <td class="number">589% avg</td>
            <td class="number">204,396</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>TOTAL</strong></td>
            <td class="number"><strong>1,924,436</strong></td>
            <td class="number"><strong>1,924,436</strong></td>
            <td class="number"><strong>71.8% avg</strong></td>
            <td class="number"><strong>1,382,140</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepCCR(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 34.01</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Counterparty Credit Risk - SA (C 34.01)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Risk Category</th>
            <th class="number">Exposure (€k)</th>
            <th class="number">RWA (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Interest Rate Derivatives (IRD)</td>
            <td class="number">12,450</td>
            <td class="number">2,490</td>
          </tr>
          <tr>
            <td class="label">FX Derivatives</td>
            <td class="number">8,320</td>
            <td class="number">1,664</td>
          </tr>
          <tr>
            <td class="label">Equity Derivatives</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Credit Derivatives</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Commodity Derivatives</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Securities Financing Transactions (SFTs)</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>TOTAL EAD after CRM</strong></td>
            <td class="number"><strong>20,770</strong></td>
            <td class="number"><strong>4,154</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">CCR Risk Weight Average</div>
        <div class="ifrs9-summary-value">20.0%</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepOPR(el, bank) {
  const avgIndicator = 99453;
  const oprReq = avgIndicator * 0.15;
  const rwa = oprReq * 12.5;

  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 16.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Operational Risk - BIA (C 16.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Metric</th>
            <th class="number">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Relevant Indicator Y-3</td>
            <td class="number">92,840</td>
          </tr>
          <tr>
            <td class="label">Relevant Indicator Y-2</td>
            <td class="number">98,420</td>
          </tr>
          <tr>
            <td class="label">Relevant Indicator Y-1</td>
            <td class="number">107,100</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>Three-Year Average</strong></td>
            <td class="number"><strong>${avgIndicator.toLocaleString()}</strong></td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">BIA Applicable Rate</td>
            <td class="number">15%</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>Own Funds Requirement</strong></td>
            <td class="number"><strong>${(oprReq).toLocaleString('en-US', {maximumFractionDigits: 0})}</strong></td>
          </tr>
          <tr>
            <td class="label">RWA (= OFR × 12.5)</td>
            <td class="number">${(rwa).toLocaleString('en-US', {maximumFractionDigits: 0})}</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">OPR Contribution to RWA</div>
        <div class="ifrs9-summary-value">${((rwa / bank.rwaTotal) * 100).toFixed(1)}%</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepMKR(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 22.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Market Risk - SA FX (C 22.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Currency</th>
            <th class="number">Long Position (€k)</th>
            <th class="number">Short Position (€k)</th>
            <th class="number">Net Position (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">USD</td>
            <td class="number">8,420</td>
            <td class="number">(6,180)</td>
            <td class="number">2,240</td>
          </tr>
          <tr>
            <td class="label">GBP</td>
            <td class="number">3,280</td>
            <td class="number">(2,840)</td>
            <td class="number">440</td>
          </tr>
          <tr>
            <td class="label">CHF</td>
            <td class="number">12,840</td>
            <td class="number">(11,920)</td>
            <td class="number">920</td>
          </tr>
          <tr>
            <td class="label">JPY</td>
            <td class="number">1,180</td>
            <td class="number">(980)</td>
            <td class="number">200</td>
          </tr>
          <tr>
            <td class="label">Other</td>
            <td class="number">2,650</td>
            <td class="number">(1,890)</td>
            <td class="number">760</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>TOTAL</strong></td>
            <td class="number"><strong>28,370</strong></td>
            <td class="number"><strong>(23,810)</strong></td>
            <td class="number"><strong>4,560</strong></td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Gold exposure</td>
            <td class="number">0</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">FX Own Funds Requirement (8%)</div>
        <div class="ifrs9-summary-value">365 €k</div>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">
          Overall net open FX position: 4,560 €k | RWA contribution: 28,920 €k
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepFRTB(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 39.01-03</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Fundamental Review of Trading Book - FRTB</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Risk Component</th>
            <th class="number">Value (€k)</th>
            <th class="number">RWA (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Default Risk Charge (DRC)</td>
            <td class="number">—</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Residual Risk Add-On (RRAO)</td>
            <td class="number">—</td>
            <td class="number">0</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Sensitivity delta: equity</td>
            <td class="number">420</td>
            <td class="number">5,250</td>
          </tr>
          <tr>
            <td class="label">Sensitivity delta: interest rates</td>
            <td class="number">1,850</td>
            <td class="number">23,125</td>
          </tr>
          <tr>
            <td class="label">Sensitivity delta: FX</td>
            <td class="number">280</td>
            <td class="number">3,500</td>
          </tr>
          <tr>
            <td class="label">Sensitivity vega</td>
            <td class="number">150</td>
            <td class="number">1,875</td>
          </tr>
          <tr>
            <td class="label">Sensitivity curvature</td>
            <td class="number">180</td>
            <td class="number">2,250</td>
          </tr>
          <tr>
            <td class="label">Correlation trading portfolio</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>Total FRTB RWA</strong></td>
            <td class="number">—</td>
            <td class="number"><strong>36,000</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">FRTB as % of Total RWA</div>
        <div class="ifrs9-summary-value">2.2%</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepLE(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 26.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Large Exposures (C 26.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Counterparty</th>
            <th class="number">LE ID</th>
            <th class="number">Exposure Before CRM (€k)</th>
            <th class="number">Exposure After CRM (€k)</th>
            <th class="number">% of Eligible Capital</th>
            <th class="number">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Republic of Croatia</td>
            <td class="number">001</td>
            <td class="number">285,400</td>
            <td class="number">285,400</td>
            <td class="number">94.1%</td>
            <td class="number" style="color: #666;">EXEMPT (sovereign)</td>
          </tr>
          <tr>
            <td class="label">Croatian National Bank (HNB)</td>
            <td class="number">002</td>
            <td class="number">95,200</td>
            <td class="number">95,200</td>
            <td class="number">31.4%</td>
            <td class="number" style="color: #666;">EXEMPT (CB)</td>
          </tr>
          <tr>
            <td class="label">ABC Holding d.d.</td>
            <td class="number">003</td>
            <td class="number">48,350</td>
            <td class="number">38,680</td>
            <td class="number">12.8%</td>
            <td class="number" style="color: #c47b16;"><span class="ifrs9-status warning"></span>NOT EXEMPT</td>
          </tr>
          <tr>
            <td class="label">XYZ Group</td>
            <td class="number">004</td>
            <td class="number">35,180</td>
            <td class="number">28,144</td>
            <td class="number">9.3%</td>
            <td class="number" style="color: #999;">Below threshold</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Eligible Capital for LE Calculation</div>
        <div class="ifrs9-summary-value">303,250 €k</div>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">
          Large Exposures Limit: 25% of eligible capital (75,813 €k)
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepCCB(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 40.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Capital Conservation Buffer (C 40.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Metric</th>
            <th class="number">Amount (€k)</th>
            <th class="number">Rate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">CET1 Capital</td>
            <td class="number">${bank.cet1.toLocaleString()}</td>
            <td class="number">—</td>
          </tr>
          <tr>
            <td class="label">Pillar 1 Min Requirement (4.5% of RWA)</td>
            <td class="number">73,433</td>
            <td class="number">4.50%</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>CET1 Available for Buffers</strong></td>
            <td class="number"><strong>205,017</strong></td>
            <td class="number">—</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">CCB Requirement (2.5% of RWA)</td>
            <td class="number">40,796</td>
            <td class="number">2.50%</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>CCB Surplus</strong></td>
            <td class="number"><strong>164,221</strong></td>
            <td class="number">—</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Profit Distribution Restrictions</td>
            <td class="number">NONE</td>
            <td class="number">Above 1.25x req</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">CCB Compliance Status</div>
        <div class="ifrs9-summary-value" style="color: #1d9e75;"><span class="ifrs9-status ok"></span>FULLY COMPLIANT</div>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">
          CET1 ratio of 17.06% exceeds minimum requirement of 7.00% (Pillar 1 + CCB)
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepLR(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 43.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Leverage Ratio (C 43.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Metric</th>
            <th class="number">Amount (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Tier 1 Capital</td>
            <td class="number">${bank.tier1.toLocaleString()}</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">On-balance sheet exposures (excl. derivatives/SFTs)</td>
            <td class="number">2,486,425</td>
          </tr>
          <tr>
            <td class="label">Derivatives add-on (SA-CCR/MtM)</td>
            <td class="number">12,485</td>
          </tr>
          <tr>
            <td class="label">SFT exposures</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Off-balance sheet items (pre-CCF)</td>
            <td class="number">215,840</td>
          </tr>
          <tr>
            <td class="label">Off-balance sheet (post-CCF 80%)</td>
            <td class="number">172,470</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>Total Exposure Measure</strong></td>
            <td class="number"><strong>${bank.totalExposure.toLocaleString()}</strong></td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label"><strong>LEVERAGE RATIO</strong></td>
            <td class="number"><strong>${bank.leverageRatio}%</strong></td>
          </tr>
          <tr>
            <td class="label">Minimum Requirement</td>
            <td class="number">3.00%</td>
          </tr>
          <tr>
            <td class="label">G-SII Additional Requirement</td>
            <td class="number">0.50% (N/A)</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">LR Compliance Margin</div>
        <div class="ifrs9-summary-value">${(bank.leverageRatio - 3.00).toFixed(2)}%</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepLCR(el, bank) {
  const hqlaL1 = 186420;
  const hqlaL2a = 24098;
  const hqlaL2b = 7258;
  const totalHQLA = 217776;
  const grossOutflows = 180250;
  const inflows = 60856;
  const netOutflows = 119394;
  const lcr = (totalHQLA / netOutflows) * 100;

  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 72.00-76.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Liquidity Coverage Ratio (C 72.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">High-Quality Liquid Assets (HQLA)</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">HQLA Level</th>
              <th class="number">Gross (€k)</th>
              <th class="number">Haircut</th>
              <th class="number">Net (€k)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Level 1: CB reserves & gov bonds</td>
              <td class="number">186,420</td>
              <td class="number">0%</td>
              <td class="number">186,420</td>
            </tr>
            <tr>
              <td class="label">Level 2A: AA- covered bonds</td>
              <td class="number">28,350</td>
              <td class="number">15%</td>
              <td class="number">24,098</td>
            </tr>
            <tr>
              <td class="label">Level 2B: Corporate bonds (40% haircut)</td>
              <td class="number">12,100</td>
              <td class="number">40%</td>
              <td class="number">7,258</td>
            </tr>
            <tr class="total">
              <td class="label"><strong>Total HQLA</strong></td>
              <td class="number"><strong>226,870</strong></td>
              <td class="number">—</td>
              <td class="number"><strong>217,776</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">Net Cash Outflows (30-day period)</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">Cash Outflow Category</th>
              <th class="number">Amount (€k)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Retail stable deposits (5% rate)</td>
              <td class="number">4,771</td>
            </tr>
            <tr>
              <td class="label">Retail less stable (10% rate)</td>
              <td class="number">4,835</td>
            </tr>
            <tr>
              <td class="label">Operational wholesale deposits (25%)</td>
              <td class="number">31,145</td>
            </tr>
            <tr>
              <td class="label">Non-operational wholesale deposits (100%)</td>
              <td class="number">85,240</td>
            </tr>
            <tr>
              <td class="label">Secured financing outflows</td>
              <td class="number">12,580</td>
              </tr>
            <tr>
              <td class="label">Derivative and other outflows</td>
              <td class="number">8,420</td>
            </tr>
            <tr>
              <td class="label">Debt issued & contingent outflows</td>
              <td class="number">33,259</td>
            </tr>
            <tr class="total">
              <td class="label"><strong>Total Outflows (30-day)</strong></td>
              <td class="number"><strong>${grossOutflows.toLocaleString()}</strong></td>
            </tr>
            <tr style="border-top: 2px solid #e8e6de;">
              <td class="label">Cash inflows (capped 75% of outflows)</td>
              <td class="number">60,856</td>
            </tr>
            <tr class="total">
              <td class="label"><strong>Net Cash Outflows</strong></td>
              <td class="number"><strong>${netOutflows.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">LCR Calculation</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 12px;">
          <div>
            <div style="font-size: 12px; color: #666;">HQLA</div>
            <div style="font-size: 14px; font-weight: 600;">217,776 €k</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">NCO</div>
            <div style="font-size: 14px; font-weight: 600;">119,394 €k</div>
          </div>
        </div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e8e6de;">
          <div style="font-size: 12px; color: #666;">Liquidity Coverage Ratio</div>
          <div class="ifrs9-summary-value">${bank.lcr}%</div>
          <div style="margin-top: 4px; font-size: 12px; color: #1d9e75;">Requirement: 100% | Compliant: Yes</div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepNSFR(el, bank) {
  const asf = 2042180;
  const rsf = 1421450;
  const nsfr = (asf / rsf) * 100;

  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 80.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Net Stable Funding Ratio (C 80.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">Available Stable Funding (ASF)</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">Funding Source</th>
              <th class="number">Amount (€k)</th>
              <th class="number">ASF Rate</th>
              <th class="number">Weighted (€k)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Tier 1 & Tier 2 capital</td>
              <td class="number">303,250</td>
              <td class="number">100%</td>
              <td class="number">303,250</td>
            </tr>
            <tr>
              <td class="label">Other liabilities >1 year</td>
              <td class="number">24,800</td>
              <td class="number">100%</td>
              <td class="number">24,800</td>
            </tr>
            <tr>
              <td class="label">Retail deposits (stable) <1y</td>
              <td class="number">942,580</td>
              <td class="number">95%</td>
              <td class="number">895,451</td>
            </tr>
            <tr>
              <td class="label">Retail deposits (less stable) <1y</td>
              <td class="number">480,240</td>
              <td class="number">90%</td>
              <td class="number">432,216</td>
            </tr>
            <tr>
              <td class="label">Operational wholesale deposits</td>
              <td class="number">318,420</td>
              <td class="number">50%</td>
              <td class="number">159,210</td>
            </tr>
            <tr>
              <td class="label">Other wholesale funding <1y</td>
              <td class="number">88,740</td>
              <td class="number">0%</td>
              <td class="number">0</td>
            </tr>
            <tr class="total">
              <td class="label"><strong>Total ASF</strong></td>
              <td class="number"><strong>2,158,030</strong></td>
              <td class="number">—</td>
              <td class="number"><strong>${asf.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">Required Stable Funding (RSF)</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">Asset Category</th>
              <th class="number">Amount (€k)</th>
              <th class="number">RSF Rate</th>
              <th class="number">Weighted (€k)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">HQLA Level 1 (excl. CB) unencumbered</td>
              <td class="number">85,620</td>
              <td class="number">5%</td>
              <td class="number">4,281</td>
            </tr>
            <tr>
              <td class="label">CB excess reserves</td>
              <td class="number">92,380</td>
              <td class="number">0%</td>
              <td class="number">0</td>
            </tr>
            <tr>
              <td class="label">Loans to fin inst <6m maturity</td>
              <td class="number">45,280</td>
              <td class="number">10%</td>
              <td class="number">4,528</td>
            </tr>
            <tr>
              <td class="label">Loans to non-fin corps (>1y, perf)</td>
              <td class="number">682,450</td>
              <td class="number">65%</td>
              <td class="number">443,593</td>
            </tr>
            <tr>
              <td class="label">Retail/SME mortgages</td>
              <td class="number">312,480</td>
              <td class="number">65%</td>
              <td class="number">203,112</td>
            </tr>
            <tr>
              <td class="label">Other retail loans (>1y)</td>
              <td class="number">284,150</td>
              <td class="number">65%</td>
              <td class="number">184,698</td>
            </tr>
            <tr>
              <td class="label">Loans in default (stage 3)</td>
              <td class="number">48,920</td>
              <td class="number">100%</td>
              <td class="number">48,920</td>
            </tr>
            <tr>
              <td class="label">Encumbered assets >1 year</td>
              <td class="number">125,480</td>
              <td class="number">100%</td>
              <td class="number">125,480</td>
            </tr>
            <tr>
              <td class="label">Other assets</td>
              <td class="number">406,838</td>
              <td class="number">100%</td>
              <td class="number">406,838</td>
            </tr>
            <tr class="total">
              <td class="label"><strong>Total RSF</strong></td>
              <td class="number"><strong>2,085,598</strong></td>
              <td class="number">—</td>
              <td class="number"><strong>${rsf.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">NSFR Calculation</div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 12px;">
          <div>
            <div style="font-size: 12px; color: #666;">Available Stable Funding</div>
            <div style="font-size: 14px; font-weight: 600;">${asf.toLocaleString()} €k</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">Required Stable Funding</div>
            <div style="font-size: 14px; font-weight: 600;">${rsf.toLocaleString()} €k</div>
          </div>
        </div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e8e6de;">
          <div style="font-size: 12px; color: #666;">NSFR</div>
          <div class="ifrs9-summary-value">${bank.nsfr}%</div>
          <div style="margin-top: 4px; font-size: 12px; color: #1d9e75;">Requirement: 100% | Compliant: Yes</div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepIRRBB(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">C 66.01</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Interest Rate Risk in Banking Book (C 66.01)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">EVE Scenarios (Economic Value of Equity Changes)</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">Scenario</th>
              <th class="number">EVE Change (€k)</th>
              <th class="number">% of Tier 1 Capital</th>
              <th class="number">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Parallel up (+200bps)</td>
              <td class="number">(28,450)</td>
              <td class="number">-10.22%</td>
              <td class="number" style="color: #666;">Within range</td>
            </tr>
            <tr>
              <td class="label">Parallel down (-200bps)</td>
              <td class="number">18,920</td>
              <td class="number">6.80%</td>
              <td class="number" style="color: #666;">Within range</td>
            </tr>
            <tr>
              <td class="label">Steepener (+100/-100bps)</td>
              <td class="number">(12,380)</td>
              <td class="number">-4.45%</td>
              <td class="number" style="color: #666;">Within range</td>
            </tr>
            <tr>
              <td class="label">Flattener (-100/+100bps)</td>
              <td class="number">8,420</td>
              <td class="number">3.02%</td>
              <td class="number" style="color: #666;">Within range</td>
            </tr>
            <tr>
              <td class="label">Short rates up (+200bps)</td>
              <td class="number">(15,840)</td>
              <td class="number">-5.69%</td>
              <td class="number" style="color: #666;">Within range</td>
            </tr>
            <tr>
              <td class="label">Short rates down (-200bps)</td>
              <td class="number">9,280</td>
              <td class="number">3.33%</td>
              <td class="number" style="color: #666;">Within range</td>
            </tr>
            <tr style="border-top: 2px solid #e8e6de;">
              <td class="label"><strong>LARGEST DECLINE (Parallel Up)</strong></td>
              <td class="number"><strong>(28,450)</strong></td>
              <td class="number"><strong>-10.22%</strong></td>
              <td class="number" style="color: #c47b16;"><span class="ifrs9-status warning"></span>Monitor</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="margin-bottom: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">NII Sensitivity (6-month static period)</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">Scenario</th>
              <th class="number">NII Impact (€k)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">Parallel up +200bps</td>
              <td class="number">12,480</td>
            </tr>
            <tr>
              <td class="label">Parallel down -200bps</td>
              <td class="number">(8,920)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">IRRBB Assessment</div>
        <div style="margin-top: 12px; font-size: 12px; color: #666;">
          <div style="margin-bottom: 8px;">
            <span style="font-weight: 600;">Supervisory Outlier Test Result:</span> <span style="color: #c47b16;">OUTLIER (>15% threshold)</span>
          </div>
          <div>Largest EVE decline of 10.22% is below the 15% threshold. Bank is classified as <strong>non-outlier</strong> for IRRBB purposes.</div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepAE(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">F 32.01</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Asset Encumbrance (F 32.01)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Asset Category</th>
            <th class="number">Total Assets (€k)</th>
            <th class="number">Encumbered (€k)</th>
            <th class="number">Unencumbered (€k)</th>
            <th class="number">Encumbrance %</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Loans and advances</td>
            <td class="number">1,856,138</td>
            <td class="number">95,280</td>
            <td class="number">1,760,858</td>
            <td class="number">5.13%</td>
          </tr>
          <tr>
            <td class="label">Debt securities</td>
            <td class="number">118,440</td>
            <td class="number">25,480</td>
            <td class="number">92,960</td>
            <td class="number">21.52%</td>
          </tr>
          <tr>
            <td class="label">Cash & CB balances</td>
            <td class="number">312,155</td>
            <td class="number">4,720</td>
            <td class="number">307,435</td>
            <td class="number">1.51%</td>
          </tr>
          <tr>
            <td class="label">Other assets</td>
            <td class="number">199,692</td>
            <td class="number">0</td>
            <td class="number">199,692</td>
            <td class="number">0.00%</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>TOTAL ASSETS</strong></td>
            <td class="number"><strong">2,486,425</strong></td>
            <td class="number"><strong>125,480</strong></td>
            <td class="number"><strong>2,360,945</strong></td>
            <td class="number"><strong>5.04%</strong></td>
          </tr>
        </tbody>
      </table>
      <div style="margin-bottom: 20px; margin-top: 20px;">
        <div style="font-size: 14px; font-weight: 600; color: #085041; margin-bottom: 12px;">Encumbrances by Collateral Purpose</div>
        <table class="ifrs9-table">
          <thead>
            <tr>
              <th class="label">Purpose</th>
              <th class="number">Amount (€k)</th>
              <th class="number">% of Total Encumbered</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="label">CB repo facilities</td>
              <td class="number">85,420</td>
              <td class="number">68.0%</td>
            </tr>
            <tr>
              <td class="label">Covered bond issuance</td>
              <td class="number">40,060</td>
              <td class="number">31.9%</td>
            </tr>
            <tr>
              <td class="label">Other pledges</td>
              <td class="number">0</td>
              <td class="number">0.0%</td>
            </tr>
            <tr class="total">
              <td class="label"><strong>Total Encumbered</strong></td>
              <td class="number"><strong>125,480</strong></td>
              <td class="number"><strong>100.0%</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Asset Encumbrance Ratio</div>
        <div class="ifrs9-summary-value">5.04%</div>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">
          Relatively low encumbrance level indicates flexibility for future funding
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepNPE(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">F 18.00</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">NPE & Loan Commitments (F 18.00)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Loan Commitment Category</th>
            <th class="number">Amount (€k)</th>
            <th class="number">NPE Portion (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Total Loan Commitments</td>
            <td class="number">215,840</td>
            <td class="number">17,420</td>
          </tr>
          <tr>
            <td class="label">Performing commitments</td>
            <td class="number">198,420</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Non-performing commitments</td>
            <td class="number">17,420</td>
            <td class="number">17,420</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Of which: forborne</td>
            <td class="number">8,240</td>
            <td class="number">8,240</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">NPE Ratio for Loan Commitments</div>
        <div class="ifrs9-summary-value">8.07%</div>
        <div style="margin-top: 8px; font-size: 12px; color: #666;">
          17,420 / 215,840 = 8.07% | Forborne exposure: 8,240 €k (47% of NPE commitments)
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepFinrep(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">F 01.01</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Balance Sheet - Assets (F 01.01)</div>
        </div>
        <div class="ifrs9-pill corep">FINREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="code">Code</th>
            <th class="label">Asset Category</th>
            <th class="number">Amount (€k)</th>
            <th class="number">% of Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="code">010</td>
            <td class="label">Cash and CB balances</td>
            <td class="number">312,155</td>
            <td class="number">12.55%</td>
          </tr>
          <tr>
            <td class="code">020</td>
            <td class="label">Financial assets HFT</td>
            <td class="number">18,420</td>
            <td class="number">0.74%</td>
          </tr>
          <tr>
            <td class="code">030</td>
            <td class="label">FA designated FVtPL</td>
            <td class="number">0</td>
            <td class="number">0.00%</td>
          </tr>
          <tr>
            <td class="code">040</td>
            <td class="label">FA mandatory FVtPL</td>
            <td class="number">8,240</td>
            <td class="number">0.33%</td>
          </tr>
          <tr>
            <td class="code">050</td>
            <td class="label">FA FVtOCI (debt securities)</td>
            <td class="number">215,840</td>
            <td class="number">8.68%</td>
          </tr>
          <tr>
            <td class="code">050a</td>
            <td class="label">FA FVtOCI (equity)</td>
            <td class="number">12,480</td>
            <td class="number">0.50%</td>
          </tr>
          <tr>
            <td class="code">060</td>
            <td class="label">FA at amortised cost</td>
            <td class="number">1,856,138</td>
            <td class="number">74.68%</td>
          </tr>
          <tr style="padding-left: 20px;">
            <td class="code">061</td>
            <td class="label">  └─ Loans to credit institutions</td>
            <td class="number">95,380</td>
            <td class="number">3.84%</td>
          </tr>
          <tr style="padding-left: 20px;">
            <td class="code">062</td>
            <td class="label">  └─ Loans to customers</td>
            <td class="number">1,642,318</td>
            <td class="number">66.06%</td>
          </tr>
          <tr style="padding-left: 20px;">
            <td class="code">063</td>
            <td class="label">  └─ Debt securities</td>
            <td class="number">118,440</td>
            <td class="number">4.77%</td>
          </tr>
          <tr>
            <td class="code">070</td>
            <td class="label">Hedging derivatives</td>
            <td class="number">2,480</td>
            <td class="number">0.10%</td>
          </tr>
          <tr>
            <td class="code">080</td>
            <td class="label">FV changes of hedged items</td>
            <td class="number">0</td>
            <td class="number">0.00%</td>
          </tr>
          <tr>
            <td class="code">090</td>
            <td class="label">PPE</td>
            <td class="number">48,420</td>
            <td class="number">1.95%</td>
          </tr>
          <tr>
            <td class="code">100</td>
            <td class="label">Investment property</td>
            <td class="number">8,280</td>
            <td class="number">0.33%</td>
          </tr>
          <tr>
            <td class="code">110</td>
            <td class="label">Intangible assets & goodwill</td>
            <td class="number">24,800</td>
            <td class="number">1.00%</td>
          </tr>
          <tr>
            <td class="code">120</td>
            <td class="label">Tax assets</td>
            <td class="number">4,820</td>
            <td class="number">0.19%</td>
          </tr>
          <tr>
            <td class="code">130</td>
            <td class="label">Other assets</td>
            <td class="number">38,152</td>
            <td class="number">1.54%</td>
          </tr>
          <tr>
            <td class="code">140</td>
            <td class="label">Non-current assets HFS</td>
            <td class="number">0</td>
            <td class="number">0.00%</td>
          </tr>
          <tr class="total">
            <td class="code">150</td>
            <td class="label"><strong>TOTAL ASSETS</strong></td>
            <td class="number"><strong>2,486,425</strong></td>
            <td class="number"><strong>100.0%</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Key Asset Composition</div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px;">
          <div>
            <div style="font-size: 12px; color: #666;">Loans & Advances</div>
            <div style="font-size: 14px; font-weight: 600;">1,737,698 €k</div>
            <div style="font-size: 11px; color: #999;">69.9% of total</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">Securities</div>
            <div style="font-size: 14px; font-weight: 600;">354,560 €k</div>
            <div style="font-size: 11px; color: #999;">14.3% of total</div>
          </div>
          <div>
            <div style="font-size: 12px; color: #666;">Liquid Assets</div>
            <div style="font-size: 14px; font-weight: 600;">330,295 €k</div>
            <div style="font-size: 11px; color: #999;">13.3% of total</div>
          </div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepSRF(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">SRF</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Single Resolution Fund Contributions</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Metric</th>
            <th class="number">Amount (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Total covered deposits</td>
            <td class="number">842,480</td>
          </tr>
          <tr>
            <td class="label">SRF target level (1% of covered deposits)</td>
            <td class="number">8,425</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Annual contribution</td>
            <td class="number">8,425</td>
          </tr>
          <tr>
            <td class="label">Adjusted for bank-specific risk</td>
            <td class="number">9,248</td>
          </tr>
          <tr>
            <td class="label">Irrevocable payment commitments</td>
            <td class="number">924</td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepREM(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">Pillar 3</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Remuneration Disclosure</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Staff Category</th>
            <th class="number">Count</th>
            <th class="number">Fixed Rem (€k)</th>
            <th class="number">Variable Rem (€k)</th>
            <th class="number">V/F Ratio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Total staff</td>
            <td class="number">—</td>
            <td class="number">18,420</td>
            <td class="number">8,620</td>
            <td class="number">46.8%</td>
          </tr>
          <tr style="border-top: 2px solid #e8e6de;">
            <td class="label">Identified staff (MRT)</td>
            <td class="number">42</td>
            <td class="number">8,480</td>
            <td class="number">3,820</td>
            <td class="number">45.0%</td>
          </tr>
          <tr>
            <td class="label">Senior management</td>
            <td class="number">12</td>
            <td class="number">3,240</td>
            <td class="number">1,840</td>
            <td class="number">56.8%</td>
          </tr>
          <tr>
            <td class="label">Risk takers</td>
            <td class="number">18</td>
            <td class="number">2,850</td>
            <td class="number">1,520</td>
            <td class="number">53.3%</td>
          </tr>
          <tr>
            <td class="label">Control function staff</td>
            <td class="number">12</td>
            <td class="number">2,390</td>
            <td class="number">460</td>
            <td class="number">19.3%</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Variable Remuneration Deferral</div>
        <div style="margin-top: 12px; font-size: 12px; color: #666;">
          <div style="margin-bottom: 8px;">
            <span style="font-weight: 600;">Identified Staff Deferral:</span> 60% (within regulatory range of 50-70%)
          </div>
          <div>
            <span style="font-weight: 600;">Total Variable Rem / Fixed Rem:</span> 46.8% (within 100% limit)
          </div>
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepDL(el, bank) {
  renderUnderDev(el, 'Data Lineage', 'System metadata repository and audit trail');
}

function renderRepCOVID(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">COVID</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">COVID-19 Support Measures (Historical)</div>
        </div>
        <div class="ifrs9-pill warning">Closed</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Measure Type</th>
            <th class="number">Peak Exposure (€k)</th>
            <th class="number">Currently Outstanding (€k)</th>
            <th class="number">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Loan moratoria</td>
            <td class="number">285,400</td>
            <td class="number">42,380</td>
            <td class="number" style="color: #666;">Wound down</td>
          </tr>
          <tr>
            <td class="label">  └─ Performing</td>
            <td class="number">—</td>
            <td class="number">38,920</td>
            <td class="number" style="color: #1d9e75;">On schedule</td>
          </tr>
          <tr>
            <td class="label">  └─ Non-performing</td>
            <td class="number">—</td>
            <td class="number">3,460</td>
            <td class="number" style="color: #c47b16;">Monitor</td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Moratorium Status</div>
        <div style="margin-top: 12px; font-size: 12px; color: #666;">
          85.2% reduction from peak (42,380 / 285,400). Remaining exposures expected to exit in 2025.
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderRepCrypto(el, bank) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">Crypto</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">Crypto Asset Exposures (CRR3 Pilot)</div>
        </div>
        <div class="ifrs9-pill corep">COREP</div>
      </div>
      <table class="ifrs9-table">
        <thead>
          <tr>
            <th class="label">Asset Type</th>
            <th class="number">Exposure (€k)</th>
            <th class="number">RWA (€k)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="label">Group 1a crypto-assets (BTC, ETH)</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Group 1b crypto-assets</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr>
            <td class="label">Group 2 crypto-assets</td>
            <td class="number">0</td>
            <td class="number">0</td>
          </tr>
          <tr class="total">
            <td class="label"><strong>Total Crypto RWA</strong></td>
            <td class="number">—</td>
            <td class="number"><strong>0</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="ifrs9-summary-box">
        <div class="ifrs9-summary-label">Crypto Exposure Status</div>
        <div style="margin-top: 12px; font-size: 12px; color: #1d9e75;">
          <span class="ifrs9-status ok"></span>No crypto-asset exposures currently held.
        </div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderECBReport(el, section, bank) {
  const ecbTitles = {
    'ifrs9-ecb-aa': 'AA - MFI Balance Sheet',
    'ifrs9-ecb-ab': 'AB - Changes in Stocks',
    'ifrs9-ecb-af': 'AF - Natural Persons Balance Sheet',
    'ifrs9-ecb-an': 'AN - Non-Resident Balance Sheet',
    'ifrs9-ecb-as': 'AS - Cumulative Write-downs (AA)',
    'ifrs9-ecb-ap': 'AP - Cumulative Write-downs (AF/AN)',
    'ifrs9-ecb-av': 'AV - FX Credit Risk (Natural Persons)',
    'ifrs9-ecb-aw': 'AW - FX Credit Risk (All)',
    'ifrs9-ecb-ae': 'AE - Overdue Receivables',
    'ifrs9-ecb-ak': 'AK - Interest Rate Repricing',
    'ifrs9-ecb-ad': 'AD - Remaining Maturity',
    'ifrs9-ecb-au': 'AU - Equity Investments',
    'ifrs9-ecb-am': 'AM - Tangible Assets',
    'ifrs9-ecb-iz': 'IZ - Collateral & Guarantors',
    'ifrs9-ecb-po': 'PO - Group Structure',
    'ifrs9-ecb-ks': 'KS - Interest Rates (MFI Stats)',
    'ifrs9-ecb-oi': 'OI - Other Information',
    'ifrs9-ecb-ah': 'AH - NPL Sales Activity',
    'ifrs9-ecb-ra': 'RA - P&L & Profitability',
    'ifrs9-ecb-cv': 'CV - Collateral Values'
  };

  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-template-header">
        <div class="ifrs9-badge">${section.split('-')[2].toUpperCase()}</div>
        <div style="flex: 1;">
          <div style="font-size: 16px; font-weight: 600; color: #085041;">${ecbTitles[section]}</div>
          <div style="font-size: 12px; color: #999; margin-top: 2px;">ECB BSI - Monthly statistical reporting</div>
        </div>
        <div class="ifrs9-pill ecb">ECB</div>
      </div>
      <div class="ifrs9-under-dev">
        <div class="ifrs9-under-dev-icon">📊</div>
        <div class="ifrs9-under-dev-text">ECB BSI Report Template</div>
        <div class="ifrs9-under-dev-detail">Field-level data entry and validation for ${ecbTitles[section]}</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}

function renderUnderDev(el, name, subtitle) {
  const html = `
    <div class="ifrs9-container">
      <div class="ifrs9-under-dev">
        <div class="ifrs9-under-dev-icon">⚙️</div>
        <div class="ifrs9-under-dev-text">${name}</div>
        <div class="ifrs9-under-dev-detail">${subtitle} - Under development</div>
      </div>
    </div>
  `;
  el.innerHTML = html;
}
