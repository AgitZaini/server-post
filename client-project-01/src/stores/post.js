import { defineStore } from "pinia";
import axios from "axios";

const postStore = defineStore({
    id: "post",
    state: () => {
        return {
            posts: [],
            caption: "",
            image: "",
            images: [],
            count: 0,
        };
    },
    actions: {
        async addPost() {
            try {
                let formData = new FormData();
                formData.append("caption", this.caption);
                formData.append("image", this.image);
                //request ke server
                let response = await axios({
                    url: "/pub/posting",
                    method: "post",
                    data: formData,
                    headers: { access_token: localStorage.getItem("access_token") },
                });
                this.getPostById();
                this.router.push({ name: "ProfilePage" });
                console.log(response, "INI RESPONNYA");
            } catch (error) {
                console.log(error);
            }
        },
        async addMultiplePost() {
            try {
                let formData = new FormData();
                formData.append("caption", this.caption);
                formData.append("images", this.images);
                //request ke server
                let response = await axios({
                    url: "/pub/postings",
                    method: "post",
                    data: formData,
                    headers: { access_token: localStorage.getItem("access_token") },
                });
                this.getPostById();
                this.router.push({ name: "ProfilePage" });
                console.log(response, "INI RESPONNYA Multiple");
            } catch (error) {
                console.log(error);
            }
        },
        async getAllPost() {
            this.posts = [];
            try {
                const dataPost = await axios({
                    url: "/pub/",
                    method: "get",
                });
                this.posts = dataPost.data.rows;
                console.log(dataPost, "ini store");
                this.count = Math.ceil(dataPost.data.count / 8);
                console.log(this.count);
            } catch (error) {}
        },
        async getPostById() {
            this.posts = [];
            try {
                const dataPost = await axios({
                    url: "/pub/profile",
                    method: "get",
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                });
                this.posts = dataPost.data;
            } catch (error) {}
        },
        async getAllPostPage(n) {
            this.posts = [];
            try {
                const dataPost = await axios({
                    url: "/pub?page=" + n,
                    method: "get",
                });
                this.posts = dataPost.data.rows;
                console.log(dataPost, "ini store");
                this.count = Math.ceil(dataPost.data.count / 8);
                console.log(this.count);
            } catch (error) {}
        },
    },
});

export default postStore;
