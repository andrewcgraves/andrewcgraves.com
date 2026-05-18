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
    longread: [
      "I've been interested in trying to see how quickly I could make a small cup, so I sought to do that with these two. I also experimented with using a throwing gauge again, something I hadn't done since I attempted the second set of ramen bowls I worked on. It was a futile effort, though, as the one I was using marked and scored the piece and delayed their completion.",
      "Overall, this was a very pleasant experience. I got these out in record time, only taking about 2 weeks from throwing to final glaze fire, where most of that time was waiting for the actual fire.",
      "I love how they turned out; with the smooth shino texture and the blotchy appearance, they really are a comfortable piece to hold and use daily. These handles were also some of the thinnest that I've pulled thus far, and I think they turned out strong and stylish.",
    ],
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
    longread: [
      "These were some of the first pieces I was actually proud of, specifically the green one. I wanted to try out doing a large assembly line batch where all pieces had a similar style and could really refine the creation process. Overall I threw 6 pieces, but the three on the white background are my favorites.",
      "This was also the first batch where I was able to try refining a style I had been drawing, sharp and angular pieces, into my work. As I felt more confident about my work, I designed, carved, and fired my first maker's mark! You can see this v1 on some of the early pieces I made, but it would soon be replaced with the v2 that you see as the logo on this website.",
      "I've included some sketches and process photos below.",
    ],
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
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11949c603bbb32e7_d20260517_m174338_c004_v0402005_t0057_u01779039818274",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1047196fd981fdc1_d20260517_m174707_c004_v0402032_t0017_u01779040027862",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f10181a82447680dd_d20260517_m174707_c004_v0402011_t0017_u01779040027190",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1103a5a71096ae19_d20260517_m174706_c004_v0402030_t0032_u01779040026977",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f116f6c8fe88dde81_d20260517_m174706_c004_v0402007_t0037_u01779040026736",
        width: 4032,
        height: 3024,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f1109596b2411e306_d20260517_m174706_c004_v0402021_t0055_u01779040026548",
        width: 4032,
        height: 3024,
      },
    ],
  },
  {
    slug: "ramen-bowls-02",
    title: "Ramen Bowls",
    material: "porcelain",
    status: "complete",
    tagline: "An excercise in throwing large with porcelain",
    longread: [
      "These bowls were a huge exercise in patience. They are the second round of bowls that I made after experiencing cracking, warping, and excessive shrinking on the first batch. That first batch was a great learning experience because it forced me to go back to the drawing board with my creation process for working in porcelain.",
      "The main takeaway was that I needed to throw much bigger to get the sizes I needed, allow more time for slow drying, and compress a bit more to prevent cracking and ensure I got the proper end size I wanted.",
      "I was much more cautious when throwing this batch and made sure to follow all my observations from the last batch. To mix things up a bit, I also got back into cobalt painting on one of the pieces.",
    ],
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
  {
    slug: "misc-pieces",
    title: "Misc Pieces",
    material: "various",
    year: "2023-2026",
    status: "complete",
    tagline:
      "A collection of various other pieces I've worked on but don't fit neatly within a designated 'collection'",
    longread: [],
    photos: [
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f11984df882bd8f37_d20250928_m175126_c004_v0402012_t0036_u01759081886846",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f102cf27e30aa6989_d20250928_m175150_c004_v0402007_t0052_u01759081910219",
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
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f101f76678969f1dc_d20250928_m175145_c004_v0402028_t0032_u01759081905173",
        width: 3024,
        height: 4032,
      },
      {
        src: "https://f004.backblazeb2.com/b2api/v1/b2_download_file_by_id?fileId=4_z8f907fb55c4c22b29911051f_f100aa8d5593015dc_d20251220_m180048_c004_v0402003_t0006_u01766253648659",
        width: 3024,
        height: 4032,
      },
    ],
  },
];
