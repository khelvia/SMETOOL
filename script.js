const questions = [
    {
        section: "Section 1: Supply Chain & Logistics",
        questions: [
            { id: "q1", text: "How reliable and cost-effective is your last-mile distribution or product delivery?" },
            { id: "q2", text: "How stable is your input supply or sourcing of raw materials/inventory?" },
            { id: "q3", text: "How fragmented or inefficient are your supply chain-related payments and transactions?" }
        ]
    },
    {
        section: "Section 2: Customer Access & Channel",
        questions: [
            { id: "q4", text: "How much do you rely on traditional, high-touch, or word-of-mouth customer acquisition?" },
            { id: "q5", text: "To what extent can your customers access your products or services digitally?" },
            { id: "q6", text: "How structured and accessible is your customer data (e.g., purchase history, preferences)?" }
        ]
    },
    {
        section: "Section 3: Talent & Operational",
        questions: [
            { id: "q7", text: "How difficult is it to find, train, and retain skilled talent in your market?" },
            { id: "q8", text: "How digitized and efficient are your internal operations and management systems?" },
            { id: "q9", text: "How much of your operational time is spent on manual, repetitive tasks?" }
        ]
    },
    {
        section: "Section 4: Financial & Capital",
        questions: [
            { id: "q10", text: "How accessible and affordable is external debt or equity funding for your business?" },
            { id: "q11", text: "How efficient is your cash flow management and payment reconciliation process?" },
            { id: "q12", text: "To what extent do you have to rely on informal financing or high-interest short-term loans?" }
        ]
    },
    {
        section: "Section 5: Regulatory & Environmental",
        questions: [
            { id: "q13", text: "How burdensome and unpredictable is the regulatory and compliance landscape?" },
            { id: "q14", text: "How reliable and affordable is the basic infrastructure (power, roads, internet)?" },
            { id: "q15", text: "How significantly do environmental factors or climate risks impact your business?" }
        ]
    }
];

const archetypes = [
    {
        name: "Integrated Scale-Ready",
        desc: "Your business is highly integrated with optimized processes and low fragmentation. You are well-positioned to scale rapidly and maintain market leadership.",
        recommendation: "Focus on continuous innovation, global expansion, and leveraging data for predictive analytics to stay ahead."
    },
    {
        name: "Supply Chain Victim",
        desc: "Your core bottleneck is logistics and supply chain fragmentation. Inefficiencies in sourcing or delivery are draining your margins.",
        recommendation: "Invest in supply chain visibility tools, diversify your supplier base, and explore last-mile delivery partnerships."
    },
    {
        name: "Data & Sales Isolated",
        desc: "You have limited digital access to customers and poor data visibility. You are vulnerable to more tech-savvy competitors.",
        recommendation: "Accelerate your digital transformation, implement a CRM, and develop multi-channel sales strategies."
    },
    {
        name: "Operationally Stagnant",
        desc: "Manual processes and talent gaps are holding you back. Your internal operations lack the agility needed for growth.",
        recommendation: "Automate repetitive tasks, invest in employee training, and adopt modern project management or ERP systems."
    },
    {
        name: "Capital & Reg. Restricted",
        desc: "Access to funding and a complex regulatory environment are your primary hurdles. These external factors are stifling your growth potential.",
        recommendation: "Strengthen financial reporting to become 'bankable', engage with legal experts for compliance optimization, and seek strategic partnerships."
    }
];

let currentStep = 0;
let userScores = {};

function startDiagnostic() {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('diagnostic-tool').style.display = 'flex';
    renderStep();
}

function renderStep() {
    const section = questions[currentStep];
    const container = document.getElementById('questions-container');
    const stepName = document.getElementById('step-name');
    const progressFill = document.getElementById('progress-fill');

    stepName.innerText = section.section;
    progressFill.style.width = `${((currentStep) / questions.length) * 100}%`;

    container.innerHTML = section.questions.map(q => `
        <div class="question" id="group-${q.id}">
            <p>${q.text}</p>
            <div class="options">
                ${[1, 2, 3, 4, 5].map(score => `
                    <div class="option ${userScores[q.id] === score ? 'selected' : ''}" onclick="selectOption('${q.id}', ${score})">
                        <span class="option-score">${score}</span>
                        <span class="option-label">${getLabel(score)}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');

    updateControls();
}

function getLabel(score) {
    const labels = ["Severe Fragment", "Fragmented", "Moderate", "Integrated", "Highly Integrated"];
    return labels[score - 1];
}

function selectOption(qid, score) {
    userScores[qid] = score;
    renderStep();
}

function nextStep() {
    if (currentStep < questions.length - 1) {
        currentStep++;
        renderStep();
    } else {
        showResults();
    }
}

function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        renderStep();
    }
}

function updateControls() {
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const sectionQuestions = questions[currentStep].questions;

    const allAnswered = sectionQuestions.every(q => userScores[q.id]);

    nextBtn.disabled = !allAnswered;
    prevBtn.disabled = currentStep === 0;

    nextBtn.innerText = currentStep === questions.length - 1 ? "Get Results" : "Next Section";
}

function showResults() {
    document.getElementById('diagnostic-tool').style.display = 'none';
    document.getElementById('results-section').style.display = 'block';

    const categoryScores = questions.map(sec => {
        const sum = sec.questions.reduce((acc, q) => acc + userScores[q.id], 0);
        return { name: sec.section.split(': ')[1], score: (sum / sec.questions.length).toFixed(1) };
    });

    // Calculate Archetype (simplified logic: pick lowest category)
    let lowestCategory = categoryScores.reduce((prev, curr) => (parseFloat(prev.score) < parseFloat(curr.score)) ? prev : curr);

    let archetype;
    if (parseFloat(lowestCategory.score) >= 4) {
        archetype = archetypes[0]; // Scale-Ready
    } else if (lowestCategory.name.includes("Supply")) {
        archetype = archetypes[1];
    } else if (lowestCategory.name.includes("Customer")) {
        archetype = archetypes[2];
    } else if (lowestCategory.name.includes("Talent")) {
        archetype = archetypes[3];
    } else {
        archetype = archetypes[4];
    }

    document.getElementById('archetype-name').innerText = archetype.name;
    document.getElementById('archetype-desc').innerText = archetype.desc;
    document.getElementById('archetype-recommendation').innerText = archetype.recommendation;

    const chart = document.getElementById('score-chart');
    chart.innerHTML = categoryScores.map(cs => `
        <div class="category-score">
            <span class="category-name">${cs.name}</span>
            <div class="category-bar-bg">
                <div class="category-bar-fill" style="width: 0%" data-width="${(cs.score / 5) * 100}%"></div>
            </div>
            <span class="score-value">${cs.score}</span>
        </div>
    `).join('');

    // Animate bars
    setTimeout(() => {
        document.querySelectorAll('.category-bar-fill').forEach(bar => {
            bar.style.width = bar.getAttribute('data-width');
        });
    }, 100);
}
