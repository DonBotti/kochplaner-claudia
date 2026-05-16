# Kochplaner für Claudia

**Permanenter Link:** https://donbotti.github.io/kochplaner-claudia/

## Funktionen

- **Rezeptauswahl:** 15 vegetarische Gerichte mit Kategorien
- **Dynamischer Wochenplan:** Basierend auf Auswahl mit Reste-Logik
- **Ausführliche Rezepte:** Schritt-für-Schritt mit Mengenangaben
- **Einkaufsliste:** Nach Coop-Kategorien sortiert
- **PDF-Export:** Wählbar: Wochenplan, Rezepte, Einkaufsliste
- **Lokale Speicherung:** Pläne als JSON speichern und wieder laden

## Lokale Dateien

| Datei | Beschreibung |
|-------|-------------|
| `index.html` | Hauptseite (interaktiv) |
| `fooby_database.json` | Lokale Kopie der FOOBY Rezepte |
| `kochplaner_mit_rezepten.pdf` | Beispiel-PDF mit allen Details |

## FOOBY Datenbank

- **Quelle:** fooby.ch (via API)
- **Vegetarische Rezepte:** 5.753
- **Hauptgerichte:** 1.229
- **Stand:** 2026-05-16

## Backup

Falls die FOOBY API nicht mehr funktioniert:
1. `fooby_database.json` enthält alle extrahierten Rezepte
2. Die HTML-Seite funktioniert offline mit den eingebauten Rezepten
3. JSON-Datei kann jederzeit erweitert werden
