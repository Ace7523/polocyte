<template>
  <div class="article">
    
    <div class="" style="margin-top:40px">
      <h4>这是nstest页</h4>
      <div>{{nstest}}</div>
      <div>---------------------------------------------------------------------------------------------------</div>
      <div>allstates</div>
      <div>{{allstates}}</div>
      <div>---------------------------------------------------------------------------------------------------</div>
      <div v-for="(resultItem,index) in nstest.result" :key="index">
        <p>{{resultItem.state}}</p>
        <p>{{resultItem.klass}}</p>
        <div v-for="(item,index2) in resultItem.imageList" :key="index2">
          <img :src="item" alt="" style="width:350px">
        </div>
      </div>
      <div>---------------------------------------------------------------------------------------------------</div>
      <div>
        <h3>所有state</h3>
        <div v-for="(item,index) in allstates.states" :key="index">
          <router-link :to="{name:'nstest',params:{change:item.tag}}">{{item.tag}} ({{item.count}})</router-link>
        </div>
        <h3>所有klass</h3>
        <div v-for="(item,index) in allstates.klasses" :key="index">
          {{item.tag}}
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
    },
    allstates(){
      return this.$store.state.allstates
    }
  },
  methods: {
    
    del () {
     
    },
  }
}
</script>