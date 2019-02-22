<template>
    <div class="perCard" @mousedown="c" :style="`transform:rotateY(${angle})`">
        <!--<img src="../img/card/back.png" alt="">-->
        <!--<img :src="cardSrc" alt="" />-->
        <div class="perCardIn" :style="`background-image:url('${cardSrc}')`">
            <img v-show="completedCover" src="http://pic.ggemo.com/picgo/blhx-fanpai-match.png" alt="">
        </div>
    </div>
</template>

<script>
    window.log = console.log;
    export default {
        name: 'perCard',
        props: ['cardid', 'status', 'keyid', 'backing', 'completed','turn'],
        data () {
            return {
                active: 1,
                angle: '180deg',
                cardSrc: 'http://pic.ggemo.com/picgo/fanpai-card-back-trans.png',
                transing: false,
                completedCover: 0
            };
        },
        model: {
            prop: 'status',
            event: 'change'
        },
        created(){
            let y = (this.keyid / 6) >> 0
            let x = this.keyid % 6
            this.show()
        },
        watch: {
            'completed': function (newData, oldData) {
                setTimeout(() => {this.completedCover = newData}, 250)
            },
            'turn': function (newData, oldData) {
               this.show()
            }
        },
        methods: {
            show(){
                this.trans2Card()
                setTimeout(() => {
                    this.trans2Back();
                    setTimeout(() => {this.active = 1},220)
                }, 1200)
            },
            trans2Back () {
                if (this.transing) {
                    return
                }

                this.transing = true
                this.angle = '90deg';
                setTimeout(() => {
                    this.cardSrc = `http://pic.ggemo.com/picgo/fanpai-card-back-trans.png`;
                    this.angle = '180deg';
                    this.transing = false
                    this.$emit('change', 0)
                }, 220);
            },
            trans2Card () {
                if (this.transing) {
                    return
                }
                this.transing = true
                this.angle = '90deg';
                setTimeout(() => {
                    this.cardSrc = `http://pic.ggemo.com/picgo/fanpai-card-${this.cardid}.png`;
                    this.angle = '0deg';
                    this.transing = false
                    this.$emit('change', 1)
                }, 220);
            },
            c: function (e) {
                if (!this.active) {
                    return
                }
                if (this.transing) {
                    return
                }
                if (this.backing) {
                    return
                }
                if (this.angle !== '0deg') {
                    this.trans2Card();
                    this.$emit("fanpaie", this.keyid)
                }
            }
        }
    };
</script>

<style>
    .perCard {
        margin-left: 34px;
        margin-top: 10px;
        /*background-image: url('../img/card/back.png');*/
        width: 114px;
        height: 151px;
        float: left;
        transition-duration: 220ms;
        cursor: pointer;
        user-select: none;
        -webkit-user-select: none;
    }

    .perCard > .perCardIn {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .perCardIn > img {
        /*opacity: 0.5;*/
    }
</style>
