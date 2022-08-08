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

    //新增草稿
    async createDrafts( articles = [] ){
        const api=`https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${this.token}`
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

    async create( title, html ){
        await this.api.init()
        return await this.api.createDrafts([
            {
                "title": title,
                "thumb_media_id": 'y7qsf3-t-unAtMuVqdgoTbhd6QmSHt54vyHhQkDR7zm28bV7UUrQhVYNA81--any',//周报头图
                "author": 'Alex阿乐',
                // "digest": '',
                "show_cover_pic": true,
                "content": html,
                // "need_open_comment":1,
                // "only_fans_can_comment":0
            },
            //若新增的是多图文素材，则此处应还有几段articles结构
        ])
    }    
}

module.exports = new PostWxmp