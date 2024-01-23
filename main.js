// Dummy data for categories (replace with actual data)
const category1Options = ['Word1', 'Word2', 'Word3', 'Word4', 'Word5', 'Word6', 'Word7', 'Word8', 'Word9', 'Word10'];
const category2Options = ['Phrase1', 'Phrase2', 'Phrase3', 'Phrase4', 'Phrase5', 'Phrase6', 'Phrase7', 'Phrase8', 'Phrase9', 'Phrase10'];
const category3Options = ['Idea1', 'Idea2', 'Idea3', 'Idea4', 'Idea5', 'Idea6', 'Idea7', 'Idea8', 'Idea9', 'Idea10'];

// Function to populate dropdown options
function populateOptions(category, options) {
    const selectElement = document.getElementById(category);
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.text = option;
        selectElement.add(optionElement);
    });
}

// Function to generate the idea and display result
function generateIdea() {
    const selectedWords = [
        document.getElementById('category1').value,
        document.getElementById('category2').value,
        document.getElementById('category3').value
    ];

    // Display the selected words
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p>Generated Idea: ${selectedWords.join(' ')}</p>`;

    // You can load images corresponding to the selected words here (replace with actual image URLs)
    const imageUrls = ['assets/download.jpeg', 'assets/download.jpeg', 'assets/download.jpeg'];
    imageUrls.forEach(url => {
        const imgElement = document.createElement('img');
        imgElement.src = url;
        resultDiv.appendChild(imgElement);
    });
}

// Populate options on page load
window.onload = function () {
    populateOptions('category1', category1Options);
    populateOptions('category2', category2Options);
    populateOptions('category3', category3Options);
};
