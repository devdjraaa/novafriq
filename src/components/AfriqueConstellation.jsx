import { useEffect, useRef } from 'react'
import './AfriqueConstellation.css'

const NODES_XY = [[531.0,307.4], [685.5,568.4], [674.3,740.7], [181.4,284.7], [475.5,293.3], [278.3,245.5], [829.5,819.7], [492.4,886.5], [593.3,613.2], [667.2,798.4], [748.5,280.4], [489.9,686.3], [669.6,333.3], [494.6,119.2], [116.5,291.0], [649.1,432.9], [592.0,685.1], [889.5,391.8], [355.6,414.1], [798.1,494.5], [630.9,505.5], [493.0,817.2], [590.5,754.3], [540.0,577.9], [386.2,60.1], [273.8,199.3], [284.8,73.4], [554.9,452.0], [578.9,843.3], [376.3,206.3], [598.7,930.9], [393.6,385.8], [530.8,643.6], [304.5,434.5], [733.7,573.4], [621.4,338.5], [520.9,731.7], [741.2,220.6], [555.0,538.6], [434.5,107.9], [643.7,612.7], [750.3,642.7], [762.4,689.2], [697.9,433.3], [465.3,497.6], [273.2,326.4], [366.3,297.4], [359.4,95.7], [871.7,767.7], [528.1,246.2], [207.1,432.0], [643.6,386.0], [713.8,759.6], [696.2,512.7], [250.9,48.3], [799.2,542.9], [671.0,283.9], [471.4,168.6], [182.0,153.1], [312.0,348.9], [618.4,180.1], [866.2,467.1], [477.4,644.1], [659.8,920.2], [481.7,538.4], [680.9,168.5], [594.0,983.0], [501.7,411.5], [725.3,819.8], [446.0,233.5], [748.5,396.5], [736.5,347.6]]

const LINKS = [[0,4], [0,49], [0,35], [1,34], [1,53], [1,40], [2,52], [2,9], [2,22], [3,14], [3,45], [3,5], [4,69], [4,49], [5,25], [5,45], [5,46], [6,48], [6,68], [6,52], [7,21], [7,28], [7,30], [8,40], [8,23], [8,32], [9,52], [9,68], [10,37], [10,71], [10,56], [11,62], [11,36], [11,32], [12,35], [12,56], [12,51], [13,57], [13,39], [13,24], [14,58], [14,45], [15,51], [15,43], [15,20], [16,22], [16,8], [16,32], [17,61], [17,19], [17,70], [18,31], [18,33], [18,59], [19,55], [19,61], [19,34], [20,53], [20,38], [21,28], [21,36], [22,36], [23,38], [23,32], [24,47], [24,39], [24,26], [25,29], [25,58], [26,54], [26,47], [27,67], [27,38], [27,20], [28,22], [28,30], [29,69], [29,46], [29,57], [30,66], [30,63], [31,59], [31,46], [32,62], [33,59], [33,50], [34,41], [34,53], [35,51], [35,56], [36,16], [37,65], [37,56], [38,64], [39,57], [40,16], [41,42], [41,1], [42,52], [42,2], [43,70], [43,51], [44,64], [44,67], [44,38], [45,59], [45,46], [46,59], [47,39], [48,42], [48,68], [49,69], [50,45], [50,59], [52,68], [54,47], [54,58], [55,34], [55,61], [57,69], [58,26], [60,65], [60,49], [60,56], [62,23], [63,66], [63,28], [64,23], [65,56], [66,7], [67,0], [68,2], [70,71], [70,12], [71,12]]

const NODES = NODES_XY.map(([x, y]) => ({ x, y }))

const NODE_MOTION = NODES.map((_, i) => ({
  ax: 10 + (i % 3) * 6,
  ay: 8 + (i % 4) * 5,
  fx: 0.22 + (i % 7) * 0.05,
  fy: 0.18 + (i % 5) * 0.06,
  phase: i * 0.83,
}))

export default function AfriqueConstellation() {
  const nodeRefs = useRef([])
  const lineRefs = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame
    const start = performance.now()

    const tick = (now) => {
      const t = (now - start) / 1000

      const positions = NODES.map((n, i) => {
        const m = NODE_MOTION[i]
        return {
          x: n.x + Math.sin(t * m.fx + m.phase) * m.ax,
          y: n.y + Math.cos(t * m.fy + m.phase) * m.ay,
        }
      })

      positions.forEach((p, i) => {
        const g = nodeRefs.current[i]
        if (g) g.setAttribute('transform', `translate(${(p.x - NODES[i].x).toFixed(2)} ${(p.y - NODES[i].y).toFixed(2)})`)
      })

      LINKS.forEach(([a, b], i) => {
        const line = lineRefs.current[i]
        if (line) {
          line.setAttribute('x1', positions[a].x.toFixed(2))
          line.setAttribute('y1', positions[a].y.toFixed(2))
          line.setAttribute('x2', positions[b].x.toFixed(2))
          line.setAttribute('y2', positions[b].y.toFixed(2))
        }
      })

      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="afrique-constellation" aria-hidden="true">
      <div className="ac-bloom" />
      <div className="ac-glow" />
      <svg className="ac-svg" viewBox="0 0 1000 1000">
        <g className="ac-links">
          {LINKS.map(([a, b], i) => (
            <line
              key={i}
              ref={(el) => (lineRefs.current[i] = el)}
              x1={NODES[a].x} y1={NODES[a].y}
              x2={NODES[b].x} y2={NODES[b].y}
            />
          ))}
        </g>
        <g className="ac-nodes">
          {NODES.map((n, i) => (
            <g key={i} ref={(el) => (nodeRefs.current[i] = el)}>
              <circle className="ac-pulse" cx={n.x} cy={n.y} r="7" style={{ animationDelay: `${(i % 12) * 0.25}s` }} />
              <circle className="ac-dot" cx={n.x} cy={n.y} r="3.4" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  )
}
