// 当HTML结构加载完成以后
$(function(){

	/**
	 * 注册
	 * 1.给注册按钮添加点击事件
	 * 2.获取到用户注册的信息
	 * 3.对用户输入的信息做验证
	 * 4.调用注册接口 实现注册功能
	 * 5.给出提示 告诉用户是否注册成功
	 * 6.跳转到登录页面
	 */

	$('#register-btn').on('click', function(){

		var username = $('[name="username"]').val();
		var mobile = $('[name="mobile"]').val();
		var password = $('[name="password"]').val();
		var againPass = $('[name="againPass"]').val();
		var vCode = $('[name="vCode"]').val();

		if(!username){
			mui.toast("请输入用户名");
			return;
		}

		if(mobile.length < 11){
			mui.toast("请输入合法的手机号");
			return;
		}

		if(password != againPass){
			mui.toast("两次输入的密码不一样");
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
			success: function(res){
				alert("注册成功");

				setTimeout(function(){
					location.href = "login.html";
				}, 2000)
			}
		})



	});


	/**
	 * 获取认证码
	 * 1.给获取认证码按钮添加点击事件
	 * 2.调用接口获取认证码
	 * 3.将认证码输出到控制台
	 */
	
	$('#getCode').on('click', function(){

		$.ajax({
			url: '/user/vCode',
			type: 'get',
			success: function(res){
				console.log(res.vCode);
			}
		})

	});

})