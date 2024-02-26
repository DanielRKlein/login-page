<template>
    <div id="todo">
      <form class="form-box">
        <span class="input-group-text" id="close" @click="close">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </span>
        <h1 class="fw-bold">Edit Task</h1>
        <div class="form-floating mb-3">
          <textarea class="form-control border border-0" placeholder="Leave a comment here" id="taskName" style="height: 70px;" v-model="localTaskName">{{ taskname }}</textarea>
          <label for="taskName">New Task Name</label>
        </div>
        <div class="form-floating mb-3">
          <textarea class="form-control border border-0" placeholder="Leave a comment here" id="taskDescription" style="height: 150px " v-model="localTaskDescription">{{ taskDescription }}</textarea>
          <label for="floatingTextarea2Disabled">New Description</label>
        </div>
        <div class="form-floating">
            <select class="form-select border border-0" id="taskType" aria-label="Floating label disabled select example" style="height: 70px" v-model="localTaskType">
                <option style="font-size: 0.9em; font-weight: bold;" disabled>What kind of your task is</option>
                <option selected>{{ tasktype }}</option>
                <option v-for="option in options" :value="option">{{ option }}</option>
            </select>
            <label for="floatingSelectDisabled">New Task Type</label>
            <button type="submit" class="btn btn-primary fw-bold fs-5" @click="uptadeTask">Update</button>
        </div>

      </form>
    </div>
  </template>
  
  <script>
    export default {
      name: "TaskForm",
      props: {
        close: Function,
        taskname: String,
        taskDescription: String,
        tasktype: String,
        taskID: Number
      },
  
      data() {
        return {
          option: null,
          options: ["Work", "Studies", "Personal"],
          localTaskName: this.taskname,
          localTaskDescription: this.taskDescription,
          localTaskType: this.tasktype
        }
      },
  
      methods: {
  
        async uptadeTask(e) {
          e.preventDefault();
  
          const response = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`);
          const userData = await response.json();
  
  
          const updatedTask = {
            taskname: this.localTaskName,
            tasktype: this.localTaskType,
            taskDescription: this.localTaskDescription,
            id: this.taskID
          };
          userData.tasks = userData.tasks.filter(task => task.id !== this.taskID);
          userData.tasks.push(updatedTask);

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
  
          this.$emit('task-update');
          this.close();
        },

        filterOptions() {
          this.options = this.options.filter((option) => {
            return option.localeCompare(this.tasktype) !== 0;
          });
}
      },

      mounted() {
        this.filterOptions()
      }
  
    }
  </script>
  
  <style scoped>
  
  
  
    #todo {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.219); /* Fundo semi-transparente */
    backdrop-filter: blur(5px); /* Desfoque */
    z-index: 9999; /* Garante que o modal esteja sobreposto a outros elementos */
    display: flex;
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
  
  </style>
  