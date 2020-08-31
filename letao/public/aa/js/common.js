$(function(){

	/**
	 * 公共代码：判断用户是否登录。因为如果知道网址可以直接通过网址访问==》要禁止
	 * 1.调用接口，查询用户状态
	 * 2.没登陆，跳转到登录页面
	 * 3.
	 *
	 */

	$.ajax({
		url:'/employee/checkRootLogin',
		type:'get',
		async:false,//改为同步操作，如果这里没有的登录，就不要操作下面的代码了
		success:function(result){

			if(result.error && result.error == 400){

				location.href = "login.html";

			}

		}
	})


	/**
	 * 由于在每一个页面中都有对出登录这个按钮，所以写在公共样式中
	 * 1.获取退出按钮
	 * 2.注册点击事件
	 * 3.发起ajax请求，实现退出登录
	 * 4.跳转页面
	 *
	 */


	// 登出
	$('#loginOut').on('click',function(){

		$.ajax({
			type:'get',
			url:'/employee/employeeLogout',
			success:function(result){
				console.log(result)
				if(result.success){
					location.href = "login.html";
				}else{
					alert('登出失败');
				}
			}
		})

	});











	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});