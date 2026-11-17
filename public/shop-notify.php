<?php
/**
 * shop-notify.php — Email-Registry für den Shop-Launch (sylents)
 *
 * Pro Anmeldung:
 *   1. Zeile in registrations.csv (oberhalb des Docroots: sylents.de/shop-notify-data/)
 *   2. Mail an hi@sylents.de (Subject enthält die Email)
 *
 * Keine externen Dienste. Honeypot-Feld 'fax' muss leer bleiben.
 * Duplikat-Emails: keine zweite Zeile, Mail markiert "Duplikat".
 */

declare(strict_types=1);

const RECIPIENT = 'hi@sylents.de';

function redirect_to(string $path, string $query): void
{
    header('Location: ' . $path . (str_contains($path, '?') ? '&' : '?') . $query, true, 303);
    exit;
}

function safe_redirect(string $fallback): string
{
    $p = $_POST['redirect'] ?? $fallback;
    // Nur eigene Pfade erlauben (kein offener Redirect), kein //
    if (preg_match('#^/[A-Za-z0-9_/\-]*$#', $p) && !str_starts_with($p, '//')) {
        return $p;
    }
    return $fallback;
}

$lang = ($_POST['lang'] ?? 'de') === 'en' ? 'en' : 'de';
$fallback = $lang === 'en' ? '/en/shop-info/' : '/shop-info/';
$redirect = safe_redirect($fallback);

$email   = trim($_POST['email'] ?? '');
$fax     = trim($_POST['fax'] ?? '');        // Honeypot
$consent = isset($_POST['consent']);

if ($fax !== '') {
    redirect_to($redirect, 'error=bot');     // Bot: freundlich abweisen
}
if (!$consent) {
    redirect_to($redirect, 'error=consent');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    redirect_to($redirect, 'error=email');
}

// --- CSV-Registry (oberhalb des Docroots, nicht per HTTP abrufbar) ---
$dataDir = dirname(__DIR__) . '/shop-notify-data';
$file    = $dataDir . '/registrations.csv';
$csvOk   = false;
$isNew   = true;

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0750, true);
}
if (is_dir($dataDir) && is_writable($dataDir)) {
    // Duplikat-Check (nur Email, unabhängig von Sprache)
    if (is_file($file)) {
        $fh = @fopen($file, 'r');
        if ($fh) {
            while (($row = fgetcsv($fh, 512, ',') ) !== false) {
                if (strcasecmp(trim((string) ($row[1] ?? '')), $email) === 0) {
                    $isNew = false;
                    break;
                }
            }
            fclose($fh);
        }
    }
    if ($isNew) {
        $fh = @fopen($file, 'a');
        if ($fh) {
            @flock($fh, LOCK_EX);
            @fputcsv($fh, [date('c'), $email, $lang, $_SERVER['REMOTE_ADDR'] ?? '']);
            @flock($fh, LOCK_UN);
            fclose($fh);
            $csvOk = true;
        }
    } else {
        $csvOk = true; // Duplikat: nichts zu speichern
    }
}

// --- Mail-Benachrichtigung ---
$subject = ($isNew ? 'Shop-Voranmeldung: ' : 'Shop-Voranmeldung (Duplikat): ') . $email;
$body =
    "Shop-Voranmeldung über sylents.de\n"
    . "---------------------------------\n"
    . "Datum:  " . date('c') . "\n"
    . "Email:  " . $email . "\n"
    . "Sprache: " . $lang . "\n"
    . "CSV:    " . ($csvOk ? 'gespeichert' : 'FEHLER — Datei nicht schreibbar!') . "\n"
    . "IP:     " . ($_SERVER['REMOTE_ADDR'] ?? '') . "\n";
$headers =
    'From: ' . RECIPIENT . "\r\n"
    . 'Reply-To: ' . $email . "\r\n"
    . 'Content-Type: text/plain; charset=UTF-8' . "\r\n"
    . 'X-Mailer: sylents-shop-notify';
@mail(RECIPIENT, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers, '-f' . RECIPIENT);

redirect_to($redirect, 'ok=1' . ($isNew ? '' : '&dup=1'));
