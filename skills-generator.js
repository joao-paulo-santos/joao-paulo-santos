// skills-generator.js
// Generates the Skills section for the README.md as HTML with shields.io badges

function parseColor(color) {
    if (!color) return color;
    let c = color.startsWith('#') ? color.slice(1) : color;
    if (c.length === 8) c = c.slice(0, 6);
    return c.toUpperCase();
}

class Skill {
    constructor(name, rating, logo, color) {
        this.name = name;
        this.rating = rating ?? undefined;
        this.logo = logo;
        this.color = parseColor(color);
    }
}

const categories = {
    'Programming languages': [],
    'Databases': [],
    'Backend Development': [],
    'Web Development': [],
    'Mobile Development': [],
    'DevOps & Tools': [],
    'Operating Systems': [],
    'Markup & Scripting': [],
    'Other': [],
};
categories['Operating Systems'].push(
    new Skill('Linux', 4, 'arch%20linux', '#05c5ffff'),
    new Skill('macOS', 4, 'apple', '#000000'),
    new Skill('Windows', 3, 'windows', '#0078D6')
);

categories['Programming languages'].push(
    new Skill('C#', 5, 'c-sharp', '#239120'),
    new Skill('JavaScript', 5, 'javascript', '#F7DF1E'),
    new Skill('Dart', 4, 'dart', '#0175C2'),
    new Skill('TypeScript', 3, 'typescript', '#3178C6'),
    new Skill('Python', 3, 'python', '#3776AB'),
    new Skill('Java', 2, 'java', '#f8bf04ff'),
    new Skill('C', 2, 'c', '#00599C'),
    new Skill('C++', 2, 'c%2B%2B', '#00599C'),
    new Skill('Lisp', 4, 'Common%20Lisp', '#764ABC')
);
categories['Databases'].push(
    new Skill('MySQL', 3, 'mysql', '#4479A1'),
    new Skill('SQL Server', 4, 'microsoftsqlserver', '#CC2927'),
    new Skill('PostgreSQL', 2, 'postgresql', '#4169E1'),
    new Skill('MongoDB', 2, 'mongodb', '#47A248'),
    new Skill('SQLite', 3, 'sqlite', '#003B57'),
);
categories['Markup & Scripting'].push(
    new Skill('HTML', 4, 'html5', '#E34F26'),
    new Skill('CSS', 4, 'css3', '#1572B6'),
    new Skill('YAML', 3, 'yaml', '#CB171E'),
    new Skill('TOML', 2, '', '#9C4221')
);
// Backend Development
categories['Backend Development'].push(
    new Skill('.NET', 5, 'dotnet', '#512BD4'),
    new Skill('Entity Framework', 4, 'entityframework', '#68217A'),
    new Skill('Node.js', 3, 'nodedotjs', '#339933'),
    new Skill('NestJS', 2, 'nestjs', '#E0234E'),
    new Skill('Express.js', 3, 'express', '#000000'),
    new Skill('FastAPI', 2, 'fastapi', '#009688'),
    new Skill('xUnit', 3, 'xunit', '#F5B800'),
    new Skill('Moq', 3, '', '#B52C2C'),
);

// Web Development
categories['Web Development'].push(
    new Skill('React', 4, 'react', '#20232A'),
    new Skill('Redux', 3, 'redux', '#764ABC'),
    new Skill('Next.js', 3, 'nextdotjs', '#000000'),
    new Skill('Angular', 2, 'angular', '#DD0031'),
    new Skill('Blazor', 2, 'blazor', '#512BD4'),
    new Skill('Tailwind CSS', 3, 'tailwindcss', '#339933'),
    new Skill('SolidJS', 3, 'solid', '#2C4F7C'),
    new Skill('Vue', 1, 'vuedotjs', '#42B883'),
    new Skill('Windows Forms', 2, 'windows', '#0078D6'),
    new Skill('Jest', 3, 'jest', '#C21325'),
    new Skill('Playwright', 2, 'playwright', '#2EAD33'),
);

// Mobile Development
categories['Mobile Development'].push(
    new Skill('Flutter', 4, 'flutter', '#02569B'),
    new Skill('BLoC', 3, 'bloc', '#40B4C4'),
    new Skill('Dio', 3, '', '#007AFF'),
    new Skill('go_router', 2, '', '#FF7043'),
);
categories['DevOps & Tools'].push(
    new Skill('Git', 4, 'git', '#F05032'),
    new Skill('GitHub', 4, 'github', '#181717'),
    new Skill('Docker', 4, 'docker', '#2496ED'),
    new Skill('Podman', 2, 'podman', '#892CA0'),
    new Skill('Nginx', 2, 'nginx', '#009639'),
    new Skill('Azure DevOps', 3, 'azuredevops', '#0078D7'),
    new Skill('Jira', 3, 'jira', '#0052CC'),
    new Skill('Scrum', 3, 'scrumalliance', '#339933'),
    new Skill('Kanban', 2, 'trello', '#0052CC'),
    new Skill('Notion', 3, 'notion', '#000000'),
    new Skill('Excalidraw', 4, 'excalidraw', '#1B72BE'),
    new Skill('draw.io', 3, 'draw-dot-io', '#F08705'),
    new Skill('Obsidian', 4, 'obsidian', '#483699'),
    new Skill('Visio', 1, 'microsoftvisio', '#3955A3'),
    new Skill('Visual Paradigm', 2, '', '#F7B801'),
    new Skill('Figma', 2, 'figma', '#F24E1E')
);
categories['Other'].push(
    new Skill('Clean Architecture', 5, '', '#512BD4'),
    new Skill('Microservices Architecture', 3, '', '#339933'),
    new Skill('MVC Architecture', 3, '', '#512BD4'),
    new Skill('MVVM Architecture', 2, '', '#339933'),
    new Skill('Unity', 3, 'unity', '#222C37'),
);

const ratingColorMap = {
    5: parseColor('#6ad0ffff'),   // Light blue (highest)
    4: parseColor('#81D4FA'),   // Lighter blue
    3: parseColor('#B3E5FC'),   // Even lighter blue
    2: parseColor('#E1F5FE'),   // Very pale blue
    1: parseColor('#FFFFFF'),   // White (lowest)
};

const fs = require('fs');
const path = require('path');

function generateRatedBadge(skill) {
    let logo = skill.logo ? `&logo=${skill.logo}` : '';
    return `<img src="https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${skill.rating}-${ratingColorMap[skill.rating]}?style=for-the-badge&labelColor=${skill.color}${logo}&logoColor=white" alt="${skill.name}" />`;
}
function generateUnratedBadge(skill) {
    let logo = skill.logo ? `&logo=${skill.logo}` : '';
    return `<img src="https://img.shields.io/badge/${encodeURIComponent(skill.name)}-${skill.color}?style=for-the-badge${logo}&logoColor=white" alt="${skill.name}" />`;
}
function generateBadge(skill) {
    return skill.rating ? generateRatedBadge(skill) : generateUnratedBadge(skill);
}

function generateSkillsSection(sort = true) {
    const stops = Object.values(ratingColorMap);
    const percentStep = 100 / (stops.length - 1);
    const gradientStops = stops.map((color, i) => `#${color} ${Math.round(i * percentStep)}%`).join(', ');
    const gradientBar = `
  <p align="center">
    <span style="display: inline-flex; align-items: center; gap: 8px;">
      <b style="vertical-align: middle;">Basic</b>
      <span style="display:inline-block;width:220px;height:28px;border-radius:6px;background:linear-gradient(90deg, ${gradientStops});"></span>
      <b style="vertical-align: middle;">Advanced</b>
    </span>
    <br/>
  </p>
`;
    let output = gradientBar + '\n';
    for (const [category, skills] of Object.entries(categories)) {
        if (skills.length === 0) continue;
        if (sort) skills.sort((a, b) => (b.rating ?? -Infinity) - (a.rating ?? -Infinity));
        output += `### **${category}**\n<p>\n`;
        for (const skill of skills) {
            output += '  ' + generateBadge(skill) + '\n';
        }
        output += '</p>\n\n';
    }
    return output;
}


function updateOrWriteOutput(outputFile, skillsSection) {
    const marker = '<!-- Generated Skills -->';
    if (outputFile && fs.existsSync(outputFile)) {
        let content = fs.readFileSync(outputFile, 'utf8');
        const firstIdx = content.indexOf(marker);
        if (firstIdx !== -1) {
            const secondIdx = content.indexOf(marker, firstIdx + marker.length);
            if (secondIdx !== -1) {
                const before = content.slice(0, firstIdx + marker.length);
                const after = content.slice(secondIdx);
                content = before + '\n' + skillsSection.trim() + '\n' + after;
                fs.writeFileSync(outputFile, content, 'utf8');
                return;
            }
        }
    }
    fs.writeFileSync(outputFile || 'output.md', skillsSection);
}

const outputFile = process.argv[2] ? path.resolve(process.argv[2]) : null;
updateOrWriteOutput(outputFile, generateSkillsSection());

//node skills-generator.js README.md