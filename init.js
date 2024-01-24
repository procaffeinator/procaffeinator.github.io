const CONFIG_URL = 'https://raw.githubusercontent.com/procaffeinator/configs/main/api_keys.json';

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
        console.log(config.gemini_pro_api_key);
    } else {
        console.error('Failed to fetch configuration');
    }
}

initializeApp();