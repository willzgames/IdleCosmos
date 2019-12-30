<template>
  <div class="posts-tab">
    <ul class="posts-sidebar">
      <li
        v-for="post in posts"
        v-bind:key="post.id"
        v-bind:class="{ selected: post === selectedPost }"
				v-on:click="selectedPost = post"
      >
        {{ post.title }}
      </li>
    </ul>
    <div class="selected-post-container">
    	<div
      	v-if="selectedPost"
        class="selected-post"
      >
        <h3>{{ selectedPost.title }}</h3>
        <div v-html="selectedPost.content"></div>
      </div>
      <strong v-else>
        Click on a blog title to the left to view it.
      </strong>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      posts: [
        {
        	id: 1,
          title: 'About this game',
          content: '<p>Get resources, build your factories, automate them. Expend your base, explore the cosmos.</p><p>Current version there isn\'t much gameplay, in the future version more detail tech-line will be shown.</p><p>I\'m still developing, current job is to add technology-trees and add some machines.</p><p>If you want to repeat any button, you can just click the button and hold Enter, which will save your finger.</p>'
        },
        {
        	id: 2,
          title: 'What should I do',
          content: '<p>Click buttons to play.</p>'
        },
        {
        	id: 3,
          title: 'FAQ',
          content: '<p>I don\'t know what the tutorial told mean? Sorry for my pool expression, some text will make you confused. But the tutorial and story really unlock things. Item and technologies are main game play in current version.</p>'
        },
        {
        	id: 4,
          title: 'Changelog',
          content: 'b4:<br/>Add bonus feature and few related technologies<br/>b3:<br/>Add knowledge related features.<br/>Change some style and color.<br/>Fix a bug when research didn\'t show.'
        }
      ],
      selectedPost: null,
    }
  }
}
</script>

<style>
.posts-tab {
  display: flex;
}
.posts-sidebar {
  max-width: 40vw;
  margin: 0;
  padding: 0 10px 0 0;
  list-style-type: none;
  border-right: 1px solid #ccc;
}
.posts-sidebar li {
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
}
.posts-sidebar li:hover {
  background: #eee;
}
.posts-sidebar li.selected {
  background: lightblue;
}
.selected-post-container {
  padding-left: 10px;
}
.selected-post > :first-child {
  margin-top: 0;
  padding-top: 0;
}
</style>
