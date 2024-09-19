export default function Loading() {
  const MicrosoftLoaderSVG = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 300 150">
      <path
        fill="none"
        stroke="#228ec3"
        strokeWidth="6"  
        strokeLinecap="round"
        strokeDasharray="300"  
        strokeDashoffset="0"
        d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
      >
        <animate
          attributeName="stroke-dashoffset"
          calcMode="spline"
          dur="2"
          values="0; 300; 0"  
          keySplines="0 0 1 1; 0 0 1 1"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
  return (
      <MicrosoftLoaderSVG />
  );
}
