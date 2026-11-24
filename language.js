
const languageSelect = document.getElementById("languageSelect");

const translations = {
  fi: {
    "#navLinks a:nth-child(1)": "Tietoa",
    "#navLinks a:nth-child(2)": "Digilabra",
    "#navLinks a:nth-child(3)": "Projektit",
    "#navLinks a:nth-child(4)": "Yhteystiedot",
    ".nav-cta": "Tutustu labraan ↗",
    ".availability": "OPISKELIJA · LUOJA · TUTKIJA",
    ".hero-copy .eyebrow": "HEI, MAAILMA ✳",
    ".hero h1": "Utelias mieli.<br><span class=\"gradient-text\">Rakentajan asenne.</span>",
    ".hero-intro": "Olen Ayush Pandey — Laurea-ammattikorkeakoulun opiskelija, alun perin Nepalista ja nyt Suomessa. Pidän teknologiasta, käytännön oppimisesta ja pienten ideoiden muuttamisesta hyödyllisiksi asioiksi.",
    ".hero-actions a:nth-child(1)": "Tutustu töihini ↗",
    ".hero-actions a:nth-child(2)": "Tietoa minusta ↓",
    ".hero-meta span:nth-child(3)": "Nepalilaiset juuret, maailmanlaajuinen uteliaisuus",
    ".hero-scroll": "VIERITÄ TUTUSTUAKSESI",
    "#about .section-kicker": "01 / IHMINEN PIKSELIEN TAKANA",
    "#about .section-heading h2": "Oppimista <span class=\"gradient-text\">rakentamalla.</span>",
    "#about .lead": "Tervetuloa pieneen nurkkaani internetissä.",
    "#about .about-copy p:nth-of-type(2)": "Olen Ayush Pandey, alun perin Nepalista ja opiskelen tällä hetkellä Laurea-ammattikorkeakoulussa Suomessa.",
    "#about .about-copy p:nth-of-type(3)": "Pidän teknologiasta, ohjelmoinnin oppimisesta, verkkokehityksen kokeilemisesta ja digitaalisten asioiden toiminnan ymmärtämisestä. Tämä sivusto kokoaa tekemäni asiat, ideani ja oppimani asiat.",
    "#about .text-link": "Onko sinulla idea? Jutellaan ↗",
    ".profile-role": "Opiskelija ja teknologiasta kiinnostunut",
    "#lab .section-kicker": "02 / KOKEILUT JA TYÖKALUT",
    "#lab .section-heading h2": "Tervetuloa <span class=\"gradient-text\">labraani.</span>",
    "#lab .heading-note": "Pieniä kokeiluja. Hyödyllisiä työkaluja.<br>Rakennettu uteliailla klikkauksilla.",
    "#projects .section-kicker": "03 / VALITUT TYÖT",
    "#projects .section-heading h2": "Rakennettu <span class=\"gradient-text\">uteliaisuudesta.</span>",
    "#projects .heading-note": "Jokainen projekti on mahdollisuus<br>oppia jotain uutta.",
    "#contact .section-kicker": "04 / SINUN VUOROSI",
    "#contact h2": "Onko sinulla idea?<br><span class=\"gradient-text\">Tehdään siitä totta.</span>",
    "#contact .contact-inner > p:not(.section-kicker)": "Olen aina kiinnostunut uusista ideoista, mahdollisuuksista ja yhteistyöstä. Lähetä minulle viesti.",
    "#contact .button": "Lähetä viesti ↗",
    ".back-top": "TAKAISIN YLÖS ↑"
  },

  ne: {
    "#navLinks a:nth-child(1)": "मेरो बारेमा",
    "#navLinks a:nth-child(2)": "डिजिटल ल्याब",
    "#navLinks a:nth-child(3)": "परियोजनाहरू",
    "#navLinks a:nth-child(4)": "सम्पर्क",
    ".nav-cta": "ल्याब हेर्नुहोस् ↗",
    ".availability": "विद्यार्थी · सिर्जनाकर्ता · अन्वेषक",
    ".hero-copy .eyebrow": "नमस्ते, संसार ✳",
    ".hero h1": "जिज्ञासु मन।<br><span class=\"gradient-text\">निर्माण गर्ने सोच।</span>",
    ".hero-intro": "म आयुष पाण्डे हुँ — Laurea UAS मा अध्ययनरत विद्यार्थी, मूल रूपमा नेपालबाट र अहिले फिनल्यान्डमा। मलाई प्रविधि खोज्न, गरेर सिक्न र साना विचारलाई उपयोगी चीजमा बदल्न मन पर्छ।",
    ".hero-actions a:nth-child(1)": "मेरो काम हेर्नुहोस् ↗",
    ".hero-actions a:nth-child(2)": "मेरो बारेमा ↓",
    ".hero-meta span:nth-child(3)": "नेपाली जरा, विश्वव्यापी जिज्ञासा",
    ".hero-scroll": "हेर्न तल स्क्रोल गर्नुहोस्",
    "#about .section-kicker": "01 / पिक्सेल पछाडिको व्यक्ति",
    "#about .section-heading h2": "निर्माण गरेर <span class=\"gradient-text\">सिक्दै।</span>",
    "#about .lead": "मेरो इन्टरनेटको सानो संसारमा स्वागत छ।",
    "#about .about-copy p:nth-of-type(2)": "म आयुष पाण्डे हुँ, मूल रूपमा नेपालबाट र अहिले फिनल्यान्डको Laurea University of Applied Sciences मा अध्ययन गर्दैछु।",
    "#about .about-copy p:nth-of-type(3)": "मलाई प्रविधि, प्रोग्रामिङ सिक्न, वेब विकासमा प्रयोग गर्न र डिजिटल चीजहरू कसरी काम गर्छन् भन्ने बुझ्न मन पर्छ। यो वेबसाइटमा मेरा काम, विचार र सिकाइहरू छन्।",
    "#about .text-link": "केही विचार छ? कुरा गरौँ ↗",
    ".profile-role": "विद्यार्थी र प्रविधि प्रेमी",
    "#lab .section-kicker": "02 / प्रयोग र उपयोगी उपकरणहरू",
    "#lab .section-heading h2": "मेरो <span class=\"gradient-text\">ल्याबमा स्वागत छ।</span>",
    "#lab .heading-note": "साना प्रयोगहरू। उपयोगी उपकरणहरू।<br>जिज्ञासाका साथ बनाइएका।",
    "#projects .section-kicker": "03 / छानिएका कामहरू",
    "#projects .section-heading h2": "जिज्ञासाबाट <span class=\"gradient-text\">निर्माण।</span>",
    "#projects .heading-note": "हरेक परियोजना नयाँ कुरा<br>सिक्ने अवसर हो।",
    "#contact .section-kicker": "04 / अब तपाईंको पालो",
    "#contact h2": "कुनै विचार छ?<br><span class=\"gradient-text\">यसलाई वास्तविक बनाऔँ।</span>",
    "#contact .contact-inner > p:not(.section-kicker)": "म नयाँ विचार, अवसर र सहकार्यमा सधैँ रुचि राख्छु। मलाई सन्देश पठाउनुहोस्।",
    "#contact .button": "सम्पर्क गर्नुहोस् ↗",
    ".back-top": "माथि फर्कनुहोस् ↑"
  }
};

const toolTranslations = {
  fi: [
    ["Värileikkikenttä", "Luo värejä, tutki paletteja ja löydä yhdistelmiä luoviin ideoihisi.", "Avaa värigeneraattori ↗"],
    ["Laskin", "Yksinkertainen responsiivinen laskin, jossa on näppäimistötuki ja laskuhistoria.", "Avaa laskin ↗"],
    ["Salasanageneraattori", "Luo vahvoja satunnaisia salasanoja säädettävällä pituudella ja merkeillä.", "Avaa salasanageneraattori ↗"],
    ["Sääpalvelu", "Tutki sääennusteita, ilmanlaatua, tuntikohtaisia olosuhteita ja 7 päivän ennustetta.", "Tutki säätä ↗"],
    ["QR Studio", "Luo mukautettuja QR-koodeja linkeille, tekstille, Wi-Fi:lle, sähköpostille ja muulle. Lataa PNG- tai SVG-muodossa.", "Avaa QR Studio ↗"]
  ],
  ne: [
    ["रङ्ग प्रयोगशाला", "रङ्गहरू बनाउनुहोस्, प्यालेटहरू हेर्नुहोस् र आफ्ना विचारका लागि संयोजन खोज्नुहोस्।", "रङ्ग जनरेटर खोल्नुहोस् ↗"],
    ["सानो क्याल्कुलेटर", "किबोर्ड समर्थन र हिसाबको इतिहास भएको सरल र उत्तरदायी क्याल्कुलेटर।", "क्याल्कुलेटर खोल्नुहोस् ↗"],
    ["पासवर्ड जनरेटर", "लम्बाइ र अक्षर विकल्पहरू मिलाएर बलिया अनियमित पासवर्ड बनाउनुहोस्।", "पासवर्ड जनरेटर खोल्नुहोस् ↗"],
    ["मौसम जानकारी", "मौसम पूर्वानुमान, हावाको गुणस्तर, घण्टागत अवस्था र ७ दिनको पूर्वानुमान हेर्नुहोस्।", "मौसम हेर्नुहोस् ↗"],
    ["QR Studio", "लिङ्क, पाठ, Wi-Fi, इमेल र अन्यका लागि QR कोड बनाउनुहोस्। PNG वा SVG मा डाउनलोड गर्नुहोस्।", "QR Studio खोल्नुहोस् ↗"]
  ]
};

const projectTranslations = {
  fi: [
    ["Värigeneraattori", "Interaktiivinen värityökalu värien löytämiseen ja palettien luomiseen.", "Tutustu projektiin ↗"],
    ["Laskin", "Responsiivinen laskin tavallisilla matemaattisilla toiminnoilla, näppäimistötuella ja historialla.", "Tutustu projektiin ↗"],
    ["Salasanageneraattori", "Luo satunnaisia salasanoja selaimessa joustavilla pituus- ja merkkiasetuksilla.", "Tutustu projektiin ↗"],
    ["Sääpalvelu", "Sään hallintapaneeli, jossa on ennusteet, ilmanlaatu, tuntitiedot sekä auringonnousu ja -lasku.", "Tutustu projektiin ↗"]
  ],
  ne: [
    ["रङ्ग जनरेटर", "रङ्ग खोज्न र डिजिटल परियोजनाका लागि प्यालेट बनाउन प्रयोग हुने अन्तरक्रियात्मक उपकरण।", "परियोजना हेर्नुहोस् ↗"],
    ["सानो क्याल्कुलेटर", "सामान्य गणित, किबोर्ड समर्थन र इतिहास भएको उत्तरदायी क्याल्कुलेटर।", "परियोजना हेर्नुहोस् ↗"],
    ["पासवर्ड जनरेटर", "ब्राउजरमै लम्बाइ र अक्षर विकल्प मिलाएर अनियमित पासवर्ड बनाउनुहोस्।", "परियोजना हेर्नुहोस् ↗"],
    ["मौसम जानकारी", "पूर्वानुमान, हावाको गुणस्तर, घण्टागत अवस्था, सूर्योदय र सूर्यास्तसहितको मौसम ड्यासबोर्ड।", "परियोजना हेर्नुहोस् ↗"]
  ]
};

function applyLanguage(language) {
  const dictionary = translations[language] || {};

  document.documentElement.lang = language;

  for (const [selector, translatedHTML] of Object.entries(dictionary)) {
    const element = document.querySelector(selector);
    if (element) element.innerHTML = translatedHTML;
  }

  const toolCards = document.querySelectorAll("#lab .tool-card");
  const toolData = toolTranslations[language];

  if (toolData) {
    toolCards.forEach((card, index) => {
      const data = toolData[index];
      if (!data) return;
      card.querySelector("h3").textContent = data[0];
      card.querySelector("p").textContent = data[1];
      card.querySelector(".card-link").innerHTML = data[2];
    });
  }

  const projectRows = document.querySelectorAll("#projects .project-row");
  const projectData = projectTranslations[language];

  if (projectData) {
    projectRows.forEach((row, index) => {
      const data = projectData[index];
      if (!data) return;
      row.querySelector("h3").textContent = data[0];
      row.querySelector(".project-details p").textContent = data[1];
      row.querySelector(".project-details .text-link").innerHTML = data[2];
    });
  }

  try {
    localStorage.setItem("ayush-language", language);
  } catch (_) {}
}

if (languageSelect) {
  let savedLanguage = "en";

  try {
    savedLanguage = localStorage.getItem("ayush-language") || "en";
  } catch (_) {}

  languageSelect.value = savedLanguage;
  applyLanguage(savedLanguage);

  languageSelect.addEventListener("change", () => {
    applyLanguage(languageSelect.value);
  });
}
