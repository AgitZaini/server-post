<template>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#"><router-link to="/">Design</router-link></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarScroll">
                <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Inspiration</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#"> <router-link to="/profile">Profile</router-link></a>
                    </li>
                    <li class="d-flex nav-item">
                        <a class="nav-link active" aria-current="page" href="#"><router-link to="/login">Login</router-link></a>
                    </li>
                    <li class="d-flex nav-item">
                        <a class="nav-link active" aria-current="page" href="#" @click.prevent="logout">Logout</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Navbar",
    methods: {
        handleLogin() {},
        logout() {
            localStorage.clear();
            this.isLogin = false;
            this.$router.push("/login");
        },
    },
};
</script>

<style></style>
