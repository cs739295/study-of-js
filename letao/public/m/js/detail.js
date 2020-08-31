$(function(){

	// 库存数量
	var kucunNum = 0;

	// 尺码
	var size = null;

	// 产品ID
	var id = getParamsByUrl(location.href, 'id');

	var productId = 0;

	$.ajax({
		url: '/product/queryProductDetail',
		type: 'get',
		data: {
			id: id
		},
		success: function(res){

			console.log(res);

			// 库存数量
			kucunNum = res.num;

			// 产品ID
			productId = res.id;

			var html = template("productTpl", res);

			$('#product-box').html(html);

			//获得slider插件对象
			var gallery = mui('.mui-slider');
			gallery.slider();

		}
	});

	$('#product-box').on('tap', '.size span', function(){

		$(this).addClass('active').siblings('span').removeClass('active');

		// 用户选择的尺码
		size = $(this).html();

	});

	var oInp = $('#inp');

	$('#increase').on('tap',function(){

		var num = oInp.val()

		num++;

		if(num > kucunNum){
			num = kucunNum;
		}

		oInp.val(num);

	});

	$('#reduce').on('tap', function(){

		var num = oInp.val()

		num--;

		if(num < 1){
			num = 1;
		}

		oInp.val(num);

	});

	/**
	 * 加入购物车
	 * 1.获取加入购物车按钮 并添加点击事件
	 * 2.判断用户是否选择了尺码
	 * 3.调用加入购物车接口
	 * 4.提示用户 加入购物车成功 是否跳转到购物车页面
	 */

	$('#addCart').on('tap', function(){

		if(!size){

			alert('请选择尺码');

			return;

		}

		$.ajax({
			url: '/cart/addCart',
			type: 'post',
			data: {
				productId: productId,
				num: kucunNum,
				size: size
			},
			success: function(res){

				if(res.success){

					mui.confirm("加入购物车成功,跳转到购物车?", function(message){

						if(message.index){

							// 跳转到购物车
							location.href = "cart.html";
							
						}

					})

				}
				
			}
		});

	});

});