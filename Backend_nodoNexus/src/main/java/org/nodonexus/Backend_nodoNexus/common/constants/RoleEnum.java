package org.nodonexus.Backend_nodoNexus.common.constants;

public enum RoleEnum {
  CLIENT("ROLE_CLIENT"),
  ADMIN("ROLE_ADMIN"),
  ANALYST("ROLE_ANALYST"),
  PLANNER("ROLE_PLANNER"),
  MODELING("ROLE_MODELING"),
  IMPLEMENTATION("ROLE_IMPLEMENTATION"),
  TESTER("ROLE_TESTER"),
  VALIDATION("ROLE_VALIDATION");

  private final String authority;

  RoleEnum(String authority) {
    this.authority = authority;
  }

  public String getAuthority() {
    return authority;
  }
}
