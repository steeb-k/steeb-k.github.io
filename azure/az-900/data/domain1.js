// data/domain1.js - Domain 1: Cloud Concepts (AZ-900)
window.AZ_BANK = window.AZ_BANK || [];
window.AZ_BANK.push(
  // ---------- 1.1 Describe cloud computing ----------
  {
    id: "d1-001", domain: 1, objective: "1.1", type: "single",
    question: "What is cloud computing?",
    options: [
      "The delivery of computing services over the internet",
      "A datacenter that an organization builds and operates for its own use",
      "Software that is installed and run on each user's computer",
      "A private network that connects an organization's branch offices"
    ],
    answer: [0],
    explanation: "Cloud computing is the delivery of computing services such as compute, storage, and networking over the internet, typically billed by use. A self-built datacenter and locally installed software are the traditional alternatives, and a branch network is just connectivity.",
    difficulty: 1, tags: ["cloud computing", "definition"]
  },
  {
    id: "d1-002", domain: 1, objective: "1.1", type: "single",
    question: "In the shared responsibility model, which responsibility always remains with the customer, regardless of the cloud service type?",
    options: ["Physical hosts", "Operating system", "Information and data", "Physical network"],
    answer: [2],
    explanation: "The customer is always responsible for its information and data, along with devices and accounts and identities. Physical hosts and the physical network always belong to the provider, and operating system responsibility depends on the service type.",
    difficulty: 1, tags: ["shared responsibility", "data"]
  },
  {
    id: "d1-003", domain: 1, objective: "1.1", type: "single",
    question: "A logistics company moves a line-of-business application from its own servers to Azure virtual machines. Who is responsible for applying security updates to the operating system on the virtual machines?",
    options: [
      "Microsoft",
      "The logistics company",
      "The application vendor",
      "Microsoft and the logistics company share the task equally"
    ],
    answer: [1],
    explanation: "Virtual machines are IaaS, where the customer manages the operating system, including patching. Microsoft manages the operating system only in PaaS and SaaS, and the split is not an equal share for this layer.",
    difficulty: 2, tags: ["shared responsibility", "IaaS", "patching"]
  },
  {
    id: "d1-004", domain: 1, objective: "1.1", type: "single",
    question: "A clinic stores patient scheduling data in a managed PaaS database in Azure. Who is responsible for the physical hosts that the database runs on?",
    options: ["The clinic", "The clinic's database administrator", "The clinic's internet service provider", "The cloud provider"],
    answer: [3],
    explanation: "For every cloud service type, the provider is responsible for the physical datacenter, physical network, and physical hosts. The clinic remains responsible for its data and for who can access it.",
    difficulty: 2, tags: ["shared responsibility", "PaaS", "physical hosts"]
  },
  {
    id: "d1-005", domain: 1, objective: "1.1", type: "single",
    question: "A law firm subscribes to a SaaS document management application. According to the shared responsibility model, which item is the law firm responsible for?",
    options: ["Network controls", "Accounts and identities", "The operating system", "Physical hosts"],
    answer: [1],
    explanation: "In SaaS the provider is responsible for the network controls, the operating system, and the physical hosts. Accounts and identities, like data and devices, stay with the customer in every service type.",
    difficulty: 3, tags: ["shared responsibility", "SaaS", "identities"]
  },
  {
    id: "d1-006", domain: 1, objective: "1.1", type: "multi",
    question: "Which responsibilities are always retained by the customer in the shared responsibility model? Choose THREE.",
    options: [
      "Information and data",
      "Physical datacenter",
      "Devices that connect to the cloud",
      "Physical network",
      "Accounts and identities",
      "Physical hosts"
    ],
    answer: [0, 2, 4],
    explanation: "Information and data, devices, and accounts and identities are the customer's responsibility in IaaS, PaaS, and SaaS alike. The physical datacenter, network, and hosts are always the provider's responsibility in the cloud.",
    difficulty: 2, tags: ["shared responsibility", "customer"]
  },
  {
    id: "d1-007", domain: 1, objective: "1.1", type: "single",
    question: "For a PaaS service, which responsibility is shared between the cloud provider and the customer?",
    options: ["Operating system", "Physical network", "Information and data", "Network controls"],
    answer: [3],
    explanation: "In PaaS, network controls, applications, and identity and access (identity and directory infrastructure) are shared. The operating system and physical network are the provider's, and information and data are always the customer's.",
    difficulty: 3, tags: ["shared responsibility", "PaaS"]
  },
  {
    id: "d1-008", domain: 1, objective: "1.1", type: "single",
    question: "A manufacturer runs all of its servers in a datacenter that it owns. Who is responsible for the physical security of the servers?",
    options: ["The manufacturer", "The cloud provider", "The hardware vendor", "The responsibility is shared with a cloud provider"],
    answer: [0],
    explanation: "On-premises, the organization is responsible for everything, from physical security up to the data. Responsibility moves to a cloud provider only for workloads that run in the provider's datacenters.",
    difficulty: 2, tags: ["shared responsibility", "on-premises"]
  },
  {
    id: "d1-009", domain: 1, objective: "1.1", type: "multi",
    question: "Which responsibilities always belong to the cloud provider for any cloud service type? Choose TWO.",
    options: ["Operating system", "Physical datacenter", "Applications", "Physical hosts", "Accounts and identities"],
    answer: [1, 3],
    explanation: "The provider always handles the physical datacenter, physical network, and physical hosts. The operating system and applications depend on the service type, and accounts and identities are always the customer's.",
    difficulty: 2, tags: ["shared responsibility", "provider"]
  },
  {
    id: "d1-010", domain: 1, objective: "1.1", type: "single",
    question: "Which cloud model is built, owned, and operated by a third-party provider and is available to anyone who wants to purchase services?",
    options: ["Private cloud", "Hybrid cloud", "Public cloud", "On-premises datacenter"],
    answer: [2],
    explanation: "A public cloud is run by a third-party provider and open to any customer. A private cloud serves a single organization, and a hybrid cloud combines public and private environments.",
    difficulty: 1, tags: ["cloud models", "public cloud"]
  },
  {
    id: "d1-011", domain: 1, objective: "1.1", type: "single",
    question: "What is a private cloud?",
    options: [
      "A cloud that uses services from several public cloud providers",
      "A cloud that is used by a single organization",
      "A public cloud subscription that is protected by a firewall",
      "A cloud that is available only in one country or region"
    ],
    answer: [1],
    explanation: "A private cloud is a cloud used by a single organization, whether it runs in that organization's datacenter or is hosted by a third party. Using several public providers is multicloud, and a firewall does not change the cloud model.",
    difficulty: 1, tags: ["cloud models", "private cloud"]
  },
  {
    id: "d1-012", domain: 1, objective: "1.1", type: "single",
    question: "Which cloud model combines public and private clouds in an interconnected environment?",
    options: ["Hybrid cloud", "Public cloud", "Private cloud", "Serverless computing"],
    answer: [0],
    explanation: "A hybrid cloud uses public and private clouds together. Public and private are each a single environment, and serverless is a way of running code, not a cloud model.",
    difficulty: 1, tags: ["cloud models", "hybrid cloud"]
  },
  {
    id: "d1-013", domain: 1, objective: "1.1", type: "single",
    question: "A startup has no datacenter and no budget to buy hardware. It needs to deploy a new web application quickly and pay only for the resources it uses. Which cloud model should the startup use?",
    options: ["Private cloud", "Hybrid cloud", "On-premises datacenter", "Public cloud"],
    answer: [3],
    explanation: "The public cloud requires no capital expenditure, provisions resources quickly, and bills only for what is used. A private cloud, a hybrid cloud, and an on-premises datacenter all require the startup to buy or operate hardware.",
    difficulty: 2, tags: ["cloud models", "public cloud", "use cases"]
  },
  {
    id: "d1-014", domain: 1, objective: "1.1", type: "single",
    question: "A government agency requires complete control over its resources and security, and its data must not be stored on infrastructure that is used by other organizations. Which cloud model meets these requirements?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "Multicloud"],
    answer: [1],
    explanation: "A private cloud gives the organization complete control and keeps its data from being collocated with other organizations' data. The public cloud, and the public part of a hybrid or multicloud design, run on infrastructure shared with other customers.",
    difficulty: 2, tags: ["cloud models", "private cloud", "use cases"]
  },
  {
    id: "d1-015", domain: 1, objective: "1.1", type: "single",
    question: "An insurance company must keep a legacy claims system in its own datacenter. The company plans to build all new customer-facing applications in Azure and connect them to the claims system. Which cloud model does this describe?",
    options: ["Hybrid cloud", "Public cloud", "Private cloud", "Serverless computing"],
    answer: [0],
    explanation: "Keeping a system on-premises while also running workloads in a public cloud is a hybrid cloud. A purely public or purely private model would not include both environments.",
    difficulty: 2, tags: ["cloud models", "hybrid cloud", "use cases"]
  },
  {
    id: "d1-016", domain: 1, objective: "1.1", type: "single",
    question: "A retailer runs its online store in its own datacenter, which has enough capacity for normal demand. During the holiday season, the retailer wants to use Azure for the additional capacity instead of buying more servers. Which cloud model should the retailer use?",
    options: ["Private cloud", "Public cloud", "Hybrid cloud", "On-premises datacenter"],
    answer: [2],
    explanation: "A hybrid cloud lets an organization keep its existing datacenter and use the public cloud for temporary peaks. A private cloud or on-premises datacenter alone would require buying hardware for the peak, and a public-only model would abandon the existing datacenter.",
    difficulty: 2, tags: ["cloud models", "hybrid cloud", "peak demand"]
  },
  {
    id: "d1-017", domain: 1, objective: "1.1", type: "single",
    question: "A hosting company operates cloud infrastructure in its own facility. The hardware is dedicated to one bank, and no other organization can use it. Which cloud model is the bank using?",
    options: ["Public cloud", "Hybrid cloud", "Multicloud", "Private cloud"],
    answer: [3],
    explanation: "A private cloud is defined by being used by a single organization, and it can be hosted by a third party in a dedicated datacenter. It is not public because the services are not offered to other customers, and nothing in the scenario combines two environments.",
    difficulty: 3, tags: ["cloud models", "private cloud", "hosted"]
  },
  {
    id: "d1-018", domain: 1, objective: "1.1", type: "single",
    question: "A media company has no datacenter of its own. It runs its video processing with one public cloud provider and its analytics with a second public cloud provider. Which term describes this approach?",
    options: ["Hybrid cloud", "Multicloud", "Private cloud", "Cloud bursting"],
    answer: [1],
    explanation: "Using two or more public cloud providers is multicloud. Hybrid cloud requires a private cloud or on-premises environment combined with a public cloud, which this company does not have, and cloud bursting is a hybrid technique for handling peaks.",
    difficulty: 3, tags: ["cloud models", "multicloud"]
  },
  {
    id: "d1-019", domain: 1, objective: "1.1", type: "single",
    question: "Which cloud model provides the most flexibility, because an organization can decide where to run each application?",
    options: ["Public cloud", "Private cloud", "Hybrid cloud", "On-premises datacenter"],
    answer: [2],
    explanation: "A hybrid cloud provides the most flexibility because each application can run in the public cloud or in the private environment. A single-environment model offers only one place to run workloads.",
    difficulty: 1, tags: ["cloud models", "hybrid cloud", "flexibility"]
  },
  {
    id: "d1-020", domain: 1, objective: "1.1", type: "multi",
    question: "Which statements describe the public cloud? Choose TWO.",
    options: [
      "No capital expenditure is needed to scale up",
      "The organization has complete control over resources and security",
      "Hardware must be purchased for startup and maintenance",
      "Organizations pay only for what they use",
      "Data is never stored on infrastructure used by other organizations"
    ],
    answer: [0, 3],
    explanation: "The public cloud needs no capital expenditure to scale and bills only for what is used. Complete control, hardware purchases, and data that is not collocated with other organizations are characteristics of a private cloud.",
    difficulty: 2, tags: ["cloud models", "public cloud"]
  },
  {
    id: "d1-021", domain: 1, objective: "1.1", type: "single",
    question: "Which of the following is an example of a capital expenditure (CapEx)?",
    options: [
      "Paying a monthly bill for cloud virtual machines",
      "Buying servers for a new datacenter",
      "Paying for cloud storage by the gigabyte",
      "Paying a monthly per-user subscription for an email service"
    ],
    answer: [1],
    explanation: "Capital expenditure is one-time, upfront spending on physical assets such as servers. Monthly bills for virtual machines, storage, and subscriptions are ongoing payments for services, which is operational expenditure.",
    difficulty: 1, tags: ["CapEx", "OpEx"]
  },
  {
    id: "d1-022", domain: 1, objective: "1.1", type: "single",
    question: "Under which type of expense does cloud computing fall?",
    options: ["Capital expenditure (CapEx)", "Depreciation", "Operational expenditure (OpEx)", "Fixed asset investment"],
    answer: [2],
    explanation: "Cloud computing is operational expenditure because you pay for services as you use them. Capital expenditure, depreciation, and fixed asset investment all relate to owning physical assets.",
    difficulty: 1, tags: ["OpEx", "consumption-based model"]
  },
  {
    id: "d1-023", domain: 1, objective: "1.1", type: "single",
    question: "A research institute creates 200 virtual machines for a three-day simulation each month, and then deletes them. The institute is billed only for the three days. Which cloud concept does this describe?",
    options: ["Consumption-based model", "Shared responsibility model", "Capital expenditure", "Private cloud"],
    answer: [0],
    explanation: "In the consumption-based model you pay only for the resources you use and stop paying when you no longer need them. Shared responsibility is about who manages what, and capital expenditure would mean buying hardware upfront.",
    difficulty: 2, tags: ["consumption-based model", "pay-as-you-go"]
  },
  {
    id: "d1-024", domain: 1, objective: "1.1", type: "multi",
    question: "What are benefits of the consumption-based model? Choose TWO.",
    options: [
      "The monthly cost stays the same regardless of usage",
      "There are no upfront costs",
      "The organization owns the hardware that it uses",
      "The organization can stop paying for resources that are no longer needed",
      "Costs are guaranteed to be lower than in an on-premises datacenter"
    ],
    answer: [1, 3],
    explanation: "The consumption-based model has no upfront costs and lets you stop paying for resources you no longer need. Cost varies with usage, the provider owns the hardware, and lower cost is not guaranteed.",
    difficulty: 2, tags: ["consumption-based model", "benefits"]
  },
  {
    id: "d1-025", domain: 1, objective: "1.1", type: "single",
    question: "Which term completes the sentence: Spending money upfront on physical infrastructure, such as a datacenter building, is ______.",
    options: ["operational expenditure", "consumption-based pricing", "pay-as-you-go pricing", "capital expenditure"],
    answer: [3],
    explanation: "Upfront spending on physical assets is capital expenditure. Operational expenditure, consumption-based pricing, and pay-as-you-go pricing all describe paying for services over time as they are used.",
    difficulty: 1, tags: ["CapEx", "sentence completion"]
  },
  {
    id: "d1-026", domain: 1, objective: "1.1", type: "single",
    question: "A company is comparing its traditional datacenter with the consumption-based model. Which task does the company have to perform for its datacenter that the consumption-based model makes unnecessary?",
    options: [
      "Deciding which users can access its data",
      "Predicting future demand and buying enough hardware for the peak",
      "Classifying the information that it stores",
      "Securing the devices that employees use"
    ],
    answer: [1],
    explanation: "A traditional datacenter forces you to estimate future needs and buy for the peak, whereas in the cloud you add or remove resources as demand changes. Access to data, data classification, and device security remain the customer's job in any model.",
    difficulty: 2, tags: ["consumption-based model", "capacity planning"]
  },
  {
    id: "d1-027", domain: 1, objective: "1.1", type: "single",
    question: "Which pricing model does cloud computing typically use?",
    options: ["Pay-as-you-go", "One-time perpetual license", "Upfront hardware purchase", "Fixed multi-year lease of a datacenter"],
    answer: [0],
    explanation: "Cloud services are typically delivered with pay-as-you-go pricing, so you pay only for the services you use. Perpetual licenses, hardware purchases, and fixed leases are traditional models with upfront or fixed costs.",
    difficulty: 1, tags: ["pricing models", "pay-as-you-go"]
  },
  {
    id: "d1-028", domain: 1, objective: "1.1", type: "single",
    question: "A development team finishes a project but leaves 20 virtual machines running in the cloud. Nobody signs in to the virtual machines. How does this affect the company's costs?",
    options: [
      "There is no charge, because the virtual machines are idle",
      "The virtual machines are billed only when a user signs in",
      "The virtual machines continue to be billed for as long as they are running",
      "The cost is converted to a capital expenditure"
    ],
    answer: [2],
    explanation: "Pay-as-you-go bills for the resources you have allocated, whether or not anyone is using them, so the charges continue until the virtual machines are shut down and released or deleted. Serverless code on a consumption-based plan is the kind of service that avoids charges for idle time.",
    difficulty: 3, tags: ["pricing models", "cost", "virtual machines"]
  },
  {
    id: "d1-029", domain: 1, objective: "1.1", type: "single",
    question: "A company compares the cost of a private cloud with the cost of the public cloud. Which statement is accurate?",
    options: [
      "Each model requires the company to buy hardware before it can start",
      "The public cloud requires an upfront payment for hardware, and a private cloud does not",
      "Neither model has any ongoing costs",
      "A private cloud requires hardware purchases, and the public cloud is billed based on use"
    ],
    answer: [3],
    explanation: "A private cloud requires buying and maintaining hardware, while the public cloud has no capital expenditure and is billed for what is used. Both models have ongoing costs.",
    difficulty: 2, tags: ["pricing models", "cloud models"]
  },
  {
    id: "d1-030", domain: 1, objective: "1.1", type: "single",
    question: "What is serverless computing?",
    options: [
      "A model in which applications run without any physical servers",
      "A model in which the provider manages the servers and the customer deploys only code",
      "A model in which the customer rents virtual machines and manages the operating system",
      "A model in which servers are located in the customer's datacenter"
    ],
    answer: [1],
    explanation: "With serverless computing the provider provisions, scales, and maintains the servers, and you supply only the code. Servers still exist, and renting virtual machines that you manage is IaaS.",
    difficulty: 1, tags: ["serverless", "definition"]
  },
  {
    id: "d1-031", domain: 1, objective: "1.1", type: "single",
    question: "A photo sharing company needs to run a small piece of code each time a user uploads an image. Uploads happen at unpredictable times. The company does not want to manage any servers and wants to pay only when the code runs. What should the company use?",
    options: ["Serverless computing", "A virtual machine that runs continuously", "A private cloud", "A dedicated physical server"],
    answer: [0],
    explanation: "Serverless computing runs code in response to events, needs no server management, and bills only when the code runs. A continuously running virtual machine or a dedicated server bills while idle and has to be managed.",
    difficulty: 2, tags: ["serverless", "event-driven"]
  },
  {
    id: "d1-032", domain: 1, objective: "1.1", type: "single",
    question: "Which statement about serverless computing is accurate?",
    options: [
      "The customer is billed for each hour that a server is allocated",
      "The customer chooses the operating system version on the servers",
      "The code runs on servers, but the cloud provider manages them",
      "The customer must add servers manually when demand increases"
    ],
    answer: [2],
    explanation: "Serverless code still runs on servers, but the provider manages and scales them automatically. Hourly billing for allocated servers, operating system choices, and manual scaling describe virtual machines.",
    difficulty: 3, tags: ["serverless", "characteristics"]
  },
  {
    id: "d1-033", domain: 1, objective: "1.1", type: "multi",
    question: "Which characteristics describe serverless computing? Choose TWO.",
    options: [
      "The customer patches the operating system",
      "Resources scale automatically with demand",
      "A fixed monthly fee is charged for each server",
      "The customer selects the physical host",
      "Billing is based on the resources consumed when the code runs"
    ],
    answer: [1, 4],
    explanation: "Serverless computing scales automatically and bills based on actual consumption when the code runs. Operating system patching, fixed per-server fees, and choosing hosts are not part of the model, because the provider manages the infrastructure.",
    difficulty: 2, tags: ["serverless", "characteristics"]
  },
  {
    id: "d1-034", domain: 1, objective: "1.1", type: "single",
    question: "Which term completes the sentence: As an organization moves a workload from IaaS to PaaS to SaaS, the share of responsibility that the cloud provider holds ______.",
    options: ["decreases", "stays the same", "moves entirely to the customer", "increases"],
    answer: [3],
    explanation: "The provider manages more with each step from IaaS to PaaS to SaaS, so its share of responsibility increases. The customer's share shrinks, but it never reaches zero, because data, devices, and identities stay with the customer.",
    difficulty: 2, tags: ["shared responsibility", "service types"]
  },

  // ---------- 1.2 Describe the benefits of using cloud services ----------
  {
    id: "d1-035", domain: 1, objective: "1.2", type: "single",
    question: "What does high availability mean?",
    options: [
      "Resources are available when needed, with minimal downtime",
      "Resources can be made larger by adding CPUs or memory",
      "Spending can be forecast accurately in advance",
      "Resources comply with corporate standards"
    ],
    answer: [0],
    explanation: "High availability means resources stay available when needed, even when something fails. Adding CPUs or memory is vertical scaling, forecasting spending is cost predictability, and compliance with standards is governance.",
    difficulty: 1, tags: ["high availability", "definition"]
  },
  {
    id: "d1-036", domain: 1, objective: "1.2", type: "single",
    question: "What is vertical scaling?",
    options: [
      "Adding more virtual machines to share the load",
      "Deploying resources to a second region",
      "Increasing or decreasing the capabilities of an existing resource",
      "Moving a workload from a private cloud to the public cloud"
    ],
    answer: [2],
    explanation: "Vertical scaling changes the capabilities of an existing resource, for example by adding CPUs or RAM. Adding more virtual machines is horizontal scaling, and deploying to another region relates to reliability.",
    difficulty: 1, tags: ["scalability", "vertical scaling"]
  },
  {
    id: "d1-037", domain: 1, objective: "1.2", type: "single",
    question: "An online ticket seller expects heavy traffic for a concert sale. An administrator adds five more virtual machines to the group that hosts the website. Which type of scaling is this?",
    options: ["Vertical scaling", "Horizontal scaling", "Scaling down", "Scaling up"],
    answer: [1],
    explanation: "Adding more instances of a resource is horizontal scaling, also called scaling out. Vertical scaling (scaling up or down) changes the size of an existing virtual machine instead of the number of virtual machines.",
    difficulty: 2, tags: ["scalability", "horizontal scaling"]
  },
  {
    id: "d1-038", domain: 1, objective: "1.2", type: "single",
    question: "A database server runs slowly during month-end processing. An administrator changes the virtual machine from 4 CPUs to 16 CPUs. Which type of scaling is this?",
    options: ["Horizontal scaling", "Scaling out", "Scaling in", "Vertical scaling"],
    answer: [3],
    explanation: "Adding CPUs or RAM to an existing virtual machine is vertical scaling (scaling up). Horizontal scaling, which includes scaling out and scaling in, changes the number of virtual machines.",
    difficulty: 2, tags: ["scalability", "vertical scaling"]
  },
  {
    id: "d1-039", domain: 1, objective: "1.2", type: "single",
    question: "A food delivery application adds instances during the dinner rush and removes them late at night, so that the company pays only for the capacity it needs at each time of day. Which benefit of cloud computing does this describe?",
    options: ["Scalability", "Governance", "Reliability", "High availability"],
    answer: [0],
    explanation: "Scalability is the ability to adjust resources to meet demand, adding them for a peak and removing them afterward so that you do not overpay. Governance is about standards, reliability is about recovering from failure, and high availability is about uptime.",
    difficulty: 2, tags: ["scalability", "demand"]
  },
  {
    id: "d1-040", domain: 1, objective: "1.2", type: "single",
    question: "After a promotion ends, an e-commerce company reduces the number of virtual machines that host its storefront from ten to four. Which term describes this action?",
    options: ["Scaling down", "Scaling up", "Scaling in", "Scaling out"],
    answer: [2],
    explanation: "Reducing the number of instances is scaling in, the removal direction of horizontal scaling. Scaling down would mean making an individual virtual machine smaller, and scaling up and out both add capacity.",
    difficulty: 3, tags: ["scalability", "scale in"]
  },
  {
    id: "d1-041", domain: 1, objective: "1.2", type: "single",
    question: "A bank runs its online banking portal on several virtual machines. When one virtual machine fails, customers continue to use the portal without interruption. Which benefit of cloud computing does this describe?",
    options: ["Scalability", "High availability", "Cost predictability", "Governance"],
    answer: [1],
    explanation: "High availability keeps a service accessible with minimal downtime even when a component fails. Scalability is about handling changes in demand, not about surviving a failure.",
    difficulty: 2, tags: ["high availability", "failure"]
  },
  {
    id: "d1-042", domain: 1, objective: "1.2", type: "single",
    question: "In which document does a cloud provider state the uptime that it guarantees for a service?",
    options: ["Shared responsibility model", "Pricing calculator estimate", "Resource template", "Service-level agreement (SLA)"],
    answer: [3],
    explanation: "A service-level agreement states the uptime guarantee for a service, expressed as a percentage. The shared responsibility model divides duties, a pricing estimate forecasts cost, and a template defines a deployment.",
    difficulty: 1, tags: ["high availability", "SLA"]
  },
  {
    id: "d1-043", domain: 1, objective: "1.2", type: "single",
    question: "What is reliability?",
    options: [
      "The ability of a system to recover from failures and continue to function",
      "The ability to forecast what cloud spending will be",
      "The ability to manage resources by using a command-line interface",
      "The ability to add CPUs to a virtual machine"
    ],
    answer: [0],
    explanation: "Reliability is the ability of a system to recover from failures and continue to function. Forecasting spending is cost predictability, using a command-line interface is management in the cloud, and adding CPUs is vertical scaling.",
    difficulty: 1, tags: ["reliability", "definition"]
  },
  {
    id: "d1-044", domain: 1, objective: "1.2", type: "single",
    question: "A streaming company deploys its application to regions on three continents so that the application can recover and keep functioning if a catastrophic event affects one region. Which benefit of cloud computing does this describe?",
    options: ["Manageability", "Scalability", "Reliability", "Predictability"],
    answer: [2],
    explanation: "Reliability is the ability to recover from failures and continue to function, and the cloud supports it through a decentralized design across regions. Scalability addresses demand, and manageability addresses how resources are managed.",
    difficulty: 2, tags: ["reliability", "regions"]
  },
  {
    id: "d1-045", domain: 1, objective: "1.2", type: "single",
    question: "A finance team tracks resource use in real time and analyzes usage patterns so that it can forecast next quarter's cloud spending. Which benefit of cloud computing does this describe?",
    options: ["Performance predictability", "Cost predictability", "Elasticity", "High availability"],
    answer: [1],
    explanation: "Cost predictability is the ability to forecast cloud spending by tracking and analyzing resource use. Performance predictability concerns the resources needed for a good customer experience, not the bill.",
    difficulty: 2, tags: ["predictability", "cost"]
  },
  {
    id: "d1-046", domain: 1, objective: "1.2", type: "single",
    question: "A travel booking site uses autoscaling and load balancing so that customers get consistent response times, whether traffic is light or heavy. Which benefit of cloud computing does this describe?",
    options: ["Cost predictability", "Governance", "Management in the cloud", "Performance predictability"],
    answer: [3],
    explanation: "Performance predictability means predicting and providing the resources needed for a positive customer experience, and autoscaling and load balancing support it. Cost predictability is about spending, and management in the cloud is about the tools used to manage resources.",
    difficulty: 2, tags: ["predictability", "performance"]
  },
  {
    id: "d1-047", domain: 1, objective: "1.2", type: "multi",
    question: "Which cloud features support performance predictability? Choose TWO.",
    options: [
      "Autoscaling",
      "A pricing calculator",
      "Real-time tracking of spending",
      "Load balancing",
      "Per-user subscription licensing"
    ],
    answer: [0, 3],
    explanation: "Autoscaling and load balancing, along with high availability, support performance predictability. A pricing calculator and tracking of spending support cost predictability, and licensing is unrelated to performance.",
    difficulty: 2, tags: ["predictability", "performance"]
  },
  {
    id: "d1-048", domain: 1, objective: "1.2", type: "single",
    question: "Predictability in the cloud is described in terms of which two areas?",
    options: ["Security and governance", "Performance and cost", "Availability and scalability", "Hardware and software"],
    answer: [1],
    explanation: "Predictability covers performance predictability and cost predictability. Security and governance, and availability and scalability, are separate cloud benefits.",
    difficulty: 1, tags: ["predictability"]
  },
  {
    id: "d1-049", domain: 1, objective: "1.2", type: "single",
    question: "A pharmaceutical company uses cloud-based auditing that flags any resource that is out of compliance with its corporate standards and suggests how to correct it. Which benefit of cloud computing does this describe?",
    options: ["Elasticity", "Reliability", "Governance", "Performance predictability"],
    answer: [2],
    explanation: "Governance keeps resources aligned with corporate standards and regulatory requirements, and cloud-based auditing that flags non-compliant resources supports it. Elasticity, reliability, and performance predictability concern capacity and uptime.",
    difficulty: 2, tags: ["governance", "auditing"]
  },
  {
    id: "d1-050", domain: 1, objective: "1.2", type: "single",
    question: "A security team wants the maximum amount of control over its cloud servers, including deciding when operating system patches are installed. Which cloud service type gives the team this level of control?",
    options: ["Infrastructure as a service (IaaS)", "Platform as a service (PaaS)", "Software as a service (SaaS)", "Serverless computing"],
    answer: [0],
    explanation: "IaaS gives the customer the most control, including management of the operating system and its patches. In PaaS, SaaS, and serverless computing the provider handles operating system patching and maintenance.",
    difficulty: 2, tags: ["security", "IaaS", "control"]
  },
  {
    id: "d1-051", domain: 1, objective: "1.2", type: "single",
    question: "A small online retailer could not withstand a distributed denial of service (DDoS) attack on its own network. After moving to the cloud, the retailer relies on the provider's ability to handle such attacks. Which benefit of cloud computing does this describe?",
    options: ["Manageability", "Cost predictability", "Scalability", "Security"],
    answer: [3],
    explanation: "Cloud providers are well suited to handle threats such as DDoS attacks, which is part of the security benefit of the cloud. Manageability, cost predictability, and scalability do not address protection from attacks.",
    difficulty: 2, tags: ["security", "DDoS"]
  },
  {
    id: "d1-052", domain: 1, objective: "1.2", type: "single",
    question: "Which of the following is an example of management in the cloud?",
    options: [
      "Automatically scaling a deployment based on need",
      "Managing resources through a web portal",
      "Automatically replacing a failing resource",
      "Receiving automatic alerts based on configured metrics"
    ],
    answer: [1],
    explanation: "Management in the cloud is how you interact with your environment: a web portal, a command-line interface, APIs, or PowerShell. Automatic scaling, replacement of failing resources, and alerts are management of the cloud.",
    difficulty: 1, tags: ["manageability", "management in the cloud"]
  },
  {
    id: "d1-053", domain: 1, objective: "1.2", type: "single",
    question: "Which of the following is an example of management of the cloud?",
    options: [
      "Running commands in a command-line interface",
      "Calling APIs from a script",
      "Monitoring resource health and automatically replacing failing resources",
      "Using PowerShell to create a virtual machine"
    ],
    answer: [2],
    explanation: "Management of the cloud covers what the platform does to manage resources, such as monitoring health and replacing failing resources automatically. A command-line interface, APIs, and PowerShell are ways to manage in the cloud.",
    difficulty: 1, tags: ["manageability", "management of the cloud"]
  },
  {
    id: "d1-054", domain: 1, objective: "1.2", type: "single",
    question: "An administrator at a university uses a command-line interface to review and change the settings of the university's cloud resources. Which aspect of cloud manageability does this describe?",
    options: ["Management in the cloud", "Management of the cloud", "Performance predictability", "Elasticity"],
    answer: [0],
    explanation: "Interacting with the environment through a portal, command-line interface, APIs, or PowerShell is management in the cloud. Management of the cloud refers to platform capabilities such as autoscaling, templates, and automatic alerts.",
    difficulty: 3, tags: ["manageability", "management in the cloud"]
  },
  {
    id: "d1-055", domain: 1, objective: "1.2", type: "single",
    question: "An engineering firm deploys every new environment from a preconfigured template, which removes the need for manual configuration. Which aspect of cloud manageability does this describe?",
    options: ["Management in the cloud", "Cost predictability", "High availability", "Management of the cloud"],
    answer: [3],
    explanation: "Deploying resources from a preconfigured template is an example of management of the cloud. Management in the cloud refers to the interface used, such as a portal or a command-line interface.",
    difficulty: 3, tags: ["manageability", "management of the cloud", "templates"]
  },
  {
    id: "d1-056", domain: 1, objective: "1.2", type: "multi",
    question: "Which of the following are ways to manage a cloud environment that are described as management in the cloud? Choose THREE.",
    options: [
      "A web portal",
      "Automatic scaling",
      "A command-line interface",
      "Automatic alerts based on metrics",
      "APIs",
      "Automatic replacement of failing resources"
    ],
    answer: [0, 2, 4],
    explanation: "A web portal, a command-line interface, APIs, and PowerShell are the ways to manage in the cloud. Automatic scaling, alerts, and replacement of failing resources are examples of management of the cloud.",
    difficulty: 2, tags: ["manageability", "management in the cloud"]
  },
  {
    id: "d1-057", domain: 1, objective: "1.2", type: "multi",
    question: "Which capabilities are examples of management of the cloud? Choose TWO.",
    options: [
      "Managing resources through a web portal",
      "Receiving automatic alerts based on configured metrics",
      "Managing resources by using PowerShell",
      "Automatically scaling resource deployment based on need",
      "Managing resources by using APIs"
    ],
    answer: [1, 3],
    explanation: "Automatic alerts and automatic scaling are things the platform does to manage resources, which is management of the cloud. The portal, PowerShell, and APIs are interfaces, which is management in the cloud.",
    difficulty: 2, tags: ["manageability", "management of the cloud"]
  },
  {
    id: "d1-058", domain: 1, objective: "1.2", type: "single",
    question: "Which Microsoft guidance supports both reliability and predictability when you design cloud solutions?",
    options: ["The shared responsibility model", "The consumption-based model", "The Microsoft Azure Well-Architected Framework", "The Zero Trust model"],
    answer: [2],
    explanation: "The Microsoft Azure Well-Architected Framework is design guidance that includes reliability as a pillar and supports both performance and cost predictability. The shared responsibility model divides duties, the consumption-based model describes billing, and Zero Trust is a security model.",
    difficulty: 1, tags: ["Well-Architected Framework", "reliability", "predictability"]
  },
  {
    id: "d1-059", domain: 1, objective: "1.2", type: "single",
    question: "A software company's customer base grows steadily every year. Each time performance starts to suffer, an administrator adds resources to the application so that it can handle the larger workload. Which benefit of cloud computing does this describe?",
    options: ["Elasticity", "Scalability", "Reliability", "Governance"],
    answer: [1],
    explanation: "Scalability is the ability to adjust resources to meet demand, here by adding capacity as the workload grows. Elasticity is the term for resources that expand and shrink automatically as demand fluctuates, which is not what the administrator is doing.",
    difficulty: 3, tags: ["scalability", "elasticity"]
  },
  {
    id: "d1-060", domain: 1, objective: "1.2", type: "single",
    question: "Which term completes the sentence: Using templates so that all deployed resources meet corporate standards and regulatory requirements is an example of ______.",
    options: ["governance", "elasticity", "high availability", "performance predictability"],
    answer: [0],
    explanation: "Governance means keeping resources aligned with corporate standards and regulatory requirements, and templates help enforce it. Elasticity, high availability, and performance predictability concern capacity and uptime.",
    difficulty: 1, tags: ["governance", "sentence completion"]
  },

  // ---------- 1.3 Describe cloud service types ----------
  {
    id: "d1-061", domain: 1, objective: "1.3", type: "single",
    question: "What is platform as a service (PaaS)?",
    options: [
      "A service type in which the customer rents hardware and installs the operating system",
      "A service type in which the customer uses a fully developed application",
      "A cloud model that is used by a single organization",
      "A service type in which the provider maintains the operating systems and development tools, and the customer deploys applications"
    ],
    answer: [3],
    explanation: "In PaaS the provider maintains the infrastructure, operating systems, middleware, and development tools, and the customer deploys and manages its applications. Renting infrastructure and installing an operating system is IaaS, and using a finished application is SaaS.",
    difficulty: 1, tags: ["PaaS", "definition"]
  },
  {
    id: "d1-062", domain: 1, objective: "1.3", type: "single",
    question: "A company's employees use Microsoft 365 for email and online meetings. Which cloud service type is Microsoft 365?",
    options: ["Infrastructure as a service (IaaS)", "Software as a service (SaaS)", "Platform as a service (PaaS)", "Serverless computing"],
    answer: [1],
    explanation: "Microsoft 365 is a fully developed application that the provider hosts and manages, which is SaaS. IaaS provides infrastructure, and PaaS provides a platform for deploying your own applications.",
    difficulty: 1, tags: ["SaaS", "Microsoft 365"]
  },
  {
    id: "d1-063", domain: 1, objective: "1.3", type: "single",
    question: "Azure Virtual Machines is an example of which cloud service type?",
    options: ["Infrastructure as a service (IaaS)", "Platform as a service (PaaS)", "Software as a service (SaaS)", "Private cloud"],
    answer: [0],
    explanation: "Virtual machines are IaaS: the provider supplies the hardware and the customer manages the operating system and everything above it. Private cloud is a cloud model, not a service type.",
    difficulty: 1, tags: ["IaaS", "virtual machines"]
  },
  {
    id: "d1-064", domain: 1, objective: "1.3", type: "single",
    question: "A distribution company plans to move 40 on-premises servers to Azure. The servers must be recreated in the cloud with as few changes as possible. Which cloud service type should the company use?",
    options: ["Software as a service (SaaS)", "Platform as a service (PaaS)", "Infrastructure as a service (IaaS)", "Serverless computing"],
    answer: [2],
    explanation: "A lift-and-shift migration recreates existing servers as cloud virtual machines with minimal change, which is the classic IaaS use case. PaaS and serverless computing would require changing how the applications are deployed, and SaaS would replace them.",
    difficulty: 2, tags: ["IaaS", "lift-and-shift", "use cases"]
  },
  {
    id: "d1-065", domain: 1, objective: "1.3", type: "single",
    question: "A development team wants to build and deploy a web application without managing the underlying servers, operating systems, or development tools. Which cloud service type should the team use?",
    options: ["Infrastructure as a service (IaaS)", "Software as a service (SaaS)", "On-premises datacenter", "Platform as a service (PaaS)"],
    answer: [3],
    explanation: "PaaS provides a complete development and deployment environment, with the provider managing servers, operating systems, and tools. IaaS would leave the operating system to the team, and SaaS provides a finished application, not a place to deploy their own.",
    difficulty: 2, tags: ["PaaS", "development", "use cases"]
  },
  {
    id: "d1-066", domain: 1, objective: "1.3", type: "single",
    question: "A ten-person accounting firm needs email for its employees. The firm has no IT staff and wants to minimize administrative effort. Which cloud service type should the firm use?",
    options: ["Infrastructure as a service (IaaS)", "Software as a service (SaaS)", "Platform as a service (PaaS)", "Private cloud"],
    answer: [1],
    explanation: "Email and messaging is a common SaaS scenario, and SaaS requires the least technical knowledge and management effort. IaaS and PaaS would require the firm to install or deploy and maintain an email application.",
    difficulty: 2, tags: ["SaaS", "email", "use cases"]
  },
  {
    id: "d1-067", domain: 1, objective: "1.3", type: "single",
    question: "A consulting company wants its employees to submit and track expenses in a web browser. The company wants to pay per user each month and does not want to deploy or update any software. Which cloud service type meets these requirements?",
    options: ["Software as a service (SaaS)", "Platform as a service (PaaS)", "Infrastructure as a service (IaaS)", "Hybrid cloud"],
    answer: [0],
    explanation: "Finance and expense tracking delivered as a finished application on a per-user subscription is SaaS. With PaaS or IaaS the company would have to deploy and update the software itself, and hybrid cloud is a cloud model.",
    difficulty: 2, tags: ["SaaS", "expense tracking", "use cases"]
  },
  {
    id: "d1-068", domain: 1, objective: "1.3", type: "single",
    question: "A marketing company wants to analyze and mine its sales data by using analytics and business intelligence tools that are provided as part of a managed platform. Which cloud service type does this scenario describe?",
    options: ["Infrastructure as a service (IaaS)", "Software as a service (SaaS)", "Platform as a service (PaaS)", "Private cloud"],
    answer: [2],
    explanation: "Analytics or business intelligence tools provided with the platform are a typical PaaS scenario. IaaS would provide only the infrastructure on which the company would have to install its own tools.",
    difficulty: 2, tags: ["PaaS", "analytics", "use cases"]
  },
  {
    id: "d1-069", domain: 1, objective: "1.3", type: "single",
    question: "A game studio needs to create test environments quickly and remove them when testing ends. The testers must keep full control of the operating system configuration in each environment. Which cloud service type should the studio use?",
    options: ["Platform as a service (PaaS)", "Infrastructure as a service (IaaS)", "Software as a service (SaaS)", "Serverless computing"],
    answer: [1],
    explanation: "Testing and development environments that need full control of the configuration are an IaaS use case. PaaS, SaaS, and serverless computing do not give the customer control of the operating system.",
    difficulty: 2, tags: ["IaaS", "test and development", "use cases"]
  },
  {
    id: "d1-070", domain: 1, objective: "1.3", type: "single",
    question: "A scientific software vendor needs to host an application that depends on a customized operating system configuration and on a monitoring agent that must be installed in the operating system. Which cloud service type should the vendor use?",
    options: ["Platform as a service (PaaS)", "Software as a service (SaaS)", "Serverless computing", "Infrastructure as a service (IaaS)"],
    answer: [3],
    explanation: "Only IaaS gives the customer control of the operating system, so custom configuration and operating system agents require it. In PaaS and serverless computing the provider manages the operating system, and SaaS offers a finished application.",
    difficulty: 3, tags: ["IaaS", "operating system", "control"]
  },
  {
    id: "d1-071", domain: 1, objective: "1.3", type: "multi",
    question: "In which environments is a cloud provider responsible for maintaining the operating system? Choose TWO.",
    options: ["Infrastructure as a service (IaaS)", "Platform as a service (PaaS)", "Software as a service (SaaS)", "An on-premises datacenter", "A private cloud in the organization's own datacenter"],
    answer: [1, 2],
    explanation: "The provider maintains the operating system in PaaS and SaaS. In IaaS the customer installs, configures, and patches the operating system, and in an on-premises datacenter or a self-hosted private cloud the organization manages everything itself.",
    difficulty: 3, tags: ["service types", "operating system", "shared responsibility"]
  },
  {
    id: "d1-072", domain: 1, objective: "1.3", type: "single",
    question: "Which cloud service type places the largest share of responsibility on the customer?",
    options: ["Infrastructure as a service (IaaS)", "Platform as a service (PaaS)", "Software as a service (SaaS)", "Serverless computing"],
    answer: [0],
    explanation: "IaaS is the most flexible service type and gives the customer the most control, so it also leaves the customer with the most to manage. PaaS, serverless computing, and SaaS shift progressively more to the provider.",
    difficulty: 1, tags: ["IaaS", "responsibility"]
  },
  {
    id: "d1-073", domain: 1, objective: "1.3", type: "multi",
    question: "A company subscribes to a SaaS customer relationship management application. What is the company responsible for? Choose THREE.",
    options: [
      "The data that it enters into the application",
      "Updates to the application",
      "The devices that are allowed to connect",
      "Patches for the operating system",
      "The users who have access",
      "The physical hosts"
    ],
    answer: [0, 2, 4],
    explanation: "With SaaS the customer is responsible only for its data, the devices it allows to connect, and the users who have access. The provider handles application updates, operating system patches, and physical hosts.",
    difficulty: 2, tags: ["SaaS", "shared responsibility"]
  },
  {
    id: "d1-074", domain: 1, objective: "1.3", type: "single",
    question: "A hospital uses a managed database service in Azure. Microsoft maintains and patches the operating system and the database software, and the hospital creates its own databases and manages its data. Which cloud service type is the hospital using?",
    options: ["Infrastructure as a service (IaaS)", "Software as a service (SaaS)", "Platform as a service (PaaS)", "Private cloud"],
    answer: [2],
    explanation: "A managed database in which the provider patches the operating system and database software while the customer manages its own databases and data is PaaS. With IaaS the hospital would install and patch the database on its own virtual machine.",
    difficulty: 2, tags: ["PaaS", "managed database"]
  },
  {
    id: "d1-075", domain: 1, objective: "1.3", type: "single",
    question: "A software company installs its payroll application on Azure virtual machines that it manages. The company then sells access to the application to other businesses for a monthly fee per user. Which cloud service type is the software company consuming from Azure?",
    options: ["Software as a service (SaaS)", "Infrastructure as a service (IaaS)", "Platform as a service (PaaS)", "Serverless computing"],
    answer: [1],
    explanation: "The software company rents virtual machines and manages them itself, so it consumes IaaS from Azure. What it sells to its own customers is SaaS, but that is not what the question asks.",
    difficulty: 3, tags: ["IaaS", "SaaS", "perspective"]
  },
  {
    id: "d1-076", domain: 1, objective: "1.3", type: "single",
    question: "Which term completes the sentence: SaaS applications are usually licensed through ______.",
    options: [
      "a one-time purchase of server hardware",
      "a charge for each hour that a virtual machine runs",
      "a perpetual license that is installed on each computer",
      "a monthly or annual subscription"
    ],
    answer: [3],
    explanation: "SaaS is usually licensed through a monthly or annual subscription, often per user. Hardware purchases and perpetual licenses are traditional models, and hourly virtual machine charges apply to IaaS.",
    difficulty: 1, tags: ["SaaS", "licensing"]
  },
  {
    id: "d1-077", domain: 1, objective: "1.3", type: "single",
    question: "A company deploys a web application to a PaaS service. What does the company remain responsible for managing?",
    options: [
      "Its application and data",
      "Patches for the operating system",
      "Licensing of the operating system",
      "The physical network"
    ],
    answer: [0],
    explanation: "In PaaS the customer deploys and manages its own applications and data. The provider handles licensing and patching of the operating system and maintains the physical network.",
    difficulty: 2, tags: ["PaaS", "responsibility"]
  },
  {
    id: "d1-078", domain: 1, objective: "1.3", type: "single",
    question: "Which list orders the cloud service types from the most customer control to the least customer control?",
    options: ["SaaS, PaaS, IaaS", "PaaS, IaaS, SaaS", "IaaS, PaaS, SaaS", "IaaS, SaaS, PaaS"],
    answer: [2],
    explanation: "IaaS gives the customer the most control, PaaS is the middle ground, and SaaS gives the least because the application is used as offered. Management effort for the customer falls in the same order.",
    difficulty: 2, tags: ["service types", "control"]
  },
  {
    id: "d1-079", domain: 1, objective: "1.3", type: "single",
    question: "A sales organization uses a SaaS application. An attacker signs in to the application by guessing the weak password of an employee's account. Under the SaaS model, who was responsible for protecting the account?",
    options: [
      "The SaaS provider, because it hosts the application",
      "The sales organization",
      "The employee's internet service provider",
      "Nobody, because accounts are not covered by the shared responsibility model"
    ],
    answer: [1],
    explanation: "Even with SaaS, the customer is responsible for its accounts and identities, including the users who have access. The provider secures the application and the infrastructure, not the customer's choice of passwords.",
    difficulty: 3, tags: ["SaaS", "shared responsibility", "identities"]
  },
  {
    id: "d1-080", domain: 1, objective: "1.3", type: "single",
    question: "A company is deciding between SaaS and IaaS for a business function. What is the main trade-off of choosing SaaS?",
    options: [
      "The company must purchase the server hardware",
      "The company must patch the operating system more often",
      "The company takes on responsibility for the physical datacenter",
      "The company gets less flexibility in exchange for less management effort"
    ],
    answer: [3],
    explanation: "SaaS is the least flexible service type, but it is the easiest to get running and needs the least management. Hardware purchases, operating system patching, and datacenter responsibility are not customer tasks in SaaS.",
    difficulty: 2, tags: ["SaaS", "IaaS", "trade-offs"]
  }
);
