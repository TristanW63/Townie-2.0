import decode from "jwt-decode";

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  // Checks if there is a saved token and it's still valid
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    return localStorage.getItem("id_token");
  }

  // Saves user token to localStorage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    
  }

  // Clear user token and profile data from localStorage
  logout() {
    localStorage.removeItem("id_token");

    window.location.assign("/");
  }
}


const authService = new AuthService();

export default authService;
