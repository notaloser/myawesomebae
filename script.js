var container = $("#container");

var searchFormPage = container.find("#searchFormPage");
var searchResultPage = container.find("#searchResultPage");
var birthdayPage = container.find("#birthdayPage");

var searchInput = searchFormPage.find(".search-input");
var searchResultInput = searchResultPage.find(".search-result-page-input");
var searchButton = searchFormPage.find(".search-submit-btn");

var validSearchTerms = ["shraddha", "shraddha bhattad", "shraddhabhattad"];
var imagesArr = ["pic-1.jpeg", "pic-2.jpeg", "pic-3.jpeg", "pic-4.jpeg", "pic-5.jpeg", "pic-6.jpg", "pic-7.jpg"];
var exactMatch = false;
var inputVal = "";
setTimeout(function() {
    searchInput.focus();
}, 500);

var processSearchResponse = function(inputVal) {
    if (validSearchTerms.indexOf(inputVal.toLowerCase()) > -1) {
        exactMatch = true;
    } else {
        exactMatch = false;
    }
    showSearchResultsPage(inputVal);
}

searchButton.click(function() {
    processSearchResponse();
});

searchResultPage.find(".suggested-txt").click(function() {
    processSearchResponse("shraddha")
});

searchInput.on('keypress',function(e) {
    if(e.which == 13) {
        processSearchResponse(searchInput.val());
    }
});

searchResultInput.on('keypress',function(e) {
    if(e.which == 13) {
        processSearchResponse(searchResultInput.val());
    }
});

var populateImages = function() {
    var imgResultsPage =  searchResultPage.find(".images-results");
    var imgWrapperTemplate = imgResultsPage.find(".img-wrapper-template");
    $.each(imagesArr, function (index, imgName) {
        var imgDiv = imgWrapperTemplate.clone().removeClass("img-wrapper-template").addClass("img-wrapper").insertBefore(imgWrapperTemplate).show();
        var imgPath = "./assets/" + imgName;
        imgDiv.find(".imgElm")[0].src = imgPath;
    });
}

var showSearchResultsPage = function(inputVal) {
    searchResultInput.val(inputVal);
    searchResultPage.show().siblings().hide();
    searchResultPage.find(".searchLoader").show();
    searchResultPage.find(".searchResultsValidContentWrapper").hide();
    searchResultPage.find(".searchResultsNotValidWrapper").hide();
    setTimeout(function() {
        searchResultPage.find(".searchLoader").hide();
        if (exactMatch) {
            searchResultPage.find(".searchResultsValidContentWrapper").show().siblings().hide();
            searchResultPage.find(".all").addClass("tab-selected").siblings().removeClass("tab-selected");
            searchResultPage.find(".all-results").show().siblings().hide();   
        } else {
            searchResultPage.find(".searched-text").html(inputVal);
            searchResultPage.find(".searchResultsNotValidWrapper").show().siblings().hide();
        }
        }, 500);
};

searchResultPage.find(".all").click(function() {
    searchResultPage.find(".all").addClass("tab-selected").siblings().removeClass("tab-selected");
    searchResultPage.find(".all-results").show().siblings().hide();
});

searchResultPage.find(".images").click(function() {
    searchResultPage.find(".images").addClass("tab-selected").siblings().removeClass("tab-selected");
    searchResultPage.find(".images-results").show().siblings().hide();
});

searchResultPage.find(".videos").click(function() {
    searchResultPage.find(".images").addClass("tab-selected").siblings().removeClass("tab-selected");
    searchResultPage.find(".videos-results").show().siblings().hide();
});


populateImages();

