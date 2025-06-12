export const PublicRoutes = {
  LOGIN: "login",
  SOLICITUD: "nuevaSolicitud",
};

export const PrivateRoutes = {
  PRIVATE: "private",
  DASHBOARD: "dashboard",
  ADMINDASHBOARD: "admin",
  CLIENTDASHBOARD: "client",
  ANALISTDASHBOARD: "analyst",
  PLANNERDASHBOARD: "planner",
  MODELINGDASHBOARD: "modeling",
  IMPLEMENTATIONDASHBOARD: "implementation",
  TESTERDASHBOARD: "tester",
  VALIDATIONDASHBOARD: "validation",

  // Rutas administrador
  ADMIN_HOME: "admin/home",
  ADMIN_USERS_CONTROL: "admin/usersControl",
  ADMIN_AUDIT: "admin/audit",
  ADMIN_PROJECTS: "admin/projects",
  ADMIN_MONITORING: "admin/monitoring",
  ADMIN_BACKUP: "admin/backup",

  // Rutas analista
  ANALYST_HOME: "analyst/home",
  ANALYST_ANALYSIS_PHASE: "analyst/analysis-phase",
  ANALYST_BUSINESS_MODELING: "analyst/business-modeling",
  ANALYST_REQUIREMENTS: "analyst/requirements",
  ANALYST_RISKS_REPORTS: "analyst/risks-reports",

  // Rutas cliente
  CLIENT_SOLICITUDES: "client/solicitudes",
  CLIENT_PROFILE: "client/profile",

  // Rutas planner
  PLANNER_PROJECTS: "planner/projects",
  PLANNER_CALENDAR: "planner/calendar",

  // Rutas modeling
  MODELING_PROJECTS: "modeling/projects",
  MODELING_DIAGRAMS: "modeling/diagrams",

  // Rutas implementation
  IMPLEMENTATION_PROJECTS: "implementation/projects",
  IMPLEMENTATION_TASKS: "implementation/tasks",

  // Rutas tester
  TESTER_PROJECTS: "tester/projects",
  TESTER_RESULTS: "tester/results",

  // Rutas validation
  VALIDATION_PROJECTS: "validation/projects",
  VALIDATION_REPORTS: "validation/reports",

  // Rutas de perfil (comunes a todos los roles)
  PROFILE: "profile",
  PROFILE_EDIT: "dashboard/profile/edit",
};

// Mapa de rutas a nombres de módulos
export const moduleNames: Record<string, string> = {
  [PrivateRoutes.ADMINDASHBOARD]: "Dashboard Administrador",
  [PrivateRoutes.CLIENTDASHBOARD]: "Dashboard Cliente",
  [PrivateRoutes.ANALISTDASHBOARD]: "Dashboard Analista",
  [PrivateRoutes.PLANNERDASHBOARD]: "Dashboard Planificador",
  [PrivateRoutes.IMPLEMENTATIONDASHBOARD]: "Dashboard Implementación",
  [PrivateRoutes.MODELINGDASHBOARD]: "Dashboard Modelado",
  [PrivateRoutes.TESTERDASHBOARD]: "Dashboard Tester",
  [PrivateRoutes.VALIDATIONDASHBOARD]: "Dashboard Validación",

  // Rutas específicas
  [PrivateRoutes.ADMIN_HOME]: "Inicio",
  [PrivateRoutes.ADMIN_USERS_CONTROL]: "Gestión de Usuarios",
  [PrivateRoutes.ADMIN_AUDIT]: "Auditoría del Sistema",
  [PrivateRoutes.ADMIN_PROJECTS]: "Gestión de Proyectos",
  [PrivateRoutes.ADMIN_MONITORING]: "Monitoreo en Tiempo Real",
  [PrivateRoutes.ADMIN_BACKUP]: "Respaldo",

  [PrivateRoutes.ANALYST_HOME]: "Inicio",
  [PrivateRoutes.ANALYST_ANALYSIS_PHASE]: "Gestión Fase Análisis",
  [PrivateRoutes.ANALYST_BUSINESS_MODELING]: "Modelado de Negocio",
  [PrivateRoutes.ANALYST_REQUIREMENTS]: "Gestión de Requerimientos",
  [PrivateRoutes.ANALYST_RISKS_REPORTS]: "Riesgos y Reportes",

  [PrivateRoutes.CLIENT_SOLICITUDES]: "Mis Solicitudes",
  [PrivateRoutes.CLIENT_PROFILE]: "Perfil",

  [PrivateRoutes.PLANNER_PROJECTS]: "Planificación de Proyectos",
  [PrivateRoutes.PLANNER_CALENDAR]: "Calendario",

  [PrivateRoutes.MODELING_PROJECTS]: "Modelado de Proyectos",
  [PrivateRoutes.MODELING_DIAGRAMS]: "Diagramas",

  [PrivateRoutes.IMPLEMENTATION_PROJECTS]: "Implementación de Proyectos",
  [PrivateRoutes.IMPLEMENTATION_TASKS]: "Tareas",

  [PrivateRoutes.TESTER_PROJECTS]: "Pruebas de Proyectos",
  [PrivateRoutes.TESTER_RESULTS]: "Resultados de Pruebas",

  [PrivateRoutes.VALIDATION_PROJECTS]: "Validación de Proyectos",
  [PrivateRoutes.VALIDATION_REPORTS]: "Reportes de Validación",

  [PrivateRoutes.PROFILE]: "Mi Perfil",
  [PrivateRoutes.PROFILE_EDIT]: "Editar Perfil",
};