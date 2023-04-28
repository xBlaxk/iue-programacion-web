const dateBirth = new Date('08/08/1998')
const consolePrint = [
    {
        dir: '~',
        input: `cd ~/dev/porfolio`,
        output: '',
        timeout: 0,
    },
    {
        dir: '~/dev/portfolio',
        input: `./build '{"name": "Gustavo Salcedo", "role": "Desarrollador de Software"}, "Edad": "${getAge(
            dateBirth
        )}"}'`,
        output: [
            '<p>Scafolding HTML files...</p>',
            '<p>Hiring a decorator...</p>',
            '<p>Scripting everything...</p>',
            '<p>Building website...</p>',
        ],
        timeout: 500,
    },
    {
        dir: '',
        input: '',
        output: ['<span style="color: #36f045">Welcome to my porfolio</span>'],
    },
]

/**
 * EVENT LISTENERS
 */
document.addEventListener('DOMContentLoaded', async () => {
    for (const text of consolePrint) {
        await typeWriter(text)
        await sleep(1000)
    }
})

/**
 * TYPE WRITER
 */
const consoleDir = document.getElementById('consoleDir')
const inputText = document.getElementById('inputText')
const outputText = document.getElementById('outputText')
async function typeWriter(text) {
    // Clean output line
    outputText.innerHTML = ``

    // Print dir line
    if (text.dir !== '') {
        consoleDir.hidden = false
        consoleDir.innerHTML = `${text.dir} <span id="dirArrow" style="background-color: black;"></span>`
    } else {
        consoleDir.hidden = true
    }

    // Print input line
    if (text.input !== '') {
        inputText.hidden = false
        for (let character in text.input) {
            inputText.innerHTML = text.input.substring(0, parseInt(character) + 1)
            await sleep(10)
        }
    } else {
        inputText.hidden = true
    }

    // Print output line
    if (text.output.length) {
        consoleDir.innerHTML = ``
        inputText.innerHTML = ``
        outputText.hidden = false
        for (let outputIndex in text.output) {
            outputText.innerHTML = `
            ${typeof text.output[outputIndex - 2] !== 'undefined' ? text.output[outputIndex - 2] : ``} 
            ${typeof text.output[outputIndex - 1] !== 'undefined' ? text.output[outputIndex - 1] : ``} 
            ${typeof text.output[outputIndex] !== 'undefined' ? text.output[outputIndex] : ``}
            `
            await sleep(text.timeout)
            if (outputIndex === text.output.length - 1) {
                await sleep(1000)
            }
        }
    } else {
        outputText.hidden = true
    }
}

/**
 * UTILS
 */
async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

function getAge(dateString) {
    var today = new Date()
    var birthDate = new Date(dateString)
    var age = today.getFullYear() - birthDate.getFullYear()
    var m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
}
