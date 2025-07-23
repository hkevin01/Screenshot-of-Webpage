// screenshot.js
// Main logic for capturing webpage screenshots

(function (exports) {
    // Convert nodeList URLs to absolute URLs
    function urlsToAbsolute(nodeList) {
        if (!nodeList.length) {
            return [];
        }
        var attrName = 'href';
        if (nodeList[0].__proto__ === HTMLImageElement.prototype 
        || nodeList[0].__proto__ === HTMLScriptElement.prototype) {
            attrName = 'src';
        }
        nodeList = [].map.call(nodeList, function (el, i) {
            var attr = el.getAttribute(attrName);
            if (!attr) {
                return;
            }
            var absURL = /^(https?|data):/i.test(attr);
            if (absURL) {
                return el;
            } else {
                return el;
            }
        });
        return nodeList;
    }

    // Capture the webpage screenshot
    function screenshotPage() {
        urlsToAbsolute(document.images);
        urlsToAbsolute(document.querySelectorAll("link[rel='stylesheet']"));
        //var screenshot = document.documentElement.cloneNode(true);
        var itm = document.getElementById("map").firstChild;
        var screenshot = itm.cloneNode(true);
       // var b = document.createElement('base');
       // b.href = document.location.protocol + '//' + location.host;
        //var head = screenshot.querySelector('head');
        //head.insertBefore(b, head.firstChild);
        screenshot.style.pointerEvents = 'none';
        screenshot.style.overflow = 'none';
        screenshot.style.webkitUserSelect = 'none';
        screenshot.style.mozUserSelect = 'none';
        screenshot.style.msUserSelect = 'none';
        screenshot.style.oUserSelect = 'none';
        screenshot.style.userSelect = 'none';
        screenshot.querySelector(".olControlZoom").style.display = 'none';
        screenshot.querySelector(".olControlMousePosition").style.display = 'none';
        screenshot.querySelector(".olControlAttribution").style.display = 'none';
        screenshot.querySelector(".olControlLayerSwitcher").style.display = 'none';
        //screenshot.style.display = 'none';
        //screenshot.querySelector('#information').style.display = 'none';
        //screenshot.querySelector('.cf').style.display = 'none';
        //screenshot.querySelector('.cf').style.display = 'none';
        //screenshot.querySelector('#bottom').style.display = 'none';
        //screenshot.querySelector('#map').style.display = 'block';
        //screenshot.getElementbyID("bottom").style.visibility='hidden';
        screenshot.dataset.scrollX = window.scrollX;
        screenshot.dataset.scrollY = window.scrollY;
        //var script = document.createElement('script');
        //script.textContent = '(' + addOnPageLoad_.toString() + ')();';
       // screenshot.querySelector('body').appendChild(script);
        var blob = new Blob([screenshot.outerHTML], {
            type: 'text/html'
        });
        return blob;
    }

    // Add event listener for page load
    function addOnPageLoad_() {
        window.addEventListener('DOMContentLoaded', function (e) {
            var scrollX = document.documentElement.dataset.scrollX || 0;
            var scrollY = document.documentElement.dataset.scrollY || 0;
            window.scrollTo(scrollX, scrollY);
        });
    }

    // Generate the screenshot
    function generate() {
        window.URL = window.URL || window.webkitURL;
        window.open(window.URL.createObjectURL(screenshotPage()));
    }
    exports.screenshotPage = screenshotPage;
    exports.generate = generate;
})(window);
