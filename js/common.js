// JavaScript Document

//側欄滑出選單
$(function(){

	var bMenuStatus = 0; //開關狀態
	var $html = $('html');
	var $body = $('body');
	var $side = $('.side');
	
	//fn選單開
	function fnMenuOpen(){
		bMenuStatus = 1;
		$html.css({'overflow-y':'hidden'});/*維持一個捲軸，目前捲軸在.side*/
		$body.css({'overscroll-behavior':'contain'});/*阻止Android滾動刷新*/
		$side.fadeIn();
		//禁止滑動 出現捲軸
		$side.on('touchmove',function(e){
			e.preventDefault();
		});
	}
	
	//fn選單關
	function fnMenuClose(){
		bMenuStatus = 0;
		$html.css({'overflow-y':'visible'});
		$side.fadeOut();	
	}
	
	//按鈕 選單開
	$('.header .btn_open').on('click', fnMenuOpen);
	
	//按鈕 選單關
	$('.side .btn_close').on('click', function(){
		if( bMenuStatus === 1){fnMenuClose();}
	});
	
	//手機旋轉 選單關
    $(window).on('orientationchange', function(){
        if( bMenuStatus === 1){fnMenuClose();}
    });

});


//置頂吸住===========================
/*
1. 新聞內頁：麵包屑+社群分享
2. 非新聞內頁：主選單
*/

	$(function(){	
	
	var iWinWidth = $(window).width();
	var iPoint = 500; //PC吸住點
	var iNav_2Point = parseInt( $(".header").offset().top );
	var iWinScrollT;
	var oScrollTimer = null;

	//非新聞內頁
	//複製分身
	$(".wrapper").append($(".header").clone(true));
	$(".header").eq(0).addClass("ori");
	$(".header").eq(1).addClass("add");

	$(window).on("scroll", function () {
		if (oScrollTimer) {
			clearTimeout(oScrollTimer);
		}
		oScrollTimer = setTimeout(function () {
			iWinScrollT = $(window).scrollTop();

			if (iWinScrollT > iNav_2Point) {
				$(".ori").css('visibility', 'hidden');
				$(".add").css('visibility', 'visible');
			} else {
				$(".ori").css('visibility', 'visible');
				$(".add").css('visibility', 'hidden');
			}
		}, 100);
	});

	if( $("body.news-page").length > 0 ){ //新聞內頁
		$("#et_sticky").append($(".sharebox_1").clone());

		$(window).on("scroll", function () {
			if (oScrollTimer) {
				clearTimeout(oScrollTimer);
			}
			oScrollTimer = setTimeout(function () {
				iWinScrollT = $(window).scrollTop();
			//PC 模組
			if(iWinWidth > 1000){  
				
				if (iWinScrollT > iPoint) {
					$(".ori").css('visibility', 'hidden');
					$(".add").css('visibility', 'visible');
					$("#et_sticky_pc").css({"height": "250px"});
				} else {
					$(".ori").css('visibility', 'visible');
					$(".add").css('visibility', 'hidden');
					$("#et_sticky_pc").css({"height": "0px"});
				}
			//手機模組
			}else{  
				
				if (iWinScrollT > iNav_2Point) {
					$(".ori").css('visibility', 'hidden');
					$(".add").css('visibility', 'visible');
					$(".header .nav_1").css('display','none');
					$("#et_sticky").css('top', '50px');
				} else {
					$(".ori").css('visibility', 'visible');
					$(".add").css('visibility', 'hidden');
					$(".header .nav_1").css('display','block');
					$("#et_sticky").css('top', '-300px');
				}
				
			}
		}, 100);
		});
	}

	//拷貝連結
	$(".link").click(function(){
		var $temp = $("<input>"); //暫放網址用
		$("body").append($temp);
		$temp.val(window.location.href).select();
		document.execCommand("copy");
		$temp.remove(); //移除
	});

});

//輪播圖
$(function(){
	$(".gallery_1").find(".piece:not(:has(img))").remove;
	if($(".gallery_1").length > 0){
		$(".gallery_1 .run .inner").bxSlider({
			controls : true,
			captions : false,
			pager : false,
			auto : true,
			pause : 3000,
			onSliderLoad : function(){
			   $(".gallery_1 .run .inner .piece img").show();
			}
		});
	};
});


/*// 鏡文學 推薦作品 超過25個字以"..."取代============================*/
$(function () {
	var len = 25;
	$(".block_content .part_list_1 h3 a").each(function (i) {
		if ($(this).text().length > len) {
			var text = $(this).text().substring(0, len - 1) + "...";
			$(this).text(text);
		}
	});
});

/*// 類別超過15個字以"..."取代============================*/
$(function () {
	var len = 16;
	$(".block_content .part_thumb_1 h3 a").each(function (i) {
		if ($(this).text().length > len) {
			var text = $(this).text().substring(0, len - 1) + "...";
			$(this).text(text);
		}
	});
});


//輪播圖
$(function(){
	
	
});



//禁止滑鼠點選複製
$(function(){
	$(".subject_article").on("contextmenu", function(e){
		return false;
	});
});

$(function(){
	$(".subject_article").on("keydown", function(e){
		if(e.key==="c"){
			return false;
		}
	});
});


// gototop 模組======================================
$(function(){
	var $goToTop = $(".gototop");
	var iScrollPointA = 0;  //滾回的位置
	var iScrollPointB = 50; //滾到的位置 出現gototop

	//滾動事件
	var oScrollTimer = null;
	$(window).on("scroll", function(){
		if(oScrollTimer){
			clearTimeout(oScrollTimer);
		}
		oScrollTimer = setTimeout(function(){
			if( $(window).scrollTop() > iScrollPointB) {
				$goToTop.show();
			} else {
				$goToTop.hide();
			}
		}, 50);
	});
	
	// 讓捲軸用動畫的方式移動到到指定id位罝
	$goToTop.on("click", function(){
		var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
		$body.animate({scrollTop: iScrollPointA}, 50);
		return false;
	});
//---	
});

//讓捲軸用動畫的方式移動到到指定id位罝 news.htm======================
$(function(){
	$(".scrollgo").click(function(){
		var sGoTo = $(this).attr("rel"); //取得目標物的id class
		var $body = (window.opera) ? (document.compatMode === "CSS1Compat" ? $('html') : $('body')) : $('html,body'); //修正 Opera 問題
		$body.animate({
			scrollTop: $(sGoTo).offset().top
		}, 200);
		return false;
	});
});


