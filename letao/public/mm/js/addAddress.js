$(function() {
    /*
    实现三级选择器
     */
    var picker = new mui.PopPicker({
        layer: 3
    });
    picker.setData(cityData);
    $("#selectedCity").on("tap", function() {
        picker.show(function(selectItems) {
            $("#selectedCity").val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        })
    })



    /*
    添加收获地址
    1.注册点击事件
    2.获取数据
    3.校验
    4.调用接口
    5.跳转到address.html页面

     */
    // $(".checkAdd-btn").on("click", function() {
    //     var address = $("[name='address']").val().trim();
    //     var addressDetail = $("[name='addressDetail']").val().trim();
    //     var recipients = $("[name='recipients']").val().trim();
    //     var postcode = $("[name='postcode']").val().trim();
    //     // console.log(address);
    //     // console.log(addressDetail);
    //     // console.log(recipients);
    //     // console.log(postcode);
    //     if (!address) {
    //         mui.toast("请输入地址")
    //         return;
    //     }
    //     if (!addressDetail) {
    //         mui.toast("请输入详细地址")
    //         return;
    //     }
    //     if (!recipients) {
    //         mui.toast("请输入收货人")
    //         return;
    //     }
    //     if (!postcode) {
    //         mui.toast("请输入邮政编码")
    //         return;
    //     }
    //     $.ajax({
    //         url: '/address/addAddress',
    //         type: 'post',
    //         data: {
    //             address: address,
    //             addressDetail: addressDetail,
    //             recipients: recipients,
    //             postcode: postcode
    //         },
    //         success(res) { //成功就跳转到addrss.html页面
    //             // console.log(address);
    //             // console.log(res);
    //             setInterval(function() {
    //                 location.href = "address.html";
    //             }, 2000);
    //         }
    //     })
    // })



    /**
     * 实现修改地址功能
     * 由于添加收获地址和修改收货地址都是同一个页面，因此要做一定的区分
     * 根据收获地址判断。此次操作是添加还是修改页面
     * 1.获取地址栏中的id参数
     * 2.有则是修改操作，无则是添加操作
     * 3.修改地址操作
     *     1.调用接口，查询保存的地址
     *     2.根据传递过来的id值获取想要的值
     *     3.将值添加到文本框中
     *     4.调用接口，修改地址
     * 4.添加地址
     *     1.复制之前的代码即可
     *
     *
     */
    var id = Number(getParamsByUrl(location.href, 'id'));
    if (id) { //表示这次是编辑数据
        $.ajax({
            url: '/address/queryAddress',
            type: 'get',
            success(res) {
                console.log(res);
                res.forEach((item, i) => {
                    if (item.id === id) {
                        // console.log(item);
                        $("[name='address']").val(item.address);
                        $("[name='addressDetail']").val(item.addressDetail);
                        $("[name='recipients']").val(item.recipients);
                        $("[name='postcode']").val(item.postCode);
                        $(".checkAdd-btn").on("click", function() {
                            var address = $("[name='address']").val().trim();
                            var addressDetail = $("[name='addressDetail']").val().trim();
                            var recipients = $("[name='recipients']").val().trim();
                            var postcode = $("[name='postcode']").val().trim();
                            // console.log(address);
                            // console.log(addressDetail);
                            // console.log(recipients);
                            // console.log(postcode);
                            if (!address) {
                                mui.toast("请输入地址")
                                return;
                            }
                            if (!addressDetail) {
                                mui.toast("请输入详细地址")
                                return;
                            }
                            if (!recipients) {
                                mui.toast("请输入收货人")
                                return;
                            }
                            if (!postcode) {
                                mui.toast("请输入邮政编码")
                                return;
                            }
                            $.ajax({
                                url: '/address/updateAddress',
                                type: 'post',
                                data: {
                                    id: id.toString(),
                                    address: address,
                                    addressDetail: addressDetail,
                                    recipients: recipients,
                                    postcode: postcode
                                },
                                success(res) { //成功就跳转到addrss.html页面
                                    // console.log(address);
                                    // console.log(res);
                                    setInterval(function() {
                                        location.href = "address.html";
                                    }, 2000);
                                }
                            })
                        })
                    }
                })
            }
        })

    } else { //表示是添加数据
        $(".checkAdd-btn").on("click", function() {
            var address = $("[name='address']").val().trim();
            var addressDetail = $("[name='addressDetail']").val().trim();
            var recipients = $("[name='recipients']").val().trim();
            var postcode = $("[name='postcode']").val().trim();
            // console.log(address);
            // console.log(addressDetail);
            // console.log(recipients);
            // console.log(postcode);
            if (!address) {
                mui.toast("请输入地址")
                return;
            }
            if (!addressDetail) {
                mui.toast("请输入详细地址")
                return;
            }
            if (!recipients) {
                mui.toast("请输入收货人")
                return;
            }
            if (!postcode) {
                mui.toast("请输入邮政编码")
                return;
            }
            $.ajax({
                url: '/address/addAddress',
                type: 'post',
                data: {
                    address: address,
                    addressDetail: addressDetail,
                    recipients: recipients,
                    postcode: postcode
                },
                success(res) { //成功就跳转到addrss.html页面
                    // console.log(address);
                    // console.log(res);
                    setInterval(function() {
                        location.href = "address.html";
                    }, 2000);
                }
            })
        })
    }




})