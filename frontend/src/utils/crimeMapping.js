export const sectionToCrimeMap = {
  // --- CRIMES AGAINST BODY ---
  "302": "HOMICIDE",
  "307": "HOMICIDE", // Attempted murder mapped to Homicide category
  "304B": "HOMICIDE",
  "326": "ASSAULT",
  "337": "ASSAULT",
  "338": "ASSAULT",
  "363": "KIDNAPPING",
  "375": "SEXUAL ASSAULT",
  "376": "SEXUAL ASSAULT",
  "354": "SEXUAL ASSAULT", // Outraging modesty
  "354D": "SEXUAL ASSAULT", // Stalking (closest match in your CSV)
  "509": "SEXUAL ASSAULT", 

  // --- CRIMES AGAINST PROPERTY ---
  "378": "THEFT",
  "379": "THEFT",
  "380": "BURGLARY",
  "394": "ROBBERY",
  "406": "FRAUD",
  "420": "FRAUD", // Cheating mapped to Fraud
  "411": "THEFT",

  // --- CYBER & IDENTITY ---
  "66C": "IDENTITY THEFT",
  "66D": "FRAUD", // Cheating by personation
  "67": "CYBERCRIME",

  // --- DRUGS & ALCOHOL ---
  "20": "DRUG OFFENSE",
  "21": "DRUG OFFENSE",
  "22": "DRUG OFFENSE",
  "185": "TRAFFIC VIOLATION", // DUI mapped to Traffic

  // --- PUBLIC ORDER & WEAPONS ---
  "124A": "PUBLIC INTOXICATION", // Sedition (no direct match, using public order category)
  "153A": "VANDALISM", // Promoting enmity
  "295A": "VANDALISM",
  "279": "TRAFFIC VIOLATION",
  "184": "TRAFFIC VIOLATION",
  "3": "FIREARM OFFENSE",
  "25": "FIREARM OFFENSE",
  "498A": "DOMESTIC VIOLENCE",

  // --- PROCEDURAL (CrPC) ---
  // These usually don't have stats in a crime CSV, but we map them to the 
  // most likely category they appear in so the box isn't empty.
  "41": "PUBLIC INTOXICATION", 
  "91": "FRAUD",
  "154": "HOMICIDE",
  "160": "ASSAULT",
  "173": "ROBBERY"
};
