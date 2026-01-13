// src/app/page.tsx
import type { ReactNode } from "react";

type Link = { label: string; href: string };

type Project = {
  title: string;
  description: string;
  highlights: string[];
  tags: string[];
  links?: Link[];
};

type SkillGroup = {
  group: string;
  items: string[];
};

type Experience = {
  role: string;
  company: string;
  location?: string;
  start: string;
  end: string;
  bullets: string[];
  links?: Link[];
};

const PROFILE = {
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
    projectRepo: "https://github.com/Nnikith/CrewAi-Interview-Prep",
    linkedin: "https://www.linkedin.com/in/your-username", // TODO: replace with your real LinkedIn URL
    resume: "/resume.pdf", // TODO: add public/resume.pdf (optional)
  },
};

const projects: Project[] = [
  {
    title: "CrewAi Interview Prep",
    description:
      "Backend interview prep tooling built in Python, focused on modular service design, algorithmic problem generation, and scalable execution patterns.",
    highlights: [
      "Modular backend structure designed for extension and iteration",
      "Emphasis on correctness and performance-oriented problem workflows",
      "Repository-first delivery with clean developer ergonomics",
    ],
    tags: ["Python", "Backend", "Modular Design"],
    links: [{ label: "GitHub", href: PROFILE.links.projectRepo }],
  },
  {
    title: "Near Real-time Analytics Pipelines (AWS + Spark)",
    description:
      "Scalable pipeline architecture for processing multi-terabyte daily datasets with reliable orchestration and data quality controls.",
    highlights: [
      "Spark + AWS Glue processing for 10+ TB/day workloads",
      "Airflow orchestration with retries, monitoring, and failure handling",
      "Query optimization + resource tuning to reduce compute cost by ~30%",
    ],
    tags: ["AWS", "Spark", "Glue", "Airflow", "Redshift"],
    links: [{ label: "GitHub", href: PROFILE.links.github }],
  },
  {
    title: "Real-time Streaming Pipelines (Kafka + Python)",
    description:
      "Event ingestion and streaming processing patterns for high-volume application telemetry and downstream consumption.",
    highlights: [
      "Kafka-based ingestion for high-throughput event streams",
      "Backend ingestion integrating APIs, SFTP feeds, and databases",
      "Operational focus: resiliency, stability, and repeatable runs",
    ],
    tags: ["Kafka", "Python", "Streaming", "ETL"],
    links: [{ label: "GitHub", href: PROFILE.links.github }],
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
    tags: ["Neural Networks", "Pattern Recognition", "Research"],
  },
];

const skills: SkillGroup[] = [
  {
    group: "Programming",
    items: ["Python (Pandas, NumPy)", "Scala", "Java", "Shell Scripting", "R"],
  },
  {
    group: "Big Data & Streaming",
    items: ["Apache Spark", "Kafka", "Flink", "Hadoop", "Hive", "Pig"],
  },
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
  {
    group: "ETL & Orchestration",
    items: ["Apache Airflow", "Prefect", "Talend", "Informatica", "AWS Glue"],
  },
  {
    group: "Engineering Practices",
    items: ["System design", "Schema design", "Indexing & query optimization", "Git"],
  },
];

const experience: Experience[] = [
  {
    role: "Software Development Engineer",
    company: "AMEX",
    location: "New York, NY",
    start: "Dec 2024",
    end: "Present",
    bullets: [
      "Designed and implemented backend data services using Apache Spark and AWS Glue to process 10+ TB/day, supporting near real-time analytics and downstream applications.",
      "Built and maintained cloud-native services on AWS with reliability, fault tolerance, and performance for high-volume workloads.",
      "Developed optimized schemas and storage strategies in AWS Redshift to enable fast queries and efficient access patterns.",
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
      "Migrated legacy on-prem systems to AWS cloud architectures to improve scalability, resilience, and operational efficiency.",
      "Designed and optimized database schemas, stored procedures, and queries in PostgreSQL for production systems.",
      "Automated workflows and system jobs using Python and shell scripting, reducing manual effort and improving reliability.",
    ],
  },
];

const certifications: string[] = [
  "AWS Certified Cloud Practitioner",
  "AWS Certified Solutions Architect – Associate",
  "AWS Certified Data Engineer – Associate (In Progress)",
];

const education: { school: string; detail: string; years: string }[] = [
  { school: "Webster State University", detail: "Masters", years: "2023 – 2024" },
  { school: "Anna University – MIT Campus", detail: "Bachelors", years: "2016 – 2020" },
];

function Container({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6 py-10 md:py-16">{children}</div>;
}

function Section({
  id,
  title,
  eyebrow,
  children,
}: {
  id: string;
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8">
        {eyebrow ? (
          <p className="text-sm font-medium tracking-wide text-zinc-400">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50">{title}</h2>
        <div className="mt-3 h-px w-full bg-zinc-800" />
      </div>
      {children}
    </section>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900/60 px-3 py-1 text-xs text-zinc-300">
      {children}
    </span>
  );
}

function Dot() {
  return <span className="text-zinc-700">/</span>;
}

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-200 underline decoration-zinc-700 underline-offset-4 hover:text-white hover:decoration-zinc-400"
    >
      {children}
      <span aria-hidden className="text-zinc-500">
        ↗
      </span>
    </a>
  );
}

function Card({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6">{children}</div>;
}

function BadgeRow({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((t) => (
        <Pill key={t}>{t}</Pill>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <Container>
        {/* Top nav */}
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-800 bg-zinc-900/60">
              <span className="text-sm font-semibold text-zinc-200">NN</span>
            </div>
            <div>
              <p className="text-sm text-zinc-400">{PROFILE.role}</p>
              <h1 className="text-lg font-semibold tracking-tight text-zinc-50">{PROFILE.name}</h1>
            </div>
          </div>

          <nav className="flex flex-wrap gap-3 text-sm text-zinc-300">
            <a className="hover:text-white" href="#projects">Projects</a>
            <Dot />
            <a className="hover:text-white" href="#skills">Skills</a>
            <Dot />
            <a className="hover:text-white" href="#experience">Experience</a>
            <Dot />
            <a className="hover:text-white" href="#education">Education</a>
            <Dot />
            <a className="hover:text-white" href="#contact">Contact</a>
            <Dot />
            <a className="hover:text-white" href="/timeline">Timeline</a>
          </nav>
        </header>

        {/* Hero */}
        <section className="mt-12 rounded-3xl border border-zinc-800 bg-gradient-to-b from-zinc-900/40 to-zinc-950 p-8 md:p-12">
          <p className="text-sm font-medium text-zinc-400">{PROFILE.headline}</p>

          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            Backend engineering, streaming, and data platforms on AWS.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300">{PROFILE.summary}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#projects"
              className="inline-flex w-fit items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 hover:bg-zinc-200"
            >
              View projects
            </a>

            <a
              href="#contact"
              className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
            >
              Contact
            </a>

            <a
              href="/timeline"
              className="inline-flex w-fit items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/40 px-5 py-3 text-sm font-semibold text-zinc-100 hover:bg-zinc-900"
            >
              Timeline template
            </a>

            <div className="flex flex-wrap gap-2 sm:ml-auto">
              <Pill>Open to work</Pill>
              <Pill>{PROFILE.location}</Pill>
              <Pill>AWS • Spark • Kafka • Airflow</Pill>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-zinc-300">
            <TextLink href={PROFILE.links.github}>GitHub</TextLink>
            <TextLink href={PROFILE.links.linkedin}>LinkedIn</TextLink>
            <TextLink href={PROFILE.links.projectRepo}>Featured repo</TextLink>
            <TextLink href={PROFILE.links.resume}>Resume</TextLink>
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            TODO: update LinkedIn + optionally add <code className="rounded bg-zinc-900 px-1 py-0.5">public/resume.pdf</code>.
          </p>
        </section>

        <div className="mt-14 grid gap-14">
          {/* Projects */}
          <Section id="projects" title="Projects" eyebrow="Selected work">
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p) => (
                <article
                  key={p.title}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-6 hover:bg-zinc-900/30"
                >
                  <h3 className="text-lg font-semibold text-zinc-50">{p.title}</h3>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">{p.description}</p>

                  <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                    {p.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-zinc-600" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>

                  {p.links && p.links.length > 0 ? (
                    <div className="mt-5 flex flex-wrap gap-4">
                      {p.links.map((l) => (
                        <TextLink key={l.href} href={l.href}>
                          {l.label}
                        </TextLink>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </Section>

          {/* Skills */}
          <Section id="skills" title="Skills" eyebrow="Technical depth">
            <div className="grid gap-6 md:grid-cols-2">
              {skills.map((s) => (
                <Card key={s.group}>
                  <h3 className="text-sm font-semibold text-zinc-50">{s.group}</h3>
                  <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-2">
                    {s.items.map((i) => (
                      <li key={i} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-zinc-600" />
                        <span>{i}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          {/* Experience */}
          <Section id="experience" title="Experience" eyebrow="Professional experience">
            <div className="space-y-6">
              {experience.map((e) => (
                <Card key={`${e.company}-${e.role}`}>
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-50">
                        {e.role} · {e.company}
                      </h3>
                      {e.location ? <p className="text-sm text-zinc-400">{e.location}</p> : null}
                    </div>
                    <p className="text-sm text-zinc-400">
                      {e.start} — {e.end}
                    </p>
                  </div>

                  <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                    {e.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-zinc-600" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </Section>

          {/* Certifications */}
          <Section id="certifications" title="Certifications" eyebrow="AWS credentials">
            <Card>
              <BadgeRow items={certifications} />
            </Card>
          </Section>

          {/* Education */}
          <Section id="education" title="Education" eyebrow="Academic background">
            <div className="grid gap-6 md:grid-cols-2">
              {education.map((ed) => (
                <Card key={ed.school}>
                  <h3 className="text-base font-semibold text-zinc-50">{ed.school}</h3>
                  <p className="mt-2 text-sm text-zinc-300">{ed.detail}</p>
                  <p className="mt-1 text-sm text-zinc-400">{ed.years}</p>
                </Card>
              ))}
            </div>
          </Section>

          {/* Contact */}
          <Section id="contact" title="Contact" eyebrow="Let’s connect">
            <Card>
              <p className="text-sm leading-relaxed text-zinc-300">
                Best way to reach me is email. Happy to share details, walk through projects, or discuss backend/data platform work.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <p className="text-xs font-medium text-zinc-400">Email</p>
                  <a
                    className="mt-1 block text-sm font-semibold text-zinc-50 underline decoration-zinc-700 underline-offset-4 hover:decoration-zinc-400"
                    href={`mailto:${PROFILE.email}`}
                  >
                    {PROFILE.email}
                  </a>
                  <p className="mt-2 text-xs text-zinc-500">{PROFILE.phone}</p>
                </div>

                <div className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-4">
                  <p className="text-xs font-medium text-zinc-400">Links</p>
                  <p className="mt-2 flex flex-wrap gap-4">
                    <TextLink href={PROFILE.links.github}>GitHub</TextLink>
                    <TextLink href={PROFILE.links.linkedin}>LinkedIn</TextLink>
                    <TextLink href={PROFILE.links.projectRepo}>Featured repo</TextLink>
                    <TextLink href="/timeline">Timeline</TextLink>
                  </p>
                </div>
              </div>

              <p className="mt-6 text-xs text-zinc-500">
                Publication: “Handwriting Text Recognition Using Neural Networks” (Sep 2022) — DOI: 10.56726/IRJMETS29660
              </p>
            </Card>
          </Section>
        </div>

        <footer className="mt-16 border-t border-zinc-900 pt-8 text-xs text-zinc-500">
          <p>
            © {new Date().getFullYear()} {PROFILE.name}. Built with Next.js, TypeScript, and Tailwind.
          </p>
        </footer>
      </Container>
    </main>
  );
}
