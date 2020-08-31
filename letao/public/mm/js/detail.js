$(function() {
    /**
     * 获取详情的数据并渲染
     * 由于获取数据时需要产品的id，在模板渲染的时候就写入id
     * 获取传入过来的id
     * 根据传递过来的id调用接口函数获取数据
     * 渲染数据
     */
    // var num=1;//默认里面的数据是1
    var kunnum = 0;
    var size = null;
    var id = getParamsByUrl(location.href, 'id');
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: Number(id),
        },
        success(res) { //获取成功之后
            console.log(res);
            kunnum = res.num;
            var html = template('detailTpl', { result: res });
            $(".detail-container").html(html);
            //渲染之后要记得使用轮播图js注册。使它工作
            //    //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider({
                interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
            });

        }
    })


    /**
     * 点击尺码更改样式
     * 由于span是由模板渲染出来的，不能直接拿到，使用事件委托的方式
     */
    $(".detail-container").on("click", ".detail-size span", function() {
        $(this).addClass('active').siblings('span').removeClass('active');
        size = $(this).html();
    })



    /**
     * 实现数量的加减
     * 由于获取不到模板引擎里的input。所以也不能获取到input.val();
     * 必须通过事件委托的形式才能获取到元素
     * 所以只能默认是num=1
     *
     */
    $(".detail-container").on("click", "#del", function() {
        // console.log($("#inputNum").val());
        var inputNum = Number($("#inputNum").val());
        if (inputNum <= 1) {
            $("#inputNum").val(1);
        } else {
            inputNum--;
            $("#inputNum").val(inputNum);
        }
    })
    $(".detail-container").on("click", "#add", function() {
        var inputNum = Number($("#inputNum").val());
        if (inputNum >= kunnum) {
            $("#inputNum").val(inputNum);
        } else {
            inputNum++;
            $("#inputNum").val(inputNum);
        }
    })


    /**
     * 实现加入购物车
     * 1.为addCar添加点击事件
     * 2.获取产品id，库存num，size尺码
     * 3.调用接口，实现加入购物车
     */
    $(".addCar").on("click", function() {
        if (!size) {
            mui.toast("请选择尺码");
            return;
        }
        $.ajax({
            url: '/cart/updateCart',
            type: 'post',
            data: {
                id: Number(id),
                size: size,
                num: kunnum
            },
            success(res) { //加入购物车成功
                // console.log(res);
                if (res.success) { //提时用户取购物车查看
                    mui.confirm("添加购物车成功，跳转到购物车？", function(message) {
                        // console.log(message);
                        if (message.index) {
                            //跳转到购物车
                            location.href = "cart.html";
                        } else {

                        }
                    })
                } else {
                    mui.toast(res);
                }
            }
        })
    })

})