export interface Photo {
  src: string;
  width: number;
  height: number;
}

export interface Series {
  slug: string;
  title: string;
  material: string;
  year: string;
  status: "complete" | "in-progress";
  tagline: string;
  longread: string[];
  photos: Photo[];
}

export const CERAMICS_SERIES: Series[] = [
  {
    slug: "series-01",
    title: "Series 01",
    material: "",
    year: "",
    status: "complete",
    tagline: "",
    longread: [],
    photos: [
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f102cf27e30aa6989_d20250928_m175150_c004_v0402007_t0052_u01759081910219",
        width: 4032, height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1071b9487835410b_d20250928_m175133_c004_v0402026_t0024_u01759081893909",
        width: 6240, height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10786810c074c97b_d20250928_m175136_c004_v0402000_t0057_u01759081896368",
        width: 4032, height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f107d8a16ace0d755_d20250928_m175144_c004_v0402029_t0054_u01759081904111",
        width: 6240, height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1197e503498e592d_d20250928_m175148_c004_v0402026_t0003_u01759081908161",
        width: 4032, height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11984df882bd8f37_d20250928_m175126_c004_v0402012_t0036_u01759081886846",
        width: 3024, height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f101f76678969f1dc_d20250928_m175145_c004_v0402028_t0032_u01759081905173",
        width: 3024, height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f103f2dcf8add5a40_d20251220_m180102_c004_v0402015_t0027_u01766253662867",
        width: 9504, height: 6336,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f100aa8d5593015dc_d20251220_m180048_c004_v0402003_t0006_u01766253648659",
        width: 3024, height: 4032,
      },
    ],
  },
];
