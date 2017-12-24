<template>
  <div class="login">
    <h4 class="title">获取全部图片</h4>
    <div class="form">
      <button type="button" @click="login">点击</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      user: '',
      pass: ''
    }
  },
  methods: {
    login () {
      this.axios.get('/getimages').then((result) => {
        if (result.data.code === 200) {
          alert(1);
          console.log(result)
        } else {
          this.$toast(result.data.message)
        }
      })
    }
  }
}
</script>