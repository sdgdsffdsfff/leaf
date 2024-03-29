var $addVersion = $('.addVersion');
var $projectName = $('#projectName');


$addVersion.on('click', function() {
    var $me = $(this);

    var data = {
        uid: $projectName.data('uid'),
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
    }).fail(function(msg) {
        alert(msg.responseText);
    });
});