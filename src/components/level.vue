<template>
    <div class="level">
        <div class="level__back">
            <sk-back
                :img="backImg">
            </sk-back>
        </div>
        <div class="level__title">
            <span>我的段位</span>
        </div>
        <div class="level__self">
            <div class="level__self__icon">
                <img class="level__self__icon__img"
                    :src="level.img">
            </div>
            <div class="level__self__name" v-html="level.name"></div>
            <div class="level__self__gold" v-html="userInfo.goldTotal"></div>
        </div>
        <div class="level__collections">
            <div class="level__collections__item"
                v-for="(item, index) in levels"
                :class="{ active: level.level >= index }"
                :key="index">
                <div class="level__collections__item__icon" :style="getLevelIcon(item)"></div>
                <div class="level__collections__item__name" v-html="item.name"></div>
                <div class="level__collections__item__gold" v-html="item.gold"></div>
            </div>
        </div>
        <div class="level__ad">
            <img src="https://static.cdn.24haowan.com/img/32/32152274093477510.png"
                class="level__ad__img">
        </div>
    </div>
</template>

<script>
import skBack from '@/components/common/sk-back';

export default {
    name: 'level',
    components: {
        skBack
    },
    computed: {
        level() {
            return this.$bus.level;
        },
        levels() {
            return this.$bus.levels;
        },
        userInfo() {
            return this.$bus.userInfo;
        }
    },
    data() {
        return {
            backImg: 'https://static.cdn.24haowan.com/img/32/3215227401617344.png'
        };
    },
    methods: {
        getLevelIcon(level) {
            return `background-image: url('${level.img}')`;
        }
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.level {
    @include fullscreen;
    @include bg-cover;
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
        line-height: $h_rule_title;
        font-weight: bold;
        color: $c-text-black;
        font-size: .18rem;
        position: relative;
        margin-bottom: .1rem;
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
            background: white;
            content: '';
            width: $h_rule_title * 2;
            height: $h_rule_title * 2;
            border-radius: 50%;
        }
    }
    &__self {
        font-size: 0px;
        &__icon {
            width: 30vw;
            height: 30vw;
            padding: 4vw;
            box-sizing: border-box;
            margin: 0 auto .1rem;
            position: relative;
            &:before {
                @include fullfill;
                @include bg-contain;
                content: '';
                transform: scale(2.2, 2.2);
                background-image: url('https://static.cdn.24haowan.com/img/32/3215227409343397.png');
            }
            &__img {
                position: relative;
                z-index: 1;
                width: 100%;
            }
        }
        &__name {
            color: $c-text-black;
            font-weight: bold;
            font-size: .14rem;
            margin-bottom: .1rem;
        }
        &__gold {
            font-weight: bold;
            background: $c-shadow-y;
            line-height: .18rem;
            font-size: .12rem;
            color: white;
            display: inline-block;
            padding: 0 .1rem;
            border-radius: .1rem;
            margin-bottom: .1rem;
        }
    }
    &__collections {
        font-size: 0px;
        &__item {
            display: inline-block;
            width: 33.33vw;
            height: 33.33vw;
            overflow: hidden;
            box-sizing: border-box;
            border-right: 1px solid $c-border-white;
            border-bottom: 1px solid $c-border-white;
            background: $c-orange-opacity;
            font-size: .14rem;
            color: white;
            padding: 4vw 0;
            position: relative;
            &:before {
                @include fullfill;
                height: 99%;
                top: .5%;
                content: '';
                background: $c-mask-normal;
            }
            &.active {
                &:before {
                    opacity: 0;
                }
            }
            &:nth-child(3n) {
                border-right: 0px;
                width: 33.34vw;
            }
            &__icon {
                @include bg-contain;
                width: 60%;
                height: 14vw;
                margin: 0 auto .04rem;
            }
            &__name {
                font-weight: bold;
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
