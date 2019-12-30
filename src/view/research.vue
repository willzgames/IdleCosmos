<template>
  <div>
    <div style="display:none">
      {{time}}
    </div>
    <p>
      Research({{Object.keys(game.research).length}}/{{techs.length-1}})
    </p>
    <div class="item-holder">
      <component
      v-for="item in techs"
      v-if="game.tunlocked[item.identify] && !game.research[item.identify]"
      v-bind:is="tech_component"
      v-bind:item="item"></component>
    </div>
  </div>
</template>

<script>
</script>

<style>
</style>
