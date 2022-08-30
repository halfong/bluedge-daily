module.exports = [
    {
        name : '新旅界',
        concat : true,
        queue : [
            'http://www.lvjie.com.cn/brand/index.html',
            'http://www.lvjie.com.cn/brand/2.html',
            'http://www.lvjie.com.cn/brand/3.html',
            'http://www.lvjie.com.cn/brand/4.html',
            'http://www.lvjie.com.cn/brand/5.html',
            'http://www.lvjie.com.cn/brand/6.html',
            'http://www.lvjie.com.cn/brand/7.html',
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

  // @fix 有些问题
  // {
  //   name : '搜狐-旅业快讯',
  //   concat : true,
  //   queue : [
  //       'https://www.sohu.com/xchannel/TURBd01EQXdORFF4',
  //   ],
  //   tm :`
  //       .masonry-item>a[href=$link]@{
  //         .image-container img[src=$image];
  //         .article-title{ $title }
  //         .extra-info-item{ $date }
  //         $source='搜狐';
  //       };
  //   `,
  //   format : items => items.map( i => {
  //       i.image = 'https:' + i.image
  //       i.teaser = '没有teaser'
  //       return i
  //   }),
  // },
]