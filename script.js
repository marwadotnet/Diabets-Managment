// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = 'dashboard.html';
        });
    }

    // Check if on dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        initDashboard();
    }
});

// Initialize Dashboard
function initDashboard() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
        window.location.href = 'login.html';
        return;
    }

    const diabetesType = localStorage.getItem('diabetesType');
    if (!diabetesType) {
        showTypeSelectionModal();
    } else {
        updateDashboardForType(diabetesType);
        renderHealthyHabits(diabetesType);
        renderComplications();
        renderDiabetesInfo(diabetesType);
    }
}

// Show Type Selection Modal
function showTypeSelectionModal() {
    const modal = document.getElementById('typeSelectionModal');
    if (modal) {
        modal.classList.add('active');
    }
}

// Select Diabetes Type
function selectDiabetesType(type) {
    localStorage.setItem('diabetesType', type);
    const modal = document.getElementById('typeSelectionModal');
    if (modal) {
        modal.classList.remove('active');
    }
    updateDashboardForType(type);
    renderHealthyHabits(type);
    renderComplications();
    renderDiabetesInfo(type);
}

// Update Dashboard for Selected Type
function updateDashboardForType(type) {
    const label = document.getElementById('diabetesTypeLabel');
    if (label) {
        const typeName = type === 'type1' ? 'Type 1' : 'Type 2';
        label.textContent = `Managing ${typeName} Diabetes`;
    }

    const description = document.getElementById('habitsDescription');
    if (description) {
        const typeName = type === 'type1' ? 'Type 1' : 'Type 2';
        description.textContent = `Evidence-based lifestyle recommendations for managing ${typeName} diabetes`;
    }
}

// Switch Tabs
function switchTab(tabName) {
    // Update active tab button
    const tabs = document.querySelectorAll('.nav-tab');
    tabs.forEach(tab => {
        if (tab.dataset.tab === tabName) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });

    // Update active content
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    const activeContent = document.getElementById(`${tabName}Tab`);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Analyze Blood Sugar
function analyzeBloodSugar(value) {
    const resultDiv = document.getElementById('bloodSugarResult');
    if (!resultDiv) return;

    const numValue = parseFloat(value);

    if (isNaN(numValue) || numValue <= 0 || value === '') {
        resultDiv.innerHTML = '';
        return;
    }

    let status, title, message, actions;

    if (numValue < 70) {
        status = 'low';
        title = 'Low Blood Sugar (Hypoglycemia)';
        message = `Your blood sugar level of ${numValue} mg/dL is below the normal range. This requires immediate attention.`;
        actions = `
            <div class="result-actions">
                <p>Immediate Actions:</p>
                <ul>
                    <li>Consume 15-20 grams of fast-acting carbohydrates (glucose tablets, juice, or regular soda)</li>
                    <li>Wait 15 minutes and recheck your blood sugar</li>
                    <li>If still low, repeat treatment</li>
                    <li>Contact your healthcare provider if symptoms persist</li>
                </ul>
            </div>
        `;
    } else if (numValue >= 70 && numValue <= 180) {
        status = 'normal';
        title = 'Normal Range';
        message = `Your blood sugar level of ${numValue} mg/dL is within the healthy range. Continue monitoring regularly and maintain your current management plan.`;
        actions = '';
    } else {
        status = 'high';
        title = 'High Blood Sugar (Hyperglycemia)';
        message = `Your blood sugar level of ${numValue} mg/dL is above the normal range. Take action to bring it down.`;
        actions = `
            <div class="result-actions">
                <p>Recommended Actions:</p>
                <ul>
                    <li>Drink water to stay hydrated</li>
                    <li>Take prescribed medication if recommended by your doctor</li>
                    <li>Engage in light physical activity if safe to do so</li>
                    <li>Monitor for symptoms like increased thirst, frequent urination, or fatigue</li>
                    <li>Contact your healthcare provider if levels remain high or exceed 240 mg/dL</li>
                </ul>
            </div>
        `;
    }

    const icon = status === 'normal'
        ? '<svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>'
        : '<svg class="result-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>';

    resultDiv.innerHTML = `
        <div class="result-card ${status}">
            <div class="result-header">
                ${icon}
                <div class="result-content">
                    <h3>${title}</h3>
                    <p>${message}</p>
                    ${actions}
                </div>
            </div>
        </div>
    `;
}

// Render Healthy Habits
function renderHealthyHabits(diabetesType) {
    const container = document.getElementById('habitsContent');
    if (!container) return;

    const commonHabits = [
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7h6V5a3 3 0 0 0-3-3z"></path><path d="M7.5 12H2.5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4.5M16.5 12h5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-5"></path></svg>',
            title: 'Balanced Diet',
            description: 'Focus on whole grains, lean proteins, vegetables, and fruits. Monitor carbohydrate intake and choose low glycemic index foods.',
            tips: [
                'Count carbohydrates to manage blood sugar',
                'Include fiber-rich foods in every meal',
                'Limit processed foods and added sugars',
                'Eat regular meals at consistent times'
            ]
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6.5 6.5h11v11h-11z"></path><path d="M9.5 9.5v5M14.5 9.5v5"></path></svg>',
            title: 'Regular Exercise',
            description: 'Physical activity helps lower blood sugar levels and improves insulin sensitivity.',
            tips: [
                'Aim for 150 minutes of moderate activity per week',
                'Include both aerobic and resistance training',
                'Check blood sugar before and after exercise',
                'Start slowly and gradually increase intensity'
            ]
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>',
            title: 'Stay Hydrated',
            description: 'Proper hydration helps your kidneys flush out excess blood sugar through urine.',
            tips: [
                'Drink water throughout the day',
                'Limit sugary beverages and alcohol',
                'Increase water intake during exercise',
                'Monitor urine color as a hydration indicator'
            ]
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>',
            title: 'Quality Sleep',
            description: 'Poor sleep can affect blood sugar levels and insulin sensitivity.',
            tips: [
                'Aim for 7-9 hours of sleep per night',
                'Maintain a consistent sleep schedule',
                'Create a relaxing bedtime routine',
                'Keep your bedroom cool and dark'
            ]
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
            title: 'Regular Monitoring',
            description: 'Track your blood sugar levels to understand patterns and make informed decisions.',
            tips: [
                'Check blood sugar as recommended by your doctor',
                'Keep a log of readings and trends',
                'Note factors that affect your levels',
                'Share data with your healthcare team'
            ]
        }
    ];

    const specificHabit = diabetesType === 'type1' ? {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 3h15a1.5 1.5 0 0 1 1.5 1.5v15a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-15A1.5 1.5 0 0 1 4.5 3z"></path><path d="M12 8v8M8 12h8"></path></svg>',
        title: 'Insulin Management',
        description: 'Proper insulin administration is crucial for Type 1 diabetes management.',
        tips: [
            'Take insulin as prescribed by your doctor',
            'Rotate injection sites to prevent lipodystrophy',
            'Store insulin properly according to guidelines',
            'Learn to adjust doses based on activity and meals',
            'Always carry fast-acting glucose for emergencies'
        ]
    } : {
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>',
        title: 'Weight Management',
        description: 'Maintaining a healthy weight can significantly improve insulin sensitivity and blood sugar control.',
        tips: [
            'Work with your healthcare team on weight goals',
            'Focus on gradual, sustainable weight loss',
            'Combine diet changes with regular exercise',
            'Track your progress and celebrate small wins',
            'Consider stress management techniques'
        ]
    };

    const allHabits = [specificHabit, ...commonHabits];

    container.innerHTML = allHabits.map(habit => `
        <div class="habit-card">
            <div class="habit-header">
                <div class="habit-icon-wrapper">
                    <div class="habit-icon">${habit.icon}</div>
                </div>
                <div class="habit-content">
                    <h3>${habit.title}</h3>
                    <p>${habit.description}</p>
                    <div class="habit-tips">
                        <p>Key Actions:</p>
                        <ul>
                            ${habit.tips.map(tip => `<li>${tip}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Complications
function renderComplications() {
    const container = document.getElementById('complicationsContent');
    if (!container) return;

    const complications = [
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>',
            title: 'Cardiovascular Disease',
            description: 'High blood sugar can damage blood vessels and nerves that control the heart.',
            symptoms: ['Chest pain or pressure', 'Shortness of breath', 'Irregular heartbeat', 'Fatigue during physical activity'],
            prevention: 'Control blood sugar, blood pressure, and cholesterol levels. Exercise regularly and maintain a heart-healthy diet.'
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>',
            title: 'Eye Damage (Retinopathy)',
            description: 'Diabetes can damage the blood vessels in the retina, potentially leading to vision loss.',
            symptoms: ['Blurred or fluctuating vision', 'Dark spots or floaters', 'Difficulty seeing at night', 'Color vision changes'],
            prevention: 'Get annual comprehensive eye exams. Maintain good blood sugar control and manage blood pressure.'
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
            title: 'Nerve Damage (Neuropathy)',
            description: 'High blood sugar can injure nerve fibers throughout the body, especially in the legs and feet.',
            symptoms: ['Tingling or numbness in extremities', 'Sharp, burning pain', 'Increased sensitivity to touch', 'Muscle weakness'],
            prevention: 'Keep blood sugar in target range. Inspect feet daily and wear proper footwear. Avoid smoking.'
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>',
            title: 'Kidney Damage (Nephropathy)',
            description: 'Diabetes can damage the kidney\'s filtering system over time.',
            symptoms: ['Swelling in legs, ankles, or feet', 'Fatigue and weakness', 'Shortness of breath', 'Nausea and vomiting'],
            prevention: 'Control blood sugar and blood pressure. Regular kidney function tests. Stay hydrated and avoid NSAIDs.'
        },
        {
            icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
            title: 'Cognitive Changes',
            description: 'Fluctuating blood sugar levels can affect memory and thinking over time.',
            symptoms: ['Memory problems', 'Difficulty concentrating', 'Confusion', 'Slower thinking'],
            prevention: 'Maintain stable blood sugar levels. Stay mentally and physically active. Get adequate sleep.'
        }
    ];

    container.innerHTML = complications.map(comp => `
        <div class="complication-card">
            <div class="complication-header">
                <div class="complication-icon-wrapper">
                    <div class="complication-icon">${comp.icon}</div>
                </div>
                <div class="complication-content">
                    <h4>${comp.title}</h4>
                    <p>${comp.description}</p>
                    <div class="complication-details">
                        <div class="detail-box symptoms">
                            <p>Warning Signs:</p>
                            <ul>
                                ${comp.symptoms.map(s => `<li>• ${s}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="detail-box prevention">
                            <p>Prevention:</p>
                            <p>${comp.prevention}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Render Diabetes Info
function renderDiabetesInfo(diabetesType) {
    const container = document.getElementById('diabetesInfoContent');
    if (!container) return;

    const type1Info = {
        title: 'Type 1 Diabetes',
        definition: 'Type 1 diabetes is an autoimmune condition where the immune system attacks and destroys the insulin-producing beta cells in the pancreas. This results in little to no insulin production, requiring lifelong insulin therapy.',
        causes: [
            'Autoimmune response destroying pancreatic beta cells',
            'Genetic predisposition (family history increases risk)',
            'Environmental triggers (viruses, toxins) may activate the immune response',
            'Not caused by lifestyle factors or diet'
        ],
        symptoms: [
            'Excessive thirst and frequent urination',
            'Extreme hunger despite eating',
            'Unintended weight loss',
            'Fatigue and weakness',
            'Blurred vision',
            'Slow-healing sores or frequent infections',
            'Fruity-smelling breath'
        ],
        treatment: [
            'Daily insulin injections or insulin pump therapy',
            'Continuous blood glucose monitoring',
            'Carbohydrate counting and meal planning',
            'Regular physical activity',
            'Regular check-ups with endocrinologist'
        ],
        prevalence: 'Accounts for 5-10% of all diabetes cases. Often diagnosed in children, teens, and young adults, but can occur at any age.'
    };

    const type2Info = {
        title: 'Type 2 Diabetes',
        definition: 'Type 2 diabetes occurs when the body becomes resistant to insulin or when the pancreas doesn\'t produce enough insulin. It\'s the most common form of diabetes and is often associated with lifestyle factors, though genetics also play a role.',
        causes: [
            'Insulin resistance (cells don\'t respond properly to insulin)',
            'Insufficient insulin production by the pancreas',
            'Genetic factors and family history',
            'Excess body weight and physical inactivity',
            'Age (risk increases after 45)',
            'Poor diet and unhealthy lifestyle habits'
        ],
        symptoms: [
            'Increased thirst and frequent urination',
            'Increased hunger',
            'Unexplained weight changes',
            'Fatigue',
            'Blurred vision',
            'Slow-healing wounds',
            'Frequent infections',
            'Darkened skin patches (acanthosis nigricans)'
        ],
        treatment: [
            'Lifestyle modifications (diet and exercise)',
            'Oral medications to improve insulin sensitivity',
            'Blood glucose monitoring',
            'Weight management',
            'In some cases, insulin therapy',
            'Regular medical check-ups'
        ],
        prevalence: 'Accounts for 90-95% of all diabetes cases. Most commonly diagnosed in adults over 45, but increasingly seen in younger people due to rising obesity rates.'
    };

    const currentInfo = diabetesType === 'type1' ? type1Info : type2Info;
    const otherInfo = diabetesType === 'type1' ? type2Info : type1Info;

    container.innerHTML = `
        <div class="diabetes-info-card">
            <div class="info-title">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                <h3>${currentInfo.title}</h3>
            </div>

            <div class="info-section">
                <h4 class="info-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    Definition
                </h4>
                <p>${currentInfo.definition}</p>
            </div>

            <div class="info-grid">
                <div class="info-section">
                    <h4>Causes & Risk Factors</h4>
                    <ul>
                        ${currentInfo.causes.map(c => `<li>• ${c}</li>`).join('')}
                    </ul>
                </div>

                <div class="info-section">
                    <h4>Common Symptoms</h4>
                    <ul>
                        ${currentInfo.symptoms.map(s => `<li>• ${s}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="info-section">
                <h4>Treatment Approach</h4>
                <ul>
                    ${currentInfo.treatment.map(t => `<li>• ${t}</li>`).join('')}
                </ul>
            </div>

            <div class="info-section">
                <h4 class="info-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    Prevalence
                </h4>
                <p>${currentInfo.prevalence}</p>
            </div>
        </div>

        <div class="other-type-card">
            <h3>About ${otherInfo.title}</h3>
            <p>${otherInfo.definition}</p>

            <div class="other-type-grid">
                <div>
                    <h4>Key Differences:</h4>
                    <p>${diabetesType === 'type1'
                        ? 'Type 2 diabetes is primarily characterized by insulin resistance rather than lack of insulin production, and is often manageable with lifestyle changes and oral medications.'
                        : 'Type 1 diabetes is an autoimmune condition requiring insulin therapy from diagnosis, whereas Type 2 often develops gradually and may be managed initially without insulin.'
                    }</p>
                </div>
                <div>
                    <h4>Prevalence:</h4>
                    <p>${otherInfo.prevalence}</p>
                </div>
            </div>
        </div>

        <div class="warning-box">
            <div class="warning-header">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <div>
                    <h4>Important Reminders</h4>
                    <ul>
                        <li>• This information is for educational purposes only and should not replace professional medical advice</li>
                        <li>• Every person's diabetes management plan is unique and should be tailored by healthcare professionals</li>
                        <li>• Regular check-ups and open communication with your healthcare team are essential</li>
                        <li>• If you experience severe symptoms or have concerns, contact your doctor immediately</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('diabetesType');
    window.location.href = 'index.html';
}
