let elements = document.querySelectorAll('.js-change');
const colors = ['#efc967', '#dd523c', '#deb45f', '#7500f9', '#29abe2', '#73b24f', '#000000'];

for (let i = 0; i < elements.length; i++) {
    let a = elements[i];
    a.addEventListener('mouseenter', (evt) => {
        if (!a.transformed) {
            let link = a.querySelector('a');
            a.transformed = true;
            a.original_content = link.innerText;
            a.original_attributes = link.attributes;

            let chars = a.original_content.split('');
            let newhtml = `<a ${getAttrString(link.attributes)}>`
            for (let c = 0; c < chars.length; c++) {
                newhtml += `<b style="color: ${getRandom()}">${chars[c]}</b>`
            }
            newhtml += '</a>'
            a.innerHTML = newhtml;
        }
    })

    a.addEventListener('mouseout', (evt) => {
        a.transformed = false;
        a.innerHTML = `<a ${getAttrString(a.original_attributes)}>${a.original_content}</a>`;
    })
}

function getAttrString(attrs) {
    let str = ''
    for (let a = 0; a < attrs.length; a++) {
        let attr = attrs[a];
        str += ` ${attr.name}="${attr.value}"`;
    }
    return str;
}

function getRandom() {
    return colors[Math.floor(Math.random() * colors.length)];
}