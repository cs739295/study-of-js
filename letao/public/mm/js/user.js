var userInfo=null;//获取用户信息，用于展示页面
/*
处理在页面加载时根据查询到的个人信息，展示需要展示的页面
注意：此处代码不能写到$(function () {})中，因为这里代表者页面加载完毕之后才会执行
这里的代码。我们的要求时加载之前执行这里的代码
 */
$.ajax({
    url:'/user/queryUserMessage',
    type:'get',
    async:false,//改为同步，不执行完这个代码，不会加载页面的【重要】
    success(res){
        // console.log(res);
        //根据个人信息，选择需要展示的页面
        if(res.error&&res.error===400){
                location.href="login.html";
        }
        userInfo=res;

    }
})
$(function() {
    /*
        实现退出登录
        1.按钮注册点击事件
        2.调用接口

     */
    $("#logout").on("click", function() {
        $.ajax({
            url:'/user/logout',
            type:'get',
            success(res){
                if(res.success){
                    setInterval(function(){
                        location.href="index.html"
                    },2000)
                }else{
                    mui.toast("退出登录失败");
                }
            }
        })
    })
    // console.log(userInfo);
    var html = template('userTpl',{result:userInfo});
    // console.log(html);
    $(".usr-info .mui-table-view").html(html);

})