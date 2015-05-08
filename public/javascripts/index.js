var $projectForm = $('#projectForm');


$projectForm.on('submit', function (e) {
    e.preventDefault();
    var data = new FormData(this);
    $.ajax({
        method: "POST",
        url: "/addProject",
        contentType: false,
        processData: false,
        data: data
    }).done(function (msg) {
        drawProjectList();
    }).fail(function (msg) {
        alert(msg.responseText);
    });
});


var $projectList = $('#projectList');
var projectListCache = [];

function drawProjectList() {
    var str = '<li data-name="%name%">' +
        '<div class="desc">'+
            '<h3>%name%</h3>' +
            '<span>%data% 更新</span>' +
            '<p>%description%</p>' +
        '</div>' + 
        '<div class="links">' +

        '</div>' + 
    '</li>';

    $.ajax({
        method: "POST",
        url: "/listProject"
    }).done(function (msg) {
        var html = '';
        if (msg.length > 0) {
            projectListCache = msg;
            msg.forEach(function (o, i) {
                // console.log(o);

                var t = str.replace(/(%(\w+)%)/g,function($1,$2,$3){
                    return o[$3] ? o[$3] : '';
                });
                html += t;
            });

            $projectList.html(html);
        }
    }).fail(function (msg) {
        alert(msg);
    });
}


drawProjectList();

var headerHeight = $('header').height();

$(window).on('scroll',function(e){
    var _top = $(this).scrollTop();

    // 假如超过高度就悬浮
    if(_top >= headerHeight){
        // $('.searchPlaceholder').addClass('fixed');
    }else{
        // $('.searchPlaceholder').removeClass('fixed');
        var scale = (2-_top/headerHeight)/2;
        $('header').css({
            '-webkit-transform' : 'scale3d('+scale+','+scale+',1)',
            'transform' : 'scale3d('+scale+','+scale+',1)'
        })
    }

})


//var $addVersion = $('.addVersion');
//var $projectName = $('#projectName');
//
//
//$addVersion.on('click', function() {
//    var $me = $(this);
//
//    var data = {
//        uid: $projectName.data('uid'),
//        projectName: $projectName.html(),
//        version: ''
//    };
//
//    data.version = $me.prev('input').val();
//    $.ajax({
//        method: "POST",
//        url: "/addVersion",
//        data: data
//    }).done(function(msg) {
//        window.location.reload();
//    }).fail(function(msg) {
//        alert(msg.responseText);
//    });
//});