<template>
  <div>

    <nav class="navbar bg-body-tertiary">
      <form class="container-fluid d-flex mb-3">
        <Logo class="me-auto p-2"/>
        <button class="btn btn-outline-success me-2 " id="signin" type="button"><router-link to="/signin" class="router">Sign-in</router-link></button>
        <button class="btn btn-sm btn-outline-secondary" id="login" type="button"><router-link to="/login" class="router">Log-in</router-link></button>
      </form>
    </nav>
    <div id="page">
      <h1 class="font-custom">Login or Create an account</h1>
      <Banner />
      <h2 class="font-custom">YOUR ADVANTAGES USING TODO LIST</h2>
      <div id="advantages-container">
        <p id="advantages">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio dicta laboriosam error numquam dolorum nisi incidunt? Quasi soluta dolores sapiente cumque ab repellat est nobis! Doloremque porro suscipit quo dolor? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam sapiente, provident ratione ducimus deleniti qui earum maxime repellendus quod quasi ea vel explicabo delectus possimus cumque laboriosam. Temporibus, unde veniam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam modi eum, quasi voluptatibus perferendis corporis totam libero blanditiis perspiciatis eaque animi molerum! Natus?</p>
      </div>
    </div>
  </div>
</template>


<script>
  import Banner from '../components/Banner.vue';
  import Logo from '../components/Logo.vue';
  export default {
      name: "HomeView",

      components: {
        Banner,
        Logo
      }
  }
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');


  #page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

.font-custom {
    font-family: "Open Sans";
    margin-top: 30px;
    text-align: center;
    font-weight: bold;
  }

  #login {
    height: 40px;
    width: 80px;
    font-size: 1em;
  }
  #signin {
    height: 45px;
    width: 100px;
    font-size: 1.1em;
  }


  .router {
    text-decoration: none;
    color: white;
    transition: 0.3s;
  }

  .router:hover {
    font-size: 1.1em;
    color: rgb(193, 241, 255);
  }

  .navbar {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  #advantages-container {
    margin-top: 15px;
    padding: 25px;
    border-radius: 15px;
    background-color: rgb(45, 48, 48);
    width: 70vw;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  #advantages {
    font-weight: 500;
    font-size: 0.9em;
  }

</style>