function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("div");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        let results = searchJingles(jingles, val);
        for (i = 0; i < results.length; i++) {
            let name = getName(results[i]);
            let cleanName = cleanText(name);
            b = document.createElement("div");
            b.innerHTML = name;
            b.innerHTML += "<input type='hidden' value='" + cleanName + "'>";
            b.innerHTML += "<input type='hidden' class='video-link' value='" + results[i].link + "'>";

            b.addEventListener("click", function (e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                const videoLink = this.getElementsByClassName("video-link")[0].value;
                window.open(videoLink, '_blank');
                closeAllLists();
            });
            a.appendChild(b);
        }
    });

    function highlightText(text, searchText) {
        const index = text.toString().toLowerCase().indexOf(searchText.toLowerCase());
        if (index === -1) {
            return text;
        }
        const originalText = text.substring(index, index + searchText.length);
        return text.substring(0, index) + '<strong>' + originalText + '</strong>' + text.substring(index + searchText.length);
    }

    function searchJingles(jingles, searchText) {
        const lowerSearchText = searchText.toLowerCase();
        return jingles.filter(course => {
            return (
                course.nombreJingle.toLowerCase().includes(lowerSearchText) ||
                course.nombreReal.toLowerCase().includes(lowerSearchText) ||
                course.autorReal.toLowerCase().includes(lowerSearchText)
            );
        }).map(course => {
            const highlightedCourse = { ...course };
            Object.keys(course).forEach(key => {
                if (key != "link") {
                    highlightedCourse[key] = highlightText(course[key], lowerSearchText);
                }
            });
            return highlightedCourse;
        });
    }

    function getName(result) {
        return `${result.nombreJingle} - ${result.nombreReal} (${result.autorReal})`;
    }

    function cleanText(text) {
        const div = document.createElement("div");
        div.innerHTML = text;
        return div.textContent || div.innerText || "";
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    function addEventListeners(el, eventNames, handler) {
        eventNames.forEach(eventName => el.addEventListener(eventName, handler));
    }

    addEventListeners(b, ["click", "touchstart"], function (e) {
        inp.value = this.getElementsByTagName("input")[0].value;
        const videoLink = this.getElementsByClassName("video-link")[0].value;
        window.open(videoLink, '_blank');
        closeAllLists();
    });

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });

    document.addEventListener("touchstart", function (e) {
        closeAllLists(e.target);
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

autocomplete(document.getElementById("inpJingle"), jingles);

document.addEventListener("DOMContentLoaded", function () {
    const h1Element = document.getElementsByTagName("h1")[0];
    setTimeout(function () {
        h1Element.classList.add("visible");
    }, 50);

    const h2Element = document.getElementsByTagName("h2")[0];
    setTimeout(function () {
        h2Element.classList.add("visible");
    }, 450);
});