import type { Diagram } from "@/lib/content";

/**
 * A flow diagram, drawn from a declarative spec in content.ts.
 *
 * Every measurement here is fixed rather than measured from the DOM, so the
 * server and the client draw the identical picture and there is no reflow on
 * hydration. The viewBox scales it to whatever width it is given.
 *
 * Lanes are columns, left to right, in the order the work actually happens.
 * Nodes stack inside their lane, centred vertically against the tallest lane,
 * so a one-node lane sits level with the middle of a four-node one and the
 * edges stay roughly horizontal.
 */

const NODE_W = 182;
const NODE_H = 66;
const LANE_GAP = 104;
const NODE_GAP = 16;
const HEAD_H = 34;
const PAD = 10;

const TONE: Record<string, { fill: string; stroke: string; text: string }> = {
  publish: { fill: "var(--surface)", stroke: "var(--border-strong)", text: "var(--text)" },
  core: { fill: "var(--accent-glow)", stroke: "var(--accent)", text: "var(--text)" },
  consume: { fill: "var(--surface)", stroke: "var(--border-strong)", text: "var(--text)" },
};

export default function FlowDiagram({ diagram }: { diagram: Diagram }) {
  const { lanes, nodes, edges, title, caption } = diagram;

  // Group nodes by lane, keeping the order they were written in.
  const byLane: typeof nodes[] = lanes.map((_, i) => nodes.filter((n) => n.lane === i));
  const tallest = Math.max(...byLane.map((l) => l.length), 1);

  const laneH = tallest * NODE_H + (tallest - 1) * NODE_GAP;
  const width = lanes.length * NODE_W + (lanes.length - 1) * LANE_GAP + PAD * 2;
  const height = HEAD_H + laneH + PAD * 2;

  /** Top-left corner of a node, and its centre, in diagram space. */
  const place = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    if (!node) return null;
    const column = byLane[node.lane];
    const row = column.indexOf(node);
    const colH = column.length * NODE_H + (column.length - 1) * NODE_GAP;
    const x = PAD + node.lane * (NODE_W + LANE_GAP);
    const y = PAD + HEAD_H + (laneH - colH) / 2 + row * (NODE_H + NODE_GAP);
    return { x, y, cx: x + NODE_W / 2, cy: y + NODE_H / 2 };
  };

  return (
    <figure className="not-prose">
      <div
        className="overflow-x-auto rounded-xl p-4"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          style={{ minWidth: Math.min(width, 560), height: "auto", display: "block" }}
          role="img"
          aria-label={`${title}. ${caption ?? ""}`}
        >
          <defs>
            <marker
              id="fd-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L8 4 L0 8 z" fill="var(--border-strong)" />
            </marker>
          </defs>

          {/* lane headings */}
          {lanes.map((lane, i) => (
            <text
              key={lane}
              x={PAD + i * (NODE_W + LANE_GAP) + NODE_W / 2}
              y={PAD + 16}
              textAnchor="middle"
              style={{
                fill: "var(--text-faint)",
                fontSize: 10,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              {lane}
            </text>
          ))}

          {/* edges first, so the node cards sit on top of the line ends */}
          {edges.map((e, i) => {
            const a = place(e.from);
            const b = place(e.to);
            if (!a || !b) return null;

            const fromLane = nodes.find((n) => n.id === e.from)!.lane;
            const toLane = nodes.find((n) => n.id === e.to)!.lane;

            // Two nodes in the same lane are a step down, not a step across.
            // Routing them like a left-to-right edge sends the line out of the
            // right side of one box and back into the left side of the other,
            // which draws an arrow pointing the wrong way.
            if (fromLane === toLane) {
              const down = b.cy > a.cy;
              const y1 = down ? a.y + NODE_H : a.y;
              const y2 = down ? b.y : b.y + NODE_H;
              return (
                <g key={`${e.from}-${e.to}-${i}`}>
                  <path
                    d={`M ${a.cx} ${y1} L ${b.cx} ${y2}`}
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth={1.5}
                    markerEnd="url(#fd-arrow)"
                  />
                  {e.label && (
                    <text
                      x={a.cx + 8}
                      y={(y1 + y2) / 2 + 3}
                      textAnchor="start"
                      style={{ fill: "var(--text-faint)", fontSize: 10.5 }}
                    >
                      {e.label}
                    </text>
                  )}
                </g>
              );
            }

            const x1 = a.x + NODE_W;
            const x2 = b.x;
            const mid = (x1 + x2) / 2;
            const d = `M ${x1} ${a.cy} C ${mid} ${a.cy}, ${mid} ${b.cy}, ${x2} ${b.cy}`;
            return (
              <g key={`${e.from}-${e.to}-${i}`}>
                <path
                  d={d}
                  fill="none"
                  stroke="var(--border-strong)"
                  strokeWidth={1.5}
                  markerEnd="url(#fd-arrow)"
                />
                {e.label && (
                  <text
                    x={mid}
                    y={Math.min(a.cy, b.cy) - 9}
                    textAnchor="middle"
                    style={{ fill: "var(--text-faint)", fontSize: 10.5 }}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {/* nodes */}
          {nodes.map((n) => {
            const p = place(n.id);
            if (!p) return null;
            const tone = TONE[n.tone ?? "publish"];
            return (
              <g key={n.id}>
                <rect
                  x={p.x}
                  y={p.y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={12}
                  fill={tone.fill}
                  stroke={tone.stroke}
                  strokeWidth={n.tone === "core" ? 1.75 : 1}
                />
                <text
                  x={p.cx}
                  y={n.sub ? p.y + 28 : p.y + 38}
                  textAnchor="middle"
                  style={{ fill: tone.text, fontSize: 13.5, fontWeight: 600 }}
                >
                  {n.label}
                </text>
                {n.sub && (
                  <text
                    x={p.cx}
                    y={p.y + 46}
                    textAnchor="middle"
                    style={{ fill: "var(--text-muted)", fontSize: 11 }}
                  >
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
        <span className="font-medium" style={{ color: "var(--text)" }}>
          {title}.
        </span>{" "}
        {caption}
      </figcaption>
    </figure>
  );
}
