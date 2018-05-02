<template>
    <div class="rank">
        <div class="rank__back">
            <sk-back
                :img="backImg">
            </sk-back>
        </div>
        <img class="rank__rule"
            src="https://static.cdn.24haowan.com/img/32/32152239442180135.png"
            @click="showRule">
        <div class="rank__title"></div>
        <div class="rank__tabs">
            <div class="rank__tabs__tab"
                @click="toLevel"
                :class="{ active: currentType === 'level' }">
                <span>段位榜</span>
            </div>
            <div class="rank__tabs__tab"
                @click="toGiftmoney"
                :class="{ active: currentType === 'giftmoney' }">
                <span>红包榜</span>
            </div>
        </div>
        <div class="rank__list">
            <rank-item v-for="(item, index) in rankData"
                :key="index"
                :rank="index+1"
                :name="item.nick_name"
                :headimg="item.user_img"
                :levelIcon="levels[item.level].img"
                :levelName="levels[item.level].name"
                :gold="item.gold_total"
                :money="item.money"
                :type="currentType">
            </rank-item>
            <div class="rank__list__remind" v-html="remind"></div>
        </div>
        <div class="rank__self">
            <rank-item :rank="userInfo.rank[currentType]"
                :name="userInfo.name"
                :headimg="userInfo.headimg"
                :levelIcon="level.img"
                :levelName="level.name"
                :gold="userInfo.goldTotal"
                :money="userInfo.moneyTotal"
                :type="currentType">
            </rank-item>
        </div>
        <transition name="fade">
            <modal-rank @hide="hideRule"
                v-show="showRuleModal">
            </modal-rank>
        </transition>
    </div>
</template>

<script>
import skBack from '@/components/common/sk-back';
import rankItem from '@/components/rank-item';
import modalRank from '@/components/modal-rank';

export default {
    name: 'rank',
    components: {
        skBack,
        rankItem,
        modalRank
    },
    computed: {
        userInfo() {
            return this.$bus.userInfo;
        },
        levels() {
            return this.$bus.levels;
        },
        level() {
            return this.$bus.level;
        },
        remind() {
            return this.currentType === 'level' ? '没有更多了' : '只显示前50名';
        }
    },
    data() {
        return {
            backImg: 'https://static.cdn.24haowan.com/img/32/3215227401617344.png',
            showRuleModal: false,
            rankData: [],
            currentPage: 0,
            pageSize: 20,
            currentType: 'level',
            loadingRank: false,
            done: false
        };
    },
    methods: {
        showRule() {
            this.showRuleModal = true;
        },
        hideRule() {
            this.showRuleModal = false;
        },
        toLevel() {
            if (!this.loadingRank) {
                this.rankData = [];
                this.currentPage = 0;
                this.currentType = 'level';
                this.getRankData();
            }
        },
        toGiftmoney() {
            if (!this.loadingRank) {
                this.rankData = [];
                this.currentPage = 0;
                this.currentType = 'giftmoney';
                this.getRankData();
            }
        },
        getRankData() {
            if (!this.loadingRank) {
                this.currentPage += 1;
                const start = (this.currentPage - 1) * this.pageSize;
                let end = this.currentPage * this.pageSize - 1;
                if (end <= start) end = start + this.pageSize;
                if (this.currentType === 'giftmoney') end = end > 49 ? 49 : end;
                this.$bus.$emit('getRankData', {
                    start,
                    end,
                    type: this.currentType === 'giftmoney' ? 'redpack' : 'level'
                });
                this.loadingRank = true;
            }
        },
        getUserRankData() {
            const type = this.currentType === 'giftmoney' ? 'redpack' : 'level';
            this.$bus.$emit('getUserRankData', type);
        },
        initScroll() {
            const list = document.querySelectorAll('.rank__list')[0];
            list.addEventListener('scroll', () => {
                const scrollTop = list.scrollTop;
                const scrollHeight = list.scrollHeight;
                const clientHeight = list.clientHeight;
                if (scrollTop > (scrollHeight - clientHeight) * 0.8
                    && !this.loadingRank && !this.done) {
                    this.getRankData();
                }
            });
        }
    },
    mounted() {
        this.$bus.$on('refreshRank', () => {
            if (this.currentType === 'level') {
                this.toLevel();
            } else {
                this.toGiftmoney();
            }
        });
        this.$bus.$on('getRankDataSuccess', (data) => {
            this.loadingRank = false;
            if (this.currentPage === 1) {
                this.rankData = [];
                this.done = false;
                this.getUserRankData();
            }
            this.rankData = this.rankData.concat(data.data);
            if (data.data.length < this.pageSize) this.done = true;
        });
        this.getRankData();
        this.initScroll();
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.rank {
    @include fullscreen;
    @include bg-cover;
    overflow: hidden;
    background-image: url('https://static.cdn.24haowan.com/img/32/32152239442810200.png');
    &__back {
        position: absolute;
        width: $size_top_btn;
        height: $size_top_btn;
        top: $margin;
        left: $margin;
        z-index: 10;
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
    &__title {
        @include bg-contain;
        background-image: url('https://static.cdn.24haowan.com/img/32/3215227398751472.png');
        height: $h_title;
        width: 100%;
        margin: $margin 0;
    }
    &__tabs {
        @include box;
        background: $c-orange-opacity;
        line-height: 7vh;
        height: 7vh;
        font-size: .14rem;
        font-weight: bold;
        &__tab {
            flex: 1;
            span {
                position: relative;
                display: inline-block;
            }
            &.active {
                span {
                    &:before {
                        content: '';
                        position: absolute;
                        bottom: 20%;
                        left: 0;
                        width: 100%;
                        height: 2px;
                        background: $c-red;
                    }
                }
            }
        }
    }
    &__list {
        width: 100%;
        height: 80vh;
        background: white;
        -webkit-overflow-scrolling: touch;
        overflow-x: hidden;
        overflow-y: auto;
        padding-bottom: $h_rank_item;
        box-sizing: border-box;
        &__remind {
            font-size: .12rem;
            color: $c-text-gray;
            line-height: .4rem;
        }
    }
    &__self {
        position: absolute;
        left: 0;
        bottom: -.01rem;
        width: 100%;
        background: $c-orange;
        box-shadow: 0px -2px 4px 0px $c-mask-light;
        color: white;
    }
}
</style>
