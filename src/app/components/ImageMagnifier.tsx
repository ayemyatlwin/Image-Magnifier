"use client";
import { useState, useRef, MouseEvent } from "react";
import Image from "next/image";
import styles from "./styles/ImageMagnifier.module.css"; 
interface ImageMagnifierProps {
  src: string;
  alt: string;
  zoomLevel?: number;
}

interface Position {
  x: number;
  y: number;
}

const ImageMagnifier: React.FC<ImageMagnifierProps> = ({
  src,
  alt,
  zoomLevel = 2,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const imageRef = useRef<HTMLImageElement | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const { top, left, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    if (x < 0 || x > width || y < 0 || y > height) {
      setIsHovered(false);
    } else {
      setIsHovered(true);
      setMagnifierPosition({ x, y });
    }
  };

  return (
    <div
      className={styles.magnifierContainer}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        width={500}
        height={500}
        className={styles.image}
      />

      {isHovered && (
        <div
          className={styles.magnifierGlass}
          style={{
            left: `${magnifierPosition.x}px`,
            top: `${magnifierPosition.y}px`,
            backgroundImage: `url(${src})`,
            backgroundPositionX: `-${magnifierPosition.x * zoomLevel}px`,
            backgroundPositionY: `-${magnifierPosition.y * zoomLevel}px`,
            backgroundSize: `${500 * zoomLevel}px ${500 * zoomLevel}px`,
          }}
        />
      )}

      {isHovered && (
        <div className={styles.magnifiedImageContainer}>
          <div
            className={styles.magnifiedImage}
            style={{
              backgroundImage: `url(${src})`,
              backgroundPositionX: `-${
                magnifierPosition.x * zoomLevel - 250
              }px`,
              backgroundPositionY: `-${
                magnifierPosition.y * zoomLevel - 250
              }px`,
              backgroundSize: `${500 * zoomLevel}px ${500 * zoomLevel}px`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageMagnifier;
