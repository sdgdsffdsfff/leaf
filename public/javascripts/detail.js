var $address = $('.address');


var showProject = $('#showProject').html();
var showVersion = $('#showVersion').html();

$address.on('click', 'button', function() {
    var $me = $(this);

    var data = {
        projectName: '',
        version: '',
        type: '',
        srcPath: ''
    };


    //TODO test
    data = {
        projectName: showProject,
        version: showVersion,
        type: '',
        srcPath: ''
    };



    data.type = $me.prev('input').data('type') || 'prd';
    data.srcPath = mixPath($me.prev('input').val());

    $.ajax({
        method: "POST",
        url: "/copy",
        data: data
    }).done(function(msg) {
        alert(msg);
    });
});

function mixPath(value) {
    var mixValue = value;
    mixValue = mixValue.replace(/\\/g, '/');
    return mixValue;
}



var showUrl = {
    "prd": '/' + showProject + '/' + showVersion + '/prd',
    "prototype": '/' + showProject + '/' + showVersion + '/prototype',
    "visual": '/' + showProject + '/' + showVersion + '/visual'
};


var $tab = $('.tab ');
var $showIframe = $('#showIframe');

$tab.on('click', 'button', function() {
    var $me = $(this);
    var type = $me.data('type');
    $showIframe.attr('src', showUrl[type]);
});