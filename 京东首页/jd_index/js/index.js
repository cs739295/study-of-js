/*
* @Author: name
* @Date:   2019-06-19 09:54:44
* @Last Modified by:   name
* @Last Modified time: 2019-06-23 20:57:36
*/

'use strict';
window.onload=function(){
    // 顶部效果
    var searchBox=document.querySelector(".jd_search");
    var banner=document.querySelector(".jd_banner");
    var bannerHeight=banner.offsetHeight;
    var opacity=0;
    window.onscroll=function(){
        // 这里要考虑兼容问题 scroll系列
        var bodyScrollTop=banner.scrollTop||window.pageYoffset||document.documentElement.scrollTop||0;
        if(bodyScrollTop<=bannerHeight){
            opacity=bodyScrollTop/bannerHeight;
        }else {
            opacity=1;
        }
        // console.log(bodyScrollTop+"==="+bannerHeight);
        searchBox.style.backgroundColor="rgba("+255+","+0+","+0+","+opacity+")";
    };



    // 倒计时
    timeback(3700);
    // 轮播图
   bannerAmt();

}

    function bannerAmt(){
         // 1.更改页面结构，克隆第一张图片放到最后一位，克隆最后在一张图片放到第一位，这个步骤不可能人工去添加，只能通过js代码自己添加
    // div盒子元素
    var banner=document.querySelector(".jd_banner");
    //ul元素
    var bannerImgBox=document.querySelector(".jd_bannerImage");
    var firstImg=bannerImgBox.firstElementChild;
    var lastImg=bannerImgBox.lastElementChild;
    bannerImgBox.appendChild(firstImg.cloneNode(true),bannerImgBox.lastElementChild);
    bannerImgBox.insertBefore(lastImg.cloneNode(true),bannerImgBox.firstElementChild);
    var bannerWidth=banner.offsetWidth;
    var lis=bannerImgBox.querySelectorAll("li");
    var count=lis.length;
    // 2.修改对应的样式
    bannerImgBox.style.width=lis.length*bannerWidth+"px";
    for(var i=0;i<lis.length;i++){
        lis[i].style.width=bannerImgBox.offsetWidth/lis.length+"px";
    }
    // 3.设置默认的偏移
    bannerImgBox.style.left=-bannerWidth+"px";
    // 4.自动播放
    var index=1;
    var timeId;
    var startTime=function(){
        timeId=setInterval(function(){
        index++;
        // 过渡效果一定要比定时器设置的时间小，不然过度效果很差
        bannerImgBox.style.transition="left 0.5s ease-in-out";
        bannerImgBox.style.left=-index*bannerWidth+"px";
        // 这里要加一个延时操作，应为上面的定时器里的代码有可能和if判断同时操作，倒是过渡效果是已经就判断了，从而导致没有跳转到最后一张就直接回到第一张了,就比如index=9是，过度效果还没有做完时，就已经对index进行了判断了，从而导致直接跳转
        setTimeout(function(){
            if(index==lis.length-1){
            index=1;
            bannerImgBox.style.transition="none";
            bannerImgBox.style.left=-index*bannerWidth+"px";
        }
    }, 500);
    },2000);
    };
    startTime();
    // 5.实现手动轮播
    var startX,moveX,distanceX;
    // 为bannerImgBox添加手指触摸事件
    bannerImgBox.addEventListener("touchstart",function(e){
            // 当手指触摸在屏幕是，清除定时效果，并且记录当前位置坐标
            clearInterval(timeId);
            startX=e.targetTouches[0].pageX;
    });
    // 为bannerImgBox添加手指触摸移动事件
    bannerImgBox.addEventListener("touchmove",function(e){
            // 当手指触摸在屏幕是，清除定时效果,对于过度效果来说，添加之后会一直存在，所以为了保证之后的效果正常，要清除过渡效果并且记录当前位置坐标
            clearInterval(timeId);
            moveX=e.targetTouches[0].pageX;
            distanceX=moveX-startX;
            bannerImgBox.style.transition="none";
            bannerImgBox.style.left=-index*bannerWidth+distanceX+"px";
    });
    // 为bannerImgBox添加手指触摸结束事件
    bannerImgBox.addEventListener("touchend",function(e){
            if(Math.abs(distanceX)>100){
                // 移动图片
                if(distanceX>0){
                    index--;
                }else{
                    index++;
                }
                // 清除过渡之后要记得添加过渡效果
                bannerImgBox.style.transition="left 0.5s ease-in-out";
                bannerImgBox.style.left=-index*bannerWidth+"px";
            }else if(Math.abs(distanceX)>0){
                // 回弹图片
                bannerImgBox.style.transition="left 0.5s ease-in-out";
                bannerImgBox.style.left=-index*bannerWidth+"px";
            }
            // 重新开启定时器，并且记录当前位置坐标
            startTime();
    });
    // 监听过渡效果结束事件，这是transition特有的事件
        bannerImgBox.addEventListener("webkitTransitionEnd",function(){
                if(index==count-1){
                    index=1;
                    bannerImgBox.style.transition="none";
                    bannerImgBox.style.left=-index*bannerWidth+"px";
                }else if(index==0){
                    index=count-2;
                    bannerImgBox.style.transition="none";
                    bannerImgBox.style.left=-index*bannerWidth+"px";
                }
        });
    }
 // 将倒计时功能封装
    function timeback(timetotal){
        // 倒计时
        var spans=document.querySelector(".jd_backTime").   querySelectorAll("span");
        //定义倒计时的时间，注意这里是以秒作为单位
        // 设置定时器，每一秒钟总时间减一秒,定时器的单位是毫秒
        var timeId=setInterval(function(){
        if(timetotal==0){
            clearInterval(timeId)
        }else{
            timetotal--;
         // 分别计算出时分秒
        var hours=Math.floor(timetotal/60/60);
        var minutes=Math.floor((timetotal%3600)/60);
        var seconds=timetotal%3600%60;
        spans[0].innerHTML=Math.floor(hours/10);
        spans[1].innerHTML=hours%10;
        spans[3].innerHTML=Math.floor(minutes/10);
        spans[4].innerHTML=minutes%10;
        spans[6].innerHTML=Math.floor(seconds/10);
        spans[7].innerHTML=seconds%10;
        }
    },1000);
    }


