var vCodeNumber = ''; //保存验证码用于校队$(function() {
$(function() {


    /*
    实现用户的注册
    1.为注册按钮添加点击事件
    2.获取用户填入的数据
    3.对密码和验证码进行校验
 */

    /*
    为获取认证码注册点击事件

     */
    $(".getCode").on("click", function() {
        $.ajax({
            url: '/user/vCode',
            method: 'get',
            success(res) {
                // 保存一下数据
                // console.log(res.vCode);
                vCodeNumber = res.vCode;
            }
        })
    })
    console.log(vCodeNumber);
    $(".registerBtn").on("click", function() {
        var username = $("[name='username']").val();
        var mobile = $("[name='mobile']").val();
        var password = $("[name='password']").val();
        var checkPassword = $("[name='check-password']").val();
        var vCode = $("[name='vCode']").val(); //这里跳出取未获取验证码注册事件
        if (username.trim().length == 0) {
            mui.toast('请输入用户名', { duration: 'long', type: 'div' });
            return;
        }
        if (mobile.length < 11) {
            mui.toast('请输入正确的手机格式', { duration: 'long', type: 'div' });
            return;
        }
        if (password != checkPassword) {
            mui.toast('两次密码不一致', { duration: 'long', type: 'div' });
            return;
        }
        if (vCode != vCodeNumber) {
            mui.toast('验证码错误', { duration: 'long', type: 'div' });
            return;
        }
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success(res) {
                if (res.success) { //注册成功之后提时用户，并直接跳转
                    mui.toast('注册成功', { duration: 'long', type: 'div' });
                    setInterval(function() {
                        location.href = "login.html"
                    }, 2000)
                } else {
                    console.log(res);
                }
            }
        })




    })
})