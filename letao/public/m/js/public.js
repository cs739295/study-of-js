$(function(){

	// 恢复A元素的跳转
	$('body').on('tap', 'a', function(){

		mui.openWindow({
			url: $(this).attr('href')
		});

	});

});

/**
 * 获取地址栏中的参数
 * @param  {string} url 地址字符串
 * @param  {string} name 要获取的参数名称
 * @return {string}     参数名称对应的参数值
 */
function getParamsByUrl(url, name) {

	var params = url.substr(url.indexOf('?')+1);

	var param = params.split('&');

	for(var i=0;i<param.length;i++){

		var current = param[i].split('=');

		if(current[0] == name){

			return current[1]

		}

	}

	return null;

}