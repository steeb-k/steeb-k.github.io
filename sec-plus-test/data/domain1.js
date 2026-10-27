// data/domain1.js - Domain 1: General Security Concepts (SY0-701)
window.SEC_BANK = window.SEC_BANK || [];
window.SEC_BANK.push(
  {
    id: "d1-001", domain: 1, objective: "1.1", type: "single",
    question: "A regional bank deploys a next-generation firewall to filter traffic between its branch offices and the data center. Into which control CATEGORY does this control fall?",
    options: ["Technical", "Managerial", "Operational", "Physical"],
    answer: [0],
    explanation: "Controls implemented through hardware, software or firmware, such as firewalls, are technical controls. Managerial controls are administrative (policies, risk assessments), operational controls are carried out by people, and physical controls protect facilities.",
    difficulty: 1, tags: ["control categories", "technical controls"]
  },
  {
    id: "d1-002", domain: 1, objective: "1.1", type: "single",
    question: "The governance team at a school district completes an annual risk assessment of all student-information systems and presents the results to the board. Which control CATEGORY does this activity represent?",
    options: ["Operational", "Managerial", "Technical", "Physical"],
    answer: [1],
    explanation: "Risk assessments, policies and oversight activities are managerial (administrative) controls because they address how risk is governed and managed. Operational controls are day-to-day procedures performed by staff, and technical controls are implemented in systems.",
    difficulty: 1, tags: ["control categories", "managerial controls"]
  },
  {
    id: "d1-003", domain: 1, objective: "1.1", type: "single",
    question: "A manufacturing company installs a perimeter fence and bollards around its plant. Into which control CATEGORY do these controls fall?",
    options: ["Managerial", "Operational", "Physical", "Technical"],
    answer: [2],
    explanation: "Fences and bollards are physical controls that protect people, property and facilities. They are not policies (managerial), staff-run procedures (operational) or system-implemented mechanisms (technical).",
    difficulty: 1, tags: ["control categories", "physical controls"]
  },
  {
    id: "d1-004", domain: 1, objective: "1.1", type: "single",
    question: "A hospital deploys a network intrusion detection system that alerts the SOC when it sees suspicious traffic but does not block it. Which control TYPE does this BEST describe?",
    options: ["Preventive", "Detective", "Corrective", "Deterrent"],
    answer: [1],
    explanation: "An IDS identifies and alerts on events as or after they occur, which is a detective control. It does not stop the traffic (preventive), repair damage (corrective) or discourage attackers (deterrent).",
    difficulty: 1, tags: ["control types", "detective", "IDS"]
  },
  {
    id: "d1-005", domain: 1, objective: "1.1", type: "single",
    question: "After a ransomware infection encrypts a file server, the IT team restores the data from last night's offline backup. The restoration is an example of which control TYPE?",
    options: ["Compensating", "Preventive", "Directive", "Corrective"],
    answer: [3],
    explanation: "Corrective controls restore systems to a good state after an incident. Preventive controls would have stopped the infection, directive controls instruct behavior, and compensating controls substitute for a control that cannot be implemented.",
    difficulty: 1, tags: ["control types", "corrective", "backups"]
  },
  {
    id: "d1-006", domain: 1, objective: "1.1", type: "single",
    question: "A utility cannot patch a legacy SCADA controller because the vendor no longer supports it. The security team places the controller on an isolated VLAN behind a firewall that allows only specific management hosts. Which control TYPE is this?",
    options: ["Detective", "Directive", "Compensating", "Deterrent"],
    answer: [2],
    explanation: "A compensating control provides alternative protection when the primary control (patching) cannot be applied. Detective, directive and deterrent controls do not substitute for the missing safeguard.",
    difficulty: 2, tags: ["control types", "compensating", "legacy systems"]
  },
  {
    id: "d1-007", domain: 1, objective: "1.1", type: "single",
    question: "A law firm publishes a clean-desk policy requiring employees to lock all client documents in cabinets at the end of each day. Which control TYPE does the policy represent?",
    options: ["Directive", "Corrective", "Detective", "Compensating"],
    answer: [0],
    explanation: "Directive controls tell personnel what they must or must not do, and policies are the classic example. Corrective, detective and compensating controls respond to or substitute for other safeguards rather than specify required behavior.",
    difficulty: 1, tags: ["control types", "directive", "policy"]
  },
  {
    id: "d1-008", domain: 1, objective: "1.1", type: "multi",
    question: "A security architect is selecting controls that stop unauthorized access BEFORE it occurs. Which of the following are preventive controls? Choose TWO.",
    options: ["Access control vestibule (mantrap)", "Intrusion detection system", "Weekly review of camera recordings", "Role-based access control", "Restoring a database from backup"],
    answer: [0, 3],
    explanation: "A mantrap physically blocks unauthorized entry and RBAC restricts permissions before access is granted, so both are preventive. IDS and recording reviews are detective, and a restore is corrective.",
    difficulty: 2, tags: ["control types", "preventive"]
  },
  {
    id: "d1-009", domain: 1, objective: "1.1", type: "multi",
    question: "Which of the following controls belong to the TECHNICAL category? Choose TWO.",
    options: ["Full-disk encryption on laptops", "Annual separation-of-duties policy review", "Endpoint detection and response agent", "Quarterly security awareness training", "Visitor sign-in log at the front desk"],
    answer: [0, 2],
    explanation: "Disk encryption and EDR are implemented in technology, making them technical controls. A policy review is managerial, awareness training is operational, and a visitor log is a physical/operational procedure.",
    difficulty: 2, tags: ["control categories", "technical controls"]
  },
  {
    id: "d1-010", domain: 1, objective: "1.1", type: "single",
    question: "A data center installs badge readers on the doors to its server room so that only authorized staff can enter. Which of the following BEST describes this control?",
    options: ["Physical and detective", "Technical and corrective", "Physical and preventive", "Operational and directive"],
    answer: [2],
    explanation: "A badge reader on a door is a physical control that prevents unauthorized entry. It is not corrective, and it is enforced by a mechanism rather than being a directive procedure.",
    difficulty: 2, tags: ["control categories", "control types", "physical controls"]
  },
  {
    id: "d1-011", domain: 1, objective: "1.1", type: "single",
    question: "A SIEM alert indicates that an employee's credentials are being used from two countries at once. To contain and remediate the compromise already in progress, an analyst disables the account and forces a password reset. Which control TYPE does the analyst's action represent?",
    options: ["Corrective", "Deterrent", "Compensating", "Directive"],
    answer: [0],
    explanation: "Disabling and resetting a compromised account responds to and remediates an event that has already happened, which is a corrective control; the SIEM alert itself is the detective control. Nothing here discourages attackers (deterrent), substitutes for a missing control (compensating) or instructs behavior (directive).",
    difficulty: 2, tags: ["control types", "corrective", "incident response"]
  },
  {
    id: "d1-012", domain: 1, objective: "1.1", type: "multi",
    question: "Which of the following are examples of MANAGERIAL controls? Choose THREE.",
    options: ["Annual risk assessment", "Written information security policy", "Third-party vendor security review process", "Network firewall", "Badge reader on a door"],
    answer: [0, 1, 2],
    explanation: "Risk assessments, policies and vendor-review processes are administrative governance activities, which are managerial controls. A firewall is technical and a badge reader is physical.",
    difficulty: 2, tags: ["control categories", "managerial controls"]
  },
  {
    id: "d1-013", domain: 1, objective: "1.1", type: "single",
    question: "A manufacturing company's security team delivers mandatory quarterly security awareness sessions to all plant and office employees. Which control CATEGORY does delivering this training BEST represent?",
    options: ["Technical", "Operational", "Managerial", "Physical"],
    answer: [1],
    explanation: "Operational controls are implemented and carried out by people rather than systems, and awareness training is the classic SY0-701 example. The policy that requires the training would be managerial, technical controls are enforced by systems, and physical controls protect facilities.",
    difficulty: 1, tags: ["control categories", "operational controls", "awareness training"]
  },
  {
    id: "d1-014", domain: 1, objective: "1.1", type: "single",
    question: "A retailer posts a visible security guard and signs stating that all areas are monitored in order to discourage theft and intrusion. Which control TYPE is the primary purpose of these measures?",
    options: ["Corrective", "Detective", "Compensating", "Deterrent"],
    answer: [3],
    explanation: "Deterrent controls discourage attackers from attempting a violation without necessarily stopping them. Detective controls identify events, corrective controls repair damage, and compensating controls replace a missing safeguard.",
    difficulty: 1, tags: ["control types", "deterrent"]
  },
  {
    id: "d1-015", domain: 1, objective: "1.1", type: "single",
    question: "A finance department reviews its server logs every Monday to look for signs of unauthorized access over the previous week. Which control TYPE is this review?",
    options: ["Preventive", "Corrective", "Detective", "Directive"],
    answer: [2],
    explanation: "Reviewing logs identifies past or ongoing unauthorized activity, which is detective. It does not block access (preventive) or repair damage (corrective).",
    difficulty: 1, tags: ["control types", "detective", "log review"]
  },
  {
    id: "d1-016", domain: 1, objective: "1.1", type: "single",
    question: "A small credit union branch has only one employee on site, so it cannot enforce separation of duties for cash handling and account adjustments. Which of the following is the BEST compensating control?",
    options: ["Have a manager at headquarters review the employee's transactions daily", "Require the employee to sign an acceptable use policy", "Post signage stating that the branch is monitored", "Restore the transaction database from backup each week"],
    answer: [0],
    explanation: "When separation of duties cannot be implemented, an independent daily review of the employee's transactions provides alternate protection against fraud, which makes it a compensating control. A signed policy is directive, signage is deterrent, and routine restores are corrective and would not catch fraud.",
    difficulty: 3, tags: ["control types", "compensating", "separation of duties"]
  },
  {
    id: "d1-017", domain: 1, objective: "1.1", type: "multi",
    question: "After a malware outbreak, which of the following actions are CORRECTIVE controls? Choose TWO.",
    options: ["Reimaging an infected workstation", "Restoring a database from backup", "Installing a mantrap on the data center door", "Posting warning signs about monitored areas", "Reviewing firewall logs weekly"],
    answer: [0, 1],
    explanation: "Reimaging and restoring return systems to a known-good state after an incident, which is corrective. A mantrap is preventive, signs are deterrent, and log review is detective.",
    difficulty: 2, tags: ["control types", "corrective"]
  },
  {
    id: "d1-018", domain: 1, objective: "1.1", type: "single",
    question: "A SaaS provider configures an intrusion prevention system inline to drop packets that match known exploit signatures before they reach its web servers. Which control TYPE BEST describes the IPS's blocking function?",
    options: ["Detective", "Deterrent", "Preventive", "Compensating"],
    answer: [2],
    explanation: "Blocking malicious traffic before it reaches the target stops the attack from succeeding, which is a preventive control. An IDS that only alerts would be detective, a deterrent only discourages attempts, and a compensating control substitutes for a control that cannot be implemented.",
    difficulty: 2, tags: ["control types", "preventive", "IPS"]
  },
  {
    id: "d1-019", domain: 1, objective: "1.2", type: "single",
    question: "A healthcare provider encrypts patient records so that only authorized clinicians can read them. Which part of the CIA triad is this control PRIMARILY designed to protect?",
    options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
    answer: [0],
    explanation: "Encryption prevents unauthorized disclosure, which is confidentiality. Integrity concerns unauthorized modification, availability concerns timely access, and non-repudiation concerns proof of origin.",
    difficulty: 1, tags: ["CIA triad", "confidentiality"]
  },
  {
    id: "d1-020", domain: 1, objective: "1.2", type: "single",
    question: "An administrator publishes a SHA-256 hash alongside a software installer so users can confirm the file was not altered in transit. Which CIA triad property does this verification support?",
    options: ["Confidentiality", "Availability", "Integrity", "Authorization"],
    answer: [2],
    explanation: "Hash comparison detects unauthorized modification, which supports integrity. It does not hide the contents (confidentiality) or keep systems up (availability).",
    difficulty: 1, tags: ["CIA triad", "integrity", "hashing"]
  },
  {
    id: "d1-021", domain: 1, objective: "1.2", type: "single",
    question: "An online retailer deploys redundant web servers behind a load balancer and signs up for DDoS scrubbing before the holiday season. Which security principle is the retailer MOST directly addressing?",
    options: ["Integrity", "Confidentiality", "Non-repudiation", "Availability"],
    answer: [3],
    explanation: "Redundancy and DDoS mitigation keep services reachable, which is availability. The measures do not protect secrecy, data accuracy or proof of actions.",
    difficulty: 1, tags: ["CIA triad", "availability", "redundancy"]
  },
  {
    id: "d1-022", domain: 1, objective: "1.2", type: "single",
    question: "A contract management system requires each approver to apply a digital signature, so that no approver can later claim they did not authorize a change. Which concept is being enforced?",
    options: ["Non-repudiation", "Confidentiality", "Availability", "Least privilege"],
    answer: [0],
    explanation: "Non-repudiation provides proof of origin and action so an individual cannot deny it later, and digital signatures are a standard mechanism. The other options do not provide that proof.",
    difficulty: 2, tags: ["non-repudiation", "digital signatures"]
  },
  {
    id: "d1-023", domain: 1, objective: "1.2", type: "single",
    question: "A logistics company wants a physical control around its unstaffed outdoor equipment yard that clearly marks the property boundary, discourages casual trespassers and delays anyone trying to enter. Which control BEST meets these requirements?",
    options: ["Security guard", "Fencing", "Access control vestibule", "Video surveillance"],
    answer: [1],
    explanation: "Fencing establishes a visible perimeter, deters casual intruders and slows down determined ones without requiring staff. A guard requires personnel on site, an access control vestibule controls a single building entrance, and video surveillance records but does not delay entry.",
    difficulty: 2, tags: ["physical security", "fencing"]
  },
  {
    id: "d1-024", domain: 1, objective: "1.2", type: "multi",
    question: "A company is hardening a public-facing customer portal. Which of the following controls primarily support CONFIDENTIALITY? Choose TWO.",
    options: ["TLS for data in transit", "Hot-standby database cluster", "Role-based access to customer records", "File integrity monitoring", "Redundant power supplies"],
    answer: [0, 2],
    explanation: "TLS and role-based access limit who can read data, supporting confidentiality. A standby cluster and redundant power support availability, and file integrity monitoring supports integrity.",
    difficulty: 2, tags: ["CIA triad", "confidentiality"]
  },
  {
    id: "d1-025", domain: 1, objective: "1.2", type: "single",
    question: "A user enters a username and password, then approves a push notification on a phone. Which AAA function has JUST been completed when the system verifies these factors?",
    options: ["Authorization", "Accounting", "Authentication", "Auditing"],
    answer: [2],
    explanation: "Verifying the identity of a user with credentials and a second factor is authentication. Authorization determines what the user may do afterward, and accounting records what they did.",
    difficulty: 1, tags: ["AAA", "authentication", "MFA"]
  },
  {
    id: "d1-026", domain: 1, objective: "1.2", type: "single",
    question: "After logging in, a payroll clerk can view salary data but cannot approve payments, which require a manager's role. Which AAA function determines this limitation?",
    options: ["Authentication", "Accounting", "Identification", "Authorization"],
    answer: [3],
    explanation: "Authorization defines what an authenticated identity is permitted to do. Authentication proved who the clerk is, and accounting would log the activity.",
    difficulty: 1, tags: ["AAA", "authorization"]
  },
  {
    id: "d1-027", domain: 1, objective: "1.2", type: "single",
    question: "A RADIUS server records the login time, session duration and data volume for every VPN connection so that the company can audit usage and bill departments. Which AAA function is this?",
    options: ["Accounting", "Authorization", "Authentication", "Federation"],
    answer: [0],
    explanation: "Accounting tracks and records resource usage and activity for auditing and billing. Authentication and authorization occur earlier in the session and do not capture usage data.",
    difficulty: 2, tags: ["AAA", "accounting", "RADIUS"]
  },
  {
    id: "d1-028", domain: 1, objective: "1.2", type: "single",
    question: "A network team wants wireless access points to prove their identity to the RADIUS server before the server accepts authentication requests from them, and wants servers to prove identity to clients. Which AAA concept is this?",
    options: ["Accounting of user activity", "Authentication of systems", "Authorization of roles", "Non-repudiation of users"],
    answer: [1],
    explanation: "Authentication applies to systems and devices as well as people, typically using certificates or shared secrets. The scenario is about proving identity, not permissions, logging or user-denial of actions.",
    difficulty: 3, tags: ["AAA", "authenticating systems", "certificates"]
  },
  {
    id: "d1-029", domain: 1, objective: "1.2", type: "multi",
    question: "Which of the following are components of the AAA framework? Choose THREE.",
    options: ["Authentication", "Authorization", "Accounting", "Availability", "Attestation"],
    answer: [0, 1, 2],
    explanation: "AAA stands for authentication, authorization and accounting. Availability is part of the CIA triad, and attestation is a separate concept used to verify system state.",
    difficulty: 1, tags: ["AAA"]
  },
  {
    id: "d1-030", domain: 1, objective: "1.2", type: "single",
    question: "A CISO wants to compare the organization's current security controls against the requirements of ISO 27001 and produce a list of missing controls and remediation priorities. Which of the following BEST describes this activity?",
    options: ["Penetration test", "Business impact analysis", "Gap analysis", "Tabletop exercise"],
    answer: [2],
    explanation: "A gap analysis measures the current state against a desired state or standard and identifies shortfalls. A pen test probes technical weaknesses, a BIA evaluates operational impact of outages, and a tabletop exercises response plans.",
    difficulty: 2, tags: ["gap analysis", "ISO 27001"]
  },
  {
    id: "d1-031", domain: 1, objective: "1.2", type: "single",
    question: "A gap analysis comparing a hospital's controls to HIPAA requirements finds that no policy exists for media disposal. What is the MOST appropriate next step?",
    options: ["Document the finding, assign an owner and create a remediation plan", "Run a vulnerability scan on all servers that store patient data", "Schedule a penetration test of the electronic health record system", "Purchase additional encryption licenses for all workstations"],
    answer: [0],
    explanation: "The purpose of a gap analysis is to drive remediation, so the missing policy should be documented, assigned an owner and planned for closure. Vulnerability scans, penetration tests and encryption purchases address technical weaknesses and would not create the missing media-disposal policy.",
    difficulty: 3, tags: ["gap analysis", "compliance"]
  },
  {
    id: "d1-032", domain: 1, objective: "1.2", type: "single",
    question: "A government agency's zero trust design grants access by evaluating rules that combine the user's role, device compliance status and the sensitivity of the requested data, rather than the user's network location. Which control plane concept does this BEST describe?",
    options: ["Implicit trust zones", "Policy-driven access control", "Policy enforcement point", "Threat scope reduction"],
    answer: [1],
    explanation: "Policy-driven access control means access decisions are made by evaluating defined policies built from identity, device and data attributes. Implicit trust zones grant trust by location (what zero trust removes), the policy enforcement point only enforces decisions on the data plane, and threat scope reduction limits the blast radius of a compromise.",
    difficulty: 2, tags: ["zero trust", "policy-driven access control", "control plane"]
  },
  {
    id: "d1-033", domain: 1, objective: "1.2", type: "single",
    question: "In a zero trust model, which component is responsible for evaluating the identity, device posture and risk signals of a request and deciding whether to grant access?",
    options: ["Policy enforcement point", "Policy engine", "Implicit trust zone", "Subject or system"],
    answer: [1],
    explanation: "The policy engine, working with the policy administrator, makes the allow/deny decision on the control plane. The policy enforcement point carries out that decision, and implicit trust zones are what zero trust seeks to eliminate.",
    difficulty: 2, tags: ["zero trust", "policy engine"]
  },
  {
    id: "d1-034", domain: 1, objective: "1.2", type: "single",
    question: "In a zero trust architecture, a gateway opens or closes the session between a user and an internal application according to the instructions of the policy administrator. What is this gateway called?",
    options: ["Policy engine", "Adaptive identity provider", "Jump server", "Policy enforcement point"],
    answer: [3],
    explanation: "The policy enforcement point (PEP) sits on the data plane and enables, monitors and terminates connections per control-plane decisions. The policy engine decides but does not handle the traffic; a jump server is a bastion host for administration.",
    difficulty: 2, tags: ["zero trust", "policy enforcement point", "data plane"]
  },
  {
    id: "d1-035", domain: 1, objective: "1.2", type: "single",
    question: "A company moves from a flat internal network, where any device on the LAN is trusted, to a model where every access request is verified regardless of location. Which zero trust concept is the company working to REMOVE?",
    options: ["Implicit trust zones", "Policy-driven access control", "Adaptive identity", "Threat scope reduction"],
    answer: [0],
    explanation: "Implicit trust zones are areas where devices are trusted by default because of their network location, which zero trust eliminates. The other options are zero trust mechanisms, not things to remove.",
    difficulty: 2, tags: ["zero trust", "implicit trust"]
  },
  {
    id: "d1-036", domain: 1, objective: "1.2", type: "single",
    question: "A zero trust deployment requires stronger authentication when a user signs in from an unfamiliar country or an unmanaged device, but allows a standard login from the corporate laptop. Which concept does this describe?",
    options: ["Adaptive identity", "Threat scope reduction", "Implicit trust", "Non-repudiation"],
    answer: [0],
    explanation: "Adaptive identity adjusts authentication and trust based on context such as location, device and behavior. Threat scope reduction limits blast radius, and implicit trust is the opposite of the model.",
    difficulty: 2, tags: ["zero trust", "adaptive identity"]
  },
  {
    id: "d1-037", domain: 1, objective: "1.2", type: "single",
    question: "A zero trust design uses microsegmentation and just-enough access so that a compromised workstation can reach only the single application its user needs. Which zero trust concept does this BEST demonstrate?",
    options: ["Adaptive identity", "Threat scope reduction", "Policy administrator", "Implicit trust zone"],
    answer: [1],
    explanation: "Threat scope reduction limits the reach (blast radius) of a compromise by restricting each subject to the minimal resources it needs. Adaptive identity varies authentication by context, which is not the focus here.",
    difficulty: 3, tags: ["zero trust", "threat scope reduction", "microsegmentation"]
  },
  {
    id: "d1-038", domain: 1, objective: "1.2", type: "multi",
    question: "Which of the following are components of the zero trust CONTROL plane? Choose TWO.",
    options: ["Policy engine", "Policy administrator", "Policy enforcement point", "Subject/system", "Untrusted network zone"],
    answer: [0, 1],
    explanation: "The policy engine and policy administrator make and communicate decisions on the control plane. The policy enforcement point and the subject/system operate on the data plane.",
    difficulty: 3, tags: ["zero trust", "control plane"]
  },
  {
    id: "d1-039", domain: 1, objective: "1.2", type: "single",
    question: "A corporate campus wants to prevent vehicles from being driven into the lobby of its headquarters building. Which physical control is MOST appropriate?",
    options: ["Bollards", "Access badge", "Motion sensor", "Cable lock"],
    answer: [0],
    explanation: "Bollards are sturdy posts that physically stop vehicles. Badges, sensors and cable locks do not stop vehicular intrusion.",
    difficulty: 1, tags: ["physical security", "bollards"]
  },
  {
    id: "d1-040", domain: 1, objective: "1.2", type: "single",
    question: "A data center needs to ensure that only one person at a time can pass from the unsecured lobby into the server area, preventing tailgating. Which of the following BEST meets this requirement?",
    options: ["Security camera", "Access control vestibule", "Chain-link fence", "Motion-activated lighting"],
    answer: [1],
    explanation: "An access control vestibule (mantrap) uses two interlocking doors to admit people one at a time. Cameras only detect, and fencing or lighting do not control individual entry.",
    difficulty: 2, tags: ["physical security", "access control vestibule", "tailgating"]
  },
  {
    id: "d1-041", domain: 1, objective: "1.2", type: "single",
    question: "A museum wants to be alerted when someone enters a gallery after hours by detecting changes in the reflected high-frequency sound waves in the room. Which sensor type does this describe?",
    options: ["Pressure sensor", "Infrared sensor", "Microwave sensor", "Ultrasonic sensor"],
    answer: [3],
    explanation: "Ultrasonic sensors emit high-frequency sound and detect disturbances in the reflected waves. Infrared detects heat, microwave uses radio waves, and pressure sensors detect weight.",
    difficulty: 3, tags: ["physical security", "sensors", "ultrasonic"]
  },
  {
    id: "d1-042", domain: 1, objective: "1.2", type: "multi",
    question: "A warehouse wants to detect an intruder moving across a restricted floor area after hours. Which of the following sensors could detect this? Choose THREE.",
    options: ["Pressure sensor", "Infrared (passive) sensor", "Microwave sensor", "Smoke detector", "Humidity sensor", "Badge reader"],
    answer: [0, 1, 2],
    explanation: "Pressure sensors detect weight on a floor or mat, passive infrared sensors detect body heat, and microwave sensors detect motion by changes in reflected radio waves, so all three detect presence. Smoke and humidity sensors monitor environmental conditions, and a badge reader controls entry rather than detecting intruders.",
    difficulty: 2, tags: ["physical security", "sensors"]
  },
  {
    id: "d1-043", domain: 1, objective: "1.2", type: "single",
    question: "A bank wants a physical control that can both deter intruders and provide a recorded history that investigators can use after a break-in. Which of the following BEST meets BOTH needs?",
    options: ["Video surveillance", "Bollards", "Fencing", "Access badges"],
    answer: [0],
    explanation: "Visible cameras deter and provide recorded evidence for later investigation. Bollards and fencing deter or block but record nothing, and badges authorize entry only.",
    difficulty: 2, tags: ["physical security", "video surveillance"]
  },
  {
    id: "d1-044", domain: 1, objective: "1.2", type: "single",
    question: "A school district reports repeated vandalism in a staff parking lot at night. Existing cameras record the lot, but the footage is too dark to identify anyone. Which physical control would BEST both deter the vandals and improve the usefulness of the existing cameras?",
    options: ["Bollards", "Lighting", "Pressure sensors", "Access control vestibule"],
    answer: [1],
    explanation: "Bright lighting discourages intruders who prefer darkness and allows cameras to capture identifiable footage. Bollards stop vehicles, pressure sensors only detect presence, and an access control vestibule controls entry through a building doorway, not an open parking lot.",
    difficulty: 2, tags: ["physical security", "lighting"]
  },
  {
    id: "d1-045", domain: 1, objective: "1.2", type: "single",
    question: "A security team deploys a decoy server filled with fake data that has no legitimate business use, so that any connection to it is a strong sign of malicious activity. Which technology is this?",
    options: ["Honeypot", "Jump server", "Proxy server", "Sandbox"],
    answer: [0],
    explanation: "A honeypot is a decoy system designed to attract and study attackers. A jump server is for administration, a proxy relays traffic, and a sandbox isolates untrusted code.",
    difficulty: 1, tags: ["deception", "honeypot"]
  },
  {
    id: "d1-046", domain: 1, objective: "1.2", type: "single",
    question: "A researcher builds a network of several interconnected decoy hosts and services that mimic an enterprise environment in order to observe attacker lateral movement. What is this called?",
    options: ["Honeyfile", "Honeynet", "Honeytoken", "DMZ"],
    answer: [1],
    explanation: "A honeynet is a network of multiple honeypots simulating a real environment. A honeyfile is a single decoy file, a honeytoken is a fake data record or credential, and a DMZ is a real perimeter segment.",
    difficulty: 2, tags: ["deception", "honeynet"]
  },
  {
    id: "d1-047", domain: 1, objective: "1.2", type: "single",
    question: "A SOC plants a fake AWS access key in a public code repository and configures an alert if that key is ever used. Which deception technology is being used?",
    options: ["Honeynet", "Honeypot", "Honeytoken", "Tarpit"],
    answer: [2],
    explanation: "A honeytoken is a fake credential or data record that triggers an alert when accessed or used. Honeypots and honeynets are decoy systems or networks, not planted credentials.",
    difficulty: 2, tags: ["deception", "honeytoken"]
  },
  {
    id: "d1-048", domain: 1, objective: "1.2", type: "single",
    question: "A file server contains a document named passwords_backup.xlsx that no legitimate user should ever open. The SOC is alerted whenever it is accessed. Which term BEST describes this decoy?",
    options: ["Honeynet", "Honeytoken", "Honeypot", "Honeyfile"],
    answer: [3],
    explanation: "A honeyfile is a decoy file that tempts attackers and alerts on access. A honeypot is a decoy system and a honeynet is a decoy network; a honeytoken is typically a fake credential or record.",
    difficulty: 3, tags: ["deception", "honeyfile"]
  },
  {
    id: "d1-049", domain: 1, objective: "1.3", type: "single",
    question: "A SaaS company's change advisory board reviews a proposed firewall rule change and approves it before it is implemented in production. Which change management element does this represent?",
    options: ["Approval process", "Version control", "Backout plan", "Allow list"],
    answer: [0],
    explanation: "A formal approval process ensures that the right people review and authorize a change before implementation. Version control tracks revisions, a backout plan describes reversal steps, and an allow list restricts permitted entities.",
    difficulty: 1, tags: ["change management", "approval process", "CAB"]
  },
  {
    id: "d1-050", domain: 1, objective: "1.3", type: "single",
    question: "Before a database server is patched, the change request must name the individual accountable for the system and for the success of the change. Which business process element is being identified?",
    options: ["Test results", "Stakeholders", "Maintenance window", "Owner"],
    answer: [3],
    explanation: "The owner is the person or team accountable for the system or asset being changed. Stakeholders are all affected parties, which is a broader group, and the other options describe testing and scheduling.",
    difficulty: 2, tags: ["change management", "ownership"]
  },
  {
    id: "d1-051", domain: 1, objective: "1.3", type: "single",
    question: "A change request for migrating the ERP system lists the finance, sales and warehouse departments as groups that must be informed and consulted. Which change management element does this list represent?",
    options: ["Owners", "Stakeholders", "Dependencies", "Restricted activities"],
    answer: [1],
    explanation: "Stakeholders are the individuals and groups affected by or interested in the change. An owner is the single accountable party, and dependencies are systems or services the change relies on.",
    difficulty: 2, tags: ["change management", "stakeholders"]
  },
  {
    id: "d1-052", domain: 1, objective: "1.3", type: "single",
    question: "Before approving a change to a core router's configuration, the CAB asks the engineer to evaluate how the change might affect other services, security posture and users. Which step is the CAB requesting?",
    options: ["Impact analysis", "Backout plan", "Version control", "Service restart"],
    answer: [0],
    explanation: "Impact analysis assesses the potential consequences of a change, including security and operational effects. A backout plan is how to reverse the change, and version control tracks configuration revisions.",
    difficulty: 2, tags: ["change management", "impact analysis"]
  },
  {
    id: "d1-053", domain: 1, objective: "1.3", type: "single",
    question: "A bank applies a major update to its online banking platform. The change fails halfway through, and engineers return the system to its previous working state using predefined steps. Which element of the change request made this possible?",
    options: ["Stakeholder list", "Test results", "Backout plan", "Allow list"],
    answer: [2],
    explanation: "A backout plan documents how to revert a change if it fails. Test results show whether the change should work before deployment, but do not provide the steps to restore the prior state.",
    difficulty: 2, tags: ["change management", "backout plan"]
  },
  {
    id: "d1-054", domain: 1, objective: "1.3", type: "single",
    question: "An engineer wants to deploy a new endpoint agent to 5,000 hosts. Which of the following should be completed FIRST to reduce the risk of widespread outage?",
    options: ["Deploy to all hosts during the maintenance window", "Test the agent in a non-production environment and record the results", "Notify the help desk after deployment", "Delete the previous agent version"],
    answer: [1],
    explanation: "Testing in a non-production environment and documenting results validates the change before it can affect production. The other choices either deploy first, communicate late, or remove the fallback.",
    difficulty: 2, tags: ["change management", "test results"]
  },
  {
    id: "d1-055", domain: 1, objective: "1.3", type: "single",
    question: "A hospital schedules a core switch firmware upgrade for Sunday at 2:00 a.m., when patient-care systems have the lowest usage. Which change management concept does the scheduling reflect?",
    options: ["Maintenance window", "Allow list", "Impact analysis", "Legacy application"],
    answer: [0],
    explanation: "A maintenance window is a pre-approved time period for performing changes that minimizes business disruption. The other options do not describe scheduling.",
    difficulty: 1, tags: ["change management", "maintenance window"]
  },
  {
    id: "d1-056", domain: 1, objective: "1.3", type: "single",
    question: "An MSP adopts a standard operating procedure that technicians must follow for every routine firewall change. What is the PRIMARY benefit of the SOP to the change management process?",
    options: ["It identifies the person accountable for the firewall", "It provides consistent, repeatable steps for implementing changes", "It defines the hours during which changes may be performed", "It describes how to revert a change that fails"],
    answer: [1],
    explanation: "An SOP documents consistent, repeatable steps so changes are carried out the same way each time with fewer errors. Identifying the accountable person is ownership, defining permitted hours is the maintenance window, and reverting a failed change is the backout plan.",
    difficulty: 2, tags: ["change management", "SOP"]
  },
  {
    id: "d1-057", domain: 1, objective: "1.3", type: "single",
    question: "A retailer deploys a new version of its kiosk application. After the change, the application fails to launch on every kiosk because the endpoint control permits only executables whose hashes have been pre-approved. Which technical implication did the change plan overlook?",
    options: ["Allow list", "Restricted activities", "Legacy applications", "Maintenance window"],
    answer: [0],
    explanation: "The kiosks use an allow list, which blocks anything not explicitly approved, so the new executable's hash needed to be added before deployment. Restricted activities limit what may be done during a change, legacy applications are outdated software, and the maintenance window is only the scheduled time for the change.",
    difficulty: 2, tags: ["change management", "allow list"]
  },
  {
    id: "d1-058", domain: 1, objective: "1.3", type: "single",
    question: "A change request for a production database includes a rule that no schema changes may be made during end-of-quarter financial close. Which technical change management concept is this?",
    options: ["Restricted activities", "Service restart", "Dependencies", "Version control"],
    answer: [0],
    explanation: "Restricted activities are actions that are prohibited or limited during certain periods or conditions to prevent risk. Dependencies are things that the change relies on, and version control tracks revisions.",
    difficulty: 2, tags: ["change management", "restricted activities"]
  },
  {
    id: "d1-059", domain: 1, objective: "1.3", type: "single",
    question: "An engineer plans to patch an application server but discovers that two other services call its API. The engineer documents these services in the change request so they can be tested afterward. Which concept is the engineer addressing?",
    options: ["Allow lists", "Legacy applications", "Dependencies", "Downtime"],
    answer: [2],
    explanation: "Dependencies are systems, services or components that rely on or are relied upon by the item being changed, and they must be considered to avoid unexpected breakage. Downtime is the resulting outage, not the relationship.",
    difficulty: 2, tags: ["change management", "dependencies"]
  },
  {
    id: "d1-060", domain: 1, objective: "1.3", type: "single",
    question: "A security engineer wants to apply an urgent patch to a critical domain controller, but the patch requires a service restart. Which of the following should the engineer do FIRST?",
    options: ["Restart the service immediately to close the vulnerability", "Submit the change, assess downtime and impact, and schedule the restart per the approved process", "Disable the domain controller until a decision is made", "Skip the change record because the patch is a security fix"],
    answer: [1],
    explanation: "Even urgent security changes should follow change management, including assessing downtime and scheduling the restart. Acting immediately or skipping records risks outages and loses accountability.",
    difficulty: 3, tags: ["change management", "service restart", "downtime"]
  },
  {
    id: "d1-061", domain: 1, objective: "1.3", type: "single",
    question: "A manufacturing company runs a 15-year-old application that cannot be updated without breaking production-line integrations. Which statement BEST describes the impact on change management?",
    options: ["Changes are riskier and often require extended testing and compensating controls", "The application can be exempted from change management because it rarely changes", "The application is lower risk because attackers are unlikely to target old software", "Changes can skip the backout plan because the vendor no longer supports it"],
    answer: [0],
    explanation: "Legacy applications are fragile, poorly documented and often unsupported, so changes carry more risk and usually need extra testing and compensating controls. They are not exempt from change management, age does not make software safer, and an unsupported system makes a backout plan more important, not less.",
    difficulty: 3, tags: ["change management", "legacy applications"]
  },
  {
    id: "d1-062", domain: 1, objective: "1.3", type: "multi",
    question: "After a network redesign adds a new DMZ segment, which of the following documentation items should be updated? Choose TWO.",
    options: ["Network diagrams", "Firewall policies and procedures", "The closed change ticket from last quarter's patch cycle", "The vendor's product datasheet", "Employee acceptable use acknowledgment forms"],
    answer: [0, 1],
    explanation: "Changes must be reflected in the network diagrams and in the policies and procedures that govern the affected systems so documentation stays accurate. Closed historical tickets, vendor datasheets and AUP acknowledgment forms are not affected by adding a DMZ segment.",
    difficulty: 2, tags: ["change management", "documentation", "network diagrams"]
  },
  {
    id: "d1-063", domain: 1, objective: "1.3", type: "single",
    question: "A DevOps team stores infrastructure-as-code templates in a repository that tracks each revision, the author and the time, and allows the team to roll back to an earlier version. Which change management practice is this?",
    options: ["Allow listing", "Impact analysis", "Version control", "Maintenance windows"],
    answer: [2],
    explanation: "Version control records every revision, author and timestamp and supports rollback and auditing. The other practices do not track document revisions.",
    difficulty: 1, tags: ["change management", "version control"]
  },
  {
    id: "d1-064", domain: 1, objective: "1.3", type: "single",
    question: "An engineer updates the configuration file for a production web application during an approved change. The change is marked complete, but the application keeps using its old settings until users report the problem the next day. Which technical implication did the change plan MOST likely fail to account for?",
    options: ["Dependencies", "Application restart", "Backout plan", "Allow list"],
    answer: [1],
    explanation: "Many applications read their configuration only at startup, so the change plan should have included an application restart (and the brief downtime it causes). Dependencies are other systems affected by the change, the backout plan reverses a change, and an allow list controls which software may run.",
    difficulty: 2, tags: ["change management", "application restart"]
  },
  {
    id: "d1-065", domain: 1, objective: "1.3", type: "multi",
    question: "A change management policy for production systems should include which of the following? Choose THREE.",
    options: ["Documented approval from the owner or CAB", "A tested backout plan", "An impact analysis covering security and operations", "An exemption from review for changes made by senior administrators", "Deletion of change records after successful deployment"],
    answer: [0, 1, 2],
    explanation: "Approval, a backout plan and impact analysis are core elements of controlled change. Exempting senior administrators bypasses oversight, and deleting change records destroys the audit trail.",
    difficulty: 2, tags: ["change management", "approval process", "backout plan"]
  },
  {
    id: "d1-066", domain: 1, objective: "1.4", type: "single",
    question: "In a public key infrastructure, a user wants to send an encrypted message that only a specific colleague can read. Which key should the user encrypt the message with?",
    options: ["The colleague's public key", "The colleague's private key", "The user's own private key", "The user's own public key"],
    answer: [0],
    explanation: "Data encrypted with a recipient's public key can only be decrypted with that recipient's private key, which they alone hold. The private key is never shared, and the sender's own keys would not restrict reading to the colleague.",
    difficulty: 1, tags: ["PKI", "asymmetric encryption", "public key"]
  },
  {
    id: "d1-067", domain: 1, objective: "1.4", type: "single",
    question: "A company must encrypt several terabytes of archived data and needs the fastest possible performance. Which type of encryption is MOST appropriate for bulk data?",
    options: ["Asymmetric encryption", "Symmetric encryption", "Hashing", "Steganography"],
    answer: [1],
    explanation: "Symmetric algorithms such as AES are much faster than asymmetric ones and are used for bulk data. Hashing is one-way and cannot be reversed to recover data, and steganography hides data rather than encrypting it.",
    difficulty: 1, tags: ["symmetric encryption", "performance"]
  },
  {
    id: "d1-068", domain: 1, objective: "1.4", type: "single",
    question: "A security policy requires an industry-standard symmetric algorithm with 256-bit keys for data at rest. Which of the following meets this requirement?",
    options: ["RSA-2048", "SHA-256", "AES-256", "Diffie-Hellman"],
    answer: [2],
    explanation: "AES supports 128-, 192- and 256-bit keys and is the standard symmetric cipher. RSA and Diffie-Hellman are asymmetric/key exchange, and SHA-256 is a hash with no key.",
    difficulty: 1, tags: ["AES", "symmetric encryption", "key length"]
  },
  {
    id: "d1-069", domain: 1, objective: "1.4", type: "single",
    question: "Two systems with no shared secret need to securely establish a symmetric session key over an untrusted network. Which of the following provides this capability?",
    options: ["Key exchange such as Diffie-Hellman", "Salting", "Tokenization", "Hash-based message authentication"],
    answer: [0],
    explanation: "Diffie-Hellman and similar key exchange algorithms let two parties derive a shared secret over an insecure channel. Salting and tokenization protect stored data, and an HMAC requires an already shared key.",
    difficulty: 2, tags: ["key exchange", "Diffie-Hellman"]
  },
  {
    id: "d1-070", domain: 1, objective: "1.4", type: "single",
    question: "A consulting firm is concerned about the loss of employee laptops. Which of the following would BEST protect all data on the devices, including the OS, swap files and temporary files, if a laptop is stolen?",
    options: ["File-level encryption of the Documents folder", "Full-disk encryption", "Database column encryption", "Transport encryption"],
    answer: [1],
    explanation: "Full-disk encryption protects everything on the drive, including system and temporary files. File-level encryption leaves other areas unprotected, database encryption is unrelated to laptop storage, and transport encryption protects data in motion.",
    difficulty: 2, tags: ["full-disk encryption", "data at rest"]
  },
  {
    id: "d1-071", domain: 1, objective: "1.4", type: "single",
    question: "A DBA wants the database engine to encrypt the data files and backups on disk without modifying the application code. Which technology BEST accomplishes this?",
    options: ["Transparent data encryption", "Data masking", "Steganography", "Certificate pinning"],
    answer: [0],
    explanation: "Transparent data encryption (database-level encryption) encrypts data files at rest without application changes. Masking hides values in query results, and the other options are unrelated.",
    difficulty: 2, tags: ["database encryption", "TDE"]
  },
  {
    id: "d1-072", domain: 1, objective: "1.4", type: "single",
    question: "A researcher needs to protect a single data partition on a shared workstation while leaving the OS partition unencrypted. Which level of encryption does this describe?",
    options: ["Record-level", "File-level", "Volume or partition-level", "Transport-level"],
    answer: [2],
    explanation: "Volume or partition encryption protects a specific logical drive section independent of the rest of the disk. File encryption targets individual files, record encryption targets database rows, and transport encryption protects data in motion.",
    difficulty: 2, tags: ["encryption levels", "volume encryption"]
  },
  {
    id: "d1-073", domain: 1, objective: "1.4", type: "single",
    question: "Customers submit payment information through a web form. Which of the following protects that data while it travels between the browser and the server?",
    options: ["Full-disk encryption", "TLS", "Salted hashing", "Data masking"],
    answer: [1],
    explanation: "TLS provides transport (in-transit) encryption between client and server. Full-disk encryption protects data at rest, hashing is one-way, and masking only obscures displayed values.",
    difficulty: 1, tags: ["transport encryption", "TLS", "data in transit"]
  },
  {
    id: "d1-074", domain: 1, objective: "1.4", type: "multi",
    question: "Which of the following are asymmetric encryption algorithms? Choose TWO.",
    options: ["RSA", "Elliptic curve cryptography (ECC)", "AES", "3DES", "SHA-256"],
    answer: [0, 1],
    explanation: "RSA and ECC use public/private key pairs. AES and 3DES are symmetric block ciphers, and SHA-256 is a hashing algorithm.",
    difficulty: 1, tags: ["asymmetric encryption", "RSA", "ECC"]
  },
  {
    id: "d1-075", domain: 1, objective: "1.4", type: "single",
    question: "A mobile app developer needs strong public-key security with small keys and low processor and battery usage. Which of the following is the BEST choice?",
    options: ["RSA with a 16384-bit key", "Elliptic curve cryptography", "3DES", "MD5"],
    answer: [1],
    explanation: "ECC provides equivalent strength to RSA with much shorter keys, making it efficient for constrained devices. A huge RSA key is slow, 3DES is a weak symmetric cipher, and MD5 is a broken hash.",
    difficulty: 2, tags: ["ECC", "key length", "mobile"]
  },
  {
    id: "d1-076", domain: 1, objective: "1.4", type: "single",
    question: "A laptop's motherboard includes a dedicated chip that stores the disk encryption keys and verifies boot integrity. What is this component?",
    options: ["Hardware security module", "Trusted Platform Module", "Key management system", "Smart card"],
    answer: [1],
    explanation: "A TPM is a chip on the endpoint's motherboard that securely stores keys and measurements for features such as BitLocker. An HSM is a separate appliance or card for enterprise key operations, and a KMS is a management service.",
    difficulty: 1, tags: ["TPM", "BitLocker"]
  },
  {
    id: "d1-077", domain: 1, objective: "1.4", type: "single",
    question: "A certificate authority needs to protect its root private key in tamper-resistant hardware and perform signing operations without ever exposing the key. Which of the following is the BEST solution?",
    options: ["TPM on a laptop", "Hardware security module", "Software keystore on a file server", "Password-protected PFX file"],
    answer: [1],
    explanation: "An HSM is a tamper-resistant device designed to generate, store and use keys without exposing them, which is why CAs use them. A laptop TPM is not suited for CA operations, and software keystores or PFX files can be copied.",
    difficulty: 2, tags: ["HSM", "PKI", "key protection"]
  },
  {
    id: "d1-078", domain: 1, objective: "1.4", type: "single",
    question: "A cloud-centric organization needs a centralized service to create, rotate, audit and retire encryption keys used across many applications. Which of the following BEST fits this need?",
    options: ["Key management system", "Secure enclave", "Honeypot", "Certificate revocation list"],
    answer: [0],
    explanation: "A key management system centralizes the key lifecycle: generation, storage, rotation, access control and destruction. A secure enclave isolates processing on a CPU, and a CRL lists revoked certificates.",
    difficulty: 2, tags: ["key management system", "key rotation"]
  },
  {
    id: "d1-079", domain: 1, objective: "1.4", type: "single",
    question: "A mobile device processes biometric templates inside an isolated region of the main processor so that even the operating system cannot read the data. Which of the following BEST describes this feature?",
    options: ["Hardware security module", "Key escrow", "Secure enclave", "Tokenization"],
    answer: [2],
    explanation: "A secure enclave is an isolated, protected area of a processor for sensitive operations and data, inaccessible even to the OS. An HSM is a separate device, and escrow and tokenization address different problems.",
    difficulty: 3, tags: ["secure enclave", "biometrics"]
  },
  {
    id: "d1-080", domain: 1, objective: "1.4", type: "single",
    question: "A company is concerned that losing a departing employee's encryption key would make archived data unrecoverable. Which practice would allow authorized recovery of that key?",
    options: ["Key stretching", "Key escrow", "Salting", "Obfuscation"],
    answer: [1],
    explanation: "Key escrow stores a copy of keys with a trusted third party or protected store so they can be recovered when needed. Key stretching strengthens passwords, salting protects hashes, and obfuscation hides content.",
    difficulty: 2, tags: ["key escrow", "key recovery"]
  },
  {
    id: "d1-081", domain: 1, objective: "1.4", type: "single",
    question: "An investigator discovers that a seemingly ordinary image file contains a hidden text message embedded in its least significant bits. Which technique was used?",
    options: ["Tokenization", "Data masking", "Steganography", "Salting"],
    answer: [2],
    explanation: "Steganography conceals data inside another file such as an image. Tokenization replaces data with surrogate values, masking obscures parts of data, and salting adds random data before hashing.",
    difficulty: 1, tags: ["obfuscation", "steganography"]
  },
  {
    id: "d1-082", domain: 1, objective: "1.4", type: "single",
    question: "An online retailer wants to store customers' payment card numbers outside its systems, replacing them in its database with random surrogate values that map back to the real numbers only in a secured vault. Which technique is this?",
    options: ["Tokenization", "Hashing", "Steganography", "Key stretching"],
    answer: [0],
    explanation: "Tokenization substitutes sensitive data with non-sensitive tokens, with the mapping held in a secure vault. Hashing is one-way and not reversible by lookup, and steganography hides data in other files.",
    difficulty: 2, tags: ["tokenization", "PCI DSS", "obfuscation"]
  },
  {
    id: "d1-083", domain: 1, objective: "1.4", type: "single",
    question: "A customer-service application should show only the last four digits of a Social Security number to agents, while the full value remains stored in the database. Which technique BEST accomplishes this?",
    options: ["Data masking", "Salting", "Key escrow", "Steganography"],
    answer: [0],
    explanation: "Data masking obscures portions of a value when displayed while the original data remains intact. Salting applies to password hashes, key escrow stores keys for recovery, and steganography hides data inside other files.",
    difficulty: 2, tags: ["data masking", "obfuscation", "PII"]
  },
  {
    id: "d1-084", domain: 1, objective: "1.4", type: "multi",
    question: "Which of the following are hashing algorithms? Choose TWO.",
    options: ["SHA-256", "MD5", "AES", "RSA", "ECC"],
    answer: [0, 1],
    explanation: "SHA-256 and MD5 produce fixed-length digests from input data (MD5 is considered weak). AES is a symmetric cipher, and RSA and ECC are asymmetric algorithms.",
    difficulty: 1, tags: ["hashing", "SHA-256", "MD5"]
  },
  {
    id: "d1-085", domain: 1, objective: "1.4", type: "single",
    question: "A security analyst finds that two different files produce the same MD5 hash. Which hashing weakness does this demonstrate?",
    options: ["Key escrow", "Salting failure", "Collision", "Replay"],
    answer: [2],
    explanation: "A collision occurs when two different inputs produce the same hash, which is why MD5 is no longer trusted for integrity or signatures. The other terms refer to unrelated concepts.",
    difficulty: 2, tags: ["hashing", "collision", "MD5"]
  },
  {
    id: "d1-086", domain: 1, objective: "1.4", type: "single",
    question: "A breach exposes a user table in which many users share identical password hashes, and attackers quickly crack them using precomputed rainbow tables. Which control would have BEST prevented this?",
    options: ["Adding a unique random salt to each password before hashing", "Increasing the minimum password length to eight characters", "Switching the hashing algorithm from SHA-256 to MD5", "Encoding the stored hashes in Base64"],
    answer: [0],
    explanation: "Unique salts make identical passwords produce different hashes and render precomputed rainbow tables useless. An eight-character minimum still falls within existing rainbow tables and leaves identical hashes, MD5 is weaker, and Base64 is a reversible encoding that adds no protection.",
    difficulty: 2, tags: ["salting", "rainbow tables", "password storage"]
  },
  {
    id: "d1-087", domain: 1, objective: "1.4", type: "multi",
    question: "A developer is selecting a password storage method that slows brute-force attacks through key stretching. Which of the following would be appropriate? Choose TWO.",
    options: ["bcrypt", "PBKDF2", "MD5", "SHA-1 without a salt", "Base64 encoding"],
    answer: [0, 1],
    explanation: "bcrypt and PBKDF2 apply many iterations (and salts) to make each guess computationally expensive, which is key stretching. MD5 and unsalted SHA-1 are fast and weak, and Base64 is not protection at all.",
    difficulty: 2, tags: ["key stretching", "bcrypt", "PBKDF2"]
  },
  {
    id: "d1-088", domain: 1, objective: "1.4", type: "single",
    question: "A software publisher wants customers to verify that an update came from the publisher and was not altered. The publisher creates a hash of the update and then encrypts that hash. With which key should the hash be encrypted?",
    options: ["The publisher's private key", "The publisher's public key", "The customer's private key", "The customer's public key"],
    answer: [0],
    explanation: "A digital signature is a hash encrypted with the signer's private key, which anyone can verify using the corresponding public key. Only the publisher holds its private key, which proves origin.",
    difficulty: 2, tags: ["digital signatures", "PKI"]
  },
  {
    id: "d1-089", domain: 1, objective: "1.4", type: "multi",
    question: "A properly implemented digital signature provides which of the following? Choose THREE.",
    options: ["Integrity", "Authentication of the signer", "Non-repudiation", "Confidentiality of the message", "Availability"],
    answer: [0, 1, 2],
    explanation: "A signature proves the message was not altered, identifies who signed it, and prevents the signer from denying it. It does not encrypt the message body, so it does not provide confidentiality.",
    difficulty: 3, tags: ["digital signatures", "non-repudiation", "integrity"]
  },
  {
    id: "d1-090", domain: 1, objective: "1.4", type: "single",
    question: "A consortium of banks records transactions in blocks that are linked by hashes and replicated across many participants so that past entries cannot be quietly altered. Which technology is this?",
    options: ["Blockchain", "Key escrow", "Steganography", "Public key infrastructure"],
    answer: [0],
    explanation: "A blockchain is a distributed ledger of hash-linked blocks, making tampering evident. PKI manages certificates, escrow stores keys, and steganography conceals data.",
    difficulty: 1, tags: ["blockchain", "distributed ledger"]
  },
  {
    id: "d1-091", domain: 1, objective: "1.4", type: "single",
    question: "A public blockchain is described as an open public ledger. Which statement BEST describes the security benefit of this design?",
    options: ["Any participant can independently verify the transaction history", "A central administrator controls who can read the ledger", "The issuing institution can correct past entries when needed", "All transaction details are encrypted and hidden from participants"],
    answer: [0],
    explanation: "An open public ledger is replicated to all participants, so anyone can verify the records, and hash-chained blocks make retroactive tampering evident. There is no central administrator, no single party can edit past entries, and transactions are visible rather than hidden.",
    difficulty: 3, tags: ["blockchain", "open public ledger"]
  },
  {
    id: "d1-092", domain: 1, objective: "1.4", type: "single",
    question: "A company wants to issue digital certificates for its internal servers and employees and to have a trusted entity vouch for the identity bound to each public key. Which PKI component provides this?",
    options: ["Registration authority", "Certificate authority", "Hardware security module", "Key stretching"],
    answer: [1],
    explanation: "A certificate authority issues and digitally signs certificates, attesting to the binding between an identity and a public key. A registration authority only verifies requests, and an HSM only protects keys.",
    difficulty: 1, tags: ["PKI", "certificate authority"]
  },
  {
    id: "d1-093", domain: 1, objective: "1.4", type: "single",
    question: "A browser needs to check whether a server certificate has been revoked, and it wants a real-time answer for just that certificate rather than downloading a large list. Which mechanism should it use?",
    options: ["CRL", "OCSP", "CSR", "Key escrow"],
    answer: [1],
    explanation: "OCSP queries a responder for the status of a single certificate in near real time. A CRL is a periodically published list of all revoked certificates, and a CSR is a request to obtain a certificate.",
    difficulty: 2, tags: ["OCSP", "CRL", "certificate revocation"]
  },
  {
    id: "d1-094", domain: 1, objective: "1.4", type: "single",
    question: "TLS connections to a high-traffic e-commerce site are slow because every visitor's browser separately queries the CA's OCSP responder. Which feature allows the web server to include a CA-signed, time-stamped revocation status for its certificate in the TLS handshake?",
    options: ["OCSP stapling", "Certificate pinning", "CRL distribution point", "Wildcard certificate"],
    answer: [0],
    explanation: "With OCSP stapling, the server periodically obtains a signed OCSP response and staples it to the handshake, so clients do not need to contact the responder (which also reduces load on the CA and avoids leaking client browsing to it). Pinning restricts which certificates a client accepts, a CRL distribution point tells clients where to download the revocation list themselves, and a wildcard certificate covers subdomains.",
    difficulty: 3, tags: ["OCSP stapling", "certificates", "TLS"]
  },
  {
    id: "d1-095", domain: 1, objective: "1.4", type: "single",
    question: "A developer creates a certificate for a test web server and signs it with the server's own private key. Users who browse to the server receive an untrusted certificate warning. Which type of certificate is this?",
    options: ["Wildcard certificate", "Third-party certificate", "Self-signed certificate", "Root certificate authority"],
    answer: [2],
    explanation: "A self-signed certificate is signed by its own key rather than by a trusted CA, so browsers do not trust it by default. A third-party CA certificate would be trusted, and a wildcard certificate describes name scope, not the signer.",
    difficulty: 2, tags: ["self-signed", "certificates"]
  },
  {
    id: "d1-096", domain: 1, objective: "1.4", type: "single",
    question: "A client trusts a web server's certificate even though the issuing intermediate CA's certificate has never been seen on that client before. Which of the following BEST explains why?",
    options: ["The intermediate CA's certificate is signed by a root CA in the client's trust store", "The server's certificate is a wildcard certificate covering the domain", "The server staples an OCSP response for its certificate to the handshake", "The server's certificate was issued in response to a valid CSR"],
    answer: [0],
    explanation: "Trust follows the chain of trust: the server certificate is signed by the intermediate, whose certificate is signed by a root CA that is pre-installed in the client's trust store (the root of trust). Wildcard scope, OCSP stapling and the CSR process do not establish trust in an unknown issuer.",
    difficulty: 3, tags: ["chain of trust", "root of trust", "certificates"]
  },
  {
    id: "d1-097", domain: 1, objective: "1.4", type: "single",
    question: "A web administrator generates a key pair on a new server and needs to obtain a CA-signed certificate. Which of the following should the administrator submit to the CA?",
    options: ["Private key", "Certificate signing request", "Certificate revocation list", "Session key"],
    answer: [1],
    explanation: "A CSR contains the public key and identity information to be signed by the CA. The private key must never be sent to the CA, and a CRL and a session key are unrelated.",
    difficulty: 2, tags: ["CSR", "certificates", "PKI"]
  },
  {
    id: "d1-098", domain: 1, objective: "1.4", type: "single",
    question: "A company hosts mail.example.com, vpn.example.com and portal.example.com and wants a single certificate that covers all current and future hosts in the example.com domain at the lowest cost. Which should it purchase?",
    options: ["Self-signed certificate", "Wildcard certificate for *.example.com", "Individual certificates for each host", "Code-signing certificate"],
    answer: [1],
    explanation: "A wildcard certificate covers any single-level subdomain of the domain, including future hosts. Self-signed certificates are not trusted, individual certificates cost more to manage, and code-signing certificates sign software.",
    difficulty: 2, tags: ["wildcard certificate", "certificates"]
  },
  {
    id: "d1-099", domain: 1, objective: "1.4", type: "multi",
    question: "A hospital is reviewing how patient data stored on its servers is protected. Which of the following are encryption levels that protect data at rest? Choose THREE.",
    options: ["Full-disk encryption", "Record-level database encryption", "File-level encryption", "Transport encryption (TLS)", "Network-layer encryption (IPsec tunnel)"],
    answer: [0, 1, 2],
    explanation: "Full-disk, record-level and file-level encryption all protect stored data, at different granularities. TLS and IPsec tunnels are transport/communication encryption that protect data in transit, not at rest.",
    difficulty: 2, tags: ["encryption levels", "data at rest", "record-level"]
  },
  {
    id: "d1-100", domain: 1, objective: "1.4", type: "single",
    question: "Users receive a certificate name-mismatch error when browsing to https://shop.example.com, although the server's certificate is valid and was issued for www.example.com. Which certificate feature would BEST allow one certificate to cover both names?",
    options: ["OCSP stapling", "Subject alternative name (SAN) entries", "Key escrow", "Certificate revocation list"],
    answer: [1],
    explanation: "SAN entries list multiple hostnames that a single certificate is valid for. OCSP stapling and CRLs concern revocation status, and key escrow concerns key recovery.",
    difficulty: 2, tags: ["SAN", "certificates", "TLS"]
  }
);
