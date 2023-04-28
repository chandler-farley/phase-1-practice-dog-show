document.addEventListener('DOMContentLoaded', () => {
    // getDogs()
})

async function getDogs() {
    const res = await fetch('http://localhost:3000/dogs')
    const json = await res.json()
    json.forEach(dog => tableBuilder(dog));
}
getDogs()

let tableBody = document.getElementById('table-body')
function tableBuilder(obj) {
    let row = document.createElement('tr')
    let name = document.createElement('td')
    let breed = document.createElement('td')
    let sex = document.createElement('td')
    let btnCell = document.createElement('td')
    let btn = document.createElement('button')
    name.innerText = obj.name
    breed.innerText = obj.breed
    sex.innerText = obj.sex
    btn.innerText = "Edit Dog"
    row.appendChild(name)
    row.appendChild(breed)
    row.appendChild(sex)
    btnCell.appendChild(btn)
    row.appendChild(btnCell)
    tableBody.appendChild(row)
    editInnit(btn, obj)
}

let form = document.getElementById('dog-form')
let editId
function editInnit(btn, obj) {
    btn.addEventListener('click', () => {
        form.children[0].value = obj.name
        form.children[1].value = obj.breed
        form.children[2].value = obj.sex
        editId = obj.id
    })
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

form.addEventListener('submit', async e => {
    e.preventDefault()
    const res = await fetch(`http://localhost:3000/dogs/${editId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: form.children[0].value,
            breed: form.children[1].value,
            sex: form.children[2].value
        })
    })
    const res2 = await fetch('http://localhost:3000/dogs')
    let json = await res2.json()
    removeAllChildNodes(tableBody)
    json.forEach(dog => tableBuilder(dog))
})