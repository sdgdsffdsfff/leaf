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
    var str = '<li>' +
    '<a href="%href%">' +
        '<h3>%name%</h3>' +
    '</a>' +
    '</li>';

    $.ajax({
        method: "POST",
        url: "/listProject"
    }).done(function (msg) {
        var html = '';
        if (msg.length > 0) {
            projectListCache = msg;
            msg.forEach(function (o, i) {
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