module.exports = [
  {
    name : '搜狐-旅业快讯',
    concat : true,
    queue : [
        'https://www.sohu.com/xchannel/TURBd01EQXdORFF4',
    ],
    tm :`
        .masonry-item>a[href=$link]@{
          .image-container img[src=$image];
          .article-title{ $title }
          .extra-info-item{ $date }
          $source='搜狐';
        };
    `,
    format : items => items.map( i => {
        i.image = 'https:' + i.image
        i.teaser = '没有teaser'
        return i
    }),
  },
];