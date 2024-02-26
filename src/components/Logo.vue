<template>
    <div class="d-flex" id="logo-container">
          <img src="/img/generic.png" alt="logo" id="logo" class="">
          <router-link to="/" id="name">Todo List</router-link>
    </div>
</template>

<script>
    export default {
        name: "Logo"
    }

</script>

<style scoped>
    #logo-container {
    align-items: center;
    height: 80px;
  }



  #name {
    margin-top: 15px;
    margin-left: 15px;
    cursor: pointer;
    text-decoration: none;
    color: white;
    font-size: 1.3em;
    font-weight: bolder;
  }


  #logo {
    margin-top: 10px;
    width: 80px;
    float: inline-start;
    transition: 0.5s;
  }

  #logo:hover {
    width: 85px;
  }
</style>