import axios from "axios";

export default {
  getCurrentUser: function(){
    return axios.get("/auth/getUser");
  },

  signUp: (newUser) => {
    return axios.post("/auth/signup", newUser)
  },

  login: (user) => {
    return axios.post("/auth/login", user)
  },

  logout: () => {
    return axios.get("/auth/logout");
  },

  googleSignup: () => {
    return axios.get("/auth/google");
  }
}