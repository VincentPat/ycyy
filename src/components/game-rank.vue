<template>
    <div class="game-rank">
        <transition name="fade">
            <!-- 首页 -->
            <div class="game-rank__home"
                v-if="!started"
                key="home">
                <div class="game-rank__home__foreground"></div>
                <div class="game-rank__home__back">
                    <sk-back
                        :img="backImg">
                    </sk-back>
                </div>
                <div class="game-rank__home__gold">
                    <img src="https://static.cdn.24haowan.com/img/32/32152239442193187.png"
                        class="game-rank__home__gold__icon">
                    <span v-html="userInfo.gold"></span>
                </div>
                <div class="game-rank__home__cnt">
                    <img src="https://static.cdn.24haowan.com/img/32/321522394421478.png"
                        class="game-rank__home__cnt__img">
                    <img src="https://static.cdn.24haowan.com/img/32/32152324277293326.png"
                        class="game-rank__home__cnt__title">
                    <img src="https://static.cdn.24haowan.com/img/32/32152324277236467.png"
                        class="game-rank__home__cnt__subtitle">
                    <div class="game-rank__home__cnt__start"
                        @click="start">开始答题</div>
                    <div class="game-rank__home__cnt__cost">
                        <span>每场消耗:</span>
                        <img src="https://static.cdn.24haowan.com/img/32/32152239442193187.png"
                            class="game-rank__home__cnt__cost__img">
                        <span v-html="config.rankCost"></span>
                    </div>
                </div>
            </div>
            <!-- 回答问题 -->
            <div class="game-rank__q"
                v-else
                key="q">
                <transition name="fade">
                    <div class="game-rank__q__cnt" v-show="showQuestion">
                        <img src="https://static.cdn.24haowan.com/img/32/32152324661127963.png"
                            class="game-rank__q__cnt__bg">
                        <div class="game-rank__q__cnt__no">
                            <span v-html="currentQIndex"></span>
                            <span>/</span>
                            <span v-html="questionTotal"></span>
                        </div>
                        <div class="game-rank__q__cnt__question"
                            v-html="question.question"></div>
                        <div class="game-rank__q__cnt__countdown">
                            <canvas
                                width="144"
                                height="144"
                                class="game-rank__q__cnt__countdown__canvas bg">
                            </canvas>
                            <canvas
                                width="144"
                                height="144"
                                class="game-rank__q__cnt__countdown__canvas fg">
                            </canvas>
                            <div v-html="cd" class="game-rank__q__cnt__countdown__text"></div>
                        </div>
                        <div class="game-rank__q__cnt__answer"
                            v-for="(item, index) in question.options"
                            :key="index"
                            @click="choose(index)"
                            :class="getAnswerClass(index)">
                            <span class="game-rank__q__cnt__answer__status"
                                v-show="getShowStatus(index)">
                            </span>
                            <span class="game-rank__q__cnt__answer__index"
                                v-html="indexes[index] + '.'"></span>
                            <span v-html="item"></span>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <transition name="fade">
            <!-- 结果 -->
            <div class="game-rank__result"
                v-if="ended">
                <div class="game-rank__result__cnt"
                    :class="{ success: result.success, fail: !result.success }">
                    <img src="https://static.cdn.24haowan.com/img/32/32152281217643451.png"
                        class="game-rank__result__cnt__close"
                        @click="toHome">
                    <div class="game-rank__result__cnt__img"></div>
                    <div class="game-rank__result__cnt__info">
                        <img :src="userInfo.headimg"
                            class="game-rank__result__cnt__info__headimg">
                        <div class="game-rank__result__cnt__info__level">
                            <img :src="level.img"
                                class="game-rank__result__cnt__info__level__icon">
                            <span v-html="level.name"></span>
                        </div>
                        <div class="game-rank__result__cnt__info__gold">
                            <span v-html="userInfo.goldTotal"></span>
                        </div>
                        <div class="game-rank__result__cnt__info__prize"
                            v-show="result.success">
                            <span>+</span>
                            <span v-html="result.gold"></span>
                            <span>金币</span>
                        </div>
                        <div class="game-rank__result__cnt__info__remind"
                            v-html="failRemind"
                            v-show="!result.success">
                        </div>
                    </div>
                    <div class="game-rank__result__cnt__btns">
                        <div class="game-rank__result__cnt__btns__btn"
                            @click="toHome">游戏首页</div>
                        <div class="game-rank__result__cnt__btns__btn"
                            @click="again">继续答题</div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="game-rank__ad">
            <img src="https://static.cdn.24haowan.com/img/32/32152274093477510.png"
                class="game-rank__ad__img">
        </div>
    </div>
</template>

<script>
import skBack from '@/components/common/sk-back';

export default {
    name: 'game-rank',
    components: {
        skBack
    },
    computed: {
        config() {
            return this.$bus.config;
        },
        level() {
            return this.$bus.level;
        },
        userInfo() {
            return this.$bus.userInfo;
        },
        cd() {
            return Math.ceil(this.countdown / 1000);
        },
        failRemind() {
            return `本次闯关共答对${this.result.true}题<br>要答对3道题以上才能闯关成功`;
        }
    },
    data() {
        return {
            backImg: 'https://static.cdn.24haowan.com/img/32/3215227401617344.png',
            started: false, // 是否已开始
            ended: false, // 是否已结束
            initedCircle: false, // 是否已初始化倒计时
            result: {
                success: false, // 是否成功
                gold: 0, // 获取金币
                true: 2, // 答对
            },
            currentQIndex: 1, // 当前题目序号
            questionTotal: 5, // 题目总数
            question: {
                question: '同样的周长，下面那个图形的面积最大？',
                options: ['正方形', '圆形', '三角形']
            }, // 题目内容
            indexes: ['A', 'B', 'C', 'D'],
            chosed: 'A', // 已选择下标
            ctx: null,
            radius: 72,
            countdown: 10000, // 当前计时
            questionCountdown: 10000, // 题目计时
            countdownInterval: null,
            showResult: false, // 显示结果
            right: null, // 正确答案
            showQuestion: false, // 显示问题
            starting: false, // 是否正在请求开始
        };
    },
    methods: {
        getShowStatus(index) {
            if (this.showResult
                && (this.right === index || this.chosed === index)) return true;
            return false;
        },
        getAnswerClass(index) {
            let className = '';
            if (this.chosed === index) className += ' active';
            if (this.showResult) {
                if (this.right === index) {
                    className += ' right';
                } else if (this.chosed === index) {
                    className += ' wrong';
                }
            }
            return className;
        },
        /**
         * 答题相关
         */
        start() {
            window._hmt.push(['_trackEvent', 'startrank', 'startrank']);
            if (!this.starting) {
                this.$bus.$emit('startGameRank');
            }
        },
        choose(index) {
            if (this.chosed === null) {
                this.chosed = index;
                this.endCountdown();
            }
        },
        submit() {
            this.$bus.$emit('submitAnswer', this.chosed);
        },
        getQuestion() {
            this.$bus.$emit('getQuestion');
        },
        setQuestion(data) {
            // 设置题目信息
            this.currentQIndex = data.cur_index + 1;
            this.questionTotal = data.question_len;
            this.question.question = data.question;
            this.question.options = data.options;
            // 设置倒计时
            this.questionCountdown = data.duration;
            this.countdown = this.questionCountdown;
            if (!this.initedCircle) {
                this.initedCircle = true;
                this.initCircle();
            } else {
                this.drawCircle(1, true);
            }
            // 设置状态
            this.chosed = null;
            this.showResult = false;
            this.$nextTick(() => {
                this.showQuestion = true;
                setTimeout(() => {
                    this.startCountdown();
                }, 1000);
            });
        },
        /**
         * 倒计时相关
         */
        initCircle() {
            // 绘制背景
            const canvasBg = document.querySelectorAll('canvas.game-rank__q__cnt__countdown__canvas.bg')[0];
            const ctx = canvasBg.getContext('2d');
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#e7e7e7';
            ctx.arc(this.radius, this.radius, this.radius - 4, 0, Math.PI * 2, true);
            ctx.stroke();
            // 前景
            const canvas = document.querySelectorAll('canvas.game-rank__q__cnt__countdown__canvas.fg')[0];
            this.ctx = canvas.getContext('2d');
            this.ctx.lineWidth = 8;
            this.ctx.strokeStyle = '#f7bc3a';
            this.drawCircle(1, true);
        },
        drawCircle(percent, force) {
            this.ctx.clearRect(0, 0, this.radius * 2, this.radius * 2);
            if (percent < 1 || force) {
                const delta = Math.PI / 2;
                const start = 0 - delta;
                const end = percent * Math.PI * 2 - delta;
                this.ctx.beginPath();
                this.ctx.arc(this.radius, this.radius, this.radius - 4, start, end, true);
                this.ctx.stroke();
            }
        },
        startCountdown() {
            clearInterval(this.countdownInterval);
            this.countdownInterval = setInterval(() => {
                this.countdown -= 100;
                let percent = 1 - this.countdown / this.questionCountdown;
                percent = percent > 1 ? 0 : percent;
                this.drawCircle(percent);
                if (this.countdown <= 0) {
                    this.endCountdown();
                }
            }, 100);
        },
        endCountdown() {
            clearInterval(this.countdownInterval);
            this.countdownInterval = null;
            this.submit();
        },
        /**
         * 游戏结果操作
         */
        reset() {
            this.started = false;
            this.ended = false;
            this.chosed = null;
            this.initedCircle = false;
            this.showQuestion = false;
            this.showResult = false;
        },
        toHome() {
            this.$router.replace('/');
            this.reset();
        },
        again() {
            window._hmt.push(['_trackEvent', 'replay', 'replay']);
            this.reset();
        }
    },
    mounted() {
        // 开始游戏
        this.$bus.$on('startGameRankSuccess', () => {
            this.starting = false;
            this.started = true;
            this.getQuestion();
        });
        this.$bus.$on('startGameRankFailed', () => {
            this.starting = false;
        });
        // 接收到题目
        this.$bus.$on('getQuestionSuccess', (data) => {
            if (!this.showQuestion) { // 第一题
                this.setQuestion(data);
            } else {
                this.showQuestion = false;
                setTimeout(() => {
                    this.setQuestion(data);
                }, 1000);
            }
        });
        // 接收到答案
        this.$bus.$on('getAnswer', (data) => {
            this.right = data.right;
            this.showResult = true;
            if (data.is_last) {
                this.result.success = data.msg.result; // 是否答题成功
                this.result.gold = data.msg.win_gold; // 获得金币
                this.result.true = data.msg.right; // 答对题目数
                setTimeout(() => {
                    this.ended = true;
                }, 2800);
                this.$bus.$emit('updateUserInfo');
            } else {
                setTimeout(() => {
                    this.getQuestion();
                }, 2800);
            }
        });
        window.gameRank = this;
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.game-rank {
    @include fullscreen;
    @include bg-cover;
    background-image: url('https://static.cdn.24haowan.com/img/32/32152239442810200.png');
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
    &__home {
        @include box;
        @include fullfill;
        &__foreground {
            @include fullfill;
            @include bg-contain;
            background-image: url('https://static.cdn.24haowan.com/img/32/32152324277294007.png');
        }
        &__back {
            position: absolute;
            width: $size_top_btn;
            height: $size_top_btn;
            top: $margin;
            left: $margin;
            z-index: 10;
        }
        &__gold {
            position: absolute;
            height: $size_top_btn;
            line-height: $size_top_btn;
            padding: 0 .1rem;
            top: $margin;
            right: $margin;
            z-index: 10;
            background: $c-mask-lightwhite;
            border-radius: $size_top_btn/2;
            font-size: .14rem;
            font-weight: bold;
            &__icon {
                height: .18rem;
                vertical-align: middle;
                margin-top: -.02rem;
            }
        }
        &__cnt {
            position: relative;
            z-index: 1;
            &:before {
                @include transform-center-x;
                content: '';
                background: $c-lightyellow;
                width: 42vw;
                height: 42vw;
                border-radius: 50%;
                top: 2%;
                z-index: -1;
                box-shadow: 0 0 10vw 0 rgba(255, 255, 255, .3) inset;
            }
            &__img {
                width: 42vw;
                margin: 0 auto .1rem;
                display: block;
                transform: translate(12%, 0);
            }
            &__title {
                width: 56vw;
                margin: 0 auto .04rem;
                display: block;
            }
            &__subtitle {
                width: 30vw;
                margin: 0 auto .3rem;
                display: block;
            }
            &__start {
                background: $c-orange;
                box-shadow: $shadow;
                color: white;
                font-weight: bold;
                font-size: .18rem;
                line-height: .46rem;
                border-radius: .23rem;
                width: 1.3rem;
                margin: 0 auto .2rem;
            }
            &__cost {
                background: $c-shadow-y;
                line-height: .2rem;
                width: 1.2rem;
                margin: 0 auto;
                color: white;
                font-size: .14rem;
                border-radius: .1rem;
                &__img {
                    height: .18rem;
                    vertical-align: middle;
                    margin-top: -.02rem;
                }
            }
        }
    }
    &__q {
        @include fullfill;
        @include box;
        &__cnt {
            position: relative;
            width: 80vw;
            padding: .3rem .2rem .2rem;
            box-sizing: border-box;
            border-radius: $radius;
            z-index: 10;
            &__bg {
                @include fullfill;
                z-index: -1;
            }
            &__no {
                font-size: .1rem;
                font-weight: bold;
                margin-bottom: .1rem;
                span {
                    font-size: .22rem;
                }
            }
            &__question {
                font-size: .16rem;
                line-height: .24rem;
                font-weight: bold;
                text-align: left;
                margin-bottom: .1rem;
                white-space: pre-wrap;
            }
            &__countdown {
                @include box;
                position: relative;
                width: 72px;
                height: 72px;
                margin: 20px auto 0px;
                margin-bottom: .3rem;
                &__canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }
                &__text {
                    font-size: 40px;
                }
            }
            &__answer {
                transition: all linear .2s;
                line-height: .46rem;
                font-size: .16rem;
                margin-bottom: .2rem;
                text-align: left;
                background: $c-gray;
                padding: 0 .14rem;
                border-radius: .23rem;
                &.active {
                    background: $c-lighterorange;
                }
                &.right {
                    color: white;
                    background: $c-lightgreen;
                    .game-rank__q__cnt__answer__status {
                        background-image: url('https://static.cdn.24haowan.com/img/32/32152324198229116.png');
                    }
                }
                &.wrong {
                    color: white;
                    background: $c-lightred;
                    .game-rank__q__cnt__answer__status {
                        background-image: url('https://static.cdn.24haowan.com/img/32/3215232419825210.png');
                    }
                }
                &__index {
                    font-weight: bold;
                    font-size: .2rem;
                    vertical-align: bottom;
                }
                &__status {
                    @include bg-contain;
                    width: .3rem;
                    height: .3rem;
                    margin-right: .1rem;
                    display: inline-block;
                    vertical-align: middle;
                }
            }
        }
    }
    &__result {
        @include fullfill;
        @include box;
        z-index: 20;
        background: $c-mask-normal;
        &__cnt {
            position: relative;
            background: white;
            border-radius: $radius * 2;
            width: 80vw;
            padding: .2rem;
            box-sizing: border-box;
            &.success {
                .game-rank__result__cnt__img {
                    background-image: url('https://static.cdn.24haowan.com/img/32/32152324198256436.png');
                }
            }
            &.fail {
                .game-rank__result__cnt__img {
                    background-image: url('https://static.cdn.24haowan.com/img/32/32152324198247625.png');
                }
                .game-rank__result__cnt__info__gold {
                    color: $c-text-gray;
                }
            }
            &__close {
                position: absolute;
                top: 0;
                right: 0;
                width: 7vw;
                transform: translate(-50%, -100%);
            }
            &__img {
                @include bg-contain;
                margin-bottom: .14rem;
                height: .7rem;
            }
            &__info {
                border-top: 1px solid $c-border-gray;
                border-bottom: 1px solid $c-border-gray;
                padding: .14rem 0;
                &__headimg {
                    height: .64rem;
                    width: .64rem;
                    border-radius: 50%;
                    margin-bottom: .1rem;
                }
                &__level {
                    font-size: .12rem;
                    margin-bottom: .06rem;
                    &__icon {
                        height: .2rem;
                        margin-top: -.02rem;
                        vertical-align: middle;
                        margin-right: .02rem;
                    }
                }
                &__gold {
                    @include box;
                    color: $c-orange;
                    font-size: .12rem;
                    margin-bottom: .06rem;
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
                &__prize {
                    font-size: 0;
                    color: $c-orange;
                    font-weight: bold;
                    span {
                        line-height: .3rem;
                        font-size: .3rem;
                        vertical-align: middle;
                        display: inline-block;
                        &:first-child {
                            margin-top: -.04rem;
                        }
                        &:last-child {
                            margin-left: .04rem;
                            font-size: .2rem;
                        }
                    }
                }
                &__remind {
                    color: $c-text-gray;
                    font-size: .12rem;
                    line-height: .18rem;
                }
            }
            &__btns {
                font-size: 0;
                padding: .14rem 0 0;
                &__btn {
                    display: inline-block;
                    width: 40%;
                    line-height: .4rem;
                    border-radius: .2rem;
                    font-weight: bold;
                    font-size: .16rem;
                    &:first-child {
                        background: $c-orange;
                        margin-right: 3%;
                    }
                    &:last-child {
                        background: $c-darkyellow;
                        margin-left: 3%;
                    }
                }
            }
        }
    }
}
</style>
