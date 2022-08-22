module.exports = function( threads ){
  var html = head();
  html += ['全景数据','行业消息','国内动态'].map( t => subtitle(t) ).join('');
  html += threads.map( th => thread(th) ).join('');
  return html.replace(/\r\s+|\n\s+|\r|\n/g,'');
}


function head(){
  return `
  <br/>
  <p style="text-align: center;font-size: 12px; color: rgb(51, 51, 51);">
    关注边界旅行，每周获取旅游行业资讯周报！
  </p>
  <p style="text-align: center;font-size: 12px; color: rgb(51, 51, 51);">
    周报将于
    <span style="background-color: rgb(56, 184, 51);color: rgb(255, 255, 255);">每周一</span>
    发布，汇聚全网精选的重要行业新闻资讯。
  </p>
  <br/>
  <hr style="border-style: solid;border-width: 1px 0px 0px;border-color: rgba(0, 0, 0, 0.1);transform-origin: 0px 0px;transform: scale(1, 0.5);" />
  <br/>`
}

function subtitle(text){
  return `
  <section style="text-align: center;margin-left: 32px;margin-right: 32px;">
    <strong style="color: rgb(255, 255, 255); font-size: 20px;">
      <span style="background-color: rgb(56, 184, 51);letter-spacing: 2px;">&nbsp;${text}&nbsp;</span>
    </strong>
  </section><br/>`
}

function thread({ title, link }){
  return `
  <section style="margin:0 32px 32rpx 0;">
    <a target="_blank" href="${link}" tab="outerlink" data-linktype="2" style="font-size: 15px; color: rgb(51, 51, 51);">
      <span style="font-size: 15px; color: rgb(51, 51, 51);">${title}</span>
    </a>
    <span style="font-size: 15px; color: rgb(51, 51, 51);">&nbsp;→</span>
  </section>`
}