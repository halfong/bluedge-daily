const GhostAdminAPI = require('@tryghost/admin-api');
const env = {
  "ghost" : {
    "url": "https://bjlx.top",
    "key": "605b58f30e68faaa0bd07eca:22f558df012b6709b183948fecac3e56a5417d04add60cc7737255d6fa820b64",
    "version": "v3",
    "author":"hi@anedge.tech",
  }
}

class PostGhost{

    constructor(){
        this.api = new GhostAdminAPI({
            url : env.ghost.url,
            key : env.ghost.key,
            version : env.ghost.version,
        });
    }

    /**
     * 旅业日报
     * 生成到 ghost系统
     */
    async publish( title, slug, items = [] ){

        return await this.api.posts.add({
            title : title,
            custom_excerpt : items[0].title + ' | ' + items[1].title + `..等${items.length}条`,
            mobiledoc : JSON.stringify({
                "version":"0.3.1",
                "atoms":[],
                "cards": this.makeCards( items ) ,
                "markups":[],
                "sections": this.makeSections( items.length ) 
            }),
            tags : ['旅业日报','行业资讯'],
            authors: env.ghost.author && [ env.ghost.author ],
            status : 'published',
            slug : slug,
            url : slug,
            published_at : new Date(),
            updated_at : new Date(),
            created_at : new Date(),
            feature_image : items[0].image,
        })
    }

    /**
     * 获取post中的items
     * @param {*} items
     * @param {*} slug 
     */
    async getItems( slug ){
        console.log( 'slug', slug )
        var post = null
        try{ post = await this.api.posts.read({ slug : slug }) }
        catch(e){ console.log('WARNING: 昨日post未找到') }
        const items = ( post ? JSON.parse( post.mobiledoc ).cards : [] ).map( i => i[1] )
        return items.map( i => ({
            title : i.metadata.title,
            link : i.metadata.url,
            teaser : i.metadata.teaser
        }))
    }

    makeCards(items){
        return items.map( item => ([
            "bookmark",
            {
                "url": item.link,
                "metadata":{
                    "url": item.link,
                    "title": item.title,
                    "description": item.teaser,
                    // "author": item.source,
                    // "publisher": item.source, 应该是 bluedge-robot ?
                    // "thumbnail":"http://traveldaily.net/css/img/td-code.png",
                    //"icon":"http://img.traveldaily.cn/favicon.ico"  ??
                }
            }
        ]) )
    }
    
    makeSections(count){
        const sections = []
        var curr = 0
        while( curr < count ){
            sections.push([ 10, curr ])
            curr ++
        }
        // sections.push([1,"p",[]])
        return sections
    }

}

module.exports = new PostGhost()
