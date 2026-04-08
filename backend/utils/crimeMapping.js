// src/utils/crimeMapping.js
import { sectionToCrimeMap } from "../utils/crimeMapping";
export const sectionToCrimeMap = {
  // Homicide / Murder
  "302": "HOMICIDE", "307": "HOMICIDE", "304B": "HOMICIDE",
  // Sexual Assault & POCSO
  "376": "SEXUAL ASSAULT", "375": "SEXUAL ASSAULT", "354": "SEXUAL ASSAULT", 
  "354D": "SEXUAL ASSAULT", "509": "SEXUAL ASSAULT", "4": "SEXUAL ASSAULT", 
  "6": "SEXUAL ASSAULT", "8": "SEXUAL ASSAULT", "14": "SEXUAL ASSAULT", 
  "19": "SEXUAL ASSAULT",
  // Theft & Robbery
  "378": "SHOPLIFTING", "379": "SHOPLIFTING", "380": "BURGLARY", "394": "ROBBERY",
  // Fraud & Tech
  "420": "FRAUD", "406": "FRAUD", "66C": "IDENTITY THEFT", "66D": "CYBERCRIME", "67": "CYBERCRIME",
  // Drugs & Weapons
  "20": "DRUG OFFENSE", "21": "DRUG OFFENSE", "22": "DRUG OFFENSE", 
  "3": "FIREARM OFFENSE", "25": "FIREARM OFFENSE",
  // Traffic
  "184": "TRAFFIC VIOLATION", "185": "TRAFFIC VIOLATION", "279": "TRAFFIC VIOLATION",
  // Assault
  "326": "ASSAULT", "337": "ASSAULT", "338": "ASSAULT",
  "498A": "DOMESTIC VIOLENCE"
};