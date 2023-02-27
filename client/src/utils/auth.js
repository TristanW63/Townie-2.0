import decode from "jwt-decode";
// import { redirect } from "react-router-dom";
import { createBrowserHistory } from 'history';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

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

  login(idToken) {
    localStorage.setItem("id_token", idToken);
    const history = createBrowserHistory();
    history.push('/home');
    window.location.reload();
  }

  logout() {
    localStorage.removeItem("id_token");

    window.location.assign("/");
  }
}


const authService = new AuthService();

export default authService;
