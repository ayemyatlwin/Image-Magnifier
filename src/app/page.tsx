import ImageMagnifier from "./components/ImageMagnifier";

export default function Home() {
  return (
    <div>
      <h1>Image Magnifier in Next.js 14</h1>
      <ImageMagnifier
        src="/images/hat2.png"
        alt="Example Image"
        zoomLevel={2}
      />
    </div>
  );
}
