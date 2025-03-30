import { UserState, initialUserState, userReducer } from './user.reducer';
import * as UserActions from './user.actions';

describe('User Reducer', () => {
  describe('unknown action', () => {
    it('should return the default state', () => {
      const action = { type: 'Unknown' };
      const state = userReducer(initialUserState, action);

      expect(state).toBe(initialUserState);
    });
  });

  describe('login actions', () => {
    it('should set isLoading to true on login', () => {
      const action = UserActions.login({ email: 'test@example.com', password: 'password' });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set token and isAuthenticated on loginSuccess', () => {
      const token = 'test-token';
      const action = UserActions.loginSuccess({ token });
      const state = userReducer(initialUserState, action);

      expect(state.token).toBe(token);
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set error on loginFailure', () => {
      const error = { message: 'Invalid credentials' };
      const action = UserActions.loginFailure({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(error);
    });
  });

  describe('register actions', () => {
    it('should set isLoading to true on register', () => {
      const action = UserActions.register({ email: 'test@example.com', password: 'password' });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should set isLoading to false on registerSuccess', () => {
      const action = UserActions.registerSuccess();
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toBeNull();
    });

    it('should set error on registerFailure', () => {
      const error = { message: 'Email already exists' };
      const action = UserActions.registerFailure({ error });
      const state = userReducer(initialUserState, action);

      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(error);
    });
  });

  describe('logout action', () => {
    it('should reset state to initial values', () => {
      // First, create an authenticated state
      const authenticatedState: UserState = {
        token: 'test-token',
        isAuthenticated: true,
        isLoading: false,
        error: null
      };
      
      const action = UserActions.logout();
      const state = userReducer(authenticatedState, action);

      expect(state).toEqual(initialUserState);
    });
  });
}); 