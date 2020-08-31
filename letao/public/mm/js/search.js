$(function() {



    // 申请一个全局变量，存储keyword，对于这个变量来说，每次回到这个页面是都要重新先过去以下本地数据
    var keyarr = JSON.parse(localStorage.getItem("keyarr") || "[]");
    /**
     * 在页面一上来的时候，获取keyarr，渲染页面
     */
    var html=template("history-record",{result:keyarr});
    $(".mui-table-view").html(html);

    /**
     *实现搜索框的跳转
     *1.为搜索按钮注册点击事件
     *
     *2.获取文本框的内容
     *3.检验文本内容适合符合规范
     *4.实现跳转，并将关键词以查询字符串的形式传递过去
     */


    $("#search-btn").on("click", function() {
        // alert(1);
        var keyword = $(".keyword").val();
        if (keyword.trim()) {
            $(".keyword").val("");
            /*
             *实现搜索历史的本地存储
             *1.每次加载页面之前，都需要从本地中获取数据加载到页面中
             *2.搜索点击事件时，创建一个空数组
             *3.将文本框的数据push到数组中
             *4.将数组存储到本地中
             */
            keyarr.push(keyword);
            localStorage.setItem("keyarr", JSON.stringify(keyarr));
            location.href = "search-result.html?keyword=" + keyword;
        } else {
            alert("请您输入关键词");
        }
    })

    /**
     * 清除历史记录
     * 1.为清除历史记录注册点击事件；
     * 2.清除keyarr数组；
     * 3.清除本地的keyarr；
     *
     */
    $(".del-history").on("click",function(){
        localStorage.removeItem("keyarr");
        // console.log(keyarr);
        location.reload();
    })


})