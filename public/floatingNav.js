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

        // for search
        $('.ui.search')
            .search({
                type          : 'category',
                minCharacters : 3,
                apiSettings   : {
                    onResponse: function(githubResponse) {
                        var
                            response = {
                                results : {}
                            }
                            ;
                        // translate GitHub API response to work with search
                        $.each(githubResponse.items, function(index, item) {
                            var
                                language   = item.language || 'Unknown',
                                maxResults = 8
                                ;
                            if(index >= maxResults) {
                                return false;
                            }
                            // create new language category
                            if(response.results[language] === undefined) {
                                response.results[language] = {
                                    name    : language,
                                    results : []
                                };
                            }
                            // add result to category
                            response.results[language].results.push({
                                title       : item.name,
                                url         : item.html_url
                            });
                        });
                        return response;
                    },
                    url: '//api.github.com/search/repositories?q={query}'
                }
            })
        ;

    });