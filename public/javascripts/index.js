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
var str = '<li>' +
    '<a href="%href%">' +
    '<h3>%name%</h3>' +
    '</a>' +
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


var $searchButton = $('#searchButton');

$searchButton.on('click', function () {
    var $me = $(this);
    var key  = $me.prev('input').val();
    var data = fuse.search(key);
    var html = '';
    if (data.length > 0) {
        data.forEach(function (o, i) {
            var t = str.replace(/(%(\w+)%)/g,function($1,$2,$3){
                return o[$3] ? o[$3] : '';
            });
            html += t;
        });

        $projectList.html(html);
    }
});
