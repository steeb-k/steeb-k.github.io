// CompTIA Security+ SY0-701 simplified performance-based questions (PBQs).
window.SEC_PBQ = window.SEC_PBQ || [];
window.SEC_PBQ.push(
  {
    id: "pbq-001", domain: 1, objective: "1.1", type: "match",
    title: "Match the control to its type",
    instructions: "For each control, select the control TYPE (preventive, detective, corrective, deterrent, compensating, or directive) that best describes it. Each option is used at most once, and the list contains one option that is not a control type.",
    left: [
      "An inline network IPS drops traffic matching a known exploit signature.",
      "A SIEM rule raises an alert after 20 failed logins in one minute.",
      "A server is restored from last night's backup after a ransomware infection.",
      "Signs and a login banner warn that all activity is monitored and prosecuted.",
      "An unpatchable legacy controller is isolated on its own VLAN with strict ACLs.",
      "A written acceptable use policy tells staff what is allowed on company systems."
    ],
    right: ["Preventive", "Detective", "Corrective", "Deterrent", "Compensating", "Directive", "Managerial"],
    answer: [0, 1, 2, 3, 4, 5],
    unique: true,
    explanation: "An IPS blocks the event before it succeeds (preventive). SIEM alerting identifies an event that has already occurred (detective). Restoring from backup repairs damage after an incident (corrective). Warning signs and banners discourage the behavior without physically stopping it (deterrent). Isolating a system that cannot be patched is an alternative control that substitutes for the missing patch (compensating). A policy that sets expectations is directive. 'Managerial' is a control category, not a type, so it is a distractor."
  },
  {
    id: "pbq-002", domain: 1, objective: "1.3", type: "order",
    title: "Change management workflow",
    instructions: "Place the steps of a standard change management process in the correct order, first step at the top.",
    items: [
      "Implement the change with a backout plan ready",
      "Obtain approval from the change advisory board (CAB)",
      "Submit the change request",
      "Test the change in a non-production environment",
      "Perform an impact and risk analysis",
      "Update documentation and hold a post-implementation review",
      "Schedule the maintenance window and notify stakeholders"
    ],
    answer: [2, 4, 1, 3, 6, 0, 5],
    explanation: "A change starts with a formal request, followed by impact and risk analysis so approvers can make an informed decision. The CAB approves, the change is tested outside production, and then a maintenance window is scheduled and stakeholders are notified. It is then implemented with a tested backout plan. Finally documentation (configuration baselines, diagrams) is updated and a post-implementation review captures lessons learned."
  },
  {
    id: "pbq-003", domain: 1, objective: "1.4", type: "config",
    title: "Choose the cryptographic solution",
    instructions: "For each use case, select the best technique and the category it belongs to. Categories: Symmetric encryption = one shared secret key; Asymmetric = public/private key pair; Hashing = a single fast one-way digest; Key stretching = a deliberately slow, salted, iterated derivation designed for passwords.",
    columns: [
      { key: "technique", label: "Technique", choices: ["AES-256", "SHA-256", "Digital signature", "bcrypt (salted)", "Diffie-Hellman", "3DES"] },
      { key: "category", label: "Category", choices: ["Symmetric encryption", "Asymmetric", "Hashing", "Key stretching"] }
    ],
    rows: [
      { label: "Encrypt a 500 GB database at rest", fixed: {}, answer: { technique: "AES-256", category: "Symmetric encryption" } },
      { label: "Verify a downloaded ISO was not altered by comparing it with the checksum published on the vendor site", fixed: {}, answer: { technique: "SHA-256", category: "Hashing" } },
      { label: "Prove a software release came from the vendor", fixed: {}, answer: { technique: "Digital signature", category: "Asymmetric" } },
      { label: "Store user passwords in an application database", fixed: {}, answer: { technique: "bcrypt (salted)", category: "Key stretching" } },
      { label: "Agree on a session key over an untrusted network", fixed: {}, answer: { technique: "Diffie-Hellman", category: "Asymmetric" } }
    ],
    explanation: "AES-256 is the standard symmetric cipher for bulk data at rest; 3DES is deprecated. SHA-256 produces a digest to verify integrity. A digital signature uses the vendor's private key (asymmetric) to prove origin and integrity. Passwords should be stored with a slow, salted key-stretching function such as bcrypt, PBKDF2, or Argon2, not a fast hash alone. Diffie-Hellman is an asymmetric key-exchange mechanism that lets two parties derive a shared secret over an insecure channel. bcrypt is technically a hash function, but its defining property for this task is key stretching, which is how the category is defined in the instructions."
  },
  {
    id: "pbq-004", domain: 1, objective: "1.2", type: "match",
    title: "Match the security concept",
    instructions: "Select the fundamental security concept that each statement demonstrates.",
    left: [
      "A sender cannot later deny having sent a digitally signed email.",
      "Payroll files are encrypted so that a stolen copy cannot be read by outsiders.",
      "A file hash comparison shows the contract was not modified in transit.",
      "A load-balanced cluster keeps serving users when one node fails.",
      "Audit logs record which account opened which file and when.",
      "A user proves who they are by entering a password and a code from an app."
    ],
    right: ["Confidentiality", "Integrity", "Availability", "Non-repudiation", "Accounting", "Authentication", "Authorization", "Least privilege"],
    answer: [3, 0, 1, 2, 4, 5],
    unique: true,
    explanation: "Digital signatures provide non-repudiation. Encryption that keeps data unreadable to unauthorized parties provides confidentiality. Hash comparison verifies integrity. Redundancy and load balancing support availability. Logs that track user activity provide accounting (the third A in AAA). Verifying identity with credentials is authentication; authorization (what you may do after you are verified) and least privilege are distractors here."
  },
  {
    id: "pbq-005", domain: 2, objective: "2.1", type: "match",
    title: "Identify the threat actor",
    instructions: "Match each description to the most likely threat actor.",
    left: [
      "Highly funded team with a long-term goal of stealing defense contractor designs for a government.",
      "Group that defaces a company's website to protest its environmental record.",
      "Criminal enterprise that deploys ransomware and demands cryptocurrency.",
      "Administrator who deletes backups on the way out after being passed over for promotion.",
      "Individual who runs a downloaded exploit tool against random sites just to see what happens."
    ],
    right: ["Nation-state", "Hacktivist", "Organized crime", "Insider threat", "Unskilled attacker", "Shadow IT", "Competitor"],
    answer: [0, 1, 2, 3, 4],
    unique: true,
    explanation: "Nation-states have resources and patience and are motivated by espionage or geopolitics. Hacktivists are driven by ideology. Organized crime is financially motivated. An insider has legitimate access and a personal grievance. An unskilled attacker (script kiddie) uses prebuilt tools with little sophistication. Shadow IT is unsanctioned technology use, not an actor, and a competitor would typically pursue industrial espionage with a specific target."
  },
  {
    id: "pbq-006", domain: 2, objective: "2.4", type: "match",
    title: "Name the application attack",
    instructions: "Select the attack that each description or payload represents.",
    left: [
      "Login field input of ' OR 1=1 -- bypasses authentication.",
      "A script saved in a forum comment runs in every visitor's browser.",
      "A malicious page makes a logged-in user's browser submit a funds transfer request.",
      "A request for ../../../../etc/passwd returns the server's password file.",
      "Input far longer than the field allows overwrites adjacent memory.",
      "A captured authentication token is resent later to gain access."
    ],
    right: ["SQL injection", "Cross-site scripting (XSS)", "Cross-site request forgery (CSRF)", "Directory traversal", "Buffer overflow", "Race condition", "Replay attack", "Server-side request forgery"],
    answer: [0, 1, 2, 3, 4, 6],
    unique: true,
    explanation: "The tautology payload is classic SQL injection. Stored script execution in other users' browsers is XSS. CSRF abuses the browser's existing session to send an unintended request. ../ sequences indicate directory (path) traversal. Overly long input overwriting memory is a buffer overflow. Resending a captured valid token is a replay attack. Race condition and SSRF are distractors."
  },
  {
    id: "pbq-007", domain: 2, objective: "2.4", type: "match",
    title: "Interpret the log excerpt",
    instructions: "Match each log excerpt to the activity it most likely indicates.",
    left: [
      "sshd: Failed password for root from 203.0.113.9 port 4422 ssh2 (repeated 400 times in 2 minutes)",
      "GET /products?id=1 UNION SELECT username,password FROM users--",
      "DNS: 2,000 TXT queries per hour from one host to long random subdomains of x7k2.example-cdn.net",
      "Login ok user=jdoe src=Brazil 02:14; login ok user=jdoe src=Chicago 02:20",
      "Process create: winword.exe spawned powershell.exe -enc JABzAD0ATgBl..."
    ],
    right: ["Brute-force attack", "SQL injection", "DNS tunneling / exfiltration", "Impossible travel (compromised credentials)", "Malicious macro executing PowerShell", "Password spraying", "Denial of service"],
    answer: [0, 1, 2, 3, 4],
    unique: true,
    explanation: "Hundreds of attempts against one account in minutes is brute force (spraying would try one password across many accounts). UNION SELECT in a parameter is SQL injection. Many TXT queries to random subdomains from one host is a hallmark of DNS tunneling. Logins from distant locations minutes apart indicate impossible travel and probably stolen credentials. An Office application spawning an encoded PowerShell command indicates a malicious macro or document payload."
  },
  {
    id: "pbq-008", domain: 2, objective: "2.5", type: "config",
    title: "Select the mitigation technique",
    instructions: "For each situation, choose the most appropriate mitigation and the control type it represents. Select Compensating only when the control stands in for a primary control that cannot be implemented; otherwise classify it by its function (prevents, detects, or corrects).",
    columns: [
      { key: "mitigation", label: "Mitigation", choices: ["Isolation / segmentation", "Application allow list", "Change default credentials", "File integrity monitoring", "Disable unused ports and services", "Full-disk encryption"] },
      { key: "type", label: "Control type", choices: ["Preventive", "Detective", "Corrective", "Compensating"] }
    ],
    rows: [
      { label: "A legacy OS cannot be upgraded or patched, so another control must stand in for the missing patches", fixed: {}, answer: { mitigation: "Isolation / segmentation", type: "Compensating" } },
      { label: "Users run unapproved executables from USB drives", fixed: {}, answer: { mitigation: "Application allow list", type: "Preventive" } },
      { label: "New network switches ship with admin/admin", fixed: {}, answer: { mitigation: "Change default credentials", type: "Preventive" } },
      { label: "Need to learn when critical system files are tampered with", fixed: {}, answer: { mitigation: "File integrity monitoring", type: "Detective" } },
      { label: "A scan shows Telnet and FTP listening on a hardened web server", fixed: {}, answer: { mitigation: "Disable unused ports and services", type: "Preventive" } }
    ],
    explanation: "When a system cannot be patched, isolating it is a compensating control. Allow listing prevents unapproved code from running. Changing defaults and disabling unneeded services are hardening steps that reduce attack surface (preventive). File integrity monitoring reports changes after they occur, which makes it detective. Full-disk encryption protects data at rest but addresses none of these scenarios."
  },
  {
    id: "pbq-009", domain: 3, objective: "3.2", type: "config",
    title: "Firewall rule set for a web tier",
    instructions: "Complete the rules so that: the Internet can reach the web server (10.0.10.5) over HTTPS only; only the admin subnet (10.0.50.0/24) can SSH to the web server; the web server can query the database (10.0.40.5) on MySQL (3306); everything else is denied. Rules are processed top-down; each rule's port is already set, so complete the action, source, and destination.",
    columns: [
      { key: "action", label: "Action", choices: ["Allow", "Deny"] },
      { key: "source", label: "Source", choices: ["Any", "10.0.50.0/24", "10.0.10.5", "10.0.30.0/24"] },
      { key: "dest", label: "Destination", choices: ["Any", "10.0.10.5", "10.0.40.5"] },
      { key: "port", label: "Port", choices: ["22", "23", "443", "3306", "Any"] }
    ],
    rows: [
      { label: "Rule 1", fixed: { port: "443" }, answer: { action: "Allow", source: "Any", dest: "10.0.10.5" } },
      { label: "Rule 2", fixed: { port: "22" }, answer: { action: "Allow", source: "10.0.50.0/24", dest: "10.0.10.5" } },
      { label: "Rule 3", fixed: { port: "3306" }, answer: { action: "Allow", source: "10.0.10.5", dest: "10.0.40.5" } },
      { label: "Rule 4", fixed: { source: "Any", dest: "Any", port: "Any" }, answer: { action: "Deny" } }
    ],
    explanation: "Public access (source Any) is limited to HTTPS (443) on the web server. SSH (22) must be restricted to the admin subnet rather than Any. The database should only be reachable from the web server on 3306, never from the Internet. The final rule is the explicit deny-all that implements default deny; because rules are evaluated top-down, it must be last."
  },
  {
    id: "pbq-010", domain: 3, objective: "3.3", type: "config",
    title: "Classify data and choose protection",
    instructions: "Use this company's classification scheme exactly: Public = approved for release, no harm if disclosed; Internal = for employees only, minor harm if disclosed; Confidential = sensitive business data that is NOT regulated, serious harm if disclosed; Restricted = any regulated data (payment card numbers, health records, SSNs), regardless of other factors. For each item, choose the classification and the protection method that BEST addresses the stated need.",
    columns: [
      { key: "class", label: "Classification", choices: ["Public", "Internal", "Confidential", "Restricted"] },
      { key: "protection", label: "Protection", choices: ["None required", "Access controls", "Tokenization", "Data masking", "Hashing", "Full-disk encryption"] }
    ],
    rows: [
      { label: "Published press release", fixed: {}, answer: { class: "Public", protection: "None required" } },
      { label: "Internal employee phone directory", fixed: {}, answer: { class: "Internal", protection: "Access controls" } },
      { label: "Production database copy with SSNs given to developers for testing; they need realistic-looking values but must never see the real SSNs", fixed: {}, answer: { class: "Restricted", protection: "Data masking" } },
      { label: "Customer card numbers for recurring billing; the merchant must charge the same card each month without storing the real number", fixed: {}, answer: { class: "Restricted", protection: "Tokenization" } },
      { label: "Unreleased (non-regulated) merger documents on an executive laptop that could be lost while traveling", fixed: {}, answer: { class: "Confidential", protection: "Full-disk encryption" } }
    ],
    explanation: "Classification drives handling. Public data needs no confidentiality control. An internal directory needs only access control. SSNs and card numbers are regulated, so both are Restricted. Test data derived from production must have sensitive fields masked so developers see realistic but fake values. Tokenization replaces card numbers with non-sensitive tokens that the payment provider maps back to the real number, reducing PCI scope while still allowing recurring billing (hashing is irreversible and cannot be charged). Merger documents are sensitive but not regulated (Confidential), and full-disk encryption protects them if the laptop is lost or stolen."
  },
  {
    id: "pbq-011", domain: 3, objective: "3.4", type: "match",
    title: "Match backup and site types to requirements",
    instructions: "Match each requirement to the backup method or recovery site type that best satisfies it.",
    left: [
      "RTO of minutes: a fully equipped site with data replicated in real time.",
      "RTO of a few days: site has hardware and connectivity, but data must be restored from backup.",
      "RTO of several weeks: an empty facility with power and network only.",
      "Weekly job that copies everything, giving the simplest restore.",
      "Nightly job copying all changes since the last full backup; a restore needs the full plus the latest of this type.",
      "Nightly job copying only changes since the last backup of any type; shortest backup window."
    ],
    right: ["Hot site", "Warm site", "Cold site", "Full backup", "Differential backup", "Incremental backup", "Journaling"],
    answer: [0, 1, 2, 3, 4, 5],
    unique: true,
    explanation: "Hot sites are fully equipped with live data and support the shortest RTO and RPO. Warm sites have equipment but need data restored. Cold sites offer space and utilities only. A full backup copies everything. A differential copies changes since the last full, so a restore needs the full plus one differential. An incremental copies changes since the last backup of any kind, giving the fastest backup but requiring the full plus every incremental to restore."
  },
  {
    id: "pbq-012", domain: 3, objective: "3.4", type: "order",
    title: "Disaster recovery restoration sequence",
    instructions: "A data center was lost and operations move to the recovery site. Order the restoration of components by dependency, first at the top.",
    items: [
      "Application servers",
      "Directory services (authentication)",
      "Non-critical and development systems",
      "Power and facility readiness",
      "Database servers",
      "Core network services (routing, DNS, DHCP)",
      "User access and validation testing"
    ],
    answer: [3, 5, 1, 4, 0, 6, 2],
    explanation: "Restore foundational dependencies first: power and facility, then the network that everything communicates over. Directory services provide authentication for servers and users. Databases come before the applications that depend on them. Once applications are up, validate with users. Non-critical and development systems are restored last, according to the recovery priorities set in the business impact analysis."
  },
  {
    id: "pbq-013", domain: 4, objective: "4.8", type: "order",
    title: "Incident response phases",
    instructions: "Place the incident response phases in the correct order, first phase at the top.",
    items: ["Eradication", "Lessons learned", "Detection", "Preparation", "Recovery", "Containment", "Analysis"],
    answer: [3, 2, 6, 5, 0, 4, 1],
    explanation: "The SY0-701 sequence is preparation, detection, analysis, containment, eradication, recovery, lessons learned. Contain first to limit spread, then remove the cause (eradication), then restore systems to normal operation, and finally review what happened to improve the process."
  },
  {
    id: "pbq-014", domain: 4, objective: "4.8", type: "order",
    title: "Order of volatility",
    instructions: "You are collecting evidence from a running compromised server. Order the sources from MOST volatile (collect first) to LEAST volatile (collect last).",
    items: [
      "Hard disk contents",
      "Archival backup tapes",
      "Routing table, ARP cache, process table, kernel statistics, and memory (RAM)",
      "CPU registers and cache",
      "Physical configuration and network topology",
      "Swap file and temporary file systems",
      "Remote logging and monitoring data"
    ],
    answer: [3, 2, 5, 0, 6, 4, 1],
    explanation: "Following RFC 3227 and CompTIA, collect what disappears fastest first: CPU registers and cache; then routing table, ARP cache, process table, kernel statistics, and memory; then temporary file systems and swap; then disk; then remote logging and monitoring data; then physical configuration and network topology; and finally archival media, which persist the longest. Powering the system off first would destroy the volatile evidence."
  },
  {
    id: "pbq-015", domain: 4, objective: "4.1", type: "config",
    title: "Configure wireless security",
    instructions: "Select the security protocol, authentication method, and network placement for each wireless use case. Use the strongest option each group of devices supports, and keep untrusted devices off the corporate network.",
    columns: [
      { key: "protocol", label: "Security protocol", choices: ["Open", "WEP", "WPA2-PSK", "WPA3-SAE", "WPA3-Enterprise"] },
      { key: "auth", label: "Authentication", choices: ["Captive portal only", "Pre-shared key", "802.1X with RADIUS"] },
      { key: "network", label: "Network", choices: ["Corporate VLAN", "Guest VLAN (isolated)", "IoT VLAN (isolated)"] }
    ],
    rows: [
      { label: "Domain-joined employee laptops", fixed: {}, answer: { protocol: "WPA3-Enterprise", auth: "802.1X with RADIUS", network: "Corporate VLAN" } },
      { label: "Visitors: no passphrase or credentials of any kind are distributed; they only click to accept a terms-of-use page", fixed: {}, answer: { protocol: "Open", auth: "Captive portal only", network: "Guest VLAN (isolated)" } },
      { label: "Older smart thermostats that support only WPA2-Personal (passphrase)", fixed: {}, answer: { protocol: "WPA2-PSK", auth: "Pre-shared key", network: "IoT VLAN (isolated)" } },
      { label: "Newer room-booking display tablets (not domain-joined) that support WPA3-Personal (passphrase)", fixed: {}, answer: { protocol: "WPA3-SAE", auth: "Pre-shared key", network: "IoT VLAN (isolated)" } }
    ],
    explanation: "Corporate users should authenticate individually with 802.1X/EAP against RADIUS using WPA3-Enterprise. Because no passphrase is handed out, the guest SSID must be open (WPA3-SAE and WPA2-PSK both require a shared passphrase), with a captive portal for terms acceptance on an isolated guest VLAN. Devices that only support passphrases get the strongest PSK mode they support (WPA2-PSK, or WPA3-SAE for newer devices) and are segmented on an IoT VLAN. WEP is broken and should never be used."
  },
  {
    id: "pbq-016", domain: 4, objective: "4.6", type: "match",
    title: "Assign the access control model",
    instructions: "Select the access control model that each scenario describes.",
    left: [
      "The owner of a shared folder decides who else may read or modify it.",
      "Documents carry Secret and Top Secret labels; access depends on clearance, and users cannot change it.",
      "Permissions are granted to job titles such as Nurse or Billing Clerk.",
      "Access is granted only when department is Finance, the device is compliant, and the request is during business hours.",
      "A router ACL denies traffic from a subnet according to administrator-defined rules applied to everyone."
    ],
    right: ["Discretionary (DAC)", "Mandatory (MAC)", "Role-based (RBAC)", "Attribute-based (ABAC)", "Rule-based", "Least privilege", "Federation"],
    answer: [0, 1, 2, 3, 4],
    unique: true,
    explanation: "DAC lets the owner assign permissions. MAC enforces labels and clearances set by the system and cannot be overridden by users. RBAC maps permissions to roles. ABAC evaluates multiple attributes of user, device, and context. Rule-based access applies system-wide rules regardless of the individual identity. Least privilege and federation are principles/concepts, not these models."
  },
  {
    id: "pbq-017", domain: 4, objective: "4.5", type: "config",
    title: "Replace insecure protocols",
    instructions: "Each service currently uses an insecure protocol. Select the secure replacement and its default port.",
    columns: [
      { key: "protocol", label: "Secure protocol", choices: ["SSH", "SFTP", "HTTPS", "IMAPS", "LDAPS", "SNMPv3", "FTPS"] },
      { key: "port", label: "Port", choices: ["22", "161", "443", "636", "990", "993"] }
    ],
    rows: [
      { label: "Remote administration (currently Telnet)", fixed: {}, answer: { protocol: "SSH", port: "22" } },
      { label: "File transfer over an SSH channel (currently FTP)", fixed: {}, answer: { protocol: "SFTP", port: "22" } },
      { label: "Web portal (currently HTTP)", fixed: {}, answer: { protocol: "HTTPS", port: "443" } },
      { label: "Mailbox retrieval (currently IMAP on 143)", fixed: {}, answer: { protocol: "IMAPS", port: "993" } },
      { label: "Directory queries (currently LDAP on 389)", fixed: {}, answer: { protocol: "LDAPS", port: "636" } }
    ],
    explanation: "Telnet is replaced by SSH (22). SFTP runs over SSH, so it also uses 22; FTPS (implicit port 990) is FTP wrapped in TLS and is the distractor. HTTPS is 443, IMAPS is 993, and LDAPS is 636. SNMPv3 uses port 161 and is a secure replacement for SNMPv1/v2, but none of these services are SNMP."
  },
  {
    id: "pbq-018", domain: 4, objective: "4.8", type: "order",
    title: "Forensic evidence acquisition",
    instructions: "Order the steps for acquiring and analyzing evidence from a seized laptop so that it stays admissible, first step at the top.",
    items: [
      "Verify the image hash matches the original",
      "Analyze the working copy of the image",
      "Secure and photograph the scene",
      "Report findings",
      "Create a bit-for-bit image of the original",
      "Record chain of custody and seize the device",
      "Attach the original drive through a write blocker and hash it"
    ],
    answer: [2, 5, 6, 4, 0, 1, 3],
    explanation: "Secure and document the scene first, then seize the device and start the chain of custody. Attach the original through a write blocker so it cannot be altered and hash it, then create a bit-for-bit image. Verifying the hashes match proves the copy is exact. Analysis is performed on a copy, never the original, and findings are reported last."
  },
  {
    id: "pbq-019", domain: 5, objective: "5.2", type: "match",
    title: "Match the risk response",
    instructions: "Select the risk management strategy used in each scenario.",
    left: [
      "The company buys a cyber insurance policy covering breach costs.",
      "Fixing a low-impact finding would cost more than the possible loss, so management signs off on leaving it.",
      "The company discontinues a product feature that creates unacceptable legal exposure.",
      "The team applies patches and puts a WAF in front of a vulnerable web app.",
      "Card payments are outsourced to a PCI-compliant processor."
    ],
    right: ["Accept", "Avoid", "Transfer", "Mitigate", "Residual risk", "Risk appetite"],
    answer: [2, 0, 1, 3, 2],
    explanation: "Insurance and outsourcing shift financial or operational burden to a third party (transfer). Knowingly living with a risk after cost-benefit analysis is acceptance. Eliminating the activity that causes the risk is avoidance. Reducing likelihood or impact with controls is mitigation. Residual risk is the risk that remains after controls are applied and risk appetite is the level of risk an organization is willing to take on; neither is a response strategy."
  },
  {
    id: "pbq-020", domain: 5, objective: "5.3", type: "match",
    title: "Match the agreement type",
    instructions: "Select the agreement or contract type that fits each description.",
    left: [
      "Guarantees 99.9% monthly uptime, with service credits for misses.",
      "Defines the specific deliverables, schedule, and payment for one project.",
      "Umbrella terms that govern future work orders between two companies.",
      "Non-binding document expressing shared intent between two agencies.",
      "Prohibits a contractor from disclosing proprietary information.",
      "Defines each partner's contributions and profit sharing in a joint venture."
    ],
    right: ["SLA", "MOU", "MSA", "SOW", "NDA", "BPA", "Right-to-audit clause"],
    answer: [0, 3, 2, 1, 4, 5],
    unique: true,
    explanation: "An SLA states measurable service levels. A SOW scopes a specific piece of work. An MSA sets general terms for repeated engagements. An MOU records mutual intent, often without legal enforceability. An NDA protects confidential information. A BPA sets out the relationship between business partners. A right-to-audit clause lets the customer assess vendor controls, but it was not described here."
  },
  {
    id: "pbq-021", domain: 5, objective: "5.2", type: "order",
    title: "Risk management process",
    instructions: "Put the steps of the risk management process in the correct order, first step at the top.",
    items: [
      "Select and apply a risk response",
      "Monitor and review residual risk",
      "Identify assets, threats, and vulnerabilities",
      "Record and prioritize risks in the risk register",
      "Analyze likelihood and impact"
    ],
    answer: [2, 4, 3, 0, 1],
    explanation: "Identify what must be protected and what could go wrong, then analyze likelihood and impact (qualitatively or quantitatively). Record and rank the results in the risk register, choose a response (accept, avoid, transfer, or mitigate), and continuously monitor the residual risk because it changes over time."
  },
  {
    id: "pbq-022", domain: 5, objective: "5.4", type: "config",
    title: "Assign data governance roles",
    instructions: "Select the data governance role that matches each description.",
    columns: [
      { key: "role", label: "Role", choices: ["Data owner", "Data custodian", "Data controller", "Data processor", "Data protection officer", "Data subject"] }
    ],
    rows: [
      { label: "The VP of HR, accountable for classifying payroll data and approving access to it", fixed: {}, answer: { role: "Data owner" } },
      { label: "The sysadmin who applies backups and encryption to the payroll database per policy", fixed: {}, answer: { role: "Data custodian" } },
      { label: "The company that determines why and how EU customer data is processed", fixed: {}, answer: { role: "Data controller" } },
      { label: "A cloud payroll vendor that processes data on the company's behalf", fixed: {}, answer: { role: "Data processor" } },
      { label: "The official who monitors GDPR compliance and advises leadership", fixed: {}, answer: { role: "Data protection officer" } }
    ],
    explanation: "The data owner is accountable for the data and decides classification and access. The custodian implements the technical controls. Under privacy regulation such as GDPR, the controller decides the purpose and means of processing, while the processor acts on the controller's behalf. The data protection officer oversees compliance. The data subject is the individual the data describes."
  }
);
