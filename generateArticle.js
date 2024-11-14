const axios = require('axios');
const fs = require('fs');
require('dotenv').config(); // Wczytaj zmienne z pliku .env

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
    console.error("Błąd: Brak klucza API OpenAI w pliku .env");
    process.exit(1); // Zakończ program, jeśli brakuje klucza API
}

async function readArticleFile(filePath) {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        console.log("Treść artykułu odczytana z pliku:", data);
        return data;
    } catch (error) {
        console.error("Błąd odczytu pliku artykułu:", error);
        throw error;
    }
}

async function saveHtmlFile(content, filePath) {
    try {
        await fs.promises.writeFile(filePath, content, 'utf8');
        console.log("Plik HTML zapisany:", filePath);
    } catch (error) {
        console.error("Błąd zapisu pliku HTML:", error);
        throw error;
    }
}

async function generateHtmlContent(articleContent) {
    const prompt = `
    Przekształć ten tekst artykułu na kod HTML, zawierający odpowiednie tagi HTML, takie jak:
    - Nagłówki <h1>, <h2>, <h3> dla tytułów i podtytułów.
    - Akapity <p> dla tekstu.
    - Listy uporządkowane i nieuporządkowane <ul>, <ol> oraz <li>.
    - Miejsca, w których warto dodać obrazki, oznacz jako <img src="image_placeholder.jpg" alt="prompt dla obrazu">.
    - Wygeneruj podpis dla obrazu i wstaw go w alt pomiedzy cudzysłowia.
    - Wygeneruj podpisy obrazków które znajdą się pod obrazkiem zawierające rozbudowany opis. 
    - Pod każdym obrazkiem dodaj podpis w tagu <figcaption> z tekstem adekwatnym do obrazka.
    - Nie dodawaj kodu CSS ani JavaScript.
    - Generuj tylko zawartość między tagami <body> i </body>.
    Zwróć kod HTML zawierający te elementy, w taki sposób, jakby to był gotowy artykuł z obrazkami i podpisami.

    Artykuł:
    ${articleContent}
    `;

    const data = {
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: `${prompt}` }
        ],
        max_tokens: 2500,
    };

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
        });
        console.log("Odpowiedź API:", response.data.choices[0].message.content.trim());
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Błąd podczas wywołania API:", error);
        throw error;
    }
}



async function main() {
    try {
        const articlePath = './artykul.txt';
        const outputPath = './artykul.html';

        console.log("Rozpoczynam odczyt pliku artykułu...");
        const articleContent = await readArticleFile(articlePath);

        console.log("Odczytano artykuł, teraz wysyłam zapytanie do API...");
        const htmlContent = await generateHtmlContent(articleContent);

        console.log("Otrzymano odpowiedź od API, zapisuję do pliku...");
        await saveHtmlFile(htmlContent, outputPath);

        console.log('Proces zakończony sukcesem. Plik został zapisany.');
    } catch (error) {
        console.error('Wystąpił błąd:', error);
    }
}

main();