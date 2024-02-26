<template>
    <div id="todo-page" class="d-flex mb-3">
        <span class="arrow input-group-text" id="icon" @click="backToPreviousPage">
            <font-awesome-icon icon="fa-solid fa-arrow-left" />
        </span>
      <div id="tasks-box">
        <div v-for="task in tasks" class="task-box" @click="toggleExpand" >
          <TaskInfo :taskname="task.taskname" :tasktype="task.tasktype" :taskDescription="task.taskDescription" :icon="defineIcon(task.expanded)" :expanded="task.expanded /*nao entendi como isso funciona, não entendi como a propriedade expanded é passada pro obejto task*/" :taskID="task.id" @toggle-expand="toggleExpand(task)" @task-update="getTasks"/>
        </div>
      </div>
    </div>
    
  </template>
  
  <script>
  import TaskInfo from '../components/TaskInfo.vue'
  
    export default {
      name: "HistoryView",
  
      data() {
        return {
          task: null,
          tasks: null,
          expanded: false,
          chevronDown: "fa-solid fa-chevron-down",
          chevronUp: "fa-solid fa-chevron-up",
        }
      },
  
      components: {
        TaskInfo
      },
  
      computed: {
      reversedTasks() {
        return this.tasks.slice().reverse();
      }
    },
  
      methods: {

        backToPreviousPage() {
            this.$router.push('/todo')
        },
  

        toggleExpand(task) {
          task.expanded = !task.expanded
        },

        defineIcon(condition) {
          if (condition) {
            return this.chevronUp
          } else {
            return this.chevronDown;
          }
        },
  
        async getTasks() {
          const req = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`);
          const res = await req.json();
          this.tasks = res.completedTasks.slice().reverse()
        },
        
    },
  
    mounted() {
      this.getTasks();
    }
  }
  
  </script>
  
  <style scoped>
  
    .arrow {
      position: absolute;
      top: 0%;
      left: 0%;
      width: 45px;
      height: 40px;
      font-size: 1.2em;
      border-top-left-radius: 0px;
      border: none;
      background-color: #31373d;
      cursor: pointer;
      transition: 0.3s;
    }

    .arrow:hover {
        background-color: #4f5963;
        font-size: 0.9em;
    }
  
    #todo-page {
      width: 100vw;
      height: fit-content;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  

    #tasks-box {
        margin-top: 100px;
        max-width: 400px;
        height: fit-content;
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #31373d;
        border-radius: 15px;
    }
  
  
    </style>