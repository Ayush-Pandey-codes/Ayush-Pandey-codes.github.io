
const translations = {
  fi: {
    "nav.about": "Tietoa",
    "nav.lab": "Digitaalinen laboratorio",
    "nav.projects": "Projektit",
    "nav.contact": "Yhteystiedot",
    "nav.cta": "Tutustu laboratorioon",
    "hero.eyebrow": "Kehittäjä • Oppija • Rakentaja",
    "hero.title": "Rakennan digitaalisia kokemuksia.",
    "hero.description": "Tutkin teknologiaa, suunnittelen hyödyllisiä työkaluja ja rakennan projekteja oppiakseni uutta.",
    "hero.button": "Tutustu projekteihini",
    "about.title": "Tietoa minusta",
    "lab.title": "Digitaalinen laboratorio",
    "lab.description": "Pieniä työkaluja ja kokeiluja, joita voit käyttää suoraan selaimessasi.",
    "projects.title": "Projektit",
    "contact.title": "Ota yhteyttä",
    "contact.description": "Haluatko tehdä yhteistyötä tai vain sanoa hei? Ota yhteyttä!",
    "footer.text": "Suunniteltu ja rakennettu uteliaisuudella."
  },
  ne: {
    "nav.about": "मेरो बारेमा",
    "nav.lab": "डिजिटल प्रयोगशाला",
    "nav.projects": "परियोजनाहरू",
    "nav.contact": "सम्पर्क",
    "nav.cta": "प्रयोगशाला हेर्नुहोस्",
    "hero.eyebrow": "डेभलपर • विद्यार्थी • निर्माता",
    "hero.title": "म डिजिटल अनुभवहरू निर्माण गर्छु।",
    "hero.description": "म प्रविधिको अन्वेषण गर्छु, उपयोगी उपकरणहरू डिजाइन गर्छु र नयाँ कुरा सिक्न परियोजनाहरू बनाउँछु।",
    "hero.button": "मेरा परियोजनाहरू हेर्नुहोस्",
    "about.title": "मेरो बारेमा",
    "lab.title": "डिजिटल प्रयोगशाला",
    "lab.description": "तपाईंले आफ्नो ब्राउजरमै प्रयोग गर्न सक्ने साना उपकरणहरू र प्रयोगहरू।",
    "projects.title": "परियोजनाहरू",
    "contact.title": "सम्पर्क गर्नुहोस्",
    "contact.description": "सँगै काम गर्न चाहनुहुन्छ वा नमस्कार भन्न चाहनुहुन्छ? सम्पर्क गर्नुहोस्!",
    "footer.text": "जिज्ञासाका साथ डिजाइन र निर्माण गरिएको।"
  }
};

const toolTranslations = {
  fi: [
    ["Värileikkikenttä", "Luo ja tutki väriyhdistelmiä."],
    ["Pieni laskin", "Yksinkertainen laskin jokapäiväisiin laskuihin."],
    ["Salasanageneraattori", "Luo vahvoja ja turvallisia salasanoja."],
    ["Sää", "Tarkista sää ja ennusteet."],
    ["QR Studio", "Luo mukautettuja QR-koodeja ilmaiseksi."]
  ],
  ne: [
    ["रङ खेलमैदान", "रङ संयोजनहरू बनाउनुहोस् र अन्वेषण गर्नुहोस्।"],
    ["सानो क्याल्कुलेटर", "दैनिक हिसाबका लागि सरल क्याल्कुलेटर।"],
    ["पासवर्ड जनरेटर", "बलियो र सुरक्षित पासवर्डहरू बनाउनुहोस्।"],
    ["मौसम", "मौसम र पूर्वानुमान हेर्नुहोस्।"],
    ["QR Studio", "निःशुल्क अनुकूलित QR कोडहरू बनाउनुहोस्।"]
  ]
};

// Save the original English content before changing anything.
const originalText = new Map();
const originalTools = [];

function saveOriginalContent() {
  document.querySelectorAll("[data-i18n]").forEach(element => {
    originalText.set(element, element.innerHTML);
  });

  document.querySelectorAll(".lab-card").forEach(card => {
    const title = card.querySelector("h3");
    const description = card.querySelector("p");

    originalTools.push({
      title: title ? title.innerHTML : null,
      description: description ? description.innerHTML : null
    });
  });
}

function applyLanguage(language) {
  const selectedLanguage = translations[language] ? language : "en";

  document.documentElement.lang = selectedLanguage;

  // Restore the original English content first.
  if (selectedLanguage === "en") {
    originalText.forEach((originalHTML, element) => {
      element.innerHTML = originalHTML;
    });

    document.querySelectorAll(".lab-card").forEach((card, index) => {
      const title = card.querySelector("h3");
      const description = card.querySelector("p");
      const original = originalTools[index];

      if (!original) return;

      if (title && original.title !== null) {
        title.innerHTML = original.title;
      }

      if (description && original.description !== null) {
        description.innerHTML = original.description;
      }
    });

    return;
  }

  // Apply Finnish or Nepali translations.
  document.querySelectorAll("[data-i18n]").forEach(element => {
    const key = element.dataset.i18n;
    const translatedText = translations[selectedLanguage][key];

    if (translatedText !== undefined) {
      element.innerHTML = translatedText;
    }
  });

  const translatedTools = toolTranslations[selectedLanguage];

  document.querySelectorAll(".lab-card").forEach((card, index) => {
    const title = card.querySelector("h3");
    const description = card.querySelector("p");
    const translated = translatedTools[index];

    if (!translated) return;

    if (title) title.textContent = translated[0];
    if (description) description.textContent = translated[1];
  });
}

// Initialize once.
saveOriginalContent();

const languageSelect = document.getElementById("languageSelect");

if (languageSelect) {
  const savedLanguage = localStorage.getItem("ayush-language") || "en";

  languageSelect.value = savedLanguage;
  applyLanguage(savedLanguage);

  languageSelect.addEventListener("change", function () {
    const selectedLanguage = this.value;

    localStorage.setItem("ayush-language", selectedLanguage);
    applyLanguage(selectedLanguage);
  });
}
