<template>
  <div class="item">
    <!-- <div>
      icon
    </div> -->
    <div style="font-weight: bold;">
      {{item.icon}}{{ item.name }}
    </div>
    <div class="item-description">
      <p v-for="effect in item.effect">
        <span style="color: green;" v-if="effect.type==1 && effect.sign==1">{{effect.item + ' increase growth ' + (effect.ratio * 100) + '%'}}</span>
        <span style="color: green;" v-if="effect.type==1 && effect.sign==0">{{effect.item + ' reduce attenuation ' + (effect.ratio * 100) + '%'}}</span>
        <span style="color: red;" v-if="effect.type==0">{{effect.item + ' ' + (effect.ratio * 100) + '%'}}</span>
      </p>
    </div>
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

.item-infuluence{
  font-weight: bold;
}
</style>
