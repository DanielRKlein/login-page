<template>
  <div id="todo">
    <form class="form-box">
      <span class="input-group-text" id="close" @click="close">
          <font-awesome-icon icon="fa-solid fa-xmark" />
        </span>
      <h1 class="fw-bold">Add a New Task</h1>
      <div class="form-floating mb-3">
        <textarea class="form-control border border-0" placeholder="Leave a comment here" id="taskName" style="height: 70px;" v-model="taskName"></textarea>
        <label for="taskName">Task Name</label>
      </div>
      <div class="form-floating mb-3">
        <textarea class="form-control border border-0" placeholder="Leave a comment here" id="taskDescription" style="height: 150px " v-model="taskDescription"></textarea>
        <label for="floatingTextarea2Disabled">Description</label>
      </div>
      <div class="form-floating">
        <select class="form-select border border-0" id="taskType" aria-label="Floating label disabled select example" style="height: 70px" v-model:="taskType">
          <option selected style="font-size: 0.9em; font-weight: bold;" disabled>What kind of your task is</option>
          <option v-for="option in options" :value="option">{{ option }} </option>
        </select>
        <label for="floatingSelectDisabled">Task Type</label>
        <button type="submit" class="btn btn-primary fw-bold fs-5" @click="postTask">add</button>
      </div>
    </form>
    <Toast v-show="toastVisibility" :type="toastType" :msg="toastMsg" id="toast"/>
  </div>
</template>

<script>
import Toast from './Toast.vue';

  export default {
    name: "TaskForm",
    props: {
      close: Function
    },

    components: {
      Toast
    },

    data() {
      return {
        taskName: null,
        taskDescription: null,
        taskType: null,
        option: null,
        options: ["Work", "Studies", "Personal"],
        toastMsg: null,
        toastType: null,
        toastVisibility: false
      }
    },

    methods: {

      async postTask(e) {
        e.preventDefault();

        if (this.taskName == null || this.taskType == null) {
          this.toastMsg = "Escolha um nome e um tipo para a sua task";
          this.toastType = "alert alert-danger";
          this.toastVisibility = true
          setTimeout(() => {
            this.toastVisibility = false
          },3000);
          return;
        }

        const response = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`);
        const userData = await response.json();
        const defineID = (() => {
          if(userData.taskAmmount < 1) {
            userData.taskAmmount++;
            return 1
          } else {
            const id = userData.taskAmmount + 1;
            userData.taskAmmount++;
            return id
          }
        })

        const defineIndex = (() => {
          if (userData.tasks.length < 1) {
            return 0
          } else {
            return userData.tasks.length
          }
        })


        const newTask = {
          taskname: this.taskName,
          tasktype: this.taskType,
          taskDescription: this.taskDescription,
          index: defineIndex(),
          id: defineID()
        };

        userData.tasks.push(newTask);

        const requestOptions = {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        };

        const updateResponse = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`, requestOptions);
        const updatedUserData = await updateResponse.json();

        console.log(updatedUserData);

        this.$emit('task-added');
        this.close();
      }
    },

  }
</script>

<style scoped>



  #todo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  backdrop-filter: blur(5px); /* Desfoque */
  z-index: 9999; /* Garante que o modal esteja sobreposto a outros elementos */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  }

  .form-box {
    width: 500px;
    padding: 45px;
    padding-left: 0px;
    padding-top: 0px;
    padding-bottom: 10px;
    border-radius: 30px;
    border-top-left-radius: 0px;
    background-color: #30363b;
    display: flex;
    flex-direction: column;
    justify-content: center;

  }

  #close {
    background-color: rgb(255, 65, 65);
    width: 40px;
    height: 35px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.3s;
    border-top-left-radius: 0px;
  }

  #close:hover {
    background-color: rgb(253, 98, 98);
    font-size: 1.1em;
  }

  h1 {
    margin-top: 25px;
    text-align: center;
    margin-bottom: 30px;
  }

  .form-floating {
    margin-bottom: 25px;
    border: none;
    margin-left: 45px;
  }
  .form-control:focus {
        outline: none;
        box-shadow: none;
    }

    .form-select:focus {
      outline: none;
      box-shadow: none;
    }

  .btn {
    width: 410px;
    margin-top: 45px;
    border-radius: 8px;
  }

  #toast {
    width: 480px;
    margin-top: 25px;
    text-align: center;
  }


</style>
