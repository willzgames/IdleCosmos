<template>
  <div>
    <div style="display:none">
      {{time}}
    </div>
    <p>
      <span style="color: green;">Green</span> means good, <span style="color: red;">Red</span> means bad.
    </p>
    <div class="item-holder">
      <component
      v-for="item in bonuses"
      v-if="item.unlock"
      v-bind:is="bonus_component"
      v-bind:item="item"></component>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
