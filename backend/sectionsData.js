const sectionsData = [
  
  {
    sectionNumber: "307",
    lawType: "IPC",
    sectionName: "Attempt to Murder",
    description: "Covers any act done with the intention or knowledge to commit murder but which does not result in death.",
    punishment: "Imprisonment up to 10 years, extendable to life, and fine.",
    investigationSteps: [
      "Collect weapon used (if any).",
      "Record victim’s medical report.",
      "Gather eyewitnesses."
    ],
    requiredDocuments: ["FIR", "Medical certificate", "Forensic report"],
    relatedSections: ["302", "324"],
    referenceLink: "https://indiankanoon.org/doc/1374721/",
    notesForPolice: "Intent must be proven for attempt to murder.",
    importantCases: [
      {
        caseName: "State of M.P. v. Saleem",
        citation: "(2005) 5 SCC 554",
        summary: "Clarified distinction between grievous hurt and attempt to murder."
      }
    ],

  },
  {
    sectionNumber: "302",
    lawType: "IPC",
    sectionName: "Murder",
    description: "Defines punishment for murder committed with intent or knowledge.",
    punishment: "Death penalty or life imprisonment and fine.",
    investigationSteps: [
      "Conduct post-mortem examination.",
      "Secure crime scene.",
      "Collect forensic and ballistic evidence."
    ],
    requiredDocuments: ["Post-mortem report", "Forensic report", "FIR"],
    relatedSections: ["304", "307"],
    referenceLink: "https://indiankanoon.org/doc/1569253/",
    notesForPolice: "Ensure chain of custody for all forensic evidence.",
    importantCases: [
      {
        caseName: "Bachan Singh v. State of Punjab",
        citation: "(1980) 2 SCC 684",
        summary: "Laid down 'rarest of rare' doctrine for death penalty."
      }
    ]
  },
  {
    sectionNumber: "420",
    lawType: "IPC",
    sectionName: "Cheating and Dishonestly Inducing Delivery of Property",
    description: "Covers acts of cheating where property or money is dishonestly induced to be delivered.",
    punishment: "Imprisonment up to 7 years and fine.",
    investigationSteps: [
      "Collect transaction documents.",
      "Verify money trail.",
      "Record complainant and witnesses."
    ],
    requiredDocuments: ["FIR", "Bank records", "Witness statements"],
    relatedSections: ["406", "415"],
    referenceLink: "https://indiankanoon.org/doc/1565630/",
    notesForPolice: "Key is proving dishonest intention at the beginning.",
    importantCases: [
      {
        caseName: "Hridaya Ranjan v. State of Bihar",
        citation: "(2000) 4 SCC 168",
        summary: "Explained difference between cheating and breach of contract."
      }
    ]
  },
  {
    sectionNumber: "406",
    lawType: "IPC",
    sectionName: "Criminal Breach of Trust",
    description: "Covers misappropriation of entrusted property or dishonest use.",
    punishment: "Imprisonment up to 3 years, or fine, or both.",
    investigationSteps: [
      "Check entrustment of property.",
      "Collect agreements/contracts.",
      "Obtain financial records."
    ],
    requiredDocuments: ["FIR", "Property documents"],
    relatedSections: ["420", "409"],
    referenceLink: "https://indiankanoon.org/doc/1578654/",
    notesForPolice: "Entrustment is a key element.",
    importantCases: [
      {
        caseName: "State of Gujarat v. Jaswantlal Nathalal",
        citation: "AIR 1968 SC 700",
        summary: "Clarified entrustment in breach of trust cases."
      }
    ]
  },
  {
    sectionNumber: "376",
    lawType: "IPC",
    sectionName: "Punishment for Rape",
    description: "Provides punishment for rape, varying with circumstances.",
    punishment: "Imprisonment not less than 10 years, extendable to life, and fine.",
    investigationSteps: [
      "Victim statement under Sec 164 CrPC.",
      "Medical and forensic examination.",
      "Collect DNA samples."
    ],
    requiredDocuments: ["Victim statement", "Medical report", "FIR"],
    relatedSections: ["375", "354"],
    referenceLink: "https://indiankanoon.org/doc/1836972/",
    notesForPolice: "Follow strict victim protection laws.",
    importantCases: [
      {
        caseName: "State of Punjab v. Gurmit Singh",
        citation: "(1996) 2 SCC 384",
        summary: "Testimony of rape survivor sufficient without corroboration."
      }
    ]
  },
  {
    sectionNumber: "354D",
    lawType: "IPC",
    sectionName: "Stalking",
    description: "Covers following, contacting, or monitoring a woman despite her disinterest.",
    punishment: "Imprisonment up to 3 years (first offence) and 5 years (repeat), with fine.",
    investigationSteps: [
      "Record victim complaint.",
      "Check call records/social media.",
      "Collect CCTV or eyewitnesses."
    ],
    requiredDocuments: ["FIR", "Digital records"],
    relatedSections: ["354", "509"],
    referenceLink: "https://indiankanoon.org/doc/23591247/",
    notesForPolice: "Applicable mostly in cybercrime or harassment cases.",
    importantCases: [
      {
        caseName: "Kalandi Charan Lenka v. State of Odisha",
        citation: "2017 Cri LJ 2051",
        summary: "Cyberstalking considered under Section 354D."
      }
    ]
  },
  {
    sectionNumber: "67",
    lawType: "IT Act",
    sectionName: "Publishing or Transmitting Obscene Material in Electronic Form",
    description: "Covers publishing or transmitting obscene material electronically, including websites, apps, or messaging platforms.",
    punishment: "Imprisonment up to 3 years and fine up to ₹5 lakh (first conviction). For subsequent conviction, imprisonment up to 5 years and fine up to ₹10 lakh.",
    investigationSteps: [
      "Seize digital devices and servers used for uploading material.",
      "Obtain forensic analysis from cyber cell.",
      "Trace IP address and user accounts.",
      "Record victim/witness statement if harassment involved."
    ],
    requiredDocuments: ["FIR", "Cyber forensic report", "IP logs", "Screenshots of obscene material"],
    relatedSections: ["67A", "67B", "66E IT Act"],
    referenceLink: "https://indiankanoon.org/doc/1563969/",
    notesForPolice: "Chain of custody for digital evidence must be strictly maintained to avoid tampering challenges in court.",
    importantCases: [
      {
        caseName: "Avnish Bajaj v. State (Bazee.com Case)",
        citation: "2005 (Delhi HC)",
        summary: "Established liability of intermediaries in publishing obscene material online."
      }
    ]
  },
  {
    sectionNumber: "66C",
    lawType: "IT Act",
    sectionName: "Identity Theft",
    description: "Covers fraudulent use of another person’s electronic signature, password, or digital identity.",
    punishment: "Imprisonment up to 3 years and fine up to ₹1 lakh.",
    investigationSteps: [
      "Trace IP address and accounts accessed.",
      "Seize devices and verify login patterns.",
      "Collect bank or transaction records if fraud is financial."
    ],
    requiredDocuments: ["FIR", "Cyber forensic report", "Bank/transaction records"],
    relatedSections: ["66D IT Act"],
    referenceLink: "https://indiankanoon.org/doc/1947561/",
    notesForPolice: "Identity theft often linked with phishing or fraud cases.",
    importantCases: [
      {
        caseName: "Shreya Singhal v. Union of India",
        citation: "(2015) 5 SCC 1",
        summary: "Although related to free speech, clarified intermediary responsibilities in IT offences."
      }
    ]
  },
  {
    sectionNumber: "8",
    lawType: "POCSO Act",
    sectionName: "Sexual Assault on Children",
    description: "Covers sexual assault on children involving physical contact without penetration.",
    punishment: "Imprisonment up to 5 years and fine.",
    investigationSteps: [
      "Record child’s statement in safe environment.",
      "Medical examination by authorized doctor.",
      "Appoint child psychologist for counseling if needed."
    ],
    requiredDocuments: ["FIR", "Medical report", "Child Welfare Committee report"],
    relatedSections: ["4 POCSO", "10 POCSO"],
    referenceLink: "https://indiankanoon.org/doc/173161682/",
    notesForPolice: "Child-friendly procedures mandatory; avoid repeated questioning.",
    importantCases: [
      {
        caseName: "Satish Ragde v. State of Maharashtra",
        citation: "2021 SC",
        summary: "Held that touching without skin-to-skin contact still amounts to sexual assault under POCSO."
      }
    ]
  },
  {
    sectionNumber: "20",
    lawType: "NDPS Act",
    sectionName: "Punishment for Cannabis-related Offences",
    description: "Covers production, possession, sale, or transport of cannabis and related substances.",
    punishment: "Imprisonment up to 10 years (depending on quantity) and fine.",
    investigationSteps: [
      "Seize contraband and weigh quantity.",
      "Send sample to forensic lab.",
      "Maintain chain of custody.",
    ],
    requiredDocuments: ["FIR", "Seizure report", "Lab report"],
    relatedSections: ["21", "22"],
    referenceLink: "https://indiankanoon.org/doc/1509203/",
    notesForPolice: "Strict compliance with NDPS procedures is mandatory.",
    importantCases: [
      {
        caseName: "State of Punjab v. Baldev Singh",
        citation: "(1999) 6 SCC 172",
        summary: "Safeguards for search and seizure under NDPS Act."
      }
    ]
  },  

  {
    sectionNumber: "498A",
    lawType: "IPC",
    sectionName: "Cruelty by Husband or Relatives of Husband",
    description: "Covers cruelty towards a woman by her husband or his relatives, often linked with dowry harassment.",
    punishment: "Imprisonment up to 3 years and fine.",
    investigationSteps: [
      "Record victim’s statement.",
      "Collect medical reports (if physical violence).",
      "Gather witness statements.",
      "Verify dowry demands if alleged."
    ],
    requiredDocuments: ["FIR", "Medical report", "Witness statements"],
    relatedSections: ["304B", "406"],
    referenceLink: "https://indiankanoon.org/doc/538436/",
    notesForPolice: "Ensure victim protection; sensitive handling required.",
    importantCases: [
      {
        caseName: "Arnesh Kumar v. State of Bihar",
        citation: "(2014) 8 SCC 273",
        summary: "Guidelines issued to prevent misuse of arrests under 498A."
      }
    ],
    tags:["domestic violence", "husband", "relatives", "dowry harassment", "cruelty", "woman abuse", "marital cruelty", "family abuse", "wife", "harassment"]

  },
  {
    sectionNumber: "304B",
    lawType: "IPC",
    sectionName: "Dowry Death",
    description: "If a woman dies due to burns, injury, or occurs within 7 years of marriage with cruelty over dowry, it is termed dowry death.",
    punishment: "Imprisonment not less than 7 years, which may extend to life.",
    investigationSteps: [
      "Conduct post-mortem.",
      "Collect evidence of harassment.",
      "Examine in-laws and husband.",
      "Check financial records related to dowry."
    ],
    requiredDocuments: ["Post-mortem report", "Marriage certificate", "Witness statements"],
    relatedSections: ["498A"],
    referenceLink: "https://indiankanoon.org/doc/1521633/",
    notesForPolice: "Magistrate inquest required for deaths within 7 years of marriage.",
    importantCases: [
      {
        caseName: "Kans Raj v. State of Punjab",
        citation: "(2000) 5 SCC 207",
        summary: "Presumption of dowry death explained under Evidence Act."
      }
    ]
  },
  {
    sectionNumber: "375",
    lawType: "IPC",
    sectionName: "Definition of Rape",
    description: "Defines rape including penetration without consent, under threat, fraud, or when victim is a minor.",
    punishment: "Covers definition; punishment under Section 376.",
    investigationSteps: [
      "Record victim statement under Section 164 CrPC.",
      "Immediate medical examination.",
      "Preserve DNA and forensic evidence."
    ],
    requiredDocuments: ["Victim statement", "Medical report", "Forensic report"],
    relatedSections: ["376", "354"],
    referenceLink: "https://indiankanoon.org/doc/623254/",
    notesForPolice: "Ensure victim privacy; follow POCSO if minor.",
    importantCases: [
      {
        caseName: "Tukaram v. State of Maharashtra",
        citation: "AIR 1979 SC 185",
        summary: "Mathura rape case leading to amendments in rape law."
      }
    ]
  },
  {
    sectionNumber: "509",
    lawType: "IPC",
    sectionName: "Word, Gesture or Act Intended to Insult Modesty of a Woman",
    description: "Covers verbal abuse, gestures, or any act intended to insult a woman’s modesty.",
    punishment: "Imprisonment up to 1 year or fine or both.",
    investigationSteps: [
      "Record complaint statement.",
      "Identify accused.",
      "Gather witness and CCTV proof."
    ],
    requiredDocuments: ["FIR", "Witness statements", "CCTV footage"],
    relatedSections: ["354", "376"],
    referenceLink: "https://indiankanoon.org/doc/1234134/",
    notesForPolice: "Often overlaps with Section 354; handle sensitively.",
    importantCases: [
      {
        caseName: "Major Singh v. State of Punjab",
        citation: "AIR 1967 SC 63",
        summary: "Clarified scope of modesty in law."
      }
    ]
  },
  {
    sectionNumber: "279",
    lawType: "IPC",
    sectionName: "Rash Driving or Riding on a Public Way",
    description: "Covers rash driving endangering human life or personal safety of others.",
    punishment: "Imprisonment up to 6 months, or fine up to ₹1,000, or both.",
    investigationSteps: [
      "Examine accident site.",
      "Record eyewitnesses.",
      "Check vehicle speed and condition."
    ],
    requiredDocuments: ["FIR", "Mechanical inspection report"],
    relatedSections: ["337", "338"],
    referenceLink: "https://indiankanoon.org/doc/1430036/",
    notesForPolice: "Can be added with MV Act provisions.",
    importantCases: [
      {
        caseName: "State of Karnataka v. Satish",
        citation: "1998 SC",
        summary: "Clarified rash driving standards."
      }
    ],
    tags:["rash driving", "accident", "road safety", "vehicle", "injury", "reckless driving", "traffic violation", "driving offense", "public safety"]

  },
  {
    sectionNumber: "337",
    lawType: "IPC",
    sectionName: "Causing Hurt by Act Endangering Life or Personal Safety",
    description: "Covers causing hurt by rash or negligent act endangering human life.",
    punishment: "Imprisonment up to 6 months, or fine up to ₹500, or both.",
    investigationSteps: [
      "Record medical report of injured.",
      "Examine accident scene.",
      "Collect witness statements."
    ],
    requiredDocuments: ["Medical report", "FIR"],
    relatedSections: ["338", "279"],
    referenceLink: "https://indiankanoon.org/doc/1813259/",
    notesForPolice: "Usually added in accident cases.",
    importantCases: [
      {
        caseName: "Jacob Mathew v. State of Punjab",
        citation: "(2005) 6 SCC 1",
        summary: "Clarified negligence liability in medical cases."
      }
    ]
  },
  {
    sectionNumber: "338",
    lawType: "IPC",
    sectionName: "Causing Grievous Hurt by Act Endangering Life",
    description: "Covers causing grievous hurt by rash or negligent act.",
    punishment: "Imprisonment up to 2 years, or fine up to ₹1,000, or both.",
    investigationSteps: [
      "Obtain injury report.",
      "Collect accident evidence.",
      "Record statements."
    ],
    requiredDocuments: ["Medical report", "FIR"],
    relatedSections: ["337", "279"],
    referenceLink: "https://indiankanoon.org/doc/1080984/",
    notesForPolice: "More serious than Section 337 due to grievous hurt.",
    importantCases: [
      {
        caseName: "Ravi Kapur v. State of Rajasthan",
        citation: "(2012) 9 SCC 284",
        summary: "Defined negligent driving under IPC 338."
      }
    ]
  },
  {
    sectionNumber: "124A",
    lawType: "IPC",
    sectionName: "Sedition",
    description: "Covers acts or words bringing hatred or contempt against Government of India.",
    punishment: "Imprisonment for life, or up to 3 years, with fine.",
    investigationSteps: [
      "Collect speech/publication material.",
      "Verify intent and audience reaction.",
      "Check social media records."
    ],
    requiredDocuments: ["FIR", "Publication evidence"],
    relatedSections: ["153A", "505"],
    referenceLink: "https://indiankanoon.org/doc/1641007/",
    notesForPolice: "Now under debate; use cautiously.",
    importantCases: [
      {
        caseName: "Kedar Nath Singh v. State of Bihar",
        citation: "AIR 1962 SC 955",
        summary: "Upheld constitutionality but narrowed sedition scope."
      }
    ]
  },
  {
    sectionNumber: "153A",
    lawType: "IPC",
    sectionName: "Promoting Enmity Between Different Groups",
    description: "Covers promoting enmity between groups on grounds of religion, race, etc.",
    punishment: "Imprisonment up to 3 years, or fine, or both.",
    investigationSteps: [
      "Collect speeches, pamphlets, videos.",
      "Examine community impact.",
      "Record witness statements."
    ],
    requiredDocuments: ["FIR", "Publication material"],
    relatedSections: ["124A", "295A"],
    referenceLink: "https://indiankanoon.org/doc/1803184/",
    notesForPolice: "Sensitive section; ensure proper evidence.",
    importantCases: [
      {
        caseName: "Bilal Ahmed Kaloo v. State of A.P.",
        citation: "AIR 1997 SC 3483",
        summary: "Defined scope of Section 153A."
      }
    ]
  },
  {
    sectionNumber: "295A",
    lawType: "IPC",
    sectionName: "Deliberate Acts Insulting Religion",
    description: "Covers deliberate and malicious acts intended to outrage religious feelings.",
    punishment: "Imprisonment up to 3 years, or fine, or both.",
    investigationSteps: [
      "Collect speeches or writings.",
      "Check religious context.",
      "Examine community impact."
    ],
    requiredDocuments: ["FIR", "Publication evidence"],
    relatedSections: ["153A", "124A"],
    referenceLink: "https://indiankanoon.org/doc/1452202/",
    notesForPolice: "Often misused; ensure deliberate intent proven.",
    importantCases: [
      {
        caseName: "Ramji Lal Modi v. State of U.P.",
        citation: "AIR 1957 SC 620",
        summary: "Upheld Section 295A constitutionality."
      }
    ]
  },


  {
    sectionNumber: "302",
    lawType: "IPC",
    sectionName: "Punishment for Murder",
    description: "Section 302 IPC prescribes the punishment for the offence of murder. It is a cognizable, non-bailable offence, tried in a Sessions Court. This section covers cases where an individual causes the death of another with the intention to kill or with knowledge that their actions are likely to cause death. The provision aims to deter the gravest of crimes against human life. Murder cases often involve extensive investigation, including forensic analysis, witness statements, and motive establishment.",
    punishment: "Death penalty or life imprisonment and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Secure the crime scene and collect physical evidence.",
      "Conduct post-mortem examination.",
      "Record witness statements under Section 161 CrPC.",
      "Send forensic evidence for analysis.",
      "File charge sheet within 90 days."
    ],
    requiredDocuments: [
      "FIR",
      "Post-mortem report",
      "Forensic reports",
      "Witness statements",
      "Photographs of crime scene"
    ],
    relatedSections: ["304", "307", "34"],
    referenceLink: "https://indiankanoon.org/doc/1569252/",
    notesForPolice: "Avoid contamination of the crime scene; preserve all possible DNA evidence.",
    importantCases: [
      {
        caseName: "State of Karnataka v. Muralidhar",
        citation: "AIR 2009 SC 1621",
        summary: "Clarified the importance of motive in murder trials."
      }
    ]
  },
  {
    sectionNumber: "307",
    lawType: "IPC",
    sectionName: "Attempt to Murder",
    description: "Section 307 IPC deals with attempts to commit murder, prescribing severe punishment even if death does not occur. The section applies when intent and actions are clearly aimed at causing death, such as firing at someone or stabbing in vital areas. It is a cognizable, non-bailable offence, often requiring forensic proof to establish intent.",
    punishment: "Up to 10 years imprisonment, which may extend to life imprisonment, and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Record detailed statements from victim and witnesses.",
      "Collect weapon used and send for forensic analysis.",
      "Gather medical evidence of injuries.",
      "Investigate motive and prior threats."
    ],
    requiredDocuments: [
      "FIR",
      "Medical report",
      "Weapon seizure memo",
      "Witness statements"
    ],
    relatedSections: ["302", "324", "326"],
    referenceLink: "https://indiankanoon.org/doc/1253673/",
    notesForPolice: "Ensure forensic matching of weapon to injuries for strong conviction.",
    importantCases: [
      {
        caseName: "State of M.P. v. Saleem",
        citation: "AIR 2005 SC 3996",
        summary: "Established that severity of injury is not the only factor; intent matters."
      }
    ],
    tags:["attempt to murder", "stab", "knife", "shoot", "intent to kill", "life-threatening", "injury", "violence", "attack"]

  },
  {
    sectionNumber: "376",
    lawType: "IPC",
    sectionName: "Punishment for Rape",
    description: "Section 376 IPC prescribes punishment for rape, with different penalties based on circumstances such as gang rape, custodial rape, or offences against minors. It safeguards bodily integrity and dignity, imposing severe punishment for sexual violence.",
    punishment: "Minimum 10 years to life imprisonment, fine; death penalty in aggravated cases.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Take victim for medical examination within 24 hours.",
      "Record victim's statement under Section 164 CrPC.",
      "Collect forensic and physical evidence.",
      "Provide victim counselling and protection."
    ],
    requiredDocuments: [
      "FIR",
      "Medical examination report",
      "Victim's statement",
      "Forensic report"
    ],
    relatedSections: ["354", "375", "509"],
    referenceLink: "https://indiankanoon.org/doc/425334/",
    notesForPolice: "Ensure victim privacy and avoid repeated questioning.",
    importantCases: [
      {
        caseName: "Mukesh v. State (NCT of Delhi)",
        citation: "(2017) 6 SCC 1",
        summary: "Nirbhaya case; upheld death penalty for convicts."
      }
    ]
  },
  {
    sectionNumber: "354",
    lawType: "IPC",
    sectionName: "Assault or Criminal Force on Woman with Intent to Outrage Modesty",
    description: "Section 354 IPC criminalises assault or use of criminal force against a woman intending to outrage her modesty. This section covers unwanted physical advances, groping, and indecent behaviour. It is cognizable and non-bailable.",
    punishment: "Imprisonment of 1 to 5 years and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Record victim's statement sensitively.",
      "Identify and question witnesses.",
      "Collect CCTV or video evidence.",
      "Ensure victim counselling."
    ],
    requiredDocuments: [
      "FIR",
      "Victim statement",
      "Witness statements",
      "CCTV footage if available"
    ],
    relatedSections: ["354A", "354B", "376"],
    referenceLink: "https://indiankanoon.org/doc/1561633/",
    notesForPolice: "Avoid victim-blaming; ensure fast-track investigation.",
    importantCases: [
      {
        caseName: "Rupan Deol Bajaj v. K.P.S. Gill",
        citation: "1995 SCC (6) 194",
        summary: "Senior police officer convicted for outraging a woman's modesty."
      }
    ],
    tags:["sexual assault", "outraging modesty", "woman", "molestation", "harassment", "groping", "indecent behavior", "assault", "physical attack"]

  },
  {
    sectionNumber: "363",
    lawType: "IPC",
    sectionName: "Punishment for Kidnapping",
    description: "Section 363 IPC punishes kidnapping from lawful guardianship. This applies when a minor or person of unsound mind is taken without consent from their lawful guardian. It protects minors and dependent individuals.",
    punishment: "Imprisonment up to 7 years and fine.",
    investigationSteps: [
      "Register FIR immediately.",
      "Verify age of victim.",
      "Trace last seen location and collect CCTV footage.",
      "Record guardian and witness statements.",
      "Issue lookout notices if needed."
    ],
    requiredDocuments: [
      "FIR",
      "Birth certificate or proof of age",
      "Witness statements",
      "CCTV footage"
    ],
    relatedSections: ["364", "366", "370"],
    referenceLink: "https://indiankanoon.org/doc/1283963/",
    notesForPolice: "Act swiftly to recover victim before harm occurs.",
    importantCases: [
      {
        caseName: "Shyam and Anr. v. State of Maharashtra",
        citation: "(1995) 5 SCC 757",
        summary: "Clarified distinction between kidnapping and abduction."
      }
    ]
  },
  {
    sectionNumber: "420",
    lawType: "IPC",
    sectionName: "Cheating and Dishonestly Inducing Delivery of Property",
    description: "Section 420 IPC deals with cheating and dishonestly inducing delivery of property. It applies to frauds involving false representations to obtain money, goods, or services. It is a cognizable, non-bailable offence and often requires documentary proof and digital evidence in modern cases.",
    punishment: "Imprisonment up to 7 years and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Collect all transaction records and contracts.",
      "Record statements of complainant and witnesses.",
      "Examine bank account details.",
      "Seize relevant digital evidence."
    ],
    requiredDocuments: [
      "FIR",
      "Transaction records",
      "Contract copies",
      "Bank statements"
    ],
    relatedSections: ["415", "418", "471"],
    referenceLink: "https://indiankanoon.org/doc/1569203/",
    notesForPolice: "Digital forensics may be crucial in proving fraud.",
    importantCases: [
      {
        caseName: "S.W. Palanitkar v. State of Bihar",
        citation: "AIR 2002 SC 296",
        summary: "Clarified distinction between breach of contract and cheating."
      }
    ]
  },
  {
    sectionNumber: "406",
    lawType: "IPC",
    sectionName: "Punishment for Criminal Breach of Trust",
    description: "Section 406 IPC punishes criminal breach of trust, where a person entrusted with property dishonestly misappropriates it. It is common in business fraud, embezzlement, and misappropriation cases.",
    punishment: "Imprisonment up to 3 years, or fine, or both.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Collect proof of entrustment.",
      "Obtain financial records and agreements.",
      "Examine accused and witnesses.",
      "Trace misappropriated assets."
    ],
    requiredDocuments: [
      "FIR",
      "Proof of entrustment",
      "Financial statements",
      "Witness statements"
    ],
    relatedSections: ["405", "420", "409"],
    referenceLink: "https://indiankanoon.org/doc/1876017/",
    notesForPolice: "Focus on proving entrustment and dishonest intention.",
    importantCases: [
      {
        caseName: "Som Nath Thapa v. State of Punjab",
        citation: "AIR 1996 SC 1744",
        summary: "Explained key ingredients of criminal breach of trust."
      }
    ]
  },
  {
    sectionNumber: "326",
    lawType: "IPC",
    sectionName: "Voluntarily Causing Grievous Hurt by Dangerous Weapons or Means",
    description: "Section 326 IPC deals with grievous hurt caused using dangerous weapons like knives, acid, or firearms. It is cognizable and non-bailable, with strict punishment.",
    punishment: "Imprisonment up to 10 years and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Collect weapon used.",
      "Record victim’s medical report.",
      "Photograph injuries.",
      "Identify witnesses."
    ],
    requiredDocuments: [
      "FIR",
      "Medical report",
      "Weapon seizure memo",
      "Witness statements"
    ],
    relatedSections: ["324", "325", "307"],
    referenceLink: "https://indiankanoon.org/doc/1566154/",
    notesForPolice: "In acid attacks, preserve victim’s clothes and fluids for forensic tests.",
    importantCases: [
      {
        caseName: "Laxmi v. Union of India",
        citation: "(2014) 4 SCC 427",
        summary: "Laid down regulations for acid sale and victim compensation."
      }
    ]
  },
  {
    sectionNumber: "380",
    lawType: "IPC",
    sectionName: "Theft in Dwelling House",
    description: "Section 380 IPC punishes theft committed in any building used as a human dwelling. It is a cognizable, non-bailable offence with higher punishment due to violation of personal safety and privacy.",
    punishment: "Imprisonment up to 7 years and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Visit crime scene and collect fingerprints.",
      "Interview neighbours and witnesses.",
      "Check CCTV footage.",
      "Recover stolen property."
    ],
    requiredDocuments: [
      "FIR",
      "Photographs of crime scene",
      "Witness statements",
      "Recovery memo"
    ],
    relatedSections: ["378", "381", "457"],
    referenceLink: "https://indiankanoon.org/doc/1253925/",
    notesForPolice: "Immediate scene preservation increases recovery chances.",
    importantCases: [
      {
        caseName: "Shivaji Sahabrao Bobade v. State of Maharashtra",
        citation: "(1973) 2 SCC 793",
        summary: "Highlighted circumstantial evidence in theft cases."
      }
    ]

  },
  {
    sectionNumber: "394",
    lawType: "IPC",
    sectionName: "Voluntarily Causing Hurt in Committing Robbery",
    description: "Section 394 IPC applies when hurt is caused while committing robbery. It is a grave offence combining violence and theft.",
    punishment: "Imprisonment up to 10 years and fine.",
    investigationSteps: [
      "Register FIR under Section 154 CrPC.",
      "Obtain medical report of victim.",
      "Recover stolen items and weapon.",
      "Record witness statements.",
      "Identify accused through TIP (Test Identification Parade)."
    ],
    requiredDocuments: [
      "FIR",
      "Medical report",
      "Recovery memo",
      "Witness statements"
    ],
    relatedSections: ["390", "392", "397"],
    referenceLink: "https://indiankanoon.org/doc/1747568/",
    notesForPolice: "Violence makes sentencing stricter.",
    importantCases: [
      {
        caseName: "Shyam Behari v. State of U.P.",
        citation: "AIR 1957 SC 320",
        summary: "Clarified elements of robbery with hurt."
      }
    ]
  },
  {
    sectionNumber: "154",
    lawType: "CrPC",
    sectionName: "Information in Cognizable Cases",
    description: "Section 154 CrPC outlines the procedure for recording information related to a cognizable offence. It mandates that every such information given orally must be reduced to writing, read over to the informant, and signed. It ensures prompt registration of FIRs to initiate investigation.",
    punishment: "Not applicable (procedural law).",
    investigationSteps: [
      "Receive complaint orally or in writing.",
      "Record the FIR in prescribed format.",
      "Read over FIR to informant and obtain signature.",
      "Send a copy to the Magistrate immediately.",
      "Begin investigation without delay."
    ],
    requiredDocuments: [
      "FIR",
      "Complainant ID proof",
      "Incident details"
    ],
    relatedSections: ["156", "157", "173"],
    referenceLink: "https://indiankanoon.org/doc/445276/",
    notesForPolice: "Refusal to register FIR in cognizable cases can lead to departmental action.",
    importantCases: [
      {
        caseName: "Lalita Kumari v. Govt. of U.P.",
        citation: "(2014) 2 SCC 1",
        summary: "Supreme Court held FIR registration mandatory in cognizable offences."
      }
    ]
  },
  {
    sectionNumber: "41",
    lawType: "CrPC",
    sectionName: "When Police May Arrest Without Warrant",
    description: "Section 41 CrPC empowers police to arrest without a warrant in specific situations such as cognizable offences committed in their presence, credible information about commission of a cognizable offence, or habitual offenders. It also requires adherence to human rights safeguards.",
    punishment: "Not applicable (procedural law).",
    investigationSteps: [
      "Assess if the offence is cognizable.",
      "Verify credibility of information.",
      "Arrest accused following due procedure.",
      "Prepare arrest memo.",
      "Inform accused of grounds of arrest and rights."
    ],
    requiredDocuments: [
      "Arrest memo",
      "FIR copy",
      "Witness details"
    ],
    relatedSections: ["46", "50", "151"],
    referenceLink: "https://indiankanoon.org/doc/1417090/",
    notesForPolice: "Improper arrests can lead to legal consequences for the officer.",
    importantCases: [
      {
        caseName: "Arnesh Kumar v. State of Bihar",
        citation: "(2014) 8 SCC 273",
        summary: "Guidelines to prevent unnecessary arrests under Section 498A IPC."
      }
    ],
    tags:["arrest", "warrant", "cognizable offense", "police", "procedure", "rights", "suspect", "legal procedure", "arrest memo"]

  },
  {
    sectionNumber: "91",
    lawType: "CrPC",
    sectionName: "Summons to Produce Document or Thing",
    description: "Section 91 CrPC allows police or court to summon any person to produce documents or items necessary for investigation or trial. It is a powerful tool for collecting crucial evidence.",
    punishment: "Not applicable (procedural law).",
    investigationSteps: [
      "Identify necessary document/item.",
      "Issue written summons.",
      "Ensure safe collection and preservation of evidence.",
      "Prepare seizure memo if retained."
    ],
    requiredDocuments: [
      "Summons copy",
      "List of items/documents required",
      "Seizure memo"
    ],
    relatedSections: ["92", "165", "166"],
    referenceLink: "https://indiankanoon.org/doc/1043147/",
    notesForPolice: "Summons must clearly mention purpose and legal authority.",
    importantCases: [
      {
        caseName: "State of Gujarat v. Shyamlal Mohanlal Choksi",
        citation: "AIR 1965 SC 1251",
        summary: "Clarified scope of Section 91 for obtaining documents."
      }
    ]
  },
  {
    sectionNumber: "160",
    lawType: "CrPC",
    sectionName: "Police Officer’s Power to Require Attendance of Witnesses",
    description: "Section 160 CrPC authorizes police to require attendance of witnesses for examination during investigation. It applies to persons within police station jurisdiction.",
    punishment: "Not applicable (procedural law).",
    investigationSteps: [
      "Identify relevant witnesses.",
      "Issue written notice for appearance.",
      "Record witness statements.",
      "Maintain record of attendance."
    ],
    requiredDocuments: [
      "Notice to witness",
      "Witness statement",
      "Attendance register"
    ],
    relatedSections: ["161", "162", "164"],
    referenceLink: "https://indiankanoon.org/doc/1324468/",
    notesForPolice: "Women cannot be required to attend at any place other than their residence.",
    importantCases: [
      {
        caseName: "Maneka Gandhi v. Union of India",
        citation: "(1978) 1 SCC 248",
        summary: "Emphasized fairness and reasonableness in state actions, applicable to police summons."
      }
    ]
  },
  {
    sectionNumber: "173",
    lawType: "CrPC",
    sectionName: "Report of Police Officer on Completion of Investigation",
    description: "Section 173 CrPC requires police to submit a final report (charge sheet) to the Magistrate after completing investigation. It must contain evidence collected, witness list, and charges framed.",
    punishment: "Not applicable (procedural law).",
    investigationSteps: [
      "Complete investigation within prescribed time.",
      "Compile all evidence and witness details.",
      "Frame charges.",
      "Submit report to Magistrate.",
      "Serve copies to accused."
    ],
    requiredDocuments: [
      "Charge sheet",
      "List of witnesses",
      "Evidence record"
    ],
    relatedSections: ["167", "190", "200"],
    referenceLink: "https://indiankanoon.org/doc/1659354/",
    notesForPolice: "Delay in filing may affect trial proceedings.",
    importantCases: [
      {
        caseName: "CBI v. Anupam J. Kulkarni",
        citation: "(1992) 3 SCC 141",
        summary: "Clarified police custody limits and report filing requirements."
      }
    ]
  },
  {
    sectionNumber: "4",
    lawType: "POCSO",
    sectionName: "Punishment for Penetrative Sexual Assault",
    description: "Section 4 of the POCSO Act prescribes punishment for penetrative sexual assault on a child. It is a serious offence that involves penetration of any object or body part into the vagina, mouth, urethra, or anus of a child. The law ensures protection of minors from severe forms of abuse.",
    punishment: "Rigorous imprisonment for not less than 10 years, which may extend to life imprisonment, and fine.",
    investigationSteps: [
      "Immediately register FIR upon receiving complaint.",
      "Arrange medical examination of the child within 24 hours.",
      "Record statement under Section 164 CrPC before Magistrate.",
      "Collect medical, forensic, and circumstantial evidence.",
      "Provide counselling and rehabilitation assistance."
    ],
    requiredDocuments: [
      "FIR copy",
      "Medical examination report",
      "Victim statement",
      "Forensic evidence report"
    ],
    relatedSections: ["3", "5", "6"],
    referenceLink: "https://indiankanoon.org/doc/192615846/",
    notesForPolice: "Maintain sensitivity during investigation; ensure presence of child welfare officer.",
    importantCases: [
      {
        caseName: "State v. Kuldeep",
        citation: "Delhi HC, 2019",
        summary: "Conviction upheld based on medical and victim's testimony."
      }
    ]
  },
  {
    sectionNumber: "6",
    lawType: "POCSO",
    sectionName: "Punishment for Aggravated Penetrative Sexual Assault",
    description: "Section 6 deals with aggravated penetrative sexual assault, such as offences committed by police, armed forces, public servants, or on children below 12 years. It recognizes the heightened severity of such acts.",
    punishment: "Rigorous imprisonment for not less than 20 years, extendable to life imprisonment or death penalty, and fine.",
    investigationSteps: [
      "Identify aggravated circumstances as per Section 5.",
      "Collect relevant documentary proof of offender's position or relation to victim.",
      "Record all statements sensitively.",
      "Coordinate with forensic experts.",
      "Submit charge sheet within 60 days."
    ],
    requiredDocuments: [
      "Proof of offender's position",
      "Victim statement",
      "Medical and forensic reports"
    ],
    relatedSections: ["4", "5", "42"],
    referenceLink: "https://indiankanoon.org/doc/200374341/",
    notesForPolice: "Cases under this section are fast-tracked; strict timelines apply.",
    importantCases: [
      {
        caseName: "Satish Ragde v. State of Maharashtra",
        citation: "(2021) SC",
        summary: "Clarified interpretation of 'physical contact' under POCSO."
      }
    ]
  },
  {
    sectionNumber: "8",
    lawType: "POCSO",
    sectionName: "Punishment for Sexual Assault",
    description: "Section 8 prescribes punishment for sexual assault, defined as physical contact without penetration with sexual intent towards a child. It aims to deter all forms of non-penetrative abuse.",
    punishment: "Imprisonment of not less than 3 years, which may extend to 5 years, and fine.",
    investigationSteps: [
      "Take immediate steps to protect victim.",
      "Record statement in a child-friendly manner.",
      "Collect CCTV or digital evidence if available.",
      "Identify witnesses and record statements.",
      "Coordinate with Child Welfare Committee."
    ],
    requiredDocuments: [
      "Victim statement",
      "Witness statements",
      "Digital/CCTV footage"
    ],
    relatedSections: ["7", "10", "12"],
    referenceLink: "https://indiankanoon.org/doc/61485460/",
    notesForPolice: "Even minimal physical contact with sexual intent constitutes offence.",
    importantCases: [
      {
        caseName: "State v. Anil Sharma",
        citation: "HP HC, 2020",
        summary: "Conviction for inappropriate touching upheld under Section 8."
      }
    ]
  },
  {
    sectionNumber: "14",
    lawType: "POCSO",
    sectionName: "Punishment for Using Child for Pornographic Purposes",
    description: "Section 14 criminalizes using a child in any form of pornographic representation, including creation, distribution, and storage. It addresses the growing threat of online exploitation.",
    punishment: "Imprisonment up to 5 years and fine for first offence; up to 7 years for subsequent offences.",
    investigationSteps: [
      "Identify and seize devices used for recording/storage.",
      "Coordinate with cybercrime unit for tracing content.",
      "Record victim's statement.",
      "Preserve digital evidence in original form."
    ],
    requiredDocuments: [
      "Seizure memo of devices",
      "Digital forensic report",
      "Victim statement"
    ],
    relatedSections: ["13", "15", "67 IT Act"],
    referenceLink: "https://indiankanoon.org/doc/61944555/",
    notesForPolice: "Strict adherence to IT Act’s digital evidence preservation is required.",
    importantCases: [
      {
        caseName: "CBI v. Anil Thakur",
        citation: "Delhi HC, 2018",
        summary: "Conviction for operating a child pornography network."
      }
    ]
  },
  {
    sectionNumber: "19",
    lawType: "POCSO",
    sectionName: "Reporting of Offences",
    description: "Section 19 mandates that any person, including media, must report offences under the POCSO Act to the police or Special Juvenile Police Unit. Failure to report is itself punishable.",
    punishment: "Imprisonment up to 6 months or fine or both for failure to report.",
    investigationSteps: [
      "Register FIR immediately on receiving report.",
      "Identify source of information.",
      "Initiate investigation as per relevant section.",
      "Inform Child Welfare Committee."
    ],
    requiredDocuments: [
      "Report copy",
      "FIR",
      "Proof of informant's statement"
    ],
    relatedSections: ["20", "21", "27"],
    referenceLink: "https://indiankanoon.org/doc/176082720/",
    notesForPolice: "Ensure informant’s identity is kept confidential if requested.",
    importantCases: [
      {
        caseName: "State v. Pankaj",
        citation: "Rajasthan HC, 2019",
        summary: "Failure to report a POCSO offence led to conviction."
      }
    ]
  },
  {
    sectionNumber: "66C",
    lawType: "IT Act",
    sectionName: "Identity Theft",
    description: "Section 66C of the Information Technology Act deals with the fraudulent or dishonest use of another person's electronic signature, password, or other unique identification feature. It is aimed at preventing misuse of digital identities for financial gain or other crimes.",
    punishment: "Imprisonment up to 3 years and fine up to ₹1 lakh.",
    investigationSteps: [
      "Register FIR and collect preliminary complaint details.",
      "Obtain IP logs and account activity from service providers.",
      "Seize and analyze suspect’s devices.",
      "Coordinate with CERT-In or cyber labs."
    ],
    requiredDocuments: [
      "FIR copy",
      "Digital evidence logs",
      "Device seizure memo"
    ],
    relatedSections: ["66D", "420 IPC"],
    referenceLink: "https://indiankanoon.org/doc/108626293/",
    notesForPolice: "Preserve digital evidence in write-protected format.",
    importantCases: [
      {
        caseName: "CBI v. Arif Azim",
        citation: "Delhi HC, 2008",
        summary: "First conviction for online identity theft in India."
      }
    ]
  },
  {
    sectionNumber: "66D",
    lawType: "IT Act",
    sectionName: "Cheating by Personation using Computer Resources",
    description: "Section 66D criminalizes cheating by personation through any communication device or computer resource. It is commonly used in online fraud cases.",
    punishment: "Imprisonment up to 3 years and fine up to ₹1 lakh.",
    investigationSteps: [
      "Trace IP address and geo-location of accused.",
      "Coordinate with banks or financial institutions for transaction data.",
      "Record victim and witness statements.",
      "Preserve chat logs, emails, and call records."
    ],
    requiredDocuments: [
      "Victim complaint",
      "Bank transaction details",
      "Digital communication records"
    ],
    relatedSections: ["66C", "420 IPC"],
    referenceLink: "https://indiankanoon.org/doc/165823855/",
    notesForPolice: "Act fast as digital traces may be deleted.",
    importantCases: [
      {
        caseName: "State v. Suresh",
        citation: "Maharashtra HC, 2015",
        summary: "Conviction in an online lottery scam case."
      }
    ]
  },
  {
    sectionNumber: "67",
    lawType: "IT Act",
    sectionName: "Publishing or Transmitting Obscene Material in Electronic Form",
    description: "Section 67 prohibits publishing, transmitting, or causing transmission of obscene content in electronic form, including pornography. It applies to websites, social media, and messaging apps.",
    punishment: "First conviction: up to 3 years imprisonment and ₹5 lakh fine; subsequent conviction: up to 5 years imprisonment and ₹10 lakh fine.",
    investigationSteps: [
      "Identify and preserve offending content.",
      "Trace uploader’s digital footprint.",
      "Seize hosting server data if needed.",
      "Work with cybercrime labs for verification."
    ],
    requiredDocuments: [
      "Copy of obscene content",
      "Digital forensic report",
      "Server logs"
    ],
    relatedSections: ["67A", "14 POCSO"],
    referenceLink: "https://indiankanoon.org/doc/171831280/",
    notesForPolice: "Ensure compliance with Section 65B of Indian Evidence Act.",
    importantCases: [
      {
        caseName: "Avnish Bajaj v. State",
        citation: "(2005) Delhi HC",
        summary: "CEO of Baazee.com booked for sale of obscene MMS."
      }
    ]
  },
  {
    sectionNumber: "20",
    lawType: "NDPS Act",
    sectionName: "Punishment for Contravention in Relation to Cannabis Plant and Cannabis",
    description: "Section 20 of the NDPS Act penalizes cultivation, possession, and sale of cannabis. The punishment varies with quantity.",
    punishment: "Small quantity: up to 1 year or fine; commercial quantity: rigorous imprisonment up to 20 years and fine up to ₹2 lakh.",
    investigationSteps: [
      "Seize narcotics and weigh in presence of Magistrate.",
      "Send sample to forensic lab.",
      "Record seizure memo and witness statements.",
      "File case under relevant quantity category."
    ],
    requiredDocuments: [
      "Seizure memo",
      "Forensic report",
      "Witness statements"
    ],
    relatedSections: ["21", "22", "25"],
    referenceLink: "https://indiankanoon.org/doc/1843581/",
    notesForPolice: "Strict compliance with Section 50 NDPS Act is mandatory.",
    importantCases: [
      {
        caseName: "State of Punjab v. Baldev Singh",
        citation: "(1999) SC",
        summary: "Clarified search procedures under NDPS Act."
      }
    ]
  },
  {
    sectionNumber: "21",
    lawType: "NDPS Act",
    sectionName: "Punishment for Contravention in Relation to Manufactured Drugs",
    description: "Section 21 penalizes possession, sale, or transport of manufactured drugs and preparations containing such drugs.",
    punishment: "Small quantity: up to 1 year imprisonment; commercial quantity: up to 20 years and fine.",
    investigationSteps: [
      "Identify type and quantity of drug.",
      "Maintain chain of custody for seized items.",
      "Obtain lab confirmation.",
      "Record all witness statements."
    ],
    requiredDocuments: [
      "Lab report",
      "Seizure memo",
      "FIR"
    ],
    relatedSections: ["20", "22", "27"],
    referenceLink: "https://indiankanoon.org/doc/1239937/",
    notesForPolice: "Cross-check all licences and permits before framing charges.",
    importantCases: [
      {
        caseName: "E. Micheal Raj v. Intelligence Officer",
        citation: "(2008) SC",
        summary: "Clarified that purity of drug is relevant for sentencing."
      }
    ]
  },
  {
    sectionNumber: "22",
    lawType: "NDPS Act",
    sectionName: "Punishment for Contravention in Relation to Psychotropic Substances",
    description: "Section 22 punishes offences involving psychotropic substances such as LSD, MDMA, etc. The law categorizes punishments based on the quantity.",
    punishment: "Small quantity: up to 1 year imprisonment; commercial quantity: up to 20 years and fine.",
    investigationSteps: [
      "Seize and preserve sample for forensic analysis.",
      "Document entire search and seizure process.",
      "Maintain evidence integrity.",
      "Verify if accused had valid authorization."
    ],
    requiredDocuments: [
      "Forensic report",
      "Seizure memo",
      "Authorization documents"
    ],
    relatedSections: ["20", "21", "27"],
    referenceLink: "https://indiankanoon.org/doc/276245/",
    notesForPolice: "Even trace amounts can lead to prosecution if linked to larger conspiracy.",
    importantCases: [
      {
        caseName: "Union of India v. Shah Alam",
        citation: "(2009) SC",
        summary: "Confirmed strict liability under NDPS offences."
      }
    ]
  },
  {
    sectionNumber: "185",
    lawType: "Motor Vehicles Act",
    sectionName: "Driving by a Drunken Person or by a Person under the Influence of Drugs",
    description: "Section 185 prohibits driving under the influence of alcohol or drugs beyond the permissible blood alcohol limit. The provision aims to prevent accidents caused by impaired driving.",
    punishment: "First offence: imprisonment up to 6 months or fine up to ₹10,000; subsequent offence: up to 2 years or fine up to ₹15,000 or both.",
    investigationSteps: [
      "Stop and safely secure the vehicle.",
      "Conduct breath analyzer test in presence of witnesses.",
      "If needed, take the accused for a medical examination.",
      "Prepare seizure memo for vehicle and driving license."
    ],
    requiredDocuments: [
      "Breath analyzer report",
      "Medical examination report",
      "Seizure memo"
    ],
    relatedSections: ["184 MV Act", "279 IPC"],
    referenceLink: "https://indiankanoon.org/doc/108668/",
    notesForPolice: "Use only approved breath analyzers; follow due process for medical tests.",
    importantCases: [
      {
        caseName: "State of Karnataka v. Satish",
        citation: "(1998) SC",
        summary: "Clarified permissible BAC limit for prosecution."
      }
    ]
  },
  {
    sectionNumber: "184",
    lawType: "Motor Vehicles Act",
    sectionName: "Driving Dangerously",
    description: "Section 184 penalizes driving a motor vehicle in a manner dangerous to the public, including overspeeding, overtaking recklessly, and violating traffic rules.",
    punishment: "Imprisonment up to 6 months or fine up to ₹5,000 or both.",
    investigationSteps: [
      "Record eyewitness statements.",
      "Obtain CCTV footage if available.",
      "Seize the vehicle for inspection.",
      "Document road and traffic conditions."
    ],
    requiredDocuments: [
      "FIR",
      "CCTV footage",
      "Mechanical inspection report"
    ],
    relatedSections: ["279 IPC", "337 IPC"],
    referenceLink: "https://indiankanoon.org/doc/743479/",
    notesForPolice: "Ensure detailed site photographs are taken.",
    importantCases: [
      {
        caseName: "Bala Subramaniam v. State",
        citation: "Madras HC, 2012",
        summary: "Reckless overtaking held as dangerous driving."
      }
    ]
  },
  {
    sectionNumber: "3",
    lawType: "Arms Act",
    sectionName: "License for Acquisition and Possession of Firearms",
    description: "Section 3 of the Arms Act mandates that no person shall acquire or possess firearms without a valid license. This is to regulate weapon possession and ensure public safety.",
    punishment: "Imprisonment up to 3 years or fine or both.",
    investigationSteps: [
      "Seize the firearm and ammunition.",
      "Verify authenticity of license if claimed.",
      "Send firearm for ballistic examination.",
      "Record statements from witnesses."
    ],
    requiredDocuments: [
      "Seizure memo",
      "Ballistic report",
      "License verification report"
    ],
    relatedSections: ["25 Arms Act", "27 Arms Act"],
    referenceLink: "https://indiankanoon.org/doc/119171/",
    notesForPolice: "Check for tampering of serial numbers.",
    importantCases: [
      {
        caseName: "State v. Abdul Rahman",
        citation: "Rajasthan HC, 2005",
        summary: "Conviction for unlicensed possession of firearm."
      }
    ]
  },
  {
    sectionNumber: "25",
    lawType: "Arms Act",
    sectionName: "Punishment for Certain Offences",
    description: "Section 25 prescribes penalties for manufacture, sale, transfer, conversion, or test-firing of firearms without a license.",
    punishment: "Imprisonment not less than 3 years but may extend to 7 years and fine.",
    investigationSteps: [
      "Locate and seize manufacturing or storage facility.",
      "Document all seized firearms with photographs.",
      "Obtain forensic and ballistic analysis.",
      "Trace supply chain and buyer records."
    ],
    requiredDocuments: [
      "Seizure list",
      "Ballistic test report",
      "Supply chain records"
    ],
    relatedSections: ["3 Arms Act", "27 Arms Act"],
    referenceLink: "https://indiankanoon.org/doc/458917/",
    notesForPolice: "Map links between suppliers and accused to establish conspiracy.",
    importantCases: [
      {
        caseName: "State of Punjab v. Balwant Singh",
        citation: "Punjab & Haryana HC, 2010",
        summary: "Conviction upheld for illegal arms manufacturing."
      }
    ]
  }



]
export default sectionsData;
