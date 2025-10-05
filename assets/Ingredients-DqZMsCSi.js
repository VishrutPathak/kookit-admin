import{r,j as e,l as z,c as W,s as I}from"./index-Cb7WF7WO.js";import{i as x}from"./ingredients-CVToZE81.js";import{i as u,a as B}from"./imageResolver-B71T8x4S.js";function $(){const[a,l]=r.useState([]),[C,f]=r.useState(!0),[S,j]=r.useState(null),[d,y]=r.useState(""),[o,N]=r.useState("all"),h=r.useRef(null),[L,v]=r.useState(null);r.useEffect(()=>{(async()=>{try{f(!0),await new Promise(n=>setTimeout(n,600));const s=z("kookit_ingredients",null);s&&s.ingredients?l(s.ingredients):l(x.ingredients)}catch(s){console.error("Error loading ingredients:",s),l(x.ingredients)}finally{f(!1)}})()},[]);function m(t){l(t),I("kookit_ingredients",{ingredients:t})}const D=()=>{const t=prompt("Ingredient name");if(!t)return;const s=prompt("Unit (e.g. kg, g, pcs, cup)")||"unit",n=prompt("Category (e.g. vegetable, fruit, dairy, meat)")||"other",c={id:W("ing"),name:t,unit:s,category:n,notes:"",image:""};m([c,...a])},U=t=>{confirm("Are you sure you want to delete this ingredient?")&&m(a.filter(s=>s.id!==t))},R=t=>{const s=a.find(i=>i.id===t);if(!s)return;const n=prompt("Edit name",s.name);if(!n)return;const c=prompt("Edit unit",s.unit)||s.unit,b=prompt("Category",s.category||"other")||"other",p=prompt("Notes",s.notes||"")||"";m(a.map(i=>i.id===t?{...i,name:n,unit:c,category:b,notes:p}:i))},T=t=>{v(t),h.current&&h.current.click()},E=t=>{const s=t.target.files?.[0];if(!s)return;if(!s.type.startsWith("image/")){alert("Please select an image file");return}if(s.size>2*1024*1024){alert("Please select an image smaller than 2MB");return}const n=new FileReader;n.onload=c=>{const b=c.target.result,p=a.map(i=>i.id===L?{...i,image:b}:i);m(p),v(null),t.target.value=""},n.readAsDataURL(s)},F=t=>t.image?t.image:u&&u[t.id]?u[t.id]:B,Y=()=>{confirm("Reset all ingredients to default? This cannot be undone.")&&(I("kookit_ingredients",{ingredients:x.ingredients}),l(x.ingredients))},g=a.filter(t=>{const s=t.name?.toLowerCase().includes(d.toLowerCase())||t.notes?.toLowerCase().includes(d.toLowerCase()),n=o==="all"||t.category===o;return s&&n}),k=["all",...new Set(a.map(t=>t.category).filter(Boolean))],w=`
    .ingredients-container {
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
    .ingredients-table {
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

    /* Ingredient Image */
    .ingredient-image {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      object-fit: cover;
      border: 2px solid #e9ecef;
      transition: all 0.3s ease;
    }

    .table-row:hover .ingredient-image {
      border-color: #4f46e5;
      transform: scale(1.05);
    }

    /* Category Badges */
    .category-badge {
      padding: 0.35em 0.65em;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 500;
      text-transform: capitalize;
    }

    .category-vegetable { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; }
    .category-fruit { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; }
    .category-dairy { background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); color: #374151; }
    .category-meat { background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; }
    .category-spice { background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; }
    .category-other { background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%); color: white; }

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
    .skeleton-button, .skeleton-image, .skeleton-row {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 24px; width: 200px; margin-bottom: 10px; }
    .skeleton-subtitle { height: 16px; width: 150px; margin-bottom: 20px; }
    .skeleton-image { width: 60px; height: 60px; border-radius: 12px; }
    .skeleton-text { height: 14px; margin-bottom: 8px; }
    .skeleton-button { height: 32px; width: 80px; margin-right: 8px; }
    .skeleton-row { height: 80px; margin-bottom: 10px; border-radius: 8px; }

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
  `,A=()=>e.jsxs("div",{className:"loading-skeleton",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"skeleton-title"}),e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"skeleton-button",style:{width:"140px"}}),e.jsx("div",{className:"skeleton-button",style:{width:"100px",marginLeft:"10px"}})]})]}),e.jsxs("div",{className:"row mb-4",children:[e.jsx("div",{className:"col-md-6",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})}),e.jsx("div",{className:"col-md-3",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})}),e.jsx("div",{className:"col-md-3",children:e.jsx("div",{className:"skeleton-text",style:{height:"45px"}})})]}),e.jsx("div",{className:"card skeleton-card",children:e.jsx("div",{className:"card-body",children:[1,2,3,4,5].map(t=>e.jsx("div",{className:"skeleton-row mb-3"},t))})})]});return C?e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:w}),e.jsx(A,{})]}):e.jsxs("div",{className:"container-fluid ingredients-container",children:[e.jsx("style",{children:w}),e.jsx("input",{type:"file",accept:"image/*",ref:h,onChange:E,style:{display:"none"}}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-fade-in",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"h3 mb-1 fw-bold text-gradient",children:"Ingredients Library"}),e.jsx("p",{className:"text-muted mb-0",children:"Manage your cooking ingredients and inventory"})]}),e.jsxs("div",{className:"text-end",children:[e.jsx("small",{className:"text-muted d-block",children:"Total Ingredients"}),e.jsxs("small",{className:"fw-semibold",children:[a.length," items"]})]})]}),e.jsxs("div",{className:"row mb-4 animate-slide-up",style:{animationDelay:"0.1s"},children:[e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-primary",children:a.length}),e.jsx("div",{className:"text-muted small",children:"Total Ingredients"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-success",children:k.length-1}),e.jsx("div",{className:"text-muted small",children:"Categories"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-warning",children:a.filter(t=>t.image).length}),e.jsx("div",{className:"text-muted small",children:"With Images"})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"stat-card p-3 text-center",children:[e.jsx("div",{className:"h4 mb-1 text-info",children:g.length}),e.jsx("div",{className:"text-muted small",children:"Filtered Results"})]})})]}),e.jsx("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-slide-up",style:{animationDelay:"0.2s"},children:e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{className:"btn btn-primary btn-glow",onClick:D,children:[e.jsx("i",{className:"bi bi-plus-circle me-2"}),"Add Ingredient"]}),e.jsxs("button",{className:"btn btn-outline-secondary btn-glow",onClick:Y,children:[e.jsx("i",{className:"bi bi-arrow-clockwise me-2"}),"Reset to Defaults"]})]})}),e.jsxs("div",{className:"row mb-4 animate-slide-up",style:{animationDelay:"0.3s"},children:[e.jsx("div",{className:"col-md-6",children:e.jsxs("div",{className:"input-group",children:[e.jsx("span",{className:"input-group-text bg-light border-end-0",children:e.jsx("i",{className:"bi bi-search text-muted"})}),e.jsx("input",{type:"text",className:"form-control search-box border-start-0",placeholder:"Search ingredients by name or notes...",value:d,onChange:t=>y(t.target.value)})]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("select",{className:"form-select filter-select",value:o,onChange:t=>N(t.target.value),children:[e.jsx("option",{value:"all",children:"All Categories"}),k.filter(t=>t!=="all").map(t=>e.jsx("option",{value:t,children:t.charAt(0).toUpperCase()+t.slice(1)},t))]})}),e.jsx("div",{className:"col-md-3",children:e.jsxs("div",{className:"text-muted small",children:["Showing ",g.length," of ",a.length," ingredients"]})})]}),e.jsxs("div",{className:"card shadow-sm ingredients-table animate-slide-up",style:{animationDelay:"0.4s"},children:[e.jsx("div",{className:"card-header bg-transparent border-bottom-0",children:e.jsx("h6",{className:"mb-0 fw-semibold",children:"Ingredients List"})}),e.jsx("div",{className:"card-body p-0",children:e.jsx("div",{className:"table-responsive",children:e.jsxs("table",{className:"table table-hover mb-0",children:[e.jsx("thead",{className:"table-light",children:e.jsxs("tr",{children:[e.jsx("th",{style:{minWidth:280},className:"ps-4",children:"Ingredient"}),e.jsx("th",{style:{minWidth:100},children:"Unit"}),e.jsx("th",{style:{minWidth:120},children:"Category"}),e.jsx("th",{children:"Notes"}),e.jsx("th",{style:{width:180},className:"text-end pe-4",children:"Actions"})]})}),e.jsxs("tbody",{children:[g.map((t,s)=>e.jsxs("tr",{className:`table-row animate-fade-in ${S===t.id?"table-active":""}`,style:{animationDelay:`${.5+s*.05}s`},onMouseEnter:()=>j(t.id),onMouseLeave:()=>j(null),children:[e.jsx("td",{className:"ps-4",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("img",{src:F(t),alt:t.name,className:"ingredient-image me-3"}),e.jsxs("div",{children:[e.jsx("div",{className:"fw-semibold",children:t.name}),e.jsx("div",{className:"text-muted small",children:t.id})]})]})}),e.jsx("td",{children:e.jsx("span",{className:"badge bg-light text-dark border",children:t.unit})}),e.jsx("td",{children:t.category&&e.jsx("span",{className:`category-badge category-${t.category}`,children:t.category})}),e.jsx("td",{children:e.jsx("span",{className:"text-muted small",children:t.notes||e.jsx("em",{className:"text-muted",children:"No notes"})})}),e.jsx("td",{className:"text-end pe-4",children:e.jsxs("div",{className:"d-flex justify-content-end gap-1",children:[e.jsx("button",{className:"btn btn-sm btn-outline-primary btn-icon",onClick:()=>R(t.id),title:"Edit ingredient",children:e.jsx("i",{className:"bi bi-pencil"})}),e.jsx("button",{className:"btn btn-sm btn-outline-success btn-icon",onClick:()=>T(t.id),title:"Change image",children:e.jsx("i",{className:"bi bi-image"})}),e.jsx("button",{className:"btn btn-sm btn-outline-danger btn-icon",onClick:()=>U(t.id),title:"Delete ingredient",children:e.jsx("i",{className:"bi bi-trash"})})]})})]},t.id)),g.length===0&&e.jsx("tr",{children:e.jsxs("td",{colSpan:"5",className:"text-center py-5 empty-state",children:[e.jsx("i",{className:"bi bi-egg"}),e.jsx("h5",{className:"text-muted mt-3 mb-2",children:"No Ingredients Found"}),e.jsx("p",{className:"text-muted mb-0",children:d||o!=="all"?"Try adjusting your search or filter criteria":"Get started by adding your first ingredient"}),(d||o!=="all")&&e.jsx("button",{className:"btn btn-outline-primary mt-3",onClick:()=>{y(""),N("all")},children:"Clear Filters"})]})})]})]})})})]})]})}export{$ as default};
