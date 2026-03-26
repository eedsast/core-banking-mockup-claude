// ═══════════════════════════════════════════════════════
// loyalty.js — Loyalty module logic
// Loaded lazily by loadLoyaltyModule() in core_banking
// ═══════════════════════════════════════════════════════
(function () {
  'use strict';


// ── LOYALTY MODULE JS ─────────────────────────────────────────────
//════════════════════════════════════════════════════
// ALL DATA — defined first, before any functions
//════════════════════════════════════════════════════
var MERCHANTS_LIST = ['Acme Downtown','Acme Mall','Bella Central','Metro City Hotel','FinPoint HQ'];
var PRODUCTS_LIST = ['Coffee','Sandwich','Hotel Stay','Electronics','Clothing','Gift Card'];
var SEGMENTS_LIST = ['VIP Members','New Members','Inactive 90d','High Spenders','Silver Tier','Gold Tier','Referred Users'];
var OPS = ['=','>=','<=','>','<','between'];
var EFFECT_TYPES = [
{val:'points_flat',label:'Points (flat)'},
{val:'points_per_euro',label:'Points per euro'},
{val:'points_multiplier',label:'Points multiplier'},
{val:'badge',label:'Badge'},
{val:'tier_upgrade',label:'Tier upgrade'}
];
var MODULES = ['Campaigns','Challenges','Redemptions','Wallets','Rewards','Members','Catalog','Administration'];
var PERM_COLS = ['read','write','del','admin'];
var TK_DATA = [
{id:'TK-T1',key:'mastercard_purchase',type:'transaction',label:'Mastercard Purchase',status:'Active',created:'2024-01-01'},
{id:'TK-T2',key:'visa_purchase',type:'transaction',label:'Visa Purchase',status:'Active',created:'2024-01-01'},
{id:'TK-T3',key:'money_send',type:'transaction',label:'Money Send',status:'Active',created:'2024-01-01'},
{id:'TK-T4',key:'bill_payment',type:'transaction',label:'Bill Payment',status:'Active',created:'2024-01-01'},
{id:'TK-T5',key:'atm_withdrawal',type:'transaction',label:'ATM Withdrawal',status:'Active',created:'2024-01-01'},
{id:'TK-T6',key:'online_purchase',type:'transaction',label:'Online Purchase',status:'Active',created:'2024-01-01'},
{id:'TK-E1',key:'kyc_completed',type:'event',label:'KYC Completed',status:'Active',created:'2024-01-01'},
{id:'TK-E2',key:'sign_up',type:'event',label:'Sign Up',status:'Active',created:'2024-01-01'},
{id:'TK-E3',key:'app_login',type:'event',label:'App Login',status:'Active',created:'2024-01-01'},
{id:'TK-E4',key:'referral_made',type:'event',label:'Referral Made',status:'Active',created:'2024-01-01'},
{id:'TK-E5',key:'profile_completed',type:'event',label:'Profile Completed',status:'Active',created:'2024-01-01'},
{id:'TK-E6',key:'birthday_visit',type:'event',label:'Birthday Visit',status:'Active',created:'2024-01-01'},
{id:'TK-E7',key:'message_sent',type:'event',label:'Message Sent',status:'Inactive',created:'2024-01-01'}
];
function tkByType(t){return TK_DATA.filter(function(k){return k.type===t;});}
function tkLabel(key){var t=TK_DATA.find(function(k){return k.key===key;});return t?t.label:key;}
var merchantData = [
{id:'MER-001',name:'Acme Downtown',extId:'ACM-DT',org:'Acme Retail',status:'Active'},
{id:'MER-002',name:'Acme Mall',extId:'ACM-ML',org:'Acme Retail',status:'Active'},
{id:'MER-003',name:'Bella Central',extId:'BLL-CT',org:'Bella Foods',status:'Active'},
{id:'MER-004',name:'Metro City Hotel',extId:'MTR-CH',org:'Metro Hotels',status:'Active'},
{id:'MER-005',name:'FinPoint HQ',extId:'FIN-HQ',org:'FinPoint',status:'Inactive'}
];
var productData = [
{id:'PRD-001',name:'Coffee',sku:'PRD-COF',merchant:'Bella Central',status:'Active'},
{id:'PRD-002',name:'Sandwich',sku:'PRD-SND',merchant:'Bella Central',status:'Active'},
{id:'PRD-003',name:'Hotel Stay',sku:'PRD-HST',merchant:'Metro City Hotel',status:'Active'},
{id:'PRD-004',name:'Electronics',sku:'PRD-ELC',merchant:'Acme Downtown',status:'Active'},
{id:'PRD-005',name:'Clothing',sku:'PRD-CLT',merchant:'Acme Mall',status:'Active'},
{id:'PRD-006',name:'Gift Card',sku:'PRD-GFC',merchant:'Acme Downtown',status:'Active'}
];
var rewardTypes = [
{id:'RWT-001',name:'Points',walletType:'Points',desc:'Standard earning points',status:'Active',created:'2024-01-01'},
{id:'RWT-002',name:'Cashback',walletType:'Cashback',desc:'Cashback on purchases',status:'Active',created:'2024-01-01'},
{id:'RWT-003',name:'Miles',walletType:'Miles',desc:'Travel miles for hotel stays',status:'Active',created:'2024-03-15'},
{id:'RWT-004',name:'Bonus Points',walletType:'Points',desc:'Promotional bonus point events',status:'Inactive',created:'2024-06-01'}
];
var tiersData = [
{id:'TIR-001',name:'Bronze',level:1,branch:'Acme Downtown',org:'Acme Retail',minPts:200,multType:'percentage',multVal:10,status:'Active'},
{id:'TIR-002',name:'Silver',level:2,branch:'Acme Downtown',org:'Acme Retail',minPts:500,multType:'percentage',multVal:20,status:'Active'},
{id:'TIR-003',name:'Gold',level:3,branch:'Acme Downtown',org:'Acme Retail',minPts:1000,multType:'percentage',multVal:50,status:'Active'},
{id:'TIR-004',name:'Bronze',level:1,branch:'Acme Mall',org:'Acme Retail',minPts:200,multType:'additive',multVal:25,status:'Active'},
{id:'TIR-005',name:'Gold',level:2,branch:'Acme Mall',org:'Acme Retail',minPts:800,multType:'additive',multVal:100,status:'Active'},
{id:'TIR-006',name:'Bronze',level:1,branch:'Bella Central',org:'Bella Foods',minPts:150,multType:'percentage',multVal:10,status:'Active'},
{id:'TIR-007',name:'Silver',level:2,branch:'Bella Central',org:'Bella Foods',minPts:400,multType:'percentage',multVal:25,status:'Active'},
{id:'TIR-008',name:'Gold',level:3,branch:'Bella Central',org:'Bella Foods',minPts:900,multType:'percentage',multVal:50,status:'Active'},
{id:'TIR-009',name:'Silver',level:1,branch:'Metro City Hotel',org:'Metro Hotels',minPts:500,multType:'additive',multVal:50,status:'Active'},
{id:'TIR-010',name:'Gold',level:2,branch:'Metro City Hotel',org:'Metro Hotels',minPts:1500,multType:'percentage',multVal:40,status:'Active'}
];
var membersData = [
{id:'MBR-001',extId:'EXT-MBR-001',fname:'Arta',lname:'Gashi',email:'arta@example.com',phone:'+383 44 111 001',org:'Acme Retail',branch:'Acme Downtown',status:'Active',dob:'1990-05-12',gender:'Female',city:'Pristina',locale:'sq-AL',segments:['VIP Members','Gold Tier'],joined:'2024-01-15'},
{id:'MBR-002',extId:'EXT-MBR-002',fname:'Besnik',lname:'Hoxha',email:'besnik@example.com',phone:'+383 44 111 002',org:'Acme Retail',branch:'Acme Mall',status:'Active',dob:'1988-11-03',gender:'Male',city:'Pristina',locale:'sq-AL',segments:['New Members'],joined:'2024-03-01'},
{id:'MBR-003',extId:'EXT-MBR-003',fname:'Donika',lname:'Krasniqi',email:'donika@example.com',phone:'+383 44 111 003',org:'Bella Foods',branch:'Bella Central',status:'Active',dob:'1995-07-22',gender:'Female',city:'Prizren',locale:'sq-AL',segments:['High Spenders','Silver Tier'],joined:'2024-02-10'},
{id:'MBR-004',extId:'EXT-MBR-004',fname:'Flamur',lname:'Berisha',email:'flamur@example.com',phone:'+383 44 111 004',org:'Bella Foods',branch:'Bella Central',status:'Active',dob:'1992-03-18',gender:'Male',city:'Gjilan',locale:'sq-AL',segments:[],joined:'2024-04-20'},
{id:'MBR-005',extId:'EXT-MBR-005',fname:'Gjylnaze',lname:'Rexha',email:'gjylnaze@example.com',phone:'+383 44 111 005',org:'Metro Hotels',branch:'Metro City Hotel',status:'Active',dob:'1985-09-30',gender:'Female',city:'Pristina',locale:'sq-AL',segments:['VIP Members','Gold Tier','High Spenders'],joined:'2023-11-01'},
{id:'MBR-006',extId:'EXT-MBR-006',fname:'Hana',lname:'Morina',email:'hana@example.com',phone:'+383 44 111 006',org:'Metro Hotels',branch:'Metro City Hotel',status:'Active',dob:'1997-01-14',gender:'Female',city:'Pristina',locale:'sq-AL',segments:['Silver Tier'],joined:'2024-01-30'},
{id:'MBR-007',extId:'EXT-MBR-007',fname:'Ilir',lname:'Sadiku',email:'ilir@example.com',phone:'+383 44 111 007',org:'Acme Retail',branch:'Acme Downtown',status:'Inactive',dob:'1980-06-05',gender:'Male',city:'Peja',locale:'sq-AL',segments:['Inactive 90d'],joined:'2023-08-15'},
{id:'MBR-008',extId:'EXT-MBR-008',fname:'Jeta',lname:'Rexhepi',email:'jeta@example.com',phone:'+383 44 111 008',org:'FinPoint',branch:'',status:'Active',dob:'1993-12-25',gender:'Female',city:'Pristina',locale:'sq-AL',segments:['Referred Users'],joined:'2024-05-11'}
];
var orgs = [
{id:'ORG-001',name:'Acme Retail',slug:'acme-retail',industry:'Retail',status:'Active',created:'2024-01-10'},
{id:'ORG-002',name:'Bella Foods',slug:'bella-foods',industry:'F&B',status:'Active',created:'2024-03-22'},
{id:'ORG-003',name:'Metro Hotels',slug:'metro-hotels',industry:'Hospitality',status:'Active',created:'2024-05-01'},
{id:'ORG-004',name:'FinPoint',slug:'finpoint',industry:'Financial Services',status:'Inactive',created:'2023-11-15'}
];
var branches = [
{id:'BRN-001',name:'Acme Downtown',org:'Acme Retail',city:'Pristina',address:'Str. UCK 12',status:'Active',created:'2024-01-15'},
{id:'BRN-002',name:'Acme Mall',org:'Acme Retail',city:'Pristina',address:'Prishtina Mall L2',status:'Active',created:'2024-02-01'},
{id:'BRN-003',name:'Bella Central',org:'Bella Foods',city:'Pristina',address:'Nëna Terezë Blvd 22',status:'Active',created:'2024-04-01'},
{id:'BRN-004',name:'Metro City Hotel',org:'Metro Hotels',city:'Pristina',address:'Bill Clinton Blvd 3',status:'Active',created:'2024-05-05'}
];
var roles = [
{id:'ROLE-001',name:'Superadmin',scope:'Platform',desc:'Full platform access',created:'2024-01-01',perms:mkPerms(true,true,true,true)},
{id:'ROLE-002',name:'Org Admin',scope:'Organization',desc:'Full org-level access',created:'2024-01-01',perms:mkPerms(true,true,true,false)},
{id:'ROLE-003',name:'Branch Manager',scope:'Branch',desc:'Branch operations',created:'2024-01-01',perms:mkPerms(true,true,false,false)},
{id:'ROLE-004',name:'Marketing Manager',scope:'Organization',desc:'Campaign and rewards management',created:'2024-02-14',perms:mkPerms(true,true,false,false)},
{id:'ROLE-005',name:'Analyst',scope:'Organization',desc:'Read-only access',created:'2024-03-05',perms:mkPerms(true,false,false,false)}
];
var users = [
{id:'USR-001',extId:'EXT-0001',fname:'Alice',lname:'Kovač',email:'alice@lo.io',role:'Superadmin',org:'—',branch:'—',status:'Active',lastLogin:'2025-03-16',dept:'Engineering',phone:'',locale:'en-US',tz:'UTC'},
{id:'USR-002',extId:'EXT-0002',fname:'Burak',lname:'Yıldız',email:'burak@acme.com',role:'Org Admin',org:'Acme Retail',branch:'—',status:'Active',lastLogin:'2025-03-15',dept:'Operations',phone:'',locale:'en-US',tz:'UTC'},
{id:'USR-003',extId:'EXT-0003',fname:'Liridona',lname:'Berisha',email:'liridona@bella.com',role:'Marketing Manager',org:'Bella Foods',branch:'—',status:'Active',lastLogin:'2025-03-14',dept:'Marketing',phone:'',locale:'sq-AL',tz:'Europe/Tirane'},
{id:'USR-004',extId:'EXT-0004',fname:'Stefan',lname:'Müller',email:'stefan@metro.com',role:'Branch Manager',org:'Metro Hotels',branch:'Metro City Hotel',status:'Active',lastLogin:'2025-03-10',dept:'Operations',phone:'',locale:'de-DE',tz:'Europe/Berlin'}
];
var auditLog = [
{actor:'Alice Kovač',action:'CREATE',resource:'Campaign',detail:'Created: Summer Double Points',time:'2025-03-16 15:10',icon:'🎯',color:'var(--green)'},
{actor:'Alice Kovač',action:'CREATE',resource:'Challenge',detail:'Created: Onboarding Master',time:'2025-03-16 14:32',icon:'🏅',color:'var(--green)'},
{actor:'Burak Yıldız',action:'UPDATE',resource:'User',detail:'Updated: Stefan Müller',time:'2025-03-15 11:55',icon:'👤',color:'var(--blue)'}
];
var campaigns = [
{id:'CMP-001',name:'Summer Double Points',status:'Active',tierEligible:true,start:'2025-06-01',end:'2025-08-31',desc:'',
rules:[{id:100,triggerType:'transaction',triggerKeys:['mastercard_purchase','visa_purchase'],conditions:[{id:200,type:'amount',op:'>=',val:'50',val2:''}],effect:{type:'points_multiplier',val:'2',val2:''}}],
caps:[{id:1,scope:'per_member',metric:'points',limit:'1000',rollingDays:'30'}],
targets:{mer:['Acme Downtown'],prd:[],seg:['VIP Members']}},
{id:'CMP-002',name:'App Login Bonus',status:'Active',tierEligible:false,start:'2025-01-01',end:'2025-12-31',desc:'',
rules:[{id:101,triggerType:'event',triggerKeys:['app_login'],conditions:[{id:201,type:'count',op:'>=',val:'1',val2:''}],effect:{type:'points_flat',val:'10',val2:''}}],
caps:[{id:2,scope:'per_member',metric:'points',limit:'100',rollingDays:'7'}],
targets:{mer:[],prd:[],seg:[]}}
];
var challenges = [
{id:'CHL-001',name:'Onboarding Master',status:'Active',tierEligible:true,goal:'Complete KYC and make first purchase',start:'2025-01-01',end:'2025-12-31',desc:'',
conditions:[
{id:300,triggerType:'transaction',triggerKeys:['mastercard_purchase'],subConds:[{id:310,type:'count',op:'=',val:'1',val2:''},{id:311,type:'amount',op:'>=',val:'20',val2:''}]},
{id:301,triggerType:'event',triggerKeys:['kyc_completed'],subConds:[{id:320,type:'count',op:'=',val:'1',val2:''}]}
],
effect:{type:'points_flat',val:'500',val2:''},
caps:[],
targets:{mer:[],prd:[],seg:['New Members']}}
];
var redemptions = [
{id:'RDM-001',name:'10% Off Any Purchase',desc:'',status:'Active',start:'2025-01-01',end:'2025-12-31',points:200,discountType:'percentage',discountVal:10,maxDiscountType:'fixed',maxDiscount:'20',minBalance:200,minOrder:10,maxUses:'',maxPerMember:5,caps:[{id:10,scope:'per_member',metric:'discount_value',limit:'50',rollingDays:'30'}],targets:{mer:[],prd:[],seg:[]}},
{id:'RDM-002',name:'€5 Cashback',desc:'Flat €5 off',status:'Active',start:'2025-01-01',end:'2025-12-31',points:500,discountType:'fixed',discountVal:5,maxDiscountType:'',maxDiscount:'',minBalance:500,minOrder:25,maxUses:1000,maxPerMember:1,caps:[],targets:{mer:['Acme Downtown','Bella Central'],prd:[],seg:['VIP Members']}}
];
var WD = [
{walletId:'WAL-001',memberName:'Arta Gashi',org:'Acme Retail',type:'Points',earned:4200,spent:800},
{walletId:'WAL-002',memberName:'Arta Gashi',org:'Acme Retail',type:'Cashback',earned:120,spent:40},
{walletId:'WAL-003',memberName:'Besnik Hoxha',org:'Acme Retail',type:'Points',earned:1850,spent:200},
{walletId:'WAL-004',memberName:'Donika Krasniqi',org:'Bella Foods',type:'Points',earned:3100,spent:1200},
{walletId:'WAL-005',memberName:'Donika Krasniqi',org:'Bella Foods',type:'Cashback',earned:85,spent:30},
{walletId:'WAL-006',memberName:'Flamur Berisha',org:'Bella Foods',type:'Points',earned:920,spent:0},
{walletId:'WAL-007',memberName:'Gjylnaze Rexha',org:'Metro Hotels',type:'Points',earned:6700,spent:2100},
{walletId:'WAL-008',memberName:'Gjylnaze Rexha',org:'Metro Hotels',type:'Cashback',earned:310,spent:150},
{walletId:'WAL-009',memberName:'Hana Morina',org:'Metro Hotels',type:'Points',earned:2300,spent:500},
{walletId:'WAL-010',memberName:'Ilir Sadiku',org:'Acme Retail',type:'Points',earned:550,spent:0},
{walletId:'WAL-011',memberName:'Jeta Rexhepi',org:'FinPoint',type:'Points',earned:1400,spent:400},
{walletId:'WAL-012',memberName:'Jeta Rexhepi',org:'FinPoint',type:'Cashback',earned:60,spent:20}
];
var LD = [
{txId:'TXN-001',walletId:'WAL-001',type:'earn',amount:200,source:'Campaign',sourceName:'Summer Double Points',status:'confirmed',balance:3550,ts:'2025-03-16 14:22'},
{txId:'TXN-002',walletId:'WAL-004',type:'earn',amount:500,source:'Challenge',sourceName:'Onboarding Master',status:'confirmed',balance:2200,ts:'2025-03-16 13:10'},
{txId:'TXN-003',walletId:'WAL-007',type:'spend',amount:-200,source:'Redemption',sourceName:'€5 Cashback',status:'confirmed',balance:4600,ts:'2025-03-15 18:45'},
{txId:'TXN-004',walletId:'WAL-001',type:'earn',amount:100,source:'Campaign',sourceName:'App Login Bonus',status:'confirmed',balance:3350,ts:'2025-03-15 09:00'},
{txId:'TXN-005',walletId:'WAL-003',type:'earn',amount:50,source:'Campaign',sourceName:'App Login Bonus',status:'confirmed',balance:1700,ts:'2025-03-15 08:55'},
{txId:'TXN-006',walletId:'WAL-009',type:'earn',amount:300,source:'Campaign',sourceName:'Summer Double Points',status:'confirmed',balance:1900,ts:'2025-03-14 16:30'},
{txId:'TXN-007',walletId:'WAL-011',type:'spend',amount:-500,source:'Redemption',sourceName:'10% Off Any Purchase',status:'confirmed',balance:600,ts:'2025-03-14 12:10'},
{txId:'TXN-008',walletId:'WAL-007',type:'earn',amount:1000,source:'Manual',sourceName:'Bonus Adjustment',status:'confirmed',balance:4800,ts:'2025-03-13 10:00'},
{txId:'TXN-009',walletId:'WAL-006',type:'earn',amount:50,source:'Campaign',sourceName:'App Login Bonus',status:'confirmed',balance:970,ts:'2025-03-13 09:30'},
{txId:'TXN-010',walletId:'WAL-004',type:'spend',amount:-200,source:'Redemption',sourceName:'€5 Cashback',status:'reversed',balance:1700,ts:'2025-03-12 15:20'},
{txId:'TXN-011',walletId:'WAL-002',type:'earn',amount:40,source:'Redemption',sourceName:'10% Off Any Purchase',status:'confirmed',balance:80,ts:'2025-03-11 10:00'},
{txId:'TXN-012',walletId:'WAL-008',type:'earn',amount:150,source:'Redemption',sourceName:'€5 Cashback',status:'confirmed',balance:160,ts:'2025-03-10 15:30'}
];
//════════════════════════════════════════════════════
// HELPER FUNCTIONS — defined before any render calls
//════════════════════════════════════════════════════
function mkPerms(r,w,d,a){var p={};MODULES.forEach(function(m){p[m]={read:r,write:w,del:d,admin:a};});return p;}
function statusBadge(s){var m={Active:'bp-green',Draft:'bp-gray',Paused:'bp-yellow',Expired:'bp-red',Inactive:'bp-gray',Suspended:'bp-red',Closed:'bp-red'};return'<span class="badge-pill '+(m[s]||'bp-gray')+'">'+s+'</span>';}
function scopeBadge(s){var m={Platform:'bp-purple',Organization:'bp-blue',Branch:'bp-yellow'};return'<span class="badge-pill '+(m[s]||'bp-gray')+'">'+s+'</span>';}
function roleBadge(r){var m={Superadmin:'bp-purple','Org Admin':'bp-blue','Branch Manager':'bp-yellow','Marketing Manager':'bp-green',Analyst:'bp-gray'};return'<span class="badge-pill '+(m[r]||'bp-gray')+'">'+r+'</span>';}
function effectSummary(e){if(!e||!e.val)return'—';if(e.type==='badge')return'🏷'+e.val;if(e.type==='tier_upgrade')return'⬆'+e.val;if(e.type==='points_multiplier')return'×'+e.val+' pts';if(e.type==='points_per_euro')return e.val+' pts/€';return'+'+e.val+' pts';}
function tgtSummary(t){if(!t)return'All';var tags=[];(t.mer||[]).forEach(function(x){tags.push('<span class="ms-tag" style="font-size:10px">🏪'+x+'</span>');});(t.prd||[]).forEach(function(x){tags.push('<span class="ms-tag" style="font-size:10px">📦'+x+'</span>');});(t.seg||[]).forEach(function(x){tags.push('<span class="ms-tag" style="font-size:10px">👥'+x+'</span>');});return tags.join('')||'<span style="color:var(--text3);font-size:12px">All</span>';}
function capsSummary(caps){if(!caps||!caps.length)return'<span style="color:var(--text3);font-size:12px">None</span>';return caps.map(function(c){return'<div style="font-size:11px;color:var(--text2)">'+(c.scope==='per_member'?'👤':'🌐')+' '+c.limit+(c.metric==='points'?' pts':c.metric==='discount_value'?'€':' uses')+'/'+(c.rollingDays||'?')+'d</div>';}).join('');}
function loyNav(p,el){document.querySelectorAll('#loy-app .loy-page').forEach(function(x){x.classList.remove('active');});document.querySelectorAll('#loy-sidebar .nav-item').forEach(function(x){x.classList.remove('active');});document.getElementById('loy-page-'+p).classList.add('active');if(el)el.classList.add('active');}
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
function openSlider(p){document.getElementById(p+'-slider').classList.add('open');document.getElementById(p+'-bg').classList.add('open');}
function closeSlider(p){document.getElementById(p+'-slider').classList.remove('open');document.getElementById(p+'-bg').classList.remove('open');}
function v(id){var el=document.getElementById(id);return el?el.value.trim():'';}
function sv(id,val){var el=document.getElementById(id);if(el)el.value=val;}
function today(){return new Date().toISOString().slice(0,10);}
function toast(msg,type){var t=document.getElementById('loy-toast');t.textContent=msg;t.style.background=type==='red'?'var(--red)':'var(--green)';t.classList.add('show');setTimeout(function(){t.classList.remove('show');},2800);}
function filterTable(inp,tableId){var q=inp.value.toLowerCase();document.querySelectorAll('#'+tableId+' tbody tr').forEach(function(tr){tr.style.display=tr.textContent.toLowerCase().indexOf(q)!==-1?'':'none';});}
function filterBy(tableId,val,colIdx){document.querySelectorAll('#'+tableId+' tbody tr').forEach(function(tr){var cells=tr.querySelectorAll('td');var cell=cells[colIdx];tr.style.display=(!val||(cell&&cell.textContent.indexOf(val)!==-1))?'':'none';});}
//════════════════════════════════════════════════════
// CONTEXT SWITCHER
//════════════════════════════════════════════════════
var activeCtx = {org:'', branch:''};
function toggleCtxPanel(){
var panel = document.getElementById('loy-ctx-panel');
var overlay = document.getElementById('loy-ctx-overlay');
var isOpen = panel.style.display !== 'none';
if(isOpen){ closeCtxPanel(); return; }
// populate org dropdown
var orgSel = document.getElementById('ctx-org-sel');
orgSel.innerHTML = '<option value="">All Organizations</option>';
orgs.forEach(function(o){ orgSel.innerHTML += '<option value="'+o.name+'"'+(activeCtx.org===o.name?' selected':'')+'>'+o.name+'</option>'; });
populateCtxBranches(activeCtx.org);
sv('ctx-branch-sel', activeCtx.branch);
updateCtxSummary();
panel.style.display = 'block';
overlay.style.display = 'block';
}
function closeCtxPanel(){
document.getElementById('loy-ctx-panel').style.display = 'none';
document.getElementById('loy-ctx-overlay').style.display = 'none';
}
function populateCtxBranches(org){
var sel = document.getElementById('ctx-branch-sel');
sel.innerHTML = '<option value="">All Branches</option>';
var list = org ? branches.filter(function(b){return b.org===org;}) : branches;
list.forEach(function(b){ sel.innerHTML += '<option value="'+b.name+'">'+b.name+'</option>'; });
}
function onCtxOrgChange(){
var org = v('ctx-org-sel');
populateCtxBranches(org);
updateCtxSummary();
}
function onCtxBranchChange(){ updateCtxSummary(); }
function updateCtxSummary(){
var org = v('ctx-org-sel');
var branch = v('ctx-branch-sel');
var el = document.getElementById('ctx-summary');
if(!org && !branch){
el.textContent = 'Platform-wide view — all data visible';
} else if(org && !branch){
el.textContent = '🏢Showing data for: '+org+' (all branches)';
} else if(org && branch){
el.textContent = '🏪Showing data for: '+branch+' ('+org+')';
}
}
function applyCtx(){
activeCtx.org = v('ctx-org-sel');
activeCtx.branch = v('ctx-branch-sel');
// update header indicator
document.getElementById('ctx-org-label').textContent = activeCtx.org || 'All Organizations';
document.getElementById('ctx-branch-label').textContent = activeCtx.branch || 'All Branches';
document.getElementById('ctx-indicator').style.borderColor = (activeCtx.org||activeCtx.branch) ? 'var(--accent)' : 'var(--border2)';
// re-render all filtered modules
renderCampaigns();
renderChallenges();
renderRedemptions();
renderWallets();
renderTiers();
renderMembers();
closeCtxPanel();
toast((activeCtx.org||activeCtx.branch) ? 'Context applied' : 'Reset to platform view');
}
function resetCtx(){
sv('ctx-org-sel',''); sv('ctx-branch-sel','');
populateCtxBranches('');
updateCtxSummary();
activeCtx={org:'',branch:''};
document.getElementById('ctx-org-label').textContent='All Organizations';
document.getElementById('ctx-branch-label').textContent='All Branches';
document.getElementById('ctx-indicator').style.borderColor='var(--border2)';
renderCampaigns(); renderChallenges(); renderRedemptions(); renderWallets(); renderTiers(); renderMembers();
closeCtxPanel();
toast('Reset to platform view');
}
// Context filter helper — returns true if item should be shown given active context
function ctxMatch(itemOrg, itemBranch){
if(!activeCtx.org && !activeCtx.branch) return true;
if(activeCtx.org && activeCtx.branch){
return itemOrg===activeCtx.org && (!itemBranch || itemBranch===activeCtx.branch);
}
if(activeCtx.org) return itemOrg===activeCtx.org;
return true;
}
var campCaps=[],chalCaps=[],redempCaps=[];
var capIdSeq=100;
function ncap(){return capIdSeq++;}
function getCaps(p){return p==='c'?campCaps:p==='ch'?chalCaps:redempCaps;}
function setCaps(p,v2){if(p==='c')campCaps=v2;else if(p==='ch')chalCaps=v2;else redempCaps=v2;}
function addCap(p){getCaps(p).push({id:ncap(),scope:'per_member',metric:p==='r'?'discount_value':'points',limit:'',rollingDays:''});renderCaps(p);}
function removeCap(p,id){setCaps(p,getCaps(p).filter(function(c){return c.id!==id;}));renderCaps(p);}
function setCapField(p,id,field,val){var c=getCaps(p).find(function(x){return x.id===id;});if(c)c[field]=val;}
function renderCaps(p){
var el=document.getElementById(p+'-caps');if(!el)return;
var caps=getCaps(p);var isR=p==='r';
if(!caps.length){el.innerHTML='<div style="text-align:center;padding:14px;color:var(--text3);border:1px dashed var(--border);border-radius:var(--radius);font-size:12px">No caps configured.</div>';return;}
var html='';
caps.forEach(function(c){
html+='<div class="cap-card">'
+'<div class="cap-field" style="width:130px"><label>Scope</label><select onchange="setCapField(\''+p+'\','+c.id+',\'scope\',this.value)"><option value="per_member" '+(c.scope==='per_member'?'selected':'')+'>Per Member</option><option value="total" '+(c.scope==='total'?'selected':'')+'>Total</option></select></div>'
+'<div class="cap-field" style="width:140px"><label>Metric</label><select onchange="setCapField(\''+p+'\','+c.id+',\'metric\',this.value)">'+(isR?'<option value="discount_value" '+(c.metric==='discount_value'?'selected':'')+'>Discount (€)</option><option value="uses" '+(c.metric==='uses'?'selected':'')+'>Uses</option>':'<option value="points" '+(c.metric==='points'?'selected':'')+'>Points</option>')+'</select></div>'
+'<div class="cap-field" style="width:100px"><label>Max Value</label><input type="number" value="'+c.limit+'" placeholder="e.g. 500" onchange="setCapField(\''+p+'\','+c.id+',\'limit\',this.value)"/></div>'
+'<div class="cap-field" style="width:120px"><label>Rolling Days</label><input type="number" value="'+c.rollingDays+'" placeholder="e.g. 30" onchange="setCapField(\''+p+'\','+c.id+',\'rollingDays\',this.value)"/></div>'
+'<div style="flex:1;font-size:11px;color:var(--accent2);align-self:center">'+(c.limit&&c.rollingDays?(c.scope==='per_member'?'👤':'🌐')+' max '+(c.metric==='discount_value'?'€':'')+c.limit+(c.metric==='points'?' pts':c.metric==='uses'?' uses':'')+' / '+c.rollingDays+'d':'Fill in values')+'</div>'
+'<button class="btn btn-danger btn-sm" onclick="removeCap(\''+p+'\','+c.id+')">✕</button>'
+'</div>';
});
el.innerHTML=html;
}
//════════════════════════════════════════════════════
// TARGETING
//════════════════════════════════════════════════════
var campTargets={mer:[],prd:[],seg:[]};
var chalTargets={mer:[],prd:[],seg:[]};
var redempTargets={mer:[],prd:[],seg:[]};
function getTargets(p){return p==='c'?campTargets:p==='ch'?chalTargets:redempTargets;}
function populateTargetSelects(p){
var fill=function(id,arr){var s=document.getElementById(id);if(s)s.innerHTML=arr.map(function(x){return'<option>'+x+'</option>';}).join('');};
fill(p+'-mer-sel',MERCHANTS_LIST);fill(p+'-prd-sel',PRODUCTS_LIST);fill(p+'-seg-sel',SEGMENTS_LIST);
}
function addTarget(p,type){var sel=document.getElementById(p+'-'+type+'-sel');var val=sel.value;var t=getTargets(p);if(val&&t[type].indexOf(val)===-1){t[type].push(val);renderTargetTags(p,type);}}
function removeTarget(p,type,val){var t=getTargets(p);t[type]=t[type].filter(function(x){return x!==val;});renderTargetTags(p,type);}
function renderTargetTags(p,type){var t=getTargets(p);var icons={mer:'🏪',prd:'📦',seg:'👥'};var el=document.getElementById(p+'-'+type+'-tags');if(!el)return;el.innerHTML=t[type].map(function(val){return'<div class="ms-tag">'+icons[type]+' '+val+'<button onclick="removeTarget(\''+p+'\',\''+type+'\',\''+val+'\')">×</button></div>';}).join('')||'<span style="font-size:12px;color:var(--text3)">None</span>';}
//════════════════════════════════════════════════════
// CAMPAIGN BUILDER STATE
//════════════════════════════════════════════════════
var campRules=[],campEditId=null;
var ruleIdSeq=200,condIdSeq=300;
function nrid(){return ruleIdSeq++;}
function ncid(){return condIdSeq++;}
function newCampRule(){return{id:nrid(),triggerType:'transaction',triggerKeys:[],conditions:[newCampCond()],effect:{type:'points_flat',val:'',val2:''}};}
function newCampCond(){return{id:ncid(),type:'count',op:'>=',val:'',val2:''};}
function campAddRule(){campRules.push(newCampRule());renderCampRules();}
function campRemoveRule(rid){campRules=campRules.filter(function(r){return r.id!==rid;});renderCampRules();}
function campAddCond(rid){var r=campRules.find(function(x){return x.id===rid;});if(r){r.conditions.push(newCampCond());renderCampRules();}}
function campRemoveCond(rid,cid){var r=campRules.find(function(x){return x.id===rid;});if(r){r.conditions=r.conditions.filter(function(c){return c.id!==cid;});renderCampRules();}}
function campSetField(rid,field,val){var r=campRules.find(function(x){return x.id===rid;});if(!r)return;if(field==='triggerType'){r.triggerType=val;r.triggerKeys=[];}else if(field==='effect.type'){r.effect.type=val;r.effect.val='';r.effect.val2='';}else if(field==='effect.val')r.effect.val=val;else if(field==='effect.val2')r.effect.val2=val;else r[field]=val;renderCampRules();}
function campSetCondField(rid,cid,field,val){var r=campRules.find(function(x){return x.id===rid;});if(!r)return;var c=r.conditions.find(function(x){return x.id===cid;});if(!c)return;c[field]=val;if(field==='op'&&val!=='between')c.val2='';renderCampRules();}
function campToggleTK(rid,key){var r=campRules.find(function(x){return x.id===rid;});if(!r)return;var i=r.triggerKeys.indexOf(key);if(i!==-1)r.triggerKeys.splice(i,1);else r.triggerKeys.push(key);renderCampRules();}
function renderCampRules(){
var el=document.getElementById('camp-rules');if(!el)return;
if(!campRules.length){el.innerHTML='<div style="text-align:center;padding:18px;color:var(--text3);border:1px dashed var(--border);border-radius:var(--radius)">No rules yet.</div>';return;}
var html='';
campRules.forEach(function(r,ri){
if(ri>0)html+='<div style="text-align:center;font-size:11px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;padding:6px 0">— OR —</div>';
html+='<div class="rule-card"><div class="rule-card-header"><span class="rule-badge">Rule '+(ri+1)+'</span><div style="display:flex;align-items:center;gap:10px"><button class="btn btn-ghost btn-sm" onclick="campAddCond('+r.id+')">+ Condition</button><button class="btn btn-danger btn-sm" onclick="campRemoveRule('+r.id+')">✕</button></div></div>';
html+='<div class="rule-card-body">';
// trigger
html+='<div style="margin-bottom:12px"><div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:8px"><div class="cond-field" style="width:140px"><label>Trigger Type</label><select onchange="campSetField('+r.id+',\'triggerType\',this.value)"><option value="transaction" '+(r.triggerType==='transaction'?'selected':'')+'>Transaction</option><option value="event" '+(r.triggerType==='event'?'selected':'')+'>Event</option></select></div></div>';
html+='<div style="display:flex;flex-wrap:wrap;gap:6px">';
tkByType(r.triggerType).forEach(function(tk){var sel=r.triggerKeys.indexOf(tk.key)!==-1;html+='<div onclick="campToggleTK('+r.id+',\''+tk.key+'\')" style="padding:4px 12px;border-radius:20px;font-size:12px;cursor:pointer;user-select:none;border:1px solid '+(sel?'var(--accent)':'var(--border2)')+';background:'+(sel?'var(--accent-dim)':'var(--surface3)')+';color:'+(sel?'var(--accent2)':'var(--text2)')+'">'+tk.label+'</div>';});
html+='</div>'+(r.triggerKeys.length===0?'<div style="font-size:11px;color:var(--red);margin-top:5px">⚠Select at least one</div>':'')+'</div>';
// conditions
html+='<div style="font-size:10px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px">Conditions</div>';
r.conditions.forEach(function(c,ci){
if(ci>0)html+='<div style="font-size:10px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:.06em;padding:4px 0">OR condition</div>';
html+='<div class="cond-card">'+(r.conditions.length>1?'<div style="display:flex;justify-content:flex-end;margin-bottom:6px"><button class="btn btn-danger btn-sm" onclick="campRemoveCond('+r.id+','+c.id+')">✕</button></div>':'');
html+='<div class="cond-row"><div class="cond-field" style="width:100px"><label>Type</label><select onchange="campSetCondField('+r.id+','+c.id+',\'type\',this.value)"><option value="count" '+(c.type==='count'?'selected':'')+'>Count</option><option value="amount" '+(c.type==='amount'?'selected':'')+'>Amount</option></select></div>';
html+='<div class="cond-field" style="width:88px"><label>Operator</label><select onchange="campSetCondField('+r.id+','+c.id+',\'op\',this.value)">'+OPS.map(function(o){return'<option value="'+o+'" '+(c.op===o?'selected':'')+'>'+o+'</option>';}).join('')+'</select></div>';
html+='<div class="cond-field" style="width:84px"><label>'+(c.op==='between'?'Min':'Value')+'</label><input type="number" value="'+c.val+'" placeholder="0" onchange="campSetCondField('+r.id+','+c.id+',\'val\',this.value)"/></div>';
if(c.op==='between')html+='<div class="cond-field" style="width:84px"><label>Max</label><input type="number" value="'+c.val2+'" placeholder="0" onchange="campSetCondField('+r.id+','+c.id+',\'val2\',this.value)"/></div>';
html+='</div></div>';
});
// effect
html+='<div class="effect-box"><div class="effect-title">⚡Effect <span style="color:var(--red);font-size:10px">required</span></div><div class="cond-row">';
html+='<div class="cond-field" style="flex:1;min-width:140px"><label>Type</label><select onchange="campSetField('+r.id+',\'effect.type\',this.value)">'+EFFECT_TYPES.map(function(e){return'<option value="'+e.val+'" '+(r.effect.type===e.val?'selected':'')+'>'+e.label+'</option>';}).join('')+'</select></div>';
var eLabel=r.effect.type==='badge'?'Badge Name':r.effect.type==='tier_upgrade'?'Tier':r.effect.type==='points_per_euro'?'Pts/€':r.effect.type==='points_multiplier'?'Multiplier':'Points';
html+='<div class="cond-field" style="width:110px"><label>'+eLabel+'</label><input type="'+(r.effect.type==='badge'||r.effect.type==='tier_upgrade'?'text':'number')+'" value="'+r.effect.val+'" placeholder="0" onchange="campSetField('+r.id+',\'effect.val\',this.value)"/></div>';
if(r.effect.type==='points_per_euro')html+='<div class="cond-field" style="width:110px"><label>Min Amount (€)</label><input type="number" value="'+r.effect.val2+'" placeholder="0" onchange="campSetField('+r.id+',\'effect.val2\',this.value)"/></div>';
html+='</div></div></div></div>';
});
el.innerHTML=html;
}
//════════════════════════════════════════════════════
// CHALLENGE BUILDER STATE
//════════════════════════════════════════════════════
var chalConds=[],chalEditId=null;
function newChalCond(){return{id:ncid(),triggerType:'transaction',triggerKeys:[],subConds:[{id:ncid(),type:'count',op:'=',val:'',val2:''}]};}
function chalAddCond(){chalConds.push(newChalCond());renderChalConds();}
function chalRemoveCond(cid){chalConds=chalConds.filter(function(c){return c.id!==cid;});renderChalConds();}
function chalSetCondField(cid,field,val){var c=chalConds.find(function(x){return x.id===cid;});if(!c)return;if(field==='triggerType'){c.triggerType=val;c.triggerKeys=[];}else c[field]=val;renderChalConds();}
function chalToggleTK(cid,key){var c=chalConds.find(function(x){return x.id===cid;});if(!c)return;var i=c.triggerKeys.indexOf(key);if(i!==-1)c.triggerKeys.splice(i,1);else c.triggerKeys.push(key);renderChalConds();}
function chalAddSubCond(cid){var c=chalConds.find(function(x){return x.id===cid;});if(c){c.subConds.push({id:ncid(),type:'count',op:'=',val:'',val2:''});renderChalConds();}}
function chalRemoveSubCond(cid,sid){var c=chalConds.find(function(x){return x.id===cid;});if(c){c.subConds=c.subConds.filter(function(s){return s.id!==sid;});renderChalConds();}}
function chalSetSubCondField(cid,sid,field,val){var c=chalConds.find(function(x){return x.id===cid;});if(!c)return;var s=c.subConds.find(function(x){return x.id===sid;});if(!s)return;s[field]=val;if(field==='op'&&val!=='between')s.val2='';renderChalConds();}
function renderChalConds(){
var el=document.getElementById('chal-conds');if(!el)return;
if(!chalConds.length){el.innerHTML='<div style="text-align:center;padding:18px;color:var(--text3);border:1px dashed var(--border);border-radius:var(--radius)">No conditions yet.</div>';return;}
var html='';
chalConds.forEach(function(c,ci){
if(ci>0)html+='<div style="text-align:center;font-size:12px;font-weight:700;color:var(--accent2);padding:6px 0;letter-spacing:.08em">— AND —</div>';
html+='<div class="cond-card"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px"><span style="font-size:11px;font-weight:700;color:var(--accent2);text-transform:uppercase">Condition '+(ci+1)+'</span>'+(chalConds.length>1?'<button class="btn btn-danger btn-sm" onclick="chalRemoveCond('+c.id+')">✕Remove</button>':'')+'</div>';
html+='<div style="margin-bottom:10px"><div style="display:flex;gap:10px;align-items:flex-end;flex-wrap:wrap;margin-bottom:7px"><div class="cond-field" style="width:140px"><label>Trigger Type</label><select onchange="chalSetCondField('+c.id+',\'triggerType\',this.value)"><option value="transaction" '+(c.triggerType==='transaction'?'selected':'')+'>Transaction</option><option value="event" '+(c.triggerType==='event'?'selected':'')+'>Event</option></select></div></div>';
html+='<div style="display:flex;flex-wrap:wrap;gap:6px">';
tkByType(c.triggerType).forEach(function(tk){var sel=c.triggerKeys.indexOf(tk.key)!==-1;html+='<div onclick="chalToggleTK('+c.id+',\''+tk.key+'\')" style="padding:4px 12px;border-radius:20px;font-size:12px;cursor:pointer;user-select:none;border:1px solid '+(sel?'var(--accent)':'var(--border2)')+';background:'+(sel?'var(--accent-dim)':'var(--surface3)')+';color:'+(sel?'var(--accent2)':'var(--text2)')+'">'+tk.label+'</div>';});
html+='</div>'+(c.triggerKeys.length===0?'<div style="font-size:11px;color:var(--red);margin-top:5px">⚠Select at least one</div>':'')+'</div>';
html+='<div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Filters for this trigger</div>';
c.subConds.forEach(function(s,si){
if(si>0)html+='<div style="font-size:10px;color:var(--text3);font-weight:600;text-transform:uppercase;letter-spacing:.06em;padding:4px 0">AND</div>';
html+='<div style="display:flex;align-items:flex-end;gap:8px;flex-wrap:wrap;margin-bottom:6px;background:var(--bg);border:1px solid var(--border);border-radius:var(--radius);padding:10px">';
html+='<div class="cond-field" style="width:100px"><label>Type</label><select onchange="chalSetSubCondField('+c.id+','+s.id+',\'type\',this.value)"><option value="count" '+(s.type==='count'?'selected':'')+'>Count</option><option value="amount" '+(s.type==='amount'?'selected':'')+'>Amount</option></select></div>';
html+='<div class="cond-field" style="width:88px"><label>Operator</label><select onchange="chalSetSubCondField('+c.id+','+s.id+',\'op\',this.value)">'+OPS.map(function(o){return'<option value="'+o+'" '+(s.op===o?'selected':'')+'>'+o+'</option>';}).join('')+'</select></div>';
html+='<div class="cond-field" style="width:84px"><label>'+(s.op==='between'?'Min':'Value')+'</label><input type="number" value="'+s.val+'" placeholder="0" onchange="chalSetSubCondField('+c.id+','+s.id+',\'val\',this.value)"/></div>';
if(s.op==='between')html+='<div class="cond-field" style="width:84px"><label>Max</label><input type="number" value="'+s.val2+'" placeholder="0" onchange="chalSetSubCondField('+c.id+','+s.id+',\'val2\',this.value)"/></div>';
if(c.subConds.length>1)html+='<button class="btn btn-danger btn-sm" style="margin-bottom:1px" onclick="chalRemoveSubCond('+c.id+','+s.id+')">✕</button>';
html+='</div>';
});
html+='<button class="btn btn-ghost btn-sm" style="margin-top:2px" onclick="chalAddSubCond('+c.id+')">+ Add filter</button>';
html+='</div>';
});
el.innerHTML=html;
}
function renderChalEffectFields(){
var type=v('ch-effect-type')||'points_flat';
var el=document.getElementById('ch-effect-fields');if(!el)return;
var isText=type==='badge'||type==='tier_upgrade';
var mainLabel=type==='badge'?'Badge Name':type==='tier_upgrade'?'Tier Name':type==='points_per_euro'?'Pts/€':type==='points_multiplier'?'Multiplier':'Points';
var html='<div class="cond-field" style="width:120px"><label>'+mainLabel+'</label><input type="'+(isText?'text':'number')+'" id="ch-effect-val" placeholder="'+(isText?'e.g. Gold Badge':'0')+'"/></div>';
if(type==='points_per_euro')html+='<div class="cond-field" style="width:120px"><label>Min Amount (€)</label><input type="number" id="ch-effect-val2" placeholder="0"/></div>';
el.innerHTML=html;
}
//════════════════════════════════════════════════════
// CAMPAIGN RENDER & CRUD
//════════════════════════════════════════════════════
function renderCampaigns(){
var tb=document.getElementById('camp-body');if(!tb)return;
var list=campaigns.filter(function(c){
// campaigns are org-scoped via targeting merchants; filter by org context if set
if(!activeCtx.org) return true;
if(c.targets&&c.targets.mer&&c.targets.mer.length){
var orgMers=merchantData.filter(function(m){return m.org===activeCtx.org;}).map(function(m){return m.name;});
return c.targets.mer.some(function(m){return orgMers.indexOf(m)!==-1;});
}
return true; // campaigns with no merchant targeting are visible in all orgs
});
if(!list.length){tb.innerHTML='<tr><td colspan="8"><div class="empty-state"><div class="empty-icon">🎯</div>No campaigns for this context</div></td></tr>';return;}
var html='';
list.forEach(function(c){
var ruleSum='';c.rules.forEach(function(r){ruleSum+='<div style="font-size:11px;color:var(--text2)"><span class="badge-pill '+(r.triggerType==='transaction'?'bp-blue':'bp-purple')+'" style="font-size:10px">'+r.triggerType+'</span> '+r.triggerKeys.map(function(k){return tkLabel(k);}).join(', ')+'</div>';});
var tierBadge=c.tierEligible?'<div style="margin-top:3px"><span class="badge-pill bp-yellow" style="font-size:10px">🏆Tier eligible</span></div>':'';
html+='<tr>'
+'<td><div style="font-weight:600">'+c.name+'</div><div class="td-mono">'+c.id+'</div>'+tierBadge+'</td>'
+'<td>'+ruleSum+'</td>'
+'<td style="font-size:12px;color:var(--accent2)">'+c.rules.map(function(r){return effectSummary(r.effect);}).join(', ')+'</td>'
+'<td>'+capsSummary(c.caps)+'</td>'
+'<td>'+tgtSummary(c.targets)+'</td>'
+'<td>'+statusBadge(c.status)+'</td>'
+'<td style="font-size:12px;color:var(--text3)">'+(c.start||'—')+'<br/>'+(c.end||'—')+'</td>'
+'<td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openCampSlider(\''+c.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteCampaign(\''+c.id+'\')">Del</button></div></td>'
+'</tr>';
});
tb.innerHTML=html;
}
function openCampSlider(editId){
campEditId=editId;var c=editId?campaigns.find(function(x){return x.id===editId;}):null;
document.getElementById('camp-so-title').textContent=c?'Edit Campaign':'New Campaign';
sv('c-name',c?c.name:'');sv('c-status',c?c.status:'Draft');sv('c-start',c?c.start:'');sv('c-end',c?c.end:'');sv('c-desc',c?c.desc:'');
document.getElementById('c-tier-eligible').checked=c?!!c.tierEligible:false;
campRules=c?JSON.parse(JSON.stringify(c.rules)):[newCampRule()];
campCaps=c?JSON.parse(JSON.stringify(c.caps)):[];
campTargets=c?JSON.parse(JSON.stringify(c.targets)):{mer:[],prd:[],seg:[]};
renderCampRules();renderCaps('c');populateTargetSelects('c');['mer','prd','seg'].forEach(function(t){renderTargetTags('c',t);});
openSlider('camp');
}
function saveCampaign(){
var name=v('c-name');if(!name){toast('Name required','red');return;}
if(!campRules.length){toast('Add at least one rule','red');return;}
for(var i=0;i<campRules.length;i++){if(!campRules[i].triggerKeys.length){toast('Each rule needs a trigger key','red');return;}if(!campRules[i].effect.val){toast('Each rule needs an effect','red');return;}}
var obj={id:campEditId||'CMP-'+(campaigns.length+1).toString().padStart(3,'0'),name:name,status:v('c-status'),start:v('c-start'),end:v('c-end'),desc:v('c-desc'),tierEligible:document.getElementById('c-tier-eligible').checked,rules:JSON.parse(JSON.stringify(campRules)),caps:JSON.parse(JSON.stringify(campCaps)),targets:JSON.parse(JSON.stringify(campTargets))};
if(campEditId){var idx=campaigns.findIndex(function(x){return x.id===campEditId;});campaigns[idx]=obj;}else campaigns.push(obj);
renderCampaigns();closeSlider('camp');toast(campEditId?'Campaign updated':'Campaign created');
}
function deleteCampaign(id){campaigns=campaigns.filter(function(x){return x.id!==id;});renderCampaigns();toast('Deleted');}
//════════════════════════════════════════════════════
// CHALLENGE RENDER & CRUD
//════════════════════════════════════════════════════
function renderChallenges(){
var tb=document.getElementById('chal-body');if(!tb)return;
var list=challenges.filter(function(c){
if(!activeCtx.org) return true;
if(c.targets&&c.targets.mer&&c.targets.mer.length){
var orgMers=merchantData.filter(function(m){return m.org===activeCtx.org;}).map(function(m){return m.name;});
return c.targets.mer.some(function(m){return orgMers.indexOf(m)!==-1;});
}
return true;
});
if(!list.length){tb.innerHTML='<tr><td colspan="7"><div class="empty-state"><div class="empty-icon">🏅</div>No challenges for this context</div></td></tr>';return;}
var html='';
list.forEach(function(c){
var condSum='';
c.conditions.forEach(function(cd,i){
var sub=cd.subConds.map(function(s){return s.type+' '+s.op+' '+s.val+(s.val2?'–'+s.val2:'');}).join(' AND ');
condSum+='<div style="font-size:11px;color:var(--text2);margin-bottom:2px">'+(i>0?'<span style="color:var(--accent2);font-weight:700">AND </span>':'')+'<span class="badge-pill '+(cd.triggerType==='transaction'?'bp-blue':'bp-purple')+'" style="font-size:10px">'+cd.triggerType+'</span> '+cd.triggerKeys.map(function(k){return tkLabel(k);}).join('/')+'</div>';
});
var tierBadge=c.tierEligible?'<div style="margin-top:3px"><span class="badge-pill bp-yellow" style="font-size:10px">🏆Tier eligible</span></div>':'';
html+='<tr>'
+'<td><div style="font-weight:600">'+c.name+'</div><div class="td-mono">'+c.id+'</div>'+(c.goal?'<div style="font-size:11px;color:var(--text3)">'+c.goal+'</div>':'')+tierBadge+'</td>'
+'<td style="min-width:200px">'+condSum+'</td>'
+'<td style="font-size:12px;color:var(--accent2)">'+effectSummary(c.effect)+'</td>'
+'<td>'+capsSummary(c.caps)+'</td>'
+'<td>'+statusBadge(c.status)+'</td>'
+'<td style="font-size:12px;color:var(--text3)">'+(c.start||'—')+'<br/>'+(c.end||'—')+'</td>'
+'<td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openChalSlider(\''+c.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteChallenge(\''+c.id+'\')">Del</button></div></td>'
+'</tr>';
});
tb.innerHTML=html;
}
function openChalSlider(editId){
chalEditId=editId;var c=editId?challenges.find(function(x){return x.id===editId;}):null;
document.getElementById('chal-so-title').textContent=c?'Edit Challenge':'New Challenge';
sv('ch-name',c?c.name:'');sv('ch-status',c?c.status:'Draft');sv('ch-goal',c?c.goal:'');sv('ch-start',c?c.start:'');sv('ch-end',c?c.end:'');sv('ch-desc',c?c.desc:'');
document.getElementById('ch-tier-eligible').checked=c?!!c.tierEligible:false;
chalConds=c?JSON.parse(JSON.stringify(c.conditions)):[newChalCond()];
chalCaps=c?JSON.parse(JSON.stringify(c.caps)):[];
var chalEffect=c?c.effect:{type:'points_flat',val:'',val2:''};
chalTargets=c?JSON.parse(JSON.stringify(c.targets)):{mer:[],prd:[],seg:[]};
renderChalConds();renderCaps('ch');
sv('ch-effect-type',chalEffect.type);renderChalEffectFields();
setTimeout(function(){sv('ch-effect-val',chalEffect.val||'');sv('ch-effect-val2',chalEffect.val2||'');},20);
populateTargetSelects('ch');['mer','prd','seg'].forEach(function(t){renderTargetTags('ch',t);});
openSlider('chal');
}
function saveChallenge(){
var name=v('ch-name');if(!name){toast('Name required','red');return;}
if(!chalConds.length){toast('Add at least one condition','red');return;}
for(var i=0;i<chalConds.length;i++){if(!chalConds[i].triggerKeys.length){toast('Each condition needs a trigger key','red');return;}}
var effVal=document.getElementById('ch-effect-val')?document.getElementById('ch-effect-val').value:'';
if(!effVal){toast('Effect value required','red');return;}
var effVal2=document.getElementById('ch-effect-val2')?document.getElementById('ch-effect-val2').value:'';
var obj={id:chalEditId||'CHL-'+(challenges.length+1).toString().padStart(3,'0'),name:name,status:v('ch-status'),goal:v('ch-goal'),start:v('ch-start'),end:v('ch-end'),desc:v('ch-desc'),tierEligible:document.getElementById('ch-tier-eligible').checked,conditions:JSON.parse(JSON.stringify(chalConds)),effect:{type:v('ch-effect-type'),val:effVal,val2:effVal2},caps:JSON.parse(JSON.stringify(chalCaps)),targets:JSON.parse(JSON.stringify(chalTargets))};
if(chalEditId){var idx=challenges.findIndex(function(x){return x.id===chalEditId;});challenges[idx]=obj;}else challenges.push(obj);
renderChallenges();closeSlider('chal');toast(chalEditId?'Challenge updated':'Challenge created');
}
function deleteChallenge(id){challenges=challenges.filter(function(x){return x.id!==id;});renderChallenges();toast('Deleted');}
//════════════════════════════════════════════════════
// REDEMPTIONS
//════════════════════════════════════════════════════
var redempEditId=null;
function renderRedemptions(){
var tb=document.getElementById('redemp-body');if(!tb)return;
var list=redemptions.filter(function(r){
if(!activeCtx.org) return true;
if(r.targets&&r.targets.mer&&r.targets.mer.length){
var orgMers=merchantData.filter(function(m){return m.org===activeCtx.org;}).map(function(m){return m.name;});
return r.targets.mer.some(function(m){return orgMers.indexOf(m)!==-1;});
}
return true;
});
if(!list.length){tb.innerHTML='<tr><td colspan="9"><div class="empty-state"><div class="empty-icon">🎁</div>No rules for this context</div></td></tr>';return;}
var html='';
list.forEach(function(r){
var disc=r.discountType==='percentage'?r.discountVal+'%':'€'+r.discountVal;
var capStr=r.maxDiscountType==='fixed'?' (max €'+r.maxDiscount+')':r.maxDiscountType==='pct_tx'?' (max '+r.maxDiscount+'% of tx)':'';
var reqs=[];if(r.minBalance)reqs.push('Min '+r.minBalance+' pts');if(r.minOrder)reqs.push('Min €'+r.minOrder);if(r.maxPerMember)reqs.push('Max '+r.maxPerMember+'x/mbr');
html+='<tr>'
+'<td><div style="font-weight:600">'+r.name+'</div><div class="td-mono">'+r.id+'</div></td>'
+'<td style="font-weight:600;color:var(--accent2)">'+r.points.toLocaleString()+' pts</td>'
+'<td><span class="badge-pill bp-green">'+disc+capStr+'</span></td>'
+'<td style="font-size:12px;color:var(--text2)">'+(reqs.join('<br/>')||'—')+'</td>'
+'<td>'+statusBadge(r.status)+'</td>'
+'<td>'+capsSummary(r.caps)+'</td>'
+'<td>'+tgtSummary(r.targets)+'</td>'
+'<td style="font-size:12px;color:var(--text3)">'+(r.start||'—')+'<br/>'+(r.end||'—')+'</td>'
+'<td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openRedemptionSlider(\''+r.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteRedemption(\''+r.id+'\')">Del</button></div></td>'
+'</tr>';
});
tb.innerHTML=html;
}
function openRedemptionSlider(editId){
redempEditId=editId;var r=editId?redemptions.find(function(x){return x.id===editId;}):null;
document.getElementById('redemp-so-title').textContent=r?'Edit Redemption Rule':'New Redemption Rule';
sv('r-name',r?r.name:'');sv('r-desc',r?r.desc:'');sv('r-status',r?r.status:'Draft');sv('r-start',r?r.start:'');sv('r-end',r?r.end:'');sv('r-points',r?r.points:'');sv('r-discount-type',r?r.discountType:'percentage');sv('r-discount-val',r?r.discountVal:'');sv('r-max-discount-type',r?r.maxDiscountType||'':'');sv('r-max-discount',r?r.maxDiscount:'');sv('r-min-balance',r?r.minBalance:'');sv('r-min-order',r?r.minOrder:'');sv('r-max-uses',r?r.maxUses:'');sv('r-max-per-member',r?r.maxPerMember:'');
redempCaps=r?JSON.parse(JSON.stringify(r.caps)):[];
redempTargets=r?JSON.parse(JSON.stringify(r.targets)):{mer:[],prd:[],seg:[]};
renderCaps('r');populateTargetSelects('r');['mer','prd','seg'].forEach(function(t){renderTargetTags('r',t);});
openSlider('redemp');
}
function deleteRedemption(id){redemptions=redemptions.filter(function(x){return x.id!==id;});renderRedemptions();toast('Deleted');}
function saveRedemption(){
var name=v('r-name');if(!name){toast('Name required','red');return;}
var points=parseInt(v('r-points'));if(!points){toast('Points cost required','red');return;}
var discountVal=parseFloat(v('r-discount-val'));if(!discountVal){toast('Discount value required','red');return;}
var obj={id:redempEditId||'RDM-'+(redemptions.length+1).toString().padStart(3,'0'),name:name,desc:v('r-desc'),status:v('r-status'),start:v('r-start'),end:v('r-end'),points:points,discountType:v('r-discount-type'),discountVal:discountVal,maxDiscountType:v('r-max-discount-type')||'',maxDiscount:v('r-max-discount')||'',minBalance:parseInt(v('r-min-balance'))||'',minOrder:parseFloat(v('r-min-order'))||'',maxUses:parseInt(v('r-max-uses'))||'',maxPerMember:parseInt(v('r-max-per-member'))||'',caps:JSON.parse(JSON.stringify(redempCaps)),targets:JSON.parse(JSON.stringify(redempTargets))};
if(redempEditId){var idx=redemptions.findIndex(function(x){return x.id===redempEditId;});redemptions[idx]=obj;}else redemptions.push(obj);
renderRedemptions();closeSlider('redemp');toast(redempEditId?'Rule updated':'Rule created');
}
//════════════════════════════════════════════════════
// WALLETS & LEDGER
//════════════════════════════════════════════════════
function wTab(t,idx){
document.getElementById('wtab-wallets').style.display=t==='wallets'?'block':'none';
document.getElementById('wtab-ledger').style.display=t==='ledger'?'block':'none';
document.querySelectorAll('#wallet-tabs .tab').forEach(function(el,i){el.classList.toggle('active',i===idx);});
if(t==='wallets')renderWallets();
if(t==='ledger')drawLedger('');
}
function renderWallets(){
var of=document.getElementById('wf-org');
if(of){var orgsUniq=[];WD.forEach(function(w){if(orgsUniq.indexOf(w.org)===-1)orgsUniq.push(w.org);});of.innerHTML='<option value="">All Orgs</option>';orgsUniq.forEach(function(o){of.innerHTML+='<option>'+o+'</option>';});}
document.getElementById('wallet-search').oninput=function(){applyWalletFilters();};
document.getElementById('wf-org').onchange=function(){applyWalletFilters();};
document.getElementById('wf-type').onchange=function(){applyWalletFilters();};
applyWalletFilters();
}
function applyWalletFilters(){
var q=(document.getElementById('wallet-search').value||'').toLowerCase();
var org=document.getElementById('wf-org').value;
var type=document.getElementById('wf-type').value;
var html='';
WD.filter(function(w){ return ctxMatch(w.org, null); }).forEach(function(w){
if(org&&w.org!==org)return;
if(type&&w.type!==type)return;
if(q&&w.walletId.toLowerCase().indexOf(q)===-1&&w.memberName.toLowerCase().indexOf(q)===-1)return;
var bal=w.earned-w.spent;
var unit=w.type==='Cashback'?'€':'pts';
var ini=w.memberName.split(' ').map(function(n){return n[0];}).join('');
var badgeCls=w.type==='Cashback'?'bp-green':'bp-blue';
html+='<tr>';
html+='<td style="font-family:monospace;font-size:12px;color:var(--text2)">'+w.walletId+'</td>';
html+='<td><div style="display:flex;align-items:center;gap:8px"><div class="avatar-sm">'+ini+'</div><span style="font-weight:600">'+w.memberName+'</span></div></td>';
html+='<td style="color:var(--text2)">'+w.org+'</td>';
html+='<td><span class="badge-pill '+badgeCls+'">'+w.type+'</span></td>';
html+='<td style="color:var(--green);font-weight:600">'+w.earned.toLocaleString()+' <span style="font-size:11px;color:var(--text3);font-weight:400">'+unit+'</span></td>';
html+='<td style="color:var(--red)">'+w.spent.toLocaleString()+' <span style="font-size:11px;color:var(--text3)">'+unit+'</span></td>';
html+='<td style="font-weight:700;color:#fff">'+bal.toLocaleString()+' <span style="font-size:11px;color:var(--text3);font-weight:400">'+unit+'</span></td>';
html+='<td><button class="btn btn-secondary btn-sm" onclick="openWalletDrilldown(\''+w.walletId+'\')">View Ledger</button></td>';
html+='</tr>';
});
document.getElementById('w-tbody').innerHTML=html||'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text3)">No wallets found</td></tr>';
}
function drawLedger(filterWalletId){
var wSel=document.getElementById('lf-wallet');
wSel.innerHTML='<option value="">All Wallets</option>';
WD.forEach(function(w){wSel.innerHTML+='<option value="'+w.walletId+'">'+w.walletId+' — '+w.memberName+' ('+w.type+')</option>';});
if(filterWalletId)wSel.value=filterWalletId;
var html='';
LD.forEach(function(e){
if(filterWalletId&&e.walletId!==filterWalletId)return;
var w=WD.find(function(x){return x.walletId===e.walletId;});
var unit=w&&w.type==='Cashback'?'€':'pts';
var isEarn=e.type==='earn';
var amtColor=isEarn?'var(--green)':(e.status==='reversed'?'var(--text3)':'var(--red)');
var typeBadge=isEarn?'<span class="badge-pill bp-green" style="font-size:10px">earn</span>':'<span class="badge-pill bp-red" style="font-size:10px">spend</span>';
var sBadge=e.status==='confirmed'?'<span class="badge-pill bp-green">confirmed</span>':'<span class="badge-pill bp-gray">reversed</span>';
var srcIcon={Campaign:'🎯',Challenge:'🏅',Redemption:'🎁',Manual:'✏️'}[e.source]||'•';
html+='<tr>'
+'<td class="td-mono">'+e.txId+'</td>'
+'<td><div style="font-size:12px;font-weight:600">'+e.walletId+'</div><div style="font-size:11px;color:var(--text3)">'+(w?w.memberName:'')+'</div></td>'
+'<td>'+typeBadge+'</td>'
+'<td style="font-weight:700;color:'+amtColor+'">'+(isEarn?'+':'')+e.amount+' '+unit+'</td>'
+'<td><div style="font-size:12px">'+srcIcon+' '+e.source+'</div><div style="font-size:11px;color:var(--text3)">'+e.sourceName+'</div></td>'
+'<td>'+sBadge+'</td>'
+'<td style="font-weight:600;color:var(--text2)">'+e.balance.toLocaleString()+' '+unit+'</td>'
+'<td style="font-size:12px;color:var(--text3)">'+e.ts+'</td>'
+'</tr>';
});
document.getElementById('l-tbody').innerHTML=html||'<tr><td colspan="8" style="text-align:center;padding:30px;color:var(--text3)">No transactions</td></tr>';
}
function openWalletDrilldown(walletId){
var w=WD.find(function(x){return x.walletId===walletId;});if(!w)return;
var unit=w.type==='Cashback'?'€':'pts';var bal=w.earned-w.spent;
document.getElementById('wallet-modal-title').textContent=w.walletId+' — '+w.memberName+' ('+w.type+')';
document.getElementById('wallet-summary').innerHTML=[{label:'Wallet ID',val:w.walletId,color:'var(--text2)'},{label:'Total Earned',val:w.earned.toLocaleString()+' '+unit,color:'var(--green)'},{label:'Spent',val:w.spent.toLocaleString()+' '+unit,color:'var(--red)'},{label:'Balance',val:bal.toLocaleString()+' '+unit,color:'#fff'}].map(function(s){return'<div style="background:var(--surface2);border:1px solid var(--border);border-radius:var(--radius);padding:12px 14px"><div style="font-size:11px;color:var(--text3);text-transform:uppercase;letter-spacing:.04em;margin-bottom:4px">'+s.label+'</div><div style="font-size:'+(s.label==='Wallet ID'?'13':'20')+'px;font-weight:700;color:'+s.color+'">'+s.val+'</div></div>';}).join('');
var entries=LD.filter(function(e){return e.walletId===walletId;});
var eHtml='';entries.forEach(function(e){var isEarn=e.type==='earn';var sBadge=e.status==='confirmed'?'<span class="badge-pill bp-green">confirmed</span>':'<span class="badge-pill bp-gray">reversed</span>';eHtml+='<tr style="border-bottom:1px solid var(--border)"><td style="padding:8px 12px;font-family:monospace;font-size:12px;color:var(--text2)">'+e.txId+'</td><td style="padding:8px 12px">'+(isEarn?'<span class="badge-pill bp-green" style="font-size:10px">earn</span>':'<span class="badge-pill bp-red" style="font-size:10px">spend</span>')+'</td><td style="padding:8px 12px;font-weight:700;color:'+(isEarn?'var(--green)':'var(--red)')+'">'+(isEarn?'+':'')+e.amount+' '+unit+'</td><td style="padding:8px 12px;font-size:12px">'+e.sourceName+'</td><td style="padding:8px 12px">'+sBadge+'</td><td style="padding:8px 12px;font-weight:600;color:var(--text2)">'+e.balance.toLocaleString()+' '+unit+'</td><td style="padding:8px 12px;font-size:12px;color:var(--text3)">'+e.ts+'</td></tr>';});
document.getElementById('wallet-ledger-body').innerHTML=eHtml||'<tr><td colspan="7" style="padding:20px;text-align:center;color:var(--text3)">No transactions</td></tr>';
openModal('wallet-modal');
}
//════════════════════════════════════════════════════
// REWARDS
//════════════════════════════════════════════════════
var rwEditId=null;
function renderRewardTypes(){
var tb=document.getElementById('rewards-body');if(!tb)return;
var html='';
rewardTypes.forEach(function(r){
html+='<tr>'
+'<td><div style="font-weight:600">'+r.name+'</div><div class="td-mono">'+r.id+'</div></td>'
+'<td><span class="badge-pill bp-blue">'+r.walletType+'</span></td>'
+'<td style="color:var(--text2);font-size:12px">'+r.desc+'</td>'
+'<td>'+statusBadge(r.status)+'</td>'
+'<td style="color:var(--text3)">'+r.created+'</td>'
+'<td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openRewardModal(\''+r.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteRewardType(\''+r.id+'\')">Del</button></div></td>'
+'</tr>';
});
tb.innerHTML=html||'<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text3)">No reward types</td></tr>';
}
function openRewardModal(editId){rwEditId=editId;var r=editId?rewardTypes.find(function(x){return x.id===editId;}):null;document.getElementById('reward-modal-title').textContent=r?'Edit Reward Type':'New Reward Type';sv('rw-name',r?r.name:'');sv('rw-wallet',r?r.walletType:'Points');sv('rw-desc',r?r.desc:'');sv('rw-status',r?r.status:'Active');openModal('reward-modal');}
function deleteRewardType(id){rewardTypes=rewardTypes.filter(function(x){return x.id!==id;});renderRewardTypes();toast('Deleted');}
function saveRewardType(){var name=v('rw-name');if(!name){toast('Name required','red');return;}var obj={id:rwEditId||'RWT-'+(rewardTypes.length+1).toString().padStart(3,'0'),name:name,walletType:v('rw-wallet'),desc:v('rw-desc'),status:v('rw-status'),created:rwEditId?(rewardTypes.find(function(x){return x.id===rwEditId;})||{}).created||today():today()};if(rwEditId){var idx=rewardTypes.findIndex(function(x){return x.id===rwEditId;});rewardTypes[idx]=obj;}else rewardTypes.push(obj);renderRewardTypes();closeModal('reward-modal');toast(rwEditId?'Updated':'Created');}
//════════════════════════════════════════════════════
// TIERS
//════════════════════════════════════════════════════
var tierEditId=null;
function renderTiers(){
var tbf=document.getElementById('tier-branch-filter');var tof=document.getElementById('tier-org-filter');
if(tbf){var bNames=[];tiersData.forEach(function(t){if(bNames.indexOf(t.branch)===-1)bNames.push(t.branch);});tbf.innerHTML='<option value="">All Branches</option>';bNames.forEach(function(b){tbf.innerHTML+='<option>'+b+'</option>';});}
if(tof){tof.innerHTML='<option value="">All Orgs</option>';orgs.forEach(function(o){tof.innerHTML+='<option>'+o.name+'</option>';});}
var sorted=tiersData.filter(function(t){ return ctxMatch(t.org, t.branch); }).sort(function(a,b){return a.branch.localeCompare(b.branch)||a.level-b.level;});
var html='';
sorted.forEach(function(t){
var medal=t.level===1?'🥉':t.level===2?'🥈':'🥇';
var lColor=t.level===1?'var(--text2)':t.level===2?'var(--blue)':'var(--yellow)';
var mLabel=t.multType==='percentage'?'<span class="badge-pill bp-purple">+'+t.multVal+'%</span>':'<span class="badge-pill bp-blue">+'+t.multVal+' pts flat</span>';
html+='<tr>'
+'<td><div style="display:flex;align-items:center;gap:8px"><span style="font-size:18px">'+medal+'</span><div><div style="font-weight:700;color:#fff">'+t.name+'</div><div class="td-mono">'+t.id+'</div></div></div></td>'
+'<td><span style="font-weight:700;font-size:15px;color:'+lColor+'">'+t.level+'</span></td>'
+'<td><div style="font-weight:500">'+t.branch+'</div><div style="font-size:11px;color:var(--text3)">'+t.org+'</div></td>'
+'<td style="font-weight:600;color:var(--accent2)">'+t.minPts.toLocaleString()+' pts</td>'
+'<td>'+mLabel+'</td>'
+'<td>'+statusBadge(t.status)+'</td>'
+'<td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openTierSlider(\''+t.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteTier(\''+t.id+'\')">Del</button></div></td>'
+'</tr>';
});
document.getElementById('tiers-body').innerHTML=html||'<tr><td colspan="7" style="text-align:center;padding:40px;color:var(--text3)">No tiers yet</td></tr>';
}
function onTierBranchChange(){var bn=v('ti-branch');var b=branches.find(function(x){return x.name===bn;});sv('ti-org',b?b.org:'');}
function openTierSlider(editId){
tierEditId=editId;var t=editId?tiersData.find(function(x){return x.id===editId;}):null;
document.getElementById('tier-so-title').textContent=t?'Edit Tier':'New Tier';
var bSel=document.getElementById('ti-branch');bSel.innerHTML='<option value="">— Select branch —</option>';branches.forEach(function(b){bSel.innerHTML+='<option>'+b.name+'</option>';});
sv('ti-name',t?t.name:'');sv('ti-level',t?t.level:'');sv('ti-status',t?t.status:'Active');sv('ti-min-pts',t?t.minPts:'');sv('ti-mult-type',t?t.multType:'percentage');sv('ti-mult-val',t?t.multVal:'');
if(t){sv('ti-branch',t.branch);sv('ti-org',t.org);}else sv('ti-org','');
openSlider('tier');
}
function deleteTier(id){tiersData=tiersData.filter(function(x){return x.id!==id;});renderTiers();toast('Tier deleted');}
function saveTier(){
var name=v('ti-name'),branch=v('ti-branch'),level=parseInt(v('ti-level')),minPts=parseInt(v('ti-min-pts')),multVal=parseFloat(v('ti-mult-val'));
if(!name){toast('Tier name required','red');return;}if(!branch){toast('Branch required','red');return;}if(!level||level<1){toast('Level required','red');return;}if(isNaN(minPts)){toast('Min points required','red');return;}if(isNaN(multVal)){toast('Multiplier value required','red');return;}
var b=branches.find(function(x){return x.name===branch;});
var obj={id:tierEditId||'TIR-'+(tiersData.length+1).toString().padStart(3,'0'),name:name,level:level,branch:branch,org:b?b.org:'',minPts:minPts,multType:v('ti-mult-type'),multVal:multVal,status:v('ti-status')};
if(tierEditId){var idx=tiersData.findIndex(function(x){return x.id===tierEditId;});tiersData[idx]=obj;}else tiersData.push(obj);
renderTiers();closeSlider('tier');toast(tierEditId?'Tier updated':'Tier created');
}
//════════════════════════════════════════════════════
// MEMBERS
//════════════════════════════════════════════════════
var memberEditId=null;
function onMemberOrgChange(){
var org=v('mb-org');
var bs=document.getElementById('mb-branch');
bs.innerHTML='<option value="">— No branch —</option>';
branches.filter(function(b){return b.org===org&&b.status!=='Closed';}).forEach(function(b){bs.innerHTML+='<option>'+b.name+'</option>';});
}
function renderMembers(){
var mof=document.getElementById('member-org-filter');
if(mof){mof.innerHTML='<option value="">All Orgs</option>';orgs.forEach(function(o){mof.innerHTML+='<option>'+o.name+'</option>';});}
var html='';
membersData.filter(function(m){ return ctxMatch(m.org, m.branch); }).forEach(function(m){
var ini=m.fname[0]+m.lname[0];
var segs=m.segments.map(function(s){return'<span class="badge-pill bp-gray" style="font-size:10px">'+s+'</span>';}).join(' ')||'<span style="color:var(--text3);font-size:12px">—</span>';
html+='<tr>'
+'<td><div style="display:flex;align-items:center;gap:8px"><div class="avatar-sm">'+ini+'</div><div><div style="font-weight:600">'+m.fname+' '+m.lname+'</div><div style="font-size:11px;color:var(--text3)">'+m.email+'</div></div></div></td>'
+'<td class="td-mono">'+m.id+'</td>'
+'<td class="td-mono">'+m.extId+'</td>'
+'<td style="color:var(--text2)">'+m.org+'</td>'
+'<td style="color:var(--text2)">'+(m.branch||'—')+'</td>'
+'<td>'+statusBadge(m.status)+'</td>'
+'<td style="max-width:200px">'+segs+'</td>'
+'<td style="color:var(--text3);font-size:12px">'+m.joined+'</td>'
+'<td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openMemberSlider(\''+m.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteMember(\''+m.id+'\')">Del</button></div></td>'
+'</tr>';
});
document.getElementById('members-body').innerHTML=html;
}
function openMemberSlider(editId){
memberEditId=editId;var m=editId?membersData.find(function(x){return x.id===editId;}):null;
document.getElementById('member-so-title').textContent=m?'Edit Member':'New Member';
var mbOrg=document.getElementById('mb-org');mbOrg.innerHTML=orgs.map(function(o){return'<option>'+o.name+'</option>';}).join('');
sv('mb-fname',m?m.fname:'');sv('mb-lname',m?m.lname:'');sv('mb-extid',m?m.extId:'');sv('mb-email',m?m.email:'');sv('mb-phone',m?m.phone:'');sv('mb-status',m?m.status:'Active');sv('mb-dob',m?m.dob:'');sv('mb-gender',m?m.gender:'');sv('mb-city',m?m.city:'');sv('mb-locale',m?m.locale:'sq-AL');
if(m)mbOrg.value=m.org;
var segs=m?m.segments:[];var segHtml='';
SEGMENTS_LIST.forEach(function(s){var checked=segs.indexOf(s)!==-1;segHtml+='<label style="display:flex;align-items:center;gap:7px;padding:6px 12px;background:var(--surface2);border:1px solid '+(checked?'var(--accent)':'var(--border2)')+';border-radius:20px;cursor:pointer;font-size:12px;color:var(--text2)"><input type="checkbox" '+(checked?'checked':'')+' value="'+s+'" style="accent-color:var(--accent)" onchange="this.parentElement.style.borderColor=this.checked?\'var(--accent)\":\'var(--border2)\'"/> '+s+'</label>';});
document.getElementById('mb-segments-list').innerHTML=segHtml;
openSlider('member');
}
function deleteMember(id){membersData=membersData.filter(function(x){return x.id!==id;});renderMembers();toast('Member deleted');}
function saveMember(){
var fname=v('mb-fname'),lname=v('mb-lname'),extId=v('mb-extid');
if(!fname||!lname||!extId){toast('First name, last name and external ID required','red');return;}
var segs=[];document.querySelectorAll('#mb-segments-list input[type=checkbox]').forEach(function(cb){if(cb.checked)segs.push(cb.value);});
var obj={id:memberEditId||'MBR-'+(membersData.length+1).toString().padStart(3,'0'),extId:extId,fname:fname,lname:lname,email:v('mb-email'),phone:v('mb-phone'),org:v('mb-org'),status:v('mb-status'),dob:v('mb-dob'),gender:v('mb-gender'),city:v('mb-city'),locale:v('mb-locale'),segments:segs,joined:memberEditId?(membersData.find(function(x){return x.id===memberEditId;})||{}).joined||today():today()};
if(memberEditId){var idx=membersData.findIndex(function(x){return x.id===memberEditId;});membersData[idx]=obj;}else membersData.push(obj);
renderMembers();closeSlider('member');toast(memberEditId?'Member updated':'Member created');
}
//════════════════════════════════════════════════════
// CATALOG
//════════════════════════════════════════════════════
var tkEditId=null,merEditId=null,prdEditId=null;
function catalogTab(t,idx){['txkeys','evkeys','merchants','products'].forEach(function(x){document.getElementById('ctab-'+x).style.display=x===t?'block':'none';});document.querySelectorAll('#catalog-tabs .tab').forEach(function(el,i){el.classList.toggle('active',i===idx);});if(t==='txkeys')renderTKTab('transaction');if(t==='evkeys')renderTKTab('event');if(t==='merchants')renderMerchants();if(t==='products')renderProducts();}
function renderTKTab(type){var tbId=type==='transaction'?'txkeys-body':'evkeys-body';var list=TK_DATA.filter(function(k){return k.type===type;});var html='';list.forEach(function(k){html+='<tr><td class="td-mono">'+k.key+'</td><td style="font-weight:600">'+k.label+'</td><td><span class="badge-pill'+(type==='transaction'?'bp-blue':'bp-purple')+'">'+type+'</span></td><td>'+statusBadge(k.status)+'</td><td style="color:var(--text3)">'+k.created+'</td><td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openTKModal(\''+k.id+'\',\''+type+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteTK(\''+k.id+'\')">Del</button></div></td></tr>';});document.getElementById(tbId).innerHTML=html||'<tr><td colspan="6" style="text-align:center;padding:30px;color:var(--text3)">No keys</td></tr>';}
function openTKModal(editId,type){tkEditId=editId;var k=editId?TK_DATA.find(function(x){return x.id===editId;}):null;document.getElementById('tk-modal-title').textContent=k?'Edit Trigger Key':'New Trigger Key ('+type+')';sv('tk-key',k?k.key:'');sv('tk-label',k?k.label:'');sv('tk-type',k?k.type:type);sv('tk-status',k?k.status:'Active');document.getElementById('tk-modal').dataset.tkType=k?k.type:type;openModal('tk-modal');}
function deleteTK(id){var k=TK_DATA.find(function(x){return x.id===id;});TK_DATA.splice(TK_DATA.indexOf(k),1);if(k)renderTKTab(k.type);toast('Deleted');}
function saveTK(){var key=v('tk-key'),label=v('tk-label');if(!key||!label){toast('Key and label required','red');return;}var type=document.getElementById('tk-modal').dataset.tkType;var obj={id:tkEditId||'TK-'+(TK_DATA.length+1).toString().padStart(2,'0'),key:key,type:type,label:label,status:v('tk-status'),created:tkEditId?(TK_DATA.find(function(x){return x.id===tkEditId;})||{}).created||today():today()};if(tkEditId){var idx=TK_DATA.findIndex(function(x){return x.id===tkEditId;});TK_DATA[idx]=obj;}else TK_DATA.push(obj);renderTKTab(type);closeModal('tk-modal');toast(tkEditId?'Updated':'Created');}
function renderMerchants(){var html='';merchantData.forEach(function(m){html+='<tr><td><div style="font-weight:600">'+m.name+'</div><div class="td-mono">'+m.id+'</div></td><td class="td-mono">'+m.extId+'</td><td style="color:var(--text2)">'+m.org+'</td><td>'+statusBadge(m.status)+'</td><td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openMerchantModal(\''+m.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteMerchant(\''+m.id+'\')">Del</button></div></td></tr>';});document.getElementById('merchants-body').innerHTML=html||'<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text3)">No merchants</td></tr>';}
function openMerchantModal(editId){merEditId=editId;var m=editId?merchantData.find(function(x){return x.id===editId;}):null;document.getElementById('merchant-modal-title').textContent=m?'Edit Merchant':'New Merchant';document.getElementById('mer-org').innerHTML=orgs.map(function(o){return'<option>'+o.name+'</option>';}).join('');sv('mer-name',m?m.name:'');sv('mer-extid',m?m.extId:'');sv('mer-status',m?m.status:'Active');if(m)sv('mer-org',m.org);openModal('merchant-modal');}
function deleteMerchant(id){merchantData=merchantData.filter(function(x){return x.id!==id;});renderMerchants();toast('Deleted');}
function saveMerchant(){var name=v('mer-name');if(!name){toast('Name required','red');return;}var obj={id:merEditId||'MER-'+(merchantData.length+1).toString().padStart(3,'0'),name:name,extId:v('mer-extid'),org:v('mer-org'),status:v('mer-status')};if(merEditId){var idx=merchantData.findIndex(function(x){return x.id===merEditId;});merchantData[idx]=obj;}else merchantData.push(obj);renderMerchants();closeModal('merchant-modal');toast(merEditId?'Updated':'Created');}
function renderProducts(){var html='';productData.forEach(function(p){html+='<tr><td><div style="font-weight:600">'+p.name+'</div><div class="td-mono">'+p.id+'</div></td><td class="td-mono">'+p.sku+'</td><td style="color:var(--text2)">'+p.merchant+'</td><td>'+statusBadge(p.status)+'</td><td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openProductModal(\''+p.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteProduct(\''+p.id+'\')">Del</button></div></td></tr>';});document.getElementById('products-body').innerHTML=html||'<tr><td colspan="5" style="text-align:center;padding:30px;color:var(--text3)">No products</td></tr>';}
function openProductModal(editId){prdEditId=editId;var p=editId?productData.find(function(x){return x.id===editId;}):null;document.getElementById('product-modal-title').textContent=p?'Edit Product':'New Product';document.getElementById('prd-merchant').innerHTML=merchantData.map(function(m){return'<option>'+m.name+'</option>';}).join('');sv('prd-name',p?p.name:'');sv('prd-sku',p?p.sku:'');sv('prd-status',p?p.status:'Active');if(p)sv('prd-merchant',p.merchant);openModal('product-modal');}
function deleteProduct(id){productData=productData.filter(function(x){return x.id!==id;});renderProducts();toast('Deleted');}
function saveProduct(){var name=v('prd-name');if(!name){toast('Name required','red');return;}var obj={id:prdEditId||'PRD-'+(productData.length+1).toString().padStart(3,'0'),name:name,sku:v('prd-sku'),merchant:v('prd-merchant'),status:v('prd-status')};if(prdEditId){var idx=productData.findIndex(function(x){return x.id===prdEditId;});productData[idx]=obj;}else productData.push(obj);renderProducts();closeModal('product-modal');toast(prdEditId?'Updated':'Created');}
//════════════════════════════════════════════════════
// ADMIN
//════════════════════════════════════════════════════
var expandedRoles={};
var ATABS=['orgs','branches','roles','users','audit'];
function adminTab(t,idx){ATABS.forEach(function(x){document.getElementById('atab-'+x).style.display=x===t?'block':'none';});document.querySelectorAll('#admin-tabs .tab').forEach(function(el,i){el.classList.toggle('active',i===idx);});if(t==='branches'){populateBranchOrgFilter();renderBranches();}if(t==='roles')renderRoles();if(t==='users')renderUsers();if(t==='audit')renderAudit();}
function renderOrgs(){var html='';orgs.forEach(function(o){html+='<tr><td><div style="font-weight:600">'+o.name+'</div><div class="td-mono">'+o.id+'</div></td><td class="td-mono">'+o.slug+'</td><td style="color:var(--text2)">'+o.industry+'</td><td>'+statusBadge(o.status)+'</td><td>'+branches.filter(function(b){return b.org===o.name;}).length+'</td><td style="color:var(--text3)">'+o.created+'</td><td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openOrgModal(\''+o.id+'\')">Edit</button><button class="btn btn-danger btn-sm"onclick="deleteOrg(\''+o.id+'\')">Del</button></div></td></tr>';});document.getElementById('orgs-body').innerHTML=html;}
function openOrgModal(editId){var o=editId&&orgs.find(function(x){return x.id===editId;});document.getElementById('org-modal-title').textContent=o?'Edit Organization':'New Organization';sv('org-name',o?o.name:'');sv('org-slug',o?o.slug:'');sv('org-status',o?o.status:'Active');if(o)sv('org-industry',o.industry);document.getElementById('org-modal').dataset.editId=editId||'';document.getElementById('org-slug').dataset.touched='';openModal('org-modal');}
function deleteOrg(id){orgs=orgs.filter(function(x){return x.id!==id;});renderOrgs();toast('Deleted');}
function saveOrg(){var name=v('org-name'),slug=v('org-slug');if(!name||!slug){alert('Name and slug required');return;}var editId=document.getElementById('org-modal').dataset.editId;if(editId){var o=orgs.find(function(x){return x.id===editId;});o.name=name;o.slug=slug;o.status=v('org-status');o.industry=v('org-industry');}else orgs.push({id:'ORG-'+(orgs.length+1).toString().padStart(3,'0'),name:name,slug:slug,industry:v('org-industry'),status:'Active',created:today()});renderOrgs();closeModal('org-modal');toast(editId?'Updated':'Created');}
function populateBranchOrgFilter(){var sel=document.getElementById('branch-org-filter');var cur=sel.value;sel.innerHTML='<option value="">All Organizations</option>';orgs.forEach(function(o){sel.innerHTML+='<option>'+o.name+'</option>';});sel.value=cur;}
function renderBranches(filterOrg){var list=filterOrg?branches.filter(function(b){return b.org===filterOrg;}):branches;var html='';list.forEach(function(b){html+='<tr><td style="font-weight:600">'+b.name+'</td><td class="td-mono">'+b.id+'</td><td>'+b.org+'</td><td style="color:var(--text2)">'+b.city+'</td><td style="color:var(--text3);font-size:12px">'+b.address+'</td><td>'+statusBadge(b.status)+'</td><td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openBranchModal(\''+b.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteBranch(\''+b.id+'\')">Del</button></div></td></tr>';});document.getElementById('branches-body').innerHTML=html;}
function openBranchModal(editId){var b=editId&&branches.find(function(x){return x.id===editId;});document.getElementById('branch-modal-title').textContent=b?'Edit Branch':'New Branch';document.getElementById('br-org').innerHTML=orgs.map(function(o){return'<option>'+o.name+'</option>';}).join('');sv('br-name',b?b.name:'');sv('br-city',b?b.city:'');sv('br-address',b?b.address:'');sv('br-status',b?b.status:'Active');if(b)sv('br-org',b.org);document.getElementById('branch-modal').dataset.editId=editId||'';openModal('branch-modal');}
function deleteBranch(id){branches=branches.filter(function(x){return x.id!==id;});renderBranches();renderOrgs();toast('Deleted');}
function saveBranch(){var name=v('br-name'),org=v('br-org'),city=v('br-city');if(!name||!org||!city){alert('Required fields missing');return;}var editId=document.getElementById('branch-modal').dataset.editId;if(editId){var b=branches.find(function(x){return x.id===editId;});Object.assign(b,{name:name,org:org,city:city,address:v('br-address'),status:v('br-status')});}else branches.push({id:'BRN-'+(branches.length+1).toString().padStart(3,'0'),name:name,org:org,city:city,address:v('br-address'),status:'Active',created:today()});renderBranches();renderOrgs();closeModal('branch-modal');toast(editId?'Updated':'Created');}
function renderRoles(){var container=document.getElementById('roles-list');if(!container)return;if(!roles.length){container.innerHTML='<div class="table-wrap"><div class="empty-state"><div class="empty-icon">🛡️</div>No roles.</div></div>';return;}var html='';roles.forEach(function(r){var uCount=users.filter(function(u){return u.role===r.name;}).length;var p=r.perms||{};var rc=0,wc=0,dc=0,ac=0;MODULES.forEach(function(m){var mp=p[m]||{};if(mp.read)rc++;if(mp.write)wc++;if(mp.del)dc++;if(mp.admin)ac++;});var isExp=!!expandedRoles[r.id];var mHTML='';MODULES.forEach(function(m,mi){var mp=p[m]||{};var colors={read:'var(--green)',write:'var(--blue)',del:'var(--yellow)',admin:'var(--accent2)'};mHTML+='<tr style="'+(mi%2===1?'background:var(--surface2)':'')+'"><td style="padding:9px 16px;font-size:13px;color:var(--text);border-bottom:1px solid var(--border)">'+m+'</td>'+PERM_COLS.map(function(c){return'<td style="padding:9px 14px;text-align:center;border-bottom:1px solid var(--border);border-left:1px solid var(--border)"><span style="font-size:15px;color:'+(mp[c]?colors[c]:'var(--border2)')+'">'+( mp[c]?'✓':'–')+'</span></td>';}).join('')+'</tr>';});html+='<div class="role-card"><div class="role-card-hdr" onclick="toggleRole(\''+r.id+'\')"><div style="font-size:12px;color:var(--text3);width:14px">'+(isExp?'▾':'▸')+'</div><div style="flex:1;min-width:0"><div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap"><spanstyle="font-weight:700;color:#fff;font-size:14px">'+r.name+'</span>'+scopeBadge(r.scope)+'<span class="badge-pill bp-gray">👤'+uCount+'</span></div><div style="font-size:12px;color:var(--text3);margin-top:3px">'+(r.desc||'')+'</div><div style="display:flex;gap:14px;margin-top:6px;flex-wrap:wrap"><span style="font-size:11px;color:var(--green)">Read '+rc+'/'+MODULES.length+'</span><span style="font-size:11px;color:var(--blue)">Write '+wc+'/'+MODULES.length+'</span><span style="font-size:11px;color:var(--yellow)">Delete '+dc+'/'+MODULES.length+'</span><span style="font-size:11px;color:var(--accent2)">Admin '+ac+'/'+MODULES.length+'</span></div></div><div style="display:flex;gap:8px;flex-shrink:0" onclick="event.stopPropagation()"><button class="btn btn-secondary btn-sm" onclick="openRoleModal(\''+r.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteRole(\''+r.id+'\')">Delete</button></div></div>'+(isExp?'<div class="perm-matrix-wrap"><table class="perm-table"><thead><tr><th style="text-align:left;padding:8px 16px">Module</th><th>Read</th><th>Write</th><th>Delete</th><th>Admin</th></tr></thead><tbody>'+mHTML+'</tbody></table></div>':'')+'</div>';});container.innerHTML=html;}
function toggleRole(id){expandedRoles[id]=!expandedRoles[id];renderRoles();}
function openRoleModal(editId){var r=editId?roles.find(function(x){return x.id===editId;}):null;document.getElementById('role-modal-title').textContent=r?'Edit Role':'New Role';sv('role-name',r?r.name:'');sv('role-scope',r?r.scope:'Platform');sv('role-desc',r?r.desc||'':'');document.getElementById('role-modal').dataset.editId=editId||'';var tbody=document.getElementById('modal-perm-body');var sp=r?(r.perms||{}):{};tbody.innerHTML=MODULES.map(function(m,mi){var mp=sp[m]||{read:false,write:false,del:false,admin:false};return'<tr style="'+(mi%2===1?'background:var(--surface2)':'')+'"><td style="text-align:left;padding:9px 12px;font-size:13px;color:var(--text);border-bottom:1px solid var(--border)">'+m+'</td>'+PERM_COLS.map(function(c){return'<td style="text-align:center;padding:9px 12px;border-bottom:1px solid var(--border);border-left:1px solid var(--border)"><input type="checkbox" data-mod="'+m+'" data-col="'+c+'" '+(mp[c]?'checked':'')+'/></td>';}).join('')+'</tr>';}).join('');openModal('role-modal');}
function checkAllModal(val){document.querySelectorAll('#modal-perm-body input[type=checkbox]').forEach(function(cb){cb.checked=val;});}
function deleteRole(id){roles=roles.filter(function(x){return x.id!==id;});delete expandedRoles[id];renderRoles();toast('Deleted');}
function saveRole(){var name=v('role-name');if(!name){alert('Role name required');return;}var np={};MODULES.forEach(function(m){np[m]={};PERM_COLS.forEach(function(c){np[m][c]=false;});});document.querySelectorAll('#modal-perm-body input[type=checkbox]').forEach(function(cb){np[cb.dataset.mod][cb.dataset.col]=cb.checked;});var editId=document.getElementById('role-modal').dataset.editId;if(editId){var r=roles.find(function(x){return x.id===editId;});r.name=name;r.scope=v('role-scope');r.desc=v('role-desc');r.perms=np;}else roles.push({id:'ROLE-'+(roles.length+1).toString().padStart(3,'0'),name:name,scope:v('role-scope'),desc:v('role-desc'),created:today(),perms:np});renderRoles();closeModal('role-modal');toast(editId?'Role updated':'Role created');}
function renderUsers(){var of=document.getElementById('user-org-filter');of.innerHTML='<option value="">All Orgs</option>';orgs.forEach(function(o){of.innerHTML+='<option>'+o.name+'</option>';});var uos=document.getElementById('u-org');uos.innerHTML='<option value="">— Platform Level —</option>';orgs.forEach(function(o){uos.innerHTML+='<option>'+o.name+'</option>';});var html='';users.forEach(function(u){html+='<tr><td><div style="display:flex;align-items:center;gap:10px"><div class="avatar-sm">'+u.fname[0]+u.lname[0]+'</div><div><div style="font-weight:600">'+u.fname+' '+u.lname+'</div><div style="font-size:11px;color:var(--text3)">'+u.email+'</div></div></div></td><td class="td-mono">'+u.id+'</td><td class="td-mono">'+u.extId+'</td><td>'+roleBadge(u.role)+'</td><td style="color:var(--text2)">'+u.org+'</td><td style="color:var(--text2)">'+u.branch+'</td><td>'+statusBadge(u.status)+'</td><td style="color:var(--text3);font-size:12px">'+u.lastLogin+'</td><td><div class="row-actions"><button class="btn btn-secondary btn-sm" onclick="openUserModal(\''+u.id+'\')">Edit</button><button class="btn btn-danger btn-sm" onclick="deleteUser(\''+u.id+'\')">Del</button></div></td></tr>';});document.getElementById('users-body').innerHTML=html;}
function filterUsersByRole(r){document.querySelectorAll('#users-table tbody tr').forEach(function(tr){tr.style.display=(!r||tr.textContent.indexOf(r)!==-1)?'':'none';});}
function filterUsersByOrg(org){document.querySelectorAll('#users-table tbody tr').forEach(function(tr){tr.style.display=(!org||tr.textContent.indexOf(org)!==-1)?'':'none';});}
function onUserOrgChange(){var org=v('u-org');var bs=document.getElementById('u-branch');bs.innerHTML='<option value="">— All Branches —</option>';branches.filter(function(b){return b.org===org&&b.status!=='Closed';}).forEach(function(b){bs.innerHTML+='<option>'+b.name+'</option>';});}
function onUserRoleChange(){document.getElementById('u-branch-row').style.opacity=v('u-role')==='Branch Manager'?'1':'0.4';}
function openUserModal(editId){var u=editId?users.find(function(x){return x.id===editId;}):null;document.getElementById('user-modal-title').textContent=u?'Edit User':'New User';var uos=document.getElementById('u-org');uos.innerHTML='<option value="">— Platform Level —</option>';orgs.forEach(function(o){uos.innerHTML+='<option>'+o.name+'</option>';});if(u){sv('u-fname',u.fname);sv('u-lname',u.lname);sv('u-email',u.email);sv('u-extid',u.extId);sv('u-role',u.role);sv('u-status',u.status);sv('u-dept',u.dept||'');sv('u-phone',u.phone||'');sv('u-locale',u.locale||'en-US');sv('u-tz',u.tz||'UTC');uos.value=u.org==='—'?'':u.org;onUserOrgChange();document.getElementById('u-branch').value=u.branch==='—'?'':u.branch;}else{['u-fname','u-lname','u-email','u-extid','u-dept','u-phone'].forEach(function(id){sv(id,'');});onUserOrgChange();}onUserRoleChange();document.getElementById('user-modal').dataset.editId=editId||'';openModal('user-modal');}
function deleteUser(id){users=users.filter(function(x){return x.id!==id;});renderUsers();toast('Deleted');}
function saveUser(){var fname=v('u-fname'),lname=v('u-lname'),email=v('u-email'),extId=v('u-extid');if(!fname||!lname||!email||!extId){alert('Required fields missing');return;}var editId=document.getElementById('user-modal').dataset.editId;var org=v('u-org')||'—',branch=v('u-branch')||'—';if(editId){var u=users.find(function(x){return x.id===editId;});Object.assign(u,{fname:fname,lname:lname,email:email,extId:extId,role:v('u-role'),org:org,branch:branch,status:v('u-status'),dept:v('u-dept'),phone:v('u-phone'),locale:v('u-locale'),tz:v('u-tz')});}else users.push({id:'USR-'+(users.length+1).toString().padStart(3,'0'),extId:extId,fname:fname,lname:lname,email:email,role:v('u-role'),org:org,branch:branch,status:'Active',lastLogin:'—',dept:v('u-dept'),phone:v('u-phone'),locale:v('u-locale'),tz:v('u-tz')});renderUsers();closeModal('user-modal');toast(editId?'Updated':'Created');}
function renderAudit(){document.getElementById('audit-list').innerHTML=auditLog.map(function(a){return'<div class="audit-row"><div class="audit-icon-wrap" style="background:'+a.color+'22">'+a.icon+'</div><divstyle="flex:1"><div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap"><span style="font-weight:600;color:#fff">'+a.actor+'</span><span class="badge-pill bp-gray">'+a.action+'</span><span style="color:var(--text2)">'+a.resource+'</span></div><div style="font-size:11px;color:var(--text3)">'+a.time+'</div><div class="audit-detail">'+a.detail+'</div></div></div>';}).join('');}
//════════════════════════════════════════════════════
// INIT — runs after all data and functions are defined
//════════════════════════════════════════════════════
renderCampaigns();
renderChallenges();
renderRedemptions();
renderWallets();
renderRewardTypes();
renderTiers();
renderMembers();
renderTKTab('transaction');
renderOrgs();
renderRoles();
renderUsers();
renderChalEffectFields();
renderCaps('c'); renderCaps('ch'); renderCaps('r');
document.querySelectorAll('.modal-overlay').forEach(function(el){el.addEventListener('click',function(e){if(e.target===el)el.classList.remove('open');});});
document.getElementById('org-name').addEventListener('input',function(){var s=document.getElementById('org-slug');if(!s.dataset.touched)s.value=this.value.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'');});
document.getElementById('org-slug').addEventListener('input',function(){this.dataset.touched='1';});
// ── END LOYALTY MODULE JS ─────────────────────────────────────────

  // ── Expose public API to window ────────────────────────────────────────────
  // Only loyNav needs to be globally reachable (called by core_banking.html).
  // All other vars (users, roles, orgs, branches, campaigns, …) remain private.
  window.loyNav = loyNav;
})();
