# github-repos-search
Browser for repositories of individual users on github

## Część programistyczna

### Instrukcja uruchomienia

1. Uruchomienie lokalne.
- jeśli na komputerze masz skonfigurowanego gita, w terminalu uruchom następujące polecenie:

```bash
git clone https://github.com/olgierdkrzyzaniak/github-repos-search.git
```

- w innym wypadku ze strony repozytorium pobierz ZIP (klikając Code → Download ZIP). Rozpakuj go na swoim komputerze.

![Download tutorial](https://user-images.githubusercontent.com/63750397/148561789-137d6b43-1479-4cff-9b21-738aa0d070e4.png)

- uruchom plik index.html w przeglądarce.

2. Uruchomienie przez serwer lokalny.
    
    Aby uruchomić musisz mieć skonfigurowany node.js
    
    > Ta wersja nie różni się niczym od powyższej, ale nie korzysta z kodu pliku script.js, tylko z pliku app.js i zawartości folderu lib (które są podzielonym na moduły plikiem script.js). Aby oszczędzić twój czas polecam korzystanie z opcji nr 1, natomiast ta jest bliższa temu co zastosowałbym na produkcji.
    > 
    
    Instrukcje postępowania:
    
    - Otwórz plik `index.html` w edytorze tekstu. Zmień wiersz:
    
    ```jsx
    <script src="./script.js"></script>
    ```
    
    na:
    
    ```jsx
    <script src="./app.js" type='module'></script>
    ```
    
    - Otwórz terminal.
    - Zainstaluj `http-server` wpisując `npm install -g http-server`
    - Przejdź do katalogu roboczego, w którym znajduje się index.html używając komendy `cd {ścieżka folderu roboczego}` np.
    
    ```bash
    cd C:\Users\Olgierd\Desktop\github-repos-search
    ```
    
    - Uruchom swój serwer http, wywołując `http-server -c-1`
    
    Powoduje to uruchomienie serwera http Node.js, który obsługuje pliki w twoim katalogu jako pliki statyczne dostępne z `http://localhost:8080`

3. Uruchomienie strony hostowanej przez github.
    - kliknij w w ten link: [https://olgierdkrzyzaniak.github.io/github-repos-search/](https://olgierdkrzyzaniak.github.io/github-repos-search/)

### Użyte technologie

- `HTML` / `CSS` (z gościnnym udziałem `Flexboxa`) / `Vanilla JS`
- GitHub API

### jakie założenia / uproszczenia zostały przyjęte

**Wymagania:**

Stwórz aplikację webową wyświetlającą listę repozytoriów dowolnego użytkownika serwisu GitHub, składającą się z dwóch głównych elementów:

1. Formularz pozwalający na wprowadzenie nazwy użytkownika GitHub (np. allegro)
2. Lista repozytoriów wyszukiwanego użytkownika posortowaną po popularności (liczbie gwiazdek)

**Przyjęte założenia/uproszczenia:**

> Unauthenticated clients can make 60 requests per hour. To get more requests per hour, we'll need to *authenticate*.
 
- Zdecydowałem się, aby prościej i szybciej było uruchomić program nie używać żadnych metod autoryzacji. Podczas pisania i testowania zdarzyło mi się wyczerpać ten limit raz (przy pisaniu CSS).

![Github Docs](https://user-images.githubusercontent.com/63750397/148561704-6fd67ae8-cab7-4f57-8f4f-24271aa48436.png)

- Niestety nie ma możliwości pobrania z API już posortowanej (po liczbie gwiazdek) listy repozytoriów. Może być jedno z: `created`, `updated`, `pushed`, `full_name`.
    
    Problem w tym, że w takim razie musimy zassać całość, aby to należycie posortować po popularności, co w przypadku większych repozytoriów sprawia, że zanim wyświetlimy jakiekolwiek informacje musimy pobrać najpierw parę/paręnaście stron wyników (limit wyników na stronę to 100), a wiec wykonać parę zapytań do API. 
    >  Nie udało mi się znaleźć alternatywnego, szybszego rozwiązania.

    To była prawda do czasu ostatniego commita. Zmieniłem sekwencyjne wysyłanie zapytań do API na równoległe. To znacznie poprawiło szybkość działania strony.
    
- Dzięki zastosowaniu podejścia Mobile-first design udało mi się stworzyć responsywny interfejs, bez użycia media-queries.

---

## Część Projektowa

### Tłumaczę niektóre decyzje projektowe tutaj:

- Zastosowałem podejście Mobile-first design (filozofia projektowania, która ma na celu stworzenie lepszych doświadczeń użytkownika poprzez rozpoczęcie procesu projektowania z myślą o urządzeniach mobilnych), aby zapewnić dobrą responsywność
- poza formularzem pozwalającym na wprowadzenie nazwy użytkownika oraz listą repozytoriów pojawiającą się jako wynik zdecydowałem się dodatkowo zamieścić krótkie bio wyszukiwanego użytkownika, pozwalające sprecyzować czy odnaleźliśmy właściwą osobę, oraz dostarczającą podstawowych informacji na temat użytkownika. Nazwa użytkownika zawiera link przenoszący do strony na githubie.
- Navbar z logiem i inputetm oraz page navigator pozostają widoczne u góry ekranu przy scrollowaniu, aby można było za ich pomocą wykonywać akcje natychmiastowo, nawet jeśli nie jesteśmy na górze strony.
- Nazwa repozytorium zawiera link przenoszący do strony repozytorium na githubie.
- Każde zwrócone repozytorium ma dodatkowo informację na temat języka, liczby gwiazdek oraz krótki opis.
- Czysto estetyczna, zdecydowałem się na minimalistyczny projekt graficzny. Dużo whitespace, niewiele kolorów o dużym kontraście. Zapewnia to odpowiednią czytelność całości.

### Badanie użyteczności

Badania użyteczności wykazały:

- potrzebę podziału wyników na parę stron (w przypadku allegro gdzie repozytoriów jest 104 brak podziału nie stanowił takiego problemu jak np. w przypadku google, gdzie jest ich 2166)
- potrzebę wyświetlania liczby zwróconych repozytoriów

### Exporty z figmy

![Lo-fi](https://user-images.githubusercontent.com/63750397/148561354-fee4be00-1647-4ec4-8bb6-196d8715f155.png)
![Hi-fi](https://user-images.githubusercontent.com/63750397/148561357-cc924265-7929-4c6d-91f8-6300d6932f95.png)

