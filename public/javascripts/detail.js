var $address = $('.address');

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
        projectName: '首页精准化',
        version: '1',
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
    "prd": '/首页精准化/1/prd',
    "prototype": '/首页精准化/1/prototype',
    "visual": '/首页精准化/1/visual'
};


var $tab = $('.tab');
var $showIframe = $('#showIframe');

$tab.on('click', 'button', function() {
    var $me = $(this);
    var type = $me.data('type');
    $showIframe.attr('src', showUrl[type]);
});