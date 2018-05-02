<template>
    <div class="modal-giftmoney">
        <div class="modal-giftmoney__cnt">
            <img src="https://static.cdn.24haowan.com/img/32/32152281217643451.png"
                class="modal-giftmoney__cnt__close"
                @click="cancel">
            <div class="modal-giftmoney__cnt__title">
                <span>兑换码</span>
            </div>
            <img src="https://static.cdn.24haowan.com/img/32/32152333153821476.jpg"
                class="modal-giftmoney__cnt__qrcode">
            <div class="modal-giftmoney__cnt__text">截图微信扫码，进入公众号回复兑换码，即可领取奖金</div>
            <div class="modal-giftmoney__cnt__code" v-html="userInfo.giftmoneyCode"></div>
            <div class="modal-giftmoney__cnt__remind">长按即可复制</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-giftmoney',
    computed: {
        userInfo() {
            return this.$bus.userInfo;
        }
    },
    methods: {
        cancel() {
            this.$emit('hide');
        }
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.modal-giftmoney {
    @include fullscreen;
    @include box;
    background: $c-mask-normal;
    z-index: 20;
    &__cnt {
        position: relative;
        background: white;
        border-radius: $radius * 2;
        width: 80vw;
        &__close {
            position: absolute;
            top: 0;
            right: 0;
            width: 7vw;
            transform: translate(-50%, -100%);
        }
        &__title {
            font-size: .14rem;
            font-weight: bold;
            line-height: .5rem;
            overflow: hidden;
            position: relative;
            span {
                position: relative;
                z-index: 2;
            }
            &:before {
                z-index: 1;
                position: absolute;
                top: 0;
                left: 50%;
                transform: translate(-50%, -50%);
                background: $c-yellow;
                content: '';
                width: 1rem;
                height: 1rem;
                border-radius: 50%;
            }
        }
        &__qrcode {
            margin: .1rem auto;
            width: 1rem;
        }
        &__text {
            font-size: .12rem;
            margin: 0 auto .1rem;
            width: 1.5rem;
            line-height: .16rem;
        }
        &__code {
            font-size: .16rem;
            font-weight: bold;
            padding: .1rem;
            border-radius: $radius;
            border: 2px dashed $c-border-gray;
            width: 2rem;
            margin: 0 auto .1rem;
        }
        &__remind {
            font-size: .12rem;
            color: $c-lightblack;
            margin-bottom: .2rem;
        }
    }
}
</style>
