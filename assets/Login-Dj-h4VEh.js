import{r,u as v,a as j,j as e}from"./index-Cb7WF7WO.js";function N(){const[s,n]=r.useState(""),[o,l]=r.useState(""),[d,c]=r.useState(""),[t,m]=r.useState(!1),[i,g]=r.useState(!1),{login:b}=v(),f=j(),h=async a=>{a.preventDefault(),m(!0),c(""),await new Promise(u=>setTimeout(u,800));const p=b(s.trim(),o);p.ok?setTimeout(()=>f("/dashboard"),600):(c(p.message||"Invalid credentials"),m(!1))},x=()=>{n("admin@kookit.io"),l("admin123")};return e.jsxs("div",{className:"login-container d-flex align-items-center justify-content-center p-3",children:[e.jsx("style",{children:`
    .login-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      position: relative;
      overflow: hidden;
    }

    .login-container::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: float 20s infinite linear;
    }

    @keyframes float {
      0% { transform: translate(0, 0) rotate(0deg); }
      100% { transform: translate(-50px, -50px) rotate(360deg); }
    }

    .login-card {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      border-radius: 20px;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
    }

    .login-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .login-card:hover::before {
      left: 100%;
    }

    .login-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 35px 60px rgba(0, 0, 0, 0.2);
    }

    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }

    .logo-container {
      width: 80px;
      height: 80px;
      margin: 0 auto 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
      animation: bounce 2s infinite;
    }

    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }

    .logo-icon {
      font-size: 2rem;
      color: white;
    }

    .title-gradient {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .form-group {
      margin-bottom: 1.5rem;
      position: relative;
    }

    .form-label {
      font-weight: 600;
      color: #374151;
      margin-bottom: 0.5rem;
      display: block;
      transition: all 0.3s ease;
    }

    .input-group {
      position: relative;
    }

    .form-control {
      border: 2px solid #e5e7eb;
      border-radius: 12px;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      transition: all 0.3s ease;
      background: #fff;
    }

    .form-control:focus {
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      transform: translateY(-2px);
    }

    .form-control:valid {
      border-color: #10b981;
    }

    .input-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #9ca3af;
      transition: all 0.3s ease;
    }

    .form-control:focus + .input-icon {
      color: #667eea;
    }

    .password-toggle {
      background: none;
      border: none;
      color: #9ca3af;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .password-toggle:hover {
      color: #667eea;
      transform: scale(1.1);
    }

    .btn-login {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border: none;
      border-radius: 12px;
      padding: 0.75rem 2rem;
      font-weight: 600;
      font-size: 1rem;
      color: white;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .btn-login::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
      transition: left 0.5s ease;
    }

    .btn-login:hover::before {
      left: 100%;
    }

    .btn-login:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    .btn-login:active {
      transform: translateY(0);
    }

    .btn-login:disabled {
      opacity: 0.7;
      cursor: not-allowed;
      transform: none;
    }

    .btn-demo {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      border-radius: 12px;
      padding: 0.5rem 1.5rem;
      font-weight: 500;
      font-size: 0.9rem;
      color: white;
      transition: all 0.3s ease;
    }

    .btn-demo:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
    }

    .alert-error {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      border: 1px solid #fca5a5;
      border-radius: 12px;
      color: #dc2626;
      padding: 1rem;
      margin-bottom: 1.5rem;
      animation: shake 0.5s ease-in-out;
    }

    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    .demo-info {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border: 1px solid #bae6fd;
      border-radius: 12px;
      padding: 1rem;
      margin-top: 1.5rem;
      text-align: center;
    }

    .demo-credentials {
      background: #fff;
      border-radius: 8px;
      padding: 0.75rem;
      margin-top: 0.5rem;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      border: 1px dashed #cbd5e1;
    }

    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid transparent;
      border-top: 2px solid white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      display: inline-block;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .success-check {
      color: #10b981;
      font-size: 1.5rem;
      animation: scaleIn 0.5s ease-out;
    }

    @keyframes scaleIn {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.2); opacity: 1; }
      100% { transform: scale(1); opacity: 1; }
    }

    .floating-shapes {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      pointer-events: none;
    }

    .shape {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation: floatShape 15s infinite linear;
    }

    .shape:nth-child(1) {
      width: 80px;
      height: 80px;
      top: 10%;
      left: 10%;
      animation-delay: 0s;
    }

    .shape:nth-child(2) {
      width: 120px;
      height: 120px;
      top: 60%;
      left: 80%;
      animation-delay: -5s;
    }

    .shape:nth-child(3) {
      width: 60px;
      height: 60px;
      top: 80%;
      left: 20%;
      animation-delay: -10s;
    }

    @keyframes floatShape {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      33% { transform: translate(30px, -50px) rotate(120deg); }
      66% { transform: translate(-20px, 20px) rotate(240deg); }
    }

    .feature-list {
      list-style: none;
      padding: 0;
      margin: 1.5rem 0;
    }

    .feature-list li {
      padding: 0.5rem 0;
      color: #6b7280;
      display: flex;
      align-items: center;
    }

    .feature-list li::before {
      content: '✓';
      color: #10b981;
      font-weight: bold;
      margin-right: 0.5rem;
    }

    .divider {
      display: flex;
      align-items: center;
      margin: 1.5rem 0;
      color: #9ca3af;
    }

    .divider::before,
    .divider::after {
      content: '';
      flex: 1;
      border-bottom: 1px solid #e5e7eb;
    }

    .divider span {
      padding: 0 1rem;
      font-size: 0.9rem;
    }
  `}),e.jsxs("div",{className:"floating-shapes",children:[e.jsx("div",{className:"shape"}),e.jsx("div",{className:"shape"}),e.jsx("div",{className:"shape"})]}),e.jsx("div",{className:"login-card",style:{width:"min(420px, 90vw)"},children:e.jsxs("div",{className:"card-body p-4 p-md-5",children:[e.jsxs("div",{className:"login-header",children:[e.jsx("div",{className:"logo-container",children:e.jsx("i",{className:"bi bi-shield-check logo-icon"})}),e.jsx("h2",{className:"h3 mb-2 fw-bold title-gradient",children:"Welcome Back"}),e.jsx("p",{className:"text-muted",children:"Sign in to your Kookit admin account"})]}),d&&e.jsx("div",{className:"alert-error animate-fade-in",children:e.jsxs("div",{className:"d-flex align-items-center",children:[e.jsx("i",{className:"bi bi-exclamation-triangle-fill me-2"}),e.jsx("span",{children:d})]})}),e.jsxs("form",{onSubmit:h,children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Email Address"}),e.jsxs("div",{className:"input-group",children:[e.jsx("input",{value:s,onChange:a=>n(a.target.value),className:"form-control",placeholder:"admin@kookit.io",autoComplete:"username",required:!0}),e.jsx("i",{className:"bi bi-envelope input-icon"})]})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"form-label",children:"Password"}),e.jsxs("div",{className:"input-group",children:[e.jsx("input",{type:i?"text":"password",value:o,onChange:a=>l(a.target.value),className:"form-control",placeholder:"••••••••",autoComplete:"current-password",required:!0}),e.jsx("button",{type:"button",className:"password-toggle input-icon",onClick:()=>g(!i),children:e.jsx("i",{className:`bi ${i?"bi-eye-slash":"bi-eye"}`})})]})]}),e.jsx("div",{className:"d-grid gap-2",children:e.jsx("button",{type:"submit",className:"btn-login",disabled:t,children:t?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"loading-spinner"}),"Signing In..."]}):e.jsxs(e.Fragment,{children:[e.jsx("i",{className:"bi bi-lock-fill me-2"}),"Sign In"]})})})]}),e.jsx("div",{className:"divider",children:e.jsx("span",{children:"or"})}),e.jsx("div",{className:"d-grid",children:e.jsxs("button",{type:"button",className:"btn-demo",onClick:x,disabled:t,children:[e.jsx("i",{className:"bi bi-rocket-takeoff me-2"}),"Use Demo Credentials"]})}),e.jsxs("div",{className:"demo-info",children:[e.jsx("small",{className:"text-muted d-block mb-2",children:"Demo Credentials"}),e.jsx("div",{className:"demo-credentials",children:"admin@kookit.io / admin123"})]}),e.jsx("div",{className:"mt-4",children:e.jsxs("ul",{className:"feature-list",children:[e.jsx("li",{children:"Full dashboard access"}),e.jsx("li",{children:"Recipe management"}),e.jsx("li",{children:"User administration"}),e.jsx("li",{children:"Real-time analytics"})]})})]})})]})}export{N as default};
