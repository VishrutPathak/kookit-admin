import{r as n,j as e,L as f,l as F,c as j,s as v}from"./index-4xmnvLmg.js";import{r as c}from"./recipes-D2cB7iwa.js";import{r as p,b as z}from"./imageResolver-ClQL_M5f.js";function M(){const[a,l]=n.useState([]),[N,g]=n.useState(!0),[k,x]=n.useState(null),[A,E]=n.useState(null),d=n.useRef(null),[y,b]=n.useState(null);n.useEffect(()=>{(async()=>{try{g(!0),await new Promise(i=>setTimeout(i,600));const s=F("kookit_recipes",null);s&&s.recipes?l(s.recipes):l(c.recipes)}catch(s){console.error("Error loading recipes:",s),l(c.recipes)}finally{g(!1)}})()},[]);function o(t){l(t),v("kookit_recipes",{recipes:t})}const u=()=>{const t=prompt("Recipe title");if(!t)return;const s={id:j("r"),title:t,cuisine:"",veg:!0,tags:[],ingredients:[],steps:[],createdAt:new Date().toISOString(),image:""};o([s,...a])},w=t=>{confirm("Delete recipe?")&&o(a.filter(s=>s.id!==t))},R=t=>{const s=a.find(r=>r.id===t);if(!s)return;const i={...s,id:j("r"),title:s.title+" (Copy)",createdAt:new Date().toISOString()};o([i,...a])},C=t=>{b(t),d.current&&d.current.click()},S=t=>{const s=t.target.files?.[0];if(!s)return;if(!s.type.startsWith("image/")){alert("Please select an image file");return}if(s.size>5*1024*1024){alert("Please select an image smaller than 5MB");return}const i=new FileReader;i.onload=r=>{const Y=r.target.result,U=a.map(m=>m.id===y?{...m,image:Y}:m);o(U),b(null),t.target.value=""},i.readAsDataURL(s)},D=t=>t.image?t.image:p&&p[t.id]?p[t.id]:z,I=()=>{confirm("Reset all recipes to default? This cannot be undone.")&&(v("kookit_recipes",{recipes:c.recipes}),l(c.recipes))},h=`
    .recipes-container {
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

    /* Recipe Cards */
    .recipe-card {
      transition: all 0.3s ease;
      border: 1px solid #e9ecef;
      position: relative;
      overflow: hidden;
    }

    .recipe-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .recipe-card:hover::before {
      left: 100%;
    }

    .card-hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 30px rgba(0,0,0,0.15) !important;
      border-color: #4f46e5;
    }

    .recipe-image-container {
      height: 200px;
      overflow: hidden;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
    }

    .recipe-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }

    .recipe-card:hover .recipe-image {
      transform: scale(1.05);
    }

    .recipe-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      display: flex;
      align-items: flex-end;
      padding: 1rem;
    }

    .recipe-card:hover .recipe-overlay {
      opacity: 1;
    }

    /* Badges */
    .cuisine-badge {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: white;
      font-size: 0.7rem;
      font-weight: 500;
    }

    .veg-badge {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
    }

    .nonveg-badge {
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white;
    }

    /* Buttons */
    .btn-glow {
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
    }

    .btn-glow:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(79, 70, 229, 0.4);
    }

    .btn-hover {
      transition: all 0.3s ease;
    }

    .btn-hover:hover {
      transform: translateX(3px);
    }

    /* Loading Skeleton */
    .loading-skeleton .skeleton-card {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
    }

    .skeleton-title, .skeleton-subtitle, .skeleton-text, 
    .skeleton-button, .skeleton-image {
      background: #e0e0e0;
      border-radius: 4px;
      animation: loading 1.5s infinite;
    }

    .skeleton-title { height: 20px; width: 80%; margin-bottom: 10px; }
    .skeleton-subtitle { height: 14px; width: 60%; margin-bottom: 15px; }
    .skeleton-text { height: 12px; width: 90%; margin-bottom: 5px; }
    .skeleton-button { height: 28px; width: 70px; margin-right: 8px; }
    .skeleton-image { height: 200px; width: 100%; margin-bottom: 15px; }

    @keyframes loading {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    /* Empty State */
    .empty-state {
      padding: 4rem 2rem;
      text-align: center;
      color: #6c757d;
    }

    .empty-state i {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.5;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Action Buttons */
    .action-buttons {
      transition: all 0.3s ease;
    }

    .recipe-card:hover .action-buttons {
      opacity: 1;
      transform: translateY(0);
    }

    /* Tags */
    .tag-pill {
      background: #f1f5f9;
      color: #475569;
      padding: 0.25rem 0.6rem;
      border-radius: 50px;
      font-size: 0.75rem;
      margin-right: 0.5rem;
      margin-bottom: 0.5rem;
      display: inline-block;
    }

    /* Text Gradient */
    .text-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  `,L=()=>e.jsxs("div",{className:"loading-skeleton",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[e.jsx("div",{className:"skeleton-title",style:{width:"200px"}}),e.jsxs("div",{className:"d-flex",children:[e.jsx("div",{className:"skeleton-button",style:{width:"120px"}}),e.jsx("div",{className:"skeleton-button",style:{width:"140px",marginLeft:"10px"}}),e.jsx("div",{className:"skeleton-button",style:{width:"80px",marginLeft:"10px"}})]})]}),e.jsx("div",{className:"row",children:[1,2,3,4,5,6].map(t=>e.jsx("div",{className:"col-md-4 mb-4",children:e.jsxs("div",{className:"card skeleton-card h-100",children:[e.jsx("div",{className:"skeleton-image"}),e.jsxs("div",{className:"card-body",children:[e.jsx("div",{className:"skeleton-title"}),e.jsx("div",{className:"skeleton-subtitle"}),e.jsx("div",{className:"skeleton-text"}),e.jsx("div",{className:"skeleton-text",style:{width:"80%"}}),e.jsxs("div",{className:"d-flex mt-3",children:[e.jsx("div",{className:"skeleton-button"}),e.jsx("div",{className:"skeleton-button"}),e.jsx("div",{className:"skeleton-button"})]})]})]})},t))})]});return N?e.jsxs("div",{className:"container-fluid",children:[e.jsx("style",{children:h}),e.jsx(L,{})]}):e.jsxs("div",{className:"container-fluid recipes-container",children:[e.jsx("style",{children:h}),e.jsx("input",{type:"file",accept:"image/*",ref:d,onChange:S,style:{display:"none"}}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-fade-in",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"h3 mb-1 fw-bold text-gradient",children:"Recipe Collection"}),e.jsx("p",{className:"text-muted mb-0",children:"Manage and organize your favorite recipes"})]}),e.jsxs("div",{className:"text-end",children:[e.jsx("small",{className:"text-muted d-block",children:"Total Recipes"}),e.jsxs("small",{className:"fw-semibold",children:[a.length," recipes"]})]})]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mb-4 animate-slide-up",style:{animationDelay:"0.1s"},children:[e.jsxs("div",{className:"d-flex gap-2",children:[e.jsxs("button",{className:"btn btn-primary btn-glow",onClick:u,children:[e.jsx("i",{className:"bi bi-plus-circle me-2"}),"Add Recipe"]}),e.jsxs(f,{to:"/recipes/new",className:"btn btn-outline-success btn-glow",children:[e.jsx("i",{className:"bi bi-magic me-2"}),"Open Creator"]})]}),e.jsx("div",{children:e.jsxs("button",{className:"btn btn-outline-secondary btn-glow",onClick:I,children:[e.jsx("i",{className:"bi bi-arrow-clockwise me-2"}),"Reset to Defaults"]})})]}),e.jsxs("div",{className:"row",children:[a.map((t,s)=>e.jsx("div",{className:"col-xl-4 col-lg-6 mb-4",children:e.jsxs("div",{className:`card recipe-card h-100 animate-slide-up ${k===t.id?"card-hover":""}`,style:{animationDelay:`${.2+s*.1}s`},onMouseEnter:()=>x(t.id),onMouseLeave:()=>x(null),children:[e.jsxs("div",{className:"recipe-image-container",children:[e.jsx("img",{src:D(t),alt:t.title,className:"recipe-image"}),e.jsx("div",{className:"recipe-overlay",children:e.jsx("div",{className:"text-white",children:e.jsxs("small",{className:"opacity-75",children:["Created ",new Date(t.createdAt).toLocaleDateString()]})})})]}),e.jsxs("div",{className:"card-body d-flex flex-column",children:[e.jsxs("div",{className:"d-flex justify-content-between align-items-start mb-2",children:[e.jsx("h5",{className:"card-title fw-bold text-truncate me-2",style:{maxWidth:"70%"},children:t.title}),e.jsxs("div",{className:"d-flex flex-column align-items-end",children:[t.cuisine&&e.jsx("span",{className:"badge cuisine-badge mb-1",children:t.cuisine}),e.jsx("span",{className:`badge ${t.veg?"veg-badge":"nonveg-badge"}`,children:t.veg?"Vegetarian":"Non-Vegetarian"})]})]}),t.tags&&t.tags.length>0&&e.jsxs("div",{className:"mb-3",children:[t.tags.slice(0,3).map((i,r)=>e.jsxs("span",{className:"tag-pill",children:["#",i]},r)),t.tags.length>3&&e.jsxs("span",{className:"tag-pill",children:["+",t.tags.length-3," more"]})]}),e.jsxs("p",{className:"flex-grow-1 text-muted small mb-3",style:{minHeight:"40px"},children:[(t.steps?.[0]||"No description available").slice(0,120),t.steps?.[0]&&t.steps[0].length>120&&"..."]}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-auto",children:[e.jsxs("div",{className:"d-flex gap-1",children:[e.jsxs(f,{className:"btn btn-sm btn-primary btn-glow",to:`/recipes/${t.id}`,children:[e.jsx("i",{className:"bi bi-eye me-1"}),"Open"]}),e.jsx("button",{className:"btn btn-sm btn-outline-secondary btn-glow",onClick:()=>R(t.id),children:e.jsx("i",{className:"bi bi-copy me-1"})}),e.jsx("button",{className:"btn btn-sm btn-outline-danger btn-glow",onClick:()=>w(t.id),children:e.jsx("i",{className:"bi bi-trash me-1"})})]}),e.jsx("div",{className:"text-end",children:e.jsx("button",{className:"btn btn-sm btn-outline-primary btn-glow",onClick:()=>C(t.id),title:"Change image",children:e.jsx("i",{className:"bi bi-image"})})})]})]})]})},t.id)),a.length===0&&e.jsx("div",{className:"col-12",children:e.jsxs("div",{className:"empty-state animate-fade-in",children:[e.jsx("i",{className:"bi bi-journal-text"}),e.jsx("h4",{className:"text-muted mb-3",children:"No Recipes Found"}),e.jsx("p",{className:"text-muted mb-4",children:"Get started by creating your first recipe!"}),e.jsxs("button",{className:"btn btn-primary btn-lg btn-glow",onClick:u,children:[e.jsx("i",{className:"bi bi-plus-circle me-2"}),"Create Your First Recipe"]})]})})]})]})}export{M as default};
