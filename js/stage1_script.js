$(function(){
	$(document).on('touchstart',function(){});
	$('html,body').animate({scrollTop:'3px'},100);

	let sec=60;
	let zom_cnt=10;
	let life=3;
	let a=new Array;
	let bar=$('.time>.bar>span');
	let first_barW=bar.parent().width();
	let barW=0;
	let ranNum=0;
	let remain=0;
	let order=0;
	let shot;
	let timer;
	let cnt;
	let btnTimer;
	let click=0;
	let clickable=1;
	let z0_orisrc=$('.windows .zombie>img').attr('src');
	let z0_orisrc_w9=$('.windows>.w9>.zombie>img').attr('src');
	let h0_orisrc=$('.windows .human>img').attr('src');
	let i0_orisrc=$('.windows .items>img').attr('src');

	function typo_animation(typo,time1,time2){
		typo.show();
		typo.animate({'opacity':1,'margin-top':0},time1);
		setTimeout(function(){ typo.fadeOut(200); },time2);
	}
	typo_animation($('.start'),400,1000);
	bar.width('100%');
	function animate_progressbar(){
		barW=bar.width()-first_barW*(1/60);
		bar.stop().animate({width:barW},1000,'linear');
	}
	function cntdown(){
		sec--;
		animate_progressbar();
		if(sec==0){ //failure
			clearInterval(timer);
			clearInterval(cnt);
			bar.stop().animate({width:0},1000,'linear');
			typo_animation($('.failure'),400,1000);
			setTimeout(function(){ window.location.href="failure.html"; },1200);
		}
	}
	cnt=setInterval(cntdown,1000);
	let btnimgs=$('.windows>.w9>.btn>img');
	let btnIndex=0;
	function btnupdown(){
		btnimgs.eq(btnIndex).hide();
		btnIndex++;
		btnIndex=btnIndex%(btnimgs.length);
		btnimgs.eq(btnIndex).show();
	}
	function ranTar(){
		//anonymous random 세 곳 선정, .none>img append 후 opacity animation
		$('.windows .zombie>img').attr('src',z0_orisrc);
		$('.windows>.w9>.zombie>img').attr('src',z0_orisrc_w9);
		$('.windows .human>img').attr('src',h0_orisrc);
		$('.windows .items>img').attr('src',i0_orisrc);
		clearInterval(btnTimer);
		$('.windows>.w>.shot').remove();
		for(let i=0; i<3; i++){
			ranNum=Math.floor(Math.random()*11);
			if(a.indexOf(ranNum)===-1){
				a.push(ranNum);
				$('.windows>div').eq(ranNum).append($('<div class="none"><img src="img/anonymous.png" alt=""></div>'));
				clickable=1;
				$('.windows>div').eq(ranNum).find('.none').css('opacity','0.4').stop().animate({'opacity':'0.8'},500);
			} else{
				i--;
			}
		}
		let r=Math.floor(Math.random()*100);
		//좀 인 아 종류 및 세부 종류 설정
		if(r<15){
			remain=r%2;
			$('.windows .items>img').attr('src','img/open_item'+remain+'.png');
			order=2;
		} else if(r>=15 && r<70){
			//stage2에서 좀비 종류(+3) stage3에서 종류(+2) 추가될 예정
			order=0;
		} else if(r>=70){
			//stage3에서 인간 종류(+2) 늘어날 예정
			remain=r%4;
			$('.windows .human>img').attr('src','img/open_human'+remain+'.png');
			order=1;
		}
		// anonymous 가리고 선택된 div show
		let divs=$('.windows>div').eq(a[0]); //a[0]을 anonymous 세 곳 중 한 곳으로 선정
		setTimeout(function(){
			$('.windows>.w9>.btn>.plus').text('연타!!!!');
			divs.children('.none').hide();
			divs.children('div').eq(order).show();
			let btn=divs.children('.btn');
			if(divs.attr('class')=='w9 w'){
				click=0;
				btn.show();
				btn.children('.plus').show().css('display','block');
				btnTimer=setInterval(btnupdown,100);
				clearInterval(timer);
				clearInterval(cnt);
				setTimeout(function(){ 
					if(click<6){
						life--;
						$('.life>img').eq($('.life>img').length-1).remove();
						$('.windows>.w9>.btn>.plus').text('연타실패');
					}
				},2000)
				setTimeout(function(){
					cnt=setInterval(cntdown,1000);
					timer=setInterval(ranTar,2000);
					divs.children().hide();
				},2500);
			}
		},500);
		setTimeout(function(){
			a.splice(0,9);
			$('.windows>div>.none').remove();
			if(divs.attr('class')!='w9 w') divs.children().hide();
			clickable=1;
		},1500);
	}
	timer=setInterval(ranTar,2000);

	$('.windows>.w>div>img').on('click',function(){
		let w=$(this).parents('div').eq(1);
		w.append($('<img src="img/hit_effect.png" class="hit" alt="">'));
		let hit=w.children('.hit');
		hit.show();
		setTimeout(function(){ hit.remove(); },100);
		if($(this).parent().attr('class')=='zombie'){
			if(clickable==1){
				w.append($('<img src="img/shot_small_blood.png" class="shot" alt="">'));
				shot=w.children('.shot');
				shot.show();
				zom_cnt--;
				$('.count>strong').text(zom_cnt);
				clickable=0;
			}
			if(w.attr('class')=='w9 w'){
				$(this).attr('src','img/open_door_hit.png');
				click++;
				console.log(click);
			}
			if(zom_cnt==0){ //zom_cnt가 0이 되면 끝(success)
				clearInterval(timer);
				clearInterval(cnt);
				typo_animation($('.success'),400,1000);
				setTimeout(function(){ window.location.href="next_stage.html"; },1200);
			}
		} else if($(this).parent().attr('class')=='human'){
			if(clickable==1){
				life--;
				$(this).attr('src','img/open_human'+remain+'_hit.png');
				$('.life>img').eq($('.life>img').length-1).remove();
				clickable=0;
			}
		} else if($(this).parent().attr('class')=='items'){
			let plus=$('.windows>.w>.items>.plus');
			if(clickable==1){
				if(remain==0){
					life++;
					$('.life').append($('<img src="img/heart.png" alt="">'));
					plus.text('+ 1');
					typo_animation(plus,200,600);
					clickable=0;
				} else if(remain==1){
					sec+=5;
					plus.text('+ 5초');
					typo_animation(plus,200,600);
					clickable=0;
					barW=bar.width()+first_barW*(5/60);
					bar.stop().width(barW);
					animate_progressbar();
				}
			}
		}
		if(life==0){
			clearInterval(timer);
			clearInterval(cnt);
			typo_animation($('.failure'),400,1000);
			setTimeout(function(){ window.location.href="failure.html"; },1200);
		}
	});
});