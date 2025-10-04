import{r as i,j as e,L as x,l as u,b as D}from"./index-4xmnvLmg.js";import{u as U}from"./users-DNrr3Qg9.js";import{d as S}from"./devices-Cn1jdZhv.js";function I(){const[t,g]=i.useState([]),[d,j]=i.useState([]),[c,p]=i.useState([]),[k,v]=i.useState(!0),[h,r]=i.useState(null);i.useEffect(()=>{(async()=>{try{v(!0),await new Promise(A=>setTimeout(A,800));const a=u("kookit_users",null),n=u("kookit_devices",null),b=u("kookit_admins",null),m=a?.users??U?.users??[],l=n?.devices??S?.devices??[],y=b?.admins??D?.admins??[];g(Array.isArray(m)?m:[]),j(Array.isArray(l)?l:[]),p(Array.isArray(y)?y:[])}catch(a){console.error("Dashboard load error:",a),g([]),j([]),p([])}finally{v(!1)}})()},[]);const o=i.useMemo(()=>{const s=Array.isArray(t)?t:[],a=s.length,n=s.filter(l=>l?.status==="active").length,b=s.filter(l=>l?.status==="inactive").length,m=a>0?Math.round(n/a*100):0;return{totalUsers:a,active:n,inactive:b,activePercentage:m}},[t]),f=s=>s?(Array.isArray(t)?t:[]).find(n=>n?.id===s)?.name??`Unknown (${s})`:"-",N=`
    .dashboard-container {
      opacity: 0;
      animation: fadeIn 0.8s ease-out forwards;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .animate-fade-in {
      opacity: 0;
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .animate-slide-up {
      opacity: 0;
      transform: translateY(30px);
      animation: slideUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    /* Stats Cards */
    .stats-card {
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
      position: relative;
      overflow: hidden;
    }

    .stats-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .stats-card:hover::before {
      left: 100%;
    }

    .card-hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15) !important;
      border-color: #007bff;
    }

    .stats-icon {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      color: white;
    }

    .users-icon { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
    .devices-icon { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); }
    .admins-icon { background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); }

    .stats-number {
      font-size: 2.5rem;
      font-weight: 700;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0,123,255,0.4);
    }

    .btn-hover {
      transition: all 0.3s ease;
    }

    .btn-hover:hover {
      transform: translateX(5px);
    }

    /* User and Admin Avatars */
    .user-avatar, .admin-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
    }

    .admin-avatar {
      width: 30px;
      height: 30px;
      font-size: 0.8rem;
    }

    /* User Cards */
    .user-card {
      background: #f8f9fa;
      border-radius: 10px;
      transition: all 0.3s ease;
      border: 1px solid transparent;
    }

    .user-card:hover {
      background: white;
      border-color: #007bff;
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    /* Status Badges */
    .status-badge {
      padding: 0.35em 0.65em;
      font-size: 0.75em;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .status-badge:hover {
      transform: scale(1.05);
    }

    /* User Badges */
    .user-badge {
      padding: 0.25em 0.6em;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .primary-user {
      background: rgba(40, 167, 69, 0.1);
      color: #28a745;
      border: 1px solid rgba(40, 167, 69, 0.2);
    }

    .secondary-user {
      background: rgba(108, 117, 125, 0.1);
      color: #6c757d;
      border: 1px solid rgba(108, 117, 125, 0.2);
    }

    /* Device Icon */
    .device-icon {
      width: 30px;
      height: 30px;
      background: #f8f9fa;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #6c757d;
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text-small, 
    .skeleton-text-large, .skeleton-text-medium, .skeleton-button,
    .skeleton-table {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 24px; width: 200px; }
    .skeleton-subtitle { height: 16px; width: 100px; }
    .skeleton-text-small { height: 14px; width: 80px; }
    .skeleton-text-large { height: 32px; width: 60px; }
    .skeleton-text-medium { height: 12px; width: 120px; }
    .skeleton-button { height: 32px; width: 120px; }
    .skeleton-table { height: 200px; width: 100%; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Admin List */
    .admin-list div {
      transition: all 0.3s ease;
    }

    .admin-list div:hover {
      transform: translateX(5px);
    }

    /* Table row animations */
    .table-hover tbody tr {
      transition: all 0.2s ease;
    }

    .table-hover tbody tr:hover {
      background-color: rgba(0,123,255,0.05);
      transform: translateX(5px);
    }

    /* Progress bar animation */
    .progress-bar {
      transition: width 1s ease-in-out;
    }

    /* Empty state styling */
    .empty-state {
      padding: 3rem 1rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
    }
  `,w=()=>e.jsxs("div",{className:"loading-skeleton",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"skeleton-title"}),e.jsx("div",{className:"skeleton-subtitle"})]}),e.jsx("div",{className:"row g-3 mb-4",children:[1,2,3].map(s=>e.jsx("div",{className:"col-md-4",children:e.jsx("div",{className:"card shadow-sm skeleton-card",children:e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"skeleton-text-small"}),e.jsx("div",{className:"skeleton-text-large mt-2"}),e.jsx("div",{className:"skeleton-text-medium mt-3"}),e.jsx("div",{className:"skeleton-button mt-3"})]})})},s))}),e.jsx("div",{className:"card shadow-sm mb-4 skeleton-card",children:e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"skeleton-table"})})})]});return k?e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:N}),e.jsx(w,{})]}):e.jsxs("div",{className:"container-fluid dashboard-container",children:[e.jsx("style",{children:N}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-fade-in",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"h3 mb-1 fw-bold text-gradient",children:"Dashboard Overview"}),e.jsx("p",{className:"text-muted mb-0",children:"Welcome to your management dashboard"})]}),e.jsxs("div",{className:"text-end",children:[e.jsx("small",{className:"text-muted d-block",children:"Last updated"}),e.jsx("small",{className:"text-muted",children:new Date().toLocaleTimeString()})]})]}),e.jsxs("div",{className:"row g-4 mb-5",children:[e.jsx("div",{className:"col-md-4 animate-slide-up",style:{animationDelay:"0.1s"},children:e.jsx("div",{className:`card stats-card ${h==="users"?"card-hover":""}`,onMouseEnter:()=>r("users"),onMouseLeave:()=>r(null),children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center mb-3",children:[e.jsx("div",{className:"stats-icon users-icon",children:e.jsx("i",{className:"bi bi-people-fill"})}),e.jsx("small",{className:"text-muted ms-2",children:"Total Users"})]}),e.jsx("h3",{className:"stats-number",children:o.totalUsers}),e.jsx("div",{className:"progress mt-3",style:{height:"6px"},children:e.jsx("div",{className:"progress-bar bg-success",style:{width:`${o.activePercentage}%`}})}),e.jsxs("div",{className:"mt-3 d-flex justify-content-between",children:[e.jsxs("span",{className:"text-success",children:[e.jsx("i",{className:"bi bi-check-circle-fill me-1"}),"Active: ",o.active]}),e.jsxs("span",{className:"text-muted",children:["Inactive: ",o.inactive]})]}),e.jsx("div",{className:"mt-4",children:e.jsxs(x,{to:"/users",className:"btn btn-sm btn-primary btn-glow",children:["Manage Users",e.jsx("i",{className:"bi bi-arrow-right ms-1"})]})})]})})}),e.jsx("div",{className:"col-md-4 animate-slide-up",style:{animationDelay:"0.2s"},children:e.jsx("div",{className:`card stats-card ${h==="devices"?"card-hover":""}`,onMouseEnter:()=>r("devices"),onMouseLeave:()=>r(null),children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center mb-3",children:[e.jsx("div",{className:"stats-icon devices-icon",children:e.jsx("i",{className:"bi bi-laptop-fill"})}),e.jsx("small",{className:"text-muted ms-2",children:"Registered Devices"})]}),e.jsx("h3",{className:"stats-number",children:Array.isArray(d)?d.length:0}),e.jsx("div",{className:"mt-3",children:e.jsxs("small",{className:"text-muted",children:[e.jsx("i",{className:"bi bi-info-circle me-1"}),"All device types included"]})}),e.jsx("div",{className:"mt-4",children:e.jsxs(x,{to:"/devices",className:"btn btn-sm btn-primary btn-glow",children:["Manage Devices",e.jsx("i",{className:"bi bi-arrow-right ms-1"})]})})]})})}),e.jsx("div",{className:"col-md-4 animate-slide-up",style:{animationDelay:"0.3s"},children:e.jsx("div",{className:`card stats-card ${h==="admins"?"card-hover":""}`,onMouseEnter:()=>r("admins"),onMouseLeave:()=>r(null),children:e.jsxs("div",{className:"card-body",children:[e.jsxs("div",{className:"d-flex align-items-center mb-3",children:[e.jsx("div",{className:"stats-icon admins-icon",children:e.jsx("i",{className:"bi bi-shield-check"})}),e.jsx("small",{className:"text-muted ms-2",children:"Administrators"})]}),e.jsx("h3",{className:"stats-number",children:Array.isArray(c)?c.length:0}),e.jsx("div",{className:"mt-2 text-muted small admin-list",children:(Array.isArray(c)?c.slice(0,2):[]).map((s,a)=>e.jsxs("div",{className:"d-flex align-items-center mb-1 animate-fade-in",style:{animationDelay:`${.4+a*.1}s`},children:[e.jsx("div",{className:"admin-avatar me-2",children:s.name?.charAt(0)||"A"}),e.jsxs("div",{children:[s.name,e.jsxs("span",{className:"text-muted ms-1",children:["(",s.role,")"]})]})]},s.id))}),e.jsx("div",{className:"mt-3",children:e.jsxs(x,{to:"/admins",className:"btn btn-sm btn-primary btn-glow",children:["Manage Admins",e.jsx("i",{className:"bi bi-arrow-right ms-1"})]})})]})})})]}),e.jsxs("div",{className:"card shadow-sm mb-4 animate-slide-up",style:{animationDelay:"0.4s"},children:[e.jsx("div",{className:"card-header bg-transparent border-bottom-0 pb-0",children:e.jsxs("div",{className:"d-flex justify-content-between align-items-center",children:[e.jsxs("div",{children:[e.jsx("h6",{className:"mb-1 fw-semibold",children:"Device Management"}),e.jsx("p",{className:"text-muted small mb-0",children:"Recently registered devices and their status"})]}),e.jsx("div",{children:e.jsxs(x,{to:"/devices",className:"btn btn-sm btn-outline-primary btn-hover",children:["View All Devices",e.jsx("i",{className:"bi bi-chevron-right ms-1"})]})})]})}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover table-sm align-middle",children:[e.jsx("thead",{className:"table-light",children:e.jsxs("tr",{children:[e.jsx("th",{children:"Name"}),e.jsx("th",{children:"Date Sold"}),e.jsx("th",{children:"Primary User"}),e.jsx("th",{children:"Secondary User"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:Array.isArray(d)&&d.length>0?d.map((s,a)=>e.jsxs("tr",{className:"animate-fade-in",style:{animationDelay:`${.5+a*.05}s`},children:[e.jsx("td",{children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("div",{className:"device-icon me-2",children:e.jsx("i",{className:"bi bi-laptop"})}),e.jsx("span",{className:"fw-medium",children:s.name})]})}),e.jsx("td",{children:s.dateSold?e.jsx("span",{className:"text-muted",children:new Date(s.dateSold).toLocaleDateString()}):"-"}),e.jsx("td",{children:e.jsx("span",{className:"user-badge primary-user",children:f(s.primaryUserId)})}),e.jsx("td",{children:s.secondaryUserId?e.jsx("span",{className:"user-badge secondary-user",children:f(s.secondaryUserId)}):e.jsx("span",{className:"text-muted",children:"-"})}),e.jsx("td",{children:e.jsxs("span",{className:`badge status-badge ${s.status==="active"?"bg-success":"bg-secondary"}`,children:[s.status,e.jsx("i",{className:`bi ${s.status==="active"?"bi-check-circle":"bi-dash-circle"} ms-1`})]})})]},s.id)):e.jsx("tr",{children:e.jsxs("td",{colSpan:"5",className:"text-center py-5 empty-state",children:[e.jsx("i",{className:"bi bi-inbox"}),e.jsx("div",{children:"No devices found"})]})})})]})})})]}),e.jsxs("div",{className:"card shadow-sm animate-slide-up",style:{animationDelay:"0.5s"},children:[e.jsxs("div",{className:"card-header bg-transparent border-bottom-0",children:[e.jsx("h6",{className:"mb-1 fw-semibold",children:"Recent Users"}),e.jsx("p",{className:"text-muted small mb-0",children:"Latest registered users in the system"})]}),e.jsx("div",{className:"card-body",children:e.jsx("div",{className:"row g-3",children:Array.isArray(t)&&t.length>0?t.slice(0,6).map((s,a)=>e.jsx("div",{className:"col-lg-4 col-md-6",children:e.jsx("div",{className:"user-card animate-fade-in",style:{animationDelay:`${.6+a*.1}s`},children:e.jsxs("div",{className:"d-flex align-items-center p-3",children:[e.jsx("div",{className:"user-avatar me-3",children:s.name?.charAt(0)||"U"}),e.jsxs("div",{className:"flex-grow-1",children:[e.jsx("div",{className:"fw-semibold text-truncate",children:s.name}),e.jsxs("div",{className:"text-muted small",children:[e.jsxs("div",{className:"text-truncate",children:[e.jsx("i",{className:"bi bi-telephone me-1"}),s.phone||"No phone"]}),e.jsxs("div",{children:[e.jsx("i",{className:"bi bi-calendar me-1"}),"Joined: ",s.joined?new Date(s.joined).toLocaleDateString():"-"]})]})]}),e.jsx("div",{children:e.jsx("span",{className:`badge status-badge ${s.status==="active"?"bg-success":"bg-secondary"}`,children:s.status})})]})})},s.id)):e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"text-center py-5 empty-state",children:[e.jsx("i",{className:"bi bi-people"}),e.jsx("div",{children:"No users found"})]})})})})]})]})}export{I as default};
