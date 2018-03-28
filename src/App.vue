<template>
  <div id="app">
    <date-picker
      min-year="2012"
      min-month="4"
      max-year="2018"
      max-month="01"
      :select-month="selectMonth"></date-picker>
  </div>
</template>

<script>
import datePicker from '@/components/datePicker';
import '@/sass/datePicker.scss';

export default {
  name: 'app',
  components: {
    datePicker
  },
  data () {
    return {
    }
  },
  methods: {
    selectMonth (val) {
      console.log('你选择了' + val.year + '年' + val.month + '月');
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
}

h1, h2 {
  font-weight: normal;
}
</style>
