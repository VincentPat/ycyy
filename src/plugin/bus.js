export default {
    install: function install(Vue) {
        const envData = {
            host: 'http://120.24.0.49:8081',
            host2: 'http://183.6.183.181:8081',
            host3: 'http://user.dt.24haowan.com',
            giftmoney: 'http://wx86c9e036cd37b848.test.24haowan.com/dt/?env=dev&mode=hsfm'
        };
        if (location.host.toLowerCase().indexOf('wx6010f04ec7ebf4f6.hsfm.dt.g.dd24pro.com') !== -1) {
            envData.host = 'http://hs.cbd549fcf7ce14862b7c69af14e6579fe.cn-shenzhen.alicontainer.com';
            envData.host2 = 'http://qa-web.cbd549fcf7ce14862b7c69af14e6579fe.cn-shenzhen.alicontainer.com';
            envData.giftmoney = 'http://wx6010f04ec7ebf4f6.hsfm.dt.g.dd24pro.com/dt/game.html';
        }

        // Event-bus 相当于简单的store
        const bus = new Vue({
            computed: {
                level() {
                    return Object.assign({}, this.levels[this.userInfo.level], {
                        level: this.userInfo.level
                    });
                }
            },
            data: {
                envData,
                userInfo: {
                    headimg: 'https://static.cdn.24haowan.com/img/32/32152051868661185.png',
                    name: '匿名用户',
                    uid: null,
                    openid: null,
                    gold: 0,
                    goldTotal: 0,
                    life: 0,
                    level: 0,
                    money: 0,
                    moneyTotal: 0,
                    goldNextTime: '2018-01-01 10:00:00',
                    invitationCode: '4768236',
                    rank: {
                        level: 0,
                        giftmoney: 0
                    },
                    giftmoneyCode: '3436hjhf767asff'
                },
                config: {
                    env: 'product',
                    rankCost: 0,
                    giftmoneyCost: 0,
                    lifeCost: 0,
                    goldNum: 0,
                    goldGap: 0,
                    giftmoneyNextTime: null,
                    giftmoneyStatus: 'wait',
                    banners: []
                },
                levels: [
                    {
                        img: 'https://static.cdn.24haowan.com/img/32/32152274093321291.png',
                        name: '新手黑铁',
                        gold: 20
                    },
                    {
                        img: 'https://static.cdn.24haowan.com/img/32/32152274093379026.png',
                        name: '进阶青铜',
                        gold: 100
                    },
                    {
                        img: 'https://static.cdn.24haowan.com/img/32/32152274093426826.png',
                        name: '娴熟白银',
                        gold: 200
                    },
                    {
                        img: 'https://static.cdn.24haowan.com/img/32/32152274093443868.png',
                        name: '尊贵黄金',
                        gold: 340
                    },
                    {
                        img: 'https://static.cdn.24haowan.com/img/32/32152274093344847.png',
                        name: '荣耀钻石',
                        gold: 500
                    },
                    {
                        img: 'https://static.cdn.24haowan.com/img/32/32152274093335048.png',
                        name: '粵级宗师',
                        gold: 700
                    }
                ]
            }
        });
        window.bus = bus;

        /* eslint no-param-reassign: ["error", { "props": false }] */
        Vue.prototype.$bus = bus;
    }
};

