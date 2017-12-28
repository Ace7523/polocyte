<template>
  <div class="article">
    
    <div class="" style="margin-top:40px">
      <h4>这是nstest页</h4>
      <div>{{nstest}}</div>
      <div>---------------------------------------------------------------------------------------------------</div>
      <div v-for="(resultItem,index) in nstest.result" :key="index">
        <div v-for="(item,index2) in resultItem.imageList" :key="index2">
          <img :src="item" alt="" style="width:350px">
        </div>
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