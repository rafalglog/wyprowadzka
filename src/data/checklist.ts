export interface Task {
  id: string;
  description: string;
  instructions?: string;
}

export interface Category {
  id: string;
  title: string;
  subtitle: string;
  deadline: string;
  deadlineLabel: string;
  tasks: Task[];
}

export interface Milestone {
  period: string;
  title: string;
  tasks: string[];
  highlight?: boolean;
}

const tasks = (category: string, descriptions: string[]): Task[] =>
  descriptions.map((description, index) => ({ id: `${category}-${index + 1}`, description }));

export const categories: Category[] = [
  {
    id: 'osobiste', title: 'Rzeczy osobiste', subtitle: 'Zabierz ze sobą to, co Twoje', deadline: '2027-07-15', deadlineLabel: '15 lipca 2027',
    tasks: tasks('osobiste', [
      'Wszystkie ubrania, buty i rzeczy osobiste zabrane.',
      'Wszystkie przedmioty z szafek i szuflad zabrane.',
      'Wszystkie rzeczy z balkonu zabrane.',
      'Wszystkie rzeczy z piwnicy zabrane.',
      'Żadne prywatne przedmioty nie pozostawione w mieszkaniu.',
    ]),
  },
  {
    id: 'meble', title: 'Meble i wyposażenie właściciela', subtitle: 'Wszystko na swoim miejscu', deadline: '2027-07-15', deadlineLabel: '15 lipca 2027',
    tasks: tasks('meble', [
      'Wszystkie meble znajdujące się w piwnicy przeniesione z powrotem do mieszkania.',
      'Meble ustawione w pierwotnych pomieszczeniach.',
      'Stoły, krzesła, łóżka i szafy ustawione na właściwych miejscach.',
      'Materace, kanapy i pozostałe wyposażenie sprawdzone.',
      'Brak uszkodzeń powstałych podczas przenoszenia mebli.',
      'Wszystkie elementy wyposażenia kompletne.',
      'Narożnik i fotel oddane do tapicera.',
      'Meble, obrazy i wszystkie pozostałe elementy wyposażenia obecne przy wprowadzeniu ustawione na swoich miejscach.',
    ]),
  },
  {
    id: 'kuchnia', title: 'Kuchnia', subtitle: 'Czysto, świeżo i bez pozostawionych rzeczy', deadline: '2027-07-25', deadlineLabel: '25 lipca 2027',
    tasks: tasks('kuchnia', [
      'Wszystkie szafki i szuflady opróżnione i wyczyszczone.',
      'Lodówka i zamrażarka rozmrożone i umyte.',
      'Piekarnik i płyta kuchenna dokładnie wyczyszczone.',
      'Okap i filtry wyczyszczone.',
      'Zlew, krany i blaty umyte.',
      'Podłoga i ściany wyczyszczone.',
      'Brak resztek jedzenia i śmieci.',
      'Data wymiany filtra w lodówce udokumentowana.',
    ]),
  },
  {
    id: 'lazienka', title: 'Łazienka i toaleta', subtitle: 'Czas na dokładne porządki', deadline: '2027-07-25', deadlineLabel: '25 lipca 2027',
    tasks: tasks('lazienka', [
      'Prysznic lub wanna dokładnie wyczyszczone.',
      'Umywalka, krany i toaleta wyczyszczone.',
      'Fugi i płytki umyte.',
      'Lustro i szafki wyczyszczone.',
      'Odpływy oczyszczone.',
      'Usunięte zabrudzenia i osady z kamienia.',
      'Pralka umyta.',
    ]),
  },
  {
    id: 'pokoje', title: 'Pokoje i salon', subtitle: 'Ostatnie spojrzenie na każde pomieszczenie', deadline: '2027-07-27', deadlineLabel: '27 lipca 2027',
    tasks: tasks('pokoje', [
      'Wszystkie szafy i szuflady opróżnione i wyczyszczone.',
      'Podłogi odkurzone i umyte.',
      'Okna i parapety wyczyszczone.',
      'Drzwi i klamki wyczyszczone.',
      'Meble właściciela wyczyszczone.',
      'Ściany sprawdzone pod kątem uszkodzeń.',
      'Okna oraz parapety zewnętrzne i wewnętrzne umyte.',
    ]),
  },
  {
    id: 'naprawy', title: 'Drobne naprawy', subtitle: 'Zadbaj o szczegóły', deadline: '2027-07-27', deadlineLabel: '27 lipca 2027',
    tasks: tasks('naprawy', [
      'Uszkodzone uchwyty i klamki naprawione.',
      'Poluzowane zawiasy i elementy mebli poprawione.',
      'Uszkodzone listwy i drobne elementy naprawione.',
      'Uszkodzenia powstałe podczas najmu zgłoszone i naprawione lub uzgodnione z właścicielem.',
      'Wszystkie żarówki i podstawowe elementy wyposażenia sprawdzone.',
      'Wszystkie usterki zgłoszone właścicielowi.',
      'Uzyskane ze spółdzielni zaświadczenie o przeprowadzonych obowiązkowych przeglądach instalacji gazowej i elektrycznej.',
      'Dziury wywiercone bez zgody właściciela zagipsowane i odmalowane.',
    ]),
  },
  {
    id: 'piwnica', title: 'Piwnica i pozostałe pomieszczenia', subtitle: 'Nie zapomnij o dodatkowej przestrzeni', deadline: '2027-07-25', deadlineLabel: '25 lipca 2027',
    tasks: tasks('piwnica', [
      'Piwnica całkowicie uporządkowana.',
      'Wszystkie prywatne rzeczy zabrane.',
      'Meble właściciela przeniesione do mieszkania.',
      'Balkon i taras posprzątane.',
      'Wszystkie śmieci i odpady usunięte.',
    ]),
  },
  {
    id: 'przekazanie', title: 'Ostateczne przygotowanie i przekazanie', subtitle: 'Ostatnia prosta przed odbiorem', deadline: '2027-07-30', deadlineLabel: '30 lipca 2027',
    tasks: tasks('przekazanie', [
      'Mieszkanie całkowicie posprzątane.',
      'Wszystkie meble właściciela na swoich miejscach.',
      'Wszystkie rzeczy osobiste zabrane.',
      'Wszystkie pomieszczenia sprawdzone.',
      'Wszystkie klucze i piloty przygotowane.',
      'Wykonane zdjęcia wszystkich pomieszczeń.',
      'Stany liczników spisane.',
      'Mieszkanie gotowe do odbioru.',
    ]),
  },
];

export const milestones: Milestone[] = [
  { period: 'GRUDZIEŃ 2026', title: 'Organizacja', tasks: ['Potwierdzenie daty wyprowadzki.', 'Inwentaryzacja mebli i wyposażenia.', 'Rozpoczęcie porządkowania rzeczy.'] },
  { period: 'STYCZEŃ 2027', title: 'Porządkowanie', tasks: ['Segregacja rzeczy osobistych.', 'Pozbywanie się niepotrzebnych przedmiotów.'] },
  { period: 'LUTY 2027', title: 'Pierwsze pakowanie', tasks: ['Pakowanie rzeczy rzadko używanych.', 'Porządkowanie szaf i schowków.'] },
  { period: 'MARZEC–KWIECIEŃ 2027', title: 'Kontrola i naprawy', tasks: ['Przegląd stanu mieszkania.', 'Sporządzenie listy uszkodzeń.', 'Rozpoczęcie drobnych napraw.'] },
  { period: 'MAJ 2027', title: 'Przygotowanie do przeprowadzki', tasks: ['Kontynuowanie pakowania.', 'Organizacja transportu rzeczy osobistych.'] },
  { period: 'CZERWIEC 2027', title: 'Większość rzeczy spakowana', tasks: ['Opróżnienie szaf i schowków.', 'Przygotowanie mebli do przywrócenia na miejsce.'] },
  { period: '1–15 LIPCA 2027', title: 'Przywrócenie mieszkania', tasks: ['Usunięcie większości rzeczy osobistych.', 'Przeniesienie mebli z piwnicy do mieszkania.', 'Ustawienie mebli w pierwotnych miejscach.'] },
  { period: '16–23 LIPCA 2027', title: 'Naprawy i sprzątanie', tasks: ['Drobne naprawy.', 'Gruntowne sprzątanie.', 'Kontrola wyposażenia.'] },
  { period: '24–29 LIPCA 2027', title: 'Ostatnie poprawki', tasks: ['Ostateczne sprzątanie.', 'Sprawdzenie wszystkich pomieszczeń.', 'Przygotowanie kluczy i dokumentów.'] },
  { period: '30 LIPCA 2027', title: 'Mieszkanie gotowe', tasks: ['Wszystko wykonane.', 'Mieszkanie gotowe do odbioru.'], highlight: true },
  { period: '31 LIPCA 2027', title: 'Odbiór', tasks: ['Końcowe oględziny.', 'Protokół zdawczo-odbiorczy.', 'Spisanie liczników.', 'Zwrot kluczy.'], highlight: true },
];
