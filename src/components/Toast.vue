<template>
  <div>
    <div :class="type">
      {{ msg }}
    </div>
  </div>
</template>

<script>

    export default {
        name: "Toast",

        props: {
          msg: String,
          type: String
        }
      }

</script>
