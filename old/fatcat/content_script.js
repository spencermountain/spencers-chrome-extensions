//alert('content script!')
$(function() {

    if (window.location.href.match(/\/wiki\/Category:.*/i)) {
        docategory()
    } else {
        doarticle()
    }

    function docategory() {
        var a = [];
        $(".mw-content-ltr:last").find("a").each(function() {
            var title = $(this).html();
            a.push({
                id: '/wikipedia/en/' + mqlkey_quote(title),
                title: title,
                link: $(this).attr('href')
            })
        })
        var html = a.map(function(v) {
            return '<a href="' + v.link + '"><img style="opacity: 0.8;-moz-border-radius: 5px; border-radius: 5px;" title="' + v.title + '" src="http://www.freebase.com/api/trans/image_thumb' + v.id + '?mode=fillcropmid&maxwidth=75&maxheight=75&errorid=/m/0djw4wd" /></a>'
        }).join('')
        $(".mw-content-ltr:last").append(html)
    }

    function doarticle() {

        //split the article into sections
        var blacklist = {
            "References": true,
            "External links": true,
            "Notes": true,
            "See also": true,
            "Further reading": true
        };
        //get other sections
        $('h2,h3,h4').each(function(index) {

            var title = $(".mw-headline", this).text();

            if (blacklist[title] == null) {
                var sel = 'h2:eq(' + index + ')';
                    var html = '';
                    var all = [];
                console.log(title)
                $(sel).nextUntil("h2,h3,h4").each(function() {
                    $(this).find("a").each(function(i) {
                        var link = $(this).attr('href');
                        if (link.match(/\/wiki\/.*/)) {
                            all.push({
                                id: '/wikipedia/en/' + mqlkey_quote(link.replace(/\/wiki\//, '')),
                                title: title,
                                link: link
                            })
                        }
                        })
                    });
                    var html = all.map(function(v) {
                        return '<a href="' + v.link + '"><img style="opacity: 0.8;-moz-border-radius: 5px; border-radius: 5px;" title="' + v.title + '" src="http://www.freebase.com/api/trans/image_thumb' + v.id + '?mode=fillcropmid&maxwidth=75&maxheight=75&errorid=/m/0djw4wd" /></a>'
                    }).join('');
                    $(this).append('<br/>'+html)

                }
            });
        }

    });


/**
 *  quote a unicode string to turn it into a valid mql /type/key/value
 *
 */
var mqlkey_start = 'A-Za-z0-9';
var mqlkey_char = 'A-Za-z0-9_-';
var MQLKEY_VALID = new RegExp('^[' + mqlkey_start + '][' + mqlkey_char + ']*$');
var MQLKEY_CHAR_MUSTQUOTE = new RegExp('([^' + mqlkey_char + '])', 'g');
var mqlkey_quote = function(s) {
        if (MQLKEY_VALID.exec(s)) // fastpath
        return s;
        var convert = function(a, b) {
                var hex = b.charCodeAt(0).toString(16).toUpperCase();
                if (hex.length == 2) hex = '00' + hex;
                if (hex.length == 3) hex = '0' + hex;
                return '$' + hex;
            };
        x = s.replace(MQLKEY_CHAR_MUSTQUOTE, convert);
        if (x.charAt(0) == '-' || x.charAt(0) == '_') {
            x = convert(x, x.charAt(0)) + x.substr(1);
        }
        return x;
    }

    //console.log('/wikipedia/en/'+mqlkey_quote('Ádám_Pintér'))
