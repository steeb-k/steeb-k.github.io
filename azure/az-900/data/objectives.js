// Microsoft AZ-900 (Azure Fundamentals) skills measured as of July 20, 2026. Microsoft does not number its skill groups; the
// d.n numbers are this kit's own. Shape is relied on by the app, the banks and the validator — do not change it.
window.AZ_OBJECTIVES = {
  1: {
    name: "Cloud Concepts",
    short: "Cloud Concepts",
    weight: 0.275,
    objectives: {
      "1.1": "Describe cloud computing",
      "1.2": "Describe the benefits of using cloud services",
      "1.3": "Describe cloud service types"
    }
  },
  2: {
    name: "Azure Architecture and Services",
    short: "Architecture & Services",
    weight: 0.375,
    objectives: {
      "2.1": "Describe the core architectural components of Azure",
      "2.2": "Describe Azure compute and networking services",
      "2.3": "Describe Azure storage services",
      "2.4": "Describe Azure identity, access, and security"
    }
  },
  3: {
    name: "Azure Management and Governance",
    short: "Mgmt & Governance",
    weight: 0.35,
    objectives: {
      "3.1": "Describe cost management in Azure",
      "3.2": "Describe features and tools in Azure for governance and compliance",
      "3.3": "Describe features and tools for managing and deploying Azure resources",
      "3.4": "Describe monitoring tools in Azure"
    }
  }
};

window.AZ_EXAM = {
  version: "AZ-900",
  totalQuestions: 40,
  pbqCount: 4,                          // interactive items (yes/no grids, matching, ordering, dropdown tables)
  mcqPerDomain: { 1: 10, 2: 14, 3: 12 }, // sums to 36; official weights 25–30 / 35–40 / 30–35 %
  minutes: 45,
  passScaled: 700,
  scaledMin: 0,
  scaledMax: 1000
};

window.AZ_BANK = window.AZ_BANK || [];
window.AZ_PBQ = window.AZ_PBQ || [];
