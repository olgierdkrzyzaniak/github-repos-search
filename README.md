# github-repos-search
Browser for repositories of individual users on github

## Część programistyczna

### Instrukcja uruchomienia

1. Uruchomienie lokalne.
- jeśli na komputerze masz skonfigurowanego gita, w terminalu uruchom następujące polecenie:

```bash
git clone https://github.com/olgierdkrzyzaniak/github-repos-search.git
```

- w innym wypadku na stronie repozytorium pobierz ZIP (klikając Code → Download ZIP). Rozpakuj go na swoim komputerze.

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f95d075e-7f67-4d7d-b135-9729a65e96c5/Untitled.png)

1. Uruchomienie strony hostowanej przez github.
    - kliknij w w ten link:

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
> 
- Zdecydowałem się, aby prościej i szybciej było uruchomić program nie używać żadnych metod autoryzacji. Podczas pisania i testowania zdarzyło mi się wyczerpać ten limit raz (przy pisaniu CSS).

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/ea8b0e22-dbce-499a-a549-717a7aa430a4/Untitled.png)

- Niestety nie ma możliwości pobrania z API już posortowanej (po liczbie gwiazdek) listy repozytoriów. Może być jedno z: `created`, `updated`, `pushed`, `full_name`.
    
    Problem w tym, że w takim razie musimy zassać całość, aby to należycie posortować po popularności, co w przypadku większych repozytoriów sprawia, że zanim wyświetlimy jakiekolwiek informacje musimy pobrać najpierw parę/paręnaście stron wyników (limit wyników na stronę to 100), a wiec wykonać parę zapytań do API. Nie udało mi się znaleźć alternatywnego, szybszego rozwiązania.
    
- Dzięki zastosowaniu podejścia Mobile-first design udało mi się stworzyć responsywny interfejs, bez użycia media-queries.

---

## Część Projektowa

### Tłumaczę niektóre decyzje projektowe tutaj:

- Zastosowałem podejście Mobile-first design (filozofia projektowania, która ma na celu stworzenie lepszych doświadczeń użytkownika poprzez rozpoczęcie procesu projektowania z myślą o urządzeniach mobilnych), aby zapewnić dobrą responsywność
- poza formularzem pozwalający na wprowadzenie nazwy użytkownika oraz listą repozytoriów pojawiającą się jako wynik zdecydowałem się dodatkowo zamieścić krótkie bio wyszukiwanego użytkownika, pozwalającą sprecyzować czy odnaleźliśmy właściwą osobę, oraz dostarczającą podstawowych informacji na temat użytkownika. Nazwa użytkownika zawiera link przenoszący do strony na githubie.
- Navbar z logiem i inputetm oraz page navigator pozostają widoczne u góry ekranu przy scrollowaniu, aby można było za ich pomocą wykonywać akcje natychmiastowo, nawet jeśli nie jesteśmy na górze strony.
- Nazwa repozytorium zawiera link przenoszący do strony repozytorium na githubie
- Każde zwrócone repozytorium ma dodatkowo informację na temat języka, liczby gwiazdek oraz krótki opis.
- Czysto estetyczna, zdecydowałem się na minimalistyczny projekt graficzny. Dużo whitespace, niewiele kolorów o dużym kontraście. Zapewnia to odpowiednią czytelność całości
- Zastosowanie prostej w zrozumieniu dla użytkownika architektury pionowej. Cały proces to podróż z góry na dół po kolejnych stopniach.

### Badanie użyteczności

Badania użyteczności wykazały:

- potrzebę podziału wyników na parę stron (w przypadku allegro gdzie repozytoriów jest 104 brak podziału nie stanowił takiego problemu jak np. w przypadku google, gdzie jest ich 2166)
- dobrze aby wyświetlana była liczba zwróconych repozytoriów

### Exporty z figmy

![Lo-fi.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/6226a77b-e1d9-4540-b960-99233fad276a/Lo-fi.png)

![Hi-fi.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a92fd9c0-3317-41d8-aaf6-d43d2e07a454/Hi-fi.png)
