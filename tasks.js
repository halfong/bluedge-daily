// const THREAD_KEYS = [
//   'title',    //   内容标题
//   'teaser',   //  可以获取到的内容详情
//   'date', //    Date()对象，文章的发布时间
//   'link', //    完整的链接（通常是文章详情页）
//   'source',  // 来源名称
//   'image',  //图片
// ];

module.exports = [
    // {
    //     // 分页改成了加载更多，只能抓一点
    //     name : '环球旅讯',
    //     concat : true,
    //     queue : [
    //         'https://www.traveldaily.cn/today',
    //     ],
    //     tm :`
    //       div.articleItem@{
    //             img.articlePicImg[src=$image];
    //             h2 a[href=$link]{ $title };
    //             span.articleItemTime{ $date };
    //             p.articleItemDesc{ $teaser };
    //             $source='环球旅讯';
    //         };
    //     `,
    //     format : items => items.map( i => {
    //         if( i.title.indexOf('TD') > -1 ) return null
    //         i.link = 'https://www.traveldaily.cn'+i.link
    //         i.image = 'https://www.traveldaily.cn'+i.image
    //         return i
    //     }).filter( i => i )
    // },
    
    // {
    //   //  分页改成了加载更多，只能抓一点
    //     name : '执惠',
    //     concat : true,
    //     queue : [
    //         'http://www.tripvivid.com/breakfeed',
    //     ],
    //     tm :`
    //         .list-item@{
    //             a img[src=$image];
    //             a.f20[href=$link]{ $title }
    //             .f14.text{ $teaser }
    //             .mt10 .c9:last-child{ $date }
    //             $source='执惠';
    //         };
    //     `,
    // },

    {
        name : '新旅界',
        concat : true,
        queue : [
            'http://www.lvjie.com.cn/brand/index.html',
            'http://www.lvjie.com.cn/brand/2.html',
            'http://www.lvjie.com.cn/brand/3.html',
            'http://www.lvjie.com.cn/brand/4.html',
            'http://www.lvjie.com.cn/brand/5.html',
        ],
        tm :`
            .date-list li@{
                img.pic[src=$image];
                a.list-tit[href=$link]{ $title }
                p.list-abs{ $teaser }
                p.list-sm .list-time{ $date }
                $source='新旅界';
            };
        `,
    },

    // {
    //   //  分页改成了加载更多，只能抓一点
    //     name : '迈点/旅游',
    //     concat : true,
    //     queue : [
    //         'https://www.meadin.com',
    //     ],
    //     tm :`
    //         .news-box@{
    //             .left-img-box img[src=$image];
    //             a[data-cut=newtitle][href=$link]{ $title }
    //             p[data-cut="metaDes"]{ $teaser }
    //             span[data-ymd]{ $date }
    //             $source='迈点/旅游';
    //         };
    //     `,
    //     format : items => items.map( i => {
    //         i.link = 'https://www.meadin.com'+i.link
    //         i.image = 'https://www.meadin.com'+i.image
    //         return i
    //     })
    // },

    {
        name : '中国旅游新闻网',
        concat : true,
        queue : [
            //地方关注
            'http://www.ctnews.com.cn/news/node_4.html',
            'http://www.ctnews.com.cn/news/node_4_2.html',
            'http://www.ctnews.com.cn/news/node_4_3.html',
            //全域旅游
            'http://www.ctnews.com.cn/qyly/node_6.html',
            'http://www.ctnews.com.cn/qyly/node_6_2.html',
            'http://www.ctnews.com.cn/qyly/node_6_3.html',
        ],
        tm :`
            li.list__item@{
                .list__img img[src=$image];
                .list__title a[href=$link]{ $title }
                .list__summary a{ $teaser }
                $source='中国旅游新闻网';
            };
        `,
        format : items => items.map( i => {
            i.date = i.link.replace(/.*(\d\d\d\d-\d\d)\/(\d\d).*/,"$1-$2")
            return i
        }),
    },

    // {
    //     source : 'Breaking Travel News',
    //     queue : [
    //         'https://www.breakingtravelnews.com/news/',
    //         'https://www.breakingtravelnews.com/news/P12/',
    //         'https://www.breakingtravelnews.com/news/P24/',
    //     ],
    //     tm :`
    //         .sec-desc@{
    //             .post-title a[href=$link]{ $title }
    //             .post-desc p{ $teaser }
    //         };
    //     `,
    //     format : result => result.items.map( i => format(i) )
    // },

    // {
    //     source : 'einnews·travel',
    //     queue : [
    //         'https://travel.einnews.com/',
    //         'https://travel.einnews.com/?page=2',
    //         'https://travel.einnews.com/?page=3',
    //     ],
    //     tm :`
    //         .article-content@{
    //             a.title[href=$link]{ $title }
    //             p.excerpt{ $teaser }
    //             div.channels{ $source }
    //             span.date{ $date }
    //         };
    //     `,
    //     format : result => {
    //         const items = result.result.items.map( i => trimS(i) )
    //         return items
    //     }
    // },
]