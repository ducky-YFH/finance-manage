<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'

export default {
  name: 'App',
  methods: {
    getToken () {
      const token = localStorage.getItem('dhsToken')
      const decode = jwt_decode(token)
      // 将解释到的token存到vuex
      this.$store.dispatch('setCheckout', !this.isEmpty(decode))
      this.$store.dispatch('setUser', decode)
    },
    isEmpty (value) {
      return (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trim().length === 0)
      )
    }
  },
  created () {
    this.getToken()
  }
}
</script>

<style lang="scss" scoped>
#app{
  width: 100%;
  height: 100%;
}
</style>
