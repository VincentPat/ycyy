<template>
    <div class="share">
        <div class="share__back">
            <sk-back
                :img="backImg">
            </sk-back>
        </div>
        <div class="share__title"></div>
        <div class="share__text">答题平分奖金！用游戏学识粤语！使用下面的邀请码，和我一起粤闯越勇吧！</div>
        <div class="share__code">
            <img src="https://static.cdn.24haowan.com/img/32/32152282936421613.png"
                class="share__code__img">
            <div class="share__code__info">
                <img class="share__code__info__img"
                    :src="userInfo.headimg">
                <div class="share__code__info__text">复活邀请码</div>
                <div class="share__code__info__code" v-html="userInfo.invitationCode"></div>
            </div>
        </div>
        <img src="https://static.cdn.24haowan.com/img/32/3215228293644239.png"
            class="share__qrcode">
        <div class="share__remind">赶紧截屏分享图片给小伙伴吧~</div>
    </div>
</template>

<script>
import skBack from '@/components/common/sk-back';

export default {
    name: 'share',
    components: {
        skBack
    },
    computed: {
        userInfo() {
            return this.$bus.userInfo;
        }
    },
    data() {
        return {
            backImg: 'https://static.cdn.24haowan.com/img/32/3215227401617344.png'
        };
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.share {
    @include fullscreen;
    @include bg-cover;
    box-sizing: border-box;
    background-image: url('https://static.cdn.24haowan.com/img/32/32152239442810200.png');
    &__back {
        position: absolute;
        width: $size_top_btn;
        height: $size_top_btn;
        top: $margin;
        left: $margin;
        z-index: 10;
    }
    &__title {
        @include bg-contain;
        background-image: url('https://static.cdn.24haowan.com/img/32/3215227398751472.png');
        height: 10vh;
        width: 100%;
        margin-top: 8vh;
    }
    &__text {
        margin: $margin auto;
        width: 60vw;
        font-size: .12rem;
    }
    &__code {
        position: relative;
        margin-bottom: $margin;
        &__img {
            position: relative;
            height: 26vh;
            display: block;
            margin: 0 auto;
            z-index: 2;
        }
        &__info {
            position: relative;
            z-index: 1;
            transform: translate(0, -.6vh);
            background: white;
            border: .02rem solid $c-text-black;
            border-radius: $radius*2;
            width: 80vw;
            margin: 0 auto;
            padding: $margin;
            padding-left: 15vh;
            box-sizing: border-box;
            &__img {
                width: 10vh;
                height: 10vh;
                border-radius: 50%;
                position: absolute;
                top: $margin;
                left: $margin;
            }
            &__text {
                line-height: 4vh;
                margin-bottom: .5vh;
                font-weight: bold;
                font-size: .18rem;
            }
            &__code {
                display: inline-block;
                padding: 0 2vh;
                line-height: 5.5vh;
                font-weight: bold;
                color: white;
                font-size: .3rem;
                background: $c-darkyellow;
                border-radius: 3vh;
            }
        }
    }
    &__qrcode {
        height: 16vh;
        display: block;
        margin: 0 auto $margin;
    }
    &__remind {
        color: white;
        background: $c-orange-opacity;
        border-radius: .13rem;
        line-height: .26rem;
        font-size: .12rem;
        display: inline-block;
        padding: 0 .3rem;
    }
}
</style>

