<template>
    <div class="game-giftmoney">
        <iframe :src="src" frameborder="0"></iframe>
    </div>
</template>

<script>
export default {
    name: 'game-giftmoney',
    data() {
        return {
            src: null
        };
    },
    mounted() {
        this.src = this.$bus.envData.giftmoney;
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.game-giftmoney {
    @include fullscreen;
    iframe {
        @include fullfill;
    }
}
</style>
