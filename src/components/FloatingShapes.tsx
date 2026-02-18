import { motion } from "framer-motion";

interface Shape {
  size: number;
  x: string;
  y: string;
  delay: number;
  duration: number;
  color: "primary" | "secondary";
  type: "circle" | "ring" | "cross" | "dot";
}

const shapes: Shape[] = [
  { size: 60, x: "10%", y: "20%", delay: 0, duration: 18, color: "primary", type: "circle" },
  { size: 40, x: "80%", y: "15%", delay: 2, duration: 22, color: "secondary", type: "ring" },
  { size: 30, x: "70%", y: "70%", delay: 4, duration: 20, color: "primary", type: "cross" },
  { size: 50, x: "20%", y: "75%", delay: 1, duration: 16, color: "secondary", type: "circle" },
  { size: 20, x: "50%", y: "10%", delay: 3, duration: 24, color: "primary", type: "dot" },
  { size: 35, x: "90%", y: "50%", delay: 5, duration: 19, color: "secondary", type: "ring" },
  { size: 25, x: "30%", y: "40%", delay: 2, duration: 21, color: "primary", type: "dot" },
  { size: 45, x: "60%", y: "85%", delay: 0, duration: 17, color: "secondary", type: "cross" },
];

const renderShape = (shape: Shape) => {
  const colorClass = shape.color === "primary"
    ? "bg-primary/10 border-primary/20"
    : "bg-secondary/10 border-secondary/20";

  switch (shape.type) {
    case "circle":
      return (
        <div
          className={`rounded-full ${colorClass}`}
          style={{ width: shape.size, height: shape.size }}
        />
      );
    case "ring":
      return (
        <div
          className={`rounded-full border-2 ${shape.color === "primary" ? "border-primary/20" : "border-secondary/20"}`}
          style={{ width: shape.size, height: shape.size }}
        />
      );
    case "cross":
      return (
        <div className="relative" style={{ width: shape.size, height: shape.size }}>
          <div className={`absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 ${shape.color === "primary" ? "bg-primary/15" : "bg-secondary/15"}`} />
          <div className={`absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 ${shape.color === "primary" ? "bg-primary/15" : "bg-secondary/15"}`} />
        </div>
      );
    case "dot":
      return (
        <div
          className={`rounded-full ${shape.color === "primary" ? "bg-primary/20" : "bg-secondary/20"}`}
          style={{ width: shape.size / 2, height: shape.size / 2 }}
        />
      );
  }
};

const FloatingShapes = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    {shapes.map((shape, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: shape.x, top: shape.y }}
        animate={{
          y: [0, -30, 10, -20, 0],
          x: [0, 15, -10, 20, 0],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: shape.duration,
          repeat: Infinity,
          delay: shape.delay,
          ease: "easeInOut",
        }}
      >
        {renderShape(shape)}
      </motion.div>
    ))}
  </div>
);

export default FloatingShapes;
