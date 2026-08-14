import { images, type ImageKey } from "@/lib/images";

type Props = {
  name: ImageKey;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  alt?: string;
};

/**
 * Komponenti i vetëm për fotografitë — zëvendësimi bëhet te src/lib/images.ts
 */
export function Photo({ name, className, imgClassName, priority, width, height, alt }: Props) {
  const img = images[name];
  return (
    <div className={className}>
      <img
        src={img.url}
        alt={alt ?? img.alt}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        className={imgClassName ?? "h-full w-full object-cover"}
      />
    </div>
  );
}
