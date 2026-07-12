SE4HC Basic Proposal Receiving Portal Demo

This is a separate static Phase 1 demo for the lower-cost Basic Proposal Receiving Portal option.

Purpose:
- Receive school proposal submissions online
- Receive PDF / Excel files in the same-browser demo
- Give applicants a proposal reference number
- Let one demo administrator view submissions
- Let the administrator download files and mark submissions as Received

Not included in this basic option:
- Review scoring
- Revision requests
- Document checklist
- Approval workflow
- Export/reporting
- Multiple reviewer accounts

Demo login:
Username: admin
Password: admin123

Important:
This is a static demo. Data and uploaded file blobs are stored in this browser only through IndexedDB.
The production version will require a backend, database, secure file storage, and protected administrator authentication.

Local preview:
python -m http.server 8000

Open:
http://localhost:8000/
http://localhost:8000/submit-proposal.html
http://localhost:8000/admin-login.html
http://localhost:8000/receiving-portal.html
