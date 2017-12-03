<template>
  <div class="photolist-container">
    <div class="content">
        <div class="item">
          <div class="photoitem1">

          </div>
        </div>
        <div class="for-center"></div>
        <div class="item">
          <div class="photoitem2">

          </div>
        </div>
        <div class="for-center"></div>
        <div class="item">
          <div class="photoitem3">

          </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhotoList',
  computed: {
    
  }
}
</script>
<style>
.photoitem1{
  background: url(../../../public/photoList/01.jpg);
}
.photoitem2{
  background: url(../../../public/photoList/02.jpg);
}
.photoitem3{
  background: url(../../../public/photoList/03.jpg);
}
</style>
