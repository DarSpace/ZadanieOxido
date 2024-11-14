# OpenAI Article Generator

Aplikacja do generowania artykułów HTML przy użyciu modelu OpenAI GPT-3.5, która pobiera artykuł w formie tekstu, przekształca go na kod HTML z odpowiednimi tagami, obrazkami (w formie placeholderów) oraz podpisami.

## Opis

Aplikacja łączy się z API OpenAI, pobiera artykuł tekstowy, a następnie przekształca go w format HTML. Odpowiedź od modelu zawiera:

- Strukturalne tagi HTML (np. `<h1>`, `<h2>`, `<p>`, `<ul>`, `<img>`),
- Miejsca, w których mogą znaleźć się obrazki, oznaczone tagiem `<img src="image_placeholder.jpg" alt="prompt">`,
- Podpisy do obrazków, zapisane w tagu `<figcaption>`,
- Brak CSS i JavaScript - tylko czysty HTML gotowy do użycia w treści artykułu.

Wygenerowany kod HTML jest zapisywany do pliku `artykul.html`.

## Wymagania

- Node.js w wersji 16 lub nowszej
- Klucz API do OpenAI (można uzyskać w panelu OpenAI)

## Instalacja

1. **Sklonuj repozytorium na swoje urządzenie:**

   git clone https://github.com/DarSpace/ZadanieOxido

2. **Zainstaluj zależności:**

W katalogu głównym repozytorium uruchom poniższe komendy, aby zainstalować wszystkie wymagane paczki:

    npm install
    npm init -y
    npm install dotenv
    npm install axios

3. **Ustaw klucz API do OpenAI:**

Przechowuj swój klucz API w zmiennej środowiskowej OPENAI_API_KEY. Dodaj go do pliku .env:
(stwórz plik .env)

    OPENAI_API_KEY=twój_klucz_api

## Użycie

1. **Uruchom aplikację:**

Uruchom teminal i wpisz poniższą komendę

    node generateArticle.js

2. **Wygenerowany plik HTML (artykul.html) pojawi się w katalogu głównym projektu.**

- Pamiętaj, że wygenerowany kod HTML nie zawiera nagłówków <html>, <head> ani <body>, ponieważ generujemy tylko zawartość do umieszczenia w już istniejącej strukturze HTML.
- Obrazki muszą być podmienione na rzeczywiste pliki lub linki do obrazów.

## EDYCJA

- Aby zmienić docelowy tekst wystarczy usunąć tekst w pliku o nazwie "artykul.txt" oraz wkleić swój nowy tekst i zapisać (ctrl+s).
  Następnie uruchomić ponowinie aplikacje wpisując w terminal:

  node generateArticle.js
