<template>
    <div id="filter">
      <form class="form-box">
        <span class="input-group-text" id="close" @click="close">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </span>
        <h1 class="fw-bold">Filter your tasks</h1>
        <div class="form-floating">
          <select class="form-select border border-0" id="taskType" aria-label="Floating label disabled select example" style="height: 70px" v-model:="taskType">
            <option style="font-size: 0.9em; font-weight: bolder;" disabled>What kind of your task is</option>
            <option :value="null" selected>All</option>
            <option v-for="option in options" :value="option">{{ option }} </option>
          </select>
          <label for="floatingSelectDisabled">Task Type</label>
          <button type="submit" class="btn btn-primary fw-bold fs-5" @click="updateParentVariable">filter</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>

    export default {
      name: "Filter",
      props: {
        close: Function,
        request: String
      },
  
      data() {
        return {
          taskType: null,
          option: null,
          options: ["Work", "Studies", "Personal"],
          toastType: "alert alert-warning",
          msg: "Filter is not working right now :/"
        }
      },
  
      methods: {
        async updateParentVariable(e) {
          e.preventDefault();
          let isFiltering = true
          let newValue = ""
          if (this.taskType !== null){
              const userData = await this.getUserData();
              newValue = userData.tasks.filter((task) => {
                if (task.tasktype.localeCompare(this.taskType) === 0) {
                  console.log(task)
                  return task
                }
              })
              if (newValue.length > 0) {
                this.$emit('update-parent-variable', newValue, isFiltering);
              } else {
                isFiltering = false
                const msg = `Seems like there is no ${this.taskType} tasks`
                const type = `alert alert-warning`
                this.$emit('update-parent-variable', newValue, isFiltering);
                this.$emit('no-filter', msg, type)
              }
          } else {
              isFiltering = false
              this.$emit('update-parent-variable', newValue, isFiltering);
          }

          this.$emit('filter-added');
          this.close();
        },
        async getUserData() {
                const getReq = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`);
                const userData = await getReq.json();
                return userData;
            },
      },
  
    }
  </script>
  
  <style scoped>
  
  
  
    #filter {
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

      .form-select {
        cursor: pointer;
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
  