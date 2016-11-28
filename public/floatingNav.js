/**
 * Created by hongjiayong on 2016/11/22.
 */
$(document)
    .ready(function() {
        // fix menu when passed
        $('.masthead')
            .visibility({
                once: false,
                onBottomPassed: function() {
                    $('.fixed.menu').transition('fade in');
                },
                onBottomPassedReverse: function() {
                    $('.fixed.menu').transition('fade out');
                }
            });

        // show dropdown on hover
        $('#mainDropdown').dropdown({
            on: 'hover'
        });
        $('#floatDropdown').dropdown({
            on: 'hover'
        });

        // for head image
        $('.special.cards .image').dimmer({
            on: 'hover'
        });

        // for change guide
        $('.special.images .image').dimmer({
            on: 'hover'
        });

        // for profile
        $('.accordion').accordion({

        });
    });