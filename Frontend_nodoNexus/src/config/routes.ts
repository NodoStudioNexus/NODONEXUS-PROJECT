export const PublicRoutes = {
  LOGIN: "login",
};

export const PrivateRoutes = {
  PRIVATE: "private",
  DASHBOARD: "dashboard",
  ADMINDASHBOARD: "admin",
  CLIENTDASHBOARD: "client",
  ANALISTDASHBOARD: "analyst",

  //Rutas administrador
  ADMIN_HOME: "admin/home",
  ADMIN_USERS_PERMISSIONS: "admin/users-permissions",
  ADMIN_AUDIT: "admin/audit",
  ADMIN_PROJECTS: "admin/projects",
  ADMIN_MONITORING: "admin/monitoring",
  ADMIN_BACKUP: "admin/backup",
  //Rutas analistaa 
  ANALYST_HOME: "analyst/home",
  ANALYST_ANALYSIS_PHASE: "analyst/analysis-phase",
  ANALYST_BUSINESS_MODELING: "analyst/business-modeling",
  ANALYST_REQUIREMENTS: "analyst/requirements",
  ANALYST_RISKS_REPORTS: "analyst/risks-reports",

  // Rutas de perfil (comunes a todos los roles)
  PROFILE: "dashboard/profile",
  PROFILE_EDIT: "dashboard/profile/edit",
};

// Mapa de rutas a nombres de módulos
export const moduleNames: Record<string, string> = {
  [PrivateRoutes.ADMINDASHBOARD]: "Dashboard Administrador",
  [PrivateRoutes.CLIENTDASHBOARD]: "Dashboard Cliente",
  [PrivateRoutes.ANALISTDASHBOARD]: "Dashboard Analista",
  [PrivateRoutes.PROFILE]: "Mi Perfil",
  [PrivateRoutes.PROFILE_EDIT]: "Editar Perfil",
};