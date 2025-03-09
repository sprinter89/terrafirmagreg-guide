// Populate the sidebar
//
// This is a script, and not included directly in the page, to control the total size of the book.
// The TOC contains an entry for each page, so if each page includes a copy of the TOC,
// the total size of the page becomes O(n**2).
class MDBookSidebarScrollbox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded "><a href="20250219122135.html"><strong aria-hidden="true">1.</strong> Introduction to TerrafirmaGreg</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250219122225.html"><strong aria-hidden="true">2.</strong> Terrafirmacraft Basics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tfc-basics/20250306152352.html"><strong aria-hidden="true">2.1.</strong> Geology</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250306152421.html"><strong aria-hidden="true">2.2.</strong> Climate</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250306152451.html"><strong aria-hidden="true">2.3.</strong> Basic Health Care</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250308173354.html"><strong aria-hidden="true">2.4.</strong> Special Recipes</a></li></ol></li><li class="chapter-item expanded "><a href="primitive-age/20250225014717.html"><strong aria-hidden="true">3.</strong> The Primitive Age</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="primitive-age/20250306153529.html"><strong aria-hidden="true">3.1.</strong> Stone tools</a></li><li class="chapter-item expanded "><a href="primitive-age/20250307010726.html"><strong aria-hidden="true">3.2.</strong> Farming</a></li><li class="chapter-item expanded "><a href="primitive-age/20250307015405.html"><strong aria-hidden="true">3.3.</strong> Place to Sleep</a></li><li class="chapter-item expanded "><a href="primitive-age/20250308163610.html"><strong aria-hidden="true">3.4.</strong> Fire Clay</a></li><li class="chapter-item expanded "><a href="primitive-age/20250308175403.html"><strong aria-hidden="true">3.5.</strong> Clay Items</a></li><li class="chapter-item expanded "><a href="primitive-age/20250309014151.html"><strong aria-hidden="true">3.6.</strong> Barrels</a></li><li class="chapter-item expanded "><a href="primitive-age/20250309022123.html"><strong aria-hidden="true">3.7.</strong> Heating</a></li></ol></li></ol>';
        // Set the current, active page, and reveal it if it's hidden
        let current_page = document.location.href.toString().split("#")[0];
        if (current_page.endsWith("/")) {
            current_page += "index.html";
        }
        var links = Array.prototype.slice.call(this.querySelectorAll("a"));
        var l = links.length;
        for (var i = 0; i < l; ++i) {
            var link = links[i];
            var href = link.getAttribute("href");
            if (href && !href.startsWith("#") && !/^(?:[a-z+]+:)?\/\//.test(href)) {
                link.href = path_to_root + href;
            }
            // The "index" page is supposed to alias the first chapter in the book.
            if (link.href === current_page || (i === 0 && path_to_root === "" && current_page.endsWith("/index.html"))) {
                link.classList.add("active");
                var parent = link.parentElement;
                if (parent && parent.classList.contains("chapter-item")) {
                    parent.classList.add("expanded");
                }
                while (parent) {
                    if (parent.tagName === "LI" && parent.previousElementSibling) {
                        if (parent.previousElementSibling.classList.contains("chapter-item")) {
                            parent.previousElementSibling.classList.add("expanded");
                        }
                    }
                    parent = parent.parentElement;
                }
            }
        }
        // Track and set sidebar scroll position
        this.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                sessionStorage.setItem('sidebar-scroll', this.scrollTop);
            }
        }, { passive: true });
        var sidebarScrollTop = sessionStorage.getItem('sidebar-scroll');
        sessionStorage.removeItem('sidebar-scroll');
        if (sidebarScrollTop) {
            // preserve sidebar scroll position when navigating via links within sidebar
            this.scrollTop = sidebarScrollTop;
        } else {
            // scroll sidebar to current active section when navigating via "next/previous chapter" buttons
            var activeSection = document.querySelector('#sidebar .active');
            if (activeSection) {
                activeSection.scrollIntoView({ block: 'center' });
            }
        }
        // Toggle buttons
        var sidebarAnchorToggles = document.querySelectorAll('#sidebar a.toggle');
        function toggleSection(ev) {
            ev.currentTarget.parentElement.classList.toggle('expanded');
        }
        Array.from(sidebarAnchorToggles).forEach(function (el) {
            el.addEventListener('click', toggleSection);
        });
    }
}
window.customElements.define("mdbook-sidebar-scrollbox", MDBookSidebarScrollbox);
