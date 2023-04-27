const dateBirth = new Date('08/08/1998')

const getAge = (dateString) => {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}

document.addEventListener('DOMContentLoaded', (event) => {
    const consoleDir = document.getElementById('consoleDir')
    const consoleInput = document.getElementById('consoleInput')
    const consoleText = [
        {
            dir: '~$',
            command: `cd ~/dev/porfolio`,
            output: '',
        },
        {
            dir: '~/dev/portfolio$',
            command: `./build '{"name": "Gustavo Salcedo", "role": "Desarrollador de Software"}, "Edad": "${getAge(
                dateBirth
            )} años"}'`,
            output: 'building website...',
        },
        {
            dir: '~/$',
            command: `cd ~/dev/porfolio`,
            output: '',
        },
    ]

    ;(async () => {
        for (const text of consoleText) {
            await typeWriter(text)
            await sleep(1000)
        }
    })()

    async function typeWriter(text) {
        consoleDir.innerHTML = `${text.dir}`

        for (let character in text.command) {
            consoleInput.innerHTML =
                text.command.substring(0, parseInt(character) + 1) + '<span aria-hidden="true">▮</span>'
            await sleep(20)
        }
        console.log('text.command.output: ', text.output)
        if (text.output) {
            consoleInput.innerHTML = `<span aria-hidden="true">${text.output}</span>`
            await sleep(20)
        }
    }
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
