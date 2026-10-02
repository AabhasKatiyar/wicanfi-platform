# Security & Zero-Knowledge Architecture Policy

WiCanFi is engineered with a **Zero-Knowledge Privacy Architecture** specifically designed for campus networks.

## Core Security Commitments

1. **Client-Side Credential Isolation:**
   - Student credentials (usernames, passwords, roll numbers) are stored strictly inside the client device's encrypted browser vault (`chrome.storage.local`).
   - Passwords **NEVER** leave the client device over any network connection other than direct SSL/TLS or local gateway authentication directly to the campus firewall (`172.16.16.16`).

2. **Zero-Knowledge Telemetry:**
   - Operational telemetry records only anonymous installation UUIDs, request durations, and status codes.
   - No personally identifiable information (PII), session tokens, passwords, or browsing histories are ever transmitted or stored on cloud telemetry collectors.

3. **Multi-Factor Session Handshake:**
   - WiCanFi communicates directly with local captive portal controllers (Mode-191 XML Protocol) without proxy middleboxes, preventing man-in-the-middle credential harvesting.

## Reporting a Security Vulnerability

If you discover any security or vulnerability concern, please disclose it responsibly:
- **Email:** aabhaskatiyar007@gmail.com
- **Response SLA:** Within 24 hours
