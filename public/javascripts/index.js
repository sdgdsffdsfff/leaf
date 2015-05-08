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
    $.ajax({
        method: "POST",
        url: "/listProject"
    }).done(function (msg) {
        var str = '';
        if (msg.length > 0) {
            projectListCache = msg;
            msg.forEach(function (o, i) {
                str += '<li>' + o.name + '</li>';
            });
            $projectList.html(str);
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