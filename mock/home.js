const router = require('koa-router')();

router.prefix('/api');

// 首页 —— 广告（超值特惠）
var homeAdData = require('./home/ad.js');
router.get('/homead', async (ctx, next) => {
    console.log('首页 —— 广告（超值特惠）');
    ctx.body = homeAdData
});

// 首页 —— 推荐列表（猜你喜欢）
var homeListData = require('./home/list.js');
router.get('/homelist/:city/:page', async (ctx, next) => {
    console.log('首页 —— 推荐列表（猜你喜欢）');

    // 参数
    const params = ctx.params;
    const paramsCity = params.city;
    const paramsPage = params.page;

    console.log('当前城市：' + paramsCity);
    console.log('当前页数：' + paramsPage);

    ctx.body = homeListData
});

module.exports = router;
