import decode from 'jwt-decode';

class AuthService {
  static isTokenExpired = (userToken: any): boolean => {
    try {
      const decodedToken: any = decode(userToken);
      if (decodedToken.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch (err) {
      return true;
    }
  };

  /**
   * remove token from local storage
   */
  static removeToken = (): void => {
    localStorage.removeItem('userToken');
  };

  /**
   * set token in local storage
   * @param {string} userToken
   */
  static setToken = (userToken: string): void => {
    localStorage.setItem('userToken', userToken);
  };

  /**
   * Get token from local storage and check if it's not expired
   * return boolean
   */
  static isLoggedIn = (): boolean => {
    try {
      const userToken = localStorage.getItem('userToken') || '';
      const decodedToken: any = decode(userToken);
      if (decodedToken?.exp < Date.now() / 1000) {
        return false;
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  /**
   * get token from local storage and return it
   */
  static getToken = (): string | null => {
    return localStorage.getItem('userToken');
  };

  /**
   * Get token from local storage, decode it and return it
   */
  static getProfile = (): any => {
    const token = AuthService.getToken();
    if (token) return decode(token) || false;
    return null;
  };

  /**
   * add 'isFirstTimeLogin' in local storage with status passed
   */
  static toggleFirstTimeLoginStatus = (status: boolean): void => {
    localStorage.setItem('isFirstTimeLogin', `${status}`);
  };

  /**
   * return value of 'isFirstTimeLogin' in local storage
   */
  static getFirstTimeLoginStatus = (): boolean => {
    return Boolean(localStorage.getItem('isFirstTimeLogin'));
  };
}

export default AuthService;
export { AuthService };
