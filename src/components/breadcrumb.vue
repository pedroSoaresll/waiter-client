<template>
  <ul class="font-size-md font-weight-bold pl-0 menu">
    <li v-for="(crumbs, index) of breadcrumbs" :key="crumbs.routerName"
        :class="{'active': breadcrumbs.length === index + 1}">
      <router-link :to="{ name: crumbs.routerName, params: crumbs.params }"
                   class="orange--text menu-link">
        {{ crumbs.name }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'breadcrumb',
  computed: {
    breadcrumbs() {
      return this.$store.getters['breadcrumb/items'];
    },
  },
};
</script>

<style lang="sass" scoped>
  .menu
    display: flex
    list-style: none

    li
      position: relative
      margin-right: 15px
      text-transform: capitalize

      &.active
        opacity: .6

      &:not(:last-child):after
        text-transform: none
        font-family: 'Material Icons', sans-serif
        content: 'chevron_right'
        width: 20px
        height: 20px
        position: absolute
        top: 0
        right: -20px
        color: #000
  
    .menu-link
      text-decoration: none
</style>
