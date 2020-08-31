$(function() {
    //初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: true, //是否显示滚动条
        deceleration: 0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true //是否启用回弹
    });


    // 获取一级分类的数据
    // 使用模板引擎进行数据渲染
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        success(res) {

            var html = template('category-first', { result: res.rows });
            // console.log(html);
            $(".category-first").html(html);
            // 判断一级分类如果有数据，就立马加载，而不是等到点击之后接在
            if (res.rows) { //说明有数据，要首先默认加载第一个二级分类
                //为第一个li添加样式
                $('.category-first').find("li").eq(0).addClass('active');
                console.log($('.category-first').find("li"));
                var id = res.rows[0].id;
                getSecondCategory(id);

            }
        }
    })

    // 获取二级分类的数据
    // 为一级分类注册点击事件(因为一级分类是通过ajax后续追加的，因此只能通过事件委托的方式来注册点击事件)
    // 根据每个一级分类的id值进行获取数据
    // 将获取到的数据进行渲染
    $(".category-first").on("click", "li", function() {
        // alert(1);
        // console.log(this);
        //注意每一次点击的时候都清除所有li的active样式，并给当前的li active 样式
        $(this).addClass('active').siblings().removeClass('active');
        var id = $(this).attr('data-id');
        getSecondCategory(id);
    })




    //代码的优化：观察代码发现，一级分类和二级分类有一个重复条用ajax的情况，封装一个根据id发起ajax请求的函数

    function getSecondCategory(id) {
        $.ajax({
            url: '/category/querySecondCategory',
            type: 'get',
            data: {
                id: id,
            },
            success(res) {
                var html = template('category-second', { result: res.rows });
                console.log(html);
                $(".category-second").html(html);
            }

        })
    }




})