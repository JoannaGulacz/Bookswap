## BookSwap - website for searching, reviewing and exchanging books (CodersCamp project)

### Opis projektu

Aplikacja zrzeszająca fascynatów książek, która umożliwia wyszukiwanie ocen oraz recenzji książek znajdujących się w bazie.
Zarejestrowani użytkownicy, poza możliwością wystawiania ocen zyskują dostęp do własnej biblioteki książek. Pochwal się swoją kolekcję lub wymieniaj książkami z innymi użytkownikami!

### Funkcjonalności

-   baza książek: zbiór tytułów
-   baza gatunków: zbiór kategorii literackich
-   baza autorów: zbiór pisarzy
-   baza wydawnictw: zbiór przedsiębiorstw
-   system oceniania książek: ocena książki w skali gwiazdkowej, wyświetlanie średniej oceny użytkowników
-   system recencji użytkowników: dodawanie recenzji według określonego schematu (konto Recenzenta)
-   zakładanie konta użytkownika
-   biblioteka książek: kolekcja przeczytanych książek (odnośnik do recenzji/oceny użytkownika)
-   system wymiany książek: zaoferowanie książek z biblioteki do wymiany, szukanie ofert wymiany

### Info dla zespołu

Info dla osoby zakładającej repo:

```
przed wykonaniem polecenia yarn || npm install konieczenie git init, bez tego husky nie zadziała
```

```
node seeder.js -i // import danych
node seeder.js -d // usuwanie danych
```
