<template>
    <div class="dropdown">
        <button class="btn btn-dark" type="button" @click="toggleDropdown">
            <font-awesome-icon icon="fa-solid fa-bars" />
        </button>
        <div id="menu-container">
            <ul class="menu" v-if="dropwdown">
                <li><button class="dropdown-item" type="button" @click="toggleConfirmation">Sign Out</button></li>
                <li><button class="dropdown-item" type="button" @click="accessHistory">History</button></li>
            </ul>
        </div>
        <ConfirmationModal :cancel="toggleConfirmation" :continue="continueAction" v-if="confirmation" @signOut-action="signOut"/>
    </div>
</template>

<script>
import ConfirmationModal from './ConfirmationModal.vue'
    export default {
        name: "Menu",

        components: {
            ConfirmationModal
        },

        data() {
            return {
                dropwdown: false,
                confirmation: false,
                continueAction: "signOut"
            }
        },

        methods: {

            toggleDropdown() {
                this.dropwdown = !this.dropwdown;
            },

            toggleConfirmation() {
                this.confirmation = !this.confirmation;
            },

            accessHistory() {
                this.$router.push('/history');
            },

            signOut() {
                this.$store.commit('setUserID', null);
                this.$router.push('/');
            }
        }
    }

</script>

<style scoped>

    ul {
        list-style: none;
        padding: 10px;
    }

    li {
        height: 30px;
        width: 80px;
        border-radius: 3px;
        padding-left: 10px;
        font-size: 0.8em;
        font-weight: bold;
        transition: 0.2s;
        margin-bottom: 2px;
        padding-top: 4px;
    }

    li:hover {
        background-color: rgb(59, 70, 73);
    }

</style>