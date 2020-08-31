$(function() {
    /**
     * 实现登录页面功能
     * 1.为按钮注册点击事件
     * 2.获取文本内容
     * 3.对文本进行校验
     * 4.调用接口
     */
    $(".login-btn").on("click", function() {
        var username = $("[name='username']").val().trim();
        // console.log(username);
        var password = $("[name='password']").val().trim();
        if (!username) {
            mui.toast('请输入用户名', { duration: 'long', type: 'div' });
            return;
        }
        if (!password) {
            mui.toast('请输入密码', { duration: 'long', type: 'div' });
            return;
        }
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success(res) {
                // console.log(res);
                if (res.success) {
                    mui.toast('登录成功', { duration: 'long', type: 'div' });
                    setInterval(function() {
                        location.href = "user.html";
                    }, 2000)

                }
            }
        })
    })
})