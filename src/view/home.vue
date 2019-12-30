<template>
  <div>
    <div style="display:none">
      {{time}}
    </div>
    <div class="item-holder">
      <component
      v-for="item in items"
      v-if="game.unlocked[item.identify] && !game.hide[item.identify]"
      v-bind:is="item_component"
      v-bind:item="item"></component>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
