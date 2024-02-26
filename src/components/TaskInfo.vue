<template>
    <ConfirmationModal :cancel="toggleConfirmation" :continue="continueAction" v-if="confirmation" @delete-action="deleteTask"/>
    <div class="task-box" @click="toggleExpand">
        <div class="task-data-box">
            <h1 class="fs-5">{{ taskname }}</h1>
            <h2>{{ tasktype }}</h2>
            <p>{{ taskDescription }}</p>
            <div class="dropdown" v-show="expanded">
                <div class="op-container">
                    <span class="input-group-text" id="cancel-icon" @click="toggleConfirmation">
                        <font-awesome-icon icon="fa-solid fa-ban" />
                    </span>
                    <p class="op-text">delete</p>
                </div>
            </div>
        </div>
        <h3><font-awesome-icon :icon="icon" id="chevron"/></h3>
    </div>

</template>

<script>
import ConfirmationModal from './ConfirmationModal.vue';

    export default {
        name: "TaskInfo",

        props: {
            taskname: String,
            tasktype: String,
            taskDescription: String,
            icon: String,
            expanded: Boolean,
            taskID: Number
        },

        data() {
            return {    
                editVisibility: false,
                confirmation: false,
                continueAction: "delete"
            }
        },

        components: {
            ConfirmationModal
        },

        methods: {

            toggleExpand() {
                this.$emit("toggle-expand");
            },

            toggleConfirmation(){
                this.confirmation = !this.confirmation
            },

            taskUpdate() {
                this.$emit('task-update');
            },

            async getUserData() {
                const getReq = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`);
                const userData = await getReq.json();
                return userData;
            },

            async deleteTask() {

                const userData = await this.getUserData();
                userData.completedTasks = userData.completedTasks.filter(task => task.id !== this.taskID);
                const userDataJson = JSON.stringify(userData);
                const postReq = await fetch(`http://localhost:3000/users/${this.$store.state.userID}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: userDataJson
                });
            
                const responseData = await postReq.json()
                console.log(responseData)

                this.toggleConfirmation()
                this.taskUpdate()

            }
        }
    }
</script>

<style scoped>

.task-box {
    display: flex;
    width: 400px;
    border-bottom: solid #363b42a1 1px;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.185);
    border-radius: 15px;

  }


  .task-box:hover {
    background-color: #2a2e33;
  }
  .task-box:hover #chevron {
    font-size: 0.7em;
    color: rgb(151, 151, 151);
  }

  .task-data-box {
    width: 360px;
    display: flex;
    flex-direction: column;
    align-self: center;
    transition: 0.3s;
    cursor: pointer;
  }


  #chevron {
    width: 40px;
    border-radius: 0;
    border: none;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 70px;
    font-size: 0.9em;
  }


  h1 {
    margin-top: 15px;
    margin-left: 20px;
    text-transform: capitalize;
    font-weight: bold;
  }

  h2 {
    font-size: 0.9em;
    font-weight: bold;
    margin-left: 30px;
    text-transform: capitalize;
  }

  p {
    margin-left: 30px;
    text-transform: capitalize;
    font-size: 0.8em;
  }

  .dropdown {
    display: flex;
    justify-content: space-between;
  
}

 .input-group-text {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    font-size: 0.9em;
    margin-left: 40px;
    margin-top: 10px;
    margin-bottom: 8px;
    border: none;
 }

 
 .input-group-text#cancel-icon {
    background-color: rgb(204, 0, 0);
    transition: 0.2s;
 }

 .input-group-text#cancel-icon:hover {
    background-color: rgb(158, 0, 0);
    font-size: 0.7em;
    width: 38px;
    height: 25px;
 }

 .op-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 70px;
 }

 .op-text {
    margin-bottom: 15px;
    font-size: 0.65em;
    font-weight: bold;
    margin-left: 38px;
    transition: 0.3s;

 }


</style>