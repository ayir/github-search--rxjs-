var userTypesInSearchBox = Rx.Observable.fromEvent($("#search"), 'keyup').map(function (event) {
    return $("#search").val();
});

userTypesInSearchBox.debounce(250).concatMap(function (searchTerm) {
    return Rx.Observable.fromPromise($.get('https://api.github.com/users/' + searchTerm)).map(function (response) {
        return {
            response: response,
            searchTerm: searchTerm
        };
    }).catch(function () {
        return Rx.Observable.empty();
    });
}).subscribe(function (result) {
    renderUser(result.response.login, result.response.html_url, result.response.avatar_url, result.searchTerm);
});

function renderUser(login, href, imgSrc, searchTerm) {
    $("#search-result").show();
    $("#search-result").attr("href", href);
    $("#search-result__avatar").attr('src', imgSrc);
    $('#search-result__login').text(login);
    $('#search-term-text').text(searchTerm);
}