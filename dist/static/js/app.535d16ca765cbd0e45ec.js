webpackJsonp([1],{NHnr:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var s=e("KQ6f");window.log=console.log;var n={name:"perCard",props:["cardid","status","keyid","backing","completed","turn"],data:function(){return{active:1,angle:"180deg",cardSrc:"https://pic.ggemo.com/picgo/fanpai-card-back-trans.png",transing:!1,completedCover:0}},model:{prop:"status",event:"change"},created:function(){window.touch?this.c=this.ct:this.c=this.cm;this.keyid,this.keyid;this.show()},watch:{completed:function(t,i){var e=this;setTimeout(function(){e.completedCover=t},250)},turn:function(t,i){this.show()}},methods:{show:function(){var t=this;this.trans2Card(),setTimeout(function(){t.trans2Back(),setTimeout(function(){t.active=1},220)},1200)},trans2Back:function(){var t=this;this.transing||(this.transing=!0,this.angle="90deg",setTimeout(function(){t.cardSrc="https://pic.ggemo.com/picgo/fanpai-card-back-trans.png",t.angle="180deg",t.transing=!1,t.$emit("change",0)},220))},trans2Card:function(){var t=this;this.transing||(this.transing=!0,this.angle="90deg",setTimeout(function(){t.cardSrc="https://pic.ggemo.com/picgo/fanpai-card-"+t.cardid+".png",t.angle="0deg",t.transing=!1,t.$emit("change",1)},220))},ct:function(t){t.preventDefault(),this.active&&(this.transing||this.backing||"0deg"!==this.angle&&(this.trans2Card(),this.$emit("fanpaie",this.keyid)))},cm:function(t){this.active&&(this.transing||this.backing||"0deg"!==this.angle&&(this.trans2Card(),this.$emit("fanpaie",this.keyid)))},c:function(){}}},a={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"perCard",style:"transform:rotateY("+this.angle+")",on:{touchstart:this.c,mousedown:this.c}},[i("div",{staticClass:"perCardIn",style:"background-image:url('"+this.cardSrc+"')"},[i("img",{directives:[{name:"show",rawName:"v-show",value:this.completedCover,expression:"completedCover"}],attrs:{src:"https://pic.ggemo.com/picgo/blhx-fanpai-match.png",alt:""}})])])},staticRenderFns:[]};var r={name:"App",data:function(){return{status:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],has1:!1,processing:[],completed:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],backing:0,allCompleted:0,turn:0,timeCount:0,started:0,startTime:0,gameTimeCount:0,bestTime:0}},created:function(){var t=this,i=window.localStorage.getItem("bestTime");this.bestTime=i?parseInt(i):0,this.init(),setInterval(function(){t.timeCount+=113,t.started&&(t.gameTimeCount=t.timeCount-t.startTime)},113)},filters:{parseTime:function(t){var i=t/1e3>>0,e=i/60>>0,s=t%1e3;return s=s/10>>0,(i%=60)<10&&(i="0"+i.toString()),s<10&&(s="0"+s.toString()),e<10&&(e="0"+e.toString()),e+"'"+i+"'"+s}},methods:{init:function(){var t=[0,1,2,3,4,5,6,7,8,0,1,2,3,4,5,6,7,8];t.sort(function(){return.5-Math.random()}),this.cardids=t,this.status=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.has1=!1,this.processing=[],this.completed=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],this.backing=0,this.allCompleted=0,this.turn+=1,this.started=0,this.gameTimeCount=0},fanpai:function(t){var i=this;if(0===this.processing.length)this.started||(this.started=1,this.startTime=this.timeCount),this.processing.push(t);else if(1===this.processing.length){var e=this.processing[0];this.cardids[e]===this.cardids[t]?(this.completed[e]=1,this.completed[t]=1,-1===this.completed.indexOf(0)&&(this.allCompleted=1,this.started=0,(!this.bestTime||this.gameTimeCount<this.bestTime)&&(this.bestTime=this.gameTimeCount,window.localStorage.setItem("bestTime",this.bestTime.toString())))):(this.backing=1,setTimeout(function(){i.$refs["perCard"+e][0].trans2Back(),i.$refs["perCard"+t][0].trans2Back(),setTimeout(function(){i.backing=0},300)},800)),this.processing=[]}}},components:{perCard:e("C7Lr")(n,a,!1,function(t){e("OdHi")},null,null).exports}},c={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{attrs:{id:"app"}},[e("div",{staticClass:"t",attrs:{id:"jishi"}},[t._v(t._s(t._f("parseTime")(t.gameTimeCount)))]),t._v(" "),e("div",{staticClass:"t",attrs:{id:"bestTime"}},[t._v(t._s(t._f("parseTime")(t.bestTime)))]),t._v(" "),e("div",{attrs:{id:"restartButton"},on:{click:t.init}},[t._v("点此"),e("br"),t._v("重开")]),t._v(" "),t._l(9,function(t){return e("img",{key:"preload"+t,staticStyle:{opacity:"0.01","margin-top":"-1000px",float:"left"},attrs:{src:"https://pic.ggemo.com/picgo/fanpai-card-"+(t-1)+".png"}})}),t._v(" "),e("div",{attrs:{id:"gameContainer"}},t._l(18,function(i){return e("perCard",{key:i,ref:"perCard"+(i-1),refInFor:!0,attrs:{backing:t.backing,keyid:i-1,cardid:t.cardids[i-1],completed:t.completed[i-1],turn:t.turn},on:{fanpaie:t.fanpai},model:{value:t.status[i-1],callback:function(e){t.$set(t.status,i-1,e)},expression:"status[i - 1]"}})}),1)],2)},staticRenderFns:[]};var o=e("C7Lr")(r,c,!1,function(t){e("Uggj")},null,null).exports;s.a.config.productionTip=!1,new s.a({el:"#app",components:{App:o},template:"<App/>"})},OdHi:function(t,i){},Uggj:function(t,i){}},["NHnr"]);
//# sourceMappingURL=app.535d16ca765cbd0e45ec.js.map