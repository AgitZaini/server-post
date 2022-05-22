<template>
    <div class="container">
        <div class="row px-3">
            <div class="card px-0">
                <!-- <div class="col-lg-10 col-xl-9 card px-0"> -->
                <!-- <div class="img-left d-none d-md-flex"></div> -->

                <div class="card-body row m-5 pb-5">
                    <CardPost v-for="el in posts" :key="el.id" :post="el" />

                    <nav aria-label="Page navigation example">
                        <ul class="pagination justify-content-center">
                            <li v-for="n in count" :key="n" @click.prevent="pagination(n - 1)" class="page-item">
                                <a class="page-link" href="#">{{ n }}</a>
                            </li>
                        </ul>
                    </nav>
                    <!-- <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li v-for="n in count" :key="n" @click.prevent="pagination(n - 1)" class="page-item">
                                <a class="page-link" href="#">{{ n }}</a>
                            </li>
                        </ul>
                    </nav> -->
                    <hr class="my-4" />

                    <div class="text-center mb-2">
                        This is our FOOTER
                        <a class="register-link">Here Is</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import postStore from "../stores/post";
import CardPost from "../components/CardPost.vue";
export default {
    name: "HomePage",

    data() {},
    methods: {
        ...mapActions(postStore, ["getAllPost", "getAllPostPage"]),
        pagination(n) {
            this.getAllPostPage(n);
        },
    },
    computed: {
        ...mapState(postStore, ["posts", "count"]),
    },
    created() {
        this.getAllPost();
    },
    components: { CardPost },
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
