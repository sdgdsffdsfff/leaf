var $projectForm = $('#projectForm');


$projectForm.on('submit', function(e) {
    e.preventDefault();
    var data = new FormData(this);
    $.ajax({
        method: "POST",
        url: "/addProject",
        contentType: false,
        processData: false,
        data: data
    }).done(function(msg) {
        drawProjectList();
        window.location.href = '#content';
        clearForm();
    }).fail(function(msg) {
        alert(msg.responseText);
        if (msg.responseText === '项目已存在!') {
            var name = $('input[name=projectName]').val();
            $('#searchField').val(name).trigger('input').focus();
        }
    });
});

$('.formBox').on('click', '.cancel', function() {
    clearForm();
});

var $projectList = $('#projectList');
var projectListCache = [];


var fuse = new Fuse(projectListCache, {
    keys: ['name']
});

var str = '<li data-name="%name%">' +
    '<a id="%name%"></a>' +
    '<div class="desc">' +
    '<h3>%showName%</h3>' +
    // '<span>%data% 更新</span>' +
    '<p>%description%</p>' +
    '</div>' +
    '<div class="links" style="display:%isShow%">' +
    '<a href="/%name%/%newVersion%/prd">PRD</a>' +
    '<a href="/%name%/%newVersion%/prototype" >交互</a>' +
    '<a href="/%name%/%newVersion%/visual">视觉</a>' +
    '</div>' +
    '</li>';

function drawProjectList() {
    $.ajax({
        method: "POST",
        url: "/listProject"
    }).done(function(msg) {
        var html = '';
        if (msg.length > 0) {
            projectListCache = msg;
            fuse = new Fuse(projectListCache, {
                keys: ['name']
            });
            msg.forEach(function(o, i) {
                var newVersion = '';
                var isShow = 'flex';
                if (o.versions.length > 0) {
                    newVersion = o.versions[0].name;
                } else {
                    isShow = 'none';
                }

                var t = str.replace(/(%(\w+)%)/g, function($1, $2, $3) {
                    switch ($3) {
                        case 'showName':
                            return o['name'] ? o['name'] : '';
                            break;
                        case 'newVersion':
                            return newVersion;
                            break;
                        case 'isShow':
                            return isShow;
                        default:
                            return o[$3] ? o[$3] : '';
                    }

                });
                html += t;
            });

            $projectList.html('').html(html);
        }
    }).fail(function(msg) {
        alert(msg);
    });
}


drawProjectList();

var headerHeight = $('header').height();

$(window).on('scroll', function(e) {
    var _top = $(this).scrollTop();

    // 假如超过高度就悬浮
    if (_top >= headerHeight) {} else {
        // $('.searchPlaceholder').removeClass('fixed');
        var scale = (2 - _top / headerHeight) / 2;
        $('header').css({
            '-webkit-transform': 'scale3d(' + scale + ',' + scale + ',1)',
            'transform': 'scale3d(' + scale + ',' + scale + ',1)'
        })
    }
})


var $searchField = $('#searchField');

$searchField.on('input', function() {

    var key = $(this).val();
    var html = '无匹配结果!';

    if (key.length === 0) {
        html = '';
        projectListCache.forEach(function(o, i) {
            var newVersion = '';
            var isShow = 'flex';
            if (o.versions.length > 0) {
                newVersion = o.versions[0].name;
            } else {
                isShow = 'none';
            }

            var t = str.replace(/(%(\w+)%)/g, function($1, $2, $3) {
                switch ($3) {
                    case 'showName':
                        return o['name'] ? o['name'] : '';
                        break;
                    case 'newVersion':
                        return newVersion;
                        break;
                    case 'isShow':
                        return isShow;
                    default:
                        return o[$3] ? o[$3] : '';
                }

            });
            html += t;
        });
        $projectList.html('').html(html);
        return;
    }

    var data = fuse.search(key);

    if (data.length > 0) {
        html = '';
        data.forEach(function(o, i) {
            var sKey = '<div style="color: red;  display: inline;">' + key + '</div>';
            var rStr = new RegExp(key, "g");
            var newVersion = '';
            var isShow = 'flex';
            if (o.versions.length > 0) {
                newVersion = o.versions[0].name;
            } else {
                isShow = 'none';
            }

            var t = str.replace(/(%(\w+)%)/g, function($1, $2, $3) {
                switch ($3) {
                    case 'showName':
                        return o['name'].replace(rStr, sKey) || '';
                        break;
                    case 'newVersion':
                        return newVersion;
                        break;
                    case 'isShow':
                        return isShow;
                    default:
                        return o[$3] ? o[$3] : '';
                }

            });
            html += t;
        });
    }
    $projectList.html('').html(html);

    // 此处会阻断中文输入法
    // window.location.href = '#content';

});

$('#projectList').on('click', 'li', function() {
    var name = $(this).data('name');
    if (name) {
        window.location.href = '/' + name;
    }
})


$('#addNew').on('click', function() {
    $('header .addBox').addClass('open');
    $('input[name=projectName]').focus();
});

function clearForm() {
    $('header .addBox').removeClass('open');
    $projectForm[0].reset();
}