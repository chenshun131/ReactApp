const router = require('koa-router')();

router.prefix('/api/search/:page/:city/:category');

// 搜索结果页 - 搜索结果 - 三个参数
router.get('/', async (ctx, next) => {
    console.log('搜索结果页 - 搜索结果');

    // 参数
    const params = ctx.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);

    ctx.body = searchListData;
});

// 搜索结果页 - 搜索结果 - 四个参数
var searchListData = require('./search/list.js');
router.get('/:keyword', async (ctx, next) => {
    console.log('搜索结果页 - 搜索结果');

    // 参数
    const params = ctx.params;
    const paramsPage = params.page;
    const paramsCity = params.city;
    const paramsCategory = params.category;
    const paramsKeyword = params.keyword;

    console.log('当前页数：' + paramsPage);
    console.log('当前城市：' + paramsCity);
    console.log('当前类别：' + paramsCategory);
    console.log('关键字：' + paramsKeyword);

    ctx.body = searchListData;
});

module.exports = router;
