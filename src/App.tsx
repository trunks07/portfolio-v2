import { useState, useEffect, useRef } from 'react'

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact']

const SKILLS: { category: string; items: string[] }[] = [
  {
    category: 'Generative AI & Agentic AI',
    items: ['RAG', 'Agentic AI', 'AI Agents', 'OpenAI API', 'LLM Integration', 'LangChain', 'LangGraph', 'Prompt Engineering', 'MongoDB Vector Search', 'Semantic Search'],
  },
  {
    category: 'Backend Development',
    items: ['Python', 'FastAPI', 'PHP', 'Laravel', 'Django', 'REST APIs'],
  },
  {
    category: 'Cloud & DevOps',
    items: ['AWS Serverless', 'Amazon Lambda', 'Amazon API Gateway', 'AWS Bref', 'CI/CD', 'AWS Well-Architected', 'AWS DataSync', 'AWS Data Migration'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'Architecture & Leadership',
    items: ['Microservices', 'Distributed Systems', 'System Design', 'API Integration', 'Workflow Automation', 'Agile/Scrum', 'Team Leadership', 'Stakeholder Management'],
  },
  {
    category: 'Frontend',
    items: ['ReactJS', 'Vue.js', 'Angular', 'jQuery', 'JavaScript'],
  },
]

const PROJECTS: {
  name: string
  role: string
  type: string
  url?: string
  description: string
  responsibilities: string[]
  stack: string[]
}[] = [
    {
      name: 'AI-Powered E-Commerce Platform',
      role: 'Software Development Manager / AI Engineer',
      type: 'AI / E-Commerce',
      url: 'https://www.universalstatues.com',
      description:
        'Designed and developed an AI-powered e-commerce platform for Universal Statues combining customer support, marketing automation, and AI-generated content into a unified cloud-native ecosystem. Multiple serverless AI microservices handle customer interactions, automated marketing campaigns, social media content generation, and knowledge retrieval.',
      responsibilities: [
        'Designed the overall cloud-native AI architecture',
        'Built a context-aware AI chatbot using LangChain and LangGraph',
        'Implemented RAG pipelines using MongoDB Atlas Vector Search',
        'Developed FastAPI serverless microservices deployed on AWS Lambda',
        'Monitored AI workflows using LangSmith',
        'Integrated OpenAI and Google AI Studio',
        'Designed reusable AI orchestration workflows',
      ],
      stack: ['Python', 'FastAPI', 'AWS Lambda', 'AWS SAM', 'API Gateway', 'LangChain', 'LangGraph', 'LangSmith', 'MongoDB Atlas Vector Search', 'OpenAI API', 'Google AI Studio', 'VoyageAI'],
    },
    {
      name: 'AI Marketing Automation Microservice',
      role: 'Software Development Manager / AI Engineer',
      type: 'Agentic AI',
      description:
        'Autonomous AI Marketing Agent that automatically creates personalized customer follow-up campaigns and integrates directly with Zoho Campaigns. Operates independently as an AWS Lambda microservice triggered by Amazon EventBridge Scheduler.',
      responsibilities: [
        'Built AI workflows for personalized email generation',
        'Integrated directly with Zoho Campaigns API',
        'Automated campaign creation and scheduling',
        'Generated production-ready HTML emails using LLMs',
        'Designed autonomous serverless microservices',
        'Implemented scheduled execution using Amazon EventBridge',
      ],
      stack: ['FastAPI', 'OpenAI API', 'Zoho Campaign API', 'AWS Lambda', 'Amazon EventBridge', 'LangGraph'],
    },
    {
      name: 'AI Social Media Marketing Agent',
      role: 'Software Development Manager / AI Engineer',
      type: 'Agentic AI',
      description:
        'AI-powered social media automation platform that generates promotional content and publishes posts automatically. Retrieves product information through RAG pipelines before generating captions, marketing images, and promotional videos using Google Veo 3.',
      responsibilities: [
        'Designed AI social media workflows',
        'Generated marketing captions using LLMs',
        'Generated AI-assisted marketing images',
        'Created promotional videos using Google Veo 3',
        'Built reusable LangGraph orchestration pipelines',
        'Automated publishing workflows',
      ],
      stack: ['Google AI Studio', 'Google Veo 3', 'OpenAI', 'LangGraph', 'FastAPI', 'AWS Lambda', 'MongoDB Atlas Vector Search'],
    },
    {
      name: 'Enterprise AI Chatbot',
      role: 'Software Development Manager / AI Engineer',
      type: 'RAG / GenAI',
      description:
        'Production AI chatbot for Universal Statues that answers customer inquiries using internal company knowledge instead of generic LLM responses. A RAG architecture retrieves relevant company knowledge before generating responses, significantly improving accuracy while reducing hallucinations.',
      responsibilities: [
        'Designed document ingestion pipelines',
        'Built Retrieval-Augmented Generation (RAG) architecture',
        'Implemented MongoDB Atlas Vector Search',
        'Improved prompt engineering for higher response quality',
        'Reduced hallucinations using internal knowledge retrieval',
        'Monitored AI traces using LangSmith',
      ],
      stack: ['LangChain', 'LangGraph', 'MongoDB Atlas Vector Search', 'VoyageAI', 'OpenAI API', 'LangSmith'],
    },
    {
      name: 'Legacy System Modernization',
      role: 'Software Development Manager',
      type: 'Cloud Migration',
      description:
        'Led the modernization of an internal factory operations system by migrating a monolithic on-premise application into multiple cloud-native microservices. The original system became unusable during peak production due to hundreds of concurrent users competing for shared resources.',
      responsibilities: [
        'Designed microservice architecture for department-specific services (Casting, Detailing, Assembly)',
        'Migrated monolithic applications into independent services',
        'Developed REST APIs using FastAPI',
        'Deployed workloads to AWS Lambda with AWS SAM pipelines',
        'Migrated database to MongoDB Atlas',
      ],
      stack: ['FastAPI', 'AWS Lambda', 'AWS SAM', 'API Gateway', 'Docker', 'MongoDB Atlas'],
    },
    {
      name: 'Marketplace Integration Platform',
      role: 'Software Development Manager / API Engineer',
      type: 'API Integration',
      description:
        'Cloud-native integration platform that synchronizes inventory and orders between Microsoft Dynamics 365 Business Central and multiple online marketplaces — Shopify, Walmart, and eBay. Eliminates cross-channel sync issues and reduces operational overhead.',
      responsibilities: [
        'Integrated Microsoft Dynamics 365 Business Central',
        'Built Shopify, Walmart Marketplace, and eBay integrations',
        'Developed automated inventory and pricing synchronization',
        'Built product management APIs',
      ],
      stack: ['Python', 'FastAPI', 'REST APIs', 'OAuth', 'AWS Lambda', 'API Gateway', 'MongoDB', 'MySQL'],
    },
    {
      name: 'AI Email Generation Engine',
      role: 'AI Engineer',
      type: 'Generative AI',
      description:
        "The company's first AI-powered email generation platform, still in production for automated lead nurturing and account creation follow-ups. A multi-stage workflow plans email structure before generating production-ready HTML using LLMs. Later served as the foundation for the AI Marketing Agent.",
      responsibilities: [
        'Designed multi-step LangGraph workflows',
        'Built AI planning stages for email structure',
        'Generated production-ready HTML emails using LLMs',
        'Improved prompts for layout consistency',
        'Automated customer follow-up campaigns',
      ],
      stack: ['LangGraph', 'LangChain', 'OpenAI API', 'FastAPI'],
    },
    {
      name: 'Internal AI RAG Knowledge Platform',
      role: 'AI Engineer',
      type: 'RAG / Enterprise',
      description:
        "RAG platform integrated into the company's HR Information System (HRIS) to assist HR personnel in interpreting company policies and recommending disciplinary actions. The AI provides recommendations rather than making autonomous decisions, keeping humans in the loop.",
      responsibilities: [
        'Built AWS S3 document ingestion pipelines',
        'Implemented metadata filtering and document chunking strategies',
        'Generated vector embeddings',
        'Built similarity search using MongoDB Atlas Vector Search',
        'Evaluated AI responses using LangSmith',
      ],
      stack: ['AWS S3', 'LangChain', 'LangGraph', 'MongoDB Atlas Vector Search', 'VoyageAI', 'OpenAI API', 'LangSmith'],
    },
  ]

const EXPERIENCE = [
  {
    title: 'Software Development Manager',
    company: 'MK Themed Attractions Philippines',
    location: 'Angeles, Pampanga',
    period: 'Dec 2024 — Present',
    highlights: [
      'Led cross-functional team (2 Frontend, 2 Backend, 1 QA) using Agile/Scrum, modernising legacy monolithic systems into distributed microservices using FastAPI (Python) and Laravel (PHP).',
      'Architected a production-grade GenAI RAG platform integrating OpenAI LLMs and MongoDB Vector Search — implementing embedding generation, vector indexing, and semantic search to automate factory data analysis and material consumption auditing.',
      'Built and orchestrated Agentic AI workflows using LangChain and LangGraph automating e-commerce client onboarding and follow-ups, reducing manual customer service workloads by ~70%.',
      'Developed an AI-powered marketing agent system generating interactive brochures and automating outbound email campaigns to 127,000+ leads using LangChain, LangGraph, and Zoho integration.',
      'Spearheaded AWS Serverless cloud modernisation using Bref, migrating a legacy on-premise application (~300 concurrent users) reducing infrastructure costs to ~USD 30/month.',
      'Aligned technical roadmaps with business objectives through stakeholder management; mentored engineers via architectural reviews and technical guidance.',
    ],
  },
  {
    title: 'API and Automation Specialist',
    company: 'MK Themed Attractions Philippines',
    location: 'Angeles, Pampanga',
    period: 'Aug 2024 — Dec 2024',
    highlights: [
      'Designed API-driven automation solutions integrating multiple platforms into a centralised SaaS ecosystem, streamlining sales and operational workflows.',
      'Developed scalable FastAPI backend services orchestrating ERP, e-commerce, and external partner API workflows with resilient error handling, retry mechanisms, and monitoring.',
      'Implemented automated data exchange pipelines synchronising customers, orders, inventory, and operational records between disparate systems.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Temarotech',
    location: 'Makati, Philippines',
    period: 'Jan 2024 — Aug 2024',
    highlights: [
      'Developed and maintained Laravel (PHP) web applications with Vue.js, JavaScript, and jQuery front-end interfaces.',
      'Debugged legacy codebases and maintained stability of core database operations (MySQL, PostgreSQL).',
    ],
  },
  {
    title: 'Lead Web Developer',
    company: 'GOCLOUD Inc.',
    location: 'San Fernando, Pampanga',
    period: 'May 2019 — Jan 2024',
    highlights: [
      'Led Agile engineering team delivering enterprise web applications including e-commerce platforms, school management systems, and hospital information systems.',
      'Architected scalable backend microservices using Python and PHP; guided AWS cloud deployments ensuring environment stability and cost-effective resource allocation.',
      'Mentored junior and mid-level developers through code reviews, workshops, and pair programming; served as technical liaison between stakeholders and development team.',
    ],
  },
]

const EDUCATION = {
  degree: 'Bachelor of Science in Information Systems',
  school: 'La Verdad Christian College',
  location: 'Apalit, Pampanga',
  period: '2015 — 2019',
}

const CERTIFICATIONS: { issuer: string; items: { name: string; date: string }[] }[] = [
  {
    issuer: 'Amazon Web Services (AWS)',
    items: [
      { name: 'AWS Well-Architected Proficient', date: 'Jun 2026' },
      { name: 'Serverless – Training Badge', date: 'Jun 2026' },
      { name: 'Amazon ECS – Training Badge', date: 'Jun 2026' },
      { name: 'Amazon EKS – Training Badge', date: 'Jun 2026' },
      { name: 'Data Migration – Training Badge', date: 'Jun 2026' },
    ],
  },
  {
    issuer: 'MongoDB',
    items: [
      { name: 'Building AI Agents with MongoDB', date: 'Jun 2026' },
      { name: 'Building RAG Apps Using MongoDB', date: 'Jun 2026' },
    ],
  },
  {
    issuer: 'LangChain Academy',
    items: [
      { name: 'LangChain Essentials – Python', date: 'Jun 2026' },
      { name: 'LangGraph Essentials – Python', date: 'Jun 2026' },
    ],
  },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY + 100
      let current = ''
      for (const id of ids) {
        const el = document.getElementById(id.toLowerCase())
        if (el && el.offsetTop <= scrollY) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [ids])
  return active
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint)
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < breakpoint)
    window.addEventListener('resize', handler, { passive: true })
    return () => window.removeEventListener('resize', handler)
  }, [breakpoint])
  return isMobile
}

// ─── Components ──────────────────────────────────────────────────────────────

function Nav({ active }: { active: string }) {
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          borderBottom: '1px solid var(--border)',
          backgroundColor: 'rgba(7,11,16,0.92)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            padding: '0 24px',
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="#"
            className="mono"
            style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, letterSpacing: '0.04em' }}
          >
            carlo.guevarra
          </a>

          {isMobile ? (
            /* Hamburger button */
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                background: 'none',
                border: '1px solid var(--border)',
                borderRadius: 4,
                padding: '6px 10px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                /* X icon */
                <span className="mono" style={{ color: 'var(--primary)', fontSize: 16, lineHeight: 1, display: 'block', width: 18, textAlign: 'center' }}>✕</span>
              ) : (
                /* Hamburger lines */
                [0, 1, 2].map((i) => (
                  <span key={i} style={{ display: 'block', width: 18, height: 2, backgroundColor: 'var(--foreground)', borderRadius: 1 }} />
                ))
              )}
            </button>
          ) : (
            <>
              {/* Desktop nav links */}
              <nav style={{ display: 'flex', gap: 32 }}>
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="mono"
                    style={{
                      color: active === link ? 'var(--primary)' : 'var(--secondary-foreground)',
                      textDecoration: 'none',
                      fontSize: 12,
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => { if (active !== link) (e.target as HTMLElement).style.color = 'var(--foreground)' }}
                    onMouseLeave={(e) => { if (active !== link) (e.target as HTMLElement).style.color = 'var(--secondary-foreground)' }}
                  >
                    {link.toUpperCase()}
                  </a>
                ))}
              </nav>

              <a
                href="mailto:carloguevarra454@gmail.com"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  padding: '6px 16px',
                  borderRadius: 'var(--radius)',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              >
                Hire Me
              </a>
            </>
          )}
        </div>
      </header>

      {/* Mobile drawer */}
      {isMobile && (
        <div
          style={{
            position: 'fixed',
            top: 56,
            left: 0,
            right: 0,
            zIndex: 49,
            backgroundColor: 'rgba(7,11,16,0.98)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--border)',
            maxHeight: menuOpen ? 480 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.3s ease',
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column', padding: '8px 24px 24px' }}>
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={closeMenu}
                className="mono"
                style={{
                  color: active === link ? 'var(--primary)' : 'var(--foreground)',
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                  transition: 'color 0.2s',
                }}
              >
                {link.toUpperCase()}
              </a>
            ))}
            <a
              href="mailto:carloguevarra454@gmail.com"
              onClick={closeMenu}
              style={{
                display: 'inline-block',
                marginTop: 20,
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                padding: '12px 24px',
                borderRadius: 'var(--radius)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </>
  )
}

function Hero() {
  const isMobile = useIsMobile()
  const roles = [
    'Senior Backend Engineer',
    'Software Development Manager',
    'AI Systems Architect',
    'API Integration Specialist',
    'Cloud-Native Developer',
  ]
  const [roleIdx, setRoleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const current = roles[roleIdx]
    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55)
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIdx((i) => (i + 1) % roles.length)
    }
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [displayed, deleting, roleIdx])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: isMobile ? '96px 20px 64px' : '120px 24px 80px',
        maxWidth: 1100,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <p
          className="mono fade-in-up fade-in-up-1"
          style={{
            color: 'var(--primary)',
            fontSize: 13,
            letterSpacing: '0.12em',
            marginBottom: 20,
            margin: '0 0 20px',
          }}
        >
          {'> hello, I am'}
        </p>

        <h1
          className="fade-in-up fade-in-up-2"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.03em',
            margin: '0 0 16px',
            color: 'var(--foreground)',
          }}
        >
          Carlo
          <br />
          <span style={{ color: 'var(--primary)' }}>Guevarra</span>
        </h1>

        <div
          className="mono fade-in-up fade-in-up-3"
          style={{
            fontSize: 'clamp(16px, 2.5vw, 24px)',
            color: 'var(--secondary-foreground)',
            marginBottom: 32,
            minHeight: '1.5em',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <span style={{ color: 'var(--foreground)' }}>{displayed}</span>
          <span
            className="cursor-blink"
            style={{
              display: 'inline-block',
              width: 2,
              height: '1.2em',
              backgroundColor: 'var(--primary)',
              borderRadius: 1,
            }}
          />
        </div>

        <p
          className="fade-in-up fade-in-up-4"
          style={{
            fontSize: 16,
            lineHeight: 1.75,
            color: 'var(--secondary-foreground)',
            maxWidth: 560,
            margin: '0 0 48px',
          }}
        >
          7+ years building backend systems, enterprise integrations, and cloud-native applications.
          Recent focus on Generative AI — RAG platforms, LLM integration, and Agentic AI workflows.
        </p>

        <div
          className="fade-in-up fade-in-up-4"
          style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              padding: '12px 28px',
              borderRadius: 'var(--radius)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            View Work
          </a>
          <a
            href="/files/CV.pdf"
            target="_blank"
            rel="noreferrer"
            style={{
              border: '1px solid var(--border)',
              color: 'var(--foreground)',
              padding: '12px 28px',
              borderRadius: 'var(--radius)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.target as HTMLElement
              el.style.borderColor = 'var(--primary)'
              el.style.color = 'var(--primary)'
            }}
            onMouseLeave={(e) => {
              const el = e.target as HTMLElement
              el.style.borderColor = 'var(--border)'
              el.style.color = 'var(--foreground)'
            }}
          >
            Download CV
          </a>
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', gap: 24, marginTop: 56 }}>
          {[
            { label: 'GitHub', href: 'https://github.com/trunks07' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/carloguevarra-58b694183' },
            { label: 'Email', href: 'mailto:carloguevarra454@gmail.com' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="mono"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: 12,
                letterSpacing: '0.08em',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--primary)')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--muted-foreground)')}
            >
              {label} ↗
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 56,
      }}
    >
      <span
        className="mono"
        style={{
          color: 'var(--primary)',
          fontSize: 12,
          letterSpacing: '0.12em',
        }}
      >
        {'//'}
      </span>
      <h2
        style={{
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--foreground)',
          margin: 0,
        }}
      >
        {children}
      </h2>
      <div
        style={{
          flex: 1,
          height: 1,
          backgroundColor: 'var(--border)',
          maxWidth: 240,
        }}
      />
    </div>
  )
}

function About() {
  const isMobile = useIsMobile()
  return (
    <section
      id="about"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '72px 20px' : '100px 24px',
      }}
    >
      <SectionLabel>About</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,1fr)',
          gap: isMobile ? 32 : 64,
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--secondary-foreground)', margin: '0 0 20px' }}>
            I'm a Senior Backend Engineer with over 7 years of experience building production systems
            across e-commerce, enterprise integrations, and cloud-native platforms. I specialize in
            designing APIs and backend architectures that scale reliably under real workloads.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--secondary-foreground)', margin: '0 0 20px' }}>
            More recently, I've been focused on Generative AI — building RAG pipelines, integrating LLMs
            into production applications, and designing Agentic AI workflows that automate complex
            business processes end-to-end.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--secondary-foreground)', margin: 0 }}>
            My toolkit centers on FastAPI and Python for high-performance APIs, Laravel for robust
            web backends, and AWS serverless infrastructure for cost-efficient, scalable deployments.
          </p>
        </div>

        {/* Terminal-style stat card */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: 0,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              backgroundColor: '#0a1420',
              borderBottom: '1px solid var(--border)',
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {['#ff5f56', '#ffbd2e', '#27c93f'].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: c }} />
            ))}
            <span className="mono" style={{ color: 'var(--muted-foreground)', fontSize: 11, marginLeft: 8 }}>
              profile.json
            </span>
          </div>
          <pre
            className="mono"
            style={{
              padding: '24px',
              margin: 0,
              fontSize: 13,
              lineHeight: 1.8,
              color: 'var(--secondary-foreground)',
              whiteSpace: 'pre-wrap',
            }}
          >
            <span style={{ color: 'var(--muted-foreground)' }}>{'{'}</span>
            {'\n'}
            {'  '}<span style={{ color: '#7cb8ff' }}>"name"</span>{': '}
            <span style={{ color: '#a8d8a8' }}>"Carlo Guevarra"</span>{',\n'}
            {'  '}<span style={{ color: '#7cb8ff' }}>"role"</span>{': '}
            <span style={{ color: '#a8d8a8' }}>"Senior Backend Engineer"</span>{',\n'}
            {'  '}<span style={{ color: '#7cb8ff' }}>"experience"</span>{': '}
            <span style={{ color: 'var(--primary)' }}>7</span>
            <span style={{ color: 'var(--secondary-foreground)' }}>{', // years\n'}</span>
            {'  '}<span style={{ color: '#7cb8ff' }}>"location"</span>{': '}
            <span style={{ color: '#a8d8a8' }}>"Philippines"</span>{',\n'}
            {'  '}<span style={{ color: '#7cb8ff' }}>"focus"</span>{': [\n'}
            {'    '}<span style={{ color: '#a8d8a8' }}>"Backend Systems"</span>{',\n'}
            {'    '}<span style={{ color: '#a8d8a8' }}>"Generative AI"</span>{',\n'}
            {'    '}<span style={{ color: '#a8d8a8' }}>"Cloud Architecture"</span>{'\n'}
            {'  '},
            {'],\n'}
            {'  '}<span style={{ color: '#7cb8ff' }}>"available"</span>{': '}
            <span style={{ color: 'var(--primary)' }}>true</span>
            {'\n'}
            <span style={{ color: 'var(--muted-foreground)' }}>{'}'}</span>
          </pre>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const isMobile = useIsMobile()
  return (
    <section
      id="skills"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '72px 20px' : '100px 24px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel>Skills</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(auto-fill, minmax(140px, 1fr))' : 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: isMobile ? 16 : 24,
        }}
      >
        {SKILLS.map((group) => (
          <div key={group.category}>
            <p
              className="mono"
              style={{
                color: 'var(--primary)',
                fontSize: 11,
                letterSpacing: '0.1em',
                margin: '0 0 14px',
                textTransform: 'uppercase',
              }}
            >
              {group.category}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {group.items.map((item) => (
                <div
                  key={item}
                  className="mono"
                  style={{
                    fontSize: 13,
                    color: 'var(--foreground)',
                    padding: '6px 12px',
                    backgroundColor: 'var(--card)',
                    border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                    transition: 'border-color 0.2s, color 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--primary)'
                    el.style.color = 'var(--primary)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget
                    el.style.borderColor = 'var(--border)'
                    el.style.color = 'var(--foreground)'
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: typeof PROJECTS[number] }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 6,
        borderLeft: '3px solid var(--primary)',
        overflow: 'hidden',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(61,255,160,0.06)' }}
      onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none' }}
    >
      <div style={{ padding: '24px 24px 20px' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: 0, lineHeight: 1.3 }}>
            {project.name}
          </h3>
          <span
            className="mono"
            style={{
              fontSize: 10,
              letterSpacing: '0.08em',
              color: 'var(--primary)',
              backgroundColor: 'rgba(61,255,160,0.08)',
              padding: '3px 8px',
              borderRadius: 3,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {project.type}
          </span>
        </div>

        {/* Role + URL */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <span className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
            {project.role}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mono"
              style={{ fontSize: 11, color: 'var(--primary)', textDecoration: 'none', opacity: 0.8, transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '1')}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '0.8')}
            >
              ↗ visit
            </a>
          )}
        </div>

        <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--secondary-foreground)', margin: '0 0 16px' }}>
          {project.description}
        </p>

        {/* Stack tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="mono"
              style={{
                fontSize: 10,
                color: 'var(--muted-foreground)',
                backgroundColor: 'var(--muted)',
                border: '1px solid var(--border)',
                padding: '2px 7px',
                borderRadius: 3,
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mono"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            fontSize: 11,
            color: 'var(--muted-foreground)',
            letterSpacing: '0.06em',
            transition: 'color 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--primary)')}
          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--muted-foreground)')}
        >
          <span style={{ display: 'inline-block', transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>▶</span>
          {expanded ? 'hide responsibilities' : 'view responsibilities'}
        </button>
      </div>

      {/* Expandable responsibilities */}
      <div
        style={{
          maxHeight: expanded ? 600 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.35s ease',
        }}
      >
        <div
          style={{
            padding: '0 24px 24px',
            borderTop: '1px solid var(--border)',
            paddingTop: 16,
          }}
        >
          <p className="mono" style={{ fontSize: 10, color: 'var(--primary)', letterSpacing: '0.1em', margin: '0 0 10px', textTransform: 'uppercase' }}>
            Responsibilities
          </p>
          <ul style={{ margin: 0, paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {project.responsibilities.map((r, i) => (
              <li key={i} style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--secondary-foreground)' }}>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Projects() {
  const isMobile = useIsMobile()
  return (
    <section
      id="projects"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '72px 20px' : '100px 24px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel>Projects</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  )
}

function Experience() {
  const [expanded, setExpanded] = useState<number | null>(null)
  const isMobile = useIsMobile()

  return (
    <section
      id="experience"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '72px 20px' : '100px 24px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel>Experience</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {EXPERIENCE.map((job, i) => (
          <div
            key={i}
            style={{
              borderLeft: '2px solid var(--border)',
              paddingLeft: 32,
              paddingBottom: i < EXPERIENCE.length - 1 ? 48 : 0,
              position: 'relative',
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: 'absolute',
                left: -6,
                top: 6,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: i === 0 ? 'var(--primary)' : 'var(--border)',
                border: '2px solid var(--background)',
                transition: 'background-color 0.2s',
              }}
            />

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                marginBottom: 16,
                cursor: 'pointer',
              }}
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div style={{ display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', flexDirection: isMobile ? 'column' : 'row', justifyContent: 'space-between', gap: isMobile ? 4 : 8 }}>
                <h3 style={{ fontSize: isMobile ? 16 : 18, fontWeight: 600, color: 'var(--foreground)', margin: 0 }}>
                  {job.title}
                </h3>
                <span
                  className="mono"
                  style={{ fontSize: 12, color: 'var(--muted-foreground)', letterSpacing: '0.04em' }}
                >
                  {job.period}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                <p className="mono" style={{ fontSize: 13, color: 'var(--primary)', margin: 0 }}>
                  {job.company} <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>· {job.location}</span>
                </p>
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'var(--muted-foreground)', userSelect: 'none' }}
                >
                  {expanded === i ? '[ collapse ]' : '[ expand ]'}
                </span>
              </div>
            </div>

            <div
              style={{
                maxHeight: expanded === i ? 400 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.35s ease',
              }}
            >
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {job.highlights.map((h, j) => (
                  <li key={j} style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--secondary-foreground)' }}>
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Education() {
  const isMobile = useIsMobile()
  return (
    <section
      id="education"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '72px 20px' : '100px 24px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel>Education & Certifications</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0,1fr) minmax(0,2fr)', gap: isMobile ? 32 : 64, alignItems: 'start' }}>

        {/* Education */}
        <div
          style={{
            backgroundColor: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 6,
            padding: '24px',
            borderLeft: '3px solid var(--primary)',
          }}
        >
          <p className="mono" style={{ fontSize: 11, color: 'var(--primary)', letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}>
            Education
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--foreground)', margin: '0 0 6px' }}>
            {EDUCATION.degree}
          </p>
          <p className="mono" style={{ fontSize: 13, color: 'var(--secondary-foreground)', margin: '0 0 4px' }}>
            {EDUCATION.school}
          </p>
          <p className="mono" style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
            {EDUCATION.location} · {EDUCATION.period}
          </p>
        </div>

        {/* Certifications */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {CERTIFICATIONS.map((group) => (
            <div key={group.issuer}>
              <p
                className="mono"
                style={{ fontSize: 11, color: 'var(--primary)', letterSpacing: '0.1em', margin: '0 0 12px', textTransform: 'uppercase' }}
              >
                {group.issuer}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.items.map((cert) => (
                  <div
                    key={cert.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '10px 16px',
                      backgroundColor: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 'var(--radius)',
                    }}
                  >
                    <span style={{ fontSize: 13, color: 'var(--foreground)' }}>{cert.name}</span>
                    <span className="mono" style={{ fontSize: 11, color: 'var(--muted-foreground)', whiteSpace: 'nowrap' }}>{cert.date}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const isMobile = useIsMobile()
  return (
    <section
      id="contact"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: isMobile ? '72px 20px 80px' : '100px 24px 120px',
        borderTop: '1px solid var(--border)',
      }}
    >
      <SectionLabel>Contact</SectionLabel>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          gap: isMobile ? 32 : 64,
          alignItems: 'start',
        }}
      >
        <div>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: 'var(--secondary-foreground)', margin: '0 0 32px' }}>
            Open to new opportunities — especially roles involving backend architecture, AI systems,
            or cloud-native development. Let's build something together.
          </p>
          <a
            href="mailto:carloguevarra454@gmail.com"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              padding: '14px 32px',
              borderRadius: 'var(--radius)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = '1')}
          >
            Send a Message ↗
          </a>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Email', value: 'carloguevarra454@gmail.com', href: 'mailto:carloguevarra454@gmail.com' },
            { label: 'Phone', value: '09427346600', href: 'tel:+639427346600' },
            { label: 'Location', value: 'Sitio Centro 2, Colgante, Apalit, Pampanga 2016', href: undefined },
            { label: 'GitHub', value: 'github.com/trunks07', href: 'https://github.com/trunks07' },
            { label: 'LinkedIn', value: 'linkedin.com/in/carloguevarra-58b694183', href: 'https://linkedin.com/in/carloguevarra-58b694183' },
          ].map(({ label, value, href }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                padding: '16px 20px',
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 6,
              }}
            >
              <span className="mono" style={{ fontSize: 11, color: 'var(--primary)', width: 60, letterSpacing: '0.06em' }}>
                {label}
              </span>
              {href ? (
                <a
                  href={href}
                  target={href.startsWith('mailto') || href.startsWith('tel') ? undefined : '_blank'}
                  rel="noreferrer"
                  style={{
                    fontSize: 13,
                    color: 'var(--secondary-foreground)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                    wordBreak: 'break-all',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--foreground)')}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--secondary-foreground)')}
                >
                  {value}
                </a>
              ) : (
                <span style={{ fontSize: 13, color: 'var(--secondary-foreground)', wordBreak: 'break-all' }}>
                  {value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        padding: '24px',
        textAlign: 'center',
      }}
    >
      <p className="mono" style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
        © {new Date().getFullYear()} Carlo Guevarra — Built with React
      </p>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const active = useScrollSpy(NAV_LINKS)

  return (
    <div style={{ backgroundColor: 'var(--background)', minHeight: '100vh' }}>
      <Nav active={active} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
