const STORAGE_KEYS = {
  employees: "wsga_employees",
  roles: "wsga_roles",
  reports: "wsga_reports",
  theme: "wsga_theme"
};

const ROLE_COVERAGE_COLORS = [
  "#06B6D4",
  "#6366F1",
  "#F59E0B",
  "#10B981",
  "#EF4444",
  "#8B5CF6",
  "#0EA5E9"
];

const SAMPLE_JOB_PROFILES = [
  {
    name: "Frontend Developer",
    requiredSkills: [
      { name: "HTML", level: 4 },
      { name: "CSS", level: 4 },
      { name: "JavaScript", level: 5 },
      { name: "React", level: 4 },
      { name: "Git", level: 3 }
    ]
  },
  {
    name: "Backend Developer",
    requiredSkills: [
      { name: "Node.js", level: 4 },
      { name: "SQL", level: 4 },
      { name: "API Design", level: 4 },
      { name: "Security", level: 3 },
      { name: "Git", level: 3 }
    ]
  },
  {
    name: "Data Analyst",
    requiredSkills: [
      { name: "Excel", level: 4 },
      { name: "SQL", level: 4 },
      { name: "Python", level: 3 },
      { name: "Power BI", level: 4 },
      { name: "Statistics", level: 3 }
    ]
  },
  {
    name: "DevOps Engineer",
    requiredSkills: [
      { name: "Linux", level: 4 },
      { name: "Docker", level: 4 },
      { name: "Kubernetes", level: 3 },
      { name: "CI/CD", level: 4 },
      { name: "Cloud", level: 4 }
    ]
  },
  {
    name: "QA Engineer",
    requiredSkills: [
      { name: "Test Planning", level: 4 },
      { name: "Automation", level: 4 },
      { name: "Selenium", level: 3 },
      { name: "API Testing", level: 3 },
      { name: "Bug Tracking", level: 4 }
    ]
  },
  {
    name: "UI/UX Designer",
    requiredSkills: [
      { name: "Figma", level: 4 },
      { name: "Wireframing", level: 4 },
      { name: "Prototyping", level: 4 },
      { name: "User Research", level: 3 },
      { name: "Design Systems", level: 3 }
    ]
  }
];

const COMMON_RESUME_SKILLS = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Angular", "Vue", "Node.js", "Express",
  "Python", "Java", "C", "C++", "C#", "SQL", "MySQL", "PostgreSQL", "MongoDB", "Firebase",
  "Power BI", "Excel", "Tableau", "Git", "GitHub", "REST API", "GraphQL", "Docker", "Kubernetes",
  "AWS", "Azure", "Linux", "Selenium", "Automation", "Testing", "Figma", "UI/UX", "Bootstrap"
];

const AUTH_CREDENTIALS = {
  admin: {
    email: "admin@gmail.com",
    password: "Admin@123"
  },
  user: {
    email: "user@gmail.com",
    password: "User@123"
  }
};

const ROLE_ALLOWED_VIEWS = {
  admin: ["viewDashboard", "viewEmployees", "viewRoles", "viewAnalyze", "viewReports"],
  user: ["viewDashboard", "viewEmployees", "viewAnalyze"]
};

const state = {
  employees: readStorage(STORAGE_KEYS.employees, []),
  roles: readStorage(STORAGE_KEYS.roles, []),
  reports: readStorage(STORAGE_KEYS.reports, []),
  isLoggedIn: sessionStorage.getItem("wsga_logged_in") === "true",
  userRole: sessionStorage.getItem("wsga_user_role") || "user",
  activePage: "landing",
  activeView: "viewDashboard",
  searchTerm: ""
};

const dom = {
  pages: {
    landing: document.getElementById("landingSection"),
    auth: document.getElementById("authSection"),
    dashboard: document.getElementById("dashboardSection")
  },
  routeButtons: document.querySelectorAll("[data-route]"),
  loginForm: document.getElementById("loginForm"),
  loginRole: document.getElementById("loginRole"),
  loginEmail: document.getElementById("loginEmail"),
  loginAge: document.getElementById("loginAge"),
  loginPassword: document.getElementById("loginPassword"),
  loginCredentialsHint: document.getElementById("loginCredentialsHint"),
  authError: document.getElementById("authError"),
  menu: document.getElementById("menu"),
  menuItems: document.querySelectorAll(".menu-item"),
  views: document.querySelectorAll(".view"),
  viewTitle: document.getElementById("viewTitle"),
  globalSearch: document.getElementById("globalSearch"),
  logoutBtn: document.getElementById("logoutBtn"),
  themeToggle: document.getElementById("themeToggle"),
  openSidebar: document.getElementById("openSidebar"),
  closeSidebar: document.getElementById("closeSidebar"),
  sidebar: document.getElementById("sidebar"),

  totalEmployees: document.getElementById("totalEmployees"),
  totalRoles: document.getElementById("totalRoles"),
  averageGap: document.getElementById("averageGap"),
  employeeListPreview: document.getElementById("employeeListPreview"),
  dashboardBarChart: document.getElementById("dashboardBarChart"),

  employeeForm: document.getElementById("employeeForm"),
  employeeName: document.getElementById("employeeName"),
  employeeResumeFile: document.getElementById("employeeResumeFile"),
  extractEmployeeSkills: document.getElementById("extractEmployeeSkills"),
  employeeResumeStatus: document.getElementById("employeeResumeStatus"),
  employeeSkillsContainer: document.getElementById("employeeSkillsContainer"),
  addEmployeeSkill: document.getElementById("addEmployeeSkill"),
  employeeTableWrap: document.getElementById("employeeTableWrap"),

  roleForm: document.getElementById("roleForm"),
  roleName: document.getElementById("roleName"),
  roleSkillsContainer: document.getElementById("roleSkillsContainer"),
  addRoleSkill: document.getElementById("addRoleSkill"),
  loadSampleRoles: document.getElementById("loadSampleRoles"),
  roleTableWrap: document.getElementById("roleTableWrap"),

  analysisForm: document.getElementById("analysisForm"),
  analysisEmployee: document.getElementById("analysisEmployee"),
  analysisRole: document.getElementById("analysisRole"),
  resumeAnalysisForm: document.getElementById("resumeAnalysisForm"),
  resumeRole: document.getElementById("resumeRole"),
  resumeFile: document.getElementById("resumeFile"),
  resumeStatus: document.getElementById("resumeStatus"),
  analysisResults: document.getElementById("analysisResults"),

  reportsTableWrap: document.getElementById("reportsTableWrap"),
  reportsBarChart: document.getElementById("reportsBarChart"),
  exportCsv: document.getElementById("exportCsv"),
  singleCompareEmployee: document.getElementById("singleCompareEmployee"),
  runSingleCompare: document.getElementById("runSingleCompare"),
  singleCompareSummary: document.getElementById("singleCompareSummary"),
  singleCompareGapChart: document.getElementById("singleCompareGapChart"),
  singleCompareMatchChart: document.getElementById("singleCompareMatchChart")
};

const chartHoverStore = {
  bar: new WeakMap(),
  line: new WeakMap(),
  bound: new WeakSet(),
  tooltip: new WeakMap()
};

init();

function init() {
  applySavedTheme();
  bindGlobalEvents();
  initDeveloperSlider();
  ensureSeedRoles();
  ensureInitialSkillRows();

  if (state.isLoggedIn) {
    showPage("dashboard");
  } else {
    showPage("landing");
  }

  renderAll();
}

function initDeveloperSlider() {
  const slider = document.querySelector(".developer-slider");
  if (!slider) {
    return;
  }

  const track = slider.querySelector(".developer-track");
  const cards = track ? track.querySelectorAll(".developer-card") : [];
  const prevBtn = slider.querySelector("[data-dev-nav='prev']");
  const nextBtn = slider.querySelector("[data-dev-nav='next']");

  if (!track || cards.length === 0 || !prevBtn || !nextBtn) {
    return;
  }

  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  function setDeveloperSlide(index) {
    const total = cards.length;
    currentIndex = (index + total) % total;
    track.classList.add("manual");
    track.style.transform = `translateX(-${currentIndex * 25}%)`;
  }

  prevBtn.addEventListener("click", () => {
    setDeveloperSlide(currentIndex - 1);
  });

  nextBtn.addEventListener("click", () => {
    setDeveloperSlide(currentIndex + 1);
  });

  slider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  slider.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const delta = touchEndX - touchStartX;

    if (Math.abs(delta) < 40) {
      return;
    }

    if (delta < 0) {
      setDeveloperSlide(currentIndex + 1);
    } else {
      setDeveloperSlide(currentIndex - 1);
    }
  }, { passive: true });
}

function bindGlobalEvents() {
  dom.routeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-route");
      showPage(target);
    });
  });

  dom.loginForm.addEventListener("submit", handleLogin);
  dom.loginRole.addEventListener("change", renderCredentialHint);
  dom.menu.addEventListener("click", handleMenuNavigation);

  dom.addEmployeeSkill.addEventListener("click", () => {
    addSkillRow(dom.employeeSkillsContainer, "employee");
  });

  dom.extractEmployeeSkills.addEventListener("click", handleEmployeeResumeExtraction);

  dom.addRoleSkill.addEventListener("click", () => {
    addSkillRow(dom.roleSkillsContainer, "role");
  });

  dom.loadSampleRoles.addEventListener("click", handleLoadSampleRoles);

  dom.employeeSkillsContainer.addEventListener("click", handleSkillRowDelete);
  dom.roleSkillsContainer.addEventListener("click", handleSkillRowDelete);

  dom.employeeForm.addEventListener("submit", handleEmployeeSubmit);
  dom.roleForm.addEventListener("submit", handleRoleSubmit);
  dom.analysisForm.addEventListener("submit", handleAnalysisSubmit);
  dom.resumeAnalysisForm.addEventListener("submit", handleResumeAnalysisSubmit);

  dom.employeeTableWrap.addEventListener("click", handleEmployeeTableActions);
  dom.roleTableWrap.addEventListener("click", handleRoleTableActions);
  dom.reportsTableWrap.addEventListener("click", handleReportsTableActions);

  dom.globalSearch.addEventListener("input", (event) => {
    state.searchTerm = event.target.value.trim().toLowerCase();
    renderEmployeeTable();
    renderEmployeePreview();
  });

  dom.logoutBtn.addEventListener("click", () => {
    sessionStorage.removeItem("wsga_logged_in");
    sessionStorage.removeItem("wsga_user_role");
    state.isLoggedIn = false;
    state.userRole = "user";
    showPage("auth");
  });

  dom.themeToggle.addEventListener("click", toggleTheme);

  dom.openSidebar.addEventListener("click", () => {
    dom.sidebar.classList.add("open");
  });

  dom.closeSidebar.addEventListener("click", () => {
    dom.sidebar.classList.remove("open");
  });

  dom.exportCsv.addEventListener("click", exportReportsCsv);
  dom.runSingleCompare.addEventListener("click", handleSingleCompareRun);

  renderCredentialHint();
}

function renderCredentialHint() {
  const selectedRole = dom.loginRole.value;
  const creds = AUTH_CREDENTIALS[selectedRole];
  if (!creds) {
    dom.loginCredentialsHint.textContent = "Use credentials based on selected role.";
    return;
  }

  dom.loginCredentialsHint.textContent = `${selectedRole.toUpperCase()} login -> ${creds.email} / ${creds.password}`;
}

function ensureInitialSkillRows() {
  if (!dom.employeeSkillsContainer.querySelector(".skill-row")) {
    addSkillRow(dom.employeeSkillsContainer, "employee");
  }

  if (!dom.roleSkillsContainer.querySelector(".skill-row")) {
    addSkillRow(dom.roleSkillsContainer, "role");
  }
}

function ensureSeedRoles() {
  if (state.roles.length > 0) {
    return;
  }

  state.roles = SAMPLE_JOB_PROFILES.map((profile) => ({
    id: crypto.randomUUID(),
    name: profile.name,
    requiredSkills: profile.requiredSkills.map((skill) => ({ ...skill }))
  }));

  writeStorage(STORAGE_KEYS.roles, state.roles);
}

function handleLoadSampleRoles() {
  const existing = new Set(state.roles.map((role) => role.name.trim().toLowerCase()));
  let added = 0;

  SAMPLE_JOB_PROFILES.forEach((profile) => {
    if (existing.has(profile.name.trim().toLowerCase())) {
      return;
    }

    state.roles.push({
      id: crypto.randomUUID(),
      name: profile.name,
      requiredSkills: profile.requiredSkills.map((skill) => ({ ...skill }))
    });
    added += 1;
  });

  writeStorage(STORAGE_KEYS.roles, state.roles);
  renderAll();

  if (added === 0) {
    dom.resumeStatus.textContent = "All sample job profiles are already loaded.";
    return;
  }

  dom.resumeStatus.textContent = `${added} sample job profiles loaded.`;
}

function applySavedTheme() {
  const savedTheme = readStorage(STORAGE_KEYS.theme, "light");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
  writeStorage(STORAGE_KEYS.theme, theme);
}

function showPage(page) {
  if (page === "dashboard" && !state.isLoggedIn) {
    page = "auth";
  }

  state.activePage = page;
  Object.keys(dom.pages).forEach((key) => {
    dom.pages[key].classList.toggle("page-active", key === page);
  });

  if (page === "dashboard") {
    applyRoleAccess();
    switchView(state.activeView);
  }
}

function handleLogin(event) {
  event.preventDefault();
  dom.authError.textContent = "";

  const role = dom.loginRole.value;
  const email = dom.loginEmail.value.trim();
  const age = Number(dom.loginAge.value);
  const password = dom.loginPassword.value;

  const credential = AUTH_CREDENTIALS[role];
  if (!credential || email.toLowerCase() !== credential.email || password !== credential.password) {
    dom.authError.textContent = "Invalid credentials for selected role.";
    return;
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    dom.authError.textContent = "Please enter a valid email address.";
    return;
  }

  if (password.length < 6) {
    dom.authError.textContent = "Password must be at least 6 characters.";
    return;
  }

  if (Number.isNaN(age) || age < 18) {
    dom.authError.textContent = "You must be at least 18 years old to login.";
    return;
  }

  state.isLoggedIn = true;
  state.userRole = role;
  sessionStorage.setItem("wsga_logged_in", "true");
  sessionStorage.setItem("wsga_user_role", role);
  state.activeView = ROLE_ALLOWED_VIEWS[role][0];
  showPage("dashboard");
}

function applyRoleAccess() {
  const allowedViews = ROLE_ALLOWED_VIEWS[state.userRole] || ROLE_ALLOWED_VIEWS.user;

  dom.menuItems.forEach((item) => {
    const access = item.getAttribute("data-access") || "all";
    const view = item.getAttribute("data-view");
    const canAccess = access === "all" || (access === "admin" && state.userRole === "admin");

    item.hidden = !canAccess;
    item.disabled = !canAccess;

    if (!canAccess && view === state.activeView) {
      state.activeView = allowedViews[0];
    }
  });

  if (!allowedViews.includes(state.activeView)) {
    state.activeView = allowedViews[0];
  }
}

function handleMenuNavigation(event) {
  const button = event.target.closest(".menu-item");
  if (!button) {
    return;
  }

  const view = button.getAttribute("data-view");
  switchView(view);
  dom.sidebar.classList.remove("open");
}

function switchView(viewId) {
  const allowedViews = ROLE_ALLOWED_VIEWS[state.userRole] || ROLE_ALLOWED_VIEWS.user;
  if (!allowedViews.includes(viewId)) {
    viewId = allowedViews[0];
  }

  state.activeView = viewId;
  dom.views.forEach((view) => {
    view.classList.toggle("view-active", view.id === viewId);
  });

  dom.menuItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("data-view") === viewId);
  });

  const activeItem = Array.from(dom.menuItems).find((item) => item.classList.contains("active"));
  dom.viewTitle.textContent = activeItem ? activeItem.textContent : "Dashboard";
}

function addSkillRow(container, type, values = { name: "", level: 1 }) {
  const row = document.createElement("div");
  row.className = "skill-row";

  row.innerHTML = `
    <label>
      Skill
      <input type="text" class="skill-name" placeholder="e.g. JavaScript" value="${escapeHtml(values.name)}" required />
    </label>
    <label>
      ${type === "role" ? "Required Level" : "Proficiency"}
      <input type="number" class="skill-level" min="1" max="5" value="${Number(values.level) || 1}" required />
    </label>
    <button type="button" class="remove-btn">Remove</button>
  `;

  container.appendChild(row);
}

function handleSkillRowDelete(event) {
  if (!event.target.classList.contains("remove-btn")) {
    return;
  }

  const row = event.target.closest(".skill-row");
  const container = row.parentElement;

  if (container.children.length === 1) {
    return;
  }

  row.remove();
}

function collectSkills(container) {
  const rows = container.querySelectorAll(".skill-row");
  const skills = [];

  rows.forEach((row) => {
    const name = row.querySelector(".skill-name").value.trim();
    const level = Number(row.querySelector(".skill-level").value);

    if (!name || Number.isNaN(level)) {
      return;
    }

    skills.push({
      name,
      level: clamp(level, 1, 5)
    });
  });

  return skills;
}

function handleEmployeeSubmit(event) {
  event.preventDefault();

  const name = dom.employeeName.value.trim();
  const skills = collectSkills(dom.employeeSkillsContainer);

  if (!name || skills.length === 0) {
    return;
  }

  state.employees.push({
    id: crypto.randomUUID(),
    name,
    skills
  });

  writeStorage(STORAGE_KEYS.employees, state.employees);

  dom.employeeForm.reset();
  dom.employeeSkillsContainer.innerHTML = "";
  addSkillRow(dom.employeeSkillsContainer, "employee");

  renderAll();
}

async function handleEmployeeResumeExtraction() {
  dom.employeeResumeStatus.textContent = "";
  const file = dom.employeeResumeFile.files[0];

  if (!file) {
    dom.employeeResumeStatus.textContent = "Please upload a PDF or DOCX resume first.";
    return;
  }

  const extension = file.name.toLowerCase();
  if (!extension.endsWith(".pdf") && !extension.endsWith(".docx")) {
    dom.employeeResumeStatus.textContent = "Only .pdf and .docx files are supported.";
    return;
  }

  try {
    dom.employeeResumeStatus.textContent = "Reading resume and extracting skills...";
    const text = await extractTextFromFile(file);
    const extractedSkills = extractSkillsFromResumeTextAdvanced(text, state.roles);

    if (extractedSkills.length === 0) {
      dom.employeeResumeStatus.textContent = "No skills found. You can add skills manually.";
      return;
    }

    if (!dom.employeeName.value.trim()) {
      dom.employeeName.value = file.name.replace(/\.(pdf|docx)$/i, "");
    }

    dom.employeeSkillsContainer.innerHTML = "";
    extractedSkills.forEach((skill) => {
      addSkillRow(dom.employeeSkillsContainer, "employee", skill);
    });

    dom.employeeResumeStatus.textContent = `Extracted ${extractedSkills.length} skills and auto-filled the form.`;
  } catch (error) {
    dom.employeeResumeStatus.textContent = "Unable to parse this file. Try another PDF/DOCX resume.";
  }
}

function handleRoleSubmit(event) {
  event.preventDefault();

  const name = dom.roleName.value.trim();
  const requiredSkills = collectSkills(dom.roleSkillsContainer);

  if (!name || requiredSkills.length === 0) {
    return;
  }

  state.roles.push({
    id: crypto.randomUUID(),
    name,
    requiredSkills
  });

  writeStorage(STORAGE_KEYS.roles, state.roles);

  dom.roleForm.reset();
  dom.roleSkillsContainer.innerHTML = "";
  addSkillRow(dom.roleSkillsContainer, "role");

  renderAll();
}

function handleEmployeeTableActions(event) {
  const button = event.target.closest("button[data-employee-delete]");
  if (!button) {
    return;
  }

  const id = button.getAttribute("data-employee-delete");
  state.employees = state.employees.filter((employee) => employee.id !== id);
  writeStorage(STORAGE_KEYS.employees, state.employees);

  state.reports = state.reports.filter((report) => report.employeeId !== id);
  writeStorage(STORAGE_KEYS.reports, state.reports);

  renderAll();
}

function handleRoleTableActions(event) {
  const button = event.target.closest("button[data-role-delete]");
  if (!button) {
    return;
  }

  const id = button.getAttribute("data-role-delete");
  state.roles = state.roles.filter((role) => role.id !== id);
  writeStorage(STORAGE_KEYS.roles, state.roles);

  state.reports = state.reports.filter((report) => report.roleId !== id);
  writeStorage(STORAGE_KEYS.reports, state.reports);

  renderAll();
}

function handleReportsTableActions(event) {
  const button = event.target.closest("button[data-report-delete]");
  if (!button) {
    return;
  }

  const reportId = button.getAttribute("data-report-delete");
  state.reports = state.reports.filter((report) => report.id !== reportId);
  writeStorage(STORAGE_KEYS.reports, state.reports);

  renderAll();
}

function handleAnalysisSubmit(event) {
  event.preventDefault();

  const employeeId = dom.analysisEmployee.value;
  const roleId = dom.analysisRole.value;

  const employee = state.employees.find((item) => item.id === employeeId);
  const role = state.roles.find((item) => item.id === roleId);

  if (!employee || !role) {
    return;
  }

  runAndPersistAnalysis(employee, role);
}

async function handleResumeAnalysisSubmit(event) {
  event.preventDefault();
  dom.resumeStatus.textContent = "";

  const roleId = dom.resumeRole.value;
  const file = dom.resumeFile.files[0];
  const role = state.roles.find((item) => item.id === roleId);

  if (!role) {
    dom.resumeStatus.textContent = "Please choose a role first.";
    return;
  }

  if (!file) {
    dom.resumeStatus.textContent = "Please upload a PDF or DOCX resume.";
    return;
  }

  const extension = file.name.toLowerCase();
  if (!extension.endsWith(".pdf") && !extension.endsWith(".docx")) {
    dom.resumeStatus.textContent = "Only .pdf and .docx files are supported.";
    return;
  }

  try {
    dom.resumeStatus.textContent = "Reading resume content...";
    const text = await extractTextFromFile(file);

    const extractedSkills = extractSkillsFromResumeText(text, role.requiredSkills);
    const resumeEmployee = {
      id: null,
      name: file.name.replace(/\.(pdf|docx)$/i, "") || "Uploaded Resume",
      skills: extractedSkills
    };

    runAndPersistAnalysis(resumeEmployee, role, { source: "resume" });
    dom.resumeStatus.textContent = `Resume analyzed. Detected ${extractedSkills.length} matching role skills.`;
    dom.resumeAnalysisForm.reset();
  } catch (error) {
    dom.resumeStatus.textContent = "Unable to parse this file. Try another PDF/DOCX resume.";
  }
}

function runAndPersistAnalysis(employee, role, options = { source: "manual" }) {
  const result = calculateGap(employee, role);
  renderAnalysisResult(employee, role, result);

  state.reports.unshift({
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    source: options.source,
    employeeId: employee.id,
    employeeName: employee.name,
    roleId: role.id,
    roleName: role.name,
    gapScore: result.gapScore,
    maxScore: result.maxScore,
    gapPercentage: result.gapPercentage,
    missingSkills: result.missingSkills
  });

  writeStorage(STORAGE_KEYS.reports, state.reports);
  renderSummaryCards();
  renderReportsTable();
  renderReportsChart();
}

function calculateGap(employee, role) {
  const employeeMap = new Map(
    employee.skills.map((skill) => [skill.name.trim().toLowerCase(), Number(skill.level) || 0])
  );

  let gapScore = 0;
  let maxScore = 0;
  const missingSkills = [];

  role.requiredSkills.forEach((requiredSkill) => {
    const requiredName = requiredSkill.name.trim();
    const requiredLevel = clamp(Number(requiredSkill.level) || 0, 1, 5);
    const currentLevel = employeeMap.get(requiredName.toLowerCase());

    let gap;
    if (typeof currentLevel === "number") {
      gap = Math.max(0, requiredLevel - currentLevel);
    } else {
      gap = requiredLevel;
      missingSkills.push(requiredName);
    }

    gapScore += gap;
    maxScore += requiredLevel;
  });

  const gapPercentage = maxScore > 0 ? Number(((gapScore / maxScore) * 100).toFixed(1)) : 0;

  return {
    gapScore,
    maxScore,
    gapPercentage,
    missingSkills
  };
}

function renderAll() {
  renderSummaryCards();
  renderEmployeePreview();
  renderEmployeeTable();
  renderRoleTable();
  populateAnalysisSelectors();
  populateSingleCompareEmployeeSelector();
  renderReportsTable();
  renderReportsChart();
  renderDashboardChart();
}

function populateSingleCompareEmployeeSelector() {
  if (!dom.singleCompareEmployee) {
    return;
  }

  const previousSelected = dom.singleCompareEmployee.value;

  if (state.employees.length === 0) {
    dom.singleCompareEmployee.innerHTML = "<option value=''>Add employees first</option>";
    dom.singleCompareSummary.innerHTML = "<p class='muted'>No employee data found. Add an employee to compare against job profiles.</p>";
    drawBarChart(dom.singleCompareGapChart, [], [], {
      barColor: "#6366F1",
      valueSuffix: "%",
      yMax: 100
    });
    drawLineChart(dom.singleCompareMatchChart, [], [], {
      lineColor: "#10B981",
      valueSuffix: "%",
      yMax: 100
    });
    return;
  }

  dom.singleCompareEmployee.innerHTML = state.employees
    .map((employee) => `<option value="${employee.id}">${escapeHtml(employee.name)}</option>`)
    .join("");

  const hasPrevious = state.employees.some((employee) => employee.id === previousSelected);
  if (hasPrevious) {
    dom.singleCompareEmployee.value = previousSelected;
  } else {
    const defaultEmployee = state.employees.find((employee) => employee.name.trim().toLowerCase() === "anubhav singh");
    dom.singleCompareEmployee.value = defaultEmployee ? defaultEmployee.id : state.employees[0].id;
  }

  handleSingleCompareRun();
}

function handleSingleCompareRun() {
  const employeeId = dom.singleCompareEmployee.value;
  const employee = state.employees.find((item) => item.id === employeeId);

  if (!employee) {
    dom.singleCompareSummary.innerHTML = "<p class='muted'>Please select a valid employee.</p>";
    return;
  }

  if (state.roles.length === 0) {
    dom.singleCompareSummary.innerHTML = "<p class='muted'>No job profiles available. Add roles first.</p>";
    drawBarChart(dom.singleCompareGapChart, [], [], {
      barColor: "#6366F1",
      valueSuffix: "%",
      yMax: 100
    });
    drawLineChart(dom.singleCompareMatchChart, [], [], {
      lineColor: "#10B981",
      valueSuffix: "%",
      yMax: 100
    });
    return;
  }

  renderSingleEmployeeComparison(employee);
}

function renderSingleEmployeeComparison(employee) {
  const comparisons = state.roles.map((role) => {
    const result = calculateGap(employee, role);
    return {
      roleName: role.name,
      gapPercentage: result.gapPercentage,
      matchPercentage: Number((100 - result.gapPercentage).toFixed(1)),
      missingSkills: result.missingSkills
    };
  });

  const labels = comparisons.map((item) => item.roleName);
  const gapValues = comparisons.map((item) => item.gapPercentage);
  const matchValues = comparisons.map((item) => item.matchPercentage);
  const bestFit = comparisons.reduce((best, current) => (current.gapPercentage < best.gapPercentage ? current : best), comparisons[0]);
  const toughest = comparisons.reduce((worst, current) => (current.gapPercentage > worst.gapPercentage ? current : worst), comparisons[0]);

  drawBarChart(dom.singleCompareGapChart, labels, gapValues, {
    barColors: labels.map((_, index) => ROLE_COVERAGE_COLORS[index % ROLE_COVERAGE_COLORS.length]),
    valueSuffix: "%",
    yMax: 100
  });

  drawLineChart(dom.singleCompareMatchChart, labels, matchValues, {
    lineColor: "#10B981",
    valueSuffix: "%",
    yMax: 100
  });

  const rows = comparisons
    .map((item) => {
      const topMissing = item.missingSkills.length > 0 ? item.missingSkills.slice(0, 3).join(", ") : "None";
      return `<tr><td>${escapeHtml(item.roleName)}</td><td>${item.gapPercentage}%</td><td>${item.matchPercentage}%</td><td>${escapeHtml(topMissing)}</td></tr>`;
    })
    .join("");

  dom.singleCompareSummary.innerHTML = `
    <p><strong>Employee:</strong> ${escapeHtml(employee.name)}</p>
    <p><strong>Best Matching Role:</strong> ${escapeHtml(bestFit.roleName)} (${bestFit.matchPercentage}% match)</p>
    <p><strong>Highest Gap Role:</strong> ${escapeHtml(toughest.roleName)} (${toughest.gapPercentage}% gap)</p>
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Job Profile</th>
            <th>Gap %</th>
            <th>Match %</th>
            <th>Top Missing Skills</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
  `;
}

function renderSummaryCards() {
  dom.totalEmployees.textContent = String(state.employees.length);
  dom.totalRoles.textContent = String(state.roles.length);

  if (state.reports.length === 0) {
    dom.averageGap.textContent = "0%";
    return;
  }

  const average = state.reports.reduce((sum, report) => sum + report.gapPercentage, 0) / state.reports.length;
  dom.averageGap.textContent = `${average.toFixed(1)}%`;
}

function getFilteredEmployees() {
  if (!state.searchTerm) {
    return state.employees;
  }

  return state.employees.filter((employee) => {
    const inName = employee.name.toLowerCase().includes(state.searchTerm);
    const inSkills = employee.skills.some((skill) => skill.name.toLowerCase().includes(state.searchTerm));
    return inName || inSkills;
  });
}

function renderEmployeePreview() {
  const employees = getFilteredEmployees();

  if (employees.length === 0) {
    dom.employeeListPreview.innerHTML = "<li>No employees added yet.</li>";
    return;
  }

  dom.employeeListPreview.innerHTML = employees
    .slice(0, 6)
    .map((employee) => `<li><strong>${escapeHtml(employee.name)}</strong> - ${employee.skills.length} skills</li>`)
    .join("");
}

function renderEmployeeTable() {
  const employees = getFilteredEmployees();

  if (employees.length === 0) {
    dom.employeeTableWrap.innerHTML = "<p class='muted'>No employee records found.</p>";
    return;
  }

  const rows = employees
    .map((employee) => {
      const skills = employee.skills
        .map((skill) => `${escapeHtml(skill.name)} (${skill.level})`)
        .join(", ");

      return `
        <tr>
          <td>${escapeHtml(employee.name)}</td>
          <td>${skills}</td>
          <td><button class="btn btn-ghost" data-employee-delete="${employee.id}">Delete</button></td>
        </tr>
      `;
    })
    .join("");

  dom.employeeTableWrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Skills</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderRoleTable() {
  if (state.roles.length === 0) {
    dom.roleTableWrap.innerHTML = "<p class='muted'>No role requirements added.</p>";
    return;
  }

  const rows = state.roles
    .map((role) => {
      const skills = role.requiredSkills
        .map((skill) => `${escapeHtml(skill.name)} (${skill.level})`)
        .join(", ");

      return `
        <tr>
          <td>${escapeHtml(role.name)}</td>
          <td>${skills}</td>
          <td><button class="btn btn-ghost" data-role-delete="${role.id}">Delete</button></td>
        </tr>
      `;
    })
    .join("");

  dom.roleTableWrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Role</th>
          <th>Required Skills</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function populateAnalysisSelectors() {
  if (state.employees.length === 0) {
    dom.analysisEmployee.innerHTML = "<option value=''>Add employees first</option>";
  } else {
    dom.analysisEmployee.innerHTML = state.employees
      .map((employee) => `<option value="${employee.id}">${escapeHtml(employee.name)}</option>`)
      .join("");
  }

  if (state.roles.length === 0) {
    dom.analysisRole.innerHTML = "<option value=''>Add roles first</option>";
    dom.resumeRole.innerHTML = "<option value=''>Add roles first</option>";
    return;
  }

  dom.analysisRole.innerHTML = state.roles
    .map((role) => `<option value="${role.id}">${escapeHtml(role.name)}</option>`)
    .join("");

  dom.resumeRole.innerHTML = state.roles
    .map((role) => `<option value="${role.id}">${escapeHtml(role.name)}</option>`)
    .join("");
}

function renderAnalysisResult(employee, role, result) {
  const matchedPercentage = Math.max(0, 100 - result.gapPercentage);
  const suggestions = buildGapSuggestions(result);
  const missingHtml = result.missingSkills.length
    ? result.missingSkills.map((skill) => `<span class="badge">${escapeHtml(skill)}</span>`).join("")
    : "<span class='muted'>None</span>";
  const suggestionsHtml = suggestions
    .map((item) => {
      if (item.type === "course") {
        return `<li>${escapeHtml(item.text)} <a href="${item.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.linkText)}</a></li>`;
      }

      return `<li>${escapeHtml(item.text)}</li>`;
    })
    .join("");

  dom.analysisResults.innerHTML = `
    <div class="result-grid">
      <div>
        <p><strong>Employee:</strong> ${escapeHtml(employee.name)}</p>
        <p><strong>Role:</strong> ${escapeHtml(role.name)}</p>
        <p><strong>Gap Score:</strong> ${result.gapScore} / ${result.maxScore}</p>
        <p><strong>Gap Percentage:</strong> ${result.gapPercentage}%</p>
        <div class="progress" aria-label="Gap percentage progress bar">
          <div class="progress-fill" style="width: ${result.gapPercentage}%;"></div>
        </div>
      </div>
      <div>
        <canvas id="analysisPie" width="220" height="220"></canvas>
        <div class="chart-legend" aria-label="Analysis color legend">
          <span class="legend-item"><span class="legend-swatch swatch-highlight"></span>Gap %</span>
          <span class="legend-item"><span class="legend-swatch swatch-accent"></span>Matched %</span>
        </div>
      </div>
    </div>
    <p><strong>Missing Skills:</strong></p>
    <div>${missingHtml}</div>
    <p class="muted">Match: ${matchedPercentage.toFixed(1)}%</p>
    <div class="suggestion-box">
      <h4>Suggestions</h4>
      <ul>${suggestionsHtml}</ul>
    </div>
  `;

  const pieCanvas = document.getElementById("analysisPie");
  drawPieChart(pieCanvas, result.gapPercentage);
}

function buildGapSuggestions(result) {
  const suggestions = [];

  if (result.gapPercentage >= 70) {
    suggestions.push({ type: "text", text: "High gap detected: create a 6-8 week intensive upskilling plan with weekly milestones." });
    suggestions.push({ type: "text", text: "Assign a mentor and schedule bi-weekly hands-on review sessions." });
  } else if (result.gapPercentage >= 40) {
    suggestions.push({ type: "text", text: "Moderate gap detected: prioritize top missing skills in a targeted training plan." });
    suggestions.push({ type: "text", text: "Assign practical mini-projects to improve applied proficiency." });
  } else {
    suggestions.push({ type: "text", text: "Low gap detected: focus on advanced optimization and role-specific best practices." });
    suggestions.push({ type: "text", text: "Set stretch goals and periodic assessments to maintain readiness." });
  }

  if (result.missingSkills.length > 0) {
    const topMissing = result.missingSkills.slice(0, 5);
    suggestions.push({ type: "text", text: `Missing skills to focus on: ${topMissing.join(", ")}.` });

    topMissing.forEach((skill) => {
      const course = getCourseRecommendation(skill);
      suggestions.push({
        type: "course",
        text: `Course for ${skill}:`,
        linkText: course.title,
        url: course.url
      });
    });
  } else {
    suggestions.push({ type: "text", text: "No missing skills detected: improve depth in existing skills to reduce remaining gap." });
  }

  suggestions.push({ type: "text", text: "Re-run analysis after training completion to track progress against the same role." });
  return suggestions;
}

function getCourseRecommendation(skillName) {
  const key = skillName.trim().toLowerCase();
  const courseMap = {
    "html": { title: "HTML and CSS in Depth (Coursera)", url: "https://www.coursera.org/learn/html-and-css-in-depth" },
    "css": { title: "Responsive Web Design (freeCodeCamp)", url: "https://www.freecodecamp.org/learn/2022/responsive-web-design/" },
    "javascript": { title: "JavaScript Algorithms and Data Structures (freeCodeCamp)", url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8/" },
    "typescript": { title: "Understanding TypeScript (Udemy)", url: "https://www.udemy.com/course/understanding-typescript/" },
    "react": { title: "React - The Complete Guide (Udemy)", url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/" },
    "node.js": { title: "Node.js, Express, MongoDB Bootcamp (Udemy)", url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/" },
    "express": { title: "Build REST APIs with Node and Express", url: "https://www.coursera.org/projects/build-a-rest-api-with-node-js-and-express" },
    "sql": { title: "SQL for Data Science (Coursera)", url: "https://www.coursera.org/learn/sql-for-data-science" },
    "mysql": { title: "MySQL for Beginners (Udemy)", url: "https://www.udemy.com/course/mysql-for-beginners-real-database-experience-real-projects/" },
    "postgresql": { title: "PostgreSQL Essential Training", url: "https://www.linkedin.com/learning/learning-postgresql" },
    "python": { title: "Python for Everybody (Coursera)", url: "https://www.coursera.org/specializations/python" },
    "power bi": { title: "Microsoft Power BI Data Analyst", url: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/" },
    "excel": { title: "Excel Skills for Business (Coursera)", url: "https://www.coursera.org/specializations/excel" },
    "docker": { title: "Docker and Kubernetes: The Practical Guide (Udemy)", url: "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/" },
    "kubernetes": { title: "Kubernetes for Beginners (KodeKloud)", url: "https://kodekloud.com/courses/kubernetes-for-the-absolute-beginners-hands-on/" },
    "linux": { title: "Linux Essentials (Linux Foundation)", url: "https://training.linuxfoundation.org/training/introduction-to-linux/" },
    "aws": { title: "AWS Cloud Practitioner Essentials", url: "https://explore.skillbuilder.aws/learn/course/external/view/elearning/134/aws-cloud-practitioner-essentials" },
    "azure": { title: "Azure Fundamentals AZ-900", url: "https://learn.microsoft.com/en-us/training/paths/microsoft-azure-fundamentals-describe-cloud-concepts/" },
    "selenium": { title: "Selenium WebDriver with Java (Udemy)", url: "https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/" },
    "api testing": { title: "API Testing with Postman", url: "https://www.postman.com/postman/workspace/postman-public-workspace/documentation/631643-f695cab0-a1c2-4f00-8f5b-3e7d1b8f8f0a" },
    "automation": { title: "Automation Testing Masterclass (Udemy)", url: "https://www.udemy.com/course/automation-testing-masterclass/" },
    "figma": { title: "Figma UI UX Design Essentials (Udemy)", url: "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/" },
    "wireframing": { title: "Wireframing and Prototyping (Coursera)", url: "https://www.coursera.org/learn/wireframes-low-fidelity-prototypes" },
    "prototyping": { title: "Interactive Prototyping in Figma", url: "https://www.coursera.org/projects/interactive-prototype-figma" },
    "user research": { title: "User Research and Design", url: "https://www.coursera.org/learn/user-research" },
    "design systems": { title: "Design Systems and Component Libraries", url: "https://www.udemy.com/course/design-systems/" },
    "ci/cd": { title: "CI/CD with GitHub Actions", url: "https://www.coursera.org/projects/continuous-integration-using-github-actions" },
    "cloud": { title: "Cloud Computing Foundations (Coursera)", url: "https://www.coursera.org/learn/cloud-computing-basics" },
    "security": { title: "Web Security Fundamentals (OWASP)", url: "https://owasp.org/www-project-top-ten/" },
    "git": { title: "Version Control with Git (Atlassian)", url: "https://www.atlassian.com/git/tutorials/learn-git-with-bitbucket-cloud" },
    "test planning": { title: "Software Test Planning and Management", url: "https://www.udemy.com/course/software-testing-masterclass-from-novice-to-expert/" },
    "bug tracking": { title: "Jira for QA and Bug Tracking", url: "https://www.linkedin.com/learning/search?keywords=jira%20software%20test" },
    "statistics": { title: "Statistics with Python (Coursera)", url: "https://www.coursera.org/specializations/statistics-with-python" }
  };

  if (courseMap[key]) {
    return courseMap[key];
  }

  const query = encodeURIComponent(`${skillName} beginner to advanced course`);
  return {
    title: `${skillName} courses (search results)`,
    url: `https://www.google.com/search?q=${query}`
  };
}

function renderReportsTable() {
  if (state.reports.length === 0) {
    dom.reportsTableWrap.innerHTML = "<p class='muted'>No analysis reports yet.</p>";
    return;
  }

  const rows = state.reports
    .map((report) => {
      const date = new Date(report.date).toLocaleDateString();
      return `
        <tr>
          <td>${escapeHtml(report.employeeName)}</td>
          <td>${escapeHtml(report.roleName)}</td>
          <td>${report.gapScore}/${report.maxScore}</td>
          <td>${report.gapPercentage}%</td>
          <td>${date}</td>
          <td><button class="btn btn-ghost" data-report-delete="${report.id}">Delete</button></td>
        </tr>
      `;
    })
    .join("");

  dom.reportsTableWrap.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Employee</th>
          <th>Role</th>
          <th>Gap Score</th>
          <th>Gap %</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

function renderReportsChart() {
  const labels = state.reports.slice(0, 10).map((report) => `${report.employeeName} / ${report.roleName}`);
  const values = state.reports.slice(0, 10).map((report) => report.gapPercentage);

  drawBarChart(dom.reportsBarChart, labels, values, {
    barColor: "#6366F1",
    valueSuffix: "%",
    yMax: 100
  });
}

function renderDashboardChart() {
  const labels = state.roles.map((role) => role.name);
  const values = state.roles.map((role) => role.requiredSkills.length);
  const barColors = values.map((_, index) => ROLE_COVERAGE_COLORS[index % ROLE_COVERAGE_COLORS.length]);

  drawBarChart(dom.dashboardBarChart, labels, values, {
    barColors,
    valueSuffix: "",
    yMax: Math.max(5, ...values, 0)
  });
}

function drawPieChart(canvas, gapPercentage) {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const size = Math.min(canvas.width, canvas.height);
  const center = size / 2;
  const radius = size * 0.38;
  const gap = clamp(gapPercentage, 0, 100) / 100;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, 0, Math.PI * 2 * gap);
  ctx.closePath();
  ctx.fillStyle = "#F59E0B";
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(center, center);
  ctx.arc(center, center, radius, Math.PI * 2 * gap, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = "#06B6D4";
  ctx.fill();

  ctx.beginPath();
  ctx.arc(center, center, radius * 0.55, 0, Math.PI * 2);
  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--surface").trim() || "#ffffff";
  ctx.fill();

  ctx.fillStyle = getComputedStyle(document.body).getPropertyValue("--text").trim() || "#0f172a";
  ctx.font = "bold 16px Space Grotesk";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${gapPercentage.toFixed(1)}%`, center, center);
}

function drawBarChart(canvas, labels, values, config) {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  if (labels.length === 0) {
    ctx.fillStyle = "#64748b";
    ctx.font = "14px IBM Plex Sans";
    ctx.fillText("No data available.", 12, 24);
    return;
  }

  const padding = 34;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = config.yMax || Math.max(...values, 1);
  const barSpace = chartWidth / labels.length;
  const barWidth = Math.min(56, barSpace * 0.62);
  const hoveredIndex = Number.isInteger(config.hoveredIndex) ? config.hoveredIndex : -1;
  const bars = [];

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  values.forEach((value, index) => {
    const ratio = maxValue === 0 ? 0 : value / maxValue;
    const barHeight = ratio * chartHeight;
    const x = padding + index * barSpace + (barSpace - barWidth) / 2;
    const y = height - padding - barHeight;
    bars.push({ x, y, width: barWidth, height: barHeight });

    const color = Array.isArray(config.barColors)
      ? config.barColors[index % config.barColors.length]
      : config.barColor;

    ctx.fillStyle = color;
    ctx.fillRect(x, y, barWidth, barHeight);

    if (index === hoveredIndex) {
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0f172a";
      ctx.strokeRect(x, y, barWidth, barHeight);
    }

    ctx.fillStyle = "#64748b";
    ctx.font = "11px IBM Plex Sans";
    const labelText = labels[index].length > 12 ? `${labels[index].slice(0, 12)}...` : labels[index];
    ctx.fillText(labelText, x, height - 12);

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 11px IBM Plex Sans";
    ctx.fillText(`${value}${config.valueSuffix}`, x + 2, y - 6);
  });

  chartHoverStore.bar.set(canvas, {
    labels,
    values,
    config: {
      ...config,
      hoveredIndex: -1
    },
    bars
  });

  bindCanvasHover(canvas, "bar");
}

function drawLineChart(canvas, labels, values, config) {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  ctx.clearRect(0, 0, width, height);

  if (labels.length === 0) {
    ctx.fillStyle = "#64748b";
    ctx.font = "14px IBM Plex Sans";
    ctx.fillText("No data available.", 12, 24);
    return;
  }

  const padding = 38;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;
  const maxValue = config.yMax || Math.max(...values, 1);
  const stepX = labels.length > 1 ? chartWidth / (labels.length - 1) : 0;
  const hoveredIndex = Number.isInteger(config.hoveredIndex) ? config.hoveredIndex : -1;
  const points = [];

  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, height - padding);
  ctx.lineTo(width - padding, height - padding);
  ctx.stroke();

  ctx.beginPath();
  values.forEach((value, index) => {
    const ratio = maxValue === 0 ? 0 : value / maxValue;
    const x = labels.length > 1 ? padding + index * stepX : width / 2;
    const y = height - padding - ratio * chartHeight;

    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });

  ctx.strokeStyle = config.lineColor || "#10B981";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  values.forEach((value, index) => {
    const ratio = maxValue === 0 ? 0 : value / maxValue;
    const x = labels.length > 1 ? padding + index * stepX : width / 2;
    const y = height - padding - ratio * chartHeight;
    points.push({ x, y });

    ctx.beginPath();
    ctx.arc(x, y, index === hoveredIndex ? 6 : 4, 0, Math.PI * 2);
    ctx.fillStyle = config.lineColor || "#10B981";
    ctx.fill();

    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 11px IBM Plex Sans";
    ctx.fillText(`${value}${config.valueSuffix || ""}`, x + 6, y - 8);

    const labelText = labels[index].length > 12 ? `${labels[index].slice(0, 12)}...` : labels[index];
    ctx.fillStyle = "#64748b";
    ctx.font = "11px IBM Plex Sans";
    ctx.fillText(labelText, x - 16, height - 12);
  });

  chartHoverStore.line.set(canvas, {
    labels,
    values,
    config: {
      ...config,
      hoveredIndex: -1
    },
    points
  });

  bindCanvasHover(canvas, "line");
}

function bindCanvasHover(canvas, type) {
  if (chartHoverStore.bound.has(canvas)) {
    return;
  }

  canvas.addEventListener("mousemove", (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (type === "bar") {
      handleBarChartHover(canvas, x, y);
      return;
    }

    handleLineChartHover(canvas, x, y);
  });

  canvas.addEventListener("mouseleave", () => {
    hideCanvasTooltip(canvas);

    if (type === "bar") {
      const data = chartHoverStore.bar.get(canvas);
      if (!data) {
        return;
      }

      drawBarChart(canvas, data.labels, data.values, {
        ...data.config,
        hoveredIndex: -1
      });
      return;
    }

    const data = chartHoverStore.line.get(canvas);
    if (!data) {
      return;
    }

    drawLineChart(canvas, data.labels, data.values, {
      ...data.config,
      hoveredIndex: -1
    });
  });

  chartHoverStore.bound.add(canvas);
}

function handleBarChartHover(canvas, x, y) {
  const data = chartHoverStore.bar.get(canvas);
  if (!data) {
    return;
  }

  const hoveredIndex = data.bars.findIndex((bar) => {
    const xInside = x >= bar.x && x <= bar.x + bar.width;
    const yInside = y >= bar.y && y <= bar.y + bar.height;
    return xInside && yInside;
  });

  if (hoveredIndex < 0) {
    hideCanvasTooltip(canvas);
    drawBarChart(canvas, data.labels, data.values, {
      ...data.config,
      hoveredIndex: -1
    });
    return;
  }

  drawBarChart(canvas, data.labels, data.values, {
    ...data.config,
    hoveredIndex
  });

  const label = data.labels[hoveredIndex];
  const value = data.values[hoveredIndex];
  const suffix = data.config.valueSuffix || "";
  showCanvasTooltip(canvas, `${label}: ${value}${suffix}`, x, y);
}

function handleLineChartHover(canvas, x, y) {
  const data = chartHoverStore.line.get(canvas);
  if (!data) {
    return;
  }

  let hoveredIndex = -1;
  let minDistance = Infinity;

  data.points.forEach((point, index) => {
    const dx = x - point.x;
    const dy = y - point.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      hoveredIndex = index;
    }
  });

  if (hoveredIndex < 0 || minDistance > 18) {
    hideCanvasTooltip(canvas);
    drawLineChart(canvas, data.labels, data.values, {
      ...data.config,
      hoveredIndex: -1
    });
    return;
  }

  drawLineChart(canvas, data.labels, data.values, {
    ...data.config,
    hoveredIndex
  });

  const label = data.labels[hoveredIndex];
  const value = data.values[hoveredIndex];
  const suffix = data.config.valueSuffix || "";
  showCanvasTooltip(canvas, `${label}: ${value}${suffix}`, x, y);
}

function getOrCreateCanvasTooltip(canvas) {
  const existing = chartHoverStore.tooltip.get(canvas);
  if (existing) {
    return existing;
  }

  const host = canvas.parentElement;
  if (!host) {
    return null;
  }

  if (window.getComputedStyle(host).position === "static") {
    host.style.position = "relative";
  }

  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.left = "0";
  tooltip.style.top = "0";
  tooltip.style.transform = "translate(-9999px, -9999px)";
  tooltip.style.pointerEvents = "none";
  tooltip.style.padding = "0.35rem 0.55rem";
  tooltip.style.borderRadius = "8px";
  tooltip.style.background = "rgba(15, 23, 42, 0.92)";
  tooltip.style.color = "#ffffff";
  tooltip.style.font = "600 12px IBM Plex Sans";
  tooltip.style.whiteSpace = "nowrap";
  tooltip.style.zIndex = "20";

  host.appendChild(tooltip);
  chartHoverStore.tooltip.set(canvas, tooltip);
  return tooltip;
}

function showCanvasTooltip(canvas, text, x, y) {
  const tooltip = getOrCreateCanvasTooltip(canvas);
  if (!tooltip) {
    return;
  }

  tooltip.textContent = text;
  tooltip.style.transform = `translate(${x + 14}px, ${Math.max(8, y - 14)}px)`;
}

function hideCanvasTooltip(canvas) {
  const tooltip = chartHoverStore.tooltip.get(canvas);
  if (!tooltip) {
    return;
  }

  tooltip.style.transform = "translate(-9999px, -9999px)";
}

function exportReportsCsv() {
  if (state.reports.length === 0) {
    return;
  }

  const rows = [
    ["Employee", "Role", "GapScore", "MaxScore", "GapPercentage", "Date", "MissingSkills"]
  ];

  state.reports.forEach((report) => {
    rows.push([
      report.employeeName,
      report.roleName,
      String(report.gapScore),
      String(report.maxScore),
      String(report.gapPercentage),
      new Date(report.date).toISOString(),
      report.missingSkills.join(" | ")
    ]);
  });

  const csv = rows
    .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
    .join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "workforce_skill_gap_reports.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
}

async function extractTextFromFile(file) {
  if (file.name.toLowerCase().endsWith(".pdf")) {
    return extractTextFromPdf(file);
  }

  if (file.name.toLowerCase().endsWith(".docx")) {
    return extractTextFromDocx(file);
  }

  throw new Error("Unsupported file type");
}

async function extractTextFromPdf(file) {
  if (!window.pdfjsLib) {
    throw new Error("PDF parser not loaded");
  }

  window.pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

  const arrayBuffer = await file.arrayBuffer();
  const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  let fullText = "";

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum += 1) {
    const page = await pdf.getPage(pageNum);
    const content = await page.getTextContent();
    const pageText = content.items.map((item) => item.str).join(" ");
    fullText += ` ${pageText}`;
  }

  return fullText;
}

async function extractTextFromDocx(file) {
  if (!window.mammoth) {
    throw new Error("DOCX parser not loaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  const result = await window.mammoth.extractRawText({ arrayBuffer });
  return result.value || "";
}

function extractSkillsFromResumeText(text, requiredSkills) {
  const normalizedText = ` ${String(text || "").toLowerCase().replace(/\s+/g, " ")} `;
  const extracted = [];

  requiredSkills.forEach((requiredSkill) => {
    const name = requiredSkill.name.trim();
    const escapedName = escapeRegExp(name.toLowerCase());
    const regex = new RegExp(`\\b${escapedName}\\b`, "i");

    if (!regex.test(normalizedText)) {
      return;
    }

    extracted.push({
      name,
      level: estimateSkillLevel(normalizedText, name)
    });
  });

  return extracted;
}

function extractSkillsFromResumeTextAdvanced(text, roles) {
  const normalizedText = ` ${String(text || "").toLowerCase().replace(/\s+/g, " ")} `;
  const roleSkills = roles.flatMap((role) => role.requiredSkills.map((skill) => skill.name));
  const candidates = [...new Set([...COMMON_RESUME_SKILLS, ...roleSkills].map((skill) => skill.trim()).filter(Boolean))];
  const extractedMap = new Map();

  candidates.forEach((skillName) => {
    const escapedName = escapeRegExp(skillName.toLowerCase());
    const regex = new RegExp(`(^|\\W)${escapedName}(?=\\W|$)`, "i");

    if (!regex.test(normalizedText)) {
      return;
    }

    extractedMap.set(skillName.toLowerCase(), {
      name: skillName,
      level: estimateSkillLevel(normalizedText, skillName)
    });
  });

  return Array.from(extractedMap.values())
    .sort((a, b) => b.level - a.level || a.name.localeCompare(b.name))
    .slice(0, 20);
}

function estimateSkillLevel(normalizedText, skillName) {
  const escapedName = escapeRegExp(skillName.toLowerCase());
  const nearbyContextRegex = new RegExp(`.{0,30}${escapedName}.{0,40}`, "i");
  const context = (normalizedText.match(nearbyContextRegex) || [""])[0];

  if (/expert|advanced|senior|specialist|proficient/i.test(context)) {
    return 5;
  }

  if (/intermediate|mid|working knowledge/i.test(context)) {
    return 3;
  }

  if (/beginner|basic|familiar/i.test(context)) {
    return 2;
  }

  const numeric = context.match(/(?:level|lvl)?\s*([1-5])(?:\s*\/\s*5)?/i);
  if (numeric) {
    return clamp(Number(numeric[1]), 1, 5);
  }

  return 3;
}

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
