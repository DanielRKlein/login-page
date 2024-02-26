<template>
<button type="button" class="btn btn-outline-secondary" id="back-button" @click="backToMenu">back to menu</button>
<div class="d-flex flex-column justify-content-center" id="f-page" >
    <form id="f-container" @submit="checkUser">
        <h1 class="fw-bold p-3"> Faça seu log-in</h1>
        <div class="form-floating mb-3 text-light">
          <input type="text" class="form-control border border-0 " id="floatingInput" placeholder="name@example.com" v-model="userName" autocomplete="off">
          <label for="floatingInput">Username</label>
        </div>
        <div class="form-floating d-flex">
                <input :type="passwordInputType" class="form-control border border-0" id="floatingPassword" v-model="userPassword" placeholder="Password">
                <label for="floatingPassword">Password</label>
                <span class="input-group-text" id="icon" @click="showPasswordFunction">
                <font-awesome-icon :icon="passwordButton" />
                </span>
            </div>
        <button type="submit" class="btn btn-primary">Log-in</button>
    </form>
    <Toast v-show="showToast"  :msg="toastMsg" :type="toastType" id="toast"/>
</div>
</template>

<script>
import Toast from "../components/Toast.vue";

export default {

    name: "LoginForm",

    data() {
        return {
            userName: null,
            userPassword: null,
            verified: false,
            showToast: false,
            showPassword: false,
            passwordInputType: "password",
            passwordButton: "fa-solid fa-eye"
        }
    },

    components: {
        Toast
    },

    methods: {

        showPasswordFunction(e) {
            e.preventDefault();
            if (!this.showPassword) {
                this.passwordInputType = "text";
                this.passwordButton = "fa-solid fa-eye-slash"
                this.showPassword = true;
            } else {
                this.passwordInputType = "password";
                this.passwordButton = "fa-solid fa-eye"
                this.showPassword = false;
            }



        },

        async checkUser(e) {
            e.preventDefault();
            const req = await fetch("http://localhost:3000/users");
            const data = await req.json();

            console.log(data)
            let user = false;
            user = data.find((user) => {
                if (user.login.localeCompare(this.userName) === 0){
                    return user;
                }
            });

           if (user) { 
            if (user.password.localeCompare(this.userPassword) === 0) {
                this.verified = true;
                this.$store.commit('setUserID', user.id);
                this.$router.push('/todo');
            } else {
                this.toastMsg = "Usuário ou senha incorreta";
                this.toastType = "alert alert-danger";
                this.showToastf();
            }
            } else {
                this.toastMsg = "Usuário ou senha incorreta";
                this.toastType = "alert alert-danger";
                this.showToastf();
                
            }

            this.userName = null;
            this.userPassword = null;
        },
        
        showToastf() {
            this.showToast = true;
            setTimeout(() => {
                this.showToast = false;;
            }, 2000)
        },

        backToMenu() {
            this.$router.push('/');
        }
    },

}


</script>

<style scoped>

    #icon {
        border: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        }

    #floatingPassword {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    #back-button {
        font-size: 0.7em;
        width: 150px;
        border-radius: 55px;
    }


    #f-page {
        width: 100vw;
        height: 85vh;
    }

    #f-container {
        width: 400px;
        max-width: 400px ;
        height: 400px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        align-self: center;
        padding-top: 40px;
        background-color: rgb(23, 27, 32);
    }

    h1 {
        margin-left: 35px;
    }
    .form-floating {
        font-size: 0.9em;
        width: 300px;
        align-self: center;

    }

    .form-control:focus {
        outline: none;
        box-shadow: none;
    }
    
    .btn {
        width: 300px;
        align-self: center;
        margin: 30px;
    }

    #toast {
        align-self: center;
        justify-self: center;
        margin-top: 35px;
        border-radius: 10px;
        width: 400px;
    }

</style>