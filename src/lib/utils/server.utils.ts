import {
  PRIVATE_ROUTES,
  AUTH_ROUTES,
  ADMIN_ROUTES,
} from '@/lib/utils/constants/constants'

export function isPrivateRoute(pathname: string) {
  return PRIVATE_ROUTES.some((route) => pathname.startsWith(route))
}
export function isAuthRoute(pathname: string) {
  return AUTH_ROUTES.some((route) => pathname.startsWith(route))
}

export function isAdminRoute(pathname: string) {
  return ADMIN_ROUTES.some((route) => pathname.startsWith(route))
}
