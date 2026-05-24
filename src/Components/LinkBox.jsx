import Image from "next/image";

export default function LinkBox({ link, imgSrc, alt }) {
  return (
    <a href={link} target="_blank" className="object-contain aspect-square flex-none h-24">
      <div className="link-box">
        <Image src={imgSrc} alt={alt} />
      </div>
    </a>
  );
}
