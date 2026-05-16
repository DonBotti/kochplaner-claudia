# Kochplaner für Claudia & Andreas

**Permanenter Link:** https://donbotti.github.io/kochplaner-claudia/

## Über dieses Projekt

Ein persönlicher, interaktiver Kochplaner für vegetarische und pescetarische Gerichte — entwickelt von DonBo für Claudia und Andreas.

## Funktionen

### 1. Rezeptauswahl
- 15 vegetarische Gerichte
- 3 pescetarische Gerichte (mit Fisch)
- Filter nach: Schnell (<30 Min), Meal-Prep, Saison
- Detaillierte Zubereitungsanleitungen

### 2. Dynamischer Wochenplan
**Logik:**
- **Sonntag Abend:** Meal-Prep für die Woche vorbereiten
- **Montag-Freitag Lunch:** Reste vom Vortag (wenn Meal-Prep)
- **Mo-Fr Abend:** Schnelle Gerichte (≤30 Min)
- **Wochenende:** Aufwändigere Gerichte

### 3. Einkaufsliste
- Automatische Zusammenfassung nach Kategorien
- Mengen werden addiert (z.B. 300g + 200g = 500g)
- Checkboxen zum Abhaken
- Kategorien: Gemüse, Fisch, Milchprodukte, Hülsenfrüchte, Konserven, Gewürze

### 4. PDF-Export
- Auswählbar: Wochenplan, Rezepte, Einkaufsliste
- Druckfreundliches Layout
- Checkboxen in der Einkaufsliste

### 5. Lokale Sicherung
- Automatische Speicherung als JSON
- Dateiname: `Kochplan_1_2026-05-16.json`
- Enthält: Wochenplan, Rezepte, Einkaufsliste, Auswahl

## Lokale Datenbank (Fallback)

### Dateien
- `fooby_database_complete.json` — Alle Rezepte mit Details
- `fooby_database.json` — FOOBY API-Metadaten

### Fallback-Mechanismus
```
1. Versuche FOOBY.ch API zu erreichen
2. Wenn nicht erreichbar → verwende lokale Datenbank
3. Lokale Datenbank wird wöchentlich aktualisiert
```

### Aktualisierung der lokalen Datenbank
```bash
# FOOBY API abfragen
curl "https://fooby.ch/hawaii_search.sri?query=vegetarisch&lang=de"

# Datenbank aktualisieren
# (Manuell oder via Cron-Job)
```

## Technische Details

### Technologien
- HTML5, CSS3, Vanilla JavaScript
- Keine externen Abhängigkeiten
- localStorage für Sicherung
- GitHub Pages für Hosting

### Datenquellen
- **Primär:** FOOBY.ch API (online)
- **Fallback:** Lokale JSON-Datenbank
- **Rezeptdetails:** Eigenrecherche + FOOBY-Inspiration

### GitHub Repository
```
https://github.com/DonBotti/kochplaner-claudia
Branch: main
Auto-Deploy: Aktiviert
```

## Wochenplan-Logik

```
Sonntag:    Meal-Prep (z.B. Quiche, Couscous-Salat)
Montag:     Lunch = Sonntags-Reste
            Dinner = Schnelles Gericht
Dienstag:   Lunch = Montags-Reste (wenn Meal-Prep)
            Dinner = Schnelles Gericht
Mittwoch:   Lunch = Dienstags-Reste
            Dinner = Schnelles Gericht
Donnerstag: Lunch = Mittwochs-Reste
            Dinner = Schnelles Gericht
Freitag:    Lunch = Donnerstags-Reste
            Dinner = Schnelles Gericht
Samstag:    Aufwändigeres Gericht
Sonntag:    Meal-Prep für nächste Woche
```

## Rezept-Kategorien

### Vegetarisch (15 Rezepte)
1. Couscous-Salat mit Kichererbsen und Feta
2. Linsen-Dal mit Kokosmilch und Reis
3. Quinoa-Bowl mit Halloumi und Radieschen
4. One-Pot-Pasta mit Spinat und Ricotta
5. Shakshuka
6. Gnocchi mit Spargel-Rahmsauce
7. Gemüse-Frittata
8. Kürbis-Linsen-Curry
9. Ofengemüse mit Kichererbsen und Tahini
10. Spinat-Feta-Quiche
11. Risotto mit grünem Spargel
12. Randen-Ziegenkäse-Flammkuchen
13. Gefüllte Paprika mit Reis und Käse
14. Pasta mit Bärlauch-Pesto
15. Gemüse-Curry mit Kichererbsen

### Pescetarisch (3 Rezepte)
16. Lachsfilet mit grünem Spargel
17. Thunfisch-Pasta mit Kapern
18. Gebratener Seelachs mit Kartoffelsalat

## Entwicklung

### Lokale Entwicklung
```bash
cd /Users/DonBo/.openclaw/workspace/kochplaner
python3 -m http.server 8000
# Öffne http://localhost:8000
```

### Deployment
```bash
git add .
git commit -m "Beschreibung"
git push origin main
# Automatisches Deployment auf GitHub Pages
```

## To-Do

- [ ] Mehr pescetarische Rezepte hinzufügen
- [ ] Saisonale Rezepte automatisch filtern
- [ ] Einkaufsliste nach Supermarkt-Kategorien sortieren
- [ ] Nährwertinformationen hinzufügen
- [ ] Bilder zu den Rezepten

## Lizenz

Privates Projekt für Claudia und Andreas.

---

**Erstellt von DonBo 🤖**
**Letzte Aktualisierung:** 2026-05-16
