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
        this.innerHTML = '<ol class="chapter"><li class="chapter-item expanded affix "><div>Preface</div></li><li class="chapter-item expanded affix "><a href="20250219122135.html">Introduction to TerrafirmaGreg</a></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">Advancement</li><li class="chapter-item expanded "><a href="tfc-basics/20250219122225.html"><strong aria-hidden="true">1.</strong> Terrafirmacraft Basics</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="tfc-basics/20250306152352.html"><strong aria-hidden="true">1.1.</strong> Geology</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250306152421.html"><strong aria-hidden="true">1.2.</strong> Climate</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250306152451.html"><strong aria-hidden="true">1.3.</strong> Basic Health Care</a></li><li class="chapter-item expanded "><a href="tfc-basics/20250308173354.html"><strong aria-hidden="true">1.4.</strong> Special Recipes</a></li></ol></li><li class="chapter-item expanded "><a href="primitive-age/20250225014717.html"><strong aria-hidden="true">2.</strong> The Primitive Age</a></li><li><ol class="section"><li class="chapter-item expanded "><a href="primitive-age/20250310171200.html"><strong aria-hidden="true">2.1.</strong> The Stone Age</a></li><li class="chapter-item expanded "><a href="primitive-age/20250310171303.html"><strong aria-hidden="true">2.2.</strong> The Copper Age</a></li><li class="chapter-item expanded "><a href="primitive-age/20250310171342.html"><strong aria-hidden="true">2.3.</strong> The Bronze Age</a></li><li class="chapter-item expanded "><a href="primitive-age/20250310171355.html"><strong aria-hidden="true">2.4.</strong> The Wrought Iron Age</a></li><li class="chapter-item expanded "><a href="primitive-age/20250310171533.html"><strong aria-hidden="true">2.5.</strong> The Steel Age</a></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.</strong> The Steam/Mechanical Age</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">3.1.</strong> The Steam Age</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.2.</strong> The Mechanical Age</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">3.3.</strong> The Black and Colored Steel Age</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.</strong> The LV Age</div></li><li><ol class="section"><li class="chapter-item expanded "><div><strong aria-hidden="true">4.1.</strong> Basic Mixer</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.2.</strong> Basic Wiremil</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">4.3.</strong> Basic Extractor and Basic Fluid Solidifier</div></li></ol></li><li class="chapter-item expanded "><div><strong aria-hidden="true">5.</strong> The MV Age</div></li><li class="chapter-item expanded affix "><li class="spacer"></li><li class="chapter-item expanded affix "><li class="part-title">In-depth Techniques</li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.</strong> The Primitive Age</div></li><li><ol class="section"><li class="chapter-item expanded "><a href="primitive-age/20250310130131.html"><strong aria-hidden="true">6.1.</strong> Anvils</a></li><li class="chapter-item expanded "><a href="primitive-age/20250309014151.html"><strong aria-hidden="true">6.2.</strong> Barrels</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.3.</strong> Beekeeping</div></li><li class="chapter-item expanded "><a href="primitive-age/20250308175403.html"><strong aria-hidden="true">6.4.</strong> Clay Items</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.5.</strong> Farming</div></li><li class="chapter-item expanded "><a href="primitive-age/20250308163610.html"><strong aria-hidden="true">6.6.</strong> Fire Clay</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.7.</strong> Food Condensing</div></li><li class="chapter-item expanded "><a href="primitive-age/20250309022123.html"><strong aria-hidden="true">6.8.</strong> Heating</a></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.9.</strong> Leather Making</div></li><li class="chapter-item expanded "><div><strong aria-hidden="true">6.10.</strong> Mining and Cave-ins</div></li><li class="chapter-item expanded "><a href="primitive-age/20250307015405.html"><strong aria-hidden="true">6.11.</strong> Place to Sleep</a></li><li class="chapter-item expanded "><a href="primitive-age/20250306153529.html"><strong aria-hidden="true">6.12.</strong> Stone tools</a></li></ol></li><li class="chapter-item expanded "><li class="spacer"></li><li class="chapter-item expanded affix "><a href="20250224234940.html">TODO</a></li></ol>';
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
