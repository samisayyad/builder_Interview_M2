export interface MCQQuestion {
  id: string;
  domain: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  prompt: string;
  options: Array<{
    value: string;
    label: string;
  }>;
  correctOption: string;
  explanation: string;
}

export const mcqQuestions: MCQQuestion[] = [
  // Software Development
  {
    id: "sde-1",
    domain: "Software Development",
    difficulty: "beginner",
    prompt: "What is the time complexity of binary search?",
    options: [
      { value: "a", label: "O(n)" },
      { value: "b", label: "O(log n)" },
      { value: "c", label: "O(n²)" },
      { value: "d", label: "O(1)" },
    ],
    correctOption: "b",
    explanation:
      "Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity.",
  },
  {
    id: "sde-2",
    domain: "Software Development",
    difficulty: "intermediate",
    prompt:
      "Which design pattern is best for creating objects without specifying their exact classes?",
    options: [
      { value: "a", label: "Singleton" },
      { value: "b", label: "Factory" },
      { value: "c", label: "Observer" },
      { value: "d", label: "Strategy" },
    ],
    correctOption: "b",
    explanation:
      "The Factory pattern is used to create objects without specifying their exact classes, promoting loose coupling.",
  },
  {
    id: "sde-3",
    domain: "Software Development",
    difficulty: "advanced",
    prompt:
      "What is the main advantage of using dependency injection in software design?",
    options: [
      { value: "a", label: "Reduces code complexity" },
      { value: "b", label: "Improves testability and loose coupling" },
      { value: "c", label: "Increases performance" },
      { value: "d", label: "Reduces memory usage" },
    ],
    correctOption: "b",
    explanation:
      "Dependency injection promotes loose coupling and improves testability by allowing dependencies to be injected rather than created internally.",
  },

  // Data Science
  {
    id: "ds-1",
    domain: "Data Science",
    difficulty: "beginner",
    prompt: "Which of the following is NOT a property of the normal distribution?",
    options: [
      { value: "a", label: "It is symmetric around the mean" },
      { value: "b", label: "It has exactly 2 modes" },
      { value: "c", label: "The area under the curve equals 1" },
      { value: "d", label: "It is defined by mean and standard deviation" },
    ],
    correctOption: "b",
    explanation:
      "The normal distribution is unimodal (has one mode), not bimodal. All other properties are correct.",
  },
  {
    id: "ds-2",
    domain: "Data Science",
    difficulty: "intermediate",
    prompt:
      "What is the primary purpose of feature scaling in machine learning?",
    options: [
      { value: "a", label: "Reduce overfitting" },
      { value: "b", label: "Bring features to similar ranges" },
      { value: "c", label: "Increase model accuracy" },
      { value: "d", label: "Reduce training time" },
    ],
    correctOption: "b",
    explanation:
      "Feature scaling brings all features to a similar range, which helps algorithms that use distance metrics and gradient descent converge faster.",
  },
  {
    id: "ds-3",
    domain: "Data Science",
    difficulty: "advanced",
    prompt: "Which technique is used to handle multicollinearity in regression?",
    options: [
      { value: "a", label: "Ridge Regression" },
      { value: "b", label: "Standardization" },
      { value: "c", label: "One-hot encoding" },
      { value: "d", label: "Binning" },
    ],
    correctOption: "a",
    explanation:
      "Ridge Regression adds a penalty term to handle multicollinearity by shrinking correlated coefficients.",
  },

  // Machine Learning
  {
    id: "ml-1",
    domain: "Machine Learning",
    difficulty: "beginner",
    prompt: "What is the purpose of cross-validation?",
    options: [
      { value: "a", label: "To increase model accuracy" },
      { value: "b", label: "To evaluate model performance reliably" },
      { value: "c", label: "To reduce training time" },
      { value: "d", label: "To prevent data leakage" },
    ],
    correctOption: "b",
    explanation:
      "Cross-validation divides data into multiple folds to evaluate model performance reliably and reduce variance in performance estimates.",
  },
  {
    id: "ml-2",
    domain: "Machine Learning",
    difficulty: "intermediate",
    prompt: "What does regularization do in machine learning?",
    options: [
      { value: "a", label: "Improves training accuracy" },
      { value: "b", label: "Prevents overfitting by penalizing complexity" },
      { value: "c", label: "Increases model interpretability" },
      { value: "d", label: "Speeds up training" },
    ],
    correctOption: "b",
    explanation:
      "Regularization adds a penalty term to the loss function to discourage complex models and prevent overfitting.",
  },
  {
    id: "ml-3",
    domain: "Machine Learning",
    difficulty: "advanced",
    prompt: "What is the fundamental difference between bagging and boosting?",
    options: [
      { value: "a", label: "Bagging is sequential; boosting is parallel" },
      { value: "b", label: "Boosting focuses on correcting misclassified samples" },
      { value: "c", label: "Bagging uses different algorithms" },
      { value: "d", label: "There is no difference" },
    ],
    correctOption: "b",
    explanation:
      "Bagging trains independent models in parallel, while boosting trains models sequentially, focusing on correcting errors from previous models.",
  },

  // Product Management
  {
    id: "pm-1",
    domain: "Product Management",
    difficulty: "beginner",
    prompt: "What is the primary role of a Product Manager?",
    options: [
      { value: "a", label: "Write code" },
      { value: "b", label: "Define product vision and strategy" },
      { value: "c", label: "Design user interfaces" },
      { value: "d", label: "Manage the engineering team" },
    ],
    correctOption: "b",
    explanation:
      "A Product Manager defines the product vision, strategy, and roadmap to solve customer problems and drive business value.",
  },
  {
    id: "pm-2",
    domain: "Product Management",
    difficulty: "intermediate",
    prompt:
      "Which framework helps prioritize features based on user value and implementation effort?",
    options: [
      { value: "a", label: "MoSCoW" },
      { value: "b", label: "Kano Model" },
      { value: "c", label: "Value vs. Effort Matrix" },
      { value: "d", label: "Jobs to be Done" },
    ],
    correctOption: "c",
    explanation:
      "The Value vs. Effort Matrix (2x2 matrix) helps visualize and prioritize features by mapping business value against implementation effort.",
  },
  {
    id: "pm-3",
    domain: "Product Management",
    difficulty: "advanced",
    prompt: "What is the primary goal of OKRs (Objectives and Key Results)?",
    options: [
      { value: "a", label: "Measure employee performance" },
      { value: "b", label: "Set ambitious goals and track progress" },
      { value: "c", label: "Budget allocation" },
      { value: "d", label: "Document processes" },
    ],
    correctOption: "b",
    explanation:
      "OKRs help set ambitious, measurable goals (Objectives) with specific outcomes (Key Results) to drive focus and accountability.",
  },

  // UX Design
  {
    id: "ux-1",
    domain: "UX Design",
    difficulty: "beginner",
    prompt: "What is the primary goal of user research?",
    options: [
      { value: "a", label: "Create beautiful designs" },
      { value: "b", label: "Understand user needs and pain points" },
      { value: "c", label: "Follow design trends" },
      { value: "d", label: "Reduce design time" },
    ],
    correctOption: "b",
    explanation:
      "User research helps designers understand user needs, behaviors, and pain points to create effective solutions.",
  },
  {
    id: "ux-2",
    domain: "UX Design",
    difficulty: "intermediate",
    prompt: "What is the principle of progressive disclosure in UI design?",
    options: [
      { value: "a", label: "Show all information at once" },
      { value: "b", label: "Hide important features" },
      { value: "c", label: "Reveal information gradually based on user needs" },
      { value: "d", label: "Use complex navigation" },
    ],
    correctOption: "c",
    explanation:
      "Progressive disclosure reduces cognitive load by revealing information gradually as users need it, improving usability.",
  },
  {
    id: "ux-3",
    domain: "UX Design",
    difficulty: "advanced",
    prompt:
      "What is the difference between information architecture and interaction design?",
    options: [
      { value: "a", label: "They are the same" },
      { value: "b", label: "IA structures content; IxD designs interactions" },
      { value: "c", label: "IA is visual design" },
      { value: "d", label: "IxD is only for mobile" },
    ],
    correctOption: "b",
    explanation:
      "Information Architecture (IA) organizes and structures content, while Interaction Design (IxD) defines how users interact with the product.",
  },

  // System Design
  {
    id: "sys-1",
    domain: "System Design",
    difficulty: "beginner",
    prompt: "In CAP theorem, what does 'C' stand for?",
    options: [
      { value: "a", label: "Consistency" },
      { value: "b", label: "Compatibility" },
      { value: "c", label: "Complexity" },
      { value: "d", label: "Concurrency" },
    ],
    correctOption: "a",
    explanation:
      "CAP theorem states that a distributed system can guarantee only two of three properties: Consistency, Availability, and Partition tolerance.",
  },
  {
    id: "sys-2",
    domain: "System Design",
    difficulty: "intermediate",
    prompt:
      "Which database would you choose for high-volume, low-latency requirements?",
    options: [
      { value: "a", label: "PostgreSQL" },
      { value: "b", label: "MongoDB" },
      { value: "c", label: "Redis" },
      { value: "d", label: "MySQL" },
    ],
    correctOption: "c",
    explanation:
      "Redis is an in-memory data structure store optimized for high-volume, low-latency operations with fast read/write capabilities.",
  },
  {
    id: "sys-3",
    domain: "System Design",
    difficulty: "advanced",
    prompt: "What is the primary benefit of using a message queue in system design?",
    options: [
      { value: "a", label: "Reduces database size" },
      { value: "b", label: "Decouples services and handles async processing" },
      { value: "c", label: "Increases security" },
      { value: "d", label: "Reduces network latency" },
    ],
    correctOption: "b",
    explanation:
      "Message queues decouple services, enable asynchronous processing, and help handle traffic spikes by buffering requests.",
  },

  // DevOps
  {
    id: "devops-1",
    domain: "DevOps",
    difficulty: "beginner",
    prompt: "What is the main goal of CI/CD?",
    options: [
      { value: "a", label: "Reduce team size" },
      { value: "b", label: "Automate testing and deployment" },
      { value: "c", label: "Eliminate servers" },
      { value: "d", label: "Write less code" },
    ],
    correctOption: "b",
    explanation:
      "CI/CD automates the process of testing and deploying code changes, enabling faster and more reliable releases.",
  },
  {
    id: "devops-2",
    domain: "DevOps",
    difficulty: "intermediate",
    prompt: "What does containerization provide in DevOps?",
    options: [
      { value: "a", label: "Security" },
      { value: "b", label: "Consistency and portability" },
      { value: "c", label: "Faster code execution" },
      { value: "d", label: "Reduced costs" },
    ],
    correctOption: "b",
    explanation:
      "Containerization ensures applications run consistently across different environments and is easily portable.",
  },
  {
    id: "devops-3",
    domain: "DevOps",
    difficulty: "advanced",
    prompt: "What is the primary purpose of infrastructure as code?",
    options: [
      { value: "a", label: "Replace developers" },
      { value: "b", label: "Version control and automate infrastructure setup" },
      { value: "c", label: "Reduce security" },
      { value: "d", label: "Eliminate testing" },
    ],
    correctOption: "b",
    explanation:
      "Infrastructure as Code enables version control, automation, and reproducibility of infrastructure setup.",
  },

  // QA Engineering
  {
    id: "qa-1",
    domain: "QA Engineering",
    difficulty: "beginner",
    prompt: "What is the primary goal of unit testing?",
    options: [
      { value: "a", label: "Test entire application flow" },
      { value: "b", label: "Test individual components in isolation" },
      { value: "c", label: "Test user interface" },
      { value: "d", label: "Test database performance" },
    ],
    correctOption: "b",
    explanation:
      "Unit testing tests individual components in isolation to ensure each part works correctly before integration.",
  },
  {
    id: "qa-2",
    domain: "QA Engineering",
    difficulty: "intermediate",
    prompt:
      "Which testing type focuses on application behavior from a user perspective?",
    options: [
      { value: "a", label: "Unit testing" },
      { value: "b", label: "Integration testing" },
      { value: "c", label: "Functional testing" },
      { value: "d", label: "Performance testing" },
    ],
    correctOption: "c",
    explanation:
      "Functional testing validates application behavior and features from a user perspective against requirements.",
  },
  {
    id: "qa-3",
    domain: "QA Engineering",
    difficulty: "advanced",
    prompt: "What is the difference between black box and white box testing?",
    options: [
      { value: "a", label: "Black box is faster" },
      { value: "b", label: "White box tests code; black box tests functionality" },
      { value: "c", label: "They test different systems" },
      { value: "d", label: "There is no difference" },
    ],
    correctOption: "b",
    explanation:
      "White box testing examines code internals; black box testing examines functionality without knowledge of implementation.",
  },

  // Database Design
  {
    id: "db-1",
    domain: "Database Design",
    difficulty: "beginner",
    prompt: "What is database normalization?",
    options: [
      { value: "a", label: "Deleting old data" },
      { value: "b", label: "Organizing data to reduce redundancy" },
      { value: "c", label: "Encrypting data" },
      { value: "d", label: "Backing up data" },
    ],
    correctOption: "b",
    explanation:
      "Database normalization organizes data into structured tables to reduce redundancy and improve data integrity.",
  },
  {
    id: "db-2",
    domain: "Database Design",
    difficulty: "intermediate",
    prompt: "What is the purpose of database indexing?",
    options: [
      { value: "a", label: "Store more data" },
      { value: "b", label: "Improve query performance" },
      { value: "c", label: "Backup data" },
      { value: "d", label: "Encrypt data" },
    ],
    correctOption: "b",
    explanation:
      "Indexing creates data structures that speed up query performance by reducing the amount of data to scan.",
  },
  {
    id: "db-3",
    domain: "Database Design",
    difficulty: "advanced",
    prompt: "What is the difference between ACID and BASE consistency models?",
    options: [
      { value: "a", label: "ACID is faster" },
      { value: "b", label: "ACID prioritizes consistency; BASE prioritizes availability" },
      { value: "c", label: "They are the same" },
      { value: "d", label: "BASE is more secure" },
    ],
    correctOption: "b",
    explanation:
      "ACID prioritizes data consistency; BASE (Basically Available, Soft state, Eventual consistency) prioritizes availability and scalability.",
  },

  // Frontend Development
  {
    id: "frontend-1",
    domain: "Frontend Development",
    difficulty: "beginner",
    prompt: "What does the virtual DOM do in React?",
    options: [
      { value: "a", label: "Encrypts data" },
      { value: "b", label: "Improves performance by minimizing real DOM updates" },
      { value: "c", label: "Stores user data" },
      { value: "d", label: "Handles API calls" },
    ],
    correctOption: "b",
    explanation:
      "The virtual DOM is an in-memory representation that React uses to batch DOM updates, improving performance.",
  },
  {
    id: "frontend-2",
    domain: "Frontend Development",
    difficulty: "intermediate",
    prompt: "What is the purpose of state management libraries like Redux?",
    options: [
      { value: "a", label: "Style components" },
      { value: "b", label: "Centralize and manage application state" },
      { value: "c", label: "Handle HTTP requests" },
      { value: "d", label: "Create components" },
    ],
    correctOption: "b",
    explanation:
      "State management libraries centralize application state, making it easier to manage and debug complex applications.",
  },
  {
    id: "frontend-3",
    domain: "Frontend Development",
    difficulty: "advanced",
    prompt: "What is the benefit of lazy loading in web applications?",
    options: [
      { value: "a", label: "Reduces code size" },
      { value: "b", label: "Improves initial page load time" },
      { value: "c", label: "Increases security" },
      { value: "d", label: "Reduces server costs" },
    ],
    correctOption: "b",
    explanation:
      "Lazy loading defers loading of non-critical resources until they are needed, improving initial page load performance.",
  },

  // Backend Development
  {
    id: "backend-1",
    domain: "Backend Development",
    difficulty: "beginner",
    prompt: "What is REST architecture?",
    options: [
      { value: "a", label: "A programming language" },
      { value: "b", label: "An architectural style for building APIs" },
      { value: "c", label: "A database" },
      { value: "d", label: "A security protocol" },
    ],
    correctOption: "b",
    explanation:
      "REST (Representational State Transfer) is an architectural style for building scalable web APIs using HTTP methods.",
  },
  {
    id: "backend-2",
    domain: "Backend Development",
    difficulty: "intermediate",
    prompt: "What is the purpose of middleware in web frameworks?",
    options: [
      { value: "a", label: "Store data" },
      { value: "b", label: "Process requests/responses" },
      { value: "c", label: "Create database queries" },
      { value: "d", label: "Design UI" },
    ],
    correctOption: "b",
    explanation:
      "Middleware intercepts and processes requests/responses, handling tasks like authentication, logging, and error handling.",
  },
  {
    id: "backend-3",
    domain: "Backend Development",
    difficulty: "advanced",
    prompt: "What is the difference between stateless and stateful architectures?",
    options: [
      { value: "a", label: "Stateless is always faster" },
      { value: "b", label: "Stateful maintains state; stateless doesn't" },
      { value: "c", label: "They are the same" },
      { value: "d", label: "Stateless requires more memory" },
    ],
    correctOption: "b",
    explanation:
      "Stateless architectures don't store client context, enabling better scalability; stateful architectures maintain client state.",
  },

  // Cloud Computing
  {
    id: "cloud-1",
    domain: "Cloud Computing",
    difficulty: "beginner",
    prompt: "What is the difference between IaaS, PaaS, and SaaS?",
    options: [
      { value: "a", label: "They are the same" },
      { value: "b", label: "Different levels of cloud service abstraction" },
      { value: "c", label: "Only different in pricing" },
      { value: "d", label: "IaaS is always best" },
    ],
    correctOption: "b",
    explanation:
      "IaaS provides infrastructure, PaaS provides development platforms, and SaaS provides fully managed applications.",
  },
  {
    id: "cloud-2",
    domain: "Cloud Computing",
    difficulty: "intermediate",
    prompt: "What is cloud scalability?",
    options: [
      { value: "a", label: "Reducing cloud costs" },
      { value: "b", label: "Ability to increase resources as demand grows" },
      { value: "c", label: "Moving to another cloud provider" },
      { value: "d", label: "Deleting unused data" },
    ],
    correctOption: "b",
    explanation:
      "Scalability is the ability to automatically increase resources (horizontal or vertical) to handle increased load.",
  },
  {
    id: "cloud-3",
    domain: "Cloud Computing",
    difficulty: "advanced",
    prompt:
      "What is the primary advantage of multi-cloud strategy in enterprise?",
    options: [
      { value: "a", label: "Always faster" },
      { value: "b", label: "Reduces vendor lock-in and improves resilience" },
      { value: "c", label: "Always cheaper" },
      { value: "d", label: "Eliminates security concerns" },
    ],
    correctOption: "b",
    explanation:
      "Multi-cloud strategy reduces dependency on a single vendor, improves disaster recovery, and provides flexibility.",
  },
];
