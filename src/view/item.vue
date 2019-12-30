<template>
  <div class="item">
    <!-- <div>
      icon
    </div> -->
    <div>
      {{item.icon}}{{ item.name }}
    </div>
    <div>
      amount: {{num(game.item[item.identify])}}
    </div>

    <div v-if="item.influence_msg" class="item-influence"
    v-tooltip.right="item.influence_msg">
      [Influence]
    </div>
    <div class="item-description">
      {{ item.description }}
    </div>
    <button v-for="action in item.actions" v-show="action.show"
    v-on:click="run_action(action)"
    class="item-action-btn button"
    v-tooltip.right="action.tooltip">
      {{ action.title }}
    </button>
  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style>
.item{
  margin: .5em;
  text-align: center;
  border-style: solid;
  border-width: 1px;
  border-color: #7690d8;
  border-radius: 12px;
  display: inline-block;
  width: 10em;
  max-width: calc(50vw - 2em);
  clear: left;
  vertical-align: top;
  min-height: 128px;
  padding: 6px 0;
}

.item-description{
  color: #888888;
  font-size: 14px;
  margin: 0 10px;
}

.item-action-btn{
  flex: 1;
  /* text-transform: capitalize; */
  word-break: break-word;
  display: flex;
  margin: 5px auto;
}

.item-influence{
  font-weight: bold;
}
</style>
