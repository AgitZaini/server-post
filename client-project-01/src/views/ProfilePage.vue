<template>
    <div class="container">
        <div class="row px-3">
            <div class="card px-0">
                <!-- <div class="img-left d-none d-md-flex"></div> -->
                <div class="card-body row m-5 pb-5">
                    <!-- Button trigger modal Single Upload -->
                    <div class="">
                        <button type="button" class="btn btn-dark m-5 pb-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Add Single Post</button>

                        <!-- <b> || </b> -->

                        <!-- Modal -->
                        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="staticBackdropLabel">Single Upload Photo</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form enctype="multipart/form-data" @submit.prevent="handleAddPost">
                                            <div class="mb-3">
                                                <label for="formFileSm" class="form-label">Put Your Photo Here</label>
                                                <input @change="(e) => (image = e.target.files[0])" class="form-control form-control-sm" id="formFileSm" type="file" />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Caption</label>
                                                <input v-model="caption" type="text" class="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-primary">Upload</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Trigger Modal Multiple Upload -->
                        <button type="button" class="btn btn-dark m-5 pb-2" data-bs-toggle="modal" data-bs-target="#multiple">Add Multiple Post</button>

                        <!-- Modal -->
                        <div class="modal fade" id="multiple" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="multipleLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="multipleLabel">Multiple Upload Photo</h5>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body">
                                        <form enctype="multipart/form-data" @submit.prevent="handleAddMultiplePost">
                                            <div class="mb-3">
                                                <label for="formFileSm1" class="form-label">Put Your Photo Here</label>
                                                <input @change="(e) => (image = e.target.files[0])" class="form-control form-control-sm" id="formFileSml" type="file" multiple />
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputPassword1" class="form-label">Caption</label>
                                                <input v-model="caption" type="text" class="form-control" id="exampleInputPassword1" />
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                <button type="submit" class="btn btn-primary">Upload</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr class="my-4" />
                    <!-- Card Post -->
                    <div class="row m-50 pb-5">
                        <!-- <div class="col"> -->
                        <CardPost v-for="el in posts" :key="el.id" :post="el" />
                        <!-- </div> -->
                    </div>
                    <hr class="my-4" />

                    <div class="text-center mb-2">
                        This is our FOOTER
                        <!-- <a href="#" class="register-link">Here Is</a> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapWritableState } from "pinia";
import postStore from "../stores/post";
import CardPost from "../components/CardPost.vue";
export default {
    name: "ProfilePage",

    data() {},
    methods: {
        ...mapActions(postStore, ["getPostById", "addPost", "addMultiplePost"]),
        handleAddPost() {
            this.addPost();
        },
        handleAddMultiplePost() {
            this.addMultiplePost();
        },
    },
    computed: {
        ...mapState(postStore, ["posts"]),
        ...mapWritableState(postStore, ["caption", "image"]),
    },
    created() {
        console.log(this.posts, " ini profile post");
        this.getPostById();
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
