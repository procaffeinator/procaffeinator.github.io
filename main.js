const CONFIG_URL = 'https://raw.githubusercontent.com/procaffeinator/configs/main/api_keys.json';
var GEMINI_PRO_API_KEY = ""
async function fetchConfig() {
    try {
        const response = await fetch(CONFIG_URL);
        const config = await response.json();
        return config;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function initializeApp() {
    const config = await fetchConfig();
    if (config) {
        // Use config.api_key in your application
        GEMINI_PRO_API_KEY = config.gemini_pro_api_key;
    } else {
        console.error('Failed to fetch configuration');
    }
}

initializeApp();


// Dummy data for categories (replace with actual data)
const category1Options = ['Smartphone', 'Wearable', 'Smart Home Device', 'Drone', 'laptop', 'Augmented Reality Glasses', 'Smartwatch', 'Security Camera', 'Virtual Assistant', 'Gaming Console'];
const category2Options = ['Smart', 'Autonomous', 'Innovative', 'Seamless', 'Futuristic', 'Adaptive', 'Intelligent', 'Secure', 'Connected', 'Advanced'];
const category3Options = ['Empowering', 'Efficient', 'Transformative', 'Productive', 'Personalized', 'Time-saving', 'Revolutionary', 'User-friendly', 'Streamlined', 'Life-enhancing'];



// Function to populate dropdown options
function populateOptions(category, options) {
    const selectElement = document.getElementById(category);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.text = option;
        selectElement.add(optionElement);
    });
}

async function generateIdea() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    const resultContainerDiv = document.querySelector('.result-container');
    resultContainerDiv.style.display = 'none';

    try {
        const category1 = document.getElementById('category1').value;
        const category2 = document.getElementById('category2').value;
        const category3 = document.getElementById('category3').value;

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

        // Make a request to the Gemini Pro API
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

        // Parse the JSON response
        const data = await response.json();

        // Hide the loader and show the result container
        loader.style.display = 'none';
        resultContainerDiv.style.display = 'flex';

        // Display the generated idea
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = ''; // Clear previous content

        const generatedIdea = `<p class="generated-idea fade-in">${data.candidates[0].content.parts[0].text}</p>`;

        // Create a container div for the copy button and generated text
        const copyContainer = document.createElement('div');
        copyContainer.classList.add('copy-container');

        // Add "Copy to Clipboard" button with Font Awesome icon
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.addEventListener('click', function () {
            copyToClipboard(data.candidates[0].content.parts[0].text);
        });
        copyButton.classList.add('fade-in');
        // Append the generated text to the container
        copyContainer.innerHTML += generatedIdea;

        // Append the button to the container
        copyContainer.appendChild(copyButton);

        // Append the copy container to the result div
        resultDiv.appendChild(copyContainer);

        const imageUrls = ['assets/download.jpeg', 'assets/download.jpeg', 'assets/download.jpeg'];

        // Create a container div for the images
        const imageContainer = document.createElement('div');
        imageContainer.classList.add('image-container');

        imageUrls.forEach(url => {
            // Create the image element
            const imgElement = document.createElement('img');
            imgElement.src = url;
            imgElement.classList.add('fade-in');

            // Append the image to the container
            imageContainer.appendChild(imgElement);
        });

        resultDiv.appendChild(imageContainer);
    } catch (error) {
        console.error('Error during API request:', error);
        // Hide the loader and show the result container
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
// Populate options on page load
window.onload = function () {
    populateOptions('category1', category1Options);
    populateOptions('category2', category2Options);
    populateOptions('category3', category3Options);
};
