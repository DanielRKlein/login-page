<template>
    <div id="background">
        <div id="container">
            <span class="input-group-text me-auto " id="close" @click="cancel">
                <font-awesome-icon icon="fa-solid fa-xmark" />
            </span>
            <h3 class="fw-bold">
                Are you sure?
            </h3>
            <div id="button-container">
                <button type="button" class="btn btn-success" @click="emitFunction">Yes</button>
                <button type="button" class="btn btn-danger" @click="cancel">No</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "ConfirmationModal",

    props: {
        continue: String,
        cancel: Function
    },

    methods: {
        emitFunction() {
            this.$emit(`${this.continue}-action`)
        }
    },

    mounted() {}
}
</script>

<style scoped>

#background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    /* Fundo semi-transparente */
    backdrop-filter: blur(5px);
    /* Desfoque */
    z-index: 9999;
    /* Garante que o modal esteja sobreposto a outros elementos */
    display: flex;
    justify-content: center;
    align-items: center;
}

#container {
    display: flex;
    width: 390px;
    height: 180px;
    border-radius: 15px;
    border-top-left-radius: 0px;
    align-items: center;
    flex-direction: column;
    background-color: #31373d;
}

h3 {
    margin: 25px;

}

#button-container {
    display: flex;
    width: 300px;
    justify-content: space-between;
}

.btn {
    width: 140px;
    border-radius: 10px;
    font-size: 0.8em;
    font-weight: bold;
}

#close {
    background-color: rgb(255, 65, 65);
    width: 35px;
    height: 28px;
    font-size: 0.8em;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    border: none;
    border-top-left-radius: 0px;
  }

  #close:hover {
    background-color: rgb(253, 98, 98);
    font-size: 0.9em;
  }
</style>