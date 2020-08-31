//kewword:全局变量
var keyword = getParamsByUrl(location.href, "keyword");
var page = 1;
var html = '';
var priceSort = 1;
var This=null;
$(function() {
    // 实现上拉加载更多
    mui.init({
        pullRefresh: {
            container: ".mui-content", //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData
                //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
                /**
                 * 实现search-result页面的加载
                 * 1.获取地址栏的地址
                 * 2.将地址栏的地址进行切割，获取到想要的数据
                 * 3.发起ajax请求
                 * 4.将获取到的请求进行数据渲染
                 *
                 */

            }
        }
    });


    /*
        实现商品按价格降序
        1.获取元素，注册点击事件
        2.将价格排序规则传递到接口中
        3.初始化配置
            page
            html
            重新开启上拉加载
        将排序后的页面重新渲染到页面中
     */
    $(".price").on("tap", function() {
        priceSort = priceSort == 1 ? 2 : 1;
        page=1;
        html='';
        mui('.mui-content').pullRefresh().refresh(true);
        getData();
    })

})






function getData() {
    if(!This){ //改变this的指向
        This=this;
    }
    $.ajax({
        url: "/product/queryProduct",
        type: "get",
        data: {
            page: page++,
            pageSize: 3,
            proName: keyword,
            price:priceSort
        },
        success(res) {
            if (res.data.length > 0) { //说明有数据
                // 为了原本的数据不被覆盖。
                html += template("search-result", { result: res.data });
                $(".product-item").html(html);
                This.endPullupToRefresh(false);
            } else { //说明没有数据了
                This.endPullupToRefresh(true);
            }


        }
    })
    // alert(1);
}