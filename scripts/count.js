document.addEventListener("DOMContentLoaded", function () {
    const jingleTotalElement = document.getElementById("jingle-total"); const totalJingles = jingles.length; function animateCounter(element, start, end, duration) {
        let startTime = null; function animationStep(timestamp) { if (!startTime) startTime = timestamp; const progress = Math.min((timestamp - startTime) / duration, 1); element.textContent = Math.floor(progress * (end - start) + start); if (progress < 1) { window.requestAnimationFrame(animationStep) } }
        window.requestAnimationFrame(animationStep)
    }
    animateCounter(jingleTotalElement, 0, totalJingles, 2000)
})