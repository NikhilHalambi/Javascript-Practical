function formatName(name) {
    return name
      .trim()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  
  function extractEmails(text) {
    let emails = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/g) || [];
    let primary = emails.length > 0 ? emails[0].toLowerCase() : "";
    let alt = emails.slice(1).map(e => e.toLowerCase());
    return { primary, alt };
  }
  
  function validatePhone(text) {
    let phone = text.match(/\+\d{1,3}-\d{10}/);
    if (phone) {
      let num = phone[0].split("-")[1];
      if (/^[6-9]/.test(num)) {
        return phone[0];
      }
    }
    return "Invalid phone number";
  }
  
  function extractSkills(text) {
    let match = text.match(/Skills:\s*(.*)/i);
    if (!match) return [];
    return match[1]
      .split(",")
      .map(s => s.trim())
      .filter(s => s.length > 0);
  }
  
  function extractHashtags(text) {
    return text.match(/#[A-Za-z0-9]+/g) || [];
  }
  
  function extractSalary(text) {
    let match = text.match(/Salary[:\s\w$]*(\d[\d,]*)/i);
    if (!match) return 0;
    return parseInt(match[1].replace(/,/g, ""));
  }
  
  function countWords(text) {
    let words = text.match(/\b\w+\b/g);
    return words ? words.length : 0;
  }
  
  function countVowels(text) {
    let vowels = text.match(/[aeiou]/gi);
    return vowels ? vowels.length : 0;
  }
  
  function analyzeApplication(application) {
    let nameMatch = application.match(/Applicant:\s*(.*)/i);
    let name = nameMatch ? formatName(nameMatch[1]) : "";
  
    let emails = extractEmails(application);
    let phone = validatePhone(application);
    let skills = extractSkills(application);
    let hashtags = extractHashtags(application);
    let salary = extractSalary(application);
    let words = countWords(application);
    let vowels = countVowels(application);
  
    return {
      applicant: name,
      primaryEmail: emails.primary,
      altEmails: emails.alt,
      phone: phone,
      skills: skills,
      hashtags: hashtags,
      salary: salary,
      wordCount: words,
      vowelCount: vowels
    };
  }
  let application1 = `
  Applicant: maRy annE thomPSON
  Primary Email: mary.thompson@GMAIL.com
  Alternate Email: thompson.mary@work.co.in
  Contact: +91-9876543210
  Skills: Java , HTML/CSS , ReactJS , Node.js , SQL
  Cover: I am applying for the role of Full Stack Developer!!
  Expected Salary: $ 75,000 per annum
  Tags: #FullStack #Developer #Java #ReactJS #2025Goals
  `;
  
  let application2 = `
  Applicant: DaNIEL RoBERTsOn
  Primary Email: daniel.rob@company.com
  Alternate Email: drobertson@mail.org dan.rob.personal@GMAIL.COM
  Contact: +91-1234567890
  Skills: Python, Django , Machine Learning,Data Science, AI
  Expected Salary: $120,500 per year
  Note: Please reply only to dan.rob.personal@gmail.com
  Tags: #AI #DataScience #Python #2025Career
  `;
  
  let application3 = `
  Applicant: soPhia WILSON
  Primary Email: sophia.wilson@MAIL.com
  Contact: +44-7896541230
  Skills: C, C++ , Java , JavaScript , React , Angular
  Cover: Looking forward to joining your team...
  Expected Salary: 95000 INR
  Extra Emails: s.wilson@backup.co.uk sophia_alt@work.com
  Tags: #Developer #Engineer #Cplusplus #React #Angular #NewJob
  `;
  
  let application4 = `
  Random Line: Ignore this text completely
  Applicant: keVin O'BRIEN
  Primary Email: kevin.obrien@MAIL.COM
  Alternate Email: obrien.kevin@dev.org
  Contact: +91-7891234567
  Skills: GoLang , Rust, JavaScript , TypeScript, Node.js
  Cover: I am extremely interested in this--role!!!
  Expected Salary: USD 88,750
  Tags: #GoLang #Rust #JavaScript #TypeScript #Node #CoderLife
  `;
  
  console.log("Application 1:", analyzeApplication(application1));
  console.log("Application 2:", analyzeApplication(application2));
  console.log("Application 3:", analyzeApplication(application3));
  console.log("Application 4:", analyzeApplication(application4));
  