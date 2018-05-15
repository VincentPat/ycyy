<template>
    <div id="app">
        <transition name="fade" appear>
            <keep-alive>
                <router-view/>
            </keep-alive>
        </transition>
        <sk-toast ref="toast"></sk-toast>
    </div>
</template>

<script>
import axios from 'axios';
import utils from '@/plugin/utils';
import skToast from '@/components/common/sk-toast';

export default {
    name: 'App',
    components: {
        skToast
    },
    computed: {
        authJwt() {
            return `Bearer ${this.jwt}`;
        }
    },
    data() {
        return {
            envData: {},
            code: utils.getQueryParams('hw_auth_code'),
            jwt: null,
            testCount: 0
        };
    },
    methods: {
        // 初始化事件监听
        initEvents() {
            this.$bus.$on('tapCount', () => {
                this.testCount += 1;
                if (this.testCount === 5) {
                    const head = document.querySelectorAll('head')[0];
                    const script = document.createElement('script');
                    script.src = '//24haowan-cdn.shanyougame.com/public/js/vconsole.min.js';
                    head.appendChild(script);
                }
            });
            this.$bus.$on('showRemind', (content) => {
                this.$refs.toast.show({
                    content
                });
            });
            this.$bus.$on('collectGold', this.collectGold);
            this.$bus.$on('updateUserInfo', this.getUserInfo);
            this.$bus.$on('getRankData', this.getRankData);
            this.$bus.$on('getUserRankData', this.getUserRankData);
            // 红包赛
            this.$bus.$on('exchangeLife', this.exchangeLife);
            this.$bus.$on('submitCode', this.submitCode);
            this.$bus.$on('getGiftmoneyCode', this.getGiftmoneyCode);
            this.$bus.$on('startGameGiftmoney', this.startGameGiftmoney);
            // 排位赛
            this.$bus.$on('startGameRank', this.startGameRank);
            this.$bus.$on('getQuestion', this.getQuestion);
            this.$bus.$on('submitAnswer', this.submitAnswer);
        },
        /**
         * 首页相关接口
         */
        // 获取JWT
        getJWT() {
            if (this.code) {
                return axios({
                    url: 'http://auth.24haowan.com/jwt/token',
                    methods: 'get',
                    params: {
                        code: this.code
                    }
                }).then((response) => {
                    const result = response.data;
                    if (result.code === 0) {
                        // 设置授权信息到localStorage里面
                        this.setAuthData(result.data);
                    } else {
                        this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                    }
                    console.log('获取JWT', result);
                }).catch((error) => {
                    console.error(error);
                    this.getAuthData();
                    // this.$bus.$emit('showRemind', `系统错误，错误代码：${error.response.data.code}`);
                });
            }
            return new Promise((resolve) => {
                this.getAuthData();
                resolve();
            });
        },
        // 使用本地的auth_data
        getAuthData() {
            let authData = window.localStorage.getItem('auth_data');
            if (authData) {
                authData = JSON.parse(authData);
                this.setAuthData(authData);
            } else {
                this.setAuthData();
            }
        },
        // 设置授权信息到localStorage里面
        setAuthData(data) {
            // 测试数据
            const testData = {
                resid: '66467208',
                openid: '65552',
                wxappid: 'wx6010f04ec7ebf4f6',
                scope: 'private',
                exp: 1523278904,
                nickname: 'Very Good',
                headimgurl: 'http://wx.qlogo.cn/mmopen/PiajxSqBRaEJICibJm3XNYwAGFHhHWfPYuiaJZQTGaw0gqgCeVjd4ZyTOC55ADMPBPaE1ROfEJhwCAn9HtIlhZRuA/0',
                jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXNpZCI6IjY2NDY3MjA4Iiwib3BlbmlkIjoiNjU1NTIiLCJ3eGFwcGlkIjoid3g2MDEwZjA0ZWM3ZWJmNGY2Iiwic2NvcGUiOiJwcml2YXRlIiwiZXhwIjoxNTI0MDE2NjU1LCJpYXQiOjE1MjM0MTE4NTV9.WFCvprapSCPQwyT28nbet228j7LpAKD0xiSA3JW-L5E'
            };
            const authData = data || testData;
            this.jwt = authData.jwt;
            this.$bus.userInfo.headimg = authData.headimgurl;
            this.$bus.userInfo.name = authData.nickname;
            this.$bus.userInfo.openid = authData.openid;
            console.log('set auth_data: ', JSON.stringify(authData));
            window.localStorage.setItem('auth_data', JSON.stringify(authData));
        },
        // 获取活动配置
        getConfig() {
            axios({
                url: `${this.envData.host}/config`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                if (result) {
                    this.$bus.config.banners = result.banners;
                    this.$bus.levels = [];
                    result.level_map.forEach((level) => {
                        this.$bus.levels.push(Object.assign({}, level));
                    });
                    this.$bus.config.lifeCost = result.gold2redpack_cost;
                    this.$bus.config.rankCost = result.rank_cost;
                    this.$bus.config.giftmoneyCost = result.redpack_cost;
                    this.$bus.config.goldNum = result.collect_gold_num;
                    this.$bus.config.goldGap = result.collect_gold_gap;
                    this.$bus.config.env = result.env;
                    if (this.$bus.config.env === 'test') {
                        this.$bus.config.giftmoneyStatus = 'wait';
                        this.$bus.config.giftmoneyNextTime = null;
                    }
                    // this.$bus.config.giftmoneyNextTime = result.redpact_next_time;
                }
                console.log('获取活动配置', result);
            }).catch((error) => {
                console.error(error);
            });
        },
        // 上传用户信息
        uploadUserInfo() {
            return axios({
                url: `${this.envData.host}/userinfo`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                },
                data: {
                    user_img: this.$bus.userInfo.headimg,
                    nick_name: this.$bus.userInfo.name
                }
            }).then((response) => {
                const result = response.data;
                console.log('上传用户信息', result);
            }).catch((error) => {
                console.error(error);
            });
        },
        // 获取用户信息
        getUserInfo() {
            axios({
                url: `${this.envData.host}/userinfo`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                if (result) {
                    this.$bus.userInfo.gold = result.gold;
                    this.$bus.userInfo.goldTotal = result.gold_total;
                    this.$bus.userInfo.moneyTotal = result.money;
                    this.$bus.userInfo.level = result.level;
                    this.$bus.userInfo.goldNextTime = result.get_gold_time;
                    this.$bus.userInfo.uid = result.uid;
                }
                console.log('获取用户信息', result);
                // 同步一下生命值
                this.isUserExist().then((result2) => {
                    if (result2.code === '0') { // 用户存在
                        this.userExistCallback(result2.blood);
                    }
                });
                // 获取当前可提现金额
                this.getGiftmoneyCode();
            }).catch((error) => {
                console.error(error);
            });
        },
        // 收集金币
        collectGold() {
            axios({
                url: `${this.envData.host}/gold`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                if (result) {
                    this.$bus.userInfo.goldNextTime = result.data;
                    this.$bus.$emit('collectGoldSuccess');
                    // 同步一下用户数据
                    this.getUserInfo();
                }
                console.log('收集金币', result);
            }).catch((error) => {
                console.error(error);
            });
        },
        // 获取排行榜数据
        getRankData(options) {
            axios({
                url: `${this.envData.host}/rank`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                },
                params: options
            }).then((response) => {
                const result = response.data;
                this.$bus.$emit('getRankDataSuccess', result);
                console.log('获取排行榜数据', result);
            }).catch((error) => {
                console.error(error);
            });
        },
        // 获取个人排行榜数据
        getUserRankData(type) {
            axios({
                url: `${this.envData.host}/my_rank`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                },
                params: {
                    type
                }
            }).then((response) => {
                const result = response.data;
                const rankType = type === 'redpack' ? 'giftmoney' : 'level';
                this.$bus.userInfo.rank[rankType] = result.rank;
                console.log('获取个人排行榜数据', result);
            }).catch((error) => {
                console.error(error);
            });
        },
        /**
         * 红包赛相关接口
         */
        // 获取红包赛生命值
        isUserExist() {
            return axios({
                url: `${this.envData.host2}/blood`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                console.log('获取红包赛生命值', result);
                return result;
            }).catch((error) => {
                console.error(error);
                const result = error.response.data;
                if (result.code === '0002') { // 用户不存在
                    this.registerUser().then((result2) => {
                        this.uploadUserInfo().then(this.getUserInfo);
                        this.userExistCallback(result2.blood);
                    });
                }
            });
        },
        // 获取红包赛信息
        getGiftmoneyGameInfo() {
            axios({
                url: `${this.envData.host2}/info`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                // 下场开始时间
                if (result.start_time) {
                    if (result.start_time > Date.now()) {
                        const startTime = new Date(result.start_time);
                        this.$bus.config.giftmoneyNextTime = utils.dateFormat(startTime, 'yyyy/MM/dd HH:mm:ss');
                    } else {
                        this.$bus.config.giftmoneyNextTime = null;
                    }
                }
                // 红包赛状态
                if (this.$bus.config.env === 'test') {
                    this.$bus.config.giftmoneyStatus = 'wait';
                    this.$bus.config.giftmoneyNextTime = null;
                } else {
                    this.$bus.config.giftmoneyStatus = result.status;
                }

                // 写死一个时间
                // this.$bus.config.giftmoneyNextTime = null;
                // this.$bus.config.giftmoneyStatus = 'wait';

                console.log('获取红包赛信息', result);
                return result;
            }).catch((error) => {
                console.error(error);
            });
        },
        // 注册用户
        registerUser() {
            return axios({
                url: `${this.envData.host2}/register`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                },
                data: {
                    user_img: this.$bus.userInfo.headimg,
                    nick_name: this.$bus.userInfo.name
                }
            }).then((response) => {
                const result = response.data;
                if (result.code === '0') {
                    this.$bus.userInfo.invitationCode = result.invitation_code;
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
                console.log('注册用户', result);
                return result;
            }).catch((error) => {
                console.error(error);
                this.$bus.$emit('showRemind', `系统错误，错误代码：${error.response.data.code}`);
            });
        },
        // 用户存在的回调
        userExistCallback(blood) {
            this.$bus.userInfo.life = blood;
            this.getInvitationCode();
        },
        // 获取邀请码
        getInvitationCode() {
            axios({
                url: `${this.envData.host2}/invitation`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                if (result.code === '0') {
                    this.$bus.userInfo.invitationCode = result.invitation_code;
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
                console.log('获取邀请码', result);
            }).catch((error) => {
                console.error(error);
                this.$bus.$emit('showRemind', `系统错误，错误代码：${error.response.data.code}`);
            });
        },
        // 提交邀请码
        submitCode(code) {
            axios({
                url: `${this.envData.host2}/invitation`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                },
                data: {
                    code
                }
            }).then((response) => {
                const result = response.data;
                if (result.code === '0') {
                    this.$bus.$emit('submitCodeSuccess');
                    // 同步一下生命值
                    this.isUserExist().then((result2) => {
                        if (result2.code === '0') { // 用户存在
                            this.userExistCallback(result2.blood);
                        }
                    });
                    this.$bus.$emit('showRemind', '邀请码兑换成功！');
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
                console.log('提交邀请码', result);
            }).catch((error) => {
                console.error(error);
                const result = error.response.data;
                if (result.code === '0100') {
                    this.$bus.$emit('showRemind', '邀请码无效，请重新输入！');
                } else if (result.code === '0101') {
                    this.$bus.$emit('showRemind', '已输入过该邀请码，请重新输入！');
                } else if (result.code === '0102') {
                    this.$bus.$emit('showRemind', '不能使用自己的邀请码，请重新输入！');
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
            });
        },
        // 兑换生命值
        exchangeLife(times) {
            axios({
                url: `${this.envData.host}/exchange`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                },
                data: {
                    num: times
                }
            }).then((response) => {
                const result = response.data;
                this.$bus.$emit('exchangeLifeSuccess');
                this.$bus.$emit('showRemind', '兑换成功！');
                // 同步一下生命值
                this.isUserExist().then((result2) => {
                    if (result2.code === '0') { // 用户存在
                        this.userExistCallback(result2.blood);
                    }
                });
                // 同步一下用户数据
                this.getUserInfo();
                console.log('兑换生命值', result);
            }).catch((error) => {
                console.error(error);
                const result = error.response.data;
                if (result.code === '-1') {
                    this.$bus.$emit('showRemind', '您的金币数量不足！');
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
            });
        },
        // 获取现金兑换码
        getGiftmoneyCode() {
            axios({
                url: `${this.envData.host3}/account/code`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                this.$bus.userInfo.money = result.data.total;
                this.$bus.userInfo.giftmoneyCode = result.data.rpCode;
                console.log('获取现金兑换码', result);
            }).catch((error) => {
                console.error(error);
            });
        },
        // 开始红包赛
        startGameGiftmoney() {
            axios({
                url: `${this.envData.host2}/redpack/join`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                this.$router.push('game-giftmoney');
                // 同步一下生命值
                this.userExistCallback(result.blood);
                console.log('开始红包赛', result);
            }).catch((error) => {
                console.error(error);
                const result = error.response.data;
                if (result.code === '0006') {
                    this.$bus.$emit('showRemind', '生命值不足！');
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
            });
        },
        /**
         * 排位赛相关接口
         */
        startGameRank() {
            axios({
                url: `${this.envData.host}/level/join`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                this.$bus.$emit('startGameRankSuccess');
                // 同步一下用户数据
                this.getUserInfo();
                console.log('开始排位赛', result);
            }).catch((error) => {
                console.error(error);
                this.$bus.$emit('startGameRankFailed');
                const result = error.response.data;
                if (result.code === '-1') {
                    this.$bus.$emit('showRemind', '您的金币数量不足！');
                } else {
                    this.$bus.$emit('showRemind', `系统错误，错误代码：${result.code}`);
                }
            });
        },
        getQuestion() {
            axios({
                url: `${this.envData.host}/question`,
                method: 'get',
                headers: {
                    Authorization: this.authJwt
                }
            }).then((response) => {
                const result = response.data;
                this.$bus.$emit('getQuestionSuccess', result);
                console.log('获取题目', result);
            }).catch((error) => {
                console.error(error);
                this.$bus.$emit('showRemind', `系统错误，错误代码：${error.response.data.code}`);
            });
        },
        submitAnswer(index) {
            axios({
                url: `${this.envData.host}/question`,
                method: 'post',
                headers: {
                    Authorization: this.authJwt
                },
                data: {
                    question: index
                }
            }).then((response) => {
                const result = response.data;
                this.$bus.$emit('getAnswer', result);
                console.log('提交答案', result);
            }).catch((error) => {
                console.error(error);
                this.$bus.$emit('showRemind', `系统错误，错误代码：${error.response.data.code}`);
            });
        }
    },
    mounted() {
        this.envData = this.$bus.envData;
        this.initEvents();
        // 首页接口
        this.getJWT().then(() => {
            this.getConfig();
            // 红包赛接口
            this.isUserExist().then((result) => {
                if (result.code === '0') { // 用户存在
                    this.uploadUserInfo().then(this.getUserInfo);
                    this.userExistCallback(result.blood);
                }
            });
            // 获取红包赛信息
            this.getGiftmoneyGameInfo();
        });
    }
};
</script>

<style lang="scss">
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    font-size: .14rem;
    .sk-toast {
        z-index: 1000;
    }
}
</style>
