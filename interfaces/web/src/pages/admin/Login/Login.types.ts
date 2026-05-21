/**
 * Admin login form types.
 */

export interface AdminLoginForm {
  email: string;
  password: string;
}

export interface AdminLoginViewState {
  isLoading: boolean;
  error: string;
  showPassword: boolean;
}

export const initialAdminLoginViewState: AdminLoginViewState = {
  isLoading: false,
  error: '',
  showPassword: false,
};
