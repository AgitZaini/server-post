import axios from "axios";
import { defineStore } from "pinia";

const userStore = defineStore("userStore", {
    state: () => ({
        access_token: "",
        user: {},
        isLogin: localStorage.getItem("access_token") ? true : false,
    }),
    actions: {
        //isinya dengan method method atau axios
        async login(data) {
            try {
                console.log("INI STORE", data);
                const response = await axios.post("/pub/login", data);
                // console.log(response);
                this.access_token = response.data.access_token;
                localStorage.setItem("access_token", this.access_token);
                this.user.email = response.data.email;
                this.user.id = response.data.id;
                this.user.name = response.data.name;
                localStorage.setItem("access_token", this.access_token);
                localStorage.setItem("email", this.user.email);
                localStorage.setItem("id", this.user.id);
                localStorage.setItem("name", this.user.name);

                this.isLogin = true;
                this.router.push({
                    name: "ProfilePage",
                });
            } catch (error) {
                console.log(error);
            }
        },
        async register(data) {
            try {
                await axios.post("/pub/register", data);

                this.router.push({
                    name: "LoginPage",
                });
            } catch (error) {
                console.log(error.response);
            }
        },
        setLocalStorage(user) {
            localStorage.setItem("access_token", user.access_token);
            localStorage.setItem("username", user.username);
            this.access_token = localStorage.access_token;
        },
        async googleLogin(id_token) {
            // console.log(id_token + "+_+_+_");
            try {
                const logUser = await axios({
                    url: "/pub/google-login",
                    method: "post",
                    data: {
                        access_token: id_token,
                    },
                });
                this.setLocalStorage(logUser.data);
                // console.log(logUser + "_+_+_+");
                this.router.push({ name: "Homepage" });
            } catch (error) {
                console.log(error);
            }
        },
    },
});

export default userStore;
