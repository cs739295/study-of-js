$(function() {
    /*
    获取用户的存储的收获地址，并渲染
     */
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success(res) {
            console.log(res);
            var html = template('addressTpl', { result: res });
            $("#addressBox").html(html);
        }
    })


    /*
    删除收货地址
    1.为删除按钮添加点击事件
    2.消息框提时是否删除
    3.点击确认删除。则调用接口删除数据
    4.点击取消删除时，则去掉消息框
     */
    $("#addressBox").on("click", ".deleteAdress", function() {
            var id=$(this).attr("data-id");
            var li=this.parentNode.parentNode;
            console.log(li);
            console.log(id);
            var btnArray = ['否', '是'];
            mui.confirm('您确认删除吗', '您好', btnArray, function(e) {
                if (e.index == 1) {//点击的是
                    // info.innerText = '你刚确认MUI是个好框架';
                    $.ajax({
                        url:'/address/deleteAddress',
                        type:'post',
                        data:{
                            id:id
                        },
                        success(res){//删除成功之后重新加载页面
                            // console.log(res);
                            location.reload();
                        }

                    })
                } else {//点击的否
                    // info.innerText = 'MUI没有得到你的认可，继续加油'
                    mui.swipeoutClose(li);
                    // location.reload();

                }
            })
    })




})