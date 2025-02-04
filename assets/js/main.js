/*
    Arcana by HTML5 UP
    html5up.net | @ajlkn
    Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/
(function($) {

    function debounce(func, delay) {
        let debounceTimer;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
        }
    }
    
    // Breakpoints to align accomplishments pictures
    const calibrationMap = {
        2560: 500,
        1920: 450,
        1680: 430,
        1540: 360, // Full screen issued laptop
        1440: 360,
        1280: 430,
        1024: 240,
        768:  240,
        736:  130,
        425:  130
    };
    
    // Function to execute when a breakpoint is hit
    function onBreakpointHit(width, offset) {
        // console.log(`Window has hit the width of ${width}px or lower. Using offset ${offset}px.`);
        calibrateAccomplishmentsSide(offset);
    }
    
    function checkWindowWidth() {
        const currentWidth = window.innerWidth;
        // console.log(`Current window width: ${currentWidth}`); // Log the current width for debugging
        const calibrationList = Object.keys(calibrationMap).map(Number).sort((a, b) => a - b);
        const lastBreakpoint = calibrationList[calibrationList.length - 1]; // Get the largest breakpoint
    
        let appliedBreakpoint = null;
    
        for (const width of calibrationList) {
            if (currentWidth <= width) {
                appliedBreakpoint = width;
                break; // Exit the loop once the first applicable breakpoint is found
            }
        }
    
        // If no suitable breakpoint was found, use the largest breakpoint
        if (appliedBreakpoint === null) {
            appliedBreakpoint = lastBreakpoint;
        }
    
        // console.log("checking applied breakpoint", appliedBreakpoint);
        if (appliedBreakpoint !== null) {
            onBreakpointHit(appliedBreakpoint, calibrationMap[appliedBreakpoint]);
        }
    }
    
    
    // Debounce the checkWindowWidth function
    const debouncedCheckWindowWidth = debounce(checkWindowWidth, 200);
    
    // Add the event listener for window resize
    window.addEventListener('resize', debouncedCheckWindowWidth);  

    const SIDEBAR_CONTAINER = document.getElementById("AccomplishmentsRight")
    const HEADINGS = document.querySelectorAll("h3")
    const PICTURE_FIGS = document.getElementsByClassName("AccomplishmentFig")
    const pictureFigsArray = Array.from(PICTURE_FIGS);
    const lastIndex = pictureFigsArray.length - 1; // Get last index of array

    calibrateAccomplishmentsSide = (align_int) => {
        let headerMap = {}
        // for each H3 element in header, headerMap[h3.id] = h3.offsetTop //(pixels from top)
        if (PICTURE_FIGS.length != 0){ // If picture figs exist, the length will never be 0
            // no longer messes up every h3 element on the website, only adjusts those on the
            // accomplishments page
            HEADINGS.forEach((h3, index) => {
                if (index != 0){
                    h3.style.marginTop = 125 + "px";            
                }
                headerMap[h3.id] = h3.offsetTop
            })
        }
        // for each fig in picture_fig, if fig.data-correspond match headerMap 
        // then fig.top = headerMap[fig.data-correspond]px;
        pictureFigsArray.forEach((fig, index) => {
            let correspondId = fig.getAttribute('data-correspond');
            if (headerMap[correspondId] !== undefined) {
                // Set the top position of the fig to the corresponding header offset
                fig.style.top = headerMap[correspondId] - align_int + "px";
            }

            // Check if the current fig is the last entry
            if (index === lastIndex) {
                // Grab the offsetTop of the last entry fig
                const lastFigOffsetTop = fig.offsetTop;
                // equaling the sidebar to the length of which the last picture's bottom
                // side is
                SIDEBAR_CONTAINER.style.height = lastFigOffsetTop + 400 + "px";
            }
        });
    }
    checkWindowWidth()

    
    // Dealing with playlists
    // const playlist_figures = document.getElementsByClassName("PlaylistFig")
    // youtube_urls {"figure_id": url that equals figure_id}
    




    // Footer
    const COPYRIGHT_FOOTER = document.getElementsByClassName("menu")[0];

    if (COPYRIGHT_FOOTER) {
        // Grab Footer <li>'s
        const COPYRIGHT_FOOTER_LIST_ITEMS = COPYRIGHT_FOOTER.getElementsByTagName("li");

        // Get the indexes of the last two items
        const totalItems = COPYRIGHT_FOOTER_LIST_ITEMS.length;
        if (totalItems >= 2) {
            const secondToLastIndex = totalItems - 2;
            const lastIndex = totalItems - 1;

            // Select the last two list items
            const secondLastItem = COPYRIGHT_FOOTER_LIST_ITEMS[secondToLastIndex];
            const lastItem = COPYRIGHT_FOOTER_LIST_ITEMS[lastIndex];

            // Remove the display of the two <li>'s
            secondLastItem.style.display = 'none';
            lastItem.style.display = 'none';
        }
    }

    var $window = $(window),
        $body = $('body');

    // Breakpoints.
        breakpoints({
            wide:      [ '1281px',  '1680px' ],
            normal:    [ '981px',   '1280px' ],
            narrow:    [ '841px',   '980px'  ],
            narrower:  [ '737px',   '840px'  ],
            mobile:    [ '481px',   '736px'  ],
            mobilep:   [ null,      '480px'  ]
        });

    // Play initial animations on page load.
        $window.on('load', function() {
            window.setTimeout(function() {
                $body.removeClass('is-preload');
            }, 100);
        });

    // Dropdowns.
        $('#nav > ul').dropotron({
            offsetY: -15,
            hoverDelay: 0,
            alignment: 'center'
        });

    // Nav.

        // Bar.
            $(
                '<div id="titleBar">' +
                    '<a href="#navPanel" class="toggle"></a>' +
                    '<span class="title">' + $('#logo-wrapper').html() + '</span>' +
                '</div>'
            )
                .appendTo($body);

        // Toolbox.
            let toolBoxElement = '<div class="toolbox">';
            let multilingual = $('#multilingual');
            if (multilingual[0]){
                toolBoxElement +=
                    '<div class="dropdown">' +
                        multilingual.html() +
                    '</div>';
            }

            toolBoxElement += '</div>';

        // Panel.
            $(
                '<div id="navPanel">' +
                    '<nav>' +
                        $('#nav').navList() +
                    '</nav>' +
                    toolBoxElement +
                '</div>'
            )
                .appendTo($body)
                .panel({
                    delay: 500,
                    hideOnClick: true,
                    hideOnSwipe: true,
                    resetScroll: true,
                    resetForms: true,
                    side: 'left',
                    target: $body,
                    visibleClass: 'navPanel-visible'
                });

    // Dropdown buttons.
        $('a#languageDropdown').click(function (e) {
            $('ul#languageContent').toggleClass("show");
            e.stopPropagation();
        });
        $(document).click(function() {
            $('ul#languageContent').removeClass("show");
        });

        let slideIndex = 0;

        // Mute Error esp when we aren't on the index page
        try{
            showSlides();
        } catch {}
        
        function showSlides() {
          let delay = 8000
          let i;
          let slides = document.getElementsByClassName("mySlides");
          let dots = document.getElementsByClassName("dot");
          for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";  
          }
          slideIndex++;
          if (slideIndex > slides.length) {slideIndex = 1}    
          for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
          } 
          slides[slideIndex-1].style.display = "block";  
          dots[slideIndex-1].className += " active";

          if (slideIndex == 1){ // Change image every 8 seconds on the first slide, 13 on every other
            delay = 8000
          } else{
            delay = 13000
          }

          setTimeout(showSlides, delay); 
        }



})(jQuery);


