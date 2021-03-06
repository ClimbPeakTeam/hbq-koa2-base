/**
 * test
 */
// import * as QRCode from 'qrcode'
const { ftpHelper } = appUtils.requireCommon()
export default (router, { controller }) => {
    router.get('/ejs', async (ctx, next) => {
        await ctx.render('ejs/index.html', { title: 'ejs' })
    })
    router.get('/ftp2', async (ctx, next) => {
        ctx.body = await ftpHelper.uploadUploadFiles()
    })
    router.get('/ftp', async (ctx, next) => {
        ctx.body = await ftpHelper.uploaDistFiles()
    })
    const { createSendRouter } = require('../helper/send')
    createSendRouter(router, '/send1', ['upload', '1.jpg'])
    createSendRouter(router, '/send2', ['upload', '1.mp3'])
    let x = 1
    router.get('/a', async (ctx, next) => {

        ctx.session.aaa = ctx.session.aaa || 1
        ctx.session.aaa = ctx.session.aaa + 1
        ctx.body = JSONResponse(1, { a: 1, b: 2, c: 3, aaa: ctx.session.aaa }, '成功')
    })
    router.get('/b', async (ctx, next) => {
        await ctx.send(ctx, 'index.html', { root: 'public/html' })
    })
    // router.get('/qrcode', async (ctx) => {
    //     let base64 = await new Promise(resolve => {
    //         QRCode.toDataURL('http://baidu.com', function (err, base64) {
    //             resolve(base64)
    //         })
    //     })
    //     base64 = base64.toString()//.replace(/^data:image\/\w+;base64,/, '')

    //     ctx.body = base64
    // })
    //////////
    router.post('/', controller.bindAction('add'))
    router.delete('/:_id', controller.bindAction('delete'))
    router.put('/:_id', controller.bindAction('update'))
    router.get('/page/:pageSize/:pageIndex', controller.bindAction('getPage'))
    router.get('/:_id', controller.bindAction('getById'))
} 