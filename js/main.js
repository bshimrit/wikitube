/* */
'use strict'
var KEY_CODE = 'AIzaSyCveOqQ8X7nWCJk0UvPFoWtD0xE0yoya_M';
function renderSearchResults(){
    var prmSearchResults = getResults();
    
    prmSearchResults.then(results => {
        var items = results.items;
        var strHtmls = items.map(item => {
            var defaultObj = item.snippet.thumbnails.default;
            return `<li class="color-theme pointer flex justify-start alig" onclick="chooseVideo('${item.id.videoId}')"><img src="${defaultObj.url}" style="width:${defaultObj.width}px;height:${defaultObj.height}px" /><span>${item.snippet.title}</span></li>`;
        })
        document.querySelector('.search-result').innerHTML = strHtmls.join('');
    });
    prmSearchResults.catch(error => {
        alert('Error on search');
    })
}

function chooseVideo(videoId){
    var prmSearchResults = getWikiResults();
    
    prmSearchResults.then(results => {
        var items = results[1];
        var strHtmls = items.map((item,idx) => {
            return `<li class="color-theme flex flex-column justify-start"><h3>${item}</h3>
                    <div>${results[2][idx]}</div></li>`;
        });
    
        document.querySelector('iframe').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        document.querySelector('section ul').innerHTML = strHtmls.join('');
    })
}

function getWikiResults(){
    var searchValue = document.querySelector('#search-input').value;
    var searchUrl = `https://en.wikipedia.org/w/api.php?&origin=*&action=opensearch&search=${searchValue}&limit=5`; 
    return fetch(searchUrl)
        .then(res => res.json());
}

function getResults(){
    var searchValue = document.querySelector('#search-input').value;
    var searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${KEY_CODE}&q=${searchValue}`; 
    return fetch(searchUrl)
        .then(res => res.json());
}