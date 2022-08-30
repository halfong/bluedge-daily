const axios = require('axios');
class AeWemp{
  
    token = null
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
        if( !this.token ) await this.init()
        const api=`https://api.weixin.qq.com/cgi-bin/draft/add?access_token=${this.token}`
        const res = await axios.post( api , { articles  })
        return res.data
    }

}

module.exports = new AeWemp( 'wx14401f2b01127b62', 'a8130a82c9d7e568cfa2559a4b96f6f1' );