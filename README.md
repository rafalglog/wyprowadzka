# Spokojna przeprowadzka

Polskojęzyczna lista kontrolna i harmonogram przygotowania umeblowanego mieszkania do przekazania. Postęp jest zapisywany lokalnie w przeglądarce; aplikacja nie wymaga konta ani serwera.

## Uruchomienie

Wymagany jest Node.js zgodny z polem `engines` w `package.json`.

```sh
npm install
npm run dev
```

Serwer deweloperski korzysta z HTTPS. Aby otworzyć `https://wyprowadzka.orb.local:4321/`, uruchom go w maszynie OrbStack `Wyprowadzka`, wykonując tam `npm install` i `npm run dev`. Certyfikat jest lokalny i niezaufany, więc przeglądarka wyświetli ostrzeżenie. Serwer nasłuchuje na wszystkich interfejsach maszyny; dostęp z sieci zależy od ustawień OrbStack. Postęp jest zapisywany osobno dla każdego adresu strony, więc dane z `localhost` nie zostaną automatycznie przeniesione.

Aby zbudować i sprawdzić wersję produkcyjną:

```sh
npm run build
npm run preview
```

## Korzystanie

Zaznaczaj zadania, aby śledzić postęp; możesz filtrować niewykonane zadania, rozwijać i zwijać kategorie oraz wydrukować całą listę. Reset wymaga potwierdzenia. Dane pozostają w pamięci lokalnej danej przeglądarki i urządzenia; wyczyszczenie danych przeglądarki usunie zapisany postęp. Jeśli zapis jest niedostępny, strona wyświetli ostrzeżenie.

Terminy i treść zadań znajdują się w `src/data/checklist.ts`. Identyfikatory zadań służą do odczytu zapisanego postępu, dlatego nie należy ich zmieniać bez migracji danych.
