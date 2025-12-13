(function ($) {
    "use strict"; // Start of use strict

    //Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 40)
                }, 400, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 100
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 10) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Hide navbar when modals trigger
    $('.portfolio-modal').on('show.bs.modal', function (e) {
        $('.navbar').addClass('d-none');
    })
    $('.portfolio-modal').on('hidden.bs.modal', function (e) {
        $('.navbar').removeClass('d-none');
    })

})(jQuery); // End of use strict

jQuery(document).ready(function ($) {
    // Add data-category attributes to your timeline items
    $('.timeline li').each(function () {
        // You'll need to add appropriate data-category attributes to your timeline items
        // For example: <li class="timeline" data-category="education">
    });

    // Handle button clicks for filtering
    // Handle button clicks for filtering
    $(document).on('click', '.btn-filter', function () {
        console.log("Filter button clicked:", $(this).text());

        $('.btn-filter').removeClass('active');
        $(this).addClass('active');

        const category = $(this).data('filter');
        console.log("Filtering by:", category);

        if (category === 'all') {
            $('.timeline > li').fadeIn();
        } else {
            $('.timeline > li').hide(); // Hide all first
            const $items = $('.timeline > li[data-category="' + category + '"]');
            console.log("Found items:", $items.length);
            $items.fadeIn();
        }
    });

    // --- Dynamic Chat Typing Effect ---
    const $chatContainer = $('.chat-container');
    const $rows = $chatContainer.find('.bubble-row');

    if ($rows.length > 0) {
        // Queue of typing tasks
        let queue = Promise.resolve();

        $rows.each(function (index, row) {
            const $row = $(row);
            const $bubble = $row.find('.chat-bubble');
            const text = $bubble.text().trim();

            // Clear text and ensure hidden start
            $bubble.text('');
            $row.removeClass('visible').css('opacity', 0);

            // Add task to queue
            queue = queue.then(() => {
                return new Promise((resolve) => {
                    // Show row container (bubble is empty but visible elem)
                    $row.addClass('visible').css('opacity', 1).css('transform', 'translateY(0)');

                    // Typing animation
                    let i = 0;
                    // Faster speed for longer text? Let's keep it snappy.
                    const speed = 15;

                    function typeChar() {
                        if (i < text.length) {
                            $bubble.text(text.substring(0, i + 1));
                            i++;

                            // Auto scroll to bottom to show new text
                            $chatContainer.scrollTop($chatContainer[0].scrollHeight);

                            setTimeout(typeChar, speed);
                        } else {
                            // Finished typing this bubble
                            // Wait between bubbles (longer for answers to read)
                            const pause = $row.hasClass('right') ? 1000 : 600;
                            setTimeout(resolve, pause);
                        }
                    }

                    // Small delay before typing starts after bubble appears
                    setTimeout(typeChar, 200);
                });
            });
        });
    }
});