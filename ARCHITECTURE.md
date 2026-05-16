# Kochplaner — Architektur-Dokumentation

## System-Übersicht

```
┌─────────────────────────────────────────────────────────────┐
│                    BENUTZER (Browser)                        │
└──────────────────────┬──────────────────────────────────────┘
                       │
                       ▼
┌─────────────────────────────────────────────────────────────┐
│              GitHub Pages (donbotti.github.io)               │
│                    index.html (Single Page)                  │
└──────────────────────┬──────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
┌─────────────────┐      ┌──────────────────────┐
│  FOOBY.ch API   │      │  Lokale Datenbank    │
│  (Online)       │      │  (Fallback)          │
│                 │      │                      │
│  hawaii_search  │      │  fooby_database_     │
│  .sri           │      │  complete.json       │
└─────────────────┘      └──────────────────────┘
         │                           │
         └───────────┬───────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│              Lokale Sicherung (JSON-Dateien)                 │
│         Kochplan_1_2026-05-16.json (Download)                │
└─────────────────────────────────────────────────────────────┘
```

## Datenfluss

### 1. Rezept-Auswahl
```
Benutzer wählt Rezepte aus
    │
    ▼
JavaScript liet selectedRecipes[]
    │
    ▼
Rezepte werden aus lokalem recipes{} Objekt geladen
(Fallback: Aus fooby_database_complete.json)
```

### 2. Wochenplan-Generierung
```
selectedRecipes[]
    │
    ▼
Kategorisierung:
  - mealPrepOptions (mealprep: true)
  - lunchOptions (lunch: true)
  - dinnerOptions (alle)
    │
    ▼
Wochenplan-Algorithmus:
  Sonntag: Meal-Prep
  Mo-Fr:   Lunch = Reste vom Vortag
  Mo-Fr:   Dinner = Schnelle Gerichte
  Sa-So:   Aufwändigere Gerichte
    │
    ▼
pdfContent.weekPlan
```

### 3. Einkaufsliste
```
selectedRecipes[]
    │
    ▼
recipeIngredients{} Mapping
    │
    ▼
Zutaten zusammenfassen:
  - Gleiche Zutaten finden
  - Mengen addieren
  - Nach Kategorien gruppieren
    │
    ▼
consolidatedIngredients{}
    │
    ▼
HTML + PDF-Ausgabe
```

## Fallback-Mechanismus

### Online-Modus (Standard)
```javascript
// FOOBY API wird abgefragt
fetch('https://fooby.ch/hawaii_search.sri?query=vegetarisch')
  .then(response => response.json())
  .then(data => {
    // Rezepte anzeigen
  })
  .catch(error => {
    // Fallback auf lokale Datenbank
    loadLocalDatabase();
  });
```

### Offline-Modus (Fallback)
```javascript
// Lokale Datenbank laden
function loadLocalDatabase() {
  fetch('fooby_database_complete.json')
    .then(response => response.json())
    .then(data => {
      recipes = data.recipes;
      displayRecipes();
    });
}
```

## Datei-Struktur

```
kochplaner/
│
├── index.html              # Hauptanwendung (Single Page)
├── fooby_database.json     # FOOBY API-Metadaten
├── fooby_database_complete.json  # Alle Rezepte mit Details
├── README.md               # Projekt-Dokumentation
├── ARCHITECTURE.md         # Diese Datei
├── kochplaner.pdf          # Beispiel-PDF
├── kochplaner_claudia.pdf  # Beispiel-PDF
├── rezeptvorschlaege.md    # Rezept-Recherche
└── rezeptvorschlaege_fooby.md  # FOOBY-Recherche
```

## JavaScript-Module

### Rezept-Daten
```javascript
const recipes = {
  1: { name: "...", time: 20, mealprep: true, ... },
  2: { name: "...", time: 25, mealprep: true, ... },
  // ...
};
```

### Zutaten-Mapping
```javascript
const recipeIngredients = {
  1: { 'Kategorie': ['Zutat Menge', ...] },
  // ...
};
```

### Wochenplan-Logik
```javascript
function generateWeekPlan() {
  // 1. Rezepte kategorisieren
  // 2. Sonntag: Meal-Prep
  // 3. Mo-Fr: Lunch = Reste
  // 4. Mo-Fr: Dinner = Schnell
  // 5. Sa-So: Aufwändig
}
```

### PDF-Generator
```javascript
function generatePDF() {
  // 1. Checkboxen auslesen
  // 2. HTML-Content generieren
  // 3. printWindow öffnen
  // 4. window.print() auslösen
}
```

### Lokale Sicherung
```javascript
function savePlanLocally() {
  // 1. Plan-Daten sammeln
  // 2. localStorage aktualisieren
  // 3. JSON-Datei zum Download anbieten
}
```

## Sicherung

### Automatische Sicherung
- Jeder Plan wird als JSON heruntergeladen
- Dateiname: `Kochplan_{Nummer}_{Datum}.json`
- Enthält: Wochenplan, Rezepte, Einkaufsliste

### Lokale Speicherung
```javascript
localStorage.setItem('kochplaner_plans', JSON.stringify(plans));
```

### Wiederherstellung
```javascript
const plans = JSON.parse(localStorage.getItem('kochplaner_plans') || '[]');
```

## Performance

### Optimierungen
- Single Page Application (kein Server-Rendering)
- Keine externen Bibliotheken
- Bilder werden nicht geladen (nur Text)
- localStorage für schnellen Zugriff

### Ladezeiten
- Erster Load: ~50KB (HTML + CSS + JS)
- Lokale Datenbank: ~20KB (JSON)
- FOOBY API: ~200ms (bei Erreichbarkeit)

## Fehlerbehandlung

### FOOBY API nicht erreichbar
```
1. Timeout nach 5 Sekunden
2. Fehlermeldung anzeigen
3. Automatischer Fallback auf lokale Datenbank
4. Hinweis: "Offline-Modus aktiv"
```

### localStorage voll
```
1. Fehlermeldung: "Speicher voll"
2. Älteste Pläne löschen
3. Oder: Nur als Datei sichern
```

## Zukünftige Erweiterungen

### Geplant
- [ ] Service Worker für Offline-Nutzung
- [ ] Bilder zu den Rezepten
- [ ] Nährwertinformationen
- [ ] Einkaufsliste per Email versenden
- [ ] Wochenplan automatisch generieren lassen

### In Diskussion
- [ ] Progressive Web App (PWA)
- [ ] Push-Benachrichtigungen
- [ ] Teilen via WhatsApp/Telegram

---

**Version:** 1.0
**Letzte Aktualisierung:** 2026-05-16
**Autor:** DonBo 🤖
