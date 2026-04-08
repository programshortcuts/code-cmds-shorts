// build-sidebar.js
// import { initDropDowns } from "../ui/drop-downs.js"
import { isSafePath } from "./security-utils.js"
export async function buildSidebar() {

    const sideBarTopics = document.querySelector(".side-bar-topics")

    if(!sideBarTopics){
        console.log(war('sidebar container not found'))
    }
    const res = await fetch("js/data/side-bar-topics.json")

    // const data = await res.json()
    let data
    try {
        const res = await fetch('js/data/side-bar-topics.json')
        if (!res.ok) throw new Error(`HTTP error ${res.status}`)
        data = await res.json()
    } catch (err) {
        console.error('Failed to load sidebar data:', err)
        return
    }

    sideBarTopics.innerHTML = ""

    data.topics.forEach(topic => {
        sideBarTopics.appendChild(buildItem(topic))
    })
    sideBarTopics.querySelectorAll('li > ul').forEach(ul => ul.classList.add('hide'));

    // initDropDowns()
}

function buildItem(item) {

    const li = document.createElement("li")

    const a = document.createElement("a")
    a.setAttribute("tabindex", "0");

    a.textContent = item.title
    if (item.href && isSafePath(item.href)) {
    a.href = item.href
} else {
    a.href = "#"
}

    if (item.id) {
        a.id = item.id
    }

    if (item.items) {
        a.classList.add("drop-down")
    }

    li.appendChild(a)

    if (item.items && item.items.length) {

        const ul = document.createElement("ul")

        item.items.forEach(child => {
            ul.appendChild(buildItem(child))
        })

        li.appendChild(ul)

    }

    return li
}
