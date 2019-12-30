<template>
  <div class="game-container">
    <button
      v-for="tab in tabs"
      v-bind:key="tab.name"
      v-bind:class="['tab-button', { active: currentTab.name === tab.name }]"
      v-on:click="currentTab = tab"
    >{{ tab.name }}</button>
    <keep-alive>
      <component
        v-bind:is="currentTab.component"
        class="tab"
      ></component>
    </keep-alive>
  </div>
</template>

<script>
import home from './home.vue'
import guide from './guide.vue'
import research from './research.vue'
import bonus from './bonuses.vue'
import options from './options.vue'

var tabs = [
  {
    name: 'Home',
    component: home
  },
  {
    name: 'Research',
    component: research
  },
  {
    name: 'Bonus',
    component: bonus
  },
  {
    name: 'Guide',
    component: guide
  },
  {
    name: 'Options',
    component: options
  }
]
export default {
  data () {
    return {
    	tabs: tabs,
      currentTab: tabs[0]
    }
  }
}
</script>

<style>

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #7690d8;
  margin-bottom: -1px;
  margin-right: -1px;
  outline: none;
}
.tab-button:hover {
  background: #5a78cc;
}
.tab-button.active {
  background: #5a78cc;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
