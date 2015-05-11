var $address = $('.address');


var showProject = $('#showProject').html();
var showVersion = $('#showVersion').html();

console.log( $(window).height() - $('.display .tab').height() )


$('iframe').css({
    'height' : $(window).height() - $('.display .tab').height() - 10
})

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

if(window.location.hash) {
    var _hash = window.location.hash;
    $('.tab .active').removeClass('active');
    $('.tab a[href='+_hash+']').addClass('active');

    if(_hash==='#prd' || _hash === '#prototype' || _hash === '#visual'){
        _hash = _hash.substr(1);
        $showIframe.attr('src', showUrl[_hash]);
    }
} 


window.addEventListener("hashchange", function(){
    var _hash = window.location.hash;
    $('.tab .active').removeClass('active');
    $('.tab a[href='+_hash+']').addClass('active');

    if(_hash==='#prd' || _hash === '#prototype' || _hash === '#visual'){
        _hash = _hash.substr(1);
        $showIframe.attr('src', showUrl[_hash]);
    }
}, false);


$tab.on('click', 'a', function() {
    var $me = $(this);
    var type = $me.data('type');
    $showIframe.attr('src', showUrl[type]);

    $tab.css({
        'background-color' : '#1ab56e'
    });

    $('.display').css({
        'top' : 60,
        'height' : 'calc(100% - 60px)'
    });


});