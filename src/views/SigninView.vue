<template>
    <div class="login-page">
        <SigninForm />

    </div>
</template>

<script>
    import SigninForm from "../components/SigninForm.vue";

    export default {
        name: "SigninView",

        components: {
            SigninForm
        }
    }
</script>