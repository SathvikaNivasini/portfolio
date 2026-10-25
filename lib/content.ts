/**
 * Single source of truth for everything the site renders.
 * Every claim here traces back to the resume, the NirvBand deck,
 * or the photobioreactor technical documentation.
 */

export const PILLAR_IDS = [
  "technology",
  "communication",
  "health",
  "entrepreneurship",
] as const;

export type PillarId = (typeof PILLAR_IDS)[number];

export type Pillar = {
  id: PillarId;
  label: string;
  blurb: string;
  /** Position on the 100x100 constellation viewBox. */
  x: number;
  y: number;
};

export const pillars: Pillar[] = [
  {
    id: "technology",
    label: "Technology",
    blurb: "Hardware, ML, and the cloud — built to be used, not demoed.",
    x: 26,
    y: 24,
  },
  {
    id: "communication",
    label: "Communication",
    blurb: "The thread through all of it. If it can't be explained, it isn't finished.",
    x: 76,
    y: 20,
  },
  {
    id: "health",
    label: "Health",
    blurb: "Mental health and wellness, treated as an engineering problem worth solving.",
    x: 22,
    y: 73,
  },
  {
    id: "entrepreneurship",
    label: "Entrepreneurship",
    blurb: "Ideas become products, products reach people, people change.",
    x: 78,
    y: 70,
  },
];

/**
 * Paste the live VakShala app URL here. While it is empty the button is
 * simply not rendered, so the page stays clean either way.
 */
export const VAKSHALA_APP_URL = "https://vakshala-site.netlify.app/";

export type ProjectStatus = "live" | "building" | "research" | "archive";

export const statusLabel: Record<ProjectStatus, string> = {
  live: "Released",
  building: "Building",
  research: "Research in progress",
  archive: "Archived",
};

export type Update = { date: string; note: string };

export type Project = {
  slug: string;
  name: string;
  /** Compact label for the constellation, where space is tight. */
  shortName?: string;
  tagline: string;
  role: string;
  years: string;
  status: ProjectStatus;
  pillars: PillarId[];
  /** Short card summary. */
  summary: string;
  /** Hero image path under /public. */
  cover: string;
  /** Headline numbers for the case study. */
  stats: { value: string; label: string }[];
  links: { label: string; href: string }[];
  /** Case study body. */
  problem: string[];
  decisions: { title: string; body: string }[];
  architecture: { title: string; body: string }[];
  failures: string[];
  results: string[];
  next: string[];
  stack: string[];
  updates: Update[];
};

export const projects: Project[] = [
  {
    slug: "vakshala",
    name: "VakShala",
    tagline: "A communication coach that scores the thing everyone says can't be scored.",
    role: "Founder & CEO",
    years: "2024 — Present",
    status: "live",
    pillars: ["communication", "technology", "entrepreneurship"],
    summary:
      "A hybrid AI + human communication coaching platform, profit-positive, with a nonprofit arm giving the same training away free.",
    cover: "/images/projects/vakshala-dev.jpg",
    stats: [
      { value: "250+", label: "Students coached personally" },
      { value: "3,000+", label: "Pre-registered users" },
      { value: "$2,000+/mo", label: "Profit-positive" },
      { value: "7k+", label: "Learners reached free" },
    ],
    // TODO(sathvika): paste the live VakShala app URL here and it appears as a button.
    links: [{ label: "Open the VakShala app", href: VAKSHALA_APP_URL }],
    problem: [
      "Communication is the skill everyone agrees matters and nobody can measure. Coaching is expensive, subjective, and gated behind people who already have access. A student in a village and a student in Silicon Valley get wildly different feedback on the same speech — if they get feedback at all.",
      "The standard answer is a rubric and a human. That does not scale, and it is inconsistent: two judges disagree on the same two-minute argument more often than anyone admits.",
      "So the real question is narrower and harder. Can you predict what a trained human judge would say about a piece of speech, reliably enough that a student can practice against it a hundred times at two in the morning?",
    ],
    decisions: [
      {
        title: "Score the measurable, keep the human for the rest",
        body: "The model rates seven dimensions it can actually defend from linguistic signal. Everything requiring taste, context, or courage stays with a human coach. The product is explicitly hybrid because pretending otherwise would be dishonest about what the model knows.",
      },
      {
        title: "No third-party AI APIs",
        body: "All analysis runs in the browser. Students' speeches never leave their device. That decision cost me model capacity and bought the one thing an education product working with minors cannot trade away.",
      },
      {
        title: "Train on speech I graded myself",
        body: "I personally coached 250+ students and graded their speeches, which became the training set — about 1,300 human-rated arguments — supplemented by 10+ public speech and body-language datasets. Owning the labels means I know exactly what the model is imitating.",
      },
      {
        title: "Build the curriculum before the model",
        body: "A 145,000+ word knowledge library came first: 10 original frameworks, a 30-module curriculum, 99 drills. The model scores against a pedagogy, not a vibe. Without that, a number out of 100 means nothing to the student who receives it.",
      },
    ],
    architecture: [
      {
        title: "The scoring model",
        body: "A stacking regressor over a random forest, reading 32+ linguistic features, producing scores across seven communication dimensions.",
      },
      {
        title: "VakNet",
        body: "A neural network predicting human-judged speech quality from 36 linguistic features. Trained on ~1,300 human-rated arguments plus deliberately adversarial spam examples, and evaluated on topics it had never seen — because a model that only works on its training topics is a lookup table.",
      },
      {
        title: "The next version, in design",
        body: "A multimodal, multi-task network fusing a pretrained speech model (wav2vec 2.0), a text model (MiniLM), and the 36 measurements through attention. It predicts an overall score, 12 skill scores, a filler-word timeline, and a not-real-speech flag — then compresses to run on-device.",
      },
      {
        title: "The product",
        body: "React 18, Vite, Tailwind, Supabase, Netlify. Python and scikit-learn for training. Web app live, Android release in progress.",
      },
    ],
    failures: [
      "The first scoring model learned to reward length. A longer answer scored higher almost regardless of content, because in my early training data the stronger speakers also happened to talk more. I had to build adversarial spam examples — fluent, confident, empty speech — specifically to teach the model that fluency is not substance.",
      "Evaluating on random held-out samples made the model look far better than it was, because samples from the same topic leaked between train and test. Switching to evaluation on entirely unseen topics dropped the numbers and made them real.",
      "I built features before I built the curriculum, and the early scores were unactionable. A student would get a 62 and have no idea what to do next. The 30-module curriculum exists because the number alone was useless.",
    ],
    results: [
      "Profit-positive at $2,000+/month, which funds the nonprofit arm rather than an investor.",
      "3,000+ pre-registered users; the web app is live and in use by VakShala's students.",
      "Free for anyone who attends a community workshop — 5+ international schools signed for 7k+ learners, including New Look School, KARE School, KV Minambakkam, and a community workshop for Folsom, California students. 5+ more schools in discussion.",
      "Global Silver Award, International Youth AI Competition (AI YES), 2026 — hackathon division, awarded for VakShala.",
    ],
    next: [
      "Ship the multimodal model and get the filler-word timeline in front of students, because a timeline teaches more than a score.",
      "Finish the Android release — the learners who need this most are on phones, not laptops.",
      "Publish the scoring rubric and the model's disagreement rate with human judges. If I am asking students to trust a number, I should show them how often it is wrong.",
    ],
    stack: ["React 18", "Vite", "Tailwind CSS", "Supabase", "Netlify", "Python", "scikit-learn", "wav2vec 2.0", "MiniLM"],
    updates: [
      { date: "2026", note: "Global Silver Award at the International Youth AI Competition." },
      { date: "2026", note: "Multimodal v2 architecture finalized; on-device compression in design." },
      { date: "2025", note: "Nonprofit arm signs 5 international schools for free workshops." },
      { date: "2024", note: "VakNet trained on ~1,300 human-rated arguments." },
    ],
  },
  {
    slug: "nirvband",
    name: "NirvBand",
    tagline: "The warning signs were always there. Nobody was catching them.",
    role: "Founder & Product Architect",
    years: "2024 — Present",
    status: "building",
    pillars: ["health", "technology", "entrepreneurship"],
    summary:
      "A wrist-worn band and companion app that passively reads five biometric signals to catch an emotional crisis before the person feels it coming.",
    cover: "/images/projects/nirvband-planning.jpg",
    stats: [
      { value: "11 years", label: "Average delay to first treatment" },
      { value: "970M", label: "People affected globally" },
      { value: "5", label: "Sensors on one wrist" },
      { value: "24–72h", label: "Target advance warning" },
    ],
    links: [],
    problem: [
      "970 million people — one in eight worldwide — live with a mental health condition. The average delay between symptom onset and first treatment is eleven years.",
      "Every tool we have waits for the crisis. Therapy, medication, crisis lines: each one requires you to already know you need help, and to ask. Most people do not ask. They wait.",
      "Meanwhile the body is already reporting. Heart rate variability drops, skin conductance spikes, sleep fragments, activity falls off — days before the person can name what is wrong. That signal exists and nobody is reading it.",
    ],
    decisions: [
      {
        title: "Passive, or it does not work",
        body: "Any feature requiring the user to open an app and log a mood will be used by the people who are already fine. The band collects 24/7 with zero effort. You forget you are wearing it. That is the entire design constraint.",
      },
      {
        title: "Sensors vote — they do not guess",
        body: "A single signal lies constantly. Elevated heart rate and skin conductance look identical for a panic attack and a sprint. Five sensors cross-check each other: if movement is high and temperature rises, that is exercise, and no alert fires. If movement is normal and temperature drops, that is anxiety. The logic that prevents false alarms is the product.",
      },
      {
        title: "Compare you to you, not to a population",
        body: "For the first 1–4 weeks the band uses population averages as a temporary baseline. By two months it has fully transitioned to the user's own physiological fingerprint. A resting HRV that is alarming for one person is Tuesday for another.",
      },
      {
        title: "Escalate gently, and never without consent",
        body: "Four levels: a gentle check-in, coping tools, direct sustained engagement, and only at level four a crisis protocol that contacts someone. Every feature is opt-in. The user controls who sees what, what triggers an alert, and who gets contacted.",
      },
      {
        title: "Refuse to be a therapist",
        body: "NirvBand is not a therapy replacement, not a diagnostic device, and not surveillance. The AI companion nudges toward real-world connection rather than dependency, and flags when professional help may be needed. Getting that boundary wrong would make the product actively harmful.",
      },
    ],
    architecture: [
      {
        title: "The band",
        body: "Five sensors on an ESP32 WROOM32: MAX30102 for heart rate, HRV and SpO2; a Grove GSR for skin conductance; an MPU6050 for movement and sleep restlessness; an NTC thermistor for skin temperature; and contact pads for wear detection. Total prototype cost $45–64.",
      },
      {
        title: "Why those five",
        body: "HRV is the gold-standard mental health biometric. GSR is the best real-time stress detector — it spikes instantly during anxiety. Reduced activity signals depression reliably. Skin temperature drops during acute stress, which is what separates anxiety from exercise. Wear detection triggers a check-in if the band goes offline.",
      },
      {
        title: "The cloud path",
        body: "A JSON packet every 60 seconds into Azure IoT Hub → Stream Analytics cleans and flags anomalies → Data Lake stores it timestamped per user → Databricks converts raw numbers into HRV trend, anxiety index, sleep quality → Azure ML runs the models → a scoring engine converts output into wellness scores and crisis thresholds → delivery to dashboard, companion, and emergency system simultaneously. Wrist to insight in under 60 seconds.",
      },
      {
        title: "Six planned models",
        body: "Baseline personalization, anomaly detection, emotional state classification, crisis prediction at 24–72 hours, an NLP companion that reads sensor context, and personalized recommendation. ML training and pipeline construction are ongoing — these are designed and specified, not yet validated.",
      },
    ],
    failures: [
      "The honest state of this project: it is a prototype. There is no physical product yet, and the accuracy figures in my deck are design targets drawn from literature, not measurements I have taken. I have been careful to label them that way, because a mental health product that overstates its accuracy is not a neutral mistake.",
      "Hardware manufacturing at scale is genuinely hard and I do not yet have a credible answer for it beyond the $45–64 bill of materials for a single prototype.",
      "Any medical-grade claim requires FDA clearance, which reframes the entire roadmap. The current positioning as a wellness tool rather than a diagnostic device is not marketing — it is the honest description of where the evidence is.",
      "Building accurate models requires large datasets I do not have yet. The crisis prediction model is the most valuable piece and the least validated.",
    ],
    results: [
      "Full hardware architecture specified with sensor-voting logic worked out across five scenarios: anxiety spike, panic attack, exercise, depression building, and a good day.",
      "Azure pipeline architected end to end, with cost modeling: ~$10–15/month at 1,000 users, ~$3,000–5,000/month at a million.",
      "A four-level escalation system and privacy model designed around opt-in, AES-256 at rest, TLS 1.3 in transit, and full data export and deletion.",
      "Currently pitching to investors and applying to VC programs.",
    ],
    next: [
      "Wire all five sensors and get clean JSON every 60 seconds off a 3D-printed wearable case.",
      "Connect the ESP32 to Azure IoT Hub, add anomaly detection and rule-based alerts, and start building a personal baseline.",
      "Self-beta: two to four weeks wearing it myself with real data, because I should be the first person this is wrong about.",
      "Then a React Native companion app, the emergency system active, and only after that any claim about accuracy.",
    ],
    stack: ["ESP32", "MAX30102", "Grove GSR", "MPU6050", "Azure IoT Hub", "Stream Analytics", "Databricks", "Azure ML", "React Native"],
    updates: [
      { date: "2026", note: "Pitching investors; applying to VC programs." },
      { date: "2025", note: "Azure pipeline and six-model architecture specified end to end." },
      { date: "2024", note: "Sensor selection and voting logic designed across five scenarios." },
    ],
  },
  {
    slug: "photobioreactor",
    name: "Agentic AI Photobioreactor",
    shortName: "Photobioreactor",
    tagline: "A reactor that runs itself — and an honest account of where the AI lost.",
    role: "Independent Researcher & Developer",
    years: "2025 — Present",
    status: "research",
    pillars: ["technology", "health"],
    summary:
      "A web-based digital twin of a 3.4 L Chlorella photobioreactor, and a reinforcement learning controller trained inside it — with every number traceable to a paper.",
    cover: "/images/projects/photobioreactor-cover.jpg",
    stats: [
      { value: "3.4 L", label: "Simulated airlift reactor" },
      { value: "4.1×10⁻¹⁶", label: "Carbon ledger closure" },
      { value: "3,000", label: "Training episodes" },
      { value: "30", label: "Paired seeds per scenario" },
    ],
    links: [
      {
        label: "Open the live digital twin",
        href: "https://algae-photobioreactor-digital-twin.vercel.app/",
      },
    ],
    problem: [
      "Factories release enormous amounts of carbon dioxide. Algae absorb it to grow, so in principle you can pipe exhaust into a tank of algae and turn it into biomass for fuel, feed, or fertiliser.",
      "In practice it keeps failing, because the conditions never hold still. Feed gas in too fast and the water turns acidic. Feed it too slowly and the algae starve. Give them plenty of light on day one and it works; by day five the same light barely gets past the surface, because the culture has grown dense enough to shade itself.",
      "Three coupled effects break fixed-setting operation: carbonate chemistry moving pH, self-shading where the light field depends on the biomass it produces, and a pH that climbs as carbon is fixed and nitrate is taken up. The same CO₂ command has a different effect on day 6 than on day 1. The plant is time-varying and state-dependent, so yesterday's perfect setting is wrong today.",
    ],
    decisions: [
      {
        title: "Build the number set before the model",
        body: "One internally consistent set of parameters, each traceable to a table or computed from one. Where a figure circulating in drafts did not reconcile with its source, I show the reconciliation instead of the figure. A reported 30–35% CO₂ removal efficiency does not reconcile with the gas flow — at 4 L/min it would mean kilograms absorbed, far more than the biomass could contain — so it is not used.",
      },
      {
        title: "Never pool parameters across sources",
        body: "Reported growth rates span 0.222–2 d⁻¹, about nine-fold, because strain, geometry, scale, light regime and measurement basis all differ. Lakaniemi and Metsoviti use the same strain and still differ 3.6-fold, which rules out strain as the explanation. Each source gets its own case.",
      },
      {
        title: "Mask what is not known",
        body: "Heating and nutrient feeding are switched off on purpose. There is no reliable published data for how this strain responds to temperature in the range the reactor runs at, or for its nutrient uptake. A controller acting on invented numbers is worse than one that declines to act. Masked channels export with a reason string and name the experiment that would unmask them.",
      },
      {
        title: "The AI is never fully in charge",
        body: "A safety shield sits between the controller and the reactor: a ramp limit on light, a pH guard on CO₂ below 6.2, and a log of every change it makes and why.",
      },
      {
        title: "Publish the loss",
        body: "In this simulator, the learning controller has not beaten a well-tuned timer. That result is shown, not hidden. RL minus open-loop return is −1.34 (95% CI −1.66 to −1.04) across 30 paired seeds. Reporting only the comparison I won would have made the whole thing worthless.",
      },
    ],
    architecture: [
      {
        title: "The reactor model",
        body: "A 3.4 L airlift column modeling a six-day batch: light attenuation by depth via Beer–Lambert, CO₂–bicarbonate–pH chemistry, night respiration, and a contamination module where detection lags the problem. The carbon mass balance closes across gas, liquid and biomass to a relative residual of 4.1×10⁻¹⁶.",
      },
      {
        title: "The agent, as built",
        body: "A constrained, partially observable Markov decision process — the environment returns delayed, noisy, and in one scenario drifting sensor readings, so the agent never sees the true state. A tabular Q-learning agent over 70 binned observation states and 9 discrete actions, trained for 3,000 episodes (864,000 transitions). Reward is defined on physical quantities: biomass, net CO₂ fixed, energy, gas, pH stress and violations.",
      },
      {
        title: "The loop",
        body: "Every 30 minutes: read pH, OD750 and lamp state; bin into one of 70 situations; look up a learned score for each of nine light-and-gas options; pick the best; pass it through the safety shield; act. Internal integration runs at 15 minutes, verified by halving the step — metrics change by 0.04% against a 1% gate.",
      },
      {
        title: "The agent, as planned",
        body: "A learned perception network — a 60-hour window of 120×9 channels through a 1-D CNN then a GRU to a 128-d latent, with heads for state estimate, regime classification and a +15/30/60 min forecast — feeding an actor–critic (TD3) policy with continuous actions.",
      },
      {
        title: "Baselines it is measured against",
        body: "A periodic operator sampling every 8 hours, an open-loop schedule tuned on training seeds, bang-bang with pH hysteresis on CO₂, and a PID mapping pH to CO₂. MPC is documented as strong and demonstrated experimentally elsewhere, and explicitly not implemented here.",
      },
    ],
    failures: [
      "The headline result is a loss: the reinforcement learning agent has not beaten a well-tuned timer in this simulator. RL minus open-loop return is −1.34 (95% CI −1.66 to −1.04). It does beat bang-bang control by 1.68 (0.723 to 2.58). Both numbers are published.",
      "Calibration is only partly met: against a pre-set hold-out error gate of ≤20%, three source cases pass, six are partial, and one fails. The gate was set before the results were seen, which is the only reason the partial grade means anything.",
      "The simulator's final density for the 15% CO₂ held-out condition is 0.96 g/L against a reported 1.13 g/L, and CO₂ fixed is 5.35 g against 6.42 g. These are smaller than headline figures that circulate; they are the ones that survive the arithmetic.",
      "Tabular Q-learning is sample-inefficient and inherits every bias in the simulator. The agent is good at the model of the world I gave it, which is not the same as being good at algae.",
    ],
    results: [
      "A virtual reactor that predicts results it was never given, with the hold-out gate set in advance and the grade reported honestly: 3 pass, 6 partial, 1 fail.",
      "Carbon ledger closes to 4.1×10⁻¹⁶ relative residual; timestep sensitivity 0.04% against a 1% gate; deterministic replay from seed verified.",
      "Controller comparison met in full: paired episode-level differences, 95% bootstrap confidence intervals, 30 seeds per scenario, episode as the unit.",
      "Stress-tested against heat waves, low light, gas failures, sensor drift and contamination — every run reported, including the losses.",
      "Full transparency met: every displayed number traceable to a DOI, a location in the paper, and an evidence class.",
    ],
    next: [
      "Build the planned deep agent: the perception network and TD3 actor–critic that can act on continuous light and CO₂ rather than nine discrete options.",
      "The novelty boundary is clear — ML monitoring, MPC, and simulation-based RL pH control all already exist in this literature. What has not been published is a closed-loop RL demonstration on a physical photobioreactor. This simulation is a step toward that, and the honest claim is no larger.",
      "A physical reactor is the next stage. Nothing here proves it works on real algae, and I have said so in the documentation rather than leaving it implied.",
    ],
    stack: ["Python", "Reinforcement learning", "Q-learning", "TD3", "Beer–Lambert modeling", "Carbonate chemistry", "Next.js", "Vercel"],
    updates: [
      { date: "2026", note: "Technical documentation and controller architecture published; deep agent in development." },
      { date: "2025", note: "Digital twin live; tabular agent trained over 864,000 transitions." },
    ],
  },
  {
    slug: "top-the-graph",
    name: "Top The Graph",
    tagline: "Built in ninth grade, after surveying 600 students about what school was doing to them.",
    role: "Founder & Lead Developer",
    years: "Grade 9",
    status: "archive",
    pillars: ["health", "communication"],
    summary:
      "A student mental wellness initiative: 25+ sessions, a 600-student survey, and a web app of emotional-wellness tools used by 900+ students.",
    cover: "/images/gallery/wings-cards.jpg",
    stats: [
      { value: "600+", label: "Students surveyed" },
      { value: "900+", label: "Students used the app" },
      { value: "25+", label: "Sessions led" },
      { value: "20+", label: "Mentors involved" },
    ],
    links: [],
    problem: [
      "In ninth grade I kept noticing the same thing: everyone around me was exhausted and nobody was saying so out loud. Stress, burnout, and the impossible arithmetic of school plus mental health plus having a life.",
      "I did not want to guess at what students needed, so I surveyed 600+ of them first and let the gaps in youth wellness come out of the data rather than out of my assumptions.",
    ],
    decisions: [
      {
        title: "Survey before building",
        body: "600+ students answered before a line of code was written. The app's features map to the gaps that survey found, not to features I thought were cool.",
      },
      {
        title: "Bring in people who had done this for decades",
        body: "I worked with 20+ mentors across music, yoga, dance, chanting, and Ayurveda, and built their principles into both the curriculum and the app architecture. I was fifteen; the practices were centuries old. It would have been arrogant to design this alone.",
      },
      {
        title: "Lead the sessions myself",
        body: "25+ sessions across age groups on stress, burnout, and balance. Running them in person taught me what the app could not do — which is most of it.",
      },
    ],
    architecture: [
      {
        title: "A web app of emotional-wellness tools",
        body: "Tools drawn directly from the mentor practices and the survey findings, delivered to students at school. 900+ students used it.",
      },
    ],
    failures: [
      "The app is not currently active. I built it, students used it, and then I did not build a way for it to outlive my own attention — no handover, no maintainers, no plan for the year after. That is the real lesson from this project, and it is why CCTIA was designed from day one as an organisation rather than a group of people doing favors.",
      "I also learned that a wellness app cannot carry a wellness problem by itself. The sessions did more than the software did, which was not the answer I expected when I started.",
    ],
    results: [
      "900+ students at school used the app.",
      "600+ students surveyed, producing the first real picture I had of what youth wellness gaps actually looked like.",
      "25+ sessions led across age groups.",
      "Directly led to NirvBand: everything I learned about passive versus active engagement started here, with students who would not open a wellness app but would wear something.",
    ],
    next: [
      "Not being revived in its original form. Its ideas live in NirvBand, which is built on the one finding Top The Graph proved: people in distress do not reliably open apps.",
    ],
    stack: ["Web app", "Survey research", "Curriculum design"],
    updates: [
      { date: "Grade 9", note: "Launched; 900+ student users. Now archived — the thinking continues in NirvBand." },
    ],
  },
  {
    slug: "cctia",
    name: "CCTIA",
    tagline: "A student innovation office that runs like a tech company, with the school district as its client.",
    role: "Founder & Director",
    years: "2026 — Present",
    status: "building",
    pillars: ["entrepreneurship", "technology", "communication"],
    summary:
      "The Coppell Core Technology Innovation Association: 120+ students across ~12 departments, building free software for real district problems.",
    cover: "/images/gallery/team-lab.jpg",
    stats: [
      { value: "120+", label: "Students recruited" },
      { value: "~12", label: "Departments" },
      { value: "0", label: "Elected officers" },
      { value: "1", label: "District client" },
    ],
    links: [],
    problem: [
      "School clubs collapse for a predictable reason: titles are elected, work is optional, and the thing that got built dies when its founder graduates. I had already watched that happen to my own project.",
      "Meanwhile the district has real software problems that no one is solving, and a building full of students who want real engineering experience and cannot get it.",
    ],
    decisions: [
      {
        title: "No elected officers",
        body: "Titles are earned by delivering, not by winning a popularity vote in September. This is the single structural decision the whole organisation rests on.",
      },
      {
        title: "Treat Coppell ISD as a client, not an audience",
        body: "Real stakeholders, real requirements-gathering, real deadlines. Members learn what it feels like when someone is actually waiting on your work.",
      },
      {
        title: "Departments, not committees",
        body: "~12 departments mirroring how a software organisation actually divides work, so that 120+ students can contribute without everyone sitting in the same meeting.",
      },
      {
        title: "Secure the institutional footing first",
        body: "Faculty sponsor and official club approval came before recruiting, because an organisation that depends on one student's goodwill is the failure mode I already lived through.",
      },
    ],
    architecture: [
      {
        title: "The counseling ecosystem app",
        body: "I independently developed a counseling-ecosystem app for school administration — currently under review. It is the first real deliverable to the district client.",
      },
      {
        title: "The operating model",
        body: "Free tech solutions for real district problems, built by students who get hands-on work with real stakeholders and deadlines.",
      },
    ],
    failures: [
      "This is the direct answer to Top The Graph's failure, so the thing I am watching hardest is whether it survives me. It has not yet been tested by a graduation, which is the only test that matters.",
      "Recruiting 120+ students is easy compared to keeping 120+ students shipping. Merit-based titles are a good mechanism on paper and I do not yet have a year of evidence that they work.",
    ],
    results: [
      "Conceived, designed, secured a faculty sponsor, and obtained official club approval.",
      "120+ students recruited across about 12 departments.",
      "A counseling-ecosystem app independently developed and under review by school administration.",
    ],
    next: [
      "Ship the counseling ecosystem app through review and into actual use by counselors.",
      "Get a second cohort running the departments so the structure, not the founder, is what holds.",
    ],
    stack: ["Full stack", "Product management", "Stakeholder requirements", "Org design"],
    updates: [
      { date: "2026", note: "Counseling-ecosystem app under administrative review." },
      { date: "2026", note: "Founded; faculty sponsor and club approval secured; 120+ members recruited." },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* ---------------- experience ---------------- */

export type Role = {
  org: string;
  title: string;
  period: string;
  location?: string;
  note?: string;
  points: string[];
  logo?: string;
};

export const experience: Role[] = [
  {
    org: "Microsoft",
    title: "Cloud Solutions Architecture, Data & AI Intern",
    period: "Aug 2026 — Present",
    location: "Dallas, TX (Hybrid)",
    note: "Third consecutive term — the only Coppell High School student contracted for a second year.",
    points: [
      "Contracted for a second year to work on cloud solution architecture, data, and AI.",
    ],
  },
  {
    org: "Microsoft",
    title: "Business Strategist in Security & AI Intern",
    period: "Aug 2025 — Aug 2026",
    location: "Dallas, TX (Hybrid)",
    note: "The only student selected for this role from a school of 4,000+, for the full year.",
    points: [
      "Researched AI-driven security frameworks — both AI in security and security in AI — alongside go-to-market strategy, market analysis, and deployment planning with senior engineers and business leads.",
      "Architected and implemented automation pipelines with a working prototype.",
      "Turned data-science research into business insights and presented to internal and external audiences.",
      "Developed a personal product under Microsoft mentor guidance and showcased it at conferences.",
    ],
  },
  {
    org: "Microsoft",
    title: "Cloud Architecture & Informatics Intern",
    period: "Jun 2025 — Aug 2025",
    location: "Dallas, TX (Hybrid)",
    note: "Selected as 1 of 9 students from Coppell High School.",
    points: [
      "Proposed and developed cloud pipeline architectures, gathering client requirements with senior engineers and translating them into architecture proposals.",
      "Supported GTM strategy and business analytics, integrating data science and AI perspectives into product initiatives.",
    ],
  },
  {
    org: "Amazon",
    title: "Leadership & Management Intern (selected)",
    period: "Apr 2025",
    note: "Selected as 1 of 2 students from a school of 4,000+ after a four-level screening process.",
    points: [
      "Year-long leadership and management internship offer following a rigorous four-stage selection.",
    ],
  },
  {
    org: "Suvidha International Foundation",
    title: "Lead Coach & Volunteer — AI, Public Speaking & Tech",
    period: "2025 — Present",
    points: [
      "Taught public speaking at 7+ camps and introduced an AI and programming camp, reaching 240+ students across 9 camps; camp proceeds helped raise $10,000+ for people in need.",
      "Co-organized the foundation's Global AI Hackathon (150+ participants), automated internal tasks, built websites, and manage its LinkedIn.",
    ],
  },
];

/* ---------------- origin story ---------------- */

export type Milestone = {
  when: string;
  title: string;
  body: string;
  pillar?: PillarId;
  /** Optional photos shown as a small strip beneath the entry. */
  images?: { src: string; alt: string; hint: string }[];
};

export const milestones: Milestone[] = [
  {
    when: "2015 — 2024",
    title: "Kendriya Vidyalaya, India",
    body: "An 'A' student, class representative, twice a Star Student. Nineteen times a keynote speaker before I ever thought of myself as someone who speaks. This is also where I started chanting Sanskrit — 600+ verses, still going.",
    pillar: "communication",
  },
  {
    when: "Age 11",
    title: "The first thing I ever built",
    body: "A language learning app, because moving between languages was the problem directly in front of me. It became Language at a Click, and it is the reason everything after this exists.",
    pillar: "technology",
  },
  {
    when: "May 2023",
    title: "One of seven winners worldwide",
    body: "The Silicon Valley App Development Challenge: 11,000+ entries, four stages of independent development, mentorship sprints and architectural code reviews. I pitched Language at a Click to Silicon Valley venture capitalists. I was twelve. Also ranked Top 2% of coders in the world in the under-18 category.",
    pillar: "entrepreneurship",
  },
  {
    when: "Oct 2023",
    title: "Representing Kerala, nationally",
    body: "Kala Utsav, Ministry of Education. I coded 'Dev Bhoomi,' a heritage and itinerary-planning app for Himachal Pradesh that became the centerpiece of the national showcase — and coordinated 200+ student builders at school and 600+ across Kerala. #1 in Kerala and Lakshadweep out of a 10,000+ pool; Top 50 in India.",
    pillar: "communication",
    images: [
      {
        src: "/images/gallery/kala-utsav-1.jpg",
        alt: "The Himachal Pradesh showcase model built for Kala Utsav",
        hint: "Kala Utsav — the Himachal model",
      },
      {
        src: "/images/gallery/kala-utsav-2.jpg",
        alt: "Student-built exhibits at the Kala Utsav showcase",
        hint: "Kala Utsav — the exhibits",
      },
    ],
  },
  {
    when: "Grade 9",
    title: "Top The Graph",
    body: "I surveyed 600+ students about burnout, led 25+ sessions, and built a wellness app 900+ students used. Then I let it lapse. That failure is the reason I now design organisations before I design products.",
    pillar: "health",
  },
  {
    when: "2024",
    title: "Texas",
    body: "A new school, a new country, and the particular silence of being the person who has to introduce herself again. Communication stopped being a trophy and became a tool.",
    pillar: "communication",
  },
  {
    when: "Sep 2024",
    title: "Ranked #1 globally",
    body: "Global Winner of the Toastmasters International Public Speaking Championship, humorous category, Global Groups 2024–25. Seven years of Toastmasters and NSDA behind it: 7× Best Speaker, 11× Best Impromptu, 14× Top Evaluator. Earlier that year I was a Top 6 finalist at the Kerala Public Speaking State Championship.",
    pillar: "communication",
    images: [
      {
        src: "/images/gallery/kerala-championship.jpg",
        alt: "Receiving the certificate at the Kerala Championship of Public Speaking",
        hint: "Kerala Championship — on stage",
      },
    ],
  },
  {
    when: "2024 — Present",
    title: "VakShala",
    body: "I had been coaching students one at a time and could not reach the ones who needed it most. So I built the thing that scores communication, and gave it away free to anyone who attends a workshop.",
    pillar: "entrepreneurship",
  },
  {
    when: "Jun 2025 — Present",
    title: "Microsoft",
    body: "Three consecutive terms across cloud architecture, informatics, security and AI, and business strategy. The only Coppell High School student contracted for a second year.",
    pillar: "technology",
  },
  {
    when: "2026",
    title: "CCTIA",
    body: "A student innovation office with the school district as its client, 120+ students, ~12 departments, and no elected officers. Built so it outlives me — the thing Top The Graph was not.",
    pillar: "entrepreneurship",
  },
];

/* ---------------- speaking & the other side ---------------- */

export type Talk = {
  title: string;
  venue: string;
  year: string;
  body: string;
};

export const talks: Talk[] = [
  {
    title: "From Chasing to Choosing",
    venue: "TEDx Coppell — featured speaker",
    year: "Apr 2026",
    body: "On the difference between pursuing what you are supposed to want and choosing what you actually do.",
  },
  {
    title: "From Shadows to Spotlight",
    venue: "TEDx",
    year: "Apr 2025",
    body: "On self-love and individuality — and on being the person at the edge of the room before you are the person at the front of it.",
  },
];

export type Honor = {
  title: string;
  detail: string;
  scope: string;
  year: string;
};

export const honors: Honor[] = [
  {
    title: "Global Winner, Toastmasters International Public Speaking Championship",
    detail: "Title winner, Humorous category, Global Groups 2024–25. Ranked #1 globally.",
    scope: "International",
    year: "Sep 2024",
  },
  {
    title: "Global Winner, Silicon Valley App Development Challenge",
    detail:
      "1 of 7 winners worldwide from 11,000+ entries, through four stages of independent development, mentorship sprints and architectural code reviews. Pitched Language at a Click to Silicon Valley VCs.",
    scope: "International",
    year: "May 2023",
  },
  {
    title: "Top 2% Coders in the World, Silicon Valley Challenge",
    detail: "Under-18 category, for problem-solving and app development.",
    scope: "International",
    year: "May 2023",
  },
  {
    title: "Global Silver Award, International Youth AI Competition (AI YES)",
    detail: "Hackathon division — awarded for VakShala.",
    scope: "International",
    year: "2026",
  },
  {
    title: "National Finalist & Kerala State Representative, Kala Utsav",
    detail:
      "Ministry of Education. #1 in Kerala and Lakshadweep from a 10,000+ pool, Top 50 in India. Coded 'Dev Bhoomi' and coordinated 800+ student builders across four levels.",
    scope: "National",
    year: "Oct 2023",
  },
  {
    title: "National Rank #4, Oral Interpretation",
    detail: "Digital Speech and Debate Series, Tournament of Champions Bid Qualifier.",
    scope: "National",
    year: "Mar 2026",
  },
  {
    title: "Finalist, Kerala Public Speaking State Championship",
    detail: "Top 6 youth speaker in the state across three competitive rounds, under 18.",
    scope: "State",
    year: "Jun 2024",
  },
  {
    title: "3rd Place, Prepared Presentation",
    detail: "Technology Student Association (TSA) Regional Conference.",
    scope: "Regional",
    year: "Feb 2025",
  },
  {
    title: "National Honor Society — Excalibur Chapter",
    detail: "Inducted for academic excellence, leadership, character and service. 4× Honor Roll.",
    scope: "School",
    year: "Apr 2025",
  },
  {
    title: "\"Outsmart Me If You Can\" — yearlong classroom challenge winner",
    detail:
      "Awarded two of three prizes by the instructor for consistently challenging and correcting classroom concepts through respectful intellectual debate.",
    scope: "School",
    year: "May 2025",
  },
];

export type OtherSide = {
  title: string;
  body: string;
  detail: string[];
};

export const otherSide: OtherSide[] = [
  {
    title: "Competitive speaking",
    body: "Seven years of Toastmasters and the National Speech & Debate Association.",
    detail: [
      "7× Best Speaker, 11× Best Impromptu Speaker, 14× Top Evaluator at Toastmasters.",
      "Named Gavelier of the Day (May 2024) for leadership and trust; ran key session responsibilities and overall coordination.",
      "19× keynote speaker at Kendriya Vidyalaya; 5× extemporaneous and impromptu speaking winner; 3× Best Presenter.",
      "Active circuit speaker, presenting keynotes and anchoring public events.",
    ],
  },
  {
    title: "Writing & building in public",
    body: "I write about communication, technology, startups, and what it is actually like to be a teenager in tech.",
    detail: [
      "2,200+ LinkedIn followers and roughly 100,000 impressions.",
      "3× published author in the Times of India.",
      "2× Essay Writing winner, interschool and state level.",
      "1× Best Marketing Campaign and Poster Design winner; 4× Art Contest winner.",
    ],
  },
  {
    title: "Carnatic vocals & Sanskrit chanting",
    body: "The practice I have kept through every move between India and the United States.",
    detail: [
      "3× Solo Vocals (Carnatic) winner.",
      "600+ verses of ancient Sanskrit texts, chanted from memory.",
      "Carried through two countries, several schools, and one very long flight.",
    ],
  },
  {
    title: "Teaching, free",
    body: "Communication education should not be a thing you need money to access.",
    detail: [
      "240+ students reached across 9 camps with Suvidha International Foundation.",
      "7+ public speaking camps taught; introduced an AI and programming camp.",
      "Camp proceeds helped raise $10,000+ for people in need.",
      "VakShala is free for anyone who attends a community workshop — 7k+ learners across 5+ international schools.",
    ],
  },
];

/* ---------------- builder's notebook ---------------- */

export type JournalEntry = {
  slug: string;
  date: string;
  title: string;
  tag: string;
  body: string[];
};

export const journal: JournalEntry[] = [
  {
    slug: "publishing-the-loss",
    date: "2026",
    title: "On publishing the result where my AI lost",
    tag: "Research",
    body: [
      "My reinforcement learning controller did not beat a well-tuned timer. Across 30 paired seeds, RL minus open-loop return came out at −1.34, with a 95% confidence interval of −1.66 to −1.04. It is not close, and it is not noise.",
      "I thought about not reporting it. I could have shown only the comparison against bang-bang control, which RL wins by 1.68. Nobody would have known to ask.",
      "But the entire premise of the project is that every number is traceable to its source, and a person who hides one comparison has no standing to claim the others. The gate was set before I saw the results — three pass, six partial, one fail — and that pre-registration is the only thing making the grade mean anything at all.",
      "What I actually learned: a timer is a very strong baseline for a process that is mostly predictable, and 'the AI should obviously win' was an assumption I never tested. The interesting question is not whether RL wins. It is which disturbances make the timer fall apart — and that is what the stress tests are for.",
    ],
  },
  {
    slug: "fluency-is-not-substance",
    date: "2026",
    title: "The model learned that talking longer is talking better",
    tag: "Machine learning",
    body: [
      "My first communication scoring model had a bias I did not design and did not notice for a while: longer answers scored higher, nearly independent of content.",
      "It was not the model's fault. In my early training data the stronger speakers genuinely did talk more, so length was a real signal — just not a causal one. The model found the shortcut I left lying around.",
      "The fix was to build adversarial examples on purpose: fluent, confident, well-paced, completely empty speech. Teaching a model that polish is not substance turns out to require showing it polish without substance, repeatedly, labelled honestly.",
      "I think about this every time someone tells me a model is 'biased.' Usually the model is reporting, very faithfully, something true about the data it was handed.",
    ],
  },
  {
    slug: "the-project-that-died",
    date: "2026",
    title: "I let a project die, and it changed how I build",
    tag: "Lessons",
    body: [
      "Top The Graph reached 900+ students. I surveyed 600 of them, ran 25+ sessions, worked with 20+ mentors. Then I got busy, and it stopped, and there was nobody to hand it to because I had never built a 'to'.",
      "The honest version is not that I ran out of time. It is that I built a product and called it an organisation. Products need maintainers. Organisations need structure that works when the founder is distracted, graduating, or wrong.",
      "CCTIA exists because of that. Faculty sponsor and official approval before recruiting. ~12 departments instead of one meeting. No elected officers, because titles handed out in September do not survive November. 120+ students, and the only test I care about is whether it is still running after I leave.",
      "It has not passed that test yet. I am not going to pretend it has.",
    ],
  },
  {
    slug: "passive-or-nothing",
    date: "2025",
    title: "People in distress do not open apps",
    tag: "Product",
    body: [
      "This is the one finding from Top The Graph that I carried into everything after: the students who most needed the wellness app were the least likely to open it. The ones who logged their moods daily were, broadly, fine.",
      "Every mental health tool we have shares this flaw. Therapy, medication, crisis lines — each requires you to already know you need help, and then to ask for it. The eleven-year average delay between symptom onset and first treatment is that requirement, measured.",
      "So NirvBand's central constraint is not a feature. It is a refusal: no feature may require the user to initiate. The band collects passively or the product does not work. Everything else — the sensor voting, the personal baselines, the four-level escalation — follows from that one line.",
      "I am aware this is also the thing that makes it hardest to build.",
    ],
  },
  {
    slug: "masking-what-i-dont-know",
    date: "2025",
    title: "Turning off the features I could not justify",
    tag: "Research",
    body: [
      "The photobioreactor simulation has a heater and a nutrient pump. Both are switched off, deliberately, and exported with masked: true and a reason string.",
      "There is no reliable published data for how this strain responds to temperature in the range the reactor runs at, or for its nutrient uptake. I could have picked plausible numbers. The simulation would have looked more complete and more impressive.",
      "A controller acting on invented numbers is worse than one that declines to act, because the invented numbers do not announce themselves — they just quietly make every downstream result wrong. So each masked channel names the specific experiment that would unmask it.",
      "I find this is the hardest discipline in the whole project. Leaving a gap visible looks like incompleteness. Filling it looks like rigor. It is the other way around.",
    ],
  },
];

/* ---------------- misc ---------------- */

export const profile = {
  name: "Sathvika Nivasini Bhaskar Chitra",
  short: "Sathvika Nivasini",
  nickname: "Sathvi",
  roles: ["Builder", "Speaker", "Founder", "Researcher"],
  intro:
    "I build technology at the intersection of hardware, machine learning, health and entrepreneurship — with communication as the thread running through all of it.",
  school: "Coppell High School · Coppell, TX · Expected May 2027",
  intended:
    "Computer Engineering · Business minor · ML/AI and Data Science concentration",
  linkedin:
    "https://www.linkedin.com/in/sathvika-nivasini-bhaskar-chitra-341458259/",
  email: "sathvikanivasini865@gmail.com",
};

export const skills = {
  Languages: ["Python", "JavaScript / TypeScript", "C++ (Arduino)"],
  "ML & data": ["scikit-learn", "Neural networks", "Reinforcement learning", "Feature engineering"],
  "Web & app": ["React", "Next.js", "Vite", "Tailwind CSS", "Supabase", "React Native"],
  "Cloud & infra": ["Azure IoT Hub", "Stream Analytics", "Databricks", "Azure ML", "Netlify", "Vercel"],
  Hardware: ["ESP32", "Sensor system design", "Circuit design"],
  Business: ["GTM strategy", "Market analysis", "Product architecture", "Org design"],
};

export const certifications = [
  "Certified Industry 4.0 Associate, Robot System Operations — SACA, 2026",
  "Artificial Intelligence with Python — MSME PPDC Agra, 2022",
  "Cyber Security & Ethical Hacking — MSME-TDC PPDC Agra, 2022",
  "Certified Business Management Professional — MSME TDC Chennai, 2023",
  "Designing & Building Electronic Circuits — Young-Scientist.in, 2021",
  "Digital Video Editing: Photoshop & Premiere Pro — MSME TDC Chennai",
];
