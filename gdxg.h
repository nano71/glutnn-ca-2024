

<div class="articleList animationBox sensitive">
<#list list_news as news>
                <div class="item">
                    <div class="date">
                        <div class="day">${v_date(news.date, "dd")}</div>
                        <div class="month">${v_date(news.date, "yyyy-MM")}</div>
                    </div>
                    <div class="hr"></div>
                    <div class="content">
                        <div class="title line1">
${news.title}
                        </div>
                        <div class="description line2">
${news.abstract}
                           </div>
                    </div>
                </div>
</#list>
                <div class="pagination">
                    <div class="count">共${size}条</div>
                    <a href="javascript:void(0)" class="left">上一页</a>
                    <div class="pageBox">
                        <a href="javascript:void(0)">1</a>
                        <a href="">2</a>
                        <a href="" class="active">3</a>
                        <a href="">4</a>
                        <a href="">5</a>
                        <a href="">6</a>
                        <a href="">7</a>
                    </div>
                    <a href="" class="right">下一页</a>
                </div>
            </div>


