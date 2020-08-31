$(function(){

	$.ajax({
		url:'/user/queryUser',
		type:'get',
		data:{
			page:1,
			pageSize:20
		},
		success:function(result){

			console.log(result)

			$('#userBox').html(template('userTpl',{data:result}));

		}
	});


	/**
	 * 用户的状态管理
	 * 1.获取按钮，不能直接获取，要是事件委托
	 * 2.注册点击事件
	 * 3.根据isDelete的值，更改其值
	 * 4.location.reload().刷新页面
	 */

	$('body').on('click','#deleteBtn',function(){

		var id = $(this).attr('data-id');
		var isDelete = Number($(this).attr('data-isDelete')) ? 0 : 1;

		alert(isDelete)

		$.ajax({
			url:'/user/updateUser',
			type:'post',
			data:{
				id:id,
				isDelete:isDelete
			},
			success:function(result){

				if(result.success){

					location.reload()

				}else{

					if(result.error){

						alert(result.message);

					}

				}

			}
		})

	});


});