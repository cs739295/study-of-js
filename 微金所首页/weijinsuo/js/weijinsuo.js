/*
* @Author: name
* @Date:   2019-06-27 19:30:43
* @Last Modified by:   name
* @Last Modified time: 2019-06-29 13:30:23
*/

'use strict';
window.onload=function(){
    // 1.利用bootstrap来实现轮播图的滑动效果
    var startX,endX;
    var carousel_inner=$(".carousel-inner")[0];
    var carousel=$('.carousel');
    // 获取wjs_banner元素
    // 注册触摸开始事件
    carousel_inner.addEventListener("touchstart",function(e){
        startX=e.targetTouches[0].clientX;
    });
    // 注册触摸结束事件
    carousel_inner.addEventListener("touchend",function(e){
        endX=e.changedTouches[0].clientX;
        // 滑动判断
        if(endX-startX>0){
            carousel.carousel('prev');
        }
        else if(endX-startX<0){
            carousel.carousel('next');
        }
        else{
            return;
        }
    });
    // 2.实现功能：用js解决轮播图加载资源问题（大图小图切换时图片都会加载造成浪费资源问题）
    // 首先要绑定屏幕大小改变事件
    var items=$(".carousel-inner .item");
    $(window).on("resize",function(){
        var ScreenWidth=$(window).width();
        if(ScreenWidth>=768){
            $(items).each(function(index,value){
                var item=$(this);
                var imgSrc=item.data("largeImg");
                item.html($('<a href="javascript:;" class="pcImg hidden-xs"></a>').css("backgroundImage","url("+imgSrc+")"));
            });
        }
        else{
            $(items).each(function(index,value){
                var item=$(this);
                var imgSrc=item.data("smallImg");
                item.html("<a href='javascript:;'><img src='"+imgSrc+"'   alt='...' class='mobileImg hidden-sm  hidden-md hidden-lg'></a>");
            });
        }
    }).trigger("resize");
    // 3.实现溢出隐藏且为滑动的效果 产品块
    // 拿到ul和lis
    var ul=$(".wjs_product .nav-tabs");
    var lis=$(".wjs_product .nav-tabs li");
    var totalWidth=0;
    // 对lis经行遍历，获取它的宽度，并相加
    lis.each(function(index,value){
        // width() 只能获取元素的内容宽度
        // innerWidth() 只能获取元素的内容宽度+padding
        // outerWidth() 只能获取元素的内容宽度+padding+border
        // outerWidth(true) 只能获取元素的内容宽度+padding+border+margin
        totalWidth+=$(this).innerWidth();
        ul.width(totalWidth);
        // 然后通过iscroll.js插件来实现滑动
        var myScroll = new IScroll(".tabs_parent",{
            scrollX: true,
            scrollY: false
        });
    });


}