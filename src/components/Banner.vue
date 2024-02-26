<template>
    <div>
        <div id="banner">
        <h2 class="banner-msg fw-light">your to do</h2>
        <h2 class="banner-msg fw-bold fst-italic">LIST</h2>
        </div>
    </div>
  </template>
  
<script>
  
export default {
    name: "Banner"
}
  
</script>

<style scoped>

#banner{
  display: flex;
  width: 100vw;
  height: 300px;
  justify-content: center;
  align-items: center;
  background-color: #0d6efd;
  margin-top: 50px;
  margin-bottom: 15px;
}

.banner-msg {
  margin-right: 10px;
}

</style>
  
  