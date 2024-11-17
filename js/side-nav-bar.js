document.addEventListener('DOMContentLoaded', function() {
    // Show intro content by default
    document.getElementById('blogIntro').style.display = 'block';
    
    // Handle active state and content switching for menu items
    const menuItems = document.querySelectorAll('.menu-section a');
    
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Hide intro content
            document.getElementById('blogIntro').style.display = 'none';
            
            // Remove active class from all items
            menuItems.forEach(item => item.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            document.querySelectorAll('.content-section').forEach(section => {
                if (section.id !== 'blogIntro') {  // Don't include intro in this loop
                    section.style.display = 'none';
                }
            });
            
            // Get the content id from the link's text
            const contentId = this.querySelector('span').textContent.toLowerCase().replace(/\s+/g, '');
            
            // Show the selected content
            const targetContent = document.getElementById(contentId);
            if (targetContent) {
                targetContent.style.display = 'block';
            }
        });
    });

    // Handle collapsible sections
    var coll = document.getElementsByClassName("collapsible");
    
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function(e) {
            e.stopPropagation();
            
            // Toggle active class on button
            this.classList.toggle("active");
            
            // Get content element
            var content = this.nextElementSibling;
            
            // Toggle active class on content
            content.classList.toggle("active");
            
            // Handle content visibility
            if (content.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
                content.style.opacity = "1";
                content.style.padding = "15px 25px";
                
                // If nested, update parent height
                var parent = this.closest('.content-collapse');
                if (parent && parent.classList.contains("active")) {
                    parent.style.maxHeight = parent.scrollHeight + content.scrollHeight + "px";
                }
            } else {
                content.style.maxHeight = "0";
                content.style.opacity = "0";
                content.style.padding = "0";
            }
        });
    }
});