import{r as n,j as e,l as k,c as M,s as w}from"./index-DyF85uUZ.js";import{d as h}from"./devices-Cn1jdZhv.js";import{u as D}from"./users-DNrr3Qg9.js";function z(){const[i,o]=n.useState([]),[b,u]=n.useState([]),[S,p]=n.useState(!0),[U,g]=n.useState(null),[m,v]=n.useState(""),[c,f]=n.useState("all"),[r,j]=n.useState("all");n.useEffect(()=>{(async()=>{try{p(!0),await new Promise(l=>setTimeout(l,600));const t=k("kookit_devices",null),a=k("kookit_users",null);o(t?.devices??h.devices),u(a?.users??D.users)}catch(t){console.error("Error loading data:",t),o(h.devices),u(D.users)}finally{p(!1)}})()},[]);const d=s=>{o(s),w("kookit_devices",{devices:s})},I=()=>{const s=prompt("Device name");if(!s)return;const t=prompt("Date sold (YYYY-MM-DD)",new Date().toISOString().slice(0,10)),a={id:M("d"),name:s,dateSold:t,primaryUserId:null,secondaryUserId:null,status:"active"};d([a,...i])},C=s=>{confirm("Are you sure you want to delete this device?")&&d(i.filter(t=>t.id!==s))},Y=s=>{const t=prompt("Primary user ID (e.g., u1001)");if(!t)return;const a=i.map(l=>l.id===s?{...l,primaryUserId:t}:l);d(a)},A=s=>{const t=prompt("Secondary user ID (e.g., u1002)");if(!t)return;const a=i.map(l=>l.id===s?{...l,secondaryUserId:t}:l);d(a)},L=s=>{const t=i.map(a=>a.id===s?{...a,status:a.status==="active"?"inactive":"active"}:a);d(t)},N=s=>b.find(t=>t.id===s)?.name??(s?`Unknown (${s})`:"-"),T=()=>{confirm("Reset all devices to default? This cannot be undone.")&&(w("kookit_devices",{devices:h.devices}),o(h.devices))},x=i.filter(s=>{const t=s.name?.toLowerCase().includes(m.toLowerCase()),a=c==="all"||s.status===c,l=r==="all"||s.primaryUserId===r||s.secondaryUserId===r;return t&&a&&l}),E=b.map(s=>({id:s.id,name:s.name})),y=`
    .devices-container {
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

    /* Table Styles */
    .devices-table {
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e9ecef;
    }

    .table-row {
      transition: all 0.3s ease;
      border-bottom: 1px solid #f1f5f9;
    }

    .table-row:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateX(5px);
      box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    }

    .table-row:last-child {
      border-bottom: none;
    }

    /* Status Badges */
    .status-badge {
      padding: 0.35em 0.8em;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .status-badge:hover {
      transform: scale(1.05);
    }

    .status-active {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .status-inactive {
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: white;
    }

    /* User Badges */
    .user-badge {
      background: rgba(79, 70, 229, 0.1);
      color: #4f46e5;
      padding: 0.25em 0.6em;
      border-radius: 6px;
      font-size: 0.8rem;
      font-weight: 500;
      border: 1px solid rgba(79, 70, 229, 0.2);
    }

    .user-badge-secondary {
      background: rgba(107, 114, 128, 0.1);
      color: #6b7280;
      border-color: rgba(107, 114, 128, 0.2);
    }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 70, 229, 0.3);
    }

    .btn-icon {
      width: 32px;
      height: 32px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .btn-icon:hover {
      transform: scale(1.1);
    }

    /* Search and Filter */
    .search-box {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .search-box:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    .filter-select {
      border-radius: 10px;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .filter-select:focus {
      border-color: #4f46e5;
      box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text, 
    .skeleton-button, .skeleton-row {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 24px; width: 200px; margin-bottom: 10px; }
    .skeleton-subtitle { height: 16px; width: 150px; margin-bottom: 20px; }
    .skeleton-text { height: 14px; margin-bottom: 8px; }
    .skeleton-button { height: 32px; width: 80px; margin-right: 8px; }
    .skeleton-row { height: 60px; margin-bottom: 10px; border-radius: 8px; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Empty State */
    .empty-state {
      padding: 3rem 2rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 3rem;
      margin-bottom: 1rem;
      opacity: 0.5;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Text Gradient */
    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Stats Cards */
    .stat-card {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 1px solid #e9ecef;
      border-radius: 12px;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    }

    /* Device Icon */
    .device-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      margin-right: 12px;
    }
  `,F=()=>e.jsxs("div",{className:"loading-skeleton",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"skeleton-title"}),e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"skeleton-button",style:{width:"140px"}}),e.jsx("div",{className:"skeleton-button",style:{width:"100px",marginLeft:"10px"}})]})]}),e.jsxs("div",{className:"row mb-4",children:[e.jsx("div",{className:"col-md-4",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})}),e.jsx("div",{className:"col-md-3",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})}),e.jsx("div",{className:"col-md-3",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})}),e.jsx("div",{className:"col-md-2",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})})]}),e.jsx("div",{className:"card skeleton-card",children:e.jsx("div",{className:"card-body",children:[1,2,3,4,5].map(s=>e.jsx("div",{className:"skeleton-row mb-3"},s))})})]});return S?e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:y}),e.jsx(F,{})]}):e.jsxs("div",{className:"container-fluid devices-container",children:[e.jsx("style",{children:y}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-fade-in",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"h3 mb-1 fw-bold text-gradient",children:"Device Management"}),e.jsx("p",{className:"text-muted mb-0",children:"Manage and track all registered devices"})]}),e.jsxs("div",{className:"text-end",children:[e.jsx("small",{className:"text-muted d-block",children:"Total Devices"}),e.jsxs("small",{className:"fw-semibold",children:[i.length," devices"]})]})]}),e.jsxs("div",{className:"row mb-4 animate-slide-up",style:{animationDelay:"0.1s"},children:[e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-primary",children:i.length}),e.jsx("div",{className:"text-muted small",children:"Total Devices"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-success",children:i.filter(s=>s.status==="active").length}),e.jsx("div",{className:"text-muted small",children:"Active Devices"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-warning",children:i.filter(s=>s.primaryUserId).length}),e.jsx("div",{className:"text-muted small",children:"Assigned Devices"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-info",children:x.length}),e.jsx("div",{className:"text-muted small",children:"Filtered Results"})]})})]}),e.jsx("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-slide-up",style:{animationDelay:"0.2s"},children:e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{className:"btn btn-primary btn-glow",onClick:I,children:[e.jsx("i",{className:"bi bi-plus-circle me-2"}),"Add Device"]}),e.jsxs("button",{className:"btn btn-outline-secondary btn-glow",onClick:T,children:[e.jsx("i",{className:"bi bi-arrow-clockwise me-2"}),"Reset to Defaults"]})]})}),e.jsxs("div",{className:"row mb-4 animate-slide-up",style:{animationDelay:"0.3s"},children:[e.jsx("div",{className:"col-md-4",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text bg-light border-end-0",children:e.jsx("i",{className:"bi bi-search text-muted"})}),e.jsx("input",{type:"text",className:"form-control search-box border-start-0",placeholder:"Search devices by name...",value:m,onChange:s=>v(s.target.value)})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("select",{className:"form-select filter-select",value:c,onChange:s=>f(s.target.value),children:[e.jsx("option",{value:"all",children:"All Status"}),e.jsx("option",{value:"active",children:"Active"}),e.jsx("option",{value:"inactive",children:"Inactive"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("select",{className:"form-select filter-select",value:r,onChange:s=>j(s.target.value),children:[e.jsx("option",{value:"all",children:"All Users"}),E.map(s=>e.jsx("option",{value:s.id,children:s.name},s.id))]})}),e.jsx("div",{className:"col-md-2",children:e.jsxs("div",{className:"text-muted small",children:["Showing ",x.length," of ",i.length]})})]}),e.jsxs("div",{className:"card shadow-sm devices-table animate-slide-up",style:{animationDelay:"0.4s"},children:[e.jsx("div",{className:"card-header bg-transparent border-bottom-0",children:e.jsx("h6",{className:"mb-0 fw-semibold",children:"Devices List"})}),e.jsx("div",{className:"card-body p-0",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover mb-0",children:[e.jsx("thead",{className:"table-light",children:e.jsxs("tr",{children:[e.jsx("th",{style:{minWidth:200},className:"ps-4",children:"Device"}),e.jsx("th",{style:{minWidth:120},children:"Date Sold"}),e.jsx("th",{style:{minWidth:150},children:"Primary User"}),e.jsx("th",{style:{minWidth:150},children:"Secondary User"}),e.jsx("th",{style:{minWidth:100},children:"Status"}),e.jsx("th",{style:{width:200},className:"text-end pe-4",children:"Actions"})]})}),e.jsxs("tbody",{children:[x.map((s,t)=>e.jsxs("tr",{className:`table-row animate-fade-in ${U===s.id?"table-active":""}`,style:{animationDelay:`${.5+t*.05}s`},onMouseEnter:()=>g(s.id),onMouseLeave:()=>g(null),children:[e.jsx("td",{className:"ps-4",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("div",{className:"device-icon",children:e.jsx("i",{className:"bi bi-laptop"})}),e.jsxs("div",{children:[e.jsx("div",{className:"fw-semibold",children:s.name}),e.jsx("div",{className:"text-muted small",children:s.id})]})]})}),e.jsx("td",{children:e.jsx("span",{className:"text-muted",children:new Date(s.dateSold).toLocaleDateString()})}),e.jsx("td",{children:s.primaryUserId?e.jsx("span",{className:"user-badge",children:N(s.primaryUserId)}):e.jsx("span",{className:"text-muted small",children:"Not assigned"})}),e.jsx("td",{children:s.secondaryUserId?e.jsx("span",{className:"user-badge user-badge-secondary",children:N(s.secondaryUserId)}):e.jsx("span",{className:"text-muted small",children:"Not assigned"})}),e.jsx("td",{children:e.jsxs("span",{className:`status-badge ${s.status==="active"?"status-active":"status-inactive"}`,onClick:()=>L(s.id),title:"Click to toggle status",children:[s.status,e.jsx("i",{className:`bi ${s.status==="active"?"bi-check-circle":"bi-dash-circle"} ms-1`})]})}),e.jsx("td",{className:"text-end pe-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-1",children:[e.jsx("button",{className:"btn btn-sm btn-outline-primary btn-icon",onClick:()=>Y(s.id),title:"Assign primary user",children:e.jsx("i",{className:"bi bi-person-plus"})}),e.jsx("button",{className:"btn btn-sm btn-outline-success btn-icon",onClick:()=>A(s.id),title:"Assign secondary user",children:e.jsx("i",{className:"bi bi-person"})}),e.jsx("button",{className:"btn btn-sm btn-outline-danger btn-icon",onClick:()=>C(s.id),title:"Delete device",children:e.jsx("i",{className:"bi bi-trash"})})]})})]},s.id)),x.length===0&&e.jsx("tr",{children:e.jsxs("td",{colSpan:"6",className:"text-center py-5 empty-state",children:[e.jsx("i",{className:"bi bi-laptop"}),e.jsx("h5",{className:"text-muted mt-3 mb-2",children:"No Devices Found"}),e.jsx("p",{className:"text-muted mb-0",children:m||c!=="all"||r!=="all"?"Try adjusting your search or filter criteria":"Get started by adding your first device"}),(m||c!=="all"||r!=="all")&&e.jsx("button",{className:"btn btn-outline-primary mt-3",onClick:()=>{v(""),f("all"),j("all")},children:"Clear Filters"})]})})]})]})})})]})]})}export{z as default};
