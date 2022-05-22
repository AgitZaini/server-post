<template>
    <div class="container">
        <div class="row px-3">
            <div class="col-lg-10 col-xl-9 card flex-row mx-auto px-0">
                <div class="img-left d-none d-md-flex"></div>
                <div class="card-body">
                    <h4 class="title text-center mt-4">Login into account</h4>
                    <form class="form-box px-3" @submit.prevent="handleLogin">
                        <div class="form-input">
                            <span><i class="fa fa-envelope-o"></i></span>
                            <input type="email" v-model="email" tabindex="10" required name="" placeholder="Email Address" id="" />
                        </div>
                        <div class="form-input">
                            <span><i class="fa fa-key-o"></i></span>
                            <input type="password" v-model="password" tabindex="10" required name="" placeholder="password" id="" />
                        </div>

                        <div class="text-center mb-3">
                            <button type="submit" class="btn btn-block text-uppercase">Login</button>
                        </div>

                        <div class="text-center mb-3">or login with</div>

                        <div class="text-center mb-3">
                            <div class="">
                                <a href="#" class="btn btn-block btn-social btn-google" @click.prevent="googleHandler"> google </a>
                            </div>
                        </div>

                        <hr class="my-4" />

                        <div class="text-center mb-2">
                            Don't have an account?
                            <a href="#" class="register-link"><router-link to="/register"> Register here </router-link></a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "pinia";
import userStore from "../stores/user";

export default {
    name: "LoginPage",
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        ...mapActions(userStore, ["login", "googleLogin"]),
        //import (nama store, sebuah array yang di isi nama nama action yg di panggil)
        handleLogin() {
            console.log("JALAN");
            this.login({ email: this.email, password: this.password });
        },
        handleClick() {
            this.$router.push({ name: "Register" });
        },
        successLogin(data) {
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("name", data.name);
            localStorage.setItem("email", data.email);
            localStorage.setItem("role", data.role);
        },
        async googleHandler() {
            try {
                const googleUser = await this.$gAuth.signIn();
                if (!googleUser) return null;
                const id_token = googleUser.getAuthResponse().id_token;
                this.googleLogin(id_token);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style scoped>
.card {
    margin-top: 10vh;
    overflow: hidden;
    border: 0 !important;
    border-radius: 20px !important;
    box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.1);
}

.img-left {
    width: 45%;
    background: url("../assets/hacktiv8background.png");
    background-size: cover;
    background-position: 50%;
}

.card-body {
    padding: 2rem;
}

.title {
    margin-bottom: 2rem;
}

.form-input {
    position: relative;
}

.form-input input {
    width: 100%;
    height: 45px;
    padding-left: 40px;
    margin-bottom: 20px;
    box-sizing: border-box;
    box-shadow: none;
    border: 1px solid #00000020;
    border-radius: 50px;
    outline: none;
    background: transparent;
}

.form-input span {
    position: absolute;
    top: 10px;
    padding-left: 15px;
    color: #007bff;
}

.form-input input::placeholder {
    color: black;
    padding-left: 0px;
}

.form-input input:focus,
.form-input input:valid {
    border: 2px solid #007bff;
}

.form-input input:focus::placeholder {
    color: #454b69;
}

.form-box button[type="submit"] {
    width: 100%;
    margin-top: 10px;
    border: none;
    cursor: pointer;
    border-radius: 50px;
    background: #007bff;
    color: #fff;
    font-size: 90%;
    font-weight: bold;
    letter-spacing: 0.1rem;
    transition: 0.5s;
    padding: 12px;
}

.form-box button[type="submit"]:hover {
    background: #0069d9;
}

.register-link {
    color: #007bff;
    font-weight: bold;
}

.register-link:hover {
    color: #0069d9;
    text-decoration: none;
}

.form-box .btn-social {
    color: white !important;
    border: 0;
    font-weight: bold;
}

.form-box .btn-google {
    background: #da3f34;
}

.form-box .btn-google:hover {
    background: #b53f37;
}
</style>
