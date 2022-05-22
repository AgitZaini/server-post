<template>
    <div class="card m-2 pb-10" style="width: 18rem">
        <img :src="imageX" class="card-img-top" alt="..." />
        <div class="card-body">
            <p class="card-text">{{ post.caption }}</p>
            <a href="#" class="btn btn-primary"><i class="fa fa-heart"></i></a>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardPost",
    data() {
        return {
            imageX: `http://localhost:3030/${this.post.image}`,
        };
    },
    props: ["post"],
};
</script>

<style></style>
