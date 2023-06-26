const sun = document.getElementById('sun')
const moon = document.getElementById('moon')

const userTheme = localStorage.getItem("theme");
const sytemTheme = window.matchMedia("(prefers-color-scheme:dark)").matches

// console.log(sytemTheme);

const iconToggle = () => {
    moon.classList.toggle("hidden")
    sun.classList.toggle("hidden")
}

const themeCheck = () =>{
    if (userTheme === 'dark' || (!userTheme && sytemTheme)) {
        document.documentElement.classList.add("dark")
        moon.classList.add("hidden")
        return ;
    }
    sun.classList.add("hidden");
}
const themeSwitch = () =>{
    if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark")
        localStorage.setItem("theme", "light")
        iconToggle()
        return ;
    }
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
    iconToggle()
}

sun.addEventListener("click", ()=>{
    themeSwitch()
})
moon.addEventListener("click", ()=>{
    themeSwitch()
})

themeCheck()
