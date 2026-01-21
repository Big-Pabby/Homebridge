export const NIGERIAN_STATES = [
  { value: "abia", label: "Abia" },
  { value: "adamawa", label: "Adamawa" },
  { value: "akwa-ibom", label: "Akwa Ibom" },
  { value: "anambra", label: "Anambra" },
  { value: "bauchi", label: "Bauchi" },
  { value: "bayelsa", label: "Bayelsa" },
  { value: "benue", label: "Benue" },
  { value: "borno", label: "Borno" },
  { value: "cross-river", label: "Cross River" },
  { value: "delta", label: "Delta" },
  { value: "ebonyi", label: "Ebonyi" },
  { value: "edo", label: "Edo" },
  { value: "ekiti", label: "Ekiti" },
  { value: "enugu", label: "Enugu" },
  { value: "fct", label: "FCT" },
  { value: "gombe", label: "Gombe" },
  { value: "imo", label: "Imo" },
  { value: "jigawa", label: "Jigawa" },
  { value: "kaduna", label: "Kaduna" },
  { value: "kano", label: "Kano" },
  { value: "katsina", label: "Katsina" },
  { value: "kebbi", label: "Kebbi" },
  { value: "kogi", label: "Kogi" },
  { value: "kwara", label: "Kwara" },
  { value: "lagos", label: "Lagos" },
  { value: "nasarawa", label: "Nasarawa" },
  { value: "niger", label: "Niger" },
  { value: "ogun", label: "Ogun" },
  { value: "ondo", label: "Ondo" },
  { value: "osun", label: "Osun" },
  { value: "oyo", label: "Oyo" },
  { value: "plateau", label: "Plateau" },
  { value: "rivers", label: "Rivers" },
  { value: "sokoto", label: "Sokoto" },
  { value: "taraba", label: "Taraba" },
  { value: "yobe", label: "Yobe" },
  { value: "zamfara", label: "Zamfara" },
];

export const NIGERIAN_CITIES: Record<
  string,
  Array<{ value: string; label: string }>
> = {
  lagos: [
    { value: "ikeja", label: "Ikeja" },
    { value: "lekki", label: "Lekki" },
    { value: "victoria-island", label: "Victoria Island" },
    { value: "ikoyi", label: "Ikoyi" },
    { value: "ajah", label: "Ajah" },
    { value: "epe", label: "Epe" },
    { value: "badagry", label: "Badagry" },
    { value: "shomolu", label: "Shomolu" },
    { value: "surulere", label: "Surulere" },
    { value: "mushin", label: "Mushin" },
  ],
  fct: [
    { value: "abuja", label: "Abuja" },
    { value: "kubwa", label: "Kubwa" },
    { value: "mabushi", label: "Mabushi" },
    { value: "asokoro", label: "Asokoro" },
    { value: "garki", label: "Garki" },
    { value: "wuse", label: "Wuse" },
    { value: "maitama", label: "Maitama" },
    { value: "ikoyi-guzape", label: "Ikoyi Guzape" },
  ],
  rivers: [
    { value: "port-harcourt", label: "Port Harcourt" },
    { value: "obio-akpor", label: "Obio-Akpor" },
    { value: "eleme", label: "Eleme" },
    { value: "oyigbo", label: "Oyigbo" },
    { value: "degema", label: "Degema" },
  ],
  oyo: [
    { value: "ibadan", label: "Ibadan" },
    { value: "lGB", label: "Lagelu" },
    { value: "ido", label: "Ido" },
    { value: "akinyele", label: "Akinyele" },
    { value: "moniya", label: "Moniya" },
  ],
  ogun: [
    { value: "abeokuta", label: "Abeokuta" },
    { value: "ijebu-ode", label: "Ijebu-Ode" },
    { value: "sagamu", label: "Sagamu" },
    { value: "serap", label: "Serap" },
  ],
  kano: [
    { value: "kano", label: "Kano" },
    { value: "karaye", label: "Karaye" },
    { value: "gwarzo", label: "Gwarzo" },
  ],
  kaduna: [
    { value: "kaduna", label: "Kaduna" },
    { value: "zaria", label: "Zaria" },
    { value: "kafanchan", label: "Kafanchan" },
  ],
  edo: [
    { value: "benin-city", label: "Benin City" },
    { value: "auchi", label: "Auchi" },
    { value: "uromi", label: "Uromi" },
  ],
  delta: [
    { value: "warri", label: "Warri" },
    { value: "asaba", label: "Asaba" },
    { value: "ughelli", label: "Ughelli" },
  ],
  enugu: [
    { value: "enugu", label: "Enugu" },
    { value: "nsukka", label: "Nsukka" },
    { value: "ugwuati", label: "Ugwuati" },
  ],
  anambra: [
    { value: "onitsha", label: "Onitsha" },
    { value: "awka", label: "Awka" },
    { value: "nnewi", label: "Nnewi" },
  ],
  imo: [
    { value: "owerri", label: "Owerri" },
    { value: "orlu", label: "Orlu" },
    { value: "okigwe", label: "Okigwe" },
  ],
  abia: [
    { value: "aba", label: "Aba" },
    { value: "umuahia", label: "Umuahia" },
    { value: "arochukwu", label: "Arochukwu" },
  ],
  ebonyi: [
    { value: "abakaliki", label: "Abakaliki" },
    { value: "onueke", label: "Onueke" },
  ],
  cross_river: [
    { value: "calabar", label: "Calabar" },
    { value: "buea", label: "Buea" },
  ],
  akwa_ibom: [
    { value: "uyo", label: "Uyo" },
    { value: "eket", label: "Eket" },
    { value: "ikot-ekpene", label: "Ikot Ekpene" },
  ],
  bayelsa: [
    { value: "yenagoa", label: "Yenagoa" },
    { value: "brass", label: "Brass" },
  ],
  plateau: [
    { value: "jos", label: "Jos" },
    { value: "bukuru", label: "Bukuru" },
  ],
  nasarawa: [
    { value: "lafia", label: "Lafia" },
    { value: "keffi", label: "Keffi" },
  ],
  benue: [
    { value: "makurdi", label: "Makurdi" },
    { value: "otukpo", label: "Otukpo" },
  ],
  kogi: [
    { value: "lokoja", label: "Lokoja" },
    { value: "okene", label: "Okene" },
  ],
  kwara: [
    { value: "ilorin", label: "Ilorin" },
    { value: "offa", label: "Offa" },
  ],
  osun: [
    { value: "osogbo", label: "Osogbo" },
    { value: "ilesha", label: "Ilesha" },
    { value: "iwo", label: "Iwo" },
  ],
  ekiti: [
    { value: "ado-ekiti", label: "Ado-Ekiti" },
    { value: "ikere", label: "Ikere" },
  ],
  ondo: [
    { value: "akure", label: "Akure" },
    { value: "ondo-town", label: "Ondo Town" },
    { value: "okitipupa", label: "Okitipupa" },
  ],
  jigawa: [
    { value: "dutse", label: "Dutse" },
    { value: "hadejia", label: "Hadejia" },
  ],
  katsina: [
    { value: "katsina", label: "Katsina" },
    { value: "daura", label: "Daura" },
  ],
  kebbi: [
    { value: "birnin-kebbi", label: "Birnin Kebbi" },
    { value: "argungu", label: "Argungu" },
  ],
  sokoto: [
    { value: "sokoto", label: "Sokoto" },
    { value: "gusau", label: "Gusau" },
  ],
  zamfara: [
    { value: "gusau", label: "Gusau" },
    { value: "kaura-namoda", label: "Kaura Namoda" },
  ],
  adamawa: [
    { value: "yola", label: "Yola" },
    { value: "girei", label: "Girei" },
  ],
  bauchi: [
    { value: "bauchi", label: "Bauchi" },
    { value: "jos", label: "Jos" },
  ],
  borno: [
    { value: "maiduguri", label: "Maiduguri" },
    { value: "biu", label: "Biu" },
  ],
  gombe: [
    { value: "gombe", label: "Gombe" },
    { value: "kumo", label: "Kumo" },
  ],
  niger: [
    { value: "minna", label: "Minna" },
    { value: "bida", label: "Bida" },
  ],
  taraba: [
    { value: "jalingo", label: "Jalingo" },
    { value: "takum", label: "Takum" },
  ],
  yobe: [
    { value: "damaturu", label: "Damaturu" },
    { value: "potiskum", label: "Potiskum" },
  ],
};

export const getCitiesByState = (state: string) => {
  return NIGERIAN_CITIES[state] || [];
};
