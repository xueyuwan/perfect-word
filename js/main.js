var a=0;
var light=0,lightNum=0,times;
var $liPage;
var now = { row:1, col:1 }, last = { row:0, col:0};
const towards = { up:1, right:2, down:3, left:4};
var isAnimating = false;
$(document).ready(function(e) {
	if(localStorage.succeed=="succeed"){
		localStorage.clear();
		$(".page-1-1").removeClass("page-current").addClass("hide");
		$(".page-7-1").removeClass("hide").addClass("page-current");
		now.row = 7; now.col = 1;
	}else if(localStorage.tour=="tour"){
		localStorage.clear();
		$(".page-1-1").removeClass("page-current").addClass("hide");
		$(".page-6-1").removeClass("hide").addClass("page-current");
		now.row = 6; now.col = 1;
	}
	$("#music").click(function(){
		if($(this).attr("class")=="play"){
			$(this).removeClass().addClass("pause");
			$("#myMusic")[0].play();
			$(".audio").addClass("Rot");
		}else if($(this).attr("class")=="pause"){
			$(this).removeClass().addClass("play");
			$("#myMusic")[0].pause();
			$(".audio").removeClass("Rot");
		}
	})
	var $width = $(window).width();
	var $height = $(window).height();
	$(".wrap").css({
		"width":$width,
		"height":$height
	})
	$(".2004").show();
	$(".clickBox").on("touchstart",function(){
		$(".light_text>div").hide();
		var thisId = $(this).attr("id");
		var id = thisId.split("s");
		$("."+id[1]).show();
	})
	$(".page-7-1 a").click(function(){
		localStorage.succeed="succeed";
	})
	$("#page6_button a").click(function(){
		localStorage.tour="tour";
	})
	$(".loading").hide();
	//三页切换
	$(document).swipe( {
		swipe:function(e,direction) {
			switch (direction){
				case "up":
					if (isAnimating) return;
					last.row = now.row;
					last.col = now.col;
					if (last.row !=8) { now.row = last.row+1; now.col = 1; pageMove(towards.up);}else{
						now.row = 1; now.col = 1; pageMove(towards.up);
					}
				break;
				case "down":
					if (isAnimating) return;
					last.row = now.row;
					last.col = now.col;
					if (last.row!=1) { now.row = last.row-1; now.col = 1; pageMove(towards.down);}else{
						now.row =8; now.col = 1;pageMove(towards.down);
					}
			}
		}
	});      
});
//页面跳转
function pageMove(tw){
var lastPage = ".page-"+last.row+"-"+last.col,
	nowPage = ".page-"+now.row+"-"+now.col;
	/*if(now.row==2){
		lights();
		//bindLights();
	}*/
	switch(tw) {
		case towards.up:
			outClass = 'pt-page-moveToTop';
			inClass = 'pt-page-moveFromBottom';
			break;
		case towards.right:
			outClass = 'pt-page-moveToRight';
			inClass = 'pt-page-moveFromLeft';
			break;
		case towards.down:
			outClass = 'pt-page-moveToBottom';
			inClass = 'pt-page-moveFromTop';
			break;
		case towards.left:
			outClass = 'pt-page-moveToLeft';
			inClass = 'pt-page-moveFromRight';
			break;
	}
	isAnimating = true;
	$(nowPage).removeClass("hide");
	$(nowPage).addClass('page-current');
	$(lastPage).removeClass('page-current');
	$(lastPage).addClass(outClass);
	$(nowPage).addClass(inClass);
	
	setTimeout(function(){
		
		$(lastPage).removeClass(outClass);
		$(lastPage).addClass("hide");
		$(lastPage).find(">div").addClass("hide");

		$(nowPage).removeClass(inClass);
		$(nowPage).find(">div").removeClass("hide");
		
		isAnimating = false;
	},600);
}
/*function viewChange(){
	var d, e, f = 1,
	g = $(document).width(),
    h = $(document).height();
	if (g / h >= 320 / 480 ? (f = h / 480, d = (g / f - 320) / 2) : (f = g / 320, e = (h / f - 486) / 2));
	var i = 320 / g,
    j = 486 / h,
    k = Math.max(i, j);
    k = k > 1 ? k: 160 * k,
    k = parseInt(k),
    $("#eqMobileViewport").attr("content", "width=320,user-scalable=0,target-densitydpi=" + k)
}*/
/*电灯发光*/
/*function lights(){
	clearInterval(times);
	var bgA = ["another_light_03.png","light_03.png"];
	times = setInterval(function(){
		$("#page2-1").css({
			"background":"url(images/"+bgA[light]+") top center",
			"background-size":"100% 100%"
		})	
		if(light==0){
			light=1;
		}else{
			light=0;
		}
		lightNum++;
		if(lightNum==5){
			$(".light_text").show();
		}
	},1000);
}
*/
//js判断手机横竖屏判断
function orient() { 
	if (window.orientation == 90 || window.orientation == -90) { 
		$(".portrait").hide();
		$(".cover").show(); 
		$(".fe").hide();
    }
	else if (window.orientation == 0 || window.orientation == 180) { 
		$(".portrait").show();
		$(".cover").hide();
		$(".fe").show();
	}
}
	var timer;
	$(window).bind("orientationchange", function(){
		clearTimeout(timer);
		timer = setTimeout(orient, 300);
	});
orient();
