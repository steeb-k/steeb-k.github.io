// Microsoft AZ-900 interactive items: Yes/No statement grids and drag-and-drop matching (match), build lists (order),
// and dropdown tables (config). Original wording; the d.n objective numbers are this kit's own.
window.AZ_PBQ = window.AZ_PBQ || [];
window.AZ_PBQ.push(
  {
    id: "pbq-001", domain: 1, objective: "1.1", type: "config",
    title: "Shared responsibility by service type",
    instructions: "For each area of responsibility, select who is responsible under each cloud service type.",
    columns: [
      { key: "iaas", label: "IaaS", choices: ["Customer", "Microsoft", "Shared"] },
      { key: "paas", label: "PaaS", choices: ["Customer", "Microsoft", "Shared"] },
      { key: "saas", label: "SaaS", choices: ["Customer", "Microsoft", "Shared"] }
    ],
    rows: [
      { label: "Operating system", fixed: {}, answer: { iaas: "Customer", paas: "Microsoft", saas: "Microsoft" } },
      { label: "Physical datacenter", fixed: {}, answer: { iaas: "Microsoft", paas: "Microsoft", saas: "Microsoft" } },
      { label: "Information and data", fixed: {}, answer: { iaas: "Customer", paas: "Customer", saas: "Customer" } },
      { label: "Network controls", fixed: {}, answer: { iaas: "Customer", paas: "Shared", saas: "Microsoft" } }
    ],
    explanation: "Operating system: the customer installs and patches it on IaaS virtual machines, while Microsoft manages it for PaaS and SaaS. Physical datacenter: always Microsoft in the cloud. Information and data: always the customer, whatever the service type. Network controls: the customer's job in IaaS, shared in PaaS, and Microsoft's in SaaS."
  },
  {
    id: "pbq-002", domain: 1, objective: "1.1", type: "match",
    title: "Cloud computing statements",
    instructions: "For each statement, select Yes if the statement is true. Otherwise, select No.",
    left: [
      "In a consumption-based model, you pay only for the resources that you use.",
      "A hybrid cloud requires an organization to move all of its workloads out of its on-premises datacenter.",
      "A public cloud lets an organization deploy resources without purchasing hardware up front."
    ],
    right: ["Yes", "No"],
    answer: [0, 1, 0],
    explanation: "Statement 1 is Yes: consumption-based pricing bills for what is used and nothing more. Statement 2 is No: a hybrid cloud combines on-premises (private) resources with public cloud resources, so workloads can stay on-premises. Statement 3 is Yes: public cloud resources are rented from the provider, so there is no capital expenditure on hardware."
  },
  {
    id: "pbq-003", domain: 1, objective: "1.2", type: "match",
    title: "Match the cloud benefit",
    instructions: "Match each scenario to the cloud benefit that it describes. Each benefit can be used once, and one benefit is not used.",
    left: [
      "A service stays accessible with minimal downtime, and the provider states its uptime commitment in an SLA.",
      "An application is given more servers when demand grows so that it can handle the additional load.",
      "After a failure in one region, an application recovers and continues to function from another region.",
      "A finance team can forecast next quarter's cloud spending, and performance stays consistent as usage changes.",
      "Corporate standards, such as approved regions, are applied to every new deployment and existing resources are audited against them.",
      "Administrators can control the same resources through a web portal, a command line, or APIs."
    ],
    right: ["High availability", "Scalability", "Reliability", "Predictability", "Governance", "Manageability", "Security"],
    answer: [0, 1, 2, 3, 4, 5],
    unique: true,
    explanation: "Uptime backed by an SLA is high availability. Adding resources to meet demand is scalability. Recovering from failure and continuing to function is reliability. Being able to forecast cost and performance is predictability. Applying and auditing corporate standards is governance. Managing resources through the portal, command line, and APIs is manageability. Security is not described by any scenario."
  },
  {
    id: "pbq-004", domain: 1, objective: "1.3", type: "config",
    title: "Classify the workload",
    instructions: "For each workload, select the cloud service type and who is responsible for patching the operating system.",
    columns: [
      { key: "type", label: "Service type", choices: ["IaaS", "PaaS", "SaaS"] },
      { key: "os", label: "Patches the operating system", choices: ["Customer", "Cloud provider"] }
    ],
    rows: [
      { label: "A legacy application is moved unchanged to Azure virtual machines that need custom operating system settings", fixed: {}, answer: { type: "IaaS", os: "Customer" } },
      { label: "Developers publish their code to Azure App Service and do not manage any servers", fixed: {}, answer: { type: "PaaS", os: "Cloud provider" } },
      { label: "Employees use Microsoft 365 for email and document editing", fixed: {}, answer: { type: "SaaS", os: "Cloud provider" } },
      { label: "A team stores application data in Azure SQL Database, a managed database service", fixed: {}, answer: { type: "PaaS", os: "Cloud provider" } }
    ],
    explanation: "Virtual machines are IaaS: the customer controls and patches the operating system. App Service and Azure SQL Database are PaaS: the customer supplies code or data and the provider runs the operating system and platform. Microsoft 365 is SaaS: a finished application in which the provider manages everything except the customer's data, users, and settings."
  },
  {
    id: "pbq-005", domain: 1, objective: "1.3", type: "order",
    title: "Order by customer responsibility",
    instructions: "Arrange the options from the one in which the customer manages the most (top) to the one in which the customer manages the least (bottom).",
    items: ["PaaS", "On-premises datacenter", "SaaS", "IaaS"],
    answer: [1, 3, 0, 2],
    explanation: "On-premises, the customer manages everything, including the building and hardware. With IaaS the provider takes over the physical layer and the customer manages the operating system and above. With PaaS the customer manages only applications and data. With SaaS the customer manages only its data, users, and settings."
  },
  {
    id: "pbq-006", domain: 2, objective: "2.1", type: "order",
    title: "Azure management hierarchy",
    instructions: "Arrange the levels of the Azure management hierarchy from the top level (broadest scope) to the bottom level (narrowest scope).",
    items: ["Resource group", "Root management group", "Resource", "Subscription", "Child management group"],
    answer: [1, 4, 3, 0, 2],
    explanation: "The root management group sits at the top of each directory. Other management groups nest beneath it and contain subscriptions. Each subscription contains resource groups, and each resource group contains resources. Policies and role assignments made at one level are inherited by every level below it."
  },
  {
    id: "pbq-007", domain: 2, objective: "2.2", type: "match",
    title: "Match the compute service",
    instructions: "Match each requirement to the Azure compute service that meets it. Each service can be used once, and two services are not used.",
    left: [
      "Run a short piece of code whenever a message arrives, with no infrastructure to manage and no charge while idle.",
      "Run a group of identical, load-balanced virtual machines whose number increases and decreases automatically with demand.",
      "Run a server on which administrators need full control of the operating system to install custom software.",
      "Give employees a Windows desktop and their applications, hosted in Azure and reachable from any device.",
      "Run a single container quickly without managing virtual machines or a container orchestrator."
    ],
    right: ["Azure Functions", "Virtual Machine Scale Sets", "Azure Virtual Machines", "Azure Virtual Desktop", "Azure Container Instances", "Availability set", "Azure DNS"],
    answer: [0, 1, 2, 3, 4],
    unique: true,
    explanation: "Azure Functions runs event-driven code serverlessly. Virtual Machine Scale Sets create and automatically scale identical VMs. Azure Virtual Machines give full operating system control. Azure Virtual Desktop delivers desktops and apps from Azure. Azure Container Instances runs a container without VM or orchestrator management. An availability set only spreads VMs across fault and update domains, and Azure DNS is a networking service."
  },
  {
    id: "pbq-008", domain: 2, objective: "2.2", type: "config",
    title: "Choose the connectivity option",
    instructions: "For each requirement, select the Azure networking feature to use and whether the traffic travels over the public internet.",
    columns: [
      { key: "service", label: "Feature", choices: ["Azure VPN Gateway", "Azure ExpressRoute", "Virtual network peering", "Azure DNS"] },
      { key: "internet", label: "Uses the public internet", choices: ["Yes", "No"] }
    ],
    rows: [
      { label: "Connect a branch office network to an Azure virtual network through an encrypted tunnel over the office's existing internet connection", fixed: {}, answer: { service: "Azure VPN Gateway", internet: "Yes" } },
      { label: "Connect a datacenter to Azure over a dedicated private connection supplied by a connectivity provider", fixed: {}, answer: { service: "Azure ExpressRoute", internet: "No" } },
      { label: "Let resources in two Azure virtual networks in different regions communicate with each other directly, without deploying a gateway", fixed: {}, answer: { service: "Virtual network peering", internet: "No" } },
      { label: "Let one remote employee's laptop connect securely to an Azure virtual network from home", fixed: {}, answer: { service: "Azure VPN Gateway", internet: "Yes" } }
    ],
    explanation: "A site-to-site VPN through Azure VPN Gateway sends encrypted traffic over the internet. ExpressRoute is a private circuit through a connectivity provider and does not use the public internet. Peering links virtual networks, and the traffic stays on the Microsoft backbone network. A point-to-site VPN, also through VPN Gateway, connects a single client over the internet. Azure DNS hosts DNS domains and does not connect networks."
  },
  {
    id: "pbq-009", domain: 2, objective: "2.3", type: "config",
    title: "Choose redundancy and access tier",
    instructions: "For each requirement, select the lowest-cost storage redundancy option and blob access tier that meet it.",
    columns: [
      { key: "redundancy", label: "Redundancy", choices: ["LRS", "ZRS", "GRS", "RA-GRS"] },
      { key: "tier", label: "Access tier", choices: ["Hot", "Cool", "Cold", "Archive"] }
    ],
    rows: [
      { label: "Compliance records kept for seven years and almost never read; waiting several hours for retrieval is acceptable; the data must survive the loss of an entire region", fixed: {}, answer: { redundancy: "GRS", tier: "Archive" } },
      { label: "Product images read constantly by a website; the data must stay available if one datacenter in the region fails and must not leave the region", fixed: {}, answer: { redundancy: "ZRS", tier: "Hot" } },
      { label: "Test data that is read every day and can easily be re-created if it is lost", fixed: {}, answer: { redundancy: "LRS", tier: "Hot" } },
      { label: "Export files read infrequently, needed immediately when they are read, and deleted after 45 days; applications must be able to read them from the secondary region during a primary region outage", fixed: {}, answer: { redundancy: "RA-GRS", tier: "Cool" } }
    ],
    explanation: "Row 1: archive is the cheapest tier for data that can wait hours, and GRS copies it to a second region; read access to the secondary is not needed. Row 2: ZRS spreads copies across availability zones within one region, and frequently read data belongs in hot. Row 3: LRS is the cheapest option for data that can be re-created, and daily access means hot. Row 4: only RA-GRS allows reads from the secondary region; cool suits infrequent access with a 30-day minimum, while cold (90 days) and archive (180 days, offline) do not fit data deleted after 45 days."
  },
  {
    id: "pbq-010", domain: 2, objective: "2.3", type: "match",
    title: "Match the data movement tool",
    instructions: "Match each task to the Azure tool or service designed for it. Each option can be used once, and one option is not used.",
    left: [
      "Copy blobs between two storage accounts from a script by using a command-line utility.",
      "Browse, upload, and delete blobs and files in a graphical desktop application on Windows, macOS, or Linux.",
      "Keep an on-premises Windows file server synchronized with an Azure file share and cache frequently used files locally.",
      "Discover and assess on-premises servers, then migrate them to Azure.",
      "Move a very large amount of data to Azure on a physical device because the network link is too slow."
    ],
    right: ["AzCopy", "Azure Storage Explorer", "Azure File Sync", "Azure Migrate", "Azure Data Box", "Azure Arc"],
    answer: [0, 1, 2, 3, 4],
    unique: true,
    explanation: "AzCopy is the command-line copy utility for blobs and files. Azure Storage Explorer is the graphical desktop app. Azure File Sync keeps a Windows file server in sync with Azure Files and can cache hot files locally. Azure Migrate discovers, assesses, and migrates on-premises workloads. Azure Data Box ships data on a physical device for offline transfer. Azure Arc manages resources outside Azure and does not move data."
  },
  {
    id: "pbq-011", domain: 2, objective: "2.4", type: "order",
    title: "Defense-in-depth layers",
    instructions: "Arrange the defense-in-depth layers from the outermost layer (top) to the innermost layer (bottom).",
    items: ["Network", "Data", "Physical security", "Application", "Perimeter", "Identity and access", "Compute"],
    answer: [2, 5, 4, 0, 6, 3, 1],
    explanation: "From the outside in: physical security, identity and access, perimeter, network, compute, application, and data. Data is at the center because it is what attackers are after, and every outer layer exists to protect it."
  },
  {
    id: "pbq-012", domain: 2, objective: "2.4", type: "match",
    title: "Identity and security statements",
    instructions: "For each statement, select Yes if the statement is true. Otherwise, select No.",
    left: [
      "Under the Zero Trust model, a request that comes from inside the corporate network is trusted automatically.",
      "Microsoft Entra Conditional Access can require multifactor authentication only when a user signs in from an unfamiliar location.",
      "To use Microsoft Entra Domain Services, you must deploy and patch your own domain controller virtual machines.",
      "An Azure RBAC role assigned at the resource group scope also applies to the resources in that resource group."
    ],
    right: ["Yes", "No"],
    answer: [1, 0, 1, 0],
    explanation: "Statement 1 is No: Zero Trust verifies every request explicitly, wherever it comes from. Statement 2 is Yes: Conditional Access evaluates signals such as location and can require MFA only when they call for it. Statement 3 is No: Microsoft Entra Domain Services is a managed service, and Microsoft deploys and patches the domain controllers. Statement 4 is Yes: role assignments are inherited by child scopes."
  },
  {
    id: "pbq-013", domain: 3, objective: "3.1", type: "match",
    title: "Cost management statements",
    instructions: "For each statement, select Yes if the statement is true. Otherwise, select No.",
    left: [
      "The pricing calculator shows the actual charges from your most recent Azure invoice.",
      "When spending reaches a budget amount in Microsoft Cost Management, Azure automatically deletes the resources that caused the spending.",
      "Tags can be used to group and filter costs by department in cost analysis."
    ],
    right: ["Yes", "No"],
    answer: [1, 1, 0],
    explanation: "Statement 1 is No: the pricing calculator estimates the cost of resources you plan to deploy; actual charges are in Microsoft Cost Management. Statement 2 is No: a budget triggers alerts when a threshold is reached and does not delete resources. Statement 3 is Yes: tags such as Department are metadata that cost analysis can group and filter by."
  },
  {
    id: "pbq-014", domain: 3, objective: "3.2", type: "config",
    title: "Choose the governance tool and scope",
    instructions: "For each requirement, select the governance tool to use and the single scope at which to apply it with the least administrative effort.",
    columns: [
      { key: "tool", label: "Tool", choices: ["Azure Policy", "Resource lock", "Microsoft Purview"] },
      { key: "scope", label: "Scope", choices: ["Management group", "Subscription", "Resource group", "Resource"] }
    ],
    rows: [
      { label: "Allow resources to be created only in two approved regions across all 12 of the company's subscriptions", fixed: {}, answer: { tool: "Azure Policy", scope: "Management group" } },
      { label: "Prevent anyone from accidentally deleting one production storage account, without affecting other resources in its resource group", fixed: {}, answer: { tool: "Resource lock", scope: "Resource" } },
      { label: "Require a CostCenter tag on everything created in the Finance resource group, and nowhere else", fixed: {}, answer: { tool: "Azure Policy", scope: "Resource group" } },
      { label: "Make every resource in one subscription unchangeable during an audit freeze", fixed: {}, answer: { tool: "Resource lock", scope: "Subscription" } }
    ],
    explanation: "Row 1: Azure Policy enforces rules such as allowed locations, and one assignment at a management group is inherited by all subscriptions beneath it. Row 2: a Delete lock on the single resource blocks deletion of that resource only. Row 3: a policy that requires a tag, assigned to the resource group, affects only that group. Row 4: a ReadOnly lock on the subscription is inherited by every resource group and resource in it. Microsoft Purview governs and classifies data; it does not restrict Azure resource deployment."
  },
  {
    id: "pbq-015", domain: 3, objective: "3.3", type: "match",
    title: "Match the management tool",
    instructions: "Match each description to the Azure tool or feature that it describes. Each option can be used once, and two options are not used.",
    left: [
      "A browser-based shell that needs no local installation.",
      "A JSON file that declaratively defines the resources to deploy.",
      "Extends Azure management to servers running on-premises and to Kubernetes clusters in other clouds.",
      "A cross-platform command-line tool whose commands begin with az.",
      "A set of cmdlets, such as Get-AzResourceGroup, for managing Azure resources."
    ],
    right: ["Azure Cloud Shell", "ARM template", "Azure Arc", "Azure CLI", "Azure PowerShell", "Azure portal", "Azure Migrate"],
    answer: [0, 1, 2, 3, 4],
    unique: true,
    explanation: "Azure Cloud Shell is the browser-based shell. An ARM template is a declarative JSON file submitted to Azure Resource Manager. Azure Arc brings servers and Kubernetes clusters outside Azure under Azure management. The Azure CLI uses az commands, and Azure PowerShell uses Az cmdlets. The Azure portal is the graphical web console, and Azure Migrate moves workloads to Azure rather than managing them in place."
  },
  {
    id: "pbq-016", domain: 3, objective: "3.3", type: "match",
    title: "Deployment tool statements",
    instructions: "For each statement, select Yes if the statement is true. Otherwise, select No.",
    left: [
      "Azure Cloud Shell lets you choose between a Bash environment and a PowerShell environment.",
      "An ARM template is declarative: it states which resources should exist instead of listing the commands that create them.",
      "A server must be migrated into an Azure datacenter before Azure Arc can manage it."
    ],
    right: ["Yes", "No"],
    answer: [0, 0, 1],
    explanation: "Statement 1 is Yes: Cloud Shell offers both Bash and PowerShell. Statement 2 is Yes: ARM templates use declarative syntax, and Azure Resource Manager works out the operations and their order. Statement 3 is No: Azure Arc manages servers where they already run, on-premises or in another cloud, without moving them."
  },
  {
    id: "pbq-017", domain: 3, objective: "3.4", type: "config",
    title: "Choose the monitoring tool",
    instructions: "For each need, select the tool to use and whether the AZ-900 skills outline lists that tool as part of Azure Monitor.",
    columns: [
      { key: "tool", label: "Tool", choices: ["Azure Advisor", "Azure Service Health", "Log Analytics", "Azure Monitor alerts", "Application Insights"] },
      { key: "monitor", label: "Listed under Azure Monitor", choices: ["Yes", "No"] }
    ],
    rows: [
      { label: "Write queries against log data collected from many resources", fixed: {}, answer: { tool: "Log Analytics", monitor: "Yes" } },
      { label: "Receive a recommendation to resize an underused virtual machine", fixed: {}, answer: { tool: "Azure Advisor", monitor: "No" } },
      { label: "Send an email to the on-call team when CPU usage on a virtual machine exceeds 90 percent", fixed: {}, answer: { tool: "Azure Monitor alerts", monitor: "Yes" } },
      { label: "Track page load times and failed requests for a web application", fixed: {}, answer: { tool: "Application Insights", monitor: "Yes" } },
      { label: "Learn about planned Azure maintenance that will affect the region you deploy to", fixed: {}, answer: { tool: "Azure Service Health", monitor: "No" } }
    ],
    explanation: "Log Analytics is the Azure Monitor tool for querying logs. Azure Advisor, a separate service, gives personalized recommendations such as resizing idle VMs. Azure Monitor alerts notify people or start actions when a metric or log condition is met. Application Insights is the Azure Monitor feature for web application performance and failures. Azure Service Health, a separate service, reports service issues and planned maintenance for the services and regions you use. The outline names Azure Advisor, Azure Service Health, and Azure Monitor as three separate tools, and lists Log Analytics, Azure Monitor alerts, and Application Insights under Azure Monitor."
  },
  {
    id: "pbq-018", domain: 3, objective: "3.4", type: "order",
    title: "Health information by scope",
    instructions: "Arrange the three Azure Service Health components from the broadest scope (top) to the narrowest scope (bottom).",
    items: ["Resource Health", "Azure Status", "Service Health"],
    answer: [1, 2, 0],
    explanation: "Azure Status shows the state of all Azure services in every region. Service Health narrows that to the services and regions you actually use. Resource Health reports on your individual resources, such as one virtual machine."
  }
);
