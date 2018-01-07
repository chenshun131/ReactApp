const router = require('koa-router')();

router.prefix('/api/detail');

// 详情页 - 商户信息
const detailInfo = require('./detail/info.js');
router.get('/info/:id', async (ctx, next) => {
    console.log('详情页 - 商户信息');

    const params = ctx.params;
    const id = params.id;

    console.log('商户id: ' + id);

    ctx.body = detailInfo;
});

// 详情页 - 用户评论
const detailComment = require('./detail/comment.js');
router.get('/comment/:page/:id', async (ctx, next) => {
    console.log('详情页 - 用户点评');

    const params = ctx.params;
    const page = params.page;
    const id = params.id;

    console.log('商户id: ' + id);
    console.log('当前页数: ' + page);

    ctx.body = detailComment;
});

module.exports = router;
