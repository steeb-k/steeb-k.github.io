// data/domain2.js - Domain 2: Azure Architecture and Services (AZ-900), objectives 2.1 through 2.4
window.AZ_BANK = window.AZ_BANK || [];
window.AZ_BANK.push(
  {
    id: "d2-001", domain: 2, objective: "2.1", type: "single",
    question: "What is an Azure region?",
    options: [
      "A single datacenter that is assigned to one customer",
      "A geographical area that contains one or more datacenters connected by a low-latency network",
      "A logical container that holds related Azure resources",
      "A group of subscriptions that share the same policies"
    ],
    answer: [1],
    explanation: "A region is a geographical area with at least one, and potentially several, nearby datacenters networked together with low latency. A logical container for resources is a resource group, and a group of subscriptions is a management group.",
    difficulty: 1, tags: ["regions"]
  },
  {
    id: "d2-002", domain: 2, objective: "2.1", type: "single",
    question: "A retailer runs an application in the East US region. The company wants a second copy of the application in a location that Azure will not update at the same time as East US and that is far enough away to survive a regional disaster. What should the company use?",
    options: ["A second availability zone in East US", "An availability set", "The region paired with East US", "A second resource group in East US"],
    answer: [2],
    explanation: "Paired regions are at least 300 miles apart and receive planned updates one region at a time, so the paired region fits both requirements. Availability zones and availability sets stay inside East US, and a resource group is only a logical container.",
    difficulty: 2, tags: ["region pairs", "disaster recovery"]
  },
  {
    id: "d2-003", domain: 2, objective: "2.1", type: "multi",
    question: "Which two statements describe Azure region pairs? Choose TWO.",
    options: [
      "Planned Azure updates are rolled out to one region of a pair at a time",
      "The two regions of a pair are always located in the same city",
      "If a widespread outage occurs, one region of each pair is prioritized for recovery",
      "Every Azure service replicates its data to the paired region automatically",
      "A region pair is made up of three or more availability zones"
    ],
    answer: [0, 2],
    explanation: "Region pairs get sequential planned updates and prioritized recovery of one region per pair. The regions are at least 300 miles apart, only some services replicate to the pair automatically, and availability zones are a separate concept inside one region.",
    difficulty: 2, tags: ["region pairs"]
  },
  {
    id: "d2-004", domain: 2, objective: "2.1", type: "single",
    question: "A United States federal agency must deploy workloads to an instance of Azure that is physically and logically isolated from the public Azure regions and operated by screened US persons. What should the agency use?",
    options: ["Azure Government", "Azure operated by 21Vianet", "A region pair in the US geography", "A dedicated management group"],
    answer: [0],
    explanation: "Azure Government is the sovereign cloud for US government agencies and their partners, isolated and run by screened US persons. The 21Vianet regions serve China, a region pair is still public Azure, and a management group only organizes subscriptions.",
    difficulty: 1, tags: ["sovereign regions", "Azure Government"]
  },
  {
    id: "d2-005", domain: 2, objective: "2.1", type: "single",
    question: "A software company plans to host a service in Azure regions located in China. Which statement describes those regions?",
    options: [
      "They are standard public Azure regions that Microsoft operates directly",
      "They are part of Azure Government",
      "They are availability zones of the East Asia region",
      "They are a separate instance of Azure that is operated by 21Vianet"
    ],
    answer: [3],
    explanation: "Azure in China is a sovereign instance operated by 21Vianet through a partnership; Microsoft does not directly maintain those datacenters. Azure Government is the US sovereign cloud, and the China regions are not zones of another region.",
    difficulty: 2, tags: ["sovereign regions", "21Vianet"]
  },
  {
    id: "d2-006", domain: 2, objective: "2.1", type: "single",
    question: "What is an availability zone?",
    options: [
      "Two Azure regions that are at least 300 miles apart",
      "A group of virtual machines that share a load balancer",
      "A physically separate location within a region, made up of one or more datacenters with independent power, cooling, and networking",
      "An isolated instance of Azure for government customers"
    ],
    answer: [2],
    explanation: "Availability zones are physically separate datacenter locations inside one region, each with its own power, cooling, and networking. Two distant regions describe a region pair, and an isolated government instance is a sovereign region.",
    difficulty: 1, tags: ["availability zones"]
  },
  {
    id: "d2-007", domain: 2, objective: "2.1", type: "single",
    question: "A hospital runs a patient portal on two virtual machines in a single Azure region. The portal must stay available if one entire datacenter in that region loses power. What should you recommend?",
    options: [
      "Place both virtual machines in the same availability set",
      "Deploy the virtual machines to different availability zones",
      "Move both virtual machines to a new resource group",
      "Create a second subscription for one of the virtual machines"
    ],
    answer: [1],
    explanation: "Availability zones are separate datacenters with independent power, so VMs in different zones survive the loss of one datacenter. An availability set only spreads VMs across hardware within a datacenter, and resource groups and subscriptions are organizational.",
    difficulty: 2, tags: ["availability zones", "high availability"]
  },
  {
    id: "d2-008", domain: 2, objective: "2.1", type: "single",
    question: "What is the minimum number of availability zones in an Azure region that supports availability zones?",
    options: ["One", "Two", "Three", "Five"],
    answer: [2],
    explanation: "Every region that supports availability zones has a minimum of three separate zones, which is what allows a workload to survive the loss of one. Not every region supports availability zones at all.",
    difficulty: 1, tags: ["availability zones"]
  },
  {
    id: "d2-009", domain: 2, objective: "2.1", type: "single",
    question: "An architect says that a certain Azure service is zone-redundant. What does this mean?",
    options: [
      "The platform automatically replicates the service across availability zones",
      "You must pin each instance of the service to a zone that you select",
      "The service is copied to the paired region automatically",
      "The service is not tied to any region"
    ],
    answer: [0],
    explanation: "Zone-redundant services are replicated across zones by the platform. Pinning a resource to a chosen zone describes a zonal service, replication to another region is a region pair feature, and a service not tied to a region is non-regional.",
    difficulty: 3, tags: ["availability zones", "zone-redundant", "zonal"]
  },
  {
    id: "d2-010", domain: 2, objective: "2.1", type: "single",
    question: "Which category of Azure service is always available from Azure geographies and is resilient to both zone-wide and region-wide outages?",
    options: ["Zonal services", "Zone-redundant services", "Non-regional services", "Sovereign services"],
    answer: [2],
    explanation: "Non-regional services are not dependent on one region, so they withstand zone and region outages. Zonal and zone-redundant services live inside one region and only address zone failures; 'sovereign' describes isolated clouds, not a resiliency category.",
    difficulty: 2, tags: ["availability zones", "non-regional services"]
  },
  {
    id: "d2-011", domain: 2, objective: "2.1", type: "single",
    question: "A bank deploys a zonal virtual machine in zone 1 of a region. A flood damages every datacenter in that region. Which statement is true?",
    options: [
      "The virtual machine fails over to zone 2 automatically",
      "The virtual machine remains available because availability zones span regions",
      "The virtual machine is unavailable because availability zones do not protect against the loss of a whole region",
      "The virtual machine is restored automatically in the paired region"
    ],
    answer: [2],
    explanation: "All zones of a region are inside that region, so a region-wide disaster affects them all; a zonal VM is also pinned to one zone. Surviving a regional outage requires a deployment in another region, which is not automatic for VMs.",
    difficulty: 3, tags: ["availability zones", "region pairs"]
  },
  {
    id: "d2-012", domain: 2, objective: "2.1", type: "single",
    question: "A customer asks whether it can choose the specific Microsoft datacenter building in which a new storage account is created. What should you tell the customer?",
    options: [
      "Yes, every resource is deployed to a datacenter that the customer names",
      "No, customers select a region, and in some cases an availability zone, rather than an individual datacenter",
      "Yes, but only after the customer creates a management group",
      "No, Azure chooses the region for every resource automatically"
    ],
    answer: [1],
    explanation: "Datacenters are not exposed to customers directly; they are grouped into regions and availability zones, which are what you select. Customers do choose the region, and management groups have nothing to do with physical placement.",
    difficulty: 2, tags: ["datacenters", "regions"]
  },
  {
    id: "d2-013", domain: 2, objective: "2.1", type: "single",
    question: "What is a resource group?",
    options: [
      "A physical rack of servers in an Azure datacenter",
      "A billing agreement between a customer and Microsoft",
      "A set of regions in the same geography",
      "A logical container for Azure resources"
    ],
    answer: [3],
    explanation: "A resource group is a logical container used to manage related resources together. It is not physical hardware, a billing agreement (that is closer to a subscription), or a grouping of regions.",
    difficulty: 1, tags: ["resource groups"]
  },
  {
    id: "d2-014", domain: 2, objective: "2.1", type: "single",
    question: "A development team finishes a proof of concept that used 14 Azure resources, all in one resource group. The team wants to remove every resource in a single operation. What should the team do?",
    options: [
      "Delete the resource group",
      "Cancel the subscription",
      "Delete the management group",
      "Move the resources to another region"
    ],
    answer: [0],
    explanation: "Deleting a resource group deletes every resource it contains, which is why resources with a shared lifecycle are grouped together. Canceling the subscription affects everything else in it, and deleting a management group does not delete resources.",
    difficulty: 2, tags: ["resource groups", "lifecycle"]
  },
  {
    id: "d2-015", domain: 2, objective: "2.1", type: "multi",
    question: "Which two statements about resource groups are true? Choose TWO.",
    options: [
      "A resource group can contain other resource groups",
      "A resource can belong to only one resource group at a time",
      "All resources in a resource group must be in the same region as the group",
      "Each resource group must be in its own subscription",
      "Access granted on a resource group applies to the resources in it"
    ],
    answer: [1, 4],
    explanation: "A resource is in exactly one resource group, and actions or access applied to the group apply to its resources. Resource groups cannot be nested, can hold resources from any region, and many can exist in one subscription.",
    difficulty: 2, tags: ["resource groups"]
  },
  {
    id: "d2-016", domain: 2, objective: "2.1", type: "single",
    question: "You create a resource group and set its location to West Europe. You then add a virtual machine that runs in East US to the group. What is stored in West Europe?",
    options: [
      "The virtual machine's disks",
      "A replica of the virtual machine",
      "Metadata about the resources in the group",
      "Nothing, because the deployment fails"
    ],
    answer: [2],
    explanation: "A resource group's location determines where metadata about its resources is stored; the resources themselves can be in other regions. The deployment succeeds, and no disks or replicas are placed in the group's region.",
    difficulty: 3, tags: ["resource groups", "regions", "metadata"]
  },
  {
    id: "d2-017", domain: 2, objective: "2.1", type: "single",
    question: "An administrator placed a storage account in the wrong resource group. What can the administrator do?",
    options: [
      "Nothing, because a resource can never leave its original resource group",
      "Add the storage account to a second resource group so that it belongs to both",
      "Nest the wrong resource group inside the correct one",
      "Move the storage account to the correct resource group"
    ],
    answer: [3],
    explanation: "Many resources can be moved from one resource group to another. A resource cannot be in two groups at once, and resource groups cannot be nested.",
    difficulty: 2, tags: ["resource groups", "move resources"]
  },
  {
    id: "d2-018", domain: 2, objective: "2.1", type: "multi",
    question: "Which two types of boundary does an Azure subscription provide? Choose TWO.",
    options: ["Billing boundary", "Physical boundary", "Access control boundary", "Latency boundary", "Encryption boundary"],
    answer: [0, 2],
    explanation: "A subscription is a billing boundary (separate billing reports and invoices) and an access control boundary (access management policies applied at subscription level). It is a logical unit, so it defines nothing physical, and it does not set latency or encryption.",
    difficulty: 1, tags: ["subscriptions"]
  },
  {
    id: "d2-019", domain: 2, objective: "2.1", type: "single",
    question: "A university wants the engineering department and the medical school to each receive a separate Azure invoice for the resources they use. What should the university create?",
    options: [
      "One resource group for each department",
      "One subscription for each department",
      "One availability zone for each department",
      "One virtual network for each department"
    ],
    answer: [1],
    explanation: "A subscription is a billing boundary, so each subscription produces its own billing reports and invoice. Resource groups help organize resources inside a subscription but do not produce separate invoices; zones and virtual networks are not billing constructs.",
    difficulty: 2, tags: ["subscriptions", "billing boundary"]
  },
  {
    id: "d2-020", domain: 2, objective: "2.1", type: "single",
    question: "A multinational company has 40 Azure subscriptions. The compliance team wants to apply one set of policies to all of the subscriptions used by the European business units in a single assignment. What should the company use?",
    options: ["Resource groups", "Region pairs", "Availability sets", "Management groups"],
    answer: [3],
    explanation: "Management groups contain subscriptions, and governance applied to a management group is inherited by every subscription in it. Resource groups sit below subscriptions, and region pairs and availability sets are resiliency features.",
    difficulty: 2, tags: ["management groups", "governance"]
  },
  {
    id: "d2-021", domain: 2, objective: "2.1", type: "single",
    question: "How many levels deep can a management group tree be, not counting the root level or the subscription level?",
    options: ["Three", "Six", "Ten", "There is no limit"],
    answer: [1],
    explanation: "A management group tree supports up to six levels of depth, excluding the root and subscription levels. A separate limit allows 10,000 management groups in a single directory.",
    difficulty: 3, tags: ["management groups", "limits"]
  },
  {
    id: "d2-022", domain: 2, objective: "2.1", type: "single",
    question: "Which statement about management groups is true?",
    options: [
      "A subscription can have several parent management groups",
      "A management group can contain resources directly",
      "Each management group and subscription can have only one parent",
      "Management groups cannot be nested"
    ],
    answer: [2],
    explanation: "Each management group and subscription supports exactly one parent. Management groups can be nested, and they contain subscriptions and other management groups, not resources directly.",
    difficulty: 2, tags: ["management groups"]
  },
  {
    id: "d2-023", domain: 2, objective: "2.1", type: "single",
    question: "Which list shows the Azure management hierarchy from the highest level to the lowest level?",
    options: [
      "Subscriptions, management groups, resource groups, resources",
      "Management groups, resource groups, subscriptions, resources",
      "Resource groups, subscriptions, management groups, resources",
      "Management groups, subscriptions, resource groups, resources"
    ],
    answer: [3],
    explanation: "Management groups contain subscriptions, subscriptions contain resource groups, and resource groups contain resources. The other orders place a container below something it holds.",
    difficulty: 1, tags: ["hierarchy"]
  },
  {
    id: "d2-024", domain: 2, objective: "2.1", type: "single",
    question: "A company assigns a policy that limits virtual machine locations to one region. The policy is assigned to a management group that contains three subscriptions. What is the effect of the assignment?",
    options: [
      "It takes effect only after it is also assigned to each of the three subscriptions",
      "It is inherited by the three subscriptions and applies to the virtual machines in them",
      "It applies to new subscriptions only, not to the three existing ones",
      "It applies to every subscription in the directory"
    ],
    answer: [1],
    explanation: "Governance assigned at a management group is inherited by every subscription beneath it and by the resource groups and resources in those subscriptions, with no further assignment needed. Subscriptions outside that management group are not affected.",
    difficulty: 2, tags: ["hierarchy", "inheritance", "management groups", "policy"]
  },
  {
    id: "d2-025", domain: 2, objective: "2.1", type: "single",
    question: "A user is granted access at the scope of a resource group named RG1. A second resource group named RG2 is in the same subscription. Which resources can the user access through this assignment?",
    options: [
      "The resources in RG1 only",
      "The resources in RG1 and RG2",
      "Every resource in the subscription",
      "Every resource in the parent management group"
    ],
    answer: [0],
    explanation: "Inheritance flows downward only, so an assignment on RG1 covers the resources in RG1. It does not flow up to the subscription or sideways to RG2.",
    difficulty: 2, tags: ["hierarchy", "inheritance", "resource groups"]
  },
  {
    id: "d2-026", domain: 2, objective: "2.2", type: "single",
    question: "Which cloud service type do Azure Virtual Machines represent?",
    options: ["Software as a service (SaaS)", "Platform as a service (PaaS)", "Infrastructure as a service (IaaS)", "Serverless"],
    answer: [2],
    explanation: "Azure Virtual Machines are IaaS: Microsoft runs the physical hosts and you manage the operating system and everything on it. PaaS and serverless services such as App Service and Azure Functions hide the operating system from you.",
    difficulty: 1, tags: ["virtual machines", "IaaS"]
  },
  {
    id: "d2-027", domain: 2, objective: "2.2", type: "single",
    question: "A manufacturer needs to move a legacy application to Azure. The application requires a custom driver and specific operating system settings, and the code cannot be changed. Which compute option should you recommend?",
    options: ["Azure Functions", "Azure Virtual Machines", "Azure App Service", "Azure Container Instances"],
    answer: [1],
    explanation: "Only a virtual machine gives full control of the operating system for a lift-and-shift of an unmodified application. Functions and App Service do not expose the OS, and Container Instances would require packaging the application as a container.",
    difficulty: 2, tags: ["virtual machines", "compute comparison"]
  },
  {
    id: "d2-028", domain: 2, objective: "2.2", type: "single",
    question: "An online ticket seller runs its website on identical virtual machines. Traffic increases sharply when popular events go on sale and drops afterward. The number of virtual machines must increase and decrease automatically. What should you use?",
    options: ["An availability set", "Azure Virtual Desktop", "A virtual network gateway", "Virtual Machine Scale Sets"],
    answer: [3],
    explanation: "Virtual Machine Scale Sets manage a group of identical, load-balanced VMs and autoscale the instance count with demand or on a schedule. An availability set improves resilience but does not add or remove VMs.",
    difficulty: 2, tags: ["VM scale sets", "autoscale"]
  },
  {
    id: "d2-029", domain: 2, objective: "2.2", type: "single",
    question: "A law firm runs a document system on three virtual machines in one datacenter. When Azure performs planned maintenance or a server rack fails, at least some of the virtual machines must keep running. The number of virtual machines is fixed. What should you use?",
    options: ["An availability set", "Virtual Machine Scale Sets", "Azure Container Apps", "A resource group"],
    answer: [0],
    explanation: "An availability set spreads VMs across update domains and fault domains so that maintenance or a hardware failure does not affect all of them. Scale sets are chosen for automatic scaling, which is not required here, and a resource group provides no resilience.",
    difficulty: 2, tags: ["availability sets"]
  },
  {
    id: "d2-030", domain: 2, objective: "2.2", type: "single",
    question: "In an availability set, what do the virtual machines in the same fault domain share?",
    options: [
      "A common power source and network switch",
      "The same maintenance and reboot schedule",
      "The same operating system image",
      "A single public IP address"
    ],
    answer: [0],
    explanation: "A fault domain groups VMs by common power source and network switch, so one hardware failure affects only that domain. VMs that can be rebooted at the same time during maintenance form an update domain.",
    difficulty: 1, tags: ["availability sets", "fault domains"]
  },
  {
    id: "d2-031", domain: 2, objective: "2.2", type: "single",
    question: "Which term completes the sentence: In an availability set, a group of virtual machines that can be rebooted at the same time during planned maintenance is called ______.",
    options: ["a fault domain", "an availability zone", "an update domain", "a scale set"],
    answer: [2],
    explanation: "An update domain groups VMs that can be rebooted together; Azure updates one update domain at a time. A fault domain groups VMs by shared power and network hardware, and an availability zone is a separate datacenter location.",
    difficulty: 1, tags: ["availability sets", "update domains"]
  },
  {
    id: "d2-032", domain: 2, objective: "2.2", type: "single",
    question: "A startup places four virtual machines in one availability set. Which event can still make all four virtual machines unavailable at the same time?",
    options: [
      "A planned maintenance reboot of one update domain",
      "The failure of a single network switch",
      "An outage of the entire datacenter that hosts the availability set",
      "The failure of the power source for one rack"
    ],
    answer: [2],
    explanation: "An availability set protects against maintenance (update domains) and hardware failures such as a rack's power or switch (fault domains) inside a datacenter. It does not protect against the loss of the whole datacenter; availability zones do.",
    difficulty: 3, tags: ["availability sets", "availability zones"]
  },
  {
    id: "d2-033", domain: 2, objective: "2.2", type: "single",
    question: "An insurance company has 600 remote employees who use personal laptops and tablets. The company wants to give them a managed Windows desktop that runs in Azure, so that company data is not stored on the personal devices. What should you recommend?",
    options: ["Virtual Machine Scale Sets", "Azure Virtual Desktop", "Azure App Service", "A point-to-site VPN"],
    answer: [1],
    explanation: "Azure Virtual Desktop is a cloud-hosted desktop and application virtualization service reachable from almost any device, and data stays in Azure. A point-to-site VPN only connects a device to a network, and scale sets and App Service do not deliver desktops.",
    difficulty: 2, tags: ["Azure Virtual Desktop"]
  },
  {
    id: "d2-034", domain: 2, objective: "2.2", type: "single",
    question: "Which capability of Azure Virtual Desktop reduces the number of virtual machines that an organization must run?",
    options: [
      "Each user must be assigned a dedicated virtual machine",
      "Desktops run on the user's local hardware",
      "Session hosts are placed in fault domains",
      "Windows 10 or Windows 11 Enterprise multi-session lets several users share one virtual machine at the same time"
    ],
    answer: [3],
    explanation: "Enterprise multi-session allows multiple concurrent users on a single VM, which cuts the VM count. Azure Virtual Desktop runs in the cloud, not on local hardware, and dedicated VMs per user would increase the count.",
    difficulty: 2, tags: ["Azure Virtual Desktop", "multi-session"]
  },
  {
    id: "d2-035", domain: 2, objective: "2.2", type: "multi",
    question: "You plan to create an Azure virtual machine. Which three resources does the virtual machine require? Choose THREE.",
    options: [
      "A virtual network",
      "An App Service plan",
      "A network interface",
      "A management group",
      "Disk storage",
      "An ExpressRoute circuit"
    ],
    answer: [0, 2, 4],
    explanation: "A VM needs networking (a virtual network and a network interface) and storage disks, along with a size and a resource group. App Service plans, management groups, and ExpressRoute circuits are not needed to run a VM.",
    difficulty: 2, tags: ["virtual machines", "VM resources"]
  },
  {
    id: "d2-036", domain: 2, objective: "2.2", type: "single",
    question: "A credit union stores statements in an Azure storage account. Virtual machines in the credit union's virtual network must reach the storage account through a private IP address from the virtual network's address space. What should you use?",
    options: ["A public endpoint", "Virtual network peering", "A private endpoint", "A point-to-site VPN"],
    answer: [2],
    explanation: "A private endpoint is a network interface in the virtual network with a private IP address that connects to the service through Azure Private Link. A public endpoint uses a public IP address, and peering and VPNs connect networks rather than a single service.",
    difficulty: 2, tags: ["private endpoints", "Private Link"]
  },
  {
    id: "d2-037", domain: 2, objective: "2.2", type: "single",
    question: "What is a key difference between a container and a virtual machine?",
    options: [
      "A container includes a full guest operating system, and a virtual machine does not",
      "A container shares the host operating system, and a virtual machine runs its own guest operating system",
      "A container virtualizes the hardware, and a virtual machine virtualizes the operating system",
      "A container always costs more to run than a virtual machine"
    ],
    answer: [1],
    explanation: "Containers virtualize the operating system and share the host OS, which makes them lightweight and fast to start. Virtual machines virtualize hardware, and each one runs a complete guest OS, so the two reversed statements are wrong.",
    difficulty: 1, tags: ["containers", "virtual machines", "compute comparison"]
  },
  {
    id: "d2-038", domain: 2, objective: "2.2", type: "single",
    question: "A data analyst has one container image that converts report files. The analyst wants the fastest and simplest way to run the container in Azure without managing virtual machines or an orchestrator. What should the analyst use?",
    options: ["Azure Kubernetes Service (AKS)", "Azure Virtual Machines", "Virtual Machine Scale Sets", "Azure Container Instances"],
    answer: [3],
    explanation: "Azure Container Instances is the fastest and simplest way to run a container, with no VMs or orchestration to manage. AKS adds Kubernetes orchestration that a single container does not need, and VMs would have to be managed.",
    difficulty: 2, tags: ["containers", "Container Instances"]
  },
  {
    id: "d2-039", domain: 2, objective: "2.2", type: "single",
    question: "A logistics company runs hundreds of containers that make up a microservices application. The company needs a managed service to orchestrate deployment, scaling, and management of the containers by using Kubernetes. Which Azure service should you recommend?",
    options: ["Azure Kubernetes Service (AKS)", "Azure Container Instances", "Azure Functions", "Azure Virtual Desktop"],
    answer: [0],
    explanation: "AKS is the managed Kubernetes container orchestration service for running containers at scale. Container Instances runs individual containers without orchestration, and Functions and Azure Virtual Desktop are not container orchestrators.",
    difficulty: 2, tags: ["containers", "AKS", "orchestration"]
  },
  {
    id: "d2-040", domain: 2, objective: "2.2", type: "single",
    question: "A team wants to run a containerized web API as a platform service with built-in load balancing and scaling. The team does not want to operate a Kubernetes cluster. Which service is the closest fit?",
    options: ["Azure Container Instances", "Azure Kubernetes Service (AKS)", "Azure Container Apps", "An availability set"],
    answer: [2],
    explanation: "Azure Container Apps resembles Container Instances but adds built-in load balancing and scaling. Container Instances lacks those extras, AKS means working with Kubernetes, and an availability set applies to virtual machines.",
    difficulty: 3, tags: ["containers", "Container Apps", "Container Instances"]
  },
  {
    id: "d2-041", domain: 2, objective: "2.2", type: "multi",
    question: "Which two statements about private endpoints are true? Choose TWO.",
    options: [
      "A private endpoint has a private IP address from the address space of a virtual network",
      "A private endpoint makes a service reachable from anywhere on the internet",
      "A private endpoint connects to a service by using Azure Private Link",
      "A private endpoint is a physical device installed in the customer's datacenter",
      "A private endpoint can be created only in a sovereign region"
    ],
    answer: [0, 2],
    explanation: "A private endpoint is a network interface inside a virtual network, with a private IP address, that reaches a service through Azure Private Link. Reachability from anywhere on the internet describes a public endpoint, and private endpoints are neither physical devices nor limited to sovereign regions.",
    difficulty: 2, tags: ["private endpoints", "Private Link"]
  },
  {
    id: "d2-042", domain: 2, objective: "2.2", type: "single",
    question: "A photo-sharing startup needs a small piece of code to run each time a message arrives in a queue. The code finishes in a few seconds, and the startup wants to pay only while the code runs and to manage no servers. What should the startup use?",
    options: ["Azure Virtual Machines", "Azure Functions", "Virtual Machine Scale Sets", "Azure Virtual Desktop"],
    answer: [1],
    explanation: "Azure Functions is event-driven serverless compute: a trigger such as a queue message runs the code, and you are charged only for the time it runs. VMs and scale sets are billed while they are allocated and must be managed.",
    difficulty: 2, tags: ["Azure Functions", "serverless"]
  },
  {
    id: "d2-043", domain: 2, objective: "2.2", type: "single",
    question: "Which term completes the sentence: Azure Functions is an example of ______ computing.",
    options: ["serverless", "infrastructure as a service", "on-premises", "desktop virtualization"],
    answer: [0],
    explanation: "Azure Functions is a serverless compute service: you supply code and the platform provides and scales the infrastructure. IaaS describes virtual machines, and desktop virtualization describes Azure Virtual Desktop.",
    difficulty: 1, tags: ["Azure Functions", "serverless"]
  },
  {
    id: "d2-044", domain: 2, objective: "2.2", type: "single",
    question: "What is a public endpoint?",
    options: [
      "A network interface that has only a private IP address inside a virtual network",
      "A dedicated circuit between an on-premises datacenter and Azure",
      "A connection between two virtual networks",
      "An address with a public IP that can be reached from anywhere in the world over the internet"
    ],
    answer: [3],
    explanation: "A public endpoint has a public IP address and is reachable over the internet from anywhere. A private IP inside a virtual network describes a private endpoint, a dedicated circuit is ExpressRoute, and connecting two virtual networks is peering.",
    difficulty: 1, tags: ["public endpoints"]
  },
  {
    id: "d2-045", domain: 2, objective: "2.2", type: "single",
    question: "A nonprofit wants to publish a Node.js website. The developers want built-in scaling and load balancing, and they do not want to manage or patch servers. Which Azure service should you recommend?",
    options: ["Azure Virtual Machines", "Azure Virtual Desktop", "Azure App Service", "Azure VPN Gateway"],
    answer: [2],
    explanation: "Azure App Service is a managed, HTTP-based PaaS platform for web apps with built-in scaling, load balancing, and high availability. Virtual machines would require the team to manage the operating system.",
    difficulty: 2, tags: ["App Service", "application hosting"]
  },
  {
    id: "d2-046", domain: 2, objective: "2.2", type: "multi",
    question: "Which two types of application can be hosted in Azure App Service? Choose TWO.",
    options: ["Web apps", "Windows multi-session desktops", "API apps", "DNS zones", "Site-to-site VPN connections"],
    answer: [0, 2],
    explanation: "App Service hosts web apps, API apps, WebJobs, and mobile app back ends. Multi-session desktops belong to Azure Virtual Desktop, DNS zones to Azure DNS, and VPN connections to VPN Gateway.",
    difficulty: 1, tags: ["App Service"]
  },
  {
    id: "d2-047", domain: 2, objective: "2.2", type: "single",
    question: "An engineer wants an Azure SQL database to accept traffic only from one subnet of a virtual network. The traffic must stay on the Microsoft backbone network, and it is acceptable for the database to keep using its public endpoint address. The database does not need a private IP address in the virtual network. What should the engineer use?",
    options: ["A private endpoint", "A service endpoint", "A site-to-site VPN", "An availability set"],
    answer: [1],
    explanation: "A service endpoint extends the subnet's identity to the service over the Microsoft backbone so the service can be restricted to that subnet, while the service keeps its public endpoint. A private endpoint would give the service a private IP address in the virtual network, which is not required here.",
    difficulty: 3, tags: ["service endpoints", "private endpoints"]
  },
  {
    id: "d2-048", domain: 2, objective: "2.2", type: "single",
    question: "What is the purpose of an Azure virtual network?",
    options: [
      "To translate domain names into IP addresses",
      "To let Azure resources communicate privately with each other, with the internet, and with on-premises networks",
      "To deliver Windows desktops to remote users",
      "To group subscriptions for governance"
    ],
    answer: [1],
    explanation: "A virtual network is a private, isolated network in Azure that provides communication between resources, the internet, and on-premises networks. Name resolution is Azure DNS, desktops are Azure Virtual Desktop, and grouping subscriptions is a management group.",
    difficulty: 1, tags: ["virtual networks"]
  },
  {
    id: "d2-049", domain: 2, objective: "2.2", type: "single",
    question: "A network engineer wants to divide the address space of one virtual network so that web servers and database servers are in separate segments with different traffic filtering rules. What should the engineer create?",
    options: ["Subnets", "Resource groups", "Availability zones", "Management groups"],
    answer: [0],
    explanation: "Subnets divide a virtual network's address space into segments that can be filtered separately. Resource groups and management groups organize management, and availability zones are physical locations, not address segments.",
    difficulty: 1, tags: ["subnets", "virtual networks"]
  },
  {
    id: "d2-050", domain: 2, objective: "2.2", type: "single",
    question: "A company has one virtual network in West Europe and another in Southeast Asia. Virtual machines in the two networks must communicate by using private IP addresses, and the traffic must stay on the Microsoft backbone network. What should you configure?",
    options: ["A point-to-site VPN", "Azure DNS", "A public endpoint", "Virtual network peering"],
    answer: [3],
    explanation: "Virtual network peering connects two virtual networks, including networks in different regions, and the traffic is private and stays on the Microsoft backbone. A point-to-site VPN connects one computer, and Azure DNS only resolves names.",
    difficulty: 2, tags: ["peering", "virtual networks"]
  },
  {
    id: "d2-051", domain: 2, objective: "2.2", type: "multi",
    question: "Which two statements about virtual network peering are true? Choose TWO.",
    options: [
      "Traffic between peered virtual networks travels over the public internet",
      "Virtual networks in different Azure regions can be peered",
      "Peering requires an ExpressRoute circuit",
      "Resources in peered virtual networks can communicate with each other privately",
      "Peering connects an on-premises datacenter to Azure"
    ],
    answer: [1, 3],
    explanation: "Peering works across regions and lets resources in both networks communicate privately over the Microsoft backbone. It does not use the public internet or ExpressRoute, and on-premises connectivity is the job of VPN Gateway or ExpressRoute.",
    difficulty: 2, tags: ["peering"]
  },
  {
    id: "d2-052", domain: 2, objective: "2.2", type: "single",
    question: "A marketing agency owns a domain name and wants to manage the DNS records for the domain by using the same credentials, tools, and billing as its other Azure resources. What should the agency use?",
    options: ["Azure VPN Gateway", "Azure DNS", "Azure Virtual Desktop", "Virtual network peering"],
    answer: [1],
    explanation: "Azure DNS is a hosting service for DNS domains that resolves names by using Azure infrastructure and is managed like any other Azure resource. The other options provide connectivity or desktops, not DNS hosting.",
    difficulty: 2, tags: ["Azure DNS"]
  },
  {
    id: "d2-053", domain: 2, objective: "2.2", type: "single",
    question: "A startup wants to register a brand-new domain name and then host its DNS records in Azure. Which statement is true?",
    options: [
      "The startup can buy the domain name through Azure DNS and host the records there",
      "Azure DNS can host only private domains, so the startup cannot use it",
      "The startup must register the name elsewhere, such as with a domain registrar, and can then host the DNS zone in Azure DNS",
      "The startup must create a VPN gateway before it can host a DNS zone"
    ],
    answer: [2],
    explanation: "Azure DNS hosts DNS zones but cannot be used to buy a domain name; that is done through an App Service domain or a third-party registrar. Azure DNS hosts public and private domains and needs no VPN gateway.",
    difficulty: 3, tags: ["Azure DNS", "domain registration"]
  },
  {
    id: "d2-054", domain: 2, objective: "2.2", type: "single",
    question: "A regional clinic wants to connect its entire office network to an Azure virtual network through an encrypted tunnel over the internet. The clinic has a VPN device in the office. Which type of connection should the clinic use?",
    options: ["A point-to-site VPN", "A site-to-site VPN", "Virtual network peering", "A private endpoint"],
    answer: [1],
    explanation: "A site-to-site VPN connects an on-premises network, through its VPN device, to a virtual network. Point-to-site connects a single computer, peering connects two virtual networks, and a private endpoint connects to one service.",
    difficulty: 2, tags: ["VPN Gateway", "site-to-site"]
  },
  {
    id: "d2-055", domain: 2, objective: "2.2", type: "single",
    question: "A consultant who travels between customer sites needs to connect a laptop securely to the company's Azure virtual network from hotel Wi-Fi. Which type of connection should the consultant use?",
    options: ["A site-to-site VPN", "An ExpressRoute circuit", "A point-to-site VPN", "A service endpoint"],
    answer: [2],
    explanation: "A point-to-site VPN connects an individual client computer to a virtual network. Site-to-site and ExpressRoute connect whole networks from a fixed location, and a service endpoint links a subnet to an Azure service.",
    difficulty: 2, tags: ["VPN Gateway", "point-to-site"]
  },
  {
    id: "d2-056", domain: 2, objective: "2.2", type: "single",
    question: "How many VPN gateways can be deployed in a single Azure virtual network?",
    options: ["One", "Two", "One for each subnet", "One for each connection"],
    answer: [0],
    explanation: "Each virtual network can have only one VPN gateway. That single gateway can support multiple connections, so a gateway per subnet or per connection is neither needed nor possible.",
    difficulty: 1, tags: ["VPN Gateway"]
  },
  {
    id: "d2-057", domain: 2, objective: "2.2", type: "single",
    question: "A company plans a VPN gateway that must support point-to-site connections and also coexist with an ExpressRoute gateway. Which type of VPN gateway should the company deploy?",
    options: ["Policy-based", "Route-based", "Zonal", "Peered"],
    answer: [1],
    explanation: "Route-based gateways use IP routing to choose a tunnel and are required for point-to-site, multisite, connections between virtual networks, and coexistence with ExpressRoute. Policy-based gateways statically define which addresses go through each tunnel.",
    difficulty: 3, tags: ["VPN Gateway", "route-based", "policy-based"]
  },
  {
    id: "d2-058", domain: 2, objective: "2.2", type: "single",
    question: "A stock exchange must connect its datacenter to Azure. The connection must not travel over the public internet and must provide consistent latency. What should you recommend?",
    options: ["A site-to-site VPN", "A point-to-site VPN", "Virtual network peering", "Azure ExpressRoute"],
    answer: [3],
    explanation: "ExpressRoute is a private connection through a connectivity provider that bypasses the public internet and gives consistent latency. Both VPN types use the public internet, and peering only connects virtual networks to each other.",
    difficulty: 2, tags: ["ExpressRoute"]
  },
  {
    id: "d2-059", domain: 2, objective: "2.2", type: "single",
    question: "A security officer reviews a new ExpressRoute circuit and asks whether the data that crosses it is encrypted. Which statement is true?",
    options: [
      "The connection is private but is not encrypted by default",
      "All ExpressRoute traffic is encrypted automatically because it uses the public internet",
      "ExpressRoute traffic is always encrypted by a VPN gateway that Azure deploys for you",
      "ExpressRoute cannot be used with encryption"
    ],
    answer: [0],
    explanation: "ExpressRoute is private because it avoids the public internet, but it does not encrypt traffic by default; encryption can be added if required. It does not use the public internet, and Azure does not add a VPN gateway automatically.",
    difficulty: 3, tags: ["ExpressRoute", "encryption"]
  },
  {
    id: "d2-060", domain: 2, objective: "2.2", type: "multi",
    question: "Which two statements describe a difference between Azure ExpressRoute and a site-to-site VPN? Choose TWO.",
    options: [
      "ExpressRoute uses a private connection through a connectivity provider, and a site-to-site VPN uses the public internet",
      "ExpressRoute connects one laptop, and a site-to-site VPN connects an entire office",
      "A site-to-site VPN sends traffic through an encrypted tunnel, and ExpressRoute is not encrypted by default",
      "A site-to-site VPN can connect only two virtual networks to each other",
      "ExpressRoute requires no agreement with any provider"
    ],
    answer: [0, 2],
    explanation: "ExpressRoute is a private provider circuit that is not encrypted by default, while a site-to-site VPN is an encrypted tunnel over the public internet. Both connect whole networks, and ExpressRoute depends on a connectivity provider.",
    difficulty: 2, tags: ["ExpressRoute", "VPN Gateway"]
  },
  {
    id: "d2-061", domain: 2, objective: "2.3", type: "single",
    question: "A video production company needs to store thousands of large, unstructured video files and stream them to viewers over HTTPS. Which Azure Storage service should you recommend?",
    options: ["Azure Queues", "Azure Tables", "Azure Blobs", "Azure Disks"],
    answer: [2],
    explanation: "Azure Blobs is the object store for unstructured text and binary data and is intended for streaming video and audio. Queues hold messages, Tables hold NoSQL data, and Disks are volumes attached to virtual machines.",
    difficulty: 1, tags: ["Blob storage", "storage services"]
  },
  {
    id: "d2-062", domain: 2, objective: "2.3", type: "single",
    question: "A law firm wants to retire its on-premises file server. Staff must be able to map a network drive from their Windows laptops by using the SMB protocol. Which Azure Storage service should you use?",
    options: ["Azure Files", "Azure Blobs", "Azure Disks", "Azure Tables"],
    answer: [0],
    explanation: "Azure Files provides fully managed file shares reached over SMB (or NFS) that can be mounted like a normal network share. Blobs are objects reached over HTTP, and a disk is a volume attached to a virtual machine rather than a share for many users.",
    difficulty: 2, tags: ["Azure Files", "SMB"]
  },
  {
    id: "d2-063", domain: 2, objective: "2.3", type: "single",
    question: "An online ticketing site wants its web front end to hand off orders so that a separate back-end component can process them later, without the two components depending on each other being available. Which Azure Storage service should you use?",
    options: ["Azure Files", "Azure Disks", "Azure Blobs", "Azure Queues"],
    answer: [3],
    explanation: "Azure Queue storage holds large numbers of messages for asynchronous processing, which decouples application components. Files, Disks, and Blobs store files, volumes, and objects, not a backlog of work messages.",
    difficulty: 2, tags: ["Queue storage", "decoupling"]
  },
  {
    id: "d2-064", domain: 2, objective: "2.3", type: "single",
    question: "Which Azure Storage service is a NoSQL store for large amounts of structured, non-relational data?",
    options: ["Azure Blobs", "Azure Tables", "Azure Queues", "Azure Files"],
    answer: [1],
    explanation: "Azure Table storage is the NoSQL option for structured, non-relational data. Blobs store unstructured objects, Queues store messages, and Files provides file shares.",
    difficulty: 1, tags: ["Table storage", "NoSQL"]
  },
  {
    id: "d2-065", domain: 2, objective: "2.3", type: "single",
    question: "What does Azure Disks provide?",
    options: [
      "Managed file shares that are reached over SMB or NFS",
      "A messaging store for communication between application components",
      "Block-level storage volumes for Azure virtual machines",
      "An object store for unstructured text and binary data"
    ],
    answer: [2],
    explanation: "Azure Disks (managed disks) are block-level volumes that Azure manages and attaches to virtual machines. The other descriptions are Azure Files, Azure Queues, and Azure Blobs.",
    difficulty: 1, tags: ["Azure Disks", "managed disks"]
  },
  {
    id: "d2-066", domain: 2, objective: "2.3", type: "multi",
    question: "A company creates a standard general-purpose v2 storage account. Which three services does this account type support? Choose THREE.",
    options: ["Blob Storage", "Azure SQL Database", "Queue Storage", "Azure Files", "Azure Cosmos DB"],
    answer: [0, 2, 3],
    explanation: "Standard general-purpose v2 supports Blob Storage, Queue Storage, Table Storage, and Azure Files. Azure SQL Database and Azure Cosmos DB are separate database services and are not part of a storage account.",
    difficulty: 2, tags: ["storage account types", "general-purpose v2"]
  },
  {
    id: "d2-067", domain: 2, objective: "2.3", type: "single",
    question: "A hospital must keep medical imaging files for seven years. The files are almost never read, and a wait of several hours to retrieve one is acceptable. The hospital wants the lowest storage cost. Which access tier should you use?",
    options: ["Hot", "Cool", "Cold", "Archive"],
    answer: [3],
    explanation: "The archive tier has the lowest storage cost and is meant for rarely accessed data kept at least 180 days when retrieval latency of hours is acceptable. Hot, cool, and cold are online tiers that cost more to store.",
    difficulty: 2, tags: ["access tiers", "archive"]
  },
  {
    id: "d2-068", domain: 2, objective: "2.3", type: "single",
    question: "A retailer stores customer invoices as blobs. Each invoice is rarely read, must open immediately when it is requested, and is deleted after 45 days. The retailer wants the lowest storage cost and does not want to pay an early deletion charge. Which access tier should the retailer use?",
    options: ["Hot", "Cool", "Cold", "Archive"],
    answer: [1],
    explanation: "Cool is for infrequently accessed data stored at least 30 days and is an online tier, so a 45-day invoice fits. Cold expects 90 days and archive 180 days (and archive is offline), so deleting at 45 days would incur an early deletion charge; hot costs more to store.",
    difficulty: 3, tags: ["access tiers", "cool", "minimum retention"]
  },
  {
    id: "d2-069", domain: 2, objective: "2.3", type: "single",
    question: "Which statement describes Azure Data Box?",
    options: [
      "A command-line utility that copies blobs between storage accounts",
      "A physical storage device that is shipped to move large amounts of data into or out of Azure",
      "A hub for discovering and assessing on-premises servers",
      "An agent that keeps a Windows file server in sync with an Azure file share"
    ],
    answer: [1],
    explanation: "Azure Data Box is a physical migration service: Microsoft ships a storage device that you load and return, for import or export. The other statements describe AzCopy, Azure Migrate, and Azure File Sync.",
    difficulty: 1, tags: ["Data Box", "migration"]
  },
  {
    id: "d2-070", domain: 2, objective: "2.3", type: "multi",
    question: "An administrator is choosing the default access tier for a new storage account. Which two access tiers can be set at the account level? Choose TWO.",
    options: ["Hot", "Archive", "Cool", "Premium", "Rehydrated"],
    answer: [0, 2],
    explanation: "Hot, cool, and cold can be set as the account default, while archive can only be set on individual blobs. Premium is a performance level of a storage account and rehydration is an operation, so neither is an access tier.",
    difficulty: 1, tags: ["access tiers", "account level"]
  },
  {
    id: "d2-071", domain: 2, objective: "2.3", type: "single",
    question: "An analyst needs to read a blob that is in the archive access tier. What must happen first?",
    options: [
      "The blob must be rehydrated to the hot, cool, or cold tier",
      "The storage account must be changed to RA-GRS",
      "The storage account must fail over to the secondary region",
      "The blob must be copied to an Azure file share by using Azure File Sync"
    ],
    answer: [0],
    explanation: "Archive is an offline tier, so a blob must be rehydrated to an online tier before it can be read, which can take hours. Redundancy settings and failover do not make archived data readable, and Azure File Sync works with file shares and Windows Server.",
    difficulty: 2, tags: ["archive", "rehydration"]
  },
  {
    id: "d2-072", domain: 2, objective: "2.3", type: "single",
    question: "How does locally redundant storage (LRS) replicate data?",
    options: [
      "Three copies across three availability zones in the primary region",
      "Three copies in the primary region and three copies in a secondary region",
      "One copy in each region of a region pair",
      "Three copies within a single datacenter in the primary region"
    ],
    answer: [3],
    explanation: "LRS keeps three copies inside one datacenter, which protects against drive and rack failures only. Copies across zones describe ZRS, and copies in a secondary region describe GRS or GZRS.",
    difficulty: 1, tags: ["LRS", "redundancy"]
  },
  {
    id: "d2-073", domain: 2, objective: "2.3", type: "single",
    question: "A startup needs its storage data to remain available if an entire datacenter fails. A data-residency rule requires every copy of the data to stay within one Azure region. Which redundancy option should you use?",
    options: ["Locally redundant storage (LRS)", "Zone-redundant storage (ZRS)", "Geo-redundant storage (GRS)", "Geo-zone-redundant storage (GZRS)"],
    answer: [1],
    explanation: "ZRS writes three copies across three availability zones in the primary region, so it survives a datacenter or zone failure without leaving the region. LRS stays in one datacenter, and GRS and GZRS copy data to a second region.",
    difficulty: 2, tags: ["ZRS", "redundancy", "data residency"]
  },
  {
    id: "d2-074", domain: 2, objective: "2.3", type: "single",
    question: "Which redundancy option keeps three copies of data in a single datacenter in the primary region and three more copies in a single datacenter in a secondary region?",
    options: ["Zone-redundant storage (ZRS)", "Geo-zone-redundant storage (GZRS)", "Geo-redundant storage (GRS)", "Locally redundant storage (LRS)"],
    answer: [2],
    explanation: "GRS uses LRS in the primary region and LRS again in the paired secondary region, for six copies. GZRS differs by spreading the primary copies across three availability zones; ZRS and LRS keep data in one region.",
    difficulty: 2, tags: ["GRS", "redundancy"]
  },
  {
    id: "d2-075", domain: 2, objective: "2.3", type: "single",
    question: "A trading firm's application must tolerate the loss of an availability zone in the primary region and must also be able to read its data from the secondary region at any time, even when no failover has occurred. Which redundancy option should you recommend?",
    options: ["GRS", "GZRS", "RA-GRS", "RA-GZRS"],
    answer: [3],
    explanation: "RA-GZRS combines zone redundancy in the primary region with a secondary-region copy that is always readable. GZRS is not readable in the secondary until failover, and GRS and RA-GRS use LRS in the primary region, so they do not span zones.",
    difficulty: 3, tags: ["RA-GZRS", "redundancy", "read access"]
  },
  {
    id: "d2-076", domain: 2, objective: "2.3", type: "single",
    question: "A storage account uses geo-redundant storage (GRS). How is the data copied to the secondary region?",
    options: [
      "Synchronously, across three availability zones in the secondary region",
      "Asynchronously, and stored as three copies in a single datacenter in the secondary region",
      "Synchronously, to a single datacenter in the secondary region",
      "Only when the customer starts a failover"
    ],
    answer: [1],
    explanation: "GRS writes three copies synchronously in the primary region and then replicates asynchronously to the secondary region, where the data is kept with LRS. Because the copy is asynchronous, the most recent writes may not have reached the secondary.",
    difficulty: 3, tags: ["GRS", "asynchronous replication"]
  },
  {
    id: "d2-077", domain: 2, objective: "2.3", type: "multi",
    question: "A company plans to create a premium block blobs storage account. Which two redundancy options are available for this account type? Choose TWO.",
    options: ["LRS", "ZRS", "GRS", "GZRS", "RA-GRS"],
    answer: [0, 1],
    explanation: "Premium block blobs accounts support only LRS and ZRS. The geo-redundant options (GRS, RA-GRS, GZRS, RA-GZRS) are offered only on standard general-purpose v2 accounts.",
    difficulty: 3, tags: ["premium block blobs", "redundancy"]
  },
  {
    id: "d2-078", domain: 2, objective: "2.3", type: "single",
    question: "Which storage account type does Microsoft recommend for most scenarios that use Azure Storage?",
    options: ["Premium block blobs", "Premium file shares", "Standard general-purpose v2", "Premium page blobs"],
    answer: [2],
    explanation: "Standard general-purpose v2 is the standard account type for blobs, file shares, queues, and tables and is recommended for most scenarios. The premium types each serve one kind of data for high-performance needs.",
    difficulty: 1, tags: ["storage account types", "general-purpose v2"]
  },
  {
    id: "d2-079", domain: 2, objective: "2.3", type: "single",
    question: "An engineering company needs high-performance Azure file shares that Linux workstations will mount by using the NFS protocol. Which storage account type should you create?",
    options: ["Standard general-purpose v2", "Premium file shares", "Premium block blobs", "Premium page blobs"],
    answer: [1],
    explanation: "Premium file shares is the account type for Azure Files only and is the one that supports NFS as well as SMB shares. Standard general-purpose v2 does not offer NFS for Azure Files, and the blob account types do not host file shares.",
    difficulty: 2, tags: ["premium file shares", "NFS"]
  },
  {
    id: "d2-080", domain: 2, objective: "2.3", type: "single",
    question: "Which of the following is a valid name for an Azure storage account?",
    options: ["Sales-Reports", "finance_data_01", "hr", "contosodata01"],
    answer: [3],
    explanation: "Storage account names must be 3 to 24 characters and contain only lowercase letters and numbers. The other names contain uppercase letters, a hyphen, underscores, or are too short.",
    difficulty: 1, tags: ["storage account naming"]
  },
  {
    id: "d2-081", domain: 2, objective: "2.3", type: "single",
    question: "A storage account is named contosoweb. What is the endpoint for Blob Storage in this account?",
    options: [
      "https://contosoweb.blob.core.windows.net",
      "https://contosoweb.file.core.windows.net",
      "https://blob.contosoweb.azure.com",
      "https://contosoweb.table.core.windows.net"
    ],
    answer: [0],
    explanation: "A storage endpoint combines the account name with the service name, so Blob Storage is at <account>.blob.core.windows.net. The file and table endpoints belong to Azure Files and Table Storage, and the remaining format does not exist.",
    difficulty: 1, tags: ["storage endpoints"]
  },
  {
    id: "d2-082", domain: 2, objective: "2.3", type: "single",
    question: "An administrator must write a script that runs every night and copies log files from a server to Azure Blob storage. Which tool should the administrator use?",
    options: ["Azure Storage Explorer", "Azure File Sync", "AzCopy", "Azure Migrate"],
    answer: [2],
    explanation: "AzCopy is the command-line utility for copying blobs and files, so it can be called from a scheduled script. Storage Explorer is a graphical app, Azure File Sync synchronizes Windows file servers with Azure Files, and Azure Migrate is for migrating workloads.",
    difficulty: 2, tags: ["AzCopy", "moving files"]
  },
  {
    id: "d2-083", domain: 2, objective: "2.3", type: "single",
    question: "A designer who works on macOS wants a graphical application for browsing a storage account and uploading and downloading blobs. What should the designer use?",
    options: ["AzCopy", "Azure Storage Explorer", "Azure File Sync", "Azure Data Box"],
    answer: [1],
    explanation: "Azure Storage Explorer is a standalone app with a graphical interface that runs on Windows, macOS, and Linux. AzCopy is command line only, Azure File Sync is installed on Windows Server, and Data Box is a physical device.",
    difficulty: 2, tags: ["Storage Explorer", "moving files"]
  },
  {
    id: "d2-084", domain: 2, objective: "2.3", type: "single",
    question: "A company has Windows file servers in five branch offices. It wants to centralize the shares in Azure Files while each office keeps fast local access, with changes flowing in both directions. What should you use?",
    options: ["AzCopy", "Azure Storage Explorer", "Azure Migrate", "Azure File Sync"],
    answer: [3],
    explanation: "Azure File Sync installs on Windows Server and keeps the server bi-directionally synchronized with an Azure file share, acting as a local cache. AzCopy only synchronizes in one direction, and Storage Explorer and Azure Migrate do not keep servers in sync.",
    difficulty: 2, tags: ["Azure File Sync", "hybrid"]
  },
  {
    id: "d2-085", domain: 2, objective: "2.3", type: "single",
    question: "Which statement about synchronizing files with AzCopy is true?",
    options: [
      "It copies in one direction, from the source that you designate to the destination",
      "It keeps both locations identical by comparing timestamps in both directions",
      "It requires an agent to be installed on a Windows Server",
      "It can be started only from Azure Storage Explorer"
    ],
    answer: [0],
    explanation: "AzCopy synchronization is one-directional: you name a source and a destination and it copies that way. Bi-directional sync through a Windows Server agent describes Azure File Sync, and AzCopy runs on its own from the command line.",
    difficulty: 3, tags: ["AzCopy", "synchronization"]
  },
  {
    id: "d2-086", domain: 2, objective: "2.3", type: "multi",
    question: "A school district is evaluating Azure File Sync for its Windows file servers. Which two capabilities does Azure File Sync provide? Choose TWO.",
    options: [
      "Shipping a physical device to transfer data offline",
      "Cloud tiering that keeps frequently accessed files on the local server",
      "Assessing on-premises servers for readiness to move to Azure",
      "Bi-directional synchronization between a Windows Server and an Azure file share",
      "Moving blobs to the archive access tier"
    ],
    answer: [1, 3],
    explanation: "Azure File Sync keeps a Windows Server and an Azure file share in two-way sync and can tier rarely used files to the cloud while frequently used files stay local. Offline shipping is Data Box, assessment is Azure Migrate, and access tiers are a Blob storage feature.",
    difficulty: 2, tags: ["Azure File Sync", "cloud tiering"]
  },
  {
    id: "d2-087", domain: 2, objective: "2.3", type: "single",
    question: "A media archive holds 300 TB of footage in a datacenter that has a slow internet connection. Uploading the data over the network would take many months. Which service should you recommend to move the data to Azure?",
    options: ["Azure Migrate", "AzCopy", "Azure Data Box", "Azure File Sync"],
    answer: [2],
    explanation: "Azure Data Box moves very large data sets offline by shipping a storage device, which avoids the limited bandwidth. AzCopy and Azure File Sync send data over the network, and Azure Migrate is the hub for assessing and migrating servers, databases, and web apps.",
    difficulty: 2, tags: ["Data Box", "offline transfer"]
  },
  {
    id: "d2-088", domain: 2, objective: "2.3", type: "single",
    question: "A manufacturer plans to move 200 on-premises VMware virtual machines to Azure. The project team wants one place to discover the servers, assess their readiness and cost, and then perform and track the migration. What should the team use?",
    options: ["Azure Migrate", "Azure Data Box", "Azure Storage Explorer", "Azure File Sync"],
    answer: [0],
    explanation: "Azure Migrate is a hub with a single portal and tools for discovery and assessment and for server migration. Data Box moves bulk data offline, and Storage Explorer and Azure File Sync work with files in storage accounts rather than whole servers.",
    difficulty: 2, tags: ["Azure Migrate", "migration"]
  },
  {
    id: "d2-089", domain: 2, objective: "2.4", type: "single",
    question: "What is Microsoft Entra ID?",
    options: [
      "A managed domain service that provides group policy and LDAP",
      "Microsoft's cloud-based identity and access management service",
      "A tool that synchronizes on-premises accounts to the cloud",
      "A service that calculates a secure score for Azure resources"
    ],
    answer: [1],
    explanation: "Microsoft Entra ID (formerly Azure Active Directory) is the cloud-based identity and access management service used to sign in to Microsoft cloud services and other apps. The other descriptions are Microsoft Entra Domain Services, Microsoft Entra Connect, and Microsoft Defender for Cloud.",
    difficulty: 1, tags: ["Microsoft Entra ID", "directory services"]
  },
  {
    id: "d2-090", domain: 2, objective: "2.4", type: "single",
    question: "A company is moving a legacy application to Azure virtual machines. The application requires domain join, group policy, and Kerberos authentication. The company does not want to deploy or patch domain controllers. Which service should you recommend?",
    options: ["Microsoft Entra ID", "Microsoft Entra Connect", "Microsoft Entra Domain Services", "Microsoft Entra Conditional Access"],
    answer: [2],
    explanation: "Microsoft Entra Domain Services provides managed domain services such as domain join, group policy, LDAP, and Kerberos/NTLM without domain controllers for you to manage. Microsoft Entra ID alone does not offer those legacy features, and Connect and Conditional Access do other jobs.",
    difficulty: 2, tags: ["Microsoft Entra Domain Services", "legacy applications"]
  },
  {
    id: "d2-091", domain: 2, objective: "2.4", type: "single",
    question: "A university runs Active Directory on-premises and has started using Azure. It wants staff to have one identity that works for both environments instead of maintaining two separate sets of accounts. What should the university use?",
    options: ["Microsoft Entra Connect", "Microsoft Entra Domain Services", "Azure RBAC", "B2B collaboration"],
    answer: [0],
    explanation: "Microsoft Entra Connect synchronizes user identities between on-premises Active Directory and Microsoft Entra ID. Domain Services provides a managed domain in Azure, Azure RBAC authorizes access to resources, and B2B collaboration is for external partners.",
    difficulty: 2, tags: ["Microsoft Entra Connect", "hybrid identity"]
  },
  {
    id: "d2-092", domain: 2, objective: "2.4", type: "single",
    question: "Which statement about synchronization in Microsoft Entra Domain Services is true?",
    options: [
      "Objects created in the managed domain are written back to Microsoft Entra ID",
      "Synchronization runs in both directions between the managed domain and Microsoft Entra ID",
      "The managed domain synchronizes directly with on-premises domain controllers instead of Microsoft Entra ID",
      "Synchronization is one-way, from Microsoft Entra ID to the managed domain"
    ],
    answer: [3],
    explanation: "A managed domain receives a one-way synchronization from Microsoft Entra ID, and resources created directly in the managed domain are not synchronized back. On-premises identities reach it by way of Microsoft Entra Connect and Microsoft Entra ID.",
    difficulty: 3, tags: ["Microsoft Entra Domain Services", "synchronization"]
  },
  {
    id: "d2-093", domain: 2, objective: "2.4", type: "single",
    question: "Which term completes the sentence: ______ is the process of establishing the identity of a person, service, or device?",
    options: ["Authorization", "Authentication", "Synchronization", "Auditing"],
    answer: [1],
    explanation: "Authentication proves who someone or something is, typically by requiring credentials. Authorization comes afterward and determines what that identity is allowed to do.",
    difficulty: 1, tags: ["authentication", "authorization"]
  },
  {
    id: "d2-094", domain: 2, objective: "2.4", type: "single",
    question: "A user signs in to the Azure portal successfully and then tries to delete a virtual machine. Azure checks whether the user is permitted to perform that action. Which process does this check represent?",
    options: ["Authorization", "Authentication", "Single sign-on", "Multifactor authentication"],
    answer: [0],
    explanation: "Authorization determines what an already authenticated identity is allowed to do. Authentication, SSO, and MFA all concern proving identity at sign-in, which has already happened here.",
    difficulty: 2, tags: ["authorization", "authentication"]
  },
  {
    id: "d2-095", domain: 2, objective: "2.4", type: "single",
    question: "What does single sign-on (SSO) allow a user to do?",
    options: [
      "Sign in without ever registering a credential",
      "Sign in with two different factors",
      "Sign in once and access multiple applications with one identity",
      "Sign in as a guest in another organization's directory"
    ],
    answer: [2],
    explanation: "SSO lets a user sign in one time and use that identity for multiple applications, which reduces the number of passwords. Using two factors is MFA, and guest access is B2B collaboration.",
    difficulty: 1, tags: ["SSO"]
  },
  {
    id: "d2-096", domain: 2, objective: "2.4", type: "single",
    question: "A bank wants to require multifactor authentication for its staff. Which combination is an example of multifactor authentication?",
    options: [
      "A password and the answer to a security question",
      "A fingerprint scan and a face scan",
      "A password and a code from an app on the user's phone",
      "A PIN and a password"
    ],
    answer: [2],
    explanation: "MFA needs factors from different categories: a password is something you know and a phone code is something you have. A password with a security question or a PIN is two things you know, and two biometrics are both something you are.",
    difficulty: 2, tags: ["MFA", "authentication factors"]
  },
  {
    id: "d2-097", domain: 2, objective: "2.4", type: "multi",
    question: "Which three categories of factors can be used for multifactor authentication? Choose THREE.",
    options: ["Something the user knows", "Something the user shares", "Something the user has", "Something the user requests", "Something the user is"],
    answer: [0, 2, 4],
    explanation: "The factor categories are something you know (a password), something you have (a phone or key), and something you are (a biometric). Sharing and requesting are not authentication factors.",
    difficulty: 1, tags: ["MFA", "authentication factors"]
  },
  {
    id: "d2-098", domain: 2, objective: "2.4", type: "multi",
    question: "A company wants to remove passwords from its sign-in process. Which two options are passwordless authentication methods in Microsoft Entra ID? Choose TWO.",
    options: [
      "Windows Hello for Business",
      "A security question",
      "A text message code entered after a password",
      "A FIDO2 security key",
      "Self-service password reset"
    ],
    answer: [0, 3],
    explanation: "Microsoft Entra ID's passwordless options are Windows Hello for Business, the Microsoft Authenticator app, and FIDO2 security keys. A security question and a code that follows a password still depend on a password, and self-service password reset only changes one.",
    difficulty: 2, tags: ["passwordless", "Windows Hello for Business", "FIDO2"]
  },
  {
    id: "d2-099", domain: 2, objective: "2.4", type: "single",
    question: "Nurses in a clinic share workstations and are not allowed to carry phones on the ward. The clinic wants a passwordless sign-in method that resists phishing. Which method should you recommend?",
    options: ["Windows Hello for Business", "Microsoft Authenticator app", "Self-service password reset", "FIDO2 security keys"],
    answer: [3],
    explanation: "FIDO2 security keys are portable hardware devices that work without a password or a phone and are resistant to phishing. Windows Hello for Business suits a user's own designated PC, Authenticator needs a phone, and password reset is not a sign-in method.",
    difficulty: 3, tags: ["passwordless", "FIDO2"]
  },
  {
    id: "d2-100", domain: 2, objective: "2.4", type: "single",
    question: "A consulting firm wants a supplier's employees to sign in with their own work accounts and use a project application that the firm hosts. The supplier's users should appear as guests in the firm's directory. What should the firm use?",
    options: ["Microsoft Entra Domain Services", "B2B collaboration", "Microsoft Entra Connect", "Windows Hello for Business"],
    answer: [1],
    explanation: "B2B collaboration lets external users sign in with their preferred identity and represents them in your directory, typically as guest users. Domain Services and Connect deal with your own organization's identities, and Windows Hello is a sign-in method.",
    difficulty: 2, tags: ["external identities", "B2B collaboration"]
  },
  {
    id: "d2-101", domain: 2, objective: "2.4", type: "single",
    question: "A retailer is building a mobile shopping app for the public. Customers must be able to sign up and sign in with social accounts, and their identities must be kept apart from the retailer's employee directory. What should you recommend?",
    options: ["B2B collaboration", "Microsoft Entra Domain Services", "Microsoft Entra External ID for customers", "Microsoft Entra Connect"],
    answer: [2],
    explanation: "Microsoft Entra External ID for customers (the replacement for Azure AD B2C) provides identity for consumers of apps you publish, in a separate tenant. B2B collaboration is for partners who appear as guests in your own directory.",
    difficulty: 2, tags: ["external identities", "customer identity"]
  },
  {
    id: "d2-102", domain: 2, objective: "2.4", type: "single",
    question: "An organization has invited many guest users over several years. It wants project owners to confirm periodically whether each guest still needs access so that unneeded access can be removed. What should the organization use?",
    options: ["Access reviews", "Conditional Access", "Resource locks", "Secure score"],
    answer: [0],
    explanation: "Access reviews in Microsoft Entra ID ask guests or a decision maker to recertify each guest's need for access, after which access can be removed. Conditional Access evaluates sign-ins, resource locks protect resources from changes, and secure score measures security posture.",
    difficulty: 2, tags: ["external identities", "access reviews", "guest users"]
  },
  {
    id: "d2-103", domain: 2, objective: "2.4", type: "single",
    question: "What is Microsoft Entra Conditional Access?",
    options: [
      "A service that synchronizes passwords from on-premises Active Directory",
      "A tool that allows or denies access to resources based on identity signals",
      "A set of built-in roles that grant permissions to Azure resources",
      "A report that lists security recommendations for a subscription"
    ],
    answer: [1],
    explanation: "Conditional Access is the Microsoft Entra ID tool that uses signals such as the user, location, and device to allow, block, or challenge an access request. Built-in roles belong to Azure RBAC and recommendations come from Microsoft Defender for Cloud.",
    difficulty: 1, tags: ["Conditional Access"]
  },
  {
    id: "d2-104", domain: 2, objective: "2.4", type: "single",
    question: "A company wants administrators to be prompted for multifactor authentication only when they sign in from outside the corporate network. What should you use?",
    options: ["Azure RBAC", "Microsoft Entra Domain Services", "Microsoft Defender for Cloud", "Microsoft Entra Conditional Access"],
    answer: [3],
    explanation: "Conditional Access can require MFA based on signals such as the user's role and location. Azure RBAC controls what users can do to resources, Domain Services provides a managed domain, and Defender for Cloud assesses security posture.",
    difficulty: 2, tags: ["Conditional Access", "MFA"]
  },
  {
    id: "d2-105", domain: 2, objective: "2.4", type: "multi",
    question: "A security team is designing Conditional Access policies. Which two items are signals that Conditional Access can use to make a decision? Choose TWO.",
    options: [
      "The location the user is signing in from",
      "The redundancy option of a storage account",
      "The device the user is signing in from",
      "The secure score of the subscription",
      "The access tier of a blob"
    ],
    answer: [0, 2],
    explanation: "Conditional Access signals include who the user is, where the user is, the device in use, and the application being accessed. Storage redundancy, blob access tiers, and secure score are not sign-in signals.",
    difficulty: 2, tags: ["Conditional Access", "signals"]
  },
  {
    id: "d2-106", domain: 2, objective: "2.4", type: "single",
    question: "During sign-in, Conditional Access collects signals, makes a decision, and then enforces the decision. Which of the following is an example of enforcement?",
    options: [
      "The country the user is signing in from is identified",
      "The user is assigned the Reader role on a subscription",
      "The user's on-premises account is synchronized to the cloud",
      "The user is challenged for a second form of authentication"
    ],
    answer: [3],
    explanation: "Enforcement carries out the decision by allowing access, blocking it, or challenging for multifactor authentication. Identifying the location is a signal, a role assignment is Azure RBAC, and synchronization is Microsoft Entra Connect.",
    difficulty: 2, tags: ["Conditional Access", "enforcement"]
  },
  {
    id: "d2-107", domain: 2, objective: "2.4", type: "single",
    question: "Which built-in Azure role grants full access to manage all resources, including the ability to assign roles to other users?",
    options: ["Owner", "Contributor", "Reader", "User Access Administrator"],
    answer: [0],
    explanation: "Owner has full access to resources and can also assign roles. Contributor can manage resources but cannot grant access, Reader can only view, and User Access Administrator manages access without managing the resources.",
    difficulty: 1, tags: ["Azure RBAC", "built-in roles", "Owner"]
  },
  {
    id: "d2-108", domain: 2, objective: "2.4", type: "single",
    question: "A development team must be able to create and manage every type of resource in a resource group. The team must not be able to give other people access to the resource group. Which built-in role should you assign?",
    options: ["Owner", "Reader", "Contributor", "User Access Administrator"],
    answer: [2],
    explanation: "Contributor can create and manage all types of resources but cannot grant access to others. Owner could also assign roles, Reader cannot make changes, and User Access Administrator is only for managing access.",
    difficulty: 2, tags: ["Azure RBAC", "Contributor", "least privilege"]
  },
  {
    id: "d2-109", domain: 2, objective: "2.4", type: "single",
    question: "Which built-in Azure role lets a user view resources but not make any changes to them?",
    options: ["Contributor", "Reader", "Owner", "User Access Administrator"],
    answer: [1],
    explanation: "Reader allows viewing resources only. Contributor and Owner can change resources, and User Access Administrator can change who has access.",
    difficulty: 1, tags: ["Azure RBAC", "Reader"]
  },
  {
    id: "d2-110", domain: 2, objective: "2.4", type: "single",
    question: "A help desk lead must be able to assign Azure roles to users in a subscription. The lead must not be able to create, change, or delete the resources themselves. Which built-in role follows the principle of least privilege?",
    options: ["Owner", "Contributor", "Reader", "User Access Administrator"],
    answer: [3],
    explanation: "User Access Administrator manages user access to Azure resources without managing the resources. Owner can also assign roles but adds full control of resources, and Contributor and Reader cannot assign roles.",
    difficulty: 3, tags: ["Azure RBAC", "User Access Administrator", "least privilege"]
  },
  {
    id: "d2-111", domain: 2, objective: "2.4", type: "single",
    question: "An auditor is assigned the Reader role at the subscription scope. What access does the auditor have to a resource group in that subscription?",
    options: [
      "The auditor can view the resource group and its resources, because the role is inherited",
      "The auditor has no access until the role is also assigned on the resource group",
      "The auditor can view the resource group but not the resources inside it",
      "The auditor can modify the resource group, because child scopes receive more permissions"
    ],
    answer: [0],
    explanation: "Azure RBAC is hierarchical, so a role assigned at a parent scope is inherited by its child scopes. Reader at the subscription lets the auditor view every resource group and resource in it, with no extra assignment and no extra permissions.",
    difficulty: 2, tags: ["Azure RBAC", "scope", "inheritance"]
  },
  {
    id: "d2-112", domain: 2, objective: "2.4", type: "single",
    question: "One role assignment gives a user read permissions on a resource group. A second role assignment gives the same user write permissions on the same resource group. Which permissions does the user have on the resource group?",
    options: [
      "Read only, because the most restrictive assignment applies",
      "Read and write, because Azure RBAC uses an allow model",
      "None, because the two assignments conflict",
      "Write only, because the most recent assignment replaces the earlier one"
    ],
    answer: [1],
    explanation: "Azure RBAC uses an allow model in which role assignments are additive, so the user has both read and write permissions. Assignments do not cancel, replace, or restrict one another.",
    difficulty: 3, tags: ["Azure RBAC", "allow model"]
  },
  {
    id: "d2-113", domain: 2, objective: "2.4", type: "multi",
    question: "At which three scopes can an Azure RBAC role be assigned? Choose THREE.",
    options: ["Management group", "Availability zone", "Subscription", "Resource group", "Region pair"],
    answer: [0, 2, 3],
    explanation: "Azure RBAC scopes are management group, subscription, resource group, and single resource. Availability zones and region pairs are parts of the physical infrastructure, not scopes for role assignments.",
    difficulty: 1, tags: ["Azure RBAC", "scope"]
  },
  {
    id: "d2-114", domain: 2, objective: "2.4", type: "single",
    question: "Which Zero Trust principle states that you should always authenticate and authorize based on all available data points?",
    options: ["Assume breach", "Use least privilege access", "Verify explicitly", "Defense-in-depth"],
    answer: [2],
    explanation: "Verify explicitly means every request is authenticated and authorized by using all available data points. Assume breach and least privilege access are the other two principles, and defense-in-depth is a separate layered strategy.",
    difficulty: 1, tags: ["Zero Trust", "verify explicitly"]
  },
  {
    id: "d2-115", domain: 2, objective: "2.4", type: "single",
    question: "A security team segments access and uses analytics to detect threats because it expects that an attacker might already be inside the environment. Which Zero Trust principle does this describe?",
    options: ["Assume breach", "Verify explicitly", "Use least privilege access", "Trust the internal network"],
    answer: [0],
    explanation: "Assume breach means limiting the potential impact, segmenting access, and using analytics for visibility and threat detection. Verify explicitly concerns authenticating every request, least privilege limits what users can do, and trusting the internal network is the perimeter thinking that Zero Trust rejects.",
    difficulty: 2, tags: ["Zero Trust", "assume breach"]
  },
  {
    id: "d2-116", domain: 2, objective: "2.4", type: "single",
    question: "An e-commerce company adds distributed denial of service (DDoS) protection to filter large-scale attacks before they affect its customers. Which defense-in-depth layer does this control belong to?",
    options: ["Network", "Perimeter", "Compute", "Application"],
    answer: [1],
    explanation: "The perimeter layer uses DDoS protection and perimeter firewalls against large-scale network-based attacks. The network layer limits communication between resources, compute secures virtual machines, and application covers secure code.",
    difficulty: 2, tags: ["defense-in-depth", "perimeter", "DDoS"]
  },
  {
    id: "d2-117", domain: 2, objective: "2.4", type: "single",
    question: "In the defense-in-depth model, which layer is the first line of defense and protects the computing hardware in the datacenter?",
    options: ["Perimeter", "Identity and access", "Data", "Physical security"],
    answer: [3],
    explanation: "Physical security is the outermost layer and the first line of defense for datacenter hardware. Identity and access and perimeter come next, and data is the innermost layer that all the others protect.",
    difficulty: 1, tags: ["defense-in-depth", "physical security"]
  },
  {
    id: "d2-118", domain: 2, objective: "2.4", type: "single",
    question: "What does the secure score in Microsoft Defender for Cloud show?",
    options: [
      "The percentage of the monthly budget that has been spent",
      "The availability that a service achieved against its SLA",
      "A measure of the security posture of your resources",
      "The number of users who registered for multifactor authentication"
    ],
    answer: [2],
    explanation: "Defender for Cloud groups its recommendations into security controls and calculates a secure score that summarizes your security posture; remediating recommendations raises it. It is not a cost, availability, or MFA registration figure.",
    difficulty: 1, tags: ["Microsoft Defender for Cloud", "secure score"]
  },
  {
    id: "d2-119", domain: 2, objective: "2.4", type: "single",
    question: "A logistics company uses Microsoft Defender for Cloud for its Azure resources. It also wants Defender for Cloud to protect servers that run in its own datacenter. What should the company deploy to those servers?",
    options: ["Azure Arc", "Azure File Sync", "Microsoft Entra Connect", "Azure Migrate"],
    answer: [0],
    explanation: "Azure Arc connects non-Azure machines to Azure so that Defender for Cloud plans can be extended to them. Azure File Sync synchronizes file shares, Microsoft Entra Connect synchronizes identities, and Azure Migrate moves workloads to Azure.",
    difficulty: 2, tags: ["Microsoft Defender for Cloud", "Azure Arc", "hybrid"]
  },
  {
    id: "d2-120", domain: 2, objective: "2.4", type: "single",
    question: "An insurer runs workloads in Azure and in Amazon Web Services (AWS). The security team wants one service that assesses the security posture of both environments, recommends how to harden resources, and raises security alerts when it detects threats. Which service should you recommend?",
    options: ["Azure Advisor", "Microsoft Defender for Cloud", "Microsoft Entra Conditional Access", "Azure Service Health"],
    answer: [1],
    explanation: "Microsoft Defender for Cloud provides security posture management and threat protection across Azure, on-premises, and other clouds such as AWS. Azure Advisor gives general best-practice recommendations for Azure only, Conditional Access evaluates sign-ins, and Service Health reports Azure service issues.",
    difficulty: 2, tags: ["Microsoft Defender for Cloud", "multicloud"]
  }
);
