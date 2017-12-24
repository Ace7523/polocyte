<template>
  <div class="article">
    
    <div class="" style="margin-top:40px">
      <h4>这是nstest页</h4>
      <div>{{nstest}}</div>
      <div v-for="(item,index) in nstest.result" :key="index">
        <img :src="item.imageUrl" alt="" style="width:350px">
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'nstest',
  components: {
    
  },
  data(){
    return{
      
    }
  },
  computed: {
    nstest () {
      return this.$store.state.nstest
    }
  },
  methods: {
    
    del () {
     
    },
  }
}
</script>