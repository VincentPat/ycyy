import Vue from 'vue';
import Router from 'vue-router';
import home from '@/components/home';
import rule from '@/components/rule';
import level from '@/components/level';
import rank from '@/components/rank';
import myzone from '@/components/myzone';
import gameRank from '@/components/game-rank';
import gameGiftmoney from '@/components/game-giftmoney';
import share from '@/components/share';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            component: home
        },
        {
            path: '/rule',
            name: 'rule',
            component: rule
        },
        {
            path: '/rank',
            name: 'rank',
            component: rank
        },
        {
            path: '/myzone',
            name: 'myzone',
            component: myzone
        },
        {
            path: '/level',
            name: 'level',
            component: level
        },
        {
            path: '/game-rank',
            name: 'gameRank',
            component: gameRank
        },
        {
            path: '/game-giftmoney',
            name: 'gameGiftmoney',
            component: gameGiftmoney
        },
        {
            path: '/share',
            name: 'share',
            component: share
        }
    ]
});
