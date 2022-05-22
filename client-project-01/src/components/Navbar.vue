<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <button class="btn btn-light navbar-brand" href="#"><router-link to="/">Design</router-link></button>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
                    <!-- <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inspiration</a>
                    </li> -->
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"> <router-link to="/profile">Profile</router-link></a>
                    </li>
                    <form class="d-flex" @submit.prevent="handleFilter">
                        <input v-model="caption" class="form-control me-2" type="search" placeholder="Search Name" aria-label="Search" />
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </ul>
                <li class="d-flex nav-item">
                    <button class="btn btn-success active text m-1 pb-2" aria-current="page" href="#"><router-link to="/login">Login</router-link></button>
                </li>
                <li class="d-flex nav-item">
                    <button class="btn btn-danger active" aria-current="page" href="#" @click.prevent="logout">Logout</button>
                </li>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapActions, mapState } from "pinia";
import postStore from "../stores/post";
export default {
    name: "Navbar",
    data() {
        return {
            caption: "",
        };
    },
    methods: {
        ...mapActions(postStore, ["allAccommodationsFilter"]),
        handleLogin() {},
        logout() {
            localStorage.clear();
            this.isLogin = false;
            this.$router.push("/login");
        },
        handleFilter() {
            this.allAccommodationsFilter(this.caption);
        },
    },
};
</script>

<style></style>
