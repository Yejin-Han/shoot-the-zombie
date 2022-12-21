$(function(){
	$(document).on('touchstart',function(){});
	$('html,body').animate({scrollTop:'3px'},100);

	let lh=$('.btns').find('a').height();
	console.log(lh);
	$('.btns').find('a').css('line-height',lh+'px'); //어차피 폰에서 보니까 굳이 resize 함수는 필요 없겠지?

	const intro=$('#intro');
	const guide=$('#guide');
	intro.find('.info').on('click',function(e){
		e.preventDefault();
		intro.stop().fadeOut(100);
		guide.stop().fadeIn(100);
	});
	intro.find('.new').on('click',function(e){
		e.preventDefault();
		window.location.href="stage1.html";
	});
	guide.find('.back').on('click',function(){
		guide.stop().fadeOut(100);
		intro.stop().fadeIn(100);
	});
	guide.find('.start').on('click',function(){
		window.location.href="stage1.html";
	})
});