var GEMINI_PRO_API_KEY = "AIzaSyC78jtwaS96MJJc2In7e_iaIrfj1sxhgV4"

const category1Options = ['Smartphone', 'Wearable', 'Smart Home Device', 'Drone', 'Laptop', 'Augmented Reality Glasses', 'Smartwatch', 'Security Camera', 'Tablet', 'Gaming Console'];
const category2Options = ['Innovative', 'Autonomous', 'Smart', 'Seamless', 'Futuristic', 'Adaptive', 'Intelligent', 'Secure', 'Connected', 'Advanced'];
const category3Options = ['Empowering', 'Efficient', 'Transformative', 'Productive', 'Personalized', 'Time-saving', 'Revolutionary', 'User-friendly', 'Streamlined', 'Life-enhancing'];

function populateOptions(category, options) {
    const selectElement = document.getElementById(category);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.text = option;
        selectElement.add(optionElement);
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function generateIdea() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const resultContainerDiv = document.querySelector('.result-container');
    resultContainerDiv.style.display = 'none';

    try {
        const category1 = document.getElementById('category1').value;
        let category2 = category2Options[getRandomInt(0, category2Options.length - 1)]
        let category3 = category3Options[getRandomInt(0, category3Options.length - 1)]

        const requestBody = {
            contents: [{
                parts: [{
                    text: `Generate a novel tech product catchline using the following choices:
                    1. Product Type: ${category1}
                    2. Product Feature: ${category2}
                    3. User Benefit: ${category3}
                    
                    Tagline:
                    `
                }]
            }]
        };

        const api_end_pt = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_PRO_API_KEY}`
        const response = await fetch(api_end_pt, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        loader.style.display = 'none';
        resultContainerDiv.style.display = 'flex';

        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        const generatedIdea = `<p class="generated-idea fade-in">${data.candidates[0].content.parts[0].text}</p>`;

        const copyContainer = document.createElement('div');
        copyContainer.classList.add('copy-container');

        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.addEventListener('click', function () {
            copyToClipboard(data.candidates[0].content.parts[0].text);
        });
        copyButton.classList.add('fade-in');
        copyContainer.innerHTML += generatedIdea;

        copyContainer.appendChild(copyButton);

        resultDiv.appendChild(copyContainer);

        const imageUrls = [`assets/category1/${category1}.jpeg`, `assets/category2/${category2}.jpeg`, `assets/category3/${category3}.jpeg`];

        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        imageUrls.forEach(url => {
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.classList.add('fade-in');

            imageContainer.appendChild(imgElement);
        });

        resultDiv.appendChild(imageContainer);
    } catch (error) {
        console.error('Error during API request:', error);
        loader.style.display = 'none';
        resultContainerDiv.style.display = 'flex';
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}
window.onload = function () {
    populateOptions('category1', category1Options);
};
