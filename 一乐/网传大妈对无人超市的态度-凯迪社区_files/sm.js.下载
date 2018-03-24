var wpsmiliestrans = [
	['[咦]',		'face_cat_yellow_01_40x40.gif'],
	['[生气]',	'face_cat_yellow_02_40x40.gif'],
	['[晕]',		'face_cat_yellow_03_40x40.gif'],
	['[流汗]',	'face_cat_yellow_04_40x40.gif'],
	['[困]',		'face_cat_yellow_05_40x40.gif'],
	['[得意]',	'face_cat_yellow_06_40x40.gif'],
	['[吃惊]',	'face_cat_yellow_07_40x40.gif'],
	['[哇]',		'face_cat_yellow_08_40x40.gif'],
	['[爱你]',	'face_cat_yellow_09_40x40.gif'],
	['[酷]',		'face_cat_yellow_10_40x40.gif'],
	['[骷髅]',	'face_cat_yellow_11_40x40.gif'],
	['[可爱]',	'face_cat_yellow_12_40x40.gif'],
	['[唉]',		'face_cat_yellow_13_40x40.gif'],
	['[睡觉]',	'face_cat_yellow_14_40x40.gif'],
	['[鬼脸]',	'face_cat_yellow_15_40x40.gif'],
	['[亲亲]',	'face_cat_yellow_16_40x40.gif'],
	['[疑问]',	'face_cat_yellow_17_40x40.gif'],
	['[闭嘴]',	'face_cat_yellow_18_40x40.gif'],
	['[不开心]',	'face_cat_yellow_19_40x40.gif'],
	['[没眼看]',	'face_cat_yellow_20_40x40.gif'],
	['[努力]',	'face_cat_yellow_21_40x40.gif'],
	['[鄙视]',	'face_cat_yellow_22_40x40.gif'],
	['[呵呵]',	'face_cat_yellow_23_40x40.gif'],
	['[猪]',		'face_cat_yellow_24_40x40.gif'],
	['[哈哈]',	'face_cat_yellow_25_40x40.gif'],
	['[偷笑]',	'face_cat_yellow_26_40x40.gif'],
	['[发怒]',	'face_cat_yellow_27_40x40.gif'],
	['[不要]',	'face_cat_yellow_28_40x40.gif'],
	['[悲伤]',	'face_cat_yellow_29_40x40.gif'],
	['[流泪]',	'face_cat_yellow_30_40x40.gif']
];



function loadtempface() {
    var showsm1 = "<div class=\"face-list-kd margin-b1\"  id=\"showfaceimg2\">";
    var k = 1;
    for (var j = 0; j < wpsmiliestrans.length; j++) {
        if (k == 1) {
            showsm1 += "<ul class=\"clearfix\" id=\"showfaceimg" + j + "\" style=\"font-size:12px;\">";
        }
        showsm1 += "<li id='faceliimg" + j + "' style='width:40px;height:40px;'></li>";
        if (k % 30 == 0 && k != 1) {
            var pages = k / 30;
            showsm1 += "</ul>";
            if (wpsmiliestrans.length > j) {
                if (j != (wpsmiliestrans.length - 1)) {
                    showsm1 += "<ul class=\"clearfix\" style=\"display:none;\" id=\"showfaceimg" + pages + "\" style=\"font-size:12px;\" >";
                }
            }
        }
        k++;

    }
    showsm1 += "</div>";
    return showsm1;
}

//显示表情符

function getfaceimg(id) {
    var showsm2 = "";
    var k = 1;
    var totalRows = wpsmiliestrans.length;
    var cpage = id.replace("faceliimg", "");
    var pageSize = 30;

    var startcounts = pageSize * cpage;

    var PageCount = startcounts + pageSize;
    if (PageCount >= totalRows) {
        PageCount = totalRows;
    }

    for (var j = startcounts; j < PageCount; j++) {
        if (j >= totalRows) {
            break;
        }
        showsm2 = "<img style='width:40px;height:40px;' onclick='selectsm(" + j + ");' src='http://imgcdn.kdnet.net/resource/emotions/HD/" + wpsmiliestrans[j][1] + "' title=\"" + wpsmiliestrans[j][0] + "\" alt=\"" + wpsmiliestrans[j][0] + "\"/>";
        document.getElementById("faceliimg" + j + "").innerHTML = showsm2;
    }
    return showsm2;
}


var wpsmiliestrans_emoji = [

    ['[不爽猫_高兴]', 'face_cat_black_01_120x120.gif'],
    ['[不爽猫_冷笑]', 'face_cat_black_02_120x120.gif'],
    ['[不爽猫_鄙视]', 'face_cat_black_03_120x120.gif'],
    ['[不爽猫_生气]', 'face_cat_black_04_120x120.gif'],
    ['[不爽猫_流泪]', 'face_cat_black_05_120x120.gif'],
    ['[不爽猫_NO]', 	'face_cat_black_06_120x120.gif'],
    ['[不爽猫_YES]', 'face_cat_black_07_120x120.gif'],
    ['[不爽猫_围观]', 'face_cat_black_08_120x120.gif'],
    ['[不爽猫_路过]', 'face_cat_black_09_120x120.gif'],
    ['[不爽猫_约架]', 'face_cat_black_10_120x120.gif'],
    ['[不爽猫_装酷]', 'face_cat_black_11_120x120.gif'],
    ['[不爽猫_抓狂]', 'face_cat_black_12_120x120.gif'],
    ['[不爽猫_无语]', 'face_cat_black_13_120x120.gif'],
    ['[不爽猫_握手]', 'face_cat_black_14_120x120.gif'],
    ['[不爽猫_卖萌]', 'face_cat_black_15_120x120.gif'],
    ['[不爽猫_加油]', 'face_cat_black_16_120x120.gif']
];
var opagecounts = 60;
function loadtempemoji() {
    var showsm2 = "<div class=\"face-list-emoji margin-b1\"  id=\"showfaceimg2\">";
    var k = 1;
    for (var j = 0; j < wpsmiliestrans_emoji.length; j++) {
        if (k == 1) {
            showsm2 += "<ul class=\"clearfix\" id=\"emoji" + j + "\" style=\"font-size:12px;\">";
        }
        showsm2 += "<li id='liimg"+j+"' style='width:40px;height:40px;'></li>";
        if (k % opagecounts == 0 && k != 1) {
            var pages = k / opagecounts;
            showsm2 += "</ul>";
            if (wpsmiliestrans_emoji.length > j) {
                if (j != (wpsmiliestrans_emoji.length - 1)) {
                    showsm2 += "<ul class=\"clearfix\" style=\"display:none;\" id=\"emoji" + pages + "\" style=\"font-size:12px;\" >";
                }
            }
        }
        k++;

    }
     showsm2 += "</div>";
    return showsm2;
}

//显示表情符
function getemojism(id) {
    var showsm2 = "";
    var k = 1;
    var totalRows = wpsmiliestrans_emoji.length;
    var cpage = id.replace("emoji", "");
    var pageSize = opagecounts;

    var startcounts = pageSize * cpage;

    var PageCount = startcounts + pageSize;
    if (PageCount >= totalRows) {
        PageCount = totalRows;
    }

    for (var j = startcounts; j < PageCount; j++) {
        if (j >= totalRows) {
            break;
        }
        showsm2 = "<img style='width:40px;height:40px;' onclick='selectemo(" + j + ");' src='http://imgcdn.kdnet.net/resource/emotions/HD/" + wpsmiliestrans_emoji[j][1] + "' title=\"" + wpsmiliestrans_emoji[j][0] + "\" alt=\"" + wpsmiliestrans_emoji[j][0] + "\"/>";
        document.getElementById("liimg" + j + "").innerHTML = showsm2;
    }
    return showsm2;
}
