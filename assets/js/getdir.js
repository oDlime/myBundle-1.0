$(function() {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://'+window.location.host+'/getFileTree');
	xhr.responseType = 'json';
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			if (xhr.status >= 200 && xhr.status < 300) {
				var dir = xhr.response;
				var appcont = new Vue({
					el: '.sidebar-one-list',
					data: {
						dir: dir.children
					}
				})
				okhttpok();
			}
		}
	}
	function okhttpok() {
		var dirposition = [];
		$('.page').hover(function() {
			this.classList.add('animate__animated', 'animate__pulse');
		}, function() {
			this.classList.remove('animate__animated', 'animate__pulse');
		})
		// 自定义右键菜单
		document.oncontextmenu = function(ev) {

			return false;
		}
		var setcontentlogo = function(){
			$("#content-logo-b").toggleClass('animate__backInUp').toggleClass('animate__backOutUp')
			$("#content-logo-u").toggleClass('animate__bounceInUp').toggleClass('animate__bounceOutUp')
			$("#content-logo-n").toggleClass('animate__backInUp').toggleClass('animate__backOutUp')
			$("#content-logo-d").toggleClass('animate__bounceInUp').toggleClass('animate__bounceOutUp')
			$("#content-logo-l").toggleClass('animate__backInUp').toggleClass('animate__backOutUp')
			$("#content-logo-e").toggleClass('animate__bounceInUp').toggleClass('animate__bounceOutUp')
		}
		//设置md样式  md的点击事件
		var setmd = $('.sidebar-dir');
		var isfirst = "0";
		for (let i = 0; i < setmd.length; i++) {
			var mdfilename = setmd[i].textContent.split('.');
			if(mdfilename.slice(-1)=='md'){
				mdfilename.pop()
				$(setmd[i])[0].classList.remove('sidebar-dir')
				$(setmd[i])[0].classList.add('sidebar-md')
				setmd[i].innerHTML = '<a href="#"><i class="bi bi-markdown icon-md"></i>'+mdfilename+'</a>';
				$(setmd[i]).click(function(){
					if(isfirst=="1"){
						setcontentlogo();
					}
					isfirst = "1";
					const xhr = new XMLHttpRequest();
					// console.log($(setmd[i]).parent().children('.fpath')[0].innerText)
					var path = $(setmd[i]).parent().children('.fpath')[0].innerText;
					xhr.open('GET', 'http://'+window.location.host+'/path?path='+path);
					xhr.send();
					xhr.onreadystatechange = function() {
						if (xhr.readyState === 4) {
							if (xhr.status >= 200 && xhr.status < 300) {
								var mdcontent = xhr.response;
								setcontentlogo();
								$('.content-body')[0].innerHTML = mdcontent;
							}
						}
					}
					
				})
			}else if(mdfilename[1]=='png'||mdfilename[1]=='jpg'||mdfilename[1]=='assets'||mdfilename[1]=='java'){
				$(setmd[i]).remove()
			}
		}
		//侧边栏
		var items = $('.sidebar-dir');
		for (let i = 0; i < items.length; i++) {
			items[i].onclick = function() {
				$(this).parent().siblings().children('.item-list').slideUp(100);
				if($(this).parent().siblings().children('.sidebar-dir').children('.bi-caret-down-fill').length!=0){
					$(this).parent().siblings().children('.sidebar-dir').children('.bi-caret-down-fill')[0].classList.add('bi-caret-right-fill')
					$(this).parent().siblings().children('.sidebar-dir').children('.bi-caret-down-fill')[0].classList.remove('bi-caret-down-fill')
				}
				$(this).parent().children('.sidebar-dir').children('i').toggleClass("bi-caret-right-fill").toggleClass("bi-caret-down-fill")
				$(this).parent().children('.item-list').stop().slideToggle(100)
			}
		}

		// var sidebarv = document.getElementById("xstool");
		// alert(sidebarv)










	}

})
