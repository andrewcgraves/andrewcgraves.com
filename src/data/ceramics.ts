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
    slug: "espresso-mugs-01",
    title: "Espresso Mugs",
    material: "stonewear (LBC)",
    status: "complete",
    tagline: "a housewarming gift for my sister",
    longread: [],
    year: "2026",
    photos: [
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10232f42de81c26b_d20260517_m163109_c004_v0402018_t0046_u01779035469564",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f105bb5f9570c35e5_d20260517_m163110_c004_v0402034_t0003_u01779035470947",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f119a81c09609e97c_d20260517_m163110_c004_v0402033_t0045_u01779035470258",
        width: 6240,
        height: 4160,
      },
    ],
  },
  {
    slug: "taped-mugs-01",
    title: "Taped Tea Mugs",
    material: "stonewear (LBC)",
    status: "complete",
    tagline: "An expermentation with tape and how it can resist glaze flow",
    longread: [],
    year: "2025",
    photos: [
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11981e1378333b0d_d20260517_m163408_c004_v0402006_t0036_u01779035648030",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f116c981edeea79d0_d20260517_m163408_c004_v0402032_t0011_u01779035648551",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1032098ca6c6cd10_d20260517_m163407_c004_v0402033_t0034_u01779035647256",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f107e6cc412c5462a_d20260517_m163408_c004_v0402009_t0007_u01779035648873",
        width: 6240,
        height: 4160,
      },
    ],
  },
  {
    slug: "ramen-bowls-01",
    title: "Ramen Bowls",
    material: "porcelain",
    status: "complete",
    tagline: "An excercise in throwing large with porcelain",
    longread: [],
    year: "2025",
    photos: [
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f108a3eac6d9e363c_d20260517_m162135_c004_v0402033_t0025_u01779034895895",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10463e7c9c34aa3b_d20260517_m162137_c004_v0402033_t0030_u01779034897678",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10011a62f672cdfa_d20260517_m162137_c004_v0402034_t0053_u01779034897503",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1162458a1b2e9c99_d20260517_m162137_c004_v0402031_t0000_u01779034897088",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10793d70dd721600_d20260517_m162133_c004_v0402023_t0021_u01779034893522",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10310385f27be28e_d20260517_m162132_c004_v0402024_t0015_u01779034892225",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f110a569e990922fb_d20260517_m162132_c004_v0402028_t0047_u01779034892033",
        width: 3024,
        height: 4032,
      },
    ],
  },
  // {
  //   slug: "lidded-forms-01",
  //   title: "Lidded Forms",
  //   material: "stonewear (LBC)",
  //   status: "complete",
  //   tagline: "Learning how to better create lids that feel good to use",
  //   longread: [],
  //   year: "2025",
  //   photos: [
  //     {
  //       src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11981e1378333b0d_d20260517_m163408_c004_v0402006_t0036_u01779035648030",
  //       width: 6240,
  //       height: 4160,
  //     },
  //   ],
  // },
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
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1071b9487835410b_d20250928_m175133_c004_v0402026_t0024_u01759081893909",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10786810c074c97b_d20250928_m175136_c004_v0402000_t0057_u01759081896368",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f107d8a16ace0d755_d20250928_m175144_c004_v0402029_t0054_u01759081904111",
        width: 6240,
        height: 4160,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1197e503498e592d_d20250928_m175148_c004_v0402026_t0003_u01759081908161",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11984df882bd8f37_d20250928_m175126_c004_v0402012_t0036_u01759081886846",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f101f76678969f1dc_d20250928_m175145_c004_v0402028_t0032_u01759081905173",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f103f2dcf8add5a40_d20251220_m180102_c004_v0402015_t0027_u01766253662867",
        width: 9504,
        height: 6336,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f100aa8d5593015dc_d20251220_m180048_c004_v0402003_t0006_u01766253648659",
        width: 3024,
        height: 4032,
      },
    ],
  },
];
