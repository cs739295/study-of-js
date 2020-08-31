$(function() {
    var vCodeNumber = null;//保存验证码
    /*
    获取验证码
    1.为验证码按钮注册点击事件
    2.调用接口
     */
    $(".getCode").on("click", function() {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success(res) {
                if (res.vCode) {
                    console.log(res.vCode);
                    vCodeNumber = res.vCode;
                    // console.log(vCodeNumber);
                }
            }
        })
    })

    // console.log(vCodeNumber)
    /*
    1.注册点击事件
    2.获取相关文本内容
    3.校验
    4.调用接口
    5.跳转到login.html，重新登录

     */
    $(".modifyBtn").on("click", function() {
        var oldPassword = $("[name='old-password']").val().trim();
        var newPassword = $("[name='new-password']").val().trim();
        var checkNewPassword = $("[name='check-newPassword']").val().trim();
        var vCode = $("[name='vCode']").val().trim();
        if (!oldPassword) {
            mui.toast('请输入原密码', { duration: 'long', type: 'div' });
            return;
        }
        if (!newPassword) {
            mui.toast('请输入新密码', { duration: 'long', type: 'div' });
            return;
        }
        if (checkNewPassword != newPassword) {
            mui.toast('两次输入的密码不对', { duration: 'long', type: 'div' });
            return;
        }
        if (vCode != vCodeNumber) {
            mui.toast('验证码不正确', { duration: 'long', type: 'div' });
            return;
        }
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword,
                vCode: vCode
            },
            success(res) {
                // console.log(res);
                if(res.success){
                    mui.toast('修改密码成功，请重新登录', { duration: 'long', type: 'div' });
                    setInterval(function(){
                        location.href="login.html";
                    },2000)
                }
            }
        })
    })
})