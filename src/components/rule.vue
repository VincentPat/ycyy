<template>
    <div class="rule">
        <div class="rule__back">
            <sk-back
                :img="backImg">
            </sk-back>
        </div>
        <div class="rule__title">
            <span>活动规则</span>
        </div>
        <div class="rule__cnt">
            <p style="padding-left: 0;">粤闯越勇活动以下简称为：本次活动。</p>
            <p>
                <span>1</span>
                <span>-</span>
                活动时间：2018年4月至2019年3月（如主办方调整活动时间，则以主办方另行调整为准）。
            </p>
            <p>
                <span>2</span>
                <span>-</span>
                活动对象：花生FMAPP Android V23.3.3、iOS V23.3.3版本及以上用户。
            </p>
            <p>
                <span>3</span>
                <span>-</span>
                结果公布：每期赛事活动结束后，在活动结束页面立即公布。
            </p>
            <p>
                <span>4</span>
                <span>-</span>
                任何疑问可以通过花生FM内反馈页面进行咨询。
            </p>
            <h4>排位赛</h4>
            <p>
                <span>1</span>
                <span>-</span>
                新用户登录、邀请好友答题均可获得相应奖励。
            </p>
            <p>
                <span>2</span>
                <span>-</span>
                当用户拥有金币数量大于10，即可选进排位赛，每局10金币，中途退出金币不退还。金币数量低于10的用户，无权参加排位比赛。
            </p>
            <p>
                <span>3</span>
                <span>-</span>
                每局共5道题，每题答题时间为10秒，选出用户认为正确的一项，答案不可修改。
            </p>
            <p>
                <span>4</span>
                <span>-</span>
                排行榜以及玩家段位每月月末将进行清空，次月开始可重新挑战争夺新的排行。当前剩余使用金币不作清空，可继续使用。
            </p>
            <h4>红包赛</h4>
            <p>
                <span>1</span>
                <span>-</span>
                游戏将定期定时举行，请留意开始活动时间。避免错过游戏时间。
            </p>
            <p>
                <span>2</span>
                <span>-</span>
                500金币可兑换1点生命值，主办方有权调整生命值与金币的兑换比例，以主办方另行调整为准。
            </p>
            <p>
                <span>3</span>
                <span>-</span>
                进入红包赛无需消耗生命值，每复活一次需消耗1点生命值，最后一题无法复活，且中途退出生命值不得退还。
            </p>
            <p>
                <span>4</span>
                <span>-</span>
                每场红包赛由多名用户参加。
            </p>
            <p>
                <span>5</span>
                <span>-</span>
                每局共12道题，请在10秒内选择你认为正确的答案，答案不可修改。超时或答错即出局，无法角逐当期奖金。注：可通过邀请好友和兑换金币获得生命值。
            </p>
            <p>
                <span>6</span>
                <span>-</span>
                成功通关的人将平分当期所有奖金，若只有一人通关成功则独享该笔奖金。如果所有人都被淘汰出局，则当期奖金流失。
            </p>
            <h4>提现规则</h4>
            <p>
                <span>1</span>
                <span>-</span>
                获取的游戏奖金您需点击提现按钮获取兑换码，然后到微信公众号"佛山电台”
                （可截图下方二维码到微信端识别关注），回复兑换码领取红包奖金。
                注: 红包推送后24小时未领取会自动失效，敬请及时领取哦!
            </p>
            <img src="https://static.cdn.24haowan.com/img/32/32152333153821476.jpg">
            <h4>法律声明</h4>
            <p style="padding-left: 0;">参与“粤闯越勇”活动前请详细阅读活动规则及全部法律声明条款。
                凡参与本次活动，则已阅读、理解并同意活动规则及全部法律声明条款。</p>
            <p style="padding-left: 0;">活动由花生FM主办，以下统称活动主办方。</p>
            <p>
                <span>1</span>
                <span>-</span>
                本活动奖金获取和发放条件，由活动主办方根据活动需要设定。
            </p>
            <p>
                <span>2</span>
                <span>-</span>
                禁止用户以任何不正当手段及舞弊行为参与本活动，一经发现，
                活动主办方有权根据行为严重情况采取一或多种惩罚措施，
                惩罚措施包括但不限于取消用户本次活动参与资格，
                所有未发放的奖金或金币不再发放、已发放的奖金禁止提现，
                同时有权封禁该账号。不正当手段及舞弊行为包括但不限于以下：
                通过非官方客户端入口参与；使用模拟器、插件外挂等非法工具下载、注册、答题；
                恶意篡改设备数据，伪造成用户参与；其他认定为舞弊的行为。
            </p>
            <p>
                <span>3</span>
                <span>-</span>
                如遇不可抗力因素导致本次活动无法进行或暂停举办，或因公司、活动调整，活动主办方有权随时决定取消、修改、暂停或终止本活动，活动主办方无需为此承担赔偿或进行任何形式的补偿。
            </p>
            <p>
                <span>4</span>
                <span>-</span>
                因第三方通过技术手段恶意攻击或篡改致使中奖发生错误，活动主办方不负法律责任或经济责任。
            </p>
            <p>
                <span>5</span>
                <span>-</span>
                活动期间，因用户操作不当或用户所在地区网络故障、支付平台网络不畅、电信运营商故障等非活动主办方所能控制的原因导致用户无法参与活动或参与失败,活动主办方不予负责。
            </p>
            <p>
                <span>6</span>
                <span>-</span>
                请用户务必在官方活动页面参与本次活动。任何人或第三方冒用活动主办方的名义从事类似活动或恶意通知用户中奖，造成用户损失的,损失由用户个人承担。
            </p>
            <p>
                <span>7</span>
                <span>-</span>
                活动主办方可根据活动举办的实际情况，在法律允许的范围内，对本次活动规则进行变动或调整，相关变动或调整将公布在活动规则页面上，并于公布时即时生效。
            </p>
        </div>
        <transition name="fade">
            <img src="https://static.cdn.24haowan.com/img/32/32152274016118597.png"
                class="rule__remind wanderVer"
                v-show="showRemind">
        </transition>
    </div>
</template>

<script>
import skBack from '@/components/common/sk-back';

export default {
    name: 'rule',
    components: {
        skBack
    },
    data() {
        return {
            backImg: 'https://static.cdn.24haowan.com/img/32/3215227401617344.png',
            showRemind: true
        };
    },
    mounted() {
        const cnt = document.querySelectorAll('div.rule__cnt')[0];
        const scrollCallback = () => {
            if (cnt.scrollTop >= 20) {
                this.showRemind = false;
                cnt.removeEventListener('scroll', scrollCallback);
            }
        };
        cnt.addEventListener('scroll', scrollCallback);
    }
};
</script>

<style lang="scss">
@import '../style/mixin.scss';
@import '../style/vars.scss';
@import '../style/color.scss';

.rule {
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
    &__cnt {
        position: absolute;
        top: 13vh;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        height: 87vh;
        padding: 0 $margin $margin;
        font-weight: bold;
        text-align: left;
        font-size: .14rem;
        p {
            margin-bottom: .1rem;
            line-height: .22rem;
            position: relative;
            padding-left: .28rem;
            text-align: justify;
            span {
                // font-family: 'numbers';
                position: absolute;
                font-size: .2rem;
                font-weight: bold;
                display: block;
                width: .14rem;
                height: .22rem;
                line-height: .22rem;
                text-align: center;
                top: 0;
                left: 0;
                &:nth-child(2) {
                    transform: translate(.14rem, -.02rem);
                }
            }
        }
        img {
            width: 1.6rem;
            margin: .1rem auto;
            display: block;
        }
        h4 {
            @include bg-contain;
            text-align: center;
            margin: .3rem auto .1rem;
            font-size: .16rem;
            line-height: .3rem;
            width: 30vw;
            background-image: url('https://static.cdn.24haowan.com/img/32/32152274016176393.png');
        }
    }
    &__remind {
        width: $size_top_btn;
        height: $size_top_btn;
        position: absolute;
        bottom: $margin/2;
        left: 50%;
        margin-left: -$size_top_btn/2;
    }
}
</style>
