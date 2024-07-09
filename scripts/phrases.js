document.addEventListener("DOMContentLoaded", function () {
    startCycle();
});


let currentFontSize = 16;
const maxFontSize = 32;
const fontSizeIncrement = 6;

function startCycle() {
    const elements = [
        { el: document.getElementById('vivaPeron'), time: 100 },
        { el: document.getElementById('vivanLosJingles'), time: 1500 },
        { el: document.getElementById('vivaElAmor'), time: 4000 },
        { el: document.getElementById('esperoLosJueves'), time: 8000 },
        { el: document.getElementById('yYaQuieroEscuchar'), time: 10000 },
        { el: document.getElementById('llegoLaFabrica'), time: 12000 }
    ];

    elements.forEach(({ el, time }) => {
        setTimeout(() => {
            el.style.fontSize = `${currentFontSize}px`;
            el.classList.add("visible");
        }, time);
    });

    const totalDuration = elements[elements.length - 1].time + 5000; // 5 seconds after the last element becomes visible

    setTimeout(() => {
        elements.forEach(({ el }) => {
            el.classList.remove("visible");
        });

        currentFontSize += fontSizeIncrement;
        if (currentFontSize > maxFontSize) {
            currentFontSize = 16;
        }

        // Restart the cycle
        startCycle();
    }, totalDuration);
}