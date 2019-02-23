<template>
    <div id="app">
        <div id="jishi" class="t">{{gameTimeCount|parseTime}}</div>
        <div id="bestTime" class="t">{{bestTime|parseTime}}</div>
        <div id="restartButton" @click="init">点此<br>重开</div>
        <img v-for="cardid in 9" :src="`https://pic.ggemo.com/picgo/fanpai-card-${cardid - 1}.png`" :key="`preload${cardid}`" style="opacity: 0.01;margin-top: -1000px;float: left" />
        <!--<perCard cardid="1" v-model="status[0]"></perCard>-->
        <div id="gameContainer">
            <perCard
                :backing="backing"
                @fanpaie="fanpai"
                v-for="i in 18"
                :keyid="i - 1"
                :cardid="cardids[i - 1]"
                :completed="completed[i - 1]"
                v-model="status[i - 1]"
                :ref="`perCard${i - 1}`"
                :key="i"
                :turn ="turn"
            ></perCard>
        </div>
        <div id="oath">
            <a href="https://blog.purecucumber.club/blhx-fanpai/" target="_blank"  rel="noopener">@蔳莼菂䒕黃苽</a><br>仅学习交流使用
        </div>

    </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld'
import perCard from './components/perCard.vue';

export default {
    name: 'App',
    data() {
        return {
            status: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            has1: false,
            processing: [],
            completed: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            backing: 0,
            allCompleted: 0,
            turn:0,
            timeCount : 0,
            started:0,
            startTime :0,
            gameTimeCount:0,
            bestTime:0
        };
    },
    created() {
        let bBest = window.localStorage.getItem("bestTime")
        if(!bBest){
            this.bestTime = 0
        }else{
            this.bestTime = parseInt(bBest)
        }
        this.init();
        setInterval(()=>{
            this.timeCount += 113
            if (this.started){
                this.gameTimeCount = this.timeCount - this.startTime
            }
        },113)
    },
    filters: {
        parseTime(v){

            let s = (v / 1000) >> 0
            let m = (s / 60) >> 0
            s = s % 60
            let ms = v%1000
            ms = (ms / 10) >> 0
            if (s < 10){
                s = "0" + s.toString()
            }
            if (ms < 10){
                ms = "0" + ms.toString()
            }
            if(m < 10){
                m = "0" + m.toString()
            }
            return `${m}'${s}'${ms}`


        }
    },
    methods: {
        init() {
            let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8];
            arr.sort(function() {
                return 0.5 - Math.random();
            });
            this.cardids = arr;
            this.status = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.has1 = false;
            this.processing = [];
            this.completed = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
            this.backing = 0;
            this.allCompleted = 0;
            this.turn += 1
            this.started = 0
            this.gameTimeCount = 0
        },
        fanpai(i) {
            if (this.processing.length === 0) {
                if (!this.started){
                    this.started = 1
                    this.startTime = this.timeCount
                }
                this.processing.push(i);
            } else if (this.processing.length === 1) {
                let preInKey = this.processing[0];
                let preInCard = this.cardids[preInKey];
                let currentCard = this.cardids[i];
                if (preInCard === currentCard) {
                    this.completed[preInKey] = 1;
                    this.completed[i] = 1;
                    if (this.completed.indexOf(0) === -1){
                        this.allCompleted = 1
                        this.started = 0
                        if(!this.bestTime || this.gameTimeCount < this.bestTime){
                            this.bestTime = this.gameTimeCount
                            window.localStorage.setItem("bestTime",this.bestTime.toString())
                        }
                    }
                } else {
                    this.backing = 1;
                    setTimeout(() => {
                        this.$refs[`perCard${preInKey}`][0].trans2Back();
                        this.$refs[`perCard${i}`][0].trans2Back();
                        setTimeout(() => {
                            this.backing = 0;
                        }, 300);
                    }, 800);
                }
                this.processing = [];
            }
        },
    },
    components: {
        perCard,
    },
};
</script>

<style>
    body,html{
        padding: 0;
        border: 0;
        margin: 0;
        width: 1280px;
        height: 720px;
    }
#app {
    width: 1280px;
    height: 720px;
    background-image: url('https://pic.ggemo.com/picgo/blhx-fanpaiyouxi-bg.png');
    background-repeat: no-repeat;
    padding-top: 87px;
}
    #gameContainer{
        margin-left: 192px;
        width: 1000px;

    }
    #restartButton{
        position: relative;
        width: 70px;
        height: 70px;
        background-color: #739eff;
        border-radius: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        user-select: none;
        -webkit-user-select: none;
        cursor: pointer;
        opacity: 0.6;
        transition-duration: 0.3s;
        top: -87px;
        font-weight: bold;
        left: -168px;
    }
    #restartButton:hover{
        opacity: 1;
    }
    .t{
        position: relative;
        font-weight: bold;
        font-size: 22px;
        color: #802f12;
        float: left;
        top: -34px;
    }
    #jishi{

        left:250px
    }
    #bestTime{
        left:387px
    }
    *{
        -webkit-tap-highlight-color: rgba(0,0,0,0);
    }
    #oath{
        position: absolute;
        top: 670px;
        font-size: 15px;
        background-color: rgba(255,255,255,0.66);
    }
    a{
        color: #427cff;
        text-decoration: none;
    }
    a:visited{
        color: #427cff;
    }
</style>
<style scoped>
    *{

    }
</style>
