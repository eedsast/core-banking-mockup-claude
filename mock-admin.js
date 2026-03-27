// ── Mock data: Administration & Authorisation ─────────────────────────────────
// Extracted from core_banking.html for maintainability.
// All arrays are immutable references; renderers should treat them as read-only.

const MOCK_ORGS = [
  { id:'019c04b5-7160-73e4-be97-8daa111af0d9', name:'OneFive',        extId:'777',           status:'ACTIVE', branches:'-', created:'28.01.2026', updated:'-'         },
  { id:'019c04b1-4314-7770-aca6-3609ce5e44f0', name:'Clinim Org',     extId:'987654321',     status:'ACTIVE', branches:'-', created:'28.01.2026', updated:'-'         },
  { id:'019be005-2d1d-7a98-af7d-f5e88fa83bdf', name:'E2E Org 93873',  extId:'E2E-93873',     status:'ACTIVE', branches:'-', created:'21.01.2026', updated:'-'         },
  { id:'019be005-182e-77ab-94de-59c8d9880f6e', name:'E2E Org 87194',  extId:'E2E-87194',     status:'ACTIVE', branches:'-', created:'21.01.2026', updated:'-'         },
  { id:'019be005-08a9-7cc8-8a1b-d5052be86c80', name:'E2E Org Fail',   extId:'E2E-FAIL',      status:'ACTIVE', branches:'-', created:'21.01.2026', updated:'-'         },
  { id:'019be005-0295-7d79-beca-5d0536ae93df', name:'E2E Org 81908',  extId:'E2E-81908',     status:'ACTIVE', branches:'-', created:'21.01.2026', updated:'-'         },
  { id:'019b97d9-850b-73ba-b92e-e07fa47eaeed', name:'ABCD',           extId:'12344566',      status:'ACTIVE', branches:'-', created:'07.01.2026', updated:'-'         },
  { id:'019b6ea7-3b3a-7dc9-a98a-7a72ac383db6', name:'OneFor LLC2',    extId:'asdasd',        status:'ACTIVE', branches:'-', created:'30.12.2025', updated:'-'         },
  { id:'019b6a48-284c-7a44-8b10-44bd6325feb7', name:'OneFor LLC',     extId:'2222',          status:'ACTIVE', branches:'-', created:'29.12.2025', updated:'-'         },
  { id:'019b6a44-122d-7259-a470-974cdabc4a80', name:'Onefor LLCC',    extId:'CHECKing',      status:'ACTIVE', branches:'-', created:'29.12.2025', updated:'29.12.2025'},
  { id:'019b5b43-3a1f-7384-b8ad-ae7daa07077d', name:'232323test',     extId:'22232asdas3d',  status:'ACTIVE', branches:'-', created:'26.12.2025', updated:'-'         },
];

const MOCK_USERS = [
  { name:'qwe',             email:'mergim@gmail.com',                  status:'ACTIVE',    created:'05.03.2026', updated:'-',          createdTs:'05.3.2026 15:49:45'  },
  { name:'Atdhetar Special',email:'sasa.stanic@gmail.com',             status:'ACTIVE',    created:'28.01.2026', updated:'-',          createdTs:'28.01.2026 10:00:00' },
  { name:'Acme Adminnnn',   email:'asdasd@gmail.com',                  status:'ACTIVE',    created:'30.12.2025', updated:'-',          createdTs:'30.12.2025 09:00:00' },
  { name:'Globex Manager',  email:'testkaltrina1+1039@gmail.com',       status:'SUSPENDED', created:'29.12.2025', updated:'29.12.2025', createdTs:'29.12.2025 14:30:00' },
  { name:'Acme Adminnnn',   email:'admin@acme.test',                   status:'ACTIVE',    created:'15.12.2025', updated:'19.12.2025', createdTs:'15.12.2025 08:00:00' },
];

// Read-only user list with role assignment badges (used in Auth → User List)
const MOCK_USER_LIST = [
  { name:'qwe',             email:'mergim@gmail.com',                  status:'ACTIVE',    created:'05.03.2026', roles:['AuditorUnique @ OneFor LLC2 / Head']      },
  { name:'Atdhetar Special',email:'sasa.stanic@gmail.com',             status:'ACTIVE',    created:'28.01.2026', roles:['SystemAdmin @ OneFive']                   },
  { name:'Acme Adminnnn',   email:'asdasd@gmail.com',                  status:'ACTIVE',    created:'30.12.2025', roles:['OrgAdmin @ Clinim Org / Main']            },
  { name:'Globex Manager',  email:'testkaltrina1+1039@gmail.com',       status:'SUSPENDED', created:'29.12.2025', roles:['BranchManager @ OneFor LLC / Head']       },
  { name:'Acme Adminnnn',   email:'admin@acme.test',                   status:'ACTIVE',    created:'15.12.2025', roles:['OrgAdmin @ OneFive']                      },
];

const MOCK_ROLES = [
  { id:'019c04b7-d330-7296-b756-ede45c1ec19a', name:'New Role for demo', builtin:'No',  created:'28.01.2026' },
  { id:'019b6ea6-83b1-79b6-99f6-4a3eb29ae252', name:'rolename',          builtin:'Yes', created:'30.12.2025' },
  { id:'019b6a46-dcf2-788f-84f5-87d1263f86b7', name:'AuditorUnique',     builtin:'Yes', created:'29.12.2025' },
  { id:'019b4565-4705-726e-bcd9-414f2c4b6875', name:'Finance Manager',   builtin:'No',  created:'22.12.2025' },
  { id:'019b3166-d60d-7169-a782-0e9917724d31', name:'testing',           builtin:'Yes', created:'18.12.2025' },
  { id:'019b30b6-ba82-7b3b-b305-3412f24300f4', name:'adsad',             builtin:'Yes', created:'18.12.2025' },
  { id:'019b2c3d-f838-7516-b62b-4bf40744ed5c', name:'updatett',          builtin:'No',  created:'17.12.2025' },
  { id:'019afdb8-a2b0-710d-ad7a-5470ffcceeb1', name:'SystemAdmin',       builtin:'Yes', created:'15.12.2025' },
  { id:'019afdb8-a2b0-7925-9254-700d3bf1ee75', name:'Auditor',           builtin:'Yes', created:'15.12.2025' },
  { id:'019afdb8-a2b0-72b4-8fdd-8c25c894170e', name:'BranchManager',     builtin:'Yes', created:'15.12.2025' },
  { id:'019afdb8-a2b0-7f8d-850a-745c17a4ef5d', name:'OrgAdmin',          builtin:'Yes', created:'15.12.2025' },
];

const MOCK_PERMISSIONS = [
  { key:'OneFive.read',       desc:'This is read permission',    scope:'SYSTEM'       },
  { key:'onefor.read',        desc:'asdads',                     scope:'SYSTEM'       },
  { key:'branch.create',      desc:'Description',                scope:'BRANCH'       },
  { key:'user.read',          desc:'List users',                 scope:'SYSTEM'       },
  { key:'user.update',        desc:'Manage users',               scope:'SYSTEM'       },
  { key:'organization.read',  desc:'View organizations',         scope:'ORGANIZATION' },
  { key:'permission.read',    desc:'List permissions',           scope:'SYSTEM'       },
  { key:'branch.update',      desc:'Manage branches',            scope:'BRANCH'       },
  { key:'branch.read',        desc:'View branches',              scope:'BRANCH'       },
  { key:'organization.update',desc:'Manage organizations',       scope:'ORGANIZATION' },
  { key:'role.read',          desc:'List roles',                 scope:'SYSTEM'       },
  { key:'role.update',        desc:'Manage roles',               scope:'SYSTEM'       },
];

const MOCK_ROLE_ASSIGNMENTS = [
  { user:'qwe',              email:'mergim@gmail.com',             org:'OneFor LLC2', branch:'Head',  role:'AuditorUnique'  },
  { user:'Atdhetar Special', email:'sasa.stanic@gmail.com',        org:'OneFive',     branch:'-',     role:'SystemAdmin'    },
  { user:'Acme Adminnnn',    email:'asdasd@gmail.com',             org:'Clinim Org',  branch:'Main',  role:'OrgAdmin'       },
  { user:'Globex Manager',   email:'testkaltrina1+1039@gmail.com', org:'OneFor LLC',  branch:'Head',  role:'BranchManager'  },
];
