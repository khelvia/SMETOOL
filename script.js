// questions data is loaded from questions_data.js

let currentStep = 0;
let userScores = {};
let userFollowUps = {};

function startDiagnostic() {
    const hero = document.getElementById('hero');
    const tool = document.getElementById('diagnostic-tool');
    if (hero) hero.style.display = 'none';
    if (tool) tool.style.display = 'flex';
    renderStep();
}

function renderStep() {
    const section = questions[currentStep];
    const container = document.getElementById('questions-container');
    const stepName = document.getElementById('step-name');
    const progressFill = document.getElementById('progress-fill');

    if (stepName) stepName.innerText = section.section;
    if (progressFill) progressFill.style.width = `${((currentStep) / questions.length) * 100}%`;

    container.innerHTML = section.questions.map(q => `
        <div class="question" id="group-${q.id}">
            <h3>${q.title}</h3>
            <p class="question-text">${q.question}</p>
            <div class="options-vertical">
                ${[1, 2, 3, 4, 5].map(score => `
                    <div class="option-detailed ${userScores[q.id] === score ? 'selected' : ''}" onclick="selectOption(${q.id}, ${score})">
                        <span class="option-number">${score}</span>
                        <span class="option-desc">${q.scale[score]}</span>
                    </div>
                `).join('')}
            </div>
            ${userScores[q.id] ? `
                <div class="follow-up-container visible">
                    <label style="margin-bottom: 1rem; display: block; color: var(--text-gray); font-style: italic;">${q.followUp} <span style="color: var(--accent);">*</span></label>
                    <div class="follow-up-fields" style="display: flex; flex-direction: column; gap: 1rem;">
                        ${(q.followUpFields || []).map(f => {
        // Check condition
        if (f.condition) {
            if (userFollowUps[f.condition.key] !== f.condition.value) return '';
        }

        if (f.type === 'select') {
            return `
                                    <div class="field-item">
                                        <label style="display: block; font-size: 0.8rem; color: var(--accent); margin-bottom: 0.5rem;">${f.label} <span style="color: var(--accent);">*</span></label>
                                        <select onchange="saveFollowUp('${f.key}', this.value)" style="width: 100%; background: rgba(0,0,0,0.3); color: white; border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 8px;">
                                            <option value="">Select...</option>
                                            ${f.options.map(opt => `<option value="${opt}" ${userFollowUps[f.key] === opt ? 'selected' : ''}>${opt}</option>`).join('')}
                                        </select>
                                    </div>
                                `;
        } else if (f.type === 'number') {
            return `
                                    <div class="field-item">
                                        <label style="display: block; font-size: 0.8rem; color: var(--accent); margin-bottom: 0.5rem;">${f.label} <span style="color: var(--accent);">*</span></label>
                                        <input type="number" value="${userFollowUps[f.key] || ''}" oninput="saveFollowUp('${f.key}', this.value)" placeholder="${f.placeholder || ''}" style="width: 100%; background: rgba(0,0,0,0.3); color: white; border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 8px;">
                                    </div>
                                `;
        } else {
            return `
                                    <div class="field-item">
                                        <label style="display: block; font-size: 0.8rem; color: var(--accent); margin-bottom: 0.5rem;">${f.label} <span style="color: var(--accent);">*</span></label>
                                        <textarea oninput="saveFollowUp('${f.key}', this.value)" placeholder="${f.placeholder || 'Enter details...'}" style="width: 100%; min-height: 80px; background: rgba(0,0,0,0.3); color: white; border: 1px solid var(--glass-border); padding: 0.75rem; border-radius: 8px;">${userFollowUps[f.key] || ''}</textarea>
                                    </div>
                                `;
        }
    }).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `).join('');

    updateControls();
}

function selectOption(qid, score) {
    userScores[qid] = score;
    renderStep();
}

function saveFollowUp(key, value) {
    userFollowUps[key] = value;
    // Special case: if changing a field that other fields depend on, re-render to show/hide conditional fields
    if (key === 'q2_disrupted' || key === 'q10_policy_change') {
        renderStep();
    }
}

function nextStep() {
    const section = questions[currentStep];

    // Validation
    const unanswered = section.questions.filter(q => {
        // Likert score missing
        if (!userScores[q.id]) return true;
        // Follow-up field missing (if fields exist and aren't conditional or condition met)
        const missingFollowup = (q.followUpFields || []).some(f => {
            if (f.condition && userFollowUps[f.condition.key] !== f.condition.value) return false;
            return !userFollowUps[f.key];
        });
        return missingFollowup;
    });

    if (unanswered.length > 0) {
        alert("Please complete all questions and follow-up fields in this section.");
        return;
    }

    if (currentStep < questions.length - 1) {
        currentStep++;
        window.scrollTo(0, 0);
        renderStep();
    } else {
        showResults();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        window.scrollTo(0, 0);
        renderStep();
    }
}

function updateControls() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const sectionQuestions = questions[currentStep].questions;

    const allAnswered = sectionQuestions.every(q => userScores[q.id]);

    if (nextBtn) {
        nextBtn.disabled = !allAnswered;
        nextBtn.innerText = currentStep === questions.length - 1 ? "Get Results" : "Next Section";
    }
    if (prevBtn) {
        prevBtn.disabled = currentStep === 0;
    }
}

function generateFullDiagnostic(likertScores, followUps) {

    // ---------------------------------------------------------
    // PART 1: LIKERT SCALE SCORING & ARCHETYPES
    // ---------------------------------------------------------

    // Helper to sum scores safely
    const sum = (qs) => qs.reduce((acc, q) => acc + (parseInt(likertScores[q]) || 0), 0);

    const archetypes = {
        supplyChain: { score: sum([1, 2, 3]), max: 15, name: "Supply Chain Fragmentation" },
        demand: { score: sum([4, 5, 6]), max: 15, name: "Demand Fragmentation" },
        capital: { score: sum([7, 8]), max: 10, name: "Capital & Financing" },
        regulatory: { score: sum([9, 10]), max: 10, name: "Regulatory & Compliance" },
        talent: { score: sum([11, 12]), max: 10, name: "Talent & Labor" },
        technology: { score: sum([13, 14]), max: 10, name: "Technology & Innovation" },
        competitive: { score: sum([15, 16, 17]), max: 15, name: "Competitive Dynamics" },
        operational: { score: sum([18, 19, 20]), max: 15, name: "Operational Complexity" }
    };

    // Calculate Total Score
    let totalScore = Object.values(archetypes).reduce((acc, category) => acc + category.score, 0);

    // Determine Severity Level
    let severity = "";
    let strategicAdvice = "";

    if (totalScore >= 80) {
        severity = "Low fragmentation";
        strategicAdvice = "Standard business model playbook applies; focus on execution.";
    } else if (totalScore >= 60) {
        severity = "Moderate fragmentation";
        strategicAdvice = "Targeted playbook adaptations necessary; manageable with discipline.";
    } else if (totalScore >= 40) {
        severity = "Severe fragmentation";
        strategicAdvice = "Significant profitability challenges; requires specialized strategies.";
    } else if (totalScore >= 20) {
        severity = "Extreme fragmentation";
        strategicAdvice = "Fundamental market constraints; major strategic pivot may be required.";
    } else {
        severity = "Business Model Unviable";
        strategicAdvice = "Fragmentation barriers likely insurmountable; serious pivot or exit recommended.";
    }

    // ---------------------------------------------------------
    // PART 2: FOLLOW-UP DATA ANALYSIS & BENCHMARKING
    // ---------------------------------------------------------

    let insights = [];
    let hiddenCostsTotal = 0; // Accumulator for explicitly stated hidden costs

    // Q1: Logistics Cost
    const logisticsPct = parseFloat(followUps.q1_logistics_pct);
    if (logisticsPct >= 18) {
        insights.push(`Logistics Warning: Your logistics cost (${logisticsPct}%) falls into the fragmented emerging market range (18-35%). Developed markets average 8-12%.`);
    }

    // Q2: Supply Chain Disruption
    if (followUps.q2_disrupted === "YES") {
        const cost = parseFloat(followUps.q2_cost) || 0;
        hiddenCostsTotal += cost;
        insights.push(`Supply Chain Instability: You experienced disruptions costing an estimated ${cost} in the past 12 months.`);
    }

    // Q3: Working Capital
    const wcPct = parseFloat(followUps.q3_wc_pct);
    if (wcPct >= 8) {
        insights.push(`Capital Drag: Working capital carrying cost is high at ${wcPct}% (Benchmark for fragmented markets is 8-15%, vs 2-4% in developed markets).`);
    }

    // Q4: Customer Acquisition Cost
    const cacPct = parseFloat(followUps.q4_cac_pct);
    if (cacPct >= 60) {
        insights.push(`CAC Inefficiency: Your CAC is ${cacPct}% of LTV, indicating severe geographic/customer fragmentation (Healthy benchmark is 20-35%).`);
    }

    // Q5: Unified Customer View
    if (followUps.q5_unified === "NO") {
        insights.push(`Data Fragmentation: You lack a unified customer view, creating institutional voids in demand forecasting and customer management.`);
    }

    // Q6: Brand Loyalty
    const repeatPct = parseFloat(followUps.q6_repeat_pct);
    if (repeatPct < 15) {
        insights.push(`Brand Fragility: Low repeat buyer rate (${repeatPct}%) indicates high market fragmentation and lack of customer stickiness.`);
    }

    // Q7: Capital Adequacy
    if (followUps.q7_adequacy === "NO" || followUps.q7_adequacy === "PARTIALLY") {
        insights.push(`Risk Alert: Your current capital is insufficient to weather a 30% revenue drop.`);
    }

    // Q8: Credit Reliability (DSO)
    const dso = parseFloat(followUps.q8_dso);
    if (dso > 60) {
        insights.push(`Receivables Drag: Your DSO (${dso} days) is in the fragmented market range (60-120 days). Efficient markets operate at <30 days.`);
    }

    // Q9: Compliance Effort
    const complianceHours = parseFloat(followUps.q9_compliance_hours);
    if (complianceHours > 20) {
        insights.push(`Regulatory Tax: Management spends ${complianceHours} hours/month on compliance, a high overhead typical of fragmented regulatory environments.`);
    }

    // Q10: Policy Instability
    if (followUps.q10_policy_change === "YES") {
        insights.push(`Regulatory Risk: Business model is vulnerable to sudden policy shifts, as experienced recently. Impact noted: "${followUps.q10_impact_desc}"`);
    }

    // Q11: Labor Cost
    const laborPct = parseFloat(followUps.q11_labor_pct);
    if (laborPct >= 40) {
        insights.push(`Talent Premium: Labor costs (${laborPct}%) reflect a fragmented talent pool. Efficient markets run at 20-30%.`);
    }

    // Q12: Founder Time Management
    const opsPct = parseFloat(followUps.q12_founder_ops_pct);
    if (opsPct > 60) {
        insights.push(`Founder Bottleneck: You are spending ${opsPct}% of your time on firefighting/operations, severely limiting strategic scalability.`);
    }

    // Q13: Technology Infrastructure
    const techPct = parseFloat(followUps.q13_tech_pct);
    if (techPct >= 5) {
        insights.push(`Digital Divide Cost: IT spending (${techPct}%) is elevated, typical of emerging markets (5-10%) compensating for legacy systems.`);
    }

    // Q14: Automation
    const autoPct = parseFloat(followUps.q14_automation_pct);
    if (autoPct < 30) {
        insights.push(`Operational Friction: Low automation (${autoPct}%) increases reliance on manual work, creating hidden scaling costs.`);
    }

    // Q15 & Q16: Margin Gap
    const currentMargin = parseFloat(followUps.q16_current_margin);
    const compMargin = parseFloat(followUps.q15_competitor_margin);
    if (currentMargin < compMargin - 5) {
        insights.push(`Competitive Disadvantage: Your gross margin (${currentMargin}%) is significantly lower than top competitors (avg ${compMargin}%).`);
    }

    // Q16: Margin Compression
    const viableMargin = parseFloat(followUps.q16_viable_margin);
    if (currentMargin < viableMargin) {
        insights.push(`Unit Economic Crisis: Current gross margin (${currentMargin}%) is below your stated minimum viable margin (${viableMargin}%).`);
    }

    // Q17: Scale Economies
    if (followUps.q17_scale_advantage === "NO") {
        insights.push(`Missing Scale Moat: You are not achieving 15% cost reduction when doubling volume, indicating structural fragmentation barriers.`);
    }

    // Q18: Operational Friction
    const frictionPct = parseFloat(followUps.q18_friction_pct);
    if (frictionPct >= 10) {
        insights.push(`Complexity Tax: Process exceptions and rework are costing you ${frictionPct}% of top-line revenue.`);
    }

    // Q19: Resilience
    const survivalDays = parseFloat(followUps.q19_survival_days);
    if (survivalDays < 30) {
        insights.push(`Survival Alert: Your business can only survive ${survivalDays} days if a primary channel is blocked, indicating extreme fragility.`);
    }

    // ---------------------------------------------------------
    // PART 3: RETURN FINAL PAYLOAD
    // ---------------------------------------------------------

    return {
        quantitative: {
            totalScore: totalScore,
            maxScore: 100,
            severityLevel: severity,
            strategicAdvice: strategicAdvice,
            archetypes: archetypes
        },
        qualitative: {
            generatedInsights: insights, // Array of specific warnings to display
            totalQuantifiedHiddenCosts: hiddenCostsTotal,
            founderBottlenecks: followUps.q20_bottleneck || "Not specified"
        }
    };
}

function showResults() {
    const tool = document.getElementById('diagnostic-tool');
    const resultsSec = document.getElementById('results-section');
    if (tool) tool.style.display = 'none';
    if (resultsSec) resultsSec.style.display = 'block';

    const results = generateFullDiagnostic(userScores, userFollowUps);
    const quant = results.quantitative;
    const qual = results.qualitative;

    document.getElementById('archetype-name').innerText = quant.severityLevel;
    document.getElementById('archetype-desc').innerText = quant.strategicAdvice;

    // Total Score display
    const totalScoreEl = document.getElementById('total-score-display');
    if (totalScoreEl) totalScoreEl.innerText = `${quant.totalScore} / ${quant.maxScore}`;

    const chart = document.getElementById('score-chart');
    if (chart) {
        chart.innerHTML = `
            <div class="archetype-scores">
                ${Object.values(quant.archetypes).map(arc => `
                    <div class="category-score">
                        <span class="category-name">${arc.name}</span>
                        <div class="category-bar-bg">
                            <div class="category-bar-fill" style="width: 0%" data-width="${(arc.score / arc.max) * 100}%"></div>
                        </div>
                        <span class="score-value">${arc.score}/${arc.max}</span>
                    </div>
                `).join('')}
            </div>
            
            <div class="qualitative-insights" style="margin-top: 2.5rem; border-top: 1px solid var(--glass-border); padding-top: 2rem;">
                <h3 style="margin-bottom: 1.5rem; color: var(--accent);">Diagnostic Insights</h3>
                <div class="insights-list" style="display: flex; flex-direction: column; gap: 1rem;">
                    ${qual.generatedInsights.map(insight => `
                        <div class="insight-item" style="background: rgba(255, 159, 28, 0.1); border-left: 3px solid var(--accent); padding: 1rem; border-radius: 4px; font-size: 0.9rem;">
                            ${insight}
                        </div>
                    `).join('')}
                    ${qual.generatedInsights.length === 0 ? '<p style="color: var(--text-gray);">No critical functional warnings triggered.</p>' : ''}
                </div>
                
                <div class="hidden-costs" style="margin-top: 2rem; background: rgba(58, 134, 255, 0.1); padding: 1.5rem; border-radius: 12px; text-align: center;">
                    <span style="font-size: 0.8rem; text-transform: uppercase; color: var(--primary-light);">Total Quantified Hidden Costs</span>
                    <div style="font-size: 2rem; font-weight: 800; color: var(--text-white); margin-top: 0.5rem;">${qual.totalQuantifiedHiddenCosts > 0 ? qual.totalQuantifiedHiddenCosts : 'None Specified'}</div>
                </div>

                <div class="bottleneck" style="margin-top: 1.5rem;">
                    <h4 style="font-size: 0.8rem; text-transform: uppercase; color: var(--text-gray); margin-bottom: 0.5rem;">Primary Scaling Bottleneck</h4>
                    <p style="font-size: 0.9rem; font-style: italic; color: var(--text-white);">${qual.founderBottlenecks}</p>
                </div>
            </div>
        `;
    }

    setTimeout(() => {
        document.querySelectorAll('.category-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 100);
}
