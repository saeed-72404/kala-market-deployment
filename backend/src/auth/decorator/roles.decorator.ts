import { SetMetadata } from "@nestjs/common"

export const ROLES_KEY = "roles"

export enum UserRole {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
  CUSTOMER = "CUSTOMER",
}

export const Roles = (...roles: UserRole[]) => SetMetadata(ROLES_KEY, roles)

// Convenience decorators
export const AdminOnly = () => Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export const SellerOnly = () => Roles(UserRole.SELLER, UserRole.ADMIN, UserRole.SUPER_ADMIN)
export const CustomerOnly = () => Roles(UserRole.CUSTOMER)
export const SuperAdminOnly = () => Roles(UserRole.SUPER_ADMIN)
