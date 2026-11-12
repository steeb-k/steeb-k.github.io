// data/domain3.js — AZ-900 Domain 3: Azure management and governance (objectives 3.1–3.4)
window.AZ_BANK = window.AZ_BANK || [];
window.AZ_BANK.push(
  // ───────────── 3.1 Describe cost management in Azure ─────────────
  {
    id: "d3-001", domain: 3, objective: "3.1", type: "single",
    question: "A company plans to deploy several virtual machines. Which factor affects the monthly cost of the virtual machines?",
    options: [
      "The resource group that contains the virtual machines",
      "The number of tags applied to the virtual machines",
      "The Azure region where the virtual machines are deployed",
      "The management group above the subscription"
    ],
    answer: [2],
    explanation: "Prices differ between regions because power, labor, taxes, and fees vary by location. Resource groups, tags, and management groups are free organizational constructs and do not change the price of a resource.",
    difficulty: 1, tags: ["cost factors", "geography"]
  },
  {
    id: "d3-002", domain: 3, objective: "3.1", type: "single",
    question: "A startup deleted ten test virtual machines last month, but the invoice still shows charges for the managed disks and public IP addresses that were attached to them. Which cost factor does this describe?",
    options: ["Maintenance", "Geography", "Subscription type", "Azure Marketplace"],
    answer: [0],
    explanation: "Maintenance is about keeping the environment clean: resources provisioned alongside a VM can be left behind when the VM is removed and keep generating charges. Geography concerns regional price differences, and the other two factors concern allowances and third-party offers.",
    difficulty: 2, tags: ["cost factors", "maintenance", "orphaned resources"]
  },
  {
    id: "d3-003", domain: 3, objective: "3.1", type: "single",
    question: "Which term completes the sentence: Data transfer out of Azure datacenters is priced according to ______, which are geographical groupings of Azure regions.",
    options: ["availability zones", "region pairs", "management groups", "billing zones"],
    answer: [3],
    explanation: "A billing zone is a geographical grouping of regions used only for data-transfer pricing. Availability zones and region pairs are resiliency constructs, and management groups organize subscriptions.",
    difficulty: 1, tags: ["billing zones", "network traffic"]
  },
  {
    id: "d3-004", domain: 3, objective: "3.1", type: "single",
    question: "A media company uploads large video files from its offices to Azure Blob Storage and later streams them to viewers around the world. Which data transfer is generally free of bandwidth charges?",
    options: [
      "Data streamed from Azure to viewers on another continent",
      "Data uploaded from the offices into Azure",
      "Data copied from Azure to an on-premises archive",
      "Data sent from Azure to a different cloud provider"
    ],
    answer: [1],
    explanation: "Inbound data transfer (ingress) into Azure datacenters is generally free. The other three options are all outbound transfers (egress), which are charged based on billing zone.",
    difficulty: 2, tags: ["egress", "ingress", "network traffic"]
  },
  {
    id: "d3-005", domain: 3, objective: "3.1", type: "single",
    question: "A retailer deploys a third-party firewall appliance from Azure Marketplace onto an Azure virtual machine. What should the retailer expect to pay for?",
    options: [
      "Only the vendor's software fee, because Marketplace infrastructure is free",
      "Only the Azure virtual machine, because Marketplace software is always free",
      "The Azure services used, plus any fees the vendor sets",
      "A fixed Marketplace subscription fee that Microsoft sets for all vendors"
    ],
    answer: [2],
    explanation: "With Azure Marketplace you pay for the underlying Azure services and may also pay for the third-party vendor's software or expertise; the vendor defines the billing structure. Neither the infrastructure nor the software is automatically free.",
    difficulty: 2, tags: ["Azure Marketplace", "cost factors"]
  },
  {
    id: "d3-006", domain: 3, objective: "3.1", type: "single",
    question: "An Azure free account includes a starting credit and free use of certain products for a limited period. Which cost factor does this describe?",
    options: ["Resource type", "Subscription type", "Consumption", "Maintenance"],
    answer: [1],
    explanation: "Some subscription types, such as the free account, include usage allowances that affect what you pay. Resource type and consumption relate to what you deploy and how much you use, and maintenance relates to cleaning up unused resources.",
    difficulty: 1, tags: ["subscription type", "cost factors"]
  },
  {
    id: "d3-007", domain: 3, objective: "3.1", type: "single",
    question: "A bank runs a production database on Azure that operates 24 hours a day at a stable capacity and is expected to do so for the next three years. The bank wants the lowest price for this workload. What should the bank use?",
    options: ["Azure Spot Virtual Machines", "Pay-as-you-go pricing", "An Azure free account", "Azure Reservations"],
    answer: [3],
    explanation: "Reservations discount stable, predictable workloads in return for a one-year or three-year commitment to specific resources. Spot capacity can be evicted, which is unacceptable for a production database, and pay-as-you-go carries the highest rate.",
    difficulty: 2, tags: ["reservations", "pricing options"]
  },
  {
    id: "d3-008", domain: 3, objective: "3.1", type: "single",
    question: "A software company spends a steady amount on compute every hour, but the workloads shift between virtual machine sizes, regions, and other compute services as products change. The company is willing to commit for one year. Which pricing option should you recommend?",
    options: ["Azure savings plan for compute", "Azure Reservations", "Azure Spot Virtual Machines", "Azure Hybrid Benefit"],
    answer: [0],
    explanation: "A savings plan for compute commits to an hourly spend and applies the discount flexibly across eligible compute services. A reservation is tied to specific resources, Spot offers no commitment or guarantee, and Hybrid Benefit is about reusing licenses.",
    difficulty: 2, tags: ["savings plan", "pricing options"]
  },
  {
    id: "d3-009", domain: 3, objective: "3.1", type: "single",
    question: "An animation studio renders frames overnight. Any rendering job can be stopped and restarted without loss, and the studio wants the lowest possible compute price. What should the studio use?",
    options: ["Azure Reservations", "Azure Spot Virtual Machines", "Azure Hybrid Benefit", "Azure savings plan for compute"],
    answer: [1],
    explanation: "Spot Virtual Machines use unused Azure capacity at reduced prices and suit interruptible work such as batch rendering. Reservations and savings plans require a term commitment, and Hybrid Benefit depends on existing licenses.",
    difficulty: 2, tags: ["spot", "pricing options"]
  },
  {
    id: "d3-010", domain: 3, objective: "3.1", type: "single",
    question: "A manufacturer is moving servers to Azure virtual machines. It already owns Windows Server and SQL Server licenses with Software Assurance for its datacenter. What should the manufacturer use to reduce the cost of the Azure virtual machines?",
    options: ["Azure Spot Virtual Machines", "A department spending quota", "Azure Hybrid Benefit", "The pricing calculator"],
    answer: [2],
    explanation: "Azure Hybrid Benefit lets an organization apply existing on-premises licenses to Azure, lowering the price. Spot is for interruptible workloads, a spending quota only tracks spend, and the pricing calculator only estimates cost.",
    difficulty: 2, tags: ["Azure Hybrid Benefit", "licensing"]
  },
  {
    id: "d3-011", domain: 3, objective: "3.1", type: "single",
    question: "What does an organization commit to when it buys a one-year or three-year Azure savings plan for compute?",
    options: [
      "A specific virtual machine size in a specific region",
      "A fixed number of virtual machines for the term",
      "A monthly budget that cannot be exceeded",
      "A fixed hourly spend on eligible compute services"
    ],
    answer: [3],
    explanation: "A savings plan is a commitment to an hourly spend amount, and Azure applies the discount to eligible compute usage as it occurs. Committing to specific resources describes a reservation, and a savings plan is not a spending cap.",
    difficulty: 3, tags: ["savings plan", "reservations"]
  },
  {
    id: "d3-012", domain: 3, objective: "3.1", type: "single",
    question: "A research team is considering Azure Spot Virtual Machines for a data processing job. Which statement describes the tradeoff the team accepts?",
    options: [
      "Azure can evict the virtual machines when it needs the capacity back",
      "The team must commit to the virtual machines for at least one year",
      "The virtual machines can run only in a single billing zone",
      "The team must already own operating system licenses"
    ],
    answer: [0],
    explanation: "Spot pricing uses spare capacity, so workloads can be evicted when Azure reclaims it. A term commitment describes reservations and savings plans, and existing licenses relate to Azure Hybrid Benefit.",
    difficulty: 3, tags: ["spot", "eviction"]
  },
  {
    id: "d3-013", domain: 3, objective: "3.1", type: "single",
    question: "What is the purpose of the pricing calculator?",
    options: [
      "To show the actual charges accrued by a subscription this month",
      "To estimate the cost of Azure resources before they are deployed",
      "To recommend resources that should be resized or shut down",
      "To send an alert when spending passes a threshold"
    ],
    answer: [1],
    explanation: "The pricing calculator produces cost estimates for resources you plan to deploy. Actual charges and spending alerts belong to Microsoft Cost Management, and resize recommendations come from Azure Advisor.",
    difficulty: 1, tags: ["pricing calculator"]
  },
  {
    id: "d3-014", domain: 3, objective: "3.1", type: "single",
    question: "An architect adds two virtual machines, a storage account, and a database to the pricing calculator and configures each one. What is the result?",
    options: [
      "The resources are deployed to the architect's subscription",
      "The resources are reserved for one year at a discounted rate",
      "An estimate is shown and nothing is provisioned",
      "A budget is created for the estimated amount"
    ],
    answer: [2],
    explanation: "The pricing calculator is for information only: it shows an estimate and cannot provision, reserve, or bill anything. Budgets are created in Microsoft Cost Management.",
    difficulty: 2, tags: ["pricing calculator", "estimates"]
  },
  {
    id: "d3-015", domain: 3, objective: "3.1", type: "single",
    question: "A consulting firm is designing a new web application and wants to compare the expected monthly cost of hosting it in two different regions before anything is deployed. What should the firm use?",
    options: ["Cost analysis in Microsoft Cost Management", "Azure Advisor", "Azure Monitor", "The pricing calculator"],
    answer: [3],
    explanation: "The pricing calculator estimates cost for a planned configuration and lets you change the region to compare. Cost analysis and Azure Advisor work from resources that already exist, and Azure Monitor collects telemetry rather than prices.",
    difficulty: 2, tags: ["pricing calculator", "Cost Management"]
  },
  {
    id: "d3-016", domain: 3, objective: "3.1", type: "single",
    question: "A finance manager wants a visual breakdown of last month's actual Azure spending by resource group and by service. What should the finance manager use?",
    options: ["Cost analysis in Microsoft Cost Management", "The pricing calculator", "Azure Service Health", "Microsoft Purview"],
    answer: [0],
    explanation: "Cost analysis shows actual costs aggregated by subscription, resource group, service, region, and more. The pricing calculator only estimates future cost, Service Health reports platform incidents, and Purview governs data.",
    difficulty: 2, tags: ["cost analysis", "Cost Management"]
  },
  {
    id: "d3-017", domain: 3, objective: "3.1", type: "single",
    question: "A school district wants an email sent to the IT lead when spending in its development subscription reaches 80 percent of a monthly amount. What should the district create?",
    options: ["A resource lock", "A budget in Microsoft Cost Management", "An Azure Advisor recommendation", "An estimate in the pricing calculator"],
    answer: [1],
    explanation: "A budget defines a spending threshold for a scope and raises a budget alert, with email notification, when the threshold is reached. Locks protect resources from change, Advisor gives recommendations, and the pricing calculator does not track real spend.",
    difficulty: 2, tags: ["budgets", "budget alerts"]
  },
  {
    id: "d3-018", domain: 3, objective: "3.1", type: "multi",
    question: "Which alert types appear under cost alerts in Microsoft Cost Management? Choose THREE.",
    options: ["Budget alerts", "Resource health alerts", "Credit alerts", "Metric alerts", "Department spending quota alerts"],
    answer: [0, 2, 4],
    explanation: "Cost alerts consist of budget alerts, credit alerts, and department spending quota alerts. Resource health alerts belong to Azure Service Health, and metric alerts belong to Azure Monitor.",
    difficulty: 1, tags: ["cost alerts", "Cost Management"]
  },
  {
    id: "d3-019", domain: 3, objective: "3.1", type: "single",
    question: "A corporation with an Enterprise Agreement wants to be informed automatically when 90 percent of its Azure Prepayment balance has been consumed. Which type of cost alert provides this?",
    options: ["Budget alert", "Department spending quota alert", "Credit alert", "Service Health alert"],
    answer: [2],
    explanation: "Credit alerts are generated automatically at 90 percent and 100 percent of the Azure Prepayment balance for Enterprise Agreement customers. Budget alerts track a budget you define, and department spending quota alerts track a department's quota.",
    difficulty: 3, tags: ["credit alerts", "Enterprise Agreement"]
  },
  {
    id: "d3-020", domain: 3, objective: "3.1", type: "single",
    question: "A company creates a budget for a subscription with a single alert threshold at 100 percent and configures nothing else. What happens when spending reaches the budget amount?",
    options: [
      "All resources in the subscription are stopped",
      "New deployments to the subscription are blocked",
      "The subscription is disabled until the next billing cycle",
      "A budget alert is raised; resources keep running"
    ],
    answer: [3],
    explanation: "A budget notifies when a threshold is reached; it does not stop or block anything unless you separately configure automation to do so. Blocking deployments is a job for Azure Policy.",
    difficulty: 3, tags: ["budgets", "Cost Management"]
  },
  {
    id: "d3-021", domain: 3, objective: "3.1", type: "single",
    question: "What is a resource tag in Azure?",
    options: [
      "A name and value pair of metadata applied to a resource",
      "A rule that blocks noncompliant deployments",
      "A container that holds related resources",
      "A setting that prevents a resource from being deleted"
    ],
    answer: [0],
    explanation: "A tag is metadata in the form of a name and a value, such as Environment = Prod. A rule that blocks deployments is an Azure Policy, a container is a resource group, and a deletion safeguard is a resource lock.",
    difficulty: 1, tags: ["tags"]
  },
  {
    id: "d3-022", domain: 3, objective: "3.1", type: "single",
    question: "An administrator applies the tag Department = Finance to a resource group and then creates a virtual machine in that resource group. No Azure Policy is assigned. Which tags does the virtual machine have?",
    options: [
      "Department = Finance, inherited from the resource group",
      "No tags, because tags are not inherited by default",
      "Department = Finance and all tags of the subscription",
      "A default Owner tag generated by Azure"
    ],
    answer: [1],
    explanation: "Resources do not inherit tags from their resource group or subscription. To copy a tag down automatically, you would assign an Azure Policy that inherits or appends the tag.",
    difficulty: 2, tags: ["tags", "inheritance"]
  },
  {
    id: "d3-023", domain: 3, objective: "3.1", type: "single",
    question: "A hospital requires that every new Azure resource is created with a CostCenter tag. What should the hospital use to enforce the requirement?",
    options: ["A budget in Microsoft Cost Management", "A Delete lock", "Azure Policy", "Azure Advisor"],
    answer: [2],
    explanation: "Azure Policy can require that a tag is present on new resources and can add or reapply missing tags. Budgets track spend, locks protect against deletion, and Advisor only recommends.",
    difficulty: 2, tags: ["tags", "Azure Policy"]
  },
  {
    id: "d3-024", domain: 3, objective: "3.1", type: "single",
    question: "Three departments of a city government share the same subscriptions and resource groups. The finance office needs to report Azure costs separately for each department. What should you use?",
    options: ["Resource locks", "Billing zones", "Availability sets", "Tags"],
    answer: [3],
    explanation: "Tagging each resource with its department lets cost analysis group and filter costs by that tag even when resources share containers. Locks, billing zones, and availability sets have nothing to do with cost allocation.",
    difficulty: 2, tags: ["tags", "cost allocation"]
  },
  {
    id: "d3-025", domain: 3, objective: "3.1", type: "multi",
    question: "A logistics company wants a lower rate than pay-as-you-go and is willing to commit to Azure for a one-year or three-year term. Which pricing options are based on a term commitment? Choose TWO.",
    options: [
      "Azure Reservations",
      "Azure Spot Virtual Machines",
      "An Azure free account",
      "Azure savings plan for compute",
      "Azure Marketplace"
    ],
    answer: [0, 3],
    explanation: "Reservations commit to specific resources and a savings plan for compute commits to an hourly spend, each for one or three years. Spot Virtual Machines have no commitment and can be evicted, a free account is a subscription type, and Azure Marketplace is a catalog of third-party offers.",
    difficulty: 2, tags: ["reservations", "savings plan", "pricing options"]
  },
  {
    id: "d3-026", domain: 3, objective: "3.1", type: "multi",
    question: "Which statements about the pricing calculator are true? Choose TWO.",
    options: [
      "It deploys the configured resources when you save an estimate",
      "It provides an estimate, not a guaranteed price",
      "It shows the charges on your most recent invoice",
      "It lets you change options such as region, tier, and redundancy to compare costs",
      "It blocks deployments that exceed the estimate"
    ],
    answer: [1, 3],
    explanation: "The pricing calculator returns estimates and lets you adjust the configuration to compare options. It cannot deploy or block anything, and actual invoice charges are viewed in Microsoft Cost Management.",
    difficulty: 2, tags: ["pricing calculator"]
  },
  {
    id: "d3-027", domain: 3, objective: "3.1", type: "single",
    question: "Why can the same virtual machine size have a different price in two Azure regions?",
    options: [
      "Each region belongs to a different management group",
      "Tags are billed at different rates in each region",
      "The cost of power, labor, taxes, and fees varies by location",
      "Inbound data transfer is charged only in some regions"
    ],
    answer: [2],
    explanation: "Geography is a cost factor because local operating costs such as power, labor, and taxes differ between regions. Management groups and tags are free, and inbound data transfer is generally not charged.",
    difficulty: 1, tags: ["geography", "cost factors"]
  },

  // ───────────── 3.2 Describe features and tools in Azure for governance and compliance ─────────────
  {
    id: "d3-028", domain: 3, objective: "3.2", type: "single",
    question: "Which service provides a single, unified view of an organization's data across on-premises, multicloud, and software as a service sources?",
    options: ["Azure Policy", "Microsoft Defender for Cloud", "Azure Arc", "Microsoft Purview"],
    answer: [3],
    explanation: "Microsoft Purview is a family of data governance, risk, and compliance solutions that unifies insight about data wherever it lives. Azure Policy governs resource configuration, Defender for Cloud covers security posture, and Azure Arc extends resource management.",
    difficulty: 1, tags: ["Microsoft Purview"]
  },
  {
    id: "d3-029", domain: 3, objective: "3.2", type: "single",
    question: "An insurance company stores customer data in Azure SQL Database, in on-premises file shares, and in Amazon S3. The compliance team must find and classify sensitive data in all three locations. Which service should you recommend?",
    options: ["Microsoft Purview", "Azure Policy", "Azure Monitor", "Microsoft Cost Management"],
    answer: [0],
    explanation: "Purview's unified data governance discovers and classifies sensitive data across Azure, on-premises stores, and other clouds such as Amazon S3. Azure Policy evaluates resource settings rather than data content, and the other two cover telemetry and cost.",
    difficulty: 2, tags: ["Microsoft Purview", "classification"]
  },
  {
    id: "d3-030", domain: 3, objective: "3.2", type: "single",
    question: "Analysts at a pharmaceutical company need to trace a figure in a regulatory report back through every transformation to the system where the data originated. Which Microsoft Purview capability supports this?",
    options: ["Sensitive data classification", "End-to-end data lineage", "Automated data discovery", "Secure data access management"],
    answer: [1],
    explanation: "Data lineage records where data came from and how it moved and changed along the way. Classification labels sensitive content, discovery finds data sources, and access management controls who can use the data.",
    difficulty: 2, tags: ["Microsoft Purview", "lineage"]
  },
  {
    id: "d3-031", domain: 3, objective: "3.2", type: "multi",
    question: "Which capabilities does Microsoft Purview provide to keep an organization up to date on its data landscape? Choose THREE.",
    options: [
      "Automated data discovery",
      "Resource lock enforcement",
      "Sensitive data classification",
      "Virtual machine cost forecasting",
      "End-to-end data lineage"
    ],
    answer: [0, 2, 4],
    explanation: "Purview offers automated data discovery, sensitive data classification, and end-to-end data lineage. Resource locks are an Azure Resource Manager feature, and cost forecasting belongs to Microsoft Cost Management.",
    difficulty: 1, tags: ["Microsoft Purview"]
  },
  {
    id: "d3-032", domain: 3, objective: "3.2", type: "single",
    question: "Which requirement is met by Microsoft Purview rather than by Azure Policy?",
    options: [
      "Allowing resources to be created only in approved regions",
      "Requiring an Owner tag on every resource group",
      "Building a map and catalog of data assets held in several clouds",
      "Restricting virtual machines to an approved list of sizes"
    ],
    answer: [2],
    explanation: "Purview governs data: it maps and catalogs data assets across environments. Approved regions, required tags, and allowed VM sizes are rules about resource configuration, which is what Azure Policy enforces.",
    difficulty: 3, tags: ["Microsoft Purview", "Azure Policy"]
  },
  {
    id: "d3-033", domain: 3, objective: "3.2", type: "single",
    question: "What is the purpose of Azure Policy?",
    options: [
      "To grant users permission to manage resources",
      "To estimate the cost of planned deployments",
      "To recommend performance and reliability improvements for resources",
      "To create and assign rules that control or audit resources"
    ],
    answer: [3],
    explanation: "Azure Policy enforces and audits rules about resource configuration so that resources stay compliant with organizational standards. Granting permissions is Azure RBAC, estimating is the pricing calculator, and recommendations come from Azure Advisor.",
    difficulty: 1, tags: ["Azure Policy"]
  },
  {
    id: "d3-034", domain: 3, objective: "3.2", type: "single",
    question: "A European bank must ensure that no one can create Azure resources outside two approved regions. What should the bank use?",
    options: ["Azure Policy", "A ReadOnly lock", "Microsoft Purview", "Azure RBAC"],
    answer: [0],
    explanation: "An allowed-locations policy denies deployments to regions that are not approved. A lock protects existing resources from change, Purview governs data, and RBAC controls who can act but not where resources may be placed.",
    difficulty: 2, tags: ["Azure Policy", "allowed locations"]
  },
  {
    id: "d3-035", domain: 3, objective: "3.2", type: "single",
    question: "Which term completes the sentence: In Azure Policy, a group of related policy definitions that is assigned and tracked as a single unit is called ______.",
    options: ["a management group", "an initiative", "a resource group", "an action group"],
    answer: [1],
    explanation: "An initiative groups policy definitions so that compliance can be tracked toward a larger goal. A management group contains subscriptions, a resource group contains resources, and an action group belongs to Azure Monitor alerts.",
    difficulty: 1, tags: ["Azure Policy", "initiatives"]
  },
  {
    id: "d3-036", domain: 3, objective: "3.2", type: "single",
    question: "An organization assigns an Azure Policy initiative to a management group that contains four subscriptions. To which resources does the initiative apply?",
    options: [
      "Only resources created directly in the management group",
      "Only the first subscription added to the management group",
      "Everything beneath the management group",
      "Only resource groups that are explicitly linked to the initiative"
    ],
    answer: [2],
    explanation: "Policy assignments are inherited by every child scope, so everything beneath the management group is covered. There is no need to link individual subscriptions or resource groups.",
    difficulty: 2, tags: ["Azure Policy", "inheritance", "scope"]
  },
  {
    id: "d3-037", domain: 3, objective: "3.2", type: "single",
    question: "A company assigns a policy that allows only two virtual machine sizes. Twenty virtual machines of other sizes already exist in the subscription. What happens to the existing virtual machines?",
    options: [
      "They are deleted at the next evaluation",
      "They are resized automatically to an allowed size",
      "They are ignored because policies apply only to new resources",
      "They keep running and are reported as noncompliant"
    ],
    answer: [3],
    explanation: "Azure Policy evaluates existing resources as well as new ones and flags those that do not comply, but it does not delete them. The policy is also applied whenever a VM is created or resized.",
    difficulty: 2, tags: ["Azure Policy", "compliance", "existing resources"]
  },
  {
    id: "d3-038", domain: 3, objective: "3.2", type: "single",
    question: "A user has the Owner role on a subscription. A policy with the Deny effect restricts resource locations to one region. The user tries to create a storage account in a different region. What is the result?",
    options: [
      "The deployment is denied",
      "The deployment succeeds because Owner overrides policy",
      "The deployment succeeds and the storage account is moved to the allowed region",
      "The deployment succeeds and the Owner role is removed"
    ],
    answer: [0],
    explanation: "RBAC determines whether the user may attempt the action; Azure Policy determines whether the resulting resource is acceptable. A Deny policy blocks the noncompliant request no matter which role the user holds.",
    difficulty: 3, tags: ["Azure Policy", "RBAC", "deny"]
  },
  {
    id: "d3-039", domain: 3, objective: "3.2", type: "single",
    question: "A university wants its help desk staff to be able to restart virtual machines but not delete them. What should the university use?",
    options: ["Azure Policy", "Azure RBAC", "A Delete lock", "An initiative"],
    answer: [1],
    explanation: "Azure RBAC controls which actions a user or group may perform at a scope. Azure Policy and initiatives govern resource properties rather than user actions, and a Delete lock would stop everyone, not only the help desk, from deleting.",
    difficulty: 2, tags: ["RBAC", "Azure Policy"]
  },
  {
    id: "d3-040", domain: 3, objective: "3.2", type: "single",
    question: "An energy company finds that hundreds of existing resources lack a required AppName tag. The company wants the tag added to those resources automatically. What should the company use?",
    options: ["A ReadOnly lock on each resource group", "A custom Azure RBAC role", "Azure Policy remediation", "A budget in Microsoft Cost Management"],
    answer: [2],
    explanation: "In some cases Azure Policy can remediate noncompliant resources automatically, and adding a missing tag is the standard example. Locks, roles, and budgets cannot change resource properties.",
    difficulty: 2, tags: ["Azure Policy", "remediation", "tags"]
  },
  {
    id: "d3-041", domain: 3, objective: "3.2", type: "single",
    question: "A security team wants to know which storage accounts do not meet a configuration standard, but it does not want to block or change any deployments yet. Which Azure Policy effect should the team use?",
    options: ["Deny", "Modify", "DeployIfNotExists", "Audit"],
    answer: [3],
    explanation: "Audit allows the request and reports the resource as noncompliant, which gives visibility without enforcement. Deny blocks the request, and Modify and DeployIfNotExists change or add configuration.",
    difficulty: 3, tags: ["Azure Policy", "effects", "audit"]
  },
  {
    id: "d3-042", domain: 3, objective: "3.2", type: "single",
    question: "A policy assigned to a subscription restricts virtual machine sizes. One resource group is used for performance testing and needs larger sizes. What should the administrator do?",
    options: [
      "Exclude the resource group from the policy assignment",
      "Apply a Delete lock to the resource group",
      "Assign the testers the Owner role on the resource group",
      "Add a tag named Exempt to the resource group"
    ],
    answer: [0],
    explanation: "A child scope can be excluded from a policy assignment so that the rule does not apply there. Locks and role assignments do not override policy, and a tag has no effect unless a policy is written to use it.",
    difficulty: 2, tags: ["Azure Policy", "exclusion", "scope"]
  },
  {
    id: "d3-043", domain: 3, objective: "3.2", type: "multi",
    question: "At which scopes can an Azure Policy definition be assigned? Choose THREE.",
    options: ["Availability zone", "Management group", "Subscription", "Region pair", "Resource group"],
    answer: [1, 2, 4],
    explanation: "Policies are assigned at a management group, subscription, resource group, or individual resource and are inherited by child scopes. Availability zones and region pairs are infrastructure concepts, not management scopes.",
    difficulty: 1, tags: ["Azure Policy", "scope"]
  },
  {
    id: "d3-044", domain: 3, objective: "3.2", type: "single",
    question: "Which resource lock allows authorized users to read and modify a resource but not delete it?",
    options: ["ReadOnly", "Audit", "Delete", "Deny"],
    answer: [2],
    explanation: "A Delete lock blocks deletion while still allowing reads and updates. ReadOnly blocks both updates and deletion; Audit and Deny are Azure Policy effects, not lock types.",
    difficulty: 1, tags: ["resource locks", "Delete lock"]
  },
  {
    id: "d3-045", domain: 3, objective: "3.2", type: "single",
    question: "A utility company wants to guarantee that the configuration of its production virtual network is neither changed nor deleted by anyone until a change window is approved. What should the company apply?",
    options: ["A Delete lock", "A Reader role assignment for all users", "A budget alert", "A ReadOnly lock"],
    answer: [3],
    explanation: "A ReadOnly lock prevents both modification and deletion for every user until the lock is removed. A Delete lock would still allow configuration changes, and role assignments would not restrain users who already hold higher roles.",
    difficulty: 2, tags: ["resource locks", "ReadOnly lock"]
  },
  {
    id: "d3-046", domain: 3, objective: "3.2", type: "single",
    question: "An administrator with the Owner role tries to delete a storage account and receives an error stating that the operation is not permitted. What is the most likely cause?",
    options: [
      "A resource lock is applied to the storage account or its resource group",
      "An Azure Policy with the Audit effect is assigned",
      "A budget threshold has been reached",
      "The storage account has no tags"
    ],
    answer: [0],
    explanation: "Resource locks apply regardless of RBAC permissions, so even an Owner is blocked until the lock is removed. An Audit policy only reports, and budgets and tags never prevent deletion.",
    difficulty: 2, tags: ["resource locks", "RBAC"]
  },
  {
    id: "d3-047", domain: 3, objective: "3.2", type: "single",
    question: "A Delete lock is placed on a resource group. A week later, a new virtual machine is created in that resource group. Which statement is true?",
    options: [
      "The virtual machine is not locked because it was created after the lock",
      "The virtual machine inherits the lock and cannot be deleted",
      "The virtual machine cannot be started because of the lock",
      "The lock was removed automatically when the virtual machine was created"
    ],
    answer: [1],
    explanation: "Locks are inherited by all resources in the locked scope, including resources added later. A Delete lock still allows creating, reading, and modifying resources; only deletion is blocked.",
    difficulty: 2, tags: ["resource locks", "inheritance"]
  },
  {
    id: "d3-048", domain: 3, objective: "3.2", type: "single",
    question: "A subscription Owner must delete a database that has a Delete lock. What must the Owner do?",
    options: [
      "Assign themselves the Contributor role and then delete the database",
      "Delete the database from Azure Cloud Shell instead of the portal",
      "Remove the lock, and then delete the database",
      "Add an exclusion to the Azure Policy assignment"
    ],
    answer: [2],
    explanation: "Changing a locked resource is a two-step process: remove the lock, then perform the action. Locks apply through every tool because all requests pass through Azure Resource Manager, and extra roles or policy exclusions do not bypass them.",
    difficulty: 3, tags: ["resource locks"]
  },
  {
    id: "d3-049", domain: 3, objective: "3.2", type: "single",
    question: "A ReadOnly lock is applied to a resource group that contains several virtual machines. Which action can an authorized administrator still perform?",
    options: [
      "Resize one of the virtual machines",
      "Add a new disk to the resource group",
      "Delete an unused network interface",
      "View the properties of the virtual machines"
    ],
    answer: [3],
    explanation: "ReadOnly limits everyone to read operations, similar to holding only the Reader role. Resizing, adding, and deleting resources are all write or delete operations and are blocked.",
    difficulty: 3, tags: ["resource locks", "ReadOnly lock"]
  },
  {
    id: "d3-050", domain: 3, objective: "3.2", type: "multi",
    question: "Which statements about resource locks are true? Choose TWO.",
    options: [
      "They can be applied to a subscription, a resource group, or an individual resource",
      "They expire automatically after 30 days",
      "They apply only to virtual machines and storage accounts",
      "They apply regardless of the RBAC permissions a user holds",
      "A ReadOnly lock still allows configuration changes"
    ],
    answer: [0, 3],
    explanation: "Locks can be set at subscription, resource group, or resource level and apply to all users whatever their role. They stay until removed, cover any resource type, and a ReadOnly lock blocks changes as well as deletion.",
    difficulty: 2, tags: ["resource locks"]
  },

  // ───────────── 3.3 Describe features and tools for managing and deploying Azure resources ─────────────
  {
    id: "d3-051", domain: 3, objective: "3.3", type: "single",
    question: "What is the Azure portal?",
    options: [
      "A command-line tool installed on an administrator's computer",
      "A web-based console with a graphical user interface",
      "A JSON file that defines the resources to deploy",
      "A service that extends Azure management to other clouds"
    ],
    answer: [1],
    explanation: "The Azure portal is a web-based graphical console and the alternative to command-line tools. A JSON deployment file is an ARM template, and extending management to other clouds is Azure Arc.",
    difficulty: 1, tags: ["Azure portal"]
  },
  {
    id: "d3-052", domain: 3, objective: "3.3", type: "single",
    question: "An operations manager with no scripting experience wants a single graphical view that shows the status of the company's most important Azure resources. What should the manager use?",
    options: ["An ARM template", "Azure Cloud Shell", "A custom dashboard in the Azure portal", "Azure PowerShell"],
    answer: [2],
    explanation: "The Azure portal lets users build custom dashboards for an organized graphical view of resources. ARM templates deploy resources, and Cloud Shell and Azure PowerShell are command-line experiences.",
    difficulty: 2, tags: ["Azure portal", "dashboards"]
  },
  {
    id: "d3-053", domain: 3, objective: "3.3", type: "single",
    question: "What is Azure Cloud Shell?",
    options: [
      "A desktop application for uploading files to storage accounts",
      "A declarative language for defining Azure resources",
      "A service that monitors the health of Azure regions",
      "A browser-based shell for creating and managing Azure resources"
    ],
    answer: [3],
    explanation: "Cloud Shell is a browser-based shell opened from the Azure portal that needs no local installation. A declarative language describes Bicep, and health monitoring describes Azure Service Health.",
    difficulty: 1, tags: ["Cloud Shell"]
  },
  {
    id: "d3-054", domain: 3, objective: "3.3", type: "single",
    question: "A consultant is using a client's locked-down laptop on which no software can be installed. The consultant needs to run Azure CLI commands against the client's subscription. What should the consultant use?",
    options: ["Azure Cloud Shell", "Azure Arc", "An ARM template", "Azure Advisor"],
    answer: [0],
    explanation: "Cloud Shell runs in the browser with the Azure CLI already available, so nothing needs to be installed locally. Azure Arc manages non-Azure resources, an ARM template is a deployment file, and Advisor gives recommendations.",
    difficulty: 2, tags: ["Cloud Shell", "Azure CLI"]
  },
  {
    id: "d3-055", domain: 3, objective: "3.3", type: "multi",
    question: "Which shell experiences can you choose in Azure Cloud Shell? Choose TWO.",
    options: ["Command Prompt", "Bash", "Zsh", "PowerShell", "Python"],
    answer: [1, 3],
    explanation: "Cloud Shell offers Bash, used with the Azure CLI, and PowerShell, used with Azure PowerShell. Command Prompt, Zsh, and a Python interpreter are not selectable Cloud Shell experiences.",
    difficulty: 1, tags: ["Cloud Shell", "Bash", "PowerShell"]
  },
  {
    id: "d3-056", domain: 3, objective: "3.3", type: "single",
    question: "Which tool uses Bash-style commands that begin with az, such as az group create?",
    options: ["Azure PowerShell", "Bicep", "Azure CLI", "Azure Resource Manager templates"],
    answer: [2],
    explanation: "Azure CLI commands start with az and follow Bash conventions. Azure PowerShell uses Verb-Noun cmdlets, while Bicep and ARM templates are declarative files rather than commands.",
    difficulty: 1, tags: ["Azure CLI"]
  },
  {
    id: "d3-057", domain: 3, objective: "3.3", type: "single",
    question: "Which tool manages Azure by running cmdlets such as New-AzVM?",
    options: ["Azure CLI", "Azure Arc", "Azure Advisor", "Azure PowerShell"],
    answer: [3],
    explanation: "Azure PowerShell provides cmdlets in Verb-Noun form that call the Azure REST API. The Azure CLI uses az commands, and Azure Arc and Azure Advisor are not command shells.",
    difficulty: 1, tags: ["Azure PowerShell", "cmdlets"]
  },
  {
    id: "d3-058", domain: 3, objective: "3.3", type: "single",
    question: "Which statement about the Azure CLI and Azure PowerShell is true?",
    options: [
      "Each can be installed on Windows, Linux, and macOS",
      "Azure PowerShell can be installed only on Windows",
      "The Azure CLI is available only in Azure Cloud Shell",
      "The Azure CLI can manage more resource types than Azure PowerShell"
    ],
    answer: [0],
    explanation: "Both tools are cross-platform, are also available in Cloud Shell, and are functionally equivalent. The main difference is the command syntax, so the choice usually depends on what the team already knows.",
    difficulty: 3, tags: ["Azure CLI", "Azure PowerShell"]
  },
  {
    id: "d3-059", domain: 3, objective: "3.3", type: "single",
    question: "A team of Linux administrators maintains a library of Bash scripts and wants to automate the creation of Azure resources using the syntax it already knows. Which tool should the team use?",
    options: ["Azure PowerShell", "Azure CLI", "The Azure portal", "Azure Service Health"],
    answer: [1],
    explanation: "The Azure CLI uses Bash-style commands and fits naturally into existing Bash scripts. Azure PowerShell is equivalent in capability but uses PowerShell syntax, and the portal is a manual graphical tool.",
    difficulty: 2, tags: ["Azure CLI", "scripting"]
  },
  {
    id: "d3-060", domain: 3, objective: "3.3", type: "single",
    question: "An administrator signs in to the Azure portal and opens Azure Cloud Shell. Which statement is true?",
    options: [
      "The administrator must first install the Azure CLI in the session",
      "The session supports Azure PowerShell only",
      "The session is already authenticated with Azure credentials",
      "The session can manage only resources in the administrator's default region"
    ],
    answer: [2],
    explanation: "Cloud Shell is authenticated with your Azure credentials, so it knows who you are and what permissions you have. The tools are already present, both Bash and PowerShell are offered, and it is not limited to one region.",
    difficulty: 2, tags: ["Cloud Shell", "authentication"]
  },
  {
    id: "d3-061", domain: 3, objective: "3.3", type: "single",
    question: "What is the purpose of Azure Arc?",
    options: [
      "To migrate on-premises servers into Azure",
      "To provide a private network connection from a datacenter to Azure",
      "To estimate the cost of a hybrid deployment",
      "To extend Azure management to resources outside Azure"
    ],
    answer: [3],
    explanation: "Azure Arc delivers a consistent management platform for on-premises and multicloud resources. Migration is handled by Azure Migrate, private connectivity by ExpressRoute or VPN Gateway, and estimates by the pricing calculator.",
    difficulty: 1, tags: ["Azure Arc"]
  },
  {
    id: "d3-062", domain: 3, objective: "3.3", type: "single",
    question: "A retailer runs servers in its own datacenter and in another public cloud. It wants to apply Azure Policy and tags to those servers alongside its Azure resources. What should the retailer use?",
    options: ["Azure Arc", "Azure Cloud Shell", "Microsoft Purview", "Azure Monitor"],
    answer: [0],
    explanation: "Azure Arc brings servers outside Azure under Azure Resource Manager so that Azure Policy, tags, and other management features apply to them. Cloud Shell is a shell, Purview governs data, and Monitor collects telemetry.",
    difficulty: 2, tags: ["Azure Arc", "multicloud"]
  },
  {
    id: "d3-063", domain: 3, objective: "3.3", type: "multi",
    question: "Which resource types hosted outside Azure can be managed with Azure Arc? Choose THREE.",
    options: ["Servers", "Network printers", "Kubernetes clusters", "SQL Server", "Mobile phones"],
    answer: [0, 2, 3],
    explanation: "Azure Arc manages servers, Kubernetes clusters, Azure data services, SQL Server, and virtual machines that run outside Azure. Printers and mobile phones are not Azure Arc resource types.",
    difficulty: 1, tags: ["Azure Arc"]
  },
  {
    id: "d3-064", domain: 3, objective: "3.3", type: "single",
    question: "A hospital must keep certain servers in its own datacenter for regulatory reasons but wants to inventory and govern them from Azure together with its cloud resources. Which service should you recommend?",
    options: ["Azure Migrate", "Azure Arc", "Azure ExpressRoute", "Azure VPN Gateway"],
    answer: [1],
    explanation: "Azure Arc manages resources where they are, without moving them. Azure Migrate relocates workloads into Azure, and ExpressRoute and VPN Gateway only provide network connectivity.",
    difficulty: 3, tags: ["Azure Arc", "hybrid"]
  },
  {
    id: "d3-065", domain: 3, objective: "3.3", type: "single",
    question: "How does Azure Arc make non-Azure resources manageable with Azure tools?",
    options: [
      "It copies the resources into an Azure region",
      "It converts the resources into ARM templates",
      "It projects the resources into Azure Resource Manager",
      "It replaces the resources with Azure virtual machines"
    ],
    answer: [2],
    explanation: "Azure Arc projects existing non-Azure resources into Azure Resource Manager so they can be managed as if they ran in Azure. The resources stay where they are; nothing is copied, converted, or replaced.",
    difficulty: 3, tags: ["Azure Arc", "Azure Resource Manager"]
  },
  {
    id: "d3-066", domain: 3, objective: "3.3", type: "single",
    question: "What is infrastructure as code?",
    options: [
      "Running application code on serverless compute",
      "Writing applications that scale automatically",
      "Storing application source code in Azure Storage",
      "Managing infrastructure through code instead of manual steps"
    ],
    answer: [3],
    explanation: "Infrastructure as code defines infrastructure in files, such as scripts, ARM templates, or Bicep, that can be versioned and reused. The other options describe application hosting or storage, not how infrastructure is provisioned.",
    difficulty: 1, tags: ["infrastructure as code"]
  },
  {
    id: "d3-067", domain: 3, objective: "3.3", type: "single",
    question: "A development team builds its test and production environments by hand in the Azure portal, and the two environments keep ending up with different settings. What should the team adopt?",
    options: ["Infrastructure as code", "Custom portal dashboards", "Resource locks", "Azure Advisor recommendations"],
    answer: [0],
    explanation: "Defining the environment in code or templates makes deployments repeatable and consistent, removing manual differences. Dashboards only display resources, locks prevent changes, and Advisor suggests improvements but does not build environments.",
    difficulty: 2, tags: ["infrastructure as code", "consistency"]
  },
  {
    id: "d3-068", domain: 3, objective: "3.3", type: "single",
    question: "Which of the following is an example of a declarative approach to deploying Azure resources?",
    options: [
      "A Bash script that runs az commands one after another",
      "An ARM template that describes the resources that should exist",
      "A PowerShell script that calls cmdlets in a fixed order",
      "A written procedure of steps to perform in the Azure portal"
    ],
    answer: [1],
    explanation: "A declarative file states the desired end state and lets Azure Resource Manager work out the steps. Scripts and written procedures are imperative because they list the steps to carry out in order.",
    difficulty: 3, tags: ["declarative", "imperative", "ARM templates"]
  },
  {
    id: "d3-069", domain: 3, objective: "3.3", type: "single",
    question: "What is Azure Resource Manager?",
    options: [
      "A tool that recommends ways to optimize resources",
      "A browser-based shell for running commands",
      "The deployment and management service for Azure",
      "A service that classifies sensitive data"
    ],
    answer: [2],
    explanation: "Azure Resource Manager is the management layer through which resources are created, updated, and deleted. Recommendations come from Azure Advisor, the browser shell is Cloud Shell, and data classification is Microsoft Purview.",
    difficulty: 1, tags: ["Azure Resource Manager"]
  },
  {
    id: "d3-070", domain: 3, objective: "3.3", type: "single",
    question: "One engineer creates a virtual machine in the Azure portal while another creates one with the Azure CLI. Which component receives both requests?",
    options: ["Azure Arc", "Azure Monitor", "Azure Cloud Shell", "Azure Resource Manager"],
    answer: [3],
    explanation: "Every request from the portal, CLI, PowerShell, SDKs, or REST API is handled by Azure Resource Manager, which is why results are consistent across tools. The other services are not in the request path for deployments.",
    difficulty: 2, tags: ["Azure Resource Manager"]
  },
  {
    id: "d3-071", domain: 3, objective: "3.3", type: "single",
    question: "Which term completes the sentence: An ARM template is a ______ file that defines the resources to deploy to Azure.",
    options: ["JSON", "YAML", "XML", "CSV"],
    answer: [0],
    explanation: "ARM templates are written in JSON and describe the desired resources declaratively. YAML, XML, and CSV are not the ARM template format; the simpler alternative language is Bicep.",
    difficulty: 1, tags: ["ARM templates", "JSON"]
  },
  {
    id: "d3-072", domain: 3, objective: "3.3", type: "single",
    question: "An engineer deploys an ARM template to a resource group. The next day, the engineer deploys the same unchanged template to the same resource group. What is the result?",
    options: [
      "A second copy of every resource is created",
      "The resources remain in the same state, with no duplicates",
      "The deployment fails because the resources already exist",
      "The existing resources are deleted and then re-created"
    ],
    answer: [1],
    explanation: "ARM templates are idempotent: repeating a deployment produces the same resources in the same state. This is the repeatable-results benefit of declarative templates.",
    difficulty: 2, tags: ["ARM templates", "idempotent"]
  },
  {
    id: "d3-073", domain: 3, objective: "3.3", type: "single",
    question: "An ARM template defines a virtual network, a network interface, and a virtual machine that depends on both. How is the deployment order determined?",
    options: [
      "Resources are deployed strictly in the order they appear in the file",
      "The engineer must deploy each resource separately in the correct order",
      "Azure Resource Manager works out the order from the dependencies",
      "Resources are deployed in alphabetical order by name"
    ],
    answer: [2],
    explanation: "Orchestration is a benefit of ARM templates: Azure Resource Manager works out the dependency order and creates independent resources in parallel. The author declares what is needed, not the sequence of steps.",
    difficulty: 2, tags: ["ARM templates", "orchestration"]
  },
  {
    id: "d3-074", domain: 3, objective: "3.3", type: "single",
    question: "What is Bicep in the context of Azure deployments?",
    options: [
      "A graphical designer for building dashboards in the Azure portal",
      "A query language for analyzing log data",
      "A command-line tool that replaces the Azure CLI",
      "A declarative language for deploying Azure resources"
    ],
    answer: [3],
    explanation: "Bicep is a declarative infrastructure as code language that deploys through Azure Resource Manager and is more concise than JSON ARM templates. The log query language is KQL, and Bicep is not a shell or designer.",
    difficulty: 1, tags: ["Bicep", "infrastructure as code"]
  },
  {
    id: "d3-075", domain: 3, objective: "3.3", type: "multi",
    question: "Which of the following are benefits of ARM templates? Choose THREE.",
    options: [
      "Declarative syntax",
      "Automatic cost reduction",
      "Repeatable results",
      "Built-in data classification",
      "Orchestration of dependent resources"
    ],
    answer: [0, 2, 4],
    explanation: "ARM templates offer declarative syntax, repeatable results, orchestration, modularity, and extensibility. They do not lower prices, and data classification is a Microsoft Purview capability.",
    difficulty: 2, tags: ["ARM templates"]
  },
  {
    id: "d3-076", domain: 3, objective: "3.3", type: "single",
    question: "A platform team wants to split one very large deployment definition into smaller files that can be reused by several projects. Which ARM template benefit supports this?",
    options: ["Declarative syntax", "Modularity", "Orchestration", "Idempotence"],
    answer: [1],
    explanation: "Modularity lets you break templates into smaller reusable components and nest them. Declarative syntax, orchestration, and idempotence are real benefits but concern how a deployment is described and executed, not reuse.",
    difficulty: 2, tags: ["ARM templates", "modularity"]
  },
  {
    id: "d3-077", domain: 3, objective: "3.3", type: "multi",
    question: "Which actions does Azure Resource Manager perform on a request before sending it to the target Azure service? Choose TWO.",
    options: [
      "It converts the request into a Bicep file",
      "It authenticates the request",
      "It records the request in Application Insights",
      "It authorizes the request",
      "It estimates the cost of the request"
    ],
    answer: [1, 3],
    explanation: "Azure Resource Manager authenticates and authorizes every request and then forwards it to the appropriate service. It does not generate Bicep, write to Application Insights, or price the request.",
    difficulty: 2, tags: ["Azure Resource Manager", "RBAC"]
  },

  // ───────────── 3.4 Describe monitoring tools in Azure ─────────────
  {
    id: "d3-078", domain: 3, objective: "3.4", type: "single",
    question: "What does Azure Advisor do?",
    options: [
      "It reports outages that affect Azure regions",
      "It collects metrics and logs from applications",
      "It gives personalized best-practice recommendations",
      "It blocks deployments that do not follow best practices"
    ],
    answer: [2],
    explanation: "Azure Advisor analyzes deployed resources and recommends improvements that you can act on, postpone, or dismiss. Outage reporting is Azure Service Health, telemetry collection is Azure Monitor, and blocking deployments is Azure Policy.",
    difficulty: 1, tags: ["Azure Advisor"]
  },
  {
    id: "d3-079", domain: 3, objective: "3.4", type: "multi",
    question: "Which of the following are Azure Advisor recommendation categories? Choose THREE.",
    options: ["Reliability", "Scalability", "Operational Excellence", "Compliance", "Cost"],
    answer: [0, 2, 4],
    explanation: "The five Advisor categories are Reliability, Security, Performance, Operational Excellence, and Cost. Scalability and Compliance are not Advisor categories.",
    difficulty: 1, tags: ["Azure Advisor", "categories"]
  },
  {
    id: "d3-080", domain: 3, objective: "3.4", type: "single",
    question: "A nonprofit wants personalized recommendations that identify idle and underused virtual machines it could resize or shut down. Which service should the nonprofit use?",
    options: ["Azure Service Health", "The pricing calculator", "Azure Monitor alerts", "Azure Advisor"],
    answer: [3],
    explanation: "Advisor's Cost category recommends resizing or shutting down underused resources. Service Health covers platform incidents, the pricing calculator estimates planned deployments, and Monitor alerts fire on conditions you define.",
    difficulty: 2, tags: ["Azure Advisor", "cost"]
  },
  {
    id: "d3-081", domain: 3, objective: "3.4", type: "single",
    question: "Azure Advisor flags a configuration risk that could cause a business-critical application to stop running during a failure. Which Advisor category contains this recommendation?",
    options: ["Reliability", "Performance", "Cost", "Operational Excellence"],
    answer: [0],
    explanation: "Reliability recommendations help keep applications running by flagging configuration risks. Performance concerns speed, Cost concerns spend, and Operational Excellence concerns workflow and deployment practices.",
    difficulty: 2, tags: ["Azure Advisor", "reliability"]
  },
  {
    id: "d3-082", domain: 3, objective: "3.4", type: "single",
    question: "Azure Advisor suggests improvements to a company's deployment practices and operational workflows. Which Advisor category contains these recommendations?",
    options: ["Performance", "Operational Excellence", "Security", "Reliability"],
    answer: [1],
    explanation: "Operational Excellence covers workflow, process, and deployment best practices. Performance is about application speed, Security is about threats and vulnerabilities, and Reliability is about keeping applications running.",
    difficulty: 2, tags: ["Azure Advisor", "operational excellence"]
  },
  {
    id: "d3-083", domain: 3, objective: "3.4", type: "single",
    question: "Which view gives a global picture of the health of all Azure services in all regions?",
    options: ["Resource Health", "Service Health", "Azure Status", "Azure Advisor"],
    answer: [2],
    explanation: "Azure Status is the broad, non-personalized view of Azure health worldwide. Service Health narrows to the services and regions you use, Resource Health narrows to one resource, and Advisor gives recommendations.",
    difficulty: 1, tags: ["Azure Status", "Service Health"]
  },
  {
    id: "d3-084", domain: 3, objective: "3.4", type: "single",
    question: "An online retailer wants to be notified in advance of planned maintenance that affects the Azure services and regions it uses. What should the retailer use?",
    options: ["Azure Status", "Resource Health", "Azure Advisor", "Service Health"],
    answer: [3],
    explanation: "Service Health is personalized to your services and regions, shows planned maintenance and health advisories, and supports alerts. Azure Status is global and not personalized, and Resource Health looks at a single resource.",
    difficulty: 2, tags: ["Service Health", "planned maintenance"]
  },
  {
    id: "d3-085", domain: 3, objective: "3.4", type: "single",
    question: "One specific virtual machine has become unreachable. The administrator wants to know whether that virtual machine is healthy and whether the problem is on the Azure side. What should the administrator check?",
    options: ["Resource Health", "Azure Status", "Azure Advisor", "Cost analysis"],
    answer: [0],
    explanation: "Resource Health reports on an individual resource and indicates whether an issue is caused by the Azure platform or by something on your side. Azure Status is too broad, and Advisor and cost analysis do not report health.",
    difficulty: 2, tags: ["Resource Health", "Service Health"]
  },
  {
    id: "d3-086", domain: 3, objective: "3.4", type: "single",
    question: "A journalist with no Azure subscription hears that a major cloud outage is under way and wants to see whether Azure services are affected worldwide. What should the journalist view?",
    options: ["Service Health", "Azure Status", "Resource Health", "Azure Monitor"],
    answer: [1],
    explanation: "Azure Status is the public, global view of Azure service health across regions. Service Health and Resource Health are personalized to the resources in your own subscriptions, and Azure Monitor shows your own telemetry.",
    difficulty: 2, tags: ["Azure Status"]
  },
  {
    id: "d3-087", domain: 3, objective: "3.4", type: "single",
    question: "Which statement correctly describes the difference between Azure Status and Service Health?",
    options: [
      "Azure Status reports on individual resources; Service Health reports on all regions",
      "Azure Status shows planned maintenance only; Service Health shows outages only",
      "Azure Status is global; Service Health is filtered to what you use",
      "Azure Status requires an Enterprise Agreement; Service Health is free"
    ],
    answer: [2],
    explanation: "Azure Status gives the worldwide picture, while Service Health is personalized because you are signed in. Reporting on individual resources is the job of Resource Health.",
    difficulty: 3, tags: ["Azure Status", "Service Health"]
  },
  {
    id: "d3-088", domain: 3, objective: "3.4", type: "multi",
    question: "Which types of events does Service Health show for the services and regions you use? Choose THREE.",
    options: ["Service outages", "Budget overruns", "Planned maintenance", "Policy compliance results", "Health advisories"],
    answer: [0, 2, 4],
    explanation: "Service Health shows outages, planned maintenance, and health advisories that are relevant to your environment. Budget overruns appear in Microsoft Cost Management, and compliance results appear in Azure Policy.",
    difficulty: 1, tags: ["Service Health"]
  },
  {
    id: "d3-089", domain: 3, objective: "3.4", type: "single",
    question: "What is Azure Monitor?",
    options: [
      "A tool that estimates the cost of monitoring solutions",
      "A service that enforces configuration rules on resources",
      "A public page that lists Azure outages worldwide",
      "A platform for collecting, analyzing, and acting on telemetry"
    ],
    answer: [3],
    explanation: "Azure Monitor gathers metrics and logs from Azure, on-premises, and multicloud resources and makes them available through dashboards, queries, and alerts. Enforcing rules is Azure Policy, and the public outage page is Azure Status.",
    difficulty: 1, tags: ["Azure Monitor"]
  },
  {
    id: "d3-090", domain: 3, objective: "3.4", type: "single",
    question: "Which Azure Monitor tool is used in the Azure portal to write and run queries against collected log data?",
    options: ["Log Analytics", "Application Insights", "Action groups", "Resource Health"],
    answer: [0],
    explanation: "Log Analytics is where you write and run log queries, from simple filters to trend analysis. Application Insights monitors web applications, action groups define alert notifications, and Resource Health belongs to Service Health.",
    difficulty: 1, tags: ["Log Analytics", "Azure Monitor"]
  },
  {
    id: "d3-091", domain: 3, objective: "3.4", type: "single",
    question: "Which query language is used to query log data in Log Analytics?",
    options: ["Transact-SQL", "Kusto Query Language (KQL)", "JSON", "Bicep"],
    answer: [1],
    explanation: "Log Analytics queries are written in the Kusto Query Language. Transact-SQL is used with SQL databases, JSON is a data format used by ARM templates, and Bicep is an infrastructure as code language.",
    difficulty: 1, tags: ["KQL", "Log Analytics"]
  },
  {
    id: "d3-092", domain: 3, objective: "3.4", type: "single",
    question: "A gaming company wants an email sent to its operations team whenever the CPU usage of a virtual machine stays above 80 percent. What should the company configure?",
    options: ["An Azure Advisor recommendation", "A Service Health alert", "An Azure Monitor metric alert", "A budget alert in Microsoft Cost Management"],
    answer: [2],
    explanation: "A metric alert in Azure Monitor fires when a metric such as CPU percentage meets a condition you define. Advisor gives recommendations, Service Health alerts concern platform events, and budget alerts concern spending.",
    difficulty: 2, tags: ["Azure Monitor alerts", "metrics"]
  },
  {
    id: "d3-093", domain: 3, objective: "3.4", type: "single",
    question: "An administrator is creating an Azure Monitor alert and must specify that the on-call engineers receive an SMS message when the alert fires. Where is this configured?",
    options: ["In the alert rule condition", "In a Log Analytics query", "In an availability test", "In an action group"],
    answer: [3],
    explanation: "An action group defines who is notified and what actions run when an alert fires, and it can be reused by other alerts. The alert rule condition defines when the alert fires, not who is told.",
    difficulty: 2, tags: ["action groups", "Azure Monitor alerts"]
  },
  {
    id: "d3-094", domain: 3, objective: "3.4", type: "single",
    question: "Developers at a travel company need to track request rates, response times, and failure rates for their web application. What should the developers use?",
    options: ["Application Insights", "Azure Advisor", "Service Health", "Azure Arc"],
    answer: [0],
    explanation: "Application Insights is the Azure Monitor feature that monitors the performance and usage of web applications. Advisor gives resource recommendations, Service Health covers the Azure platform, and Arc extends management to non-Azure resources.",
    difficulty: 2, tags: ["Application Insights"]
  },
  {
    id: "d3-095", domain: 3, objective: "3.4", type: "single",
    question: "A company hosts one web application in Azure and another in its own datacenter. Which statement about Application Insights is true?",
    options: [
      "It can monitor only applications hosted in Azure App Service",
      "It can monitor applications running in Azure, on-premises, or in another cloud",
      "It can monitor the on-premises application only after the application is migrated",
      "It monitors virtual machine health but not application behavior"
    ],
    answer: [1],
    explanation: "Application Insights monitors web applications wherever they run, using an SDK in the code or an agent that needs no code changes. It is focused on application performance and usage rather than only infrastructure health.",
    difficulty: 2, tags: ["Application Insights", "hybrid"]
  },
  {
    id: "d3-096", domain: 3, objective: "3.4", type: "single",
    question: "A ticketing website has almost no visitors overnight. The owners want to confirm throughout the night that the site still responds to requests. What should they use?",
    options: [
      "Azure Status",
      "An Azure Advisor reliability recommendation",
      "An Application Insights availability test",
      "A Delete lock"
    ],
    answer: [2],
    explanation: "Availability tests send synthetic requests to the application on a schedule, so responsiveness is checked even with no real traffic. Azure Status covers the platform globally, Advisor only recommends, and locks prevent deletion.",
    difficulty: 2, tags: ["Application Insights", "availability tests"]
  },
  {
    id: "d3-097", domain: 3, objective: "3.4", type: "single",
    question: "Which term completes the sentence: In Azure Monitor, ______ are numeric values collected at regular intervals and are well suited to near-real-time alerting.",
    options: ["logs", "tags", "initiatives", "metrics"],
    answer: [3],
    explanation: "Metrics are numeric, time-based measurements such as CPU percentage. Logs are event records with varied structure used for deeper analysis, while tags and initiatives are governance concepts.",
    difficulty: 3, tags: ["metrics", "logs", "Azure Monitor"]
  },
  {
    id: "d3-098", domain: 3, objective: "3.4", type: "single",
    question: "After an incident, an operations team needs to search the log records collected from 50 virtual machines for every error event in the past 24 hours and chart the results over time. What should the team use?",
    options: ["Log Analytics", "Azure Advisor", "Resource Health", "The pricing calculator"],
    answer: [0],
    explanation: "Log Analytics runs queries against log data collected by Azure Monitor and can filter, aggregate, and visualize the results. Advisor gives recommendations, Resource Health reports the state of one resource, and the pricing calculator estimates cost.",
    difficulty: 2, tags: ["Log Analytics", "logs"]
  },
  {
    id: "d3-099", domain: 3, objective: "3.4", type: "single",
    question: "Customers report that a web application is slow. The developers want to find out whether a call the application makes to a back-end database is responsible. Which tool should the developers use?",
    options: ["Service Health", "Application Insights", "Azure Advisor", "Azure Status"],
    answer: [1],
    explanation: "Application Insights tracks dependency calls and their performance, showing which call slows a request. Service Health and Azure Status report on the Azure platform, and Advisor offers general recommendations rather than request-level diagnostics.",
    difficulty: 2, tags: ["Application Insights", "dependencies"]
  },
  {
    id: "d3-100", domain: 3, objective: "3.4", type: "multi",
    question: "Which methods can be used to set up Application Insights for a web application? Choose TWO.",
    options: [
      "Add the Application Insights SDK to the application code",
      "Assign an Azure Policy initiative to the application",
      "Create a Service Health alert for the application",
      "Enable the Application Insights agent without changing the code",
      "Apply a ReadOnly lock to the application"
    ],
    answer: [0, 3],
    explanation: "Application Insights is enabled either by adding an SDK to the application code or by using the agent, which requires no code changes. Policy initiatives, Service Health alerts, and locks do not instrument an application.",
    difficulty: 2, tags: ["Application Insights"]
  }
);
