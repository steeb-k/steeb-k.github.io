// Domain 4: Security Operations (objectives 4.1-4.9)
window.SEC_BANK = window.SEC_BANK || [];
window.SEC_BANK.push(
  {
    id: "d4-001", domain: 4, objective: "4.1", type: "single",
    question: "A hospital IT team wants every new Windows server to be built identically and to be able to detect when a server's configuration drifts from the approved state. Which of the following should the team do FIRST?",
    options: ["Enable full-disk encryption on all servers","Deploy a host-based IDS to every server","Establish a secure baseline for the server build","Run a vulnerability scan on each server weekly"],
    answer: [2],
    explanation: "A secure baseline is the approved configuration that is deployed to systems and then maintained and compared against to detect drift. The other options are useful controls but do not define the standard state to measure against.",
    difficulty: 1, tags: ["secure baseline","hardening"]
  },
  {
    id: "d4-002", domain: 4, objective: "4.1", type: "multi",
    question: "A security administrator is hardening a newly installed Linux web server for a regional bank. Which of the following actions BEST reduce the server's attack surface? Choose TWO.",
    options: ["Disabling unused services and closing unneeded ports","Increasing the log retention period","Removing default accounts and changing default credentials","Enabling verbose debug logging on the web service","Installing a second network interface for management traffic"],
    answer: [0,2],
    explanation: "Disabling unneeded services/ports and eliminating default accounts and credentials remove entry points an attacker could use. Longer log retention and debug logging aid troubleshooting or detection rather than reducing exposure, and an extra interface adds another path to the host.",
    difficulty: 1, tags: ["hardening","attack surface","servers"]
  },
  {
    id: "d4-003", domain: 4, objective: "4.1", type: "single",
    question: "A manufacturing company is hardening programmable logic controllers on a SCADA network. The controllers run a real-time operating system and cannot be patched without a plant shutdown. Which of the following is the BEST compensating approach?",
    options: ["Enable automatic daily patching on each controller","Install an endpoint antivirus agent on each controller","Move the controllers to a public cloud provider","Segment the controllers onto an isolated network and restrict access with an ACL"],
    answer: [3],
    explanation: "ICS/SCADA and RTOS devices often cannot be patched or run agents, so network segmentation and access restrictions are the standard compensating hardening measures. Agents and daily patching are not supported on these devices, and cloud migration is impractical.",
    difficulty: 2, tags: ["ICS/SCADA","RTOS","segmentation"]
  },
  {
    id: "d4-004", domain: 4, objective: "4.1", type: "multi",
    question: "A network engineer is hardening a fleet of access-layer switches and routers. Which of the following actions should the engineer take? Choose TWO.",
    options: ["Replace Telnet with SSH for management access","Enable SNMPv1 with the default community string","Leave the default administrator credentials in place for vendor support","Disable unused physical switch ports","Set all ports to the same native VLAN as management"],
    answer: [0,3],
    explanation: "Encrypted management protocols and disabled unused ports are core network-device hardening steps. Default credentials, SNMPv1 with default community strings, and sharing the management VLAN all weaken the devices.",
    difficulty: 2, tags: ["hardening","switches","routers"]
  },
  {
    id: "d4-005", domain: 4, objective: "4.1", type: "single",
    question: "A retail chain is planning wireless coverage for a new warehouse with metal shelving and wants to identify dead zones and sources of interference before installing access points permanently. Which of the following should the network team perform?",
    options: ["A penetration test of the wireless network","A vulnerability scan of the access point firmware","A port scan of the warehouse subnet","A wireless site survey with a heat map"],
    answer: [3],
    explanation: "Site surveys measure signal strength and interference, and heat maps visualize coverage and dead zones to guide AP placement. The other activities assess security weaknesses, not RF coverage.",
    difficulty: 1, tags: ["site survey","heat map","wireless"]
  },
  {
    id: "d4-006", domain: 4, objective: "4.1", type: "single",
    question: "A company issues managed smartphones to its sales staff, who frequently connect to hotel and airport Wi-Fi to reach internal applications. The security team is concerned about rogue hotspots intercepting traffic. Which of the following MDM policies BEST addresses this concern?",
    options: ["Require a six-digit screen-lock PIN","Enforce an always-on VPN profile when the device is not on a trusted network","Enable selective remote wipe of the corporate container","Disable the cellular radio so all traffic uses Wi-Fi"],
    answer: [1],
    explanation: "Untrusted Wi-Fi is a risky connection method, and an MDM-enforced always-on VPN encrypts traffic so a rogue hotspot cannot read it. A screen-lock PIN and selective wipe protect a lost device, not traffic in transit, and forcing Wi-Fi over cellular increases exposure to untrusted networks.",
    difficulty: 2, tags: ["MDM","connection methods","Wi-Fi","VPN"]
  },
  {
    id: "d4-007", domain: 4, objective: "4.1", type: "single",
    question: "A company purchases smartphones, owns them, and allows employees to use them for both business and limited personal use. Which of the following deployment models does this describe?",
    options: ["BYOD","CYOD","COPE","SaaS"],
    answer: [2],
    explanation: "Corporate-owned, personally enabled (COPE) devices are purchased by the company and allow personal use. BYOD uses employee-owned devices, and CYOD lets users choose from an approved list of devices.",
    difficulty: 1, tags: ["COPE","deployment models","mobile"]
  },
  {
    id: "d4-008", domain: 4, objective: "4.1", type: "single",
    question: "A school district is upgrading its wireless network. The district wants to stop offline dictionary attacks against the pre-shared key and provide forward secrecy for open guest networks. Which of the following should be implemented?",
    options: ["WPA2 with TKIP","WPA3 with SAE and Enhanced Open","WPA2-Personal with a longer passphrase","WEP with a rotating key"],
    answer: [1],
    explanation: "WPA3 replaces the PSK exchange with Simultaneous Authentication of Equals (SAE), resisting offline dictionary attacks, and Enhanced Open (OWE) encrypts guest traffic. WEP and TKIP are deprecated, and a longer WPA2 passphrase is still susceptible to offline cracking.",
    difficulty: 2, tags: ["WPA3","SAE","wireless security"]
  },
  {
    id: "d4-009", domain: 4, objective: "4.1", type: "single",
    question: "A company wants each employee to authenticate to the corporate wireless network with individual credentials that are validated centrally, rather than sharing one passphrase. Which of the following should be deployed?",
    options: ["WPA3-Enterprise with a RADIUS server","MAC address filtering","A captive portal with a shared voucher","WPA3-Personal with a rotated passphrase"],
    answer: [0],
    explanation: "Enterprise mode uses 802.1X with a RADIUS server to authenticate individual users against a central directory. Shared passphrases, vouchers, and MAC filtering do not provide per-user authentication.",
    difficulty: 2, tags: ["RADIUS","802.1X","WPA3"]
  },
  {
    id: "d4-010", domain: 4, objective: "4.1", type: "single",
    question: "A security engineer is configuring 802.1X for wireless access using certificates on both the client and the authentication server. Which of the following EAP methods does this describe?",
    options: ["EAP-TLS","EAP-FAST","LEAP","PEAP"],
    answer: [0],
    explanation: "EAP-TLS requires mutual certificate authentication from both client and server. PEAP uses only a server certificate with a tunneled inner method, EAP-FAST uses protected access credentials, and LEAP is a legacy Cisco method.",
    difficulty: 3, tags: ["EAP-TLS","authentication protocols"]
  },
  {
    id: "d4-011", domain: 4, objective: "4.1", type: "multi",
    question: "A developer is reviewing a customer-facing web application for security improvements. Which of the following application security measures would help prevent injection and session hijacking? Choose TWO.",
    options: ["Setting the Secure and HttpOnly attributes on session cookies","Increasing the session timeout to 24 hours","Returning detailed stack traces to users","Storing session tokens in the URL","Input validation on all user-supplied fields"],
    answer: [0,4],
    explanation: "Input validation blocks malicious payloads, and Secure/HttpOnly cookies protect session tokens from interception and script access. Long timeouts, verbose errors, and tokens in URLs all increase risk.",
    difficulty: 2, tags: ["input validation","secure cookies","application security"]
  },
  {
    id: "d4-012", domain: 4, objective: "4.1", type: "single",
    question: "A software company wants to ensure that customers can verify that downloaded installers were produced by the company and were not altered after release. Which of the following should the company implement?",
    options: ["Static code analysis","Code signing","Sandboxing","Input validation"],
    answer: [1],
    explanation: "Code signing uses a digital signature to prove publisher identity and integrity of the executable. Static analysis and input validation find or prevent flaws during development, and sandboxing isolates execution.",
    difficulty: 2, tags: ["code signing","application security"]
  },
  {
    id: "d4-013", domain: 4, objective: "4.1", type: "single",
    question: "A SOC analyst receives a suspicious executable attachment and wants to observe its behavior without risking production systems. Which of the following is the BEST approach?",
    options: ["Open the file on a developer workstation with antivirus disabled","Scan the file with the endpoint antivirus and rely on the verdict","Detonate the file in a sandbox","Block the sender's domain and delete the message"],
    answer: [2],
    explanation: "A sandbox is an isolated environment that lets analysts safely run the file and observe its behavior. Running it on a workstation risks infection, an antivirus verdict does not show behavior (and may miss new malware), and deleting the message provides no analysis.",
    difficulty: 1, tags: ["sandboxing","malware analysis"]
  },
  {
    id: "d4-014", domain: 4, objective: "4.1", type: "single",
    question: "A cloud engineer needs to harden a fleet of IaaS virtual machines and prove the configuration remained compliant over time. Which of the following is the MOST effective approach?",
    options: ["Harden each VM manually after deployment and document the steps","Deploy VMs from a hardened image and continuously monitor configuration against the baseline","Rely on the cloud provider to harden the guest operating systems","Deploy the provider's default marketplace image and review it annually"],
    answer: [1],
    explanation: "Hardened images enforce a consistent baseline at deployment and continuous monitoring detects drift, which is the maintain phase of a baseline. In IaaS the customer is responsible for guest OS hardening, manual steps are inconsistent, and an annual review of an unhardened default image does not prove ongoing compliance.",
    difficulty: 3, tags: ["baseline","IaaS","shared responsibility"]
  },
  {
    id: "d4-015", domain: 4, objective: "4.2", type: "single",
    question: "A company is decommissioning laptops that stored regulated customer data and will donate them to a local school. Which of the following sanitization methods is MOST appropriate?",
    options: ["Cryptographic erase or secure overwrite with verification","Deleting user profiles and emptying the recycle bin","Removing the asset tag before donation","Reformatting the drive with a quick format"],
    answer: [0],
    explanation: "Secure overwrite or cryptographic erase makes data unrecoverable while leaving the hardware reusable. Deleting files or quick formatting leaves recoverable data.",
    difficulty: 2, tags: ["sanitization","decommissioning"]
  },
  {
    id: "d4-016", domain: 4, objective: "4.2", type: "single",
    question: "A bank must dispose of failed hard drives that held highly sensitive data and cannot be reliably wiped. Which of the following should the bank do?",
    options: ["Overwrite the drives once and return them under warranty","Store the drives in a locked cabinet indefinitely","Sell the drives to a certified recycler without documentation","Physically destroy the drives and obtain a certificate of destruction"],
    answer: [3],
    explanation: "Destruction such as shredding is appropriate when sanitization is not possible, and a certification provides evidence for auditors. Returning or selling unsanitized media risks data exposure.",
    difficulty: 2, tags: ["destruction","certification","disposal"]
  },
  {
    id: "d4-017", domain: 4, objective: "4.2", type: "single",
    question: "An organization wants to track every server, laptop, and network device from purchase through retirement so that unsupported hardware can be identified. Which of the following BEST supports this goal?",
    options: ["An asset inventory with assigned ownership and classification","A business impact analysis","A network diagram updated annually","A software bill of materials"],
    answer: [0],
    explanation: "An enumerated inventory with ownership and classification supports the full asset lifecycle, including end-of-life tracking. A network diagram and BIA do not track individual assets, and an SBOM covers software components.",
    difficulty: 1, tags: ["asset inventory","ownership","classification"]
  },
  {
    id: "d4-018", domain: 4, objective: "4.2", type: "single",
    question: "A healthcare provider discovers it cannot find several laptops that were supposedly retired two years ago. Which of the following asset management practices would have MOST directly prevented this?",
    options: ["Applying stronger password complexity","Assignment/accounting with tracking of each asset through disposal","Using a different procurement vendor","Increasing the length of the data retention policy"],
    answer: [1],
    explanation: "Asset tracking and accounting through the disposal and decommissioning stage keeps retired devices accounted for. Password complexity, retention length, and vendor choice do not provide lifecycle visibility.",
    difficulty: 2, tags: ["asset tracking","lifecycle","disposal"]
  },
  {
    id: "d4-019", domain: 4, objective: "4.2", type: "single",
    question: "A company's legal team instructs IT that email related to a pending lawsuit must be preserved even though the standard retention schedule would delete it next month. Which of the following does this describe?",
    options: ["Data minimization","Legal hold","Data masking","Data sanitization"],
    answer: [1],
    explanation: "A legal hold suspends normal deletion so that potentially relevant data is preserved for litigation. Sanitization and minimization reduce or destroy data, and masking obscures values.",
    difficulty: 2, tags: ["data retention","legal hold"]
  },
  {
    id: "d4-020", domain: 4, objective: "4.2", type: "single",
    question: "A vendor announces that a router model used throughout a company's branch offices will no longer receive security updates after next quarter. Which of the following is the MOST significant security implication?",
    options: ["The router will immediately stop forwarding traffic","The device warranty will automatically extend","The device will no longer need to be inventoried","Newly discovered vulnerabilities will remain unpatched"],
    answer: [3],
    explanation: "End-of-life or end-of-support hardware no longer receives patches, leaving known flaws exploitable. The device continues to operate, but it should be planned for replacement and remain in inventory.",
    difficulty: 1, tags: ["end-of-life","end-of-support"]
  },
  {
    id: "d4-021", domain: 4, objective: "4.2", type: "multi",
    question: "A growing SaaS company is formalizing how it acquires hardware and software. Which of the following acquisition/procurement practices BEST support secure asset management? Choose TWO.",
    options: ["Allowing departments to buy SaaS tools on corporate cards to speed adoption","Requiring a security review of vendors and products before purchase","Deferring asset tagging until a device's first repair","Purchasing only through an approved process that records each item in the inventory on receipt","Accepting vendor default configurations to preserve support eligibility"],
    answer: [1,3],
    explanation: "Secure procurement vets vendors and products before purchase and routes acquisitions through a process that enters each asset into inventory so it can be assigned an owner and tracked. Card purchases create shadow IT, delayed tagging leaves assets untracked, and default configurations are a hardening problem.",
    difficulty: 2, tags: ["procurement","acquisition","asset inventory"]
  },
  {
    id: "d4-022", domain: 4, objective: "4.2", type: "multi",
    question: "A technician must sanitize solid-state drives removed from retired servers at a government agency before the drives leave the facility. Which of the following methods effectively prevent data recovery? Choose TWO.",
    options: ["Degaussing the drives","Cryptographic erase of the self-encrypting drives","Performing a quick format","Physically shredding the drives","Deleting and recreating the partitions"],
    answer: [1,3],
    explanation: "Cryptographic erase destroys the media encryption key so the stored data is unreadable, and shredding physically destroys the flash chips. SSDs are not magnetic, so degaussing does not erase them, and quick formats or partition changes leave the data recoverable.",
    difficulty: 3, tags: ["sanitization","SSD","destruction"]
  },
  {
    id: "d4-023", domain: 4, objective: "4.3", type: "single",
    question: "A security analyst wants a vulnerability scan that reports missing patches and local misconfigurations on Windows servers with the FEWEST false positives. Which of the following scan types should the analyst run?",
    options: ["Credentialed scan","External port scan","Passive network capture","Non-credentialed scan"],
    answer: [0],
    explanation: "Credentialed scans log in to the host and can inspect patch levels and configuration directly, giving more accurate results. Non-credentialed scans only see what is exposed over the network and produce more uncertainty.",
    difficulty: 2, tags: ["vulnerability scan","credentialed"]
  },
  {
    id: "d4-024", domain: 4, objective: "4.3", type: "single",
    question: "A development team wants to find flaws in a web application by sending crafted requests to the running application in a test environment. Which of the following techniques does this describe?",
    options: ["Static analysis","Dynamic analysis","Penetration test report review","Package monitoring"],
    answer: [1],
    explanation: "Dynamic analysis (DAST) tests an executing application, while static analysis examines source code without running it. Package monitoring tracks third-party component vulnerabilities.",
    difficulty: 1, tags: ["dynamic analysis","application security"]
  },
  {
    id: "d4-025", domain: 4, objective: "4.3", type: "single",
    question: "A newly disclosed flaw is found in an open-source logging library. The security team needs to determine quickly which internal applications include the library. Which of the following would BEST help?",
    options: ["Software bill of materials and package monitoring","NetFlow collection","A wireless site survey","Annual tabletop exercise"],
    answer: [0],
    explanation: "An SBOM and package monitoring identify third-party components and alert when they have known vulnerabilities. The other items do not map software dependencies.",
    difficulty: 2, tags: ["SBOM","package monitoring","supply chain"]
  },
  {
    id: "d4-026", domain: 4, objective: "4.3", type: "single",
    question: "A security team subscribes to a feed run by an industry information-sharing and analysis center to learn about vulnerabilities targeting its sector. Which of the following vulnerability identification sources is this?",
    options: ["Proprietary vendor scanner output","Bug bounty report","Threat feed from an information-sharing organization","Internal system audit"],
    answer: [2],
    explanation: "Information-sharing organizations such as ISACs distribute sector-specific threat and vulnerability intelligence, a form of threat feed. The other sources are internally or externally generated in different ways.",
    difficulty: 1, tags: ["threat feed","ISAC","OSINT"]
  },
  {
    id: "d4-027", domain: 4, objective: "4.3", type: "single",
    question: "A company invites independent researchers to find and privately report flaws in its public web application in exchange for monetary rewards. Which of the following is this program?",
    options: ["System audit","Red team engagement","Bug bounty","Vulnerability scan"],
    answer: [2],
    explanation: "A bug bounty pays external researchers for responsibly disclosed vulnerabilities. A red team is a contracted adversary simulation, and audits and scans are internal or scheduled assessments.",
    difficulty: 1, tags: ["bug bounty","responsible disclosure"]
  },
  {
    id: "d4-028", domain: 4, objective: "4.3", type: "single",
    question: "A scanner reports that a Linux server is vulnerable to a flaw in a specific web server version, but the analyst finds that the server runs a patched build that only reports the older banner. Which of the following describes this finding?",
    options: ["True positive","False positive","False negative","Zero-day"],
    answer: [1],
    explanation: "A false positive is a reported vulnerability that does not actually exist. A false negative would be a real vulnerability the scanner missed.",
    difficulty: 2, tags: ["false positive","analysis","confirmation"]
  },
  {
    id: "d4-029", domain: 4, objective: "4.3", type: "single",
    question: "A vulnerability scan returns hundreds of findings. Which of the following should the security team use FIRST to compare the inherent technical severity of the vulnerabilities?",
    options: ["CVE identifiers","CVSS base scores","Annualized rate of occurrence","Recovery time objective"],
    answer: [1],
    explanation: "The Common Vulnerability Scoring System rates the technical severity of a vulnerability on a 0-10 scale and is the standard starting point for prioritization. A CVE identifier names a specific vulnerability but does not score it, and ARO and RTO are risk and continuity metrics.",
    difficulty: 2, tags: ["CVSS","CVE","prioritization"]
  },
  {
    id: "d4-030", domain: 4, objective: "4.3", type: "multi",
    question: "Two vulnerabilities found at a hospital have the same CVSS base score of 7.5. The analyst must decide which to remediate first. Which of the following factors should MOST influence the decision? Choose TWO.",
    options: ["The year encoded in each CVE identifier","The business criticality of the affected system to patient care","Whether the affected system is exposed to the internet","Which scanner plugin family detected each finding","The CVSS base score of each vulnerability"],
    answer: [1,2],
    explanation: "Exposure and environmental/organizational impact adjust the real risk beyond the base score, so an internet-facing, business-critical system is prioritized. The base scores are identical and cannot break the tie, and the CVE year or scanner plugin family says nothing about risk to this organization.",
    difficulty: 3, tags: ["exposure","environmental variables","prioritization"]
  },
  {
    id: "d4-031", domain: 4, objective: "4.3", type: "single",
    question: "A server worth $200,000 would lose about 25 percent of its value if a specific vulnerability were exploited. Which of the following is the single loss expectancy, and what does the 25 percent represent?",
    options: ["$800,000; the exposure factor","$50,000; the exposure factor","$50,000; the annualized rate of occurrence","$200,000; the risk tolerance"],
    answer: [1],
    explanation: "SLE equals asset value times exposure factor, so $200,000 x 0.25 = $50,000. The 25 percent is the exposure factor, not the ARO or a tolerance level.",
    difficulty: 3, tags: ["exposure factor","SLE","risk analysis"]
  },
  {
    id: "d4-032", domain: 4, objective: "4.3", type: "single",
    question: "A critical vulnerability exists in a legacy medical imaging system whose vendor will not release a patch. The system must remain in service. Which of the following is the BEST remediation approach?",
    options: ["Apply compensating controls such as segmentation and document a formal exception","Ignore the finding because the system is old","Immediately uninstall the operating system","Disable the vulnerability scanner for that subnet"],
    answer: [0],
    explanation: "When patching is not possible, compensating controls such as segmentation reduce exposure, and a documented exception/exemption records management's acceptance of the residual risk within its risk tolerance. Ignoring the issue, removing the OS, or hiding it from scans is not a valid response.",
    difficulty: 2, tags: ["remediation","compensating controls","exception"]
  },
  {
    id: "d4-033", domain: 4, objective: "4.3", type: "multi",
    question: "A retail company wants to learn whether its customer credentials or exploits targeting its systems are being sold on criminal marketplaces. It also wants an authorized external team to actively attempt to exploit its internet-facing systems. Which of the following vulnerability identification methods should the company use? Choose TWO.",
    options: ["Credentialed vulnerability scanning","Dark web monitoring","Static code analysis","Penetration testing","Package monitoring"],
    answer: [1,3],
    explanation: "Dark web threat intelligence reveals stolen credentials and exploits being traded, and a penetration test actively attempts exploitation with authorization. Credentialed scans only detect weaknesses without exploiting them, and static analysis and package monitoring examine code and components rather than criminal markets or live exploitation.",
    difficulty: 2, tags: ["dark web","penetration testing","threat feed"]
  },
  {
    id: "d4-034", domain: 4, objective: "4.3", type: "single",
    question: "After deploying a critical patch to a fleet of servers, the security team wants to confirm the vulnerability is no longer present. Which of the following should the team do?",
    options: ["Archive the original scan report","Increase the CVSS threshold","Disable the affected service","Rescan the servers"],
    answer: [3],
    explanation: "Rescanning is the standard validation step that verifies remediation succeeded. Archiving, changing thresholds, or disabling services does not prove the vulnerability is fixed.",
    difficulty: 1, tags: ["validation","rescanning","verification"]
  },
  {
    id: "d4-035", domain: 4, objective: "4.3", type: "single",
    question: "A CISO asks for a monthly vulnerability management report for the executive team. Which of the following content is MOST appropriate?",
    options: ["Packet captures from each scan","Raw scanner output listing every plugin ID","Trends in open critical vulnerabilities, time to remediate, and risk by business unit","Source code of the scanning tool"],
    answer: [2],
    explanation: "Executive reporting summarizes trends, remediation performance, and risk in business terms. Raw scanner data and packet captures are too detailed for decision makers.",
    difficulty: 2, tags: ["reporting","metrics","vulnerability management"]
  },
  {
    id: "d4-036", domain: 4, objective: "4.4", type: "single",
    question: "A SOC wants to centralize logs from firewalls, servers, and applications so analysts can correlate events and receive alerts from a single console. Which of the following should be deployed?",
    options: ["DLP","WAF","NAC","SIEM"],
    answer: [3],
    explanation: "A security information and event management system aggregates and correlates logs and generates alerts. DLP, NAC, and WAF are preventive or enforcement tools, not log correlation platforms.",
    difficulty: 1, tags: ["SIEM","log aggregation"]
  },
  {
    id: "d4-037", domain: 4, objective: "4.4", type: "single",
    question: "A SOC analyst team is overwhelmed by thousands of low-value alerts each day, and many are for benign administrative activity. Which of the following actions BEST addresses the problem?",
    options: ["Add more log sources without changing rules","Delete logs older than one day","Tune alert thresholds and rules to reduce false positives","Disable all alerting during business hours"],
    answer: [2],
    explanation: "Alert tuning refines detection thresholds and rules so analysts focus on meaningful events. Disabling alerting or deleting logs removes visibility, and adding sources increases noise.",
    difficulty: 2, tags: ["alert tuning","false positives","monitoring"]
  },
  {
    id: "d4-038", domain: 4, objective: "4.4", type: "single",
    question: "A compliance team wants to automatically measure servers against a standardized set of configuration checks and express results in a common, machine-readable format. Which of the following BEST fits this need?",
    options: ["SCAP","SNMP","SPF","NetFlow"],
    answer: [0],
    explanation: "The Security Content Automation Protocol standardizes how vulnerability and configuration checks are expressed and evaluated. SNMP monitors devices, NetFlow records traffic metadata, and SPF is an email authentication record.",
    difficulty: 2, tags: ["SCAP","benchmarks","compliance"]
  },
  {
    id: "d4-039", domain: 4, objective: "4.4", type: "single",
    question: "A company is choosing between agent-based and agentless monitoring for remote laptops that are rarely connected to the corporate network. Which of the following is the BEST reason to choose agent-based monitoring?",
    options: ["The agent can collect and forward telemetry regardless of the laptop's network location","Agent-based monitoring requires no software maintenance or updates","Agentless monitoring cannot authenticate to Windows hosts","Agent-based monitoring eliminates the need for a central log server"],
    answer: [0],
    explanation: "An installed agent can report telemetry from roaming devices, while agentless methods typically require the device to be reachable on the network when polled. Agents must be maintained and still forward to a central collector, and agentless tools can use credentials to query hosts.",
    difficulty: 2, tags: ["agent-based","agentless","monitoring"]
  },
  {
    id: "d4-040", domain: 4, objective: "4.4", type: "single",
    question: "A network administrator wants a managed switch to immediately notify the monitoring server when a power supply fails, without waiting for the server to poll it. Which of the following should be configured?",
    options: ["Port mirroring","Syslog archiving","SNMP traps","NetFlow export"],
    answer: [2],
    explanation: "SNMP traps are unsolicited alerts sent by a managed device to a management station when an event occurs. NetFlow exports traffic statistics, and port mirroring copies traffic for capture.",
    difficulty: 2, tags: ["SNMP traps","network monitoring"]
  },
  {
    id: "d4-041", domain: 4, objective: "4.4", type: "single",
    question: "An analyst needs to identify which internal host is sending large volumes of data to an unfamiliar external IP address, but does not need packet payloads. Which of the following data sources is MOST efficient?",
    options: ["NetFlow records","Vulnerability scan results","Full packet captures","Endpoint antivirus logs"],
    answer: [0],
    explanation: "NetFlow summarizes conversations (source, destination, ports, bytes) and is lightweight for spotting anomalous volumes. Full packet captures are heavier than needed, and the other sources do not show traffic volumes.",
    difficulty: 2, tags: ["NetFlow","traffic analysis"]
  },
  {
    id: "d4-042", domain: 4, objective: "4.4", type: "single",
    question: "A law firm wants to detect and block an employee from emailing a spreadsheet containing client Social Security numbers to a personal webmail account. Which of the following tools BEST meets this requirement?",
    options: ["DLP","NetFlow collector","SIEM","Vulnerability scanner"],
    answer: [0],
    explanation: "Data loss prevention inspects content and context, and can block or quarantine sensitive data leaving the organization. A SIEM only alerts after the fact, and scanners and NetFlow do not inspect content.",
    difficulty: 1, tags: ["DLP","data exfiltration"]
  },
  {
    id: "d4-043", domain: 4, objective: "4.4", type: "multi",
    question: "A hospital's monitoring program must detect known malware on clinical workstations and identify missing patches and misconfigurations on its servers. Which of the following tools should be included? Choose TWO.",
    options: ["SNMP traps","Antivirus","NetFlow collector","Vulnerability scanner","DLP"],
    answer: [1,3],
    explanation: "Antivirus monitors endpoints for known malware signatures and can quarantine detections, and a vulnerability scanner identifies missing patches and misconfigurations. SNMP traps report device events, NetFlow summarizes traffic, and DLP watches sensitive data movement.",
    difficulty: 1, tags: ["antivirus","vulnerability scanner","monitoring tools"]
  },
  {
    id: "d4-044", domain: 4, objective: "4.4", type: "single",
    question: "A financial regulator requires that a company keep security logs for seven years but only review the most recent 90 days regularly. Which of the following monitoring activities addresses the long-term requirement?",
    options: ["Alert tuning","Scanning","Quarantine","Archiving"],
    answer: [3],
    explanation: "Archiving moves older logs to long-term storage to meet retention requirements while keeping the active store small. Tuning, quarantine, and scanning serve other purposes.",
    difficulty: 1, tags: ["archiving","log retention"]
  },
  {
    id: "d4-045", domain: 4, objective: "4.4", type: "single",
    question: "A SIEM raises a high-severity alert that an employee workstation is beaconing to a known command-and-control server. Which of the following is the BEST immediate response action?",
    options: ["Reimage the workstation before collecting any evidence","Quarantine the workstation from the network and begin investigation","Archive the alert and wait for the next scan","Tune the alert to a lower severity"],
    answer: [1],
    explanation: "Alert response includes isolating the affected system to limit spread while preserving it for analysis. Lowering severity or waiting ignores the threat, and reimaging first destroys evidence.",
    difficulty: 2, tags: ["alert response","quarantine","SIEM"]
  },
  {
    id: "d4-046", domain: 4, objective: "4.4", type: "single",
    question: "A security engineer uses a CIS benchmark to evaluate server configurations and finds many settings failing. Which of the following BEST describes how the benchmark should be used?",
    options: ["As an incident response plan","As a log retention policy","As a vetted configuration standard to compare against and remediate deviations","As a replacement for vulnerability scanning"],
    answer: [2],
    explanation: "Benchmarks provide consensus hardening guidance that systems are measured against, complementing but not replacing vulnerability scans. They are not log or IR documents.",
    difficulty: 3, tags: ["benchmarks","CIS","SCAP"]
  },
  {
    id: "d4-047", domain: 4, objective: "4.5", type: "single",
    question: "A firewall administrator reviews the following rules, processed top-down:\n1. Allow TCP any -> 10.0.5.20 port 443\n2. Deny TCP any -> 10.0.5.0/24 any\n3. Allow TCP 10.0.9.0/24 -> 10.0.5.20 port 22\nAn administrator at 10.0.9.15 cannot SSH to 10.0.5.20. Which of the following is the BEST fix?",
    options: ["Add an allow rule for port 22 at the bottom","Change rule 2 to allow","Delete rule 1","Move rule 3 above rule 2"],
    answer: [3],
    explanation: "Firewalls evaluate rules in order and stop at the first match, so the broad deny in rule 2 blocks SSH before rule 3 is reached. Specific allows must precede broader denies; adding a rule at the bottom would have the same problem.",
    difficulty: 3, tags: ["firewall rules","ACL","rule order"]
  },
  {
    id: "d4-048", domain: 4, objective: "4.5", type: "single",
    question: "A company hosts a public web server and wants it reachable from the internet while preventing a compromise of that server from providing direct access to the internal network. Which of the following architectures is BEST?",
    options: ["Place the server in a screened subnet","Place the server in the same VLAN as the domain controllers","Place the server on the internal LAN","Connect the server directly to the internet without a firewall"],
    answer: [0],
    explanation: "A screened subnet (formerly DMZ) isolates public-facing services between two firewall boundaries. Placing the server on the internal LAN or beside domain controllers exposes sensitive systems if it is compromised.",
    difficulty: 1, tags: ["screened subnet","DMZ","firewall"]
  },
  {
    id: "d4-049", domain: 4, objective: "4.5", type: "single",
    question: "A security team wants a device that sits in-line with traffic and automatically drops packets matching known exploit signatures rather than only generating alerts. Which of the following should be deployed?",
    options: ["IDS in promiscuous mode","Network tap","IPS","NetFlow collector"],
    answer: [2],
    explanation: "An intrusion prevention system operates in-line and can block traffic in real time, while an IDS only detects and alerts. A tap and NetFlow collector provide visibility without enforcement.",
    difficulty: 2, tags: ["IPS","IDS","signatures"]
  },
  {
    id: "d4-050", domain: 4, objective: "4.5", type: "single",
    question: "A SOC wants endpoint telemetry to be correlated with email, identity, and cloud workload data into a single detection and response platform. Which of the following BEST describes this solution?",
    options: ["Host-based firewall","DNS sinkhole","XDR","Antivirus"],
    answer: [2],
    explanation: "Extended detection and response extends EDR by integrating telemetry from multiple security layers for cross-domain correlation. Traditional antivirus and a host firewall provide narrower, local protection.",
    difficulty: 2, tags: ["XDR","EDR"]
  },
  {
    id: "d4-051", domain: 4, objective: "4.5", type: "single",
    question: "A school wants to block students from accessing gambling and adult websites on school-owned laptops, both on campus and at home. Which of the following is the BEST solution?",
    options: ["MAC address filtering on the wireless access points","A network tap at the campus edge","An agent-based web filter with content categorization","A firewall rule blocking port 25"],
    answer: [2],
    explanation: "An agent-based web filter enforces URL category policies on the device wherever it is. A centralized proxy would only protect on-campus traffic, and port or MAC filtering does not categorize websites.",
    difficulty: 2, tags: ["web filter","content categorization","agent-based"]
  },
  {
    id: "d4-052", domain: 4, objective: "4.5", type: "single",
    question: "An administrator needs to enforce a password policy and disable USB storage on all domain-joined Windows workstations from a central location. Which of the following should be used?",
    options: ["SNMP","NetFlow","Group Policy","SELinux"],
    answer: [2],
    explanation: "Group Policy Objects in Active Directory centrally enforce operating system and security settings on Windows computers. SELinux applies to Linux, and NetFlow and SNMP are monitoring technologies.",
    difficulty: 1, tags: ["Group Policy","operating system security"]
  },
  {
    id: "d4-053", domain: 4, objective: "4.5", type: "single",
    question: "A Linux web server is compromised through a vulnerable application, but the attacker is unable to read files outside the web server's directories because mandatory policy confines the process. Which of the following is MOST likely in use?",
    options: ["ARP inspection","Group Policy","TLS inspection","SELinux"],
    answer: [3],
    explanation: "SELinux enforces mandatory access control policies that confine processes to the resources they need, limiting damage from a compromised service. Group Policy is Windows-specific, and ARP and TLS inspection are network functions.",
    difficulty: 2, tags: ["SELinux","MAC","Linux"]
  },
  {
    id: "d4-054", domain: 4, objective: "4.5", type: "multi",
    question: "A company still uses FTP and HTTP for several internal services that transmit credentials. Which of the following should the security team implement to protect these services? Choose TWO.",
    options: ["Enable anonymous access to simplify logging","Replace FTP with SFTP or FTPS","Replace HTTP with HTTPS","Change FTP to a nonstandard port","Switch HTTP to port 8080"],
    answer: [1,2],
    explanation: "SFTP/FTPS and HTTPS encrypt data in transit and protect credentials. Changing port numbers is obscurity only and does not add encryption, and anonymous access reduces security.",
    difficulty: 2, tags: ["secure protocols","SFTP","HTTPS"]
  },
  {
    id: "d4-055", domain: 4, objective: "4.5", type: "single",
    question: "An organization wants to prevent users from resolving domains known to host malware or phishing sites, regardless of the application making the request. Which of the following BEST accomplishes this?",
    options: ["A centralized web proxy with URL filtering","DNS filtering","A host-based firewall allowing only port 53","Port security on switches"],
    answer: [1],
    explanation: "DNS filtering blocks resolution of malicious or categorized domains for every application that uses DNS. A web proxy only filters traffic sent through it (typically HTTP/S), port security controls switch-port access, and allowing port 53 does not filter anything.",
    difficulty: 2, tags: ["DNS filtering","phishing","malware"]
  },
  {
    id: "d4-056", domain: 4, objective: "4.5", type: "single",
    question: "A company wants receiving mail servers to verify that messages claiming to be from its domain were sent from authorized mail servers. Which of the following DNS records should the administrator publish?",
    options: ["DKIM","DMARC","MX with a lower priority","SPF"],
    answer: [3],
    explanation: "Sender Policy Framework lists the mail servers authorized to send for a domain. DKIM verifies a cryptographic signature on the message rather than the sending server, DMARC sets policy and reporting based on SPF/DKIM results, and MX records direct inbound mail.",
    difficulty: 2, tags: ["SPF","email security"]
  },
  {
    id: "d4-057", domain: 4, objective: "4.5", type: "single",
    question: "A company has deployed SPF and DKIM but still sees spoofed messages delivered to recipients. The company wants receiving servers to know how to handle messages that fail authentication and to receive reports. Which of the following should be configured?",
    options: ["TLS for SMTP","A spam filter whitelist","DMARC","S/MIME on all mailboxes"],
    answer: [2],
    explanation: "DMARC ties SPF and DKIM results to the visible From domain, tells receivers whether to none, quarantine, or reject failures, and provides reporting. TLS only encrypts transport, and a whitelist increases spoofing risk.",
    difficulty: 3, tags: ["DMARC","DKIM","SPF"]
  },
  {
    id: "d4-058", domain: 4, objective: "4.5", type: "single",
    question: "After a breach, an investigator discovers that attackers modified system binaries and a configuration file on a server without anyone noticing. Which of the following controls would have BEST detected this?",
    options: ["Content filtering","File integrity monitoring","Load balancing","DNS filtering"],
    answer: [1],
    explanation: "File integrity monitoring compares files against known-good hashes and alerts when critical files change. Content and DNS filtering and load balancing do not track file modifications.",
    difficulty: 2, tags: ["FIM","integrity"]
  },
  {
    id: "d4-059", domain: 4, objective: "4.5", type: "single",
    question: "A visitor plugs an unmanaged laptop into a conference-room wall jack and receives network access to internal servers. The company wants only compliant, authenticated devices to gain access. Which of the following should be implemented?",
    options: ["Proxy caching","Content filtering","Network access control","A honeypot"],
    answer: [2],
    explanation: "NAC checks the identity and posture of a device before allowing it onto the network, and can place noncompliant devices in a quarantine VLAN. Content filtering, honeypots, and proxies do not control port-level access.",
    difficulty: 2, tags: ["NAC","802.1X","posture"]
  },
  {
    id: "d4-060", domain: 4, objective: "4.5", type: "single",
    question: "A bank wants to detect when an employee account suddenly logs in at 3 a.m. from a new country and downloads thousands of files, even though no signature matches. Which of the following capabilities BEST provides this?",
    options: ["User behavior analytics","Static code analysis","Port scanning","File integrity monitoring"],
    answer: [0],
    explanation: "User behavior analytics baselines normal activity and flags anomalies such as unusual times, locations, and volumes. FIM, code analysis, and port scanning do not model user behavior.",
    difficulty: 3, tags: ["UBA","anomaly detection"]
  },
  {
    id: "d4-061", domain: 4, objective: "4.6", type: "single",
    question: "An employee in the finance department resigns and leaves the company at the end of the day. Which of the following should the IAM team do FIRST to reduce risk?",
    options: ["Disable the employee's accounts and revoke access","Wait 90 days before removing the account","Transfer the account to the employee's manager","Reset the account to the default password"],
    answer: [0],
    explanation: "Timely deprovisioning removes access when employment ends and prevents misuse of orphaned accounts. Leaving the account active, with a default password, or shared invites unauthorized access.",
    difficulty: 1, tags: ["deprovisioning","account lifecycle"]
  },
  {
    id: "d4-062", domain: 4, objective: "4.6", type: "single",
    question: "A bank onboarding new online customers requires them to upload a government-issued ID and take a live selfie that is matched to the ID photo before an account is created. Which of the following IAM concepts does this describe?",
    options: ["Attestation","Single sign-on","Identity proofing","Federation"],
    answer: [2],
    explanation: "Identity proofing verifies that a person is who they claim to be before credentials are issued. Federation and SSO concern authentication across systems, and attestation is a periodic review of access.",
    difficulty: 2, tags: ["identity proofing","onboarding"]
  },
  {
    id: "d4-063", domain: 4, objective: "4.6", type: "single",
    question: "A university allows students from partner schools to log in to its research portal using their home institution's credentials, without the university creating separate accounts. Which of the following is being used?",
    options: ["Local accounts","Directory synchronization via LDAP","Password vaulting","Federation"],
    answer: [3],
    explanation: "Federation establishes trust between identity providers and service providers so that users authenticate with their home organization. Local accounts and LDAP synchronization would create or copy accounts in the university's directory, and vaulting stores privileged credentials.",
    difficulty: 2, tags: ["federation","SSO","SAML"]
  },
  {
    id: "d4-064", domain: 4, objective: "4.6", type: "single",
    question: "A user wants to let a third-party calendar application read their email contacts without giving the application their password. Which of the following protocols is designed for this delegated authorization?",
    options: ["OAuth","Kerberos","RADIUS","LDAP"],
    answer: [0],
    explanation: "OAuth issues access tokens that grant limited, delegated access to resources without sharing the user's credentials. LDAP is a directory protocol, Kerberos is ticket-based authentication, and RADIUS provides network AAA.",
    difficulty: 2, tags: ["OAuth","SSO","authorization"]
  },
  {
    id: "d4-065", domain: 4, objective: "4.6", type: "single",
    question: "A company wants employees to authenticate once to a cloud identity provider and then access multiple SaaS applications using XML-based assertions. Which of the following BEST fits?",
    options: ["OpenID Connect","SAML","LDAP","TACACS+"],
    answer: [1],
    explanation: "Security Assertion Markup Language exchanges XML assertions between an identity provider and service providers to enable web SSO. OpenID Connect also provides SSO but uses JSON web tokens on top of OAuth, LDAP is a directory protocol, and TACACS+ provides device administration AAA.",
    difficulty: 2, tags: ["SAML","SSO","interoperability"]
  },
  {
    id: "d4-066", domain: 4, objective: "4.6", type: "single",
    question: "A government agency needs to grant access to documents based on a combination of the user's clearance, department, device compliance, and the document's classification, evaluated at the time of each request. Which of the following access control models BEST fits?",
    options: ["Attribute-based access control","Role-based access control","Rule-based access control","Discretionary access control"],
    answer: [0],
    explanation: "ABAC evaluates multiple attributes of the subject, resource, and environment dynamically. RBAC uses static roles, DAC lets owners assign access, and rule-based control applies fixed system rules.",
    difficulty: 3, tags: ["ABAC","access control models"]
  },
  {
    id: "d4-067", domain: 4, objective: "4.6", type: "single",
    question: "In a military environment, the operating system assigns security labels to files and users, and individual owners cannot change who may access a file. Which of the following access control models is this?",
    options: ["Mandatory access control","Time-of-day restrictions","Role-based access control","Discretionary access control"],
    answer: [0],
    explanation: "MAC enforces access using system-controlled labels and clearances that users cannot override. DAC lets owners grant access, and RBAC bases access on job role.",
    difficulty: 2, tags: ["MAC","access control models"]
  },
  {
    id: "d4-068", domain: 4, objective: "4.6", type: "single",
    question: "A company wants to ensure that hourly warehouse employees can only log in to the inventory system during their scheduled shifts. Which of the following controls BEST achieves this?",
    options: ["Time-of-day restrictions","Single sign-on","Password expiration","Account lockout"],
    answer: [0],
    explanation: "Time-of-day restrictions limit when an account may authenticate. Expiration, lockout, and SSO do not enforce shift-based access windows.",
    difficulty: 1, tags: ["time-of-day","access control"]
  },
  {
    id: "d4-069", domain: 4, objective: "4.6", type: "single",
    question: "During a quarterly review, department managers confirm which of their team members still need access to sensitive applications, and unnecessary entitlements are removed. Which of the following IAM activities is this?",
    options: ["Identity proofing","Federation","Attestation","Provisioning"],
    answer: [2],
    explanation: "Attestation is a periodic review in which owners certify that access remains appropriate, supporting least privilege. Provisioning creates accounts, identity proofing verifies a person's identity before issuing credentials, and federation establishes cross-organization trust.",
    difficulty: 2, tags: ["attestation","least privilege","access review"]
  },
  {
    id: "d4-070", domain: 4, objective: "4.6", type: "multi",
    question: "A security architect is designing multifactor authentication for remote administrators. Which of the following combinations include two DIFFERENT authentication factors? Choose TWO.",
    options: ["Username and password","Password and hardware security key","Fingerprint and smart card","Security question and password","PIN and password"],
    answer: [1,2],
    explanation: "A password (knowledge) plus a security key (possession), and a fingerprint (inherence) plus a smart card (possession), each use two different factor types. PIN and password, security questions, and username with password are all knowledge factors.",
    difficulty: 2, tags: ["MFA","authentication factors"]
  },
  {
    id: "d4-071", domain: 4, objective: "4.6", type: "single",
    question: "A cloud provider blocks sign-in attempts from countries where the company has no employees, even when the correct password and one-time code are supplied. Which authentication factor attribute does this represent?",
    options: ["Something you have","Somewhere you are","Something you are","Something you know"],
    answer: [1],
    explanation: "Location-based checks such as geofencing or IP geolocation represent the somewhere-you-are attribute. Passwords are knowledge, codes and tokens are possession, and biometrics are inherence.",
    difficulty: 2, tags: ["MFA","location","conditional access"]
  },
  {
    id: "d4-072", domain: 4, objective: "4.6", type: "single",
    question: "A school district's password policy enforces a password history of 10 and a 90-day expiration. An audit finds that users change their password 10 times in a few minutes so they can reuse their original password. Which of the following settings should be configured to stop this?",
    options: ["Maximum password age","Password complexity","Minimum password age","Account lockout threshold"],
    answer: [2],
    explanation: "A minimum password age prevents users from changing a password again until a set time passes, so they cannot quickly cycle through the history to reuse an old password. Maximum age forces expiration, complexity controls composition, and lockout responds to failed logins.",
    difficulty: 3, tags: ["password concepts","password age","reuse"]
  },
  {
    id: "d4-073", domain: 4, objective: "4.6", type: "single",
    question: "A company wants to eliminate password-based phishing by letting users sign in with a device-bound cryptographic key unlocked by a fingerprint. Which of the following approaches does this describe?",
    options: ["Passwordless authentication using FIDO2 passkeys","A password manager that autofills unique passwords","Periodic password expiration","Security questions"],
    answer: [0],
    explanation: "Passkeys based on FIDO2/WebAuthn replace passwords with device-bound public-key credentials that cannot be phished. A password manager, expiration, and security questions still rely on shared secrets that a user can be tricked into revealing.",
    difficulty: 2, tags: ["passwordless","FIDO2","passkeys"]
  },
  {
    id: "d4-074", domain: 4, objective: "4.6", type: "multi",
    question: "A company wants to eliminate standing domain administrator privileges. Administrators should receive elevated rights only after a request is approved, check out credentials from a secured store, and use credentials that become invalid when the task ends. Which of the following PAM capabilities meet these requirements? Choose THREE.",
    options: ["Just-in-time permissions","Password vaulting","Ephemeral credentials","Permanent Domain Admins membership assigned through RBAC","Federation with a partner identity provider","Time-of-day restrictions"],
    answer: [0,1,2],
    explanation: "JIT permissions grant elevation on approval for a limited time, vaulting stores and checks out privileged credentials, and ephemeral credentials expire after use. Permanent group membership is standing privilege, federation addresses cross-organization SSO, and time-of-day restrictions apply a fixed schedule rather than approval-based elevation.",
    difficulty: 2, tags: ["PAM","just-in-time","password vaulting","ephemeral credentials"]
  },
  {
    id: "d4-075", domain: 4, objective: "4.7", type: "single",
    question: "A growing company wants new hires to receive the correct accounts, group memberships, and licenses automatically when HR creates their record. Which of the following automation use cases is this?",
    options: ["User provisioning","Ticket escalation","Guard rails","Continuous integration"],
    answer: [0],
    explanation: "Automated user provisioning creates and configures accounts based on HR triggers, improving speed and consistency. The other use cases address code builds, policy limits, and incident workflows.",
    difficulty: 1, tags: ["automation","user provisioning"]
  },
  {
    id: "d4-076", domain: 4, objective: "4.7", type: "single",
    question: "A cloud team wants to prevent developers from accidentally deploying storage buckets that are publicly accessible, while still letting them provision resources themselves. Which of the following automation concepts BEST fits?",
    options: ["Technical debt","Guard rails","Ticket creation","Workforce multiplier"],
    answer: [1],
    explanation: "Guard rails are automated policy checks that constrain what can be provisioned so that insecure configurations are blocked. Ticketing records issues but does not prevent them.",
    difficulty: 2, tags: ["guard rails","resource provisioning","cloud"]
  },
  {
    id: "d4-077", domain: 4, objective: "4.7", type: "multi",
    question: "A security manager is justifying investment in security orchestration and automation. Which of the following are benefits? Choose TWO.",
    options: ["Guaranteed prevention of zero-day attacks","Consistent enforcement of secure baselines","Faster reaction time to incidents","Elimination of all false positives","Removal of the need for security staff"],
    answer: [1,2],
    explanation: "Automation shortens response time and enforces standard configurations consistently. It does not eliminate false positives or zero-days, and it augments rather than replaces staff.",
    difficulty: 2, tags: ["automation benefits","SOAR","baselines"]
  },
  {
    id: "d4-078", domain: 4, objective: "4.7", type: "single",
    question: "A company has automated its firewall changes with scripts written by a single engineer who is leaving. No one else understands them, and a script failure would halt all rule updates. Which of the following automation considerations is MOST directly illustrated?",
    options: ["Technical debt and single point of failure","Standardized infrastructure configuration","Reduced cost","Improved employee retention"],
    answer: [0],
    explanation: "Undocumented, unsupported automation creates technical debt and a single point of failure, and raises ongoing supportability concerns. The other options are benefits of well-managed automation.",
    difficulty: 3, tags: ["automation considerations","technical debt","supportability"]
  },
  {
    id: "d4-079", domain: 4, objective: "4.7", type: "multi",
    question: "When a SIEM detects ransomware-like behavior on an endpoint, a playbook automatically isolates the host from the network, opens a ticket, and pages the on-call responder if the alert is not acknowledged within 10 minutes. Which of the following automation use cases does this playbook demonstrate? Choose THREE.",
    options: ["Enabling/disabling services and access","Ticket creation","Escalation","User provisioning","Continuous integration and testing","Guard rails"],
    answer: [0,1,2],
    explanation: "Isolating the host disables its access, opening a ticket is ticket creation, and paging after an unacknowledged timeout is escalation. User provisioning handles account creation, CI/testing applies to code pipelines, and guard rails constrain what can be deployed.",
    difficulty: 2, tags: ["SOAR","playbook","escalation"]
  },
  {
    id: "d4-080", domain: 4, objective: "4.7", type: "single",
    question: "A DevSecOps team wants every code commit to trigger automated static analysis and unit tests before it can be merged. Which of the following automation use cases is this?",
    options: ["User provisioning","Escalation","Security group maintenance","Continuous integration and testing"],
    answer: [3],
    explanation: "CI pipelines automatically build and test code on each commit, catching defects and vulnerabilities early. The other use cases do not involve code testing.",
    difficulty: 1, tags: ["CI/CD","DevSecOps","automation"]
  },
  {
    id: "d4-081", domain: 4, objective: "4.7", type: "single",
    question: "A security team wants its vulnerability scanner, ticketing system, and endpoint platform to exchange data and trigger actions in one another without manual steps. Which of the following BEST enables this?",
    options: ["Manual runbooks","Integrations and APIs","Air-gapped networks","Separate administrative consoles"],
    answer: [1],
    explanation: "APIs and integrations let tools share data and drive each other's actions, which is the foundation of orchestration. Manual runbooks and separate consoles require human handoffs.",
    difficulty: 2, tags: ["APIs","integration","orchestration"]
  },
  {
    id: "d4-082", domain: 4, objective: "4.8", type: "single",
    question: "Which of the following lists the incident response process phases in the correct order?",
    options: ["Preparation, detection, analysis, containment, eradication, recovery, lessons learned","Preparation, analysis, detection, eradication, containment, lessons learned, recovery","Detection, preparation, eradication, containment, analysis, recovery, lessons learned","Preparation, containment, detection, analysis, recovery, eradication, lessons learned"],
    answer: [0],
    explanation: "The SY0-701 process is preparation, detection, analysis, containment, eradication, recovery, and lessons learned. The other orderings place containment, eradication, or recovery out of sequence.",
    difficulty: 1, tags: ["incident response","process"]
  },
  {
    id: "d4-083", domain: 4, objective: "4.8", type: "single",
    question: "An IDS alerts that a server in a retail company may be communicating with a known malicious IP address. According to the incident response process, which of the following should the analyst do NEXT?",
    options: ["Eradicate the malware from all servers","Analyze the alert to confirm whether it is a true incident and determine its scope","Restore the server from backup","Hold a lessons learned meeting"],
    answer: [1],
    explanation: "After detection comes analysis, which validates the incident and scopes its impact. Eradication, recovery, and lessons learned come later in the process.",
    difficulty: 2, tags: ["incident response","analysis","detection"]
  },
  {
    id: "d4-084", domain: 4, objective: "4.8", type: "single",
    question: "Ransomware is spreading across file shares in a manufacturing company. The responder disconnects the affected segments from the rest of the network to stop further encryption. Which phase of incident response is this?",
    options: ["Containment","Eradication","Recovery","Preparation"],
    answer: [0],
    explanation: "Isolating affected systems to limit the spread is containment. Eradication removes the malicious artifacts, and recovery restores normal operations.",
    difficulty: 2, tags: ["containment","incident response"]
  },
  {
    id: "d4-085", domain: 4, objective: "4.8", type: "single",
    question: "After an incident is resolved and systems are back in production, the security team gathers stakeholders to review what happened, what worked, and what must change. Which phase is this?",
    options: ["Preparation","Detection","Containment","Lessons learned"],
    answer: [3],
    explanation: "Lessons learned is the final phase and feeds improvements back into preparation. The other phases occur earlier in the lifecycle.",
    difficulty: 1, tags: ["lessons learned","incident response"]
  },
  {
    id: "d4-086", domain: 4, objective: "4.8", type: "single",
    question: "A county government wants executives, legal, and IT staff to talk through a ransomware scenario in a discussion-based session to validate roles and communication, without using any live or lab systems. Which of the following is this exercise?",
    options: ["Full failover test","Simulation","Penetration test","Tabletop exercise"],
    answer: [3],
    explanation: "A tabletop exercise is a discussion-based walkthrough of a scenario to validate plans and roles. A simulation has the team exercise real tools against a staged attack, and failover and penetration tests act on live systems.",
    difficulty: 1, tags: ["tabletop","testing","training"]
  },
  {
    id: "d4-087", domain: 4, objective: "4.8", type: "single",
    question: "A company wants its response team to practice using real tools against a simulated attack in a lab, with the team handling alerts as they would in production. Which of the following BEST describes this activity?",
    options: ["Legal hold","Threat hunting","Simulation","Root cause analysis"],
    answer: [2],
    explanation: "A simulation is a hands-on test that exercises detection and response procedures in a controlled environment. RCA and threat hunting are not training exercises, and a legal hold preserves data.",
    difficulty: 2, tags: ["simulation","testing","incident response"]
  },
  {
    id: "d4-088", domain: 4, objective: "4.8", type: "single",
    question: "A web application was breached through an unpatched component. After recovery, management wants to understand why the component was never patched so the failure does not recur. Which of the following activities BEST addresses this?",
    options: ["Containment","Root cause analysis","Tabletop exercise","Chain of custody"],
    answer: [1],
    explanation: "Root cause analysis identifies the underlying process or control failures behind an incident. Containment is an earlier response action, and chain of custody concerns evidence handling.",
    difficulty: 2, tags: ["root cause analysis","lessons learned"]
  },
  {
    id: "d4-089", domain: 4, objective: "4.8", type: "single",
    question: "A security team proactively searches network and endpoint data for signs of attacker presence based on a hypothesis about a new adversary technique, even though no alert has fired. Which of the following is this activity?",
    options: ["Vulnerability scanning","Incident containment","Alert tuning","Threat hunting"],
    answer: [3],
    explanation: "Threat hunting is a proactive, hypothesis-driven search for undetected compromise. Scanning looks for weaknesses, and containment responds to a confirmed incident.",
    difficulty: 2, tags: ["threat hunting","proactive"]
  },
  {
    id: "d4-090", domain: 4, objective: "4.8", type: "single",
    question: "A forensic analyst copies the disk of a compromised laptop that may be used in court. Which of the following BEST ensures the evidence is admissible?",
    options: ["Document who handled the evidence at each step using chain of custody and verify the image with a hash","Let the system administrator keep the laptop on a desk until the case begins","Reimage the laptop and keep the new image","Boot the original laptop and copy files by hand"],
    answer: [0],
    explanation: "Chain of custody and hashing demonstrate that evidence was preserved and not altered. Working on the original, leaving it unsecured, or reimaging destroys or taints evidence.",
    difficulty: 2, tags: ["chain of custody","forensics","hashing"]
  },
  {
    id: "d4-091", domain: 4, objective: "4.8", type: "multi",
    question: "A forensic investigator arrives at a running workstation suspected of hosting malware. Which of the following actions should the investigator take? Choose TWO.",
    options: ["Delete temporary files to save space for the capture","Run a full disk cleanup utility to remove malware","Create a forensic image and verify it with a cryptographic hash","Reboot the system to see if the malware returns","Capture volatile data such as memory before powering the system off"],
    answer: [2,4],
    explanation: "Volatile evidence is collected first per the order of volatility, and a verified forensic image preserves integrity. Cleanup, reboots, and deleting files alter or destroy evidence.",
    difficulty: 3, tags: ["forensics","order of volatility","acquisition"]
  },
  {
    id: "d4-092", domain: 4, objective: "4.8", type: "single",
    question: "A company is sued, and counsel asks IT to locate and produce all relevant emails and documents in a defensible way. Which of the following forensic activities does this describe?",
    options: ["Threat hunting","Key stretching","E-discovery","Eradication"],
    answer: [2],
    explanation: "E-discovery is the process of identifying, preserving, collecting, and producing electronically stored information for legal matters. The other options relate to security operations or cryptography.",
    difficulty: 3, tags: ["e-discovery","legal hold","forensics"]
  },
  {
    id: "d4-093", domain: 4, objective: "4.9", type: "single",
    question: "An analyst reviews the following firewall log excerpt:\n10:00:11 ALLOW TCP 10.1.4.23:51822 -> 203.0.113.9:443 bytes=412\n10:05:11 ALLOW TCP 10.1.4.23:51871 -> 203.0.113.9:443 bytes=409\n10:10:12 ALLOW TCP 10.1.4.23:51923 -> 203.0.113.9:443 bytes=415\n10:15:11 ALLOW TCP 10.1.4.23:51980 -> 203.0.113.9:443 bytes=411\nWhich of the following does this pattern MOST likely indicate?",
    options: ["Periodic beaconing from an internal host to an external server","Bulk data exfiltration over HTTPS","A port scan from an external host","Normal DNS resolution"],
    answer: [0],
    explanation: "Small outbound connections of nearly identical size to the same external address at a fixed five-minute interval are characteristic of command-and-control beaconing. The transfers are too small for bulk exfiltration, the traffic is outbound to a single port rather than a scan, and DNS uses port 53.",
    difficulty: 3, tags: ["firewall logs","beaconing"]
  },
  {
    id: "d4-094", domain: 4, objective: "4.9", type: "single",
    question: "An analyst reviews the following authentication log excerpt from a Linux server:\nOct 12 02:14:01 sshd[2211]: Failed password for root from 198.51.100.7 port 40112\nOct 12 02:14:02 sshd[2213]: Failed password for root from 198.51.100.7 port 40115\nOct 12 02:14:03 sshd[2215]: Failed password for admin from 198.51.100.7 port 40118\nOct 12 02:14:04 sshd[2217]: Accepted password for admin from 198.51.100.7 port 40121\nWhich of the following is the BEST conclusion?",
    options: ["A vulnerability scan completed successfully","Kerberos tickets were forged","A brute-force attack succeeded against the admin account","A legitimate user mistyped a password once"],
    answer: [2],
    explanation: "Multiple rapid failures from one external IP followed by a success indicates a successful password-guessing attack. A single mistyped password would not involve root and admin attempts within seconds.",
    difficulty: 2, tags: ["OS security logs","brute force","authentication logs"]
  },
  {
    id: "d4-095", domain: 4, objective: "4.9", type: "single",
    question: "A web server log contains the following request:\nGET /products.php?id=7' OR '1'='1 HTTP/1.1  200 18432\nWhich of the following BEST describes this activity?",
    options: ["A cross-site scripting attempt that was blocked","A SQL injection attempt that appears to have returned data","A directory traversal that returned a 404","A DDoS flood"],
    answer: [1],
    explanation: "The tautology OR '1'='1 is a classic SQL injection payload, and the 200 response with a large body suggests the query returned data. There is no script tag, path traversal, or flood pattern, and the response was not blocked.",
    difficulty: 3, tags: ["application logs","SQL injection","web server logs"]
  },
  {
    id: "d4-096", domain: 4, objective: "4.9", type: "single",
    question: "An analyst needs to see the exact contents of packets exchanged between a suspect host and an external server to determine what data was sent. Which of the following data sources is BEST?",
    options: ["Metadata from email headers","Vulnerability scan results","NetFlow records","Packet capture"],
    answer: [3],
    explanation: "Packet captures record full packet content including payloads. NetFlow records only conversation metadata such as addresses, ports, and byte counts, and scan results and email headers do not show the exchanged data.",
    difficulty: 1, tags: ["packet capture","data sources"]
  },
  {
    id: "d4-097", domain: 4, objective: "4.9", type: "single",
    question: "A SOC manager wants a real-time view of alert volumes, top attacked assets, and mean time to respond so shift leads can spot trends at a glance. Which of the following data sources BEST provides this?",
    options: ["Dashboards","Endpoint logs from a single laptop","Vulnerability scan raw output","Packet captures"],
    answer: [0],
    explanation: "Dashboards visualize aggregated SIEM data and metrics for situational awareness. Packet captures and raw scan output are too granular for trend viewing.",
    difficulty: 1, tags: ["dashboards","automated reports","SIEM"]
  },
  {
    id: "d4-098", domain: 4, objective: "4.9", type: "single",
    question: "A forensic analyst needs to determine when a sensitive document was created, who last modified it, and what device took an embedded photo, without opening the contents. Which of the following data sources should the analyst use?",
    options: ["Metadata","DNS sinkhole logs","NetFlow","IPS signatures"],
    answer: [0],
    explanation: "File metadata includes timestamps, author, and device details such as EXIF data. NetFlow, IPS signatures, and DNS logs relate to network activity, not file attributes.",
    difficulty: 2, tags: ["metadata","forensics"]
  },
  {
    id: "d4-099", domain: 4, objective: "4.9", type: "multi",
    question: "An investigator suspects that a compromised workstation was used to exfiltrate data over the network. Which of the following data sources would BEST help establish what happened? Choose TWO.",
    options: ["Firewall and proxy logs","Endpoint logs and EDR telemetry","Last quarter's vulnerability scan report","A wireless site survey heat map","An automated patch compliance report"],
    answer: [0,1],
    explanation: "Network-egress logs show where data went and how much, and endpoint telemetry shows which processes and files were involved. Scan and patch reports describe weaknesses rather than the activity that occurred, and a heat map shows RF coverage.",
    difficulty: 2, tags: ["log data","firewall logs","endpoint logs"]
  },
  {
    id: "d4-100", domain: 4, objective: "4.9", type: "single",
    question: "An IPS log shows: \"DROP TCP 192.0.2.50:4431 -> 10.2.2.10:445 sig=MS17-010 EternalBlue attempt\". The target is a Windows file server. Which of the following is the BEST next step?",
    options: ["Immediately reformat the file server","Disable the IPS signature to reduce noise","Verify the server is patched against MS17-010 and review whether any similar attempts reached other hosts","Ignore the entry because the IPS dropped the packet"],
    answer: [2],
    explanation: "A dropped exploit attempt is still evidence of targeting, so confirm patch status and check for related activity elsewhere. Ignoring it, disabling the signature, or reformatting is unwarranted or counterproductive.",
    difficulty: 3, tags: ["IPS logs","SMB","log analysis"]
  }
);
