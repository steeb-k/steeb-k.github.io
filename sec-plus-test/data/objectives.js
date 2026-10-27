// CompTIA Security+ SY0-701 exam objectives. Shape is relied on by the app, the banks and the validator — do not change it.
window.SEC_OBJECTIVES = {
  1: {
    name: "General Security Concepts",
    short: "General Concepts",
    weight: 0.12,
    objectives: {
      "1.1": "Compare and contrast various types of security controls",
      "1.2": "Summarize fundamental security concepts",
      "1.3": "Explain the importance of change management processes and the impact to security",
      "1.4": "Explain the importance of using appropriate cryptographic solutions"
    }
  },
  2: {
    name: "Threats, Vulnerabilities, and Mitigations",
    short: "Threats & Vulns",
    weight: 0.22,
    objectives: {
      "2.1": "Compare and contrast common threat actors and motivations",
      "2.2": "Explain common threat vectors and attack surfaces",
      "2.3": "Explain various types of vulnerabilities",
      "2.4": "Given a scenario, analyze indicators of malicious activity",
      "2.5": "Explain the purpose of mitigation techniques used to secure the enterprise"
    }
  },
  3: {
    name: "Security Architecture",
    short: "Architecture",
    weight: 0.18,
    objectives: {
      "3.1": "Compare and contrast security implications of different architecture models",
      "3.2": "Given a scenario, apply security principles to secure enterprise infrastructure",
      "3.3": "Compare and contrast concepts and strategies to protect data",
      "3.4": "Explain the importance of resilience and recovery in security architecture"
    }
  },
  4: {
    name: "Security Operations",
    short: "Operations",
    weight: 0.28,
    objectives: {
      "4.1": "Given a scenario, apply common security techniques to computing resources",
      "4.2": "Explain the security implications of proper hardware, software, and data asset management",
      "4.3": "Explain various activities associated with vulnerability management",
      "4.4": "Explain security alerting and monitoring concepts and tools",
      "4.5": "Given a scenario, modify enterprise capabilities to enhance security",
      "4.6": "Given a scenario, implement and maintain identity and access management",
      "4.7": "Explain the importance of automation and orchestration related to secure operations",
      "4.8": "Explain appropriate incident response activities",
      "4.9": "Given a scenario, use data sources to support an investigation"
    }
  },
  5: {
    name: "Security Program Management and Oversight",
    short: "Program Mgmt",
    weight: 0.20,
    objectives: {
      "5.1": "Summarize elements of effective security governance",
      "5.2": "Explain elements of the risk management process",
      "5.3": "Explain the processes associated with third-party risk assessment and management",
      "5.4": "Summarize elements of effective security compliance",
      "5.5": "Explain types and purposes of audits and assessments",
      "5.6": "Given a scenario, implement security awareness practices"
    }
  }
};

window.SEC_EXAM = {
  version: "SY0-701",
  totalQuestions: 90,
  pbqCount: 5,
  mcqPerDomain: { 1: 10, 2: 19, 3: 15, 4: 24, 5: 17 }, // sums to 85; weights 12/22/18/28/20 %
  minutes: 90,
  passScaled: 750,
  scaledMin: 100,
  scaledMax: 900
};

window.SEC_BANK = window.SEC_BANK || [];
window.SEC_PBQ = window.SEC_PBQ || [];
