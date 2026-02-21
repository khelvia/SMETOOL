const questions = [
    {
        section: "SECTION 1: SUPPLY CHAIN & LOGISTICS FRAGMENTATION",
        questions: [
            {
                id: 1,
                title: "Question 1: Last-Mile Distribution Fragmentation",
                question: "How would you characterize your ability to reliably reach and deliver products/services to end customers across your target geography?",
                scale: {
                    1: "Multiple competing logistics networks; unpredictable delivery times (variance >40%); no single trusted distributor; forced to build parallel distribution systems",
                    2: "Partial coverage; multiple hand-offs create bottlenecks; delivery costs 2-2.5x higher than developed market baseline",
                    3: "Functional but inefficient; coverage gaps in secondary/tertiary markets; requires dual-channel distribution",
                    4: "Mostly reliable; minor coverage gaps; integrated with 2-3 primary logistics partners",
                    5: "Seamless end-to-end integration; predictable SLAs; single optimized supply chain"
                },
                followUp: "Follow-up Calculation: Estimate total logistics cost as % of COGS. (Benchmark: Developed markets 8-12%; Fragmented emerging markets 18-35%)",
                followUpFields: [
                    { key: "q1_logistics_pct", label: "Logistics Cost (%)", type: "number", placeholder: "e.g. 25" }
                ]
            },
            {
                id: 2,
                title: "Question 2: Input Sourcing & Supplier Reliability",
                question: "How stable and diversified is your supply of raw materials, components, or key business inputs?",
                scale: {
                    1: "Single supplier or highly concentrated sourcing; frequent supply shocks; unable to negotiate terms; supplier switching costs prohibitive",
                    2: "Limited supplier base (2-3 options); high switching costs; irregular quality; forced inventory buffers",
                    3: "Adequate sourcing options; occasional bottlenecks; moderate quality variation; some negotiating power",
                    4: "Multiple vetted suppliers; predictable quality; able to negotiate; backup suppliers available",
                    5: "Diversified supplier network; quality guarantees; competitive pricing; supply chain visibility"
                },
                followUp: "Hidden Cost Identifier: Have you experienced supply chain disruption in the past 12 months that forced unplanned inventory builds or expedited sourcing? YES / NO. If YES, estimate the additional cost: ₹/$",
                followUpFields: [
                    { key: "q2_disrupted", label: "Experienced Disruption?", type: "select", options: ["NO", "YES"] },
                    { key: "q2_cost", label: "Additional Cost (₹/$)", type: "number", placeholder: "e.g. 5000", condition: { key: "q2_disrupted", value: "YES" } }
                ]
            },
            {
                id: 3,
                title: "Question 3: Payment & Working Capital Fragmentation",
                question: "How effectively do payment systems (from customers and to suppliers) enable smooth working capital management?",
                scale: {
                    1: "Heavy cash-only or informal payment; extended payment delays (90+ days); multiple payment rails required; cannot forecast cash; high chargeback/default risk",
                    2: "Mixed formal/informal; payment delays 60-90 days; 2-3 payment systems required; working capital lock-in significant",
                    3: "Mostly formal; average 30-45 day cycles; 2 primary payment systems; manageable working capital",
                    4: "Digital payments primary; 15-30 day cycles; integrated systems; predictable cash flow",
                    5: "Real-time or near-real-time settlement; integrated across all channels; full payment visibility"
                },
                followUp: "Cost Impact: What is your estimated cost of carrying working capital (% of annual revenue)? (Benchmark: Developed markets 2-4%; Emerging markets with fragmented payments ≈ 8-15%)",
                followUpFields: [
                    { key: "q3_wc_pct", label: "Working Capital Cost (%)", type: "number", placeholder: "e.g. 10" }
                ]
            },
        ]
    },
    {
        section: "SECTION 2: MARKET DEMAND & CUSTOMER FRAGMENTATION",
        questions: [
            {
                id: 4,
                title: "Question 4: Geographic & Customer Dispersion Costs",
                question: "How geographically concentrated is your customer base, and what is the cost impact?",
                scale: {
                    1: "Customers scattered across many cities/regions; high travel/logistics per customer; customer concentration <5% top 20",
                    2: "Mixed geographic spread; customer acquisition requires significant outreach; no clear demand clustering",
                    3: "Moderate concentration; some geographic clusters; reasonable customer density in primary markets",
                    4: "Strong geographic concentration; primary clusters well-defined; efficient customer acquisition",
                    5: "Highly concentrated (>60% revenue from 1-2 geographies); lowest customer acquisition costs"
                },
                followUp: "CAC Fragmentation: What is your Customer Acquisition Cost (CAC) as % of average customer lifetime value? (Benchmark: Healthy = 20-35%; Fragmented market = 60-120%)",
                followUpFields: [
                    { key: "q4_cac_pct", label: "CAC as % of LTV", type: "number", placeholder: "e.g. 60" }
                ]
            },
            {
                id: 5,
                title: "Question 5: Demand Volatility & Information Asymmetry",
                question: "How well can you predict and forecast customer demand 3-6 months ahead? How transparent is market information?",
                scale: {
                    1: "Highly unpredictable demand (variance >50%); no credible market research; reliant on anecdotal evidence; frequent stockouts or excess inventory",
                    2: "Volatile demand (variance 30-50%); limited market data; reactive planning; inventory inefficiency significant",
                    3: "Moderate demand visibility; some market research available; quarterly demand swings manageable",
                    4: "Reasonable forecast accuracy (±15-20%); access to market data; seasonal adjustments manageable",
                    5: "High demand predictability; transparent market information; robust forecasting systems"
                },
                followUp: "Data Fragmentation: Do you have a single, unified view of your customers across all sales channels? YES / NO. If YES, what CRM/ERP do you use?",
                followUpFields: [
                    { key: "q5_unified", label: "Unified Customer View?", type: "select", options: ["NO", "YES"] },
                    { key: "q5_system", label: "CRM/ERP System", type: "text", placeholder: "e.g. Salesforce, SAP, Excel", condition: { key: "q5_unified", value: "YES" } }
                ]
            },
            {
                id: 6,
                title: "Question 6: Brand Resilience & Customer Loyalty",
                question: "What is your level of direct pricing power and customer stickiness in your core segments?",
                scale: {
                    1: "Purely price-driven; zero brand loyalty; customers switch for <1% price difference; high commoditization",
                    2: "Weak brand; mostly transactional; limited repeat business; high price sensitivity",
                    3: "Emerging brand; some loyalty (15-25% repeat); moderate pricing power",
                    4: "Strong local brand; high loyalty (25-40% repeat); able to sustain 10-15% price premium",
                    5: "Dominant brand moat; very high loyalty (>40% repeat); high pricing power; price inelasticity evident"
                },
                followUp: "Brand Resilience: What % of your customers are repeat buyers? (Benchmark: High fragmentation/low loyalty < 15%; Low fragmentation/high loyalty > 40%)",
                followUpFields: [
                    { key: "q6_repeat_pct", label: "Repeat Buyers (%)", type: "number", placeholder: "e.g. 25" }
                ]
            }
        ]
    },
    {
        section: "SECTION 3: CAPITAL & FINANCING FRAGMENTATION",
        questions: [
            {
                id: 7,
                title: "Question 7: Access to Capital & Cost of Finance",
                question: "How easily can you access working capital, growth capital, or trade finance? What is your cost of capital?",
                scale: {
                    1: "No formal financing available; forced to rely on personal/family capital or predatory lending (>30% annual rate); cannot raise institutional capital",
                    2: "Limited options; high cost (18-25% annual); short repayment cycles; collateral requirements prohibitive",
                    3: "Access to bank credit; 12-18% rates; moderate collateral requirements; some availability but difficult process",
                    4: "Multiple lenders available; competitive rates (8-12%); reasonable terms; reasonable access to capital",
                    5: "Abundant capital options; favorable rates (<8%); flexible terms; easy access to institutional finance"
                },
                followUp: "Capital Adequacy: Is your current capital sufficient to weather a 30% revenue drop or capitalize on growth opportunity? YES / NO / PARTIALLY",
                followUpFields: [
                    { key: "q7_adequacy", label: "Capital Adequacy", type: "select", options: ["YES", "NO", "PARTIALLY"] }
                ]
            },
            {
                id: 8,
                title: "Question 8: Financial Intermediation & Accounting Infrastructure Gaps",
                question: "How weak is the financial intermediation infrastructure (banks, auditors, financial advisors)? How robust are your financial records?",
                scale: {
                    1: "No credible financial institutions; informal record-keeping; no independent audit; lenders skeptical of financials; cannot demonstrate creditworthiness",
                    2: "Limited banking infrastructure; weak accounting; no audit; difficult to access institutional finance; high cost of capital",
                    3: "Basic banking; informal accounting systems; periodic audits; can access some formal capital; moderate trust in financials",
                    4: "Formal accounting; annual audits; good banking relationships; can access institutional capital; financial credibility established",
                    5: "Sophisticated financial management; regular audits; strong banking relationships; transparent financial records; institutional confidence high"
                },
                followUp: "Credit Reliability: What is your average collection period (DSO) for receivables? (Benchmark: Efficient market < 30 days; Fragmented market ≈ 60-120 days)",
                followUpFields: [
                    { key: "q8_dso", label: "Average Collection Period (Days)", type: "number", placeholder: "e.g. 45" }
                ]
            },
        ]
    },
    {
        section: "SECTION 4: REGULATORY & COMPLIANCE FRAGMENTATION",
        questions: [
            {
                id: 9,
                title: "Question 9: Regulatory Complexity & Compliance Burden",
                question: "How fragmented is the regulatory environment? What is the burden of compliance across jurisdictions?",
                scale: {
                    1: "Multi-jurisdictional requirements with conflicting rules; licensing/permits unclear or constantly changing; state/local variations significant; forced to maintain multiple compliance systems",
                    2: "Significant compliance burden; regulations fragmented across jurisdictions; compliance costs 5-10% of revenue; regulatory uncertainty high",
                    3: "Moderate regulatory complexity; compliance costs 2-5% of revenue; multiple jurisdictions but manageable; some regulatory uncertainty",
                    4: "Mostly clear regulatory framework; compliance costs <2% of revenue; limited jurisdictional fragmentation",
                    5: "Single, clear regulatory framework; low compliance costs; regulatory environment stable and predictable"
                },
                followUp: "Compliance Friction: How many days/hours per month do you or your team spend on regulatory filings, audits, or compliance-related paperwork?",
                followUpFields: [
                    { key: "q9_compliance_hours", label: "Compliance Effort (Hours/Month)", type: "number", placeholder: "e.g. 20" }
                ]
            },
            {
                id: 10,
                title: "Question 10: Policy Instability & Enforcement Unpredictability",
                question: "How stable are regulatory policies? How predictably are they enforced? How much does policy risk affect your business model?",
                scale: {
                    1: "Frequent policy changes (quarterly/annually) without notice; enforcement inconsistent and discretionary; forced to change business model; high regulatory risk; may need to pay informal fees or bribes",
                    2: "Policy changes 1-2 times annually; enforcement inconsistent; regulatory risk significant; some costs to 'navigate' system",
                    3: "Annual policy reviews; mostly consistent enforcement; regulatory risk manageable; occasional disruptions",
                    4: "Stable policy with infrequent changes; consistent enforcement; regulatory risk low; transparent rules",
                    5: "Very stable regulatory environment; consistent, transparent enforcement; predictable policy; regulatory risk minimal"
                },
                followUp: "Regulatory Risk Assessment: Have you experienced sudden policy changes that forced significant business model adjustment? YES / NO. If YES, describe impact:",
                followUpFields: [
                    { key: "q10_policy_change", label: "Sudden Policy Change?", type: "select", options: ["NO", "YES"] },
                    { key: "q10_impact_desc", label: "Describe Impact", type: "text", condition: { key: "q10_policy_change", value: "YES" } }
                ]
            }
        ]
    },
    {
        section: "SECTION 5: TALENT & LABOR MARKET FRAGMENTATION",
        questions: [
            {
                id: 11,
                title: "Question 11: Labor Supply & Talent Availability",
                question: "How difficult is it to find, hire, and retain skilled labor? How credible are employment certifications?",
                scale: {
                    1: "Acute talent shortage; no credible certifications; high turnover (>50% annually); forced to extensively train; wages escalating rapidly",
                    2: "Limited talent pool; weak certifications; moderate-to-high turnover (30-50%); significant training required; wage inflation",
                    3: "Adequate talent availability; some certifications/education systems; manageable turnover (20-30%); training needs moderate",
                    4: "Good talent supply; credible education/certifications; low turnover (<15%); reasonable training costs",
                    5: "Abundant skilled labor; strong certification systems; very low turnover; minimal training needs"
                },
                followUp: "Talent Cost Impact: What is total labor cost (including recruitment, training, turnover) as % of revenue? (Benchmark: Efficient = 20-30%; Fragmented = 40-60%)",
                followUpFields: [
                    { key: "q11_labor_pct", label: "Labor Cost (%)", type: "number", placeholder: "e.g. 45" }
                ]
            },
            {
                id: 12,
                title: "Question 12: Management Capacity & Organizational Complexity",
                question: "How difficult is it to build and retain a management team capable of handling complexity in your market?",
                scale: {
                    1: "No experienced management available; founder must handle all functions; severe capacity constraints; cannot scale leadership",
                    2: "Limited management talent; founder stretched across critical functions; management capacity bottleneck; high burnout risk",
                    3: "Basic management capacity; some key positions filled; founder involved in critical decisions; scalability concerns",
                    4: "Solid management team; key roles filled; clear delegation possible; reasonable scalability",
                    5: "Strong management team; experienced across functions; clear delegation; organizational scalability evident"
                },
                followUp: "Founder Role Breakdown: Estimate % of your time spent on operations/firefighting vs. strategy: % ops / % strategy",
                followUpFields: [
                    { key: "q12_founder_ops_pct", label: "Time on Ops/Firefighting (%)", type: "number", placeholder: "e.g. 70" }
                ]
            }
        ]
    },
    {
        section: "SECTION 6: TECHNOLOGY & INNOVATION FRAGMENTATION",
        questions: [
            {
                id: 13,
                title: "Question 13: Technology Infrastructure & Digital Divide",
                question: "How outdated is the technology infrastructure? How significant is the digital divide affecting your operations?",
                scale: {
                    1: "Minimal technology adoption; paper-based processes; no digital payment/ordering; customers lack internet/devices; forced to operate analog systems",
                    2: "Legacy systems; limited digital integration; customers have variable connectivity; some processes manual; digital costs high",
                    3: "Partial digital infrastructure; mix of manual/automated; moderate connectivity; some modernization complete",
                    4: "Mostly digital operations; good technology systems;  adequate customer connectivity; limited legacy systems",
                    5: "Modern, integrated digital infrastructure; high-speed connectivity; automated processes; cloud-based systems"
                },
                followUp: "Technology Cost: What is your annual IT/technology spending as % of revenue? (Benchmark: Developed = 2-4%; Emerging with fragmented tech = 5-10%)",
                followUpFields: [
                    { key: "q13_tech_pct", label: "Tech Spending (%)", type: "number", placeholder: "e.g. 6" }
                ]
            },
            {
                id: 14,
                title: "Question 14: IP Protection & R&D Infrastructure",
                question: "How weak is IP protection? How difficult is it to innovate and protect your innovations?",
                scale: {
                    1: "No IP protection; product/service easily copied; cannot patent; R&D infrastructure absent; innovation unsustainable",
                    2: "Weak IP enforcement; copying is common; patent/trademark protection unreliable; limited R&D capability",
                    3: "Moderate IP protection; some enforcement possible; R&D infrastructure emerging; innovation feasible but risky",
                    4: "Good IP protection; patents and trademarks enforceable; R&D infrastructure available; reasonable innovation protection",
                    5: "Strong IP enforcement; reliable patents; robust R&D ecosystem; innovation fully protected"
                },
                followUp: "System Integration: What % of your core business processes are automated vs. manual?",
                followUpFields: [
                    { key: "q14_automation_pct", label: "Automated Processes (%)", type: "number", placeholder: "e.g. 40" }
                ]
            }
        ]
    },
    {
        section: "SECTION 7: COMPETITIVE DYNAMICS & PROFITABILITY FRAGMENTATION",
        questions: [
            {
                id: 15,
                title: "Question 15: Market Concentration & Competitive Density",
                question: "How would you describe the competitive landscape and the degree of price-based competition in your market?",
                scale: {
                    1: "Hyper-fragmented; hundreds of small competitors; zero entry barriers; race to the bottom on price",
                    2: "Highly competitive; many small players; limited differentiation; frequent price wars; low barriers to entry",
                    3: "Moderate competition; 10-15 significant players; some differentiation; stable pricing",
                    4: "Consolidated; 3-5 dominant players; strong differentiation; predictable pricing; high entry barriers",
                    5: "Oligopolistic/Monopolistic; 1-2 dominant players; very high entry barriers; high pricing power"
                },
                followUp: "Market Maturity Assessment: What is the average net profit margin for your top 3 competitors? (If known)",
                followUpFields: [
                    { key: "q15_competitor_margin", label: "Estimated Competitor Margin (%)", type: "number", placeholder: "e.g. 10" }
                ]
            },
            {
                id: 16,
                title: "Question 16: Unit Economics Viability & Margin Sustainability",
                question: "How viable are your unit economics? Can you achieve profitability at scale, or is margin compression structural?",
                scale: {
                    1: "Negative unit economics; cannot achieve profitability even at scale; customer lifetime value < customer acquisition cost by >50%; business model fundamentally broken",
                    2: "Weak unit economics; breakeven only at very high volumes; margin pressure severe; path to profitability unclear; dependent on subsidies/growth capital",
                    3: "Acceptable unit economics; profitable at moderate scale; some margin compression vs. developed markets; path to profitability clear but requires scale",
                    4: "Strong unit economics; margins sustainable; profitable at current or near-future scale; competitive margins adequate",
                    5: "Excellent unit economics; margins expanding; highly profitable; competitive position strengthening"
                },
                followUp: "Margin Reality Check: Current gross margin: %, Minimum viable gross margin for sustainability: %, Margin compression vs. when you launched (if applicable): percentage points",
                followUpFields: [
                    { key: "q16_current_margin", label: "Current Gross Margin (%)", type: "number", placeholder: "e.g. 15" },
                    { key: "q16_viable_margin", label: "Min Viable Margin (%)", type: "number", placeholder: "e.g. 25" }
                ]
            },
            {
                id: 17,
                title: "Question 17: Pricing Power vs. Market Willingness to Pay",
                question: "How much pricing power do you have? Is customer willingness to pay constrained by fragmentation factors?",
                scale: {
                    1: "Zero pricing power; forced to compete on price; cannot pass through cost increases; customers hypersensitive to price changes; margin compression forced",
                    2: "Very limited pricing power; can raise prices marginally; customer sensitivity high; cost increases cannot be fully passed through",
                    3: "Moderate pricing power; can raise prices with some volume loss; willing to pay varies by segment",
                    4: "Good pricing power; customers accept price increases; cost inflation can be largely passed through",
                    5: "Strong pricing power; customers value differentiation; can maintain premium pricing; insensitive to cost changes"
                },
                followUp: "Scale Advantage Assessment: Does your cost per unit decrease by at least 15% as you double your volume? YES / NO",
                followUpFields: [
                    { key: "q17_scale_advantage", label: "Cost-to-Scale Advantage?", type: "select", options: ["NO", "YES"] }
                ]
            }
        ]
    },
    {
        section: "SECTION 8: OPERATIONAL COMPLEXITY & HIDDEN COSTS",
        questions: [
            {
                id: 18,
                title: "Question 18: Operational Fragmentation & Process Complexity",
                question: "How operationally fragmented are your processes? How much 'complexity tax' are you paying?",
                scale: {
                    1: "Processes highly fragmented; manual hand-offs; no automation; significant rework/errors; process variation high; hidden complexity costs substantial (>15% of revenue)",
                    2: "Significant fragmentation; some automation; frequent exceptions and workarounds; complexity costs moderate (10-15%)",
                    3: "Moderate process integration; some automation; manageable exceptions; complexity costs 5-10%",
                    4: "Mostly integrated processes; good automation; few exceptions; complexity costs <5%",
                    5: "Highly streamlined, integrated processes; minimal manual work; few exceptions; minimal complexity costs"
                },
                followUp: "Hidden Cost Identifier: Estimate the cost of process exceptions, rework, and operational friction as % of revenue:",
                followUpFields: [
                    { key: "q18_friction_pct", label: "Operational Friction Cost (%)", type: "number", placeholder: "e.g. 12" }
                ]
            },
            {
                id: 19,
                title: "Question 19: Market Entry & Expansion Sequencing Constraints",
                question: "How much does fragmentation constrain your ability to expand to new geographies or customer segments?",
                scale: {
                    1: "Expansion severely constrained; each new geography requires rebuilding full infrastructure; expansion costs 3-4x per market; timing stretched (18-24 months+)",
                    2: "Expansion difficult; significant infrastructure rebuild per market; moderate replication efficiency; 12-18 month timelines",
                    3: "Expansion feasible but complex; some infrastructure reuse; 9-12 month timelines; moderate expansion costs",
                    4: "Good expansion capability; significant infrastructure reuse; 6-9 month timelines; manageable expansion costs",
                    5: "Highly scalable; minimal incremental expansion cost; rapid expansion (3-6 months); replicable playbook"
                },
                followUp: "Expansion Reality: If you wanted to expand to one new city/market, what would be required? Time required: months | Capital required: ₹/$"
            },
            {
                id: 20,
                title: "Question 20: Founder-Market Fit & Strategic Coherence",
                question: "Do you have the skills, resources, and strategic clarity to navigate your specific fragmentation challenges? Is your business model aligned with market realities?",
                scale: {
                    1: "Fundamental misalignment; founder skills/resources inadequate for market complexity; business model not viable given fragmentation; should exit or pivot",
                    2: "Significant misalignment; founder stretched; business model viability uncertain; serious course correction needed",
                    3: "Partial alignment; founder has some relevant skills; business model viable but requires operational discipline; some strategy clarification needed",
                    4: "Good alignment; founder experienced for market; business model sound; clear strategy; execution focus required",
                    5: "Excellent alignment; founder ideally suited for market; business model robust; strategic clarity strong; execution risk low"
                },
                followUp: "Strategic Reality Check: What is your biggest bottleneck to profitability right now? What would fundamentally change your business economics? Are you building the right business for your market, or are you fighting fragmentation?",
                followUpFields: [
                    { key: "q20_bottleneck", label: "Biggest Bottleneck / Strategic Clarity", type: "text", placeholder: "e.g. Talent scarcity and logistics unreliability..." }
                ]
            }
        ]
    }
];
