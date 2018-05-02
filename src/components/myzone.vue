<template>
    <div class="myzone">
        <div class="myzone__back">
            <sk-back
                :img="backImg">
            </sk-back>
        </div>
        <img class="myzone__headimg"
            :src="userInfo.headimg">
        <div class="myzone__name" v-html="userInfo.name"></div>
        <div class="myzone__level">
            <img :src="level.img"
                class="myzone__level__img">
            <span v-html="level.name"></span>
        </div>
        <div class="myzone__gold" v-html="gold"></div>
        <div class="myzone__block myzone__block--money">
            <div class="myzone__block__text myzone__block--money__text">现金（元）</div>
            <div class="myzone__block__text myzone__block--money__num" v-html="money"></div>
            <div class="myzone__block__btn"
                @click="getGiftmoney">提现</div>
        </div>
        <div class="myzone__block myzone__golds">
            <img src="https://static.cdn.24haowan.com/img/32/32152239442193187.png"
                class="myzone__block__img">
            <div class="myzone__block__text">
                <span>金币</span>
                <span>×</span>
                <span v-html="userInfo.gold"></span>
            </div>
            <div class="myzone__block__btn" @click="exchangeLife">兑换生命值</div>
        </div>
        <div class="myzone__block myzone__life">
            <img src="https://static.cdn.24haowan.com/img/32/32152239442184264.png"
                class="myzone__block__img">
            <div class="myzone__block__text">
                <span>生命值</span>
                <span>×</span>
                <span v-html="userInfo.life"></span>
            </div>
            <div class="myzone__block__btn"
                @click="showShare">获取更多</div>
        </div>
        <div class="myzone__ad">
            <img src="https://static.cdn.24haowan.com/img/32/32152274093477510.png"
                class="myzone__ad__img">
        </div>
        <transition name="fade">
            <modal-life v-show="showLife"
                @cancel="hideLife"></modal-life>
        </transition>
        <transition name="fade">
            <modal-giftmoney v-show="showGiftmoney"
                @hide="hideGiftmoney"></modal-giftmoney>
        </transition>
    </div>
</template>

<script>
import skBack from '@/components/common/sk-back';
import modalLife from '@/components/modal-life';
import modalGiftmoney from '@/components/modal-giftmoney';

export default {
    name: 'myzone',
    components: {
        skBack,
        modalLife,
        modalGiftmoney
    },
    computed: {
        userInfo() {
            return this.$bus.userInfo;
        },
        level() {
            return this.$bus.level;
        },
        gold() {
            return `${this.userInfo.gold}金币`;
        },
        money() {
            return Number(this.userInfo.money / 100).toFixed(2);
        }
    },
    data() {
        return {
            backImg: 'https://static.cdn.24haowan.com/img/32/3215227401617344.png',
            showLife: false,
            showGiftmoney: false,
        };
    },
    methods: {
        exchangeLife() {
            window._hmt.push(['_trackEvent', 'exchange', 'exchange']);
            this.showLife = true;
        },
        hideLife() {
            this.showLife = false;
        },
        showShare() {
            window._hmt.push(['_trackEvent', 'share', 'share']);
            this.$router.push('share');
        },
        getGiftmoney() {
            window._hmt.push(['_trackEvent', 'withdraw', 'withdraw']);
            if (this.userInfo.money <= 0) {
                this.$bus.$emit('showRemind', '无可提现金额！');
            } else if (this.userInfo.money < 100) {
                this.$bus.$emit('showRemind', '金额大于1元才可以进行提现！');
            } else {
                this.$bus.$emit('getGiftmoneyCode');
                this.showGiftmoney = true;
            }
        },
        hideGiftmoney() {
            this.showGiftmoney = false;
        }
    },
    mounted() {
        this.$bus.$on('exchangeLifeSuccess', () => {
            this.hideLife();
        });
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/color.scss';
@import '../style/vars.scss';

.myzone {
    @include fullscreen;
    @include bg-cover;
    padding: .14rem;
    box-sizing: border-box;
    background-image: url('https://static.cdn.24haowan.com/img/32/32152239442810200.png');
    font-size: 0px;
    &__back {
        position: absolute;
        width: $size_top_btn;
        height: $size_top_btn;
        top: $margin;
        left: $margin;
        z-index: 10;
    }
    &__headimg {
        margin: 4vh auto .14rem;
        display: block;
        width: .8rem;
        height: .8rem;
        border-radius: 50%;
    }
    &__name {
        font-weight: bold;
        font-size: .16rem;
        margin-bottom: .14rem;
    }
    &__level {
        background: $c-shadow-y;
        border-radius: .3rem;
        line-height: .3rem;
        box-shadow: $shadow;
        padding: 0 .12rem;
        display: inline-block;
        color: white;
        font-size: .16rem;
        font-weight: bold;
        margin-bottom: .14rem;
        &__img {
            height: .2rem;
            margin: -.04rem .02rem 0 0;
            display: inline-block;
            vertical-align: middle;
        }
    }
    &__gold {
        @include box;
        font-weight: bold;
        font-size: .12rem;
        margin-bottom: .14rem;
        &:before {
            content: '';
            display: block;
            width: .3rem;
            height: 1px;
            transform: scale(.5, .5);
            background: $c-text-black;
        }
        &:after {
            content: '';
            display: block;
            width: .3rem;
            height: 1px;
            transform: scale(.5, .5);
            background: $c-text-black;
        }
    }
    &__block {
        background: $c-orange-opacity;
        width: 100%;
        padding: .14rem;
        box-sizing: border-box;
        border-radius: $radius;
        color: white;
        font-weight: bold;
        box-shadow: $shadow;
        margin-bottom: .14rem;
        font-size: .18rem;
        position: relative;
        text-align: left;
        line-height: .5rem;
        &__img {
            width: .3rem;
            display: inline-block;
            vertical-align: middle;
            margin-top: -.02rem;
            margin-right: .1rem;
        }
        &__text {
            display: inline-block;
            span {
                display: inline-block;
                margin-right: .06rem;
            }
        }
        &__btn {
            @include transform-center-y;
            background: $c-darkyellow;
            line-height: .3rem;
            border-radius: .15rem;
            right: .14rem;
            width: .8rem;
            font-size: .14rem;
            text-align: center;
        }
        &--money {
            .myzone__block__btn {
                background: $c-yellow;
            }
            &__text {
                display: block;
                line-height: .16rem;
                font-size: .16rem;
                margin-bottom: .1rem;
            }
            &__num {
                display: block;
                line-height: .26rem;
                font-size: .26rem;
            }
        }
    }
    &__ad {
        text-align: center;
        position: absolute;
        bottom: 0;
        left: 0;
        padding: .08rem;
        box-sizing: border-box;
        width: 100%;
        height: .3rem;
        background: $c-mask-light;
        &__img {
            height: 100%;
        }
    }
}
</style>
