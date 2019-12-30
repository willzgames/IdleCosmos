import _ from 'lodash'
import Vue from 'vue'
import VTooltip from 'v-tooltip'
import './style.css'
import Icon from './icon.png';

import printMe from './print.js';
import App from './view/App.vue'
import item_component from './view/item.vue'
import tech_component from './view/tech.vue'
import bonus_component from './view/bonus.vue'

import {Decimal} from 'decimal.js'
import { Base64 } from 'js-base64';
const resources = require('./data/resources.json')
const technology = require('./data/technology.json')
const bonuses = require('./data/bonus.json')

//build version
const version = 4;

function getComponent() {
  var element = document.createElement('div');
  var btn = document.createElement('button');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  // 将图像添加到我们现有的 div。
  var myIcon = new Image();
  myIcon.src = Icon;
  element.appendChild(myIcon);


  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);


  return element;
}

//获取cookie、
function getCookie(name) {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return (arr[2]);
  else
    return null;
}

//设置cookie,增加到vue实例方便全局调用
function setCookie (c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
};

//删除cookie
function delCookie (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
   document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};

//item bonuses
var item_bonuses = {};

//处理原始数据
var items = [];
for(var i = 0; i < resources.length; i++){
  var item = resources[i];
  item.influence_final = {};
  // if(item.influence != undefined) {
  //   item.influence_msg = "Each one:<br/>"
  //   for(var k in item.influence){
  //     if(item_bonuses[k] == undefined)
  //       item.influence_msg += item.influence[k] + "×" + k.split(".")[1] + "/s<br/>";
  //   }
  // }
  for(var j = 0; j < item.actions.length; j++){
    // item.actions[j].show = eval(item.actions[j].requirement);
    var tooltip = 'Cost:<br/>';
    var nocost = true;
    for(var k in item.actions[j].cost){
      tooltip += item.actions[j].cost[k] + "×" + k.split(".")[1] + "<br/>";
      nocost = false;
    }
    if(nocost)
      tooltip += "nothing<br/>";
    tooltip += "Result:<br/>";
    for(var k in item.actions[j].result){
      tooltip += item.actions[j].result[k] + "×" + k.split(".")[1] + "<br/>";
    }
    item.actions[j].tooltip = tooltip;
  }
  items.push(item);
}

var techs = [];
for(var i = 0; i < technology.length; i++){
  var item = technology[i];

  var tooltip = 'Cost:<br/>';
  var nocost = true;
  for(var k in item.cost){
    tooltip += item.cost[k] + "×" + k.split(".")[1] + "<br/>";
    nocost = false;
  }
  if(nocost)
    tooltip += "nothing<br/>";
  item.tooltip = tooltip;

  techs.push(item);
}

//game data Object, save it to cookie
var game = null;
load_game();

function save_game(){
  setCookie('save', true, 365);
  // for(var i = 0; i < resources.length; i++){
  //   var id = resources[i].identify;
  //   setCookie(id + ".n", game.item[id].toString(), 365);
  //   if(game.unlocked[id])
  //     setCookie(id + ".u", true, 365);
  // }
  // for(var i = 0; i < technology.length; i++){
  //   var id = technology[i].identify;
  //   if(game.tunlocked[id])
  //     setCookie(id + ".tu", true, 365);
  //   if(game.research[id])
  //     setCookie(id + ".r", true, 365);
  // }

  var data=Base64.encode(JSON.stringify(game));
  setCookie('save_data', data, 365);
  console.log("saved");
}

function load_game(){
  var c = getCookie("save");
  game = {
    item: {},
    unlocked: {},
    hide: {},
    tunlocked: {},
    research: {},
    version: version,
  };
  if(!c) {
    for(var i = 0; i < resources.length; i++){
      var id = resources[i].identify;
      game.item[id] = new Decimal(0);
    }
    for(var i = 0; i < resources.length; i++){
      var id = resources[i].identify;
      game.unlocked[id] = eval(resources[i].unlock);
    }
    //initial setups
    game.item.cosmos = new Decimal(1);

    check_requirement();
    return;
  }

  // for(var i = 0; i < resources.length; i++){
  //   var id = resources[i].identify;
  //   var n = getCookie(id + ".n");
  //   game.item[id] = new Decimal(n?n:0);
  //   game.unlocked[id] = (getCookie(id + ".u") != null);
  // }
  //
  // for(var i = 0; i < technology.length; i++){
  //   var id = technology[i].identify;
  //   game.tunlocked[id] = (getCookie(id + ".tu") != null);
  //   game.research[id] = (getCookie(id + ".r") != null);
  // }
  var data = Base64.decode(unescape(getCookie('save_data')));
  game = JSON.parse(data);
  for(var i = 0; i < resources.length; i++){
    var id = resources[i].identify;
    game.item[id] = new Decimal(game.item[id]?game.item[id]:0);
  }

  //do migration here
  if(game.version == 0) {

  }

  if(!game.version || game.version < version) {
    game.version = version;
  }

  check_requirement();
}

function purge_game(){

}

function func_num(v0){
  var v;
  if(typeof v0.abs != "function")
    v = new Decimal(v0);
  else
    v = v0;
  if(v.abs().lessThan(1e5) && v.abs().gte(1e-2) || v.equals(0))
    return v.toFixed(2);
  else
    return v.toExponential(2);
}

function check_requirement(){
  //item unlock & action requirement
  for(var i = 0; i < items.length; i++){
    var item = items[i];
    if(!game.unlocked[item.identify])
      game.unlocked[item.identify] = eval(item.unlock);
    game.hide[item.identify] = eval(item.hide);
    for(var j = 0; j < item.actions.length; j++){
      item.actions[j].show = eval(item.actions[j].requirement);
    }
  }

  //tech unlock
  for(var i = 0; i < technology.length; i++){
    var id = technology[i].identify;
    game.tunlocked[id] = eval(technology[i].unlock);
  }

  //bonus requirement
  item_bonuses = {};
  for(var i = 0; i < bonuses.length; i++){
    var id = bonuses[i].identify;
    bonuses[i].unlock = eval(bonuses[i].require);
    for(var j = 0; j < bonuses[i].effect.length; j++){
      var e = bonuses[i].effect[j];
      var eid = e.item;
      if(bonuses[i].unlock) {
        if(e.sign == 1) {
          if(item_bonuses['item.'+eid+'+'] == undefined)
            item_bonuses['item.'+eid+'+'] = 0;
          item_bonuses['item.'+eid+'+'] += (e.type==1 ? e.ratio : -e.ratio);
        }
        else {
          if(item_bonuses['item.'+eid+'-'] == undefined)
            item_bonuses['item.'+eid+'-'] = 0;
            item_bonuses['item.'+eid+'-'] += (e.type==1 ? -e.ratio : e.ratio);
        }
      }
    }
  }

  for(var i = 0; i < items.length; i++) {
    var item = items[i];
    if(item.influence != undefined) {
      item.influence_msg = "Each one:<br/>"
      for(var k in item.influence){
        var v = item.influence[k];
        item.influence_final[k] = v;
        if(v > 0) {
          if(item_bonuses[k+'+'] == undefined)
            item.influence_msg += func_num(item.influence[k]) + "×" + k.split(".")[1] + "/s<br/>";
          else {
            v *= 1 + item_bonuses[k+'+'];
            item.influence_final[k] = v;
            item.influence_msg += func_num(item.influence_final[k]) + "×" + k.split(".")[1] + "/s<br/>";
          }
        } else {
          if(item_bonuses[k+'-'] == undefined)
            item.influence_msg += func_num(item.influence[k]) + "×" + k.split(".")[1] + "/s<br/>";
          else {
            v *= 1 + item_bonuses[k+'-'];
            item.influence_final[k] = v;
            item.influence_msg += func_num(item.influence_final[k]) + "×" + k.split(".")[1] + "/s<br/>";
          }
        }

      }
    }
  }
}

Vue.component('pager', {
  computed: {
    ViewComponent () {
      return '<p>test</p>';
    }
  }
})

var data = {
  game: game,
  version: version,
  time: new Decimal(0),
  items: items,
  techs: techs,
  bonuses: bonuses,
  msg: 'This is a button.',
  item_component: item_component,
  tech_component: tech_component,
  bonus_component: bonus_component
}

Vue.use(VTooltip)

var res_inc = function(r, n){
  eval("game." + r + " = game." + r + ".plus(n)");
};
var res_dec = function(r, n){
  eval("game." + r + " = game." + r + ".sub(n)");
};

var res_add_safe = function(r, n){
  if(eval("game." + r + ".plus(n) < " + 0))
    return false;
  res_inc(r, n);
  return true;
}

var res_add_force = function(r, n){
  if(eval("game." + r + ".plus(n) < " + 0)) {
    var zero = new Decimal(0)
    eval("game." + r + " = zero");
  }
  else
  res_inc(r, n);
}

Vue.mixin({
  data: function(){
    return data
  },
  methods: {
    num: func_num,
    res_inc: res_inc,
    res_dec: res_dec,
    save_game: save_game,
    run_action: function(a){
      if(!eval(a.requirement))
        return;
      //check costs
      var f = false;
      for(var k in a.cost){
        if(eval("game." + k + " < " + a.cost[k]))
        {
          f = true;
          break;
        }
      }

      if(f) {
        // not enough return
        return;
      }
      for(var k in a.cost){
        res_dec(k, a.cost[k]);
      }
      for(var k in a.result){
        res_inc(k, a.result[k]);
      }
    },
    run_research: function(a){
      if(!eval(a.unlock))
        return;
      //check costs
      var f = false;
      for(var k in a.cost){
        if(eval("game." + k + " < " + a.cost[k]))
        {
          f = true;
          break;
        }
      }
      if(f) {
        // not enough return
        return;
      }
      for(var k in a.cost){
        res_dec(k, a.cost[k]);
      }
      game.research[a.identify] = true;
    }
  }
})

function getMousePos(event) {
    var e = event || window.event;
    return { "x": e.clientX, "y": e.clientY };
}

document.write('<div id="page-container">{{test}}<pager/></div>');
var vm = new Vue({
  el: '#page-container',
  render: r => r(App),
});

window.setInterval(( () => {
  //game tick
  data.time = data.time.plus(0.05);

  //run influences, bonus affect this procedure
  for(var i = 0; i < items.length; i++) {
    var item = items[i];
    var id = item.identify;
    if(item.influence != undefined && game.item[id] > 0) {
      for(var k in item.influence){
        res_add_force(k, game.item[id].mul(item.influence_final[k] * 0.05));
      }
    }
  }
} ), 50);

window.setInterval(( () => {
  //requirement check
  // items requirement unlocks them permenent
  // action should always check
  check_requirement();
} ), 500);

window.setInterval(( () => {
  //save game
  save_game();
} ), 30 * 1000);
