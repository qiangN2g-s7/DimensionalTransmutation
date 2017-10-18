/*
	[Discuz!] (C)2001-2009 Comsenz Inc.
	This is NOT a freeware, use is subject to license terms

	$Id: forum_viewthread.js 17655 2010-10-26 08:11:10Z monkey $
*/

var replyreload = '';

function attachimgshow(pid) {
	aimgs = aimgcount[pid];
	aimgcomplete = 0;
	loadingcount = 0;
	for(i = 0;i < aimgs.length;i++) {
		obj = $('aimg_' + aimgs[i]);
		if(!obj) {
			aimgcomplete++;
			continue;
		}
		if(!obj.status) {
			obj.status = 1;
			if(obj.getAttribute('file')) obj.src = obj.getAttribute('file');
			loadingcount++;
		} else if(obj.status == 1) {
			if(obj.complete) {
				obj.status = 2;
			} else {
				loadingcount++;
			}
		} else if(obj.status == 2) {
			aimgcomplete++;
			if(obj.getAttribute('thumbImg')) {
				thumbImg(obj);
			}
		}
		if(loadingcount >= 10) {
			break;
		}
	}
	if(aimgcomplete < aimgs.length) {
		setTimeout("attachimgshow('" + pid + "')", 100);
	}
}

function attachimginfo(obj, infoobj, show, event) {
	objinfo = fetchOffset(obj);
	if(show) {
		$(infoobj).style.left = objinfo['left'] + 'px';
		$(infoobj).style.top = obj.offsetHeight < 40 ? (objinfo['top'] + obj.offsetHeight) + 'px' : objinfo['top'] + 'px';
		$(infoobj).style.display = '';
	} else {
		if(BROWSER.ie) {
			$(infoobj).style.display = 'none';
			return;
		} else {
			var mousex = document.body.scrollLeft + event.clientX;
			var mousey = document.documentElement.scrollTop + event.clientY;
			if(mousex < objinfo['left'] || mousex > objinfo['left'] + objinfo['width'] || mousey < objinfo['top'] || mousey > objinfo['top'] + objinfo['height']) {
				$(infoobj).style.display = 'none';
			}
		}
	}
}

function signature(obj) {
	if(obj.style.maxHeightIE != '') {
		var height = (obj.scrollHeight > parseInt(obj.style.maxHeightIE)) ? obj.style.maxHeightIE : obj.scrollHeight + 'px';
		if(obj.innerHTML.indexOf('<IMG ') == -1) {
			obj.style.maxHeightIE = '';
		}
		return height;
	}
}

function tagshow(event) {
	var obj = BROWSER.ie ? event.srcElement : event.target;
	ajaxmenu(obj, 0, 1, 2);
}

function parsetag(pid) {
	if(!$('postmessage_'+pid) || $('postmessage_'+pid).innerHTML.match(/<script[^\>]*?>/i)) {
		return;
	}
	var havetag = false;
	var tagfindarray = new Array();
	var str = $('postmessage_'+pid).innerHTML.replace(/(^|>)([^<]+)(?=<|$)/ig, function($1, $2, $3, $4) {
		for(i in tagarray) {
			if(tagarray[i] && $3.indexOf(tagarray[i]) != -1) {
				havetag = true;
				$3 = $3.replace(tagarray[i], '<h_ ' + i + '>');
				tmp = $3.replace(/&[a-z]*?<h_ \d+>[a-z]*?;/ig, '');
				if(tmp != $3) {
					$3 = tmp;
				} else {
					tagfindarray[i] = tagarray[i];
					tagarray[i] = '';
				}
			}
		}
		return $2 + $3;
		});
		if(havetag) {
		$('postmessage_'+pid).innerHTML = str.replace(/<h_ (\d+)>/ig, function($1, $2) {
			return '<span href=\"forum.php?mod=tag&name=' + tagencarray[$2] + '\" onclick=\"tagshow(event)\" class=\"t_tag\">' + tagfindarray[$2] + '</span>';
	    	});
	}
}

function setanswer(pid, from){
	if(confirm('您确认要把该回复选为“最佳答案”吗？')){
		if(BROWSER.ie) {
			doane(event);
		}
		$('modactions').action='forum.php?mod=misc&action=bestanswer&tid=' + tid + '&pid=' + pid + '&from=' + from + '&bestanswersubmit=yes';
		$('modactions').submit();
	}
}

var authort;
function showauthor(ctrlObj, menuid) {
	authort = setTimeout(function () {
		showMenu({'menuid':menuid});
		if($(menuid + '_ma').innerHTML == '') $(menuid + '_ma').innerHTML = ctrlObj.innerHTML;
	}, 500);
	if(!ctrlObj.onmouseout) {
		ctrlObj.onmouseout = function() {
			clearTimeout(authort);
		}
	}
}

function fastpostappendreply() {
	if($('fastpostrefresh') != null) {
		setcookie('fastpostrefresh', $('fastpostrefresh').checked ? 1 : 0, 2592000);
		if($('fastpostrefresh').checked) {
			location.href = 'forum.php?mod=redirect&tid='+tid+'&goto=lastpost&random=' + Math.random() + '#lastpost';
			return;
		}
	}
	newpos = fetchOffset($('post_new'));
	document.documentElement.scrollTop = newpos['top'];
	$('post_new').style.display = '';
	$('post_new').id = '';
	div = document.createElement('div');
	div.id = 'post_new';
	div.style.display = 'none';
	div.className = '';
	$('postlistreply').appendChild(div);
	$('fastpostsubmit').disabled = false;
	$('fastpostmessage').value = '';
	if($('secanswer3')) {
		$('checksecanswer3').innerHTML = '<img src="' + STATICURL + 'image/common/none.gif" width="17" height="17">';
		$('secanswer3').value = '';
		secclick3['secanswer3'] = 0;
	}
	if($('seccodeverify3')) {
		$('checkseccodeverify3').innerHTML = '<img src="' + STATICURL + 'image/common/none.gif" width="17" height="17">';
		$('seccodeverify3').value = '';
		secclick3['seccodeverify3'] = 0;
	}
	showCreditPrompt();
}

function succeedhandle_fastpost(locationhref, message, param) {
	var pid = param['pid'];
	var tid = param['tid'];
	var from = param['from'];
	if(pid) {
		ajaxget('forum.php?mod=viewthread&tid=' + tid + '&viewpid=' + pid + '&from=' + from, 'post_new', 'ajaxwaitid', '', null, 'fastpostappendreply()');
		if(replyreload) {
			var reloadpids = replyreload.split(',');
			for(i = 1;i < reloadpids.length;i++) {
				ajaxget('forum.php?mod=viewthread&tid=' + tid + '&viewpid=' + reloadpids[i] + '&from=' + from, 'post_' + reloadpids[i]);
			}
		}
		$('fastpostreturn').className = '';
	} else {
		if(!message) {
			message = '本版回帖需要审核，您的帖子将在通过审核后显示';
		}
		$('post_new').style.display = $('fastpostmessage').value = $('fastpostreturn').className = '';
		$('fastpostreturn').innerHTML = message;
	}
	if(param['sechash']) {
		updatesecqaa(param['sechash']);
		updateseccode(param['sechash']);
	}
}

function errorhandle_fastpost() {
	$('fastpostsubmit').disabled = false;
}

function succeedhandle_comment(locationhref, message, param) {
	ajaxget('forum.php?mod=misc&action=commentmore&tid=' + param['tid'] + '&pid=' + param['pid'], 'comment_' + param['pid']);
	hideWindow('comment');
	showCreditPrompt();
}

function succeedhandle_postappend(locationhref, message, param) {
	ajaxget('forum.php?mod=viewthread&tid=' + param['tid'] + '&viewpid=' + param['pid'], 'post_' + param['pid']);
	hideWindow('postappend');
}

function recommendupdate(n) {
	if(getcookie('recommend')) {
		var objv = n > 0 ? $('recommendv_add') : $('recommendv_subtract');
		objv.innerHTML = parseInt(objv.innerHTML) + 1;
		setTimeout(function () {
			$('recommentc').innerHTML = parseInt($('recommentc').innerHTML) + n;
			$('recommentv').style.display = 'none';
		}, 1000);
		setcookie('recommend', '');
	}
}

function favoriteupdate() {
	var obj = $('favoritenumber');
	obj.innerHTML = parseInt(obj.innerHTML) + 1;
}

function shareupdate() {
	var obj = $('sharenumber');
	obj.innerHTML = parseInt(obj.innerHTML) + 1;
}

function switchrecommendv() {
	display('recommendv');
	display('recommendav');
}

function appendreply() {
	newpos = fetchOffset($('post_new'));
	document.documentElement.scrollTop = newpos['top'];
	$('post_new').style.display = '';
	$('post_new').id = '';
	div = document.createElement('div');
	div.id = 'post_new';
	div.style.display = 'none';
	div.className = '';
	$('postlistreply').appendChild(div);
	if($('postform')) {
		$('postform').replysubmit.disabled = false;
	}
	showCreditPrompt();
}

function creditconfirm(v) {
	return confirm('下载需要消耗' + v + '，您是否要下载？');
}

function poll_checkbox(obj) {
	if(obj.checked) {
		p++;
		for (var i = 0; i < $('poll').elements.length; i++) {
			var e = $('poll').elements[i];
			if(p == max_obj) {
				if(e.name.match('pollanswers') && !e.checked) {
					e.disabled = true;
				}
			}
		}
	} else {
		p--;
		for (var i = 0; i < $('poll').elements.length; i++) {
			var e = $('poll').elements[i];
			if(e.name.match('pollanswers') && e.disabled) {
				e.disabled = false;
			}
		}
	}
	$('pollsubmit').disabled = p <= max_obj && p > 0 ? false : true;
}

function itemdisable(i) {
	if($('itemt_' + i).className == 'z') {
		$('itemt_' + i).className = 'z xg1';
		$('itemc_' + i).value = '';
		itemset(i);
	} else {
		$('itemt_' + i).className = 'z';
		$('itemc_' + i).value = $('itemc_' + i).value > 0 ? $('itemc_' + i).value : 0;
	}
}
function itemop(i, v) {
	var h = v > 0 ? '-' + (v * 16) + 'px' : '0';
	$('item_' + i).style.backgroundPosition = '10px ' + h;
}
function itemclk(i, v) {
	$('itemc_' + i).value = v;
	$('itemt_' + i).className = 'z';
}
function itemset(i) {
	var v = $('itemc_' + i).value;
	var h = v > 0 ? '-' + (v * 16) + 'px' : '0';
	$('item_' + i).style.backgroundPosition = '10px ' + h;
}

function checkmgcmn(id) {
	if(!$('mgc_' + id + '_menu').getElementsByTagName('li').length) {
		$('mgc_' + id).innerHTML = '';
		$('mgc_' + id).style.display = 'none';
	}
}

function toggleRatelogCollapse(tarId, ctrlObj) {
	if($(tarId).className == 'rate') {
		$(tarId).className = 'rate rate_collapse';
		setcookie('ratecollapse', 1, 2592000);
		ctrlObj.innerHTML = '展开';
	} else {
		$(tarId).className = 'rate';
		setcookie('ratecollapse', 0, -2592000);
		ctrlObj.innerHTML = '收起';
	}
}

function showPostWin(action, href) {
	showWindow(action, href, 'get', 0);
}

function copyThreadUrl(obj) {
	setCopy($('thread_subject').innerHTML + '\n' + obj.href + '\n', '帖子地址已经复制到剪贴板');
	return false;
}

function talkbookFocus(obj){
		if(obj.value == '一句话评论或吐槽') {
			obj.value = '';
		}
		obj.className='quick_talk_focus';
		}
	function talkbookBlur(obj) {
		//alert(document.activeElement.id);
		if(obj.value == '' ) {
			obj.value = '一句话评论或吐槽';
		}
		obj.className='quick_talk_blur';

	}
	function talkbookPost(messageid,bid,statid,showid){
		var messageobj=$(messageid);
		var statobj=$(statid);
		var showobj=$(showid);
		var message=messageobj.value;
		message=trim(message);
		if(!message || message=='一句话评论或吐槽'){
			statobj.innerHTML=talkbookshow("没有输入内容",0);
			return;
		}
		var x = new Ajax('HTML');
		statobj.innerHTML=talkbookshow("正在提交中",2);
		x.get('book.php?mod=ajax&do=quicktalk&message='+encodeURI(message)+'&bid='+bid+'&inajax=1', function(s){
			var pattern=new RegExp("^{(.*?)}$");
			if(pattern.test(s)){
				var theobj=eval('(' + s + ')'); 
				errors=theobj.error?theobj.error:'未知错误！';
				
				stat=theobj.stat=='1'?1:0;
				news=theobj.news;
			}else{
				errors='未知错误！';
				stat=0;
			}
			if(!stat){
				statobj.innerHTML=talkbookshow(errors,0);
				return;
			}
			if(news){
				showobj.innerHTML="<span class='myword'>"+news+"</span>";
			}
			statobj.innerHTML=talkbookshow(errors,1);
			messageobj.value='一句话评论或吐槽';
		});
	}
	function talkbookshow(message,stat){
		var pre='';
		if(stat=="0"){
			pre="<img src='template/default/book/pics/del_book.gif'><span style='color:red'>";
		}else if(stat=="1"){
			pre="<img src='template/default/book/pics/success.gif'><span style='color:#77CCFF'>";
		}else if(stat=="2"){
			pre="<img src='template/default/book/pics/loading.gif'><span>";
		}
		pre=pre+message+"</span>";
		return pre;
	}

function stopMusic(preID, playerID) {
	var musicFlash = preID.toString() + '_' + playerID.toString();
	if($(musicFlash)) {
		$(musicFlash).SetVariable('closePlayer', 1);
	}
}
	function showFlash(host, flashvar, obj, shareid) {
	var flashAddr = {
		'youku.com' : 'http://player.youku.com/player.php/sid/FLASHVAR=/v.swf',
		'ku6.com' : 'http://player.ku6.com/refer/FLASHVAR/v.swf',
		'youtube.com' : 'http://www.youtube.com/v/FLASHVAR',
		'5show.com' : 'http://www.5show.com/swf/5show_player.swf?flv_id=FLASHVAR',
		'sina.com.cn' : 'http://vhead.blog.sina.com.cn/player/outer_player.swf?vid=FLASHVAR',
		'sohu.com' : 'http://v.blog.sohu.com/fo/v4/FLASHVAR',
		'mofile.com' : 'http://tv.mofile.com/cn/xplayer.swf?v=FLASHVAR',
		'music' : 'FLASHVAR',
		'flash' : 'FLASHVAR'
	};
	var flash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0" width="480" height="400">'
	    + '<param name="movie" value="FLASHADDR" />'
	    + '<param name="quality" value="high" />'
	    + '<param name="bgcolor" value="#FFFFFF" />'
	    + '<embed width="480" height="400" menu="false" quality="high" src="FLASHADDR" type="application/x-shockwave-flash" />'
	    + '</object>';
	var videoFlash = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="480" height="450">'
		+ '<param value="transparent" name="wmode"/>'
		+ '<param value="FLASHADDR" name="movie" />'
		+ '<embed src="FLASHADDR" wmode="transparent" allowfullscreen="true" type="application/x-shockwave-flash" width="480" height="450"></embed>'
		+ '</object>';
	var musicFlash = '<object id="audioplayer_SHAREID" height="24" width="290" data="' + STATICURL + 'image/common/player.swf" type="application/x-shockwave-flash">'
		+ '<param value="' + STATICURL + 'image/common/player.swf" name="movie"/>'
		+ '<param value="autostart=yes&bg=0xCDDFF3&leftbg=0x357DCE&lefticon=0xF2F2F2&rightbg=0xF06A51&rightbghover=0xAF2910&righticon=0xF2F2F2&righticonhover=0xFFFFFF&text=0x357DCE&slider=0x357DCE&track=0xFFFFFF&border=0xFFFFFF&loader=0xAF2910&soundFile=FLASHADDR" name="FlashVars"/>'
		+ '<param value="high" name="quality"/>'
		+ '<param value="false" name="menu"/>'
		+ '<param value="#FFFFFF" name="bgcolor"/>'
	    + '</object>';
	var musicMedia = '<object height="64" width="290" data="FLASHADDR" type="audio/x-ms-wma">'
	    + '<param value="FLASHADDR" name="src"/>'
	    + '<param value="1" name="autostart"/>'
	    + '<param value="true" name="controller"/>'
	    + '</object>';
	var flashHtml = videoFlash;
	var videoMp3 = true;
	if('' == flashvar) {
		alert('音乐地址错误，不能为空');
		return false;
	}
	if('music' == host) {
		var mp3Reg = new RegExp('.mp3$', 'ig');
		var flashReg = new RegExp('.swf$', 'ig');
		flashHtml = musicMedia;
		videoMp3 = false;
		if(mp3Reg.test(flashvar)) {
			videoMp3 = true;
			flashHtml = musicFlash;
		} else if(flashReg.test(flashvar)) {
			videoMp3 = true;
			flashHtml = flash;
		}
	}
	flashvar = encodeURI(flashvar);
	if(flashAddr[host]) {
		var flash = flashAddr[host].replace('FLASHVAR', flashvar);
		flashHtml = flashHtml.replace(/FLASHADDR/g, flash);
		flashHtml = flashHtml.replace(/SHAREID/g, shareid);
	}

	if(!obj) {
		$('flash_div_' + shareid).innerHTML = flashHtml;
		return true;
	}
	if($('flash_div_' + shareid)) {
		$('flash_div_' + shareid).style.display = '';
		$('flash_hide_' + shareid).style.display = '';
		obj.style.display = 'none';
		return true;
	}
	if(flashAddr[host]) {
		var flashObj = document.createElement('div');
		flashObj.id = 'flash_div_' + shareid;
		obj.parentNode.insertBefore(flashObj, obj);
		flashObj.innerHTML = flashHtml;
		obj.style.display = 'none';
		var hideObj = document.createElement('div');
		hideObj.id = 'flash_hide_' + shareid;
		var nodetxt = document.createTextNode("收起");
		hideObj.appendChild(nodetxt);
		obj.parentNode.insertBefore(hideObj, obj);
		hideObj.style.cursor = 'pointer';
		hideObj.onclick = function() {
			if(true == videoMp3) {
				stopMusic('audioplayer', shareid);
				flashObj.parentNode.removeChild(flashObj);
				hideObj.parentNode.removeChild(hideObj);
			} else {
				flashObj.style.display = 'none';
				hideObj.style.display = 'none';
			}
			obj.style.display = '';
		};
	}
}