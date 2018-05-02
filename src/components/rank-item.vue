<template>
    <div class="rank-item">
        <div class="rank-item__rank">
            <template v-if="rank === 1">
                <img src="https://static.cdn.24haowan.com/img/32/32152317378069412.png"
                    class="rank-item__rank__icon">
            </template>
            <template v-else-if="rank === 2">
                <img src="https://static.cdn.24haowan.com/img/32/32152317378191053.png"
                    class="rank-item__rank__icon">
            </template>
            <template v-else-if="rank === 3">
                <img src="https://static.cdn.24haowan.com/img/32/32152317378060804.png"
                    class="rank-item__rank__icon">
            </template>
            <template v-else>
                <span v-html="rank"></span>
            </template>
        </div>
        <img :src="headimg"
            class="rank-item__headimg">
        <div class="rank-item__name" v-html="name"></div>
        <div class="rank-item__info">
            <div class="rank-item__info__data">
                <div class="rank-item__info__data__icon"
                    :style="iconBg"
                    :class="{ giftmoney: type === 'giftmoney' }"></div>
                <span v-html="data"></span>
            </div>
            <div class="rank-item__info__subdata"
                v-if="type === 'level'"
                v-html="subdata"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'rank-item',
    props: {
        rank: {
            default: 1,
            type: Number
        },
        headimg: {
            default: null,
            type: String
        },
        name: {
            default: null,
            type: String
        },
        levelIcon: {
            default: null,
            type: String
        },
        levelName: {
            default: null,
            type: String
        },
        gold: {
            default: 1,
            type: Number
        },
        money: {
            default: 1,
            type: Number
        },
        type: {
            default: 'level',
            type: String
        }
    },
    computed: {
        iconBg() {
            const img = this.type === 'level'
                ? this.levelIcon : 'https://static.cdn.24haowan.com/img/32/32152317378043985.png';
            return `background-image: url('${img}')`;
        },
        data() {
            return this.type === 'level' ? this.levelName : this.money;
        },
        subdata() {
            return this.type === 'level' ? this.gold : null;
        }
    },
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.rank-item {
    @include box;
    width: 100%;
    height: $h_rank_item;
    border-bottom: 1px solid $c-gray;
    padding: 0 .3rem;
    box-sizing: border-box;
    &__rank {
        font-size: .12rem;
        font-weight: bold;
        &__icon {
            width: .25rem;
            margin-top: .04rem;
        }
        span {
            display: inline-block;
            width: .25rem;
        }
    }
    &__headimg {
        display: block;
        margin: 0 .14rem;
        height: .34rem;
        width: .34rem;
        border-radius: 50%;
    }
    &__name {
        @include text-overflow;
        flex: 1;
        font-size: .14rem;
        text-align: left;
    }
    &__info {
        padding-left: .3rem;
        box-sizing: border-box;
        text-align: left;
        &__data {
            line-height: .2rem;
            position: relative;
            &__icon {
                @include bg-contain;
                position: absolute;
                top: 0;
                left: -.04rem;
                transform: translate(-100%, 0);
                width: .24rem;
                height: .2rem;
                &.giftmoney {
                    top: .01rem;
                    height: .16rem;
                }
            }
            span {
                display: inline-block;
            }
        }
        &__subdata {
            line-height: .2rem;
            font-size: .12rem;
        }
    }
}
</style>
