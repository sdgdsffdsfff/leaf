var $addProject = $('.addProject');



$addProject.on('click', function() {
    var $me = $(this);

    var data = {
        projectName: ''
    };

    data.projectName = $me.prev('input').val();
    $.ajax({
        method: "POST",
        url: "/addProject",
        data: data
    }).done(function(msg) {
        window.location.reload();
    }).fail(function(msg){
        alert(msg.responseText);
    });
});


var $addVersion = $('.addVersion');
var $projectName = $('#projectName');


$addVersion.on('click', function() {
    var $me = $(this);

    var data = {
        projectName: $projectName.html(),
        version: ''
    };

    data.version = $me.prev('input').val();
    $.ajax({
        method: "POST",
        url: "/addVersion",
        data: data
    }).done(function(msg) {
        window.location.reload();
    });
});