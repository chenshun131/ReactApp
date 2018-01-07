const router = require('koa-router')();

router.prefix('/api');

// 订单列表
const orderList = require('./orderlist/orderList.js');
router.get('/orderlist/:username', async (ctx, next) => {
    console.log('订单列表');

    const params = ctx.params;
    const username = params.username;
    console.log('用户名：' + username);

    ctx.body = orderList;
});

// 提交评论
router.post('/submitComment', async (ctx, next) => {
    console.log('提交评论');

    // 获取参数
    ctx.body = {
        errno: 0,
        msg: 'ok'
    };
});

module.exports = router;
