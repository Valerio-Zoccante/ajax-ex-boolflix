//preparo template handlebars
var sourceCard = $("#card-template").html();
var templateCard = Handlebars.compile(sourceCard);

//variabile url di apiBase
var apiBaseUrl = 'https://api.themoviedb.org/3';

//resetto valore input al refresh
$('.search-input').val('');


//gestione trigger con inserimento lettere e passo in ingresso input stringa di ricerca


$('.search-input').keyup(function(event) {
        afterTriggerSearch();
});

//gestisco funzione triggerata dopo click bottone con check sulla stringa ed evenutalmente avvia ricerca
// gestisco anche puizia append se avvio più ricerche una dopo l'altra
function afterTriggerSearch() {
    var titleToSearch = $('.search-input').val();
    if(!titleToSearch == "") {
        $('.result-card').html('');
        search("movie", titleToSearch);
        search("tv", titleToSearch);
    } else {
        $('.result-card').html('');                     //pulisco quando vengono tolte tutte le lettere dalla ricerca
    }
};

//funzione di ricerca film e serie tv con richiamo api
function search(kindofShow, inputTitle) {
$.ajax({
    url: apiBaseUrl + '/search/' + kindofShow + '/',
    data: {
        api_key: '71f874830a927f7cb3c7321fa2e7c749',
        query: inputTitle,
        language: 'it-IT'
    },
    method: 'GET',
    success: function(data) {
        var arrayAnswer = data.results;
        if (kindofShow == "movie") {
            answApiMovie(arrayAnswer);
        }
        else {
            answApiSeries(arrayAnswer);
        };
    },
    error: function(err) {
        alert('errore');
    }
});
};

//valutazione risposta api Movie e compilazione handlebars
function answApiMovie(arrayA) {
    for (var i = 0; i < arrayA.length; i++) {
        var objCard = {
            "title": arrayA[i].title,
            "orTitle": arrayA[i].original_title,
            "country": elaborateFlag(arrayA[i].original_language),
            "rate": elaborateRate(arrayA[i].vote_average),
            "img": arrayA[i].poster_path,
            "overview": arrayA[i].overview
        };
        if (arrayA[i].poster_path === null) {

        } else {              //controllo se è null the picture, se è null non pubblico la card
        var card = templateCard(objCard);
        $('.result-card').append(card);
        }
    }
};

//valutazione risposta api Series e compilazione handlebars
function answApiSeries(arrayA) {
    for (var i = 0; i < arrayA.length; i++) {
        var objCard = {
            "title": arrayA[i].name,
            "orTitle": arrayA[i].original_name,
            "country": elaborateFlag(arrayA[i].original_language),
            "rate": elaborateRate(arrayA[i].vote_average),
            "img": arrayA[i].poster_path,
            "overview": arrayA[i].overview
        };
        if (arrayA[i].poster_path === null) {

        } else {                     //controllo se è null the picture, se è null non pubblico la card
        var card = templateCard(objCard);
        $('.result-card').append(card);
        }
    }
};

// funzione per aggiungere stelle voto
function elaborateRate(inputNumber){
    var elVote = Math.ceil(inputNumber / 2);
    var star = '';
    if (elVote !== 0) {                                        //controllo quando non c'è il voto average
    for (var i = 0; i < 5; i++) {
        if(i < elVote) {
            star += '<i class="fas fa-star"></i>';
        } else {
            star += '<i class="far fa-star"></i>';
        }
    }
    return star;
} else {
    return "<span>No rate available</span>";
}
};

//funzione per gestire flag country

function elaborateFlag(lang) {
    if (lang == 'en') {
        var output = 'us';
    } else {
        var output = lang;
    }
    return output;
};

//funzione hoover cardmovie

$(document).on('mouseenter', '.card-movie', function(){
    $(this).children('.img-preview').addClass('disactive');
    $(this).children('.back').addClass('active');
});

$(document).on('mouseleave', '.card-movie', function(){
    $(this).children('.img-preview').removeClass('disactive');
    $(this).children('.back').removeClass('active');
});

//milestone 5 funzione attori
// function findActors(movieId) {
//     $.ajax({
//         url: apiBaseUrl + '/movie/' + movieId + '/credits?',
//         data: {
//             api_key: '71f874830a927f7cb3c7321fa2e7c749',
//         },
//         method: 'GET',
//         success: function(data) {
//             returnActors(data);
//         },
//         error: function(err) {
//             alert('error');
//         }
//     });
// };
//
// function returnActors(inputActors) {
//     var objectActors = {
//         actor1: inputActors.cast[0].name,
//         actor2: inputActors.cast[1].name,
//         actor3: inputActors.cast[2].name,
//         actor4: inputActors.cast[3].name,
//         actor5: inputActors.cast[4].name,
//     };
//     return objectActors;
// }
