# 📱 Kochplaner als App installieren (PWA)

**URL:** https://donbotti.github.io/kochplaner-claudia/

Der Kochplaner ist eine Progressive Web App (PWA). Das bedeutet: du kannst ihn
**wie eine echte App** auf dem Homescreen installieren — kein App Store nötig,
funktioniert auf iPhone, Android und Desktop.

---

## 📱 iPhone / iPad (Safari)

1. Öffne **Safari** (nicht Chrome!) und gehe zu:  
   `https://donbotti.github.io/kochplaner-claudia/`

2. Tippe auf das **Teilen-Symbol** (□ mit Pfeil nach oben) unten in der Leiste

3. Scrolle im Menü nach unten → tippe **„Zum Home-Bildschirm"**

4. Name bestätigen → **„Hinzufügen"**

✅ Der Kochplaner erscheint jetzt als App mit eigenem Icon auf dem Homescreen.  
Beim Öffnen startet er **ohne Browser-Leiste** — wie eine native App.

> **Hinweis:** Auf iOS wird Safari benötigt. Chrome auf iPhone unterstützt
> die PWA-Installation nicht.

---

## 🤖 Android (Chrome)

1. Öffne **Chrome** und gehe zu:  
   `https://donbotti.github.io/kochplaner-claudia/`

2. Chrome zeigt automatisch einen Banner unten: **„App installieren"** → tippen

   *Oder:* Tippe auf das ⋮-Menü oben rechts → **„App installieren"**

3. Bestätigen → fertig

✅ App erscheint im Drawer und kann auf den Homescreen gezogen werden.

---

## 💻 Desktop (Chrome / Edge)

1. Öffne Chrome oder Edge und gehe zu:  
   `https://donbotti.github.io/kochplaner-claudia/`

2. In der Adressleiste erscheint rechts ein **Install-Symbol** (⊕ oder Bildschirm-Icon)

3. Klicken → **„Installieren"**

✅ Der Kochplaner öffnet sich in einem eigenen Fenster (ohne Browser-Tabs).  
Er erscheint auch im Startmenü / Dock.

---

## 🔌 Offline-Funktion

Nach der ersten Installation speichert der Service Worker die App lokal.

| Was funktioniert offline | Was braucht Internet |
|--------------------------|----------------------|
| ✅ Rezepte auswählen      | 🌐 Rezeptbilder (loremflickr) |
| ✅ Wochenplan generieren  | — |
| ✅ Einkaufsliste anzeigen | — |
| ✅ PDF erstellen          | — |
| ✅ Plan speichern (localStorage) | — |

Wenn du offline bist, werden Bilder durch einen grauen Platzhalter ersetzt —
alles andere funktioniert vollständig.

---

## 🔄 Updates

Der Service Worker prüft bei jedem Start, ob eine neue Version verfügbar ist.
Updates werden automatisch im Hintergrund geladen und beim nächsten Start aktiv.

Du musst die App **nicht deinstallieren** um Updates zu erhalten.

---

## ❓ FAQ

**„Ich sehe keinen Install-Banner auf dem iPhone"**  
→ Nur Safari unterstützt PWA-Installation auf iOS. Chrome/Firefox auf iPhone nicht.

**„Die App zeigt alte Inhalte"**  
→ App schließen und neu öffnen. Oder im Browser: DevTools → Application → Storage → Clear.

**„Wie deinstalliere ich die App?"**  
→ Wie jede normale App: Icon lang drücken → Entfernen / Deinstallieren.

---

*Erstellt von DonBo 🤖 | Stand: Mai 2026*
