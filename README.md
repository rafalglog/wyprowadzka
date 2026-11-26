# Spokojna przeprowadzka

Polskojęzyczna lista kontrolna i harmonogram przygotowania umeblowanego mieszkania do przekazania. Postęp jest zapisywany lokalnie w przeglądarce; aplikacja nie wymaga konta ani serwera.

## Uruchomienie

Wymagany jest Node.js zgodny z polem `engines` w `package.json`.

```sh
npm install
npm run dev
```

Serwer deweloperski korzysta z HTTPS. Aby otworzyć `https://wyprowadzka.orb.local:4321/`, uruchom go w maszynie OrbStack `Wyprowadzka`. Na Alpine lokalny runtime Cloudflare wymaga glibc; dla tej statycznej strony możesz uruchomić Astro bez adaptera:

```sh
npm install
ASTRO_LOCAL_STATIC=1 npm run dev
```

Certyfikat jest lokalny i niezaufany, więc przeglądarka wyświetli ostrzeżenie. Serwer nasłuchuje na wszystkich interfejsach maszyny; dostęp z sieci zależy od ustawień OrbStack. Postęp jest zapisywany osobno dla każdego adresu strony, więc dane z `localhost` nie zostaną automatycznie przeniesione.

Aby zbudować i sprawdzić wersję produkcyjną:

```sh
npm run build
npm run preview
```

## Cloudflare

Projekt korzysta z adaptera Astro dla Cloudflare oraz Wrangler. Strona pozostaje statyczna; kompilacja używa Node.js do renderowania. Zmienna `ASTRO_LOCAL_STATIC=1` wyłącza adapter i służy wyłącznie do lokalnej pracy, nie należy jej ustawiać podczas wdrażania. Aby zbudować stronę i wdrożyć ją do Cloudflare Workers, zaloguj się przez `npx wrangler login`, a następnie uruchom:

```sh
npm run build
npx wrangler deploy
```

W ustawieniach Cloudflare Workers Builds można użyć `npm run build` jako komendy budowania i `npx wrangler deploy` jako komendy wdrożenia. Nazwa Workera i data zgodności znajdują się w `wrangler.jsonc`.

## Korzystanie

Zaznaczaj zadania, aby śledzić postęp; możesz filtrować niewykonane zadania, rozwijać i zwijać kategorie oraz wydrukować całą listę. Reset wymaga potwierdzenia. Dane pozostają w pamięci lokalnej danej przeglądarki i urządzenia; wyczyszczenie danych przeglądarki usunie zapisany postęp. Jeśli zapis jest niedostępny, strona wyświetli ostrzeżenie.

Terminy i treść zadań znajdują się w `src/data/checklist.ts`. Identyfikatory zadań służą do odczytu zapisanego postępu, dlatego nie należy ich zmieniać bez migracji danych.
