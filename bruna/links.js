let elements = document.querySelectorAll('.js-change');
const colors = ['#efc967', '#dd523c', '#deb45f', '#7500f9', '#29abe2', '#73b24f', '#000000'];

for (let i = 0; i < elements.length; i++) {
    let a = elements[i];
    a.addEventListener('mouseenter', (evt) => {
        console.log(evt.target)
        if(!a.transformed) {
            a.transformed = true;
            a.original_content = a.querySelector('a').innerText;
            let chars = a.original_content.split('');
            let newhtml = '<a>'
            for (let c = 0; c < chars.length; c++) {
                newhtml += `<b style="color: ${getRandom()}">${chars[c]}</b>`
            }
            newhtml += '</a>'
            a.innerHTML = newhtml;
        }
    })

    a.addEventListener('mouseout', (evt) => {
        console.log(evt);
        a.transformed = false;
        a.innerHTML = '<a>' + a.original_content + '</a>';
    })
}

function getRandom() {
    return colors[Math.floor(Math.random() * colors.length)];
}