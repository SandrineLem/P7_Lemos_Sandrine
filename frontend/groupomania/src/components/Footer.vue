<template>
    <footer id="Footer">
    <img  class="footer_img" src="../assets/icon-left-font-monochrome-black.png" alt="">
    </footer>
</template>
<script>

export default {
  name: 'Footer',
  props: {
    msg: String
  }
}
</script>


<style scoped>
#Footer{
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>