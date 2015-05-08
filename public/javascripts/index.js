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


var fuse = new Fuse(projectListCache, { keys: ['name'] });

var str = '<li data-name="%name%">' +
            '<div class="desc">'+
                '<h3>%name%</h3>' +
                '<span>%data% 更新</span>' +
                '<p>%description%</p>' +
            '</div>' + 
            '<div class="links">' +
                '<a >PRD</a>' +
                '<a >交互</a>' +
                '<a >视觉</a>' +
            '</div>' + 
        '</li>';

function drawProjectList() {
    $.ajax({
        method: "POST",
        url: "/listProject"
    }).done(function (msg) {
        var html = '';
        if (msg.length > 0) {
            projectListCache = msg;
            fuse = new Fuse(projectListCache, { keys: ['name'] });
            msg.forEach(function (o, i) {
                // console.log(o);

                var t = str.replace(/(%(\w+)%)/g,function($1,$2,$3){
                    return o[$3] ? o[$3] : '';
                });
                html += t;
            });

            $projectList.html('').html(html);
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



var $searchField = $('#searchField');

$searchField.on('input', function () {
    // var $me = $(this);
    var key  = $(this).val();
    var html = '无匹配结果!';

    console.log(projectListCache);
    if(key.length === 0 ){
        html = '';
        projectListCache.forEach(function (o, i) {
            var t = str.replace(/(%(\w+)%)/g,function($1,$2,$3){
                return o[$3] ? o[$3] : '';
            });
            html += t;
        });
        $projectList.html('').html(html);
        return;
    }

    var data = fuse.search(key);

    if (data.length > 0) {
        html = '';
        data.forEach(function (o, i) {
            var t = str.replace(/(%(\w+)%)/g,function($1,$2,$3){
                return o[$3] ? o[$3] : '';
            });
            html += t;
        });
    }
    $projectList.html('').html(html);
});
