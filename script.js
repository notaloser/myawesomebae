var bodyWrapper = $(".bodyWrapper");
var containerElm = $("#googleContainer");

var searchFormPage = containerElm.find("#searchFormPage");
var searchResultPage = containerElm.find("#searchResultPage");

var searchInput = searchFormPage.find(".search-input");
var searchResultInput = searchResultPage.find(".search-result-page-input");
var searchButton = searchFormPage.find(".search-submit-btn");
var birthdayWishBtn = searchFormPage.find(".birthdaywish-btn");

var validSearchTerms = ["sonal", "Sonal Faujdar", "sonalfaujdar"];
var imagesArr = ["assets/IMG-20181126-WA0008.jpg", "assets/IMG-20190427-WA0005.jpg", "assets/IMG_20181110_041809.jpg", 
"assets/IMG_20181112_195304.jpg", "assets/IMG_20190228_164053.jpg", "assets/IMG_20190228_164803.jpg", "assets/IMG-20180922-WA0002.jpg",
"assets/IMG-20181103-WA0019.jpg", "assets/IMG-20181121-WA0000.jpg", "assets/IMG-20181201-WA0013.jpg", "assets/IMG-20190110-WA0009.jpg",
"assets/IMG-20190110-WA0010.jpg","assets/IMG-20190221-WA0016.jpg", "assets/IMG-20190223-WA0004.jpg", "assets/IMG-20190427-WA0005.jpg",
"assets/IMG-20190428-WA0011.jpg", "assets/IMG-20181101-WA0005.jpg", "assets/pic-1.jpg"];
var exactMatch = false;
var inputVal = "";
var birthdayPage = bodyWrapper.find("#birthdayPage");

/*********************************************************************************/

// If set to true, the user must press
// UP UP DOWN ODWN LEFT RIGHT LEFT RIGHT A B
// to trigger the confetti with a random color theme.
// Otherwise the confetti constantly falls.
var onlyOnKonami = false;

$("#confettiId").click(function() {
    poof();
});


  // Globals
  var $window = $(window)
    , random = Math.random
    , cos = Math.cos
    , sin = Math.sin
    , PI = Math.PI
    , PI2 = PI * 2
    , timer = undefined
    , frame = undefined
    , confetti = [];

  // Settings
  var konami = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]
    , pointer = 0;

  var particles = 150
    , spread = 40
    , sizeMin = 3
    , sizeMax = 12 - sizeMin
    , eccentricity = 10
    , deviation = 100
    , dxThetaMin = -.1
    , dxThetaMax = -dxThetaMin - dxThetaMin
    , dyMin = .13
    , dyMax = .18
    , dThetaMin = .4
    , dThetaMax = .7 - dThetaMin;

  var colorThemes = [
    function() {
      return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
    }, function() {
      var black = 200 * random()|0; return color(200, black, black);
    }, function() {
      var black = 200 * random()|0; return color(black, 200, black);
    }, function() {
      var black = 200 * random()|0; return color(black, black, 200);
    }, function() {
      return color(200, 100, 200 * random()|0);
    }, function() {
      return color(200 * random()|0, 200, 200);
    }, function() {
      var black = 256 * random()|0; return color(black, black, black);
    }, function() {
      return colorThemes[random() < .5 ? 1 : 2]();
    }, function() {
      return colorThemes[random() < .5 ? 3 : 5]();
    }, function() {
      return colorThemes[random() < .5 ? 2 : 4]();
    }
  ];
  function color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
    return (1-cos(PI*t))/2 * (b-a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1/eccentricity, radius2 = radius+radius;
  function createPoisson() {
    // domain is the set of points which are still available to pick from
    // D = union{ [d_i, d_i+1] | i is even }
    var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
    while (measure) {
      var dart = measure * random(), i, l, interval, a, b, c, d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        a = domain[i], b = domain[i+1], interval = b-a;
        if (dart < measure+interval) {
          spline.push(dart += a-measure);
          break;
        }
        measure += interval;
      }
      c = dart-radius, d = dart+radius;

      // Update the domain
      for (i = domain.length-1; i > 0; i -= 2) {
        l = i-1, a = domain[l], b = domain[i];
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d) domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2); // Delete interval
        else if (a < c && b > c)
          if (b <= d) domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      // Re-measure the domain
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i+1]-domain[i];
    }

    return spline.sort();
  }

  // Create the overarching container
  var container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top      = '0';
  container.style.left     = '0';
  container.style.width    = '100%';
  container.style.height   = '0';
  container.style.overflow = 'visible';
  container.style.zIndex   = '9999';

  // Confetto constructor
  function Confetto(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    var outerStyle = this.outer.style, innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
    outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
    innerStyle.width  = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
    this.axis = 'rotate3D(' +
      cos(360 * random()) + ',' +
      cos(360 * random()) + ',0,';
    this.theta = 360 * random();
    this.dTheta = dThetaMin + dThetaMax * random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = $window.width() * random();
    this.y = -deviation;
    this.dx = sin(dxThetaMin + dxThetaMax * random());
    this.dy = dyMin + dyMax * random();
    outerStyle.left = this.x + 'px';
    outerStyle.top  = this.y + 'px';

    // Create the periodic spline
    this.splineX = createPoisson();
    this.splineY = [];
    for (var i = 1, l = this.splineX.length-1; i < l; ++i)
      this.splineY[i] = deviation * random();
    this.splineY[0] = this.splineY[l] = deviation * random();

    this.update = function(height, delta) {
      this.frame += delta;
      this.x += this.dx * delta;
      this.y += this.dy * delta;
      this.theta += this.dTheta * delta;

      // Compute spline and convert to polar
      var phi = this.frame % 7777 / 7777, i = 0, j = 1;
      while (phi >= this.splineX[j]) i = j++;
      var rho = interpolation(
        this.splineY[i],
        this.splineY[j],
        (phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
      );
      phi *= PI2;

      outerStyle.left = this.x + rho * cos(phi) + 'px';
      outerStyle.top  = this.y + rho * sin(phi) + 'px';
      innerStyle.transform = this.axis + this.theta + 'deg)';
      return this.y > height+deviation;
    };
  }

  function poof() {
    if (!frame) {
      // Append the container
      document.body.appendChild(container);

      // Add confetti
      var theme = colorThemes[onlyOnKonami ? colorThemes.length * random()|0 : 0]
        , count = 0;
      (function addConfetto() {
        if (onlyOnKonami && ++count > particles)
          return timer = undefined;

        var confetto = new Confetto(theme);
        confetti.push(confetto);
        container.appendChild(confetto.outer);
        timer = setTimeout(addConfetto, spread * random());
      })(0);

      // Start the loop
      var prev = undefined;
      requestAnimationFrame(function loop(timestamp) {
        var delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        var height = $window.height();

        for (var i = confetti.length-1; i >= 0; --i) {
          if (confetti[i].update(height, delta)) {
            container.removeChild(confetti[i].outer);
            confetti.splice(i, 1);
          }
        }

        if (timer || confetti.length)
          return frame = requestAnimationFrame(loop);

        // Cleanup
        document.body.removeChild(container);
        frame = undefined;
      });
    }
  }

/*********************************************************************************/


/*******************Typeahead JS************ */

var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
var i = this.loopNum % this.toRotate.length;
var fullTxt = this.toRotate[i];

if (this.isDeleting) {
  this.txt = fullTxt.substring(0, this.txt.length - 1);
} else {
  this.txt = fullTxt.substring(0, this.txt.length + 1);
}

this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

var that = this;
var delta = 200 - Math.random() * 100;

if (this.isDeleting) { delta /= 2; }

if (!this.isDeleting && this.txt === fullTxt) {
  delta = this.period;
  this.isDeleting = true;
} else if (this.isDeleting && this.txt === '') {
  this.isDeleting = false;
  this.loopNum++;
  delta = 1000;
}

setTimeout(function() {
  that.tick();
}, delta);
};

var startTypeAhead = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};



/**************************************** */

/****************Google container**********/

setTimeout(function() {
    searchInput.focus();
}, 500);

var processSearchResponse = function(inputVal) {
    if (inputVal === "") {
      return;
    }
    if (validSearchTerms.indexOf(inputVal.toLowerCase()) > -1) {
        exactMatch = true;
    } else {
        exactMatch = false;
    }
    showSearchResultsPage(inputVal);
};

var loadBirthdayPage = function() {
  playAudio();
  containerElm.hide();
  birthdayPage.show();
  poof();
  setTimeout(function() {
    startTypeAhead();
  }, 3000);
};

var showImages = function() {
  searchResultPage.find(".images").addClass("tab-selected").siblings().removeClass("tab-selected");
  searchResultPage.find(".images-results").show().siblings().hide();
};

searchResultPage.find(".birthday").click(function() {
  loadBirthdayPage();
});

searchButton.click(function() {
    processSearchResponse(searchInput.val());
});

var playAudio = function() {
  var audioElm = document.getElementById("myAudio"); 
  audioElm.play();
};

birthdayWishBtn.click(function() {
  loadBirthdayPage();
});

searchResultPage.find(".wiki-info-wrapper").click(function() {
  console.log("Clicked on wiki info wrapper");
  $(".right-info").animate({
    width: 'show',
    easing: 'easein'
  }, "slow");
});

searchResultPage.find(".info1-wrapper").click(function() {
  showImages();
});


searchResultPage.find(".suggested-txt").click(function() {
    processSearchResponse("Sonal")
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
        var imgPath = "./" + imgName;
        imgDiv.find(".imgElm")[0].src = imgPath;
    });
};

var showSearchResultsPage = function(inputVal) {
    searchResultInput.val(inputVal);
    searchResultPage.show().siblings().hide();
    searchResultPage.find(".searchLoader").show();
    searchResultPage.find(".searchResultsValidContentWrapper").hide();
    searchResultPage.find(".searchResultsNotValidWrapper").hide();
    setTimeout(function() {
        searchResultPage.find(".searchLoader").hide();
        console.log(exactMatch);
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
  showImages();
});

searchResultPage.find(".videos").click(function() {
    searchResultPage.find(".images").addClass("tab-selected").siblings().removeClass("tab-selected");
    searchResultPage.find(".videos-results").show().siblings().hide();
});


populateImages();

