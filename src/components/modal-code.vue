<template>
    <div class="modal-code">
        <div class="modal-code__cnt">
            <div class="modal-code__cnt__title">复活邀请码</div>
            <div class="modal-code__cnt__text">请输入邀请码</div>
            <input class="modal-code__cnt__input"
                v-model="code"
                placeholder="请输入邀请码">
                <div class="modal-code__cnt__btns">
                    <div class="modal-code__cnt__btns__btn"
                        @click="cancel">取消</div>
                    <div class="modal-code__cnt__btns__btn"
                        @click="confirm">确认</div>
                </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'modal-code',
    data() {
        return {
            code: null
        };
    },
    methods: {
        cancel() {
            this.$emit('cancel');
        },
        confirm() {
            if (!this.code) {
                this.$bus.$emit('showRemind', '请输入邀请码');
            } else {
                this.$emit('confirm', this.code);
            }
        }
    },
    mounted() {
        this.$bus.$on('submitCodeSuccess', () => {
            this.code = null;
        });
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.modal-code {
    @include fullscreen;
    @include box;
    background: $c-mask-normal;
    z-index: 20;
    &__cnt {
        width: 2.4rem;
        background: $c-mask-white;
        border-radius: $radius;
        font-size: .14rem;
        overflow: hidden;
        color: $c-text-black;
        padding-top: $margin;
        &__title {
            font-weight: bold;
            font-size: .16rem;
            line-height: .26rem;
        }
        &__text {
            font-size: .13rem;
            line-height: .2rem;
            margin: .04rem 0;
        }
        &__input {
            border: 1px solid $c-border-gray;
            -webkit-appearance: none;
            border-radius: 0px;
            line-height: .2rem;
            padding: 0 .1rem;
            font-size: .12rem;
            width: 70%;
            outline: none;
            box-shadow: none;
            &:focus, &:active {
                outline: none;
                box-shadow: none;
            }
        }
        &__btns {
            margin-top: $padding;
            @include box;
            border-top: 1px solid $c-border-gray;
            &__btn {
                @include box;
                flex: 1;
                font-weight: bold;
                color: $c-blue;
                line-height: .44rem;
                &:first-child {
                    border-right: 1px solid $c-border-gray;
                }
            }
        }
    }
}
</style>
