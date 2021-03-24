const axios = require('axios');
class AeWechat{


    constructor( appid, appsecret ){
        this.appid = appid
        this.appsecret = appsecret
    }

    //验证、获取token
    async init(){
        const api=`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${this.appid}&secret=${this.appsecret}`
        const res = await axios.get(api)
        console.log(res.data)
        this.token = res.data.access_token
        return this
    }

    //新增单图文、多图文
    async createArticles( articles = [] ){
        const api=`https://api.weixin.qq.com/cgi-bin/material/add_news?access_token=${this.token}`
        const res = await axios.post( api , { articles  })
        return res.data
    }
       
}

const config = {
    appid : 'wx14401f2b01127b62',
    appsecret : 'a8130a82c9d7e568cfa2559a4b96f6f1',
}

class PostWxmp{

    constructor(){
        this.api = new AeWechat( config.appid, config.appsecret )
    }

    async create( title, slug, items = [] ){
        await this.api.init()
        return await this.api.createArticles([
            {
                "title": title,
                "thumb_media_id": 'y7qsf3-t-unAtMuVqdgoTfDjn_6v8dOS1r1ohYiWodI',
                //旧头图 y7qsf3-t-unAtMuVqdgoTfDjn_6v8dOS1r1ohYiWodI 可以， 新上传日报头图 y7qsf3-t-unAtMuVqdgoTfSLB-ZUX4O1On6jz2QwVGk 不行
                "author": 'Robot',
                "digest": items[0].title + ' | ' + items[1].title + `..等${items.length}条`,
                "show_cover_pic": true,
                "content": this.makeContent( items ),
                "content_source_url": `https://bluedge.top/${slug}`,
                // "need_open_comment":1,
                // "only_fans_can_comment":0
            },
            //若新增的是多图文素材，则此处应还有几段articles结构
        ])
    }

    makeContent( items ){
        var html = ``
        items.forEach( i => {
            html += `<div style="padding:1em;background:#fafafa;margin-top:.6em">
                <p style="font-size:15px;font-weight:bold"><a href="${i.link}" style="color:#1b1b1b">${i.title}</a></p>
                <p style="font-size:13px; line-height:18px; margin-top:.6em;color:#777">${i.teaser}</p>
            </div>`
        })
        return html
    }
    
}

module.exports = new PostWxmp