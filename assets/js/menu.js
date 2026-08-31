// Mealnova — filterable photo menu. Data-driven so en/hi/mr share one source.
(function () {
  "use strict";

  var IMG = "https://images.unsplash.com/photo-";
  var Q = "?auto=format&fit=crop&w=640&q=68";

  var CATS = [
    { id: "all",    en: "All",            hi: "सभी",              mr: "सर्व" },
    { id: "thali",  en: "Thali",          hi: "थाली",             mr: "थाळी" },
    { id: "mains",  en: "Mains",          hi: "मुख्य व्यंजन",       mr: "मुख्य पदार्थ" },
    { id: "rice",   en: "Rice & Breads",  hi: "चावल और ब्रेड",     mr: "भात व पोळी" },
    { id: "south",  en: "South Indian",   hi: "दक्षिण भारतीय",     mr: "दक्षिण भारतीय" },
    { id: "snacks", en: "Snacks",         hi: "स्नैक्स",            mr: "स्नॅक्स" },
    { id: "sweets", en: "Sweets",         hi: "मिठाई",             mr: "मिठाई" }
  ];

  var DISHES = [
    { img: "1742281257687-092746ad6021", cat: "thali",
      en: ["Premium Thali", "A full spread — curries, dal, rice, roti, salad and a sweet."],
      hi: ["प्रीमियम थाली", "करी, दाल, चावल, रोटी, सलाद और मिठाई — भरपूर थाली।"],
      mr: ["प्रीमियम थाळी", "करी, डाळ, भात, पोळी, सॅलड आणि गोड — भरगच्च थाळी."] },
    { img: "1631452180519-c014fe946bc7", cat: "mains",
      en: ["Shahi Paneer", "Paneer in a rich cashew-tomato gravy."],
      hi: ["शाही पनीर", "काजू-टमाटर की मलाईदार ग्रेवी में पनीर।"],
      mr: ["शाही पनीर", "काजू-टोमॅटोच्या मलईदार ग्रेव्हीतील पनीर."] },
    { img: "1631452180539-96aca7d48617", cat: "mains",
      en: ["Paneer Butter Masala", "Cottage cheese simmered in silky makhani gravy."],
      hi: ["पनीर बटर मसाला", "रेशमी मखनी ग्रेवी में पका पनीर।"],
      mr: ["पनीर बटर मसाला", "रेशमी मखनी ग्रेव्हीत शिजवलेला पनीर."] },
    { img: "1708782340380-536df8cf6784", cat: "mains",
      en: ["Dal Makhani", "Black lentils slow-cooked with butter and cream."],
      hi: ["दाल मखनी", "मक्खन और क्रीम में धीमी आँच पर पकी काली दाल।"],
      mr: ["डाळ मखनी", "लोणी आणि क्रीममध्ये मंद आचेवर शिजवलेली काळी डाळ."] },
    { img: "1697155406121-85aac6236000", cat: "mains",
      en: ["Dal Tadka", "Yellow lentils tempered with cumin and garlic."],
      hi: ["दाल तड़का", "जीरा और लहसुन के तड़के वाली पीली दाल।"],
      mr: ["डाळ तडका", "जिरे व लसणाची फोडणी दिलेली पिवळी डाळ."] },
    { img: "1630409346824-4f0e7b080087", cat: "rice",
      en: ["Veg Pulao", "Fragrant basmati tossed with seasonal vegetables."],
      hi: ["वेज पुलाव", "मौसमी सब्ज़ियों के साथ खुशबूदार बासमती।"],
      mr: ["व्हेज पुलाव", "हंगामी भाज्यांसह सुगंधी बासमती."] },
    { img: "1697155406014-04dc649b0953", cat: "rice",
      en: ["Butter Naan", "Soft tandoor-baked bread, brushed with butter."],
      hi: ["बटर नान", "तंदूर में सिकी नरम रोटी, मक्खन लगी।"],
      mr: ["बटर नान", "तंदूरमध्ये भाजलेली मऊ पोळी, लोणी लावलेली."] },
    { img: "1668236543090-82eba5ee5976", cat: "south",
      en: ["Masala Dosa", "Crisp rice crêpe with spiced potato, chutney & sambar."],
      hi: ["मसाला डोसा", "कुरकुरा डोसा, मसालेदार आलू, चटनी और सांबर के साथ।"],
      mr: ["मसाला डोसा", "कुरकुरीत डोसा, मसालेदार बटाटा, चटणी व सांबारसह."] },
    { img: "1694849789325-914b71ab4075", cat: "south",
      en: ["Rava Dosa", "Lacy semolina dosa, served with sambar and chutney."],
      hi: ["रवा डोसा", "जालीदार सूजी डोसा, सांबर और चटनी के साथ।"],
      mr: ["रवा डोसा", "जाळीदार रवा डोसा, सांबार व चटणीसह."] },
    { img: "1567188040759-fb8a883dc6d8", cat: "snacks",
      en: ["Paneer Tikka", "Char-grilled paneer marinated in spiced yoghurt."],
      hi: ["पनीर टिक्का", "मसालेदार दही में मैरिनेट किया ग्रिल्ड पनीर।"],
      mr: ["पनीर टिक्का", "मसालेदार दह्यात मुरवलेला ग्रिल्ड पनीर."] },
    { img: "1601050690597-df0568f70950", cat: "snacks",
      en: ["Samosa", "Crisp pastry filled with spiced potato and peas."],
      hi: ["समोसा", "मसालेदार आलू-मटर भरा कुरकुरा समोसा।"],
      mr: ["समोसा", "मसालेदार बटाटा-मटार भरलेला कुरकुरीत समोसा."] },
    { img: "1593701461250-d7b22dfd3a77", cat: "sweets",
      en: ["Gulab Jamun", "Warm milk dumplings soaked in cardamom syrup."],
      hi: ["गुलाब जामुन", "इलायची की चाशनी में डूबे गरम गुलाब जामुन।"],
      mr: ["गुलाब जामुन", "वेलचीच्या पाकात बुडवलेले गरम गुलाब जामुन."] }
  ];

  var VEG = { en: "Pure veg", hi: "शुद्ध शाकाहारी", mr: "शुद्ध शाकाहारी" };

  var tabsEl = document.getElementById("menu-tabs");
  var gridEl = document.getElementById("menu-dishes");
  if (!tabsEl || !gridEl) return;

  var lang = (document.documentElement.lang || "en").slice(0, 2);
  if (["en", "hi", "mr"].indexOf(lang) < 0) lang = "en";
  var catLabel = function (c) { return c[lang] || c.en; };

  // Build tabs
  CATS.forEach(function (c, i) {
    var b = document.createElement("button");
    b.className = "menu-tab";
    b.type = "button";
    b.textContent = catLabel(c);
    b.setAttribute("role", "tab");
    b.setAttribute("data-cat", c.id);
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    tabsEl.appendChild(b);
  });

  // Build cards
  DISHES.forEach(function (d) {
    var t = d[lang] || d.en;
    var cat = CATS.filter(function (c) { return c.id === d.cat; })[0];
    var card = document.createElement("article");
    card.className = "dish";
    card.setAttribute("data-cat", d.cat);
    card.innerHTML =
      '<div class="dish-img">' +
        '<span class="dish-cat">' + catLabel(cat) + '</span>' +
        '<img loading="lazy" alt="' + t[0] + '" src="' + IMG + d.img + Q + '" ' +
          'onerror="this.style.display=\'none\'" />' +
      '</div>' +
      '<div class="dish-body">' +
        '<h3>' + t[0] + '</h3>' +
        '<p>' + t[1] + '</p>' +
        '<span class="dish-veg"><span class="box"></span>' + (VEG[lang] || VEG.en) + '</span>' +
      '</div>';
    gridEl.appendChild(card);
  });

  // Filtering
  tabsEl.addEventListener("click", function (e) {
    var tab = e.target.closest(".menu-tab");
    if (!tab) return;
    var cat = tab.getAttribute("data-cat");
    tabsEl.querySelectorAll(".menu-tab").forEach(function (t) {
      t.setAttribute("aria-selected", String(t === tab));
    });
    gridEl.querySelectorAll(".dish").forEach(function (card) {
      card.hidden = !(cat === "all" || card.getAttribute("data-cat") === cat);
    });
  });
})();
