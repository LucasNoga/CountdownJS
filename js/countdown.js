const MINUTES = 60 // seconds in 1 minutes
const HOURS = 60 * MINUTES // minutes in 1 hour
const DAYS = 24 * HOURS // hours in 1 day

const countdown = document.querySelector("#countdown")
const launchDate = Date.parse(countdown.dataset.time) / 1000

// Dom element for the countdown
const $countdown = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
}

// old time saved
let previousDiff = {}

/**
 * Calculate difference between a launch date and now
 */
function refreshCountdown() {
    const difference = launchDate - Date.now() / 1000
    if (difference <= 0) {
        document.location.reload()
        return
    }
    const diff = {
        days: Math.floor(difference / DAYS),
        hours: Math.floor(difference % DAYS / HOURS),
        minutes: Math.floor(difference % HOURS / MINUTES),
        seconds: Math.floor(difference % MINUTES)
    }

    updateDom(diff)

    window.setTimeout(() => {
        window.requestAnimationFrame(refreshCountdown)
    }, 1000)
}


/**
 * Update HTML dom when we have to refresh countdown
 * @param {{days:number, hours:number, minutes: number, seconds:number}} diff 
 */
function updateDom(diff) {
    Object.keys($countdown).forEach((key) => {
        if (previousDiff[key] !== diff[key])
            $countdown[key].innerText = diff[key]


    })
    previousDiff = diff
}

refreshCountdown()