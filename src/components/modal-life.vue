<template>
    <div class="modal-life">
        <div class="modal-life__cnt">
            <img src="https://static.cdn.24haowan.com/img/32/32152281217643451.png"
                class="modal-life__cnt__close"
                @click="cancel">
            <div class="modal-life__cnt__title">
                <span>兑换生命值</span>
            </div>
            <img src="https://static.cdn.24haowan.com/img/32/32152281217551638.png"
                class="modal-life__cnt__icon">
            <div class="modal-life__cnt__num">
                <img src="https://static.cdn.24haowan.com/img/32/32152281217529695.png"
                    class="modal-life__cnt__num__btn"
                    :class="{ disabled: times <= 1 }"
                    @click="minus">
                <span v-html="times"></span>
                <img src="https://static.cdn.24haowan.com/img/32/32152281217660930.png"
                    class="modal-life__cnt__num__btn"
                    @click="add">
            </div>
            <div class="modal-life__cnt__info">
                <span>金币：</span>
                <img src="https://static.cdn.24haowan.com/img/32/32152239442193187.png"
                    class="modal-life__cnt__info__icon">
                <span class="modal-life__cnt__info__cost" v-html="cost"></span>
                <span>/</span>
                <span v-html="config.lifeCost"></span>
            </div>
            <div class="modal-life__cnt__bottom">
                <div class="modal-life__cnt__bottom__btn"
                    @click="exchange">兑换</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-life',
    computed: {
        config() {
            return this.$bus.config;
        },
        cost() {
            return this.$bus.config.lifeCost * this.times;
        }
    },
    data() {
        return {
            times: 1
        };
    },
    methods: {
        minus() {
            if (this.times > 1) {
                this.times -= 1;
            }
        },
        add() {
            this.times += 1;
        },
        cancel() {
            this.$emit('cancel');
        },
        exchange() {
            this.$bus.$emit('exchangeLife', this.times);
        }
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.modal-life {
    @include fullscreen;
    @include box;
    z-index: 20;
    background: $c-mask-normal;
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
        &__icon {
            width: 34%;
            margin: .1rem auto;
            display: block;
        }
        &__num {
            &__btn {
                width: .24rem;
                padding: .08rem;
                vertical-align: middle;
                display: inline-block;
                margin-top: -.04rem;
                &.disabled {
                    opacity: .3;
                }
            }
            span {
                display: inline-block;
                line-height: .4rem;
                font-weight: bold;
                font-size: .16rem;
                vertical-align: middle;
                padding: 0 .14rem;
            }
        }
        &__info {
            font-size: .12rem;
            color: $c-text-gray;
            font-weight: bold;
            line-height: .2rem;
            margin-bottom: .1rem;
            &__icon {
                height: .16rem;
                display: inline-block;
                vertical-align: middle;
                margin-top: -.04rem;
            }
            &__cost {
                color: $c-orange;
            }
        }
        &__bottom {
            width: 80%;
            margin: 0 auto;
            padding: .1rem 0;
            border-top: 1px solid $c-border-gray;
            &__btn {
                display: inline-block;
                font-size: .18rem;
                line-height: .36rem;
                background: $c-orange;
                font-weight: bold;
                border-radius: .18rem;
                width: 46%;
            }
        }
    }
}
</style>
