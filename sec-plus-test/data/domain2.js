// Domain 2: Threats, Vulnerabilities, and Mitigations (objectives 2.1-2.5). 100 questions.
window.SEC_BANK = window.SEC_BANK || [];
window.SEC_BANK.push(
  {
    id: "d2-001", domain: 2, objective: "2.1", type: "single",
    question: "A defense contractor discovers a multi-year intrusion in which the attacker quietly copied design documents using custom tooling and zero-day exploits. The campaign was well funded and tied to a foreign government's strategic goals. Which of the following threat actors is MOST likely responsible?",
    options: ["Organized crime", "Hacktivist", "Nation-state", "Unskilled attacker"],
    answer: [2],
    explanation: "Nation-state actors have the highest funding and sophistication and pursue espionage and strategic advantage over long periods. Organized crime is driven by profit, hacktivists by ideology, and unskilled attackers lack custom tooling and zero-days.",
    difficulty: 1, tags: ["threat actors","nation-state"]
  },
  {
    id: "d2-002", domain: 2, objective: "2.1", type: "single",
    question: "A regional bank's public website is defaced with political slogans the day after the bank announced financing for a controversial pipeline project. Which of the following motivations BEST explains this attack?",
    options: ["Philosophical or political beliefs", "Financial gain", "Espionage", "Blackmail"],
    answer: [0],
    explanation: "Defacement with a message tied to a cause points to hacktivism driven by philosophical or political beliefs. Financial gain would involve theft or ransom, espionage would be covert, and blackmail would involve a private demand.",
    difficulty: 1, tags: ["hacktivist","motivation"]
  },
  {
    id: "d2-003", domain: 2, objective: "2.1", type: "single",
    question: "A teenager on a gaming forum downloads a free exploit kit and launches it against a regional retailer's public web server with no understanding of how the exploits work. Which of the following BEST describes this threat actor?",
    options: ["Organized crime", "Nation-state", "Hacktivist", "Unskilled attacker"],
    answer: [3],
    explanation: "An unskilled attacker (script kiddie) runs prebuilt tools without understanding them and has low sophistication and few resources. Organized crime and nation-states are well resourced and capable, and a hacktivist acts for a cause, which the scenario does not describe.",
    difficulty: 1, tags: ["unskilled attacker","sophistication"]
  },
  {
    id: "d2-004", domain: 2, objective: "2.1", type: "single",
    question: "A hospital's database administrator who was passed over for promotion deletes several patient-billing tables before resigning. Which of the following motivations BEST describes the administrator's actions?",
    options: ["Espionage", "Revenge", "Service disruption for ransom", "Ethical hacking"],
    answer: [1],
    explanation: "An internal actor retaliating after a perceived slight is motivated by revenge. There is no data theft for intelligence value (espionage), no extortion demand, and no authorization that would make it ethical.",
    difficulty: 2, tags: ["insider threat","revenge"]
  },
  {
    id: "d2-005", domain: 2, objective: "2.1", type: "multi",
    question: "During a major online tournament, a gaming company's matchmaking servers are knocked offline by a flood of traffic. The attackers make no ransom demand, steal no data, and post mocking messages about the outage on social media. Which of the following motivations are MOST consistent with this attack? Choose TWO.",
    options: ["Service disruption", "Disruption/chaos", "Espionage", "Data exfiltration", "Financial gain"],
    answer: [0, 1],
    explanation: "Taking a service offline with no demand or theft, purely to cause and celebrate an outage, matches service disruption and disruption/chaos. No data was taken (ruling out espionage and data exfiltration) and no payment was sought (ruling out financial gain).",
    difficulty: 2, tags: ["motivation","service disruption","chaos"]
  },
  {
    id: "d2-006", domain: 2, objective: "2.1", type: "single",
    question: "A manufacturing company's marketing team purchases an unapproved cloud file-sharing service because the IT-approved tool is too slow. Sensitive product plans are now stored there with no logging. Which of the following threats does this BEST represent?",
    options: ["Supply chain attack", "Nation-state espionage", "Hacktivism", "Shadow IT"],
    answer: [3],
    explanation: "Shadow IT is the use of systems, software, or services without IT approval, which creates unmanaged data exposure. The scenario describes no external adversary or compromised vendor.",
    difficulty: 2, tags: ["shadow IT","threat actors"]
  },
  {
    id: "d2-007", domain: 2, objective: "2.1", type: "single",
    question: "A group encrypts a school district's file servers and demands payment in cryptocurrency, then sells stolen student records when the district refuses to pay. The group operates as a structured business with affiliates. Which of the following actors and motivations BEST match?",
    options: ["Hacktivist motivated by chaos", "Nation-state motivated by war", "Organized crime motivated by financial gain", "Insider motivated by revenge"],
    answer: [2],
    explanation: "Ransomware operations with affiliates and data resale are typical of organized crime seeking profit. Hacktivists seek publicity for a cause, nation-states seek strategic goals, and insiders act from within the organization.",
    difficulty: 2, tags: ["organized crime","financial gain","ransomware"]
  },
  {
    id: "d2-008", domain: 2, objective: "2.1", type: "multi",
    question: "A threat intelligence team is building profiles to compare the groups targeting its organization. Which of the following are attributes used to differentiate threat actors from one another? Choose THREE.",
    options: ["Whether the actor is internal or external to the organization", "Resources and funding", "Level of sophistication and capability", "Version of antivirus deployed on the target", "Operating system of the target", "Number of open ports on the target"],
    answer: [0, 1, 2],
    explanation: "SY0-701 characterizes threat actors by internal or external position, resources and funding, and level of sophistication and capability. The remaining options describe the target's configuration, not attributes of the actor.",
    difficulty: 1, tags: ["actor attributes","internal vs external","sophistication","funding"]
  },
  {
    id: "d2-009", domain: 2, objective: "2.1", type: "multi",
    question: "A security team is reviewing possible motivations behind a breach in which a competitor's recruiter obtained unreleased product roadmaps. Which of the following motivations are MOST consistent with this activity? Choose TWO.",
    options: ["Hacktivist protest", "Data exfiltration", "Espionage", "Ethical vulnerability disclosure", "War"],
    answer: [1, 2],
    explanation: "Stealing confidential roadmaps for competitive advantage is data exfiltration carried out as industrial espionage. Protest, ethical disclosure, and war do not fit a competitor seeking private information.",
    difficulty: 2, tags: ["motivation","espionage","data exfiltration"]
  },
  {
    id: "d2-010", domain: 2, objective: "2.1", type: "single",
    question: "An attacker steals compromising photos from an executive's cloud account and threatens to publish them unless the company pays a large sum. Which of the following motivations is being demonstrated?",
    options: ["Service disruption", "Philosophical beliefs", "Blackmail", "Ethical hacking"],
    answer: [2],
    explanation: "Threatening to release damaging information unless a demand is met is blackmail. Service disruption would target availability, and the other motivations do not involve coercion for payment.",
    difficulty: 1, tags: ["blackmail","motivation"]
  },
  {
    id: "d2-011", domain: 2, objective: "2.1", type: "single",
    question: "A researcher with written permission from a SaaS provider tests its API, finds an authorization flaw, and reports it through the company's bug bounty program. Which of the following motivations BEST describes this activity?",
    options: ["Ethical", "Financial extortion", "Espionage", "Disruption and chaos"],
    answer: [0],
    explanation: "Authorized testing with responsible disclosure is ethical hacking, which is a recognized motivation in the exam objectives. The activity has no malicious, coercive, or intelligence-gathering purpose.",
    difficulty: 2, tags: ["ethical hacking","bug bounty"]
  },
  {
    id: "d2-012", domain: 2, objective: "2.1", type: "single",
    question: "During a regional conflict, a power utility's operational network is hit with a coordinated attack timed with military action, causing widespread outages. The attackers had extensive resources and prepared the access months in advance. Which of the following is the MOST likely motivation?",
    options: ["War", "Blackmail", "Revenge", "Financial gain"],
    answer: [0],
    explanation: "Attacks on critical infrastructure coordinated with military operations by well-resourced actors indicate war or state-level conflict as the motivation. Revenge, blackmail, and profit do not explain the coordination and timing.",
    difficulty: 3, tags: ["nation-state","war","critical infrastructure"]
  },
  {
    id: "d2-013", domain: 2, objective: "2.2", type: "single",
    question: "Employees at a law firm receive text messages claiming a package is held and asking them to tap a link to reschedule delivery. Which of the following BEST describes this attack?",
    options: ["Typosquatting", "Watering hole", "Vishing", "Smishing"],
    answer: [3],
    explanation: "Smishing is phishing delivered by SMS or text message. Vishing uses voice calls, a watering hole compromises a website the targets visit, and typosquatting relies on misspelled domains.",
    difficulty: 1, tags: ["smishing","message-based"]
  },
  {
    id: "d2-014", domain: 2, objective: "2.2", type: "single",
    question: "An accounting clerk receives an email that appears to come from the CEO, asking for an urgent wire transfer to a new vendor account. The sender domain differs by one character from the real domain. Which of the following attacks does this represent?",
    options: ["Brand impersonation via QR code", "Watering hole", "Business email compromise", "Credential stuffing"],
    answer: [2],
    explanation: "Business email compromise impersonates an executive or vendor to redirect payments, often through look-alike domains. The other choices involve compromised websites, QR codes, or reused passwords, none of which are described.",
    difficulty: 2, tags: ["BEC","phishing","impersonation"]
  },
  {
    id: "d2-015", domain: 2, objective: "2.2", type: "single",
    question: "A company finds that a visitor left several USB drives labeled 'Payroll 2025' in the parking lot, and three have already been plugged into workstations. Which of the following threat vectors BEST describes this scenario?",
    options: ["Supply chain", "Removable media", "Open service port", "Default credentials"],
    answer: [1],
    explanation: "Infected or malicious USB devices left for victims to find use removable media as the delivery vector. No vendor compromise, exposed network service, or credential weakness is involved.",
    difficulty: 1, tags: ["removable media","USB drop"]
  },
  {
    id: "d2-016", domain: 2, objective: "2.2", type: "single",
    question: "A caller claims to be from the IT help desk, explains that the user's account is compromised, and asks the user to read back the MFA code just sent to the user's phone. Which of the following social engineering techniques is this?",
    options: ["Shoulder surfing", "Smishing", "Vishing", "Tailgating"],
    answer: [2],
    explanation: "Vishing is voice-based phishing, here combined with pretexting as the help desk. Smishing uses text messages, and tailgating and shoulder surfing are physical techniques.",
    difficulty: 1, tags: ["vishing","pretexting"]
  },
  {
    id: "d2-017", domain: 2, objective: "2.2", type: "single",
    question: "A person wearing a lanyard with a convincing company badge walks into a branch office, introduces himself by name as the new desktop technician from corporate IT, and asks the receptionist to let him into the network closet. Which of the following social engineering techniques is being used?",
    options: ["Impersonation", "Business email compromise", "Watering hole", "Typosquatting"],
    answer: [0],
    explanation: "Pretending in person to be a specific trusted person or role to gain access is impersonation. Business email compromise uses a compromised or spoofed email account to redirect payments, a watering hole compromises a site the victims visit, and typosquatting relies on look-alike domains.",
    difficulty: 1, tags: ["impersonation","social engineering","human vectors"]
  },
  {
    id: "d2-018", domain: 2, objective: "2.2", type: "single",
    question: "An attacker compromises a regional engineering forum that employees of a target utility visit daily, so that visitors silently receive malware. Which of the following BEST describes this technique?",
    options: ["Pretexting", "Watering hole", "Whaling", "Typosquatting"],
    answer: [1],
    explanation: "A watering hole attack compromises a site the intended victims already trust and visit. Typosquatting uses look-alike domains, pretexting is a fabricated scenario, and whaling is phishing aimed at senior executives.",
    difficulty: 2, tags: ["watering hole","social engineering"]
  },
  {
    id: "d2-019", domain: 2, objective: "2.2", type: "single",
    question: "A user mistypes a bank's domain and lands on a near-identical site that collects login credentials. The attacker registered the misspelled domain in advance. Which of the following attacks is this?",
    options: ["Brand impersonation by phone", "Typosquatting", "Watering hole", "Disinformation campaign"],
    answer: [1],
    explanation: "Typosquatting (URL hijacking) registers misspelled variants of legitimate domains to catch mistakes. Watering holes compromise legitimate sites, and the other options do not rely on a mistyped address.",
    difficulty: 2, tags: ["typosquatting","credential harvesting"]
  },
  {
    id: "d2-020", domain: 2, objective: "2.2", type: "single",
    question: "Attackers exploit a remote code execution flaw in the desktop sync agent that a law firm installed on all 3,000 of its workstations to back up user files. Which of the following threat vectors BEST describes this exposure?",
    options: ["Vulnerable client-based software", "Vulnerable agentless software", "Unsupported system", "Removable device"],
    answer: [0],
    explanation: "Software that must be installed on each endpoint is client-based, so a flaw in it exposes every host running the client. Agentless software requires no endpoint installation, the product is still supported, and no physical media is involved.",
    difficulty: 3, tags: ["vulnerable software","client-based","agentless"]
  },
  {
    id: "d2-021", domain: 2, objective: "2.2", type: "single",
    question: "A warehouse still runs a barcode-scanning application on a server whose operating system reached end of life three years ago. The vendor no longer issues patches. Which of the following BEST describes the risk this introduces?",
    options: ["Excessive false positives in the SIEM", "Weak physical access controls", "Unsupported system and application attack surface", "Increased bandwidth consumption"],
    answer: [2],
    explanation: "Unsupported systems and applications no longer receive security fixes, so known flaws remain exploitable and widen the attack surface. The other options are unrelated to patch availability.",
    difficulty: 1, tags: ["unsupported systems","attack surface"]
  },
  {
    id: "d2-022", domain: 2, objective: "2.2", type: "single",
    question: "A scan of a retail company's network finds that a point-of-sale controller accepts Telnet connections using the vendor's factory username and password. Which of the following should be addressed FIRST to reduce the exposure?",
    options: ["Increase the DHCP lease time", "Enable verbose logging on the firewall", "Add the controller to a wireless guest VLAN", "Change the default credentials and disable Telnet"],
    answer: [3],
    explanation: "Default credentials combined with an insecure management protocol are an easy entry point, so they should be changed or removed first. The other actions do not remove the weakness and a guest VLAN would worsen exposure.",
    difficulty: 1, tags: ["default credentials","open service ports"]
  },
  {
    id: "d2-023", domain: 2, objective: "2.2", type: "single",
    question: "An attacker sends a seemingly harmless PDF to a finance team. When opened, it runs an embedded script that installs a remote access tool. Which of the following threat vectors is being used?",
    options: ["File-based message vector", "Image-based message vector", "Wired network", "Voice call"],
    answer: [0],
    explanation: "Malicious attachments such as documents and PDFs are file-based delivery over a message channel. An image-based vector would hide the payload in an image, and the scenario does not involve voice or wired network access.",
    difficulty: 2, tags: ["file-based","message-based","phishing"]
  },
  {
    id: "d2-024", domain: 2, objective: "2.2", type: "single",
    question: "A conference attendee connects to a free public Wi-Fi network named like the hotel's official network and later finds that sessions to the company portal were intercepted. Which of the following threat vectors BEST describes how the exposure occurred?",
    options: ["Default credentials", "Removable media", "Unsecure wireless network", "Supply chain"],
    answer: [2],
    explanation: "Unsecured or rogue wireless networks let attackers observe or manipulate traffic, making them a network threat vector. The other vectors involve physical devices, vendors, or account settings.",
    difficulty: 1, tags: ["wireless","evil twin","unsecure networks"]
  },
  {
    id: "d2-025", domain: 2, objective: "2.2", type: "single",
    question: "A managed service provider's remote monitoring tool is compromised, and attackers use it to push ransomware to the MSP's customers. Which of the following BEST describes the threat vector?",
    options: ["Supply chain through a managed service provider", "Bluetooth", "Image-based phishing", "Removable media"],
    answer: [0],
    explanation: "Attackers who abuse a trusted MSP's tools to reach its clients are exploiting the supply chain (vendor and MSP relationship). The other vectors are not involved.",
    difficulty: 2, tags: ["supply chain","MSP","vendors"]
  },
  {
    id: "d2-026", domain: 2, objective: "2.2", type: "single",
    question: "A university receives numerous social media posts and fake news articles falsely claiming its exam servers were breached, causing panic and withdrawals. No systems were compromised. Which of the following human vectors is this?",
    options: ["Misinformation or disinformation", "Watering hole", "Typosquatting", "Pretexting"],
    answer: [0],
    explanation: "Spreading false information to manipulate perception is misinformation or disinformation, a human vector even when no technical compromise occurs. Pretexting uses a fabricated scenario to extract information from a target.",
    difficulty: 2, tags: ["disinformation","human vectors"]
  },
  {
    id: "d2-027", domain: 2, objective: "2.2", type: "single",
    question: "A caller tells a records clerk that he is an auditor from the state regulator, cites a plausible case number, and asks the clerk to confirm several employee Social Security numbers 'for verification.' Which of the following techniques is being used?",
    options: ["Watering hole", "Brand impersonation by QR code", "Smishing", "Pretexting"],
    answer: [3],
    explanation: "Pretexting invents a believable scenario and identity to gain information or access. The call is voice-based but its defining feature is the fabricated story; the other options do not match.",
    difficulty: 2, tags: ["pretexting","social engineering"]
  },
  {
    id: "d2-028", domain: 2, objective: "2.2", type: "multi",
    question: "A security administrator is documenting network-based attack surfaces for a branch office. Which of the following are considered network threat vectors? Choose TWO.",
    options: ["Misinformation campaigns", "Phishing email attachments", "Default credentials on network devices", "Open service ports", "Compromised software vendors"],
    answer: [2, 3],
    explanation: "Network vectors include open service ports, default credentials, and unsecure wired, wireless, or Bluetooth connections. Phishing attachments are message-based, vendor compromise is supply chain, and misinformation is a human vector.",
    difficulty: 2, tags: ["network vectors","open ports","default credentials"]
  },
  {
    id: "d2-029", domain: 2, objective: "2.2", type: "single",
    question: "A bank's customers receive printed flyers with a QR code claiming to offer a new-account bonus. Scanning the code opens a convincing copy of the bank's login page. Which of the following BEST describes this attack?",
    options: ["Brand impersonation using a QR code", "Evil twin", "Bluetooth bluejacking", "Watering hole"],
    answer: [0],
    explanation: "Using a bank's branding to lure victims to a fraudulent page via a QR code is brand impersonation (quishing). A watering hole compromises a legitimate site, and the others target wireless links.",
    difficulty: 2, tags: ["QR code","brand impersonation","phishing"]
  },
  {
    id: "d2-030", domain: 2, objective: "2.2", type: "single",
    question: "During a penetration test of a government office, a tester plugs a laptop into an unused but active network jack in the public lobby and immediately receives an IP address on the internal staff VLAN. Which of the following threat vectors does this BEST demonstrate?",
    options: ["Unsecure wired network", "Unsecure wireless network", "Bluetooth", "Removable device"],
    answer: [0],
    explanation: "An active, unauthenticated wall port in a public area is an unsecure wired network vector; port security or 802.1X would block it. No wireless or Bluetooth link is used, and nothing is delivered on removable media.",
    difficulty: 1, tags: ["wired","unsecure networks","802.1X"]
  },
  {
    id: "d2-031", domain: 2, objective: "2.2", type: "single",
    question: "A hardware vendor ships network switches to a hospital. An audit finds that the switch firmware contains an undocumented chip-level backdoor added during manufacturing. Which of the following threat vectors is MOST applicable?",
    options: ["Voice call", "Typosquatting", "Supply chain through a hardware provider", "Removable media"],
    answer: [2],
    explanation: "Tampering at the manufacturer or supplier level before delivery is a hardware supply chain compromise. The other vectors do not involve a trusted provider's products.",
    difficulty: 2, tags: ["supply chain","hardware","suppliers"]
  },
  {
    id: "d2-032", domain: 2, objective: "2.2", type: "single",
    question: "A phishing campaign is crafted using the target CFO's public speaking engagements, charity activities, and recent travel posts on social media. Which of the following BEST describes this type of attack?",
    options: ["Spear phishing", "Smishing", "Typosquatting", "Bulk spam"],
    answer: [0],
    explanation: "A phishing message personalized to a specific person with researched details is spear phishing (and whaling when aimed at a senior executive). Bulk spam is untargeted.",
    difficulty: 2, tags: ["spear phishing","whaling","social engineering"]
  },
  {
    id: "d2-033", domain: 2, objective: "2.2", type: "single",
    question: "A technician finds that an employee's personal smartphone, which was paired with the corporate laptop over Bluetooth in a crowded airport, began receiving unsolicited file transfers. Which of the following BEST describes the attack surface involved?",
    options: ["Image-based phishing", "Open database port", "Unsecure Bluetooth connection", "Default administrative credentials"],
    answer: [2],
    explanation: "Discoverable or poorly configured Bluetooth connections allow nearby attackers to send data or connect to devices. The other options involve different surfaces.",
    difficulty: 2, tags: ["Bluetooth","wireless","network vectors"]
  },
  {
    id: "d2-034", domain: 2, objective: "2.2", type: "single",
    question: "A manufacturing company's email filter keeps missing a phishing campaign. Each message has no body text or links that can be scanned; the entire lure is a single picture of a fake invoice instructing the reader to call a payment number. Which of the following threat vectors is being used?",
    options: ["Image-based", "File-based", "Watering hole", "Removable device"],
    answer: [0],
    explanation: "Placing the lure inside an image so text-based filters cannot read it is an image-based vector. A file-based vector delivers a malicious document or executable, a watering hole compromises a trusted website, and no removable media is involved.",
    difficulty: 2, tags: ["image-based","message-based","phishing"]
  },
  {
    id: "d2-035", domain: 2, objective: "2.3", type: "single",
    question: "A developer's C application copies user-supplied input into a fixed 64-byte array without checking its length. Sending a long string crashes the program and may allow execution of attacker code. Which of the following vulnerabilities is this?",
    options: ["Jailbreaking", "Buffer overflow", "Cross-site scripting", "Race condition"],
    answer: [1],
    explanation: "Writing more data than a buffer can hold, without bounds checking, is a buffer overflow. A race condition depends on timing, XSS affects web page output, and jailbreaking is a mobile OS modification.",
    difficulty: 1, tags: ["buffer overflow","application vulnerabilities"]
  },
  {
    id: "d2-036", domain: 2, objective: "2.3", type: "single",
    question: "A web application builds a query by concatenating the username field directly into a statement. A tester enters ' OR '1'='1 and is logged in without a valid password. Which of the following vulnerabilities is present?",
    options: ["Buffer overflow", "SQL injection", "Cross-site scripting", "Memory injection"],
    answer: [1],
    explanation: "Unsanitized input that alters the structure of a database query is SQL injection. XSS injects script into pages viewed by other users, and the other options concern process memory.",
    difficulty: 1, tags: ["SQL injection","web-based"]
  },
  {
    id: "d2-037", domain: 2, objective: "2.3", type: "single",
    question: "A comment field on a company forum stores user input and displays it unencoded to other visitors. An attacker posts a comment containing a script tag, which then runs in other visitors' browsers and steals session cookies. Which of the following vulnerabilities BEST describes this?",
    options: ["Race condition", "SQL injection", "Virtual machine escape", "Stored cross-site scripting"],
    answer: [3],
    explanation: "Persisting attacker script that executes in other users' browsers is stored XSS. SQL injection targets the database layer, and the other options do not involve client-side script execution.",
    difficulty: 2, tags: ["XSS","web-based"]
  },
  {
    id: "d2-038", domain: 2, objective: "2.3", type: "single",
    question: "An application checks whether a user is authorized to access a file and then opens the file a few milliseconds later. An attacker swaps the file with a symbolic link to a restricted file between the two steps. Which of the following vulnerabilities is this?",
    options: ["Race condition (time-of-check to time-of-use)", "Buffer overflow", "Memory injection", "Malicious update"],
    answer: [0],
    explanation: "Exploiting the gap between a check and the later use of a resource is a TOCTOU race condition. Buffer overflows depend on input length, and memory injection places code into a running process.",
    difficulty: 3, tags: ["race condition","TOCTOU"]
  },
  {
    id: "d2-039", domain: 2, objective: "2.3", type: "single",
    question: "A note-taking application used across a SaaS company auto-installs a vendor-signed update. Analysis shows the vendor's build pipeline had been compromised and the update contains a backdoor. Which of the following application vulnerabilities BEST describes this?",
    options: ["Malicious update", "Memory injection", "Race condition", "Buffer overflow"],
    answer: [0],
    explanation: "A legitimate, trusted update channel delivering attacker code is a malicious update, a risk that also ties to the software supply chain. Memory injection, race conditions, and buffer overflows are coding flaws exploited at run time, not tampered updates.",
    difficulty: 2, tags: ["malicious update","application","supply chain"]
  },
  {
    id: "d2-040", domain: 2, objective: "2.3", type: "single",
    question: "A researcher discloses that a widely used VPN appliance has a remote code execution flaw that attackers are already exploiting, and the vendor has not yet released a patch. Which of the following BEST describes this vulnerability?",
    options: ["Side loading", "Misconfiguration", "Weak cipher suite", "Zero-day"],
    answer: [3],
    explanation: "A flaw that is exploited before the vendor has a fix or awareness is a zero-day vulnerability. Misconfiguration comes from settings, side loading is a mobile app installation issue, and weak ciphers concern cryptographic strength.",
    difficulty: 1, tags: ["zero-day"]
  },
  {
    id: "d2-041", domain: 2, objective: "2.3", type: "single",
    question: "A guest virtual machine on a shared hypervisor exploits a flaw to execute code on the host and then reaches other tenants' VMs. Which of the following vulnerabilities is this?",
    options: ["VM escape", "Resource reuse", "SQL injection", "Sideloading"],
    answer: [0],
    explanation: "Breaking out of the guest to the hypervisor or host is a VM escape. Resource reuse describes leftover data in reallocated resources, not code execution on the host.",
    difficulty: 2, tags: ["virtualization","VM escape"]
  },
  {
    id: "d2-042", domain: 2, objective: "2.3", type: "single",
    question: "A cloud customer deprovisions a virtual machine, and the provider later assigns the same memory and storage blocks to another tenant, who recovers fragments of the first customer's data. Which of the following vulnerabilities BEST describes this?",
    options: ["Resource reuse", "Race condition", "Cryptographic downgrade", "VM escape"],
    answer: [0],
    explanation: "Resource reuse occurs when released memory or storage is reallocated without being sanitized, exposing residual data. VM escape involves code execution on the host.",
    difficulty: 3, tags: ["virtualization","resource reuse","cloud"]
  },
  {
    id: "d2-043", domain: 2, objective: "2.3", type: "single",
    question: "A security audit of a SaaS company finds a storage bucket containing customer exports that is readable by anyone on the internet. No exploit was needed to access the data. Which of the following vulnerabilities is MOST likely the cause?",
    options: ["Jailbroken device", "Zero-day exploit", "Cloud misconfiguration", "Buffer overflow"],
    answer: [2],
    explanation: "Incorrect permissions or sharing settings on cloud resources are misconfigurations, a leading cause of cloud data exposure. No software flaw is required.",
    difficulty: 1, tags: ["cloud-specific","misconfiguration"]
  },
  {
    id: "d2-044", domain: 2, objective: "2.3", type: "single",
    question: "A user in a company with a BYOD program installs an app from an unofficial website instead of the managed app store, bypassing the vendor's vetting process. Which of the following mobile device vulnerabilities does this represent?",
    options: ["Jailbreaking", "Resource reuse", "Buffer overflow", "Sideloading"],
    answer: [3],
    explanation: "Installing apps from outside the official store is sideloading. Jailbreaking removes OS restrictions to gain root privileges, which is a different action even though both weaken the device.",
    difficulty: 2, tags: ["mobile","sideloading"]
  },
  {
    id: "d2-045", domain: 2, objective: "2.3", type: "multi",
    question: "A mobile device management review of BYOD phones at a bank lists several findings. Which of the following findings are mobile device vulnerabilities? Choose TWO.",
    options: ["A user ran a tool to gain root access and remove the OS's built-in security restrictions", "A banking app was installed from an APK file downloaded from a web forum", "The device enforces a six-digit PIN with biometric unlock", "Corporate data is kept in an MDM-managed work profile container", "Apps are installed only from the official store after MDM approval"],
    answer: [0, 1],
    explanation: "Gaining root to strip OS restrictions is jailbreaking/rooting, and installing an app from outside the vetted store is sideloading; both are mobile device vulnerabilities. A PIN with biometrics, a managed container, and store-only installs are mobile security controls, not weaknesses.",
    difficulty: 2, tags: ["mobile","sideloading","jailbreaking"]
  },
  {
    id: "d2-046", domain: 2, objective: "2.3", type: "single",
    question: "A manufacturer relies on a programmable controller that has not received firmware updates in eight years because the vendor went out of business. Which of the following vulnerability categories BEST describes the controller?",
    options: ["Cloud-specific misconfiguration", "Web-based injection", "Virtualization resource reuse", "Hardware: end-of-life and legacy firmware"],
    answer: [3],
    explanation: "Firmware that cannot be updated and hardware beyond vendor support are end-of-life and legacy hardware vulnerabilities. The other categories refer to different technologies.",
    difficulty: 2, tags: ["hardware","firmware","end-of-life","legacy"]
  },
  {
    id: "d2-047", domain: 2, objective: "2.3", type: "single",
    question: "A web server is configured to accept TLS connections using 40-bit export-grade ciphers and SSL 3.0 for compatibility with an old client. Which of the following BEST describes this vulnerability?",
    options: ["Cryptographic vulnerability", "Race condition", "Zero-day vulnerability", "Resource reuse"],
    answer: [0],
    explanation: "Accepting SSL 3.0 and 40-bit export-grade ciphers leaves known-weak cryptography in place that can be broken or downgraded, which is a cryptographic vulnerability. The weaknesses are long published (not zero-day), and timing flaws or reallocated resources are not involved.",
    difficulty: 2, tags: ["cryptographic","weak ciphers","SSL"]
  },
  {
    id: "d2-048", domain: 2, objective: "2.3", type: "multi",
    question: "A security assessment of a newly deployed on-premises database server produces five findings. Which of the following findings are misconfiguration vulnerabilities? Choose TWO.",
    options: ["The vendor's default administrator account is still enabled", "An unneeded remote management port is open to the user network", "The vendor has not yet released a fix for a flaw being actively exploited", "A stored procedure copies input into a fixed-size buffer without bounds checking", "A hypervisor flaw lets a guest VM execute code on the host"],
    answer: [0, 1],
    explanation: "Leaving default accounts enabled and unneeded ports open are settings the administrator controls, so they are misconfigurations. An exploited flaw with no fix is a zero-day, the unchecked buffer is a buffer overflow, and the guest-to-host flaw is VM escape.",
    difficulty: 2, tags: ["misconfiguration","default settings"]
  },
  {
    id: "d2-049", domain: 2, objective: "2.3", type: "single",
    question: "A vulnerability report lists a flaw in the operating system kernel that lets a standard user gain administrator privileges on unpatched Windows servers. Which of the following BEST classifies this vulnerability?",
    options: ["Mobile sideloading", "Operating system-based", "Cloud-specific", "Web-based"],
    answer: [1],
    explanation: "Flaws in OS components, such as privilege escalation in the kernel, are OS-based vulnerabilities. The others describe different layers.",
    difficulty: 1, tags: ["operating system","privilege escalation"]
  },
  {
    id: "d2-050", domain: 2, objective: "2.3", type: "single",
    question: "An attacker exploits a flaw that lets malicious code be written into the address space of a running legitimate process so it executes under that process's identity and avoids file-based detection. Which of the following BEST describes this vulnerability?",
    options: ["Race condition", "Memory injection", "SQL injection", "Resource reuse"],
    answer: [1],
    explanation: "Memory injection places attacker code into a running process, hiding it from file-scanning tools. SQL injection targets databases, and the other options concern timing and cloud allocation.",
    difficulty: 3, tags: ["memory injection","application"]
  },
  {
    id: "d2-051", domain: 2, objective: "2.3", type: "single",
    question: "A company's custom invoicing application relies on a third-party library to parse files. A newly published flaw in that library affects every application that includes it. Which of the following is the MOST accurate classification?",
    options: ["Jailbreak exposure", "Supply chain vulnerability through a software provider", "Zero-day on the operating system", "Hardware firmware flaw"],
    answer: [1],
    explanation: "Inherited flaws in third-party components are supply chain vulnerabilities from the software provider. A flaw in a library is not an OS or hardware issue.",
    difficulty: 2, tags: ["supply chain","third-party libraries"]
  },
  {
    id: "d2-052", domain: 2, objective: "2.4", type: "single",
    question: "An analyst reviews the following events from a Linux web server:\n\n10:02:11 httpd[2210]: uid=48(apache) exec /tmp/.x/exp\n10:02:12 kernel: exp[3317] setuid(0) via vulnerable SUID helper\n10:02:13 bash[3318]: uid=0(root) cmd=\"useradd -o -u 0 svc_backup\"\n\nWhich of the following attacks does this MOST likely indicate?",
    options: ["Privilege escalation", "Directory traversal", "Replay attack", "Cross-site request forgery"],
    answer: [0],
    explanation: "A process running as the low-privilege web service account exploits a SUID helper to become root and then creates a UID 0 account, which is privilege escalation. No ../ path sequences, resent authentication data, or forged browser requests appear in the log.",
    difficulty: 2, tags: ["privilege escalation","application attacks","logs"]
  },
  {
    id: "d2-053", domain: 2, objective: "2.3", type: "multi",
    question: "A hospital's third-party risk review produces several findings. Which of the following findings represent supply chain vulnerabilities? Choose TWO.",
    options: ["The outsourced payroll service provider holds persistent VPN access to the hospital network and was recently breached", "Replacement switches bought through an unvetted gray-market reseller contain counterfeit components", "A nurse installed a scheduling app from outside the official app store", "A hospital administrator set a cloud storage bucket to public read access", "A workstation still runs an operating system that reached end of life"],
    answer: [0, 1],
    explanation: "Risk inherited from a breached service provider and from counterfeit parts introduced by a hardware supplier are supply chain vulnerabilities. Sideloading is a mobile issue, the public bucket is the hospital's own misconfiguration, and the end-of-life OS is a legacy/unsupported system issue.",
    difficulty: 3, tags: ["supply chain","service provider","hardware provider"]
  },
  {
    id: "d2-054", domain: 2, objective: "2.3", type: "single",
    question: "A hospital's imaging system uses a vendor-supplied encryption library that seeds its key generator with the system clock. An analyst can reproduce the keys by trying timestamps near the install time. Which of the following vulnerability categories BEST describes the problem?",
    options: ["Cryptographic", "Misconfiguration", "Memory injection", "Resource reuse"],
    answer: [0],
    explanation: "Predictable seed material gives keys too little entropy, a flaw in how the library implements cryptography, so it is a cryptographic vulnerability. It is built into the vendor library rather than a setting an administrator chose (not misconfiguration), and no code is injected into memory or residual data reallocated.",
    difficulty: 3, tags: ["cryptographic","key generation","entropy"]
  },
  {
    id: "d2-055", domain: 2, objective: "2.4", type: "single",
    question: "Users at a clinic report that all files on the shared drive now have the extension .locked and a text file demands payment in cryptocurrency for a decryption key. Which of the following types of malware is MOST likely present?",
    options: ["Bloatware", "Logic bomb", "Ransomware", "Spyware"],
    answer: [2],
    explanation: "Encrypting files and demanding payment for the key is the signature behavior of ransomware. Spyware collects information, bloatware is unwanted preinstalled software, and a logic bomb triggers on a condition.",
    difficulty: 1, tags: ["malware","ransomware"]
  },
  {
    id: "d2-056", domain: 2, objective: "2.4", type: "single",
    question: "A network team notices that within an hour of one workstation being infected, hundreds of other hosts on the segment show the same infection without any user action, and the network is saturated with SMB traffic. Which of the following malware types is MOST likely responsible?",
    options: ["Rootkit", "Worm", "Keylogger", "Trojan"],
    answer: [1],
    explanation: "A worm self-replicates across a network without user interaction, often consuming bandwidth. A trojan needs the user to run it, a keylogger records keystrokes, and a rootkit hides persistence.",
    difficulty: 2, tags: ["malware","worm"]
  },
  {
    id: "d2-057", domain: 2, objective: "2.4", type: "single",
    question: "A user installed a free PDF converter. Soon after, the user's browser home page changed, ads appeared constantly, and the converter was found to be sending clipboard contents to an external server. Which of the following BEST describes the converter?",
    options: ["Ransomware", "Logic bomb", "Worm", "Trojan"],
    answer: [3],
    explanation: "A trojan masquerades as legitimate software while carrying malicious functionality such as data theft. A worm would spread on its own, and the other options do not match the behavior.",
    difficulty: 2, tags: ["malware","trojan","spyware"]
  },
  {
    id: "d2-058", domain: 2, objective: "2.4", type: "single",
    question: "After a developer was terminated, the payroll system began deleting records on the first day of the next month. Investigators found a script the developer wrote that runs only if his account is disabled. Which of the following BEST describes this malicious code?",
    options: ["Worm", "Logic bomb", "Botnet agent", "Rootkit"],
    answer: [1],
    explanation: "A logic bomb executes its payload when a specific condition or date occurs. A rootkit conceals itself, a botnet agent takes remote commands, and a worm replicates.",
    difficulty: 2, tags: ["malware","logic bomb","insider threat"]
  },
  {
    id: "d2-059", domain: 2, objective: "2.4", type: "single",
    question: "An EDR agent reports that a server's process list and file listing look clean, yet an offline disk analysis shows an unknown kernel driver and network connections the operating system does not report. Which of the following malware types is MOST likely present?",
    options: ["Ransomware", "Bloatware", "Rootkit", "Virus"],
    answer: [2],
    explanation: "A rootkit modifies the OS to hide processes, files, and connections from normal tools, which explains why the live view differs from offline analysis. The others do not typically conceal themselves this way.",
    difficulty: 3, tags: ["malware","rootkit"]
  },
  {
    id: "d2-060", domain: 2, objective: "2.4", type: "single",
    question: "Review the authentication log excerpt:\n\n09:14:01 FAIL user=asmith src=203.0.113.50\n09:14:03 FAIL user=bjones src=203.0.113.50\n09:14:05 FAIL user=cwilliams src=203.0.113.50\n09:14:07 FAIL user=dlee src=203.0.113.50\n09:14:09 FAIL user=egarcia src=203.0.113.50\n\nWhich of the following attacks does this MOST likely indicate?",
    options: ["Password spraying", "Pass-the-hash", "Brute-force attack against one account", "Credential replay"],
    answer: [0],
    explanation: "A single source trying (typically one or few) passwords across many different accounts is password spraying, which avoids lockouts. A brute-force attack would repeat attempts against a single account.",
    difficulty: 2, tags: ["password attacks","password spraying","logs"]
  },
  {
    id: "d2-061", domain: 2, objective: "2.4", type: "single",
    question: "A SIEM reports 4,200 failed logins for the single account 'admin' from one IP address over 10 minutes, followed by an account lockout. Which of the following attacks does this MOST likely indicate?",
    options: ["Password spraying", "Replay attack", "Brute force", "Directory traversal"],
    answer: [2],
    explanation: "Many rapid attempts against one account to guess its password is a brute-force attack, and the lockout is the indicator. Spraying would involve many accounts with few guesses each.",
    difficulty: 1, tags: ["password attacks","brute force","account lockout"]
  },
  {
    id: "d2-062", domain: 2, objective: "2.4", type: "single",
    question: "A user in Chicago signs in at 08:02 from a corporate laptop. Eleven minutes later the same account authenticates from an IP address in Singapore. Which of the following indicators of malicious activity does this BEST represent?",
    options: ["Resource inaccessibility", "Missing logs", "Impossible travel", "Blocked content"],
    answer: [2],
    explanation: "Logins from geographically distant locations within an impossibly short time suggest credential compromise. The other options are not indicated by the scenario.",
    difficulty: 2, tags: ["impossible travel","account indicators"]
  },
  {
    id: "d2-063", domain: 2, objective: "2.4", type: "single",
    question: "A web server log contains the following requests:\n\nGET /download.php?file=../../../../etc/passwd HTTP/1.1\nGET /download.php?file=..%2f..%2f..%2fetc%2fshadow HTTP/1.1\n\nWhich of the following attacks is being attempted?",
    options: ["SQL injection", "Directory traversal", "Buffer overflow", "Cross-site request forgery"],
    answer: [1],
    explanation: "Repeated ../ sequences, including encoded variants, try to escape the web root and read system files, which is directory traversal. The requests contain no SQL syntax or oversized input.",
    difficulty: 2, tags: ["application attacks","directory traversal","logs"]
  },
  {
    id: "d2-064", domain: 2, objective: "2.4", type: "single",
    question: "An analyst reviews the following web server log entry for a network diagnostics page:\n\nGET /tools/ping.php?host=10.0.0.1;cat%20/etc/passwd HTTP/1.1  200  4127\n\nThe response size is far larger than a normal ping result. Which of the following attacks is MOST likely?",
    options: ["Command injection", "Directory traversal", "Cross-site scripting", "Buffer overflow"],
    answer: [0],
    explanation: "The semicolon appends a second OS command to the host parameter, so the server ran cat on the password file: command injection. Directory traversal would use ../ sequences to escape the web root, XSS would carry script for a browser, and the input is not oversized.",
    difficulty: 2, tags: ["injection","command injection","logs"]
  },
  {
    id: "d2-065", domain: 2, objective: "2.4", type: "single",
    question: "A server in a data center is suddenly unreachable. Monitoring shows tens of thousands of SYN packets per second from thousands of distinct source addresses to port 443, and the connection table is full. Which of the following attacks is occurring?",
    options: ["DNS poisoning", "Distributed denial of service", "Credential replay", "On-path attack"],
    answer: [1],
    explanation: "Massive traffic from many sources exhausting resources and making the service inaccessible is a DDoS attack. On-path and DNS attacks would not cause connection table exhaustion.",
    difficulty: 1, tags: ["DDoS","network attacks","resource inaccessibility"]
  },
  {
    id: "d2-066", domain: 2, objective: "2.4", type: "single",
    question: "A small DNS query of about 60 bytes sent to open resolvers with the victim's spoofed source address triggers responses of over 3,000 bytes aimed at the victim. Which of the following BEST describes this attack?",
    options: ["On-path attack", "DNS poisoning", "Amplified reflected DDoS", "Domain hijacking"],
    answer: [2],
    explanation: "Spoofing the victim's address so third-party servers send much larger replies is a reflected, amplified DDoS. Poisoning alters cached records, and hijacking changes domain registration.",
    difficulty: 3, tags: ["DDoS","reflected","amplified","DNS"]
  },
  {
    id: "d2-067", domain: 2, objective: "2.4", type: "single",
    question: "Users report certificate warnings when visiting the company's intranet from a coffee shop. A packet capture shows the gateway MAC address for their subnet now belongs to an unknown device that is forwarding traffic. Which of the following attacks is MOST likely?",
    options: ["Password spraying", "On-path (man-in-the-middle) attack using ARP spoofing", "Amplified DDoS", "Birthday attack"],
    answer: [1],
    explanation: "A rogue device impersonating the gateway and relaying traffic is an on-path attack, and certificate warnings arise because the attacker cannot present a valid certificate. The other attacks do not alter traffic paths.",
    difficulty: 3, tags: ["on-path","ARP spoofing","network attacks"]
  },
  {
    id: "d2-068", domain: 2, objective: "2.4", type: "single",
    question: "Several users who type the company's banking portal URL are directed to an attacker-controlled IP address. The authoritative DNS records are unchanged, but a recursive resolver returns the wrong address. Which of the following attacks is MOST likely?",
    options: ["Domain hijacking", "SYN flood", "DNS cache poisoning", "Pass-the-hash"],
    answer: [2],
    explanation: "A recursive resolver returning forged answers while the authoritative records are intact indicates cache poisoning. Domain hijacking would change the registrar or authoritative data.",
    difficulty: 3, tags: ["DNS attacks","cache poisoning"]
  },
  {
    id: "d2-069", domain: 2, objective: "2.4", type: "single",
    question: "A security analyst sees a captured authentication exchange being resent to the server two hours later, allowing the attacker to log in without knowing the password. Which of the following attacks is this?",
    options: ["Replay attack", "Downgrade attack", "Buffer overflow", "Birthday attack"],
    answer: [0],
    explanation: "Capturing valid authentication data and resending it later is a replay (credential replay) attack, mitigated with nonces, timestamps, or session tokens. A downgrade attack forces weaker protocols, and a birthday attack targets hash collisions.",
    difficulty: 3, tags: ["replay","credential replay","network attacks"]
  },
  {
    id: "d2-070", domain: 2, objective: "2.4", type: "single",
    question: "A user logs into an online banking site and, in another tab, opens a malicious page. That page silently submits a funds transfer request using the user's authenticated session. Which of the following attacks is this?",
    options: ["Cross-site scripting", "SQL injection", "Cross-site request forgery", "Directory traversal"],
    answer: [2],
    explanation: "CSRF abuses a user's authenticated session to submit unwanted requests from another site. XSS involves injecting script into the trusted site, and the other attacks involve different payloads.",
    difficulty: 2, tags: ["application attacks","CSRF","forgery"]
  },
  {
    id: "d2-071", domain: 2, objective: "2.4", type: "single",
    question: "A cloud application accepts a URL parameter and fetches it from the server side. An attacker supplies http://169.254.169.254/latest/meta-data/ and receives instance credentials in the response. Which of the following attacks is this?",
    options: ["Directory traversal", "Replay attack", "Server-side request forgery", "Cross-site request forgery"],
    answer: [2],
    explanation: "Tricking the server into making requests to internal resources, such as the cloud metadata service, is SSRF. CSRF abuses a user's browser session instead.",
    difficulty: 3, tags: ["SSRF","forgery","cloud","application attacks"]
  },
  {
    id: "d2-072", domain: 2, objective: "2.4", type: "single",
    question: "A TLS handshake analysis shows a client and server negotiated TLS 1.0 with a weak cipher, although both support TLS 1.3. An on-path device was observed modifying the handshake. Which of the following attacks is MOST likely?",
    options: ["Downgrade attack", "Race condition", "Password spraying", "Collision attack"],
    answer: [0],
    explanation: "Forcing parties to use an older, weaker protocol version than they support is a downgrade attack. A collision attack targets hash functions instead.",
    difficulty: 3, tags: ["cryptographic attacks","downgrade"]
  },
  {
    id: "d2-073", domain: 2, objective: "2.4", type: "single",
    question: "An attacker generates two different documents that produce the same MD5 hash, then uses one to obtain a digital signature that is valid for the other. Which of the following cryptographic attacks is this?",
    options: ["Downgrade attack", "Collision attack", "Replay attack", "Brute force"],
    answer: [1],
    explanation: "Finding two inputs with the same hash is a collision attack; birthday attacks exploit the probability of such collisions. Using SHA-256 or stronger avoids it.",
    difficulty: 3, tags: ["cryptographic attacks","collision","birthday","hashing"]
  },
  {
    id: "d2-074", domain: 2, objective: "2.4", type: "single",
    question: "A security researcher notes that a payment API signs session tickets with a hash truncated to 64 bits. Because of probability, the researcher expects two random tickets with matching hashes after roughly 2^32 attempts rather than 2^64, and could exploit that match. Which of the following attacks is being described?",
    options: ["Birthday attack", "Downgrade attack", "Replay attack", "Password spraying"],
    answer: [0],
    explanation: "A birthday attack exploits the birthday paradox: collisions in an n-bit hash appear after about 2^(n/2) attempts, so short hashes are weak. A downgrade attack forces weaker protocol versions, replay resends captured data, and spraying guesses passwords.",
    difficulty: 3, tags: ["cryptographic attacks","birthday","hashing"]
  },
  {
    id: "d2-075", domain: 2, objective: "2.4", type: "single",
    question: "A badge reader log shows an employee badge used at the data center door at 02:13, but the employee was verified to be out of the country. Camera footage shows a different person entering. Which of the following physical attacks is MOST likely?",
    options: ["RFID cloning", "Brute force of a lock", "Environmental attack", "Birthday attack"],
    answer: [0],
    explanation: "Copying a proximity card's data to a blank card lets an attacker use someone else's credentials, matching the log and camera evidence. Brute force of a lock or an environmental attack would not create a valid badge entry.",
    difficulty: 2, tags: ["physical attacks","RFID cloning"]
  },
  {
    id: "d2-076", domain: 2, objective: "2.4", type: "single",
    question: "A finance user's workstation shows slow performance, and the security team finds a hidden process that logs keystrokes and periodically uploads them to an external server. Which of the following malware types is this?",
    options: ["Worm", "Logic bomb", "Keylogger", "Bloatware"],
    answer: [2],
    explanation: "Recording keystrokes to capture credentials and other typed data is a keylogger, a form of spyware. A worm self-propagates, and bloatware is unwanted preinstalled software.",
    difficulty: 1, tags: ["malware","keylogger","spyware"]
  },
  {
    id: "d2-077", domain: 2, objective: "2.4", type: "multi",
    question: "A server administrator observes the following over one day: CPU is pinned at 100% by an unfamiliar process, the web proxy denied repeated attempts by the server to reach a known malicious domain, and several security-log entries from the previous night are missing. Which of the following indicators of malicious activity are present? Choose THREE.",
    options: ["Resource consumption", "Blocked content", "Missing logs", "Impossible travel", "Account lockout", "Concurrent session usage"],
    answer: [0, 1, 2],
    explanation: "The pinned CPU is resource consumption, the proxy denials are blocked content, and the gap in the security log is missing logs. No geographically impossible logins, lockouts, or simultaneous sessions are described.",
    difficulty: 2, tags: ["indicators","resource consumption","blocked content","missing logs"]
  },
  {
    id: "d2-078", domain: 2, objective: "2.4", type: "single",
    question: "An application owner notices that a service account that normally authenticates only between 01:00 and 02:00 for a nightly job logged in at 15:30 and accessed the HR share. Which of the following indicators BEST describes this event?",
    options: ["Out-of-cycle logging", "Account lockout", "Concurrent session usage", "Published or documented vulnerability"],
    answer: [0],
    explanation: "Activity occurring outside the expected schedule or pattern is out-of-cycle logging, a sign of misuse. No lockout or duplicate sessions are described.",
    difficulty: 2, tags: ["indicators","out-of-cycle logging","service accounts"]
  },
  {
    id: "d2-079", domain: 2, objective: "2.4", type: "multi",
    question: "A hospital's wireless intrusion detection system reports a burst of deauthentication frames sent to clients using the corporate AP's BSSID, after which many clients reassociate with an access point broadcasting the same SSID on a different channel with a stronger signal. Which of the following attacks are MOST likely occurring? Choose TWO.",
    options: ["Deauthentication attack", "Evil twin", "Bluejacking", "RFID cloning", "DNS cache poisoning"],
    answer: [0, 1],
    explanation: "Spoofed deauthentication frames knock clients off the real network, and a look-alike AP with the same SSID captures them as they reconnect: a deauthentication attack enabling an evil twin. Bluejacking targets Bluetooth, RFID cloning copies badges, and DNS poisoning alters name resolution.",
    difficulty: 2, tags: ["wireless","deauthentication","evil twin"]
  },
  {
    id: "d2-080", domain: 2, objective: "2.4", type: "single",
    question: "A user opens a spreadsheet attachment and enables macros. The macro copies itself into the user's default document template, and every workbook the user later creates and emails carries the same macro, which infects each recipient who opens the file and enables macros. Which of the following malware types BEST describes this?",
    options: ["Virus", "Worm", "Trojan", "Logic bomb"],
    answer: [0],
    explanation: "Malicious code that attaches to host files and spreads only when users open and run them is a virus (here a macro virus). A worm spreads on its own without user action, a trojan disguises itself as useful software rather than infecting other files, and a logic bomb waits for a trigger condition.",
    difficulty: 3, tags: ["malware","virus","macros","malicious code"]
  },
  {
    id: "d2-081", domain: 2, objective: "2.4", type: "single",
    question: "A SOC analyst notices that a user's cloud account was accessed from two different devices in different cities at the same time, and one session moved large amounts of files to an unfamiliar storage service. Which of the following indicators is MOST relevant to the simultaneous access?",
    options: ["Resource inaccessibility", "Published vulnerability", "Concurrent session usage", "Blocked content"],
    answer: [2],
    explanation: "The same account active in multiple places simultaneously is concurrent session usage, and it suggests stolen credentials or a hijacked session. The other indicators are unrelated.",
    difficulty: 2, tags: ["indicators","concurrent sessions","data exfiltration"]
  },
  {
    id: "d2-082", domain: 2, objective: "2.4", type: "multi",
    question: "A colocation facility's incident review notes two events: investigators found pry marks on a cage door and a keypad log showing hundreds of sequential codes entered overnight, and an intruder separately cut power to the cooling units, forcing servers to shut down from overheating. Which of the following physical attacks does the review describe? Choose TWO.",
    options: ["Brute force", "Environmental attack", "RFID cloning", "Tailgating", "Password spraying"],
    answer: [0, 1],
    explanation: "Forcing a door and cycling through keypad codes is a physical brute-force attack, and disabling cooling to damage equipment is an environmental attack. No badge was copied (RFID cloning), no one followed an authorized person in (tailgating), and spraying targets online accounts.",
    difficulty: 2, tags: ["physical attacks","brute force","environmental"]
  },
  {
    id: "d2-083", domain: 2, objective: "2.5", type: "single",
    question: "After a breach of the guest Wi-Fi network at a hotel, the CISO wants to ensure compromised guest devices cannot reach the reservation system. Which of the following mitigation techniques BEST accomplishes this?",
    options: ["Segmentation", "Patching", "Encryption at rest", "Decommissioning"],
    answer: [0],
    explanation: "Network segmentation separates guest traffic from critical systems so a compromise cannot spread laterally. Patching and encryption at rest do not restrict traffic between zones.",
    difficulty: 1, tags: ["segmentation","mitigation"]
  },
  {
    id: "d2-084", domain: 2, objective: "2.5", type: "single",
    question: "A company wants to prevent ransomware by ensuring that only approved executables can run on its kiosk computers, regardless of whether antivirus recognizes them. Which of the following is the BEST control?",
    options: ["Application block list", "Host-based IDS", "Full-disk encryption", "Application allow list"],
    answer: [3],
    explanation: "An allow list permits only approved software to execute, stopping unknown malware by default. A block list only stops known-bad programs, and encryption does not control execution.",
    difficulty: 2, tags: ["allow list","mitigation"]
  },
  {
    id: "d2-085", domain: 2, objective: "2.5", type: "single",
    question: "A hospital's legacy infusion-pump controller must stay in clinical service, but the manufacturer states that installing patches or any software agent will void its certification. Which of the following is the BEST way to reduce the risk?",
    options: ["Isolate the device on a dedicated network segment with restrictive firewall rules", "Install an endpoint protection agent on the device", "Decommission the device immediately", "Apply the corporate configuration baseline through group policy"],
    answer: [0],
    explanation: "When a system cannot be changed, isolating it limits who can reach it and contains any compromise. Installing an agent or pushing a baseline modifies the device and breaks certification, and decommissioning is not possible while it is clinically required.",
    difficulty: 2, tags: ["isolation","compensating controls","legacy"]
  },
  {
    id: "d2-086", domain: 2, objective: "2.5", type: "single",
    question: "A server is being built for production. Which of the following hardening steps would MOST effectively reduce its attack surface?",
    options: ["Assigning a static IP address", "Enabling full-disk encryption", "Removing unnecessary software and disabling unused services", "Enabling verbose logging"],
    answer: [2],
    explanation: "Removing unneeded software and services eliminates potential vulnerabilities and entry points. Full-disk encryption protects data at rest and logging aids detection, but neither reduces what an attacker can reach, and a static IP changes nothing about exposure.",
    difficulty: 1, tags: ["hardening","attack surface"]
  },
  {
    id: "d2-087", domain: 2, objective: "2.5", type: "single",
    question: "An administrator wants to detect and block exploitation attempts on an individual server even when the traffic is encrypted and has already reached the host. Which of the following controls BEST fits this need?",
    options: ["Network-based intrusion detection system", "Host-based intrusion prevention system", "Proxy server", "Load balancer"],
    answer: [1],
    explanation: "A HIPS runs on the endpoint and can see decrypted activity and block malicious actions. A network IDS cannot see inside encrypted traffic and does not block.",
    difficulty: 2, tags: ["hardening","HIPS","endpoint protection"]
  },
  {
    id: "d2-088", domain: 2, objective: "2.5", type: "single",
    question: "A retailer's vulnerability scan shows dozens of workstations missing security updates released more than 60 days ago. Which of the following is the MOST effective mitigation?",
    options: ["Deploy a second firewall", "Increase password length", "Enable disk encryption", "Implement a regular patch management process"],
    answer: [3],
    explanation: "Applying vendor patches on a defined schedule corrects known vulnerabilities directly. The other measures do not remove the missing fixes.",
    difficulty: 1, tags: ["patching","mitigation"]
  },
  {
    id: "d2-089", domain: 2, objective: "2.5", type: "single",
    question: "A developer role at a software firm has access to production databases containing customer data, even though developers only need test data. Which of the following principles should be applied to correct this?",
    options: ["Least privilege", "Non-repudiation", "Data sovereignty", "Defense in depth"],
    answer: [0],
    explanation: "Least privilege limits users to the access required for their duties. Defense in depth layers controls, and the other concepts do not address excess permissions.",
    difficulty: 2, tags: ["least privilege","access control"]
  },
  {
    id: "d2-090", domain: 2, objective: "2.5", type: "single",
    question: "A security team wants every new server to start from an approved secure baseline and to alert when settings deviate from that baseline. Which of the following mitigation techniques is being described?",
    options: ["Decommissioning", "Application block listing", "Segmentation", "Configuration enforcement"],
    answer: [3],
    explanation: "Configuration enforcement applies approved baselines and detects or reverts drift. Decommissioning removes systems from service, and the others do not manage settings.",
    difficulty: 2, tags: ["configuration enforcement","baselines"]
  },
  {
    id: "d2-091", domain: 2, objective: "2.5", type: "single",
    question: "A company retires 200 laptops that held customer information. Which of the following is the MOST appropriate mitigation step to avoid data exposure and unmanaged assets?",
    options: ["Reinstall the OS without wiping the drives and resell them", "Decommission them with documented data sanitization and asset record updates", "Donate them after deleting user profiles", "Leave the encrypted drives in place and store the laptops indefinitely"],
    answer: [1],
    explanation: "Proper decommissioning sanitizes media and removes the assets from inventory and monitoring. Deleting profiles or reinstalling the OS leaves recoverable data, and indefinite storage leaves untracked assets that still hold data.",
    difficulty: 1, tags: ["decommissioning","data sanitization"]
  },
  {
    id: "d2-092", domain: 2, objective: "2.5", type: "single",
    question: "An organization wants to reduce the damage if a laptop containing patient data is stolen from a clinician's car. Which of the following controls is MOST effective?",
    options: ["Host-based firewall", "Network segmentation", "Application allow list", "Full-disk encryption"],
    answer: [3],
    explanation: "Encryption renders data unreadable without the key, protecting stored data if the device is lost. The other controls do not protect data on a stolen disk.",
    difficulty: 1, tags: ["encryption","mitigation"]
  },
  {
    id: "d2-093", domain: 2, objective: "2.5", type: "multi",
    question: "A systems administrator is hardening a fleet of Windows servers. Which of the following actions are part of system hardening? Choose THREE.",
    options: ["Installing endpoint protection and a host-based firewall", "Granting local administrator rights to all users", "Changing default passwords", "Disabling unused ports and protocols", "Enabling Telnet for remote management"],
    answer: [0, 2, 3],
    explanation: "Hardening includes changing defaults, disabling unneeded ports and protocols, and adding endpoint protection and host firewalls. Telnet is an insecure protocol and broad admin rights increase risk.",
    difficulty: 1, tags: ["hardening","default passwords","endpoint protection"]
  },
  {
    id: "d2-094", domain: 2, objective: "2.5", type: "multi",
    question: "An attacker phished an HR clerk at a manufacturing company and used the clerk's account, which had write access to every file share, to reach the engineering file server from the HR workstation subnet. Which of the following access control changes would BEST limit a repeat of this attack? Choose TWO.",
    options: ["Restrict the clerk's share permissions to those required for the HR role", "Apply ACLs so only approved subnets can reach the engineering file server over SMB", "Enable full-disk encryption on the engineering file server", "Extend security log retention to one year", "Rename the built-in administrator account"],
    answer: [0, 1],
    explanation: "Limiting permissions to the role (least privilege) and using ACLs to block unneeded network paths both restrict what a compromised account can reach. Disk encryption protects data at rest, longer log retention aids investigation, and renaming the admin account does not affect the clerk's access.",
    difficulty: 2, tags: ["access control","least privilege","ACL"]
  },
  {
    id: "d2-095", domain: 2, objective: "2.5", type: "single",
    question: "A network engineer needs to control which hosts may communicate with a database server, permitting only the application tier on TCP 1433. Which of the following access control mechanisms should be implemented?",
    options: ["Port mirroring", "Access control list on the firewall or router", "DNS sinkhole", "Spanning tree"],
    answer: [1],
    explanation: "An ACL permits or denies traffic by source, destination, and port. Port mirroring copies traffic for analysis, spanning tree prevents loops, and a sinkhole redirects malicious domains.",
    difficulty: 2, tags: ["access control list","mitigation"]
  },
  {
    id: "d2-096", domain: 2, objective: "2.5", type: "single",
    question: "A security administrator notices that a known malicious application keeps being installed by users despite training. The administrator wants to stop that specific software while leaving other applications unrestricted. Which of the following is the BEST approach?",
    options: ["Application block list", "Disk encryption", "Network segmentation", "Application allow list"],
    answer: [0],
    explanation: "A block list denies named or known-bad applications while allowing everything else. An allow list is stricter and would restrict all unlisted software.",
    difficulty: 2, tags: ["block list","application control"]
  },
  {
    id: "d2-097", domain: 2, objective: "2.5", type: "single",
    question: "A SaaS provider has a flaw that allows privilege escalation on its Linux hosts. The vendor patch cannot be deployed for two weeks. Which of the following would BEST reduce the risk in the meantime?",
    options: ["Restrict administrative access and increase monitoring on the affected hosts until the patch can be applied", "Decommission all affected Linux hosts immediately", "Accept the risk with no further action until the patch window", "Enable encryption at rest on the affected hosts"],
    answer: [0],
    explanation: "A compensating control reduces exposure while the permanent fix is pending, and added monitoring helps detect exploitation. Decommissioning would cause an outage out of proportion to the risk, accepting the risk does nothing, and encryption at rest does not stop a local privilege escalation.",
    difficulty: 2, tags: ["compensating controls","patching"]
  },
  {
    id: "d2-098", domain: 2, objective: "2.4", type: "single",
    question: "A threat intelligence provider alerts a regional credit union that a ransomware group's leak site now lists the credit union by name and has posted samples of internal loan files as proof. The credit union's own tools had not raised any alerts. Which of the following indicators of malicious activity does this BEST represent?",
    options: ["Published/documented", "Blocked content", "Missing logs", "Concurrent session usage"],
    answer: [0],
    explanation: "When attack details or stolen data are posted publicly by the attacker or a third party, the compromise is published/documented. Nothing was blocked, no log gaps are described, and no simultaneous sessions were observed.",
    difficulty: 2, tags: ["indicators","published/documented","data exfiltration"]
  },
  {
    id: "d2-099", domain: 2, objective: "2.4", type: "single",
    question: "New laptops purchased for a school district arrive with several manufacturer trial utilities and a vendor toolbar that run at startup, consume memory, and add network-listening services, although none are malicious. Which of the following BEST describes this software?",
    options: ["Bloatware", "Spyware", "Rootkit", "Trojan"],
    answer: [0],
    explanation: "Unneeded preinstalled software that wastes resources and enlarges the attack surface is bloatware, which should be removed. Spyware secretly collects data, a rootkit hides itself in the OS, and a trojan disguises malicious code as legitimate software.",
    difficulty: 1, tags: ["malware","bloatware","attack surface"]
  },
  {
    id: "d2-100", domain: 2, objective: "2.5", type: "single",
    question: "A bank wants to detect misuse of privileged accounts and anomalous traffic on its core banking servers in near real time so the SOC can respond before damage occurs. Which of the following mitigation techniques BEST meets this goal?",
    options: ["Monitoring", "Decommissioning", "Encryption", "Application allow list"],
    answer: [0],
    explanation: "Monitoring through log collection, SIEM correlation, and alerting gives continuous visibility to detect and respond to misuse. Decommissioning removes systems, encryption protects confidentiality, and an allow list controls which software runs but does not detect account misuse.",
    difficulty: 1, tags: ["monitoring","SIEM","mitigation"]
  }
);
