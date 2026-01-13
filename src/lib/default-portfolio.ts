// src/lib/default-portfolio.ts
import type { PortfolioData } from "./portfolio-schema";

export const DEFAULT_PORTFOLIO: PortfolioData = {
  profile: {
    name: "Nikith Neelisetty",
    role: "Software Development Engineer / Data Engineer",
    location: "New York, NY",
    email: "neelisettynikith7@gmail.com",
    phone: "516 331 0979",
    headline: "Cloud-native backend + distributed data platforms on AWS.",
    summary:
      "Software Development Engineer with 4+ years building scalable backend systems and distributed data platforms on AWS. Experienced in high-throughput pipelines, real-time streaming, and production-ready services with strong system design fundamentals.",
    links: {
      github: "https://github.com/Nnikith",
      linkedin: "https://www.linkedin.com/in/your-linkedin", // TODO
      featuredRepo: "https://github.com/Nnikith/CrewAi-Interview-Prep",
      resume: "/resume.pdf",
    },
  },

  techTicker: [
    "AWS",
    "Apache Spark",
    "Kafka",
    "Airflow",
    "Glue",
    "Redshift",
    "Python",
    "SQL",
    "Flink",
    "Lakehouse",
    "System Design",
    "Data Quality",
  ],

  projects: [
    {
      title: "CrewAI Interview Prep",
      description:
        "Backend interview prep tooling in Python, focused on modular service design and scalable execution patterns.",
      highlights: [
        "Modular backend structure designed for extension and iteration",
        "Emphasis on correctness and performance-oriented workflows",
        "Repository-first delivery with clean developer ergonomics",
      ],
      tags: ["Python", "Backend", "Modular Design"],
      links: [{ label: "GitHub", href: "https://github.com/Nnikith/CrewAi-Interview-Prep" }],
    },
    {
      title: "Near Real-time Analytics Pipelines (AWS + Spark)",
      description:
        "Scalable pipeline architecture for processing multi-terabyte daily datasets with reliable orchestration and data quality controls.",
      highlights: [
        "Spark + AWS Glue processing for 10+ TB/day workloads",
        "Airflow orchestration with retries, monitoring, and failure handling",
        "Reduced compute cost by ~30% via query optimization and tuning",
      ],
      tags: ["AWS", "Spark", "Glue", "Airflow", "Redshift"],
      links: [{ label: "GitHub", href: "https://github.com/Nnikith" }],
    },
    {
      title: "Real-time Streaming Pipelines (Kafka + Python)",
      description:
        "Event ingestion and streaming processing patterns for high-volume telemetry and downstream consumption.",
      highlights: [
        "Kafka-based ingestion for high-throughput event streams",
        "Backend ingestion integrating APIs, SFTP feeds, and databases",
        "Operational focus: resiliency, stability, and repeatable runs",
      ],
      tags: ["Kafka", "Python", "Streaming", "ETL"],
      links: [{ label: "GitHub", href: "https://github.com/Nnikith" }],
    },
    {
      title: "Handwriting Text Recognition Research (Neural Networks)",
      description:
        "Published work on handwriting text recognition using neural-network-based pattern recognition techniques.",
      highlights: [
        "International Research Journal publication (Sep 2022)",
        "Neural-network approach to text recognition",
        "DOI: 10.56726/IRJMETS29660",
      ],
      tags: ["Neural Networks", "Research"],
    },
  ],

  skills: [
    {
      group: "Programming",
      items: ["Python (Pandas, NumPy)", "Scala", "Java", "Shell Scripting", "R"],
    },
    { group: "Big Data & Streaming", items: ["Apache Spark", "Kafka", "Flink", "Hadoop", "Hive", "Pig"] },
    {
      group: "Cloud",
      items: [
        "AWS (S3, EC2, Lambda, Glue, Redshift, Kinesis)",
        "Azure (Data Factory, Synapse)",
        "GCP (BigQuery, Dataflow)",
      ],
    },
    {
      group: "Databases & Warehousing",
      items: [
        "Advanced SQL",
        "PostgreSQL",
        "MySQL",
        "SQL Server",
        "MongoDB",
        "Cassandra",
        "Dimensional Modeling (Kimball)",
        "Lakehouse architecture",
      ],
    },
    { group: "ETL & Orchestration", items: ["Apache Airflow", "Prefect", "Talend", "Informatica", "AWS Glue"] },
    { group: "Engineering Practices", items: ["System design", "Schema design", "Indexing & query optimization", "Git"] },
  ],

  experience: [
    {
      role: "Software Development Engineer",
      company: "AMEX",
      location: "New York, NY",
      start: "Dec 2024",
      end: "Present",
      bullets: [
        "Designed and implemented backend data services using Apache Spark and AWS Glue to process 10+ TB/day, supporting near real-time analytics and downstream applications.",
        "Built cloud-native services on AWS with reliability, fault tolerance, and performance for high-volume workloads.",
        "Developed optimized schemas and storage strategies in AWS Redshift for fast queries and efficient access patterns.",
        "Orchestrated distributed workflows using Apache Airflow with retries, monitoring, and failure handling for production stability.",
        "Improved system performance and reduced compute costs by ~30% through query optimization, parallel processing, and resource tuning.",
        "Implemented data validation and quality frameworks to ensure correctness and consistency across large-scale pipelines.",
      ],
    },
    {
      role: "Software Engineer",
      company: "KPMG",
      location: "India",
      start: "Jan 2020",
      end: "Dec 2022",
      bullets: [
        "Built real-time streaming pipelines using Apache Kafka and Python to ingest and process high-volume application events.",
        "Developed backend ingestion services integrating APIs, SFTP feeds, and databases for scalable delivery.",
        "Migrated legacy on-prem systems to AWS architectures to improve scalability and operational efficiency.",
        "Designed and optimized database schemas, stored procedures, and queries in PostgreSQL for production systems.",
        "Automated workflows and system jobs using Python and shell scripting, reducing manual effort and improving reliability.",
      ],
    },
  ],

  certifications: [
    "AWS Certified Cloud Practitioner",
    "AWS Certified Solutions Architect – Associate",
    "AWS Certified Data Engineer – Associate (In Progress)",
  ],

  education: [
    { school: "Webster State University", detail: "Masters", years: "2023 – 2024" },
    { school: "Anna University – MIT Campus", detail: "Bachelors", years: "2016 – 2020" },
  ],
};
