// Single source of truth for site content — mirrors RPJ_EXPORTS_PRODUCT_CATALOGUE.pdf.

export const COMPANY = {
  name: 'RPJ Exports',
  tagline: 'Your requirement. Our sourcing. Reliable supply.',
  location: 'Jaipur, Rajasthan, India',
  phones: ['+91 95888 84725', '+91 91660 99010'],
  email: 'info@rpjexports.com',
  // Kept from the previous site; confirm this is the WhatsApp-enabled number.
  whatsapp: '919588884725',
};

export type ProductCategory = 'seeds' | 'gum' | 'feed';

export const CATEGORIES: { id: ProductCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All products' },
  { id: 'seeds', label: 'Seeds & Splits' },
  { id: 'gum', label: 'Guar Gum' },
  { id: 'feed', label: 'Feed By-Products' },
];

export type Spec = { label: string; value: string };

export type Product = {
  id: string;
  index: string;
  name: string;
  grade: string;
  summary: string;
  applications: string[];
  category: ProductCategory;
  image: string;
  specs: Spec[];
};

const PACKAGING: Spec = { label: 'Packaging', value: '25 kg / 50 kg / On Request' };

export const PRODUCTS: Product[] = [
  {
    id: 'guar-seeds',
    index: '01',
    name: 'Guar Seeds',
    grade: 'Whole guar seeds',
    summary: 'Natural guar seeds used for further processing.',
    applications: ['Guar splits', 'Gum manufacturing'],
    category: 'seeds',
    image: '/products/guar-seeds.webp',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Quality', value: 'Fair Average Quality (FAQ)' },
      { label: 'Moisture', value: '10% Max' },
      { label: 'Foreign Matter', value: '1% Max' },
      { label: 'Admixture', value: '1% Max' },
      PACKAGING,
    ],
  },
  {
    id: 'guar-splits',
    index: '02',
    name: 'Guar Splits',
    grade: 'Refined seed endosperm',
    summary: 'Primary raw material for guar gum processing.',
    applications: ['Food gum', 'Industrial gum'],
    category: 'seeds',
    image: '/products/guar-splits.webp',
    specs: [
      { label: 'Origin', value: 'India' },
      { label: 'Gum Content', value: '80% Min' },
      { label: 'Moisture', value: '12% Max' },
      { label: 'Protein', value: '6% Max' },
      { label: 'Ash', value: '1.5% Max' },
      PACKAGING,
    ],
  },
  {
    id: 'food-grade-guar-gum',
    index: '03',
    name: 'Food Grade Guar Gum',
    grade: '200 mesh · 3,500–6,500 CPS',
    summary: 'Fine powder for food and formulation applications.',
    applications: ['Bakery', 'Dairy', 'Sauces', 'Beverages'],
    category: 'gum',
    image: '/products/food-grade-guar-gum.webp',
    specs: [
      { label: 'Appearance', value: 'White to cream fine powder' },
      { label: 'Mesh', value: '200 Mesh' },
      { label: 'Viscosity', value: '3,500–6,500 CPS' },
      { label: 'Viscosity Test', value: '1% solution, approx. 25°C' },
      { label: 'pH', value: '5.5–7.0' },
      { label: 'Moisture', value: '≤12%' },
      { label: 'Protein', value: '≤4–5%' },
      { label: 'Ash', value: '≤1.0–1.5%' },
      { label: 'Gum Content', value: '≥80%' },
      PACKAGING,
    ],
  },
  {
    id: 'industrial-grade-guar-gum',
    index: '04',
    name: 'Industrial Grade Guar Gum',
    grade: '100 / 200 / 300 mesh',
    summary: 'Industrial grades in different mesh and viscosity levels.',
    applications: ['Oil & Gas', 'Textile', 'Paper', 'Mining'],
    category: 'gum',
    image: '/products/industrial-grade-guar-gum.webp',
    specs: [
      { label: 'Appearance', value: 'Fine guar gum powder' },
      { label: 'Mesh', value: '100 / 200 / 300 Mesh' },
      { label: 'Viscosity', value: '3,000–6,000 CPS' },
      { label: 'Moisture', value: '12% Max' },
      PACKAGING,
    ],
  },
  {
    id: 'guar-dust',
    index: '05',
    name: 'Guar Dust',
    grade: 'Animal feed grade',
    summary: 'Guar processing by-product for animal feed applications.',
    applications: ['Cattle', 'Poultry', 'Animal nutrition'],
    category: 'feed',
    image: '/products/guar-dust.webp',
    specs: [
      { label: 'Grade', value: 'Animal Feed Grade' },
      { label: 'Specification', value: 'Confirmed per requirement' },
      { label: 'Applications', value: 'Cattle & poultry feed · Animal nutrition' },
      PACKAGING,
    ],
  },
  {
    id: 'guar-churi',
    index: '06',
    name: 'Guar Churi',
    grade: 'Animal feed grade',
    summary: 'Guar processing by-product used as a feed ingredient.',
    applications: ['Feed applications'],
    category: 'feed',
    image: '/products/guar-churi.webp',
    specs: [
      { label: 'Grade', value: 'Animal Feed Grade' },
      { label: 'Crude Protein', value: '35–40% Min' },
      { label: 'Crude Fibre', value: '6–8% Max' },
      { label: 'Moisture', value: '10% Max' },
      { label: 'Mesh', value: '100–200 Mesh' },
      PACKAGING,
    ],
  },
  {
    id: 'guar-korma',
    index: '07',
    name: 'Guar Korma',
    grade: 'Animal feed grade',
    summary: 'Guar processing by-product used as a feed ingredient.',
    applications: ['Cattle feed', 'Poultry feed'],
    category: 'feed',
    image: '/products/guar-korma.webp',
    specs: [
      { label: 'Grade', value: 'Animal Feed Grade' },
      { label: 'Crude Protein', value: '35–40% Min' },
      { label: 'Crude Fibre', value: '6–8% Max' },
      { label: 'Moisture', value: '10% Max' },
      { label: 'Mesh', value: '100–200 Mesh' },
      PACKAGING,
    ],
  },
];

export const SPEC_NOTE =
  'Final product specifications and quality parameters are confirmed according to the agreed customer specification and applicable COA. Viscosity values are indicative and confirmed according to the agreed testing method.';

// Indicative ranges plotted in the spec explorer.
export const VISCOSITY_RANGES = [
  { id: 'food-grade-guar-gum', label: 'Food Grade', min: 3500, max: 6500 },
  { id: 'industrial-grade-guar-gum', label: 'Industrial Grade', min: 3000, max: 6000 },
];

export const PROCESS = [
  {
    step: '01',
    title: 'Understand',
    body: 'We understand your product requirements and specifications.',
  },
  {
    step: '02',
    title: 'Source',
    body: 'We coordinate sourcing through suitable Indian manufacturing and processing partners.',
  },
  {
    step: '03',
    title: 'Verify',
    body: 'We coordinate quality parameters and relevant product documentation per specification.',
  },
  {
    step: '04',
    title: 'Supply',
    body: 'We coordinate export-ready supply according to the agreed requirements.',
  },
];

export const WHY_US = [
  {
    title: 'Requirement-Based Sourcing',
    body: 'Products can be sourced according to specific customer requirements.',
  },
  {
    title: 'Wide Product Range',
    body: 'Guar seeds, splits, food grade, industrial grade, guar dust, churi and korma.',
  },
  {
    title: 'Flexible Specifications',
    body: 'Viscosity, mesh size and other parameters coordinated per application.',
  },
  {
    title: 'Export Coordination',
    body: 'Support with documentation, packaging and shipment coordination.',
  },
  {
    title: 'Quality Documentation',
    body: 'Technical specifications and shipment documentation provided as applicable.',
  },
  {
    title: 'India-Based Sourcing',
    body: "Access to India's established guar supply chain.",
  },
];

// Applications without a matching photo render as illustrated cards (image: null).
export const APPLICATIONS: {
  industry: string;
  uses: string[];
  product: string;
  image: string | null;
}[] = [
    {
      industry: 'Food & Beverage',
      uses: ['Bakery', 'Dairy', 'Sauces', 'Beverages'],
      product: 'Food Grade Guar Gum',
      image: '/media/guar-gum-bowl.webp',
    },
    {
      industry: 'Oil & Gas',
      uses: ['Drilling fluids', 'Fracturing', 'Viscosity control'],
      product: 'Industrial Grade Guar Gum',
      image: null,
    },
    {
      industry: 'Textile & Paper',
      uses: ['Printing thickener', 'Sizing', 'Paper strength'],
      product: 'Industrial Grade Guar Gum',
      image: null,
    },
    {
      industry: 'Mining',
      uses: ['Flotation', 'Settling aid'],
      product: 'Industrial Grade Guar Gum',
      image: null,
    },
    {
      industry: 'Animal Nutrition',
      uses: ['Cattle feed', 'Poultry feed', 'Protein ingredient'],
      product: 'Guar Dust · Churi · Korma',
      image: '/media/guar-protein.webp',
    },
    {
      industry: 'Gum Processing',
      uses: ['Guar splits', 'Gum manufacturing'],
      product: 'Guar Seeds · Guar Splits',
      image: '/media/guar-field.webp',
    },
  ];

export const FAQS = [
  {
    q: 'Which guar products does RPJ Exports supply?',
    a: 'Guar seeds, guar splits, food grade guar gum, industrial grade guar gum (100 / 200 / 300 mesh), and feed by-products — guar dust, guar churi and guar korma.',
  },
  {
    q: 'Can you help us choose the right specification?',
    a: 'Yes. Share your application, required viscosity, mesh size, grade, quantity and destination. We coordinate the requirement with a suitable processing partner before commercial confirmation.',
  },
  {
    q: 'What information is needed to request a quote?',
    a: 'The required grade, mesh size, viscosity, application, quantity, packaging preference, delivery destination and any quality or documentation requirements.',
  },
  {
    q: 'What packaging options are available?',
    a: 'Standard packing is 25 kg or 50 kg bags. Other packaging can be arranged on request according to quantity, handling needs and destination-market requirements.',
  },
  {
    q: 'Are the listed specifications final?',
    a: 'The catalogue values are indicative commercial ranges. Final specifications and quality parameters are confirmed against the agreed customer specification and the applicable COA.',
  },
  {
    q: 'Do you support international shipments from India?',
    a: 'Yes. We support international buyers with sourcing communication, export packaging, documentation coordination and shipment follow-ups from India.',
  },
  {
    q: 'Do you provide samples before an order?',
    a: 'Sample discussions can be coordinated based on the requirement, application and destination. Share your specifications and we will suggest the right next step.',
  },
];
