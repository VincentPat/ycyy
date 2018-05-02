<template>
    <div class="home">
        <!-- 标题 -->
        <div class="home__title"
            @click="testTap"></div>
        <!-- 活动规则 -->
        <img class="home__rule"
            src="https://static.cdn.24haowan.com/img/32/32152239442180135.png"
            @click="toRule">
        <!-- banner -->
        <div class="home__banner">
            <swiper :options="swiperOption"
                ref="swiper"
                class="home__banner__swiper">
                <swiper-slide v-for="(banner, index) in banners"
                    :key="index"
                    :style="getSlideStyle(banner)"
                    @click.native="clickSlide(banner)">
                </swiper-slide>
            </swiper>
        </div>
        <!-- 个人中心 -->
        <div class="home__self"
            @click="toSelf">
            <img class="home__self__headimg"
                :src="userInfo.headimg">
            <div class="home__self__info">
                <div class="home__self__info__name" v-html="userInfo.name"></div>
                <div class="home__self__info__item">
                    <img class="home__self__info__item__img"
                        src="https://static.cdn.24haowan.com/img/32/32152239442193187.png">
                        <span v-html="userInfo.gold"></span>
                </div>
                <div class="home__self__info__item">
                    <img class="home__self__info__item__img"
                        src="https://static.cdn.24haowan.com/img/32/32152239442184264.png">
                        <span v-html="userInfo.life"></span>
                </div>
            </div>
            <div class="home__self__level"
                @click.stop="toLevel">
                <img class="home__self__level__img"
                    :src="level.img">
                <div class="home__self__level__name" v-html="level.name"></div>
            </div>
        </div>
        <!-- 游戏模块 -->
        <div class="home__games">
            <div class="home__games__game home__games__game--rank"
                @click="toGameRank">
                <img src="https://static.cdn.24haowan.com/img/32/321522394421478.png"
                    class="home__games__game__img">
                <div class="home__games__game__info">
                    <div class="home__games__game__info__name">排位赛</div>
                    <div class="home__games__game__info__desc">
                        <span>每场消耗：</span>
                        <img src="https://static.cdn.24haowan.com/img/32/32152239442193187.png"
                            class="home__games__game__info__desc__img">
                        <span v-html="config.rankCost"></span>
                    </div>
                </div>
            </div>
            <div class="home__games__game home__games__game--giftmoney"
                @click="toGameGiftmoney">
                <img src="https://static.cdn.24haowan.com/img/32/32152239442716501.png"
                    class="home__games__game__img"
                    v-show="config.giftmoneyEnable">
                <img src="https://static.cdn.24haowan.com/img/32/3215231690847115.png"
                    class="home__games__game__img disabled"
                    v-show="!config.giftmoneyEnable">
                <div class="home__games__game__info">
                    <div class="home__games__game__info__name"
                        v-show="!config.giftmoneyEnable">开始时间</div>
                    <div class="home__games__game__info__desc"
                        style="margin-bottom: .2rem;"
                        v-show="!config.giftmoneyEnable"
                        v-html="config.giftmoneyTime"></div>
                    <div class="home__games__game__info__name">红包赛</div>
                    <div class="home__games__game__info__desc">
                        <span>复活消耗：</span>
                        <img src="https://static.cdn.24haowan.com/img/32/32152239442184264.png"
                            class="home__games__game__info__desc__img">
                        <span v-html="config.giftmoneyCost"></span>
                    </div>
                </div>
            </div>
        </div>
        <!-- 其他模块 -->
        <div class="home__modules">
            <div class="home__modules__gold"
                @click="toGetGold">
                <div class="home__modules__title" v-html="goldTitle"></div>
                <div class="home__modules__desc home__modules__desc--gold">
                    <div class="home__modules__gold__countdown" v-html="goldDesc"></div>
                    <div class="home__modules__gold__progress" :style="goldProgressWidth"></div>
                </div>
            </div>
            <div class="home__modules__rank"
                @click="toRank">
                <div class="home__modules__title">排行榜</div>
                <div class="home__modules__desc">最新排行</div>
            </div>
        </div>
        <!-- 分享 -->
        <div class="home__share">
            <div class="home__share__btn home__share__btn--code"
                @click="toShareCode">
                <img class="home__share__btn__img"
                    src="https://static.cdn.24haowan.com/img/32/32152239442065998.png">
                <span class="home__share__btn__text">填写邀请码</span>
            </div>
            <div class="home__share__btn home__share__btn--link"
                @click="toShareLink">
                <img class="home__share__btn__img"
                    src="https://static.cdn.24haowan.com/img/32/32152239442741391.png">
                <span class="home__share__btn__text">分享链接</span>
            </div>
        </div>
        <!-- 邀请码弹窗 -->
        <transition name="fade">
            <modal-code v-show="showCode"
                @cancel="codeCancel"
                @confirm="codeConfirm"></modal-code>
        </transition>
    </div>
</template>

<script>
import utils from '@/plugin/utils';
import modalCode from '@/components/modal-code';

export default {
    name: 'home',
    components: {
        modalCode
    },
    computed: {
        userInfo() {
            return this.$bus.userInfo;
        },
        banners() {
            return this.$bus.config.banners;
        },
        config() {
            const config = Object.assign({}, this.$bus.config);
            config.giftmoneyEnable = false;
            if (this.$bus.config.giftmoneyStatus === 'prepared'
                || this.$bus.config.giftmoneyStatus === 'start') {
                config.giftmoneyEnable = true;
            }
            if (!config.giftmoneyEnable) {
                if (this.$bus.config.giftmoneyNextTime) { // 已确定下场开始时间
                    config.giftmoneyTime = utils.dateFormat(this.$bus.config.giftmoneyNextTime.replace(/-/g, '/'), 'M月d日 HH:mm');
                } else { // 未确定下场开始时间
                    config.giftmoneyTime = '敬请期待';
                }
            }
            config.goldGap = this.$bus.config.goldGap;
            return config;
        },
        // 金币标题
        goldTitle() {
            return `${this.config.goldNum}金币`;
        },
        // 下次可以领取金币的时间
        goldNextTime() {
            return this.userInfo.goldNextTime;
        },
        // 金币倒计时文字
        goldDesc() {
            return this.goldCountdown ? utils.dateCountByNumber(this.goldCountdown) : '点击领取';
        },
        // 金币进度条
        goldProgressWidth() {
            return `width: ${(this.config.goldGap - this.goldCountdown) / this.config.goldGap * 100}%;`;
        },
        level() {
            return this.$bus.level;
        }
    },
    data() {
        return {
            swiperOption: {
                autoplay: true,
                delay: 2000,
                // loop: true
            },
            goldCountdown: 0,
            showCode: false
        };
    },
    methods: {
        setSize() {
            const rule = document.querySelectorAll('.home__rule')[0];
            rule.style.height = `${window.innerHeight * 0.04}px`;
            rule.style.width = `${window.innerHeight * 0.04}px`;
            const title = document.querySelectorAll('.home__title')[0];
            title.style.height = `${window.innerHeight * 0.08}px`;
            const banner = document.querySelectorAll('.home__banner')[0];
            banner.style.height = `${window.innerHeight * 0.15}px`;
            const self = document.querySelectorAll('.home__self')[0];
            self.style.height = `${window.innerHeight * 0.12}px`;
            const games = document.querySelectorAll('.home__games')[0];
            games.style.height = `${window.innerHeight * 0.28}px`;
            const modules = document.querySelectorAll('.home__modules')[0];
            modules.style.height = `${window.innerHeight * 0.12}px`;
            const share = document.querySelectorAll('.home__share')[0];
            share.style.height = `${window.innerHeight * 0.1}px`;
        },
        testTap() {
            this.$bus.$emit('tapCount');
        },
        // 获取banner样式
        getSlideStyle(banner) {
            return `background-image: url("${banner.img}");`;
        },
        // 点击banner
        clickSlide(banner) {
            if (banner.link) {
                window._hmt.push(['_trackEvent', 'banner', 'banner']);
                location.href = banner.link;
            }
        },
        // 查看活动规则
        toRule() {
            this.$router.push('rule');
        },
        // 进入个人中心
        toSelf() {
            this.$router.push('myzone');
        },
        // 进入段位页面
        toLevel() {
            this.$router.push('level');
        },
        // 进入排位赛
        toGameRank() {
            this.$router.push('game-rank');
        },
        // 进入红包赛
        toGameGiftmoney() {
            if (this.config.giftmoneyEnable) {
                window._hmt.push(['_trackEvent', 'startredpack', 'startredpack']);
                // 去掉了门槛
                this.$router.push('game-giftmoney');
                // this.$bus.$emit('startGameGiftmoney');
            } else if (!this.config.giftmoneyNextTime) {
                this.$bus.$emit('showRemind', '开始时间，敬请期待');
            } else {
                this.$bus.$emit('showRemind', '开始前十分钟才可进入');
            }
        },
        // 领取金币
        toGetGold() {
            if (this.goldCountdown <= 0) {
                window._hmt.push(['_trackEvent', 'gold', 'gold']);
                this.$bus.$emit('collectGold');
            }
        },
        // 进入排行榜
        toRank() {
            this.$bus.$emit('refreshRank');
            this.$router.push('rank');
        },
        // 填写邀请码
        toShareCode() {
            window._hmt.push(['_trackEvent', 'invitation', 'invitation']);
            this.showCode = true;
        },
        // 分享链接
        toShareLink() {
            window._hmt.push(['_trackEvent', 'share', 'share']);
            this.$router.push('share');
        },
        // 设置金币倒计时
        setGoldCountdown() {
            const now = Date.now();
            const nextTime = new Date(this.goldNextTime.replace(/-/g, '/')).getTime();
            this.goldCountdown = now >= nextTime ? 0 : Math.ceil((nextTime - now) / 1000);
        },
        // 开始金币倒计时
        startGoldCountdown() {
            setInterval(() => {
                if (this.goldCountdown > 0) {
                    this.goldCountdown -= 1;
                }
            }, 1000);
        },
        // 兑换码取消
        codeCancel() {
            this.showCode = false;
        },
        // 兑换码确认
        codeConfirm(code) {
            this.$bus.$emit('submitCode', code);
        }
    },
    mounted() {
        this.$bus.$on('collectGoldSuccess', () => {
            this.goldCountdown = this.config.goldGap;
        });
        this.$bus.$on('submitCodeSuccess', () => {
            this.showCode = false;
        });
        this.setGoldCountdown();
        this.startGoldCountdown();
        this.$router.afterEach((to) => {
            if (to.name === 'home' || to.path === '/') {
                if (this.$refs && this.$refs.swiper) this.$refs.swiper.swiper.autoplay.run();
            }
        });
        this.setSize();
        window.home = this;
    },
    watch: {
        // 金币倒计时
        goldNextTime() {
            this.setGoldCountdown();
        }
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/color.scss';
@import '../style/vars.scss';

.home {
    @include fullscreen;
    @include bg-cover;
    position: fixed;
    color: white;
    font-size: .14rem;
    box-sizing: border-box;
    padding: $margin;
    background-image: url('https://static.cdn.24haowan.com/img/32/32152239442810200.png');
    &__title {
        @include bg-contain;
        background-image: url('https://static.cdn.24haowan.com/img/32/3215227398751472.png');
        height: $h_title;
        width: 100%;
    }
    &__rule {
        z-index: 10;
        position: absolute;
        top: 0;
        right: 0;
        height: $size_top_btn;
        width: $size_top_btn;
        padding: $margin;
        box-sizing: content-box;
    }
    &__banner {
        border-radius: $radius;
        overflow: hidden;
        width: 100%;
        height: $h_banner;
        margin-top: $margin;
        box-shadow: $shadow;
        .swiper-container,
        .swiper-wrapper,
        .swiper-slide {
            width: 100%;
            height: 100%;
            font-size: 0px;
        }
        .swiper-slide {
            @include bg-cover;
        }
        .swiper-container {
            border-radius: $radius;
            overflow: hidden;
        }
    }
    &__self {
        @include box;
        padding: $margin;
        box-sizing: border-box;
        background: orange;
        box-shadow: $shadow;
        border-radius: $radius;
        width: 100%;
        height: $h_self;
        margin-top: $margin;
        &__headimg {
            display: block;
            height: .44rem;
            width: .44rem;
            margin-right: $margin;
            border-radius: 50%;
        }
        &__info {
            flex: 1;
            text-align: left;
            &__name {
                @include text-overflow;
                line-height: .2rem;
                width: 100%;
                font-weight: bold;
                margin-bottom: .04rem;
            }
            &__item {
                display: inline-block;
                line-height: .2rem;
                margin-right: $margin;
                &__img {
                    margin-top: -.02rem;
                    margin-right: .02rem;
                    height: .14rem;
                    vertical-align: middle;
                }
                span {
                    display: inline-block;
                }
            }
        }
        &__level {
            padding: 0 4vw;
            &__img {
                display: block;
                margin: -.24rem auto .02rem;
                height: .42rem;
            }
            &__name {
                font-weight: bold;
            }
        }
    }
    &__games {
        @include box;
        width: 100%;
        height: $h_games;
        margin-top: $margin;
        position: relative;
        &__game {
            @include bg-cover;
            flex: 1;
            height: 100%;
            border-radius: $radius;
            box-shadow: $shadow;
            position: relative;
            &__img {
                @include transform-center-x;
                z-index: 1;
                height: 70%;
                top: -4%;
                &.disabled {
                    height: 40%;
                }
            }
            &__info {
                z-index: 2;
                position: absolute;
                bottom: .1rem;
                left: 0;
                width: 100%;
                font-size: 0px;
                &__name {
                    font-size: .16rem;
                    font-weight: bold;
                }
                &__desc {
                    margin-top: .02rem;
                    padding: 0 .1rem;
                    background: $c-shadow-y;
                    font-size: .12rem;
                    line-height: .2rem;
                    border-radius: .1rem;
                    display: inline-block;
                    min-width: .9rem;
                    &__img {
                        height: .12rem;
                        vertical-align: middle;
                        margin-top: -.02rem;
                    }
                }
            }
            &--rank {
                margin-right: $margin/2;
                background-image: url('https://static.cdn.24haowan.com/img/32/32152239580642486.png');
            }
            &--giftmoney {
                margin-left: $margin/2;
                background-image: url('https://static.cdn.24haowan.com/img/32/32152239580662040.png');
                .home__games__game__info__desc {
                    background: $c-shadow-r;
                }
            }
        }
    }
    &__modules {
        @include box;
        width: 100%;
        height: $h_modules;
        margin-top: $margin;
        text-align: left;
        &__title {
            font-weight: bold;
            font-size: .18rem;
            text-align: left;
        }
        &__desc {
            font-size: .12rem;
            text-align: left;
            margin-top: .1rem;
            display: inline-block;
            line-height: .2rem;
            height: .18rem;
            &--gold {
                background: $c-darkorange;
                border-radius: .04rem;
                position: relative;
                width: 63%;
                overflow: hidden;
            }
        }
        &__gold, &__rank {
            background-color: $c-orange;
            box-sizing: border-box;
            height: 100%;
            border-radius: $radius;
            box-shadow: $shadow;
            padding: $padding;
        }
        &__gold {
            background-image: url('https://static.cdn.24haowan.com/img/32/32152239491333422.png');
            background-size: 32% auto;
            background-position: 100% 60%;
            background-repeat: no-repeat;
            flex: 2;
            margin-right: $margin/2;
            &__countdown {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 2;
                padding: 0 .04rem;
                box-sizing: border-box;
            }
            &__progress {
                background: $c-lightorange;
                width: 0%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                z-index: 1;
                border-radius: .04rem;
            }
        }
        &__rank {
            background-image: url('https://static.cdn.24haowan.com/img/32/3215223949137114.png');
            background-size: 50% auto;
            background-position: 90% 100%;
            background-repeat: no-repeat;
            flex: 1;
            margin-left: $margin/2;
        }
    }
    &__share {
        @include box;
        background: $c-mask-light;
        width: 100vw;
        position: relative;
        left: -$margin;
        height: $h_share;
        margin-top: $margin;
        &__btn {
            background: white;
            border-radius: 3vh;
            line-height: 4vh;
            height: 6vh;
            width: 36vw;
            padding: 1vh;
            box-sizing: border-box;
            box-shadow: $shadow;
            font-weight: bold;
            font-size: .12rem;
            &--code {
                margin-right: $margin/2;
            }
            &--link {
                margin-left: $margin/2;
            }
            &__img {
                height: 3vh;
                vertical-align: middle;
            }
            &__text {
                margin-left: .04rem;
                display: inline-block;
                color: $c-lightblack;
                vertical-align: middle;
                line-height: 4.5vh;
            }
        }
    }
}
</style>
