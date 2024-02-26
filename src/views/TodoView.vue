<template>
  <div id="todo-page" class="d-flex mb-3 align-items-center">
    <Menu class="menu"/>
    <TaskForm :close="addTaskModalVisibility" v-if="addTaskModal" @task-added="getTasks"/>
    <Filter :request="requestHTTP" :close="filterModalVisibility" v-if="filterModal" @update-parent-variable="addFilter" @filter-added="getTasks" @no-filter="noFilterToastSettings"/>
    <div id="method-box">
      <button type="button" class="btn btn-success fs-6 fw-bold" @click="addTaskModalVisibility">Add a new task</button>
      <span class="input-group-text" id="filter-icon" @click="filterModalVisibility">
        <font-awesome-icon icon="fa-solid fa-filter" />
      </span>
    </div>
    <div id="tasks-box">
      <div v-for="task in tasks" :key="task.index" class="task-box" @click="toggleExpand" >
        <Task :taskname="task.taskname" :tasktype="task.tasktype" :taskDescription="task.taskDescription" :icon="defineIcon(task.expanded)" :expanded="task.expanded /*nao entendi como isso funciona, não entendi como a propriedade expanded é passada pro obejto task*/" :taskID="task.id" @toggle-expand="toggleExpand(task)" @task-update="getTasks" />
      </div>
    </div>
    <Toast :msg="noFilterToastMessage" :type="noFilterToastType" v-if="noFilterToast" id="toast"/>
  </div>
  
</template>

<script>
import TaskForm from '../components/TaskForm.vue'
import Filter from '../components/Filter.vue'
import Task from '../components/Task.vue'
import TaskFormEdit from '../components/TaskFormEdit.vue';
import Menu from '../components/Menu.vue'
import Toast from '@/components/Toast.vue';

  export default {
    name: "TodoView",

    data() {
      return {
        addTaskModal: false,
        filterModal: false,
        task: null,
        tasks: null,
        expanded: false,
        filter: false,
        noFilterToastMessage: null,
        noFilterToastType: null,
        noFilterToast: false,
        chevronDown: "fa-solid fa-chevron-down",
        chevronUp: "fa-solid fa-chevron-up",
        newValue: null
      }
    },

    components: {
      TaskForm,
      Task,
      Filter,
      TaskFormEdit,
      Menu, 
      Toast
    },

    methods: {

      /*changeRequest(newValue) {
        this.requestHTTP = newValue
      },*/ //esta retornando not found

      toggleExpand(task) {
        task.expanded = !task.expanded
      },

      addTaskModalVisibility() {
        this.addTaskModal = !this.addTaskModal;
      },

      filterModalVisibility() {
        this.filterModal = !this.filterModal;
      },

      noFilterToastSettings(msg, type) {
        this.noFilterToast = !this.noFilterToast;
        this.noFilterToastMessage = msg;
        this.noFilterToastType = type;

        setTimeout(() => {
          const element = document.getElementById('toast');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'end' });
          }
        }, 100);
        setTimeout(() => {
          this.noFilterToast = !this.noFilterToast; 
        }, 3000);
      },




      defineIcon(condition) {
        if (condition) {
          return this.chevronUp
        } else {
          return this.chevronDown;
        }
      },

      addFilter(newValue, isFiltering) {
        if (isFiltering) {
          this.filter = true
          this.newValue = newValue
        } else {
          this.filter = false
        }
      },

      async getTasks() {
        if (!this.filter){
          const req = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`);
          const res = await req.json();
          this.tasks = res.tasks.slice().reverse()
        } else {
          this.tasks = this.newValue.slice().reverse()
        }
      },
      
  },

  mounted() {
    this.getTasks();
  }
}

</script>

<style scoped>

  .menu {
    position: absolute;
    top: 0%;
    left: 0%;
  }

  #todo-page {
    width: 100vw;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #method-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 400px;
    margin-top: 100px;
    margin-bottom: 25px;
    height: 100px;
    background-color: #31373d;
    border-radius: 10px;
  }

  .btn {
    width: 280px;
    height: 60px;

  }

  #filter-icon {
    margin-left: 20px;
    width: 60px;
    font-size: 1.1em;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    background-color: rgb(255, 174, 0);
    transition: 0.2s;
    height: 60px;
  }

  #filter-icon:hover {
    cursor: pointer;
    background-color: rgb(163, 112, 0);
  }


  #tasks-box {
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

  #toast {
    width: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }


  </style>