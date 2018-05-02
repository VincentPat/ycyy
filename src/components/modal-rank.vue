<template>
    <div class="modal-rank">
        <div class="modal-rank__cnt">
            <h4>排行榜说明</h4>
            <p>段位榜：使用用户所获取的总金币数从高到低依序排行。</p>
            <p>红包榜：使用用户所获取的总人民币数从高到低依序排行。</p>
            <img src="https://static.cdn.24haowan.com/img/32/32152324154556028.png"
                class="modal-rank__cnt__btn"
                @click="hide">
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-rank',
    methods: {
        hide() {
            this.$emit('hide');
        }
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.modal-rank {
    @include fullscreen;
    @include box;
    z-index: 20;
    background: $c-mask-normal;
    &__cnt {
        width: 2rem;
        background: white;
        border-radius: $radius * 2;
        padding: .2rem;
        position: relative;
        h4 {
            margin: 0 0 .1rem;
            font-size: .14rem;
        }
        p {
            font-size: .12rem;
            text-align: left;
            line-height: .2rem;
            &:last-child {
                margin-bottom: 0px;
            }
        }
        &__btn {
            position: absolute;
            bottom: 0;
            left: 50%;
            width: .3rem;
            transform: translate(-50%, 150%);
        }
    }
}
</style>
