$(function(){

	/**
	 * 判断登录状态，如果是登录的，就跳转到user.html页面
	 */

	$.ajax({
		url:'/employee/checkRootLogin',
		type:'get',
		success:function(result){

			if(result.success){

				location.href = "user.html";

			}

		}
	})

	/**
	 * 登录按钮的功能
	 * 1.为登录按钮添加点击事件
	 * 2.获取文本框内容并且校验
	 * 3.调用接口
	 * 4.实现跳转
	 */
	$('#loginBtn').on('click',function(){

		var data = {
			username:$.trim($('#username').val()),
			password:$.trim($('#password').val())
		}

		if(!data.username){

			alert('请填写用户名');

			return;

		}

		if(!data.password){

			alert('请填写密码');

			return;

		}

		$.ajax({
			type:'post',
			url:'/employee/employeeLogin',
			data:data,
			success:function(result){

				if(result.success){

					location.href = "user.html";

				}else{

					if(result.error){

						alert(result.message)

					}

				}

			}
		})

	});

});
