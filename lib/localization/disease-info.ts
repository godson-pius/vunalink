export type LocalizedDiseaseInfo = {
  diseaseId: string;
  name: string;
  explanation: string;
  symptoms: readonly string[];
  actions: readonly string[];
  prevention: readonly string[];
  warning: string;
  assistance: string;
};

const blight = (diseaseId: string, name: string, crop: string): LocalizedDiseaseInfo => ({
  diseaseId,
  name,
  explanation: `Ishusho yerekana ko ${crop} ishobora kuba ifite iyi ndwara. Ibi ni ubufasha bw'ikoranabuhanga, si isuzuma ridashidikanywaho.`,
  symptoms: ["Amababi agira utubara twijimye cyangwa duhinduye ibara.", "Amababi ashobora kuba umuhondo, kuma cyangwa kugwa.", "Ibimenyetso bishobora kwiyongera mu gihe cy'imvura cyangwa ubuhehere bwinshi."],
  actions: ["Reba n'ibindi bihingwa, cyane cyane amababi yo hasi.", "Kuraho ibice byangiritse cyane, ubishyire kure y'ibihingwa bizima.", "Saba umukozi w'ubujyanama mu buhinzi kugenzura indwara."],
  prevention: ["Irinde gutosa amababi igihe uvomera, kandi utere amazi ku butaka.", "Ha ibihingwa umwanya uhagije kugira ngo umwuka unyuremo.", "Kuraho ibisigazwa by'ibihingwa nyuma y'isarura."],
  warning: "Ibimenyetso bisa bishobora guterwa n'indwara zitandukanye. Ntukoreshe umuti wica udukoko utabanje kugisha inama kandi utabanje gusoma amabwiriza yawo.",
  assistance: "Niba indwara ikwirakwira vuba cyangwa ifata ibihingwa byinshi, hamagara umukozi w'ubujyanama mu buhinzi.",
});

const healthy = (diseaseId: string, crop: string): LocalizedDiseaseInfo => ({
  diseaseId,
  name: `${crop} isa n'ifite ubuzima bwiza`,
  explanation: "Iyi foto ntiyagaragaje imwe mu ndwara ziri ku rutonde rw'iyi porogaramu.",
  symptoms: [],
  actions: ["Komeza kugenzura ibihingwa byawe buri gihe.", "Niba hagaragaye ibimenyetso bishya cyangwa bikiyongera, saba ubufasha."],
  prevention: ["Irinde gutosa amababi igihe uvomera.", "Ha ibihingwa umwanya uhagije kugira ngo umwuka unyuremo.", "Kuraho ibisigazwa by'ibihingwa nyuma y'isarura."],
  warning: "Kuvuga ko igihingwa gisa n'ikizima ntibivuze ko nta ndwara gifite. Ntukoreshe umuti wica udukoko utabanje kugisha inama.",
  assistance: "Saba umukozi w'ubujyanama mu buhinzi kugenzura ibimenyetso bishya cyangwa bikomeza kwiyongera.",
});

export const DISEASE_INFO_RW: Readonly<Record<string, LocalizedDiseaseInfo>> = {
  potato_early_blight: blight("potato_early_blight", "Ibibara by'amababi ku birayi (Early blight)", "ibirayi"),
  potato_late_blight: blight("potato_late_blight", "Indwara ikwirakwira vuba ku birayi (Late blight)", "ibirayi"),
  tomato_early_blight: blight("tomato_early_blight", "Ibibara by'amababi ku nyanya (Early blight)", "inyanya"),
  tomato_late_blight: blight("tomato_late_blight", "Indwara ikwirakwira vuba ku nyanya (Late blight)", "inyanya"),
  potato_healthy: healthy("potato_healthy", "ibirayi"),
  tomato_healthy: healthy("tomato_healthy", "inyanya"),
};

export function getDiseaseInfoRw(diseaseId: string): LocalizedDiseaseInfo {
  return DISEASE_INFO_RW[diseaseId] ?? {
    diseaseId,
    name: "Ibisubizo by'isuzuma",
    explanation: "Iyi ni porogaramu ifasha gutanga igitekerezo ku ndwara z'ibihingwa.",
    symptoms: ["Reba impinduka ku mababi, ku giti cyangwa ku mbuto."],
    actions: ["Saba umukozi w'ubujyanama mu buhinzi kugenzura igihingwa."],
    prevention: ["Komeza kugenzura ibihingwa byawe buri gihe."],
    warning: "Ibi ni igitekerezo cy'ubwenge buhangano, si isuzuma ridashidikanywaho.",
    assistance: "Saba ubufasha bw'umukozi w'ubujyanama mu buhinzi niba ufite impungenge.",
  };
}
