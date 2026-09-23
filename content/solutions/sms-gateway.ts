import type { SolutionPage } from '../types';

/**
 * Telcobright SMS Gateway
 *
 * Migrated verbatim from https://telcobright.com/telcobright-sms-gateway/
 * Blocks appear in the same order, with the same words, as the old page.
 */
export const page: SolutionPage = {
  slug: "sms-gateway",
  title: "Telcobright SMS Gateway",
  subtitle: "Multi-Protocol Bulk SMS Platform and SMSC",
  summary: "Telcobright SMS Platform is a highly scalable distributed carrier-grade SMS platform with no single point of failure.",
  legacyPath: "/telcobright-sms-gateway/",
  featured: true,
  blocks: [
    {
      t: 'ul',
      items: [
        "We make telecom meet the cloud or modern IT",
        "We specialize in telco grade software and solutions regarding Voice, Video SMS, billing and others",
      ],
    },
    { t: 'h', level: 2, id: "1-about-telcobrigtht-sms-platform", text: "1. About Telcobrigtht SMS Platform", html: "1. About Telcobrigtht SMS Platform" },
    { t: 'p', html: "Telcobright SMS Platform is a highly scalable distributed carrier-grade SMS platform with no single point of failure. The platform can be used as a cost-effective Short Message Service Center (SMSC), an SMS Gateway between two operators or a bulk SMS platform through which users and applications can send large volume of A2P SMS. Today, most of the SMS solutions available in the market have an outdated monolithic design which is difficult to change, integrate and scale." },
    { t: 'img', src: "/media/2023/03/Image_002-1.png", alt: "" },
    { t: 'p', html: "But we have created a state-of-the-art design with cloud based microservices architecture and best DevOPS tools for managing mission-critical IT systems at present. We have used the most mature software development stack and the most popular open source tools used by the best companies in the world. For example, we use “Apache KAFKA” created by LinkedIn, as the central messaging system that is known to move billions of data messages very fast and reliably in a distributed cluster. The default multi-node fault-tolerant design of Kafka enables us to easily achieve high availability by maximizing system uptime required by a mission critical business." },
    { t: 'p', html: "We support all necessary signaling protocols required for SMS communication including GSM MAP, SMPP, REST over HTTP and others. We use asynchronous non-blocking API for sending SMS through the operators’ gateway. It means, high throughput because the messages in the queue will not block until the response of the previous SMS is received. Other than Kafka as mentioned above, we have used other battle-tested DevOPS tools through which leading tech-companies achieve unmatched visibility, carrier-grade reliability and unmatched visibility." },
    { t: 'h', level: 2, id: "2-how-the-platform-can-be-used-by-an-enterprise", text: "2. How the platform can be used by an Enterprise", html: "2. How the platform can be used by an Enterprise" },
    { t: 'p', html: "The platform will allow an enterprise to manage its massive SMS sending requirements efficiently. Traditionally at the sending end, it will connect with mobile operators over SMPP/HTTP or SIGTRAN protocols to send SMS for mobile subscribers. Whereas the platform can be used in two modes at the receiving end or client facing side." },
    { t: 'img', src: "/media/2023/03/Image_003-1.png", alt: "" },
    { t: 'h', level: 3, id: "independent-sms-software", text: "Independent SMS software", html: "Independent SMS software" },
    { t: 'p', html: "End users can use built-in web interface to manage bulk SMS sending task. They can send single or multiple SMS tasks through the web interface or they can upload excel files to create campaigns. The campaigns can be flexibly scheduled to run immediately or on a future date with flexible options." },
    { t: 'img', src: "/media/2023/03/Image_005-1.jpg", alt: "" },
    { t: 'h', level: 3, id: "api-platform", text: "API Platform", html: "API Platform" },
    { t: 'p', html: "The platform supports excellent API integration facility to connect with various automated applications over REST, SOAP or other protocols. Client applications can send large volume of traffic at a very high rate and the platform durably processes those at high speed. It’s challenging to achieve speed and absolute reliability at high very high load, Kafka makes the job easier. We can achieve thousands of TPS/VM quite easily but we are likely to operate at the line rate offered by the MNOs. <br /><br /> In both modes, the platform interfaces with the clients and the suppliers’ gateway using any protocol, for example, it can receive an SMS over GSM/MAP SMPP protocol and send it out to an egress route over HTTP/REST and vice-verse. The protocol conversion is seamless- users, admins and other processes interact with the system in the same manner. For instance, the same business logic for accounting and routing will be executed regardless of ingress, egress protocol." },
    { t: 'h', level: 2, id: "3-our-value-propositions", text: "3. Our Value Propositions", html: "3. Our Value Propositions" },
    { t: 'p', html: "Telcobright SMS platform operates in 3 modes as described in the figure on the right." },
    { t: 'p', html: "Some our important value propositions are summarized below:" },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>ITEM</p>" },
            { html: "<p>DESCRIPTION</p>" },
            { html: "<p>ADDITIONAL REMARK</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>MAIN SOFTWARE</p>" },
            { html: "<p>A robust and high-performance SMS Routing Platform</p>" },
            { html: "<p>Source Code (Optional)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>FUNCTIONS</p>" },
            { html: "<p>Can be used as</p>" },
            { html: "<p>Installation, Commissioning, Testing, Support (AMC) included. (Training included)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>ARCHITECTURE</p>" },
            { html: "<p>Event-driven, Micro services architecture. Fault tolerant. Services are distributed and decoupled. Clear separation of concern by segregating responsibilities among services.</p>" },
            { html: "<p>Most of the existing solutions in the market are monolithic applications which are outdated by design.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>CORE MESSAGING ENGINE</p>" },
            { html: "<p>Based on the renowned open-source messaging platform “Apache KAFKA”. KAFKA was originally created by LinkedIn for taking care of distributed messaging and stream processing in the cloud. But after being open-sourced, now used by 80% of the fortune 100 companies in the world use this technology for its durability and performance.<a href=\"https://kafka.apache.org/powered-by#%3A%7E%3Atext%3DToday%2C%20Kafka%20is%20used%20by%2Cstrategies%20with%20event%20streaming%20architecture\" target=\"_blank\" rel=\"noopener noreferrer\">Apache Kafka</a> Who are<br />using?</p>" },
            { html: "<p><br /></p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>API DRIVEN DESIGN</p>" },
            { html: "<p>API driven design allows ease of integration with external applications.</p>" },
            { html: "" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SUPPORTED PROTOCOLS</p>" },
            { html: "<p>Supported protocols:</p><p>1. GSM MAP over SIGTRAN</p><p>2. SMPP (version 3.4, 3.3, 5.0)</p><p>3. REST, Custom HTTP/ HTTPS or JSON/XML based protocols</p>" },
            { html: "" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SMSC MODE</p>" },
            { html: "<p>Being a multi-protocol SMS Gateway, we can connect an enterprise directly with operators HLR and MSC over SIGTRAN if the connectivity can be arranged. This bypasses a lot of middleware layers in the operator’s network and ensures highest service quality by minimizing latency while delivering SMS to subscribers. Delivery report are also immediately in most cases.<br />Theoretically, it’s the best way of sending SMS to the mobile subscribers, IPTSP operators are already doing this.Optional.<br />It’s an advantage that the SMS vendor supports transport over SIGTRAN network. This requirement may arise at some point in future while connecting national/international<br />carriers.</p>" },
            { html: "<p><br /></p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>CAMPAIGN AND SCHEDULING</p>" },
            { html: "<p>Users can upload bulk SMS tasks for thousands of subscribers from excel or csv files. The batch workload is called a campaign which can be run immediately or at a future date with flexible<br />scheduling options. Campaigns keep running automatically until each SMS is sent. The progress and status are automatically updated and can be tracked/managed easily through the web interface.BILLING AND ACCOUNTING</p>" },
            { html: "<p><br /></p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p><br /></p>" },
            { html: "<p>CDR generation and reporting CDR generation for record keeping and reporting. With optional mediation, rating and invoicing with additional feature-rich telco- grade billing system.</p>" },
            { html: "" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SERVICES</p>" },
            { html: "<p>Consultation on source-code integration and training included if purchased with source code.</p>" },
            { html: "<p>Optional</p>" },
          ],
        },
      ],
    },
    {
      t: 'ul',
      items: [
        "Bulk/mass SMS campaign manager,",
        "Application to people (A2P) SMS",
        "SMS delivery platform for software applications.",
        "SMSC (P2P) [not considered within current scope]",
        "SMS Gateway between operators in SS7/SIGTRAN network [not considered within current scope]",
      ],
    },
    { t: 'h', level: 2, id: "4-sms-platform-features-at-a-glance", text: "4. SMS Platform Features at a Glance", html: "4. SMS Platform Features at a Glance" },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Basic Features</p>" },
            { html: "<p>Encoding and Standard features:</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Performance</p>" },
            { html: "" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>A2P SMS features</p>" },
            { html: "<p>Bulk SMS and Mass Campaign</p><p>High throughput and reliability to support hundreds of thousands of SMS per day. Supports Mass<br />Campaign to reach millions of people.</p><p>Advanced Campaign Management</p><p>Smart campaign management features enable advanced scheduling of campaign at any future date with active and exclude hours. Configurable policy-based options for various retry interval and logic or expiring SMS jobs when required. Masking sender numbers is also handled as part of campaign management.</p><p><b><br />Dial Plan</b></p><p>Prefix based routing is implemented through dial plan approach. Admin configures destinations for prefix through the web interface with priority for each gateway. The system executes routing SMS accordingly.</p><p><b><br />Accounting</b></p><p>Accounting for clients are handled through individual billing accounts. Client can top up money (credit) in the account. With credit in hand, client can purchase various SMS packages configured by the system admin.</p><p>With consumption of each SMS, account balance is automatically deducted and the account gets automatically blocked whenever balance is NIL or exceeds a minimum threshold.</p><p><b>Flexible Packages</b></p><p>Multiple packages of any number of destinations (for example: country, city, mobile or PSTN operator) can be created based on prefix. Clients can purchase own SMS package or bundle and send SMS if there is balance in the package.</p><p><b>Postpaid Operation</b></p><p>Optionally client can send unlimited number of SMS on post-paid basis. CDR based post-paid billing and invoicing is used in this case for accounting purpose. Telcobright has a very rich CDR based billing system which is high performance and has powerful billing and rating features.</p><p><b>Flush SMS Support</b></p><p>Supports modern disappearing messages at end users’ handset for smart notifications on handset. (depends on</p><p>API support of the terminating gateway)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Web Portal</p>" },
            { html: "<p>Web based portal for admin and users. SMS sending and admin related tasks can easily be handled through this.</p>" },
          ],
        },
      ],
    },
    {
      t: 'ul',
      items: [
        "Multilingual: Unicode encoding to support any language including Bangla.",
        "Length verification and validation to avoid concatenation of SMS for A2P messaging.",
        "SMS concatenation during terminating of SMS while working in SMSC mode.",
        "Configurable and any number of Sender ID or masking",
        "Ease of integration with various applications through API",
        "Less time to go live",
        "Low latency, 3-10 milliseconds per SMS, which is real time and carrier grade",
        "Priority wise SMS Queue. For example, OTP messages may have higher priority and need to be sent immediately before any other pending messages waiting to an outbound gateway.",
        "High TPS or throughput limited by the capacity of terminating end only. Through the core engine of Apache KAFKA, thousands of Transactions per seconds (TPS) can be supported in a single server. As KAFKA is an infinitely scalable cluster, the system can be extended to support millions of TPS by adding new server to the node. There are many benchmarks on the web, just one is included below. https://www.metarouter.io/blog-posts/how-we-process-one-billion-events-per-day-with-kafka",
        "User and password administration",
        "Send single (ad-hoc) or bulk SMS",
        "Upload excel or csv files for bulk SMS tasks and create campaign",
        "View campaign progress and status, also perform campaign administration tasks such as resume and suspend operations.",
      ],
    },
    { t: 'h', level: 2, id: "5-technology-and-software-development-stack-at-a-glance", text: "5. Technology and Software Development Stack at a Glance", html: "5. Technology and Software Development Stack at a Glance" },
    { t: 'h', level: 3, id: "5-1-software-development-tools-methodology-books-and-others", text: "5.1. Software Development Tools, Methodology, Books and others", html: "5.1. Software Development Tools, Methodology, Books and others" },
    { t: 'p', html: "Java is used as the main backend programming language, top open source tools in the Java ecosystem have been used. For example, Spring Boot- the now de-facto standard for enterprise web application development is used as the backbone of the application. We have used spring to serve the purpose of writing web applications, exposing RESTFUL web services, communicating with the database, writing the main business logics. Also, spring security plays an important role to provide the JWT based security mechanism throughout the application. The use of Java Persistence API through spring data makes the application database agnostic, any standard SQL database can be used. A summary of the programming languages and associated tools are given below." },
    { t: 'img', src: "/media/2023/03/Image_008-1.jpg", alt: "", row: "column" },
    { t: 'img', src: "/media/2023/03/Image_007-1.jpg", alt: "", row: "column" },
    { t: 'p', html: "Software design principles and Enterprise designs patterns have been followed in adherence with the recommendations from the following famous books:" },
    { t: 'img', src: "/media/2023/03/Image_009-2.jpg", alt: "" },
    { t: 'p', html: "<b>Example of Recommendations followed from this book:</b> Repository and Service Patterns, Dependency Inversion etc." },
    { t: 'p', html: "<b>SOLID Principle:</b> have been followed." },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Single Responsibility Principle",
        "Open-Close Principle",
        "Liskov substitution principle",
        "Dependency Inversion. In addition, DRY (Don’t Repeat Yourself) principles",
      ],
    },
    { t: 'h', level: 3, id: "5-2-devops-and-microservices-management-tools", text: "5.2. DevOPS and Microservices Management Tools", html: "5.2. DevOPS and Microservices Management Tools" },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Micro service component</p>" },
            { html: "<p>Description</p>" },
            { html: "<p>Tools Used</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Inter Service</p><p>Communication</p>" },
            { html: "<p>For different service with send and receive data form each other</p>" },
            { html: "<p>Asynchronous, messaging- Kafka Synchronous request/response (Feint</p><p>client)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Authentication and Authorization</p>" },
            { html: "<p>Provide a common authentication for all services</p>" },
            { html: "<p>JWT token, OAuth 2, (Optional)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Service Discovery</p>" },
            { html: "<p>A way for applications and microservices to locate each other on a network</p>" },
            { html: "<p>Netflix Eureka</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Service mesh</p>" },
            { html: "<p>Microservices orchestration, management and monitoring</p>" },
            { html: "<p>Istio</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>API gateway and Load Balancer</p>" },
            { html: "<p>Connect to services though common</p><p>gateway for external communication and load balancing</p>" },
            { html: "<p>Zuul proxy,</p><p>Load balancer (Ribbon), Circuit breaker (Hystrix)</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Containerization</p>" },
            { html: "<p>Ship code to live server with convenience</p>" },
            { html: "<p>Docker</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Log</p>" },
            { html: "<p>Lifecycle management for various services logs useful for troubleshooting and</p><p>monitoring.</p>" },
            { html: "<p>ELK stack</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 2, id: "6-supported-specification-and-standards-at-a-glance", text: "6. Supported Specification and Standards at a Glance", html: "6. Supported Specification and Standards at a Glance" },
    { t: 'p', html: "The proposed solution is compatible with the communication protocols used by the Mobile Network Operators (MNO) in Bangladesh. It will also support other operators that use the same protocols or close variants. The solution adheres to important recommendations from the guidelines listed below, promoted by the renowned Standardization bodies." },
    { t: 'img', src: "/media/2023/03/Image_010-1.png", alt: "" },
    { t: 'h', level: 3, id: "6-1-short-message-peer-to-peer-smpp-specification", text: "6.1. Short Message Peer-to-Peer (SMPP) Specification", html: "6.1. Short Message Peer-to-Peer (SMPP) Specification" },
    {
      t: 'ul',
      items: [
        "Protocol: HTTP/HTTPS",
        "Data Encryption: SSL or VPN",
        "Transport",
        "REST over JSON or XML",
        "SOAP over XML",
        "Authentication: JSON Web Token (JWT)",
      ],
    },
    { t: 'h', level: 2, id: "supported-protocols", text: "SUPPORTED PROTOCOLS:", html: "SUPPORTED PROTOCOLS:" },
    { t: 'h', level: 3, id: "6-3-http-https-specifications", text: "6.3. HTTP/HTTPS Specifications", html: "6.3. HTTP/HTTPS Specifications" },
    { t: 'p', html: "SMPP PROTOCOL VERSIONS" },
    {
      t: 'ul',
      items: [
        "SMPP V3.3",
        "SMPP V3.4",
        "SMPP V5.0",
      ],
    },
    { t: 'p', html: "SMPP v3.4 Protocol Implementation guide for GSM / UMTS <br /><br /> <strong>Version 1.0</strong>" },
    { t: 'h', level: 3, id: "ss7-sigtran-specification", text: "SS7/SIGTRAN Specification", html: "SS7/SIGTRAN Specification" },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>OPEN<br />CONNECTIVITY SMS HUBBING ARCHITECTURE- VERSION 2.0 <b>BY GSM ASSOCIATION (GSMA)</b></p>", colSpan: 4 },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>3GPP TS 23.040: TECHNICAL REALIZATION OF THE SHORT MESSAGE SERVICE (SMS), BY 3RD<br />GENERATION PARTNERSHIP PROJECT (3GPP)</p>", colSpan: 4 },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SIGTRAN,<br />MOBILE APPLICATION PART (MAP) AND TRANSACTION CAPABILITIES (TCAP)</p>", colSpan: 4 },
          ],
        },
      ],
    },
    { t: 'img', src: "/media/2023/03/Image_011-1.jpg", alt: "", row: "column" },
    { t: 'img', src: "/media/2023/03/Image_012-1.jpg", alt: "", row: "column" },
    { t: 'img', src: "/media/2023/03/Image_013-1.jpg", alt: "", row: "column" },
    { t: 'img', src: "/media/2023/03/Image_014-1.jpg", alt: "", row: "column" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "<a href=\"https://www.gsma.com/newsroom/wp-content/uploads/2012/12/IR7520.pdf\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.gsma.com/newsroom/wp-content/uploads/2012/12/IR7520.pdf</a>",
        "<a href=\"https://www.3gpp.org/ftp/Specs/archive/23_series/23.040/\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.3gpp.org/ftp/Specs/archive/23_series/23.040/</a>",
        "<a href=\"https://en.wikipedia.org/wiki/Stream_Control_Transmission_Protocol\" target=\"_blank\" rel=\"noopener noreferrer\">Stream Control Transmission Protocol</a> (SCTP), RFC 2960, RFC 3873, RFC 4166, RFC 4960.",
        "<a href=\"https://en.wikipedia.org/wiki/Message_Transfer_Part\" target=\"_blank\" rel=\"noopener noreferrer\">Message Transfer Part</a> 3 USER ADAPTATION LAYER (M3UA), RFC 4666.",
        "<a href=\"https://en.wikipedia.org/wiki/Signalling_Connection_Control_Part\" target=\"_blank\" rel=\"noopener noreferrer\">Signalling Connection Control Part</a> (SCCP) USER ADAPTATION (SUA), RFC 3868.",
        "ITU RECOMMENDATION ON TRANSACTION CAPABILITIES <a href=\"https://www.itu.int/rec/T-REC-Q.773\" target=\"_blank\" rel=\"noopener noreferrer\">ITU Q.771, ITU Q.772, ITU Q.773, ITU Q.774, ITU Q.775</a>",
        "MOBILE APPLICATION PART BY <a href=\"http://www.3gpp.org/ftp/Specs/html-info/0902.htm\" target=\"_blank\" rel=\"noopener noreferrer\">3GPP TS 09.02</a> (MAP V1, MAP V2), <a href=\"http://www.3gpp.org/ftp/Specs/html-info/29002.htm\" target=\"_blank\" rel=\"noopener noreferrer\">3GPP TS 29.002 (MAP V3)</a>",
      ],
    },
    { t: 'h', level: 2, id: "7-solution-overview", text: "7. Solution Overview", html: "7. Solution Overview" },
    { t: 'h', level: 3, id: "7-1-block-diagram", text: "7.1 Block Diagram", html: "7.1 Block Diagram" },
    { t: 'img', src: "/media/2023/03/Image_015-1.png", alt: "" },
    { t: 'h', level: 3, id: "7-2-architecture-and-overview-of-the-sms-processing-pipeline", text: "7.2 Architecture and Overview of the SMS Processing Pipeline", html: "7.2 Architecture and Overview of the SMS Processing Pipeline" },
    { t: 'p', html: "We use a modern, distributed microservices based architecture where each service is deployed in a decoupled, fault tolerant manner. The system is highly scalable, processing capacity can be easily be extended by adding new nodes or VM without breaking any software logic. Top-class Open-source tools/software are used to create the building blocks of the platform. The same tools and design patterns are followed by the leading enterprises in the world. For example, we use Apache KAFKA as the heart of messaging or data streaming platform, which is used by 80% of the top fortune 100 companies in the world to solve problems associated with massive data flow." },
    { t: 'img', src: "/media/2023/03/Image_016-2.png", alt: "", row: "column" },
    { t: 'img', src: "/media/2023/03/Image_017-1.png", alt: "", row: "column" },
    { t: 'p', html: "The general working mechanism of this architecture can be further explained in the following manner." },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Business logics are programmed in services, for example SMS sending logics are built in “SMS Sender Microservice”. There are other services like the “Reporting Microservice”. Unlimited number of instances can be deployed for each service to achieve higher throughput or horizontal scalability.",
        "Services are configured to register themselves to Service Registry Servers through Service Discovery Protocol. We use Netflix Eureka as the service registry server.",
        "We use “Netflix Zuul” proxy as the API Gateway, which interfaces with the external world and balances all incoming load through a load balancer also from Netflix called “Ribbon”.",
        "When the API GW receives an SMS request, it dispatches it to the ”SMS Sender” service which sends the SMS out through a Gateway service.",
        "KAFKA, at the heart of the system, plays important roles to ensure durability in the system, which is explained in the section below.",
      ],
    },
    { t: 'h', level: 3, id: "7-3-how-apache-kafka-helps-us-create-a-powerful-sms-platform", text: "7.3 How “Apache KAFKA” HELPS US CREATE A POWERFUL SMS PLATFORM", html: "7.3 How “Apache KAFKA” HELPS US CREATE A POWERFUL SMS PLATFORM" },
    { t: 'p', html: "Kafka is a real-time data streaming platform which allows to create high speed, high throughput data pipeline spread over any number of distributed servers located anywhere. This enables us to build a genuinely distributed fault tolerant system which is infinitely scalable and very, very reliable. A typical SMS platform works in a request-response manner, SMS messages are processed immediately in-memory and the system tries to route the messages through destination gateways. But, this approach often fails due to sudden surge in traffic, failure or capacity bottleneck on the supplier side. As a result, it’s very difficult to enforce efficient retry policy or else enough visibility to formulate a durable system upon that can be used in a large enterprise or business. It’s not always predictable how the system will behave or recover from a fault under heavy load situations. But, we apache Kafka as a message broker in the middle of everything, regardless of how many SMS we receive through any interfaces, at any speed- each task is persisted in the cluster immediately like writing entries in the database. Each SMS becomes a task created by a producer, such as an API Gateway for SMS. Whereas, there are multiple number of “SMS Router” service instances, which are consumer of the tasks that persist in the Kafka database." },
    { t: 'img', src: "/media/2023/03/Image_018-1.png", alt: "" },
    { t: 'p', html: "Every single SMS task persists in the database and survives any kind of fault or emergencies because the system state is saved in a reliable manner in the disks. As the whole system works in an event driven manner, the event flow or playback starts whenever the system resumes after a crush or fault. It’s guaranteed that the system survives any failure or emergency because it’s always in a valid state. And whenever services resume, they system starts performing its task reliably, right after the point where it used to operate successfully before the failure. The risk of data loss is minimum in this approach. Also, high availability is ensured through multiple servers in the cluster. The state of each processing tasks can be seen, tracked and controlled at any point in time, ensuring tremendous manageability and visibility." },
    { t: 'img', src: "/media/2023/03/Image_019-1.png", alt: "" },
    { t: 'p', html: "However, there could be performance issues while data moving trough a real-time system through a persisting approach. Kafka solves this problem through various advanced optimization technique. For example, events are stored in topics, whereas topics are intelligently partitioned so that read and write load are distributed across several hard disks in across all the servers in the cluster so data read write throughput from permanent storage is very fast." },
    { t: 'p', html: "We create a single Kafka cluster with servers or VMs located in different datacenters or servers to achieve carrier grade reliability. Not only high availability can be achieved in this manner, throughput of the nodes also increases significantly because read and write workloads can be distributed across different hard disks in different machines." },
    { t: 'p', html: "Kafka was born and matured in the rich R&amp;D environment inside LinkedIn, after serving the millions and billions of messages, the company open-sourced the project for greater good of the community. Kafka now belongs to Apache foundation and known as “Apache Kafka”, which has become even more matured and feature rich through contribution from highly skilled technical people from other large corporations in the world as well and has become the de-facto standard for a distributed stream processing system, which being at the heart of our SMS platform, provides us a truly high-performance and fault tolerant SMS processing platform with unmatched visibility or in other word, a true “carrier grade” platform." },
    { t: 'h', level: 2, id: "8-hardware-recommendation", text: "8. Hardware Recommendation", html: "8. Hardware Recommendation" },
    { t: 'p', html: "We recommend 3 servers to create a carrier-grade fault tolerant SMS processing cluster. It’s a common best practice applied by the leading tech companies in the world to keep 3 copies of their mission critical data. Based on the traffic portfolio, we provision the required number of VM and containers in a private cloud. <br /><br /> However, the system can run equally well in a fully virtualized environment. In the absence of a dedicated server environment, VM and container allocation is performed through workshops with our clients. <br /><br /> general guideline without specific knowledge of the traffic profile, the following server configurations should be enough to meet the computing and storage requirements for processing 5 Million SMS per day." },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p><b> Purpose or Service</b></p>" },
            { html: "<p><b> Resource or Hardware Type</b></p>" },
            { html: "<p><b> Quantity</b></p>" },
            { html: "<p><b> Minimum Specifications</b></p>" },
            { html: "<p><b> Remark</b></p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>1. SMS Cluster Node</p>" },
            { html: "<p>Server</p>" },
            { html: "<p>3</p>" },
            { html: "<p>Processor type: Intel Xeon Gold No of core: 12</p><p>RAM: 32 GB</p><p>Storage: 100 GB (Raid<br />5 or 6)</p><p>OS:<br />Debian 11 Linux, 64 bits</p>" },
            { html: "<p>SSD storage<br />preferred.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>2. Mediation Server</p>" },
            { html: "<p>Server</p>" },
            { html: "<p>2</p>" },
            { html: "<p>Processor type: Intel Xeon Gold No of core: 8</p><p>RAM: 32 GB</p><p>Storage: 500 GB (Raid 5 or 6)</p><p>OS:<br />Debian 11 Linux, 64 bits</p>" },
            { html: "<p>CDR based mediation for accounting and performance recording.</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 2, id: "9-important-modules-and-services-at-a-glance", text: "9. Important Modules and Services at a Glance", html: "9. Important Modules and Services at a Glance" },
    { t: 'p', html: "The whole platform is divided into 4 modules as illustrated below. Each module contains multiple small, distributed microservices." },
    { t: 'img', src: "/media/2023/03/Image_020-1.jpg", alt: "" },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>MODULE</p>" },
            { html: "<p>SERVICE</p>" },
            { html: "<p>PURPOSE</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>01. SMS PROCESSOR</p>", rowSpan: 3 },
            { html: "<p>SMS Listener</p>" },
            { html: "<p>Listens for incoming SMS request from applications and the web app. Then performs the routing based on operator’s preference. It distributes the traffic among the available SMS Gateway service instance.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SMS Gateway</p>" },
            { html: "<p>It contains multiple gateway service instances for outgoing carriers, such as: Grameen phone, Robi or other operators. Each gateway service providers may implement different protocols (e.g. SMPP/ HTTP or SIGTRAN). Regardless of the differences in protocols and in connection<br />parameters, this module creates Gateway service instances for each egress carrier endpoint.<br />When SMS is received, each instance sends the SMS through the outgoing gateways. This module also generates necessary records for accounting and reporting.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Short Message Service Center (SMSC)</p>" },
            { html: "<p>A cost effective SMSC solutions, being used by PSTN/IP Telephony operators to send SMS to mobile operators. We have both open-source and proprietary solution depending on traffic volume or TPS of the customer. For small to medium customers, we use open-source technology and for operators requiring high TPS, we use Dialogic DSI G5V programmable STP.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>02.<br />MEDIATION, REPORTING AND BILLING</p>" },
            { html: "<p>Mediation, Reporting and Billing</p>" },
            { html: "<p>For large<br />operators, we recommend using CDR based separate mediation and billing system. This is well<br />optimized for handling large volume of CDRs through database partitioning and various<br />summary data. Also, flexible billing logic can be applied for accurate rating and<br />accounting. In addition, this module offers blazing fast reports queried over long time<br />spans such as months and year.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>03. OSS</p>" },
            { html: "<p>Microservices Management and Orchestration</p>" },
            { html: "<p>Contains the necessary tools used to manage the orchestration and monitoring of the microservices tools. This module enables communications among the services and offers monitoring<br />capability by providing useful reports containing necessary matrices like counters, service calls, success/failed ratio and others.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>04. ERP (APACHE OFBIZ)</p>" },
            { html: "<p>Accounting and CRM</p>" },
            { html: "<p>A top-level java based open-source ERP system by Apache foundation. Offers world class accounting, inventory, catalog/warehouse management. We use this module for party management and accounting purpose including accounts receivable, payable, invoices, payments and<br />pre-paid package accounting.</p><p><a href=\"https://ofbiz.apache.org/\" target=\"_blank\" rel=\"noopener noreferrer\">Official project link:</a><a href=\"https://ofbiz.apache.org/\" target=\"_blank\" rel=\"noopener noreferrer\">https://ofbiz.apache.org/</a></p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 2, id: "10-reporting-and-analytics", text: "10. Reporting and Analytics", html: "10. Reporting and Analytics" },
    { t: 'p', html: "Provides near real-time reporting and analytics through a rich reporting engine/portal. Slowing down of reports with large and increasing volume is a very common problem in telco systems. Often it creates problem identifying faults and their causes in the network, causing severe inconvenience and often loss of service. Telcobright manages a blazing fast reporting engine regardless of the data volume through various optimization techniques namely: Partitioning the CDR table- CDR tables are date wise partitioned in the database. Queries use partition pruning technique to check for records in only limited number of partitions, in other words, only certain locations in the storage disks. Summary Data Generation- Telcobright generates day and hour wise meta data for all the SMS. Most used reports are fetched from summarized data, instead of searching through millions of CDR records in the storage disks. This significantly increases performance and enables almost instant result of reports even over a few months period." },
    { t: 'h', level: 3, id: "any-to-any-reporting", text: "Any to Any Reporting", html: "Any to Any Reporting" },
    { t: 'p', html: "For performance verification and fault isolation, reports needed to be fetched by several filter criteria. We support any to any reporting. As examples, performance can be seen by:" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Incoming client, user account or an application",
        "Destinations (e.g. GP/Robi)",
        "Specific client to specific destination",
        "Hourly report",
        "Daily reports",
        "Failure cause codes and others.",
      ],
    },
    { t: 'p', html: "Example screenshots of a report with various filter criteria is given below." },
    { t: 'img', src: "/media/2023/03/Image_021-1.png", alt: "" },
    { t: 'h', level: 2, id: "11-implementation-overview-of-different-protocols-of-sms", text: "11. Implementation Overview of different Protocols of SMS", html: "11. Implementation Overview of different Protocols of SMS" },
    { t: 'h', level: 3, id: "11-1-general-process-flow-protocol-independent", text: "11.1 General Process Flow (Protocol Independent)", html: "11.1 General Process Flow (Protocol Independent)" },
    { t: 'p', html: "The SMS sending mechanism applies an asynchronous non-blocking architecture in general, which means at not point in any service, an SMS must wait until the acknowledgement of the previous message has arrived. This allows high throughput and low latency. The mechanism becomes practically very effective and useful when shooting the messages out of the provider MNO gateways. Very often, MNOs cannot send the acknowledgement (Delivery) status instantly, they may supply it on a later time based on various characteristics of the mobile network. Our platform must not wait for the delivery reports, instead it sends the messages out to the gateways and listens for acknowledgements for each SMS. Whenever the acknowledgement arrives, it gets queued in the Kafka cluster for further processing. Kafka sends the message to the right consumer e.g. an accounting process for closure. The task gets marked complete by the main SMS process and a CDR is generated." },
    { t: 'img', src: "/media/2023/03/Image_022-1.jpg", alt: "" },
    { t: 'h', level: 3, id: "11-2-smpp-implementation-overview", text: "11.2 SMPP Implementation Overview", html: "11.2 SMPP Implementation Overview" },
    { t: 'p', html: "Features<br />Supported SMPP Versions:<br />– Version 3.3<br />– Version 3.4<br />– Most of version 5.0" },
    {
      t: 'ul',
      items: [
        "Uses non-blocking (NIO) sockets (via underlying Netty dependency, one thread can support 1 or more SMPP sessions)",
        "Can support thousands of binds/connections using minimal resources and threads",
        "Supports both client and server modes of the SMPP protocol (yes you can write your own SMPP server using this library as well as be a client to one)",
        "Supports synchronous request mode (send request and block until response received)",
        "Supports asynchronous request mode (send request, get a future response, and then decide when you’d like to wait/get a response)",
        "Advanced support for SMPP “windowing”:",
        "Configurable window size per session",
        "Waiting for a window slot to open up",
        "Get a list of unacknowledged/in-flight PDUs if session disconnects",
        "SSL/TLS support for clients and servers",
      ],
    },
    { t: 'img', src: "/media/2023/03/Image_023-1.jpg", alt: "" },
    { t: 'p', html: "When sending SMS over SMMPP, our platform works like an External Short Messaging Entity (ESME) which interface with the Message Centers (MC) of the mobile operators. We support the standard and most common mode of operation when sending SMS toward mobile operators which is described below and show in the picture beside. The SMPP protocol is a set of operations, each one taking the form of a request and response Protocol Data Unit (PDU) containing an SMPP command. For example, if an ESME wishes to submit a short message, it may send a submit_sm PDU to the MC. The MC responds with a submit_sm_resp PDU, indicating the success or failure of the request. Likewise, if an MC wishes to deliver a message to an ESME, it may send a deliver_sm PDU to an ESME, which in turn responds with a deliver_sm_resp PDU as a means of acknowledging the delivery." },
    { t: 'h', level: 3, id: "11-3-http-implementation-overview", text: "11.3 HTTP Implementation Overview", html: "11.3 HTTP Implementation Overview" },
    { t: 'p', html: "In general, we use popular REST API for connecting to clients and suppliers over HTTP or HTTPS. As REST API specifications does not dictate any standard request/reply construct, we offer a standard set of APIs to the clients and follow the API doc given by the provider or suppliers. We have experience in connecting the MNOs in Bangladesh using custom API." },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Protocols</p>" },
            { html: "<p>REST or HTTP/HTTPs, SOAP</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Payload Type</p>" },
            { html: "<p>JSON, XML</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Security</p>" },
            { html: "<p>SSL certificates for transport layer security, or VPN (any), JWT for client authentication and authorization</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 3, id: "11-4-ss7-sigtran-implementation-overview", text: "11.4 SS7/SIGTRAN IMPLEMENTATION OVERVIEW", html: "11.4 SS7/SIGTRAN IMPLEMENTATION OVERVIEW" },
    { t: 'p', html: "We use Dialogic DSI G5V Signaling Controller as the main STP or SS7 engine for SMS Hubbing or SMSC scenario to implement a SMS V-HUB (virtual hub) which carries SMS traffic among SS7 or SIGTRAN networks." },
    { t: 'p', html: "The controller can serve as STP (SS7 only), STP Signaling Gateway (SS7 to IP or IP to IP), SMS Gateway, Media Gateway, Media Servers and Multimedia web services and Value Added Services (VAS) engine. It’s a very popular platform worldwide among Value Added Service Providers and System Integrators. Few references are given below:" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "<a href=\"https://www.eiconworks.com/DSI-SS7-Stack.asp\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.eiconworks.com/DSI-SS7-Stack.asp</a>",
        "<a href=\"https://www.enghousenetworks.com/portfolio/network-infrastructure/stp-signaling/\" target=\"_blank\" rel=\"noopener noreferrer\">https://www.enghousenetworks.com/portfolio/network-infrastructure/stp-signaling/</a>",
        "https://www.gsma.com/membership/resources/coure-software-systems-inc-selects-dialogic-signaling- solution-offer-pan-african-number-management-security-services/",
        "https://comptek.ru/catalog/dialogic/",
      ],
    },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Dialogic® DSI Signaling Transfer Point (DSI STP) based on the Dialogic DSI G5V Signaling Controller is a compact, cost-effective software only telecommunications signaling platform, providing core network connectivity for use in all-IP signaling environments. The DSI STP supports comprehensive Screening capabilities in addition to routing at the MTP and SCCP levels and Global Title Translation.</p><p><br /></p><p>The DSI STP features a browser-based graphical user interface (GUI) for all operations, administration, maintenance and provisioning functions. The GUI supports dynamic con?guration, status and alarm monitoring, interactive control and a wide range of diagnostic capabilities. A multi-user environment- complete with password security, con?gurable user privileges and full audit trail – adheres to chosen security policy. The DSI STP supports multiple protocol variants allowing worldwide deployment in both fixed and mobile</p><p>networks.</p>" },
            { html: "<p><br /></p><p><span class=\"missing-figure\" role=\"img\" aria-label=\"Figure not available: Image_024.jpg\">Figure unavailable &mdash; Image_024.jpg</span></p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Features</p>" },
            { html: "<p>Benefits</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Software-only appliance for deployment under VMware or KVM using a single OVF distribution.</p>" },
            { html: "<p>Allows the user to provision the optimal amount of resource and to select hardware platform of choice</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Worldwide protocol support (including ITU-T, ANSI,</p><p>China, Japan) for both telephony and transaction- based operation with SCCP Global Title Translation</p>" },
            { html: "<p>Facilitates global deployments and the ability to configure protocol variants at runtime</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Screening and routing based on OPC, DPC, SCCP Called &amp;</p><p>Calling Address, SSN, MAP Operation Code and others</p>" },
            { html: "<p>Puts the operator in control of the way the network is used</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Supports built in browser and command line interface for OA&amp;M in addition to SNMP</p>" },
            { html: "<p>Facilitates comprehensive, user-friendly remote management using standard tools without the need for an expensive</p><p>Element Manager</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Built-in periodic traffic measurements, event logging and</p><p>protocol tracing (including PCAP format), backed by documented internal interfaces between protocol layers</p>" },
            { html: "<p>Provides good visibility of utilization and traf?c levels; facilitates fast resolution of network protocol issues</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Ability to interwork between different network types including National/International, ETSI/ANSI and support for Alias Point Codes</p>" },
            { html: "<p>Resolves basic interworking needs without requiring external protocol conversion</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 3, id: "11-5-approach-to-the-ss7-based-solution", text: "11.5 Approach to the SS7 Based Solution", html: "11.5 Approach to the SS7 Based Solution" },
    { t: 'h', level: 4, id: "openness", text: "Openness", html: "Openness" },
    { t: 'p', html: "The core engine of the solution is a SS7 Signal Transfer Point (STP) software from a renowned vendor which is the main enabler for the communications with the wireless networks for exchanging SMS. In terms of reliability, the solution itself is carrier-grade, but the most notable fact is that the solution is not a “Blackbox” solution usually sold in the telco market. The software offers Software Development Kit (SDK) and hundreds of API to customize almost everything at all levels of communication. The Dialogic DSI G5V is a programmable STP or signaling platform which is highly extensible allows building rich telecom appliances rapidly. In simple terms, it’s difficult and expensive to add a feature in a blackbox telco product, but the DSI is meant for this. It allows easy interface to manipulate the protocol messages belonging to any layer of the SS7 signaling stack. Which gives tremendous flexibility in customization. As a result, new services addition and solving compatibility issues in a multi-vendor environment can be addressed so easily and without expensive change requests to vendors." },
    { t: 'p', html: "<strong>Link:</strong> https://www.dialogic.com/signaling- and-ss7-components/download/dsi- interface-protocol-stacks" },
    { t: 'img', src: "/media/2023/03/Image_026-1.jpg", alt: "" },
    { t: 'p', html: "<strong>Screenshot:</strong> 2 (SS7 programmer’s manual)" },
    { t: 'h', level: 4, id: "microservices-architecture", text: "Microservices Architecture", html: "Microservices Architecture" },
    { t: 'p', html: "We as a System Integrator and software company follow the latest trend and best practices in the software development world. We will use the microservices architecture which is the most popular architecture now for building highly scalable and fault tolerant mission critical IT systems. Companies like Netflix, eBay, Amazon, Twitter, PayPal have evolved to migrate their core systems to Microservices for much greater benefit. More info on architecture is given in later sections of this document, but a quick overview can be found through the original microservices docs at https://microservices.io/." },
    { t: 'h', level: 3, id: "overview-of-the-modules-and-sub-modules", text: "Overview of the Modules and Sub-Modules", html: "Overview of the Modules and Sub-Modules" },
    { t: 'p', html: "As shown in figure-1: there are 3 core modules in the system, each having multiple components or sub-modules." },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Module</p>" },
            { html: "<p>Purpose</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>1. SS7 Core (Signaling System no 7)</p>" },
            { html: "<p>Core signaling module for interconnection and SMS processing in the system. This is sourced from Dialogic through the DSI G5V programmable</p><p>STP.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>2. Performance and Accounting</p>" },
            { html: "<p>Listens for important signals (events) related to SMS traffic from the SS7 core, through microservices components and generates Accounting and Performance records.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>3. Management and Orchestration</p>" },
            { html: "<p>This is the main microservices engine for synchronization and orchestration of all the services running in the platform. It also offers</p><p>necessary features for operation and management of the system through graphical user interface (GUI), CLI, REST API and other tools.</p>" },
          ],
        },
      ],
    },
    { t: 'p', html: "The following table illustrates an overview of the features and functionality of the submodules under the 3 main modules." },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p>Module</p>" },
            { html: "<p>Sub-Module</p>" },
            { html: "<p>Purpose</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>1. SS7 Core</p>", rowSpan: 3 },
            { html: "<p>SIGTRAN Gateway (Signaling Gateway)</p>" },
            { html: "<p>Allows SS7 applications to connect and communicate over IP Network. In our case, it allows the V-HUB to talk to the mobile network equipment e.g., SMSC, HLR and MSC that use protocols belonging the SS7 family.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Load Balancer</p>" },
            { html: "<p>Acts like an SBC in a voice network or a load balancer like NGINX for web applications. The load balancer extracts and distributes incoming SMS tasks or transactions among SMS gateway instances for further processing.</p><p>This allows horizontal scalability and creates a highly scalable system.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SMS Gateway</p>" },
            { html: "<p>This is responsible for the direct processing of SMS, for example forwarding by address manipulation or screening/blocking messages by filter parameters. It deals with the TCAP and MAP layer of the protocol stack, which<br /> are responsible for the payload or transactions mentioned by the RFP.</p><p>This submodule or service can be deployed in multiple VMs for increased throughput or scalability; also fault tolerance.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>2. Performance and Accounting</p>" },
            { html: "<p>CDR Generator</p>" },
            { html: "<p>Generates call records necessary for billing. The process listens for accounting event from the SS7 core and performs the tasks of starting and closing CDR records, also aggregating them in files or database for transferring to external billing systems.</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 3, id: "overview-of-the-modules-and-sub-modules-2", text: "Overview of the Modules and Sub-Modules", html: "Overview of the Modules and Sub-Modules" },
    {
      t: 'ul',
      ordered: true,
      items: [
        "Flat and affordable Licensing<br />We take advantage of the bulk licensing capacity that Dialogic offers to us as an Original Equipment Manufacturer (OEM) which allows us to offer a cost-effective solution. We save our customers big on throughput licensing.",
        "<p>Implementing powerful features like V-HLR and V-MSC easiliy</p><p>It may be required to implement advanced and customized features at any moment during the life time of the V-HUB project. For instance, the system may need to act as a V-HLR or V-MSC on behalf of an IPTSP/ PSTN operator so that the ANS can send SMS through the V-HUB to the PSTN subscribers using OTT Apps. Features like these can be easily implemented with the API offered by the Dialogic G5V programmable STP.</p><p><img src=\"/media/2023/03/Image_027.png\" alt=\"\" /></p>",
      ],
    },
    { t: 'h', level: 2, id: "12-protocol-signaling-requirements-as-per-sms-hubbing-standa", text: "12. Protocol Signaling Requirements as per SMS Hubbing Standards", html: "12. Protocol Signaling Requirements as per SMS Hubbing Standards" },
    { t: 'h', level: 3, id: "12-1-1-signaling-requirements-in-existing-scenario-without-o", text: "12.1.1. Signaling Requirements in Existing scenario (without OUR CUSTOMERS V-HUB in the path)", html: "12.1.1. Signaling Requirements in Existing scenario (without OUR CUSTOMERS V-HUB in the path)" },
    { t: 'p', html: "All operators are using GSM MAP protocol on top of SS7 stack at the application layer. The signaling or process flow is depicted clearly in the SMS Hubbing Architecture Guidelines on page 35, section 7.1 Current bi-lateral Client Operator to Client Operator Architecture. The figure below with the process description are copied from the guideline." },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p><img src=\"/media/2023/03/Image_028.jpg\" alt=\"\" /></p>", rowSpan: 5 },
            { html: "<p>Description</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>Subscriber generates SM. SMSC receives SM-MO and consults routing</p><p>tables to define which HLR to request route from.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SMSC sends an SRI-SM to MNO2 HLR.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>MNO2 HLR responds with MSC/VLR location of subscriber for delivery of</p><p>SM-MT.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>SMSC delivers SM-MT to subscriber via specified MSC/VLR.</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 3, id: "12-1-2-signaling-requirements-in-proposed-scenario-with-our-", text: "12.1.2. Signaling Requirements in proposed scenario (with OUR CUSTOMERS V-HUB in the path)", html: "12.1.2. Signaling Requirements in proposed scenario (with OUR CUSTOMERS V-HUB in the path)" },
    { t: 'p', html: "The scenario described in the RFP is mentioned on page 37, section 7.2 SS7 Based Hubbing, which is also copied below." },
    {
      t: 'table',
      rows: [
        {
          head: false,
          cells: [
            { html: "<p><img src=\"/media/2023/03/Image_029.jpg\" alt=\"\" /></p>", rowSpan: 6 },
            { html: "<p>Stage</p>" },
            { html: "<p>Description</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>0</p>" },
            { html: "<p>Subscriber generates SM. SMSC receives SM-MO and consults routing tables to define which HLR to request route from.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>1</p>" },
            { html: "<p>SMSC sends an SRI-SM to MNO2 HLR.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>2</p>" },
            { html: "<p>MNO2 HLR responds with MSC/VLR location of subscriber for delivery of SM-MT.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>3</p>" },
            { html: "<p>SMSC delivers SM-MT to subscriber via specified MSC/VLR.</p>" },
          ],
        },
        {
          head: false,
          cells: [
            { html: "<p>4</p>" },
            { html: "<p>(optional) Delivery report generated.</p>" },
          ],
        },
      ],
    },
    { t: 'h', level: 2, id: "13-working-mechanism-of-the-v-hub-stp", text: "13. Working Mechanism of the V-HUB STP", html: "13. Working Mechanism of the V-HUB STP" },
    { t: 'p', html: "Among all the vast features of the DSI G5V STP, we discuss a few important functionalities that will be required by the project." },
    { t: 'h', level: 3, id: "signal-transfer", text: "Signal Transfer", html: "Signal Transfer" },
    { t: 'p', html: "The STP will be responsible for establishing signaling connections between own and remote end points of ANS using standard protocols." },
    { t: 'h', level: 3, id: "address-manipulation-by-acting-as-vhlr-vmsc", text: "Address Manipulation by acting as VHLR, VMSC", html: "Address Manipulation by acting as VHLR, VMSC" },
    { t: 'p', html: "The V-HUB should be implemented in a manner such that it remains as transparent as possible while carrying SMS to reduce complexity and ensure maximum performance. However, as per the standard guidelines and for generating accounting records – signaling address manipulation may be required at multiple layers." },
    { t: 'h', level: 3, id: "sms-screening", text: "SMS Screening", html: "SMS Screening" },
    { t: 'p', html: "The RFP has mentioned SMS screening, blocking, or firewalling. The scope could be very broad, and only a programmable STP capable of inspecting and manipulating SMS traffic at the application layer can meet the requirements. The offered DSI G5V programmable STP is perfectly capable of doing this job. Also, the microservices architecture suits the scalability requirements." },
    { t: 'h', level: 3, id: "transaction-handling", text: "Transaction Handling", html: "Transaction Handling" },
    { t: 'p', html: "SMS Hubbing will be realized through multiple transactions at the TCAP layer of the signaling stack. The uppermost protocol MAP will use TCAP to reliably perform necessary tasks for sending SMS, such as- looking up the location of the recipient or finally forwarding the SMS for delivery. Transactions are specified to be a key criterion for dimensioning the system. It’s discussed in detail under this section later." },
    { t: 'h', level: 3, id: "accounting-and-performance-record-counters-generation", text: "Accounting and Performance record (counters) generation", html: "Accounting and Performance record (counters) generation" },
    { t: 'p', html: "Call Detail Record (CDR) generation is required for accounting or charging purpose. On the other hand, performance statistics or counters reflect the Key Performance Indicator (KPI) of the system. The methods for generating these records are similar, both can be generated by a designated Java process that listens to appropriate events from the SS7 core module via a microservices component called “Messaging Queue (MQ)”. The process is described further in the description of this section later in this chapter." },
    { t: 'p', html: "<strong>Signal Transfer</strong><br /><br /> GSM MAP, along with TCAP protocols will be used at the V-HUB to connect with the ANS and exchange SMS traffic. These protocols run on top of other SS7 protocols which altogether makes the communication alive. SS7 was originally a protocol for the TDM network and the signaling traffic were used to carry through low speed signaling links. But as IP network evolved and became more popular, application-level protocols are now transported over high-speed IP networks. The RFP asks to implement SIGTRAN for transporting SMS traffic (MAP+TCAP) over IP network. The very high-level topology will look like this:" },
    { t: 'img', src: "/media/2023/03/Image_030-1.jpg", alt: "" },
    { t: 'p', html: "Accordingly, the protocol stack to be implemented is illustrated in the figure below. More discussions on protocol stack and SIGTRAN implementation strategy is covered later in section “5.3. SIGTRAN Specifications and Implementation Proposal”." },
    { t: 'img', src: "/media/2023/03/Image_031-1.jpg", alt: "" },
    { t: 'p', html: "This is the STP functionality of the HUB and is equivalent to a router or a proxy server in an IP network. The V-HUB will screen or discard illegal packets (called MSSU for SS7), for example, packets from unknown source address or a service that is not allowed. Allowed packets from source operators (ANS and PSTN) will be forwarded to the next hop ANS. The easiest way to route packets for the HUB is to look at the SCCP Called Party GT and forward to the destination point code that has been provisioned for the destination GT in the database. Neverthless, the source and destination point codes info at the M3UA layer will be replaced by the STP with its own." },
    { t: 'img', src: "/media/2023/03/Image_032-1.png", alt: "" },
    { t: 'p', html: "Global Titles (GT) belongs here at the SCCP layer. The V-HUB can forward packets just by looking at the destination GT (e.g. called party address of the HLR or MSC of ANS2). But for generating accounting records and more fine grained operations like screening of SMS, the V-HUB will process information internally at the TCAP layer and above whenever necessary." },
    { t: 'p', html: "The proposed programmable STP provides necessary API for inspecting and manipulating signaling address and other parameters at all layers." },
    { t: 'p', html: "<strong>Address Manipulation by acting as VHLR, VMSC</strong> In addition, the STP is capable of manipulating address information at any layer of signaling if deemed necessary for the interconnection. It can implement the examples and guidelines from GSMA SMS Hubbing guidelines in section 6.1.26 SS7 Transparency – Address Manipulation and associated chapters. This is how the STP can work as a VHLR or VMSC, because it’s simulating the behavior of wireless network equipment. An appropriate and optimized address manipulation ruleset will be implemented in the V-HUB based on the decisions made during the implementation phase of the project. However, the STP software is quite flexible in this regard and can implement the various scenarios those are described in the GSMA SMS Hubbing guidelines. The picture below is taken from section “6.1.26.3 Detailed diagram of the message flow”, it illustrates some address manipulation technique (in red font) at the intermediary hubs, which can be successfully implemented in the V-HUB." },
    { t: 'img', src: "/media/2023/03/Image_034-1.jpg", alt: "" },
    { t: 'img', src: "/media/2023/03/Image_035-1.png", alt: "" },
    { t: 'p', html: "<strong>SIGTRAN Specifications and Implementation Proposal</strong>" },
  ],
};
